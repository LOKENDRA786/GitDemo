const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultText = document.getElementById("result");

// Define the segments of the wheel
const segments = [
  { label: "10 Points", color: "#FF0000" },
  { label: "20 Points", color: "#FFA500" },
  { label: "30 Points", color: "#FFFF00" },
  { label: "40 Points", color: "#008000" },
  { label: "50 Points", color: "#0000FF" },
  { label: "60 Points", color: "#4B0082" },
  { label: "70 Points", color: "#EE82EE" },
  { label: "80 Points", color: "#FF1493" },
  { label: "100 Points", color: "#00FFFF" }
];

// Wheel properties
const numSegments = segments.length;
const segmentAngle = (2 * Math.PI) / numSegments;
let angle = 0;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;
let isSpinning = false;

// Draw the wheel
function drawWheel() {
  for (let i = 0; i < numSegments; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    // Draw each segment
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, startAngle, endAngle);
    ctx.fillStyle = segments[i].color;
    ctx.fill();
    ctx.stroke();

    // Add text to each segment
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 16px Arial";
    ctx.fillText(segments[i].label, 220, 10);
    ctx.restore();
  }
}

// Spin the wheel
function rotateWheel() {
  spinTime += 30;

  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }

  const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  angle += (spinAngle * Math.PI) / 180;
  draw();

  requestAnimationFrame(rotateWheel);
}

function easeOut(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

function stopRotateWheel() {
  const index = Math.floor(numSegments - (angle % (2 * Math.PI)) / segmentAngle) % numSegments;
  resultText.innerText = `You won ${segments[index].label}`;
  isSpinning = false;
}

function draw() {
  ctx.clearRect(0, 0, 500, 500);
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate(angle);
  drawWheel();
  ctx.restore();
}

spinButton.addEventListener("click", function () {
  if (isSpinning) return;
  isSpinning = true;

  spinAngleStart = Math.random() * 500 + 500;
  spinTime = 0;
  spinTime
