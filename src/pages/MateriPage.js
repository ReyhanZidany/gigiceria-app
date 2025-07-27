import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, CheckCircle, ArrowRight } from 'lucide-react';
import { materiData } from '../data/materiData';
import { getAnimationDelay } from '../utils/helpers';

const MateriPage = ({ setCurrentPage, playerName }) => {
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [completedMateris, setCompletedMateris] = useState(new Set());
  const [showAnimation, setShowAnimation] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setShowAnimation(true), 300);
    
    // Load completed materis from localStorage
    const saved = localStorage.getItem('gigiceria-completed-materis');
    if (saved) {
      setCompletedMateris(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    // Calculate reading progress
    const progress = (completedMateris.size / materiData.length) * 100;
    setReadingProgress(progress);
    
    // Save to localStorage
    localStorage.setItem('gigiceria-completed-materis', JSON.stringify([...completedMateris]));
  }, [completedMateris]);

  const toggleCard = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
      // Mark as completed when expanded
      setCompletedMateris(prev => new Set([...prev, id]));
    }
    setExpandedCards(newExpanded);
  };

  const markAsCompleted = (id) => {
    setCompletedMateris(prev => new Set([...prev, id]));
  };

  const allCompleted = completedMateris.size === materiData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Materi Pembelajaran
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {playerName ? `Halo ${playerName}! ` : ''}
            Yuk pelajari cara sikat gigi yang benar step by step! 🦷✨
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress Belajar</span>
              <span className="text-sm font-bold text-green-600">{Math.round(readingProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${readingProgress}%` }}
              >
                <div className="h-full bg-white bg-opacity-30 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {completedMateris.size} dari {materiData.length} materi selesai
            </p>
          </div>

          {/* Achievement Badge */}
          {allCompleted && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold animate-bounce">
              <CheckCircle className="mr-2" size={20} />
              🎉 Semua materi selesai! Siap untuk kuis!
            </div>
          )}
        </div>

        {/* Materi Cards */}
        <div className="space-y-6 mb-12">
          {materiData.map((materi, index) => {
            const isExpanded = expandedCards.has(materi.id);
            const isCompleted = completedMateris.has(materi.id);
            
            return (
              <div
                key={materi.id}
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-500 hover:shadow-xl transform hover:scale-[1.02] ${
                  isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                } ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: getAnimationDelay(index, 150) }}
              >
                {/* Card Header */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleCard(materi.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md ${materi.iconBg}`}>
                        {materi.icon}
                      </div>
                      
                      {/* Title and Status */}
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                          {materi.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500 text-sm">
                            Materi {index + 1} dari {materiData.length}
                          </span>
                          {isCompleted && (
                            <div className="flex items-center text-green-600 text-sm font-medium">
                              <CheckCircle size={16} className="mr-1" />
                              Selesai
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Expand Button */}
                    <div className="flex items-center space-x-2">
                      {!isExpanded && (
                        <span className="hidden md:inline text-sm text-gray-500">
                          Klik untuk baca
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="text-gray-400" size={24} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={24} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className={`p-6 rounded-xl bg-gradient-to-br ${materi.bgColor} border border-gray-100`}>
                      <div className="prose prose-lg max-w-none">
                        {materi.content.split('\n').map((paragraph, pIndex) => {
                          if (paragraph.trim() === '') return null;
                          
                          if (paragraph.startsWith('•')) {
                            return (
                              <div key={pIndex} className="flex items-start space-x-2 mb-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span className="text-gray-700">{paragraph.substring(1).trim()}</span>
                              </div>
                            );
                          }
                          
                          if (paragraph.includes('**')) {
                            const parts = paragraph.split('**');
                            return (
                              <p key={pIndex} className="mb-4 text-gray-700 leading-relaxed">
                                {parts.map((part, partIndex) => 
                                  partIndex % 2 === 1 ? (
                                    <strong key={partIndex} className="font-bold text-gray-800">{part}</strong>
                                  ) : (
                                    <span key={partIndex}>{part}</span>
                                  )
                                )}
                              </p>
                            );
                          }
                          
                          return (
                            <p key={pIndex} className="mb-4 text-gray-700 leading-relaxed">
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>
                      
                      {/* Mark as Complete Button */}
                      {!isCompleted && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsCompleted(materi.id);
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
                          >
                            <CheckCircle size={18} />
                            <span>Tandai Selesai</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          {allCompleted ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Selamat! Semua Materi Selesai!
              </h2>
              <p className="text-gray-600 mb-6">
                Kamu sudah mempelajari semua cara sikat gigi yang benar. 
                Sekarang saatnya menguji pemahaman dengan kuis!
              </p>
              
              <button
                onClick={() => setCurrentPage('quiz')}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <Play size={24} />
                <span>Mulai Kuis Sekarang!</span>
                <ArrowRight size={20} />
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200">
              <p className="text-blue-800 mb-4">
                💡 <strong>Tips:</strong> Baca semua materi dulu sebelum mengerjakan kuis untuk hasil yang optimal!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setCurrentPage('quiz')}
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Langsung ke Kuis 🎯
                </button>
                
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Ke Atas 📚
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Reading Progress */}
      <div className="fixed bottom-6 right-6 bg-white rounded-full shadow-lg p-3 border border-gray-200">
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray={`${readingProgress}, 100`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-green-600">
              {Math.round(readingProgress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriPage;