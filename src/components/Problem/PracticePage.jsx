import { useState } from 'react';
import { motion } from 'framer-motion';
import { getAllProblems } from '../../content/lessons/index';
import { tracks } from '../../content/tracks';
import { useProgress } from '../../hooks/useProgress';
import InlineProblem from './InlineProblem';

export default function PracticePage() {
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const { getProblemHistory } = useProgress();

  const allProblems = getAllProblems();

  const filtered = allProblems.filter(p => {
    if (selectedTrack !== 'all' && p.track !== selectedTrack) return false;
    if (selectedDifficulty !== 'all' && p.difficulty !== Number(selectedDifficulty)) return false;
    return true;
  });

  const solvedCount = filtered.filter(p => getProblemHistory(p.id).solved).length;

  return (
    <div className="max-w-[680px] mx-auto space-y-8">
      <div>
        <h1 className="text-[2.2rem] font-medium text-text" style={{ fontFamily: 'var(--font-heading)' }}>Practice</h1>
        <p className="text-text-secondary mt-1" style={{ fontFamily: 'var(--font-body)' }}>
          Sharpen your skills. {solvedCount} of {filtered.length} solved.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedTrack}
          onChange={e => setSelectedTrack(e.target.value)}
          className="px-3 py-2 rounded-md bg-surface border border-border/60 text-text text-[0.9rem] hover:border-border transition-colors"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          <option value="all">All Tracks</option>
          {tracks.map(t => (
            <option key={t.id} value={t.id}>{t.icon} {t.title}</option>
          ))}
        </select>

        <select
          value={selectedDifficulty}
          onChange={e => setSelectedDifficulty(e.target.value)}
          className="px-3 py-2 rounded-md bg-surface border border-border/60 text-text text-[0.9rem] hover:border-border transition-colors"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          <option value="all">All Difficulties</option>
          <option value="1">Easy</option>
          <option value="2">Medium</option>
          <option value="3">Challenging</option>
          <option value="4">Hard</option>
          <option value="5">Competition</option>
        </select>
      </div>

      {/* Problems */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((problem, i) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <p className="text-[11px] text-text-muted mb-0.5 px-1 tracking-wide" style={{ fontFamily: 'var(--font-ui)' }}>
                From: {problem.lessonTitle}
              </p>
              <InlineProblem problem={problem} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-text-muted">
          <p className="text-[1.1rem]" style={{ fontFamily: 'var(--font-heading)' }}>No problems match your filters.</p>
          <p className="text-sm mt-1" style={{ fontFamily: 'var(--font-ui)' }}>Try adjusting the track or difficulty.</p>
        </div>
      )}
    </div>
  );
}
