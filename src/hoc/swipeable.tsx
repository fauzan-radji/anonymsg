import { type FunctionComponent, useCallback, useState } from "react";

const swipeThreshold = 50;

interface SwipeableProps {
  direction: "left" | "right";
  onSwipe: () => void;
}

export default function swipeable<T>(WrappedComponent: FunctionComponent<T>) {
  return function Swipeable({
    onSwipe,
    direction,
    ...rest
  }: T & SwipeableProps) {
    const [isTouching, setIsTouching] = useState(false);
    const [xStart, setXStart] = useState(0);
    const [xDistance, setXDistance] = useState(0);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      e.stopPropagation();
      setIsTouching(true);
      setXStart(e.touches[0].clientX);
    }, []);

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent) => {
        e.stopPropagation();
        setIsTouching(false);
        setXDistance(0);
        if (Math.abs(xDistance) === swipeThreshold) {
          onSwipe();
        }
      },
      [xDistance, onSwipe],
    );

    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        if (!isTouching) return;
        e.stopPropagation();

        const touch = e.touches[0];
        const xDiff = touch.clientX - xStart;
        setXDistance(
          direction === "left"
            ? Math.min(0, Math.max(xDiff, -swipeThreshold))
            : Math.max(0, Math.min(xDiff, swipeThreshold)),
        );
      },
      [isTouching, xStart, direction],
    );

    return (
      <WrappedComponent
        {...(rest as T)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        style={{ transform: `translateX(${xDistance}px)` }}
      />
    );
  };
}
