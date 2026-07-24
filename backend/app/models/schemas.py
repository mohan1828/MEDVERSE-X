from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any

class UserLogin(BaseModel):
    email: str
    password: Optional[str] = "password123"
    role: Optional[str] = "patient"
    rememberMe: Optional[bool] = True

class UserSignup(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    password: Optional[str] = "password123"
    country: Optional[str] = "United States"
    role: Optional[str] = "patient"

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    blood_group: str
    height_cm: Optional[int] = 180
    weight_kg: Optional[int] = 75
    allergies: Optional[List[str]] = []
    medications: Optional[List[str]] = []

class DoctorRegister(BaseModel):
    name: str
    email: str
    license_no: str
    specialization: str
    hospital: str
    experience_yrs: int
    consultation_fee: Optional[float] = 200.0

class HospitalRegister(BaseModel):
    name: str
    license_no: str
    address: str
    city: str
    icu_capacity: int
    emergency_beds: int

class SymptomCheck(BaseModel):
    symptoms: List[str]
    patient_id: Optional[str] = "usr-p001"
    age: Optional[int] = 38
    gender: Optional[str] = "Male"

class PredictionRequest(BaseModel):
    disease_type: str
    metrics: Dict[str, Any]

class SOSRequest(BaseModel):
    patient_id: str
    lat: float
    lng: float
    trigger_reason: Optional[str] = "ST-Elevation Arrhythmia Threshold Alert"
