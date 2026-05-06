import {
  BarChart3,
  Bot,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Crown,
  Gift,
  Headphones,
  Home,
  Leaf,
  LineChart,
  MapPinned,
  RefreshCcw,
  ShieldCheck,
  Sprout,
  Star,
  Target,
  Trophy,
} from "lucide-react";

const assetBase = "/assets/michimachi";
const proAssetBase = "/assets/pro-detail";

export const proAssets = {
  heroTown: `${assetBase}/city-main-display.png`,
  heroHarbor: `${assetBase}/city-harbor-display.png`,
  heroHill: `${assetBase}/city-hill-clean.png`,
  station: `${assetBase}/city-station.png`,
  workshop: `${assetBase}/workshop.png`,
  townCluster: `${proAssetBase}/town-cluster.png`,
  routeFlags: `${proAssetBase}/route-flags.png`,
  robot: `${proAssetBase}/ai-robot.png`,
  shop: `${proAssetBase}/shop-awning.png`,
  goalHouse: `${proAssetBase}/goal-house.png`,
  townStrip: `${proAssetBase}/town-strip.png`,
};

export const headerLinks = [
  { label: "Proでできること", href: "#pro-capabilities" },
  { label: "比較", href: "#pro-compare" },
  { label: "料金", href: "#pro-pricing" },
  { label: "FAQ", href: "#pro-faq" },
];

export const heroHighlights = [
  "複数の目標",
  "無制限ルート",
  "詳細な週次AIレビュー",
];

export const dashboardNav = [
  { label: "ホーム", icon: Home },
  { label: "分析", icon: BarChart3 },
  { label: "目標", icon: Target },
  { label: "振り返り", icon: ClipboardCheck },
  { label: "Pro", icon: Star, active: true },
];

export const dashboardInsights = [
  {
    title: "詳細な週次AIレビュー",
    text: "行動ログや止まったポイントを分析し、改善点を次の一手と具体的な提案にします。",
    icon: LineChart,
    tone: "green",
  },
  {
    title: "GO / PIVOT / KILL 提案",
    text: "分析結果をもとに、最適な次のアクションをGO / PIVOT / KILLとして提案します。",
    icon: RefreshCcw,
    tone: "amber",
  },
  {
    title: "KPI・詰まりポイント分析",
    text: "達成率や停滞の原因を可視化し、詰まりポイントを特定します。",
    icon: BarChart3,
    tone: "green",
  },
];

export const weeklyKpis = [
  { day: "月", active: true },
  { day: "火", active: true },
  { day: "水", active: true },
  { day: "木", active: true },
  { day: "金", active: false },
  { day: "土", active: false },
  { day: "日", active: false },
];

export const dashboardTasks = [
  { label: "読書", detail: "週5日・20分" },
  { label: "リスニング", detail: "週5日・20分", icon: Headphones },
  { label: "過去問", detail: "週2日・25分" },
];

export const capabilityCards = [
  {
    badge: "Pro特典",
    title: "複数の街",
    text: "仕事・学習・運動など、複数の目標をそれぞれの街として育てられます。切り替えながら、同時に育てられます。",
    icon: Target,
    image: proAssets.townCluster,
    imageAlt: "複数の目標を表す街並み",
  },
  {
    badge: "Pro特典",
    title: "ルート無制限",
    text: "6週間ルートを何度でも作成可能。試して、見直して、納得いくまで改善を続けられます。",
    icon: MapPinned,
    image: proAssets.routeFlags,
    imageAlt: "曲がり道と道しるべ",
  },
  {
    badge: "Pro特典",
    title: "自分用にAI調整",
    text: "あなたの記録をもとに、AIが最適なアドバイスを提案。週次レビューで、次の一歩を一緒に更新します。",
    icon: Bot,
    image: proAssets.robot,
    imageAlt: "AI調整を表すデスク",
  },
];

export const comparisonRows = [
  { label: "作れる街", icon: CalendarCheck, free: "1つ", pro: "複数" },
  { label: "6週間ルート", icon: MapPinned, free: "1つ", pro: "無制限" },
  { label: "毎日の記録", icon: ClipboardCheck, free: true, pro: true },
  { label: "週次AIレビュー", icon: Bot, free: "簡単レビュー", pro: "詳細レビュー" },
  { label: "KPI・詰まり分析", icon: BarChart3, free: false, pro: true },
  { label: "次スプリント提案", icon: Star, free: false, pro: true },
  { label: "共有の街を見る", icon: Headphones, free: true, pro: true },
  { label: "共有の街を参考にする", icon: Leaf, free: true, pro: true },
  { label: "自分用にAI調整", icon: Bot, free: false, pro: true },
  { label: "似ている街の推薦", icon: Gift, free: false, pro: true },
];

export const pricingPlans = [
  {
    title: "先行登録者価格",
    price: "6,800",
    unit: "/年",
    label: "リリース前限定",
    featured: true,
    image: proAssets.townStrip,
    imageAlt: "先行登録者価格の街アイテム",
    features: ["通常予定より3,000円お得", "登録している限り、この価格が続きます。"],
    cta: "先行価格を受け取る",
  },
  {
    title: "月額プラン",
    price: "980",
    unit: "/月",
    image: proAssets.shop,
    imageAlt: "月額プランの街アイテム",
    features: ["正式リリース後の通常月額", "必要なときだけ使えます。"],
  },
  {
    title: "年額プラン",
    price: "9,800",
    unit: "/年",
    label: "通常価格",
    image: proAssets.goalHouse,
    imageAlt: "年額プランの街アイテム",
    features: ["一括でお得なプランです", "いつでも解約できます"],
  },
];

export const faqItems = [
  {
    question: "無料でも使えますか？",
    answer: "はい。最初の街、記録、簡単な週次AIレビュー、共有の街は無料で使えます。",
    icon: Sprout,
  },
  {
    question: "先行登録すると課金されますか？",
    answer: "いいえ。先行登録は価格の予約です。Proを使う時まで課金されません。",
    icon: Gift,
  },
  {
    question: "先行登録者価格は続きますか？",
    answer: "はい。登録している限り、ずっと¥6,800 / 年です。",
    icon: Trophy,
  },
  {
    question: "いつでも解約できますか？",
    answer: "はい。Proはいつでも解約できます。解約後も、次回更新日まではPro機能を使えます。",
    icon: ShieldCheck,
  },
];

export const proBadges = {
  crown: Crown,
  check: Check,
};
