import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RATIBA_ALL, MIMEA, Herb, User } from './constants';
import AIChat from './components/AIChat';
import PlantScanner from './components/PlantScanner';

export default function App() {
  const [screen, setScreen] = useState('s-welcome');
  const [user, setUser] = useState<User | null>(null);
  const [diagStep, setDiagStep] = useState(0);
  const [diagAns, setDiagAns] = useState<Record<number, number>>({});
  const [lastReport, setLastReport] = useState<{ score: number; ans: Record<number, number> } | null>(null);
  const [mmeaFilt, setMmeaFilt] = useState('all');
  const [mmeaQ, setMmeaQ] = useState('');
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [herbTab, setHerbTab] = useState('mael');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [showBNav, setShowBNav] = useState(false);
  const [selPkg, setSelPkg] = useState(3000);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [chatRoom, setChatRoom] = useState('general');

  // Diagnosis Questions
  const MASWALI = [
    { ic: '😴', cat: 'Nishati (Energy Levels)', q: 'Je, mara ngapi huhisi uchovu (Fatigue) bila sababu ya msingi ya mwili?', sub: 'Hii inasaidia kupima kiwango chako cha kimetaboliki (Metabolism)', opts: ['Kila siku — nishati iko chini kabisa', 'Mara nyingi — siku 4-5 kwa wiki', 'Wakati mwingine — mara 2-3 kwa wiki', 'Nadra — wakati wa kazi nyingi tu', 'Kamwe — nina nishati ya kutosha'] },
    { ic: '❤️', cat: 'Mzunguko wa Damu (Circulation)', q: 'Je, unahisi mapigo ya moyo (Palpitations) yakipumua haraka au miguu kuvimba?', sub: 'Inapima ufanisi wa mfumo wa mzunguko wa damu', opts: ['Ndio, hutokea mara kwa mara', 'Ndiyo, nikifanya kazi kidogo tu', 'Wakati mwingine nakisia hili', 'Nadra sana kutokea', 'Hapana, mzunguko wangu uko thabiti'] },
    { ic: '🧠', cat: 'Afya ya Mishipa ya Fahamu', q: 'Je, unakabiliwa na msongo wa mawazo (Stress) au maumivu ya kichwa mara kwa mara?', sub: 'Msongo wa mawazo huathiri uzalishaji wa homoni mwilini', opts: ['Msongo mkali — huathiri utendaji wangu', 'Msongo wa hapa na pale — unanichosha', 'Msongo wa wastani — ninauhimili', 'Msongo mdogo — mara chache sana', 'Sina msongo — akili yangu imetulia'] },
    { ic: '💪', cat: 'Msaada wa Homoni (Hormonal Health)', q: 'Je, unaripoti dalili zozote za kupungukiwa kwa nguvu za kiume au hamu ya tendo?', sub: 'Tathmini ya kiwango cha Testosterone na nishati ya uzazi', opts: ['Ndio — hali ni dhaifu sana', 'Ndio — imepungua kulinganisha na awali', 'Wakati mwingine napata mkazo', 'Nadra sana kuwa na changamoto hii', 'Hapana — niko imara kabisa'] },
    { ic: '🌙', cat: 'Ubora wa Usingizi', q: 'Je, unapata usingizi mzito (Deep Sleep) bila kushtuka usiku kucha?', sub: 'Usingizi ni muhimu kwa ukarabati wa seli (Cell repair)', opts: ['Mbaya — sipati kabisa usingizi mzito', 'Dhaifu — naamka nikiwa nimechoka', 'Wastani — nalala kwa saa chache', 'Mzuri — ninalala kwa ujumla', 'Bora — naamka na nishati mpya'] },
    { ic: '🥣', cat: 'Mmeng\'enyo wa Chakula (Gut Health)', q: 'Je, unakabiliwa na constipation au tumbo kujaa gesi baada ya mlo?', sub: 'Afya ya mfumo wa chakula ndio msingi wa kinga ya mwili', opts: ['Kila siku — tumbo linasumbua sana', 'Mara nyingi — baada ya milo mingi', 'Wakati mwingine — inategemea mlo', 'Nadra — mara chache mwezi huu', 'Kamwe — mmengenyo wangu ni mzuri'] },
    { ic: '🦴', cat: 'Uvimbe (Anti-Inflammation)', q: 'Je, unahisi maumivu ya viungo, migongo, au misuli bila jeraha la wazi?', sub: 'Inapima kiwango cha uchochezi (inflammation) mwilini', opts: ['Ndio, maumivu ni ya kudumu', 'Ndio, hasa wakati wa baridi au asubuhi', 'Wakati mwingine baada ya kazi', 'Nadra sana kuhisi maumivu', 'Hapana, viungo vyangu viko imara'] },
    { ic: '💧', cat: 'Dalili za Metaboli', q: 'Je, unahisi kiu iliyopitiliza au kukojoa mara kwa mara nyakati za usiku?', sub: 'Alama muhimu ya usawa wa sukari na kazi ya figo', opts: ['Ndio, nakojoa zaidi ya mara 3 usiku', 'Ndio, najihisi kiu kali mara kwa mara', 'Wakati mwingine najiona mchovu', 'Nadra, inatokea nikinywa maji mengi', 'Hapana, hali yangu ni ya kawaida'] },
    { ic: '🛡️', cat: 'Mfumo wa Kinga (Immunity)', q: 'Je, mwili wako una uwezo kiasi gani wa kupambana na mafua au homa?', sub: 'Inapima nguvu ya seli nyeupe za damu na ulinzi wa mwili', opts: ['Kinga dhaifu — naugua mara kwa mara', 'Kinga ya wastani — mafua hayaniachi', 'Kinga nzuri — naugua mara chache', 'Kinga imara — sipati homa hovyo', 'Kinga thabiti kabisa — niko salama'] },
    { ic: '🥗', cat: 'Usawa wa Virutubisho', q: 'Je, mlo wako unahusisha mboga za majani, matunda, na nafaka zisizokobolewa?', sub: 'Msingi wa lishe bora ni vyanzo vya asili vya vitamini', opts: ['Kamwe — nakula vyakula vya kusindika', 'Nadra — mara 1-2 tu kwa wiki', 'Wastani — najitahidi angalau mara 3', 'Mara nyingi — kila siku nakula mboga', 'Bora — mlo wangu ni mimea kwa asilimia 80'] }
  ];

  useEffect(() => {
    const ses = localStorage.getItem('afya_ses');
    if (ses) {
      const u = JSON.parse(ses);
      setUser(u);
      setScreen('s-home');
      setShowBNav(true);
    }
  }, []);

  const goto = (id: string) => {
    setScreen(id);
    const appScs = ['s-home', 's-uchunguzi', 's-ripoti', 's-maktaba', 's-mmea', 's-ratiba', 's-malipo', 's-akaunti', 's-settings', 's-chat', 's-chat-room', 's-scan'];
    setShowBNav(appScs.includes(id));
    window.scrollTo(0, 0);
  };

  const doLogin = () => {
    const u: User = { name: 'Mtumiaji', email: 'test@example.com', phone: '', premium: true, joinDate: new Date().toISOString(), uchunguzi: 0 };
    setUser(u);
    localStorage.setItem('afya_ses', JSON.stringify(u));
    goto('s-home');
  };

  const doLogout = () => {
    setUser(null);
    localStorage.removeItem('afya_ses');
    goto('s-welcome');
  };

  const handleDiagAns = (idx: number) => {
    const newAns = { ...diagAns, [diagStep]: idx };
    setDiagAns(newAns);
    if (diagStep < MASWALI.length - 1) {
      setDiagStep(diagStep + 1);
    } else {
      let sum = 0;
      Object.values(newAns).forEach(v => { sum += (4 - (v as number)); });
      const score = Math.round((sum / (MASWALI.length * 4)) * 100);
      
      // Determine condition based on worst category
      const ansArr = Object.entries(newAns).map(([k, v]) => ({ qIdx: Number(k), aIdx: Number(v) }));
      const worstQ = ansArr.sort((a, b) => a.aIdx - b.aIdx)[0]; // Lowest index means lowest health in that cat
      
      let condition = 'jumla';
      if (worstQ.qIdx === 3) condition = 'nguvu';
      else if (worstQ.qIdx === 4) condition = 'usingizi';
      else if (worstQ.qIdx === 1) condition = 'shinikizo';
      else if (worstQ.qIdx === 0 || worstQ.qIdx === 8) condition = 'uchovu';
      else if (worstQ.qIdx === 2) condition = 'akili';

      const updatedUser = { ...user!, lastDiagCondition: condition, uchunguzi: (user?.uchunguzi || 0) + 1 };
      setUser(updatedUser);
      localStorage.setItem('afya_ses', JSON.stringify(updatedUser));
      
      setLastReport({ score, ans: newAns });
      goto('s-ripoti');
    }
  };

  const downloadRatiba = () => {
    if (!user?.lastDiagCondition) return;
    const ratiba = RATIBA_ALL[user.lastDiagCondition as keyof typeof RATIBA_ALL] || RATIBA_ALL.jumla;
    let content = `AFYA-LISHE: RATIBA YA TIBA ASILI (SIKU 7)\n`;
    content += `Programu: ${ratiba.title}\n`;
    content += `==========================================\n\n`;
    
    ratiba.days.forEach(d => {
      content += `SIKU YA ${d.day}:\n`;
      d.sessions.forEach(s => {
        content += `- ${s.t} (${s.lbl}): ${s.title}\n  Maelezo: ${s.text}\n  Dawa: ${s.pill}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ratiba_Afya_Lishe_${user.lastDiagCondition}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getMimeaRec = () => {
    if (!lastReport) return MIMEA.slice(0, 3);
    const ansArr = Object.entries(lastReport.ans);
    const worst = ansArr.sort((a, b) => (a[1] as number) - (b[1] as number)).slice(0, 3).map(([i]) => Number(i));
    const picks = [];
    if (worst.includes(3) || worst.includes(0)) picks.push(MIMEA[0], MIMEA[4]);
    if (worst.includes(1)) picks.push(MIMEA[3]);
    if (picks.length < 3) picks.push(...MIMEA.slice(0, 3 - picks.length));
    return picks.slice(0, 4);
  };

  const filteredMimea = MIMEA.filter(m => {
    if (mmeaFilt !== 'all' && !m.cats.includes(mmeaFilt)) return false;
    if (mmeaQ) {
      const q = mmeaQ.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.latin.toLowerCase().includes(q) ||
        m.cats.some(c => c.toLowerCase().includes(q)) ||
        m.faida.some(f => f.toLowerCase().includes(q)) ||
        m.matumizi.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const ratiba = RATIBA_ALL[user?.lastDiagCondition || 'jumla'] || RATIBA_ALL.jumla;

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {/* Welcome */}
        {screen === 's-welcome' && (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="sc on" id="s-welcome">
            <div className="welcome">
              <div className="w-orb1"></div><div className="w-orb2"></div>
              <div className="w-content">
                <div>
                  <div className="w-logo">
                    <span className="w-icon">🌿</span>
                    <div className="w-brand">AFYA-LISHE SMART</div>
                    <div className="w-brand-sub">Tiba ya Asili · Lishe Bora · Nguvu za Mwili</div>
                    <div className="w-academy-tag">🎓 HERBAL ACADEMY</div>
                  </div>
                  <div className="w-note">
                    <div className="w-note-title">📜 Ujumbe wa Mkurugenzi</div>
                    <div className="w-note-text">"Karibu kwenye mfumo wa kwanza wa kisayansi wa tiba ya asili Afrika Mashariki. Afya-Lishe Smart ni mshauri wako wa afya wa kibinafsi anayepatikana saa 24."</div>
                    <div className="w-note-sign">— Dr. REVO Nutritional expert, JOS Natural Herbs</div>
                  </div>
                  <div className="w-feats">
                    <div className="w-feat"><div className="w-feat-ic">🔬</div><div><div className="w-feat-title">Uchunguzi wa Kidijitali</div><div className="w-feat-sub">Ripoti yako ya afya papo hapo</div></div></div>
                    <div className="w-feat"><div className="w-feat-ic">🌱</div><div><div className="w-feat-title">Maktaba ya Mimea 50+</div><div className="w-feat-sub">Picha na kazi za kila mmea</div></div></div>
                  </div>
                </div>
                <div className="w-actions">
                  <button className="w-btn-main" onClick={() => goto('s-home')}>🌿 Anza Safari ya Afya →</button>
                  <button className="w-btn-sec" onClick={() => goto('s-login')}>Ingia Akaunti Yako</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Login */}
        {screen === 's-login' && (
          <motion.div key="login" initial={{ y: 20 }} animate={{ y: 0 }} className="sc on" id="s-login">
            <div className="auth-page">
              <div className="auth-box">
                <span className="auth-icon">🌿</span>
                <div className="auth-title">Karibu Tena</div>
                <div className="auth-sub">Ingia akaunti yako</div>
                <div className="fg"><label>Barua Pepe</label><input className="inp" type="text" placeholder="barua@email.com" /></div>
                <div className="fg"><label>Nywila</label><input className="inp" type="password" placeholder="Nywila yako" /></div>
                <button className="btn btn-gr btn-full mb-3" onClick={doLogin}>Ingia →</button>
                <div className="text-center text-sm text-muted-foreground"><span className="cursor-pointer text-green-700 font-bold" onClick={() => goto('s-welcome')}>← Nyumbani</span></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Home */}
        {screen === 's-home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sc on" id="s-home">
            <nav className="topbar">
              <div><div className="tb-logo">🌿 AFYA-LISHE</div><div className="text-[10px] text-muted-foreground mt-0.5">JOS Natural Herbs</div></div>
              <div className="tb-av" onClick={() => goto('s-akaunti')}>👤</div>
            </nav>
            <div className="page-wrap pb-32">
              <div className="home-hero">
                <div className="home-hero-inner">
                  <div className="home-hero-greet">Habari, <span>{user?.name?.split(' ')[0]}</span> 👋</div>
                  <div className="home-hero-title">Je, afya yako ikoje leo?</div>
                  <div className="home-hero-sub">Fanya uchunguzi na kupata mapendekezo ya kitaalamu</div>
                  <button className="btn bg-white text-green-900 px-6 py-3 font-extrabold rounded-[12px]" onClick={() => { setDiagStep(0); setDiagAns({}); goto('s-uchunguzi'); }}>🔬 Anza Uchunguzi →</button>
                </div>
              </div>
              <div className="quick-grid">
                <div className="quick-card" onClick={() => goto('s-maktaba')}><div className="qc-icon">🌱</div><div className="qc-title">Maktaba ya Mimea</div><div className="qc-sub">50+ mimea ya tiba asili</div></div>
                <div className="quick-card" onClick={() => goto('s-ratiba')}>
                  <div className="qc-icon">📅</div>
                  <div className="qc-title">Ratiba ya Siku 7</div>
                  <div className="qc-sub">
                    {user?.premium 
                      ? (user?.lastDiagCondition ? `Programu: ${user.lastDiagCondition.toUpperCase()}` : '✅ Inafanya kazi') 
                      : '🔒 Premium'}
                  </div>
                </div>
                <div className="quick-card accent-am" onClick={() => goto('s-malipo')}><div className="qc-icon">💳</div><div className="qc-title">Lipa & Fungua</div><div className="qc-sub text-amber-700 font-bold">TSh 5,000 / mwezi</div></div>
                <div className="quick-card accent-gr" onClick={() => goto('s-scan')}><div className="qc-icon">📷</div><div className="qc-title">Scanner ya Mimea</div><div className="qc-sub text-green-700 font-bold">Tambua mimea papo hapo</div></div>
              </div>
              <div className="section-title">🌿 Mimea Maarufu</div>
              <div className="mimea-scroll">
                {MIMEA.slice(0, 10).map(m => (
                  <div key={m.id} className="mmea-mini" onClick={() => { setSelectedHerb(m); goto('s-mmea'); }}>
                    <div className="mmea-mini-icon">{m.emoji}</div>
                    <div className="mmea-mini-name">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Uchunguzi */}
        {screen === 's-uchunguzi' && (
          <motion.div key="uchunguzi" className="sc on" id="s-uchunguzi">
            <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-home')}>← Rudi</button>
              <div className="text-base font-bold text-green-700">🔬 Uchunguzi wa Afya</div>
              <div className="text-xs font-semibold text-muted-foreground">{diagStep + 1}/{MASWALI.length}</div>
            </nav>
            <div className="diag-wrap">
              <div className="diag-labels"><span>Hatua ya {diagStep + 1}</span><span>{Math.round(((diagStep + 1) / MASWALI.length) * 100)}%</span></div>
              <div className="diag-progress-wrap"><div className="diag-progress" style={{ width: `${((diagStep + 1) / MASWALI.length) * 100}%` }}></div></div>
              <div className="diag-card">
                <span className="diag-icon">{MASWALI[diagStep].ic}</span>
                <div className="diag-cat">{MASWALI[diagStep].cat}</div>
                <div className="diag-q">{MASWALI[diagStep].q}</div>
                <div className="diag-qsub">{MASWALI[diagStep].sub}</div>
                <div className="diag-opts">
                  {MASWALI[diagStep].opts.map((o, i) => (
                    <div key={i} className={`diag-opt ${diagAns[diagStep] === i ? 'sel' : ''}`} onClick={() => handleDiagAns(i)}>
                      <div className="diag-dot">{diagAns[diagStep] === i ? '✓' : String.fromCharCode(65 + i)}</div>
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Ripoti */}
        {screen === 's-ripoti' && lastReport && (
          <motion.div key="ripoti" className="sc on" id="s-ripoti">
            <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-home')}>← Nyumbani</button>
              <div className="text-base font-bold text-green-700">📊 Ripoti Yako</div>
              <div className="w-[70px]"></div>
            </nav>
            <div className="diag-wrap">
              <div className="ripoti-card">
                <div className="ripoti-head">
                  <div className="ripoti-score-ring" style={{ border: `6px solid ${lastReport.score > 70 ? '#1a6b3c' : '#c97b1a'}` }}>
                    <div className="ripoti-score-n" style={{ color: lastReport.score > 70 ? '#1a6b3c' : '#c97b1a' }}>{lastReport.score}%</div>
                    <div className="ripoti-score-l">Afya Yako</div>
                  </div>
                  <div className="ripoti-title font-playfair">{lastReport.score > 70 ? 'Afya Nzuri' : 'Inahitaji Huduma'}</div>
                  <div className="ripoti-sub">Ripoti hii ni makadirio ya kitaalamu kutokana na majibu yako.</div>
                </div>
                <div className="mb-4 text-left">
                  <div className="ripoti-sec-title">🌿 Mimea Inayopendekezwa</div>
                  <div className="mimea-chips">
                    {getMimeaRec().map(m => (
                      <div key={m.id} className="mmea-chip" onClick={() => { setSelectedHerb(m); goto('s-mmea'); }}>{m.emoji} {m.name}</div>
                    ))}
                  </div>
                </div>
                <button className="btn btn-gr btn-full" onClick={() => goto('s-ratiba')}>📅 Fungua Ratiba ya Siku 7</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Maktaba */}
        {screen === 's-maktaba' && (
          <motion.div key="maktaba" className="sc on" id="s-maktaba">
            <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-home')}>← Rudi</button>
              <div className="text-base font-bold text-green-700 font-playfair">🌱 Maktaba ya Mimea</div>
              <div className="w-[70px]"></div>
            </nav>
            <div className="page-wrap pb-32">
              <div className="mmea-search">
                <span className="text-lg mr-1 opacity-50">🔍</span>
                <input type="text" placeholder="Tafuta mmea..." value={mmeaQ} onChange={(e) => setMmeaQ(e.target.value)} />
              </div>
              <div className="filter-chips">
                <button className={`fchip ${mmeaFilt === 'all' ? 'on' : ''}`} onClick={() => setMmeaFilt('all')}>Zote</button>
                {['nguvu', 'uzazi', 'damu', 'akili', 'lishe'].map(cat => (
                  <button key={cat} className={`fchip ${mmeaFilt === cat ? 'on' : ''}`} onClick={() => setMmeaFilt(cat)}>
                    {cat === 'nguvu' ? '💪 Nguvu' : cat === 'uzazi' ? '🌸 Uzazi' : cat === 'damu' ? '❤️ Damu' : cat === 'akili' ? '🧠 Akili' : '🍽️ Lishe'}
                  </button>
                ))}
              </div>
              <div className="mimea-grid">
                {filteredMimea.map(m => (
                  <div key={m.id} className="mmea-card" onClick={() => { setSelectedHerb(m); goto('s-mmea'); }}>
                    <div className="mmea-card-img"><span className="text-5xl">{m.emoji}</span><div className="mmea-verified">✓ Imehakikiwa</div></div>
                    <div className="mmea-body">
                      <div className="mmea-name font-playfair">{m.name}</div>
                      <div className="mmea-latin">{m.latin}</div>
                      <div className="mmea-rating">⭐ {m.rating} ({m.reviews})</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Mmea Detail */}
        {screen === 's-mmea' && selectedHerb && (
          <motion.div key="mmea-detail" className="sc on" id="s-mmea">
            <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-maktaba')}>← Maktaba</button>
              <div className="text-base font-bold text-green-700 font-playfair">{selectedHerb.emoji} {selectedHerb.name}</div>
              <button className="icon-btn text-green-700 border-green-700">❤️</button>
            </nav>
            <div id="mmea-detail" className="pb-32 max-w-2xl mx-auto">
              <div className="mmea-hero">
                <span className="text-8xl">{selectedHerb.emoji}</span>
              </div>
              <div className="mmea-detail-body">
                <div className="mmea-detail-name font-playfair">{selectedHerb.name}</div>
                <div className="mmea-detail-latin">{selectedHerb.latin}</div>
                <div className="mmea-tabs">
                  <button className={`mmea-tab ${herbTab === 'mael' ? 'on' : ''}`} onClick={() => setHerbTab('mael')}>📋 Maelezo</button>
                  <button className={`mmea-tab ${herbTab === 'mcha' ? 'on' : ''}`} onClick={() => setHerbTab('mcha')}>👨‍🍳 Mchakato</button>
                  <button className={`mmea-tab ${herbTab === 'faid' ? 'on' : ''}`} onClick={() => setHerbTab('faid')}>✅ Faida</button>
                </div>
                
                {herbTab === 'mael' && (
                  <div className="mmea-sec on">
                    <div className="info-grid">
                      <div className="info-chip"><div className="info-chip-label">⭐ Rating</div><div className="info-chip-val">{selectedHerb.rating}/5</div></div>
                      <div className="info-chip"><div className="info-chip-label">💰 Gharama</div><div className="info-chip-val">{selectedHerb.gharama}</div></div>
                    </div>
                    <p className="text-sm text-sub leading-7 font-medium mb-4">{selectedHerb.matumizi}</p>
                    <div className="onyo-box"><div className="onyo-title">⚠️ Tahadhari</div><div className="onyo-text">{selectedHerb.onyo}</div></div>
                  </div>
                )}

                {herbTab === 'mcha' && (
                  <div className="mmea-sec on">
                    <div className="text-sm font-semibold text-sub mb-4 p-3 bg-green-50 rounded-[12px]">👨‍🍳 Mchakato wa Kitaalamu wa Kutengeneza Nyumbani</div>
                    {selectedHerb.steps.map((s, i) => (
                      <div key={i} className="step-item">
                        <div className="step-num">{i + 1}</div>
                        <div><div className="step-title">{s.t}</div><div className="step-text">{s.tx}</div></div>
                      </div>
                    ))}
                  </div>
                )}

                {herbTab === 'faid' && (
                  <div className="mmea-sec on text-left">
                    {selectedHerb.faida.map((f, i) => (
                      <div key={i} className="faida-item"><span>✅</span><span className="text-sm font-semibold">{f}</span></div>
                    ))}
                    <button className="btn btn-gr btn-full mt-3" onClick={() => goto('s-ratiba')}>📅 Angalia Ratiba Yangu →</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Ratiba */}
        {screen === 's-ratiba' && (
          <motion.div key="ratiba" className="sc on" id="s-ratiba">
            <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-home')}>← Rudi</button>
              <div className="text-base font-bold text-green-700 font-playfair">📅 Ratiba ya Siku 7</div>
              <div className="w-[70px]"></div>
            </nav>
            <div className="page-wrap pb-32">
              {!user?.premium ? (
                <div className="ratiba-locked">
                  <span className="ratiba-lock-icon">🔒</span>
                  <div className="text-xl font-bold text-green-900 mb-2 font-playfair">Ratiba Imefungwa</div>
                  <p className="text-sm text-sub font-medium mb-4 leading-relaxed">Lipa uanachama wa premium kupata ratiba maalum ya siku 30 (Mwezi 1) kulingana na afya yako.</p>
                  <button className="btn btn-am btn-full" onClick={() => goto('s-malipo')}>💳 Lipa Sasa Fungua</button>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-emerald-900 to-green-800 rounded-[20px] p-6 mb-6 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><span className="text-6xl">✨</span></div>
                    <div className="relative z-10">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Programu Maalum kwa Ajili Yako</div>
                      <div className="text-2xl font-bold font-playfair mb-2">{ratiba.title}</div>
                      <p className="text-xs text-green-50/80 font-medium leading-relaxed max-w-[80%]">{ratiba.desc}</p>
                      
                      <div className="mt-5 flex gap-2">
                        <div className="bg-white/20 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-white/10">📅 Siku 30 (Mzunguko wa Siku 7)</div>
                        <div className="bg-amber-400/30 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-400/20 text-amber-100">🌿 Tiba Asili</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-2 mb-4">
                    <h3 className="text-sm font-black text-green-900 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Ratiba ya Wiki Hii
                    </h3>
                    <button 
                      onClick={downloadRatiba}
                      className="text-[10px] font-black text-emerald-700 bg-emerald-100/50 px-3 py-1.5 rounded-full border border-emerald-200 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span>📥</span> PAKUA RATIBA
                    </button>
                  </div>
                  {ratiba.days.map((d, i) => (
                    <div key={i} className="ratiba-day">
                      <div className="ratiba-day-head"><div className="ratiba-day-title">{d.siku} — {d.sub}</div><div className="ratiba-day-sub">Siku {i + 1}</div></div>
                      <div className="ratiba-sessions">
                        {d.sessions.map((s: any, j: number) => (
                          <div key={j} className="ratiba-session">
                            <div className="r-time"><div className="r-time-lbl">{s.lbl}</div><div className="r-time-val">{s.t}</div></div>
                            <div className="r-dot bg-green-200"></div>
                            <div className="r-body text-left">
                              <div className="r-title text-green-900">{s.title}</div>
                              <div className="r-text text-gray-700 font-bold">{s.text}</div>
                              <div className="r-pill bg-green-100 text-green-800 border border-green-200"><span>{s.pill.split(' ')[0]}</span>{s.pill.split(' ').slice(1).join(' ')}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Malipo */}
        {screen === 's-malipo' && (
          <motion.div key="malipo" className="sc on" id="s-malipo">
            <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-home')}>← Rudi</button>
              <div className="text-base font-bold text-green-700 font-playfair">💳 Malipo ya Premium</div>
              <div className="w-[70px]"></div>
            </nav>
            <div className="malipo-wrap pb-32">
              <div className="malipo-card">
                {user?.premium ? (
                  <div className="text-center py-5">
                    <span className="text-6xl block mb-3">🏆</span>
                    <div className="text-2xl font-bold text-green-900 mb-2 font-playfair">Uanachama Premium!</div>
                    <div className="text-sm text-sub font-medium mb-5">Ufikiaji wako upo tayari kwa huduma zote.</div>
                    <div className="flex gap-2">
                       <button className="btn btn-gr flex-1" onClick={() => goto('s-ratiba')}>📅 Ratiba →</button>
                       <button className="btn btn-out flex-1" onClick={() => goto('s-maktaba')}>🌱 Maktaba →</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-widest">Pata Ufikiaji Wote Leo</div>
                      <div className="text-4xl font-bold text-green-900 font-playfair">TSh {selPkg.toLocaleString()}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className={`pkg-opt ${selPkg === 3000 ? 'on' : ''}`} onClick={() => setSelPkg(3000)}>
                        <div className="font-bold text-[13px]">Mwezi 1</div>
                        <div className="text-xs font-bold mt-1 text-green-700">3,000</div>
                      </div>
                      <div className={`pkg-opt ${selPkg === 15000 ? 'on' : ''}`} onClick={() => setSelPkg(15000)}>
                        <div className="font-bold text-[13px]">Miezi 6</div>
                        <div className="text-xs font-bold mt-1 text-green-700">15,000</div>
                      </div>
                      <div className={`pkg-opt ${selPkg === 25000 ? 'on' : ''}`} onClick={() => setSelPkg(25000)}>
                        <div className="font-bold text-[13px]">Mwaka 1</div>
                        <div className="text-xs font-bold mt-1 text-green-700">25,000</div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-[12px] p-4 mb-5 text-left">
                      <div className="text-sm font-extrabold text-green-900 mb-1">📱 M-Pesa (Vodacom)</div>
                      <div className="text-base font-bold">Lipa Namba: <strong className="text-green-700">67363327</strong></div>
                      <div className="text-xs text-sub font-medium mt-1">Jina: JOS NATURAL HERBS</div>
                    </div>
                    <button className="btn btn-am btn-full mb-3" onClick={() => window.open('https://wa.me/255652421286')}>📱 Thibitisha Malipo - WhatsApp →</button>
                    <div className="text-center text-xs text-muted-foreground mb-2">Una msimbo (code)? <span className="text-green-700 font-bold cursor-pointer" onClick={() => setShowCodeInput(true)}>Bonyeza hapa</span></div>
                    {showCodeInput && (
                      <div className="flex gap-2">
                         <input className="inp flex-1 !py-2 text-center text-lg font-bold" placeholder="HERB-XXXX" />
                         <button className="btn btn-gr px-4" onClick={() => { localStorage.setItem('afya_ses', JSON.stringify({...user, premium: true})); window.location.reload(); }}>Fungua</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* akaunti */}
        {screen === 's-akaunti' && (
          <motion.div key="akaunti" className="sc on" id="s-akaunti">
            <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-home')}>← Rudi</button>
              <div className="text-base font-bold text-green-700 font-playfair">👤 Akaunti Yangu</div>
              <div className="w-[70px]"></div>
            </nav>
            <div className="ak-hero">
              <div className="ak-av-wrap">
                <div className="ak-av">👤</div>
              </div>
              <div className="ak-name font-playfair">{user?.name}</div>
              <div className="ak-badge">{user?.premium ? '⭐ Mwanachama Premium' : '🌱 Mwanachama Bure'}</div>
            </div>
            <div className="ak-stats">
              <div className="astat"><div className="astat-n">{user?.uchunguzi || 0}</div><div className="astat-l">Uchunguzi</div></div>
              <div className="astat"><div className="astat-n">1</div><div className="astat-l">Siku</div></div>
              <div className="astat"><div className="astat-n">50+</div><div className="astat-l">Mimea</div></div>
            </div>
            <div className="ak-body mt-10 pb-32">
               <div className="mitem" onClick={() => { setDiagStep(0); setDiagAns({}); goto('s-uchunguzi'); }}><div className="mi-ic">🔬</div><div className="mi-body text-left"><div className="mi-title">Uchunguzi Mpya</div><div className="mi-sub">Bure kwa kila mtu</div></div><div className="mi-arr">›</div></div>
               <div className="mitem" onClick={() => goto('s-ratiba')}><div className="mi-ic">📅</div><div className="mi-body text-left"><div className="mi-title">Ratiba ya Siku 7</div><div className="mi-sub">{user?.premium ? 'Tayari kwa matumizi' : 'Fungua Premium sasa'}</div></div><div className="mi-arr">›</div></div>
               <div className="mitem" onClick={() => window.open('https://wa.me/255652421286')}><div className="mi-ic !bg-blue-50">💬</div><div className="mi-body text-left"><div className="mi-title">Msaada wa WhatsApp</div><div className="mi-sub">Wasiliana na Dr. Revo</div></div><div className="mi-arr">›</div></div>
               <div className="mitem mt-5 border-red-100" onClick={doLogout}><div className="mi-ic !bg-red-50 text-red-600">🚪</div><div className="mi-body text-left"><div className="mi-title text-red-600">Toka</div><div className="mi-sub">Ondoka kwa usalama</div></div><div className="mi-arr">›</div></div>
            </div>
          </motion.div>
        )}

        {/* Scanner */}
        {screen === 's-scan' && (
          <motion.div key="scan" className="sc on" id="s-scan">
             <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-home')}>← Rudi</button>
              <div className="text-base font-bold text-green-700 font-playfair">📷 Plant Scanner</div>
              <div className="w-[70px]"></div>
            </nav>
            <div className="page-wrap pt-5 pb-32">
               <PlantScanner />
            </div>
          </motion.div>
        )}

        {/* Chat */}
        {screen === 's-chat' && (
          <motion.div key="chat" className="sc on" id="s-chat">
             <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-home')}>← Rudi</button>
              <div className="text-base font-bold text-green-700 font-playfair">💬 Jamii ya Afya</div>
              <div className="w-[70px]"></div>
            </nav>
            <div className="page-wrap pb-32">
               <div className="bg-green-50 border border-green-200 rounded-[12px] p-4 mb-5 text-sm text-sub font-medium text-left italic">🌿 Karibu kwenye jamii yetu. Shiriki uzoefu wako na maelfu ya wengine.</div>
               {['Jumla ya Afya', 'Nguvu za Mwili', 'Lishe Bora', 'Uzoefu wa Wateja'].map(r => (
                 <div key={r} className="mitem" onClick={() => { setChatRoom(r); goto('s-chat-room'); }}>
                    <div className="mi-ic bg-green-100">{r[0]}</div>
                    <div className="mi-body text-left"><div className="mi-title">{r}</div><div className="mi-sub">Gusa kuingia kwenye chumba</div></div>
                    <div className="mi-arr">›</div>
                 </div>
               ))}
            </div>
          </motion.div>
        )}

        {/* Chat Room */}
        {screen === 's-chat-room' && (
          <motion.div key="chat-room" className="sc on" id="s-chat-room">
             <nav className="topbar">
              <button className="tb-back" onClick={() => goto('s-chat')}>← Rudi</button>
              <div className="text-base font-bold text-green-700 font-playfair">{chatRoom}</div>
              <div className="w-[70px]"></div>
            </nav>
            <div className="page-wrap h-full flex flex-col pt-10">
               <div className="text-center text-muted-foreground p-10 opacity-50 flex-1">Hakuna ujumbe hapa bado...</div>
               <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-green-100 flex gap-2 items-center z-10">
                  <input className="inp flex-1 !rounded-full" placeholder="Andika ujumbe..." />
                  <button className="btn btn-gr !rounded-full !w-12 !h-12 !p-0">➤</button>
               </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* AI Bot */}
      <AIChat isVisible={isAiOpen} onClose={() => setIsAiOpen(false)} />
      
      {!isAiOpen && (
        <div className="fixed bottom-24 right-4 z-[50]">
          <button className="ai-fab !w-14 !h-14 bg-emerald-700 shadow-xl" onClick={() => setIsAiOpen(true)}>
            <span className="text-2xl">🌿</span>
          </button>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className={`bnav ${showBNav ? 'show' : ''}`}>
        <button className={`nb ${screen === 's-home' ? 'on' : ''}`} onClick={() => goto('s-home')}><span className="nbic">🏠</span><span className="nblb">Home</span></button>
        <button className={`nb ${['s-uchunguzi', 's-ripoti'].includes(screen) ? 'on' : ''}`} onClick={() => { setDiagStep(0); setDiagAns({}); goto('s-uchunguzi'); }}><span className="nbic">🔬</span><span className="nblb">Uchunguzi</span></button>
        <button className={`nb ${screen === 's-scan' ? 'on' : ''}`} onClick={() => goto('s-scan')}><span className="nbic">📷</span><span className="nblb">Scanner</span></button>
        <button className={`nb ${['s-maktaba', 's-mmea'].includes(screen) ? 'on' : ''}`} onClick={() => goto('s-maktaba')}><span className="nbic">🌱</span><span className="nblb">Mimea</span></button>
        <button className={`nb ${screen === 's-akaunti' ? 'on' : ''}`} onClick={() => goto('s-akaunti')}><span className="nbic">👤</span><span className="nblb">Mimi</span></button>
      </nav>
    </div>
  );
}
