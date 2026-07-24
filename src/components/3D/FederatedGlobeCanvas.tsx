import React, { useEffect, useRef, useState } from 'react';
import { mockHospitalNodes, type HospitalNode } from '../../data/mockFederatedData';
import { ShieldCheck, Lock, Radio } from 'lucide-react';

interface FederatedGlobeCanvasProps {
  onSelectNode?: (node: HospitalNode) => void;
}

export const FederatedGlobeCanvas: React.FC<FederatedGlobeCanvasProps> = ({ onSelectNode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<HospitalNode | null>(null);
  const [activeNode, setActiveNode] = useState<HospitalNode>(mockHospitalNodes[0]);

  const handleNodeClick = (node: HospitalNode) => {
    setActiveNode(node);
    if (onSelectNode) onSelectNode(node);
  };

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
      canvas.width = rect ? rect.width : 600;
      canvas.height = rect ? rect.height : 450;
    };
    resize();
    window.addEventListener('resize', resize);

    const radius = 160;

    // Convert lat/lng to 3D sphere point
    const getNodeSpherePos = (lat: number, lng: number, r: number) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lng + 180) * Math.PI) / 180;
      return {
        x: -(r * Math.sin(phi) * Math.cos(theta)),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta)
      };
    };

    // Latitude & Longitude grid lines for globe aesthetic
    const gridPoints: { x: number; y: number; z: number }[] = [];
    for (let lat = -75; lat <= 75; lat += 25) {
      const radLat = (lat * Math.PI) / 180;
      const count = 36;
      for (let i = 0; i < count; i++) {
        const lon = (i * 360) / count;
        const radLon = (lon * Math.PI) / 180;
        gridPoints.push({
          x: radius * Math.cos(radLat) * Math.sin(radLon),
          y: radius * Math.sin(radLat),
          z: radius * Math.cos(radLat) * Math.cos(radLon)
        });
      }
    }

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      rotationAngle += 0.005;

      // Atmosphere Glow
      const glow = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.4);
      glow.addColorStop(0, 'rgba(0, 229, 255, 0.12)');
      glow.addColorStop(0.5, 'rgba(124, 58, 237, 0.08)');
      glow.addColorStop(1, 'rgba(11, 18, 32, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Render Grid Mesh
      const cosR = Math.cos(rotationAngle);
      const sinR = Math.sin(rotationAngle);

      gridPoints.forEach((p) => {
        const xRot = p.x * cosR - p.z * sinR;
        const zRot = p.x * sinR + p.z * cosR;

        if (zRot > -30) {
          const perspective = 400 / (400 - zRot);
          const projX = centerX + xRot * perspective;
          const projY = centerY + p.y * perspective;
          const alpha = Math.max(0.05, (zRot + radius) / (2 * radius)) * 0.4;

          ctx.beginPath();
          ctx.arc(projX, projY, 1.2 * perspective, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.fill();
        }
      });

      // Central Aggregation Hub Glow at center of globe
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8 + Math.sin(rotationAngle * 6) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#00FFB2';
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#00FFB2';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Render Hospital Nodes and Data Transfer Beams
      const projectedNodes: { node: HospitalNode; projX: number; projY: number; zRot: number }[] = [];

      mockHospitalNodes.forEach((node) => {
        const pos = getNodeSpherePos(node.lat, node.lng, radius);
        const xRot = pos.x * cosR - pos.z * sinR;
        const zRot = pos.x * sinR + pos.z * cosR;

        const perspective = 400 / (400 - zRot);
        const projX = centerX + xRot * perspective;
        const projY = centerY + pos.y * perspective;

        projectedNodes.push({ node, projX, projY, zRot });

        if (zRot > -40) {
          // Animated encrypted gradient data arc to central hub
          ctx.beginPath();
          ctx.moveTo(projX, projY);

          const midX = (projX + centerX) / 2 + Math.sin(rotationAngle * 2) * 20;
          const midY = (projY + centerY) / 2 - 30;

          ctx.quadraticCurveTo(midX, midY, centerX, centerY);
          ctx.strokeStyle = node.status === 'Training' ? 'rgba(244, 63, 94, 0.4)' : 'rgba(0, 229, 255, 0.4)';
          ctx.setLineDash([4, 6]);
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated particle moving along the arc
          const t = (Date.now() / 1500 + node.lat) % 1;
          const px = (1 - t) * (1 - t) * projX + 2 * (1 - t) * t * midX + t * t * centerX;
          const py = (1 - t) * (1 - t) * projY + 2 * (1 - t) * t * midY + t * t * centerY;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#00FFB2';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00FFB2';
          ctx.fill();
          ctx.shadowBlur = 0;

          // Render glowing hospital node pin
          const isSelected = activeNode.id === node.id;
          const isHovered = hoveredNode?.id === node.id;
          const nodeRadius = isSelected || isHovered ? 7 : 5;

          ctx.beginPath();
          ctx.arc(projX, projY, nodeRadius + 4, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? 'rgba(0, 255, 178, 0.3)' : 'rgba(0, 229, 255, 0.2)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(projX, projY, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#00FFB2' : '#00E5FF';
          ctx.shadowBlur = 15;
          ctx.shadowColor = isSelected ? '#00FFB2' : '#00E5FF';
          ctx.fill();
          ctx.shadowBlur = 0;

          // Label
          if (zRot > 40 || isHovered || isSelected) {
            ctx.font = '10px monospace';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(node.name.split(' ')[0], projX + 10, projY + 4);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode, activeNode]);

  return (
    <div className="relative w-full h-full min-h-[420px] flex flex-col items-center justify-center glass-panel p-4 rounded-3xl border border-[#00E5FF]/20 overflow-hidden">
      
      {/* Top Floating Security Pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-[#00FFB2]/40 text-xs font-mono text-[#00FFB2] shadow-cyan-glow">
        <ShieldCheck className="w-4 h-4 text-[#00FFB2]" />
        <span>100% Encrypted Gradient Network • Zero Patient Records Transmitted</span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] font-mono text-slate-300">
        <Radio className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
        <span>Central Aggregator: Zurich Secure Vault</span>
      </div>

      <canvas
        ref={canvasRef}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => handleNodeClick(hoveredNode || activeNode)}
        className="w-full h-full max-w-[650px] max-h-[500px] cursor-pointer"
      />

      {/* Hospital Node Detail Footer */}
      <div className="w-full mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Selected Node:</span>
          <span className="font-bold text-[#00E5FF]">{hoveredNode ? hoveredNode.name : activeNode.name}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Local Dataset:</span>
          <span className="font-bold text-[#00FFB2]">
            {((hoveredNode ? hoveredNode.dataRecords : activeNode.dataRecords) / 1000000).toFixed(2)}M Patient Profiles
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Encryption Standard:</span>
          <span className="font-bold text-purple-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Paillier Homomorphic
          </span>
        </div>
      </div>

    </div>
  );
};
