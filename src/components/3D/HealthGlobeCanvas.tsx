import React, { useEffect, useRef } from 'react';

export const HealthGlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotationAngle = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect ? rect.width : 500;
      canvas.height = rect ? rect.height : 500;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create globe nodes (latitude & longitude points)
    const points: { x: number; y: number; z: number; lat: number; lon: number }[] = [];
    const radius = 170;

    for (let lat = -80; lat <= 80; lat += 18) {
      const radLat = (lat * Math.PI) / 180;
      const count = Math.max(4, Math.floor(24 * Math.cos(radLat)));
      for (let i = 0; i < count; i++) {
        const lon = (i * 360) / count;
        const radLon = (lon * Math.PI) / 180;
        points.push({
          x: radius * Math.cos(radLat) * Math.sin(radLon),
          y: radius * Math.sin(radLat),
          z: radius * Math.cos(radLat) * Math.cos(radLon),
          lat,
          lon,
        });
      }
    }

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      rotationAngle += 0.007;

      // Outer Glowing Ring Atmosphere
      const ringGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.35);
      ringGlow.addColorStop(0, 'rgba(0, 229, 255, 0.15)');
      ringGlow.addColorStop(0.5, 'rgba(124, 58, 237, 0.08)');
      ringGlow.addColorStop(1, 'rgba(11, 18, 32, 0)');
      ctx.fillStyle = ringGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Project and draw 3D points
      const projectedPoints: { x: number; y: number; z: number; alpha: number }[] = [];

      points.forEach((p) => {
        const cosR = Math.cos(rotationAngle);
        const sinR = Math.sin(rotationAngle);

        const xRot = p.x * cosR - p.z * sinR;
        const zRot = p.x * sinR + p.z * cosR;

        const perspective = 400 / (400 - zRot);
        const projX = centerX + xRot * perspective;
        const projY = centerY + p.y * perspective;
        const alpha = Math.max(0.1, (zRot + radius) / (2 * radius));

        projectedPoints.push({ x: projX, y: projY, z: zRot, alpha });

        if (zRot > -50) {
          ctx.beginPath();
          ctx.arc(projX, projY, Math.max(1, 2.2 * perspective), 0, Math.PI * 2);
          ctx.fillStyle = zRot > 50 ? `rgba(0, 255, 178, ${alpha})` : `rgba(0, 229, 255, ${alpha * 0.7})`;
          ctx.fill();
        }
      });

      for (let i = 0; i < projectedPoints.length; i += 6) {
        const p1 = projectedPoints[i];
        const p2 = projectedPoints[(i + 1) % projectedPoints.length];
        if (p1.z > -40 && p2.z > -40) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * p1.alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationAngle * 0.5);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.25, radius * 0.35, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 178, 0.4)';
      ctx.setLineDash([8, 12]);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 6 + Math.sin(rotationAngle * 4) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#00E5FF';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00E5FF';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full max-w-[550px] max-h-[550px]" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-[#00E5FF]/30 text-[11px] font-mono text-[#00E5FF] flex items-center gap-2 shadow-cyan-glow">
        <span className="w-2 h-2 rounded-full bg-[#00FFB2] animate-ping" />
        <span>3D Telemetry Grid • 14.2M Live Patient Nodes</span>
      </div>
    </div>
  );
};
