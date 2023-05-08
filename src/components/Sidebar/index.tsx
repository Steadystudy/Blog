'use client';

import Image from 'next/image';
import MenuBox from './MenuBox';
import ProfileImg from '../../../public/images/profile.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoHomeOutline, IoHomeSharp } from 'react-icons/io5';
import { FiGithub } from 'react-icons/fi';
import { BsFolder } from 'react-icons/bs';
import { FaFolderOpen } from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <section className="flex justify-between w-full bg-green-hot lg:flex-col lg:h-full lg:absolute lg:left-0 lg:w-[80px]">
      <div className="flex lg:flex-col">
        <Link href="/about">
          <MenuBox>
            <Image
              className="rounded-full"
              width={60}
              height={60}
              src={ProfileImg}
              alt="profile"
              priority
            />
          </MenuBox>
        </Link>
        <Link href="/">
          <MenuBox>{pathname === '/' ? <IoHomeSharp /> : <IoHomeOutline />}</MenuBox>
        </Link>
        <Link href="/posts">
          <MenuBox>{pathname === '/posts' ? <FaFolderOpen /> : <BsFolder />}</MenuBox>
        </Link>
      </div>
      <div className="items-end ">
        <Link target="_blank" href="https://github.com/Steadystudy">
          <MenuBox>
            <FiGithub />
          </MenuBox>
        </Link>
      </div>
    </section>
  );
}
