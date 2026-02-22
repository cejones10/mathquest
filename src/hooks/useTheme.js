import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useTheme() {
  const [dark, setDark] = useState(() => storage.get('theme', 'light') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    storage.set('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggle = () => setDark(d => !d);

  return { dark, toggle };
}
