import { Post } from '@/service/posts';
import Link from 'next/link';

interface Props {
  post: Post;
  displayTime?: boolean;
}

export default function PostCard({
  post: { title, description, path, date },
  displayTime = true,
}: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <article className="relative rounded-md shadow-md bg-yellow-light hover:shadow-2xl">
        <time
          className={`absolute block text-gray-500 top-4 right-4 ${
            !displayTime && 'hidden'
          } max-md:hidden`}
        >
          {date.toString()}
        </time>
        <div className="flex flex-col items-center p-4 dark:text-black">
          <h1 className="w-full text-center truncate">{title}</h1>
          <p className="w-full text-center truncate">{description}</p>
        </div>
      </article>
    </Link>
  );
}
