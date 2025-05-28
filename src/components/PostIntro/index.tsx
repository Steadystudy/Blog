import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  category: string;
  date: string;
};

export default function PostIntro({ title, description, category, date }: Props) {
  return (
    <section className="flex flex-col mt-16 mb-8">
      <h1>{title}</h1>
      <h2>{description}</h2>
      <div className="flex justify-between mt-2">
        <Link
          href={`/posts?category=${category}`}
          className="p-[0.15rem] bg-yellow-100 dark:bg-gray-50 hover:bg-green-light dark:hover:bg-green-light"
        >
          {category}
        </Link>
        <p>
          written by{' '}
          <Link
            href="/"
            className="duration-700 border-b-2 border-green-light hover:bg-green-light hover:transition-all"
          >
            SteadyStudy
          </Link>
        </p>
      </div>
      <p className="self-end">{date.toString()}</p>
      <div className="my-4 border-2 border-green-light"></div>
    </section>
  );
}
