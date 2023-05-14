import Link from 'next/link';

type Props = {
  link: string;
  title: string;
  description: string;
};

export default function ProjectBox({ link, title, description }: Props) {
  return (
    <Link
      href={link}
      target="_blank"
      className="border-b group hover:border-b-cyan-500 w-full min-h-[80px]"
    >
      <div className="flex flex-col items-center">
        <h2 className=" group-hover:text-cyan-500">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}
