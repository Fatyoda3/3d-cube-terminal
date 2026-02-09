import { plotShapes } from "./src/utilities.js";
import { canvas, createCanvas } from "./src/config.js";
import { Cuboid, Sphere } from "./src/shape.js";
import { cls, draw } from "./src/cls.js";
import { delay } from "./src/delay.js";
let mode = true;

const incRotation = { x: 0, y: 0, z: 0 };
const incTranslate = { x: 0, y: 0, z: 0 };

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
  "0": 48,
  "9": 57,
  "-": 45,
  "=": 61,
  q: 113,
  e: 101,
};

Deno.stdin.setRaw(true, { cbreak: true });

const handleKeystrokes = async (keystrokeBuff) => {
  while (true) {
    await Deno.stdin.read(keystrokeBuff);
    const pressed = keystrokeBuff[0];
    //y -->
    if (KEYS.b === pressed) mode = !mode;

    if (KEYS.w === pressed) incTranslate.x -= 5;
    if (KEYS.s === pressed) incTranslate.x += 5;
    // x -->
    if (KEYS.d === pressed) incTranslate.y += 5;
    if (KEYS.a === pressed) incTranslate.y -= 5;

    if (KEYS.q === pressed) incTranslate.z += 5;
    if (KEYS.e === pressed) incTranslate.z -= 5;

    //y -->
    if (KEYS.j === pressed) incRotation.x -= 5;
    if (KEYS.l === pressed) incRotation.x += 5;
    // x -->
    if (KEYS.i === pressed) incRotation.y += 5;
    if (KEYS.k === pressed) incRotation.y -= 5;
    //z
    if (KEYS["0"] === pressed) incRotation.z += 5;
    if (KEYS["9"] === pressed) incRotation.z -= 5;

    if (pressed === 3) return true; // Ctrl+C
  }
};

createCanvas(canvas);

const cube = new Cuboid(-100, 0, 200, 75, 75, 75);
const sphere = new Sphere(200, -300, -100, 600);
const shapes = [sphere, cube];

const renderLoop = async () => {
  const keystrokeBuff = new Uint8Array(1);

  while (true) {
    cls();

    handleKeystrokes(keystrokeBuff);
    console.log({ incRotation, incTranslate, mode });

    cube.increaseRotation(incRotation);
    cube.increaseTranslation(incTranslate);

    sphere.increaseTranslation(incTranslate);

    if (mode) {
      incTranslate.x = 0;
      incTranslate.y = 0;
      incTranslate.z = 0;

      incRotation.x = 0;
      incRotation.y = 0;
      incRotation.z = 0;
    }

    plotShapes(shapes);
    draw();

    await delay(100);
  }
};

await renderLoop();

Deno.stdin.setRaw(false);
