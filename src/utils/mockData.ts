import { mockBatches } from '../data/mockBatches';
import { Batch, HarvestData, StatusUpdateData } from '../types/supplychain';

export const createBatch = async (harvestData: HarvestData): Promise<Batch> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const newBatch: Batch = {
    id: `ETH-${harvestData.cropType.toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    farmer: {
      id: 'current_farmer',
      name: 'Current User',
      region: harvestData.location,
      elevation: '2000m',
      gps: '6.0000° N, 38.0000° E',
      walletAddress: 'addr_test1qcurrentuser...'
    },
    cropType: harvestData.cropType,
    variety: harvestData.variety,
    initialWeight: harvestData.weight,
    location: harvestData.location,
    harvestDate: harvestData.harvestDate,
    status: 'harvested',
    journey: [
      {
        action: 'HARVESTED',
        timestamp: new Date().toISOString(),
        actor: { id: 'current_farmer', name: 'Current User' },
        data: { notes: 'Initial harvest registration' }
      }
    ]
  };

  mockBatches.push(newBatch);
  return newBatch;
};

export const updateBatchStatus = async (updateData: StatusUpdateData): Promise<Batch> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const batch = mockBatches.find(b => b.id === updateData.batchId);
  if (!batch) throw new Error('Batch not found');

  const newStep = {
    action: updateData.action,
    timestamp: new Date().toISOString(),
    actor: { id: 'current_processor', name: 'Processing Station' },
    data: {
      new_weight: updateData.newWeight,
      moisture_content: updateData.moistureContent,
      cupping_score: updateData.cuppingScore,
      notes: updateData.notes
    }
  };

  batch.journey.push(newStep);
  
  // Update status based on action
  if (updateData.action.includes('PROCESSING')) batch.status = 'processing';
  if (updateData.action.includes('EXPORT')) batch.status = 'exported';
  if (updateData.action.includes('RETAIL')) batch.status = 'retail';

  if (updateData.newWeight) batch.currentWeight = updateData.newWeight;
  if (updateData.moistureContent) batch.moistureContent = updateData.moistureContent;
  if (updateData.cuppingScore) batch.cuppingScore = updateData.cuppingScore;

  return batch;
};

export const getBatchById = async (batchId: string): Promise<Batch | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockBatches.find(batch => batch.id === batchId);
};

export const getAllBatches = async (): Promise<Batch[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockBatches;
};