import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Coffee,
  Dumbbell,
  Globe,
  Headphones,
  Leaf,
  MapPin,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

const assetBase = '/assets/michimachi';
const sharedAssetBase = '/assets/shared-flow';

export const sfUsers = {
  haru: { name: 'haru', initial: 'は', bio: '朝に英語へ無駄のない道を育てています。' },
  mika: { name: 'mika', initial: 'み', bio: '運動を習慣にしたくて、街を作りました。' },
  sota: { name: 'sota', initial: 'そ', bio: '資格取得を目指して継続中です。' },
  nana: { name: 'nana', initial: 'な', bio: '片付けを毎日続けるための街です。' },
  ren:  { name: 'ren',  initial: 'れ', bio: '読書習慣を作っています。' },
  yui:  { name: 'yui',  initial: 'ゆ', bio: '朝コーヒーと一緒に習慣を作る。' },
};

export const sfTowns = [
  {
    id: 'town-haru-english',
    title: '朝の英語ルート',
    image: `${assetBase}/city-main-display.png`,
    user: sfUsers.haru,
    category: '英語',
    categoryIcon: Globe,
    tags: ['チェーン', '最低条件', '環境整備'],
    chain: '起きる → 水を飲む → 英語を聞く → 1問だけ',
    minAction: '英語アプリを開いて聞くだけ',
    stats: { reach: 128, days: 42, avgTime: 37 },
    stuckPoints: [
      { label: '道の繋がりが薄い日', pct: 42 },
      { label: '休日の出だし', pct: 23 },
      { label: '遅れてる日', pct: 18 },
      { label: '予定が崩れた日', pct: 17 },
    ],
    fixes: [
      '夜の学習をやめて、朝に固定。初の学びが少しずつ繋がりやすくなった',
      'コーヒー配置リセット。起きる→コーヒー→英語の流れに',
      'アプリを1ページ目に配置。迷わずに開いて聞けるようになった',
    ],
    adaptPoints: [
      { title: '朝のルートを決める', text: '最初に、道を決めないでいることも大切です。' },
      { title: '言葉ではなく、動きに慣れる', text: '音読よりも、アプリを開く動作から始めます。' },
      { title: '止まった場所を繋げる', text: '詰まったら場所を変えて、流れを作ります。' },
    ],
    sixWeekRate: 81,
    weeklyData: [1, 3, 4, 5, 4, 2, 4],
  },
  {
    id: 'town-mika-gym',
    title: '早朝ジムルート',
    image: `${assetBase}/city-station.png`,
    user: sfUsers.mika,
    category: '運動',
    categoryIcon: Dumbbell,
    tags: ['早起き', '準備', '最低条件'],
    chain: '起きる → 着替える → ジムへ → 10分だけ',
    minAction: 'ウェアを着るだけ',
    stats: { reach: 89, days: 35, avgTime: 52 },
    stuckPoints: [
      { label: '天気が悪い日', pct: 38 },
      { label: '前夜が遅かった日', pct: 31 },
      { label: '準備が面倒な日', pct: 21 },
      { label: '休日の朝', pct: 10 },
    ],
    fixes: [
      '前日にウェアを枕元に置く。目が覚めたらすぐ着替えられる',
      'ジムを近い方に変えた。移動コストが半分になった',
      '10分だけ OK ルール。行ったらほぼ続けられる',
    ],
    adaptPoints: [
      { title: 'ウェアを先に出す', text: '着替えの手間を最小化する。' },
      { title: '10分ルールを作る', text: 'とにかく行くことを目標にする。' },
      { title: '前夜に準備する', text: '朝の意志力を使わない設計。' },
    ],
    sixWeekRate: 74,
    weeklyData: [2, 3, 3, 4, 3, 2, 3],
  },
  {
    id: 'town-sota-license',
    title: '資格勉強ルート',
    image: `${assetBase}/city-hill-clean.png`,
    user: sfUsers.sota,
    category: '資格',
    categoryIcon: Trophy,
    tags: ['集中', '過去問', '毎日記録'],
    chain: '起きる → コーヒー → テキスト1ページ → 過去問1問',
    minAction: 'テキストを開くだけ',
    stats: { reach: 67, days: 28, avgTime: 45 },
    stuckPoints: [
      { label: '難しい問題に当たった日', pct: 44 },
      { label: '仕事が忙しい日', pct: 28 },
      { label: '眠い朝', pct: 20 },
      { label: '週末', pct: 8 },
    ],
    fixes: [
      '難問はスキップして後回し。止まらない流れを作る',
      '15分タイマーを使う。終わりが見えると始めやすい',
      '寝る前にテキストを机に置く。朝の準備ゼロ',
    ],
    adaptPoints: [
      { title: 'まず1ページだけ', text: '量を決めすぎないことが続くコツ。' },
      { title: 'タイマーで終わりを作る', text: '15分で十分な日もある。' },
      { title: '難問はとばす', text: '流れを止めないことが最重要。' },
    ],
    sixWeekRate: 69,
    weeklyData: [2, 3, 4, 3, 4, 2, 3],
  },
  {
    id: 'town-nana-tidy',
    title: '片付け5分ルート',
    image: `${assetBase}/workshop.png`,
    user: sfUsers.nana,
    category: '片付け',
    categoryIcon: Star,
    tags: ['短時間', '場所固定', '継続'],
    chain: '起きる → 洗面 → 机の上だけ → OK',
    minAction: '机の上を1箇所だけ',
    stats: { reach: 54, days: 31, avgTime: 8 },
    stuckPoints: [
      { label: '疲れた夜', pct: 50 },
      { label: '散らかりがひどい日', pct: 28 },
      { label: '時間がない日', pct: 22 },
    ],
    fixes: [
      '5分タイマー厳守。終わりが決まると始められる',
      '場所を1箇所に固定。机の上だけを毎日やる',
      '夜ではなく朝にした。疲れてなくてできる',
    ],
    adaptPoints: [
      { title: '1箇所だけに絞る', text: '全部やろうとしないことが大事。' },
      { title: 'タイマー5分', text: '5分経ったら強制終了 OK。' },
      { title: '朝にやる', text: '夜は疲れているので、朝の方が続く。' },
    ],
    sixWeekRate: 77,
    weeklyData: [3, 4, 4, 5, 4, 3, 4],
  },
  {
    id: 'town-ren-reading',
    title: '読書10分ルート',
    image: `${assetBase}/city-harbor.png`,
    user: sfUsers.ren,
    category: '読書',
    categoryIcon: BookOpen,
    tags: ['10分', '習慣化', '場所'],
    chain: '起きる → お茶 → 本を開く → 10分',
    minAction: '本を開くだけ',
    stats: { reach: 43, days: 24, avgTime: 14 },
    stuckPoints: [
      { label: '本の内容が難しい日', pct: 40 },
      { label: '眠い朝', pct: 32 },
      { label: '忙しい日', pct: 28 },
    ],
    fixes: [
      '読む場所を固定。毎朝同じ椅子に座る',
      '難しければ別の本に切り替える',
      '10ページではなく10分に変えた',
    ],
    adaptPoints: [
      { title: '時間で区切る', text: 'ページ数より時間の方が続きやすい。' },
      { title: '場所を固定する', text: 'その場所に座ったら始まる設計。' },
      { title: '本を切り替える', text: '難しすぎたら別の本でいい。' },
    ],
    sixWeekRate: 65,
    weeklyData: [2, 3, 3, 4, 3, 2, 2],
  },
  {
    id: 'town-yui-coffee',
    title: '朝コーヒー習慣',
    image: `${assetBase}/city-harbor-display.png`,
    user: sfUsers.yui,
    category: 'その他',
    categoryIcon: Coffee,
    tags: ['朝ルーティン', '気分', '継続'],
    chain: '起きる → コーヒーを淹れる → 5分座る → 今日を決める',
    minAction: 'コーヒーを淹れるだけ',
    stats: { reach: 38, days: 19, avgTime: 10 },
    stuckPoints: [
      { label: '急いでいる朝', pct: 55 },
      { label: '外泊した日', pct: 28 },
      { label: '体調が悪い日', pct: 17 },
    ],
    fixes: [
      '豆を前夜に挽いておく。朝の手間を最小化',
      '5分座るだけでOK。コーヒーを飲み切らなくてよい',
      'インスタントでも OK ルール。形式にこだわらない',
    ],
    adaptPoints: [
      { title: '前夜に準備する', text: '朝の手間を0にする設計。' },
      { title: '5分だけ座る', text: '何もしなくていい。ただ座るだけ。' },
      { title: '代替手段を決める', text: 'できない日の代わりを先に決めておく。' },
    ],
    sixWeekRate: 72,
    weeklyData: [3, 3, 4, 3, 4, 3, 3],
  },
];

