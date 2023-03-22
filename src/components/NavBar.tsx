'use client';

import { useId } from 'react';

export default function NavBar() {
  const pages = ['posts', 'about', 'contact'];
  const id = useId();

  return (
    <nav className="flex flex-row justify-between">
      <a href="/"> MSG&apos;s Blog</a>
      <ul className="flex flex-row">
        {pages.map((page) => (
          <li key={id} className="mr-8">
            <a href={`/${page}`}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
