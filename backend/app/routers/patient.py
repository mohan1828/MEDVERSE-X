from fastapi import APIRouter, HTTPException, Depends
from typing import Optional, List
from app.models.schemas import PatientCreate
from app.services.health_score_engine import health_score_engine
from app.services.digital_twin_engine import digital_twin_engine
from app.database.seed_data import SEED_DATA

router = APIRouter(prefix="/patients", tags=["Patient APIs"])

@router.get("/")
def get_all_patients(limit: int = 20):
    return {"total": len(SEED_DATA["patients"]), "patients": SEED_DATA["patients"][:limit]}

@router.get("/{patient_id}")
def get_patient_profile(patient_id: str):
    p = next((p for p in SEED_DATA["patients"] if p["id"] == patient_id), SEED_DATA["patients"][0])
    return p

@router.post("/")
def create_patient(payload: PatientCreate):
    new_p = {
        "id": f"usr-p{len(SEED_DATA['patients']) + 1:03d}",
        "name": payload.name,
        "age": payload.age,
        "gender": payload.gender,
        "blood_group": payload.blood_group,
        "height_cm": payload.height_cm,
        "weight_kg": payload.weight_kg,
        "allergies": payload.allergies,
        "medications": payload.medications,
        "health_score": 98
    }
    SEED_DATA["patients"].append(new_p)
    return new_p

@router.put("/{patient_id}")
def update_patient(patient_id: str, payload: PatientCreate):
    p = get_patient_profile(patient_id)
    p.update({
        "name": payload.name,
        "age": payload.age,
        "gender": payload.gender,
        "blood_group": payload.blood_group,
    })
    return p

@router.get("/{patient_id}/health-score")
def get_patient_health_score(patient_id: str):
    return health_score_engine.calculate_bio_score(38, 33)

@router.get("/{patient_id}/digital-twin")
def get_patient_digital_twin(patient_id: str):
    p = get_patient_profile(patient_id)
    return digital_twin_engine.calculate_organ_telemetry(p)

@router.get("/{patient_id}/medical-history")
def get_patient_medical_history(patient_id: str):
    return {
        "patient_id": patient_id,
        "history": [
            {"year": 2025, "event": "Comprehensive Genome & Biomarker Baseline Screen", "status": "Completed"},
            {"year": 2024, "event": "Zone 2 Cardiorespiratory Fitness Peak Benchmark", "status": "Completed"}
        ],
        "allergies": ["Penicillin", "Peanuts"],
        "medications": ["EPA/DHA 2000mg", "CoQ10 200mg", "Magnesium L-Threonate"]
    }
