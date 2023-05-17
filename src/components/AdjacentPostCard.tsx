import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr';

interface Props {
  post: Post;
  type: 'prev' | 'next';
}

export default function AdjacentPostCard({ post: { path, title, description }, type }: Props) {
  return (
    <Link href={`/posts/${path}`} className="w-full">
      <article className="relative rounded-md group">
        <Image
          className="w-full max-h-72 opacity-80"
          src={`/images/cardBgImage.jpg`}
          alt={'card background image'}
          width={320}
          height={200}
          referrerPolicy="no-referrer"
        />
        <div className="absolute flex items-center p-4 text-yellow-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 group-hover:scale-110">
          {type === 'prev' && <GrCaretPrevious />}
          <div className="flex flex-col">
            <h2 className="w-full text-center truncate ">{title}</h2>
            <p className="w-full overflow-hidden text-center text-ellipsis whitespace-wrap">
              {description}
            </p>
          </div>
          {type === 'next' && <GrCaretNext />}
        </div>
      </article>
    </Link>
  );
}
