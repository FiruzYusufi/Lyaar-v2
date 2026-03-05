export type ServiceType = 'website' | 'crm' | 'telegram' | 'design' | 'marketing';

export interface Service {
  id: ServiceType;
  title: string;
  description: string;
  basePrice: number;
  icon: string;
}

export interface ProjectConfig {
  selectedServices: ServiceType[];
  complexity: 'simple' | 'medium' | 'high';
  timeline: 'fast' | 'standard' | 'relaxed';
}

export interface Recommendation {
  title: string;
  description: string;
  services: ServiceType[];
}
