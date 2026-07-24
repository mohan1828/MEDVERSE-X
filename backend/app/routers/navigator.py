from fastapi import APIRouter
from app.database.seed_data import SEED_DATA

router = APIRouter(prefix="/navigator", tags=["Healthcare Navigator APIs"])

@router.get("/facilities")
def get_facilities(facility_type: str = None):
    return {
        "facilities": SEED_DATA["hospitals"],
        "total": len(SEED_DATA["hospitals"])
    }

@router.get("/doctors")
def get_nearby_doctors():
    return SEED_DATA["doctors"][:10]

@router.get("/labs")
def get_nearby_labs():
    return SEED_DATA["laboratories"][:10]