export const sfPopularTowns = sfTowns.map((town, i) => ({
  ...town,
  rank: i + 1,
  weeklyGrowth: [28, 22, 18, 14, 12, 8][i] ?? 6,
}));

export const sfSavedTowns = sfTowns.slice(0, 4).map((town, i) => ({
  ...town,
  savedDate: `${i * 2 + 1}日前`,
}));

export const sfEnglishTowns = sfTowns.filter((t) => t.category === '英語');

export const sfEnglishTips = [
  { icon: Headphones, label: 'まず聞くだけから', text: '読む・書くより、聞く習慣が最も続きやすい入り口です。' },
  { icon: MapPin, label: '場所を決める', text: '毎朝同じ場所で英語に触れると、場所がトリガーになります。' },
  { icon: Zap, label: '1問だけルール', text: '「1問だけ」と決めると始めやすく、始めたら続けられます。' },
  { icon: Calendar, label: '週1回振り返る', text: '週に1回だけ、止まった日を確認して次の道を調整します。' },
];

export const sfAdaptItems = [
  { key: 'chain', label: 'チェーン（行動の連鎖）', checked: true },
  { key: 'water', label: '水を飲む', checked: true },
  { key: 'minAction', label: '最低行動（1問だけ）', checked: true },
  { key: 'environment', label: '環境整備（アプリ配置）', checked: false },
];

