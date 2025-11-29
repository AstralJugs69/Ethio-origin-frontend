export interface Farmer {
  id: string;
  name: string;
  region: string;
  elevation: string;
  gps: string;
  walletAddress: string;
}

export interface Batch {
  id: string;
  policyId?: string;
  assetName?: string;
  farmer: Farmer;
  cropType: 'coffee' | 'tea' | 'flowers';
  variety: string;
  initialWeight: number;
  currentWeight?: number;
  location: string;
  harvestDate: string;
  status: 'harvested' | 'processing' | 'exported' | 'retail';
  grade?: string;
  cuppingScore?: number;
  moistureContent?: string;
  metadata?: BatchMetadata;
  journey: JourneyStep[];
}

export interface BatchMetadata {
  name: string;
  image: string;
  description: string;
  origin: {
    farmer: string;
    region: string;
    elevation: string;
    gps: string;
    harvest_date: string;
  };
  specifications: {
    variety: string;
    process: string;
    initial_weight: string;
  };
}

export interface JourneyStep {
  action: string;
  timestamp: string;
  actor: {
    id: string;
    name: string;
  };
  data?: {
    new_weight?: number;
    moisture_content?: string;
    cupping_score?: number;
    notes?: string;
  };
}

export interface HarvestData {
  cropType: 'coffee' | 'tea' | 'flowers';
  weight: number;
  location: string;
  variety: string;
  harvestDate: string;
  process?: string;
}

export interface StatusUpdateData {
  batchId: string;
  action: string;
  newWeight?: number;
  moistureContent?: string;
  cuppingScore?: number;
  notes?: string;
}