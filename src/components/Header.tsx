'use client';

import Link from 'next/link';

export default function Header() {
  const pages = ['posts', 'about', 'contact'];

  return (
    <header className="flex flex-row justify-between bg-lime-200 text-black font-[700]">
      <Link href="/">
        <h1 className="text-2xl ml-4">{"MSG's Blog"}</h1>
      </Link>
      <nav className="flex flex-row text-1xl items-center">
        {pages.map((page, i) => (
          <Link key={i} href={`/${page}`} className="mr-4 text-center">
            {page}
          </Link>
        ))}
      </nav>
    </header>
  );
}
