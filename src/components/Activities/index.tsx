import Image from 'next/image';
import MarkdownViewer from '../MarkdownViewer';

const ACTIVITES = [
  {
    title: '프로그래머스',
    content: `2022.03 ~ 2022.08 프로그래머스 데브코스 프론트엔드 과정  
    강의와 특강을 들으며 기초 개발지식을 배울 수 있었습니다.  
    또한 멘토님들과 교육생들을 만나 교류하면서 큰 성장을 이룰 수 있었습니다.  
    모르는 것이 뭔지 알게 되고 스스로 공부하는 방법에 대해 배울 수 있었습니다.  
    회고는 [velog](https://velog.io/@steadystudy)에 기록해 두었습니다.
`,
  },
];

export default function Activities() {
  return (
    <>
      <h1>Activities</h1>
      <Image src={`/images/프로그래머스.jpeg`} alt="프로그래머스" width={400} height={300} />
      <MarkdownViewer content={ACTIVITES[0].content} />
    </>
  );
}
