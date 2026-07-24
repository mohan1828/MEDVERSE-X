export interface AIAgent {
  id: string;
  name: string;
  role: string;
  specialty: string;
  status: 'active' | 'analyzing' | 'idle' | 'warning' | 'standby' | 'syncing';
  confidence: number;
  lastExecution: string;
  activeTasks: string[];
  avatarColor: string;
  description?: string;
  avatar?: string;
  currentTask?: string;
  metricsProcessed?: string;
}

export const mockAgents: AIAgent[] = [
  {
    id: 'athena',
    name: 'Athena AI',
    role: 'Genomic & Multi-Omics Specialist',
    specialty: 'Genetic Mutation Analysis & Longevity Markers',
    status: 'active',
    confidence: 99.4,
    lastExecution: 'Just now',
    activeTasks: ['Analyzing ApoE4 lipid transport pathway', 'Evaluating cellular senescence markers'],
    avatarColor: 'from-[#00E5FF] to-blue-600',
    description: 'Autonomous multi-omics genomic variant predictor matching patient RNA/DNA telemetry with 3.4M clinical trials.',
    avatar: '🧬',
    currentTask: 'Analyzing ApoE4 lipid transport pathway',
    metricsProcessed: '14.2M Base Pairs'
  },
  {
    id: 'apollo',
    name: 'Apollo AI',
    role: 'Cardiovascular Remodeling Engine',
    specialty: 'Arterial Elasticity & Hemodynamic Physics',
    status: 'active',
    confidence: 98.9,
    lastExecution: '2 mins ago',
    activeTasks: ['Continuous HRV frequency spectrum mapping', 'Endothelial shear stress calculation'],
    avatarColor: 'from-emerald-500 to-[#00FFB2]',
    description: 'Hemodynamic fluid dynamics simulator monitoring arterial wall elasticity and cardiac remodeling vectors.',
    avatar: '🫀',
    currentTask: 'Continuous HRV frequency spectrum mapping',
    metricsProcessed: '2,400 Cardiac Cycles'
  },
  {
    id: 'navigator',
    name: 'Healthcare Navigator AI',
    role: 'Real-time Care Location & Facility Matcher',
    specialty: 'Symptom-to-Specialty Matching & GPS Travel Guidance',
    status: 'active',
    confidence: 99.6,
    lastExecution: 'Just now',
    activeTasks: ['Scanning 42 nearby emergency hospitals', 'Evaluating English-speaking GP availability in Tokyo'],
    avatarColor: 'from-purple-500 to-indigo-600',
    description: 'Autonomous location intelligence matching symptoms to optimal nearby hospitals, doctors, and wait times.',
    avatar: '🧭',
    currentTask: 'Scanning nearby English-speaking GP availability',
    metricsProcessed: '42 Facilities Scanned'
  },
  {
    id: 'nova',
    name: 'Nova AI',
    role: 'Metabolic & Insulin Resistance Watchdog',
    specialty: 'Glucose Kinetics & Mitochondrial Efficiency',
    status: 'analyzing',
    confidence: 97.8,
    lastExecution: '5 mins ago',
    activeTasks: ['Simulating post-prandial glycemic curve', 'Ketone ratio balancing'],
    avatarColor: 'from-purple-600 to-pink-600',
    description: 'Continuous glucose kinetics and mitochondrial ATP efficiency monitoring agent.',
    avatar: '⚡',
    currentTask: 'Simulating post-prandial glycemic curve',
    metricsProcessed: '890 Glycemic Points'
  },
  {
    id: 'hermes',
    name: 'Hermes AI',
    role: 'Sub-Millisecond Emergency Watchdog',
    specialty: 'ST-Elevation & Ischemic Stroke Latency',
    status: 'active',
    confidence: 99.9,
    lastExecution: 'Just now',
    activeTasks: ['Maintaining 0.4ms cardiac arrhythmia ping', 'Pre-qualifying ICU bed availability'],
    avatarColor: 'from-rose-500 to-red-600',
    description: 'Sub-millisecond emergency dispatch watchdog linking wearable ECG telemetry to Mobile ICU dispatch.',
    avatar: '🚨',
    currentTask: 'Maintaining 0.4ms cardiac arrhythmia ping',
    metricsProcessed: '0.4 ms Latency'
  },
  {
    id: 'guardian',
    name: 'Guardian AI',
    role: 'Neuro-Degenerative Risk Profiler',
    specialty: 'Cognitive Decline & Amyloid Telemetry',
    status: 'active',
    confidence: 96.5,
    lastExecution: '12 mins ago',
    activeTasks: ['Sleep architecture REM phase evaluation', 'Cortisol circadian cycle monitoring'],
    avatarColor: 'from-amber-500 to-yellow-600',
    description: 'Cognitive decline and amyloid plaque risk analyzer evaluating REM sleep depth and circadian rhythm stability.',
    avatar: '🧠',
    currentTask: 'Sleep architecture REM phase evaluation',
    metricsProcessed: '8.2 Hours Sleep Data'
  },
  {
    id: 'nutrimind',
    name: 'NutriMind AI',
    role: 'Micro-Nutrient & Supplement Synthesizer',
    specialty: 'Precision Bio-availability & Nutrient Stack',
    status: 'idle',
    confidence: 98.2,
    lastExecution: '1 hour ago',
    activeTasks: ['CoQ10 ubiquinol absorption optimization'],
    avatarColor: 'from-[#00FFB2] to-teal-600',
    description: 'Precision bio-availability agent formulating customized daily supplement stacks.',
    avatar: '🥗',
    currentTask: 'CoQ10 ubiquinol absorption optimization',
    metricsProcessed: '24 Nutrients Formulated'
  },
  {
    id: 'pharmaco',
    name: 'PharmacoAI',
    role: 'Drug-Drug Interaction & CYP450 Engine',
    specialty: 'Pharmacogenomics & Adverse Reaction Warning',
    status: 'active',
    confidence: 99.1,
    lastExecution: '18 mins ago',
    activeTasks: ['Cross-checking 3 supplement compounds against clearance rate'],
    avatarColor: 'from-blue-600 to-cyan-500',
    description: 'CYP450 liver enzyme pharmacogenomics engine preventing adverse pharmaceutical interactions.',
    avatar: '💊',
    currentTask: 'Cross-checking supplement clearance rate',
    metricsProcessed: '1,420 Drug Molecules'
  },
  {
    id: 'traumanet',
    name: 'TraumaNet AI',
    role: 'Mobile ICU & Ambulance Dispatch Telemetry',
    specialty: 'Traffic Clearance & Emergency Room Standby',
    status: 'idle',
    confidence: 99.5,
    lastExecution: '30 mins ago',
    activeTasks: ['Syncing priority traffic signal beacon coordinates'],
    avatarColor: 'from-red-600 to-rose-700',
    description: 'Traffic signal clearance and hospital trauma room standby coordinator.',
    avatar: '🚑',
    currentTask: 'Syncing priority traffic signal beacon coordinates',
    metricsProcessed: '12 Traffic Lights Synced'
  }
];
