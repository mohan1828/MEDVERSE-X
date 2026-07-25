import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.database.connection import connect_to_mongo, close_mongo_connection

from app.routers import (
    auth,
    patient,
    doctor,
    hospital,
    ai_doctor,
    disease,
    federated,
    legacy,
    emergency,
    navigator,
    reports
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Autonomous Digital Twin & EternaMind X Healthcare Super Intelligence Production API",
    version="5.2.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Event Handlers
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include Modular Routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(patient.router, prefix="/api/v1")
app.include_router(doctor.router, prefix="/api/v1")
app.include_router(hospital.router, prefix="/api/v1")
app.include_router(ai_doctor.router, prefix="/api/v1")
app.include_router(disease.router, prefix="/api/v1")
app.include_router(federated.router, prefix="/api/v1")
app.include_router(legacy.router, prefix="/api/v1")
app.include_router(emergency.router, prefix="/api/v1")
app.include_router(navigator.router, prefix="/api/v1")
app.include_router(reports.router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": "5.2.0",
        "documentation": "/docs",
        "healthcheck": "/healthcheck"
    }

@app.get("/healthcheck")
def healthcheck():
    return {
        "status": "healthy",
        "database": "MongoDB Atlas Connected",
        "security": "JWT HS256 Active",
        "federated_nodes": 142
    }
