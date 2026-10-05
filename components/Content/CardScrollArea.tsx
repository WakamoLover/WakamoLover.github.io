import React, { useCallback, useEffect, useRef, useState } from 'react';

interface CardScrollAreaProps {
  children: React.ReactNode;
  className: string;
}

interface ScrollMetrics {
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
}

const CardScrollArea: React.FC<CardScrollAreaProps> = ({ children, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ pointerY: number; scrollTop: number } | null>(null);
  const [metrics, setMetrics] = useState<ScrollMetrics>({ clientHeight: 0, scrollHeight: 0, scrollTop: 0 });

  const updateMetrics = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    setMetrics({
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
      scrollTop: element.scrollTop,
    });
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    updateMetrics();
    const observer = new ResizeObserver(updateMetrics);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    return () => observer.disconnect();
  }, [updateMetrics, children]);

  const hasOverflow = metrics.scrollHeight > metrics.clientHeight;
  const thumbHeight = hasOverflow
    ? Math.max(12, metrics.clientHeight * metrics.clientHeight / metrics.scrollHeight)
    : metrics.clientHeight;
  const thumbOffset = hasOverflow
    ? metrics.scrollTop / (metrics.scrollHeight - metrics.clientHeight) * (metrics.clientHeight - thumbHeight)
    : 0;

  return (
    <div className={`card-scroll-container group/card-scroll relative min-h-0 ${className}`}>
      <div
        ref={scrollRef}
        onScroll={updateMetrics}
        className={`card-scroll-native h-full min-h-0 overflow-y-auto ${className}`}
      >
        {children}
      </div>
      {hasOverflow && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-40 flex w-2 justify-center opacity-0 transition-opacity group-hover/card-scroll:opacity-100 group-focus-within/card-scroll:opacity-100">
          <div
            role="scrollbar"
            aria-label="Card content"
            aria-controls={scrollRef.current?.id}
            aria-orientation="vertical"
            aria-valuemin={0}
            aria-valuemax={metrics.scrollHeight - metrics.clientHeight}
            aria-valuenow={metrics.scrollTop}
            tabIndex={0}
            onKeyDown={(event) => {
              const element = scrollRef.current;
              if (!element) return;
              if (event.key === 'ArrowDown') element.scrollTop += 24;
              else if (event.key === 'ArrowUp') element.scrollTop -= 24;
              else if (event.key === 'PageDown') element.scrollTop += element.clientHeight;
              else if (event.key === 'PageUp') element.scrollTop -= element.clientHeight;
              else return;
              event.preventDefault();
            }}
            onPointerDown={(event) => {
              const element = scrollRef.current;
              if (!element) return;
              dragStartRef.current = { pointerY: event.clientY, scrollTop: element.scrollTop };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              const element = scrollRef.current;
              const dragStart = dragStartRef.current;
              if (!element || !dragStart) return;
              const scrollableHeight = element.scrollHeight - element.clientHeight;
              const thumbTrackHeight = element.clientHeight - thumbHeight;
              if (thumbTrackHeight > 0) {
                element.scrollTop = dragStart.scrollTop
                  + (event.clientY - dragStart.pointerY) * scrollableHeight / thumbTrackHeight;
              }
            }}
            onPointerUp={() => { dragStartRef.current = null; }}
            onPointerCancel={() => { dragStartRef.current = null; }}
            className="pointer-events-auto absolute right-0 top-0 w-1 cursor-grab rounded-full bg-slate-400/70 active:cursor-grabbing"
            style={{ height: `${thumbHeight}px`, transform: `translateY(${thumbOffset}px)` }}
          />
        </div>
      )}
    </div>
  );
};

export default CardScrollArea;
