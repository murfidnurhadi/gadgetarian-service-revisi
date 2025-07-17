import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Laptop, User, Wrench, Calendar, Clock, FileText, DollarSign, Phone } from 'lucide-react';
import Header from '../components/Header';
import StatusHistoryTimeline from '../components/StatusHistoryTimeline';
import NotificationManager from '../components/NotificationManager';
import { useService } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getServiceById } = useService();
  const { isAuthenticated } = useAuth();

  const service = id ? getServiceById(id) : null;

  const handleBack = () => {
    if (isAuthenticated && location.pathname.includes('/service/')) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Detail Service" showBack={true} onBack={handleBack} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600">Service tidak ditemukan</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (service.status) {
      case 'BELUM DIKERJAKAN':
        return 'bg-yellow-100 text-yellow-800';
      case 'SUDAH SELESAI':
        return 'bg-green-100 text-green-800';
      case 'PROSES':
        return 'bg-blue-100 text-blue-800';
      case 'MENUNGGU SPARE PART':
        return 'bg-orange-100 text-orange-800';
      case 'QUALITY CHECK':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Detail Service" showBack={true} onBack={handleBack} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Detail Service</h1>
          <p className="text-gray-600">Informasi lengkap mengenai service perangkat</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-blue-600 text-white p-6 rounded-lg text-center mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{service.deviceName}</h2>
              <p className="text-blue-100 mb-4">Service</p>
              <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                + GADGETARIAN
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Kode Service</span>
                <span className="text-gray-600">{service.code}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>{service.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Estimasi Biaya</span>
                <span className="text-gray-600">Rp {service.estimatedCost.toLocaleString()}</span>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Update Notifikasi</span>
                  <NotificationManager serviceCode={service.code} />
                </div>
                <p className="text-xs text-gray-500 mt-2">Dapatkan notifikasi real-time saat status service berubah</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold">Informasi Service</h3>
              <p className="text-blue-100">Detail lengkap proses service perangkat</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Nama Teknisi</p>
                  <p className="text-gray-600">{service.technician}</p>
                  <p className="text-sm text-gray-500">{service.technicianPhone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Kategori</p>
                  <p className="text-gray-600">{service.category}</p>
                </div>
              </div>
              {service.spareParts.length > 0 && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Spare Part yang Diganti</p>
                    {service.spareParts.map(part => (
                      <p key={part.id} className="text-gray-600">
                        {part.name} - Rp {part.price.toLocaleString()}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Tanggal Masuk</p>
                  <p className="text-gray-600">{formatDate(service.entryDate)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Estimasi Selesai</p>
                  <p className="text-gray-600">{formatDate(service.estimatedCompletion)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Masalah</p>
                  <p className="text-gray-600">{service.issue}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Informasi Pelanggan</p>
                  <p className="text-gray-600">{service.customer}</p>
                  <p className="text-sm text-gray-500">{service.customerPhone}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-700">Estimasi Total Biaya</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mt-2">
                Rp {service.estimatedCost.toLocaleString()}
              </div>
              <p className="text-sm text-green-600 mt-1">
                Berdasarkan spare part yang diperlukan
              </p>
            </div>
          </div>
        </div>

        <StatusHistoryTimeline statusHistory={service.statusHistory} />
      </main>

      <NotificationManager />
    </div>
  );
};

export default ServiceDetailPage;
