'use client';

import { Post } from '@/service/posts';
import { useState } from 'react';
import Categories from './Categories';
import PostList from './PostList';
import { useSearchParams } from 'next/navigation';

interface Props {
  posts: Post[];
  categories: string[];
}

const ALL_POSTS = 'All Posts';

export default function FilteredPosts({ posts, categories }: Props) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || ALL_POSTS;
  const [selected, setSelected] = useState(selectedCategory);
  const filtered =
    selected === ALL_POSTS ? posts : posts.filter((post) => post.category === selected);

  return (
    <section className="flex m-4 max-sm:flex-col">
      <PostList posts={filtered} />
      <Categories
        categories={[ALL_POSTS, ...categories]}
        onClick={setSelected}
        selected={selected}
      />
    </section>
  );
}
