import { plotShapes } from "./src/utilities.js";
import { canvas, createCanvas } from "./src/config.js";
import { Cuboid } from "./src/shape.js";
import { cls, draw } from "./src/cls.js";
import { delay } from "./src/delay.js";

let inc = 0;

const KEYS = { w: 119, a: 97, s: 115, d: 100, i: 105, j: 106, k: 107, l: 108 };

Deno.stdin.setRaw(true, { cbreak: true });

const handleKeystrokes = async (keystrokeBuff) => {
  while (true) {
    await Deno.stdin.read(keystrokeBuff);
    const pressed = keystrokeBuff[0];

    if (KEYS.w === pressed) inc += 1;
    if (KEYS.s === pressed) inc -= 1; //w
    if (pressed === 3) return true; // Ctrl+C
  }
};

createCanvas(canvas);

const cube = new Cuboid(0, 0, 200, 100, 100, 100);
const shapes = [cube];

const renderLoop = async () => {
  const keystrokeBuff = new Uint8Array(1);

  while (true) {
    cls();

    handleKeystrokes(keystrokeBuff);
    console.log({ inc });

    cube.increaseRotation({
      x: inc,
      y: inc,
      z: inc,
    });

    console.log({ keystrokeBuff }, inc);

    plotShapes(shapes);
    draw();

    await delay(100);
  }
};

await renderLoop();

Deno.stdin.setRaw(false);
