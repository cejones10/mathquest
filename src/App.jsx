import { HashRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import CurriculumMap from './components/Curriculum/CurriculumMap';
import LessonView from './components/Lesson/LessonView';
import PracticePage from './components/Problem/PracticePage';
import ReviewQueue from './components/Review/ReviewQueue';

export default function App() {
  const { dark, toggle } = useTheme();

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout dark={dark} toggleTheme={toggle} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/curriculum" element={<CurriculumMap />} />
          <Route path="/lesson/:trackId/:lessonId" element={<LessonView />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/review" element={<ReviewQueue />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
