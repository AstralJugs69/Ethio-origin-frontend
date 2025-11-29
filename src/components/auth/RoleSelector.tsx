interface RoleSelectorProps {
  onRoleSelect: (role: 'farmer' | 'processor' | 'consumer') => void;
}

export default function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const roles = [
    {
      id: 'farmer',
      title: 'Farmer',
      description: 'Register harvest batches and track your produce on blockchain',
      icon: '👨‍🌾',
      color: 'green',
      features: ['Register batches', 'Mint tokens', 'Track journey']
    },
    {
      id: 'processor',
      title: 'Processor',
      description: 'Update batch status and manage processing stages',
      icon: '🏭',
      color: 'blue',
      features: ['Scan batches', 'Update status', 'Quality control']
    },
    {
      id: 'consumer',
      title: 'Consumer',
      description: 'Verify product origin and support farmers directly',
      icon: '🛒',
      color: 'purple',
      features: ['Scan products', 'View journey', 'Tip farmers']
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Role</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select how you want to participate in the Ethio-Origin supply chain ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border-2 border-transparent hover:border-ethio-green"
            >
              <div className={`bg-${role.color}-500 p-6 text-white text-center`}>
                <div className="text-4xl mb-2">{role.icon}</div>
                <h3 className="text-2xl font-bold">{role.title}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{role.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

               // Change this part in the button:
<button
  onClick={() => onRoleSelect(role.id as any)}
  className={`w-full ${
    role.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
    role.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
    'bg-purple-600 hover:bg-purple-700'
  } text-white font-semibold py-3 px-4 rounded-lg transition duration-200`}
>
  Enter as {role.title}
</button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Just want to verify a product?
          </p>
          <button
            onClick={() => onRoleSelect('consumer')}
            className="text-ethio-green hover:text-green-800 font-semibold text-lg underline"
          >
            Skip to Product Scanner
          </button>
        </div>
      </div>
    </div>
  );
}