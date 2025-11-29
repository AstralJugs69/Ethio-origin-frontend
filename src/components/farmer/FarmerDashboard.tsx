import { useState } from 'react';
import { Batch } from '../../types/supplychain';
import { useBatches } from '../../hooks/useBatches';
import HarvestForm from './HarvestForm';
import BatchList from './BatchList';
import MintBatch from './MintBatch';
import LoadingSpinner from '../common/LoadingSpinner';

interface FarmerDashboardProps {
  onBack: () => void;
}

type FarmerTab = 'batches' | 'new-harvest' | 'mint';

export default function FarmerDashboard({ onBack }: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState<FarmerTab>('batches');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const { batches, isLoading, error } = useBatches();

  const tabs = [
    { id: 'batches' as FarmerTab, name: 'My Batches', icon: '📦' },
    { id: 'new-harvest' as FarmerTab, name: 'New Harvest', icon: '🌱' },
    { id: 'mint' as FarmerTab, name: 'Mint Token', icon: '🪙' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your batches..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-ethio-green hover:text-green-800 mr-6"
              >
                ← Back to Roles
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
                <p className="text-gray-600">Manage your harvest and track batches</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              👨‍🌾 Farmer Account
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-ethio-green text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {activeTab === 'batches' && (
          <BatchList 
            batches={batches}
            onSelectBatch={setSelectedBatch}
            selectedBatch={selectedBatch}
          />
        )}

        {activeTab === 'new-harvest' && (
          <HarvestForm onSuccess={() => setActiveTab('batches')} />
        )}

        {activeTab === 'mint' && (
          <MintBatch batch={selectedBatch} />
        )}
      </div>
    </div>
  );
}