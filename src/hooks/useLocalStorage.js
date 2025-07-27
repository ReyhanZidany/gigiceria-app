import { useState, useEffect } from 'react';

// Custom hook untuk mengelola localStorage dengan lebih mudah
const useLocalStorage = (key, initialValue) => {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Coba ambil dari localStorage
      const item = window.localStorage.getItem(key);
      // Parse stored json atau kembalikan initialValue jika tidak ada
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Jika error, kembalikan initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fungsi untuk set value ke localStorage
  const setValue = (value) => {
    try {
      // Simpan ke state
      setStoredValue(value);
      // Simpan ke localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Fungsi untuk menghapus item dari localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

// Hook khusus untuk mengelola scores
export const useScores = () => {
  const [scores, setScores, removeScores] = useLocalStorage('gigiceria-scores', []);

  const addScore = (playerName, score) => {
    const newScore = {
      id: Date.now(),
      name: playerName,
      score: score,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('id-ID')
    };

    setScores(prevScores => [...prevScores, newScore]);
    return newScore;
  };

  const getTopScores = (limit = 10) => {
    return [...scores]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  };

  const getPlayerScores = (playerName) => {
    return scores
      .filter(score => score.name === playerName)
      .sort((a, b) => b.score - a.score);
  };

  const clearScores = () => {
    removeScores();
  };

  return {
    scores,
    addScore,
    getTopScores,
    getPlayerScores,
    clearScores
  };
};

// Hook khusus untuk mengelola player data
export const usePlayer = () => {
  const [playerData, setPlayerData, removePlayerData] = useLocalStorage('gigiceria-player', {
    name: '',
    totalQuizzes: 0,
    bestScore: 0,
    lastPlayed: null
  });

  const updatePlayer = (name, score) => {
    setPlayerData(prev => ({
      name,
      totalQuizzes: prev.totalQuizzes + 1,
      bestScore: Math.max(prev.bestScore, score),
      lastPlayed: new Date().toISOString()
    }));
  };

  const resetPlayer = () => {
    removePlayerData();
  };

  return {
    playerData,
    updatePlayer,
    resetPlayer
  };
};

export default useLocalStorage;