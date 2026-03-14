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
  const percentRef = useRef<HTMLSpanElement>(null);
  const centerLogoRef = useRef<HTMLDivElement>(null);
  const revealGroupRef = useRef<HTMLDivElement>(null);
  const whiteLogoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      const counter = { value: 0 };

      // Phase 1: Animate percentage 1–100 (white bg, black logo center, number bottom right)
      tl.to(counter, {
        value: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.round(counter.value);
          if (percentRef.current) percentRef.current.textContent = `${val}`;
        },
      });

      // Hide percentage (bottom right)
      tl.to(
        percentRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2',
      );

      // Phase 2: Zoom black logo (shift down 50% vertically as it scales); fade earlier
      tl.to(
        centerLogoRef.current,
        {
          scale: 50,
          y: '40vh',
          opacity: 0.25,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.1',
      );

      // Fade background to black (starts earlier, ~0.6s before scale ends)
      tl.to(
        containerRef.current,
        {
          backgroundColor: '#000000',
          duration: 0.35,
          ease: 'power2.inOut',
        },
        '-=0.6',
      );

      // Phase 3: Hide zoomed logo, show white logo then quote
      tl.set(centerLogoRef.current, { opacity: 0 });
      tl.set(revealGroupRef.current, { opacity: 1 });
      tl.set(whiteLogoRef.current, { opacity: 0 });
      tl.set(quoteRef.current, { opacity: 0, y: 24 });
      tl.to(whiteLogoRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      tl.to(quoteRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2');

      // Phase 4: Fade out preloader
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
      {/* Phase 1: Black logo centered, percentage bottom right (clayboan style) */}
      <div ref={centerLogoRef} className="absolute inset-0 flex items-center justify-center">
        <Image
          src={vantaLogo}
          alt="Vanta"
          width={120}
          height={120}
          className="brightness-0"
        />
      </div>

      <span
        ref={percentRef}
        className="fixed bottom-8 right-8 z-10 text-4xl font-bold tabular-nums text-black md:bottom-12 md:right-12 md:text-5xl lg:text-6xl">
        0
      </span>

      {/* Phase 2: White logo + quote on black background */}
      <div
        ref={revealGroupRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-8 opacity-0 pointer-events-none">
        <div ref={whiteLogoRef} className="opacity-0">
          <Image src={vantaLogo} alt="Vanta" width={100} height={100} />
        </div>
        <div
          ref={quoteRef}
          className="max-w-2xl text-center text-3xl font-medium leading-tight text-white md:text-4xl lg:text-5xl"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
          Risk is not volatility. Risk is lack of vantage.
        </div>
      </div>
    </div>
  );
};

export default Preloader;
