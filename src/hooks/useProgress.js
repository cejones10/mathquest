import { useState, useCallback } from 'react';
import { progress } from '../utils/storage';

export function useProgress() {
  const [, setTick] = useState(0);
  const refresh = useCallback(() => setTick(t => t + 1), []);

  const markLessonComplete = useCallback((id) => {
    progress.markLessonComplete(id);
    progress.recordActivity();
    refresh();
  }, [refresh]);

  const updateLessonBlock = useCallback((id, blockIndex) => {
    progress.setLessonProgress(id, { lastBlock: blockIndex, startedAt: progress.getLessonProgress(id).startedAt || Date.now() });
    progress.recordActivity();
    refresh();
  }, [refresh]);

  const recordProblem = useCallback((id, result) => {
    progress.recordProblemAttempt(id, result);
    progress.recordActivity();
    refresh();
  }, [refresh]);

  return {
    getLessonProgress: progress.getLessonProgress.bind(progress),
    getAllLessonProgress: progress.getAllLessonProgress.bind(progress),
    getProblemHistory: progress.getProblemHistory.bind(progress),
    getAllProblemHistory: progress.getAllProblemHistory.bind(progress),
    getStats: progress.getStats.bind(progress),
    getStreak: progress.getStreak.bind(progress),
    markLessonComplete,
    updateLessonBlock,
    recordProblem,
  };
}
