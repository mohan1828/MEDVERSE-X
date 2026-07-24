export interface SimulationInputs {
  weightChangeKg: number;
  exerciseHoursPerWeek: number;
  sleepHoursPerNight: number;
  smokingPerDay: number;
  alcoholPerWeek: number;
  dietScore: number;
  stressLevel: number;
}

export interface SimulationResults {
  healthScore: number;
  bodyAge: number;
  lifeExpectancyDelta: number;
  organs: {
    heart: number;
    brain: number;
    lungs: number;
    kidney: number;
    liver: number;
  };
  risks: {
    heartDisease: number;
    stroke: number;
    kidneyFailure: number;
    diabetes: number;
    mentalHealth: number;
    cancer: number;
  };
  recommendations: string[];
}

export const defaultInputs: SimulationInputs = {
  weightChangeKg: 0,
  exerciseHoursPerWeek: 4.5,
  sleepHoursPerNight: 8.0,
  smokingPerDay: 0,
  alcoholPerWeek: 1,
  dietScore: 8.5,
  stressLevel: 18,
};

export function runSimulation(inputs: SimulationInputs): SimulationResults {
  const baseScore = 97;
  const baseBodyAge = 29.4;

  const weightPenalty = Math.abs(inputs.weightChangeKg) * 0.8 + (inputs.weightChangeKg > 0 ? inputs.weightChangeKg * 0.4 : 0);

  const exerciseDiff = inputs.exerciseHoursPerWeek - 4.5;
  const exerciseBonus = exerciseDiff >= 0 ? Math.min(exerciseDiff * 0.8, 4) : exerciseDiff * 2.2;

  const sleepDiff = inputs.sleepHoursPerNight - 8.0;
  const sleepPenalty = Math.abs(sleepDiff) * (inputs.sleepHoursPerNight < 6.5 ? 3.5 : 1.2);

  const smokingPenalty = inputs.smokingPerDay * 1.8;

  const alcoholPenalty = Math.max(0, inputs.alcoholPerWeek - 2) * 1.2;

  const dietBonus = (inputs.dietScore - 8.5) * 1.5;

  const stressPenalty = Math.max(0, inputs.stressLevel - 20) * 0.25;

  const netImpact = exerciseBonus + dietBonus - weightPenalty - sleepPenalty - smokingPenalty - alcoholPenalty - stressPenalty;
  let calculatedScore = Math.round(baseScore + netImpact);
  calculatedScore = Math.max(12, Math.min(100, calculatedScore));

  const ageImpact = -netImpact * 0.35;
  let calculatedBodyAge = +(baseBodyAge + ageImpact).toFixed(1);
  calculatedBodyAge = Math.max(19.0, Math.min(75.0, calculatedBodyAge));

  const calculatedLifeDelta = +(netImpact * 0.22).toFixed(1);

  const heartScore = Math.max(10, Math.min(100, Math.round(98 + exerciseBonus * 1.2 - smokingPenalty * 1.5 - stressPenalty * 0.4 - weightPenalty * 0.6)));
  const brainScore = Math.max(10, Math.min(100, Math.round(96 - sleepPenalty * 2.0 - stressPenalty * 0.6 - alcoholPenalty * 1.1 + exerciseBonus * 0.5)));
  const lungsScore = Math.max(10, Math.min(100, Math.round(97 - smokingPenalty * 2.8 + (inputs.exerciseHoursPerWeek > 5 ? 2 : 0))));
  const kidneyScore = Math.max(10, Math.min(100, Math.round(94 - stressPenalty * 0.3 - alcoholPenalty * 0.8 - (inputs.weightChangeKg > 5 ? 4 : 0))));
  const liverScore = Math.max(10, Math.min(100, Math.round(95 - alcoholPenalty * 2.5 - (inputs.dietScore < 5 ? 12 : 0) - (inputs.weightChangeKg > 8 ? 10 : 0))));

  const heartRisk = +(3.2 + smokingPenalty * 0.8 + stressPenalty * 0.2 + (inputs.exerciseHoursPerWeek < 2 ? 8 : 0) + Math.max(0, inputs.weightChangeKg) * 0.6).toFixed(1);
  const strokeRisk = +(1.8 + smokingPenalty * 0.6 + (inputs.sleepHoursPerNight < 6 ? 4.5 : 0) + stressPenalty * 0.15).toFixed(1);
  const kidneyRisk = +(4.5 + alcoholPenalty * 0.5 + stressPenalty * 0.1 + (calculatedScore < 70 ? 8 : 0)).toFixed(1);
  const diabetesRisk = +(6.1 + (inputs.dietScore < 6 ? 12 : 0) + Math.max(0, inputs.weightChangeKg) * 1.1 - (inputs.exerciseHoursPerWeek > 4 ? 3 : 0)).toFixed(1);
  const mentalRisk = +(12.4 + stressPenalty * 0.5 + (inputs.sleepHoursPerNight < 6.5 ? 15 : 0) - exerciseBonus * 1.5).toFixed(1);
  const cancerRisk = +(2.1 + smokingPenalty * 1.1 + (inputs.dietScore < 5 ? 4 : 0) + alcoholPenalty * 0.6).toFixed(1);

  const recs: string[] = [];
  if (inputs.smokingPerDay > 0) recs.push('Zero-Smoking Protocol: Ceasing tobacco use restores micro-vascular elasticity by 40% in 14 days.');
  if (inputs.sleepHoursPerNight < 7.0) recs.push('Sleep Optimization: Extend slow-wave sleep to 8+ hours to restore glymphatic neuro-clearing.');
  if (inputs.exerciseHoursPerWeek < 3.0) recs.push('Zone-2 Cardio Target: Increase aerobic volume to 4.5 hrs/week to elevate VO2 Max to 50+ mL/kg/min.');
  if (inputs.stressLevel > 40) recs.push('Stress Mitigation: Initiate parasympathetic breathwork protocols to suppress cortisol spikes.');
  if (inputs.dietScore < 7.0) recs.push('Metabolic Nutrition: Increase polyphenol & fermentable fiber intake to optimize gut microbiome diversity.');

  if (recs.length === 0) {
    recs.push('Peak Longevity Maintained: Current routine is performing in the top 1% of bio-twin benchmarks.');
  }

  return {
    healthScore: calculatedScore,
    bodyAge: calculatedBodyAge,
    lifeExpectancyDelta: calculatedLifeDelta,
    organs: {
      heart: heartScore,
      brain: brainScore,
      lungs: lungsScore,
      kidney: kidneyScore,
      liver: liverScore,
    },
    risks: {
      heartDisease: Math.min(95, heartRisk),
      stroke: Math.min(95, strokeRisk),
      kidneyFailure: Math.min(95, kidneyRisk),
      diabetes: Math.min(95, diabetesRisk),
      mentalHealth: Math.min(95, mentalRisk),
      cancer: Math.min(95, cancerRisk),
    },
    recommendations: recs,
  };
}
