import React, { useRef, useEffect } from 'react';
import type { HealthcareFacility } from '../../data/mockNavigatorData';

interface HealthcareMapCanvasProps {
  facilities: HealthcareFacility[];
  selectedFacilityId: string;
  onSelectFacility: (id: string) => void;
}

export const HealthcareMapCanvas: React.FC<HealthcareMapCanvasProps> = ({
  facilities,
  selectedFacilityId,
  onSelectFacility,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let pulseAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Grid Background Lines
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Radar Pulse Rings
      pulseAngle += 0.03;
      const radarRadius = Math.abs(Math.sin(pulseAngle)) * 160 + 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 229, 255, ${0.4 - (radarRadius / 180) * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Render Route to Selected Facility
      const selectedFac = facilities.find((f) => f.id === selectedFacilityId);
      if (selectedFac) {
        const facX = centerX + selectedFac.lng * 320;
        const facY = centerY + selectedFac.lat * 280;

        // Animated route dash
        ctx.beginPath();
        ctx.setLineDash([8, 6]);
        ctx.lineDashOffset = -pulseAngle * 20;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(facX, facY);
        ctx.strokeStyle = '#00FFB2';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash
      }

      // 4. Render Facility Nodes
      facilities.forEach((fac) => {
        const x = centerX + fac.lng * 320;
        const y = centerY + fac.lat * 280;
        const isSelected = fac.id === selectedFacilityId;

        // Glow halo
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(x, y, 22, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(124, 58, 237, 0.3)';
          ctx.fill();
        }

        // Outer Ring
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 14 : 10, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#7C3AED' : fac.type === 'emergency' ? '#F43F5E' : '#00E5FF';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(fac.name.split(' ')[0], x, y + 26);
      });

      // 5. User Center Location Pin
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#00FFB2';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#00FFB2';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('YOU (TOKYO GPS)', centerX, centerY - 18);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [facilities, selectedFacilityId]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    facilities.forEach((fac) => {
      const x = centerX + fac.lng * 320;
      const y = centerY + fac.lat * 280;
      const dist = Math.hypot(clickX - x, clickY - y);
      if (dist < 30) {
        onSelectFacility(fac.id);
      }
    });
  };

  return (
    <div className="relative w-full h-[320px] rounded-3xl overflow-hidden glass-panel border border-[#00E5FF]/30">
      <canvas
        ref={canvasRef}
        width={780}
        height={320}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer bg-slate-950/90"
      />
      <div className="absolute top-3 left-4 px-3 py-1 rounded-full bg-slate-900/90 border border-[#00E5FF]/30 text-[10px] font-mono text-[#00E5FF] flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#00FFB2] animate-ping" />
        <span>Live Radar Scan Active • Click Node To Select</span>
      </div>
    </div>
  );
};
