import AdjacentPostCard from '@/components/AdjacentPostCard';
import MarkdownViewer from '@/components/MarkdownViewer';
import PostIntro from '@/components/PostIntro';
import { getFeaturedPosts, getPostData } from '@/service/posts';
import { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const { title, description } = await getPostData(slug);
  return {
    title,
    description,
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const { title, content, date, category, description, prev, next } = await getPostData(slug);
  return (
    <article className="m-8">
      <PostIntro title={title} category={category} date={date} description={description} />
      <MarkdownViewer content={content} />
      {/* Todo: 이전글 다음글 어떻게 보여줄지? */}
      <section className="flex gap-4 mt-16">
        {prev && <AdjacentPostCard type="prev" post={prev} />}
        {next && <AdjacentPostCard type="next" post={next} />}
      </section>
    </article>
  );
}

// feature post page 미리 만들기
export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
