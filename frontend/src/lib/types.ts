// ============================================
// CONCEPT & GRAPH TYPES
// ============================================

export type UserState = 'locked' | 'available' | 'in_progress' | 'mastered' | 'needs_revision';

export interface Concept {
  id: string;
  name: string;
  domain: string;
  difficulty: number;
  estimatedMinutes: number;
  description: string;
  subtopics: string[];
  // User progress
  userState?: UserState;
  userScore?: number;
  lastAttemptAt?: string;
}

export interface Prerequisite {
  source: string;  // Concept ID that requires
  target: string;  // Concept ID that is required
  strength?: 'hard' | 'soft';
  weight?: number;
  reasoning?: string;
}

export interface GraphData {
  concepts: Concept[];
  prerequisites: Prerequisite[];
}

export interface ConceptDetails {
  concept: Concept;
  prerequisites: Concept[];
  dependents: Concept[];
}

// ============================================
// GRAPH VISUALIZATION TYPES
// ============================================

export interface GraphNode {
  id: string;
  name: string;
  domain: string;
  difficulty: number;
  estimatedMinutes: number;
  userState: UserState;
  color?: string;
  size?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  strength?: string;
  weight?: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * FIXED: Replaced 'any' with Record<string, unknown> 
 * to satisfy @typescript-eslint/no-explicit-any
 */
export interface APIResponse<T> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>; 
  error?: string;
  message?: string;
}

export interface GraphStats {
  totalConcepts: number;
  totalPrerequisites: number;
  totalDomains: number;
}