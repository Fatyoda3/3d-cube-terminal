import { canvas } from "./config.js";

export const cls = () => {
  console.clear();
  for (const row in canvas.pixels) {
    for (const col in canvas.pixels[row]) {
      canvas.pixels[row][col] = "  ";
    }
  }
};

export const draw = () => {
  console.log(canvas.pixels.map((row) => row.join("")).join("\n"));
};