export const sfAdaptSteps = [
  { label: '選ぶ', desc: '取り入れるものを選ぶ' },
  { label: '調整', desc: '自分仕様に調整する' },
  { label: '追加', desc: '自分の街に追加する' },
];

export const sfImportedData = {
  beforeTown: { image: `${assetBase}/city-main-display.png`, label: 'haru さんの街' },
  afterTown:  { image: `${assetBase}/city-main.png`, label: 'あなたの街' },
  addedFeatures: ['チェーンの橋', '最低条件の灯台', '環境整備の倉庫'],
  todayStep: {
    label: '英語アプリを開いて、1問だけ解く',
    detail: '今日の最初の一歩は、アプリを開くだけで十分です。始めたら続けられます。',
  },
};

export const sfHaruProfile = {
  user: sfUsers.haru,
  stats: { public: 4, streak: 42, followers: 128 },
  featuredTown: sfTowns[0],
  otherTowns: sfTowns.slice(1, 4),
  lessons: [
    { icon: Leaf, title: '小さく始める', text: '1個だけ、1つの行動に絞ると、続けやすくなります。' },
    { icon: Target, title: '言葉ではなく動きで掴む', text: '音読よりも、アプリを開く動作から始めます。' },
    { icon: MapPin, title: '止まった場所を繋げる', text: '詰まった場所を変えることで、流れが生まれます。' },
  ],
  history: [
    { date: '4月14日', action: '夜の学習から朝に変更', detail: '夜は疲れて続かなかったので、朝に切り替えました。' },
    { date: '4月5日',  action: '1問だけを最低条件に', detail: '量を減らしたら、やらない日がほぼなくなりました。' },
    { date: '3月22日', action: 'アプリをホーム画面へ', detail: '開くまでのステップを1つ減らしました。' },
  ],
  about: { role: '会社員', learning: '英語学習 1年8ヶ月', goal: '英検2級取得' },
};

export const sfCategoryTags = [
  { label: '英語', active: true },
  { label: '単語', active: false },
  { label: 'リスニング', active: false },
  { label: '英会話', active: false },
  { label: '資格', active: false },
];

export const sfLibrarySidebarFeatures = [
  '続けやすいチェーンの組み方',
  '止まった理由の見つけ方',
  '最低条件の決め方',
  '環境整備の具体例',
];

export const sfPopularSidebarItems = sfTowns.slice(0, 5).map((t, i) => ({
  rank: i + 1,
  title: t.title,
  user: t.user,
  growth: [28, 22, 18, 14, 12][i],
}));
