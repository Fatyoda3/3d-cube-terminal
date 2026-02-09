export const canvas = {
  width: 80,  
  height: 60,
  pixels: [],
};

export const createCanvas = (canvas) => {
  canvas.pixels = Array.from({ length: canvas.height }, () => {
    return Array.from({ length: canvas.width }, () => "  ");
  });
};
