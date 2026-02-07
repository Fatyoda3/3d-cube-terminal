export const canvas = {
  width: 200,
  height: 200,
  pixels: [],
};

export const createCanvas = (canvas) => {
  canvas.pixels = Array.from({ length: canvas.height }, () => {
    return Array.from({ length: canvas.width }, () => "  ");
  });
};

