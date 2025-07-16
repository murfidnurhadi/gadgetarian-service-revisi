import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SparePart } from '../context/ServiceContext';

interface AddServiceModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    deviceName: '',
    category: 'MacBook',
    status: 'BELUM DIKERJAKAN',
    technician: '',
    technicianPhone: '',
    customer: '',
    customerPhone: '',
    entryDate: new Date().toISOString().split('T')[0],
    estimatedCompletion: '',
    issue: '',
    spareParts: [] as SparePart[]
  });

  const [newSparePart, setNewSparePart] = useState({ name: '', price: 0 });

  const generateServiceCode = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `SVC-${year}${month}${day}-${random}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSparePart = () => {
    if (newSparePart.name && newSparePart.price > 0) {
      const sparePart: SparePart = {
        id: Date.now().toString(),
        name: newSparePart.name,
        price: newSparePart.price
      };
      setFormData(prev => ({
        ...prev,
        spareParts: [...prev.spareParts, sparePart]
      }));
      setNewSparePart({ name: '', price: 0 });
    }
  };

  const handleRemoveSparePart = (id: string) => {
    setFormData(prev => ({
      ...prev,
      spareParts: prev.spareParts.filter(part => part.id !== id)
    }));
  };

  const calculateTotalCost = () => {
    return formData.spareParts.reduce((total, part) => total + part.price, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService = {
      id: Date.now().toString(),
      code: generateServiceCode(),
      ...formData,
      estimatedCost: calculateTotalCost()
    };
    onSave(newService);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Tambah Service Baru</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Perangkat
              </label>
              <input
                type="text"
                name="deviceName"
                value={formData.deviceName}
                onChange={handleInputChange}
                placeholder="Contoh: MacBook Air M2 2020"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori Perangkat
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="MacBook">MacBook</option>
                <option value="iPhone">iPhone</option>
                <option value="iMac">iMac</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="BELUM DIKERJAKAN">BELUM DIKERJAKAN</option>
                <option value="PROSES">PROSES</option>
                <option value="SUDAH SELESAI">SUDAH SELESAI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teknisi yang Menangani
              </label>
              <input
                type="text"
                name="technician"
                value={formData.technician}
                onChange={handleInputChange}
                placeholder="Nama teknisi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. Telepon Teknisi
              </label>
              <input
                type="tel"
                name="technicianPhone"
                value={formData.technicianPhone}
                onChange={handleInputChange}
                placeholder="+62 812-3456-7890"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Pelanggan
              </label>
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                placeholder="Nama pelanggan"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. Telepon Pelanggan
              </label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                placeholder="+62 821-1234-5678"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimasi Selesai
              </label>
              <input
                type="date"
                name="estimatedCompletion"
                value={formData.estimatedCompletion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Masalah
            </label>
            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleInputChange}
              rows={3}
              placeholder="Deskripsikan masalah perangkat..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spare Part yang Diperlukan
            </label>
            
            <div className="space-y-2 mb-4">
              {formData.spareParts.map(part => (
                <div key={part.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{part.name}</span>
                    <span className="text-gray-600 ml-2">Rp {part.price.toLocaleString()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSparePart(part.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nama spare part..."
                value={newSparePart.name}
                onChange={(e) => setNewSparePart(prev => ({ ...prev, name: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Harga"
                value={newSparePart.price || ''}
                onChange={(e) => setNewSparePart(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddSparePart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Tambah
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-blue-700">Estimasi Total Biaya:</span>
              <span className="text-2xl font-bold text-blue-600">
                Rp {calculateTotalCost().toLocaleString()}
              </span>
            </div>
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
              Tambah Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;