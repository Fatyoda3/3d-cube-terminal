import { plotShapes } from "./src/utilities.js";
import { canvas, createCanvas } from "./src/config.js";
import { Cuboid } from "./src/shape.js";
import { cls, draw } from "./src/cls.js";
import { delay } from "./src/delay.js";
let mode = true;

const incRotation = { x: 0, y: 0 };
const incTranslate = { x: 0, y: 0 };

const KEYS = {
  w: 119,
  a: 97,
  s: 115,
  d: 100,
  i: 105,
  j: 106,
  k: 107,
  l: 108,
  b: 98,
};

Deno.stdin.setRaw(true, { cbreak: true });

const handleKeystrokes = async (keystrokeBuff) => {
  while (true) {
    await Deno.stdin.read(keystrokeBuff);
    const pressed = keystrokeBuff[0];
    //y -->
    if (KEYS.b === pressed) mode = !mode;

    if (KEYS.w === pressed) incTranslate.y -= 5;
    if (KEYS.s === pressed) incTranslate.y += 5;
    // x -->
    if (KEYS.d === pressed) incTranslate.x += 5;
    if (KEYS.a === pressed) incTranslate.x -= 5;

    //y -->
    if (KEYS.j === pressed) incRotation.x -= 5;
    if (KEYS.l === pressed) incRotation.x += 5;
    // x -->
    if (KEYS.i === pressed) incRotation.y += 5;
    if (KEYS.k === pressed) incRotation.y -= 5;

    if (pressed === 3) return true; // Ctrl+C
  }
};

createCanvas(canvas);

const cube = new Cuboid(0, 0, 300, 100, 100, 100);
const shapes = [cube];

const renderLoop = async () => {
  const keystrokeBuff = new Uint8Array(1);

  while (true) {
    cls();

    handleKeystrokes(keystrokeBuff);
    console.log({ incRotation, incTranslate, mode });

    cube.increaseRotation({
      x: incRotation.x,
      y: incRotation.y,
      z: 0,
    });

    cube.increaseTranslation({
      x: incTranslate.y,
      y: incTranslate.x,
      z: 0,
    });

    if (mode) {
      incTranslate.x = 0;
      incTranslate.y = 0;

      incRotation.x = 0;
      incRotation.y = 0;
    }

    plotShapes(shapes);
    draw();

    await delay(100);
  }
};

await renderLoop();

Deno.stdin.setRaw(false);
