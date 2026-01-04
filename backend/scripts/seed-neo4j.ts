import fs from 'fs';
import path from 'path';
import neo4j from 'neo4j-driver';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct path to JSON file in the parent directory
const dataPath = path.resolve(__dirname, './concepts-seed.json');

if (!fs.existsSync(dataPath)) {
    console.error(`❌ Data file not found at: ${dataPath}`);
    process.exit(1);
}

const conceptsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
);

async function seed() {
  const session = driver.session();
  
  try {
    console.log('🌱 Seeding Neo4j...');
    
    // Clear existing
    await session.run('MATCH (n:Concept) DETACH DELETE n');
    console.log('✅ Cleared existing concepts');
    
    // Create concepts
    for (const concept of conceptsData.concepts) {
      await session.run(
        `CREATE (c:Concept {
          id: $id,
          name: $name,
          domain: $domain,
          difficulty: $difficulty,
          estimatedMinutes: $estimatedMinutes,
          description: $description,
          subtopics: $subtopics,
          createdAt: datetime()
        })`,
        {
          id: concept.id,
          name: concept.name,
          domain: concept.domain,
          difficulty: concept.difficulty,
          estimatedMinutes: concept.estimatedMinutes,
          description: concept.description,
          subtopics: concept.subtopics
        }
      );
    }
    console.log(`✅ Created ${conceptsData.concepts.length} concepts`);
    
    // Create prerequisites
    let prereqCount = 0;
    for (const concept of conceptsData.concepts) {
      if (concept.prerequisites && concept.prerequisites.length > 0) {
        for (const prereq of concept.prerequisites) {
          const prereqId = typeof prereq === 'string' ? prereq : prereq.conceptId;
          
          await session.run(
            `MATCH (target:Concept {id: $targetId})
             MATCH (source:Concept {id: $sourceId})
             CREATE (target)-[:REQUIRES]->(source)`,
            {
              targetId: concept.id,
              sourceId: prereqId
            }
          );
          prereqCount++;
        }
      }
    }
    console.log(`✅ Created ${prereqCount} prerequisite relationships`);
    
    // Verify Stats with explicit check for undefined
    const stats = await session.run(
      `MATCH (c:Concept)
       OPTIONAL MATCH (c)-[r:REQUIRES]->()
       RETURN count(DISTINCT c) as nodeCount, count(r) as relCount`
    );
    
    const record = stats.records[0];
    if (record) {
        console.log('\n📊 Graph Statistics:');
        console.log(`   Concepts: ${record.get('nodeCount').toNumber()}`);
        console.log(`   Prerequisites: ${record.get('relCount').toNumber()}`);
    }
    
    console.log('🎉 Seeding complete!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();