import { useState, useEffect } from 'react';
import { type VitalsInput, defaultVitals, evaluateVitalsRisk, type OverallHealthScoreResult, fallbackHealthScoreResult } from '../services/predictionService';

export function useHealthMetrics() {
  const [vitals, setVitals] = useState<VitalsInput>(defaultVitals);
  const [evaluation, setEvaluation] = useState<OverallHealthScoreResult>(fallbackHealthScoreResult);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsEvaluating(true);

    evaluateVitalsRisk(vitals).then((res) => {
      if (isMounted) {
        setEvaluation(res);
        setIsEvaluating(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [vitals]);

  const updateVitalField = (field: keyof VitalsInput, value: any) => {
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  return {
    vitals,
    evaluation,
    isEvaluating,
    updateVitalField,
    setVitals,
  };
}
