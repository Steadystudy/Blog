import Introduction from '@/components/Introduction';

export default function AboutPage() {
  return (
    <>
      <Introduction />
      <section className="bg-gray-100">
        <h1>Who Am I?</h1>
        <p>풀스택을 목표로 하는 프론트엔드 개발자</p>
        <h1>Skills</h1>
        <p>React, Next, Typescript, Git</p>
      </section>
    </>
  );
}
