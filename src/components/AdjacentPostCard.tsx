import { Post } from '@/service/posts';
import Link from 'next/link';

interface Props {
  post: Post;
  type: 'prev' | 'next';
}

export default function AdjacentPostCard({ post: { path, title, description }, type }: Props) {
  return (
    <Link href={`/posts/${path}`} className="w-full">
      <h2 className="flex items-center w-full text-yellow-400 hover:scale-105">
        {type === 'prev' && '＜ '}
        {title}
        {type === 'next' && ' ＞'}
      </h2>
    </Link>
  );
}
