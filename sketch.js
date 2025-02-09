let n = 250;
let weight = 1;
let alpha = 0;
let beta = Math.PI / 2;

let colors = [
  [255, 0, 0],
  [0, 0, 255],
];

function setup() {
  createCanvas(windowHeight, windowHeight);
}

function draw() {
  clear();

  let unit = width / n;
  strokeWeight(weight);

  blendMode(SCREEN);

  translate(width / 2, height / 2);

  scale(2);

  push();
  stroke(...colors[0]);
  alpha -= 0.001;
  rotate(alpha);

  for (let i = 0; i < n; i++) {
    strokeWeight(
      weight + ((sin(frameCount / 50 + (i / n) * 50) + 1) / 2) * weight
    );
    line(-width / 2, -height / 2 + unit * i, width / 2, -height / 2 + unit * i);
  }

  pop();

  push();

  stroke(...colors[1]);
  beta += 0.00005;
  rotate(beta);

  for (let i = 0; i < n; i++) {
    strokeWeight(
      weight + ((sin(frameCount / 50 + (i / n) * 50) + 1) / 2) * weight
    );
    line(-width / 2, -height / 2 + unit * i, width / 2, -height / 2 + unit * i);
  }

  pop();
}

const weightRange = document.querySelector("input.weight");
const numberRange = document.querySelector("input.number");

weightRange.value = weight;
numberRange.value = n;

const weightLabel = document.querySelector("label.weight");
const numberLabel = document.querySelector("label.number");

weightLabel.innerHTML = weight;
numberLabel.innerHTML = n;

const colorInputs = document.querySelectorAll(".color");

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
