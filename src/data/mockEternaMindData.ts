export interface CognitiveDNATrait {
  category: string;
  trait: string;
  description: string;
  confidence: number;
  sourcesCount: number;
  examples: string[];
}

export interface LifeEvent {
  id: string;
  title: string;
  date: string;
  year: number;
  category: 'career' | 'family' | 'crisis' | 'wisdom' | 'innovation';
  people: string[];
  location: string;
  emotions: string[];
  lessonLearned: string;
  impactOnLaterChoices: string;
  hasAudio: boolean;
  hasMedia: boolean;
  verificationHash: string;
}

export interface TimeCapsule {
  id: string;
  title: string;
  targetEvent: string;
  recipient: string;
  scheduledUnlock: string;
  status: 'locked' | 'unlocked' | 'scheduled';
  summary: string;
  letterExcerpt: string;
  keyAdvice: string;
  hasVideo: boolean;
  hasVoice: boolean;
}

export interface GenNode {
  id: string;
  name: string;
  relation: string;
  era: string;
  avatar: string;
  expertise: string[];
  lifeLessons: string[];
  storiesCount: number;
  documentsCount: number;
  color: string;
}

export interface EducationalSimulation {
  id: string;
  title: string;
  historicalContext: string;
  keyChallenge: string;
  preservedApproach: string;
  educationalTakeaway: string;
  verifiedSourceCount: number;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  author: string;
  action: string;
  verificationStatus: 'verified' | 'pending' | 'encrypted';
  permissionLevel: 'Private' | 'Family Only' | 'Public Legacy';
  hash: string;
}

