import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spacedRepetition } from '../../utils/spacedRepetition';
import MathText from '../Shared/MathText';

const qualityButtons = [
  { quality: 1, label: 'Forgot', color: 'bg-danger hover:bg-danger/85', desc: 'No idea' },
  { quality: 3, label: 'Hard', color: 'bg-warning hover:bg-warning/85', desc: 'Struggled' },
  { quality: 4, label: 'Good', color: 'bg-accent hover:bg-accent-hover', desc: 'With effort' },
  { quality: 5, label: 'Easy', color: 'bg-success hover:bg-success/85', desc: 'Instant' },
];

export default function ReviewQueue() {
  const [dueItems, setDueItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, easy: 0, hard: 0, forgot: 0 });

  useEffect(() => {
    setDueItems(spacedRepetition.getDueItems());
  }, []);

  const srStats = spacedRepetition.getStats();
  const current = dueItems[currentIndex];
  const remaining = dueItems.length - currentIndex;

  const handleReview = (quality) => {
    spacedRepetition.reviewItem(current.id, quality);
    setSessionStats(prev => ({
      reviewed: prev.reviewed + 1,
      easy: prev.easy + (quality >= 4 ? 1 : 0),
      hard: prev.hard + (quality === 3 ? 1 : 0),
      forgot: prev.forgot + (quality < 3 ? 1 : 0),
    }));
    setShowAnswer(false);
    setCurrentIndex(i => i + 1);
  };

  if (!current) {
    return (
      <div className="max-w-[600px] mx-auto">
        <h1 className="text-[2.2rem] font-medium text-text mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
          Spaced Review
        </h1>

        {sessionStats.reviewed > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 bg-surface border border-border/60 rounded-lg text-center"
          >
            <h2 className="text-[1.4rem] font-medium text-text" style={{ fontFamily: 'var(--font-heading)' }}>Session Complete</h2>
            <p className="text-text-secondary mt-2" style={{ fontFamily: 'var(--font-body)' }}>
              You reviewed {sessionStats.reviewed} card{sessionStats.reviewed !== 1 ? 's' : ''}.
            </p>
            <div className="flex justify-center gap-8 mt-4 text-sm" style={{ fontFamily: 'var(--font-ui)' }}>
              <span className="text-success">Easy: {sessionStats.easy}</span>
              <span className="text-warning">Hard: {sessionStats.hard}</span>
              <span className="text-danger">Forgot: {sessionStats.forgot}</span>
            </div>
          </motion.div>
        ) : (
          <div className="p-10 bg-surface border border-border/60 rounded-lg text-center">
            <h2 className="text-[1.4rem] font-medium text-text" style={{ fontFamily: 'var(--font-heading)' }}>All caught up</h2>
            <p className="text-text-secondary mt-2" style={{ fontFamily: 'var(--font-body)' }}>
              No cards due for review. Complete more lessons to add review items.
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Total Cards', value: srStats.total, color: 'text-text' },
            { label: 'Mastered', value: srStats.mastered, color: 'text-success' },
            { label: 'Learning', value: srStats.learning, color: 'text-warning' },
          ].map(s => (
            <div key={s.label} className="p-4 bg-surface border border-border/60 rounded-lg text-center">
              <p className={`text-[1.5rem] font-semibold ${s.color}`} style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</p>
              <p className="text-[11px] text-text-muted" style={{ fontFamily: 'var(--font-ui)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[2.2rem] font-medium text-text" style={{ fontFamily: 'var(--font-heading)' }}>Review</h1>
        <span className="text-sm text-text-muted" style={{ fontFamily: 'var(--font-ui)' }}>
          {remaining} remaining
        </span>
      </div>

      <div className="h-[2px] bg-bg-tertiary rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${(currentIndex / dueItems.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
          className="bg-surface border border-border/60 rounded-lg overflow-hidden"
        >
          <div className="px-5 py-2.5 border-b border-border/40 flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted" style={{ fontFamily: 'var(--font-ui)' }}>
              {current.type} &middot; {current.track?.replace(/-/g, ' ')}
            </span>
          </div>

          <div className="p-6">
            <MathText content={current.question} className="text-text text-[1.1rem]" />
          </div>

          {showAnswer ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-border/40"
            >
              <div className="p-6 bg-accent-light/30">
                <MathText content={current.answer} className="text-text" />
              </div>

              <div className="p-4 bg-bg-secondary/30 border-t border-border/40">
                <p className="text-[11px] text-text-muted text-center mb-3" style={{ fontFamily: 'var(--font-ui)' }}>
                  How well did you know this?
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {qualityButtons.map(btn => (
                    <button
                      key={btn.quality}
                      onClick={() => handleReview(btn.quality)}
                      className={`py-2.5 px-3 rounded-md text-white text-[0.85rem] font-medium transition-all duration-200 ${btn.color}`}
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      {btn.label}
                      <span className="block text-[10px] opacity-75 mt-0.5">{btn.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-5 border-t border-border/40 flex justify-center">
              <button
                onClick={() => setShowAnswer(true)}
                className="px-8 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent-hover transition-all duration-200 shadow-sm"
                style={{ fontFamily: 'var(--font-ui)', fontSize: '0.95rem', letterSpacing: '0.02em' }}
              >
                Show Answer
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
