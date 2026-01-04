// 1. CLEAR DATABASE (Use with caution!)
MATCH (n) DETACH DELETE n;

// 2. CREATE CONCEPTS
CREATE 
(v:Concept {id: 'js-variables-scope', name: 'Variables & Scope', domain: 'javascript', difficulty: 1, time: 30}),
(t:Concept {id: 'js-data-types', name: 'Data Types', domain: 'javascript', difficulty: 1, time: 30}),
(f:Concept {id: 'js-functions', name: 'Functions', domain: 'javascript', difficulty: 2, time: 45}),
(c:Concept {id: 'js-closures', name: 'Closures', domain: 'javascript', difficulty: 3, time: 60}),
(tb:Concept {id: 'js-this-binding', name: 'this & Binding', domain: 'javascript', difficulty: 3, time: 60}),
(a:Concept {id: 'js-arrays', name: 'Arrays & Methods', domain: 'javascript', difficulty: 2, time: 45}),
(o:Concept {id: 'js-objects', name: 'Objects & Prototypes', domain: 'javascript', difficulty: 3, time: 60}),
(as:Concept {id: 'js-async-basics', name: 'Asynchronous Basics', domain: 'javascript', difficulty: 3, time: 60}),
(pr:Concept {id: 'js-promises', name: 'Promises', domain: 'javascript', difficulty: 4, time: 75}),
(aa:Concept {id: 'js-async-await', name: 'Async/Await', domain: 'javascript', difficulty: 4, time: 60}),
(db:Concept {id: 'dom-basics', name: 'DOM Fundamentals', domain: 'javascript', difficulty: 2, time: 45}),
(de:Concept {id: 'dom-events', name: 'Event Handling', domain: 'javascript', difficulty: 3, time: 60}),
(fa:Concept {id: 'fetch-api', name: 'Fetch API', domain: 'javascript', difficulty: 3, time: 45}),
(ls:Concept {id: 'local-storage', name: 'Browser Storage', domain: 'javascript', difficulty: 2, time: 30}),
(em:Concept {id: 'es6-modules', name: 'ES6 Modules', domain: 'javascript', difficulty: 2, time: 30}),
(jsx:Concept {id: 'react-jsx', name: 'JSX Syntax', domain: 'react', difficulty: 2, time: 30}),
(rc:Concept {id: 'react-components', name: 'Components', domain: 'react', difficulty: 2, time: 45}),
(rs:Concept {id: 'react-state', name: 'State (useState)', domain: 'react', difficulty: 3, time: 60}),
(re:Concept {id: 'react-effects', name: 'Effects (useEffect)', domain: 'react', difficulty: 4, time: 75}),
(rev:Concept {id: 'react-events', name: 'React Events', domain: 'react', difficulty: 2, time: 30}),
(rl:Concept {id: 'react-lists', name: 'Lists & Keys', domain: 'react', difficulty: 3, time: 45}),
(rf:Concept {id: 'react-forms', name: 'Forms', domain: 'react', difficulty: 3, time: 60}),
(rco:Concept {id: 'react-conditional', name: 'Conditional Rendering', domain: 'react', difficulty: 2, time: 30}),
(rctx:Concept {id: 'react-context', name: 'Context API', domain: 'react', difficulty: 4, time: 75}),
(rr:Concept {id: 'react-reducer', name: 'useReducer', domain: 'react', difficulty: 4, time: 75}),
(ref:Concept {id: 'react-refs', name: 'Refs (useRef)', domain: 'react', difficulty: 3, time: 45}),
(rm:Concept {id: 'react-memo', name: 'Memoization', domain: 'react', difficulty: 4, time: 60}),
(rch:Concept {id: 'react-custom-hooks', name: 'Custom Hooks', domain: 'react', difficulty: 4, time: 75}),
(rlc:Concept {id: 'react-lifecycle', name: 'Lifecycle', domain: 'react', difficulty: 3, time: 60}),
(reb:Concept {id: 'react-error-boundaries', name: 'Error Boundaries', domain: 'react', difficulty: 3, time: 45}),
(rp:Concept {id: 'react-portals', name: 'Portals', domain: 'react', difficulty: 3, time: 30}),
(rdf:Concept {id: 'react-data-fetching', name: 'Data Fetching', domain: 'react', difficulty: 4, time: 75}),
(rsusp:Concept {id: 'react-suspense', name: 'Suspense & Lazy', domain: 'react', difficulty: 4, time: 60}),
(rqb:Concept {id: 'react-query-basics', name: 'React Query', domain: 'react', difficulty: 4, time: 90}),
(rmu:Concept {id: 'react-mutations', name: 'Mutations', domain: 'react', difficulty: 5, time: 90}),
(rrt:Concept {id: 'react-router', name: 'React Router', domain: 'react', difficulty: 3, time: 75}),
(rsm:Concept {id: 'react-state-management', name: 'State Management', domain: 'react', difficulty: 5, time: 90}),
(rperf:Concept {id: 'react-performance', name: 'Performance', domain: 'react', difficulty: 5, time: 90});

