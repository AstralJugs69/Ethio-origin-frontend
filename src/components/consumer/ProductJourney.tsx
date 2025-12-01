import { useState, useEffect } from 'react';
import { Batch } from '../../types/supplychain';
import { getBatchById } from '../../utils/mockData';
import { formatDate } from '../../utils/formatters';
import FarmerStory from './FarmerStory';
import TipFarmer from './TipFarmer';
import LoadingSpinner from '../common/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

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
      const batchData = await getBatchById(productId);
      setBatch(batchData ?? null);
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
      <Card className="p-8 text-center">
        <div className="text-red-500 text-4xl mb-4">❌</div>
        <h3 className="text-xl font-semibold text-stone-700 mb-2">Product Not Found</h3>
        <p className="text-stone-500 mb-6">
          We couldn't find information for this product. It may not be registered in our system.
        </p>
        <Button onClick={onScanAnother}>
          Scan Another Product
        </Button>
      </Card>
    );
  }

  // Extract metadata for display
  const metadata = batch.cip25Metadata?.["721"]?.[batch.policyId || ""]?.[batch.id];
  const origin = metadata?.origin;

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-stone-800">{metadata?.name || `Batch #${batch.id}`}</h2>
              <p className="text-stone-600">Batch ID: {batch.id}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <span className="mr-1">✓</span> Verified Organic
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {batch.variety}
                </span>
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                  {batch.grade}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-lg font-semibold text-emerald-600">Ethio-Origin Certified</div>
              <p className="text-sm text-stone-500">Blockchain Verified</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Section (Placeholder for now, but structure ready) */}
      {origin?.gps && (
        <Card className="overflow-hidden">
          <div className="h-48 bg-stone-200 relative">
            {/* In a real app, integrate Leaflet or Google Maps here using origin.gps */}
            <div className="absolute inset-0 flex items-center justify-center bg-emerald-50">
              <div className="text-center">
                <span className="text-4xl mb-2 block">🗺️</span>
                <p className="text-emerald-800 font-medium">Farm Location</p>
                <p className="text-emerald-600 text-sm">{origin.gps}</p>
                <p className="text-emerald-600 text-sm">{origin.region}, {origin.elevation}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Tabs */}
      <Card>
        <div className="flex border-b border-stone-200">
          {[
            { id: 'journey' as const, name: 'Product Journey', icon: '🛣️' },
            { id: 'farmer' as const, name: 'Farmer Story', icon: '👨‍🌾' },
            { id: 'tip' as const, name: 'Support Farmer', icon: '💝' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors flex-1 md:flex-none justify-center",
                activeTab === tab.id
                  ? "border-emerald-500 text-emerald-700 bg-emerald-50/30"
                  : "border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50"
              )}
            >
              <span>{tab.icon}</span>
              <span className="hidden md:inline">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'journey' && <JourneyTimeline batch={batch} />}
          {activeTab === 'farmer' && <FarmerStory farmer={batch.farmer} />}
          {activeTab === 'tip' && <TipFarmer farmer={batch.farmer} />}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button
          onClick={onScanAnother}
          className="flex-1"
          size="lg"
        >
          Scan Another Product
        </Button>
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