import type { FastifyInstance, FastifyRequest } from 'fastify';
import {
  getAllConcepts,
  getConceptById,
  getConceptPrerequisites,
  getConceptDependents,
  getGraphStats
} from '../services/neo4j.js';

export default async function conceptRoutes(fastify: FastifyInstance) {
  
  // GET /api/concepts - Get all concepts with prerequisites
  fastify.get('/concepts', async (request, reply) => {
    try {
      const graphData = await getAllConcepts();
      
      return {
        success: true,
        data: graphData,
        meta: {
          conceptCount: graphData.concepts.length,
          prerequisiteCount: graphData.prerequisites.length
        }
      };
    } catch (error: any) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch concepts',
        message: error.message
      });
    }
  });
  
  // GET /api/concepts/:id - Get single concept
  fastify.get<{ Params: { id: string } }>(
    '/concepts/:id',
    async (request, reply) => {
      try {
        const { id } = request.params;
        const concept = await getConceptById(id);
        
        if (!concept) {
          return reply.status(404).send({
            success: false,
            error: 'Concept not found'
          });
        }
        
        // Get related data
        const prerequisites = await getConceptPrerequisites(id);
        const dependents = await getConceptDependents(id);
        
        return {
          success: true,
          data: {
            concept,
            prerequisites,
            dependents
          }
        };
      } catch (error: any) {
        fastify.log.error(error);
        return reply.status(500).send({
          success: false,
          error: 'Failed to fetch concept',
          message: error.message
        });
      }
    }
  );
  
  // GET /api/concepts/:id/prerequisites - Get prerequisites only
  fastify.get<{ Params: { id: string } }>(
    '/concepts/:id/prerequisites',
    async (request, reply) => {
      try {
        const { id } = request.params;
        const prerequisites = await getConceptPrerequisites(id);
        
        return {
          success: true,
          data: prerequisites
        };
      } catch (error: any) {
        fastify.log.error(error);
        return reply.status(500).send({
          success: false,
          error: 'Failed to fetch prerequisites',
          message: error.message
        });
      }
    }
  );
  
  // GET /api/concepts/:id/dependents - Get dependents only
  fastify.get<{ Params: { id: string } }>(
    '/concepts/:id/dependents',
    async (request, reply) => {
      try {
        const { id } = request.params;
        const dependents = await getConceptDependents(id);
        
        return {
          success: true,
          data: dependents
        };
      } catch (error: any) {
        fastify.log.error(error);
        return reply.status(500).send({
          success: false,
          error: 'Failed to fetch dependents',
          message: error.message
        });
      }
    }
  );
  
  // GET /api/stats - Get graph statistics
  fastify.get('/stats', async (request, reply) => {
    try {
      const stats = await getGraphStats();
      
      return {
        success: true,
        data: stats
      };
    } catch (error: any) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch stats',
        message: error.message
      });
    }
  });
}
