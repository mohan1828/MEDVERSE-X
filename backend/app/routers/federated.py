from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import random
import time

router = APIRouter(prefix="/federated", tags=["Federated Intelligence Network"])

# Data Models
class FederatedNode(BaseModel):
    id: str
    name: str
    type: str # Hospital, Laboratory, Diagnostic Center, AI Node
    location: str
    country: str
    lat: float
    lng: float
    status: str # Active, Training, Aggregating, Idle
    dataRecords: int
    localAccuracy: float
    latencyMs: int
    gradientHash: str
    securityStatus: str

class SupportedModelMetric(BaseModel):
    id: str
    name: str
    category: str
    trainingStatus: str
    accuracy: float
    precision: float
    recall: float
    f1Score: float
    trainingProgress: int
    totalSamples: int
    lossHistory: List[float]
    roundCount: int

class FLRoundSimulationRequest(BaseModel):
    modelId: str
    algorithm: Optional[str] = "FedAvg"
    differentialPrivacyEpsilon: Optional[float] = 0.5
    participatingNodeCount: Optional[int] = 12

class FLRoundSimulationResponse(BaseModel):
    roundNumber: int
    modelId: str
    algorithm: str
    globalAccuracy: float
    previousAccuracy: float
    accuracyGain: float
    trainingLoss: float
    encryptedGradientHash: str
    participatingNodes: int
    privacyBudgetRemainingEpsilon: float
    timestamp: str

# In-memory simulated FL status
_FL_STATE = {
    "currentRound": 48,
    "globalAccuracy": 96.8,
    "privacyScore": 99.8,
    "securityScore": 100.0,
    "connectedHospitals": 142,
    "connectedLabs": 88,
    "connectedNodes": 520
}

@router.get("/dashboard")
def get_enterprise_dashboard():
    return {
        "status": "online",
        "tagline": "Learning Together. Preserving Privacy.",
        "metrics": {
            "connectedHospitals": _FL_STATE["connectedHospitals"],
            "connectedLaboratories": _FL_STATE["connectedLabs"],
            "connectedAINodes": _FL_STATE["connectedNodes"],
            "modelTrainingStatus": "Active - Round #" + str(_FL_STATE["currentRound"]),
            "globalModelAccuracy": round(_FL_STATE["globalAccuracy"], 2),
            "localModelAccuracyRange": "94.2% - 98.6%",
            "currentFederatedRound": _FL_STATE["currentRound"],
            "privacyScore": _FL_STATE["privacyScore"],
            "securityScore": _FL_STATE["securityScore"],
            "synchronizationStatus": "Real-time Synced (48ms avg)",
            "privacyBudgetEpsilon": 0.5
        },
        "participatingInstitutions": [
            {"name": "Mayo Clinic Federated Node A", "location": "Rochester, MN, USA", "records": "1.2M", "status": "Online"},
            {"name": "Johns Hopkins AI Research Lab", "location": "Baltimore, MD, USA", "records": "980K", "status": "Online"},
            {"name": "Charité Medical AI Unit", "location": "Berlin, Germany", "records": "850K", "status": "Online"},
            {"name": "AIIMS Precision Health Center", "location": "New Delhi, India", "records": "1.4M", "status": "Online"},
            {"name": "Singapore General Bio-Compute Node", "location": "Singapore", "records": "620K", "status": "Online"},
            {"name": "Tokyo University Hospital AI", "location": "Tokyo, Japan", "records": "1.1M", "status": "Online"}
        ]
    }

