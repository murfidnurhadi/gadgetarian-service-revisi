import React from 'react';
import { Laptop, Smartphone, Monitor, ExternalLink, Trash2 } from 'lucide-react';
import { Service } from '../context/ServiceContext';

interface ServiceCardProps {
  service: Service;
  onViewDetail: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onViewDetail,
  onEdit,
  onDelete,
  showActions = false
}) => {
  const getDeviceIcon = () => {
    switch (service.category) {
      case 'MacBook':
        return <Laptop className="w-5 h-5 text-blue-600" />;
      case 'iPhone':
        return <Smartphone className="w-5 h-5 text-orange-600" />;
      case 'iMac':
        return <Monitor className="w-5 h-5 text-blue-600" />;
      default:
        return <Laptop className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = () => {
    switch (service.status) {
      case 'BELUM DIKERJAKAN':
        return 'bg-yellow-100 text-yellow-800';
      case 'SUDAH SELESAI':
        return 'bg-green-100 text-green-800';
      case 'PROSES':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = () => {
    switch (service.category) {
      case 'MacBook':
        return 'bg-blue-100 text-blue-800';
      case 'iPhone':
        return 'bg-orange-100 text-orange-800';
      case 'iMac':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getCategoryColor()}`}>
            {getDeviceIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{service.deviceName}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {service.status}
            </span>
          </div>
        </div>
        
        {showActions && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{service.code}</span>
            <button
              onClick={() => onViewDetail(service.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ExternalLink size={16} className="text-gray-500" />
            </button>
            <button
              onClick={() => onDelete?.(service.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Kategori:</span> {service.category}
        </div>
        <div>
          <span className="font-medium">Teknisi:</span> {service.technician}
        </div>
        <div>
          <span className="font-medium">Masuk Service:</span> {service.entryDate}
        </div>
        <div>
          <span className="font-medium">Estimasi Selesai:</span> {service.estimatedCompletion}
        </div>
        <div>
          <span className="font-medium">Masalah:</span> {service.issue}
        </div>
        <div>
          <span className="font-medium">Estimasi Biaya:</span> Rp {service.estimatedCost.toLocaleString()}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => onViewDetail(service.id)}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;