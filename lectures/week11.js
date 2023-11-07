const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const btn = document.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
});

function random(number) {
  return Math.floor(Math.random() * number);
}

async function drawCircle() {
    let drawit = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  while(drawit){
    ctx.beginPath();
    let red = random(255);
    let green = random(255);
    let blue = random(255);
    let color = "rgba(" + red + "," + green + "," + blue + ",0.5)";
    ctx.fillStyle = color;
    ctx.arc(
      random(canvas.width),
      random(canvas.height),
      random(50),
      0,
      2 * Math.PI
    );
    ctx.fill();
    await sleep(1); // Use the sleep function to introduce a delay
  }
}

btn.addEventListener("click", drawCircle);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
