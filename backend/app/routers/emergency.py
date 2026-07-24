from fastapi import APIRouter
from app.models.schemas import EmergencySOSRequest, EmergencySOSResponse

router = APIRouter(prefix="/emergency", tags=["Emergency Intelligence & SOS"])

@router.post("/trigger-sos", response_model=EmergencySOSResponse)
def trigger_emergency_sos(request: EmergencySOSRequest):
    return EmergencySOSResponse(
        sos_id=f"SOS-ALERT-{hash(request.patient_id) % 100000:05d}",
        status="DISPATCHED",
        dispatched_ambulance={
            "unit": "MED-AMB-09 (ALS ICU Equipped)",
            "driver": "Marcus Rodriguez",
            "phone": "+1 (555) 911-0099",
            "eta_minutes": 4
        },
        nearest_hospital={
            "name": "MedVerse-X Academic Medical Center Level 1 Trauma",
            "phone": "+1 (800) 555-9111",
            "address": "450 AI Healthcare Blvd"
        },
        notified_contacts=[
            "Sarah Vance (Wife) - SMS & Automated Emergency Call Sent",
            "Dr. Aris Thorne (Primary Physician) - Priority Tele-Alert Triggered"
        ],
        eta_minutes=4,
        emergency_qr_url=f"/api/v1/emergency/qr/{request.patient_id}"
    )

@router.get("/qr/{patient_id}")
def get_emergency_qr_profile(patient_id: str):
    return {
        "patient_id": patient_id,
        "full_name": "Alexander Vance",
        "blood_group": "O Positive (O+)",
        "allergies": ["Penicillin", "Sulfa Drugs"],
        "chronic_conditions": ["Mild Hypertension", "Early Stage Insulin Resistance"],
        "emergency_contacts": [
            {"name": "Sarah Vance", "relation": "Spouse", "phone": "+1 (555) 019-2834"},
            {"name": "Dr. Aris Thorne", "relation": "Primary Physician", "phone": "+1 (555) 392-1029"}
        ],
        "medications": ["Lisinopril 10mg daily", "Metformin 500mg daily"],
        "insurance_provider": "BlueCross MedVerse Health #99281-X"
    }
