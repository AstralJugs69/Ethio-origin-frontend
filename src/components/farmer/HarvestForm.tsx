import { useState } from 'react';
import { HarvestData } from '../../types/supplychain';
import { useBatches } from '../../hooks/useBatches';
import { CROP_TYPES, COFFEE_VARIETIES, PROCESS_METHODS } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';

interface HarvestFormProps {
  onSuccess: () => void;
}

export default function HarvestForm({ onSuccess }: HarvestFormProps) {
  const { addBatch } = useBatches();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<HarvestData>({
    cropType: 'coffee',
    weight: 0,
    location: '',
    variety: COFFEE_VARIETIES[0],
    harvestDate: new Date().toISOString().split('T')[0],
    process: PROCESS_METHODS[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addBatch(formData);
      onSuccess();
    } catch (error) {
      console.error('Failed to create batch:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof HarvestData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌱</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Register New Harvest</h2>
          <p className="text-gray-600">Create a new batch to start tracking on blockchain</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Crop Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CROP_TYPES.map((crop) => (
                  <button
                    key={crop.value}
                    type="button"
                    onClick={() => handleChange('cropType', crop.value)}
                    className={`p-3 border-2 rounded-lg text-center transition ${
                      formData.cropType === crop.value
                        ? 'border-ethio-green bg-green-50 text-ethio-green'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{crop.icon}</div>
                    <div className="text-xs font-medium">{crop.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.weight || ''}
                onChange={(e) => handleChange('weight', parseInt(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ethio-green focus:border-ethio-green"
                placeholder="Enter weight in kilograms"
                required
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ethio-green focus:border-ethio-green"
                placeholder="e.g., Guji Zone, Oromia Region"
                required
              />
            </div>

            {/* Variety */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variety *
              </label>
              <select
                value={formData.variety}
                onChange={(e) => handleChange('variety', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ethio-green focus:border-ethio-green"
              >
                {COFFEE_VARIETIES.map((variety) => (
                  <option key={variety} value={variety}>
                    {variety}
                  </option>
                ))}
              </select>
            </div>

            {/* Process Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Process Method
              </label>
              <select
                value={formData.process}
                onChange={(e) => handleChange('process', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ethio-green focus:border-ethio-green"
              >
                {PROCESS_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            {/* Harvest Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harvest Date *
              </label>
              <input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => handleChange('harvestDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ethio-green focus:border-ethio-green"
                required
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-ethio-green hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Registering...</span>
                </>
              ) : (
                'Register Harvest'
              )}
            </button>
            <button
              type="button"
              onClick={onSuccess}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}