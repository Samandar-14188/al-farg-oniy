'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import LeadModal from '@/components/LeadModal';
import { Award, CheckCircle2, ArrowRight, RefreshCw, Sparkles, BookOpen, Brain, Globe, Laptop } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizCategories = [
  {
    id: 'web',
    title: 'Web Dasturlash & IT',
    icon: Laptop,
    recommendedCourse: 'Full-Stack Web Dasturlash',
    questions: [
      {
        id: 1,
        question: "Veb-sayt strukturasini va kontentini belgilovchi til qaysi?",
        options: ["HTML", "CSS", "Python", "SQL"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "JavaScriptda o'zgaruvchi e'lon qilish uchun qaysi kalit so'z ishlatiladi?",
        options: ["let / const", "define", "dim", "variable"],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "Frontend va Backend o'rtasida ma'lumot almashish interfeysi nima deyiladi?",
        options: ["REST API", "Compiler", "IP Address", "Router"],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "Veb-saytlarga dizayn va stil berish uchun qaysi texnologiya ishlatiladi?",
        options: ["CSS", "C++", "MySQL", "PHP"],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "React JS kutubxonasi qaysi kompaniya tomonidan yaratilgan?",
        options: ["Meta (Facebook)", "Google", "Microsoft", "Apple"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'english',
    title: 'English & IELTS Level Test',
    icon: Globe,
    recommendedCourse: 'English & IELTS 7.5+ Intensive',
    questions: [
      {
        id: 1,
        question: "Choose the correct sentence:",
        options: [
          "She don't like coffee.",
          "She doesn't like coffee.",
          "She not like coffee.",
          "She isn't like coffee."
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Complete: 'If I ___ more time, I would study another language.'",
        options: ["have", "had", "will have", "would have"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What is the synonym of 'rapidly'?",
        options: ["Slowly", "Quickly", "Carefully", "Rarely"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Choose the passive voice: 'They built this school in 2020.'",
        options: [
          "This school was built in 2020.",
          "This school is built in 2020.",
          "They have built this school.",
          "School built in 2020."
        ],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "What does 'Overall' mean in IELTS scoring context?",
        options: ["Minimum score", "Average combined score", "Listening score", "Writing score"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'logic',
    title: 'Python & AI Logika Testi',
    icon: Brain,
    recommendedCourse: "Python va Sun'iy Intellekt (AI)",
    questions: [
      {
        id: 1,
        question: "Agar A=5 va B=10 bo'lsa, (A + B) * 2 qiymati nechaga teng?",
        options: ["20", "25", "30", "15"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "Python dasturlash tilida ma'lumotni ekranga chiqarish buyrug'i qaysi?",
        options: ["print()", "console.log()", "echo", "system.out"],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "Sun'iy intellekt yo'nalishida ko'p ishlatiladigan Python kutubxonasi qaysi?",
        options: ["NumPy / PyTorch", "Bootstrap", "Tailwind", "jQuery"],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "Mantiqiy shart operatori qaysi?",
        options: ["if / else", "for / while", "try / catch", "import"],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "Ro'yxat (List) ichidagi elementlar tartib indeksi qaysi raqamdan boshlanadi?",
        options: ["0 dan", "1 dan", "-1 dan", "Custom"],
        correctAnswer: 0
      }
    ]
  }
];

export default function QuizTestPage() {
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCategory = quizCategories.find((c) => c.id === selectedCatId);

  const handleSelectAnswer = (ansIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = ansIdx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (!activeCategory) return;
    if (currentStep < activeCategory.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    if (!activeCategory) return 0;
    let score = 0;
    activeCategory.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedCatId(null);
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Award className="w-4 h-4 text-emerald-400" /> ONLAYN BILIMNI SINASH TESTI
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Bilim Darajangizni <span className="gradient-text">Sinab Ko‘ring</span>
          </h1>
          <p className="text-slate-400 text-sm">
            5 ta tezkor savolga javob bering va o'zingizga mos o'quv dasturini aniqlang!
          </p>
        </div>

        {/* STEP 1: Select Category */}
        {!selectedCatId && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {quizCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className="glass-card rounded-3xl p-8 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer space-y-4 text-center group hover:-translate-y-1 shadow-md hover:shadow-glow"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    5 ta qiziqarli savol va natija tahlili
                  </p>
                  <button className="w-full py-3 rounded-xl bg-slate-900 group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-2">
                    <span>Boshlash</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 2: Quiz Question Flow */}
        {selectedCatId && activeCategory && !isFinished && (
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6 shadow-glow">
            
            {/* Top Bar: Step Counter & Progress */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold border-b border-slate-800 pb-4">
              <span>{activeCategory.title}</span>
              <span className="text-emerald-400 font-bold">
                Savol {currentStep + 1} / {activeCategory.questions.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / activeCategory.questions.length) * 100}%`
                }}
              />
            </div>

            {/* Question Title */}
            <div className="py-2">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {activeCategory.questions[currentStep].question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {activeCategory.questions[currentStep].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentStep] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(optIdx)}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-semibold transition-all border flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-glow'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-600'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-slate-950" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={resetQuiz}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Qayta boshlash
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentStep] === undefined}
                className="py-3 px-8 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-glow transition-all disabled:opacity-40 cursor-pointer flex items-center gap-2 text-sm"
              >
                <span>{currentStep === activeCategory.questions.length - 1 ? "Natijani ko'rish" : "Keyingisi"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: Results Summary */}
        {isFinished && activeCategory && (
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 text-center space-y-6 shadow-glow-lg">
            
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">Tabriklaymiz! Test Yakunlandi</h2>
              <p className="text-slate-400 text-sm">
                Siz 5 ta savoldan <span className="text-emerald-400 font-bold text-lg">{calculateScore()} ta</span> to'g'ri javob berdingiz!
              </p>
            </div>

            {/* Recommendation Box */}
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Sparkles className="w-4 h-4" /> SIZ UCHUN TAVSIYA ETILGAN KURS:
              </div>
              <h3 className="text-xl font-black text-white">
                {activeCategory.recommendedCourse}
              </h3>
              <p className="text-xs text-slate-300">
                Ushbu kurs sizning bilim darajangizga 100% mos keladi va kelajakda yuqori daromadli mutaxassis bo'lishingizga yordam beradi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm shadow-glow hover:scale-105 transition-all cursor-pointer"
              >
                Ushbu kursga chegirma bilan yozilish
              </button>

              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-sm border border-slate-800 transition-colors"
              >
                Boshqa test topshirish
              </button>
            </div>

          </div>
        )}

      </main>

      <Footer />
      <FloatingButtons />

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourse={activeCategory?.recommendedCourse || ''}
      />
    </div>
  );
}
