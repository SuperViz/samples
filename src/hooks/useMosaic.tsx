import { type RefObject, useEffect } from "react";

// elRef is a reference that points to a HTML Unordered List element
export default function useMosaic(elRef: RefObject<HTMLUListElement>, loaded: boolean) {
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