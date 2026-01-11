'use client';

import Image from 'next/image';
import MenuBox from './MenuBox';
import ProfileImg from '../../../public/images/profile.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoHomeOutline, IoHomeSharp } from 'react-icons/io5';
import { FiGithub } from 'react-icons/fi';
import { BsFolder } from 'react-icons/bs';
import { SiVelog } from 'react-icons/si';
import { FaFolderOpen, FaLinkedin } from 'react-icons/fa';
import DarkModeToggleBtn from './DarkModeToggleBtn';
import { useTheme } from 'next-themes';

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
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <section className="flex justify-between w-full bg-primary  lg:flex-col lg:h-full fixed lg:left-0 lg:w-[80px] z-10">
      <ul className="flex text-white lg:flex-col">
        {menu.map(({ href, clickIcon, icon, name }, idx) => (
          <li key={name}>
            <Link href={href}>
              <MenuBox border={pathname === href}>{pathname === href ? clickIcon : icon}</MenuBox>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex lg:flex-col">
        <li>
          <Link
            aria-label="linkedin"
            target="_blank"
            href="https://www.linkedin.com/in/%EC%83%81%EA%B8%B0-%EB%AF%BC-291b81301/"
          >
            <MenuBox>
              <FaLinkedin />
            </MenuBox>
          </Link>
        </li>
        <li>
          <Link aria-label="github" target="_blank" href="https://github.com/Steadystudy">
            <MenuBox>
              <FiGithub />
            </MenuBox>
          </Link>
        </li>
        <li>
          <Link aria-label="velog" target="_blank" href="https://velog.io/@steadystudy">
            <MenuBox>
              <SiVelog />
            </MenuBox>
          </Link>
        </li>
        <li>
          <MenuBox onClick={toggleTheme}>
            <DarkModeToggleBtn />
          </MenuBox>
        </li>
      </ul>
    </section>
  );
}
