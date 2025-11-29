interface WelcomeProps {
  onGetStarted: () => void;
}

export default function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-ethio-green via-ethio-yellow to-ethio-red">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Ethiopian Flag Colors */}
        <div className="flex justify-center mb-6">
          <div className="flex rounded-lg overflow-hidden shadow-lg">
            <div className="w-4 h-8 bg-ethio-red"></div>
            <div className="w-4 h-8 bg-ethio-yellow"></div>
            <div className="w-4 h-8 bg-ethio-green"></div>
          </div>
        </div>

        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🌱</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Ethio-Origin</h1>
        <p className="text-gray-600 mb-2 text-lg">Farm-to-Market Traceability</p>
        <p className="text-gray-500 text-sm mb-8">Powered by Cardano Blockchain</p>

        <div className="space-y-4 mb-8 text-left">
          {[
            { icon: '🔍', text: 'Verify product origin' },
            { icon: '📱', text: 'Scan QR codes' },
            { icon: '💝', text: 'Support farmers directly' },
            { icon: '🔗', text: 'Blockchain transparency' }
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-xl">{feature.icon}</span>
              <span className="text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onGetStarted}
          className="w-full bg-ethio-green hover:bg-green-800 text-white font-semibold py-4 px-4 rounded-lg transition duration-200 text-lg"
        >
          Get Started
        </button>

        <p className="text-gray-500 text-sm mt-4">
          Track. Verify. Support.
        </p>
      </div>
    </div>
  );
}