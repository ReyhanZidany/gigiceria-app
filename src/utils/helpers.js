// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Format waktu dari detik ke menit:detik
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Format tanggal ke format Indonesia
export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Hitung persentase
export const calculatePercentage = (score, maxScore) => {
  return Math.round((score / maxScore) * 100);
};

// Shuffle array (untuk mengacak soal jika diperlukan)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Debounce function untuk mencegah spam click
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validasi nama player
export const validatePlayerName = (name) => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return { isValid: false, message: 'Nama tidak boleh kosong!' };
  }
  
  if (trimmedName.length < 2) {
    return { isValid: false, message: 'Nama minimal 2 karakter!' };
  }
  
  if (trimmedName.length > 20) {
    return { isValid: false, message: 'Nama maksimal 20 karakter!' };
  }
  
  if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
    return { isValid: false, message: 'Nama hanya boleh berisi huruf dan spasi!' };
  }
  
  return { isValid: true, message: 'Nama valid!' };
};

// Generate random ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get rank emoji berdasarkan posisi
export const getRankEmoji = (position) => {
  const emojis = {
    1: '🥇',
    2: '🥈', 
    3: '🥉'
  };
  return emojis[position] || '🏅';
};

// Get rank color berdasarkan posisi
export const getRankColor = (position) => {
  const colors = {
    1: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    2: 'text-gray-600 bg-gray-50 border-gray-200',
    3: 'text-orange-600 bg-orange-50 border-orange-200'
  };
  return colors[position] || 'text-blue-600 bg-blue-50 border-blue-200';
};

// Animasi delay untuk staggered animations
export const getAnimationDelay = (index, baseDelay = 100) => {
  return `${index * baseDelay}ms`;
};

// Check apakah device mobile
export const isMobile = () => {
  return window.innerWidth < 768;
};

// Smooth scroll ke element
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
};

// Local storage helpers dengan error handling
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting to localStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }
};

// Sound helpers (jika ingin menambahkan sound effect)
export const playSound = (soundType) => {
  // Implementasi sound bisa ditambahkan di sini
  // Contoh: beep untuk jawaban benar, buzz untuk salah
  const sounds = {
    correct: () => console.log('🔊 Beep! Jawaban benar!'),
    incorrect: () => console.log('🔊 Buzz! Jawaban salah!'),
    complete: () => console.log('🔊 Tada! Kuis selesai!'),
    tick: () => console.log('🔊 Tick! Timer countdown!')
  };
  
  if (sounds[soundType]) {
    sounds[soundType]();
  }
};

// Constants
export const CONSTANTS = {
  STORAGE_KEYS: {
    SCORES: 'gigiceria-scores',
    PLAYER: 'gigiceria-player',
    SETTINGS: 'gigiceria-settings'
  },
  QUIZ: {
    TIME_PER_QUESTION: 30,
    POINTS_PER_CORRECT: 10,
    PASSING_SCORE: 70
  },
  ANIMATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500
  }
};

export default {
  formatTime,
  formatDate,
  calculatePercentage,
  shuffleArray,
  debounce,
  validatePlayerName,
  generateId,
  getRankEmoji,
  getRankColor,
  getAnimationDelay,
  isMobile,
  scrollToElement,
  storage,
  playSound,
  CONSTANTS
};