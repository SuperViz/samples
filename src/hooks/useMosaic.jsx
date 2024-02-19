import { useEffect } from "react";

export default function useMosaic(elRef, loaded) {
  useEffect(() => {
    if (elRef.current && loaded) {
      const container = elRef.current;
      const items = container.querySelectorAll('li');

      const itemWidth = 360;
      const itemHeight = 165;

      const padding = 16;
      const columns = Math.floor(
        (container.offsetWidth - 2 * padding) / itemWidth
      );

      items.forEach((item, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);

        item.style.left = `${padding + column * itemWidth}px`;
        item.style.top = `${padding + row * itemHeight}px`;
      });
    }
  }, [elRef, loaded]);
};