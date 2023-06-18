import { getFeaturedPosts } from '@/service/posts';
import PostList from './PostList';

export default async function FeaturedPosts() {
  const POST_COUNT = 5;
  const posts = await getFeaturedPosts(POST_COUNT);

  return (
    <article>
      <h2>Featured Posts</h2>
      <PostList posts={posts} />
    </article>
  );
}
