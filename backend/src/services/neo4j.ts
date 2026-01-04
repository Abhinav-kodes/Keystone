import neo4j, { type Driver, type Session, type Integer } from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

let driver: Driver | null = null;

export function getDriver(): Driver {
  if (!driver) {
    driver = neo4j.driver(
      process.env.NEO4J_URI!,
      neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
    );
  }
  return driver;
}

export function getSession(): Session {
  return getDriver().session();
}

export async function closeDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    driver = null;
  }
}

// ============================================
// TYPES
// ============================================

export interface Concept {
  id: string;
  name: string;
  domain: string;
  difficulty: number;
  estimatedMinutes: number;
  description: string;
  subtopics: string[];
  userState?: 'locked' | 'available' | 'in_progress' | 'mastered' | 'needs_revision';
  userScore?: number;
  lastAttemptAt?: string;
}

export interface Prerequisite {
  source: string;
  target: string;
  strength?: string;
  weight?: number;
  reasoning?: string;
}

export interface GraphData {
  concepts: Concept[];
  prerequisites: Prerequisite[];
}

// ============================================
// HELPERS
// ============================================

const toNum = (val: number | Integer | undefined | null): number => {
  if (val === undefined || val === null) return 0;
  return neo4j.isInt(val) ? val.toNumber() : val;
};

// Helper to map Neo4j properties to Concept interface
const mapNodeToConcept = (node: any): Concept => {
  const props = node.properties;
  return {
    id: props.id,
    name: props.name,
    domain: props.domain,
    difficulty: toNum(props.difficulty),
    estimatedMinutes: toNum(props.estimatedMinutes),
    description: props.description,
    subtopics: props.subtopics || [],
    userState: 'available'
  };
};

// ============================================
// QUERIES
// ============================================

export async function getAllConcepts(): Promise<GraphData> {
  const session = getSession();
  try {
    const conceptsResult = await session.run(`
      MATCH (c:Concept)
      RETURN c
      ORDER BY c.difficulty, c.domain, c.name
    `);
    
    const concepts = conceptsResult.records.map(record => mapNodeToConcept(record.get('c')));
    
    const prereqsResult = await session.run(`
      MATCH (source:Concept)-[r:REQUIRES]->(target:Concept)
      RETURN source.id as source, target.id as target, 
             r.strength as strength, r.weight as weight, r.reasoning as reasoning
    `);
    
    const prerequisites: Prerequisite[] = prereqsResult.records.map(record => ({
      source: record.get('source'),
      target: record.get('target'),
      strength: record.get('strength') || 'hard',
      weight: toNum(record.get('weight')) || 0.8,
      reasoning: record.get('reasoning') || ''
    }));
    
    return { concepts, prerequisites };
  } finally {
    await session.close();
  }
}

export async function getConceptById(conceptId: string): Promise<Concept | null> {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (c:Concept {id: $conceptId}) RETURN c`,
      { conceptId }
    );
    const record = result.records[0];
    return record ? mapNodeToConcept(record.get('c')) : null;
  } finally {
    await session.close();
  }
}

/**
 * FIXED: Exported missing member for Prerequisites
 */
export async function getConceptPrerequisites(conceptId: string): Promise<Concept[]> {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (c:Concept {id: $conceptId})-[:REQUIRES]->(prereq:Concept)
       RETURN prereq ORDER BY prereq.difficulty`,
      { conceptId }
    );
    return result.records.map(record => mapNodeToConcept(record.get('prereq')));
  } finally {
    await session.close();
  }
}

/**
 * FIXED: Exported missing member for Dependents
 */
export async function getConceptDependents(conceptId: string): Promise<Concept[]> {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (dependent:Concept)-[:REQUIRES]->(c:Concept {id: $conceptId})
       RETURN dependent ORDER BY dependent.difficulty`,
      { conceptId }
    );
    return result.records.map(record => mapNodeToConcept(record.get('dependent')));
  } finally {
    await session.close();
  }
}

export async function getGraphStats() {
  const session = getSession();
  try {
    const result = await session.run(`
      MATCH (c:Concept)
      OPTIONAL MATCH (c)-[r:REQUIRES]->()
      RETURN 
        count(DISTINCT c) as totalConcepts,
        count(r) as totalPrerequisites,
        count(DISTINCT c.domain) as totalDomains
    `);
    const record = result.records[0];
    if (!record) return { totalConcepts: 0, totalPrerequisites: 0, totalDomains: 0 };

    return {
      totalConcepts: toNum(record.get('totalConcepts')),
      totalPrerequisites: toNum(record.get('totalPrerequisites')),
      totalDomains: toNum(record.get('totalDomains'))
    };
  } finally {
    await session.close();
  }
}