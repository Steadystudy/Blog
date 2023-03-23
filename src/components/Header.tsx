'use client';

import Link from 'next/link';
import { useId } from 'react';

export default function Header() {
  const pages = ['posts', 'about', 'contact'];
  const id = useId();

  return (
    <header className="flex flex-row justify-between bg-lime-200 text-black font-[700]">
      <Link href="/">
        <h1 className="text-2xl ml-4">{"MSG's Blog"}</h1>
      </Link>
      <nav className="flex flex-row text-1xl items-center">
        {pages.map((page) => (
          <Link key={id} href={`/${page}`} className="mr-4 text-center">
            {page}
          </Link>
        ))}
      </nav>
    </header>
  );
}
