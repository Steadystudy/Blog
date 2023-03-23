interface Props {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: Props) {
  return <div>{params.id}</div>;
}
