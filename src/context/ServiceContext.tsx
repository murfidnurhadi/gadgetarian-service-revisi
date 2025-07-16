import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SparePart {
  id: string;
  name: string;
  price: number;
}

export interface StatusHistory {
  id: string;
  status: 'BELUM DIKERJAKAN' | 'SUDAH SELESAI' | 'PROSES';
  timestamp: string;
  description: string;
  technician: string;
}

export interface Service {
  id: string;
  code: string;
  deviceName: string;
  category: 'MacBook' | 'iPhone' | 'iMac';
  technician: string;
  technicianPhone: string;
  customer: string;
  customerPhone: string;
  entryDate: string;
  estimatedCompletion: string;
  status: 'BELUM DIKERJAKAN' | 'SUDAH SELESAI' | 'PROSES';
  issue: string;
  spareParts: SparePart[];
  estimatedCost: number;
  statusHistory: StatusHistory[];
  notes?: string;
}

interface ServiceContextType {
  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  getServiceByCode: (code: string) => Service | undefined;
  getServiceById: (id: string) => Service | undefined;
  addStatusUpdate: (serviceId: string, status: Service['status'], description: string, technician: string) => void;
  subscribedUsers: Set<string>;
  subscribeToNotifications: (serviceCode: string) => void;
  unsubscribeFromNotifications: (serviceCode: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const mockServices: Service[] = [
  {
    id: '1',
    code: 'SVC-20250621-001',
    deviceName: 'MacBook Air M2 2020',
    category: 'MacBook',
    technician: 'Reyhan Tahira',
    technicianPhone: '+62 812-3456-7890',
    customer: 'Budi Santoso',
    customerPhone: '+62 821-1234-5678',
    entryDate: '2025-06-18',
    estimatedCompletion: '2025-06-25',
    status: 'PROSES',
    issue: 'Layar tidak menyala setelah terkena air',
    spareParts: [
      { id: '1', name: 'LCD Screen 13"', price: 2500000 },
      { id: '2', name: 'Battery', price: 1200000 }
    ],
    estimatedCost: 3700000,
    statusHistory: [
      {
        id: '1',
        status: 'BELUM DIKERJAKAN',
        timestamp: '2025-06-18T09:00:00Z',
        description: 'Service diterima dan terdaftar dalam sistem',
        technician: 'Admin'
      },
      {
        id: '2',
        status: 'PROSES',
        timestamp: '2025-06-19T10:30:00Z',
        description: 'Mulai diagnosa kerusakan perangkat',
        technician: 'Reyhan Tahira'
      },
      {
        id: '3',
        status: 'PROSES',
        timestamp: '2025-06-20T14:15:00Z',
        description: 'Menunggu kedatangan LCD Screen dan Battery',
        technician: 'Reyhan Tahira'
      },
      {
        id: '4',
        status: 'PROSES',
        timestamp: '2025-06-21T08:45:00Z',
        description: 'Spare part sudah datang, mulai proses penggantian',
        technician: 'Reyhan Tahira'
      }
    ]
  },
  {
    id: '2',
    code: 'SVC-20250621-002',
    deviceName: 'iPhone 13 Pro',
    category: 'iPhone',
    technician: 'Reyhan Tahira',
    technicianPhone: '+62 812-3456-7890',
    customer: 'Sari Dewi',
    customerPhone: '+62 822-2345-6789',
    entryDate: '2025-06-19',
    estimatedCompletion: '2025-06-22',
    status: 'SUDAH SELESAI',
    issue: 'Baterai cepat habis dan overheating saat charging',
    spareParts: [
      { id: '3', name: 'Battery iPhone 13Pro', price: 400000 }
    ],
    estimatedCost: 400000,
    statusHistory: [
      {
        id: '1',
        status: 'BELUM DIKERJAKAN',
        timestamp: '2025-06-19T09:15:00Z',
        description: 'Service diterima dan terdaftar dalam sistem',
        technician: 'Admin'
      },
      {
        id: '2',
        status: 'PROSES',
        timestamp: '2025-06-19T11:00:00Z',
        description: 'Mulai diagnosa masalah baterai',
        technician: 'Reyhan Tahira'
      },
      {
        id: '3',
        status: 'PROSES',
        timestamp: '2025-06-20T09:30:00Z',
        description: 'Penggantian baterai iPhone 13 Pro',
        technician: 'Reyhan Tahira'
      },
      {
        id: '4',
        status: 'PROSES',
        timestamp: '2025-06-21T15:20:00Z',
        description: 'Testing fungsi baterai dan charging',
        technician: 'Reyhan Tahira'
      },
      {
        id: '5',
        status: 'SUDAH SELESAI',
        timestamp: '2025-06-22T10:00:00Z',
        description: 'Service selesai, perangkat siap diambil',
        technician: 'Reyhan Tahira'
      }
    ]
  },
  {
    id: '3',
    code: 'SVC-20250621-003',
    deviceName: 'iMac 2021',
    category: 'iMac',
    technician: 'Ahmad Fauzi',
    technicianPhone: '+62 813-4567-8901',
    customer: 'Dina Marlina',
    customerPhone: '+62 823-3456-7890',
    entryDate: '2025-06-20',
    estimatedCompletion: '2025-06-27',
    status: 'PROSES',
    issue: 'Komputer restart sendiri secara random',
    spareParts: [],
    estimatedCost: 1200000,
    statusHistory: [
      {
        id: '1',
        status: 'BELUM DIKERJAKAN',
        timestamp: '2025-06-20T08:30:00Z',
        description: 'Service diterima dan terdaftar dalam sistem',
        technician: 'Admin'
      },
      {
        id: '2',
        status: 'PROSES',
        timestamp: '2025-06-21T09:15:00Z',
        description: 'Mulai diagnosa masalah sistem',
        technician: 'Ahmad Fauzi'
      }
    ]
  },
  {
    id: '4',
    code: 'SVC-20250621-004',
    deviceName: 'MacBook Pro 14" M1',
    category: 'MacBook',
    technician: 'Reyhan Tahira',
    technicianPhone: '+62 812-3456-7890',
    customer: 'Andi Wijaya',
    customerPhone: '+62 824-4567-8901',
    entryDate: '2025-06-21',
    estimatedCompletion: '2025-06-28',
    status: 'BELUM DIKERJAKAN',
    issue: 'Keyboard beberapa tombol tidak berfungsi',
    spareParts: [
      { id: '4', name: 'Keyboard MacBook Pro 14"', price: 1800000 }
    ],
    estimatedCost: 1800000,
    statusHistory: [
      {
        id: '1',
        status: 'BELUM DIKERJAKAN',
        timestamp: '2025-06-21T10:00:00Z',
        description: 'Service diterima dan terdaftar dalam sistem',
        technician: 'Admin'
      }
    ]
  },
  {
    id: '5',
    code: 'SVC-20250621-005',
    deviceName: 'iPhone 14 Plus',
    category: 'iPhone',
    technician: 'Ahmad Fauzi',
    technicianPhone: '+62 813-4567-8901',
    customer: 'Lisa Permata',
    customerPhone: '+62 825-5678-9012',
    entryDate: '2025-06-22',
    estimatedCompletion: '2025-06-25',
    status: 'PROSES',
    issue: 'Layar retak dan touch screen tidak responsif',
    spareParts: [
      { id: '5', name: 'LCD Screen iPhone 14 Plus', price: 3200000 }
    ],
    estimatedCost: 3200000,
    statusHistory: [
      {
        id: '1',
        status: 'BELUM DIKERJAKAN',
        timestamp: '2025-06-22T09:45:00Z',
        description: 'Service diterima dan terdaftar dalam sistem',
        technician: 'Admin'
      },
      {
        id: '2',
        status: 'PROSES',
        timestamp: '2025-06-22T11:30:00Z',
        description: 'Diagnosa kerusakan layar dan touchscreen',
        technician: 'Ahmad Fauzi'
      },
      {
        id: '3',
        status: 'PROSES',
        timestamp: '2025-06-22T16:20:00Z',
        description: 'Menunggu kedatangan LCD Screen iPhone 14 Plus',
        technician: 'Ahmad Fauzi'
      }
    ]
  },
  {
    id: '6',
    code: 'SVC-20250621-006',
    deviceName: 'iMac 24" M1',
    category: 'iMac',
    technician: 'Reyhan Tahira',
    technicianPhone: '+62 812-3456-7890',
    customer: 'Rudi Hartono',
    customerPhone: '+62 826-6789-0123',
    entryDate: '2025-06-23',
    estimatedCompletion: '2025-06-30',
    status: 'SUDAH SELESAI',
    issue: 'Tidak bisa booting, stuck di logo Apple',
    spareParts: [
      { id: '6', name: 'SSD 512GB', price: 2800000 }
    ],
    estimatedCost: 2800000,
    statusHistory: [
      {
        id: '1',
        status: 'BELUM DIKERJAKAN',
        timestamp: '2025-06-23T08:15:00Z',
        description: 'Service diterima dan terdaftar dalam sistem',
        technician: 'Admin'
      },
      {
        id: '2',
        status: 'PROSES',
        timestamp: '2025-06-23T10:00:00Z',
        description: 'Diagnosa masalah booting sistem',
        technician: 'Reyhan Tahira'
      },
      {
        id: '3',
        status: 'PROSES',
        timestamp: '2025-06-24T09:30:00Z',
        description: 'Penggantian SSD dan instalasi ulang sistem',
        technician: 'Reyhan Tahira'
      },
      {
        id: '4',
        status: 'PROSES',
        timestamp: '2025-06-25T14:45:00Z',
        description: 'Testing sistem dan performa setelah penggantian SSD',
        technician: 'Reyhan Tahira'
      },
      {
        id: '5',
        status: 'SUDAH SELESAI',
        timestamp: '2025-06-26T11:30:00Z',
        description: 'Service selesai, sistem berjalan normal',
        technician: 'Reyhan Tahira'
      }
    ]
  }
];

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [subscribedUsers, setSubscribedUsers] = useState<Set<string>>(new Set());

  const addService = (service: Service) => {
    const newService = {
      ...service,
      statusHistory: [
        {
          id: '1',
          status: service.status,
          timestamp: new Date().toISOString(),
          description: 'Service diterima dan terdaftar dalam sistem',
          technician: 'Admin'
        }
      ]
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, updatedService: Partial<Service>) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, ...updatedService } : service
      )
    );
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const getServiceByCode = (code: string): Service | undefined => {
    return services.find(service => service.code === code);
  };

  const getServiceById = (id: string): Service | undefined => {
    return services.find(service => service.id === id);
  };

  const addStatusUpdate = (serviceId: string, status: Service['status'], description: string, technician: string) => {
    setServices(prev => 
      prev.map(service => {
        if (service.id === serviceId) {
          const newStatusHistory = [
            ...service.statusHistory,
            {
              id: Date.now().toString(),
              status,
              timestamp: new Date().toISOString(),
              description,
              technician
            }
          ];
          
          // Send notification if user is subscribed
          if (subscribedUsers.has(service.code)) {
            sendNotification(service.code, service.deviceName, status, description);
          }
          
          return {
            ...service,
            status,
            statusHistory: newStatusHistory
          };
        }
        return service;
      })
    );
  };

  const subscribeToNotifications = (serviceCode: string) => {
    setSubscribedUsers(prev => new Set([...prev, serviceCode]));
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const unsubscribeFromNotifications = (serviceCode: string) => {
    setSubscribedUsers(prev => {
      const newSet = new Set(prev);
      newSet.delete(serviceCode);
      return newSet;
    });
  };

  const sendNotification = (serviceCode: string, deviceName: string, status: string, description: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Update Service ${serviceCode}`, {
        body: `${deviceName} - Status: ${status}\n${description}`,
        icon: '/favicon.ico',
        tag: serviceCode
      });
    }
  };

  return (
    <ServiceContext.Provider value={{
      services,
      addService,
      updateService,
      deleteService,
      getServiceByCode,
      getServiceById,
      addStatusUpdate,
      subscribedUsers,
      subscribeToNotifications,
      unsubscribeFromNotifications
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};