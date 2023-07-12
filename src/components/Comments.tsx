'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

type GenericString = string & Record<never, never>;

type Theme =
  | 'light'
  | 'light_high_contrast'
  | 'light_protanopia'
  | 'light_tritanopia'
  | 'dark'
  | 'dark_high_contrast'
  | 'dark_protanopia'
  | 'dark_tritanopia'
  | 'dark_dimmed'
  | 'preferred_color_scheme'
  | 'transparent_dark'
  | 'noborder_light'
  | 'noborder_dark'
  | 'cobalt'
  | `https://${string}`
  | GenericString;

export default function Comments() {
  const commentsRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('src', 'https://giscus.app/client.js');
    script.setAttribute('data-repo', 'Steadystudy/Blog');
    script.setAttribute('data-repo-id', 'R_kgDOJNI7DA');
    script.setAttribute('data-category', 'Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOJNI7DM4CX031');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-theme', theme as Theme);
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');

    commentsRef.current!.appendChild(script);
  }, [theme]);

  return <section ref={commentsRef} />;
}
