import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { spacedRepetition } from '../../utils/spacedRepetition';

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: '/curriculum', label: 'Curriculum', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0020 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { path: '/practice', label: 'Practice', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { path: '/review', label: 'Review', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
];

export default function Navbar({ dark, toggleTheme }) {
  const location = useLocation();
  const dueCount = spacedRepetition.getDueCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-lg border-b border-border/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-[60px]">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <span className="text-[1.6rem] text-accent" style={{ fontFamily: 'var(--font-heading)' }}>∑</span>
            <span className="text-[1.15rem] font-semibold text-text tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>MathQuest</span>
          </Link>

          <div className="flex items-center gap-0.5">
            {navItems.map(item => {
              const active = item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-3.5 py-[7px] rounded-md text-[0.9rem] no-underline transition-all duration-200 ${
                    active
                      ? 'bg-accent/10 text-accent font-medium'
                      : 'text-text-secondary hover:text-text hover:bg-bg-secondary/60'
                  }`}
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className="hidden sm:inline">{item.label}</span>
                  {item.path === '/review' && dueCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-accent text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                      {dueCount > 9 ? '9+' : dueCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <ThemeToggle dark={dark} toggle={toggleTheme} />
        </div>
      </div>
    </nav>
  );
}
