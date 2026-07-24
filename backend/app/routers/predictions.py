from fastapi import APIRouter
from app.models.schemas import VitalsInput, OverallHealthScoreResult
from app.ml.risk_engine import risk_engine

router = APIRouter(prefix="/predictions", tags=["ML Disease & Risk Models"])

@router.post("/evaluate", response_model=OverallHealthScoreResult)
def evaluate_patient_risks(vitals: VitalsInput):
    return risk_engine.predict_all(vitals)
