
'use client';

import { useState } from 'react';

export default function ColorPicker() {
  const [color, setColor] = useState('#000000');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div className="flex gap-2">
      <label htmlFor="color" className="text-sm">Pick a color:</label>
      <input
        type="color"
        id="color"
        name="color"
        value={color}
        onChange={handleChange}
        className="w-10 h-10"
      />
      <p>Selected Color: <span style={{ color }}>{color}</span></p>
    </div>
  );
}
