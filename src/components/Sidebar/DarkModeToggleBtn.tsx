'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdSunny } from 'react-icons/md';

const LIGHT = 'light';
const DARK = 'dark';

export default function DarkModeToggleBtn() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeHandler = () => (currentTheme === DARK ? setTheme(LIGHT) : setTheme(DARK));

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button type="button" onClick={mounted && themeHandler}>
      {currentTheme === DARK ? <MdSunny /> : <MdDarkMode />}
    </button>
  );
}
