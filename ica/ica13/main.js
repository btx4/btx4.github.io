// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    // Draw the border
    ctx.beginPath();
    ctx.strokeStyle = this.darkenColor(this.color, 20); // Adjust the value (20) to control the darkness of the border
    ctx.lineWidth = 2;
    ctx.arc(this.x, this.y, this.size + 2, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw the ball
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  darkenColor(color, amount) {
    // Darken the color by reducing each RGB component
    const [r, g, b] = color.match(/\d+/g);
    const darkenedR = Math.max(0, r - amount);
    const darkenedG = Math.max(0, g - amount);
    const darkenedB = Math.max(0, b - amount);
    return `rgb(${darkenedR},${darkenedG},${darkenedB})`;
}
  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
    if (this.x - this.size <= 0) {
      this.velX = -this.velX ;
    }
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
    if (this.y - this.size < 0) {
      this.velY = -this.velY;
    }
    this.x = this.x + this.velX;
    this.y = this.y + this.velY;
  }
  checkCollision(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + otherBall.size) {
      if((Math.abs(this.velX) + Math.abs(this.velY)) > (Math.abs(otherBall.velX) + Math.abs(otherBall.velY))){
        otherBall.color = this.color;
      } else {
        this.color = otherBall.color;
      }
      // Balls have collided, so adjust their velocities
      const angle = Math.atan2(dy, dx);
      const speed = Math.sqrt(this.velX ** 2 + this.velY ** 2);

      // Adjust velocity based on the size of the other ball
      const impactFactor = Math.max(0.2, Math.min(1, this.size / otherBall.size));
      const impactSpeed = speed * impactFactor;

      this.velX = impactSpeed * Math.cos(angle);
      this.velY = impactSpeed * Math.sin(angle);
    }
  }

}

const balls = [];
while(balls.length < 30) {
    const size = random (10, 15);
    const ball = new Ball(
        random( size, width -size),
        random( size, height - size),
        random(-6,6),
        random(-6,6),
        randomRGB(),
        size
    )
    balls.push(ball);
}

function animationLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Update and draw the ball
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    for (let j = 0; j < balls.length; j++) {
        if (i !== j) {
          balls[i].checkCollision(balls[j]);
        }
      }
    balls[i].draw();
  }

  // Request the next animation frame
  requestAnimationFrame(animationLoop);
}

// Start the animation loop
animationLoop();
