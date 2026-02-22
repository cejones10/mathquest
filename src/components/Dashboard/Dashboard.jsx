import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../../hooks/useProgress';
import { spacedRepetition } from '../../utils/spacedRepetition';
import { tracks } from '../../content/tracks';
import { lessons } from '../../content/lessons/index';
import { getDailyQuote } from '../../content/quotes';

const trackAccents = {
  accent: 'text-accent',
  historical: 'text-historical',
  insight: 'text-insight',
  application: 'text-application',
  warning: 'text-warning',
};

export default function Dashboard() {
  const { getStats, getAllLessonProgress } = useProgress();
  const stats = getStats();
  const lessonProgress = getAllLessonProgress();
  const quote = getDailyQuote();
  const dueCount = spacedRepetition.getDueCount();

  const inProgressLessons = lessons.filter(l => {
    const p = lessonProgress[l.id];
    return p && p.startedAt && !p.completed;
  });

  const nextLessons = tracks.map(track => {
    const trackLessons = lessons.filter(l => l.track === track.id).sort((a, b) => a.order - b.order);
    const next = trackLessons.find(l => {
      const p = lessonProgress[l.id];
      return !p || !p.completed;
    });
    return next ? { track, lesson: next } : null;
  }).filter(Boolean);

  return (
    <div>
      {/* Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-[2.4rem] font-medium text-text mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          Welcome back
        </h1>
        <blockquote className="max-w-md mx-auto">
          <p className="text-text-secondary italic text-[1.05rem] leading-[1.8]" style={{ fontFamily: 'var(--font-body)' }}>
            &ldquo;{quote.text}&rdquo;
          </p>
          <footer className="text-text-muted text-[0.85rem] mt-3 not-italic" style={{ fontFamily: 'var(--font-ui)' }}>
            &mdash; {quote.author}
          </footer>
        </blockquote>
      </motion.div>

      {/* Progress summary — single horizontal line */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex items-center justify-center gap-8 sm:gap-12 text-center mb-16 py-6 border-y border-border/50"
      >
        <ProgressStat value={stats.streak.current} label="Day streak" />
        <ProgressStat value={stats.completedLessons} label={`of ${lessons.length} lessons`} />
        <ProgressStat value={stats.solvedProblems} label="Problems solved" />
        {dueCount > 0 && <ProgressStat value={dueCount} label="Cards due" accent />}
      </motion.div>

      {/* Review prompt */}
      {dueCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-16"
        >
          <Link
            to="/review"
            className="block text-center py-5 border border-accent/25 rounded-lg bg-accent/[0.04] hover:bg-accent/[0.08] transition-colors no-underline"
          >
            <p className="text-accent font-medium text-[1.05rem]" style={{ fontFamily: 'var(--font-heading)' }}>
              {dueCount} review card{dueCount !== 1 ? 's' : ''} waiting &rarr;
            </p>
          </Link>
        </motion.div>
      )}

      {/* Continue where you left off */}
      {inProgressLessons.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-[1.1rem] font-medium text-text-muted uppercase tracking-[0.1em] mb-6" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem' }}>
            Continue where you left off
          </h2>
          <div className="space-y-1">
            {inProgressLessons.map(lesson => {
              const track = tracks.find(t => t.id === lesson.track);
              const p = lessonProgress[lesson.id];
              const progressPct = Math.round((p.lastBlock / lesson.blocks.length) * 100);
              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.track}/${lesson.id}`}
                  className="flex items-center gap-4 py-4 px-1 border-b border-border/30 hover:bg-surface-hover transition-colors no-underline group -mx-1 rounded"
                  style={{ paddingLeft: '0.75rem', paddingRight: '0.75rem' }}
                >
                  <span className={`text-[1.3rem] shrink-0 ${trackAccents[track?.color || 'accent']}`}>{track?.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-text font-medium group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
                      {lesson.title}
                    </p>
                    <p className="text-[0.82rem] text-text-muted mt-0.5" style={{ fontFamily: 'var(--font-ui)' }}>
                      {track?.title} &middot; {progressPct}% complete
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Tracks menu */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <h2 className="text-[0.8rem] font-medium text-text-muted uppercase tracking-[0.1em] mb-6" style={{ fontFamily: 'var(--font-ui)' }}>
          Tracks
        </h2>
        <div className="space-y-1">
          {nextLessons.map(({ track, lesson }) => {
            const trackLessons = lessons.filter(l => l.track === track.id);
            const completed = trackLessons.filter(l => lessonProgress[l.id]?.completed).length;
            return (
              <Link
                key={track.id}
                to={`/lesson/${track.id}/${lesson.id}`}
                className="flex items-center gap-4 py-5 px-1 border-b border-border/30 hover:bg-surface-hover transition-colors no-underline group -mx-1 rounded"
                style={{ paddingLeft: '0.75rem', paddingRight: '0.75rem' }}
              >
                <span className={`text-[1.5rem] shrink-0 ${trackAccents[track.color]}`}>{track.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-text font-medium group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
                    {track.title}
                  </p>
                  <p className="text-[0.85rem] text-text-secondary mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                    {track.subtitle}
                  </p>
                  <p className="text-[0.78rem] text-text-muted mt-1" style={{ fontFamily: 'var(--font-ui)' }}>
                    Next: {lesson.title} &middot; {completed}/{trackLessons.length} complete
                  </p>
                </div>
                <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>

        {/* Link to full curriculum */}
        <div className="mt-8 text-center">
          <Link
            to="/curriculum"
            className="text-accent text-[0.9rem] font-medium no-underline hover:underline"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            View full curriculum &rarr;
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

function ProgressStat({ value, label, accent }) {
  return (
    <div>
      <p className={`text-[1.6rem] font-semibold ${accent ? 'text-accent' : 'text-text'}`} style={{ fontFamily: 'var(--font-heading)' }}>
        {value}
      </p>
      <p className="text-[0.75rem] text-text-muted mt-0.5" style={{ fontFamily: 'var(--font-ui)' }}>{label}</p>
    </div>
  );
}
