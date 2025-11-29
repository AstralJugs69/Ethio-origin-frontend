import { useState } from 'react';
import ProductJourney from './ProductJourney';

interface ConsumerVerificationProps {
  onBack: () => void;
}

export default function ConsumerVerification({ onBack }: ConsumerVerificationProps) {
  const [scannedProduct, setScannedProduct] = useState<string | null>(null);

  const handleScan = () => {
    // Simulate product scanning - use a fixed ID for consistency
    const mockProductId = 'ETH-COFFEE-GUJI001';
    setScannedProduct(mockProductId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-purple-600 hover:text-purple-800 mr-6"
              >
                ← Back to Roles
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Product Verification</h1>
                <p className="text-gray-600">Scan QR code to verify product origin and journey</p>
              </div>
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
              🛒 Consumer
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {!scannedProduct ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📱</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Scan Product QR Code</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Point your camera at the QR code on the product packaging to verify its origin and journey from farm to market.
            </p>
            
            {/* Scanner Simulation */}
            <div className="bg-gray-900 rounded-lg p-8 mb-6 max-w-sm mx-auto">
              <div className="bg-black rounded-lg p-4">
                <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-600 rounded flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-sm opacity-75">QR Scanner View</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleScan}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Simulate QR Scan
            </button>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
              <p className="text-yellow-800 text-sm">
                <strong>Demo Tip:</strong> This will load a sample coffee batch from Guji Highlands, Ethiopia.
              </p>
            </div>
          </div>
        ) : (
          <ProductJourney 
            productId={scannedProduct}
            onScanAnother={() => setScannedProduct(null)}
          />
        )}
      </div>
    </div>
  );
}