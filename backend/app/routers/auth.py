from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.core.security import create_access_token, verify_password, get_password_hash

router = APIRouter(prefix="/auth", tags=["Authentication & Role Gateway"])

class UserLoginPayload(BaseModel):
    email: str
    password: Optional[str] = "password123"
    role: Optional[str] = "patient"
    rememberMe: Optional[bool] = True

class UserSignupPayload(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    password: Optional[str] = "password123"
    country: Optional[str] = "United States"
    role: Optional[str] = "patient"

class OTPVerifyPayload(BaseModel):
    email: str
    otpCode: str

class ForgotPasswordPayload(BaseModel):
    email: str

class OnboardingPayload(BaseModel):
    userId: str
    role: str
    onboardingData: Dict[str, Any]

# In-memory user store for live API demonstration
USERS_DB = {
    "alexander.vance@medverse.ai": {
        "id": "usr-994812",
        "email": "alexander.vance@medverse.ai",
        "hashed_password": get_password_hash("password123"),
        "name": "Alexander Vance",
        "role": "patient",
        "isOnboarded": True
    },
    "dr.aris@medverse.ai": {
        "id": "usr-doc201",
        "email": "dr.aris@medverse.ai",
        "hashed_password": get_password_hash("doctor123"),
        "name": "Dr. Aris Thorne, MD",
        "role": "doctor",
        "isOnboarded": True
    }
}

@router.post("/login")
def login(payload: UserLoginPayload):
    role = payload.role or "patient"
    user_record = USERS_DB.get(payload.email)
    
    if not user_record:
        # Create virtual user for seamless enterprise demonstration
        user_record = {
            "id": f"usr-{abs(hash(payload.email)) % 1000000}",
            "email": payload.email,
            "name": payload.email.split("@")[0].replace(".", " ").title(),
            "role": role,
            "isOnboarded": True
        }
        USERS_DB[payload.email] = user_record

    token = create_access_token(data={"sub": payload.email, "role": role})
    
    return {
        "token": token,
        "token_type": "bearer",
        "user": {
            "id": user_record.get("id", "usr-994812"),
            "name": user_record.get("name", "Alexander Vance"),
            "email": payload.email,
            "role": role,
            "isOnboarded": user_record.get("isOnboarded", True),
            "twoFactorEnabled": True,
            "createdAt": "2026-01-15 08:30:00 UTC",
            "lastLoginAt": "2026-07-24 23:59:00 UTC",
            "patientProfile": {
                "age": 38,
                "gender": "Male",
                "bloodGroup": "O-Positive",
                "heightCm": 182,
                "weightKg": 78,
                "allergies": ["Penicillin"],
                "medications": ["EPA/DHA 2000mg"],
                "emergencyContact": "Elena Vance (+1 555-019-2831)",
                "insuranceProvider": "BlueCross Apex Health #MV-90182",
                "wearableSynced": "Apple Watch Ultra 3"
            }
        }
    }

@router.post("/signup")
def signup(payload: UserSignupPayload):
    user_id = f"usr-{abs(hash(payload.email)) % 1000000}"
    user_record = {
        "id": user_id,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "country": payload.country,
        "role": payload.role or "patient",
        "isOnboarded": False
    }
    USERS_DB[payload.email] = user_record
    token = create_access_token(data={"sub": payload.email, "role": payload.role})
    
    return {
        "token": token,
        "user": user_record
    }

@router.post("/verify-otp")
def verify_otp(payload: OTPVerifyPayload):
    if len(payload.otpCode) == 6:
        return {"status": "verified", "email": payload.email}
    raise HTTPException(status_code=400, detail="Invalid OTP code")

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordPayload):
    return {"status": "otp_sent", "email": payload.email, "message": "6-digit OTP code dispatched"}

@router.post("/onboarding")
def complete_onboarding(payload: OnboardingPayload):
    return {
        "id": payload.userId,
        "role": payload.role,
        "isOnboarded": True,
        "status": "profile_initialized"
    }

@router.get("/me")
def get_current_user(email: str = "alexander.vance@medverse.ai"):
    user = USERS_DB.get(email, USERS_DB["alexander.vance@medverse.ai"])
    return user
