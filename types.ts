export enum MaterialCategory {
  Natural = "Natural",
  SemiSynthetic = "Semi-Synthetic",
  Synthetic = "Synthetic"
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

export interface Brand {
  id: string;
  name: string;
  description: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  categories: string[]; // e.g., "Men", "Women", "Basics"
  primaryFabrics: string[];
  location: string;
  shipping: string;
  websiteUrl: string;
  imageUrl: string;
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
  compositionAnalysis: string;
  careInstructions?: string;
  explanation: string;
  fitVerdict?: string;
  sources?: Array<{ title: string; uri: string }>;
}

export type ViewState = 'brands' | 'dictionary' | 'checker';