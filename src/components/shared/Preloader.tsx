'use client';

import { useGSAP } from '@gsap/react';
import vantaLogo from '@public/images/shared/vanta-logo.svg';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const loadingGroupRef = useRef<HTMLDivElement>(null);
  const revealGroupRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
        });

      const counter = { value: 0 };

      // Phase 1: Animate loading bar and percentage (white phase)
      tl.to(counter, {
        value: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.round(counter.value);
          if (percentRef.current) percentRef.current.textContent = `${val}`;
          if (progressBarRef.current) progressBarRef.current.style.width = `${val}%`;
        },
      });

      // Hide loading bar and percentage
      tl.to(
        loadingGroupRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2',
      );

      // Phase 2: Transition background white -> black
      tl.to(
        containerRef.current,
        {
          backgroundColor: '#000000',
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '-=0.1',
      );

      // Phase 3: Reveal logo and quote (start hidden, fade in)
      tl.set(revealGroupRef.current, { opacity: 0 });
      tl.set(logoRef.current, { opacity: 0, y: 20 });
      tl.set(quoteRef.current, { opacity: 0, y: 20 });

      tl.to(revealGroupRef.current, { opacity: 1, duration: 0.2 });
      tl.to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.1',
      );
      tl.to(
        quoteRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4',
      );

      // Phase 4: Hold, then fade out entire preloader (allow clicks to pass through)
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '+=0.8',
      );
    },
    { scope: containerRef, dependencies: [onComplete] },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{ willChange: 'background-color, opacity' }}>
      {/* Phase 1: Loading - white background, white elements */}
      <div
        ref={loadingGroupRef}
        className="flex flex-col items-center gap-8 px-8">
        <div className="opacity-30">
          <Image src={vantaLogo} alt="Vanta" width={80} height={80} className="invert" />
        </div>
        <div className="flex flex-col items-center gap-4 w-full max-w-[280px]">
          <div className="h-[2px] w-full bg-white/30 overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="h-full bg-white rounded-full transition-none"
              style={{ width: '0%' }}
            />
          </div>
          <span
            ref={percentRef}
            className="text-2xl font-medium tabular-nums text-white">
            0
          </span>
        </div>
      </div>

      {/* Phase 2: Reveal - black background, logo + quote */}
      <div
        ref={revealGroupRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-8 opacity-0 pointer-events-none">
        <div ref={logoRef} className="opacity-0">
          <Image src={vantaLogo} alt="Vanta" width={120} height={120} className="brightness-0 invert" />
        </div>
        <div
          ref={quoteRef}
          className="max-w-2xl text-center text-3xl font-medium leading-tight text-white opacity-0 md:text-4xl lg:text-5xl"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
          Risk is not volatility. Risk is lack of vantage.
        </div>
      </div>
    </div>
  );
};

export default Preloader;
