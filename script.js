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

// Basic wheel configuration
const numSegments = segments.length;
const segmentAngle = (2 * Math.PI) / numSegments;
let angle = 0; // Current angle of the wheel

// Draw the wheel
function drawWheel() {
  for (let i = 0; i < numSegments; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    // Set color for each segment
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = segments[i].color;
    ctx.fill();

    // Add labels for each segment
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.fillStyle = "#000";
    ctx.font = "18px Arial";
    ctx.fillText(segments[i].label, 100, 10);
    ctx.restore();
  }
}

// Spin logic
let spinning = false;
let spinSpeed = 0;

function spinWheel() {
  if (spinning) return; // Prevent multiple spins at once
  spinning = true;

  spinSpeed = Math.random() * 0.3 + 0.2; // Random spin speed

  const spinInterval = setInterval(() => {
    angle += spinSpeed;
    spinSpeed *= 0.99; // Slow down gradually
    if (spinSpeed < 0.01) {
      clearInterval(spinInterval);
      spinning = false;
      showResult();
    }

    draw();
  }, 16);
}

// Draw the spinning wheel
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate(angle);
  drawWheel();
  ctx.restore();
}

// Show the result of the spin
function showResult() {
  const winningSegment = segments[Math.floor((angle / segmentAngle) % numSegments)];
  resultText.innerText = `Congratulations! You won ${winningSegment.label}!`;
}

spinButton.addEventListener("click", spinWheel);

// Initial draw
drawWheel();
