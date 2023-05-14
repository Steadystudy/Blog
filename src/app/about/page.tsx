import Introduction from '@/components/Introduction';
import ProjectBox from '@/components/ProjectBox';

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
        <p>신입 개발자로 취업을 목표로 하고 있습니다!</p>
        <h1>Projects</h1>
        <div className="grid w-full grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-3">
          <ProjectBox
            title="링북"
            description="북마크 공유 소셜 서비스"
            link="https://github.com/prgrms-web-devcourse/Team-03-LinkBook-FE"
          />
          <ProjectBox
            title="따봉"
            description="칭찬 감사 SNS 어플리케이션"
            link="https://github.com/prgrms-web-devcourse/Team-03-LinkBook-FE"
          />
          <ProjectBox
            title="Outstagram"
            description="인스타그램 클론 코딩"
            link="https://github.com/prgrms-web-devcourse/Team-03-LinkBook-FE"
          />
        </div>
      </section>
    </>
  );
}
