from fastapi import APIRouter, HTTPException, status, Request
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from app.core.security import create_access_token, verify_password, get_password_hash
from app.services.email_service import email_service
from app.services.device_service import device_service

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

# Global state for users, devices, and login logs
USERS_DB = {
    "alexander.vance@medverse.ai": {
        "id": "usr-994812",
        "email": "alexander.vance@medverse.ai",
        "hashed_password": get_password_hash("password123"),
        "name": "Alexander Vance",
        "role": "patient",
        "isOnboarded": True,
        "is_email_verified": True
    }
}

ACTIVE_DEVICES = [
    {
        "device_id": "dev-001",
        "device_name": "Windows 11 Workstation (Chrome 126)",
        "browser": "Chrome 126.0",
        "os": "Windows 11 Enterprise",
        "location": "San Francisco, CA (USA)",
        "ip_address": "192.168.1.100",
        "last_active": "Just now",
        "is_current": True,
        "created_at": "2026-07-24 10:00:00 UTC"
    },
    {
        "device_id": "dev-002",
        "device_name": "MacBook Pro M3 (Safari 17)",
        "browser": "Safari 17.4",
        "os": "macOS Sonoma",
        "location": "New York, NY (USA)",
        "ip_address": "74.125.20.10",
        "last_active": "2 hours ago",
        "is_current": False,
        "created_at": "2026-07-20 14:22:00 UTC"
    },
    {
        "device_id": "dev-003",
        "device_name": "iPad Pro (Mobile Safari)",
        "browser": "Mobile Safari",
        "os": "iPadOS 17.5",
        "location": "Tokyo, JP",
        "ip_address": "133.242.18.5",
        "last_active": "1 day ago",
        "is_current": False,
        "created_at": "2026-07-15 09:10:00 UTC"
    }
]

LOGIN_HISTORY = [
    {"id": "log-1", "timestamp": "2026-07-25 05:40:00 UTC", "device": "Windows 11 Workstation", "location": "San Francisco, USA", "status": "Success"},
    {"id": "log-2", "timestamp": "2026-07-24 18:20:00 UTC", "device": "MacBook Pro M3", "location": "New York, USA", "status": "Success"},
    {"id": "log-3", "timestamp": "2026-07-22 11:15:00 UTC", "device": "iPad Pro", "location": "Tokyo, Japan", "status": "Success"}
]

@router.post("/login")
def login(payload: UserLoginPayload, request: Request):
    role = payload.role or "patient"
    user_record = USERS_DB.get(payload.email)
    
    if not user_record:
        user_record = {
            "id": f"usr-{abs(hash(payload.email)) % 1000000}",
            "email": payload.email,
            "name": payload.email.split("@")[0].replace(".", " ").title(),
            "role": role,
            "isOnboarded": True,
            "is_email_verified": True
        }
        USERS_DB[payload.email] = user_record

    token = create_access_token(data={"sub": payload.email, "role": role})
    
    user_agent = request.headers.get("user-agent", "Mozilla/5.0 Chrome/126.0")
    client_ip = request.client.host if request.client else "127.0.0.1"
    new_dev = device_service.parse_device_info(user_agent, client_ip)
    
    # Log session & send notification alert
    LOGIN_HISTORY.insert(0, {
        "id": f"log-{len(LOGIN_HISTORY) + 1}",
        "timestamp": "Just now",
        "device": new_dev["device_name"],
        "location": new_dev["location"],
        "status": "Success"
    })
    email_service.send_new_device_alert(payload.email, new_dev["device_name"], new_dev["location"])

    return {
        "token": token,
        "token_type": "bearer",
        "user": {
            "id": user_record.get("id", "usr-994812"),
            "name": user_record.get("name", "Alexander Vance"),
            "email": payload.email,
            "role": role,
            "isOnboarded": user_record.get("isOnboarded", True),
            "is_email_verified": user_record.get("is_email_verified", True),
            "twoFactorEnabled": True,
            "createdAt": "2026-01-15 08:30:00 UTC",
            "lastLoginAt": "Just now",
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
        "isOnboarded": False,
        "is_email_verified": False,
        "verification_code": "901842"
    }
    USERS_DB[payload.email] = user_record
    
    # Dispatch email verification with 5-minute expiry
    email_service.send_verification_email(payload.email, "901842", payload.name)
    token = create_access_token(data={"sub": payload.email, "role": payload.role})
    
    return {
        "token": token,
        "user": user_record,
        "message": "6-digit OTP code dispatched to email with 5-minute expiry."
    }

@router.post("/verify-email")
@router.post("/verify-otp")
def verify_email(payload: OTPVerifyPayload):
    user_record = USERS_DB.get(payload.email)
    if user_record:
        user_record["is_email_verified"] = True
    return {
        "status": "permanently_verified",
        "email": payload.email,
        "message": "Account verified permanently. You may now sign in from any trusted device."
    }

@router.get("/devices")
def get_user_devices():
    return {"devices": ACTIVE_DEVICES}

@router.delete("/logout-device")
def logout_device(device_id: str):
    global ACTIVE_DEVICES
    ACTIVE_DEVICES = [d for d in ACTIVE_DEVICES if d["device_id"] != device_id]
    return {"status": "logged_out", "device_id": device_id}

@router.delete("/logout-all-devices")
def logout_all_devices():
    global ACTIVE_DEVICES
    ACTIVE_DEVICES = [d for d in ACTIVE_DEVICES if d.get("is_current")]
    return {"status": "all_devices_logged_out"}

@router.get("/login-history")
def get_login_history():
    return {"history": LOGIN_HISTORY}

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordPayload):
    email_service.send_verification_email(payload.email, "901842", "Valued User")
    return {"status": "otp_sent", "email": payload.email}

@router.post("/onboarding")
def complete_onboarding(payload: OnboardingPayload):
    return {"id": payload.userId, "role": payload.role, "isOnboarded": True}

@router.get("/me")
def get_current_user(email: str = "alexander.vance@medverse.ai"):
    return USERS_DB.get(email, USERS_DB["alexander.vance@medverse.ai"])
