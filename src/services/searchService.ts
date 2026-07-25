export interface SearchResultItem {
  id: string;
  category: 'doctor' | 'hospital' | 'medicine' | 'disease' | 'report' | 'appointment';
  title: string;
  subtitle: string;
  actionTab?: string;
}

const mockSearchDatabase: SearchResultItem[] = [
  { id: '1', category: 'doctor', title: 'Dr. Aris Thorne, MD', subtitle: 'Interventional Cardiology • Mayo Clinic', actionTab: 'ai-intelligence' },
  { id: '2', category: 'doctor', title: 'Dr. Elena Rostova, MD', subtitle: 'Neuro-Genomics • Tokyo Medical Center', actionTab: 'health-intelligence' },
  { id: '3', category: 'hospital', title: 'Tokyo Medical Center Trauma Unit', subtitle: '4 ICU Beds Available • Trust Score 99.4/100', actionTab: 'emergency-center' },
  { id: '4', category: 'hospital', title: 'Mayo Clinic Precision Bio-Health Hub', subtitle: '142 Federated AI Nodes Connected', actionTab: 'federated-intelligence' },
  { id: '5', category: 'medicine', title: 'EPA/DHA Marine Fatty Acids (2000mg)', subtitle: 'Active Supplement Stack • Heart & Vascular', actionTab: 'profile-settings' },
  { id: '6', category: 'medicine', title: 'Coenzyme Q10 (Ubiquinol 200mg)', subtitle: 'Mitochondrial ETC Booster', actionTab: 'profile-settings' },
  { id: '7', category: 'disease', title: 'Cardiovascular Remodeling Risk', subtitle: 'Current Risk: 3.2% (Low Risk)', actionTab: 'health-intelligence' },
  { id: '8', category: 'report', title: 'Comprehensive Bio-Twin & Genomic Summary', subtitle: 'Verified PDF • Downloadable', actionTab: 'insights-analytics' },
];

export const searchService = {
  async search(query: string): Promise<SearchResultItem[]> {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return mockSearchDatabase.filter(
      item => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }
};
