import React, { useEffect, useRef, useState } from 'react';
import { Network, Search } from 'lucide-react';
import { mockKnowledgeGraph, type GraphNode } from '../../data/mockKnowledgeGraph';

export const KnowledgeGraphView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(mockKnowledgeGraph.nodes[0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect ? rect.width : 800;
      canvas.height = rect ? rect.height : 500;
    };
    resize();
    window.addEventListener('resize', resize);

    const width = canvas.width;
    const height = canvas.height;

    const nodes = mockKnowledgeGraph.nodes.map((n, i) => {
      const angle = (i * Math.PI * 2) / mockKnowledgeGraph.nodes.length;
      const r = i === 0 ? 0 : 140 + (i % 3) * 50;
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * r,
        y: height / 2 + Math.sin(angle) * r,
        vx: 0,
        vy: 0,
      };
    });

    const links = mockKnowledgeGraph.links.map((l) => ({
      ...l,
      sourceNode: nodes.find((n) => n.id === l.source) || nodes[0],
      targetNode: nodes.find((n) => n.id === l.target) || nodes[0],
    }));

    let pulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulse += 0.03;

      links.forEach((link) => {
        const isConnected = selectedNode && (link.source === selectedNode.id || link.target === selectedNode.id);

        ctx.beginPath();
        ctx.moveTo(link.sourceNode.x, link.sourceNode.y);
        ctx.lineTo(link.targetNode.x, link.targetNode.y);
        ctx.strokeStyle = isConnected ? '#00E5FF' : 'rgba(0, 229, 255, 0.15)';
        ctx.lineWidth = isConnected ? 2 : 1;
        ctx.stroke();

        if (isConnected) {
          const t = (Math.sin(pulse) + 1) / 2;
          const px = link.sourceNode.x + (link.targetNode.x - link.sourceNode.x) * t;
          const py = link.sourceNode.y + (link.targetNode.y - link.sourceNode.y) * t;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#00FFB2';
          ctx.fill();
        }
      });

      nodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const matchesSearch = searchTerm && node.label.toLowerCase().includes(searchTerm.toLowerCase());

        ctx.beginPath();
        ctx.arc(node.x, node.y, isSelected ? node.val * 1.3 : node.val, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = isSelected || matchesSearch ? 25 : 10;
        ctx.shadowColor = node.color;
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = isSelected ? 'bold 12px JetBrains Mono' : '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.val + 14);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const clicked = nodes.find((n) => {
        const dx = n.x - clickX;
        const dy = n.y - clickY;
        return Math.sqrt(dx * dx + dy * dy) <= n.val + 8;
      });

      if (clicked) {
        setSelectedNode(clicked);
      }
    };
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedNode, searchTerm]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-cyan-glow">
            <Network className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Medical Knowledge Graph</h1>
            <p className="text-xs text-slate-300 font-mono">
              Dynamic Neural Ontology Connecting Diseases ↔ Biomarkers ↔ Medications ↔ Papers
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search node (e.g. ApoB, VO2)..."
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 glass-panel p-4 rounded-3xl relative min-h-[460px] flex items-center justify-center overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 text-[10px] font-mono">
            <span className="px-2 py-1 rounded bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30">Patient Node</span>
            <span className="px-2 py-1 rounded bg-[#FF3366]/20 text-[#FF3366] border border-[#FF3366]/30">Disease Vector</span>
            <span className="px-2 py-1 rounded bg-[#00FFB2]/20 text-[#00FFB2] border border-[#00FFB2]/30">Biomarker</span>
            <span className="px-2 py-1 rounded bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30">Intervention</span>
            <span className="px-2 py-1 rounded bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/30">PubMed Study</span>
          </div>
        </div>

        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-4">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: selectedNode.color }} 
                  className="w-4 h-4 rounded-full shadow-lg" 
                />
                <div>
                  <h3 className="font-bold text-white text-lg">{selectedNode.label}</h3>
                  <span className="text-[10px] font-mono uppercase text-[#00E5FF]">Category: {selectedNode.category}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {selectedNode.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-mono uppercase text-[#00FFB2] font-bold">
                  Active Links & Influences
                </h4>
                {mockKnowledgeGraph.links
                  .filter((l) => l.source === selectedNode.id || l.target === selectedNode.id)
                  .map((l, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono flex items-center justify-between">
                      <span className="text-slate-300">{l.source === selectedNode.id ? l.target : l.source}</span>
                      <span className="text-[#00E5FF] text-[10px]">{l.label}</span>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-mono text-center py-12">
              Click any node in the knowledge graph to view its detailed bio-ontology.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
