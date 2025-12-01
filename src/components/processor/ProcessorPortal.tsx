import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import BatchScanner from './BatchScanner';
import StatusUpdate from './StatusUpdate';
import DashboardLayout from '../layout/DashboardLayout';

export default function ProcessorPortal() {
  const navigate = useNavigate();
  const [scannedBatchId, setScannedBatchId] = useState<string | null>(null);

  return (
    <DashboardLayout role="processor" title="Processor Portal" subtitle="Scan batches and update processing status">
      {/* Route Content */}
      <div className="max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="scan" replace />} />
          <Route
            path="scan"
            element={
              <BatchScanner
                onBatchScanned={(id) => {
                  setScannedBatchId(id);
                  // In a real app, we might navigate to update with ID in URL
                  // navigate(`update?batchId=${id}`);
                }}
                onContinue={() => navigate('update')}
              />
            }
          />
          <Route
            path="update"
            element={
              <StatusUpdate
                batchId={scannedBatchId}
                onBatchChange={setScannedBatchId}
              />
            }
          />
        </Routes>
      </div>
    </DashboardLayout>
  );
}