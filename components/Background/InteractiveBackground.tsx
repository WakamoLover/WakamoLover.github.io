import { useEffect, useRef } from 'react';
import './InteractiveBackground.css';

const InteractiveBackground: React.FC = () => {
  const blueBlobRef = useRef<HTMLDivElement | null>(null);
  const violetBlobRef = useRef<HTMLDivElement | null>(null);
  const cyanBlobRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ballX = useRef(0);
  const ballY = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reducedMotion.matches || isCoarsePointer) return;

    let animationFrame = 0;

    const renderFrame = () => {
      const targetX = mouseX.current - window.innerWidth / 2;
      const targetY = mouseY.current - window.innerHeight / 2;

      ballX.current += (targetX - ballX.current) * 0.08;
      ballY.current += (targetY - ballY.current) * 0.08;

      const transform = `translate3d(${ballX.current}px, ${ballY.current}px, 0) translate(-50%, -50%)`;
      blueBlobRef.current?.style.setProperty('transform', transform);
      violetBlobRef.current?.style.setProperty('transform', transform);
      cyanBlobRef.current?.style.setProperty('transform', transform);

      if (Math.abs(targetX - ballX.current) > 0.1 || Math.abs(targetY - ballY.current) > 0.1) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      } else {
        ballX.current = targetX;
        ballY.current = targetY;
        animationFrame = 0;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderFrame);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="interactive-background no-invert" aria-hidden="true">
      <div className="interactive-background__ambient-layer">
        <div ref={blueBlobRef} className="interactive-background__blob">
          <div className="interactive-background__blob-shape interactive-background__blob-shape--blue" />
        </div>
        <div ref={violetBlobRef} className="interactive-background__blob">
          <div className="interactive-background__blob-shape interactive-background__blob-shape--violet" />
        </div>
        <div ref={cyanBlobRef} className="interactive-background__blob">
          <div className="interactive-background__blob-shape interactive-background__blob-shape--cyan" />
        </div>
      </div>
    </div>
  );
};

export default InteractiveBackground;
