import { drawShapes, toRadian } from "./src/utilities.js";
import { canvas, createCanvas } from "./src/config.js";
import { Cuboid } from "./src/shape.js";

const SHAPES = [];
const [X, Y] = [0, 1];

const setup = () => {
  console.clear();
  createCanvas(canvas);
  const offsets = [[-1, 1], [1, -1], [1, 1], [-1, -1], [0, 0]];
  const params = [200, 100, 100, 100];

  for (const offset of offsets) {
    const cube = new Cuboid(200 * offset[X], 200 * offset[Y], ...params);
    SHAPES.push(cube);
  }
};

const draw = () => {
  drawShapes(SHAPES);
};

const delay = async (time) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, time);
  });
};

const animateLoop = async () => {
  const unitRadian = toRadian(1);

  while (true) {
    createCanvas(canvas);

    SHAPES.forEach((shape) =>
      shape.changeRotation(unitRadian, unitRadian, unitRadian)
    );

    draw();

    console.log(canvas.pixels.map((row) => row.join("")).join("\n"));

    await delay(100);
  }
};


const main = () => {
  setup();
  animateLoop();
};
main();
