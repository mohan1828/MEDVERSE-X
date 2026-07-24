# MEDVERSE-X FastAPI Backend Service

Production-ready asynchronous FastAPI backend powering the **MEDVERSE-X** AI Healthcare Platform.

## 🚀 Key Features & Stack

- **Framework**: FastAPI 0.110 (AsyncIO)
- **Database**: MongoDB Atlas via `motor`
- **Security**: JWT tokens & Bcrypt password hashing
- **Documentation**: Swagger OpenAPI (`/docs`) & ReDoc (`/redoc`)
- **Deployment**: Render Web Service (`render.yaml`) & Docker (`Dockerfile`)

## 🛠️ Local Setup Instructions

```bash
# 1. Navigate to project root
cd "MEDVERSE-X AI Healthcare Platform"

# 2. Install Python dependencies
pip install -r backend/requirements.txt

# 3. Launch Uvicorn dev server
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```

Interactive Swagger API Documentation:
🔗 **http://localhost:8000/docs**
