import calculusBigIdeas from './calculus-big-ideas';
import linearAlgebraIntro from './linear-algebra-intro';
import competitionCounting from './competition-counting';

export const lessons = [
  calculusBigIdeas,
  linearAlgebraIntro,
  competitionCounting,
];

export function getLesson(id) {
  return lessons.find(l => l.id === id);
}

export function getLessonsByTrack(trackId) {
  return lessons
    .filter(l => l.track === trackId)
    .sort((a, b) => a.order - b.order);
}

export function getAllProblems() {
  const problems = [];
  for (const lesson of lessons) {
    for (const block of lesson.blocks) {
      if (block.type === 'problem') {
        problems.push({
          ...block,
          track: lesson.track,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
        });
      }
    }
  }
  return problems;
}
