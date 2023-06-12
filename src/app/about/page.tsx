import Activities from '@/components/Activities';
import BookList from '@/components/BookList';
import Introduction from '@/components/Introduction';
import LectureList from '@/components/LectureList';
import ProjectList from '@/components/ProjectList';
import ProjectBox from '@/components/ProjectList/ProjectBox';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <>
      <Introduction />
      <section className="flex flex-col items-center max-w-xl gap-4 mx-auto">
        <h1>Who Am I?</h1>
        <p className="leading-8">
          무엇이 부족한지 알며 꾸준하게 부족한 점을 채워나가는 신입개발자입니다. 말하는 것보다
          경청하는 편이며, 주변에 고민을 들을 때 개발자로서 해결할 수 있는 방안을 찾습니다. 새로운
          기술을 배우는 것에 즐거움을 느끼며 문제 해결하는 것에 큰 관심을 가집니다. 아직은
          부족하지만 열심히 해서 풀스택 개발자가 되는 것이 목표입니다.
          <br />
        </p>
        <h1>Skills</h1>
        <div className="flex flex-wrap justify-center w-full gap-2">
          <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
          <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white" />
          <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
          <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=TailwindCss&logoColor=white" />
          <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
        </div>
        <LectureList />
        <ProjectList />
        <BookList />
        <Activities />
      </section>
    </>
  );
}