@router.get("/models")
def get_supported_models():
    models = [
        {
            "id": "heart-disease",
            "name": "Heart Disease Prediction",
            "category": "Cardiology",
            "trainingStatus": "Converged",
            "accuracy": 97.4,
            "precision": 96.8,
            "recall": 98.1,
            "f1Score": 97.4,
            "trainingProgress": 100,
            "totalSamples": 4200000,
            "roundCount": 48
        },
        {
            "id": "stroke-prediction",
            "name": "Stroke Risk Vector Model",
            "category": "Neurology",
            "trainingStatus": "Active Training",
            "accuracy": 96.2,
            "precision": 95.7,
            "recall": 96.9,
            "f1Score": 96.3,
            "trainingProgress": 88,
            "totalSamples": 3100000,
            "roundCount": 42
        },
        {
            "id": "kidney-disease",
            "name": "Renal Disease Progression AI",
            "category": "Nephrology",
            "trainingStatus": "Converged",
            "accuracy": 95.8,
            "precision": 95.1,
            "recall": 96.4,
            "f1Score": 95.7,
            "trainingProgress": 100,
            "totalSamples": 2800000,
            "roundCount": 36
        },
        {
            "id": "diabetes-risk",
            "name": "Metabolic & Diabetes Predictor",
            "category": "Endocrinology",
            "trainingStatus": "Converged",
            "accuracy": 98.1,
            "precision": 97.8,
            "recall": 98.5,
            "f1Score": 98.1,
            "trainingProgress": 100,
            "totalSamples": 5600000,
            "roundCount": 54
        },
        {
            "id": "cancer-risk",
            "name": "Early Multi-Cancer Risk Vector",
            "category": "Oncology",
            "trainingStatus": "Aggregating",
            "accuracy": 94.9,
            "precision": 94.2,
            "recall": 95.5,
            "f1Score": 94.8,
            "trainingProgress": 72,
            "totalSamples": 1900000,
            "roundCount": 30
        },
        {
            "id": "mental-health",
            "name": "Neuro-Psychiatric Biomarker Model",
            "category": "Psychiatry",
            "trainingStatus": "Active Training",
            "accuracy": 93.6,
            "precision": 92.9,
            "recall": 94.3,
            "f1Score": 93.6,
            "trainingProgress": 82,
            "totalSamples": 1400000,
            "roundCount": 24
        },
        {
            "id": "lifestyle-prediction",
            "name": "Lifestyle & Epigenetic Aging Engine",
            "category": "Preventive Medicine",
            "trainingStatus": "Converged",
            "accuracy": 97.9,
            "precision": 97.4,
            "recall": 98.3,
            "f1Score": 97.8,
            "trainingProgress": 100,
            "totalSamples": 6100000,
            "roundCount": 60
        },
        {
            "id": "population-health",
            "name": "Population Epidemiology Analytics",
            "category": "Public Health",
            "trainingStatus": "Converged",
            "accuracy": 96.7,
            "precision": 96.1,
            "recall": 97.2,
            "f1Score": 96.6,
            "trainingProgress": 100,
            "totalSamples": 8400000,
            "roundCount": 45
        }
    ]
    return models

@router.post("/simulate-round", response_model=FLRoundSimulationResponse)
def simulate_federated_round(req: FLRoundSimulationRequest):
    _FL_STATE["currentRound"] += 1
    accuracy_gain = round(random.uniform(0.12, 0.45), 2)
    _FL_STATE["globalAccuracy"] = min(99.4, _FL_STATE["globalAccuracy"] + accuracy_gain)
    
    hash_seed = f"FED-ROUND-{_FL_STATE['currentRound']}-{time.time()}"
    encrypted_hash = f"0x7f8a{random.randint(10000000, 99999999):x}e94c1a2d"
    
    return FLRoundSimulationResponse(
        roundNumber=_FL_STATE["currentRound"],
        modelId=req.modelId,
        algorithm=req.algorithm or "FedAvg",
        globalAccuracy=round(_FL_STATE["globalAccuracy"], 2),
        previousAccuracy=round(_FL_STATE["globalAccuracy"] - accuracy_gain, 2),
        accuracyGain=accuracy_gain,
        trainingLoss=round(random.uniform(0.042, 0.089), 4),
        encryptedGradientHash=encrypted_hash,
        participatingNodes=req.participatingNodeCount or 142,
        privacyBudgetRemainingEpsilon=max(0.05, round(0.5 - (_FL_STATE["currentRound"] * 0.002), 3)),
        timestamp=time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())
    )

