'use client';

import { Post, getPost } from '@/service/posts';
import Image from 'next/image';
import PostCard from './PostCard';

interface Props {
  posts: Post[];
}

export default function PostGrid({ posts }: Props) {
  return (
    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => (
        <li key={post.id}>{<PostCard post={post} />}</li>
      ))}
    </ul>
  );
}
