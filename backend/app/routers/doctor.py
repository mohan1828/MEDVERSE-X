from fastapi import APIRouter, HTTPException
from app.models.schemas import DoctorRegister
from app.database.seed_data import SEED_DATA

router = APIRouter(prefix="/doctors", tags=["Doctor APIs"])

@router.get("/")
def get_all_doctors(specialization: str = None):
    docs = SEED_DATA["doctors"]
    if specialization:
        docs = [d for d in docs if d["specialization"].lower() == specialization.lower()]
    return {"total": len(docs), "doctors": docs}

@router.get("/{doctor_id}")
def get_doctor_profile(doctor_id: str):
    d = next((doc for doc in SEED_DATA["doctors"] if doc["id"] == doctor_id), SEED_DATA["doctors"][0])
    return d

@router.post("/register")
def register_doctor(payload: DoctorRegister):
    new_doc = {
        "id": f"doc-{len(SEED_DATA['doctors']) + 1:03d}",
        "name": payload.name,
        "email": payload.email,
        "license_no": payload.license_no,
        "specialization": payload.specialization,
        "hospital": payload.hospital,
        "experience_yrs": payload.experience_yrs,
        "rating": 5.0,
        "availability": "Mon-Fri (08:00 - 17:00)"
    }
    SEED_DATA["doctors"].append(new_doc)
    return new_doc

@router.get("/{doctor_id}/appointments")
def get_doctor_appointments(doctor_id: str):
    return [
        {"id": "apt-101", "patient_name": "Alexander Vance", "time": "10:30 AM", "type": "Bio-Twin Assessment"},
        {"id": "apt-102", "patient_name": "Elena Vance", "time": "02:00 PM", "type": "Longevity Protocol Review"}
    ]
