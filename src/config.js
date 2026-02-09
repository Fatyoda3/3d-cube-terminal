export const canvas = {
  width: 100,  
  height: 60,
  pixels: [],
};

export const createCanvas = (canvas) => {
  canvas.pixels = Array.from({ length: canvas.height }, () => {
    return Array.from({ length: canvas.width }, () => "  ");
  });
};
