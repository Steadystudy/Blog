import { getFeaturedPosts } from '@/service/posts';
import PostList from './PostList';

export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts(5);

  return (
    <article>
      <h2>Featured Posts</h2>
      <PostList posts={posts} />
    </article>
  );
}
