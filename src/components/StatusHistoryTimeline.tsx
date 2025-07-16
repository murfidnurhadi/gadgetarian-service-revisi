import React from 'react';
import { CheckCircle, Clock, AlertCircle, Wrench, Search } from 'lucide-react';
import { StatusHistory } from '../context/ServiceContext';

interface StatusHistoryTimelineProps {
  statusHistory: StatusHistory[];
}

const StatusHistoryTimeline: React.FC<StatusHistoryTimelineProps> = ({ statusHistory }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'BELUM DIKERJAKAN':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'PROSES':
        return <Wrench className="w-4 h-4 text-blue-600" />;
      case 'MENUNGGU SPARE PART':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'QUALITY CHECK':
        return <Search className="w-4 h-4 text-purple-600" />;
      case 'SUDAH SELESAI':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BELUM DIKERJAKAN':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PROSES':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'MENUNGGU SPARE PART':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'QUALITY CHECK':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SUDAH SELESAI':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">Riwayat Status Service</h3>
        <p className="text-blue-100">Lacak perjalanan perbaikan perangkat Anda</p>
      </div>

      <div className="space-y-4">
        {statusHistory.map((history, index) => {
          const { date, time } = formatDateTime(history.timestamp);
          const isLatest = index === statusHistory.length - 1;
          
          return (
            <div key={history.id} className="relative">
              {/* Timeline line */}
              {index < statusHistory.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}
              
              <div className="flex items-start space-x-4">
                {/* Status icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isLatest ? 'bg-blue-600' : 'bg-gray-100'
                } ${isLatest ? 'ring-4 ring-blue-100' : ''}`}>
                  {isLatest ? (
                    <div className="text-white">
                      {getStatusIcon(history.status)}
                    </div>
                  ) : (
                    getStatusIcon(history.status)
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(history.status)}`}>
                      {history.status}
                    </span>
                    <div className="text-right text-sm text-gray-500">
                      <div>{date}</div>
                      <div>{time}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 font-medium mb-1">{history.description}</p>
                  <p className="text-sm text-gray-600">Oleh: {history.technician}</p>
                  
                  {isLatest && (
                    <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600 font-medium">Status Terkini</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress Service</span>
          <span className="font-medium text-gray-800">
            {statusHistory.length} dari 5 tahap
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(statusHistory.length / 5) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatusHistoryTimeline;