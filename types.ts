export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  companyId: string; // Multi-tenant root
  squadId: string;   // Squad context
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
}

export interface OKR {
  id: string;
  objective: string;
  keyResults: { id: string; title: string; progress: number }[];
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'article';
}

export interface Invention {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  ownerSquad: string;
  ownerSquadId: string; // To check permissions
  image?: string;
  links: {
    label: string;
    url: string;
  }[];
}

// --- Graph Memory Types ---

export type MemoryNodeType = 'concept' | 'person' | 'project' | 'document' | 'insight';

export interface MemoryNode {
  id: string;
  label: string;
  type: MemoryNodeType;
  data?: any; // Flexible payload (e.g., summary, snippets)
  createdAt: string;
  createdBy: string; // User ID
}

export interface MemoryEdge {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  relationship: string; // e.g., "created_by", "relates_to", "blocks"
}

export interface GraphContext {
  companyId: string;
  squadId?: string; // Optional: If null, might be company-wide public memory
  userId?: string;  // Optional: If present, is private user memory
}