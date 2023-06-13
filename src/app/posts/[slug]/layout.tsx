import ScrollProgressBar from '@/components/ScrollProgressBar';

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      {children}
    </>
  );
}
