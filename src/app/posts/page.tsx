import FilteredPosts from '@/components/FilteredPosts';
import { getAllPosts } from '@/service/posts';

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <section className="mt-12">
      <FilteredPosts posts={posts} categories={categories} />
    </section>
  );
}
