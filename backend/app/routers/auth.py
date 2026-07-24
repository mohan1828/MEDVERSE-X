from fastapi import APIRouter, HTTPException, status
from app.models.schemas import UserLogin, UserSignup, Token
from app.core.security import create_access_token, verify_password, get_password_hash

router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory user store for live API demonstration
USERS_DB = {
    "patient@medverse.ai": {
        "email": "patient@medverse.ai",
        "hashed_password": get_password_hash("password123"),
        "full_name": "Alexander Vance",
        "role": "patient",
        "patient_id": "MV-994812"
    },
    "doctor@medverse.ai": {
        "email": "doctor@medverse.ai",
        "hashed_password": get_password_hash("doctor123"),
        "full_name": "Dr. Aris Thorne, MD",
        "role": "doctor",
        "doctor_id": "doc-201"
    }
}

@router.post("/login", response_model=Token)
def login(payload: UserLogin):
    user = USERS_DB.get(payload.email)
    if not user or not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    token = create_access_token(data={"sub": user["email"], "role": user["role"]})
    return Token(
        access_token=token,
        token_type="bearer",
        user={"email": user["email"], "full_name": user["full_name"], "role": user["role"]}
    )

@router.post("/signup", response_model=Token)
def signup(payload: UserSignup):
    if payload.email in USERS_DB:
        raise HTTPException(status_code=400, detail="User already registered")
    
    hashed = get_password_hash(payload.password)
    user_record = {
        "email": payload.email,
        "hashed_password": hashed,
        "full_name": payload.full_name,
        "role": payload.role,
        "patient_id": f"MV-{hash(payload.email) % 1000000:06d}"
    }
    USERS_DB[payload.email] = user_record
    
    token = create_access_token(data={"sub": payload.email, "role": payload.role})
    return Token(
        access_token=token,
        token_type="bearer",
        user={"email": payload.email, "full_name": payload.full_name, "role": payload.role}
    )
