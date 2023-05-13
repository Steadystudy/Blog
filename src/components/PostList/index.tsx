'use client';

import { Post } from '@/service/posts';
import PostCard from '../PostCard';

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <ul className="flex flex-col w-full">
      {posts.map((post) => (
        <li key={post.id}>{<PostCard post={post} />}</li>
      ))}
    </ul>
  );
}
