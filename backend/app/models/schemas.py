from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# Auth Schemas
class UserLogin(BaseModel):
    email: str
    password: str

class UserSignup(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "patient"  # patient, doctor, admin, emergency

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

# Patient Vitals & Health Input
class VitalsInput(BaseModel):
    age: int = 42
    gender: str = "Male"
    systolic_bp: int = 120
    diastolic_bp: int = 80
    heart_rate: int = 72
    glucose: int = 95
    cholesterol: int = 185
    bmi: float = 23.5
    smoking_history: bool = False
    physical_activity_hours: float = 4.5
    sleep_hours: float = 7.5

# Disease Risk Output with SHAP
class SHAPFeature(BaseModel):
    feature: str
    impact: float
    description: str

class DiseaseRiskResult(BaseModel):
    disease: str
    risk_score: float  # Percentage 0 - 100
    risk_level: str    # Low, Moderate, High, Critical
    confidence: float  # Model confidence %
    key_factors: List[str]
    shap_features: List[SHAPFeature]

class OverallHealthScoreResult(BaseModel):
    health_score: int  # 0 - 100
    metabolic_score: int
    cardiovascular_score: int
    lifestyle_score: int
    cognitive_score: int
    recommendations: List[str]
    disease_risks: List[DiseaseRiskResult]

# AI Doctor Chat Schemas
class ChatMessage(BaseModel):
    role: str  # user, assistant, system
    content: str

class AIDoctorRequest(BaseModel):
    symptoms: List[str]
    chat_history: List[ChatMessage] = []
    patient_vitals: Optional[VitalsInput] = None

class AIDoctorResponse(BaseModel):
    diagnosis_reasoning: str
    differential_diagnoses: List[Dict[str, Any]]
    recommended_specialist: str
    urgency_level: str
    confidence_score: float
    ai_agent_pipeline: List[str]
    suggested_questions: List[str]

# Hospital & Doctor Schemas
class HospitalQuery(BaseModel):
    lat: float = 12.9716
    lng: float = 77.5946
    specialty: Optional[str] = None
    max_distance_km: float = 25.0

class AppointmentBookingRequest(BaseModel):
    doctor_id: str
    doctor_name: str
    hospital_name: str
    patient_name: str
    appointment_date: str
    appointment_time: str
    consultation_type: str  # In-Person, Video Call
    symptoms_note: Optional[str] = ""

# Emergency SOS Schemas
class EmergencySOSRequest(BaseModel):
    lat: float
    lng: float
    patient_id: str
    trigger_type: str = "Manual SOS Button"
    vital_alerts: List[str] = []

class EmergencySOSResponse(BaseModel):
    sos_id: str
    status: str
    dispatched_ambulance: Dict[str, Any]
    nearest_hospital: Dict[str, Any]
    notified_contacts: List[str]
    eta_minutes: int
    emergency_qr_url: str

# EternaMind Schemas
class TimeCapsuleCreate(BaseModel):
    title: str
    recipient: str
    unlock_date: str
    memory_type: str
    content: str
