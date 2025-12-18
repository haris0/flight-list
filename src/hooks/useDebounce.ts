import { useRef, useEffect } from 'react';

type Timer = ReturnType<typeof setTimeout>;

export function useDebounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  delay = 1000,
) {
  const timer = useRef<Timer>(undefined);

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args: Parameters<F>) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  });

  return debouncedFunction;
}
