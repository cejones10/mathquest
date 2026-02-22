import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MathText from '../Shared/MathText';
import { useProgress } from '../../hooks/useProgress';

const hintLabels = {
  nudge: 'Nudge',
  guidance: 'More Help',
  socratic: 'Guided Solution',
  solution: 'Full Solution',
};

const difficultyLabels = ['', 'Easy', 'Medium', 'Challenging', 'Hard', 'Competition'];
const difficultyColors = ['', 'text-success', 'text-success', 'text-warning', 'text-danger', 'text-historical'];

export default function InlineProblem({ problem }) {
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [markedSolved, setMarkedSolved] = useState(false);
  const { recordProblem, getProblemHistory } = useProgress();

  const history = getProblemHistory(problem.id);
  const alreadySolved = history.solved || markedSolved;

  const revealNextHint = () => {
    if (hintsRevealed < problem.hints.length) {
      setHintsRevealed(h => h + 1);
    }
  };

  const handleSolved = () => {
    recordProblem(problem.id, { solved: true, hintsUsed: hintsRevealed });
    setMarkedSolved(true);
  };

  const handleShowSolution = () => {
    setHintsRevealed(problem.hints.length);
    setShowSolution(true);
  };

  return (
    <div className="my-8 border border-border/60 rounded-md overflow-hidden bg-surface">
      {/* Header */}
      <div className="px-5 py-3 bg-bg-secondary/50 border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent" style={{ fontFamily: 'var(--font-ui)' }}>
            Problem
          </span>
          {problem.difficulty && (
            <span className={`text-[11px] font-medium ${difficultyColors[problem.difficulty]}`} style={{ fontFamily: 'var(--font-ui)' }}>
              {difficultyLabels[problem.difficulty]}
            </span>
          )}
        </div>
        {alreadySolved && (
          <span className="text-[11px] px-2 py-0.5 bg-success-light text-success rounded-sm font-medium" style={{ fontFamily: 'var(--font-ui)' }}>
            Solved
          </span>
        )}
      </div>

      {/* Statement */}
      <div className="p-5">
        <MathText content={problem.statement} className="text-text" />
      </div>

      {/* Hints */}
      <div className="px-5 pb-5 space-y-3">
        <AnimatePresence>
          {problem.hints.slice(0, hintsRevealed).map((hint, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-md ${
                hint.level === 'solution'
                  ? 'bg-accent-light border border-accent/15'
                  : 'bg-bg-secondary/60 border border-border/40'
              }`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted block mb-1.5" style={{ fontFamily: 'var(--font-ui)' }}>
                {hintLabels[hint.level] || `Hint ${i + 1}`}
              </span>
              <MathText content={hint.content} className="text-text text-[0.93rem]" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {hintsRevealed < problem.hints.length && !showSolution && (
            <button
              onClick={revealNextHint}
              className="px-4 py-2 text-[0.85rem] rounded-md bg-surface border border-border/60 text-text-secondary hover:text-text hover:border-border transition-all duration-200"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {hintsRevealed === 0 ? 'Show Hint' : 'Next Hint'}
              <span className="text-text-muted ml-1.5">({problem.hints.length - hintsRevealed})</span>
            </button>
          )}

          {hintsRevealed > 0 && hintsRevealed < problem.hints.length && (
            <button
              onClick={handleShowSolution}
              className="px-4 py-2 text-[0.85rem] rounded-md text-text-muted hover:text-text transition-colors"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Show Solution
            </button>
          )}

          {!alreadySolved && (
            <button
              onClick={handleSolved}
              className="px-4 py-2 text-[0.85rem] rounded-md bg-success/8 border border-success/20 text-success hover:bg-success/15 transition-all duration-200 ml-auto"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              I solved it
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
