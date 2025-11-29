import { useState } from 'react';
import BatchScanner from './BatchScanner';
import StatusUpdate from './StatusUpdate';

interface ProcessorPortalProps {
  onBack: () => void;
}

type ProcessorTab = 'scan' | 'update';

export default function ProcessorPortal({ onBack }: ProcessorPortalProps) {
  const [activeTab, setActiveTab] = useState<ProcessorTab>('scan');
  const [scannedBatchId, setScannedBatchId] = useState<string | null>(null);

  const tabs = [
    { id: 'scan' as ProcessorTab, name: 'Scan Batch', icon: '📷' },
    { id: 'update' as ProcessorTab, name: 'Update Status', icon: '🔄' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-blue-600 hover:text-blue-800 mr-6"
              >
                ← Back to Roles
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Processor Portal</h1>
                <p className="text-gray-600">Scan batches and update processing status</p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
              🏭 Processor Account
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
                    ? 'bg-blue-600 text-white'
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
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'scan' && (
          <BatchScanner 
            onBatchScanned={setScannedBatchId}
            onContinue={() => setActiveTab('update')}
          />
        )}

        {activeTab === 'update' && (
          <StatusUpdate 
            batchId={scannedBatchId}
            onBatchChange={setScannedBatchId}
          />
        )}
      </div>
    </div>
  );
}