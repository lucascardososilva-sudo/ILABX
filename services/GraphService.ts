import { MemoryNode, MemoryEdge, GraphContext } from '../types';

// Estrutura de armazenamento em memória:
// Cache[CompanyId][ScopeKey] -> { nodes, edges }
// ScopeKey pode ser "global", "squad_{id}" ou "user_{id}"
type GraphStore = {
  [companyId: string]: {
    [scopeKey: string]: {
      nodes: MemoryNode[];
      edges: MemoryEdge[];
    };
  };
};

// Mock Initial Data
const INITIAL_STORE: GraphStore = {
  'usp_lab': {
    'squad_alpha': {
      nodes: [
        { id: '1', label: 'PL 2338/2023', type: 'concept', createdAt: '2023-10-01', createdBy: 'ana', data: { summary: 'Marco Legal da IA' } },
        { id: '2', label: 'Visual Law Plugin', type: 'project', createdAt: '2023-10-05', createdBy: 'carlos', data: { status: 'Beta' } },
        { id: '3', label: 'Dra. Amanda', type: 'person', createdAt: '2023-01-01', createdBy: 'system' },
        { id: '4', label: 'Ética em IA', type: 'insight', createdAt: '2023-10-12', createdBy: 'ana', data: { note: 'Crucial para o módulo de auditoria' } }
      ],
      edges: [
        { id: 'e1', source: '3', target: '2', relationship: 'leads' },
        { id: 'e2', source: '2', target: '1', relationship: 'regulates' },
        { id: 'e3', source: '4', target: '1', relationship: 'relates_to' }
      ]
    },
    'user_amanda': {
      nodes: [
        { id: 'p1', label: 'Anotações Reunião Reitoria', type: 'document', createdAt: '2023-10-20', createdBy: 'amanda' }
      ],
      edges: []
    }
  }
};

class GraphMemoryService {
  private store: GraphStore = INITIAL_STORE;

  private getScopeKey(context: GraphContext): string {
    if (context.userId) return `user_${context.userId}`;
    if (context.squadId) return `squad_${context.squadId}`;
    return 'global';
  }

  private ensureStoreExists(companyId: string, scopeKey: string) {
    if (!this.store[companyId]) {
      this.store[companyId] = {};
    }
    if (!this.store[companyId][scopeKey]) {
      this.store[companyId][scopeKey] = { nodes: [], edges: [] };
    }
  }

  // Fetch memory merging scopes (e.g., View Squad memory + My Private Memory)
  // This simulates the "Graph Cache" retrieval
  public async getMemory(context: GraphContext, includePrivate: boolean = false): Promise<{ nodes: MemoryNode[], edges: MemoryEdge[] }> {
    // Simulate Network Latency
    await new Promise(resolve => setTimeout(resolve, 300));

    const companyData = this.store[context.companyId];
    if (!companyData) return { nodes: [], edges: [] };

    let nodes: MemoryNode[] = [];
    let edges: MemoryEdge[] = [];

    // 1. Fetch Squad/Context Memory
    if (context.squadId) {
      const squadKey = `squad_${context.squadId}`;
      if (companyData[squadKey]) {
        nodes = [...nodes, ...companyData[squadKey].nodes];
        edges = [...edges, ...companyData[squadKey].edges];
      }
    }

    // 2. Fetch User Private Memory (if requested)
    if (includePrivate && context.userId) {
      const userKey = `user_${context.userId}`;
      if (companyData[userKey]) {
        nodes = [...nodes, ...companyData[userKey].nodes];
        edges = [...edges, ...companyData[userKey].edges];
      }
    }

    // Remove duplicates (simple implementation)
    const uniqueNodes = Array.from(new Map(nodes.map(n => [n.id, n])).values());
    const uniqueEdges = Array.from(new Map(edges.map(e => [e.id, e])).values());

    return { nodes: uniqueNodes, edges: uniqueEdges };
  }

  public async addNode(context: GraphContext, node: Omit<MemoryNode, 'id' | 'createdAt'>): Promise<MemoryNode> {
    const scopeKey = this.getScopeKey(context);
    this.ensureStoreExists(context.companyId, scopeKey);

    const newNode: MemoryNode = {
      ...node,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };

    this.store[context.companyId][scopeKey].nodes.push(newNode);
    return newNode;
  }

  public async addEdge(context: GraphContext, edge: Omit<MemoryEdge, 'id'>): Promise<MemoryEdge> {
    const scopeKey = this.getScopeKey(context);
    this.ensureStoreExists(context.companyId, scopeKey);

    const newEdge: MemoryEdge = {
      ...edge,
      id: Math.random().toString(36).substr(2, 9)
    };

    this.store[context.companyId][scopeKey].edges.push(newEdge);
    return newEdge;
  }
}

export const graphService = new GraphMemoryService();