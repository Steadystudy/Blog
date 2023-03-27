import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: Post;
}

export default function AdjacentPostCard({ post: { path, title, description } }: Props) {
  return (
    <Link href={`/posts/${path}`} className="w-full">
      <article className="group relative rounded-md">
        <Image
          className="w-full max-h-72 opacity-80"
          src={`/images/posts/${path}.png`}
          alt={title}
          width={320}
          height={200}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-4 text-yellow-500 group-hover:scale-125">
          <h1 className="w-full truncate text-center">{title}</h1>
          <p className="w-full truncate text-center">{description}</p>
        </div>
      </article>
    </Link>
  );
}
