import { Batch } from '../types/supplychain';

export const mockBatches: Batch[] = [
  {
    id: 'ETH-COFFEE-GUJI001',
    farmer: {
      id: 'farmer_001',
      name: 'Kebede Alazar',
      region: 'Guji Zone, Oromia',
      elevation: '2100m',
      gps: '5.8500° N, 39.0500° E',
      walletAddress: 'addr_test1qp8...alazar'
    },
    cropType: 'coffee',
    variety: 'Heirloom',
    initialWeight: 100,
    currentWeight: 85,
    location: 'Guji Highlands',
    harvestDate: '2024-01-15',
    status: 'processing',
    grade: 'Grade 1',
    cuppingScore: 88.5,
    moistureContent: '11.5%',
    journey: [
      {
        action: 'HARVESTED',
        timestamp: '2024-01-15T08:00:00Z',
        actor: { id: 'farmer_001', name: 'Kebede Alazar' },
        data: { notes: 'Premium Arabica cherries harvested' }
      },
      {
        action: 'PROCESSING_STARTED',
        timestamp: '2024-01-20T10:00:00Z',
        actor: { id: 'processor_001', name: 'Dimitu Tero Mill' },
        data: { 
          new_weight: 85,
          moisture_content: '11.5%',
          cupping_score: 88.5,
          notes: 'Natural sun-dried process initiated'
        }
      }
    ]
  },
  {
    id: 'ETH-COFFEE-SIDAMA002',
    farmer: {
      id: 'farmer_002',
      name: 'Alemitu Bekele',
      region: 'Sidama Zone',
      elevation: '1900m',
      gps: '6.5000° N, 38.5000° E',
      walletAddress: 'addr_test1qr9...bekele'
    },
    cropType: 'coffee',
    variety: 'Yirgacheffe',
    initialWeight: 150,
    location: 'Sidama Highlands',
    harvestDate: '2024-01-18',
    status: 'harvested',
    journey: [
      {
        action: 'HARVESTED',
        timestamp: '2024-01-18T07:30:00Z',
        actor: { id: 'farmer_002', name: 'Alemitu Bekele' },
        data: { notes: 'Washed process Yirgacheffe' }
      }
    ]
  }
];