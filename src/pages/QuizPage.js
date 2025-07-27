import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Star, Award, RotateCcw, Trophy, BookOpen, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { quizQuestions, quizConfig, getGrade } from '../data/quizData';
import { useScores, usePlayer } from '../hooks/useLocalStorage';
import { debounce, playSound } from '../utils/helpers';

const QuizPage = ({ playerName, setCurrentPage }) => {
  // Quiz States
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizConfig.timePerQuestion);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks
  const { addScore } = useScores();
  const { updatePlayer } = usePlayer();

  // Timer Effect
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResult && !isSubmitting) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 5) {
          playSound('tick');
        }
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitting) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResult, isSubmitting]);

  // Debounced answer selection
  const debouncedAnswerSelect = useCallback(
    debounce((answer) => {
      setSelectedAnswer(answer);
    }, 100),
    []
  );

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(quizConfig.timePerQuestion);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResult(false);
  };

  const handleAnswerSelect = (answer) => {
    if (isSubmitting) return;
    debouncedAnswerSelect(answer);
  };

  const handleNextQuestion = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const currentQ = quizQuestions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    // Save answer
    const answerData = {
      questionId: currentQ.id,
      question: currentQ.question,
      selectedAnswer,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      timeUsed: quizConfig.timePerQuestion - timeLeft
    };
    
    setAnswers(prev => [...prev, answerData]);

    // Update score
    let newScore = score;
    if (isCorrect) {
      newScore = score + currentQ.points;
      setScore(newScore);
      playSound('correct');
    } else {
      playSound('incorrect');
    }

    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setTimeLeft(quizConfig.timePerQuestion);
    } else {
      // Quiz finished
      setShowResult(true);
      addScore(playerName, newScore);
      updatePlayer(playerName, newScore);
      playSound('complete');
    }
    
    setIsSubmitting(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setTimeLeft(quizConfig.timePerQuestion);
    setAnswers([]);
    setQuizStarted(false);
  };

  // Quiz Start Screen Component
  const QuizStartScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center py-12">
          <div className="text-8xl mb-6 animate-bounce">🎯</div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Kuis Kesehatan Gigi
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {playerName ? `Halo ${playerName}! ` : ''}
            Siap menguji pemahaman kamu tentang cara sikat gigi yang benar?
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 Aturan Kuis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                <Clock className="text-blue-600 flex-shrink-0" size={32} />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Waktu</h3>
                  <p className="text-gray-600">30 detik per soal</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-xl">
                <Star className="text-yellow-600 flex-shrink-0" size={32} />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Poin</h3>
                  <p className="text-gray-600">10 poin per jawaban benar</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                <Award className="text-green-600 flex-shrink-0" size={32} />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Total Soal</h3>
                  <p className="text-gray-600">{quizQuestions.length} pertanyaan</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                <Trophy className="text-purple-600 flex-shrink-0" size={32} />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Skor Maksimal</h3>
                  <p className="text-gray-600">{quizConfig.maxScore} poin</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-2">💡 Tips Sukses:</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• Baca pertanyaan dengan teliti</li>
                <li>• Jangan terburu-buru, masih ada waktu 30 detik</li>
                <li>• Ingat materi yang sudah dipelajari</li>
                <li>• Tetap tenang dan fokus</li>
              </ul>
            </div>
            
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <span>🚀 Mulai Kuis!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Quiz Question Component
  const QuizQuestionScreen = () => {
    const currentQ = quizQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="py-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
                    Soal {currentQuestion + 1}/{quizQuestions.length}
                  </div>
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                    Skor: {score}
                  </div>
                </div>
                
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold ${
                  timeLeft <= 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  <Clock size={20} />
                  <span className="text-lg">{timeLeft}s</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="h-full bg-white bg-opacity-30 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                {Math.round(progress)}% selesai
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                {currentQ.question}
              </h2>
              
              <div className="grid gap-4">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isSubmitting}
                    className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-md transform hover:scale-[1.02] disabled:opacity-50 ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === option 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        <div className="w-4 h-4 rounded-full bg-white opacity-0 transition-opacity">
                          {selectedAnswer === option && (
                            <div className="w-full h-full bg-blue-500 rounded-full opacity-100"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-lg font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <div className="text-center">
              <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer || isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:transform-none flex items-center space-x-2 mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentQuestion === quizQuestions.length - 1 ? 'Selesai! 🎉' : 'Lanjut'}
                    </span>
                    {currentQuestion < quizQuestions.length - 1 && <ArrowRight size={20} />}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Quiz Result Component
  const QuizResultScreen = () => {
    const grade = getGrade(score, quizConfig.maxScore);
    const percentage = (score / quizConfig.maxScore) * 100;
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="py-12">
            {/* Main Result */}
            <div className="text-center mb-12">
              <div className="text-8xl mb-6 animate-bounce">{grade.emoji}</div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Hasil Kuis
              </h1>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="text-6xl font-bold text-blue-600 mb-4">{score}</div>
                <p className="text-lg text-gray-600 mb-4">
                  Skor kamu dari {quizConfig.maxScore} poin
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">{grade.grade}</div>
                    <div className="text-gray-600">Nilai</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">{percentage.toFixed(1)}%</div>
                    <div className="text-gray-600">Persentase</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600">{correctAnswers}/{quizQuestions.length}</div>
                    <div className="text-gray-600">Benar</div>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mb-8 font-medium">{grade.message}</p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 justify-center"
                  >
                    <RotateCcw size={20} />
                    <span>Coba Lagi</span>
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage('leaderboard')}
                    className="bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 justify-center"
                  >
                    <Trophy size={20} />
                    <span>Lihat Ranking</span>
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage('materi')}
                    className="bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2 justify-center"
                  >
                    <BookOpen size={20} />
                    <span>Pelajari Lagi</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Answer Review */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <span>📋</span>
                <span>Review Jawaban</span>
              </h2>
              
              <div className="space-y-4">
                {answers.map((answer, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-xl border-2 ${
                      answer.isCorrect 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      {answer.isCorrect ? (
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      ) : (
                        <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Soal {index + 1}: {answer.question}
                        </h3>
                        <div className="text-sm space-y-1">
                          <p>
                            <span className="font-medium">Jawaban kamu: </span>
                            <span className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                              {answer.selectedAnswer || 'Tidak dijawab'}
                            </span>
                          </p>
                          {!answer.isCorrect && (
                            <p>
                              <span className="font-medium">Jawaban benar: </span>
                              <span className="text-green-700">{answer.correctAnswer}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Render
  if (!quizStarted) {
    return <QuizStartScreen />;
  }

  if (showResult) {
    return <QuizResultScreen />;
  }

};

export default QuizPage;