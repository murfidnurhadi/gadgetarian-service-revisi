import React from 'react';
import { Search, ArrowLeft, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  showLogin?: boolean;
  onLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  showSearch = false,
  onSearch,
  showLogin = false,
  onLogin
}) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          {showSearch && (
            <div className="flex items-center space-x-2">
              <Search size={20} />
              <span className="text-lg font-medium">{title}</span>
            </div>
          )}
          
          {!showSearch && (
            <h1 className="text-lg font-medium">{title}</h1>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {showLogin && !user && (
            <button
              onClick={onLogin}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Login Teknisi
            </button>
          )}
          
          {user && (
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-blue-200">RT</div>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;