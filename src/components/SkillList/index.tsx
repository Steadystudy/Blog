import Image from 'next/image';

export default function SkillList() {
  return (
    <>
      <h1>Skills</h1>
      <div className="flex justify-center flex-auto w-full gap-2">
        <Image
          src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"
          width={150}
          height={50}
          alt="react"
        />
        <Image
          src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"
          width={150}
          height={50}
          alt="next"
        />
        <Image
          src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"
          width={150}
          height={50}
          alt="typescript"
        />
        <Image
          src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=TailwindCss&logoColor=white"
          width={150}
          height={50}
          alt="tailwindcss"
        />
        <Image
          src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"
          width={150}
          height={50}
          alt="styledcomponents"
        />
      </div>
    </>
  );
}
