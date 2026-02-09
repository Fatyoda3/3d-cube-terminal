import { plotShapes } from "./src/utilities.js";
import { canvas, createCanvas } from "./src/config.js";
import { Cuboid } from "./src/shape.js";
import { cls, draw } from "./src/cls.js";
import { delay } from "./src/delay.js";

let incRotation = 0;
let incTranslate = 0;

const KEYS = { w: 119, a: 97, s: 115, d: 100, i: 105, j: 106, k: 107, l: 108 };

Deno.stdin.setRaw(true, { cbreak: true });

const handleKeystrokes = async (keystrokeBuff) => {
  while (true) {
    await Deno.stdin.read(keystrokeBuff);
    const pressed = keystrokeBuff[0];

    if (KEYS.w === pressed) incRotation += 1;
    if (KEYS.s === pressed) incRotation -= 1;
    if (KEYS.d === pressed) incTranslate += 1;
    if (KEYS.a === pressed) incTranslate -= 1;
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
    console.log({ incRotation, incTranslate });

    cube.increaseRotation({
      x: incRotation,
      y: incRotation,
      z: incRotation,
    });

    cube.increaseTranslation({
      x: incTranslate,
      y: incTranslate,
      z: incTranslate,
    });

    console.log({ keystrokeBuff }, incRotation);

    plotShapes(shapes);
    draw();

    await delay(100);
  }
};

await renderLoop();

Deno.stdin.setRaw(false);
