import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout({ dark, toggleTheme }) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar dark={dark} toggleTheme={toggleTheme} />
      <main className="pt-32 pb-24 px-8 sm:px-12 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
