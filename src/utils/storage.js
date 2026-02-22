const STORAGE_KEY = 'mathquest_';

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(STORAGE_KEY + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_KEY + key, JSON.stringify(value));
    } catch (e) {
      console.warn('localStorage write failed:', e);
    }
  },

  remove(key) {
    localStorage.removeItem(STORAGE_KEY + key);
  },
};

// Progress tracking
export const progress = {
  getLessonProgress(lessonId) {
    const all = storage.get('lessonProgress', {});
    return all[lessonId] || { completed: false, lastBlock: 0, startedAt: null, completedAt: null };
  },

  setLessonProgress(lessonId, data) {
    const all = storage.get('lessonProgress', {});
    all[lessonId] = { ...all[lessonId], ...data };
    storage.set('lessonProgress', all);
  },

  markLessonComplete(lessonId) {
    this.setLessonProgress(lessonId, { completed: true, completedAt: Date.now() });
  },

  getProblemHistory(problemId) {
    const all = storage.get('problemHistory', {});
    return all[problemId] || { attempts: 0, solved: false, hintsUsed: 0, lastAttempt: null };
  },

  recordProblemAttempt(problemId, { solved, hintsUsed }) {
    const all = storage.get('problemHistory', {});
    const prev = all[problemId] || { attempts: 0, solved: false, hintsUsed: 0 };
    all[problemId] = {
      attempts: prev.attempts + 1,
      solved: solved || prev.solved,
      hintsUsed: Math.max(prev.hintsUsed, hintsUsed),
      lastAttempt: Date.now(),
    };
    storage.set('problemHistory', all);
  },

  getStreak() {
    const data = storage.get('streak', { current: 0, lastActive: null, best: 0 });
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (data.lastActive === today) return data;
    if (data.lastActive === yesterday) return data; // streak intact, not yet updated today
    if (data.lastActive && data.lastActive !== today && data.lastActive !== yesterday) {
      // streak broken
      return { current: 0, lastActive: data.lastActive, best: data.best };
    }
    return data;
  },

  recordActivity() {
    const data = this.getStreak();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (data.lastActive === today) return data;

    let newStreak;
    if (data.lastActive === yesterday) {
      newStreak = data.current + 1;
    } else {
      newStreak = 1;
    }

    const updated = {
      current: newStreak,
      lastActive: today,
      best: Math.max(newStreak, data.best),
    };
    storage.set('streak', updated);
    return updated;
  },

  getAllLessonProgress() {
    return storage.get('lessonProgress', {});
  },

  getAllProblemHistory() {
    return storage.get('problemHistory', {});
  },

  getStats() {
    const lessons = this.getAllLessonProgress();
    const problems = this.getAllProblemHistory();
    const streak = this.getStreak();

    const completedLessons = Object.values(lessons).filter(l => l.completed).length;
    const solvedProblems = Object.values(problems).filter(p => p.solved).length;
    const totalAttempts = Object.values(problems).reduce((s, p) => s + p.attempts, 0);

    return { completedLessons, solvedProblems, totalAttempts, streak };
  },
};
