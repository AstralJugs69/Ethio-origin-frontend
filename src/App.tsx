import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/auth/Welcome';
import RoleSelector from './components/auth/RoleSelector';
import FarmerDashboard from './components/farmer/FarmerDashboard';
import ProcessorPortal from './components/processor/ProcessorPortal';
import LogisticsDashboard from './components/logistics/LogisticsDashboard';
import ConsumerVerification from './components/consumer/ConsumerVerification';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-100 font-sans text-stone-900">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/roles" element={<RoleSelector />} />

          {/* Role Routes */}
          <Route path="/farmer/*" element={<FarmerDashboard />} />
          <Route path="/processor/*" element={<ProcessorPortal />} />
          <Route path="/logistics/*" element={<LogisticsDashboard />} />
          <Route path="/consumer/*" element={<ConsumerVerification />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;