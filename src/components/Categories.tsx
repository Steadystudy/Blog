interface Props {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
}

export default function Categories({ categories, onClick, selected }: Props) {
  return (
    <section className="p-4 text-center">
      <h2 className="text-foreground mb-4 font-medium">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onClick(category)}
            className={`cursor-pointer transition-colors ${
              selected === category
                ? 'text-accent font-medium'
                : 'text-muted-foreground hover:text-accent'
            }`}
          >
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
}
