import { createVector } from "./utilities.js";
const UNIT_RAD = Math.PI / 180;
export const toRadian = (d) => d * UNIT_RAD;

export class Cuboid {
  constructor(x, y, z, w, h, d) {
    this.centre = createVector(x, y, z);
    this.w = w;
    this.h = h;
    this.d = d;
    this.vertices = this.createVertices();
    this.faces = this.createFaces();
    this.rotation = createVector();
    this.translation = createVector();
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

  createFaces() {
    const [p1, p2, p3, p4, p5, p6, p7, p8] = this.vertices;

    const f1 = [p1, p2, p3, p4]; // FRONT
    const f2 = [p5, p6, p7, p8]; // BACK
    const f3 = [p1, p4, p5, p8]; // TOP
    const f4 = [p2, p3, p6, p7]; // BOTTOM
    const f5 = [p1, p8, p7, p2]; // LEFT
    const f6 = [p4, p3, p6, p5]; // RIGHT

    return [f1, f2, f3, f4, f5, f6];
  }

  increaseRotation(delta = { x: 1 }) {
    this.rotation.add(delta);
  }

  increaseTranslation(delta = { x: 1 }) {
    this.translation.add(delta);
  }

  rotateVertex(vertex, rotation) {
    const radX = toRadian(rotation.x);
    const radY = toRadian(rotation.y);
    const radZ = toRadian(rotation.z);
    // ===============rotate in X ============//

    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const y1 = cosX * vertex.y - sinX * vertex.z;
    const z1 = sinX * vertex.y + cosX * vertex.z;

    // ===============rotate in Y ============//
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);
    const x1 = cosY * vertex.x + sinY * z1;
    const z2 = -sinY * vertex.x + cosY * z1;

    // ===============rotate in Z ============//
    const cosZ = Math.cos(radZ);
    const sinZ = Math.sin(radZ);
    const x2 = cosZ * x1 - sinZ * y1;
    const y2 = sinZ * x1 + cosZ * y1;

    return createVector(x2, y2, z2);
  }

  rotateVertices() {
    return this.faces.map((face) => {
      return face.map((vertex) => {
        return this.rotateVertex(vertex, this.rotation);
      });
    });
  }

  translatedPoints(faces = this.faces) {
    return faces.map((face) => {
      return face.map(({ x, y, z }) =>
        createVector(x, y, z).add(this.translation)
      );
    });
  }

  getWorldPoints(rotated = this.faces) {
    return rotated.map((face) => {
      return face.map(({ x, y, z }) => {
        return createVector(x, y, z).add(this.centre);
      });
    });
  }

  printableFaces() {
    const rotated = this.rotateVertices();
    const translated = this.translatedPoints(rotated);
    return this.getWorldPoints(translated);
  }
}

export class Sphere {
  constructor(r = 50, x = 0, y = 0, z = 0) {
    this.centre = createVector(x, y, z);
    this.r = r;
    this.vertices = this.createVertices();
    this.translation = createVector();
    this.rotation = createVector();
  }

  createVertices(steps = 8) {
    const increment = Math.PI / steps;
    const vertices = [];

    for (let phi = 0; phi <= Math.PI; phi += increment) {
      for (let theta = 0; theta < Math.PI * 2; theta += increment) {
        const sine = this.r * Math.sin(phi);
        const x = sine * Math.cos(theta);
        const y = sine * Math.sin(theta);
        const z = this.r * Math.cos(phi);
        vertices.push(createVector(x, y, z));
      }
    }
    return vertices;
  }

  increaseTranslation(delta = { x: 1 }) {
    this.translation.add(delta);
  }
  increaseRotation(delta = { x: 1 }) {
    this.rotation.add(delta);
  }

  rotateVertex(vertex, rotation) {
    const radX = toRadian(rotation.x);
    const radY = toRadian(rotation.y);
    const radZ = toRadian(rotation.z);
    // ===============rotate in X ============//

    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const y1 = cosX * vertex.y - sinX * vertex.z;
    const z1 = sinX * vertex.y + cosX * vertex.z;

    // ===============rotate in Y ============//
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);
    const x1 = cosY * vertex.x + sinY * z1;
    const z2 = -sinY * vertex.x + cosY * z1;

    // ===============rotate in Z ============//
    const cosZ = Math.cos(radZ);
    const sinZ = Math.sin(radZ);
    const x2 = cosZ * x1 - sinZ * y1;
    const y2 = sinZ * x1 + cosZ * y1;

    return createVector(x2, y2, z2);
  }

  rotateVertices() {
    return this.vertices.map((vertex) => {
      const rotatedVertex = this.rotateVertex(vertex, this.rotation);

      return rotatedVertex;
    });
  }

  getWorldPoints() {
    const rotated = this.rotateVertices();
    return rotated
      .map((
        { x, y, z },
      ) => [createVector(x, y, z).add(this.centre).add(this.translation)]);
  }
  printableFaces() {
    return this.getWorldPoints();
  }
}
