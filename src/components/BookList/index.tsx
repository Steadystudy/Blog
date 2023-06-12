'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Book from './Book';

const BOOKS = [
  {
    name: '모던 자바스크립트 Deep Dive',
    thumnail: 'deepdive.png',
    description: `자바스크립트의 기본 개념을 배울 수 있었고 특히 실행 컨텍스트와 클로저를 이해하는데 많은 도움이 되었습니다. 헷갈리는 개념이 생길 때마다 볼 수 있게 항상 곁에 두고 있는 책입니다.`,
  },
  {
    name: '코어 자바스크립트',
    thumnail: '코어자바스크립트.png',
    description:
      '자바스크립트의 핵심 동작 원리를 배울 수 있었습니다. deep dive와 함께 읽으면 더 이해하기 좋은 책입니다. 읽고 난 후 js 코드를 보다 쉽게 이해할 수 있어 디버깅에도 도움이 되었습니다.',
  },
  {
    name: '리액트를 다루는 기술',
    thumnail: 'reacttech.jpeg',
    description:
      '리액트를 깊게 알려주진 않지만 실습을 통해 리액트 사용법을 빠르게 익힐 수 있었습니다.',
  },
  {
    name: '클린코드',
    thumnail: '클린코드.jpeg',
    description:
      '기본에 대해 많은 생각을 할 수 있었습니다. 함수명, 주석, 예외 처리 등 구현하기에 바빠서 놓친 것들이 얼마나 많고 제가 나쁜 코드를 작성했는지 알 수 있었습니다. 지금은 가독성 좋은 코드를 만들기 위해 노력하고 있습니다.',
  },
  {
    name: '함께자라기',
    thumnail: '함께자라기.jpeg',
    description:
      '개발에 정체기가 올 때 읽은 책으로 저의 목표 설정에 도움을 준 책입니다. 의도적 수련을 통해 현실에 안주하지 않고 성장하고 있습니다.',
  },
];

export default function BookList() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel responsive={responsive} className="w-full" showDots={false}>
      {BOOKS.map(({ name, thumnail, description }, idx) => (
        <Book name={name} thumnail={thumnail} description={description} key={name + idx} />
      ))}
    </Carousel>
  );
}
