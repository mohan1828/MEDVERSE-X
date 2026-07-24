from fastapi import APIRouter
from app.models.schemas import SOSRequest
from app.services.emergency_engine import emergency_engine

router = APIRouter(prefix="/emergency", tags=["Emergency SOS APIs"])

@router.post("/sos")
def trigger_sos(payload: SOSRequest):
    return emergency_engine.dispatch_emergency(payload.model_dump())

@router.get("/ambulance")
def get_nearby_ambulance():
    return {
        "unit": "ALS Unit #904 Mobile ICU",
        "distance_km": 2.4,
        "eta_mins": 4,
        "paramedic": "Captain Marcus Vance",
        "status": "EN_ROUTE"
    }

@router.get("/qr")
def get_emergency_qr(patient_id: str = "MV-994812"):
    return {
        "patient_id": patient_id,
        "qr_hash": "0x9942-MTX-EMERGENCY",
        "blood_group": "O-Positive",
        "allergies": ["Penicillin", "Peanuts"],
        "emergency_contact": "Elena Vance (+1 555-019-2831)"
    }
