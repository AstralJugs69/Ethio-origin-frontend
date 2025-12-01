import { Batch } from '../types/supplychain';

export const mockBatches: Batch[] = [
  {
    id: 'EthioCoffee402',
    policyId: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc',
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
    harvestDate: '2025-11-28',
    status: 'processing',
    grade: 'Grade 1',
    cuppingScore: 88.5,
    moistureContent: '11.5%',
    
    // CIP-25 Metadata Structure
    cip25Metadata: {
      "721": {
        "d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc": {
          "EthioCoffee402": {
            name: "Guji Highlands Grade 1 - Batch #402",
            image: "https://images.unsplash.com/photo-1552346989-e069318e20a5?auto=format&fit=crop&q=80&w=1000",
            mediaType: "image/jpeg",
            description: "Premium Arabica harvested from the Oromia region.",
            project: "Ethio-Origin",
            origin: {
              farmer: "Kebede Alazar",
              region: "Guji Zone, Oromia",
              elevation: "2100m",
              gps: "5.8500° N, 39.0500° E",
              harvest_date: "2025-11-28"
            },
            specifications: {
              variety: "Heirloom",
              process: "Natural (Sun Dried)",
              initial_weight: "100kg"
            },
            files: [
              {
                name: "Farmer Photo",
                mediaType: "image/jpeg",
                src: "https://images.unsplash.com/photo-1595259716353-c5933056974c?auto=format&fit=crop&q=80&w=1000"
              },
              {
                name: "Organic Certificate",
                mediaType: "application/pdf",
                src: "ipfs://QmX7..."
              }
            ]
          }
        }
      }
    },

    // Journey History (Label 1001 Transactions)
    journey: [
      {
        action: 'HARVESTED',
        timestamp: '2025-11-28T08:00:00Z',
        actor: { id: 'farmer_001', name: 'Kebede Alazar' },
        data: { notes: 'Premium Arabica cherries harvested' }
      },
      {
        action: 'PROCESSING_STARTED',
        timestamp: '2025-11-30T10:00:00Z',
        actor: { id: 'processor_001', name: 'Dimtu Tero Mill' },
        data: { 
          new_weight: '85kg',
          moisture_content: '11.5%',
          cupping_score: '88.5',
          notes: 'Natural sun-dried process initiated'
        }
      }
    ]
  },
  {
    id: 'EthioCoffee403',
    policyId: 'd5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc',
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
    harvestDate: '2025-11-29',
    status: 'harvested',
    
    cip25Metadata: {
      "721": {
        "d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc": {
          "EthioCoffee403": {
            name: "Sidama Yirgacheffe - Batch #403",
            image: "https://images.unsplash.com/photo-1611566026373-c6c85447dbdc?auto=format&fit=crop&q=80&w=1000",
            mediaType: "image/jpeg",
            description: "Washed Yirgacheffe from Sidama Zone.",
            project: "Ethio-Origin",
            origin: {
              farmer: "Alemitu Bekele",
              region: "Sidama Zone",
              elevation: "1900m",
              gps: "6.5000° N, 38.5000° E",
              harvest_date: "2025-11-29"
            },
            specifications: {
              variety: "Yirgacheffe",
              process: "Washed",
              initial_weight: "150kg"
            },
            files: [
              {
                name: "Farmer Photo",
                mediaType: "image/jpeg",
                src: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=1000"
              }
            ]
          }
        }
      }
    },

    journey: [
      {
        action: 'HARVESTED',
        timestamp: '2025-11-29T07:30:00Z',
        actor: { id: 'farmer_002', name: 'Alemitu Bekele' },
        data: { notes: 'Washed process Yirgacheffe' }
      }
    ]
  }
];

// Helper to simulate fetching a batch by ID
export const getBatchById = async (id: string): Promise<Batch | undefined> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockBatches.find(b => b.id === id);
};