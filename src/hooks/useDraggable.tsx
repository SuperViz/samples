import { type RefObject, useEffect } from "react";

export default function useDraggable(elRef: RefObject<HTMLUListElement>) {
  useEffect(() => {
    const dragMouseDown = (e: DragEvent) => {
      e.preventDefault();
      let pos3 = e.clientX;
      let pos4 = e.clientY;
      const element = e.target as HTMLElement;
      const target = element!.closest('li');

      const elementDrag = (e: MouseEvent) => {
        e.preventDefault();
        const pos1 = pos3 - e.clientX;
        const pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        target!.style.top = target!.offsetTop - pos2 + 'px';
        target!.style.left = target!.offsetLeft - pos1 + 'px';
      };

      const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    if (elRef.current) {
      const listItems = elRef.current.querySelectorAll('li');
      listItems.forEach((item) => {
        item.onmousedown = dragMouseDown as (e: MouseEvent) => void;
      });
    }
  }, [elRef]);
}