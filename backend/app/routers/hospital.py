from fastapi import APIRouter
from app.models.schemas import HospitalRegister
from app.database.seed_data import SEED_DATA

router = APIRouter(prefix="/hospitals", tags=["Hospital APIs"])

@router.get("/")
def get_all_hospitals(city: str = None):
    hosps = SEED_DATA["hospitals"]
    if city:
        hosps = [h for h in hosps if h["city"].lower() == city.lower()]
    return {"total": len(hosps), "hospitals": hosps}

@router.get("/{hospital_id}")
def get_hospital_details(hospital_id: str):
    h = next((hosp for hosp in SEED_DATA["hospitals"] if hosp["id"] == hospital_id), SEED_DATA["hospitals"][0])
    return h

@router.post("/register")
def register_hospital(payload: HospitalRegister):
    new_hosp = {
        "id": f"hosp-{len(SEED_DATA['hospitals']) + 1:03d}",
        "name": payload.name,
        "license_no": payload.license_no,
        "address": payload.address,
        "city": payload.city,
        "icu_capacity": payload.icu_capacity,
        "emergency_beds": payload.emergency_beds,
        "trust_score": 98.5
    }
    SEED_DATA["hospitals"].append(new_hosp)
    return new_hosp

@router.get("/search/emergency-beds")
def get_emergency_bed_availability():
    return [
        {"hospital": h["name"], "icu_capacity": h["icu_capacity"], "available_beds": h["emergency_beds"]}
        for h in SEED_DATA["hospitals"][:5]
    ]
