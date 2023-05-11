import Introduction from '@/components/Introduction';

export default function AboutPage() {
  return (
    <>
      <Introduction />
      <section className="flex flex-col items-center max-w-xl gap-4 mx-auto bg-gray-100">
        <h1>Who Am I?</h1>
        <p>
          비전공자이지만 뒤늦게 코딩에 흥미가 생겨 열심히 배우고 있습니다.
          <br />
          사용자가 사용하기 편한 UX/UI에 관심이 많습니다.
          <br />
        </p>
        <h1>Skills</h1>
        <p>React, Next, Typescript, Git</p>
        <h1>Career</h1>
        <p>신입 개발자로 취업을 준비 중입니다</p>
        <h1>Projects</h1>
        <h2>링북</h2>
        <p>현재는 배포사이트가 안됨</p>
        <h2>따봉</h2>
        <p>현재 배포안됨</p>
        <h2>인스타 클론 코딩</h2>
        <p>풀스택으로 진행한 프로젝트</p>
      </section>
    </>
  );
}
