'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const DynamicThemeProvider = dynamic(() => import('next-themes').then((lib) => lib.ThemeProvider), {
  ssr: false,
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <DynamicThemeProvider enableSystem={true} attribute="class">
      {children}
    </DynamicThemeProvider>
  );
}
