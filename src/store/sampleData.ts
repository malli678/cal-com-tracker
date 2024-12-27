import { Company, Communication } from '../types';

export const sampleCompanies: Company[] = [
  {
    id: '1',
    name: 'InnovateTech Inc.',
    location: 'New York, NY',
    linkedinProfile: 'https://linkedin.com/company/innovatetech',
    emails: ['hello@innovatetech.com', 'support@innovatetech.com'],
    phoneNumbers: ['+1-212-555-0198', '+1-212-555-0199'],
    comments: 'Focus on AI-driven solutions',
    communicationPeriodicity: 10,
    createdAt: '2023-12-01T09:00:00Z',
    updatedAt: '2024-01-15T16:00:00Z',
  },
  {
    id: '2',
    name: 'EcoWorld Systems',
    location: 'Berlin, Germany',
    linkedinProfile: 'https://linkedin.com/company/ecoworld',
    emails: ['contact@ecoworld.com', 'info@ecoworld.com'],
    phoneNumbers: ['+49-30-9876-5432'],
    comments: 'Exploring renewable energy projects',
    communicationPeriodicity: 20,
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-02-05T14:45:00Z',
  },
  {
    id: '3',
    name: 'NextGen Technologies',
    location: 'Sydney, Australia',
    linkedinProfile: 'https://linkedin.com/company/nextgen',
    emails: ['admin@nextgen.com.au'],
    phoneNumbers: ['+61-2-8765-4321'],
    comments: 'Interest in tech innovation partnerships',
    communicationPeriodicity: 15,
    createdAt: '2023-11-25T12:15:00Z',
    updatedAt: '2024-01-30T13:30:00Z',
  },
  {
    id: '4',
    name: 'BrightPath Enterprises',
    location: 'Austin, TX',
    linkedinProfile: 'https://linkedin.com/company/brightpath',
    emails: ['info@brightpath.com', 'hr@brightpath.com'],
    phoneNumbers: ['+1-512-555-1234', '+1-512-555-5678'],
    comments: 'Active in educational technology and training solutions',
    communicationPeriodicity: 14,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-12-24T15:00:00Z',
  },
  {
    id: '5',
    name: 'Zenith Health Solutions',
    location: 'Singapore',
    linkedinProfile: 'https://linkedin.com/company/zenithhealth',
    emails: ['support@zenithhealth.com', 'partnerships@zenithhealth.com'],
    phoneNumbers: ['+65-6223-4567'],
    comments: 'Healthcare software provider specializing in AI diagnostics',
    communicationPeriodicity: 10,
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-12-22T13:45:00Z',
  },
  {
    id: '6',
    name: 'Alpha Robotics',
    location: 'Tokyo, Japan',
    linkedinProfile: 'https://linkedin.com/company/alpharobotics',
    emails: ['inquiries@alpharobotics.jp', 'sales@alpharobotics.jp'],
    phoneNumbers: ['+81-3-1234-5678'],
    comments: 'Pioneers in autonomous robotics solutions',
    communicationPeriodicity: 12,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-12-26T00:00:00Z',
  },
  {
    id: '7',
    name: 'GreenFuture Solutions',
    location: 'Vancouver, Canada',
    linkedinProfile: 'https://linkedin.com/company/greenfuture',
    emails: ['hello@greenfuture.ca', 'support@greenfuture.ca'],
    phoneNumbers: ['+1-604-555-7890', '+1-604-555-7891'],
    comments: 'Innovating sustainable energy technologies',
    communicationPeriodicity: 18,
    createdAt: '2024-03-01T09:30:00Z',
    updatedAt: '2024-12-26T00:00:00Z',
  }
  
];

export const sampleCommunications: Communication[] = [
  {
    id: '1',
    companyId: '1',
    methodId: '1',
    date: '2024-01-05T10:00:00Z',
    notes: 'Discussed potential AI collaboration',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
  {
    id: '2',
    companyId: '1',
    methodId: '2',
    date: '2024-01-15T14:30:00Z',
    notes: 'Follow-up meeting on project scope',
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
  },
  {
    id: '3',
    companyId: '2',
    methodId: '3',
    date: '2024-02-01T09:00:00Z',
    notes: 'Sent proposal for joint green initiative',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z',
  },
  {
    id: '4',
    companyId: '2',
    methodId: '4',
    date: '2024-02-05T16:00:00Z',
    notes: 'Call to finalize renewable project details',
    createdAt: '2024-02-05T16:00:00Z',
    updatedAt: '2024-02-05T16:00:00Z',
  },
  {
    id: '5',
    companyId: '3',
    methodId: '1',
    date: '2024-01-20T11:00:00Z',
    notes: 'Shared latest tech trends in email campaign',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z',
  },
  {
    id: '6',
    companyId: '4',
    methodId: '4',
    date: '2025-01-05T16:00:00Z',
    notes: 'Call to finalize renewable project details',
    createdAt: '2024-02-05T16:00:00Z',
    updatedAt: '2024-02-05T16:00:00Z',
  },
  {
    id: '7',
    companyId: '5',
    methodId: '1',
    date: '2025-02-20T11:00:00Z',
    notes: 'Shared latest tech trends in email campaign',
    createdAt: '2024-11-20T11:00:00Z',
    updatedAt: '2024-11-20T11:00:00Z',
  },
];
