import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: Post;
}

export default function PostCard({ post: { title, description, path, date, category } }: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <article className="rounded-md shadow-md  hover:shadow-2xl">
        <div className="flex flex-col items-center p-4">
          <time className="self-end text-gray-400">{date.toString()}</time>
          <h1 className="w-full text-center truncate">{title}</h1>
          <p className="w-full text-center truncate">{description}</p>
          <span className="bg-yellow-100">{category}</span>
        </div>
      </article>
    </Link>
  );
}