@router.get("/blockchain-audit")
def get_blockchain_audit():
    return {
        "ledgerName": "MEDVERSE-X Immutable Federated Ledger",
        "consensusMechanism": "Proof-of-Federated-Compliance (PoFC)",
        "totalBlocks": 1048,
        "blocks": [
            {
                "blockIndex": 1048,
                "timestamp": "2026-07-24 23:58:12 UTC",
                "round": 48,
                "eventType": "FedAvg Model Weight Aggregation",
                "modelId": "heart-disease",
                "participatingNodes": 142,
                "hash": "0xa3f910e82c149b552e189a071c3d4f82",
                "previousHash": "0x8b2e104f7c11a0029c881023a14d5e91",
                "merkleRoot": "0x51c720a4b91730e28f11",
                "validator": "Secure Aggregation Node #01 (Zurich)",
                "verificationStatus": "VERIFIED & IMMUTABLE"
            },
            {
                "blockIndex": 1047,
                "timestamp": "2026-07-24 22:30:45 UTC",
                "round": 47,
                "eventType": "Differential Privacy Noise Verification",
                "modelId": "diabetes-risk",
                "participatingNodes": 138,
                "hash": "0x8b2e104f7c11a0029c881023a14d5e91",
                "previousHash": "0x6d1192e1049b77a01b22c09194e823f9",
                "merkleRoot": "0x42b8109d817300c19a88",
                "validator": "Secure Aggregation Node #03 (Tokyo)",
                "verificationStatus": "VERIFIED & IMMUTABLE"
            },
            {
                "blockIndex": 1046,
                "timestamp": "2026-07-24 21:15:00 UTC",
                "round": 46,
                "eventType": "Hospital Consent Token Verification",
                "modelId": "stroke-prediction",
                "participatingNodes": 135,
                "hash": "0x6d1192e1049b77a01b22c09194e823f9",
                "previousHash": "0x3f709121a88b11c990a21774e10b4291",
                "merkleRoot": "0x19a008b8e721a9900c44",
                "validator": "Secure Aggregation Node #02 (Boston)",
                "verificationStatus": "VERIFIED & IMMUTABLE"
            }
        ]
    }

@router.get("/explainability")
def get_explainability(prediction_id: Optional[str] = "PRED-9984"):
    return {
        "predictionId": prediction_id,
        "modelName": "Federated Global Cardiac Risk Model v2.4.0",
        "predictedCondition": "Low 10-Year Myocardial Risk",
        "riskScore": "3.2%",
        "confidence": 98.4,
        "shapValues": [
            {"feature": "ApoB / ApoA1 Lipoprotein Ratio", "importance": 0.34, "impact": "Decreases Risk (-2.8%)", "direction": "positive"},
            {"feature": "High-Sensitivity CRP (hs-CRP)", "importance": 0.22, "impact": "Decreases Risk (-1.6%)", "direction": "positive"},
            {"feature": "Left Ventricular Ejection Fraction", "importance": 0.18, "impact": "Optimal Baseline (-1.2%)", "direction": "positive"},
            {"feature": "Systolic Blood Pressure (118 mmHg)", "importance": 0.12, "impact": "Slight Positive Drift (+0.4%)", "direction": "negative"},
            {"feature": "HbA1c Glycated Hemoglobin", "importance": 0.08, "impact": "Optimal Glucose Control (-0.8%)", "direction": "positive"}
        ],
        "trainingSources": [
            {"institution": "Mayo Clinic", "contributionWeight": "24.5%"},
            {"institution": "Johns Hopkins Medicine", "contributionWeight": "21.2%"},
            {"institution": "Charité Berlin", "contributionWeight": "18.8%"},
            {"institution": "AIIMS New Delhi", "contributionWeight": "19.5%"},
            {"institution": "Singapore General", "contributionWeight": "16.0%"}
        ],
        "privacyGuarantee": "Zero raw patient bytes transferred. 100% Homomorphic Encrypted Weight Vector.",
        "participatingModelVersion": "v2.4.0-FedAvg-DP0.5"
    }
