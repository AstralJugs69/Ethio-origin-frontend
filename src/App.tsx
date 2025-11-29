import { useState } from 'react';
import Welcome from './components/auth/Welcome';
import RoleSelector from './components/auth/RoleSelector';
import FarmerDashboard from './components/farmer/FarmerDashboard';
import ProcessorPortal from './components/processor/ProcessorPortal';
import ConsumerVerification from './components/consumer/ConsumerVerification';

type AppView = 'welcome' | 'role-select' | 'farmer' | 'processor' | 'consumer';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('welcome');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return <Welcome onGetStarted={() => setCurrentView('role-select')} />;
      case 'role-select':
        return <RoleSelector onRoleSelect={setCurrentView} />;
      case 'farmer':
        return <FarmerDashboard onBack={() => setCurrentView('role-select')} />;
      case 'processor':
        return <ProcessorPortal onBack={() => setCurrentView('role-select')} />;
      case 'consumer':
        return <ConsumerVerification onBack={() => setCurrentView('role-select')} />;
      default:
        return <Welcome onGetStarted={() => setCurrentView('role-select')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
}

export default App;