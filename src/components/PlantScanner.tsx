import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Image as ImageIcon, Loader2, CheckCircle2, History } from 'lucide-react';
interface ScanResult {
  jina_kiswahili: string;
  jina_kiingereza: string;
  jina_kilatin: string;
  uhakika: number;
  vitu_vilivyomo: string[];
  maelezo_mfupi: string;
  faida: { emoji: string; maelezo: string }[];
  magonjwa: string[];
  matumizi_dawa: string[];
  tahadhari: string;
  hitilafu?: string;
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
    try {
      const response = await fetch('/api/analyze-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image,
          prompt: `Chambua picha hii ya mmea wa tiba asilia kwa KINA sana. Usitoe majibu ya jumla (generic). 
 NI LAZIMA 'matumizi_dawa' yawe mahususi kwa mmea huu (mfano: kama ni mizizi, majani, au magome) na jinsi ya kuandaa kwa usahihi kwa ajili ya magonjwa yaliyotajwa.
 
 Jibu kwa muundo huu wa JSON pekee:
 {
   "jina_kiswahili": "Jina maarufu la mmea",
   "jina_kiingereza": "Common English Identity",
   "jina_kilatin": "Full Scientific Name",
   "uhakika": 98,
   "vitu_vilivyomo": ["Orodha ya kemikali asili/virutubisho"],
   "maelezo_mfupi": "Uchambuzi wa kitaalamu wa mmea huu.",
   "faida": [
     {"emoji": "🔬", "maelezo": "Faida 1"},
     {"emoji": "🛡️", "maelezo": "Faida 2"},
     {"emoji": "🔋", "maelezo": "Faida 3"}
   ],
   "magonjwa": ["Orodha ya magonjwa"],
   "matumizi_dawa": ["Maelekezo ya kuandaa"],
   "tahadhari": "Tahadhari za kiafya."
 }
 Kama hii si picha ya mmea wa tiba, jibu: {"hitilafu": "Hivyo si picha ya mmea wa tiba asilia. Tafadhali piga picha mmea vizuri."}`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'MISSING_KEY' || errorData.error === 'API Key missing') {
          throw new Error("MISSING_KEY");
        }
        throw new Error(errorData.error || "Hitilafu imetokea.");
      }

      const resultData = await response.json();
      const data = JSON.parse(resultData.text || "{}");
      
      if (data.hitilafu) {
        alert(data.hitilafu);
      } else {
        setResult(data);
      }
    } catch (error: any) {
      console.error('Scan error:', error);
      
      if (error.message === 'MISSING_KEY') {
        alert('⚠️ MSAADA: Ufunguo haujapatikana.\n\nFuata haya:\n1. Nenda kwenye Settings -> Secrets.\n2. Bonyeza "Add secret", jina weka APP_PROJECT_SECRET.\n3. Chagua "AI Studio Free Tier" kisha Piga Save (Apply changes).');
      } else {
        alert(`Imeshindwa kuchakata picha.\n\nSababu: ${error.message || 'Hitilafu haijulikani'}`);
      }
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
