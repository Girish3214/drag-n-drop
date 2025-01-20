import React, { useCallback } from "react";

const useDragEvent = () => {
  const getIndicators = useCallback((column: string) => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  }, []);

  const getNearestIndicator = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      indicators: React.DragEvent<HTMLDivElement> | HTMLElement[]
    ) => {
      const DISTANCE_OFFSET = 50;
      if (Array.isArray(indicators)) {
        const el = indicators.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();

            const offset = e.clientY - (box.top + DISTANCE_OFFSET);

            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
            } else {
              return closest;
            }
          },
          {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
          }
        );

        return el;
      }
    },
    []
  );
  const clearHighlights = useCallback(
    (els: React.DragEvent<HTMLDivElement> | HTMLElement[]) => {
      const indicators = els;
      if (Array.isArray(indicators)) {
        indicators.forEach((i) => {
          i.style.opacity = "0";
        });
      }
    },
    []
  );

  const highlightIndicator = useCallback(
    (e: React.DragEvent<HTMLDivElement>, column: string) => {
      const indicators = getIndicators(column);

      clearHighlights(indicators as HTMLElement[]);

      const el = getNearestIndicator(e, indicators as HTMLElement[]);
      if (el) {
        el.element.style.opacity = "1";
      }
    },
    []
  );
  return {
    clearHighlights,
    getIndicators,
    getNearestIndicator,
    highlightIndicator,
  };
};

export { useDragEvent };
