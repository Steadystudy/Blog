import SingleCarousel from '../SingleCarousel';
import Lecture from './Lecture';

const LECTURES = [
  {
    title: 'Nextjs 개념정리',
    link: 'https://github.com/Steadystudy/kokoa-clone-2020',
    thumnail: 'NextjsCourse.gif',
    description:
      'Next의 기본 개념과 실험버전인 13버전을 이용해 인스타그램을 클론코딩한 강의입니다. 이 블로그를 만드는 데도 많은 도움이 된 강의였고 빠르게 Nextjs 사용법을 익힐 수 있었습니다.',
  },
  {
    title: '운영체제',
    link: 'https://github.com/Steadystudy/CS-study',
    thumnail: 'operation.jpeg',
    description:
      'KOCW에서 제공하는 반효경교수님의 운영체제 강의를 들었습니다. 운영체제의 개념과 역할, 운영체제를 구성하는 각 요소에 대해 조금이나마 알 수 있었습니다.',
  },
  {
    title: '코코아톡 클론코딩',
    link: 'https://github.com/Steadystudy/kokoa-clone-2020',
    thumnail: 'kokoa.webp',
    description:
      '처음으로 개발에 입문하게 된 강의입니다. HTML, CSS, JS만으로 웹을 만들 수 있다는 게 너무 신기했고 개발에 관심을 갖게 된 강의였습니다.',
  },
  {
    title: '유튜브 클론코딩',
    link: 'https://github.com/Steadystudy/Utube',
    thumnail: 'youtube.webp',
    description:
      'node.js를 활용한 풀스택 강의로 어플이 전체적으로 어떻게 만들어지는지 알 수 있었고 프론트엔드 개발자를 하기로 마음먹은 강의였습니다.',
  },
  {
    title: '줌 클론코딩',
    link: 'https://github.com/Steadystudy/zoom_clone',
    thumnail: 'zoom.webp',
    description:
      '줌 작동원리가 궁금해서 노마드 코더에서 제공하는 줌 클론 챌린지와 함께 끝까지 수강하였습니다. 당시 들었을 때 난이도가 높아서 다 이해하지 못하고 코드만 따라친 것도 있어서 아쉬움이 남는 강의였습니다.',
  },
];

export default function LectureList() {
  return (
    <>
      <h1>Lectures</h1>
      <SingleCarousel>
        {LECTURES.map(({ title, link, description, thumnail }, idx) => (
          <Lecture
            key={title + idx}
            thumnail={thumnail}
            title={title}
            description={description}
            link={link}
            priority={idx === 0}
          />
        ))}
      </SingleCarousel>
    </>
  );
}
