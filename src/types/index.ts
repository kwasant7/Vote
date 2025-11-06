export interface Election {
  id: string;
  name: string;
  date: string;
  type: 'past' | 'current' | 'future';
}

export interface UserAddress {
  street: string;
  city: string;
  zipCode: string;
  state: string;
  legislativeDistrict?: string;
  congressionalDistrict?: string;
  schoolDistrict?: string;
  countyCouncilDistrict?: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  position: string;
  level: CandidateLevel;
  bio: string;
  website?: string;
  email?: string;
  phone?: string;
  photo?: string;
  policies: Policy[];
}

export type CandidateLevel =
  | 'state'
  | 'county'
  | 'city'
  | 'port'
  | 'school'
  | 'special';

export interface Policy {
  category: string;
  position: string;
  details: string;
}

export interface QuizQuestion {
  id: string;
  level: CandidateLevel;
  category: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  weight: number;
}

export interface QuizResult {
  candidateId: string;
  candidateName: string;
  matchPercentage: number;
  matchedPolicies: string[];
}

export type Language = 'en' | 'ko' | 'es';
