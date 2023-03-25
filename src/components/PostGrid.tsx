'use client';

import { Post } from '@/service/posts';
import PostCard from './PostCard';

interface Props {
  posts: Post[];
}

export default function PostGrid({ posts }: Props) {
  return (
    <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {posts.map((post) => (
        <li key={post.id}>{<PostCard post={post} />}</li>
      ))}
    </ul>
  );
}
