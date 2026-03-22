import React, { createContext, useContext, useState, useEffect } from 'react';
import { graphService } from '../services/GraphService';
import { MemoryNode, MemoryEdge, GraphContext, User } from '../types';

// Mock Current User (In a real app, this comes from AuthContext)
const MOCK_CURRENT_USER: User = {
  id: 'amanda',
  name: 'Dra. Amanda',
  role: 'Líder',
  avatar: 'https://picsum.photos/100/100',
  companyId: 'usp_lab',
  squadId: 'alpha'
};

interface MemoryContextType {
  nodes: MemoryNode[];
  edges: MemoryEdge[];
  isLoading: boolean;
  addConcept: (label: string, type: MemoryNode['type'], isPrivate?: boolean) => Promise<void>;
  connectConcepts: (sourceId: string, targetId: string, relationship: string) => Promise<void>;
  currentUser: User;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<MemoryNode[]>([]);
  const [edges, setEdges] = useState<MemoryEdge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = MOCK_CURRENT_USER;

  const refreshMemory = async () => {
    setIsLoading(true);
    try {
      // Load both Squad Memory and User Private Memory
      const context: GraphContext = {
        companyId: currentUser.companyId,
        squadId: currentUser.squadId,
        userId: currentUser.id
      };
      
      const data = await graphService.getMemory(context, true);
      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (error) {
      console.error("Failed to load memory graph", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshMemory();
  }, []);

  const addConcept = async (label: string, type: MemoryNode['type'], isPrivate: boolean = false) => {
    const context: GraphContext = {
      companyId: currentUser.companyId,
      squadId: isPrivate ? undefined : currentUser.squadId,
      userId: isPrivate ? currentUser.id : undefined
    };

    await graphService.addNode(context, {
      label,
      type,
      createdBy: currentUser.id
    });
    await refreshMemory();
  };

  const connectConcepts = async (sourceId: string, targetId: string, relationship: string) => {
    const context: GraphContext = {
      companyId: currentUser.companyId,
      squadId: currentUser.squadId // Connections usually happen in the squad context
    };

    await graphService.addEdge(context, { source: sourceId, target: targetId, relationship });
    await refreshMemory();
  };

  return (
    <MemoryContext.Provider value={{ nodes, edges, isLoading, addConcept, connectConcepts, currentUser }}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};