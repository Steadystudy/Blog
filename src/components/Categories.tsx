interface Props {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
}

export default function Categories({ categories, onClick, selected }: Props) {
  return (
    <section className="p-4 text-center">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onClick(category)}
            className={`cursor-pointer hover:text-green-400 ${
              selected === category ? 'text-green-400' : 'black'
            }`}
          >
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
}
