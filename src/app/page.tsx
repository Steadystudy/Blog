import CarouselPosts from '@/components/CarouselPosts';
import FeaturedPosts from '@/components/FeaturedPosts';
import Greeting from '@/components/Greeting';
import Introduction from '@/components/Introduction';

export default async function Home() {
  return (
    <section className="flex flex-col gap-12 px-8 mt-16">
      <Greeting />
      {/* @ts-expect-error Async Server Component */}
      <FeaturedPosts />
      {/* @ts-expect-error Async Server Component */}
      <CarouselPosts />
    </section>
  );
}
