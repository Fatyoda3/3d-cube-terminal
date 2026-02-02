const CELL = "  ";

export const isInRange = (min, value, max) => min < value && value < max;

export const makeScreen = (height, width) => ({
  pixels: Array.from(
    { length: height },
    () => Array.from({ length: width }, () => CELL),
  ),
  height,
  width,
});

export const plotPoint = (y, x, screen, icon = "  ") => {
  const plotX = Math.round(-y + (screen.height / 2));
  const plotY = Math.round(-x + (screen.width / 2));
  const isInbound = isInRange(0, plotX, screen.width - 1) &&
    isInRange(0, plotY, screen.height - 1);

  if (isInbound) screen.pixels[plotY][plotX] = icon;
};

export const draw = (screen, debug = false) => {
  if (debug) return;
  const rendered = screen.pixels.map((line) => `|${line.join("")}|`).join("\n");
  const border = "-".repeat((screen.width + 1) * 2);

  console.log(border);
  console.log(rendered);
  console.log(border);
};

export const getPoints = (p1, p2) => {
  const dy = p1.pY - p2.pY;
  const dx = p1.pX - p2.pX;
  const points = [];
  const steps = Math.max(Math.abs(dy), Math.abs(dx));
  const stepsInX = dx / steps;
  const stepsInY = dy / steps;

  for (let inc = 0; inc <= steps; inc++) {
    points.push({
      x: p1.pX + (inc * stepsInX),
      y: p1.pY + (inc * stepsInY),
    });
  }
  return points;
};
