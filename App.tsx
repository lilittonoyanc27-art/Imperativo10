import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Clipboard, 
  Check, 
  RotateCcw, 
  Volume2, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Hash,
  Compass,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  THEORY_SECTIONS, 
  EXERCISE_SECTIONS, 
  SANDBOX_VERBS, 
  TheorySection, 
  ExerciseSection, 
  ExerciseQuestion 
} from './theoryData';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'theory' | 'quiz' | 'sandbox' | 'simulator'>('home');
  
  // Search & Filters for Theory
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSectionId, setSelectedSectionId] = useState<number>(1);
  
  // Reading tracking
  const [readSections, setReadSections] = useState<number[]>(() => {
    const saved = localStorage.getItem('es_imperativo_read_sections');
    return saved ? JSON.parse(saved) : [1];
  });

  // Quiz State
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedQuizzes, setSubmittedQuizzes] = useState<Record<number, boolean>>({});
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const [quizResults, setQuizResults] = useState<Record<number, { score: number; total: number }>>({});

  // Sandbox State
  const [sandboxVerbIndex, setSandboxVerbIndex] = useState(0);
  const [sandboxAffMode, setSandboxAffMode] = useState<boolean>(true);
  const [sandboxCheckPerson, setSandboxCheckPerson] = useState<'tú' | 'usted' | 'nosotros' | 'vosotros' | 'ustedes'>('tú');
  const [sandboxInput, setSandboxInput] = useState('');
  const [sandboxVerdict, setSandboxVerdict] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Simulator State
  const [simVerb, setSimVerb] = useState<'decir' | 'dar' | 'comprar' | 'ayudar' | 'levantarse'>('decir');
  const [simPronoun1, setSimPronoun1] = useState<'me' | 'se' | 'te'>('me');
  const [simPronoun2, setSimPronoun2] = useState<'none' | 'lo' | 'la'>('lo');
  const [simIsAffirmative, setSimIsAffirmative] = useState(true);

  // Audio & Notification state
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  // Auto-saved reader progress
  useEffect(() => {
    localStorage.setItem('es_imperativo_read_sections', JSON.stringify(readSections));
  }, [readSections]);

  // Scalable font-size state
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>(() => {
    const saved = localStorage.getItem('es_imperativo_font_size');
    return (saved as any) || 'large';
  });

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.remove('font-normal', 'font-large', 'font-huge');
    htmlEl.classList.add(`font-${fontSize}`);
    localStorage.setItem('es_imperativo_font_size', fontSize);
  }, [fontSize]);

  // Voice player helper
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85; // slightly slower for educational clear speaking
      utterance.onstart = () => setSpeakingText(text);
      utterance.onend = () => setSpeakingText(null);
      utterance.onerror = () => setSpeakingText(null);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Ձեր բրաուզերը չի աջակցում ձայնային խոսքին:');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Mark chapter as read/unread
  const toggleSectionRead = (id: number) => {
    setReadSections(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const markAllAsRead = () => {
    const allIds = THEORY_SECTIONS.map(s => s.id);
    setReadSections(allIds);
  };

  // Quiz evaluation
  const handleAnswerChange = (questionId: string, val: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: val }));
  };

  const submitQuiz = (quizSecIndex: number) => {
    const quiz = EXERCISE_SECTIONS[quizSecIndex];
    let score = 0;
    quiz.questions.forEach(q => {
      const uAnswer = (userAnswers[q.id] || '').trim().toLowerCase().replace(/['"․.`!?,.]/g, '');
      const cAnswer = q.correctAnswer.toLowerCase().replace(/['"․.`!?,.]/g, '');
      if (uAnswer === cAnswer) {
        score++;
      }
    });
    setSubmittedQuizzes(prev => ({ ...prev, [quiz.id]: true }));
    setQuizResults(prev => ({ 
      ...prev, 
      [quiz.id]: { score, total: quiz.questions.length } 
    }));
  };

  const resetQuiz = (quizSecIndex: number) => {
    const quiz = EXERCISE_SECTIONS[quizSecIndex];
    const newAnswers = { ...userAnswers };
    quiz.questions.forEach(q => {
      delete newAnswers[q.id];
    });
    setUserAnswers(newAnswers);
    setSubmittedQuizzes(prev => ({ ...prev, [quiz.id]: false }));
    setQuizResults(prev => {
      const copy = { ...prev };
      delete copy[quiz.id];
      return copy;
    });
  };

  // Sandbox logic details
  const currentSandboxVerb = SANDBOX_VERBS[sandboxVerbIndex];
  
  const checkSandboxConjugation = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = sandboxAffMode 
      ? currentSandboxVerb.afirmativo[sandboxCheckPerson] 
      : currentSandboxVerb.negativo[sandboxCheckPerson];
    
    const userVal = sandboxInput.trim().toLowerCase();
    if (userVal === correct.toLowerCase()) {
      setSandboxVerdict('correct');
    } else {
      setSandboxVerdict('wrong');
    }
  };

  useEffect(() => {
    setSandboxInput('');
    setSandboxVerdict('idle');
  }, [sandboxVerbIndex, sandboxAffMode, sandboxCheckPerson]);

  // Pronoun simulator processor
  const computeSimulatorText = () => {
    let base = "";
    let explanation = "";
    let breakdown = [] as string[];

    if (simVerb === 'decir') {
      if (simIsAffirmative) {
        if (simPronoun1 === 'me' && simPronoun2 === 'lo') {
          base = "dímelo";
          breakdown = ["di", "me", "lo"];
          explanation = "«Dímelo» (Ասա դա ինձ) — di (ասա՛) + me (ինձ) + lo (դա): Դրական հրամայականում դերանունները կպչում են բայի վերջում: Գրավոր շեշտ կա (tilde) 'í'-ի վրա, որպեսզի պահպանվի արտասանությունը original 'di' վանկում:";
        } else if (simPronoun1 === 'me' && simPronoun2 === 'la') {
          base = "dímela";
          breakdown = ["di", "me", "la"];
          explanation = "«Dímela» (Ասա դա ինձ - իգական) — di + me + la: Դերանունները միանում են բայի վերջում:";
        } else if (simPronoun1 === 'se' && simPronoun2 === 'lo') {
          base = "dáselo"; // used for dar, let's fix or map to say it to him
          base = "dígaselo"; // usted form or digaselo
          base = "díselo"; // tu form for decir + se + lo
          breakdown = ["di", "se", "lo"];
          explanation = "«Díselo» (Ասա դա նրան) — di + 'le' (նրան) + lo (դա): 'Le'-ն դառնում է 'se' 'lo'-ից առաջ: Շեշտն ընկնում է 'í'-ի վրա:";
        } else {
          base = "dímelo";
          breakdown = ["di", "me", "lo"];
          explanation = "Di + me + lo = Dímelo";
        }
      } else {
        // Negativo
        if (simPronoun1 === 'me' && simPronoun2 === 'lo') {
          base = "no me lo digas";
          breakdown = ["no", "me", "lo", "digas"];
          explanation = "«No me lo digas» (Դա ինձ մի՛ ասա) — no + me (ինձ) + lo (դա) + digas (մի՛ ասա): Ժխտական հրամայականում դերանունները երբեք չեն կպչում վերջից, այլ գրվում են բայից առաջ առանձին բառով:";
        } else if (simPronoun1 === 'me' && simPronoun2 === 'la') {
          base = "no me la digas";
          breakdown = ["no", "me", "la", "digas"];
          explanation = "«No me la digas» (Դա ինձ մի՛ ասա - իգական): Դերանունները գրվում են բայից առաջ առանձին:";
        } else if (simPronoun1 === 'se' && simPronoun2 === 'lo') {
          base = "no se lo digas";
          breakdown = ["no", "se", "lo", "digas"];
          explanation = "«No se lo digas» (Դա նրան մի՛ ասա): 'Le'-ն վերածվում է 'se'-ի 'lo'-ից առաջ: Գտնվում է բայից առաջ առանձին:";
        } else {
          base = "no me lo digas";
          breakdown = ["no", "me", "lo", "digas"];
        }
      }
    } else if (simVerb === 'dar') {
      if (simIsAffirmative) {
        if (simPronoun1 === 'me' && simPronoun2 === 'lo') {
          base = "dámelo";
          breakdown = ["da", "me", "lo"];
          explanation = "«Dámelo» (Տուր դա ինձ) — da (տու՛ր) + me (ինձ) + lo (դա): Կպչում է վերջում, շեշտվում է 'á'-ն:";
        } else if (simPronoun1 === 'se' && simPronoun2 === 'lo') {
          base = "dáselo";
          breakdown = ["da", "se", "lo"];
          explanation = "«Dáselo» (Տուր դա նրան) — da + 'le' (նրան) + lo (դա): Դրականում միանում է վերջից, 'le'-ն դառնում է 'se':";
        } else {
          base = "dámelo";
          breakdown = ["da", "me", "lo"];
        }
      } else {
        if (simPronoun1 === 'me' && simPronoun2 === 'lo') {
          base = "no me lo des";
          breakdown = ["no", "me", "lo", "des"];
          explanation = "«No me lo des» (Դա ինձ մի՛ տուր) — no + me + lo + des: Ժխտականում առանձին է բայից առաջ:";
        } else if (simPronoun1 === 'se' && simPronoun2 === 'lo') {
          base = "no se lo des";
          breakdown = ["no", "se", "lo", "des"];
          explanation = "«No se lo des» (Դա նրան մի՛ տուր): Դերանունները բայից առաջ են առանձին:";
        } else {
          base = "no me lo des";
          breakdown = ["no", "me", "lo", "des"];
        }
      }
    } else if (simVerb === 'comprar') {
      if (simIsAffirmative) {
        if (simPronoun1 === 'me' && simPronoun2 === 'lo') {
          base = "cómpramelo";
          breakdown = ["compra", "me", "lo"];
          explanation = "«Cómpramelo» (Գնիր դա ինձ համար): Compra + me + lo. Բառը շատ է երկարել, գրավոր շեշտը 'ó'-ի վրա պարտադիր է:";
        } else if (simPronoun1 === 'se' && simPronoun2 === 'lo') {
          base = "cómpraselo";
          breakdown = ["compra", "se", "lo"];
          explanation = "«Cómpraselo» (Գնիր դա նրանց համար): Compra + se + lo:";
        } else {
          base = "cómpramelo";
          breakdown = ["compra", "me", "lo"];
        }
      } else {
        base = simPronoun1 === 'me' ? "no me lo compres" : "no se lo compres";
        breakdown = ["no", simPronoun1, simPronoun2 === 'none' ? 'lo' : simPronoun2, "compres"];
        explanation = `«${base}» — Ժխտական տարբերակում դերանունները բայից առաջ են:`;
      }
    } else if (simVerb === 'ayudar') {
      // only 1 pronoun is common with ayudar
      if (simIsAffirmative) {
        base = "ayúdame";
        breakdown = ["ayuda", "me"];
        explanation = "«Ayúdame» (Օգնիր ինձ) — ayuda (օգնի՛ր) + me (ինձ): Դերանունը կպչում է վերջում, շեշտվում է 'ú'-ն:";
      } else {
        base = "no me ayudes";
        breakdown = ["no", "me", "ayudes"];
        explanation = "«No me ayudes» (Ինձ մի՛ օգնիր) — no + me + ayudes (մի՛ օգնիր): Դերանունն անջատ է բայից առաջ:";
      }
    } else if (simVerb === 'levantarse') {
      if (simIsAffirmative) {
        base = "levántate";
        breakdown = ["levanta", "te"];
        explanation = "«Levántate» (Վեր կաց) — levanta (վեր բարձրացրու) + te (քեզ): Վերադարձական բայ: Դրականում մասնիկը դառնում է 'te' և գրվում է վերջում կպած:";
      } else {
        base = "no te levantes";
        breakdown = ["no", "te", "levantes"];
        explanation = "«No te levantes» (Ուշ/վեր մի՛ կաց) — no + te + levantes (մի՛ բարձրացիր): Ժխտականում մասնիկը գալիս է բայից առաջ առանձին:";
      }
    }

    return { base, explanation, breakdown };
  };

  const simInfo = computeSimulatorText();

  // Search Results calculation
  const filteredSections = THEORY_SECTIONS.filter(sec => {
    const matchesSearch = 
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.theoryText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sec.examples && sec.examples.some(ex => ex.spanish.toLowerCase().includes(searchQuery.toLowerCase()) || ex.armenian.toLowerCase().includes(searchQuery.toLowerCase())));
    
    if (selectedCategory === 'all') return matchesSearch;
    return sec.category === selectedCategory && matchesSearch;
  });

  const activeSection = THEORY_SECTIONS.find(s => s.id === selectedSectionId) || THEORY_SECTIONS[0];

  // Quick stats
  const totalChapters = THEORY_SECTIONS.length;
  const readCount = readSections.length;
  const progressPercent = Math.round((readCount / totalChapters) * 100);

  // Motivational widget phrase list
  const PHRASE_CAROUSEL = [
    { spanish: "¡Estudia con alegría!", armenian: "Սովորի՛ր ուրախությամբ:" },
    { spanish: "Di la verdad siempre.", armenian: "Միշտ ասա՛ ճշմարտությունը:" },
    { spanish: "No tengas miedo de los errores.", armenian: "Մի՛ վախեցիր սխալներից:" },
    { spanish: "Ten paciencia y aprende despacio.", armenian: "Զինվի՛ր համբերությամբ և սովորի՛ր դանդաղ:" },
    { spanish: "Haz tu mejor esfuerzo.", armenian: "Արա՛ քո առավելագույնը:" },
    { spanish: "Hablemos español juntos.", armenian: "Եկեք միասին իսպաներեն խոսենք:" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      {/* HEADER BAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg shrink-0 select-none">
              ¡!
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                Imperativo — հրամայական
              </h1>
              <p className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                Իսպաներենի Ուսումնական Հավելված
              </p>
            </div>
          </div>

          {/* MAIN MENU */}
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
            <nav className="flex items-center flex-wrap gap-1.5 md:gap-2">
              <button 
                id="nav_btn_home"
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 shadow-sm ${
                  activeTab === 'home' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5" /> Գլխավոր
                </span>
              </button>
              <button 
                id="nav_btn_theory"
                onClick={() => setActiveTab('theory')}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 shadow-sm ${
                  activeTab === 'theory' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" /> Տեսություն (37)
                </span>
              </button>
              <button 
                id="nav_btn_simulator"
                onClick={() => setActiveTab('simulator')}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 shadow-sm ${
                  activeTab === 'simulator' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> Դերանունների Լաբ
                </span>
              </button>
              <button 
                id="nav_btn_sandbox"
                onClick={() => setActiveTab('sandbox')}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 shadow-sm ${
                  activeTab === 'sandbox' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Բայարան
                </span>
              </button>
              <button 
                id="nav_btn_quiz"
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 shadow-sm ${
                  activeTab === 'quiz' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5" /> Թեստեր
                </span>
              </button>
            </nav>

            {/* FONT SIZE CONTROLLER */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-inner shrink-0">
              <button
                onClick={() => setFontSize('normal')}
                className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full transition-all cursor-pointer ${
                  fontSize === 'normal'
                    ? 'bg-white text-slate-900 border border-slate-200 shadow-sm font-black'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Սովորական տառաչափ / Стандартный"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`w-7 h-7 flex items-center justify-center text-sm font-black rounded-full transition-all cursor-pointer ${
                  fontSize === 'large'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Մեծ տառաչափ / Крупный"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('huge')}
                className={`w-7 h-7 flex items-center justify-center text-base font-black rounded-full transition-all cursor-pointer ${
                  fontSize === 'huge'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Ամենամեծ տառաչափ / Очень крупный"
              >
                A++
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* QUICK STATUS TICKER */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-6 shadow-inner border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white font-mono px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
              PROGRESS
            </span>
            <span>Յուրացված է տեսության <strong>{readCount} / {totalChapters}</strong> բաժին ({progressPercent}%)</span>
            <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden inline-block ml-1">
              <div className="bg-yellow-400 h-full" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          <div className="flex items-center gap-1 font-mono text-blue-400">
            <span>🇪🇸 Spanish Imperative to Armenian Tutorial 🇦🇲</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        {/* TABS 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in">
            {/* HERO INTRODUCTION CARD */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-slate-200/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" /> Բարի գալուստ / Bienvenido
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight uppercase font-sans">
                  Սովորեք իսպաներենի <span className="text-blue-600">հրամայական եղանակը</span> բացառիկ խորությամբ
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed md:text-base font-medium">
                  Imperativo-ն օգտագործվում է հրամայելու, խնդրելու, խորհուրդ տալու, արգելելու կամ ուղղություն ցույց տալու համար:
                  Այս ինտերակտիվ հարթակը պարունակում է **բոլոր 37 տեսական բաժինները**՝ ամբողջական կանոններով, անկանոն ձևերով, 
                  դերանունների տեղադրման կանոններով և ինտերակտիվ վարժություններով՝ հարմարեցված հատուկ հայախոսների համար:
                </p>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button 
                    id="home_start_reading_btn"
                    onClick={() => {
                      setActiveTab('theory');
                      setSelectedSectionId(1);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full transition duration-200 flex items-center gap-2 group shadow-md text-xs uppercase tracking-wider"
                  >
                    Սկսել կարդալ տեսությունը
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    id="home_try_simulator_btn"
                    onClick={() => setActiveTab('simulator')}
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold px-6 py-3 rounded-full transition duration-200 text-xs uppercase tracking-wider shadow-sm"
                  >
                    Դերանունների լաբորատորիա
                  </button>
                </div>
              </div>
            </div>

            {/* PHRASE OF THE DAY CAROUSEL / MOTIVATION */}
            <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                <Sparkles className="w-32 h-32 text-white" />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded font-bold">
                    ՕՐՎԱ ԱՐՏԱՀԱՅՏՈՒԹՅՈՒՆ / FRASES DEL DÍA
                  </span>
                  <p className="text-2xl font-black font-mono tracking-wide">{PHRASE_CAROUSEL[activePhraseIndex].spanish}</p>
                  <p className="text-xs opacity-90 font-medium">Armenian translation: {PHRASE_CAROUSEL[activePhraseIndex].armenian}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={() => handleSpeak(PHRASE_CAROUSEL[activePhraseIndex].spanish)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
                    title="Լսել արտասանությունը"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => {
                      setActivePhraseIndex((prev) => (prev + 1) % PHRASE_CAROUSEL.length);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-350 text-blue-900 px-4 py-2.5 rounded-full transition text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    Հաջորդը ↻
                  </button>
                </div>
              </div>
            </div>

            {/* BENTO GRID SECTIONS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* 1. Quick access irregular core */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Hash className="h-5 w-5" />
                      <h3 className="font-bold text-white uppercase text-xs tracking-wider">Կարևոր 8 անկանոնները</h3>
                    </div>
                    <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-0.5 rounded font-mono font-bold">tú</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Այս ձևերը չափազանց կարճ են և անհրաժեշտ է հիշել անգիր դրական commands-ի համար:</p>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[
                      { cmd: "di", inf: "decir", hy: "ասա՛" },
                      { cmd: "haz", inf: "hacer", hy: "արա՛" },
                      { cmd: "ve", inf: "ir", hy: "գնա՛" },
                      { cmd: "pon", inf: "poner", hy: "դիր" },
                      { cmd: "sal", inf: "salir", hy: "դուրս արի" },
                      { cmd: "sé", inf: "ser", hy: "եղի՛ր" },
                      { cmd: "ten", inf: "tener", hy: "ունեցի՛ր" },
                      { cmd: "ven", inf: "venir", hy: "արի՛" },
                      { cmd: "oye", inf: "oír", hy: "լսի՛ր" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          handleSpeak(item.cmd);
                        }}
                        className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-2 text-center cursor-pointer transition group"
                      >
                        <div className="font-mono text-sm font-black text-blue-400 group-hover:scale-105 transition-transform">{item.cmd}</div>
                        <div className="text-[9px] text-slate-400 font-mono italic">{item.inf}</div>
                        <div className="text-[10px] text-slate-300 font-medium truncate">{item.hy}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 bg-yellow-400 text-blue-900 p-2 text-[10px] font-bold text-center uppercase rounded-xl tracking-wider select-none">
                  Անգիր հիշել այս ձևերը!
                </div>
              </div>

              {/* 2. Quick pronoun position helper */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Layers className="h-5 w-5" />
                    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Դերանունների Օրենքը</h3>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium">
                    Իսպաներեն հրամայականում դերանունների դիրքը կախված է նախադասության դրական կամ ժխտական լինելուց.
                  </p>

                  <div className="space-y-2.5">
                    <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 shadow-xs">
                      <div className="text-xs font-bold text-blue-800 flex items-center justify-between">
                        <span>ԴՐԱԿԱՆ (Afirmativo)</span>
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-mono font-bold">ՎԵՐՋՈՒՄ</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">Դերանունը կպչում է բայի վերջում՝ որպես մեկ բառ:</p>
                      <div className="font-mono text-xs text-slate-700 bg-white px-2 py-1 rounded inline-block mt-1 font-bold border border-slate-100">
                        Dime. / Dímelo.
                      </div>
                    </div>

                    <div className="bg-red-50/75 border border-red-100 rounded-2xl p-3 shadow-xs">
                      <div className="text-xs font-bold text-red-800 flex items-center justify-between">
                        <span>ԺԽՏԱԿԱՆ (Negativo)</span>
                        <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-mono font-bold">ՍԿԶԲՈՒՄ</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">Դերանունը գրվում է բայից առաջ առանձին բառով:</p>
                      <div className="font-mono text-xs text-slate-700 bg-white px-2 py-1 rounded inline-block mt-1 border border-slate-100 font-bold">
                        No me digas.
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('simulator')}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-full transition text-center uppercase tracking-wider shadow-sm"
                >
                  Բացել սիմուլյատորը
                </button>
              </div>

              {/* 3. Progress and achievements */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Ձեր Առաջընթացը</h3>
                  </div>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                    Կարդացեք բոլոր 37 բաժինները և անցեք ինտերակտիվ թեստերը՝ նյութը կատարյալ սովորելու համար:
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                        <span>Կարդացված տեսություն</span>
                        <span className="font-bold text-slate-950">{readCount} / {totalChapters}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                        <span>Թեստերի հաջողվածություն</span>
                        <span className="font-bold text-slate-950">
                          {Object.keys(quizResults).length} / 3 վարժություն
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[0, 1, 2].map((idx) => {
                          const quizId = EXERCISE_SECTIONS[idx].id;
                          const hasResult = quizResults[quizId] !== undefined;
                          return (
                            <div 
                              key={idx} 
                              className={`flex-grow h-6 rounded-full border text-[9px] flex items-center justify-center font-bold ${
                                hasResult 
                                  ? 'bg-emerald-500 text-white border-emerald-500' 
                                  : 'bg-slate-100 text-slate-400 border-slate-250'
                              }`}
                            >
                              EX {idx + 1}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={markAllAsRead}
                    disabled={readCount === totalChapters}
                    className="flex-grow bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold py-2.5 px-3 rounded-full transition text-center uppercase tracking-wider shadow-sm"
                  >
                    Նշել բոլորը կարդացված
                  </button>
                  <button 
                    onClick={() => {
                      setReadSections([1]);
                      setUserAnswers({});
                      setSubmittedQuizzes({});
                      setQuizResults({});
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-650 p-2.5 rounded-full border border-red-100 transition shadow-sm"
                    title="Մաքրել առաջընթացը"
                  >
                    <RotateCcw className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* SYLLABUS DIRECTORY MAP PART */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 uppercase">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Ուսումնական Ծրագիր (37 Թեմաներ)
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Ստորև պատկերված են բոլոր 37 դասերը: Կարող եք կտտացնել ցանկացած թեմայի վրա՝ համապատասխան բացատրությունը կարդալու համար:
              </p>

              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {THEORY_SECTIONS.map((sec) => {
                    const isRead = readSections.includes(sec.id);
                    return (
                      <div 
                        key={sec.id}
                        onClick={() => {
                          setSelectedSectionId(sec.id);
                          setActiveTab('theory');
                        }}
                        className={`p-3 rounded-2xl border text-left cursor-pointer transition duration-150 flex items-start gap-2.5 group relative hover:shadow-sm ${
                          selectedSectionId === sec.id && activeTab === 'theory'
                            ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/10'
                            : isRead 
                              ? 'border-slate-200 bg-slate-55/70 hover:bg-slate-100/80'
                              : 'border-slate-100 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          isRead 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isRead ? <Check className="h-3 w-3" /> : sec.id}
                        </span>
                        <div className="min-w-0 flex-grow">
                          <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate transition">
                            {sec.title}
                          </h4>
                          <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">{sec.shortDesc}</p>
                        </div>
                        <ChevronRight className="h-3 w-3 text-slate-400 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TABS 2: INTERACTIVE THEORY WORKSPACE */}
        {activeTab === 'theory' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            
            {/* SIDEBAR NAVIGATION LIST (4 Columns on large screen) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Search Box */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Որոնել թեմաներ և օրինակներ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category selectors */}
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: 'all', label: 'Բոլորը' },
                    { id: 'introduction', label: 'Ներածություն' },
                    { id: 'regular', label: 'Կանոնավոր' },
                    { id: 'negative', label: 'Ժխտական' },
                    { id: 'stem-changing', label: 'Արմատափոխ.' },
                    { id: 'irregular', label: 'Անկանոն' },
                    { id: 'pronouns', label: 'Դերանուններ' },
                    { id: 'reflexive', label: 'Վերադարձական' },
                    { id: 'situational', label: 'Խոսակցական' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                        selectedCategory === cat.id 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course topics scroll list */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[500px]">
                <div className="p-3 bg-slate-50 border-b border-slate-150 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">ԲԱԺԻՆՆԵՐԻ ՑԱՆԿ</span>
                  <span className="text-[10px] text-slate-400 font-mono italic">Համապատասխանող՝ {filteredSections.length}</span>
                </div>

                <div className="overflow-y-auto divide-y divide-slate-100 flex-grow">
                  {filteredSections.map((sec) => {
                    const isRead = readSections.includes(sec.id);
                    return (
                      <button
                        key={sec.id}
                        id={`theme_idx_btn_${sec.id}`}
                        onClick={() => setSelectedSectionId(sec.id)}
                        className={`w-full p-3 text-left transition flex items-start gap-2 ${
                          selectedSectionId === sec.id 
                            ? 'bg-blue-50/70 text-blue-900 border-l-4 border-blue-600' 
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isRead ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {isRead ? '✓' : sec.id}
                        </span>
                        <div className="min-w-0">
                          <div className={`text-xs font-bold leading-tight ${selectedSectionId === sec.id ? 'text-blue-700' : ''}`}>
                            {sec.title}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 truncate">{sec.shortDesc}</div>
                        </div>
                      </button>
                    );
                  })}
                  {filteredSections.length === 0 && (
                    <div className="p-8 text-center text-slate-400 text-xs font-semibold">
                      Ոչինչ չի գտնվել Ձեր որոնման հարցումով:
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* CARD EXPLANATION READER (8 Columns) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Main Content card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 relative">
                
                {/* Header elements inside card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg font-mono font-bold uppercase">
                        {activeSection.category}
                      </span>
                      <button
                        onClick={() => toggleSectionRead(activeSection.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition ${
                          readSections.includes(activeSection.id)
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-150'
                        }`}
                      >
                        {readSections.includes(activeSection.id) ? '✓ Յուրացված է' : '◯ Նշել որպես յուրացված'}
                      </button>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
                      {activeSection.title}
                    </h2>
                  </div>

                  {/* Navigation controls next / prev */}
                  <div className="flex items-center gap-1">
                    <button
                      disabled={activeSection.id === 1}
                      onClick={() => setSelectedSectionId(prev => Math.max(1, prev - 1))}
                      className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition"
                      title="Նախորդ թեման"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-mono text-slate-500 px-2">
                      {activeSection.id} / {THEORY_SECTIONS.length}
                    </span>
                    <button
                      disabled={activeSection.id === THEORY_SECTIONS.length}
                      onClick={() => setSelectedSectionId(prev => Math.min(THEORY_SECTIONS.length, prev + 1))}
                      className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition"
                      title="Հաջորդ թեման"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* TEXT THEORY DESCRIPTION with nice format */}
                <div className="text-slate-705 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line font-medium">
                  {/* Highlight paragraph styling */}
                  {activeSection.theoryText}
                </div>

                {/* CONJUGATION TABLES (IF EXISTS FOR THE SECTION) */}
                {activeSection.tables && activeSection.tables.map((tbl, tblIdx) => (
                  <div key={tblIdx} className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-blue-600" />
                        Աղյուսակ. {tbl.verb} ({tbl.translation})
                      </h3>
                      <span className={`text-[9px] font-mono font-bold uppercase rounded-lg px-2 py-0.5 ${
                        tbl.type === 'afirmativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {tbl.type}
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-xs md:text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-900 text-white font-bold font-mono">
                            {tbl.headers.map((hdr, hIdx) => (
                              <th key={hIdx} className="p-3 border-b border-slate-800">{hdr}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {tbl.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-blue-50/25 transition font-sans">
                              <td className="p-3 font-semibold text-slate-800 bg-slate-50 font-mono text-[11px]">{row.person}</td>
                              <td 
                                onClick={() => handleSpeak(row.form)}
                                className="p-3 font-bold text-blue-600 font-mono cursor-pointer hover:bg-blue-50/50 transition-colors"
                              >
                                <span className="flex items-center gap-1.5">
                                  {row.form}
                                  <Volume2 className="h-3 w-3 text-slate-400 group-hover:text-rose-500 shrink-0" />
                                </span>
                              </td>
                              {row.translation && (
                                <td className="p-3 text-slate-600 font-medium">{row.translation}</td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* EXAMPLES LIST (IF EXISTS FOR THE SECTION) */}
                {activeSection.examples && (
                  <div className="space-y-3 pt-3">
                    <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
                      ՕՐԻՆԱԿՆԵՐ / EJEMPLOS
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeSection.examples.map((ex, exIdx) => {
                        const isSpeaking = speakingText === ex.spanish;
                        const isCopied = copiedText === ex.spanish;
                        return (
                          <div 
                            key={exIdx} 
                            className="bg-slate-50/50 hover:bg-blue-50/20 border border-slate-200/70 hover:border-blue-200/80 rounded-2xl p-4 flex items-start justify-between gap-3 group transition"
                          >
                            <div className="space-y-1">
                              <div className="font-mono text-[14px] md:text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                                {ex.spanish}
                              </div>
                              <div className="text-xs md:text-sm text-slate-600 font-medium">
                                {ex.armenian}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleSpeak(ex.spanish)}
                                className={`p-1.5 rounded-lg transition ${
                                  isSpeaking ? 'bg-blue-100 text-blue-600' : 'bg-slate-200/50 hover:bg-slate-200 text-slate-500'
                                }`}
                                title="Լսել արտասանությունը"
                              >
                                <Volume2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleCopy(ex.spanish)}
                                className={`p-1.5 rounded-lg transition ${
                                  isCopied ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200/50 hover:bg-slate-200 text-slate-500'
                                }`}
                                title="Պատճենել"
                              >
                                {isCopied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* DIALOGUE BLOCK (ONLY FOR SECTION 35) */}
                {activeSection.dialogue && (
                  <div className="space-y-4 bg-slate-900 text-white rounded-3xl p-5 md:p-6 shadow-md">
                    <div className="border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">
                        {activeSection.dialogue.titleEs}
                      </span>
                      <h3 className="text-sm font-semibold mt-0.5 text-slate-200">
                        {activeSection.dialogue.titleHy}
                      </h3>
                    </div>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                      {activeSection.dialogue.lines.map((line, lIdx) => (
                        <div key={lIdx} className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold font-mono text-amber-400 uppercase bg-amber-400/10 px-2 py-0.5 rounded">
                              {line.speaker}
                            </span>
                            <button
                              onClick={() => handleSpeak(line.textEs)}
                              className="p-1 bg-white/5 hover:bg-white/15 rounded text-slate-400 hover:text-white transition"
                              title="Լսել արտասանությունը"
                            >
                              <Volume2 className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-mono text-sm pl-2 border-l border-slate-800">{line.textEs}</p>
                          <p className="text-xs text-slate-400 pl-2 font-sans italic">{line.textHy}</p>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-slate-400 bg-white/5 p-3 rounded-lg flex items-start gap-2">
                      <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Կտտացրեք յուրաքանչյուր խոսողի անվան կողքի ձայնարկչի վրա՝ իսպաներեն ճիշտ արտասանությունը լսելու համար:</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Tips banner footer */}
              <div className="bg-blue-50/40 border border-blue-200 rounded-2xl p-4 flex gap-3 text-slate-700">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-blue-900">Հրահանգներ</h4>
                  <p className="text-xs leading-relaxed">
                    Յուրաքանչյուր թեմա կարդալուց հետո նշեք այն որպես <strong>«Յուրացված»</strong>, որպեսզի համակարգը հիշի Ձեր առաջընթացը: 
                    Կիսվեք ծրագրի հղումով ընկերների հետ՝ միասին սովորելու համար:
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TABS 3: INTUITIVE INTERACTIVE QUIZZES */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Exercises intro box */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-blue-600" />
                Ինտերակտիվ Վարժություններ (Թեստեր)
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                Այստեղ ներկայացված են տեքստային նյութի երեք վարժությունները: Լրացրեք պատասխանները իսպաներենով և կտտացրեք **«Ստուգել»** կոճակը: 
                Կայքը Ձեզ ցույց կտա սխալները և կտրամադրի օգնող հայերեն հուշումներ:
              </p>

              {/* Navigation for Quizzes */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {EXERCISE_SECTIONS.map((sec, idx) => {
                  const isSubmitted = submittedQuizzes[sec.id] === true;
                  const scoreObj = quizResults[sec.id];
                  return (
                    <button
                      key={sec.id}
                      id={`quiz_tab_btn_${idx}`}
                      onClick={() => setActiveQuizIndex(idx)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                        activeQuizIndex === idx 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {sec.title}
                      {isSubmitted && scoreObj && (
                        <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] ${
                          activeQuizIndex === idx ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {scoreObj.score}/{scoreObj.total}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRESENT QUIZ BLOCK */}
            {(() => {
              const currentQuiz = EXERCISE_SECTIONS[activeQuizIndex];
              const isSubmitted = submittedQuizzes[currentQuiz.id] === true;
              const result = quizResults[currentQuiz.id];

              return (
                <div className="bg-white rounded-3xl border border-slate-200 md:p-8 p-6 shadow-sm space-y-6">
                  <div className="space-y-1 pb-4 border-b border-slate-100">
                    <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg font-bold uppercase tracking-wider">
                      Exercise {currentQuiz.id}
                    </span>
                    <h3 className="text-xl font-black text-slate-900">{currentQuiz.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{currentQuiz.description}</p>
                  </div>

                  <div className="space-y-6 divide-y divide-slate-100">
                    {currentQuiz.questions.map((q, qIdx) => {
                      const uAns = userAnswers[q.id] || '';
                      
                      // normalize for strict match comparison, strip points/spaces/quotes
                      const isCorrect = isSubmitted && 
                        uAns.trim().toLowerCase().replace(/['"․.`!?,.]/g, '') === q.correctAnswer.toLowerCase().replace(/['"․.`!?,.]/g, '');

                      const showHint = expandedHints[q.id] === true;

                      return (
                        <div key={q.id} className="pt-5 first:pt-0 space-y-3">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-lg bg-blue-50 flex items-center justify-center font-mono text-[10px] font-bold text-blue-600 shrink-0">
                                {qIdx + 1}
                              </span>
                              <span className="text-sm font-bold text-slate-800 font-mono">
                                {q.question}
                              </span>
                            </div>

                            {/* Hint and show answer states */}
                            <div className="flex items-center gap-1.5 ml-7 md:ml-0">
                              <button
                                onClick={() => setExpandedHints(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                                className="text-[11px] font-bold text-blue-700 hover:text-blue-800 bg-blue-50/50 px-2.5 py-1 rounded-lg"
                              >
                                {showHint ? 'Թաքցնել հուշումը' : 'Հուշում 💡'}
                              </button>
                              
                              <button
                                onClick={() => handleSpeak(q.correctAnswer)}
                                className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg transition"
                                title="Լսել ճիշտ պատասխանը"
                              >
                                <Volume2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          {showHint && q.hint && (
                            <div className="text-xs bg-amber-50/50 border border-amber-100 text-amber-900 p-2.5 rounded-xl ml-7 font-medium">
                              <strong>💡 Հուշում.</strong> {q.hint}
                            </div>
                          )}

                          {/* Interactive response field */}
                          <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Գրեք իսպաներեն պատասխանը..."
                                disabled={isSubmitted}
                                value={uAns}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                className={`w-full px-4 py-2.5 text-xs font-mono rounded-xl outline-none border transition-all ${
                                  isSubmitted
                                    ? isCorrect
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                      : 'bg-red-50 border-red-300 text-red-950 font-bold'
                                    : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                                }`}
                              />
                              {isSubmitted && (
                                <span className="absolute right-3 top-2.5">
                                  {isCorrect ? (
                                    <Check className="h-4 w-4 text-emerald-600" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                  )}
                                </span>
                              )}
                            </div>

                            {/* Response details if checked */}
                            {isSubmitted && (
                              <div className="text-xs font-mono space-y-0.5">
                                {isCorrect ? (
                                  <span className="text-emerald-700 font-bold block">✓ Ճիշտ է: Հիանալի՛ է:</span>
                                ) : (
                                  <div>
                                    <span className="text-slate-500 line-through block">Ձեր պատասխանը՝ {uAns || '(դատարկ)'}</span>
                                    <span className="text-rose-700 font-bold block">
                                      Ճիշտ տարբերակը՝ <span className="underline">{q.correctAnswer}</span>
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary score banner */}
                  {isSubmitted && result && (
                    <div className={`p-5 rounded-xl text-center space-y-3 ${
                      result.score === result.total
                        ? 'bg-emerald-50 border border-emerald-250 text-emerald-900 animate-bounce-short'
                        : 'bg-rose-50 border border-rose-250 text-rose-900'
                    }`}>
                      <h4 className="font-bold text-lg">
                        {result.score === result.total 
                          ? '🎉 Բացառիկ է: Բոլոր պատասխանները ճիշտ են:' 
                          : 'Դուք կարող եք ավելին! 👍'}
                      </h4>
                      <p className="text-sm">
                        Ձեր արդյունքը՝ <strong>{result.score}</strong> միավոր <strong>{result.total}</strong>-ից:
                      </p>
                      
                      <div className="flex items-center justify-center gap-1 w-48 mx-auto bg-white border rounded-full overflow-hidden p-0.5 h-6">
                        {Array.from({ length: result.total }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-grow h-full rounded-full ${
                              i < result.score ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit / Reset Actions */}
                  <div className="flex items-center gap-3 ml-7 pt-4 border-t border-slate-100">
                    {!isSubmitted ? (
                      <button
                        id={`submit_quiz_btn_${currentQuiz.id}`}
                        onClick={() => submitQuiz(activeQuizIndex)}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-2.5 rounded-xl transition shadow-md shadow-rose-500/20 text-xs"
                      >
                        Ստուգել պատասխանները
                      </button>
                    ) : (
                      <button
                        id={`reset_quiz_btn_${currentQuiz.id}`}
                        onClick={() => resetQuiz(activeQuizIndex)}
                        className="bg-slate-800 hover:bg-slate-900 text-white font-medium px-5 py-2.5 rounded-xl transition text-xs flex items-center gap-1.5"
                      >
                        <RotateCcw className="h-4.5 w-4.5" /> Փորձել կրկին
                      </button>
                    )}
                  </div>

                </div>
              );
            })()}

          </div>
        )}

        {/* TABS 4: VERB PLAYGROUND / SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Verb selectors (4 Columns) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-black text-slate-400 font-mono tracking-wider uppercase border-b pb-2">ԸՆՏՐԵՔ ԲԱՅԵՐԸ</h3>
              
              <div className="space-y-1.5 max-h-[450px] overflow-y-auto pr-1">
                {SANDBOX_VERBS.map((v, idx) => (
                  <button
                    key={v.infinitive}
                    onClick={() => setSandboxVerbIndex(idx)}
                    className={`w-full p-3.5 text-left rounded-xl transition-all flex items-center justify-between text-xs ${
                      sandboxVerbIndex === idx 
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/10' 
                        : 'hover:bg-slate-50 text-slate-700 border border-slate-100 bg-white'
                    }`}
                  >
                    <div>
                      <span className="font-mono">{v.infinitive}</span>
                      <span className={`block text-[10px] font-semibold leading-none mt-1 ${
                        sandboxVerbIndex === idx ? 'text-blue-100' : 'text-slate-500'
                      }`}>{v.meaning}</span>
                    </div>
                    {v.stemChange !== 'ոչ' && (
                      <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                        sandboxVerbIndex === idx ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {v.stemChange}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Conjugator and Trainer (8 Columns) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg font-bold uppercase tracking-wider">
                      Interactive Verb conjugation
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 font-mono tracking-wide">
                      {currentSandboxVerb.infinitive}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Նշանակությունը՝ <strong className="text-blue-600 font-black">{currentSandboxVerb.meaning}</strong></p>
                  </div>

                  {/* Mode Selector */}
                  <div className="flex bg-slate-100/80 p-1 rounded-xl">
                    <button
                      onClick={() => setSandboxAffMode(true)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                        sandboxAffMode 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      Դրական (Afirmativo)
                    </button>
                    <button
                      onClick={() => setSandboxAffMode(false)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                        !sandboxAffMode 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      Ժխտական (Negativo)
                    </button>
                  </div>
                </div>

                {/* Grid layout for forms */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {(['tú', 'usted', 'nosotros', 'vosotros', 'ustedes'] as const).map((person) => {
                    const formValue = sandboxAffMode 
                      ? currentSandboxVerb.afirmativo[person] 
                      : currentSandboxVerb.negativo[person];

                    return (
                      <div 
                        key={person} 
                        onClick={() => handleSpeak(formValue)}
                        className="bg-blue-50/20 hover:bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 text-center cursor-pointer transition-all hover:shadow-sm scale-100 hover:scale-[1.02] active:scale-95 group"
                      >
                        <div className="text-[10px] uppercase font-black text-slate-400 font-mono tracking-wider">{person}</div>
                        <div className="font-mono text-sm font-black text-slate-900 group-hover:text-blue-600 transition truncate mt-1">
                          {formValue}
                        </div>
                        <Volume2 className="h-3.5 w-3.5 text-blue-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-75 group-hover:scale-100" />
                      </div>
                    );
                  })}
                </div>

                {/* TEST YOUR CONJUGATION TRAINER */}
                <div className="bg-blue-50/35 rounded-3xl p-6 border border-blue-150/45 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-blue-600/10 text-blue-600 p-2 rounded-xl shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Ինքնաստուգման վարժություն</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Ստուգեք, թե որքանով եք ճիշտ խոնարհում այս բայը գործնականում:</p>
                    </div>
                  </div>

                  <form onSubmit={checkSandboxConjugation} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                    
                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono">Անձ</label>
                      <select
                        value={sandboxCheckPerson}
                        onChange={(e) => setSandboxCheckPerson(e.target.value as any)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-blue-500 transition-colors cursor-pointer"
                      >
                        <option value="tú">tú (դու)</option>
                        <option value="usted">usted (հարգալից)</option>
                        <option value="nosotros">nosotros (եկեք)</option>
                        <option value="vosotros">vosotros (ոչ պաշտոնական)</option>
                        <option value="ustedes">ustedes (դուք)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-5 space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        Ձեր պատասխանը ({sandboxAffMode ? 'դրական' : 'ժխտական'})
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={sandboxAffMode ? "Օրինակ՝ habla" : "Օրինակ՝ no hables"}
                        value={sandboxInput}
                        onChange={(e) => setSandboxInput(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-mono outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                      />
                    </div>

                    <div className="sm:col-span-4 flex gap-1.5">
                      <button
                        type="submit"
                        className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md shadow-blue-500/10 cursor-pointer"
                      >
                        Ստուգել
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const correct = sandboxAffMode 
                            ? currentSandboxVerb.afirmativo[sandboxCheckPerson] 
                            : currentSandboxVerb.negativo[sandboxCheckPerson];
                          setSandboxInput(correct);
                        }}
                        className="bg-slate-200/80 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer"
                        title="Ցույց տալ ճիշտը"
                      >
                        Ցույց տալ
                      </button>
                    </div>

                  </form>

                  {/* Verdict display message */}
                  {sandboxVerdict !== 'idle' && (
                    <div className={`p-3 rounded-xl flex items-center gap-2 text-xs ${
                      sandboxVerdict === 'correct' 
                        ? 'bg-emerald-100 text-emerald-800 text-emerald-950 font-bold' 
                        : 'bg-red-100 text-red-800 text-red-950 font-bold'
                    }`}>
                      {sandboxVerdict === 'correct' ? (
                        <>
                          <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                          <span>Շատ ճիշտ է: Հիանալի՛ խոնարհում:</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4.5 w-4.5 text-red-600 shrink-0" />
                          <span>Սխալ է. Փորձեք մեկ այլ տարբերակ կամ սեղմեք «Ցույց տալ»՝ լուծումը տեսնելու համար:</span>
                        </>
                      )}
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* TABS 5: PRONOUN PLACEMENT SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Intro text */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg font-bold uppercase tracking-wider">
                Grammar Playground
              </span>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                <Layers className="h-6 w-6 text-blue-600 animate-spin-slow" />
                Դերանունների Լաբորատորիա (Token Simulator)
              </h2>
              <p className="text-sm text-slate-500 max-w-4xl leading-relaxed font-medium">
                Իսպաներեն հրամայականում դերանունների տեղի ճիշտ որոշումը ամենախնդրահարույց մասն է ուսանողների համար (Sections 18-23):
                Մեր ինտերակտիվ նախագծիչը Ձեզ ցույց է տալիս, թե ինչպես են դերանունները միանում բային դրական դեպքում (վերջում կպած), կամ անջատվում
                ժխտական դեպքում (բայից առաջ առանձին):
              </p>
            </div>

            {/* Interactive Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Controls Column (5 Cols) */}
              <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-xs font-black font-mono text-slate-400 uppercase tracking-wider border-b pb-2">
                  Կարգավորումներ / Ajustes
                </h3>

                {/* 1. Verb Choice */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">1. Ընտրեք բայը և դերանունը</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'decir', label: 'decir (ասել) + me (ինչ) + lo (ինչը)', pr1: 'me', pr2: 'lo' },
                      { id: 'dar', label: 'dar (տալ) + me (ում) + lo (դա)', pr1: 'me', pr2: 'lo' },
                      { id: 'comprar', label: 'comprar (գնել) + me + lo', pr1: 'me', pr2: 'lo' },
                      { id: 'ayudar', label: 'ayudar (օգնել) + me (ինձ)', pr1: 'me', pr2: 'none' },
                      { id: 'levantarse', label: 'levantarse (վեր կենալ/վերադարձական)', pr1: 'te', pr2: 'none' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSimVerb(item.id as any);
                          setSimPronoun1(item.pr1 as any);
                          setSimPronoun2(item.pr2 as any);
                        }}
                        className={`p-3.5 text-left rounded-xl text-xs transition-all border flex items-center justify-between cursor-pointer ${
                          simVerb === item.id 
                            ? 'border-blue-500 bg-blue-50/50 text-blue-950 font-black' 
                            : 'border-slate-100 hover:bg-slate-50 text-slate-600 bg-white'
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                        {simVerb === item.id && <Check className="h-4 w-4 text-blue-600 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Command mode affirmative versus negative */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">2. Հրամանի տեսակը</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSimIsAffirmative(true)}
                      className={`p-3.5 text-xs font-bold rounded-xl text-center border transition-all cursor-pointer ${
                        simIsAffirmative 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                          : 'border-slate-100 hover:bg-slate-50 text-slate-500 bg-white'
                      }`}
                    >
                      Դրական (Արա՛)
                    </button>
                    <button
                      onClick={() => setSimIsAffirmative(false)}
                      className={`p-3.5 text-xs font-bold rounded-xl text-center border transition-all cursor-pointer ${
                        !simIsAffirmative 
                          ? 'border-blue-500 bg-blue-50 text-blue-800' 
                          : 'border-slate-100 hover:bg-slate-50 text-slate-500 bg-white'
                      }`}
                    >
                      Ժխտական (Մի՛ արա)
                    </button>
                  </div>
                </div>

                {/* Extra customization of pronouns */}
                {simVerb !== 'ayudar' && simVerb !== 'levantarse' && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-700 block text-blue-700 font-bold">3. Փոխել անուղղակի դերանունը</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSimPronoun1('me')}
                        className={`flex-1 py-2 px-3 text-xs rounded-lg transition-all cursor-pointer ${simPronoun1 === 'me' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
                      >
                        me (ինձ)
                      </button>
                      <button
                        onClick={() => setSimPronoun1('se')}
                        className={`flex-1 py-2 px-3 text-xs rounded-lg transition-all cursor-pointer ${simPronoun1 === 'se' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
                        title="Նրան / նրանց դեպքում (le/les -> se)"
                      >
                        se (նրան)
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Display Canvas column (7 Columns) */}
              <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider">
                      VISUAL ALIGNMENT STAGE
                    </span>

                    <button
                      onClick={() => handleSpeak(simInfo.base)}
                      className="p-2 bg-blue-50 hover:bg-blue-100/80 text-blue-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition duration-150 cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4 text-blue-600" /> Լսել արտասանությունը
                    </button>
                  </div>

                  {/* Token blocks rendering */}
                  <div className="bg-slate-950 p-6 rounded-2xl text-center space-y-4 shadow-inner border border-slate-800">
                    <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase font-bold">
                      Interactive Resulting blocks
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {simInfo.breakdown.map((tok, tIdx) => {
                        let colorClass = "bg-blue-600 text-white font-bold";
                        if (tok === 'no') colorClass = "bg-red-600 text-white border-2 border-red-400 font-bold";
                        else if (tok === 'me' || tok === 'te' || tok === 'se') colorClass = "bg-amber-400 text-slate-900 font-bold";
                        else if (tok === 'lo' || tok === 'la') colorClass = "bg-teal-400 text-slate-950 font-bold";
                        else colorClass = "bg-slate-50 text-slate-800 bg-white font-extrabold border-2 border-slate-200";

                        return (
                          <div 
                            key={tIdx} 
                            className={`px-4 py-2.5 rounded-xl font-mono text-sm md:text-base tracking-wide uppercase transition duration-300 scale-102 hover:scale-105 select-none ${colorClass}`}
                          >
                            {tok}
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-white text-2xl font-mono font-bold tracking-widest pt-2 bg-gradient-to-r from-yellow-300 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                      {simInfo.base}
                    </p>
                  </div>

                  {/* Explanation card of the simulator */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      Քերականական Բացատրություն
                    </h4>
                    <p className="text-xs md:text-sm leading-relaxed text-slate-600">
                      {simInfo.explanation}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-slate-700 text-xs flex gap-2.5">
                  <Info className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">Տարբեր բայեր ընտրելով՝ կարող եք տեսողականորեն համեմատել «Dímelo» և «No me lo digas» տարբերակների տարբերությունները:</span>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* REUSABLE LIGHT FOOTER DECK */}
      <footer className="bg-slate-100 border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 Իսպաներենի Հրամայական Եղանակ (Imperativo) - Armenian Educational Portal</p>
          <p className="opacity-75">
            Ստեղծված է հատուկ իսպաներեն լեզվի քերականությունը հասկանալի և արագ սովորելու համար:
          </p>
        </div>
      </footer>
    </div>
  );
}
