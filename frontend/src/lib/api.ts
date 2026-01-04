const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  // Concepts
  getConcepts: async () => {
    const res = await fetch(`${API_URL}/api/concepts`);
    return res.json();
  },
  
  getConceptById: async (id: string) => {
    const res = await fetch(`${API_URL}/api/concepts/${id}`);
    return res.json();
  },
  
  // Tests
  startTest: async (conceptId: string, mode: string) => {
    const res = await fetch(`${API_URL}/api/test/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conceptId, mode })
    });
    return res.json();
  },
  
  // ... more API calls
};
