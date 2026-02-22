import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLesson } from '../../content/lessons/index';
import { getTrack } from '../../content/tracks';
import { useProgress } from '../../hooks/useProgress';
import { spacedRepetition } from '../../utils/spacedRepetition';
import MathText from '../Shared/MathText';
import InlineProblem from '../Problem/InlineProblem';
import { renderMath } from '../../utils/katex';

const blockStyles = {
  historical: { border: 'border-l-historical', bg: 'bg-historical-light', label: 'Historical Note' },
  insight: { border: 'border-l-insight', bg: 'bg-insight-light', label: 'Key Insight' },
  application: { border: 'border-l-application', bg: 'bg-application-light', label: 'Application' },
  connection: { border: 'border-l-connection', bg: 'bg-connection-light', label: 'Connection' },
};

export default function LessonView() {
  const { trackId, lessonId } = useParams();
  const lesson = getLesson(lessonId);
  const track = getTrack(trackId);
  const { getLessonProgress, updateLessonBlock, markLessonComplete } = useProgress();
  const [visibleBlocks, setVisibleBlocks] = useState(1);
  const [completed, setCompleted] = useState(false);

  const progress = getLessonProgress(lessonId);

  useEffect(() => {
    if (progress.lastBlock > 0) {
      setVisibleBlocks(Math.min(progress.lastBlock + 1, lesson?.blocks.length || 1));
    }
    if (progress.completed) {
      setVisibleBlocks(lesson?.blocks.length || 1);
      setCompleted(true);
    }
  }, []);

  if (!lesson || !track) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted text-lg" style={{ fontFamily: 'var(--font-body)' }}>Lesson not found.</p>
        <Link to="/curriculum" className="text-accent mt-2 inline-block no-underline hover:underline" style={{ fontFamily: 'var(--font-ui)' }}>
          &larr; Back to Curriculum
        </Link>
      </div>
    );
  }

  const showNext = () => {
    const next = visibleBlocks + 1;
    setVisibleBlocks(next);
    updateLessonBlock(lessonId, next - 1);
  };

  const handleComplete = () => {
    markLessonComplete(lessonId);
    setCompleted(true);
    if (lesson.reviewItems) {
      lesson.reviewItems.forEach(item => {
        spacedRepetition.addItem(item.id, {
          type: item.type,
          track: lesson.track,
          topic: lesson.id,
          question: item.question,
          answer: item.answer,
        });
      });
    }
  };

  const allVisible = visibleBlocks >= lesson.blocks.length;

  return (
    <div className="max-w-[680px] mx-auto">
      {/* Header */}
      <header className="mb-10">
        <Link
          to={`/curriculum?track=${trackId}`}
          className="text-text-muted hover:text-accent text-sm no-underline inline-flex items-center gap-1 transition-colors"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          {track.title}
        </Link>
        <h1 className="text-[2rem] font-medium text-text mt-3 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {lesson.title}
        </h1>
        <p className="text-text-secondary text-[1.1rem] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
          {lesson.subtitle}
        </p>
        <div className="flex items-center gap-4 mt-3 text-[12px] text-text-muted tracking-wide" style={{ fontFamily: 'var(--font-ui)' }}>
          <span>~{lesson.estimatedMinutes} min</span>
          <span className="text-border">|</span>
          <span>{lesson.blocks.filter(b => b.type === 'problem').length} problems</span>
        </div>
        {/* Progress bar */}
        <div className="mt-5 h-[2px] bg-bg-tertiary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(visibleBlocks / lesson.blocks.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </header>

      {/* Lesson content */}
      <div className="space-y-7">
        <AnimatePresence>
          {lesson.blocks.slice(0, visibleBlocks).map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <LessonBlock block={block} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Continue / Complete */}
      <div className="mt-12 mb-8 flex justify-center">
        {!allVisible ? (
          <button
            onClick={showNext}
            className="px-8 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent-hover transition-all duration-200 flex items-center gap-2 shadow-sm"
            style={{ fontFamily: 'var(--font-ui)', fontSize: '0.95rem', letterSpacing: '0.02em' }}
          >
            Continue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        ) : !completed ? (
          <button
            onClick={handleComplete}
            className="px-8 py-3 bg-success text-white rounded-md font-medium hover:opacity-90 transition-all duration-200 shadow-sm"
            style={{ fontFamily: 'var(--font-ui)', fontSize: '0.95rem', letterSpacing: '0.02em' }}
          >
            Mark Complete
          </button>
        ) : (
          <div className="text-center space-y-3">
            <p className="text-success font-medium" style={{ fontFamily: 'var(--font-body)' }}>
              Lesson completed. Review items added to your queue.
            </p>
            <Link
              to={`/curriculum?track=${trackId}`}
              className="text-accent hover:underline no-underline text-sm"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              &larr; Back to {track.title}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function LessonBlock({ block }) {
  switch (block.type) {
    case 'narration':
      return <MathText content={block.content} className="text-text text-[1.02rem]" />;

    case 'math':
      return (
        <div className="my-2">
          <div
            className="katex-display text-center"
            dangerouslySetInnerHTML={{ __html: renderMath(block.latex, true) }}
          />
          {block.explanation && (
            <MathText content={block.explanation} className="text-text-secondary text-[0.92rem] mt-2 px-1" />
          )}
        </div>
      );

    case 'historical':
    case 'insight':
    case 'application':
    case 'connection': {
      const style = blockStyles[block.type];
      return (
        <div className={`border-l-[3px] ${style.border} ${style.bg} rounded-r-md p-5`}>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted" style={{ fontFamily: 'var(--font-ui)' }}>
              {style.label}
              {block.figure && ` — ${block.figure}`}
              {block.years && ` (${block.years})`}
              {block.field && ` — ${block.field}`}
              {block.to && ` \u2192 ${block.to.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`}
            </span>
          </div>
          <MathText content={block.content} className="text-text text-[0.95rem]" />
        </div>
      );
    }

    case 'problem':
      return <InlineProblem problem={block} />;

    default:
      return null;
  }
}
