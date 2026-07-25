import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, User, Hospital, Pill, Activity, FileText, Calendar } from 'lucide-react';
import { searchService, type SearchResultItem } from '../../services/searchService';
import type { NavTab } from '../Navbar';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigateTab }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    if (query.trim()) {
      searchService.search(query).then(setResults);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'doctor': return <User className="w-4 h-4 text-[#00E5FF]" />;
      case 'hospital': return <Hospital className="w-4 h-4 text-[#00FFB2]" />;
      case 'medicine': return <Pill className="w-4 h-4 text-purple-400" />;
      case 'disease': return <Activity className="w-4 h-4 text-rose-400" />;
      case 'report': return <FileText className="w-4 h-4 text-[#00E5FF]" />;
      default: return <Calendar className="w-4 h-4 text-purple-300" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-2xl glass-panel rounded-3xl border border-[#00E5FF]/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#00E5FF]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Doctors, Hospitals, Medicines, Diseases, Reports..."
            className="flex-1 bg-transparent text-sm font-mono text-white outline-none placeholder:text-slate-500"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[400px] overflow-y-auto p-4 space-y-2">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.actionTab) onNavigateTab(item.actionTab as NavTab);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#00E5FF]/40 cursor-pointer flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs font-mono">{item.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.subtitle}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-[#00E5FF] transition-all" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs font-mono text-slate-500">
              {query.trim() ? 'No matching records found' : 'Type to search across MEDVERSE-X intelligence database...'}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
