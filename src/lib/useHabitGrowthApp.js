import { useEffect, useMemo, useState } from "react";
import { addDays, getTodayString, sortByDateDesc } from "./date";
import {
  loadGrowthLogs,
  loadHabitChecks,
  loadHabits,
  saveGrowthLogs,
  saveHabitChecks,
  saveHabits,
} from "./storage";

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function calculateStreak(habits, checks, logs, today) {
  const activeHabitIds = new Set(habits.map((habit) => habit.id));
  const activeLogs = new Set(logs.map((log) => log.date));
  let cursor = today;
  let streak = 0;

  while (true) {
    const hasCompletedHabit = checks.some(
      (check) => check.date === cursor && activeHabitIds.has(check.habitId) && check.completed,
    );
    const hasLog = activeLogs.has(cursor);

    if (!hasCompletedHabit && !hasLog) break;
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

export function useHabitGrowthApp() {
  const today = getTodayString();
  const [habits, setHabits] = useState(loadHabits);
  const [checks, setChecks] = useState(loadHabitChecks);
  const [logs, setLogs] = useState(loadGrowthLogs);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  useEffect(() => {
    saveHabitChecks(checks);
  }, [checks]);

  useEffect(() => {
    saveGrowthLogs(logs);
  }, [logs]);

  const todayCompletedIds = useMemo(() => {
    return new Set(
      checks
        .filter((check) => check.date === today && check.completed)
        .map((check) => check.habitId),
    );
  }, [checks, today]);

  const completedCount = habits.filter((habit) => todayCompletedIds.has(habit.id)).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;
  const sortedLogs = useMemo(() => [...logs].sort(sortByDateDesc), [logs]);
  const todaysLog = logs.find((log) => log.date === today);
  const streak = useMemo(() => calculateStreak(habits, checks, logs, today), [habits, checks, logs, today]);

  function toggleHabit(habitId) {
    setChecks((currentChecks) => {
      const existing = currentChecks.find((check) => check.date === today && check.habitId === habitId);

      if (existing) {
        return currentChecks.map((check) =>
          check.date === today && check.habitId === habitId
            ? { ...check, completed: !check.completed }
            : check,
        );
      }

      return [...currentChecks, { date: today, habitId, completed: true }];
    });
  }

  function addHabit(name) {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setHabits((currentHabits) => [
      ...currentHabits,
      { id: makeId("habit"), name: trimmedName, createdAt: new Date().toISOString() },
    ]);
  }

  function deleteHabit(habitId) {
    setHabits((currentHabits) => currentHabits.filter((habit) => habit.id !== habitId));
    setChecks((currentChecks) => currentChecks.filter((check) => check.habitId !== habitId));
  }

  function saveLog(fields) {
    const nextLog = {
      id: todaysLog?.id ?? makeId("log"),
      date: today,
      done: fields.done.trim(),
      insight: fields.insight.trim(),
      nextAction: fields.nextAction.trim(),
      createdAt: todaysLog?.createdAt ?? new Date().toISOString(),
    };

    setLogs((currentLogs) => {
      const withoutToday = currentLogs.filter((log) => log.date !== today);
      return [nextLog, ...withoutToday].sort(sortByDateDesc);
    });
  }

  return {
    today,
    habits,
    checks,
    logs: sortedLogs,
    todaysLog,
    stats: {
      completionRate,
      completedCount,
      totalHabits,
      streak,
      logCount: logs.length,
    },
    todayCompletedIds,
    actions: {
      addHabit,
      deleteHabit,
      saveLog,
      toggleHabit,
    },
  };
}
