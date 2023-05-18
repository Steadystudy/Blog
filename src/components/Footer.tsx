import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex justify-center align-center">
      &copy; All rights reserved |&nbsp;
      <Link
        href="/"
        className="duration-700 border-b-2 border-green-light hover:bg-green-light hover:transition-all"
      >
        SteadyStudy
      </Link>
    </footer>
  );
}
