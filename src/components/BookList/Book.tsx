import Image from 'next/image';

type Props = {
  name: string;
  description: string;
  thumnail: string;
  priority: boolean;
};

export default function Book({ name, description, thumnail, priority }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mx-auto w-96">
      <div className="relative w-40 h-40">
        <Image
          src={`/images/${thumnail}`}
          alt={name}
          className="object-cover"
          fill
          priority={priority}
        />
      </div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}
