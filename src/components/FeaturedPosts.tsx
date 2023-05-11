import { getFeaturedPosts } from '@/service/posts';
import PostList from './PostList';

export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts();

  return (
    <article>
      <h2>Featured Posts</h2>
      <PostList posts={posts} />
    </article>
  );
}
