import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-4 text-muted-foreground">
      &copy; All rights reserved |&nbsp;
      <Link
        href="/"
        className="duration-300 border-b-2 border-primary hover:bg-accent/10 hover:transition-all"
      >
        SteadyStudy
      </Link>
    </footer>
  );
}
