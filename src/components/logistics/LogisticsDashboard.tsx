import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import BatchScanner from '../processor/BatchScanner'; // Reusing scanner for now
import { cn } from '../../utils/cn';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

export default function LogisticsDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scannedBatchId, setScannedBatchId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: 'scan', path: '/logistics/scan', name: 'Scan Batch', icon: '📷' },
    { id: 'transfer', path: '/logistics/transfer', name: 'Transfer Custody', icon: '🚚' }
  ];

  const handleTransfer = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert('Custody transferred successfully!');
    setScannedBatchId(null);
    navigate('/logistics/scan');
  };

  return (
    <DashboardLayout role="processor" title="Logistics Portal" subtitle="Track shipments and transfer custody">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-stone-200">
        {tabs.map((tab) => {
          const isActive = location.pathname.includes(tab.path);
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors text-sm",
                isActive
                  ? "border-blue-600 text-blue-800 bg-blue-50/50"
                  : "border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="scan" replace />} />
          <Route 
            path="scan" 
            element={
              <BatchScanner 
                onBatchScanned={(id) => {
                  setScannedBatchId(id);
                  navigate('transfer');
                }}
                onContinue={() => navigate('transfer')}
              />
            } 
          />
          <Route 
            path="transfer" 
            element={
              scannedBatchId ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Transfer Custody</CardTitle>
                    <CardDescription>Confirm transfer of batch {scannedBatchId} to exporter</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                      <h4 className="font-medium text-stone-900 mb-2">Batch Details</h4>
                      <p className="text-sm text-stone-600">ID: {scannedBatchId}</p>
                      <p className="text-sm text-stone-600">Current Location: Processing Station</p>
                      <p className="text-sm text-stone-600">Destination: Port of Djibouti</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        onClick={handleTransfer} 
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner size="sm" />
                            <span className="ml-2">Processing...</span>
                          </>
                        ) : (
                          'Confirm Transfer'
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('scan')}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <p className="text-stone-500 mb-4">No batch scanned yet.</p>
                  <Button onClick={() => navigate('scan')}>Go to Scanner</Button>
                </div>
              )
            } 
          />
        </Routes>
      </div>
    </DashboardLayout>
  );
}