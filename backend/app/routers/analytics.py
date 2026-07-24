from fastapi import APIRouter

router = APIRouter(prefix="/analytics", tags=["Clinical Analytics & Telemetry"])

@router.get("/vitals-trend")
def get_vitals_telemetry():
    return {
        "dates": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "systolic_bp": [128, 124, 122, 120, 119, 121, 120],
        "diastolic_bp": [84, 82, 81, 80, 79, 80, 78],
        "heart_rate": [76, 74, 72, 71, 70, 73, 72],
        "glucose": [102, 98, 96, 95, 94, 96, 95],
        "sleep_hours": [6.8, 7.2, 7.5, 8.0, 7.4, 8.2, 7.5],
        "activity_hours": [3.5, 4.0, 4.5, 5.0, 4.2, 6.0, 4.5]
    }
