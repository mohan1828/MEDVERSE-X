import random
from datetime import datetime, timedelta

def generate_seed_data():
    patients = []
    for i in range(1, 101):
        patients.append({
            "id": f"usr-p{i:03d}",
            "name": f"Patient {i}",
            "email": f"patient{i}@medverse.ai",
            "age": random.randint(22, 85),
            "gender": random.choice(["Male", "Female"]),
            "blood_group": random.choice(["O-Positive", "A-Positive", "B-Positive", "AB-Positive", "O-Negative"]),
            "health_score": random.randint(75, 99),
            "risk_percent": round(random.uniform(1.2, 12.5), 1),
            "organs": {
                "heart": {"name": "Heart", "score": random.randint(85, 99)},
                "brain": {"name": "Brain", "score": random.randint(85, 99)},
                "lungs": {"name": "Lungs", "score": random.randint(85, 99)},
                "liver": {"name": "Liver", "score": random.randint(85, 99)},
                "kidneys": {"name": "Kidneys", "score": random.randint(85, 99)},
            }
        })

    doctors = []
    specializations = ["Cardiology", "Neurology", "Oncology", "Endocrinology", "Pediatrics", "Emergency Medicine"]
    for i in range(1, 51):
        doctors.append({
            "id": f"doc-{i:03d}",
            "name": f"Dr. Doctor {i}, MD",
            "email": f"doctor{i}@medverse.ai",
            "specialization": random.choice(specializations),
            "hospital": f"Hospital Node #{random.randint(1, 25)}",
            "license_no": f"MC-REG-{random.randint(10000, 99999)}",
            "rating": round(random.uniform(4.5, 5.0), 1),
            "experience_yrs": random.randint(5, 30),
            "availability": "Mon-Fri (08:00 - 17:00)"
        })

    hospitals = []
    cities = ["Tokyo", "New York", "London", "Berlin", "Singapore", "Sydney", "Toronto"]
    for i in range(1, 26):
        hospitals.append({
            "id": f"hosp-{i:03d}",
            "name": f"Global Precision Hospital #{i}",
            "city": random.choice(cities),
            "address": f"{random.randint(100, 999)} Precision Medical Blvd",
            "icu_capacity": random.randint(15, 60),
            "emergency_beds": random.randint(5, 25),
            "trust_score": round(random.uniform(90.0, 99.9), 1)
        })

    medicines = []
    categories = ["Cardiovascular", "Metabolic", "Neuroprotective", "Anti-inflammatory", "Longevity Supplement"]
    for i in range(1, 101):
        medicines.append({
            "id": f"med-{i:03d}",
            "name": f"Pharmaceutic-{i} {random.choice(['EPA', 'DHA', 'CoQ10', 'Statin', 'Metformin'])}",
            "category": random.choice(categories),
            "dosage": f"{random.choice([10, 20, 50, 100, 500, 1000])} mg",
            "is_prescribed": True
        })

    laboratories = []
    for i in range(1, 51):
        laboratories.append({
            "id": f"lab-{i:03d}",
            "name": f"Diagnostic Genomics Lab #{i}",
            "accreditation": "CAP/CLIA Certified",
            "accuracy": "99.98%"
        })

    ambulances = []
    for i in range(1, 21):
        ambulances.append({
            "id": f"amb-{i:03d}",
            "unit": f"ALS Unit #{900 + i}",
            "status": "Available",
            "distance_km": round(random.uniform(0.5, 4.5), 1),
            "eta_mins": random.randint(2, 10)
        })

    return {
        "patients": patients,
        "doctors": doctors,
        "hospitals": hospitals,
        "medicines": medicines,
        "laboratories": laboratories,
        "ambulances": ambulances
    }

SEED_DATA = generate_seed_data()
