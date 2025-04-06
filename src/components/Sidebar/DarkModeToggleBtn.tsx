'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdSunny } from 'react-icons/md';

const LIGHT = 'light';
const DARK = 'dark';

export default function DarkModeToggleBtn() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="w-full h-full flex items-center justify-center text-foreground hover:text-primary">
      {currentTheme === DARK ? <MdSunny /> : <MdDarkMode />}
    </div>
  );
}
