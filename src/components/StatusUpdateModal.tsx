import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Service } from '../context/ServiceContext';

interface StatusUpdateModalProps {
  service: Service;
  onClose: () => void;
  onUpdate: (serviceId: string, status: Service['status'], description: string, technician: string) => void;
  currentTechnician: string;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  service,
  onClose,
  onUpdate,
  currentTechnician
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Service['status']>(service.status);
  const [description, setDescription] = useState('');

  const statusOptions: { value: Service['status']; label: string; description: string }[] = [
    {
      value: 'BELUM DIKERJAKAN',
      label: 'Belum Dikerjakan',
      description: 'Service belum dimulai'
    },
    {
      value: 'PROSES',
      label: 'Dalam Proses',
      description: 'Sedang dalam tahap perbaikan'
    },
    {
      value: 'SUDAH SELESAI',
      label: 'Sudah Selesai',
      description: 'Service telah selesai'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onUpdate(service.id, selectedStatus, description.trim(), currentTechnician);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Update Status Service</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Code
            </label>
            <input
              type="text"
              value={service.code}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Device
            </label>
            <input
              type="text"
              value={service.deviceName}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Baru
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as Service['status'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {statusOptions.find(opt => opt.value === selectedStatus)?.description}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keterangan Update<span className='text-red-500'>*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Jelaskan detail update status..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;