import { Post, getFeaturedPosts } from '@/service/posts';
import PostGrid from './PostGrid';

interface Props {
  posts: Post[];
}

export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts();

  return (
    <section className="mx-4">
      <h1>Featured Posts</h1>
      <PostGrid posts={posts} />
    </section>
  );
}
