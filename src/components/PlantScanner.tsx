import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Image as ImageIcon, Loader2, Sparkles, CheckCircle2, History } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialization with lazy check
let aiInstance: any = null;
const getAI = () => {
  if (aiInstance) return aiInstance;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  aiInstance = new GoogleGenAI({ apiKey });
  return aiInstance;
};

interface ScanResult {
  jina_kiswahili: string;
  jina_kiingereza: string;
  jina_kilatin: string;
  uhakika: number;
  vitu_vilivyomo: string[]; // Added this
  maelezo_mfupi: string;
  faida: { emoji: string; maelezo: string }[];
  magonjwa: string[];
  matumizi_dawa: string[];
  tahadhari: string;
}

export default function PlantScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzePlant = async () => {
    if (!image || loading) return;

    setLoading(true);
    const base64Data = image.split(',')[1];
    const mimeType = image.split(',')[0].split(':')[1].split(';')[0];

    try {
      const ai = getAI();
      if (!ai) throw new Error("Ufunguo wa API haujapatikana.");

      const prompt = `Chambua picha hii ya mmea wa tiba asilia kwa KINA sana. Usitoe majibu ya jumla (generic). 
NI LAZIMA 'matumizi_dawa' yawe mahususi kwa mmea huu (mfano: kama ni mizizi, majani, au magome) na jinsi ya kuandaa kwa usahihi kwa ajili ya magonjwa yaliyotajwa.

Jibu kwa muundo huu wa JSON pekee:
{
  "jina_kiswahili": "Jina maarufu la mmea",
  "jina_kiingereza": "Common English Identity",
  "jina_kilatin": "Full Scientific Name",
  "uhakika": 98,
  "vitu_vilivyomo": ["Orodha ya kemikali asili/virutubisho mfano: Flavonoids, Salicin, Essential oils, nk"],
  "maelezo_mfupi": "Uchambuzi wa kitaalamu wa mmea huu, asili yake, na kwanini una nguvu za kutosha kutibu. Mistari 5-6.",
  "faida": [
    {"emoji": "🔬", "maelezo": "Uchambuzi wa kisayansi wa faida ya kwanza"},
    {"emoji": "🛡️", "maelezo": "Faida ya pili katika mfumo wa kinga"},
    {"emoji": "🔋", "maelezo": "Faida ya tatu ya kudumu mwilini"}
  ],
  "magonjwa": ["Orodha ndefu (5-10) ya magonjwa ambayo mmea huu unashughulikia"],
  "matumizi_dawa": [
    "Maelekezo Maalum Hatua ya 1: Jinsi ya kuchagua/kuchuma na kusafisha sehemu inayotumika (mizizi/majani/magome)",
    "Maelekezo Maalum Hatua ya 2: Jinsi ya kuandaa (mfano: kusuuza, kuchemsha kwenye maji kiasi flani, au kuanika na kisha kusaga)",
    "Maelekezo Maalum Hatua ya 3: Dozi kamili kulingana na ugonjwa (mfano: vijiko, muda wa kunywa kama kabla ya mlo au baada, na kwa siku ngapi)"
  ],
  "tahadhari": "Maelezo ya kina kwa nani hapaswi kutumia na tahadhari wakati wa maandalizi."
}
Kama hii si picha ya mmea wa tiba, jibu: {"hitilafu": "Hivyo si picha ya mmea wa tiba asilia. Tafadhali piga picha mmea vizuri."}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: prompt },
              { inlineData: { data: base64Data, mimeType: mimeType } }
            ]
          }
        ],
      });

      let text = response.text || '';
      text = text.replace(/```json|```/g, '').trim();
      const data = JSON.parse(text);
      if (data.hitilafu) {
        alert(data.hitilafu);
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error('Scan error:', error);
      alert('Imeshindwa kuchakata picha. Tafadhali hakikisha ufunguo wa API umewekwa au jaribu tena baadae.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-playfair font-bold text-emerald-900 flex items-center justify-center gap-2">
          <Camera className="text-emerald-600" /> Scanner ya Mimea
        </h2>
        <p className="text-emerald-700/70 text-sm font-medium">Piga picha mmea wowote → Mwongozo wa tiba utatolewa papo hapo</p>
      </div>

      {!result ? (
        <div className="space-y-4 px-4">
          {/* Main Camera Area */}
          <label className="block">
            <div className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer bg-white group shadow-sm ${image ? 'border-emerald-500 bg-emerald-50/10' : 'border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/5'}`}>
              <input type="file" className="hidden" accept="image/*" capture="environment" onChange={handleFile} id="cameraInput" />
              
              {image ? (
                <div className="relative">
                  <img src={image} className="w-full max-h-64 object-cover rounded-2xl mx-auto shadow-md" />
                  <div className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full backdrop-blur-sm" onClick={(e) => { e.preventDefault(); setImage(null); }}>✕</div>
                </div>
              ) : (
                <div className="space-y-4 py-4 animate-pulse">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto transition-transform group-hover:scale-110 shadow-inner ring-4 ring-emerald-500/20">
                    <Camera size={40} />
                  </div>
                  <div>
                    <p className="font-black text-emerald-900 italic text-xl leading-tight uppercase tracking-tight">PIGA PICHA HAPA</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                       <p className="text-[10px] text-emerald-600 font-bold bg-emerald-100/50 py-1 px-4 rounded-full inline-block uppercase tracking-widest border border-emerald-200">
                         Gusa kufungua Kamera
                       </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </label>

          <div className="grid grid-cols-2 gap-3">
            {/* Gallery Options */}
            <div className="col-span-1">
               <input type="file" className="hidden" accept="image/*" onChange={handleFile} id="galleryInput" />
               <button
                 onClick={() => {
                   const input = document.getElementById('galleryInput') as HTMLInputElement;
                   if (input) {
                     input.value = ''; // Reset to allow same file selection
                     input.click();
                   }
                 }}
                 className="w-full flex flex-col items-center justify-center gap-1 bg-white border-2 border-emerald-500/20 py-3 rounded-2xl font-black text-[10px] text-emerald-900 hover:bg-emerald-50 transition-all shadow-sm active:scale-95 uppercase tracking-widest"
               >
                 <ImageIcon size={20} className="text-emerald-500" />
                 CHAGUA ALBUM
               </button>
            </div>

            {/* Fanya Uchunguzi */}
            <button
              onClick={analyzePlant}
              disabled={!image || loading}
              className="col-span-1 bg-emerald-700 text-white py-4 rounded-2xl font-black text-[11px] flex items-center justify-center gap-2 hover:bg-emerald-800 transition-all disabled:opacity-30 shadow-lg shadow-emerald-900/20 active:scale-[0.98] uppercase tracking-wider"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
              {loading ? 'Subiri...' : 'Fanya Uchunguzi'}
            </button>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex gap-3 italic text-[11px] font-bold leading-relaxed text-emerald-900/80">
            <span className="text-emerald-500 text-lg">✨</span>
            Kidokezo: Kwa matokeo bora, hakikisha picha inaonyesha majani vizuri na ina mwanga wa kutosha.
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
        >
          {/* Header Card */}
          <div className="bg-emerald-900 p-6 text-white text-center">
            <h3 className="text-2xl font-serif font-bold mb-1">{result.jina_kiswahili}</h3>
            <p className="text-emerald-400 italic text-sm mb-4 font-bold">{result.jina_kilatin}</p>
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">🇬🇧 {result.jina_kiingereza}</span>
              <span className="bg-emerald-500/20 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-400/20 text-emerald-100">🎯 {result.uhakika}% Uhakika</span>
            </div>
          </div>

          <div className="p-6 space-y-7">
            <div>
              <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div> Maelezo ya Mmea
              </h4>
              <p className="text-gray-700 leading-relaxed text-sm font-medium italic">{result.maelezo_mfupi}</p>
            </div>

            {result.vitu_vilivyomo && (
              <div>
                <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div> Vitu Vilivyomo Ndani
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.vitu_vilivyomo.map((v, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-[10px] font-black border border-emerald-100 uppercase tracking-tight">{v}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div> Faida za Tiba
              </h4>
              <div className="grid gap-3">
                {result.faida.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <span className="text-2xl mt-1">{f.emoji}</span>
                    <p className="text-[14px] font-bold text-gray-800 leading-tight">{f.maelezo}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div> Magonjwa Inayotibu
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.magonjwa.map((m, i) => (
                  <span key={i} className="bg-emerald-900 text-white px-4 py-2 rounded-2xl text-[11px] font-black border border-emerald-950 uppercase tracking-tight">{m}</span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div> Jinsi ya Kuandaa Dawa
              </h4>
              <div className="space-y-6">
                {result.matumizi_dawa.map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center text-[12px] font-black shrink-0 shadow-lg shadow-emerald-900/20 border-2 border-emerald-500">
                      {i + 1}
                    </div>
                    <p className="text-[14px] text-gray-800 font-bold leading-relaxed pt-1">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {result.tahadhari && (
              <div className="bg-red-50 border border-red-100 p-5 rounded-3xl mt-4">
                <p className="text-red-700 text-xs font-black flex items-center gap-2 uppercase tracking-widest mb-1">
                   Tahadhari Muhimu
                </p>
                <p className="text-red-900 text-sm font-bold italic">{result.tahadhari}</p>
              </div>
            )}

            <button
              onClick={() => { setResult(null); setImage(null); }}
              className="w-full bg-gray-900 py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
            >
              <History size={18} /> Chunguza Mwingine
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
