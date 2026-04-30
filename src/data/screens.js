import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  Coffee,
  Flag,
  Hammer,
  Home,
  LampDesk,
  MapPinned,
  Mic,
  PackageCheck,
  Route,
  Sprout,
  Users,
} from "lucide-react";

export const assetPaths = {
  cityMain: "/assets/generated/city-main.png",
  workshop: "/assets/generated/workshop.png",
  harbor: "/assets/generated/city-thumb-harbor.png",
  hill: "/assets/generated/city-thumb-hill.png",
  station: "/assets/generated/city-thumb-station.png",
  construction: "/assets/generated/construction-work.png",
  constructionSign: "/assets/generated/construction-sign.png",
};

export const mainTabs = [
  { id: "city", label: "街", title: "街", icon: Home },
  { id: "today", label: "今日", title: "今日", icon: CalendarDays },
  { id: "build", label: "つくる", title: "つくる", icon: Hammer },
  { id: "community", label: "みんな", title: "みんなの街", icon: Users },
  { id: "advice", label: "相談", title: "相談", icon: MapPinned },
];

export const cityScreen = {
  goal: "英語で話せる街",
  stats: [
    { label: "灯り", value: 12, tone: "minimum" },
    { label: "道", value: 8, tone: "normal" },
    { label: "設備", value: 5, tone: "prepare" },
  ],
  recent: [
    { label: "最近つながった道", value: "3分だけ音読", icon: Route },
    { label: "新しい設備", value: "教材を机に置く", icon: PackageCheck },
  ],
};

export const todayScreen = {
  prompt: "今日はどこまで道がつながった？",
  options: [
    {
      id: "off",
      title: "つながらなかった",
      action: "今日は休んでも",
      note: "大丈夫です。",
      image: assetPaths.constructionSign,
      tone: "disconnected",
    },
    {
      id: "minimum",
      title: "最低条件",
      action: "3分だけ音読",
      note: "気軽に続けられる一歩。",
      image: assetPaths.hill,
      tone: "minimum",
    },
    {
      id: "normal",
      title: "通常行動",
      action: "15分シャドーイング",
      note: "いつものリズムで進もう。",
      image: assetPaths.cityMain,
      tone: "normal",
    },
    {
      id: "stretch",
      title: "伸ばす行動",
      action: "1フレーズ録音",
      note: "もう少し先の景色へ。",
      image: assetPaths.harbor,
      tone: "stretch",
    },
  ],
};

export const buildScreen = {
  chain: [
    { label: "ゴール", text: "英語で会話を楽しむ", icon: Flag, tone: "primary" },
    { label: "トリガー", text: "朝のコーヒー後", icon: Coffee, tone: "minimum" },
    { label: "最低条件", text: "3分だけ音読", icon: Sprout, tone: "minimum" },
    { label: "通常行動", text: "15分練習", icon: BookOpen, tone: "normal" },
    { label: "伸ばす行動", text: "録音して聞く", icon: Mic, tone: "stretch" },
    { label: "環境準備", text: "教材を机に置く", icon: LampDesk, tone: "prepare" },
    { label: "困難メモ", text: "夜は疲れやすい", icon: ClipboardList, tone: "difficulty" },
  ],
};

export const communityScreen = {
  lead: "設計を見に行く",
  towns: [
    {
      name: "朝ランの港町",
      image: assetPaths.harbor,
      tags: ["最低条件", "環境準備", "工事記録"],
    },
    {
      name: "読書の坂道",
      image: assetPaths.hill,
      tags: ["最低条件", "環境準備", "工事記録"],
    },
    {
      name: "資格勉強の駅前",
      image: assetPaths.station,
      tags: ["最低条件", "環境準備", "工事記録"],
    },
  ],
};

export const adviceScreen = {
  memoTitle: "街の設計メモ",
  memos: [
    {
      title: "最近つながらない日が続いています。",
      body: "最低条件を半分にすると、道が戻りやすそうです。",
      image: assetPaths.constructionSign,
      highlight: "最低条件",
    },
    {
      title: "準備がある日は",
      body: "通常行動まで進みやすいようです。",
      image: assetPaths.workshop,
      highlight: "準備がある日は",
    },
  ],
  records: [
    { text: "時間帯を朝に変更", date: "5/18", icon: ClipboardList },
    { text: "教材を前日に準備", date: "5/16", icon: PackageCheck },
  ],
};

export const mainScreens = {
  city: cityScreen,
  today: todayScreen,
  build: buildScreen,
  community: communityScreen,
  advice: adviceScreen,
};
