import { Post } from '@/service/posts';
import Link from 'next/link';

interface Props {
  post: Post;
  displayTime?: boolean;
}

export default function PostCard({
  post: { title, description, path, date },
  displayTime = true,
}: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <article className="relative rounded-md shadow-md bg-background hover:shadow-2xl transition-all duration-300 border border-border">
        <time
          className={`absolute block text-muted-foreground top-4 right-4 ${
            !displayTime && 'hidden'
          } max-md:hidden`}
        >
          {date.toString()}
        </time>
        <div className="flex flex-col items-center p-4">
          <h1 className="w-full text-center truncate text-foreground font-medium">{title}</h1>
          <p className="w-full text-center truncate text-muted-foreground mt-2">{description}</p>
        </div>
      </article>
    </Link>
  );
}
