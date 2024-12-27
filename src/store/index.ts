import { create } from 'zustand';
import { Company, Communication, CommunicationMethod } from '../types';
import { sampleCompanies, sampleCommunications } from './sampleData';

interface AppState {
  companies: Company[];
  communications: Communication[];
  communicationMethods: CommunicationMethod[];
  highlightOverrides: Record<string, boolean>;
  setCompanies: (companies: Company[]) => void;
  setCommunications: (communications: Communication[]) => void;
  setCommunicationMethods: (methods: CommunicationMethod[]) => void;
  addCompany: (company: Company) => void;
  updateCompany: (companyId: string, updates: Partial<Company>) => void;
  deleteCompany: (companyId: string) => void;
  addCommunication: (communication: Communication) => void;
  updateCommunicationMethod: (methodId: string, updates: Partial<CommunicationMethod>) => void;
  toggleHighlightOverride: (companyId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  companies: sampleCompanies,
  communications: sampleCommunications,
  communicationMethods: [
    {
      id: '1',
      name: 'LinkedIn Post',
      description: 'Post on company LinkedIn page',
      sequence: 1,
      isMandatory: true,
    },
    {
      id: '2',
      name: 'LinkedIn Message',
      description: 'Direct message on LinkedIn',
      sequence: 2,
      isMandatory: true,
    },
    {
      id: '3',
      name: 'Email',
      description: 'Email communication',
      sequence: 3,
      isMandatory: true,
    },
    {
      id: '4',
      name: 'Phone Call',
      description: 'Phone call communication',
      sequence: 4,
      isMandatory: true,
    },
    {
      id: '5',
      name: 'Other',
      description: 'Other forms of communication',
      sequence: 5,
      isMandatory: false,
    },
  ],
  highlightOverrides: {},
  setCompanies: (companies) => set({ companies }),
  setCommunications: (communications) => set({ communications }),
  setCommunicationMethods: (communicationMethods) => set({ communicationMethods }),
  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
  updateCompany: (companyId, updates) =>
    set((state) => ({
      companies: state.companies.map((company) =>
        company.id === companyId
          ? { ...company, ...updates, updatedAt: new Date().toISOString() }
          : company
      ),
    })),
  deleteCompany: (companyId) =>
    set((state) => ({
      companies: state.companies.filter((company) => company.id !== companyId),
      communications: state.communications.filter(
        (comm) => comm.companyId !== companyId
      ),
    })),
  addCommunication: (communication) =>
    set((state) => ({
      communications: [...state.communications, communication],
    })),
  updateCommunicationMethod: (methodId, updates) =>
    set((state) => ({
      communicationMethods: state.communicationMethods.map((method) =>
        method.id === methodId ? { ...method, ...updates } : method
      ),
    })),
  toggleHighlightOverride: (companyId) =>
    set((state) => ({
      highlightOverrides: {
        ...state.highlightOverrides,
        [companyId]: !state.highlightOverrides[companyId],
      },
    })),
}));