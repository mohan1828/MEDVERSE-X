import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, BookOpen, ChevronRight, Award } from 'lucide-react';
import { mockEternaMindData, type GenNode } from '../../../data/mockEternaMindData';

export const MultiGenGraphView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GenNode>(mockEternaMindData.multiGenNodes[3]);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-purple-glow">
            <Network className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Multi-Generation Knowledge Graph</h2>
            <p className="text-xs text-slate-300 font-mono">
              Generational Wisdom Network Connecting Lineage Expertise & Life Lessons Across 5 Generations
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
          5 Lineage Generations Connected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-4 flex flex-col justify-between">
          <h3 className="text-xs font-mono uppercase text-[#00E5FF] font-bold">
            Family Generational Hierarchy (Click Any Node)
          </h3>

          <div className="space-y-4">
            {mockEternaMindData.multiGenNodes.map((node, i) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div key={node.id} className="relative flex items-center gap-4">
                  {i < mockEternaMindData.multiGenNodes.length - 1 && (
                    <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-[#00E5FF] z-0" />
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNode(node)}
                    className={`relative z-10 flex-1 p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-900/60 to-slate-900 border-[#00E5FF] shadow-purple-glow'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        style={{ backgroundColor: node.color }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md text-black font-bold"
                      >
                        {node.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{node.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{node.relation}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                      <span>{node.storiesCount} Stories</span>
                      <ChevronRight className="w-4 h-4 text-[#00E5FF]" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel-glow p-6 rounded-3xl space-y-5">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-3xl shadow-purple-glow">
              {selectedNode.avatar}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{selectedNode.name}</h3>
              <div className="text-xs font-mono text-[#00E5FF]">{selectedNode.relation}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-purple-300 font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#00FFB2]" />
              Preserved Expertise Domains
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {selectedNode.expertise.map((exp, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-[#00E5FF] font-bold flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#00E5FF]" />
              Documented Core Life Lessons
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedNode.lifeLessons.map((les, i) => (
                <li key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 leading-relaxed">
                  "{les}"
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between text-xs font-mono text-slate-400">
            <span>Preserved Stories: <strong className="text-white">{selectedNode.storiesCount}</strong></span>
            <span>Documents: <strong className="text-[#00FFB2]">{selectedNode.documentsCount}</strong></span>
          </div>

        </div>

      </div>

    </div>
  );
};
