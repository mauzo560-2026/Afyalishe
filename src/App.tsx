import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Bot, Loader2, ChevronLeft, MapPin, User, Phone, 
  Package, ExternalLink, Camera, Image as ImageIcon, 
  Sparkles, CheckCircle2, History 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { RATIBA_ALL, MIMEA, Herb, User as UserType } from './constants';

/**
 * UTAMBULISHO WA AI (GEMINI)
 */
let aiInstance: any = null;
const getAI = () => {
  if (aiInstance) return aiInstance;
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '');
  if (!apiKey) return null;
  aiInstance = new GoogleGenAI({ apiKey });
  return aiInstance;
};

/**
 * COMPONENT 1: DR. REVO CHAT (MSHAURI WA AFYA)
 */
function AIChat({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ name: '', location: '', phone: '', medicine: '' });

  const sendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || loading) return;
    const userMessage = { role: 'user', parts: [{ text: textToSend }], isOrder: !!textOverride };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setInput('');
    setLoading(true);

    try {
      const ai = getAI();
      if (!ai) throw new Error("Ufunguo wa API haujapatikana.");
      const response = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent({
        contents: newHistory.map(m => ({ role: m.role, parts: m.parts })),
        systemInstruction: "Wewe ni Dr. REVO kutoka JOS Natural Herbs. Jibu maswali kwa Kiswahili fasaha kuhusu tiba asili na lishe."
      });
      const text = response.response.text();
      setHistory(prev => [...prev, { role: 'model', parts: [{ text }] }]);
    } catch (e) {
      setHistory(prev => [...prev, { role: 'model', parts: [{ text: "Kuna tatizo kidogo la mtandao au API Key haipo." }] }]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 100);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[600] flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center p-4 border-b bg-white pt-8 shadow-sm">
        <button onClick={onClose} className="flex items-center text-gray-500"><ChevronLeft size={18} /> Rudi</button>
        <div className="flex-1 text-center font-bold text-emerald-900">🌿 Dr. REVO</div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-800 text-white' : 'bg-white border text-gray-800'}`}>
              <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t bg-white pb-8 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Uliza swali..." className="flex-1 bg-gray-100 p-4 rounded-2xl outline-none" />
        <button onClick={() => sendMessage()} className="bg-emerald-600 text-white p-4 rounded-2xl"><Send size={18} /></button>
      </div>
    </div>
  );
}

/**
 * COMPONENT 2: SCANNER YA MIMEA
 */
function PlantScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzePlant = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const ai = getAI();
      const base64 = image.split(',')[1];
      const res = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent([
        "Chambua mmea huu wa tiba asilia kwa Kiswahili. Toa jina, faida, na jinsi ya kuandaa.",
        { inlineData: { data: base64, mimeType: "image/jpeg" } }
      ]);
      setResult({ maelezo: res.response.text() });
    } catch (e) {
      alert("API Key inahitajika kuwasha scanner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center font-bold text-xl text-emerald-900">📷 Scanner ya Mimea</div>
      <label className="block border-2 border-dashed border-emerald-200 rounded-3xl p-10 text-center bg-emerald-50/20 cursor-pointer">
        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={e => {
          const f = e.target.files?.[0];
          if (f) {
            const rd = new FileReader();
            rd.onload = (ev) => { setImage(ev.target?.result as string); setResult(null); };
            rd.readAsDataURL(f);
          }
        }} />
        {image ? <img src={image} className="rounded-xl max-h-48 mx-auto" /> : <div><Camera className="mx-auto mb-2 text-emerald-600" size={40} /> <p className="font-bold">GUSA PIGA PICHA</p></div>}
      </label>
      {image && !result && <button onClick={analyzePlant} className="w-full bg-emerald-700 text-white p-4 rounded-2xl font-bold">{loading ? "Inachakata..." : "Chunguza Mmea"}</button>}
      {result && <div className="p-4 bg-white border rounded-2xl whitespace-pre-wrap">{result.maelezo}</div>}
    </div>
  );
}

