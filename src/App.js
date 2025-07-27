import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MateriPage from './pages/MateriPage';
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { storage, CONSTANTS } from './utils/helpers';

function App() {
  // State Management
  const [currentPage, setCurrentPage] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data on app start
  useEffect(() => {
    const savedPlayer = storage.get(CONSTANTS.STORAGE_KEYS.PLAYER);
    if (savedPlayer && savedPlayer.name) {
      setPlayerName(savedPlayer.name);
    }
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Save player data when it changes
  useEffect(() => {
    if (playerName) {
      const playerData = storage.get(CONSTANTS.STORAGE_KEYS.PLAYER, {});
      storage.set(CONSTANTS.STORAGE_KEYS.PLAYER, {
        ...playerData,
        name: playerName,
        lastActive: new Date().toISOString()
      });
    }
  }, [playerName]);

  // Page navigation handler
  const handlePageChange = (page) => {
    // Add smooth transition
    document.body.style.opacity = '0.8';
    setTimeout(() => {
      setCurrentPage(page);
      document.body.style.opacity = '1';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  };

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6 animate-bounce">🦷</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          GigiCeria
        </h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat aplikasi...</p>
      </div>
    </div>
  );

  // Error Boundary Component
  const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      const handleError = (error) => {
        console.error('App Error:', error);
        setHasError(true);
      };

      window.addEventListener('error', handleError);
      return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Terjadi Kesalahan
            </h1>
            <p className="text-gray-600 mb-6">
              Aplikasi mengalami masalah. Silakan muat ulang halaman.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }

    return children;
  };

  // Main render function
  const renderCurrentPage = () => {
    const pageProps = {
      setCurrentPage: handlePageChange,
      playerName
    };

    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            {...pageProps}
            setPlayerName={setPlayerName}
          />
        );
      
      case 'materi':
        return (
          <MateriPage {...pageProps} />
        );
      
      case 'quiz':
        return (
          <QuizPage {...pageProps} />
        );
      
      case 'leaderboard':
        return (
          <LeaderboardPage {...pageProps} />
        );
      
      default:
        return (
          <HomePage 
            {...pageProps}
            setPlayerName={setPlayerName}
          />
        );
    }
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Main App Component
  return (
    <ErrorBoundary>
      <div className="App min-h-screen bg-gray-50">
        {/* Navigation */}
        <Navbar 
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          playerName={playerName}
        />
        
        {/* Main Content */}
        <main className="transition-opacity duration-300">
          {renderCurrentPage()}
        </main>
        
        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🦷</span>
                </div>
                <h3 className="text-2xl font-bold">GigiCeria</h3>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Platform pembelajaran interaktif untuk mengajarkan cara sikat gigi yang benar 
                kepada anak-anak Kelurahan Padangsari. Mari bersama-sama menjaga kesehatan gigi! 🦷✨
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-yellow-400">
                  🌟 Fitur Unggulan
                </h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Materi pembelajaran interaktif</li>
                  <li>• Kuis dengan sistem timer</li>
                  <li>• Leaderboard real-time</li>
                  <li>• Progress tracking</li>
                  <li>• Mobile responsive</li>
                </ul>
              </div>

              {/* Statistics */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-400">
                  📊 Manfaat Belajar
                </h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Mencegah gigi berlubang</li>
                  <li>• Menjaga kesehatan mulut</li>
                  <li>• Meningkatkan percaya diri</li>
                  <li>• Kebiasaan hidup sehat</li>
                  <li>• Menghemat biaya dokter</li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-400">
                  🏥 Target Pengguna
                </h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Anak-anak SD (6-12 tahun)</li>
                  <li>• Anak-anak SMP (13-15 tahun)</li>
                  <li>• Kelurahan Padangsari</li>
                  <li>• Seminar edukasi kesehatan</li>
                  <li>• Program puskesmas</li>
                </ul>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">5</div>
                <div className="text-xs text-gray-400">Materi Lengkap</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">10</div>
                <div className="text-xs text-gray-400">Soal Kuis</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">100%</div>
                <div className="text-xs text-gray-400">Mobile Friendly</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">∞</div>
                <div className="text-xs text-gray-400">Gratis Selamanya</div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 pt-6 text-center">
              <p className="text-gray-400 text-sm mb-2">
                © 2025 GigiCeria - Seminar Edukasi Kesehatan Gigi untuk Anak SD-SMP
              </p>
              <p className="text-gray-500 text-xs">
                Dibuat dengan ❤️ untuk kesehatan gigi anak-anak Indonesia
              </p>
            </div>

            {/* Fun Elements */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center space-x-2 text-yellow-400">
                <span>🦷</span>
                <span className="text-sm">Keep Smiling, Keep Healthy!</span>
                <span>✨</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => handlePageChange('materi')}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 group"
            title="Bantuan"
          >
            <span className="text-xl">❓</span>
            <div className="absolute bottom-16 left-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Butuh bantuan? Lihat materi
            </div>
          </button>
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-110 group"
            title="Ke Atas"
          >
            <span className="text-xl">⬆️</span>
            <div className="absolute bottom-16 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Kembali ke atas
            </div>
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;