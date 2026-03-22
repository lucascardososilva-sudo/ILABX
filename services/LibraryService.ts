
import { Invention } from '../types';
import { MOCK_INVENTIONS } from '../constants';

const STORAGE_KEY = 'lab_inovacao_inventions';
const ACCESS_KEY = 'lab_inovacao_access';

export class LibraryService {
  private getStore(): Invention[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INVENTIONS));
      return MOCK_INVENTIONS;
    }
    return JSON.parse(stored);
  }

  public getInventions(): Invention[] {
    return this.getStore();
  }

  public addInvention(invention: Omit<Invention, 'id'>): Invention {
    const inventions = this.getStore();
    const newInv = {
      ...invention,
      id: Math.random().toString(36).substr(2, 9)
    };
    const updated = [newInv, ...inventions];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newInv;
  }

  public getAccessRequests(): Record<string, 'none' | 'pending' | 'approved'> {
    const stored = localStorage.getItem(ACCESS_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  public updateAccess(id: string, status: 'none' | 'pending' | 'approved') {
    const requests = this.getAccessRequests();
    requests[id] = status;
    localStorage.setItem(ACCESS_KEY, JSON.stringify(requests));
  }
}

export const libraryService = new LibraryService();
