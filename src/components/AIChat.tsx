import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, ChevronLeft, MapPin, User, Phone, Package, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
  isOrder?: boolean;
}

export default function AIChat({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Order Form State
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    location: '',
    phone: '',
    medicine: ''
  });

  const sendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { 
      role: 'user', 
      parts: [{ text: textToSend }],
      isOrder: !!textOverride 
    };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: newHistory,
          systemInstruction: `Wewe ni Dr. REVO Nutritional expert kutoka JOS Natural Herbs. 
            
            MBINU ZA MAZUNGUMZO (KWA VIPAUMBELE):
            1. MSILIZE MTEJA: Daima anza kwa kumuhimiza mteja aeleze dalili zake kwa undani. Jenga ukaribu na mpe tumaini mteja.
            
            2. USALAMA NA MAKTABA (MUHIMU SANA - FUATA HII):
               - KAMA TATIZO LA MTEJA haliko kwenye orodha ya dava za JOS, au mteja anataka kuanza na mimea rahisi:
               - LAZIMA umwelekeze arudi kwenye sehemu ya "Maktaba ya Mimea" ndani ya app hii.
            
            3. BEI NA MALIPO:
               - BIDHAA: KIDUME PLUS (130k/65k), MJULUS PRO (110k/60k), Tumbo Relief (100k/60k), Mama Fertile (120k/60k), Bawasiri (100k).
               - Delivery: 10,000/= (Inalipiwa KABLA).
               - Malipo: Lipa Namba 67363327 (JOS NATURAL HERBS).
            
            4. MWONEKANO: Tumia Bold, orodha, na --- kufanya ujumbe uwe nadhifu.`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'MISSING_KEY') {
          throw new Error('MISSING_KEY');
        }
        throw new Error(errorData.error || "Hitilafu imetokea.");
      }

      const result = await response.json();
      const text = result.text || 'Samahani, sijapata jibu.';
      const modelMessage: Message = { role: 'model', parts: [{ text: text }] };
      setHistory((prev) => [...prev, modelMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const isMissingKey = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'undefined' || process.env.GEMINI_API_KEY === '';
      
      if (error.message === 'MISSING_KEY') {
        setHistory((prev) => [...prev, { role: 'model', parts: [{ text: `⚠️ **MSAADA WA HARAKA: UFUNGUO HAUJAPATIKANA**
        
Daktari REVO hawezi kuongea bila ufunguo wa mfumo. Fuata hatua hizi 3 rahisi:

1. **Nenda kwenye "Secrets"**: Bonyeza kitufe cha Settings (⚙️) juu kabisa kisha nenda kwenye sehemu ya **Secrets**.
2. **Ongeza Secret Mpya**: Bonyeza "Add secret", kisha kwenye **Name** andika \`APP_PROJECT_SECRET\`. Upande wa **Value**, chagua ule ufunguo wenye neno **"AI Studio Free Tier"**.
3. **PIGA SAVE**: Bonyeza kitufe cha bluu kidogo chini kinachosema **"Apply changes"**.

Ukishafanya hivyo, andika "Hodi" hapa chini nianze kukuhudumia!` }] }]);
      } else {
        setHistory((prev) => [...prev, { role: 'model', parts: [{ text: `⚠️ **Tatizo la Mfumo:** ${error.message || 'Hitilafu haijulikani'}` }] }]);
      }
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleOrderSubmit = () => {
    const text = `AGIZO LA DAWA:\n- Dawa: ${orderDetails.medicine}\n- Jina: ${orderDetails.name}\n- Mahali: ${orderDetails.location}\n- Simu: ${orderDetails.phone}`;
    sendMessage(text);
    setShowOrderForm(false);
  };

  const sendToWhatsApp = () => {
    const text = `Habari Dr. REVO, Nahitaji kuagiza dawa:\n\n- Dawa: ${orderDetails.medicine}\n- Jina: ${orderDetails.name}\n- Mkoa/Wilaya: ${orderDetails.location}\n- Simu: ${orderDetails.phone}\n\nNimejaza kupitia App ya Afya-Lishe. Naomba utaratibu wa malipo.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/255652421286?text=${encoded}`);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[600] flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
      {/* Header - Matching App Style */}
      <div className="flex items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm pt-8">
        <button 
          onClick={onClose} 
          className="flex items-center text-sm font-medium text-gray-500 hover:text-emerald-700 transition-colors"
        >
          <ChevronLeft size={18} className="mr-1" />
          Rudi
        </button>
        <div className="flex-1 text-center font-serif text-lg font-bold text-emerald-900 flex items-center justify-center">
          <div className="mr-2">🌿</div> Dr. REVO
        </div>
        <div className="w-12"></div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
        {history.length === 0 && (
          <div className="text-center py-10 text-muted space-y-4">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Bot className="text-emerald-700" size={40} />
            </div>
            <div className="space-y-2 max-w-xs mx-auto">
              <p className="text-sm font-bold text-gray-800">Habari! Mimi ni Dr. REVO.</p>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Tafadhali nieleze unajisikiaje au unahitaji msaada gani wa afya leo? 
                Niko hapa kukupa ushauri wa kitaalamu na kukuelekeza dozi sahihi.
              </p>
            </div>
            <div className="pt-4 px-6 grid grid-cols-1 gap-2">
              <button 
                onClick={() => setShowOrderForm(true)}
                className="px-6 py-4 bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
              >
                <Package size={16} />
                Agiza Dawa ya JOS Hapa
              </button>
              <p className="text-[10px] text-gray-400 font-medium italic">
                Ukishajaza fomu, utatuma agizo moja kwa moja WhatsApp.
              </p>
            </div>
          </div>
        )}
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[88%] p-3 rounded-2xl text-[14px] font-medium leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-emerald-800 text-white rounded-br-none shadow-md shadow-emerald-900/10' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.role === 'model' ? (
                <div className="markdown-body prose prose-sm prose-emerald max-w-none">
                  <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{msg.parts[0].text}</div>
              )}
              
              {msg.isOrder && msg.role === 'user' && (
                <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/20">
                  <p className="text-[10px] mb-2 font-bold uppercase tracking-wider text-emerald-100 italic">Hatua ya mwisho:</p>
                  <button 
                    onClick={sendToWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-black text-xs transition-transform active:scale-95 shadow-lg"
                  >
                    <ExternalLink size={16} />
                    Tuma Agizo WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-emerald-700" />
              <span className="text-[10px] font-bold text-gray-400 italic">Inachakata...</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Area */}
      <div className="p-4 bg-white border-t border-gray-100 pb-8">
        {!showOrderForm ? (
          <div className="flex gap-2 items-center">
            <button 
              onClick={() => setShowOrderForm(true)}
              className="w-12 h-12 bg-gray-100 text-emerald-700 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all hover:bg-emerald-50 active:scale-90"
              title="Agiza Dawa"
            >
              <Package size={22} />
            </button>
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Andika ujumbe hapa..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:border-emerald-500 font-medium pr-14 shadow-inner"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="absolute right-1 top-1 bottom-1 w-12 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center disabled:opacity-30 shadow-md active:scale-95 transition-all"
              >
                <Send size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 p-5 rounded-3xl space-y-4 animate-in fade-in slide-in-from-bottom-4 shadow-2xl border border-emerald-100 mb-2">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
              <div className="font-black text-emerald-900 text-[10px] uppercase tracking-widest flex items-center gap-1">
                <Package size={12} /> FOMU YA AGIZO LA DAWA
              </div>
              <button onClick={() => setShowOrderForm(false)} className="text-emerald-700 text-xs font-black px-2 py-1">× Funga</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
               <div className="relative">
                 <User className="absolute left-3 top-3 text-emerald-400" size={14} />
                 <input 
                   placeholder="Jina lako" 
                   className="w-full pl-9 pr-3 py-3 text-xs rounded-xl border border-emerald-100 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                   value={orderDetails.name}
                   onChange={e => setOrderDetails({...orderDetails, name: e.target.value})}
                 />
               </div>
               <div className="relative">
                 <MapPin className="absolute left-3 top-3 text-emerald-400" size={14} />
                 <input 
                   placeholder="Mkoa" 
                   className="w-full pl-9 pr-3 py-3 text-xs rounded-xl border border-emerald-100 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                   value={orderDetails.location}
                   onChange={e => setOrderDetails({...orderDetails, location: e.target.value})}
                 />
               </div>
               <div className="relative">
                 <Phone className="absolute left-3 top-3 text-emerald-400" size={14} />
                 <input 
                   placeholder="Namba" 
                   className="w-full pl-9 pr-3 py-3 text-xs rounded-xl border border-emerald-100 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                   value={orderDetails.phone}
                   onChange={e => setOrderDetails({...orderDetails, phone: e.target.value})}
                 />
               </div>
               <div className="relative">
                 <Package className="absolute left-3 top-3 text-emerald-400" size={14} />
                 <input 
                   placeholder="Dawa gani?" 
                   className="w-full pl-9 pr-3 py-3 text-xs rounded-xl border border-emerald-100 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                   value={orderDetails.medicine}
                   onChange={e => setOrderDetails({...orderDetails, medicine: e.target.value})}
                 />
               </div>
            </div>
            <button 
              onClick={handleOrderSubmit}
              disabled={!orderDetails.name || !orderDetails.medicine}
              className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-black text-xs shadow-xl shadow-emerald-900/10 disabled:opacity-50 transition-transform active:scale-[0.98]"
            >
              Thibitisha Maelezo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
