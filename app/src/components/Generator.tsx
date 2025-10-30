// src/components/Generator.tsx
'use client';
import React, 'useState', useRef } from 'react';
import Canvas from './Canvas';

const Generator: React.FC = () => {
  const [attributes, setAttributes] = useState({
    baseType: 'Male',
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAttributes((prev) => ({ ...prev, [id]: value }));
  };

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `cryptopunk-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Controls</h2>

        <div className="mb-4">
          <label htmlFor="baseType" className="block mb-2">Base Type</label>
          <select id="baseType" value={attributes.baseType} onChange={handleAttributeChange} className="w-full p-2 border">
            <option>Male</option>
            <option>Female</option>
            <option>Zombie</option>
            <option>Ape</option>
            <option>Alien</option>
          </select>
        </div>

        <div className="mt-4">
          <button onClick={handleDownloadPng} className="w-full bg-green-500 text-white p-2 rounded">Download PNG</button>
        </div>
      </div>
      <div className="w-3/4 p-4">
        <Canvas ref={canvasRef} attributes={attributes} />
      </div>
    </div>
  );
};

export default Generator;