export const mockEternaMindData = {
  legacyScore: 88,
  knowledgeCompleteness: 92,
  timelineProgress: 48,
  expertiseDomainsCount: 6,
  familyConnectionsCount: 14,
  contributionCount: 342,
  aiMentorReadiness: 94,

  cognitiveDNA: [
    {
      category: 'Communication Style',
      trait: 'Structured Storyteller & Socratic Mentor',
      description: 'Prefers explaining complex technical or strategic ideas through first-principles analogies and guided questions.',
      confidence: 96,
      sourcesCount: 42,
      examples: [
        'Uses physical metaphors when explaining software architecture',
        'Emphasizes active listening prior to providing strategic directives'
      ]
    },
    {
      category: 'Problem Solving Approach',
      trait: 'First-Principles Deconstruction',
      description: 'Breaks multi-variable high-stress challenges into fundamental axioms before evaluating potential tradeoffs.',
      confidence: 98,
      sourcesCount: 58,
      examples: [
        'Maintains calm risk matrix during 2021 platform outage',
        'Separates emotional noise from core data constraints'
      ]
    },
    {
      category: 'Core Values',
      trait: 'Intellectual Integrity & Generational Mentorship',
      description: 'Prioritizes truth over ego, continuous learning, and building systems that outlast individual tenure.',
      confidence: 99,
      sourcesCount: 84,
      examples: [
        'Always credits junior team members for breakthrough ideas',
        'Advocates long-term bio-security and ethical AI oversight'
      ]
    },
    {
      category: 'Professional Expertise',
      trait: 'Medical Systems AI & Bio-Twin Architecture',
      description: '20+ years in distributed systems, real-time bio-telemetry, and predictive clinical risk modeling.',
      confidence: 97,
      sourcesCount: 110,
      examples: [
        'Architected real-time sub-millisecond trauma routing network',
        'Published 14 peer-reviewed papers on sub-cellular digital twin modeling'
      ]
    },
    {
      category: 'Leadership Style',
      trait: 'Empowerment-by-Trust',
      description: 'Grants high autonomy to team members while maintaining clear strategic alignment and psychological safety.',
      confidence: 95,
      sourcesCount: 38,
      examples: [
        'Encourages post-mortem blameless reviews',
        'Fosters cross-disciplinary innovation across biology and AI'
      ]
    }
  ] as CognitiveDNATrait[],

  lifeTimeline: [
    {
      id: 'e1',
      title: 'Founding of First Bio-Tech AI Lab',
      date: 'March 14, 2018',
      year: 2018,
      category: 'innovation',
      people: ['Dr. Sarah Lin', 'Marcus Vance'],
      location: 'Cambridge, MA',
      emotions: ['Exhilarated', 'Determined', 'Anxious'],
      lessonLearned: 'Building long-term impact requires prioritizing deep technical truth over short-term market hype.',
      impactOnLaterChoices: 'Directly led to founding MEDVERSE-X with zero compromise on clinical validation rigor.',
      hasAudio: true,
      hasMedia: true,
      verificationHash: '0x8f9a2b1c4e...'
    },
    {
      id: 'e2',
      title: 'Navigating High-Stress System Crisis',
      date: 'November 2, 2021',
      year: 2021,
      category: 'crisis',
      people: ['Engineering Task Force'],
      location: 'San Francisco, CA',
      emotions: ['Focused', 'Calm under pressure'],
      lessonLearned: 'In acute crises, focus on stabilizing core safety channels first; clear communication beats fast panic.',
      impactOnLaterChoices: 'Created the sub-millisecond Hermes Emergency Mode watchdog system.',
      hasAudio: true,
      hasMedia: false,
      verificationHash: '0x3d7e9f2a8b...'
    },
    {
      id: 'e3',
      title: 'Birth of Daughter (Maya Vance)',
      date: 'August 19, 2023',
      year: 2023,
      category: 'family',
      people: ['Elena Vance', 'Baby Maya'],
      location: 'Boston, MA',
      emotions: ['Profound Joy', 'Humility', 'Perspective Shift'],
      lessonLearned: 'Legacy is not what you hoard, but what you cultivate in the minds and hearts of those who follow.',
      impactOnLaterChoices: 'Initiated the EternaMind X Cognitive Legacy platform project.',
      hasAudio: true,
      hasMedia: true,
      verificationHash: '0x1c4e8f9a2b...'
    }
  ] as LifeEvent[],

  timeCapsules: [
    {
      id: 'tc1',
      title: 'Message to Maya on her 18th Birthday',
      targetEvent: 'Maya 18th Birthday',
      recipient: 'Maya Vance',
      scheduledUnlock: 'August 19, 2041',
      status: 'scheduled',
      summary: 'Personal reflections on curiosity, choosing a meaningful career, and embracing failure as growth.',
      letterExcerpt: 'My dearest Maya, when you open this, you will be standing on the cusp of adulthood. Never let fear of failure overshadow your native wonder...',
      keyAdvice: 'Seek problems worth solving rather than titles worth chasing.',
      hasVideo: true,
      hasVoice: true
    },
    {
      id: 'tc2',
      title: 'Guidance for First Leadership Role',
      targetEvent: 'First Team Management Promotion',
      recipient: 'Next Generation Engineers',
      scheduledUnlock: 'On Career Promotion Event',
      status: 'scheduled',
      summary: 'Core principles on leading with empathy, building blameless culture, and shielding your team.',
      letterExcerpt: 'Great leadership is about creating an environment where brilliant minds feel safe to take calculated risks...',
      keyAdvice: 'Listen twice as much as you speak in your first 90 days as leader.',
      hasVideo: false,
      hasVoice: true
    }
  ] as TimeCapsule[],

  multiGenNodes: [
    {
      id: 'gen1',
      name: 'Arthur Vance',
      relation: 'Great Grandfather (1928 - 2004)',
      era: '1928 - 2004',
      avatar: '👨‍🦳',
      expertise: ['Civil Engineering', 'Bridge Architecture', 'Community Mentorship'],
      lifeLessons: ['Build structures to withstand 100-year floods.', 'Integrity in material quality is non-negotiable.'],
      storiesCount: 14,
      documentsCount: 22,
      color: '#7C3AED'
    },
    {
      id: 'gen2',
      name: 'David Vance',
      relation: 'Grandfather (1954 - 2022)',
      era: '1954 - 2022',
      avatar: '👴',
      expertise: ['Financial Stewardship', 'Crisis Management', 'Woodworking'],
      lifeLessons: ['Save during abundance to provide during scarcity.', 'Patience produces fine craftsmanship.'],
      storiesCount: 28,
      documentsCount: 45,
      color: '#38BDF8'
    },
    {
      id: 'gen3',
      name: 'Dr. Robert Vance',
      relation: 'Father (1980 - Present)',
      era: '1980 - Present',
      avatar: '👨‍⚕️',
      expertise: ['Cardiovascular Surgery', 'Clinical Ethics', 'Medical Education'],
      lifeLessons: ['The patient in front of you is someone’s entire world.', 'Calm hands stem from thorough preparation.'],
      storiesCount: 36,
      documentsCount: 68,
      color: '#00FFB2'
    },
    {
      id: 'gen4',
      name: 'Dr. Alex Vance',
      relation: 'Current User (1992 - Present)',
      era: 'Current Baseline',
      avatar: '🧬',
      expertise: ['Medical AI Systems', 'Digital Twin Physics', 'Cognitive Legacy'],
      lifeLessons: ['Predictive intelligence must serve human longevity and dignity.'],
      storiesCount: 48,
      documentsCount: 110,
      color: '#00E5FF'
    },
    {
      id: 'gen5',
      name: 'Maya & Next Generation',
      relation: 'Children / Future Heirs',
      era: 'Future Generation',
      avatar: '👧',
      expertise: ['Future Inheritors of Cognitive Legacy'],
      lifeLessons: ['Ready to learn from preserved multi-generational wisdom.'],
      storiesCount: 0,
      documentsCount: 0,
      color: '#F43F5E'
    }
  ] as GenNode[],

  simulations: [
    {
      id: 'sim1',
      title: 'Handling a Major Financial Market Downturn',
      historicalContext: 'Grandfather David Vance during the 1987 Black Monday market crash.',
      keyChallenge: 'Severe liquidity crunch and panic across regional business networks.',
      preservedApproach: 'Maintained zero-panic policy, restructured short-term debt, and preserved core employee payroll.',
      educationalTakeaway: 'Cash reserves and transparent communication prevent temporary market panic from turning into operational failure.',
      verifiedSourceCount: 18
    },
    {
      id: 'sim2',
      title: 'Managing Work-Life Balance During Startup Launch',
      historicalContext: 'Dr. Alex Vance during the 2018 MEDVERSE-X initial pilot run.',
      keyChallenge: 'Working 80-hour weeks while maintaining physical health and family presence.',
      preservedApproach: 'Scheduled non-negotiable family dinner blocks and maintained Zone-2 cardio morning sessions.',
      educationalTakeaway: 'Protecting health and family anchors enhances high-cognitive output productivity.',
      verifiedSourceCount: 24
    }
  ] as EducationalSimulation[],

  auditTrail: [
    {
      id: 'a1',
      timestamp: '2026-07-24 11:42:04',
      author: 'Dr. Alex Vance (Self)',
      action: 'Added Life Event: Founding of Bio-Tech AI Lab',
      verificationStatus: 'verified',
      permissionLevel: 'Family Only',
      hash: '0x8f9a2b1c4e5d6a7b8c9d0e1f'
    },
    {
      id: 'a2',
      timestamp: '2026-07-24 10:15:22',
      author: 'Dr. Alex Vance (Self)',
      action: 'Configured Time Capsule: Message to Maya 18th Birthday',
      verificationStatus: 'encrypted',
      permissionLevel: 'Private',
      hash: '0x3d7e9f2a8b1c4e5d6a7b8c9d'
    },
    {
      id: 'a3',
      timestamp: '2026-07-23 16:30:00',
      author: 'Dr. Robert Vance (Father)',
      action: 'Contributed Audio Memory: Surgical Residency Lessons',
      verificationStatus: 'verified',
      permissionLevel: 'Public Legacy',
      hash: '0x1c4e8f9a2b5d6a7b8c9d0e1f'
    }
  ] as AuditRecord[]
};
