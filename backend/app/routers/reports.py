from fastapi import APIRouter
from fastapi.responses import FileResponse
from app.services.pdf_service import pdf_service

router = APIRouter(prefix="/reports", tags=["Reports & Export APIs"])

@router.post("/generate-pdf")
def generate_pdf_report(patient_name: str = "Alexander Vance"):
    pdf_path = pdf_service.create_patient_pdf(patient_name=patient_name)
    return FileResponse(pdf_path, media_type="application/pdf", filename=f"medverse_clinical_report_{patient_name.replace(' ', '_')}.pdf")

@router.get("/medical")
def get_medical_report_summary():
    return {
        "report_id": "REP-994812-PDF",
        "title": "Comprehensive Bio-Twin & Predictive Health Report",
        "status": "Verified",
        "patient": "Alexander Vance",
        "health_score": 98
    }
