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
import DarkModeToggleBtn from './DarkModeToggleBtn';

const menu = [
  {
    name: 'about',
    href: '/about',
    clickIcon: (
      <Image
        className="rounded-full"
        width={60}
        height={60}
        src={ProfileImg}
        alt="profile"
        priority
      />
    ),
    icon: (
      <Image
        className="rounded-full"
        width={60}
        height={60}
        src={ProfileImg}
        alt="profile"
        priority
      />
    ),
  },
  { name: 'home', href: '/', clickIcon: <IoHomeSharp />, icon: <IoHomeOutline /> },
  { name: 'posts', href: '/posts', clickIcon: <FaFolderOpen />, icon: <BsFolder /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <section className="flex justify-between w-full bg-green-hot lg:flex-col lg:h-full lg:fixed lg:left-0 lg:w-[80px]">
      <ul className="flex lg:flex-col">
        {menu.map(({ href, clickIcon, icon, name }, idx) => (
          <li key={name + idx}>
            <Link key={href} href={href} aria-label={name}>
              <MenuBox border={pathname === href}>{pathname === href ? clickIcon : icon}</MenuBox>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex lg:flex-col">
        <li>
          <MenuBox>
            <DarkModeToggleBtn />
          </MenuBox>
        </li>
        <li>
          <Link aria-label="github" target="_blank" href="https://github.com/Steadystudy">
            <MenuBox>
              <FiGithub />
            </MenuBox>
          </Link>
        </li>
      </ul>
    </section>
  );
}
