import React from 'react';
import ProjectBox from './ProjectBox';

const PROJECTS = [
  {
    title: '링북',
    description: '북마크 공유 소셜 서비스',
    link: 'https://github.com/prgrms-web-devcourse/Team-03-LinkBook-FE',
  },
  {
    title: '따봉',
    description: '사용자간 칭찬 포스트 공유 서비스',
    link: 'https://github.com/prgrms-fe-devcourse/FEDC2_TTaBong_Dali',
  },
];

export default function ProjectList() {
  return (
    <>
      <h1>Projects</h1>
      <div className="grid w-full grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
        {PROJECTS.map(({ title, description, link }, idx) => (
          <ProjectBox title={title} key={title + idx} description={description} link={link} />
        ))}
      </div>
    </>
  );
}
