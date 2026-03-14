'use client';

import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { gsap } from 'gsap';
import vantaDarkLogo from '@public/images/shared/vanta-dark-logo.svg';
import vantaLightLogo from '@public/images/shared/vanta-light-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef } from 'react';
import AboutUsMenu from './mobile-menu/AboutUsMenu';
import BlogMenu from './mobile-menu/BlogMenu';
import FeaturesMenu from './mobile-menu/FeaturesMenu';
import HomeMenu from './mobile-menu/HomeMenu';
import IntegrationMenu from './mobile-menu/IntegrationMenu';
import LoginMenu from './mobile-menu/LoginMenu';
import PricingMenu from './mobile-menu/PricingMenu';
import ProcessMenu from './mobile-menu/ProcessMenu';
import ServicesMenu from './mobile-menu/ServicesMenu';
import SignUpMenu from './mobile-menu/SignUpMenu';
import TeamsMenu from './mobile-menu/TeamsMenu';
import TestimonialMenu from './mobile-menu/TestimonialMenu';

const MobileMenu = () => {
  const { isOpen, closeMenu } = useMobileMenuContext();
  const sidebarRef = useRef<HTMLElement>(null);

  // Set initial clip-path when closed (avoids flash on mount)
  useLayoutEffect(() => {
    const menu = sidebarRef.current;
    if (menu) {
      gsap.set(menu, { clipPath: 'circle(0% at 100% 0%)' });
    }
  }, []);

  // GSAP circular reveal animation
  useEffect(() => {
    const menu = sidebarRef.current;
    if (!menu) return;

    if (isOpen) {
      gsap.to(menu, {
        clipPath: 'circle(200% at 100% 0%)',
        duration: 0.8,
        ease: 'power2.inOut',
      });
    } else {
      gsap.to(menu, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.6,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, closeMenu]);

  return (
    <aside
      ref={sidebarRef}
      className="dark:bg-background-7 scroll-bar fixed top-0 right-0 z-[999] h-screen w-full bg-white sm:w-1/2 xl:hidden"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
      <div className="space-y-4 p-5 sm:p-8 lg:p-9">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="sr-only">Home</span>
            <figure className="max-w-[44px]">
              <Image src={vantaLightLogo} alt="Vanta Trading Bot" className="block w-full dark:hidden" />
              <Image src={vantaDarkLogo} alt="Vanta Trading Bot" className="hidden w-full dark:block" />
            </figure>
          </Link>
          {/* close menu btn */}
          <button
            onClick={closeMenu}
            className="nav-hamburger-close bg-background-4 dark:bg-background-9 hover:bg-background-5 dark:hover:bg-background-8 relative flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full transition-all duration-200 hover:scale-105 group"
            aria-label="Close mobile menu">
            <span className="sr-only">Close Menu</span>
            <span className="bg-stroke-9/60 dark:bg-stroke-1 absolute block h-0.5 w-4 rotate-45 transition-all duration-200 group-hover:bg-stroke-1"></span>
            <span className="bg-stroke-9/60 dark:bg-stroke-1 absolute block h-0.5 w-4 -rotate-45 transition-all duration-200 group-hover:bg-stroke-1"></span>
          </button>
        </div>
        <div className="scroll-bar h-[85vh] w-full overflow-x-hidden overflow-y-auto pb-10">
          <ul>
            <HomeMenu />

            <AboutUsMenu />

            <BlogMenu />

            <ServicesMenu />

            <IntegrationMenu />

            <FeaturesMenu />

            <ProcessMenu />

            <TestimonialMenu />

            <TeamsMenu />

            <PricingMenu />

            <LoginMenu />

            <SignUpMenu />
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default MobileMenu;
