import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Laptop, Smartphone, Monitor } from 'lucide-react';
import Header from '../components/Header';
import { useService } from '../context/ServiceContext';

const HomePage: React.FC = () => {
  const [serviceCode, setServiceCode] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const navigate = useNavigate();
  const { getServiceByCode } = useService();

  const handleSearch = () => {
    if (serviceCode.trim()) {
      const service = getServiceByCode(serviceCode.trim());
      if (service) {
        navigate(`/service/${service.id}`);
      } else {
        setSearchResult('Service tidak ditemukan');
      }
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Gadgetarian Tracking"
        showSearch={true}
        showLogin={true}
        onLogin={handleLogin}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cek Status Service
          </h1>
          <p className="text-gray-600 mb-1">
            Masukkan kode service untuk melihat status perbaikan perangkat Anda
          </p>
          <p className="text-sm text-gray-500">
            Kode service dapat ditemukan pada struk atau email konfirmasi
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Lacak Service Anda</h2>
            <p className="text-blue-100">
              Dapatkan informasi real-time tentang status perbaikan
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kode Service
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={serviceCode}
                  onChange={(e) => setServiceCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Contoh: SVC-20250621-001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Cek Status Service
            </button>
          </div>

          {searchResult && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{searchResult}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Laptop className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">MacBook</h3>
            <p className="text-gray-600">
              Service dan perbaikan MacBook semua series
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">iPhone</h3>
            <p className="text-gray-600">
              Perbaikan iPhone dengan teknisi berpengalaman
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">iMac</h3>
            <p className="text-gray-600">
              Service iMac dengan spare part original
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Butuh bantuan? Hubungi kami di{' '}
            <a href="tel:+6281234567890" className="text-blue-600 hover:underline">
              +62 812-3456-7890
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;