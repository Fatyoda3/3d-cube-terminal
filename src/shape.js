import { createVector } from "./utilities.js";
export class Cuboid {
  constructor(x, y, z, h, w, d) {
    this.centre = createVector(x, y, z);
    this.h = h;
    this.w = w;
    this.d = d;

    this.vertices = this.createVertices();
    this.faces = this.createFaces(this.vertices);

    this.rotations = createVector(0, 0, 0);
  }

  createVertices() {
    // {FRONT/BACK}<->{LEFT/RIGHT}<->{TOP/BOTTOM}
    const [w2, h2, d2] = [this.w / 2, this.h / 2, this.d / 2];
    const p1 = createVector(-w2, -h2, -d2); //(F-L-T)
    const p2 = createVector(-w2, +h2, -d2); //(F-L-B)
    const p3 = createVector(+w2, +h2, -d2); //(F-R-B)
    const p4 = createVector(+w2, -h2, -d2); //(F-R-T)
    const p5 = createVector(+w2, -h2, +d2); //(B-R-T)
    const p6 = createVector(+w2, +h2, +d2); //(B-R-B)
    const p7 = createVector(-w2, +h2, +d2); //(B-L-B)
    const p8 = createVector(-w2, -h2, +d2); //(B-L-T)
    return [p1, p2, p3, p4, p5, p6, p7, p8];
  }

  createFaces(vertices = this.vertices) {
    const [p1, p2, p3, p4, p5, p6, p7, p8] = vertices;

    const f1 = [p1, p2, p3, p4]; // FRONT
    const f2 = [p5, p6, p7, p8]; // BACK
    const f3 = [p1, p4, p5, p8]; // TOP
    const f4 = [p2, p3, p6, p7]; // BOTTOM
    const f5 = [p1, p8, p7, p2]; // LEFT
    const f6 = [p4, p3, p6, p5]; // RIGHT

    return [f1, f2, f3, f4, f5, f6];
  }

  changeRotation(x = 0, y = 0, z = 0) {
    this.rotations.add(createVector(x, y, z));
  }

  rotateInAxis(point, angle, fromAxis = "x", toAxis = "y") {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    const fromAxisPoint = point[fromAxis] * c - point[toAxis] * s;
    const toAxisPoint = point[fromAxis] * s + point[toAxis] * c;

    return [fromAxisPoint, toAxisPoint];
  }

  angleBetween(p1, p2, dA, axis1 = "x", axis2 = "z") {
    const dAxis1 = p1[axis1] - p2[axis1];
    const dAxis2 = p1[axis2] - p2[axis2];

    const angle = Math.atan2(dAxis2, dAxis1) + dA;
    const radius = Math.sqrt((dAxis1 ** 2) + (dAxis2 ** 2));

    const delAxis1 = Math.sin(angle) * radius + p2[axis2];
    const delAxis2 = Math.cos(angle) * radius + p2[axis1];

    return [delAxis2, delAxis1];
  }

  rotateVerticesAtOneAxis(points, reference) {
    points.forEach((point) => {
      let [v1, v2] = this.angleBetween(
        point,
        reference,
        this.rotations.z,
        "x",
        "y",
      );
      point["x"] = v1;
      point["y"] = v2;
      [v1, v2] = this.angleBetween(
        point,
        reference,
        this.rotations.x,
        "y",
        "z",
      );
      point["y"] = v1;
      point["z"] = v2;
      [v1, v2] = this.angleBetween(
        point,
        reference,
        this.rotations.y,
        "z",
        "x",
      );
      point["z"] = v1;
      point["x"] = v2;
    });
  }

  rotateVertices() {
    const points = this.vertices.map((p) => ({ ...p }));

    this.rotateVerticesAtOneAxis(
      points,
      createVector(0, 0, 0),
    );

    return points.map((p) => {
      const newX = p.x + this.centre.x;
      const newY = p.y + this.centre.y;
      const newZ = p.z + this.centre.z;
      return { x: newX, y: newY, z: newZ };
    });
  }

  printableFaces() {
    const newPoints = this.rotateVertices();
    const faces = this.createFaces(newPoints);
    return faces;
  }
}
