import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Users, Target, Clock, Trash2, RefreshCw, Play, BookOpen } from 'lucide-react';
import { useScores } from '../hooks/useLocalStorage';
import { getRankEmoji, getRankColor, formatDate, calculatePercentage } from '../utils/helpers';
import { quizConfig } from '../data/quizData';

const LeaderboardPage = ({ setCurrentPage, playerName }) => {
  const { scores, getTopScores, clearScores } = useScores();
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all'); // 'all' or 'personal'
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 300);
  }, []);

  const topScores = getTopScores(50); // Show top 50
  const personalScores = scores.filter(s => s.name === playerName);
  const displayScores = selectedTab === 'personal' ? personalScores : topScores;

  const stats = {
    totalParticipants: new Set(scores.map(s => s.name)).size,
    totalQuizzes: scores.length,
    averageScore: scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length) : 0,
    highestScore: scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0
  };

  const handleClearScores = () => {
    clearScores();
    setShowClearConfirm(false);
  };

  const getRankPosition = (score, allScores) => {
    const sortedScores = [...allScores].sort((a, b) => b.score - a.score);
    return sortedScores.findIndex(s => s.id === score.id) + 1;
  };

  const EmptyState = () => (
    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
      <div className="text-8xl mb-6">📝</div>
      <h2 className="text-2xl font-bold text-gray-600 mb-4">
        {selectedTab === 'personal' && playerName
          ? `${playerName} belum mengikuti kuis`
          : 'Belum Ada yang Mengikuti Kuis'
        }
      </h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        {selectedTab === 'personal' && playerName
          ? 'Jadilah yang pertama dengan mengikuti kuis sekarang!'
          : 'Jadilah yang pertama mengikuti kuis dan raih peringkat teratas!'
        }
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setCurrentPage('quiz')}
          className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 justify-center"
        >
          <Play size={20} />
          <span>Ikuti Kuis Sekarang!</span>
        </button>
        <button
          onClick={() => setCurrentPage('materi')}
          className="bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 justify-center"
        >
          <BookOpen size={20} />
          <span>Pelajari Materi</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-8xl mb-4 animate-bounce">🏆</div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Papan Peringkat
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Lihat siapa yang paling hebat dalam kuis kesehatan gigi! 
            Ayo bersaing untuk menjadi yang terbaik! 🌟
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-xl shadow-lg p-1 flex">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedTab === 'all'
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-yellow-600'
                }`}
              >
                🌍 Semua Peserta
              </button>
              {playerName && (
                <button
                  onClick={() => setSelectedTab('personal')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedTab === 'personal'
                      ? 'bg-yellow-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-yellow-600'
                  }`}
                >
                  👤 Skor Saya
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {selectedTab === 'all' && scores.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all">
              <Users className="mx-auto text-blue-600 mb-3" size={32} />
              <div className="text-2xl font-bold text-blue-600">{stats.totalParticipants}</div>
              <div className="text-sm text-gray-600">Total Peserta</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all">
              <Target className="mx-auto text-green-600 mb-3" size={32} />
              <div className="text-2xl font-bold text-green-600">{stats.averageScore}</div>
              <div className="text-sm text-gray-600">Rata-rata Skor</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all">
              <Trophy className="mx-auto text-yellow-600 mb-3" size={32} />
              <div className="text-2xl font-bold text-yellow-600">{stats.highestScore}</div>
              <div className="text-sm text-gray-600">Skor Tertinggi</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all">
              <Clock className="mx-auto text-purple-600 mb-3" size={32} />
              <div className="text-2xl font-bold text-purple-600">{stats.totalQuizzes}</div>
              <div className="text-sm text-gray-600">Total Kuis</div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        {displayScores.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4 mb-8">
            {displayScores.map((player, index) => {
              const rank = selectedTab === 'personal' ? getRankPosition(player, scores) : index + 1;
              const isTopThree = rank <= 3;
              const isCurrentPlayer = player.name === playerName;
              const percentage = calculatePercentage(player.score, quizConfig.maxScore);
              
              return (
                <div
                  key={player.id}
                  className={`bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-[1.02] ${
                    isTopThree ? 'ring-2 ring-yellow-300 shadow-xl' : ''
                  } ${isCurrentPlayer ? 'ring-2 ring-blue-300 bg-blue-50' : ''}`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: showAnimation ? 'fadeInUp 0.5s ease-out forwards' : 'none'  
                  }}
                >
                  <div className="flex items-center justify-between">
                    {/* Left Side - Rank & Player Info */}
                    <div className="flex items-center space-x-4">
                      {/* Rank Badge */}
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${getRankColor(rank)} border-2`}>
                        <span className="text-2xl">{getRankEmoji(rank)}</span>
                      </div>
                      
                      {/* Player Info */}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-bold text-gray-800">
                            {player.name}
                          </h3>
                          {isCurrentPlayer && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              Kamu
                            </span>
                          )}
                          {rank === 1 && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              Juara!
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>#{rank}</span>
                          <span>•</span>
                          <span>{formatDate(player.timestamp)}</span>
                          {selectedTab === 'personal' && (
                            <>
                              <span>•</span>
                              <span>Peringkat #{rank} dari {stats.totalParticipants}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Side - Score */}
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {player.score}
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div>{percentage}%</div>
                        <div className="text-xs">dari {quizConfig.maxScore}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          percentage >= 90 ? 'bg-green-500' :
                          percentage >= 80 ? 'bg-blue-500' :
                          percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Champion Badge */}
                  {rank === 1 && selectedTab === 'all' && (
                    <div className="mt-4 text-center">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        🎉 JUARA 1 - AHLI KESEHATAN GIGI! 🎉
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('quiz')}
              className="bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 justify-center"
            >
              <Play size={20} />
              <span>Ikuti Kuis Lagi</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('materi')}
              className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 justify-center"
            >
              <BookOpen size={20} />
              <span>Pelajari Materi</span>
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2 justify-center"
            >
              <RefreshCw size={20} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Clear Scores Button (Admin) */}
          {scores.length > 0 && (
            <div className="mt-8">
              <button
                onClick={() => setShowClearConfirm(true)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Trash2 size={16} />
                <span>Hapus Semua Skor</span>
              </button>
            </div>
          )}
        </div>

        {/* Personal Best Section */}
        {playerName && selectedTab === 'all' && personalScores.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">
              🎯 Pencapaian {playerName}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {Math.max(...personalScores.map(s => s.score))}
                </div>
                <div className="text-blue-100">Skor Terbaik</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {personalScores.length}
                </div>
                <div className="text-blue-100">Total Kuis</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {Math.round(personalScores.reduce((sum, s) => sum + s.score, 0) / personalScores.length)}
                </div>
                <div className="text-blue-100">Rata-rata</div>
              </div>
            </div>
          </div>
        )}

        {/* Motivational Messages */}
        {scores.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center space-x-2">
              <span>💪</span>
              <span>Motivasi Hari Ini</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🦷</div>
                <p className="text-gray-700 font-medium">
                  "Gigi sehat adalah investasi terbaik untuk masa depan!"
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">⭐</div>
                <p className="text-gray-700 font-medium">
                  "Setiap sikat gigi adalah langkah menuju senyum yang indah!"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Hapus Semua Skor?
              </h3>
              <p className="text-gray-600 mb-6">
                Tindakan ini akan menghapus semua skor dan tidak dapat dibatalkan. 
                Apakah Anda yakin?
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleClearScores}
                  className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LeaderboardPage;