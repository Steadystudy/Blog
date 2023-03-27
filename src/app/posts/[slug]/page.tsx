import AdjacentPostCard from '@/components/AdjacentPostCard';
import MarkdownViewer from '@/components/MarkdownViewer';
import { getPostData } from '@/service/posts';
import Image from 'next/image';

interface Props {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const { title, content, date, description, path, prev, next } = await getPostData(slug);

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
        <p className="self-end">{date.toString()}</p>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <div className="border-2 my-4 border-lime-400"></div>
      </section>
      <MarkdownViewer content={content} />
      <section className="flex">
        {prev && <AdjacentPostCard post={prev} />}
        {next && <AdjacentPostCard post={next} />}
      </section>
    </article>
  );
}
