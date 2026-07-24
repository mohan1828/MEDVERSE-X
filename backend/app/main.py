from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import auth, ai_doctor, predictions, hospitals_doctors, emergency, eternamind, analytics, federated

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="MEDVERSE-X AI Healthcare Platform Production Backend API"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Router Modules
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(ai_doctor.router, prefix=settings.API_V1_STR)
app.include_router(predictions.router, prefix=settings.API_V1_STR)
app.include_router(hospitals_doctors.router, prefix=settings.API_V1_STR)
app.include_router(emergency.router, prefix=settings.API_V1_STR)
app.include_router(eternamind.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(federated.router, prefix=settings.API_V1_STR)

@app.get("/")
def root_status():
    return {
        "status": "online",
        "platform": settings.PROJECT_NAME,
        "version": "1.0.0-production",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