/**
 * APP MAIN
 */
export default function App() {
  const [screen, setScreen] = useState('s-welcome');
  const [user, setUser] = useState<UserType | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [selectedRatiba, setSelectedRatiba] = useState<any>(null);

  useEffect(() => {
    const ses = localStorage.getItem('afya_ses');
    if (ses) { setUser(JSON.parse(ses)); setScreen('s-home'); }
  }, []);

  const goto = (id: string) => { setScreen(id); window.scrollTo(0, 0); };
  const login = () => {
    const u = { name: 'Mtumiaji', email: '', phone: '', premium: true, joinDate: new Date().toISOString(), uchunguzi: 0 };
    setUser(u); localStorage.setItem('afya_ses', JSON.stringify(u)); goto('s-home');
  };
  const logout = () => { localStorage.removeItem('afya_ses'); setUser(null); goto('s-welcome'); };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 's-welcome' && (
          <motion.div key="welcome" className="flex-1 flex flex-col p-6 text-center bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-7xl mb-4">🌿</div>
              <h1 className="text-3xl font-black text-emerald-900 mb-2 font-sans tracking-tight">AFYA-LISHE SMART</h1>
              <p className="text-gray-500 mb-8 font-medium">Mshauri wako wa kwanza wa tiba asilia kiganjani kwako.</p>
              <button onClick={login} className="bg-emerald-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-800 transition-colors">ANZA SASA →</button>
            </div>
          </motion.div>
        )}

        {screen === 's-home' && (
          <motion.div key="home" className="flex-1 flex flex-col pb-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-emerald-900 p-6 pt-12 text-white rounded-b-[40px] shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <div><p className="text-emerald-300 text-xs font-bold uppercase tracking-wider">Karibu,</p><h2 className="text-2xl font-black">{user?.name} 👋</h2></div>
                <button onClick={() => goto('s-profile')} className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-xl hover:bg-white/30 transition-colors">👤</button>
              </div>
              <div className="bg-white/10 p-4 rounded-3xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm font-bold italic opacity-90">"Chakula chako ndio tiba yako ya kwanza."</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[10px] opacity-70">— Dr. REVO</p>
                  <div className="flex items-center gap-1 bg-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <Sparkles size={10} className="text-yellow-300" /> PREMIUM
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform" onClick={() => goto('s-scan')}>
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl">📷</div>
                <div className="font-bold text-emerald-900 text-sm">Scanner</div>
              </div>
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform" onClick={() => goto('s-maktaba')}>
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl">🌱</div>
                <div className="font-bold text-emerald-900 text-sm">Maktaba</div>
              </div>
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform" onClick={() => goto('s-ratiba')}>
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">📅</div>
                <div className="font-bold text-emerald-900 text-sm">Ratiba</div>
              </div>
              <div className="bg-emerald-50 p-6 rounded-[32px] shadow-sm border border-emerald-100 flex flex-col items-center gap-2 active:scale-95 transition-transform" onClick={() => setIsAiOpen(true)}>
                <div className="w-12 h-12 bg-emerald-200/50 rounded-2xl flex items-center justify-center text-2xl">💬</div>
                <div className="font-bold text-emerald-700 text-sm">Dr. REVO</div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-end mb-4 px-2">
                <h3 className="font-black text-emerald-900">🌿 MIMEA MAARUFU</h3>
                <button onClick={() => goto('s-maktaba')} className="text-xs text-emerald-600 font-bold">ZOTE →</button>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                {MIMEA.slice(0, 10).map(m => (
                  <div key={m.id} className="min-w-[140px] bg-white p-4 rounded-[32px] shadow-sm border border-gray-100 text-center active:scale-95 transition-transform" onClick={() => { setSelectedHerb(m); goto('s-mmea'); }}>
                    <div className="w-16 h-16 bg-gray-50 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">{m.emoji}</div>
                    <div className="font-bold text-xs truncate text-emerald-900">{m.name}</div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1">Soma zaidi</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {screen === 's-maktaba' && (
          <motion.div key="maktaba" className="flex-1 flex flex-col p-4 pb-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 mb-6 pt-4">
              <button onClick={() => goto('s-home')} className="w-10 h-10 bg-white rounded-xl shadow-sm border flex items-center justify-center">←</button>
              <h2 className="text-xl font-black text-emerald-900">Maktaba ya Mimea</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {MIMEA.map(m => (
                <div key={m.id} className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm text-center active:scale-95 transition-transform" onClick={() => { setSelectedHerb(m); goto('s-mmea'); }}>
                  <div className="w-16 h-16 bg-emerald-50 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">{m.emoji}</div>
                  <div className="font-bold text-sm text-emerald-900 mb-0.5">{m.name}</div>
                  <div className="text-[10px] text-gray-400 italic font-medium">{m.latin}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {screen === 's-ratiba' && (
          <motion.div key="ratiba" className="flex-1 flex flex-col p-4 pb-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 mb-6 pt-4">
              <button onClick={() => goto('s-home')} className="w-10 h-10 bg-white rounded-xl shadow-sm border flex items-center justify-center">←</button>
              <h2 className="text-xl font-black text-emerald-900">Ratiba za Afya</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(RATIBA_ALL).map(([key, r]) => (
                <div key={key} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform" onClick={() => { setSelectedRatiba({ ...r, key }); goto('s-ratiba-detail'); }}>
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl">
                    {key === 'nguvu' ? '💪' : key === 'usingizi' ? '😴' : key === 'shinikizo' ? '❤️' : '🌿'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-emerald-900">{r.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{r.desc}</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">→</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {screen === 's-ratiba-detail' && selectedRatiba && (
          <motion.div key="ratiba-detail" className="flex-1 flex flex-col pb-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-emerald-900 p-8 pt-12 text-white">
              <button onClick={() => goto('s-ratiba')} className="mb-6 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">←</button>
              <h2 className="text-3xl font-black mb-2">{selectedRatiba.title}</h2>
              <p className="text-emerald-200 text-sm font-medium">{selectedRatiba.desc}</p>
            </div>
            <div className="p-4 space-y-6 -mt-6 bg-gray-50 rounded-t-[40px]">
              {selectedRatiba.days.map((day: any, idx: number) => (
                <div key={idx} className="space-y-3">
                  <h3 className="font-black text-emerald-900 px-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    {day.siku}: {day.sub}
                  </h3>
                  <div className="space-y-3">
                    {day.sessions.map((ses: any, sIdx: number) => (
                      <div key={sIdx} className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">{ses.t}</div>
                          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg">{ses.pill.split(' ')[0]}</div>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-800 text-sm">{ses.title}</h5>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ses.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {screen === 's-profile' && (
          <motion.div key="profile" className="flex-1 flex flex-col p-4 pb-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 mb-8 pt-4">
              <button onClick={() => goto('s-home')} className="w-10 h-10 bg-white rounded-xl shadow-sm border flex items-center justify-center">←</button>
              <h2 className="text-xl font-black text-emerald-900">Wasifu Wangu</h2>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center mb-6">
              <div className="w-24 h-24 bg-emerald-100 rounded-3xl mx-auto mb-4 flex items-center justify-center text-5xl">👤</div>
              <h3 className="text-2xl font-black text-emerald-900">{user?.name}</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Mwanachama tangu {new Date(user?.joinDate || '').toLocaleDateString()}</p>
              <div className="bg-emerald-600 text-white py-2 px-6 rounded-full inline-flex items-center gap-2 text-xs font-black">
                <Sparkles size={14} /> AKAUNTI YA PREMIUM
              </div>
            </div>
            <button onClick={logout} className="w-full bg-red-50 text-red-600 py-4 rounded-3xl font-black text-sm active:bg-red-100 transition-colors">ONDOKA KWENYE MFUMO</button>
            <div className="mt-auto text-center p-8">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Afya-Lishe Smart v2.0</p>
              <p className="text-[10px] text-gray-300">Imeundwa na Dr. REVO AI</p>
            </div>
          </motion.div>
        )}

        {screen === 's-mmea' && selectedHerb && (
          <motion.div key="mmea" className="flex-1 flex flex-col pb-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-emerald-50 h-72 flex items-center justify-center text-9xl relative">
              <button onClick={() => goto('s-maktaba')} className="absolute top-8 left-4 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">←</button>
              <motion.div initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}>{selectedHerb.emoji}</motion.div>
            </div>
            <div className="p-8 bg-white -mt-12 rounded-t-[48px] flex-1 shadow-2xl relative z-10 border-t border-white/50">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
              <h2 className="text-4xl font-black text-emerald-900 mb-2">{selectedHerb.name}</h2>
              <p className="text-emerald-600 font-bold italic mb-8 flex items-center gap-2">
                <Sparkles size={16} /> {selectedHerb.latin}
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-emerald-600/50 uppercase tracking-[0.2em] mb-4">FAIDA NA MATUMIZI</h4>
                  <p className="text-base font-bold text-gray-800 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                    {selectedHerb.matumizi}
                  </p>
                </div>
                
                <div>
                   <h4 className="text-[10px] font-black text-emerald-600/50 uppercase tracking-[0.2em] mb-4">HATUA ZA KUTAYARISHA</h4>
                   <div className="space-y-4">
                      {selectedHerb.steps.map((s, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white group hover:border-emerald-200 transition-colors">
                          <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-sm font-black group-hover:bg-emerald-600 group-hover:text-white transition-colors">{i+1}</div>
                          <div>
                            <p className="text-xs font-black text-emerald-800 mb-0.5">{s.t}</p>
                            <p className="text-sm font-bold text-gray-500 leading-snug">{s.tx}</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                  <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">TAHADHARI</h4>
                  <p className="text-xs font-bold text-red-800 leading-relaxed">{selectedHerb.onyo}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 's-scan' && (
          <motion.div key="scan" className="flex-1 bg-white pb-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 p-4 pt-8">
              <button onClick={() => goto('s-home')} className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">←</button>
              <h2 className="text-xl font-black text-emerald-900">Scanner ya Akili</h2>
            </div>
            <PlantScanner />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-white/50 p-3 rounded-[32px] flex justify-around items-center max-w-md mx-auto z-40 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <button onClick={() => goto('s-home')} className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${screen === 's-home' ? 'text-emerald-700 bg-emerald-50 scale-110 shadow-sm' : 'text-gray-400'}`}>
          <div className="text-2xl">🏠</div>
          {screen === 's-home' && <div className="w-1 h-1 bg-emerald-700 rounded-full" />}
        </button>
        <button onClick={() => goto('s-maktaba')} className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${screen === 's-maktaba' ? 'text-emerald-700 bg-emerald-50 scale-110 shadow-sm' : 'text-gray-400'}`}>
          <div className="text-2xl">🌿</div>
          {screen === 's-maktaba' && <div className="w-1 h-1 bg-emerald-700 rounded-full" />}
        </button>
        <button onClick={() => goto('s-scan')} className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${screen === 's-scan' ? 'text-emerald-700 bg-emerald-50 scale-110 shadow-sm' : 'text-gray-400'}`}>
          <div className="text-2xl">📷</div>
          {screen === 's-scan' && <div className="w-1 h-1 bg-emerald-700 rounded-full" />}
        </button>
        <button onClick={() => setIsAiOpen(true)} className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${isAiOpen ? 'text-emerald-700 bg-emerald-50 scale-110' : 'text-gray-400'}`}>
          <div className="text-2xl">💬</div>
        </button>
      </nav>

      <AIChat isVisible={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}
