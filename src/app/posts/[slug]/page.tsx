import AdjacentPostCard from '@/components/AdjacentPostCard';
import MarkdownViewer from '@/components/MarkdownViewer';
import { getFeaturedPosts, getPostData } from '@/service/posts';
import { Metadata } from 'next';
import Image from 'next/image';

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
  const { title, content, date, category, description, path, prev, next } = await getPostData(slug);
  return (
    <article className="mx-8">
      <Image
        className="w-full overflow-hidden max-h-96"
        src={`/images/posts/${path}.png`}
        alt={title}
        width={500}
        height={400}
      />
      <section className="flex flex-col">
        <h1>{title}</h1>
        <h2>{description}</h2>
        <div className="flex justify-between">
          <p>{category}</p>
          <p>written by SteadyStudy</p>
        </div>
        <p className="self-end">{date.toString()}</p>
        <div className="my-4 border-2 border-lime-400"></div>
      </section>
      <MarkdownViewer content={content} />
      {/* Todo: 이전글 다음글 어떻게 보여줄지? */}
      <section className="flex">
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
