import { getNonFeaturedPosts } from '@/service/posts';
import MultiCarousel from './MultiCarousel';
import PostCard from './PostCard';

export default async function CarouselPosts() {
  const posts = await getNonFeaturedPosts();
  return (
    <section className="mx-4">
      <h1>You may like</h1>
      <MultiCarousel>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post}></PostCard>
        ))}
      </MultiCarousel>
    </section>
  );
}
