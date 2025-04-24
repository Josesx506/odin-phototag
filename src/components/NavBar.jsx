'use client';

import styles from '@/style/navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);

  const pathname = usePathname();
  
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false)
  }
  return (
    <div className="NavContainer">
      <header className={`${styles.navHeader}`}>
        <nav className={styles.navbar}>
          {/* logo */}
          <a href='#' className={styles.logo}>ØTag</a>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <Link  href='https://josesx506.github.io/Odin_Project_FS/' className={styles.navLink}>Odin</Link>
            </li>
            <li onClick={removeActive}>
              <Link href='/' className={`${styles.navLink} ${pathname==='/' ? styles.activeLink : ''}`}>Home</Link>
            </li>
            <li onClick={removeActive}>
              <Link href='/leaderboard' className={`${styles.navLink} ${pathname.startsWith('/leaderboard') ? styles.activeLink : ''}`}>Leaderboard</Link>
            </li>
          </ul>
          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}
