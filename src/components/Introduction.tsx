import Image from 'next/image';
import ProfileImg from '../../public/images/profile.png';
import RotatingText from './RotatingText';

export default function Introduction() {
  return (
    <section className="flex flex-col items-center gap-4 my-4">
      <Image
        className="rounded-full"
        width={200}
        height={200}
        src={ProfileImg}
        alt="profile"
        priority
      />
      <div>
        <h1>
          안녕하세요👋
          <br />
          저는 <RotatingText />
        </h1>
        <h2>프론트엔드 개발자 민상기입니다.</h2>
        <h3>꾸준히 코딩하는 사람</h3>
      </div>
    </section>
  );
}
