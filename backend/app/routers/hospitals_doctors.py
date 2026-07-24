import json
import os
from fastapi import APIRouter, HTTPException
from app.models.schemas import HospitalQuery, AppointmentBookingRequest

router = APIRouter(prefix="/healthcare", tags=["Hospitals & Doctor Recommendation Engine"])

# Load database dataset
DB_PATH = os.path.join(os.path.dirname(__file__), "..", "datasets", "medical_db.json")

def _get_db():
    if os.path.exists(DB_PATH):
        with open(DB_PATH, "r") as f:
            return json.load(f)
    return {"hospitals": [], "doctors": []}

@router.post("/hospitals/nearby")
def search_nearby_hospitals(query: HospitalQuery):
    db = _get_db()
    hospitals = db.get("hospitals", [])
    if query.specialty:
        hospitals = [h for h in hospitals if any(query.specialty.lower() in s.lower() for s in h.get("specialties", []))]
    return {"hospitals": hospitals, "total_found": len(hospitals)}

@router.get("/doctors")
def get_all_doctors():
    db = _get_db()
    return {"doctors": db.get("doctors", [])}

@router.post("/appointments/book")
def book_appointment(booking: AppointmentBookingRequest):
    return {
        "booking_id": f"APPT-{hash(booking.doctor_name + booking.appointment_date) % 100000:05d}",
        "status": "Confirmed",
        "details": booking,
        "message": f"Appointment successfully scheduled with {booking.doctor_name} at {booking.hospital_name} for {booking.appointment_date} at {booking.appointment_time}."
    }
