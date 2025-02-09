let n = 250;
let weight = 1;
let alpha = 0;
let beta = Math.PI / 2;
let circlesActive = false;

let colors = [
  [255, 0, 0],
  [0, 0, 255],
  [0, 255, 0],
  [255, 255, 0],
];

function setup() {
  createCanvas(windowHeight, windowHeight);
}

function draw() {
  clear(0);
  // background(255);

  let unit = width / n;
  strokeWeight(weight);

  blendMode(SCREEN);

  translate(width / 2, height / 2);

  scale(2);

  if (!circlesActive) {
    push();
    alpha -= 0.001;
    rotate(alpha);

    let c1 = color(...colors[0]);
    let c2 = color(...colors[1]);
    let c3 = color(...colors[2]);
    let c4 = color(...colors[3]);

    for (let i = 0; i < n; i++) {
      strokeWeight(
        weight + ((sin(frameCount / 50 + (i / n) * 20) + 1) / 2) * weight
      );

      stroke(lerpColor(c1, c2, i / n));

      line(
        -width / 2,
        -height / 2 + unit * i,
        width / 2,
        -height / 2 + unit * i
      );
    }

    pop();

    push();

    beta += 0.00005;
    rotate(beta);

    for (let i = 0; i < n; i++) {
      strokeWeight(
        weight + ((sin(frameCount / 50 + (i / n) * 20) + 1) / 2) * weight
      );

      stroke(lerpColor(c3, c4, i / n));

      line(
        -width / 2,
        -height / 2 + unit * i,
        width / 2,
        -height / 2 + unit * i
      );
    }

    pop();
  } else {
    push();
    translate(-(sin(frameCount / 100) * width) / 4, 0);
    stroke(...colors[0]);
    noFill();
    for (let i = 0; i < n; i++) {
      // strokeWeight(
      //   weight + ((sin(frameCount / 50 + (i / n) * 50) + 1) / 2) * weight
      // );
      let r = (height / n) * (i + 1);
      ellipse(0, 0, r, r);
    }
    pop();

    push();
    stroke(...colors[1]);
    translate((sin(frameCount / 100) * width) / 4, 0);
    noFill();
    for (let i = 0; i < n; i++) {
      // strokeWeight(
      //   weight + ((sin(frameCount / 50 + (i / n) * 50) + 1) / 2) * weight
      // );
      let r = (height / n) * (i + 1);
      ellipse(0, 0, r, r);
    }
    pop();
  }
}

const weightRange = document.querySelector("input.weight");
const numberRange = document.querySelector("input.number");
const weightLabel = document.querySelector("label.weight");
const numberLabel = document.querySelector("label.number");
const colorInputs = document.querySelectorAll(".color");
const circlesCheckBox = document.querySelector(".circles");

weightRange.value = weight;
numberRange.value = n;
weightLabel.innerHTML = weight;
numberLabel.innerHTML = n;
circlesCheckBox.checked = circlesActive;

weightRange.addEventListener("input", (e) => {
  weightLabel.innerHTML = weightRange.value;
  weight = Number(weightRange.value);
});

numberRange.addEventListener("input", (e) => {
  numberLabel.innerHTML = numberRange.value;
  n = Number(numberRange.value);
});

Array.from(colorInputs).forEach((input, index) => {
  input.addEventListener("input", (v) => {
    colors[index] = hexToRgb(input.value);
  });
});

circlesCheckBox.addEventListener("input", (v) => {
  circlesActive = circlesCheckBox.checked;
});

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}
