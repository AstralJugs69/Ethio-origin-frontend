import { useState, useEffect } from 'react';
import { Batch } from '../../types/supplychain';
import { getBatchById } from '../../utils/mockData';
import { formatDate } from '../../utils/formatters';
import FarmerStory from './FarmerStory';
import TipFarmer from './TipFarmer';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProductJourneyProps {
  productId: string;
  onScanAnother: () => void;
}

export default function ProductJourney({ productId, onScanAnother }: ProductJourneyProps) {
  const [batch, setBatch] = useState<Batch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'journey' | 'farmer' | 'tip'>('journey');

  useEffect(() => {
    loadBatchData();
  }, [productId]);

  const loadBatchData = async () => {
    setIsLoading(true);
    try {
      // Try to get the batch, if not found, use mock data
      let batchData = await getBatchById(productId);
      
      if (!batchData) {
        // Create comprehensive mock data for demonstration
        batchData = {
          id: productId,
          farmer: {
            id: 'farmer_guji001',
            name: 'Kebede Alazar',
            region: 'Guji Zone, Oromia',
            elevation: '2100m',
            gps: '5.8500° N, 39.0500° E',
            walletAddress: 'addr_test1qpk8d8f3s4a7...alazar'
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
              actor: { id: 'farmer_guji001', name: 'Kebede Alazar' },
              data: { notes: 'Premium Arabica cherries harvested at peak ripeness' }
            },
            {
              action: 'PROCESSING_STARTED',
              timestamp: '2024-01-20T10:00:00Z',
              actor: { id: 'processor_001', name: 'Dimitu Tero Mill' },
              data: { 
                new_weight: 85,
                moisture_content: '11.5%',
                cupping_score: 88.5,
                notes: 'Natural sun-dried process on raised beds'
              }
            },
            {
              action: 'QUALITY_CHECKED',
              timestamp: '2024-01-28T14:30:00Z',
              actor: { id: 'quality_001', name: 'Ethio Quality Control' },
              data: { 
                notes: 'Excellent aroma and flavor profile. Ready for export.'
              }
            }
          ]
        };
      }
      
      setBatch(batchData);
    } catch (error) {
      console.error('Failed to load batch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading product journey..." />
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-red-500 text-4xl mb-4">❌</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Product Not Found</h3>
        <p className="text-gray-500 mb-6">
          We couldn't find information for this product. It may not be registered in our system.
        </p>
        <button
          onClick={onScanAnother}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Scan Another Product
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">Guji Highlands Coffee</h2>
            <p className="text-gray-600">Batch ID: {batch.id}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                ✓ Verified Origin
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {batch.variety}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                {batch.grade}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-lg font-semibold text-purple-600">Ethio-Origin Certified</div>
            <p className="text-sm text-gray-500">Blockchain Verified</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'journey' as const, name: 'Product Journey', icon: '🛣️' },
            { id: 'farmer' as const, name: 'Farmer Story', icon: '👨‍🌾' },
            { id: 'tip' as const, name: 'Support Farmer', icon: '💝' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'journey' && <JourneyTimeline batch={batch} />}
          {activeTab === 'farmer' && <FarmerStory farmer={batch.farmer} />}
          {activeTab === 'tip' && <TipFarmer farmer={batch.farmer} />}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onScanAnother}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          Scan Another Product
        </button>
      </div>
    </div>
  );
}

// Journey Timeline Component
function JourneyTimeline({ batch }: { batch: Batch }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">From Farm to You</h3>
      <div className="space-y-6">
        {batch.journey.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">{index + 1}</span>
              </div>
              {index < batch.journey.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
              )}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-800 capitalize">
                  {step.action.replace(/_/g, ' ').toLowerCase()}
                </h4>
                <span className="text-sm text-gray-500">{formatDate(step.timestamp)}</span>
              </div>
              <p className="text-gray-700 mb-1">{step.data?.notes || 'Processing step completed'}</p>
              <p className="text-sm text-gray-500">By: {step.actor.name}</p>
              
              {/* Display additional data if available */}
              {step.data && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  {step.data.new_weight && (
                    <span className="bg-gray-100 px-2 py-1 rounded">Weight: {step.data.new_weight}kg</span>
                  )}
                  {step.data.moisture_content && (
                    <span className="bg-gray-100 px-2 py-1 rounded">Moisture: {step.data.moisture_content}</span>
                  )}
                  {step.data.cupping_score && (
                    <span className="bg-gray-100 px-2 py-1 rounded">Cupping Score: {step.data.cupping_score}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Final Step - Retail */}
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold">{batch.journey.length + 1}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-gray-800">Ready for you</h4>
              <span className="text-sm text-gray-500">Now</span>
            </div>
            <p className="text-gray-700">This product is now available for you to enjoy!</p>
            <p className="text-sm text-green-600 mt-1">✓ Journey complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}