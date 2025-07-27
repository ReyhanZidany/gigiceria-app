export const quizQuestions = [
  {
    id: 1,
    question: "Berapa kali sehari kita harus sikat gigi?",
    options: ["1 kali", "2 kali", "3 kali", "4 kali"],
    correctAnswer: "2 kali",
    explanation: "Sikat gigi dilakukan 2 kali sehari: pagi setelah sarapan dan malam sebelum tidur untuk hasil optimal.",
    points: 10,
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Berapa lama waktu yang dibutuhkan untuk sikat gigi?",
    options: ["30 detik", "1 menit", "2 menit", "5 menit"],
    correctAnswer: "2 menit",
    explanation: "Sikat gigi selama 2 menit memastikan semua bagian gigi bersih dengan sempurna dan bakteri terangkat.",
    points: 10,
    difficulty: "easy"
  },
  {
    id: 3,
    question: "Seberapa besar pasta gigi yang dibutuhkan?",
    options: ["Sebesar kacang tanah", "Sebesar biji jagung", "Sebesar kelereng", "Sebesar sikat gigi"],
    correctAnswer: "Sebesar biji jagung",
    explanation: "Pasta gigi cukup sebesar biji jagung saja. Terlalu banyak pasta gigi malah tidak efektif.",
    points: 10,
    difficulty: "medium"
  },
  {
    id: 4,
    question: "Bagian gigi mana yang harus disikat?",
    options: ["Hanya bagian depan", "Hanya bagian belakang", "Hanya bagian atas", "Semua bagian gigi"],
    correctAnswer: "Semua bagian gigi",
    explanation: "Semua bagian gigi harus disikat: depan, belakang, dan bagian atas (permukaan kunyah) untuk kebersihan maksimal.",
    points: 10,
    difficulty: "easy"
  },
  {
    id: 5,
    question: "Kapan sebaiknya mengganti sikat gigi?",
    options: ["Setiap bulan", "Setiap 3 bulan", "Setiap 6 bulan", "Setiap tahun"],
    correctAnswer: "Setiap 3 bulan",
    explanation: "Sikat gigi sebaiknya diganti setiap 3-4 bulan atau jika bulu sikat sudah rusak dan tidak efektif lagi.",
    points: 10,
    difficulty: "medium"
  },
  {
    id: 6,
    question: "Apa yang terjadi jika tidak sikat gigi?",
    options: ["Gigi menjadi putih", "Gigi menjadi kuat", "Gigi berlubang dan bau mulut", "Tidak ada yang terjadi"],
    correctAnswer: "Gigi berlubang dan bau mulut",
    explanation: "Jika tidak sikat gigi, bakteri akan menumpuk dan menghasilkan asam yang menyebabkan gigi berlubang dan bau mulut.",
    points: 10,
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Gerakan sikat gigi yang benar adalah?",
    options: ["Gerakan lurus", "Gerakan memutar", "Gerakan zigzag", "Gerakan acak"],
    correctAnswer: "Gerakan memutar",
    explanation: "Gerakan memutar kecil dan lembut membantu membersihkan sisa makanan dan plak dengan lebih efektif.",
    points: 10,
    difficulty: "medium"
  },
  {
    id: 8,
    question: "Setelah sikat gigi, apa yang harus dilakukan?",
    options: ["Langsung tidur", "Kumur dengan air bersih", "Makan permen", "Tidak perlu apa-apa"],
    correctAnswer: "Kumur dengan air bersih",
    explanation: "Setelah sikat gigi, kumur dengan air bersih untuk membilas sisa pasta gigi dan kotoran yang sudah dilepaskan.",
    points: 10,
    difficulty: "easy"
  },
  {
    id: 9,
    question: "Makanan apa yang sebaiknya dihindari untuk kesehatan gigi?",
    options: ["Buah-buahan", "Sayuran", "Makanan manis dan lengket", "Air putih"],
    correctAnswer: "Makanan manis dan lengket",
    explanation: "Makanan manis dan lengket mudah menempel di gigi dan menjadi makanan bakteri yang menyebabkan kerusakan gigi.",
    points: 10,
    difficulty: "medium"
  },
  {
    id: 10,
    question: "Seberapa sering harus periksa ke dokter gigi?",
    options: ["Setiap bulan", "Setiap 3 bulan", "Setiap 6 bulan", "Hanya jika sakit"],
    correctAnswer: "Setiap 6 bulan",
    explanation: "Periksa ke dokter gigi setiap 6 bulan untuk menjaga kesehatan gigi dan mendeteksi masalah sedini mungkin.",
    points: 10,
    difficulty: "hard"
  }
];

// Konfigurasi kuis
export const quizConfig = {
  timePerQuestion: 30, // detik
  passingScore: 70, // persen
  totalQuestions: quizQuestions.length,
  maxScore: quizQuestions.length * 10,
};

// Grade system
export const gradeSystem = [
  { min: 90, grade: 'A', message: 'Luar biasa! Kamu sangat memahami cara sikat gigi yang benar! 🌟', emoji: '🏆' },
  { min: 80, grade: 'B', message: 'Bagus sekali! Pemahaman kamu sudah sangat baik! 👏', emoji: '🥇' },
  { min: 70, grade: 'C', message: 'Cukup baik! Tetap semangat belajar ya! 💪', emoji: '🥈' },
  { min: 0, grade: 'D', message: 'Jangan menyerah! Coba pelajari materi lagi dan ulangi kuis! 📚', emoji: '🥉' }
];

export const getGrade = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  return gradeSystem.find(grade => percentage >= grade.min);
};

export default quizQuestions;