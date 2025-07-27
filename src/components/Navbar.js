import React from 'react';
import { Home, BookOpen, Play, Trophy } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, playerName }) => {
  const navItems = [
    { 
      id: 'home', 
      label: 'Beranda', 
      icon: Home,
      color: 'hover:bg-blue-700'
    },
    { 
      id: 'materi', 
      label: 'Materi', 
      icon: BookOpen,
      color: 'hover:bg-green-700'
    },
    { 
      id: 'quiz', 
      label: 'Kuis', 
      icon: Play,
      color: 'hover:bg-purple-700'
    },
    { 
      id: 'leaderboard', 
      label: 'Ranking', 
      icon: Trophy,
      color: 'hover:bg-yellow-700'
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-2xl animate-pulse">🦷</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">GigiCeria</h1>
              <p className="text-xs text-blue-200">Belajar Sikat Gigi</p>
            </div>
          </div>
          
          {/* Navigation Items */}
          <div className="flex space-x-1 md:space-x-2">
            {navItems.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`
                  relative px-3 py-2 rounded-lg transition-all duration-300 
                  transform hover:scale-105 group
                  ${currentPage === id 
                    ? 'bg-white text-blue-600 shadow-lg font-semibold' 
                    : `${color} active:scale-95`
                  }
                `}
              >
                {/* Mobile: Icon only */}
                <Icon size={20} className="md:hidden" />
                
                {/* Desktop: Text */}
                <span className="hidden md:inline text-sm font-medium">
                  {label}
                </span>
                
                {/* Active indicator */}
                {currentPage === id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Player Welcome Message */}
        {playerName && (
          <div className="pb-3 text-center animate-fadeIn">
            <div className="inline-flex items-center bg-blue-800 bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                👋 Selamat datang, <span className="font-bold text-yellow-300">{playerName}</span>!
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;