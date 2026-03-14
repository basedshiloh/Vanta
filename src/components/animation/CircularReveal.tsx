'use client';

import { gsap } from 'gsap';
import { forwardRef, ReactNode, useEffect, useLayoutEffect, useRef } from 'react';

type OriginPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';

const originMap: Record<OriginPosition, string> = {
  'top-right': '100% 0%',
  'top-left': '0% 0%',
  'bottom-right': '100% 100%',
  'bottom-left': '0% 100%',
  center: '50% 50%',
};

interface CircularRevealProps {
  /** Whether the content is visible (expanded) or hidden (collapsed) */
  isOpen: boolean;
  /** Content to reveal with the circular animation */
  children: ReactNode;
  /** Origin point of the circle expansion */
  origin?: OriginPosition;
  /** Duration of the expand animation in seconds */
  openDuration?: number;
  /** Duration of the collapse animation in seconds */
  closeDuration?: number;
  /** Easing for the expand animation */
  openEase?: string;
  /** Easing for the collapse animation */
  closeEase?: string;
  /** Radius when fully expanded (e.g. "200%" to cover the element) */
  maxRadius?: string;
  /** Additional CSS classes for the wrapper */
  className?: string;
  /** Inline styles for the wrapper */
  style?: React.CSSProperties;
  /** Whether to disable pointer events when closed */
  disablePointerWhenClosed?: boolean;
  /** HTML element type for the wrapper */
  as?: 'div' | 'aside' | 'section' | 'main' | 'article';
}

const CircularReveal = forwardRef<HTMLElement, CircularRevealProps>(({
  isOpen,
  children,
  origin = 'top-right',
  openDuration = 0.8,
  closeDuration = 0.6,
  openEase = 'power2.inOut',
  closeEase = 'power2.in',
  maxRadius = '200%',
  className = '',
  style = {},
  disablePointerWhenClosed = true,
  as: Wrapper = 'div',
}, ref) => {
  const internalRef = useRef<HTMLElement | null>(null);
  const position = originMap[origin];

  // Set initial clip-path when closed (avoids flash on mount)
  useLayoutEffect(() => {
    const element = internalRef.current;
    if (element) {
      gsap.set(element, { clipPath: `circle(0% at ${position})` });
    }
  }, [position]);

  // Animate on isOpen change
  useEffect(() => {
    const element = internalRef.current;
    if (!element) return;

    if (isOpen) {
      gsap.to(element, {
        clipPath: `circle(${maxRadius} at ${position})`,
        duration: openDuration,
        ease: openEase,
      });
    } else {
      gsap.to(element, {
        clipPath: `circle(0% at ${position})`,
        duration: closeDuration,
        ease: closeEase,
      });
    }
  }, [isOpen, position, maxRadius, openDuration, closeDuration, openEase, closeEase]);

  return (
    <Wrapper
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      className={className}
      style={{
        ...style,
        ...(disablePointerWhenClosed && !isOpen && { pointerEvents: 'none' }),
      }}>
      {children}
    </Wrapper>
  );
});

CircularReveal.displayName = 'CircularReveal';

export default CircularReveal;
