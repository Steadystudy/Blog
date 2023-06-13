import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  thumnail: string;
  link: string;
  priority: boolean;
};

export default function Lecture({ title, description, thumnail, link, priority }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mx-auto w-96">
      <div className="relative h-40 w-72">
        <Image
          src={`/images/${thumnail}`}
          alt={title}
          className="object-cover"
          fill
          priority={priority}
        />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link href={link} className="mb-2 text-cyan-500">
        Github
      </Link>
    </div>
  );
}
