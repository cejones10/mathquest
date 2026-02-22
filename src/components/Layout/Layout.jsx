import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout({ dark, toggleTheme }) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar dark={dark} toggleTheme={toggleTheme} />
      <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
