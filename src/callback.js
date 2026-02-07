// @ts-nocheck:

// const moveCallback = (shape, delta = 5) => {
//   if (keyIsDown(KEYS.LEFT)) {
//     shape.centre.x -= delta;
//   }
//   if (keyIsDown(KEYS.RIGHT)) {
//     shape.centre.x += delta;
//   }
//   if (keyIsDown(KEYS.UP)) {
//     shape.centre.y -= delta;
//   }
//   if (keyIsDown(KEYS.DOWN)) {
//     shape.centre.y += delta;
//   }
//   if (keyIsDown(KEYS.NINE)) {
//     shape.centre.z -= delta;
//   }
//   if (keyIsDown(KEYS.ZERO)) {
//     shape.centre.z += delta;
//   }
// };

// const rotateCallback = (shape, delta = PI / 180) => {
//   if (keyIsDown(KEYS.W)) {
//     shape.changeRotation(-delta)
//   }
//   if (keyIsDown(KEYS.S)) {
//     shape.changeRotation(+delta)
//   }
//   if (keyIsDown(KEYS.A)) {
//     shape.changeRotation(0, +delta)
//   }
//   if (keyIsDown(KEYS.D)) {
//     shape.changeRotation(0, -delta)
//   }
//   if (keyIsDown(KEYS.Q)) {
//     shape.changeRotation(0, 0, -delta)
//   }
//   if (keyIsDown(KEYS.E)) {
//     shape.changeRotation(0, 0, +delta)
//   }
// }

// const callback = (shapes, mode = "eye") => {
//   if (mode === "eye") {
//     shapes.map((shape) => moveCallback(shape));
//     shapes.map((shape) => rotateCallback(shape));
//   } else {
//     const selectedShape = shapes[selectedIdx];
//     moveCallback(selectedShape);
//     rotateCallback(selectedShape)
//   }
// };


// function keyPressed() {
//   if (key === "M" || key === "m") {
//     mode = mode === MODES.eye ? MODES.object : MODES.eye;
//   }
//   if (key === '[' || key === '{') {
//     selectedIdx = (selectedIdx === 0) ? (SHAPES.length - 1) : (selectedIdx - 1);
//   }
//   if (key === ']' || key === '}') {
//     selectedIdx = (selectedIdx + 1) % SHAPES.length;
//   }
// }
