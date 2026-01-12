
export enum MaterialCategory {
  Natural = "Natural",
  SemiSynthetic = "Semi-Synthetic",
  Synthetic = "Synthetic"
}

// Added missing Brand interface
export interface Brand {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  categories: string[];
  primaryFabrics: string[];
  location: string;
  shipping: string;
  websiteUrl: string;
  imageUrl: string;
}

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  sustainabilityRating: 'A' | 'B' | 'C' | 'D' | 'F';
  description: string;
  pros: string[];
  cons: string[];
  careInstructions: string[];
  ecoImpact: string;
}

export interface FitCheckConfig {
  includeFitCheck: boolean;
  height?: string;
  weight?: string;
  desiredSize: string;
  waist?: string;
  bustChest?: string;
  inseam?: string;
  hips?: string;
}

export interface GradeResult {
  productName?: string;
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  composition: Array<{ material: string; percentage: number; color: 'green' | 'yellow' | 'red' }>;
  environmentalImpact: {
    positives: string[];
    negatives: string[];
  };
  careInstructions?: string;
  fitVerdict?: string;
  sources?: Array<{ title: string; uri: string }>;
  timestamp?: number;
}

export type ViewState = 'lifecycle' | 'dictionary' | 'checker';