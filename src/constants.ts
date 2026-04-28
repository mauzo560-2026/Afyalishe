export interface Herb {
  id: number;
  emoji: string;
  name: string;
  latin: string;
  cats: string[];
  ratibaKey: 'nguvu' | 'usingizi' | 'shinikizo' | 'uchovu' | 'jumla';
  rating: number;
  reviews: number;
  matumizi: string;
  faida: string[];
  steps: { t: string; tx: string }[];
  onyo: string;
  gharama: string;
  nguvu: number;
  usalama: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  pw?: string;
  premium: boolean;
  premiumExpiry?: string;
  isTrial?: boolean;
  joinDate: string;
  uchunguzi: number;
  lastDiagCondition?: string;
  avatar?: string;
}

export const RATIBA_ALL: Record<string, { title: string; desc: string; days: any[] }> = {
  nguvu: {
    title: '💪 Ratiba ya Nguvu za Kiume',
    desc: 'Programu ya siku 7 kwa nguvu za mwili na kiume — mimea iliyochaguliwa na Dr. Revo',
    days: [
      { siku: 'Siku 1', sub: 'Kuanza kwa Msingi', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Mbegu za Maboga + Asali', text: 'Gramu 30 mbegu za maboga (raw) na kijiko 1 cha asali.', pill: '🎃 Zinki' }, { t: '13:00', lbl: 'Mchana', title: 'Fenugreek Iliyolowekwa', text: 'Mbegu za fenugreek zilizolowekwa usiku.', pill: '🌾 Hulba' }, { t: '19:00', lbl: 'Jioni', title: 'Ashwagandha + Maziwa', text: 'Nusu kijiko poda ya ashwagandha kwenye maziwa ya joto.', pill: '🌿 Stamina' }] },
      { siku: 'Siku 2', sub: 'Nguvu za Damu', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Vitunguu Saumu + Asali', text: 'Vitunguu 3 vidogo mbichi + kijiko 1 asali.', pill: '🧄 Damu' }, { t: '13:00', lbl: 'Mchana', title: 'Moringa Smoothie', text: 'Kijiko 2 poda ya moringa + ndizi + maziwa.', pill: '🌿 Nguvu' }, { t: '19:00', lbl: 'Jioni', title: 'Mbegu za Maboga + Simsim', text: 'Gramu 30 za mchanganyiko wa mbegu.', pill: '🎃 Zinki +' }] },
      { siku: 'Siku 3', sub: 'Stamina', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Tangawizi + Pilipili Manga', text: 'Chai ya tangawizi na tone 1 ya pilipili manga.', pill: '🫚 Mzunguko' }, { t: '13:00', lbl: 'Mchana', title: 'Maca Poda', text: 'Kijiko 1 poda ya maca + matunda + maziwa.', pill: '🟤 Libido' }, { t: '19:00', lbl: 'Jioni', title: 'Ashwagandha + Fenugreek', text: 'Nusu kijiko kila kimoja kwenye maziwa.', pill: '🌿 Nguvu +' }] },
      { siku: 'Siku 4', sub: 'Homoni', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Saw Palmetto', text: 'Mg 160 saw palmetto extract asubuhi.', pill: '🌿 Hormones' }, { t: '13:00', lbl: 'Mchana', title: 'Avocado + Chia', text: 'Avocado nusu + kijiko 2 chia seeds.', pill: '🥑 Fats' }, { t: '19:00', lbl: 'Jioni', title: 'Vitunguu Saumu', text: 'Vitunguu 2 mbichi na asali kabla ya kulala.', pill: '🧄 Anti-inf' }] },
      { siku: 'Siku 5', sub: 'Uvumilivu', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Pumpkin + Moringa', text: 'Mchanganyiko wa poda zote mbili.', pill: '🎃🌿 Energy' }, { t: '13:00', lbl: 'Mchana', title: 'Tongkat Ali', text: 'Mg 200 ya tongkat ali extract.', pill: '🌿 Booster' }, { t: '19:00', lbl: 'Jioni', title: 'Fish Oil + Asali', text: 'Capsule 2 za omega-3 na kijiko cha asali.', pill: '🫚 Omega-3' }] },
      { siku: 'Siku 6', sub: 'Detox', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Maji ya Limao', text: 'Maji ya joto + nusu limao + asali.', pill: '🍋 Detox' }, { t: '13:00', lbl: 'Mchana', title: 'Fenugreek + Pumpkin', text: 'Mchanganyiko huu unaimarisha nguvu.', pill: '🌾 Power' }, { t: '19:00', lbl: 'Jioni', title: 'Ashwagandha + Lavender', text: 'Ashwagandha + chai ya lavender kwa utulivu.', pill: '🌿💜 Sleep' }] },
      { siku: 'Siku 7', sub: 'Tathmini', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Power Smoothie', text: 'Moringa + pumpkin + maca + ndizi.', pill: '🌿 Multi' }, { t: '13:00', lbl: 'Mchana', title: 'Mlo Kamili', text: 'Mayai, maharagwe, mboga za kijani.', pill: '🍽️ Protein' }, { t: '19:00', lbl: 'Jioni', title: 'Tathmini', text: 'Angalia mabadiliko ya wiki ya kwanza.', pill: '📊 Review' }] }
    ]
  },
  usingizi: {
    title: '😴 Ratiba ya Usingizi Bora',
    desc: 'Programu ya siku 7 kwa usingizi mzuri na mapumziko ya kweli',
    days: [
      { siku: 'Siku 1', sub: 'Kuanza', sessions: [{ t: '07:00', lbl: 'Asubuhi', title: 'Chamomile Tea', text: 'Kijiko 1 chamomile asubuhi.', pill: '🌼 Calming' }, { t: '15:00', lbl: 'Mchana', title: 'No Caffeine', text: 'Baada ya saa 3 mchana, epuka caffeine yote.', pill: '⚠️ Alert' }, { t: '21:00', lbl: 'Jioni', title: 'Valerian Root', text: 'Mg 300 valerian root + kijiko asali.', pill: '🪴 Sleep' }] },
      { siku: 'Siku 2', sub: 'Utulivu', sessions: [{ t: '07:00', lbl: 'Asubuhi', title: 'Lemon Balm', text: 'Kijiko 1 lemon balm asubuhi.', pill: '🍋 Calm' }, { t: '15:00', lbl: 'Mchana', title: 'Magnesium Wealthy Foods', text: 'Kula mbegu za malenge au mchicha.', pill: '🥬 Mg' }, { t: '21:00', lbl: 'Jioni', title: 'Lavender Tea', text: 'Kikombe 1 cha chai ya lavender.', pill: '💜 Relax' }] },
      { siku: 'Siku 3', sub: 'Msongo', sessions: [{ t: '07:00', lbl: 'Asubuhi', title: 'Ashwagandha', text: 'Nusu kijiko poda kwenye maji.', pill: '🌿 Stress' }, { t: '15:00', lbl: 'Mchana', title: 'Deep Breathing', text: 'Dakika 5 za pumzi ndefu.', pill: '🧘 Breath' }, { t: '21:00', lbl: 'Jioni', title: 'Passionflower', text: 'Extract au chai ya passionflower.', pill: '🌸 Deep' }] },
      { siku: 'Siku 4', sub: 'Mzunguko', sessions: [{ t: '07:00', lbl: 'Asubuhi', title: 'Maji ya Moto + Limao', text: 'Anza siku kwa kusafisha mwili.', pill: '🍋 Clean' }, { t: '15:00', lbl: 'Mchana', title: 'Banana + Almonds', text: 'Snack ya ndizi na mlozi.', pill: '🍌 Nut' }, { t: '21:00', lbl: 'Jioni', title: 'Chamomile + Honey', text: 'Kikombe kikubwa kabla ya kitanda.', pill: '🌼 Sweet' }] },
      { siku: 'Siku 5', sub: 'Digital Detox', sessions: [{ t: '07:00', lbl: 'Asubuhi', title: 'Morning Light', text: 'Kaa juani dakika 10.', pill: '☀️ Sun' }, { t: '15:00', lbl: 'Mchana', title: 'Epuka Sukari', text: 'Sukari inaharibu usingizi.', pill: '🚫 Sugar' }, { t: '20:00', lbl: 'Jioni', title: 'No Screens', text: 'Zima simu saa 1 kabla ya kulala.', pill: '📱 Off' }] },
      { siku: 'Siku 6', sub: 'Mapumziko', sessions: [{ t: '07:00', lbl: 'Asubuhi', title: 'Green Tea (Early)', text: 'Kikombe kimoja kabla ya saa 4.', pill: '🍵 Anti' }, { t: '15:00', lbl: 'Mchana', title: 'Short Nap', text: 'Dakika 20 tu za kulala mchana.', pill: '😴 Nap' }, { t: '21:00', lbl: 'Jioni', title: 'Warm Milk + Nutmeg', text: 'Maziwa + nusu kijiko kungumanga.', pill: '🥛 Nutmeg' }] },
      { siku: 'Siku 7', sub: 'Tathmini', sessions: [{ t: '07:00', lbl: 'Asubuhi', title: 'Fresh Juice', text: 'Juisi ya mboga za kijani.', pill: '🥦 Vit' }, { t: '13:00', lbl: 'Mchana', title: 'Light Meal', text: 'Mlo mwepesi mchana.', pill: '🥗 Meal' }, { t: '21:00', lbl: 'Jioni', title: 'Reflect', text: 'Andika maendeleo ya usingizi wako.', pill: '✍️ Log' }] }
    ]
  },
  shinikizo: {
    title: '❤️ Ratiba ya Shinikizo la Damu',
    desc: 'Programu ya siku 7 kupunguza shinikizo la damu kwa njia ya asili',
    days: [
      { siku: 'Siku 1', sub: 'Msingi', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Vitunguu Saumu', text: 'Vitunguu 3 mbichi + kijiko 1 asali.', pill: '🧄 Blood' }, { t: '13:00', lbl: 'Mchana', title: 'Hibiscus Tea', text: 'Chai ya hibiscus vikombe 2.', pill: '🌺 Pressure' }, { t: '19:00', lbl: 'Jioni', title: 'Maji ya Limao', text: 'Inasaidia figo kusafisha damu.', pill: '🍋 Kidneys' }] },
      { siku: 'Siku 2', sub: 'Mzunguko', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Celery Juice', text: 'Juisi ya figili (celery) nusu kikombe.', pill: '🌿 Flow' }, { t: '13:00', lbl: 'Mchana', title: 'Dark Chocolate', text: 'Kipande kidogo cha chocolate (70%+).', pill: '🍫 Heart' }, { t: '19:00', lbl: 'Jioni', title: 'Flaxseeds', text: 'Kijiko 1 mbegu za kitani (ground).', pill: '🌾 Omega' }] },
      { siku: 'Siku 3', sub: 'Chumvi Chini', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Pomegranate Juice', text: 'Kikombe 1 juisi ya komamanga.', pill: '🍎 Clean' }, { t: '13:00', lbl: 'Mchana', title: 'Banana (Potassium)', text: 'Kula ndizi 1-2 mchana.', pill: '🍌 K+' }, { t: '19:00', lbl: 'Jioni', title: 'Garlic + Ginger', text: 'Mchanganyiko wa vitunguu na tangawizi.', pill: '🧄🫚 Combo' }] },
      { siku: 'Siku 4', sub: 'Magnesium', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Spinach Smoothie', text: 'Mchicha + ndizi + maji.', pill: '🥬 Mg+' }, { t: '13:00', lbl: 'Mchana', title: 'Almonds', text: 'Mlozi 10-15 (raw).', pill: '🥜 Nuts' }, { t: '19:00', lbl: 'Jioni', title: 'Hibiscus + Honey', text: 'Chai ya hibiscus kabla ya kulala.', pill: '🌺 Sweet' }] },
      { siku: 'Siku 5', sub: 'Nishati', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Oatmeal + Berries', text: 'Oats na matunda mapori.', pill: '🥣 Fiber' }, { t: '13:00', lbl: 'Mchana', title: 'Beetroot Juice', text: 'Juisi ya kabeji nyekundu/beetroot.', pill: '🩸 Flow' }, { t: '19:00', lbl: 'Jioni', title: 'Citrus Water', text: 'Maji na limao/machungwa.', pill: '🍊 Vit C' }] },
      { siku: 'Siku 6', sub: 'Calm Heart', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Hawthorn Berry Tea', text: 'Chai ya hawthorn kwa moyo.', pill: '🍒 Heart' }, { t: '13:00', lbl: 'Mchana', title: 'Walnuts', text: 'Walnuts 5-7 mchana.', pill: '🥜 Brain' }, { t: '19:00', lbl: 'Jioni', title: 'Garlic (Raw)', text: 'Vitunguu 2 na maji ya joto.', pill: '🧄 Blood' }] },
      { siku: 'Siku 7', sub: 'Tathmini', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Veggie Omelet', text: 'Mayai na mboga nyingi.', pill: '🍳 Prot' }, { t: '13:00', lbl: 'Mchana', title: 'Fish (Omega 3)', text: 'Mlo wa samaki/dagaa.', pill: '🐟 Health' }, { t: '19:00', lbl: 'Jioni', title: 'Peace', text: 'Tathmini ya wiki - Punguza stress.', pill: '⌛ Done' }] }
    ]
  },
  uchovu: {
    title: '⚡ Ratiba ya Kupigana na Uchovu',
    desc: 'Programu ya siku 7 kuongeza nishati na kupigana na uchovu wa kudumu',
    days: [
      { siku: 'Siku 1', sub: 'Vitamini', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Moringa Smoothie', text: 'Kijiko 2 poda ya moringa + matunda.', pill: '🌿 Vitamins' }, { t: '13:00', lbl: 'Mchana', title: 'Spirulina', text: 'Kijiko 1 spirulina kwenye maji.', pill: '⭐ Protein' }, { t: '19:00', lbl: 'Jioni', title: 'Ashwagandha', text: 'Nusu kijiko kwenye maziwa.', pill: '🌿 Energy' }] },
      { siku: 'Siku 2', sub: 'Iron Boost', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Nettle Tea', text: 'Chai ya mbigili kwa madini.', pill: '🌿 Iron' }, { t: '13:00', lbl: 'Mchana', title: 'Dates + Nuts', text: 'Tende 3 na mlozi wachache.', pill: '🌴 Energy' }, { t: '19:00', lbl: 'Jioni', title: 'Rosemary Tea', text: 'Inaboresha umakini na nishati.', pill: '🌿 Sharp' }] },
      { siku: 'Siku 3', sub: 'Adrenals', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Ginseng', text: 'Nusu kijiko poda au capsule.', pill: '🌿 Focus' }, { t: '13:00', lbl: 'Mchana', title: 'Coconout Water', text: 'Madafu nusu lita.', pill: '🥥 Hydro' }, { t: '19:00', lbl: 'Jioni', title: 'Moringa Tea', text: 'Chai ya majani ya moringa.', pill: '🌿 Vit+' }] },
      { siku: 'Siku 4', sub: 'Blood Sugar', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Chia seeds', text: 'Kijiko 2 chia seed kwenye maji.', pill: '🌾 Fiber' }, { t: '13:00', lbl: 'Mchana', title: 'Apple + Peanut Butter', text: 'Tofaa na siagi ya karanga.', pill: '🍎 Snack' }, { t: '19:00', lbl: 'Jioni', title: 'Cinnamon Water', text: 'Maji ya mdalasini kwa nishati.', pill: '🍂 Sugar' }] },
      { siku: 'Siku 5', sub: 'Brain Fog', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Gotu Kola', text: 'Nusu kijiko poda ya gotu kola.', pill: '🧠 Clarity' }, { t: '13:00', lbl: 'Mchana', title: 'Matcha Tea', text: 'Kikombe kidogo cha matcha.', pill: '🍵 Zen' }, { t: '19:00', lbl: 'Jioni', title: 'Holy Basil', text: 'Chai ya tulsi (basil) asali.', pill: '🌿 Stress' }] },
      { siku: 'Siku 6', sub: 'Mitochondria', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Pumpkin + Moringa', text: 'Mchanganyiko wa nguvu.', pill: '🎃 Power' }, { t: '13:00', lbl: 'Mchana', title: 'Magnesium Bath', text: 'Oga maji ya chumvi (epsom).', pill: '🛁 Relax' }, { t: '19:00', lbl: 'Jioni', title: 'Lemon + Ginger', text: 'Kichocheo cha mmengenyo kabla kulala.', pill: '🍋 Clean' }] },
      { siku: 'Siku 7', sub: 'Restoration', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Smoothie Bowl', text: 'Matawi mengi na matunda.', pill: '🥣 Super' }, { t: '13:00', lbl: 'Mchana', title: 'Salmon / Beans', text: 'Protini nyingi mchana huu.', pill: '🐟 Vital' }, { t: '19:00', lbl: 'Jioni', title: 'Planning', text: 'Panga wiki yako ijae nishati.', pill: '📅 Plan' }] }
    ]
  },
  jumla: {
    title: '🌿 Ratiba ya Jumla ya Afya',
    desc: 'Programu ya siku 7 kwa afya bora ya jumla — inafaa kwa mtu yeyote',
    days: [
      { siku: 'Siku 1', sub: 'Utulivu', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Tangawizi + Asali', text: 'Chemsha tangawizi na asali. Kunywa kabla ya kula.', pill: '🫚 Tangawizi' }, { t: '13:00', lbl: 'Mchana', title: 'Pumpkin Seeds', text: 'Gramu 30 za mbegu zisizokaangwa.', pill: '🎃 Zinc' }, { t: '19:00', lbl: 'Jioni', title: 'Moringa + Dalasini', text: 'Kijiko 1 moringa na nusu kijiko mdalasini.', pill: '🌿 Moringa' }] },
      { siku: 'Siku 2', sub: 'Detox', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Vitunguu Saumu', text: 'Kata vitunguu 2-3 changanya na asali.', pill: '🧄 Garlic' }, { t: '13:00', lbl: 'Mchana', title: 'Fenugreek', text: 'Mbegu za fenugreek zilizolowekwa usiku.', pill: '🌾 Hulba' }, { t: '19:00', lbl: 'Jioni', title: 'Tangawizi + Limao', text: 'Inaboresha mzunguko wa damu.', pill: '🫚🍋 Tea' }] },
      { siku: 'Siku 3', sub: 'Kinga', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Black Seed Oil', text: 'Nusu kijiko cha mafuta meusi.', pill: '⚫ Black' }, { t: '13:00', lbl: 'Mchana', title: 'Orange Juice', text: 'Fresh kabisa, bila sukari.', pill: '🍊 Vit C' }, { t: '19:00', lbl: 'Jioni', title: 'Aloe Vera Juice', text: 'Nusu kikombe kusafisha utumbo.', pill: '🌵 Gut' }] },
      { siku: 'Siku 4', sub: 'Nguvu', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Moringa smoothie', text: 'Ongeza ndizi na chia seeds.', pill: '🌿 Seed' }, { t: '13:00', lbl: 'Mchana', title: 'Yoghurt + Honey', text: 'Probiotics kwa tumbo.', pill: '🍶 Pro' }, { t: '19:00', lbl: 'Jioni', title: 'Dalasini Tea', text: 'Chai ya mdalasini bila maziwa.', pill: '🍂 Sugar' }] },
      { siku: 'Siku 5', sub: 'Moyo', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Garlic + Honey', text: 'Msingi wa kusafisha mishipa.', pill: '🧄 Heart' }, { t: '13:00', lbl: 'Mchana', title: 'Ovacado', text: 'Limenunuliwa fresh, nusu tunda.', pill: '🥑 Fat' }, { t: '19:00', lbl: 'Jioni', title: 'Hibiscus Cold', text: 'Hibiscus ya baridi bila sukari.', pill: '🌺 Cool' }] },
      { siku: 'Siku 6', sub: 'Akili', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Green Coffee', text: 'Chai ya kahawa ya kijani.', pill: '☕ Focus' }, { t: '13:00', lbl: 'Mchana', title: 'Walnuts 3', text: 'Kwa ajili ya ubongo.', pill: '🧠 Brain' }, { t: '19:00', lbl: 'Jioni', title: 'Honey water', text: 'Maji moto na asali kabla kulala.', pill: '🍯 Deep' }] },
      { siku: 'Siku 7', sub: 'Dhamira', sessions: [{ t: '06:30', lbl: 'Asubuhi', title: 'Power Mix', text: 'Mchanganyiko wa mbegu zote.', pill: '🌾 Mix' }, { t: '13:00', lbl: 'Mchana', title: 'Fresh Greens', text: 'Mboga za majani nyingi mchana.', pill: '🥗 Life' }, { t: '19:00', lbl: 'Jioni', title: 'Sikiliza Mwili', text: 'Angalia unavyojisikia baada ya wiki.', pill: '🧘 Feel' }] }
    ]
  }
};

export const MIMEA: Herb[] = [
  {
    id: 0, emoji: '🎃', name: 'Mbegu za Maboga', latin: 'Cucurbita pepo', cats: ['nguvu', 'uzazi'], ratibaKey: 'nguvu', rating: 4.9, reviews: 234,
    matumizi: 'Inaboresha nguvu za kiume, ina zinki nyingi kwa testosterone.',
    faida: ['Inaboresha nguvu za kiume', 'Ina zinki kwa uzazi', 'Inatibu kibofu cha mkojo', 'Inaimarisha kinga', 'Ina antioxidants'],
    steps: [{ t: 'Nunua Mbegu Safi', tx: 'Nunua mbegu zisizokaangwa. Thibitisha hazina chumvi.' }, { t: 'Osha na Kausha', tx: 'Osha na kaush juani kwa saa 2-3.' }, { t: 'Saga kuwa Poda', tx: 'Saga hadi ziwe poda laini.' }, { t: 'Namna ya Kutumia', tx: 'Vijiko 2 vya poda asubuhi na jioni kwa maji.' }, { t: 'Muda', tx: 'Endelea wiki 4-6 bila kusimama.' }],
    onyo: 'Wajawazito wapunguze kiasi.', gharama: 'TSh 2,000-5,000/wiki', nguvu: 95, usalama: 98
  },
  {
    id: 1, emoji: '🫚', name: 'Tangawizi', latin: 'Zingiber officinale', cats: ['damu', 'akili', 'lishe'], ratibaKey: 'usingizi', rating: 4.8, reviews: 412,
    matumizi: 'Inaboresha mzunguko wa damu, inapunguza uvimbe, inasaidia mmengenyo.',
    faida: ['Inaboresha mzunguko wa damu', 'Inapunguza uvimbe', 'Inasaidia mmengenyo', 'Inaimarisha kinga', 'Ina gingerol'],
    steps: [{ t: 'Chagua Nzuri', tx: 'Chagua ngumu, harufu kali.' }, { t: 'Osha na Kata', tx: 'Osha vizuri. Kata vipande vidogo.' }, { t: 'Tengeneza Chai', tx: 'Vipande 3-4 kwenye maji 2 vikombe. Chemsha dakika 10.' }, { t: 'Ongeza Asali', tx: 'Kijiko kimoja cha asali ya nyuki.' }, { t: 'Kunywa', tx: 'Vikombe 2-3 kwa siku.' }],
    onyo: 'Epuka kipimo kikubwa na dawa za damu.', gharama: 'TSh 1,000-2,000/wiki', nguvu: 92, usalama: 96
  },
  {
    id: 2, emoji: '🌿', name: 'Moringa', latin: 'Moringa oleifera', cats: ['lishe', 'nguvu', 'uzazi'], ratibaKey: 'nguvu', rating: 4.9, reviews: 356,
    matumizi: 'Mmea wenye virutubisho vingi — vitamini A, C, calcium, protein.',
    faida: ['Virutubisho vingi', 'Inaboresha uzalishaji wa maziwa', 'Inapunguza sukari ya damu', 'Anti-inflammatory', 'Inaboresha nishati'],
    steps: [{ t: 'Pata Majani au Poda', tx: 'Poda ni rahisi zaidi kutumia.' }, { t: 'Tumia Poda', tx: 'Kijiko 1-2 kwenye maji au juisi.' }, { t: 'Tumia Majani', tx: 'Chemsha kama spinach au ongeza kwenye supu.' }, { t: 'Wakati Bora', tx: 'Asubuhi kwenye smoothie.' }, { t: 'Hifadhi', tx: 'Mahali pakavu na gizani.' }],
    onyo: 'Usichanganye na dawa za shinikizo la damu.', gharama: 'TSh 3,000-8,000/mwezi', nguvu: 98, usalama: 94
  },
  {
    id: 3, emoji: '🧄', name: 'Vitunguu Saumu', latin: 'Allium sativum', cats: ['damu', 'nguvu'], ratibaKey: 'nguvu', rating: 4.7, reviews: 287,
    matumizi: 'Inaimarisha moyo, ina allicin ya kupambana na vijidudu.',
    faida: ['Inapunguza shinikizo la damu', 'Inaboresha mzunguko', 'Allicin — antibiotic ya asili', 'Inapunguza cholesterol', 'Inaimarisha kinga'],
    steps: [{ t: 'Tumia Vibichi', tx: 'Kata au bonyeza, acha dakika 10.' }, { t: 'Na Asali', tx: 'Vitunguu 2-3 + kijiko cha asali asubuhi.' }, { t: 'Maji ya Vitunguu', tx: 'Piga 4-5 kwenye maji, chuja, ongeza limao.' }, { t: 'Ndani ya Chakula', tx: 'Ongeza kwenye kila mlo.' }, { t: 'Kipimo', tx: 'Vitunguu 2-4 kwa siku.' }],
    onyo: 'Harufu kali — kula parsley baadaye.', gharama: 'TSh 500-1,500/wiki', nguvu: 90, usalama: 92
  },
  {
    id: 4, emoji: '🌾', name: 'Fenugreek (Hulba)', latin: 'Trigonella foenum-graecum', cats: ['nguvu', 'uzazi', 'lishe'], ratibaKey: 'nguvu', rating: 4.8, reviews: 198,
    matumizi: 'Inaboresha testosterone, inasaidia uzalishaji wa maziwa, inadhibiti sukari.',
    faida: ['Inaboresha testosterone', 'Inasaidia maziwa ya mama', 'Inadhibiti sukari', 'Fiber nzuri', 'Inaboresha stamina'],
    steps: [{ t: 'Loweka Mbegu', tx: 'Kijiko 1-2 kwenye maji usiku. Acha hadi asubuhi.' }, { t: 'Kula Asubuhi', tx: 'Kula mbegu na maji yake kabla ya kula.' }, { t: 'Tengeneza Chai', tx: 'Chemsha dakika 5-10. Ongeza asali na tangawizi.' }, { t: 'Poda', tx: 'Kijiko 1 mara mbili kwa siku.' }, { t: 'Muda', tx: 'Matokeo baada ya wiki 2-4.' }],
    onyo: 'Wajawazito WAEPUKE. Inadhibiti sukari sana.', gharama: 'TSh 2,000-4,000/mwezi', nguvu: 88, usalama: 85
  },
  {
    id: 5, emoji: '🍂', name: 'Mdalasini', latin: 'Cinnamomum verum', cats: ['damu', 'akili', 'lishe'], ratibaKey: 'usingizi', rating: 4.6, reviews: 176,
    matumizi: 'Inadhibiti sukari ya damu, inaboresha mzunguko wa damu.',
    faida: ['Inadhibiti sukari', 'Anti-inflammatory', 'Inaboresha insulini', 'Antioxidants nyingi', 'Inaboresha afya ya moyo'],
    steps: [{ t: 'Chagua Ceylon', tx: 'Tumia Ceylon (si Cassia) — laini zaidi.' }, { t: 'Chai ya Mdalasini', tx: 'Fimbo 1-2 kwenye maji vikombe 2, dakika 10.' }, { t: 'Ongeza kwa Chakula', tx: 'Sprinkle kwenye oatmeal au yoghurt.' }, { t: 'Mchanganyiko', tx: 'Mdalasini + tangawizi + asali kwenye maji ya moto.' }, { t: 'Kipimo', tx: 'Nusu hadi kijiko kimoja kwa siku.' }],
    onyo: 'Cassia cinnamon inaweza kudhuru ini. Tumia Ceylon.', gharama: 'TSh 1,500-3,000/mwezi', nguvu: 87, usalama: 90
  },
  {
    id: 6, emoji: '🌵', name: 'Aloe Vera', latin: 'Aloe barbadensis miller', cats: ['ngozi', 'tumbo', 'kinga'], ratibaKey: 'jumla', rating: 4.9, reviews: 520,
    matumizi: 'Kusafisha utumbo, kutibu matatizo ya ngozi na kusaidia mmengenyo.',
    faida: ['Safi utumbo', 'Lainisha ngozi', 'Kinga ya mwili', 'Punguza kiungulia', 'Tibu vidonda'],
    steps: [{ t: 'Pata tawi', tx: 'Kata tawi fresh.' }, { t: 'Toa utomvu', tx: 'Acha utomvu wa manjano utoke nje.' }, { t: 'Chukua gel', tx: 'Pasua katikati chukua gel safi.' }, { t: 'Kunywa', tx: 'Vijiko 2 kwenye maji au juisi.' }],
    onyo: 'Usitumie kwa muda mrefu sana bila mapumziko.', gharama: 'Free au TSh 1,000', nguvu: 94, usalama: 92
  },
  {
    id: 7, emoji: '🌿', name: 'Neem (Mwarobaini)', latin: 'Azadirachta indica', cats: ['kinga', 'ngozi', 'sukari'], ratibaKey: 'jumla', rating: 4.7, reviews: 890,
    matumizi: 'Miti ya maajabu, inatibu magonjwa mengi ya ngozi na damu.',
    faida: ['Tibu chunusi', 'Punguza sukari', 'Ua bakteria', 'Safi damu', 'Kinga ya malaria'],
    steps: [{ t: 'Majani', tx: 'Chemsha majani 3-5 kwa kikombe.' }, { t: 'Poda', tx: 'Tumia nusu kijiko cha mwarobaini.' }],
    onyo: 'Ladha ni chungu sana. Epuka ukiwa unatafuta mtoto.', gharama: 'Free', nguvu: 99, usalama: 85
  },
  {
    id: 8, emoji: '🌺', name: 'Hibiscus', latin: 'Hibiscus sabdariffa', cats: ['damu', 'moyo'], ratibaKey: 'shinikizo', rating: 4.8, reviews: 312,
    matumizi: 'Kushusha shinikizo la damu na kutoa sumu mwilini.',
    faida: ['Shusha BP', 'Homa', 'Kutoa sumu', 'Vitamini C', 'Kupunguza uzito'],
    steps: [{ t: 'Kakaa', tx: 'Chukua kakaa kavu za hibiscus.' }, { t: 'Chemsha', tx: 'Chemsha kwa dakika 5-10.' }, { t: 'Kunywa', tx: 'Vikombe 2 kwa siku, moto au baridi.' }],
    onyo: 'Inaweza kushusha BP haraka sana, jihadhari.', gharama: 'TSh 2,000/paketi', nguvu: 91, usalama: 97
  },
  {
    id: 9, emoji: '🌱', name: 'Peppermint', latin: 'Mentha piperita', cats: ['tumbo', 'akili'], ratibaKey: 'uchovu', rating: 4.6, reviews: 245,
    matumizi: 'Kutibu matatizo ya tumbo, gesi na kuongeza umakini.',
    faida: ['Ondoa gesi', 'Tulia akili', 'Punguza kichefuchefu', 'Harufu nzuri mdomoni', 'Tibu mafua'],
    steps: [{ t: 'Chai', tx: 'Tumia majani safi au kavu kwenye maji.' }, { t: 'Mafuta', tx: 'Tumia tone 1 kwenye maji (food grade).' }],
    onyo: 'Inaweza kuongeza kiungulia kwa baadhi ya watu.', gharama: 'TSh 3,000/bundle', nguvu: 85, usalama: 98
  },
  {
    id: 10, emoji: '🌼', name: 'Chamomile', latin: 'Matricaria chamomilla', cats: ['usingizi', 'akili'], ratibaKey: 'usingizi', rating: 4.9, reviews: 678,
    matumizi: 'Kusaidia usingizi na kupunguza msongo wa mawazo.',
    faida: ['Laza usingizi', 'Tulia akili', 'Punguza stress', 'Homa kwa watoto', 'Tulia tumbo'],
    steps: [{ t: 'Loweka', tx: 'Kijiko 1 kwenye maji ya moto kwa dakika 10.' }, { t: 'Kunywa', tx: 'Saa 1 kabla ya kulala.' }],
    onyo: 'Jihadhari kama una mzio wa maua.', gharama: 'TSh 5,000/box', nguvu: 80, usalama: 99
  },
  {
    id: 11, emoji: '🟠', name: 'Turmeric (Manjano)', latin: 'Curcuma longa', cats: ['ngozi', 'damu', 'kinga'], ratibaKey: 'jumla', rating: 4.9, reviews: 1200,
    matumizi: 'Anti-inflammatory yenye nguvu kwa viungo na kinga.',
    faida: ['Punguza maumivu', 'Safi ngozi', 'Kinga ya kansa', 'Safi ini', 'Boresha kumbukumbu'],
    steps: [{ t: 'Poda', tx: 'Nusu kijiko kwenye maziwa ya joto.' }, { t: 'Na Pilipili', tx: 'Ongeza tone la pilipili manga ili iingie vizuri mwilini.' }],
    onyo: 'Inaweza kuchafua nguo na kucha.', gharama: 'TSh 1,000/kifurushi', nguvu: 96, usalama: 95
  },
  {
    id: 12, emoji: '🪵', name: 'Licorice', latin: 'Glycyrrhiza glabra', cats: ['tumbo', 'pumu'], ratibaKey: 'jumla', rating: 4.5, reviews: 156,
    matumizi: 'Kutibu vidonda vya tumbo na koo linalowasha.',
    faida: ['Tibu vidonda', 'Koo', 'Kupumua vizuri', 'Punguza kichefuchefu', 'Ondoa uchovu'],
    steps: [{ t: 'Kunywa', tx: 'Chemsha mzizi kidogo kwenye maji.' }],
    onyo: 'Epuka kama una shinikizo la juu la damu.', gharama: 'TSh 4,000/pk', nguvu: 88, usalama: 82
  },
  { id: 13, emoji: '🌿', name: 'Basil (Mrehani)', latin: 'Ocimum basilicum', cats: ['tumbo', 'akili', 'kinga'], ratibaKey: 'jumla', rating: 4.7, reviews: 120, matumizi: 'Kutibu tumbo na msongo.', faida: ['Safi tumbo', 'Tulia akili'], steps: [{ t: 'Chai', tx: 'Loweka majani.' }], onyo: 'Hakuna.', gharama: 'Free', nguvu: 80, usalama: 99 },
  { id: 14, emoji: '🍃', name: 'Oregano', latin: 'Origanum vulgare', cats: ['kinga', 'pumu'], ratibaKey: 'jumla', rating: 4.8, reviews: 90, matumizi: 'Antibiotic ya asili.', faida: ['Ua wadudu', 'Kinga'], steps: [{ t: 'Oli', tx: 'Tone 1 kwenye maji.' }], onyo: 'Ni kali sana.', gharama: 'TSh 5k', nguvu: 95, usalama: 90 },
  { id: 15, emoji: '🌳', name: 'Ginkgo Biloba', latin: 'Ginkgo biloba', cats: ['akili'], ratibaKey: 'uchovu', rating: 4.9, reviews: 300, matumizi: 'Kuongeza kumbukumbu.', faida: ['Akili sharp', 'Mzunguko'], steps: [{ t: 'Poda', tx: 'Kijiko nusu asubuhi.' }], onyo: 'Usitumie na dawa za damu.', gharama: 'TSh 10k', nguvu: 92, usalama: 88 },
  { id: 16, emoji: '🥕', name: 'Ginseng', latin: 'Panax ginseng', cats: ['nguvu', 'uchovu'], ratibaKey: 'nguvu', rating: 4.8, reviews: 450, matumizi: 'Nishati na stamina.', faida: ['Nguvu zaidi', 'Punguza stress'], steps: [{ t: 'Mzizi', tx: 'Tafuna au chemsha.' }], onyo: 'Huenda ikakosesha usingizi.', gharama: 'TSh 15k', nguvu: 97, usalama: 90 },
  { id: 17, emoji: '🌸', name: 'Echinacea', latin: 'Echinacea purpurea', cats: ['kinga'], ratibaKey: 'jumla', rating: 4.7, reviews: 210, matumizi: 'Kuzuia mafua na homa.', faida: ['Kinga imara', 'Tibu vidonda'], steps: [{ t: 'Tea', tx: 'Kunywa mara 3 kwa siku.' }], onyo: 'Usitumie zaidi ya wiki 2.', gharama: 'TSh 8k', nguvu: 85, usalama: 95 },
  { id: 18, emoji: '🥛', name: 'Milk Thistle', latin: 'Silybum marianum', cats: ['damu'], ratibaKey: 'jumla', rating: 4.8, reviews: 180, matumizi: 'Kusafisha ini.', faida: ['Safi ini', 'Ondoa sumu'], steps: [{ t: 'Capsule', tx: 'Meza baada ya kula.' }], onyo: 'Inaweza kuharisha.', gharama: 'TSh 12k', nguvu: 93, usalama: 92 },
  { id: 19, emoji: '☀️', name: 'St. Johns Wort', latin: 'Hypericum perforatum', cats: ['akili'], ratibaKey: 'usingizi', rating: 4.6, reviews: 140, matumizi: 'Kutibu huzuni na wasiwasi.', faida: ['Furaha', 'Tulia'], steps: [{ t: 'Chai', tx: 'Kunywa usiku.' }], onyo: 'Inaingiliana na dawa nyingi.', gharama: 'TSh 9k', nguvu: 89, usalama: 80 },
  { id: 20, emoji: '🪴', name: 'Valerian Root', latin: 'Valeriana officinalis', cats: ['usingizi'], ratibaKey: 'usingizi', rating: 4.9, reviews: 500, matumizi: 'Usingizi mzito.', faida: ['Lala haraka', 'Tulia misuli'], steps: [{ t: 'Kikombe 1', tx: 'Kabla ya kulala.' }], onyo: 'Wala usendeshe gari baada ya kunywa.', gharama: 'TSh 7k', nguvu: 98, usalama: 94 },
  { id: 21, emoji: '🎋', name: 'Astragalus', latin: 'Astragalus membranaceus', cats: ['kinga', 'moyo'], ratibaKey: 'jumla', rating: 4.7, reviews: 110, matumizi: 'Kuimarisha kinga ya muda mrefu.', faida: ['Kinga', 'Nishati'], steps: [{ t: 'Supu', tx: 'Ongeza kwenye supu.' }], onyo: 'Epuka kama una autoimmune disease.', gharama: 'TSh 11k', nguvu: 88, usalama: 96 },
  { id: 22, emoji: '🍃', name: 'Ashwagandha', latin: 'Withania somnifera', cats: ['akili', 'nguvu'], ratibaKey: 'nguvu', rating: 4.9, reviews: 900, matumizi: 'Kupunguza cortisol na kuongeza stamina.', faida: ['Punguza stress', 'Nguvu za kiume'], steps: [{ t: 'Maziwa', tx: 'Kijiko 1 kwenye maziwa moto.' }], onyo: 'Inaleta usingizi kidogo.', gharama: 'TSh 6k', nguvu: 99, usalama: 95 },
  { id: 23, emoji: '🥔', name: 'Maca Root', latin: 'Lepidium meyenii', cats: ['nguvu', 'uzazi'], ratibaKey: 'nguvu', rating: 4.8, reviews: 750, matumizi: 'Testosterone booster ya asili.', faida: ['Libido', 'Nishati'], steps: [{ t: 'Smoothie', tx: 'Ongeza kijiko 1.' }], onyo: 'Inabadili homoni.', gharama: 'TSh 15k', nguvu: 96, usalama: 93 },
  { id: 24, emoji: '🪵', name: 'Tongkat Ali', latin: 'Eurycoma longifolia', cats: ['nguvu'], ratibaKey: 'nguvu', rating: 4.9, reviews: 400, matumizi: 'Nguvu za kiume za kudumu.', faida: ['Misuli', 'Nguvu'], steps: [{ t: 'Extract', tx: 'Tone chache kwenye maji.' }], onyo: 'Inapandisha hasira kwa wengine.', gharama: 'TSh 20k', nguvu: 100, usalama: 85 },
  { id: 25, emoji: '🌱', name: 'Alfalfa', latin: 'Medicago sativa', cats: ['lishe'], ratibaKey: 'jumla', rating: 4.5, reviews: 80, matumizi: 'Kupata madini mengi.', faida: ['Madini', 'Vitamini K'], steps: [{ t: 'Juisi', tx: 'Piga majani yake.' }], onyo: 'Usitumie kama una Lupus.', gharama: 'Free', nguvu: 82, usalama: 98 },
  { id: 26, emoji: '🌳', name: 'Clove (Karafuu)', latin: 'Syzygium aromaticum', cats: ['tumbo', 'kinga'], ratibaKey: 'jumla', rating: 4.9, reviews: 1100, matumizi: 'Kutibu maumivu ya meno na tumbo.', faida: ['Ua vimelea', 'Ondoa maumivu'], steps: [{ t: 'Chai', tx: 'Weka mbegu 3 kwenye chai.' }], onyo: 'Mafuta yake ni makali sana.', gharama: 'TSh 2k', nguvu: 94, usalama: 95 },
  { id: 27, emoji: '🥜', name: 'Cardamom (Iliki)', latin: 'Elettaria cardamomum', cats: ['tumbo', 'damu'], ratibaKey: 'usingizi', rating: 4.8, reviews: 600, matumizi: 'Mmengenyo na harufu nzuri.', faida: ['Safi tumbo', 'Punguza gesi'], steps: [{ t: 'Chai/Kawa', tx: 'Saga na weka kwenye vinywaji.' }], onyo: 'Hakuna.', gharama: 'TSh 3k', nguvu: 85, usalama: 99 },
  { id: 28, emoji: '🧂', name: 'Black Pepper', latin: 'Piper nigrum', cats: ['lishe', 'tumbo'], ratibaKey: 'jumla', rating: 4.7, reviews: 450, matumizi: 'Husaidia virutubisho kuingia mwilini.', faida: ['Digest', 'Absorb'], steps: [{ t: 'Chakula', tx: 'Ongeza kwenye mboga.' }], onyo: 'Inawasha.', gharama: 'TSh 1k', nguvu: 83, usalama: 97 },
  { id: 29, emoji: '🌰', name: 'Nutmeg (Kungumanga)', latin: 'Myristica fragrans', cats: ['usingizi', 'nguvu'], ratibaKey: 'usingizi', rating: 4.6, reviews: 300, matumizi: 'Laza usingizi na kuongeza hamu.', faida: ['Usingizi', 'Hamu ya mlo'], steps: [{ t: 'Maziwa', tx: 'Kidogo sana kwenye maziwa.' }], onyo: 'Usizidishe — ni sumu kwa kiasi kikubwa!', gharama: 'TSh 2k', nguvu: 91, usalama: 80 },
  { id: 30, emoji: '🧡', name: 'Saffron (Safrani)', latin: 'Crocus sativus', cats: ['akili', 'uzazi'], ratibaKey: 'uchovu', rating: 4.9, reviews: 150, matumizi: 'Dawa ya huzuni ya asili.', faida: ['Mood booster', 'Ngozi'], steps: [{ t: 'Majani', tx: 'Tone chache kwenye maziwa.' }], onyo: 'Ni ghali sana.', gharama: 'TSh 50k/gram', nguvu: 95, usalama: 90 },
  { id: 31, emoji: '💜', name: 'Lavender', latin: 'Lavandula', cats: ['akili', 'usingizi'], ratibaKey: 'usingizi', rating: 4.9, reviews: 800, matumizi: 'Utulivu na harufu.', faida: ['Punguza wasiwasi', 'Lala'], steps: [{ t: 'Chai/Aroma', tx: 'Harufu au chai.' }], onyo: 'Usitumie mafuta ndani kama sio food grade.', gharama: 'TSh 10k', nguvu: 84, usalama: 98 },
  { id: 32, emoji: '🌿', name: 'Rosemary', latin: 'Salvia rosmarinus', cats: ['akili', 'nywele'], ratibaKey: 'uchovu', rating: 4.8, reviews: 550, matumizi: 'Boresha kumbukumbu na nywele.', faida: ['Akili sharp', 'Nywele ndefu'], steps: [{ t: 'Oli/Chai', tx: 'Paka kichwani au kunywa.' }], onyo: 'Hakuna.', gharama: 'Free', nguvu: 88, usalama: 99 },
  { id: 33, emoji: '🌱', name: 'Thyme (Simba)', latin: 'Thymus vulgaris', cats: ['pumu', 'kinga'], ratibaKey: 'jumla', rating: 4.7, reviews: 400, matumizi: 'Kukohoa na koo.', faida: ['Kifua safi', 'Kinga'], steps: [{ t: 'Tea', tx: 'Chemsha majani safi.' }], onyo: 'Hakuna.', gharama: 'Free', nguvu: 87, usalama: 99 },
  { id: 34, emoji: '🦷', name: 'Dandelion', latin: 'Taraxacum', cats: ['tumbo', 'damu'], ratibaKey: 'jumla', rating: 4.6, reviews: 250, matumizi: 'Kusafisha figo na ini.', faida: ['Safi damu', 'Punguza maji'], steps: [{ t: 'Root tea', tx: 'Chemsha mizizi.' }], onyo: 'Dawa ya kukojoa.', gharama: 'Free', nguvu: 86, usalama: 95 },
  { id: 35, emoji: '🍇', name: 'Elderberry', latin: 'Sambucus', cats: ['kinga'], ratibaKey: 'jumla', rating: 4.9, reviews: 600, matumizi: 'Kinga ya mafua makali.', faida: ['Flu fighter', 'Kinga'], steps: [{ t: 'Syrup', tx: 'Kijiko 1 kwa siku.' }], onyo: 'Usile beri mbichi.', gharama: 'TSh 15k', nguvu: 97, usalama: 90 },
  { id: 36, emoji: '🍄', name: 'Reishi Mushroom', latin: 'Ganoderma lucidum', cats: ['kinga', 'akili'], ratibaKey: 'jumla', rating: 4.8, reviews: 200, matumizi: 'Urefu wa maisha na kinga.', faida: ['Anti-cancer', 'Stress relief'], steps: [{ t: 'Poda', tx: 'Kwenye kahawa au chai.' }], onyo: 'Inapunguza kasi ya kuganda kwa damu.', gharama: 'TSh 25k', nguvu: 94, usalama: 85 },
  { id: 37, emoji: '🌳', name: 'Nettle (Upupu)', latin: 'Urtica dioica', cats: ['lishe', 'nywele'], ratibaKey: 'uchovu', rating: 4.5, reviews: 180, matumizi: 'Madini ya chuma kwa wingi.', faida: ['Iron', 'Tibu aleji'], steps: [{ t: 'Tea', tx: 'Loweka majani kavu.' }], onyo: 'Majani mbichi yanawasha sana.', gharama: 'Free', nguvu: 85, usalama: 92 },
  { id: 38, emoji: '🍊', name: 'Rosehips', latin: 'Rosa canina', cats: ['kinga', 'ngozi'], ratibaKey: 'jumla', rating: 4.7, reviews: 110, matumizi: 'Vitamini C ya asili.', faida: ['Kinga', 'Ngozi nyororo'], steps: [{ t: 'Tea', tx: 'Ponda na chemsha.' }], onyo: 'Ondoa mbegu na manyoya yake.', gharama: 'TSh 8k', nguvu: 82, usalama: 98 },
  { id: 39, emoji: '🌼', name: 'Calendula', latin: 'Calendula officinalis', cats: ['ngozi'], ratibaKey: 'jumla', rating: 4.8, reviews: 300, matumizi: 'Matatizo ya ngozi na uvimbe.', faida: ['Vidonda', 'Ngozi'], steps: [{ t: 'Mafuta', tx: 'Cream au mafuta.' }], onyo: 'Hakuna.', gharama: 'TSh 10k', nguvu: 88, usalama: 100 },
  { id: 40, emoji: '🧶', name: 'Mullein', latin: 'Verbascum thapsus', cats: ['pumu'], ratibaKey: 'jumla', rating: 4.9, reviews: 150, matumizi: 'Kuzuia matatizo ya mapafu.', faida: ['Mapafu safi', 'Kikohozi'], steps: [{ t: 'Vuta mvuke', tx: 'Mvuke au chai.' }], onyo: 'Chuja vizuri — ina manyoya ya kuwasha koo.', gharama: 'TSh 6k', nguvu: 96, usalama: 94 },
  { id: 41, emoji: '🌿', name: 'Sage (Mshubiri mwitu)', latin: 'Salvia officinalis', cats: ['akili', 'tumbo'], ratibaKey: 'jumla', rating: 4.6, reviews: 220, matumizi: 'Kumbukumbu na jasho jingi.', faida: ['Focus', 'Anti-sweat'], steps: [{ t: 'Chai', tx: 'Vikombe 2.' }], onyo: 'Wajawazito epuka kiasi kikubwa.', gharama: 'TSh 4k', nguvu: 84, usalama: 90 },
  { id: 42, emoji: '🌰', name: 'Witch Hazel', latin: 'Hamamelis virginiana', cats: ['ngozi'], ratibaKey: 'jumla', rating: 4.7, reviews: 400, matumizi: 'Tibu bawasiri na ngozi mafuta.', faida: ['Tighten skin', 'Bawasiri'], steps: [{ t: 'Topical', tx: 'Paka.' }], onyo: 'Usikunye.', gharama: 'TSh 12k', nguvu: 90, usalama: 96 },
  { id: 43, emoji: '🌹', name: 'Rose (Waridi)', latin: 'Rosa', cats: ['ngozi', 'akili'], ratibaKey: 'jumla', rating: 4.8, reviews: 320, matumizi: 'Kutuliza moyo na ngozi.', faida: ['Anti-aging', 'Tulia'], steps: [{ t: 'Rose Water', tx: 'Osha uso.' }], onyo: 'None.', gharama: 'TSh 15k', nguvu: 80, usalama: 100 },
  { id: 44, emoji: '🏵️', name: 'Marigold', latin: 'Tagetes', cats: ['ngozi', 'kinga'], ratibaKey: 'jumla', rating: 4.6, reviews: 140, matumizi: 'Uvimbe na fangasi.', faida: ['Ondoa uvimbe', 'Fangasi'], steps: [{ t: 'Ointment', tx: 'Paka sehemu husika.' }], onyo: 'None.', gharama: 'TSh 5k', nguvu: 85, usalama: 95 },
  { id: 45, emoji: '🌱', name: 'Plantain', latin: 'Plantago major', cats: ['ngozi', 'tumbo'], ratibaKey: 'jumla', rating: 4.5, reviews: 90, matumizi: 'Kuumwa na wadudu.', faida: ['Ondoa sumu', 'Homa'], steps: [{ t: 'Poultice', tx: 'Ponda na paka.' }], onyo: 'None.', gharama: 'Free', nguvu: 82, usalama: 99 },
  { id: 46, emoji: '🍠', name: 'Burdock Root', latin: 'Arctium', cats: ['damu', 'ngozi'], ratibaKey: 'jumla', rating: 4.7, reviews: 156, matumizi: 'Msafishaji damu mkuu.', faida: ['Safi damu', 'Chunusi'], steps: [{ t: 'Root tea', tx: 'Chemsha mizizi.' }], onyo: 'None.', gharama: 'TSh 7k', nguvu: 91, usalama: 94 },
  { id: 47, emoji: '☁️', name: 'Marshmallow Root', latin: 'Althaea officinalis', cats: ['pumu', 'tumbo'], ratibaKey: 'jumla', rating: 4.8, reviews: 110, matumizi: 'Koo na kikohozi kikavu.', faida: ['Lainisha koo', 'Digest'], steps: [{ t: 'Infusion', tx: 'Loweka kwenye maji baridi.' }], onyo: 'Inachelewesha dawa nyingine kuingia mwilini.', gharama: 'TSh 8k', nguvu: 88, usalama: 97 },
  { id: 48, emoji: '🌿', name: 'Comfrey', latin: 'Symphytum', cats: ['ngozi'], ratibaKey: 'jumla', rating: 4.6, reviews: 78, matumizi: 'Tibu mifupa na majeraha.', faida: ['Mifupa', 'Majeraha'], steps: [{ t: 'External', tx: 'Paka.' }], onyo: 'USIKUNYE — inadhumu ini.', gharama: 'TSh 10k', nguvu: 95, usalama: 60 },
  { id: 49, emoji: '🌕', name: 'Evening Primrose', latin: 'Oenothera biennis', cats: ['uzazi', 'ngozi'], ratibaKey: 'jumla', rating: 4.7, reviews: 190, matumizi: 'Homoni za wanawake.', faida: ['PMS', 'Ngozi'], steps: [{ t: 'Oil', tx: 'Meza capsule.' }], onyo: 'Punguza kabla ya upasuaji.', gharama: 'TSh 15k', nguvu: 87, usalama: 92 },
  { id: 50, emoji: '🍒', name: 'Bilberry', latin: 'Vaccinium myrtillus', cats: ['damu'], ratibaKey: 'jumla', rating: 4.9, reviews: 200, matumizi: 'Kuboresha uoni usiku.', faida: ['Macho', 'Antioxidant'], steps: [{ t: 'Beri', tx: 'Kula mbichi.' }], onyo: 'None.', gharama: 'TSh 20k', nguvu: 94, usalama: 99 },
  { id: 51, emoji: '🪵', name: 'Slippery Elm', latin: 'Ulmus rubra', cats: ['tumbo', 'pumu'], ratibaKey: 'jumla', rating: 4.8, reviews: 130, matumizi: 'Kutibu kiungulia na koo.', faida: ['Tumbo', 'Koo'], steps: [{ t: 'Gruel', tx: 'Changanya na maji ya moto.' }], onyo: 'None.', gharama: 'TSh 9k', nguvu: 89, usalama: 98 },
  { id: 52, emoji: '🌳', name: 'Cat\'s Claw', latin: 'Uncaria tomentosa', cats: ['kinga'], ratibaKey: 'jumla', rating: 4.7, reviews: 145, matumizi: 'Kuimarisha kinga dhidi ya virusi.', faida: ['Kinga', 'Arthritis'], steps: [{ t: 'Extract', tx: 'Kunywa.' }], onyo: 'Usitumie ukiwa mjamzito.', gharama: 'TSh 22k', nguvu: 95, usalama: 88 },
  { id: 53, emoji: '🌿', name: 'Yarrow', latin: 'Achillea millefolium', cats: ['damu', 'kinga'], ratibaKey: 'jumla', rating: 4.6, reviews: 95, matumizi: 'Kuzuia damu kutoka na kurekebisha mzunguko.', faida: ['Dhibiti damu', 'Homa'], steps: [{ t: 'Tea/Poultice', tx: 'Kunywa au paka.' }], onyo: 'None.', gharama: 'Free', nguvu: 86, usalama: 93 },
  { id: 54, emoji: '🌱', name: 'Lemon Verbena', latin: 'Aloysia citrodora', cats: ['akili', 'tumbo'], ratibaKey: 'usingizi', rating: 4.8, reviews: 110, matumizi: 'Kulaza usingizi na kutuliza tumbo.', faida: ['Relax', 'Digestion'], steps: [{ t: 'Tea', tx: 'Chemsha majani.' }], onyo: 'None.', gharama: 'TSh 5k', nguvu: 83, usalama: 99 },
  { id: 55, emoji: '🌳', name: 'White Willow Bark', latin: 'Salix alba', cats: ['kinga', 'damu'], ratibaKey: 'jumla', rating: 4.7, reviews: 180, matumizi: 'Aspirini ya asili kupunguza maumivu.', faida: ['Maumivu', 'Homa'], steps: [{ t: 'Chew/Tea', tx: 'Tafuna gome.' }], onyo: 'Usitumie kama una mzio wa aspirin.', gharama: 'TSh 8k', nguvu: 92, usalama: 85 },
  { id: 56, emoji: '🍄', name: 'Shiitake Mushroom', latin: 'Lentinula edodes', cats: ['kinga', 'lishe'], ratibaKey: 'jumla', rating: 4.9, reviews: 320, matumizi: 'Kinga na afya ya moyo.', faida: ['Kinga', 'Cholesterol'], steps: [{ t: 'Eat', tx: 'Pika na kula.' }], onyo: 'None.', gharama: 'TSh 15k', nguvu: 96, usalama: 98 },
  { id: 57, emoji: '🌿', name: 'Holy Basil (Tulsi)', latin: 'Ocimum tenuiflorum', cats: ['akili', 'kinga'], ratibaKey: 'uchovu', rating: 4.9, reviews: 850, matumizi: 'Mmea mtakatifu wa kupunguza msongo.', faida: ['Stress', 'Respiration'], steps: [{ t: 'Tea', tx: 'Kunywa mara 2.' }], onyo: 'None.', gharama: 'TSh 6k', nguvu: 98, usalama: 97 },
  { id: 58, emoji: '🍂', name: 'Valyrian', latin: 'Valeriana', cats: ['usingizi'], ratibaKey: 'usingizi', rating: 4.8, reviews: 700, matumizi: 'Usingizi mzito sana.', faida: ['Sleep', 'Anxiety'], steps: [{ t: 'Pills/Tea', tx: 'Kunywa.' }], onyo: 'Harufu mbaya.', gharama: 'TSh 7k', nguvu: 97, usalama: 94 },
  { id: 59, emoji: '🌻', name: 'Passionflower', latin: 'Passiflora', cats: ['usingizi', 'akili'], ratibaKey: 'usingizi', rating: 4.7, reviews: 330, matumizi: 'Kuzuia wasiwasi wa usiku.', faida: ['Relax', 'Sleep'], steps: [{ t: 'Tea', tx: 'Loweka majani.' }], onyo: 'None.', gharama: 'TSh 9k', nguvu: 84, usalama: 98 },
  { id: 60, emoji: '🪵', name: 'Gotu Kola', latin: 'Centella asiatica', cats: ['akili', 'ngozi'], ratibaKey: 'uchovu', rating: 4.9, reviews: 410, matumizi: 'Kumbukumbu na kuponya makovu.', faida: ['Memory', 'Skin healing'], steps: [{ t: 'Tea/Paste', tx: 'Kunywa au paka.' }], onyo: 'None.', gharama: 'TSh 12k', nguvu: 93, usalama: 95 },
  { id: 61, emoji: '🌳', name: 'Horse Chestnut', latin: 'Aesculus hippocastanum', cats: ['damu'], ratibaKey: 'jumla', rating: 4.4, reviews: 105, matumizi: 'Mishipa ya damu (varicose veins).', faida: ['Leg health', 'Veins'], steps: [{ t: 'Topical/Ext', tx: 'Tumia dondoo.' }], onyo: 'Sumu usipoisafisha kitaalamu.', gharama: 'TSh 25k', nguvu: 91, usalama: 70 },
  { id: 62, emoji: '🌿', name: 'Hyssop', latin: 'Hyssopus officinalis', cats: ['pumu', 'kinga'], ratibaKey: 'jumla', rating: 4.5, reviews: 90, matumizi: 'Matatizo ya kifua na koo.', faida: ['Chest', 'Cough'], steps: [{ t: 'Chai', tx: 'Chemsha majani.' }], onyo: 'Epuka kwa wenye kifafa.', gharama: 'TSh 8k', nguvu: 82, usalama: 85 },
  { id: 63, emoji: '🥀', name: 'Skullcap', latin: 'Scutellaria', cats: ['akili', 'usingizi'], ratibaKey: 'usingizi', rating: 4.8, reviews: 160, matumizi: 'Kutuliza mfumo wa fahamu.', faida: ['Nerve calm', 'Anxiety'], steps: [{ t: 'Tea', tx: 'Kabla ya kulala.' }], onyo: 'None.', gharama: 'TSh 13k', nguvu: 89, usalama: 92 },
  { id: 64, emoji: '🍇', name: 'Hawthorn Berry', latin: 'Crataegus', cats: ['damu', 'moyo'], ratibaKey: 'shinikizo', rating: 4.9, reviews: 400, matumizi: 'Moyo mwenye afya.', faida: ['Heart health', 'BP'], steps: [{ t: 'Tea/Beri', tx: 'Kula ama kunywa.' }], onyo: 'Ongea na daktari kwanza.', gharama: 'TSh 18k', nguvu: 98, usalama: 94 },
  { id: 65, emoji: '🌱', name: 'Mugwort', latin: 'Artemisia vulgaris', cats: ['tumbo', 'usingizi'], ratibaKey: 'usingizi', rating: 4.4, reviews: 85, matumizi: 'Ndoto na mmengenyo.', faida: ['Dreams', 'Digestion'], steps: [{ t: 'Tea/Incense', tx: 'Kunywa au fukiza.' }], onyo: 'Usitumie mjamzito.', gharama: 'Free', nguvu: 81, usalama: 80 },
  { id: 66, emoji: '🪴', name: 'Motherwort', latin: 'Leonurus cardiaca', cats: ['moyo', 'uzazi'], ratibaKey: 'shinikizo', rating: 4.7, reviews: 110, matumizi: 'Kutuliza mapigo ya moyo (anxiety).', faida: ['Heart calm', 'Menstrual'], steps: [{ t: 'Tincture', tx: 'Tone chache.' }], onyo: 'Inaleta usingizi.', gharama: 'TSh 14k', nguvu: 87, usalama: 91 },
  { id: 67, emoji: '🪵', name: 'Rhubarb Root', latin: 'Rheum', cats: ['tumbo'], ratibaKey: 'jumla', rating: 4.3, reviews: 60, matumizi: 'Kupata choo kigumu (constipation).', faida: ['Laxative', 'Digest'], steps: [{ t: 'Powder', tx: 'Kidogo kwenye maji.' }], onyo: 'Usitumie kila siku.', gharama: 'TSh 5k', nguvu: 99, usalama: 75 },
  { id: 68, emoji: '🌿', name: 'Catnip', latin: 'Nepeta cataria', cats: ['tumbo', 'usingizi'], ratibaKey: 'usingizi', rating: 4.6, reviews: 140, matumizi: 'Tulia tumbo kwa watoto (mildly).', faida: ['Colic', 'Sleep'], steps: [{ t: 'Mild tea', tx: 'Kunywa.' }], onyo: 'None.', gharama: 'Free', nguvu: 78, usalama: 100 },
  { id: 69, emoji: '🌳', name: 'Saw Palmetto', latin: 'Serenoa repens', cats: ['nguvu'], ratibaKey: 'nguvu', rating: 4.8, reviews: 250, matumizi: 'Afya ya kibofu (prostate).', faida: ['Prostate', 'Hair loss'], steps: [{ t: 'Capsule', tx: 'Meza.' }], onyo: 'None.', gharama: 'TSh 20k', nguvu: 92, usalama: 95 },
  { id: 70, emoji: '🌱', name: 'Stevia', latin: 'Stevia rebaudiana', cats: ['sukari', 'lishe'], ratibaKey: 'jumla', rating: 4.8, reviews: 600, matumizi: 'Sukari mbadala ya asili.', faida: ['0 calories', 'Diabetes friendly'], steps: [{ t: 'Leaves', tx: 'Ongeza kwenye chai.' }], onyo: 'Ladha baada ya kula inatofautiana.', gharama: 'TSh 4k', nguvu: 85, usalama: 100 },
  { id: 71, emoji: '🪵', name: 'Rhodiola Rosea', latin: 'Rhodiola rosea', cats: ['uchovu', 'akili'], ratibaKey: 'uchovu', rating: 4.9, reviews: 350, matumizi: 'Nguvu ya akili na mwili (adaptogen).', faida: ['Anti-fatigue', 'Mental performance'], steps: [{ t: 'Extract', tx: 'Asubuhi.' }], onyo: 'Avoid late night.', gharama: 'TSh 28k', nguvu: 97, usalama: 96 },
  { id: 72, emoji: '🌼', name: 'Feverfew', latin: 'Tanacetum parthenium', cats: ['kinga'], ratibaKey: 'jumla', rating: 4.5, reviews: 90, matumizi: 'Kuzuia kipandauso (migraine).', faida: ['Migraine', 'Inflammation'], steps: [{ t: 'Leaf', tx: 'Tafuna jani 1 safi.' }], onyo: 'Huenda ikaleta vidonda mdomoni.', gharama: 'Free', nguvu: 80, usalama: 85 },
  { id: 73, emoji: '🌿', name: 'Lemon Balm', latin: 'Melissa officinalis', cats: ['akili', 'usingizi', 'kinga'], ratibaKey: 'usingizi', rating: 4.9, reviews: 440, matumizi: 'Kutuliza wasiwasi na vidonda vya baridi.', faida: ['Calm', 'Antiviral'], steps: [{ t: 'Tea', tx: 'Kunywa mara nyingi.' }], onyo: 'None.', gharama: 'Free', nguvu: 84, usalama: 100 },
  { id: 74, emoji: '🌱', name: 'Chickweed', latin: 'Stellaria media', cats: ['ngozi', 'lishe'], ratibaKey: 'jumla', rating: 4.3, reviews: 50, matumizi: 'Ngozi inayowasha na kupunguza uzito.', faida: ['Itch relief', 'Vitamin C'], steps: [{ t: 'Ointment/Salad', tx: 'Paka au kula.' }], onyo: 'None.', gharama: 'Free', nguvu: 75, usalama: 100 },
  { id: 75, emoji: '🌳', name: 'Black Cohosh', latin: 'Actaea racemosa', cats: ['uzazi'], ratibaKey: 'jumla', rating: 4.6, reviews: 200, matumizi: 'Dalili za kukoma hedhi (menopause).', faida: ['Hot flashes', 'Hormones'], steps: [{ t: 'Extract', tx: 'Kunywa.' }], onyo: 'Ongea na daktari kuhusu ini.', gharama: 'TSh 18k', nguvu: 90, usalama: 82 },
  { id: 76, emoji: '🌿', name: 'Rue (Satala)', latin: 'Ruta graveolens', cats: ['tumbo', 'damu'], ratibaKey: 'jumla', rating: 4.2, reviews: 75, matumizi: 'Mzunguko na kuzuia degedege kidogo.', faida: ['Mzunguko', 'Vision'], steps: [{ t: 'Tea', tx: 'Kidogo sana — tawi 1.' }], onyo: 'SUMU kwa kiasi kikubwa. Usitumie mjamzito.', gharama: 'Free', nguvu: 88, usalama: 50 },
  { id: 77, emoji: '🧶', name: 'Wormwood', latin: 'Artemisia absinthium', cats: ['tumbo', 'kinga'], ratibaKey: 'jumla', rating: 4.5, reviews: 100, matumizi: 'Ondoa minyoo na matatizo ya tumbo.', faida: ['Minyoo', 'Appetite'], steps: [{ t: 'Bitter tea', tx: 'Vikombe vidogo.' }], onyo: 'Ladha ni chungu kupita kiasi.', gharama: 'Free', nguvu: 98, usalama: 70 },
  { id: 78, emoji: '🌿', name: 'Self-Heal', latin: 'Prunella vulgaris', cats: ['ngozi', 'kinga'], ratibaKey: 'jumla', rating: 4.6, reviews: 80, matumizi: 'Vidonda vya koo na vidonda vya mwili.', faida: ['Heal wounds', 'Throat'], steps: [{ t: 'Wash/Tea', tx: 'Osha au kunywa.' }], onyo: 'None.', gharama: 'Free', nguvu: 81, usalama: 100 },
  { id: 79, emoji: '🌱', name: 'Sheep Sorrel', latin: 'Rumex acetosella', cats: ['kinga', 'damu'], ratibaKey: 'jumla', rating: 4.7, reviews: 65, matumizi: 'Kiungo cha Essiac tea (detox).', faida: ['Detox', 'Laxative'], steps: [{ t: 'Tea', tx: 'Changanya na mizizi.' }], onyo: 'None.', gharama: 'Free', nguvu: 85, usalama: 94 },
  { id: 80, emoji: '🪵', name: 'Goldenseal', latin: 'Hydrastis canadensis', cats: ['kinga', 'tumbo'], ratibaKey: 'jumla', rating: 4.9, reviews: 120, matumizi: 'Mmea antibiotic wenye nguvu.', faida: ['Infection', 'Mucus membranes'], steps: [{ t: 'Capsule/Tea', tx: 'Tumia kidogo.' }], onyo: 'Usitumie zaidi ya wiki 3.', gharama: 'TSh 30k', nguvu: 99, usalama: 80 },
  {
    id: 81, emoji: '🌿', name: 'Black Seed (Habbatus Sauda)', latin: 'Nigella sativa', cats: ['kinga', 'damu', 'nguvu'], ratibaKey: 'nguvu', rating: 4.8, reviews: 234,
    matumizi: 'Thymoquinone yenye nguvu kubwa ya anti-inflammatory na anti-bacterial.',
    faida: ['Anti-inflammatory', 'Inaboresha kinga', 'Inadhibiti sukari', 'Inapunguza shinikizo la damu', 'Inaboresha nywele'],
    steps: [{ t: 'Pata Mbegu au Mafuta', tx: 'Mbegu nzima au cold-pressed black seed oil.' }, { t: 'Mafuta', tx: 'Kijiko nusu mara mbili kwa siku — kabla ya kula.' }, { t: 'Mbegu', tx: 'Kijiko 1 cha mbegu nzima kwa siku.' }, { t: 'Na Asali', tx: 'Changanya mafuta na asali kwa ladha.' }, { t: 'Kwa Nywele', tx: 'Rubuta mafuta kwenye kichwa kabla ya kuoga.' }],
    onyo: 'Inaweza kushushia shinikizo la damu sana. Epuka kabla ya upasuaji.', gharama: 'TSh 5,000-10,000/mwezi', nguvu: 88, usalama: 88
  },
  { id: 82, emoji: '🌿', name: 'Marshmallow Root', latin: 'Althaea officinalis', cats: ['pumu', 'tumbo', 'koo'], ratibaKey: 'jumla', rating: 4.6, reviews: 100, matumizi: 'Kutibu koo na matatizo ya tumbo.', faida: ['Koo', 'Tumbo'], steps: [{ t: 'Cold infusion', tx: 'Loweka usiku kucha.' }], onyo: 'None.', gharama: 'TSh 5k', nguvu: 82, usalama: 98 },
  { id: 83, emoji: '🌱', name: 'Capers', latin: 'Capparis spinosa', cats: ['damu', 'moyo', 'ini'], ratibaKey: 'jumla', rating: 4.5, reviews: 40, matumizi: 'Afya ya moyo na ini.', faida: ['Ini', 'Antioxidant'], steps: [{ t: 'Chakula', tx: 'Weka kwenye saladi.' }], onyo: 'None.', gharama: 'TSh 10k', nguvu: 80, usalama: 95 },
  { id: 84, emoji: '🥬', name: 'Artichoke', latin: 'Cynara cardunculus', cats: ['tumbo', 'moyo', 'cholesterol'], ratibaKey: 'jumla', rating: 4.7, reviews: 120, matumizi: 'Cholesterol na mmengenyo.', faida: ['Punguza cholesterol', 'Mzunguko'], steps: [{ t: 'Cook', tx: 'Chemsha na kula.' }], onyo: 'None.', gharama: 'TSh 15k', nguvu: 88, usalama: 97 },
  { id: 85, emoji: '🍷', name: 'Red Clover', latin: 'Trifolium pratense', cats: ['uzazi', 'ngozi', 'homoni'], ratibaKey: 'jumla', rating: 4.6, reviews: 180, matumizi: 'Dalili za kukoma hedhi.', faida: ['Homoni', 'Ngozi'], steps: [{ t: 'Tea', tx: 'Kikombe 1 kila siku.' }], onyo: 'None.', gharama: 'TSh 12k', nguvu: 86, usalama: 92 },
  { id: 86, emoji: '🌳', name: 'Slippery Elm', latin: 'Ulmus rubra', cats: ['tumbo', 'koo', 'vidonda'], ratibaKey: 'jumla', rating: 4.8, reviews: 220, matumizi: 'Msaada wa mfumo wa chakula.', faida: ['Kiungulia', 'IBS'], steps: [{ t: 'Powder', tx: 'Changanya na maji.' }], onyo: 'None.', gharama: 'TSh 20k', nguvu: 93, usalama: 99 },
  { id: 87, emoji: '🌿', name: 'Parsley', latin: 'Petroselinum crispum', cats: ['damu', 'lishe', 'figo'], ratibaKey: 'jumla', rating: 4.7, reviews: 300, matumizi: 'Safi figo na kutoa sumu.', faida: ['Figo', 'Pumu'], steps: [{ t: 'Chakula', tx: 'Ongeza kwenye mboga.' }], onyo: 'None.', gharama: 'Free', nguvu: 80, usalama: 100 },
  { id: 88, emoji: '🍃', name: 'Dill', latin: 'Anethum graveolens', cats: ['tumbo', 'gesi'], ratibaKey: 'jumla', rating: 4.6, reviews: 150, matumizi: 'Gesi na tumbo kwa watoto na watu wazima.', faida: ['Tumbo', 'Gesi'], steps: [{ t: 'Tea/Food', tx: 'Mbegu au majani.' }], onyo: 'None.', gharama: 'Free', nguvu: 79, usalama: 100 },
  { id: 89, emoji: '🥥', name: 'Licorice Root', latin: 'Glycyrrhiza glabra', cats: ['tumbo', 'kinga', 'pumu', 'vidonda'], ratibaKey: 'jumla', rating: 4.8, reviews: 400, matumizi: 'Vidonda vya tumbo.', faida: ['Ulcers', 'Stress'], steps: [{ t: 'Tea', tx: 'Chemsha mizizi.' }], onyo: 'Inapandisha BP.', gharama: 'TSh 10k', nguvu: 94, usalama: 80 },
  { id: 90, emoji: '🌰', name: 'Horse Chestnut', latin: 'Aesculus hippocastanum', cats: ['damu', 'miguu'], ratibaKey: 'jumla', rating: 4.4, reviews: 90, matumizi: 'Mishipa ya damu na miguu kuvimba.', faida: ['Varicose', 'Blood flow'], steps: [{ t: 'Extract', tx: 'Paka.' }], onyo: 'Toxic if raw.', gharama: 'TSh 30k', nguvu: 85, usalama: 70 },
  { id: 91, emoji: '🌿', name: 'Tansy', latin: 'Tanacetum vulgare', cats: ['tumbo', 'minyoo'], ratibaKey: 'jumla', rating: 4.1, reviews: 30, matumizi: 'Ondoa minyoo na vimelea.', faida: ['Parasites', 'Digestion'], steps: [{ t: 'Oil', tx: 'Sana uangalifu.' }], onyo: 'Inaweza kuwa sumu.', gharama: 'Free', nguvu: 90, usalama: 40 },
  { id: 92, emoji: '🌱', name: 'Senna', latin: 'Senna alexandrina', cats: ['tumbo', 'choo'], ratibaKey: 'jumla', rating: 4.5, reviews: 500, matumizi: 'Kuharisha (laxative) kwa wenye choo kigumu.', faida: ['Constipation', 'Detox'], steps: [{ t: 'Tea', tx: 'Loweka majani.' }], onyo: 'Usitumie zaidi ya wiki 1.', gharama: 'TSh 5k', nguvu: 100, usalama: 80 },
  { id: 93, emoji: '🌳', name: 'Ginkgo Biloba', latin: 'Ginkgo biloba', cats: ['akili', 'damu', 'kumbukumbu'], ratibaKey: 'uchovu', rating: 4.9, reviews: 800, matumizi: 'Akili na kumbukumbu na mzunguko mkuu.', faida: ['Memory', 'Circulation'], steps: [{ t: 'Supplement', tx: 'Kidogo kila siku.' }], onyo: 'Blood thinner.', gharama: 'TSh 25k', nguvu: 96, usalama: 90 },
  { id: 94, emoji: '🍂', name: 'Fennel', latin: 'Foeniculum vulgare', cats: ['tumbo', 'uzazi', 'gesi'], ratibaKey: 'jumla', rating: 4.7, reviews: 200, matumizi: 'Gesi na maziwa ya mama kuongezeka.', faida: ['Gas', 'Milk'], steps: [{ t: 'Seeds', tx: 'Tafuna au chai.' }], onyo: 'None.', gharama: 'TSh 6k', nguvu: 86, usalama: 98 },
  { id: 95, emoji: '🌰', name: 'Burdock Root', latin: 'Arctium lappa', cats: ['ngozi', 'damu', 'chunusi'], ratibaKey: 'jumla', rating: 4.8, reviews: 150, matumizi: 'Ngozi safi na damu kusafishwa kabisa.', faida: ['Acne', 'Detox'], steps: [{ t: 'Root tea', tx: 'Chemsha mizizi.' }], onyo: 'None.', gharama: 'TSh 8k', nguvu: 90, usalama: 95 },
  { id: 96, emoji: '🌿', name: 'Nettle Leaf', latin: 'Urtica dioica', cats: ['lishe', 'kinga', 'nywele', 'damu'], ratibaKey: 'uchovu', rating: 4.9, reviews: 400, matumizi: 'Virutubisho vingi na kuimarisha damu.', faida: ['Iron', 'Allergies'], steps: [{ t: 'Tea', tx: 'Majani kavu.' }], onyo: 'Inawasha iko mbichi.', gharama: 'Free', nguvu: 92, usalama: 100 },
  { id: 97, emoji: '🌱', name: 'Cleavers', latin: 'Galium aparine', cats: ['damu', 'detox'], ratibaKey: 'jumla', rating: 4.4, reviews: 70, matumizi: 'Detox ya mwili na mfumo wa limfu.', faida: ['Lymph support', 'Ngozi'], steps: [{ t: 'Juice', tx: 'Juisi fresh.' }], onyo: 'None.', gharama: 'Free', nguvu: 80, usalama: 98 },
  { id: 98, emoji: '🌳', name: 'Moringa Super', latin: 'Moringa oleifera', cats: ['lishe', 'kinga', 'nguvu', 'sukari', 'damu', 'uzazi', 'akili', 'macho', 'mifupa', 'kansa', 'homa', 'maumivu', 'baling', 'pumu'], ratibaKey: 'jumla', rating: 5.0, reviews: 2000, matumizi: 'Tiba ya magonjwa 300+ ikiwemo kansa na kisukari.', faida: ['Multivitamin', 'Survival'], steps: [{ t: 'Powder', tx: 'Kijiko 1 kila siku.' }], onyo: 'None.', gharama: 'TSh 5k', nguvu: 100, usalama: 100 },
  { id: 99, emoji: '🌱', name: 'Alfalfa Powder', latin: 'Medicago sativa', cats: ['lishe', 'damu', 'mifupa'], ratibaKey: 'jumla', rating: 4.6, reviews: 150, matumizi: 'Vitamini na madini (K na Calcium).', faida: ['Vitamin K', 'Minerals'], steps: [{ t: 'Tea', tx: 'Kama mboga.' }], onyo: 'None.', gharama: 'TSh 7k', nguvu: 84, usalama: 98 },
  { id: 100, emoji: '🌿', name: 'Comfrey Root', latin: 'Symphytum officinale', cats: ['ngozi', 'mifupa'], ratibaKey: 'jumla', rating: 4.5, reviews: 80, matumizi: 'Mifupa na ngozi kupona haraka.', faida: ['Mifupa', 'Majeraha'], steps: [{ t: 'Paka', tx: 'Nje tu.' }], onyo: 'Usikunye.', gharama: 'Free', nguvu: 98, usalama: 60 },
  { id: 101, emoji: '🍃', name: 'Peppermint Leaf', latin: 'Mentha piperita', cats: ['tumbo', 'akili', 'gesi'], ratibaKey: 'uchovu', rating: 4.9, reviews: 900, matumizi: 'Gesi, tumbo na nguvu ya akili.', faida: ['Digestion', 'Focus'], steps: [{ t: 'Tea', tx: 'Loweka majani.' }], onyo: 'None.', gharama: 'Free', nguvu: 91, usalama: 100 },
  { id: 102, emoji: '🪵', name: 'Eleuthero', latin: 'Eleutherococcus senticosus', cats: ['uchovu', 'kinga', 'akili'], ratibaKey: 'uchovu', rating: 4.8, reviews: 120, matumizi: 'Uvumilivu mwili na akili.', faida: ['Stamina', 'Immunity'], steps: [{ t: 'Supplement', tx: 'Daily.' }], onyo: 'None.', gharama: 'TSh 20k', nguvu: 95, usalama: 95 },
  { id: 103, emoji: '🌿', name: 'Spearmint Tea', latin: 'Mentha spicata', cats: ['tumbo', 'hormone', 'ngozi'], ratibaKey: 'jumla', rating: 4.7, reviews: 140, matumizi: 'Homoni za wanawake na tumbo.', faida: ['Hirsutism', 'Gas'], steps: [{ t: 'Tea', tx: 'Kikombe 1.' }], onyo: 'None.', gharama: 'Free', nguvu: 80, usalama: 100 },
  { id: 104, emoji: '🌱', name: 'Rosemary Leaf', latin: 'Salvia rosmarinus', cats: ['akili', 'nywele', 'kinga', 'damu'], ratibaKey: 'uchovu', rating: 4.9, reviews: 500, matumizi: 'Kumbukumbu, nywele na mzunguko.', faida: ['Memory', 'Nywele'], steps: [{ t: 'Wash', tx: 'Suuza nywele.' }], onyo: 'None.', gharama: 'Free', nguvu: 94, usalama: 100 },
  { id: 105, emoji: '🌿', name: 'Thyme Leaf', latin: 'Thymus vulgaris', cats: ['pumu', 'kinga', 'kikohozi'], ratibaKey: 'jumla', rating: 4.8, reviews: 330, matumizi: 'Kifua, pumu na kifaduro.', faida: ['Cough', 'Koo'], steps: [{ t: 'Tea', tx: 'Majani fresh.' }], onyo: 'None.', gharama: 'Free', nguvu: 89, usalama: 100 },
  { id: 106, emoji: '🍉', name: 'Mbegu za Tikiti', latin: 'Citrullus lanatus', cats: ['nguvu', 'figo'], ratibaKey: 'nguvu', rating: 4.6, reviews: 120, matumizi: 'Figo na nguvu ya kiume.', faida: ['Kidneys', 'Stamina'], steps: [{ t: 'Poda', tx: 'Saga na kunywa.' }], onyo: 'None.', gharama: 'Free', nguvu: 85, usalama: 100 },
  { id: 107, emoji: '🥑', name: 'Avocado Seed', latin: 'Persea americana', cats: ['kinga', 'tumbo'], ratibaKey: 'jumla', rating: 4.5, reviews: 80, matumizi: 'Kinga na uvimbe.', faida: ['Anti-inflammatory', 'Immunity'], steps: [{ t: 'Saga', tx: 'Anika, saga poda.' }], onyo: 'None.', gharama: 'Free', nguvu: 82, usalama: 95 },
  { id: 108, emoji: '🥭', name: 'Mango Leaf', latin: 'Mangifera indica', cats: ['sukari', 'damu'], ratibaKey: 'jumla', rating: 4.7, reviews: 60, matumizi: 'Kisukari na shinikizo.', faida: ['Diabetes', 'BP'], steps: [{ t: 'Tea', tx: 'Chemsha majani laini.' }], onyo: 'None.', gharama: 'Free', nguvu: 87, usalama: 100 },
  { id: 109, emoji: '🍋', name: 'Lemon Grass', latin: 'Cymbopogon', cats: ['akili', 'tumbo', 'homa'], ratibaKey: 'usingizi', rating: 4.8, reviews: 200, matumizi: 'Homa na utulivu.', faida: ['Fever', 'Relax'], steps: [{ t: 'Tea', tx: 'Chemsha.' }], onyo: 'None.', gharama: 'Free', nguvu: 84, usalama: 100 },
  { id: 110, emoji: '☕', name: 'Green Coffee', latin: 'Coffea arabica', cats: ['uchovu', 'lishe', 'cholesterol'], ratibaKey: 'uchovu', rating: 4.7, reviews: 150, matumizi: 'Kupunguza uzito na nishati.', faida: ['Weight loss', 'Energy'], steps: [{ t: 'Tea', tx: 'Mbegu zisizokaangwa.' }], onyo: 'Caffeine.', gharama: 'TSh 10k', nguvu: 90, usalama: 92 },
];
