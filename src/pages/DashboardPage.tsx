import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit2, Trash2, ExternalLink, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import EditServiceModal from '../components/EditServiceModal';
import AddServiceModal from '../components/AddServiceModal';
import StatusUpdateModal from '../components/StatusUpdateModal';
import NotificationManager from '../components/NotificationManager';
import { useService } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingService, setEditingService] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();
  const { services, updateService, deleteService, addService, addStatusUpdate } = useService();
  const { user, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const filteredServices = services.filter(service =>
    service.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetail = (id: string) => {
    navigate(`/service/${id}`);
  };

  const handleEditService = (id: string) => {
    setEditingService(id);
  };

  const handleUpdateStatus = (id: string) => {
    setUpdatingStatus(id);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Yakin ingin menghapus service ini?')) {
      deleteService(id);
    }
  };

  const handleUpdateServiceData = (id: string, updatedData: any) => {
    updateService(id, updatedData);
    setEditingService(null);
  };

  const handleStatusUpdate = (serviceId: string, status: any, description: string, technician: string) => {
    addStatusUpdate(serviceId, status, description, technician);
    setUpdatingStatus(null);
  };

  const handleAddService = (newServiceData: any) => {
    addService(newServiceData);
    setShowAddModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Admin Dashboard - Gadgetarian"
        showBack={false}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <span>Login berhasil! Selamat datang kembali.</span>
              <button className="text-green-100 hover:text-white">×</button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">List Daftar Servis</h1>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Tambah Service</span>
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Kelola dan pantau semua service perangkat
          </p>

          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Kode Servis..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    service.category === 'MacBook' ? 'bg-blue-100 text-blue-600' :
                    service.category === 'iPhone' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="font-medium text-sm">{service.category.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{service.deviceName}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{service.code}</span>
                  <button
                    onClick={() => handleViewDetail(service.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Lihat Detail"
                  >
                    <ExternalLink size={16} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(service.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Update Status"
                  >
                    <RefreshCw size={16} className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Hapus Service"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                <div>
                  <span className="font-medium">Kategori:</span> {service.category}
                </div>
                <div>
                  <span className="font-medium">Teknisi:</span> {service.technician}
                </div>
                <div>
                  <span className="font-medium">Masuk Service:</span> {formatDate(service.entryDate)}
                </div>
                <div>
                  <span className="font-medium">Estimasi Selesai:</span> {formatDate(service.estimatedCompletion)}
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium">Masalah:</span> {service.issue}
                </div>
                <div>
                  <span className="font-medium">Estimasi Biaya:</span> Rp {service.estimatedCost.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Update Terakhir:</span> {
                    service.statusHistory.length > 0 
                      ? formatDate(service.statusHistory[service.statusHistory.length - 1].timestamp)
                      : '-'
                  }
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewDetail(service.id)}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Lihat Detail
                </button>
                <button
                  onClick={() => handleEditService(service.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleUpdateStatus(service.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <RefreshCw size={14} />
                  <span>Update Status</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {editingService && (
        <EditServiceModal
          serviceId={editingService}
          onClose={() => setEditingService(null)}
          onSave={handleUpdateServiceData}
        />
      )}

      {updatingStatus && (
        <StatusUpdateModal
          service={services.find(s => s.id === updatingStatus)!}
          onClose={() => setUpdatingStatus(null)}
          onUpdate={handleStatusUpdate}
          currentTechnician={user?.name || 'Admin'}
        />
      )}

      {showAddModal && (
        <AddServiceModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddService}
        />
      )}

      <NotificationManager />
    </div>
  );
};

export default DashboardPage;