export interface GraphNode {
  id: string;
  label: string;
  category: 'disease' | 'biomarker' | 'medicine' | 'paper' | 'lifestyle' | 'patient';
  color: string;
  val: number; // size relative
  description: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
  strength?: number;
}

export const mockKnowledgeGraph: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    { id: 'patient', label: 'Patient Twin #MTX-9942', category: 'patient', color: '#00E5FF', val: 24, description: 'Active digital twin baseline node.' },
    
    // Diseases
    { id: 'cvd', label: 'Cardiovascular Disease', category: 'disease', color: '#FF3366', val: 18, description: 'Coronary artery disease and vascular remodeling.' },
    { id: 't2d', label: 'Type 2 Diabetes', category: 'disease', color: '#FF9900', val: 16, description: 'Metabolic insulin dysregulation and pancreatic beta cell fatigue.' },
    { id: 'stroke', label: 'Ischemic Stroke', category: 'disease', color: '#FF3366', val: 15, description: 'Cerebrovascular ischemic events.' },
    { id: 'alzheimers', label: 'Alzheimer & Neuro-Degeneration', category: 'disease', color: '#7C3AED', val: 15, description: 'Amyloid beta & tau hyperphosphorylation.' },
    
    // Biomarkers
    { id: 'apob', label: 'ApoB Lipoprotein', category: 'biomarker', color: '#00FFB2', val: 12, description: 'Atherogenic particle count in blood plasma.' },
    { id: 'hscrp', label: 'hs-CRP (Inflammation)', category: 'biomarker', color: '#00FFB2', val: 12, description: 'High-sensitivity C-reactive protein systemic inflammatory marker.' },
    { id: 'vo2', label: 'VO2 Max (48.2)', category: 'biomarker', color: '#00FFB2', val: 14, description: 'Maximum rate of oxygen consumption during peak exercise.' },
    { id: 'hrv', label: 'HRV (68 ms)', category: 'biomarker', color: '#00FFB2', val: 13, description: 'Root mean square of successive differences (RMSSD).' },
    { id: 'hba1c', label: 'HbA1c Glucose Index', category: 'biomarker', color: '#00FFB2', val: 11, description: '3-month average blood sugar concentration.' },
    
    // Interventions & Medicines
    { id: 'omega3', label: 'Omega-3 EPA/DHA', category: 'medicine', color: '#38BDF8', val: 10, description: 'High-purity marine fatty acids suppressing vascular inflammation.' },
    { id: 'coq10', label: 'Coenzyme Q10 (Ubiquinol)', category: 'medicine', color: '#38BDF8', val: 10, description: 'Mitochondrial electron transport chain booster.' },
    { id: 'zone2', label: 'Zone 2 Endurance Training', category: 'lifestyle', color: '#A855F7', val: 14, description: 'Aerobic mitochondrial density training 4x/week.' },
    { id: 'sleep_arch', label: 'Optimized Sleep Architecture', category: 'lifestyle', color: '#A855F7', val: 13, description: '90+ mins deep sleep glymphatic neuro-clearance.' },
    
    // Research Papers
    { id: 'paper1', label: 'Lancet AI Genomic Risk 2026', category: 'paper', color: '#F43F5E', val: 9, description: 'Multimodal transformer prediction of subclinical atheroma.' },
    { id: 'paper2', label: 'Nature Longevity BioTwin 2025', category: 'paper', color: '#F43F5E', val: 9, description: 'Epigenetic age reversal via targeted lifestyle interventions.' },
  ],

  links: [
    { source: 'patient', target: 'vo2', label: 'Measures Peak' },
    { source: 'patient', target: 'hrv', label: 'Monitors HRV' },
    { source: 'patient', target: 'apob', label: 'Optimal ApoB' },
    { source: 'patient', target: 'zone2', label: 'Executes Daily' },
    
    { source: 'vo2', target: 'cvd', label: 'Reduces Risk (-35%)' },
    { source: 'hrv', target: 'stroke', label: 'Protects Against' },
    { source: 'apob', target: 'cvd', label: 'Causal Driver' },
    { source: 'hscrp', target: 'cvd', label: 'Systemic Marker' },
    { source: 'hscrp', target: 'alzheimers', label: 'Neuro-Inflammation Link' },
    
    { source: 'omega3', target: 'hscrp', label: 'Suppresses (-28%)' },
    { source: 'coq10', target: 'hrv', label: 'Enhances Energy' },
    { source: 'zone2', target: 'vo2', label: 'Increases (+18%)' },
    { source: 'zone2', target: 't2d', label: 'Improves Insulin Sensitivity' },
    { source: 'sleep_arch', target: 'alzheimers', label: 'Glymphatic Clearing' },
    
    { source: 'paper1', target: 'apob', label: 'Validates Biomarker' },
    { source: 'paper2', target: 'zone2', label: 'Cites Longevity Effect' },
  ]
};
