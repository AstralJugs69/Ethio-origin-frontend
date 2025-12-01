import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useBatches } from '../../hooks/useBatches';
import HarvestForm from './HarvestForm';
import BatchList from './BatchList';
import MintBatch from './MintBatch';
import LoadingSpinner from '../common/LoadingSpinner';
import DashboardLayout from '../layout/DashboardLayout';

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const { batches, isLoading, error } = useBatches();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your batches..." />
      </div>
    );
  }

  return (
    <DashboardLayout role="farmer" title="Farmer Dashboard" subtitle="Manage your harvest and track batches">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Route Content */}
      <Routes>
        <Route path="/" element={<Navigate to="batches" replace />} />
        <Route
          path="batches"
          element={
            <BatchList
              batches={batches}
              onSelectBatch={(batch) => navigate(`mint?batchId=${batch.id}`)}
              selectedBatch={null}
            />
          }
        />
        <Route
          path="new-harvest"
          element={<HarvestForm onSuccess={() => navigate('batches')} />}
        />
        <Route
          path="mint"
          element={<MintBatch batch={batches[0]} />} // TODO: Implement proper batch selection from URL
        />
      </Routes>
    </DashboardLayout>
  );
}