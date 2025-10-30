// src/components/Canvas.tsx
import React, { useRef, useEffect, forwardRef } from 'react';

interface CanvasProps {
  attributes: { [key: string]: string };
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ attributes }, ref) => {
  useEffect(() => {
    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const drawLayer = (layer: string) => {
      const img = new Image();
      img.src = `/crypto-punks-generator-next/layers/${layer}.png`;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    };

    if (attributes.baseType) {
      drawLayer(`base/${attributes.baseType}`);
    }

  }, [attributes, ref]);

  return <canvas ref={ref} width={480} height={480} style={{ imageRendering: 'pixelated' }} />;
});

Canvas.displayName = 'Canvas';
export default Canvas;
