import { storage } from './storage';

// SM-2 algorithm implementation
// quality: 0-5 (0=complete blackout, 5=perfect recall)
function sm2(item, quality) {
  let { easeFactor = 2.5, interval = 1, repetitions = 0 } = item;

  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 3;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  return {
    easeFactor,
    interval,
    repetitions,
    nextReview: Date.now() + interval * 86400000,
    lastReview: Date.now(),
  };
}

const SR_KEY = 'spacedRepetition';

export const spacedRepetition = {
  getAll() {
    return storage.get(SR_KEY, {});
  },

  getItem(id) {
    const all = this.getAll();
    return all[id] || null;
  },

  addItem(id, { type, track, topic, question, answer }) {
    const all = this.getAll();
    if (all[id]) return; // already exists
    all[id] = {
      type, // 'concept', 'problem', 'theorem'
      track,
      topic,
      question,
      answer,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReview: Date.now(), // due immediately
      lastReview: null,
      created: Date.now(),
    };
    storage.set(SR_KEY, all);
  },

  reviewItem(id, quality) {
    const all = this.getAll();
    if (!all[id]) return;
    const updated = sm2(all[id], quality);
    all[id] = { ...all[id], ...updated };
    storage.set(SR_KEY, all);
    return all[id];
  },

  getDueItems() {
    const all = this.getAll();
    const now = Date.now();
    return Object.entries(all)
      .filter(([, item]) => item.nextReview <= now)
      .map(([id, item]) => ({ id, ...item }))
      .sort((a, b) => a.nextReview - b.nextReview);
  },

  getDueCount() {
    return this.getDueItems().length;
  },

  getStats() {
    const all = this.getAll();
    const items = Object.values(all);
    const total = items.length;
    const due = items.filter(i => i.nextReview <= Date.now()).length;
    const mastered = items.filter(i => i.repetitions >= 5).length;
    const learning = items.filter(i => i.repetitions > 0 && i.repetitions < 5).length;

    return { total, due, mastered, learning, newItems: total - mastered - learning };
  },
};
