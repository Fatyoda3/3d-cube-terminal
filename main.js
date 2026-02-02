import { Cube } from "./src/shape.js";
import { draw, getPoints, makeScreen, plotPoint } from "./src/utilities.js";
const [X, Y, Z] = [0, 1, 2];

const getProjection = (p, screenZ = 10) => {
  const pX = screenZ * p[X] / p[Z];
  const pY = screenZ * p[Y] / p[Z];
  return { pX, pY };
};

const screen = makeScreen(50, 50);

const cube = new Cube(40, 10, 50, 10, 10, 10);

const projectedPoints = cube.faces.map((face) =>
  face.map((vertices) => getProjection(vertices))
);

projectedPoints.forEach((face) => {
  face.forEach((point) => plotPoint(point.pY, point.pX, screen, "XX"));
});
for (const face of projectedPoints) {
  const first = face.at(0);
  for (let i = 1; i < face.length; i += 1) {
    const p1 = face[i - 1];
    const p2 = face[i];
    const points = getPoints(p1, p2);

    points.forEach((point) => {
      plotPoint(point.y, point.x, screen, "--");
    });
  }

  const last = face.at(-1);
  const points = getPoints(last, first);

  points.forEach((point) => {
    plotPoint(point.y, point.x, screen, "--");
  });
}

draw(screen, false);
