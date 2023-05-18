type Props = {
  title: string;
  description: string;
  category: string;
  date: string;
};

export default function PostIntro({ title, description, category, date }: Props) {
  return (
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
  );
}
