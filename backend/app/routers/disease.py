from fastapi import APIRouter
from app.services.disease_engine import disease_engine

router = APIRouter(prefix="/disease", tags=["Disease Prediction APIs"])

@router.get("/heart")
@router.post("/heart")
def predict_heart_disease():
    return disease_engine.predict_heart_risk()

@router.get("/stroke")
@router.post("/stroke")
def predict_stroke():
    return disease_engine.predict_stroke_risk()

@router.get("/diabetes")
@router.post("/diabetes")
def predict_diabetes():
    return disease_engine.predict_diabetes_risk()

@router.get("/kidney")
@router.post("/kidney")
def predict_kidney():
    return disease_engine.predict_kidney_risk()

@router.get("/mental")
@router.post("/mental")
def predict_mental():
    return disease_engine.predict_mental_health_risk()

@router.get("/cancer")
@router.post("/cancer")
def predict_cancer():
    return disease_engine.predict_cancer_risk()
