import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tracks } from '../../content/tracks';
import { getLessonsByTrack } from '../../content/lessons/index';
import { useProgress } from '../../hooks/useProgress';

const colorMap = {
  accent: { bg: 'bg-accent', light: 'bg-accent/5', border: 'border-accent/20', text: 'text-accent' },
  historical: { bg: 'bg-historical', light: 'bg-historical/5', border: 'border-historical/20', text: 'text-historical' },
  insight: { bg: 'bg-insight', light: 'bg-insight/5', border: 'border-insight/20', text: 'text-insight' },
  application: { bg: 'bg-application', light: 'bg-application/5', border: 'border-application/20', text: 'text-application' },
  warning: { bg: 'bg-warning', light: 'bg-warning/5', border: 'border-warning/20', text: 'text-warning' },
};

export default function CurriculumMap() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTrack = searchParams.get('track') || null;
  const { getLessonProgress } = useProgress();

  const displayTracks = activeTrack ? tracks.filter(t => t.id === activeTrack) : tracks;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-[2.2rem] font-medium text-text" style={{ fontFamily: 'var(--font-heading)' }}>Curriculum</h1>
        <p className="text-text-secondary mt-1" style={{ fontFamily: 'var(--font-body)' }}>Choose a track or explore freely. No wrong path here.</p>
      </div>

      {/* Track filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSearchParams({})}
          className={`px-4 py-[7px] rounded-md text-[0.9rem] transition-all duration-200 ${
            !activeTrack
              ? 'bg-accent text-white shadow-sm'
              : 'bg-surface border border-border/60 text-text-secondary hover:text-text hover:border-border'
          }`}
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          All Tracks
        </button>
        {tracks.map(track => {
          const colors = colorMap[track.color];
          return (
            <button
              key={track.id}
              onClick={() => setSearchParams({ track: track.id })}
              className={`px-4 py-[7px] rounded-md text-[0.9rem] transition-all duration-200 flex items-center gap-2 ${
                activeTrack === track.id
                  ? `${colors.bg} text-white shadow-sm`
                  : 'bg-surface border border-border/60 text-text-secondary hover:text-text hover:border-border'
              }`}
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <span>{track.icon}</span>
              {track.title}
            </button>
          );
        })}
      </div>

      {/* Track sections */}
      {displayTracks.map((track, ti) => {
        const trackLessons = getLessonsByTrack(track.id);
        const colors = colorMap[track.color];

        return (
          <motion.section
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ti * 0.08, duration: 0.5 }}
          >
            <div className={`p-6 rounded-lg border ${colors.border} bg-surface`}>
              <div className="flex items-start gap-4 mb-6">
                <span className={`w-12 h-12 rounded-md flex items-center justify-center text-white text-xl ${colors.bg}`}>
                  {track.icon}
                </span>
                <div>
                  <h2 className="text-[1.3rem] font-semibold text-text" style={{ fontFamily: 'var(--font-heading)' }}>{track.title}</h2>
                  <p className={`text-sm font-medium ${colors.text}`} style={{ fontFamily: 'var(--font-ui)' }}>{track.subtitle}</p>
                  <p className="text-text-secondary text-[0.92rem] mt-1.5 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{track.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-text-muted" style={{ fontFamily: 'var(--font-ui)' }}>
                    <span>~{track.estimatedHours}h total</span>
                    <span>{trackLessons.length} lesson{trackLessons.length !== 1 ? 's' : ''}</span>
                    {track.prerequisites.length > 0 && (
                      <span>Prereq: {track.prerequisites.join(', ')}</span>
                    )}
                  </div>
                </div>
              </div>

              {trackLessons.length > 0 ? (
                <div className="space-y-2">
                  {trackLessons.map((lesson, i) => {
                    const prog = getLessonProgress(lesson.id);
                    const problemCount = lesson.blocks.filter(b => b.type === 'problem').length;
                    const status = prog.completed ? 'completed' : prog.startedAt ? 'in-progress' : 'not-started';

                    return (
                      <Link
                        key={lesson.id}
                        to={`/lesson/${track.id}/${lesson.id}`}
                        className="flex items-center gap-4 p-4 rounded-md border border-border/40 bg-bg/50 hover:bg-surface-hover hover:border-border transition-all duration-200 no-underline group"
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border-2 ${
                          status === 'completed'
                            ? 'bg-success text-white border-success'
                            : status === 'in-progress'
                            ? `${colors.border} ${colors.text} border-current`
                            : 'border-border text-text-muted'
                        }`} style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                          {status === 'completed' ? '✓' : i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-text group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 500 }}>
                            {lesson.title}
                          </p>
                          <p className="text-sm text-text-muted truncate" style={{ fontFamily: 'var(--font-ui)' }}>{lesson.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-text-muted" style={{ fontFamily: 'var(--font-ui)' }}>
                          {problemCount > 0 && <span>{problemCount} problem{problemCount !== 1 ? 's' : ''}</span>}
                          <span>{lesson.estimatedMinutes} min</span>
                          <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="py-10 text-center text-text-muted rounded-md border border-dashed border-border/60">
                  <p className="text-[1.1rem]" style={{ fontFamily: 'var(--font-heading)' }}>Coming soon</p>
                  <p className="text-sm mt-1" style={{ fontFamily: 'var(--font-ui)' }}>Lessons for this track are being written.</p>
                </div>
              )}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
