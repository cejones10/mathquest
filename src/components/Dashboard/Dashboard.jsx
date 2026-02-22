import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../../hooks/useProgress';
import { spacedRepetition } from '../../utils/spacedRepetition';
import { tracks } from '../../content/tracks';
import { lessons } from '../../content/lessons/index';
import { getDailyQuote } from '../../content/quotes';

const iconBgMap = {
  accent: 'bg-accent',
  historical: 'bg-historical',
  insight: 'bg-insight',
  application: 'bg-application',
  warning: 'bg-warning',
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
    <div className="space-y-14">
      {/* Hero quote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-2 pb-4"
      >
        <h1 className="text-[2.2rem] font-medium text-text mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Welcome back
        </h1>
        <blockquote className="max-w-lg mx-auto">
          <p className="text-text-secondary italic text-[1.05rem] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            &ldquo;{quote.text}&rdquo;
          </p>
          <footer className="text-text-muted text-sm mt-3 not-italic tracking-wide" style={{ fontFamily: 'var(--font-ui)' }}>
            &mdash; {quote.author}
          </footer>
        </blockquote>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
      >
        <StatCard label="Day Streak" value={stats.streak.current} sub={`Best: ${stats.streak.best}`} />
        <StatCard label="Lessons Done" value={stats.completedLessons} sub={`of ${lessons.length}`} />
        <StatCard label="Problems Solved" value={stats.solvedProblems} sub={`${stats.totalAttempts} attempts`} />
        <StatCard label="Review Due" value={dueCount} sub={dueCount > 0 ? 'Cards waiting' : 'All caught up'} />
      </motion.div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Continue learning */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-[1.35rem] font-medium text-text mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Continue Learning
          </h2>
          {inProgressLessons.length > 0 ? (
            <div className="space-y-4">
              {inProgressLessons.map(lesson => {
                const track = tracks.find(t => t.id === lesson.track);
                const p = lessonProgress[lesson.id];
                const progressPct = Math.round((p.lastBlock / lesson.blocks.length) * 100);
                return (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${lesson.track}/${lesson.id}`}
                    className="block px-5 py-5 bg-surface border border-border/60 rounded-lg hover:shadow-sm transition-all duration-200 no-underline"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-11 h-11 rounded-md flex items-center justify-center text-white text-[1.1rem] shrink-0 ${iconBgMap[track?.color || 'accent']}`}>
                        {track?.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text truncate" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>{lesson.title}</p>
                        <p className="text-sm text-text-muted mt-0.5" style={{ fontFamily: 'var(--font-ui)' }}>{track?.title}</p>
                      </div>
                      <span className="text-sm text-accent font-medium" style={{ fontFamily: 'var(--font-ui)' }}>{progressPct}%</span>
                    </div>
                    <div className="mt-4 h-[3px] bg-bg-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-10 bg-surface border border-border/60 rounded-lg text-center">
              <p className="text-text-secondary" style={{ fontFamily: 'var(--font-body)' }}>No lessons in progress.</p>
              <Link to="/curriculum" className="text-accent font-medium mt-3 inline-block no-underline hover:underline" style={{ fontFamily: 'var(--font-ui)' }}>
                Start a track &rarr;
              </Link>
            </div>
          )}
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="space-y-10"
        >
          {dueCount > 0 && (
            <div>
              <h2 className="text-[1.35rem] font-medium text-text mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                Spaced Review
              </h2>
              <Link
                to="/review"
                className="flex items-center gap-4 px-5 py-5 bg-surface border border-accent/20 rounded-lg hover:shadow-sm transition-all duration-200 no-underline"
              >
                <span className="w-11 h-11 rounded-md bg-accent flex items-center justify-center text-white text-lg shrink-0">↻</span>
                <div>
                  <p className="font-medium text-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
                    {dueCount} card{dueCount !== 1 ? 's' : ''} due
                  </p>
                  <p className="text-sm text-text-muted mt-0.5" style={{ fontFamily: 'var(--font-ui)' }}>Keep your knowledge fresh</p>
                </div>
              </Link>
            </div>
          )}

          <div>
            <h2 className="text-[1.35rem] font-medium text-text mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Quick Start
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {nextLessons.slice(0, 4).map(({ track, lesson }) => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${track.id}/${lesson.id}`}
                  className="px-5 py-5 bg-surface border border-border/60 rounded-lg hover:shadow-sm hover:border-accent/30 transition-all duration-200 no-underline group"
                >
                  <span className="text-[1.6rem]">{track.icon}</span>
                  <p className="font-medium text-text mt-2.5 group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>
                    {track.title}
                  </p>
                  <p className="text-[0.8rem] text-text-muted truncate mt-1" style={{ fontFamily: 'var(--font-ui)' }}>{lesson.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* All tracks */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-[1.35rem] font-medium text-text mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Your Tracks
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map(track => {
            const trackLessons = lessons.filter(l => l.track === track.id);
            const completed = trackLessons.filter(l => lessonProgress[l.id]?.completed).length;
            const pct = trackLessons.length > 0 ? Math.round((completed / trackLessons.length) * 100) : 0;
            return (
              <Link
                key={track.id}
                to={`/curriculum?track=${track.id}`}
                className="px-6 py-6 bg-surface border border-border/60 rounded-lg hover:shadow-sm hover:border-accent/30 transition-all duration-200 no-underline group"
              >
                <div className="flex items-start justify-between">
                  <span className={`w-12 h-12 rounded-md flex items-center justify-center text-white text-xl ${iconBgMap[track.color]}`}>
                    {track.icon}
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-bg-tertiary text-text-muted" style={{ fontFamily: 'var(--font-ui)' }}>
                    {track.difficulty}
                  </span>
                </div>
                <h3 className="text-text font-semibold mt-4 group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem' }}>
                  {track.title}
                </h3>
                <p className="text-text-muted text-sm mt-1" style={{ fontFamily: 'var(--font-ui)' }}>{track.subtitle}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex-1 h-[3px] bg-bg-tertiary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${iconBgMap[track.color]}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[11px] text-text-muted" style={{ fontFamily: 'var(--font-ui)' }}>{completed}/{trackLessons.length}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="px-5 py-5 bg-surface border border-border/60 rounded-lg">
      <span className="text-[1.75rem] font-semibold text-text" style={{ fontFamily: 'var(--font-heading)' }}>{value}</span>
      <p className="text-sm text-text-secondary mt-1" style={{ fontFamily: 'var(--font-ui)' }}>{label}</p>
      {sub && <p className="text-[11px] text-text-muted mt-0.5" style={{ fontFamily: 'var(--font-ui)' }}>{sub}</p>}
    </div>
  );
}
