import { canvas } from "./config.js";

// @ts-nocheck:
export const WORLD_ITEMS = {
  screenZ: 30,
};

export const toRadian = (d) => {
  return d * (Math.PI / 180);
};

export const createVector = (x = 0, y = 0, z = 0) => {
  return {
    x,
    y,
    z,
    add({ x = 0, y = 0, z = 0 }) {
      this.x += x;
      this.y += y;
      this.z += z;
      return this;
    },

    subtract({ x = 0, y = 0, z = 0 }) {
      this.x -= x;
      this.y -= y;
      this.z -= z;
      return this;
    },
  };
};

export const getProjection = (p, screenZ = WORLD_ITEMS.screenZ) => {
  const pX = screenZ * p.x / p.z;
  const pY = screenZ * p.y / p.z;
  return createVector(pX, pY);
};

export const drawShapes = (shapes) => {
  shapes.forEach((shape) => {
    const faces = shape.printableFaces();
    faces.forEach((vertices) => {
      for (let i = 1; i < vertices.length; i += 1) {
        const p1 = getProjection(vertices[i - 1]);
        const p2 = getProjection(vertices[i]);

        p1.add({ x: canvas.width / 2, y: canvas.height / 2, z: 0 });
        p2.add({ x: canvas.width / 2, y: canvas.height / 2, z: 0 });

        drawLine(p1, p2, canvas);
      }
    });
  });
};
export const isInRange = (min, value, max) => min < value && value < max;

export const plotPoint = (y, x, screen, icon = "  ") => {
  const plotX = Math.round(y);
  const plotY = Math.round(x);
  const isInbound = isInRange(0, plotX, screen.width - 1) &&
    isInRange(0, plotY, screen.height - 1);

  if (isInbound) screen.pixels[plotY][plotX] = icon;
};

export const drawLine = (p1, p2, canvas) => {
  const dy = p1.y - p2.y;
  const dx = p1.x - p2.x;

  const steps = Math.max(Math.abs(dy), Math.abs(dx));

  const stepsInX = dx / steps;
  const stepsInY = dy / steps;

  let x = p2.x;
  let y = p2.y;

  for (let inc = 0; inc <= steps; inc++) {
    canvas.pixels[Math.round(y)][Math.round(x)] = "..";
    x += stepsInX;
    y += stepsInY;
  }
};
