import { useState, useEffect } from 'react';
import { useScroll } from 'react-use-gesture';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = () => {
  const [scrollDown, setScrollDown] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
    delay: 200,
  });

  // Track scroll direction
  useScroll(
    ({ direction: [, y] }) => setScrollDown(y > 0),
    { domTarget: window }
  );

  // Reset "hasEntered" when scrolled past
  useEffect(() => {
    if (!inView && scrollDown) setHasEntered(false);
  }, [inView, scrollDown]);

  // Animation config
  const springs = useSpring({
    from: { x: -100, opacity: 0 },
    to: async (next) => {
      if (inView && !hasEntered) {
        await next({ x: 0, opacity: 1 });
        setHasEntered(true);
      } else if (!inView && !scrollDown && hasEntered) {
        await next({ x: 100, opacity: 0 });
      }
    },
    config: { tension: 200, friction: 20 },
  });

  return { ref, springs, AnimatedDiv: animated.div };
};