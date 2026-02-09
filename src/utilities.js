import { canvas } from "./config.js";

const offsetCentre = { x: canvas.width / 2, y: canvas.height / 2, z: 0 };

class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add({ x = 0, y = 0, z = 0 }) {
    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }
}

export const createVector = (x = 0, y = 0, z = 0) => new Vector(x, y, z);

const getProjection = (p, screenZ = 30) => {
  const z = Math.max(screenZ + 10, p.z);
  const pX = screenZ * p.x / z;
  const pY = screenZ * p.y / z;

  return createVector(pX, pY);
};
const drawVertexLine = (vertices, index) => {
  const p1 = getProjection(vertices[index]);
  const p2 = getProjection(vertices.at(index - 1));
  p1.add(offsetCentre);
  p2.add(offsetCentre);
  drawLine(p1, p2, canvas);
};
const drawWireFrame = (vertices) => {
  for (let i = 0; i < vertices.length; ++i) {
    drawVertexLine(vertices, i);
  }
};

export const plotShape = (shape) =>
  shape.printableFaces().forEach(drawWireFrame);
export const plotShapes = (shapes) => shapes.forEach(plotShape);
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
    plotPoint(y, x, canvas, "💋");
    // canvas.pixels[Math.round(y)][Math.round(x)] = "XX";
    x += stepsInX;
    y += stepsInY;
  }
};
