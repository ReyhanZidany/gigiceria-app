import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Trophy, Star, Users, Award } from 'lucide-react';
import { validatePlayerName, debounce } from '../utils/helpers';

const HomePage = ({ setCurrentPage, setPlayerName }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Debounced validation
  const validateName = debounce((inputName) => {
    const validation = validatePlayerName(inputName);
    if (!validation.isValid && inputName.length > 0) {
      setNameError(validation.message);
    } else {
      setNameError('');
    }
  }, 300);

  useEffect(() => {
    validateName(name);
  }, [name]);

  useEffect(() => {
    // Animation entrance
    setTimeout(() => setShowWelcome(true), 500);
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleStartLearning = async () => {
    const validation = validatePlayerName(name);
    
    if (!validation.isValid) {
      setNameError(validation.message);
      return;
    }

    setIsLoading(true);
    
    // Simulasi loading untuk UX yang lebih baik
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPlayerName(name.trim());
    setCurrentPage('materi');
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !nameError && name.trim()) {
      handleStartLearning();
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Materi Lengkap',
      description: 'Pelajari cara sikat gigi yang benar dengan materi yang mudah dipahami dan interaktif',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Play,
      title: 'Kuis Interaktif',
      description: 'Uji pemahaman dengan 10 pertanyaan seru dan sistem timer yang menantang',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Trophy,
      title: 'Leaderboard',
      description: 'Lihat ranking dan bersaing dengan teman-teman untuk menjadi yang terbaik',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  const stats = [
    { icon: Users, value: '1000+', label: 'Siswa Belajar', color: 'text-blue-600' },
    { icon: Award, value: '95%', label: 'Tingkat Kepuasan', color: 'text-green-600' },
    { icon: Star, value: '4.9', label: 'Rating Aplikasi', color: 'text-yellow-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className={`text-center transition-all duration-1000 ${
          showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Logo dan Title */}
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-bounce">🦷</div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              GigiCeria
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Platform pembelajaran interaktif untuk mengajarkan cara sikat gigi yang benar 
              kepada anak-anak <span className="font-semibold text-blue-600">Kelurahan Padangsari</span>
            </p>
          </div>

          {/* Input Form */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                🎉 Mari Mulai Belajar!
              </h2>
              
              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Siapa nama kamu?
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all text-lg ${
                      nameError 
                        ? 'border-red-300 focus:border-red-500 bg-red-50' 
                        : 'border-gray-300 focus:border-blue-500 bg-white'
                    }`}
                    placeholder="Tulis nama kamu di sini..."
                    maxLength={20}
                    disabled={isLoading}
                  />
                  
                  {nameError && (
                    <p className="text-red-500 text-sm mt-2 animate-pulse">
                      {nameError}
                    </p>
                  )}
                  
                  <p className="text-gray-500 text-sm mt-2">
                    {name.length}/20 karakter
                  </p>
                </div>
                
                <button
                  onClick={handleStartLearning}
                  disabled={!name.trim() || nameError || isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform ${
                    !name.trim() || nameError || isLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Memuat...</span>
                    </div>
                  ) : (
                    '🚀 Mulai Belajar!'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <stat.icon className={`mx-auto mb-4 ${stat.color}`} size={48} />
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgColor} rounded-2xl shadow-lg p-8 border-2 ${feature.borderColor} transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                style={{ animationDelay: `${(index + 1) * 300}ms` }}
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-md`}>
                  <feature.icon className={feature.color} size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Siap Menjadi Ahli Kesehatan Gigi? 🦷
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Bergabunglah dengan ribuan anak lainnya yang sudah belajar cara sikat gigi yang benar!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-2xl">⏱️</span>
                <span>Hanya 10 menit</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-2xl">🎯</span>
                <span>10 soal seru</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-2xl">🏆</span>
                <span>Sertifikat digital</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Appeal */}
      <div className="fixed top-20 left-10 text-4xl opacity-20 animate-pulse">🦷</div>
      <div className="fixed top-40 right-10 text-3xl opacity-20 animate-bounce">✨</div>
      <div className="fixed bottom-20 left-20 text-2xl opacity-20 animate-pulse">🪥</div>
      <div className="fixed bottom-40 right-20 text-3xl opacity-20 animate-bounce">💫</div>
    </div>
  );
};

export default HomePage;