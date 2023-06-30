import Activities from '@/components/Activities';
import BookList from '@/components/BookList';
import Introduction from '@/components/Introduction';
import LectureList from '@/components/LectureList';
import ProjectList from '@/components/ProjectList';
import SkillList from '@/components/SkillList';
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
        <SkillList />
        <LectureList />
        <ProjectList />
        <BookList />
        <Activities />
      </section>
    </>
  );
}
