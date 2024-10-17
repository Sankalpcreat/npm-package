// src/utils/hexToRgb.ts
export function hexToRgb(hex: string) {
    let r: number, g: number, b: number;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    } else {
      r = parseInt(hex.slice(1, 2) + hex.slice(1, 2), 16);
      g = parseInt(hex.slice(2, 3) + hex.slice(2, 3), 16);
      b = parseInt(hex.slice(3, 4) + hex.slice(3, 4), 16);
    }
  
    return `rgb(${r}, ${g}, ${b})`;
  }
  