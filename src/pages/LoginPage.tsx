import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Info } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Username atau Katasandi SALAH');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Gadgetarian Tracking"
        showBack={true} 
        onBack={() => navigate('/')}
      />

      <main className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-10 h-10 text-white" />
          </div>
          
          <div className="text-blue-600 font-medium mb-2">Gadgetarian</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Login Teknisi
          </h1>
          <p className="text-gray-600">
            Akses khusus untuk teknisi resmi
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan Username Teknisi..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Login
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-200 border border-red-400 rounded-lg flex items-center space-x-2">
              <Info className="w-5 h-5 text-red-800" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Demo:</strong> username: <code className="bg-white px-2 py-1 rounded">admin</code> / <code className="bg-white px-2 py-1 rounded">teknisi</code>, password: <code className="bg-white px-2 py-1 rounded">password</code>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;