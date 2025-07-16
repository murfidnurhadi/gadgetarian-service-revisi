import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bell, BellOff } from 'lucide-react';
import { useService } from '../context/ServiceContext';

interface NotificationManagerProps {
  serviceCode?: string;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ serviceCode }) => {
  const { subscribedUsers, subscribeToNotifications, unsubscribeFromNotifications } = useService();
  
  const isSubscribed = serviceCode ? subscribedUsers.has(serviceCode) : false;

  useEffect(() => {
    // Request notification permission on component mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          toast.success('Notifikasi diaktifkan! Anda akan mendapat update status service.');
        }
      });
    }
  }, []);

  const handleToggleNotification = () => {
    if (!serviceCode) return;

    if (isSubscribed) {
      unsubscribeFromNotifications(serviceCode);
      toast.info('Notifikasi dinonaktifkan untuk service ini');
    } else {
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          subscribeToNotifications(serviceCode);
          toast.success('Notifikasi diaktifkan! Anda akan mendapat update status service.');
        } else if (Notification.permission === 'default') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              subscribeToNotifications(serviceCode);
              toast.success('Notifikasi diaktifkan! Anda akan mendapat update status service.');
            } else {
              toast.error('Izin notifikasi ditolak. Aktifkan di pengaturan browser.');
            }
          });
        } else {
          toast.error('Notifikasi diblokir. Aktifkan di pengaturan browser.');
        }
      } else {
        toast.error('Browser tidak mendukung notifikasi.');
      }
    }
  };

  if (!serviceCode) {
    return (
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    );
  }

  return (
    <>
      <button
        onClick={handleToggleNotification}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isSubscribed
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }`}
      >
        {isSubscribed ? (
          <>
            <Bell className="w-4 h-4" />
            <span>Notifikasi Aktif</span>
          </>
        ) : (
          <>
            <BellOff className="w-4 h-4" />
            <span>Aktifkan Notifikasi</span>
          </>
        )}
      </button>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default NotificationManager;