import { getNonFeaturedPosts } from '@/service/posts';
import MultiCarousel from './MultiCarousel';
import PostCard from './PostCard';

export default async function CarouselPosts() {
  const posts = await getNonFeaturedPosts();
  return (
    <article>
      <h2>You may like</h2>
      <MultiCarousel>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post}></PostCard>
        ))}
      </MultiCarousel>
    </article>
  );
}