// 3. CREATE PREREQUISITE RELATIONSHIPS
MATCH (v:Concept {id: 'js-variables-scope'}), (t:Concept {id: 'js-data-types'}) CREATE (t)-[:PREREQUISITE]->(v);
MATCH (v:Concept {id: 'js-variables-scope'}), (f:Concept {id: 'js-functions'}) CREATE (f)-[:PREREQUISITE]->(v);
MATCH (f:Concept {id: 'js-functions'}), (c:Concept {id: 'js-closures'}) CREATE (c)-[:PREREQUISITE]->(f);
MATCH (f:Concept {id: 'js-functions'}), (tb:Concept {id: 'js-this-binding'}) CREATE (tb)-[:PREREQUISITE]->(f);
MATCH (f:Concept {id: 'js-functions'}), (a:Concept {id: 'js-arrays'}) CREATE (a)-[:PREREQUISITE]->(f);
MATCH (f:Concept {id: 'js-functions'}), (o:Concept {id: 'js-objects'}) CREATE (o)-[:PREREQUISITE]->(f);
MATCH (c:Concept {id: 'js-closures'}), (as:Concept {id: 'js-async-basics'}) CREATE (as)-[:PREREQUISITE]->(c);
MATCH (as:Concept {id: 'js-async-basics'}), (pr:Concept {id: 'js-promises'}) CREATE (pr)-[:PREREQUISITE]->(as);
MATCH (pr:Concept {id: 'js-promises'}), (aa:Concept {id: 'js-async-await'}) CREATE (aa)-[:PREREQUISITE]->(pr);
MATCH (o:Concept {id: 'js-objects'}), (db:Concept {id: 'dom-basics'}) CREATE (db)-[:PREREQUISITE]->(o);
MATCH (db:Concept {id: 'dom-basics'}), (de:Concept {id: 'dom-events'}) CREATE (de)-[:PREREQUISITE]->(db);
MATCH (aa:Concept {id: 'js-async-await'}), (fa:Concept {id: 'fetch-api'}) CREATE (fa)-[:PREREQUISITE]->(aa);
MATCH (db:Concept {id: 'dom-basics'}), (ls:Concept {id: 'local-storage'}) CREATE (ls)-[:PREREQUISITE]->(db);
MATCH (f:Concept {id: 'js-functions'}), (em:Concept {id: 'es6-modules'}) CREATE (em)-[:PREREQUISITE]->(f);
MATCH (db:Concept {id: 'dom-basics'}), (jsx:Concept {id: 'react-jsx'}) CREATE (jsx)-[:PREREQUISITE]->(db);
MATCH (jsx:Concept {id: 'react-jsx'}), (rc:Concept {id: 'react-components'}) CREATE (rc)-[:PREREQUISITE]->(jsx);
MATCH (rc:Concept {id: 'react-components'}), (rs:Concept {id: 'react-state'}) CREATE (rs)-[:PREREQUISITE]->(rc);
MATCH (rs:Concept {id: 'react-state'}), (re:Concept {id: 'react-effects'}) CREATE (re)-[:PREREQUISITE]->(rs);
MATCH (de:Concept {id: 'dom-events'}), (rev:Concept {id: 'react-events'}) CREATE (rev)-[:PREREQUISITE]->(de);
MATCH (a:Concept {id: 'js-arrays'}), (rl:Concept {id: 'react-lists'}) CREATE (rl)-[:PREREQUISITE]->(a);
MATCH (rs:Concept {id: 'react-state'}), (rf:Concept {id: 'react-forms'}) CREATE (rf)-[:PREREQUISITE]->(rs);
MATCH (jsx:Concept {id: 'react-jsx'}), (rco:Concept {id: 'react-conditional'}) CREATE (rco)-[:PREREQUISITE]->(jsx);
MATCH (rs:Concept {id: 'react-state'}), (rctx:Concept {id: 'react-context'}) CREATE (rctx)-[:PREREQUISITE]->(rs);
MATCH (rs:Concept {id: 'react-state'}), (rr:Concept {id: 'react-reducer'}) CREATE (rr)-[:PREREQUISITE]->(rs);
MATCH (re:Concept {id: 'react-effects'}), (ref:Concept {id: 'react-refs'}) CREATE (ref)-[:PREREQUISITE]->(re);
MATCH (re:Concept {id: 'react-effects'}), (rm:Concept {id: 'react-memo'}) CREATE (rm)-[:PREREQUISITE]->(re);
MATCH (re:Concept {id: 'react-effects'}), (rch:Concept {id: 'react-custom-hooks'}) CREATE (rch)-[:PREREQUISITE]->(re);
MATCH (re:Concept {id: 'react-effects'}), (rlc:Concept {id: 'react-lifecycle'}) CREATE (rlc)-[:PREREQUISITE]->(re);
MATCH (rlc:Concept {id: 'react-lifecycle'}), (reb:Concept {id: 'react-error-boundaries'}) CREATE (reb)-[:PREREQUISITE]->(rlc);
MATCH (db:Concept {id: 'dom-basics'}), (rp:Concept {id: 'react-portals'}) CREATE (rp)-[:PREREQUISITE]->(db);
MATCH (fa:Concept {id: 'fetch-api'}), (rdf:Concept {id: 'react-data-fetching'}) CREATE (rdf)-[:PREREQUISITE]->(fa);
MATCH (em:Concept {id: 'es6-modules'}), (rsusp:Concept {id: 'react-suspense'}) CREATE (rsusp)-[:PREREQUISITE]->(em);
MATCH (rdf:Concept {id: 'react-data-fetching'}), (rqb:Concept {id: 'react-query-basics'}) CREATE (rqb)-[:PREREQUISITE]->(rdf);
MATCH (rqb:Concept {id: 'react-query-basics'}), (rmu:Concept {id: 'react-mutations'}) CREATE (rmu)-[:PREREQUISITE]->(rqb);
MATCH (rc:Concept {id: 'react-components'}), (rrt:Concept {id: 'react-router'}) CREATE (rrt)-[:PREREQUISITE]->(rc);
MATCH (rr:Concept {id: 'react-reducer'}), (rsm:Concept {id: 'react-state-management'}) CREATE (rsm)-[:PREREQUISITE]->(rr);
MATCH (rm:Concept {id: 'react-memo'}), (rperf:Concept {id: 'react-performance'}) CREATE (rperf)-[:PREREQUISITE]->(rm);