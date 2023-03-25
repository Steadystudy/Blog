import CarouselPosts from '@/components/CarouselPosts';
import FeaturedPosts from '@/components/FeaturedPosts';
import Introduction from '@/components/Introduction';

export default async function Home() {
  return (
    <>
      <Introduction />
      {/* @ts-expect-error Async Server Component */}
      <FeaturedPosts />
      {/* @ts-expect-error Async Server Component */}
      <CarouselPosts />
    </>
  );
}
