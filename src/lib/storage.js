export const STORAGE_KEYS = {
  habits: "habit-city-mvp:habits",
  habitChecks: "habit-city-mvp:habit-checks",
  growthLogs: "habit-city-mvp:growth-logs",
};

const now = new Date().toISOString();

export const initialHabits = [
  { id: "habit-morning", name: "朝のルーティーン", createdAt: now },
  { id: "habit-training", name: "トレーニング", createdAt: now },
  { id: "habit-study", name: "勉強", createdAt: now },
  { id: "habit-review", name: "振り返り", createdAt: now },
  { id: "habit-sleep", name: "睡眠準備", createdAt: now },
];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson(key, fallback) {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

/** @returns {import("../types/index.js").Habit[]} */
export function loadHabits() {
  const habits = readJson(STORAGE_KEYS.habits, null);
  return Array.isArray(habits) && habits.length > 0 ? habits : initialHabits;
}

/** @returns {import("../types/index.js").HabitCheck[]} */
export function loadHabitChecks() {
  const checks = readJson(STORAGE_KEYS.habitChecks, []);
  return Array.isArray(checks) ? checks : [];
}

/** @returns {import("../types/index.js").GrowthLog[]} */
export function loadGrowthLogs() {
  const logs = readJson(STORAGE_KEYS.growthLogs, []);
  return Array.isArray(logs) ? logs : [];
}

export function saveHabits(habits) {
  writeJson(STORAGE_KEYS.habits, habits);
}

export function saveHabitChecks(checks) {
  writeJson(STORAGE_KEYS.habitChecks, checks);
}

export function saveGrowthLogs(logs) {
  writeJson(STORAGE_KEYS.growthLogs, logs);
}
