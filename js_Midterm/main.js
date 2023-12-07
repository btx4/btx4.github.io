// setup canvas

appendedNumbersCount = 0;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const pregameOverlay = document.getElementById("pregame-overlay");

const startGameButton = document.getElementById("start-game-button");


// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
class MouseBall {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

let mouseBall = new MouseBall(-0, height / 2, randomRGB(), 100);

function updateMouseBallPosition(event) {
  mouseBall.y = event.clientY;
}

// Add an event listener to track mouse movement
window.addEventListener("mousemove", updateMouseBallPosition);

const rectangles = [];

// Function to generate a random color for rectangles
function randomRectColor() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
class Rectangle {
  constructor(x, y, width, height, color, number) {
    this.number = number;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.collided = false; // New property to track collision state
    this.collideTimeout = 1000; // Time in milliseconds for how long the rectangle stays darker
  }

  handleCollision(ball) {
    this.collided = true;
    let originalColor = this.color;
    ball.color = this.color;
    this.color = this.darkenColor();
    updateHtmlDocument(this.number);

    // Set a timeout to reset the collision state after a certain duration
    setTimeout(() => {
      this.collided = false;
      this.color = originalColor;
    }, this.collideTimeout);
  }

  darkenColor() {
    // Darken the color by reducing each RGB component
    const [r, g, b] = this.color.match(/\d+/g);
    const amount = 100; // You can adjust this value to control the darkness
    const darkenedR = Math.max(0, r - amount);
    const darkenedG = Math.max(0, g - amount);
    const darkenedB = Math.max(0, b - amount);
    return `rgb(${darkenedR},${darkenedG},${darkenedB})`;
  }
}
// Function to generate rectangles
function generateRectangles() {
  const rectWidth = 50;
  const rectHeight = (height - 55) / 10;
  const padding = 5;

  for (let i = 0; i < 10; i++) {
    const rectX = width - rectWidth - padding;
    const rectY = i * (rectHeight + padding) + padding;
    const rectColor = randomRectColor();

    // Create a new Rectangle instance and store it in the array
    rectangles.push(
      new Rectangle(rectX, rectY, rectWidth, rectHeight, rectColor, i)
    );
  }
}
generateRectangles();

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
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
    if (this.y - this.size < 0) {
      this.velY = -this.velY;
    }
    this.x = this.x + this.velX;
    this.y = this.y + this.velY;

    for (let i = 0; i < rectangles.length; i++) {
      const rect = rectangles[i];
      // Check if the ball is inside the rectangle
      if (this.x + this.size >= rect.x) {
        // Collided with the rectangle, adjust the velocity
        if (this.y >= rect.y - 3 && this.y <= rect.y + rect.height + 2) {
          this.velX = -this.velX; // Reverse horizontal velocity
          rect.handleCollision(this);
        }
      }
    }
  }
  checkCollision(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + otherBall.size) {
      // Calculate the overlap distance
      const overlap = this.size + otherBall.size - distance;

      // Calculate the normalized collision vector
      const normalX = dx / distance;
      const normalY = dy / distance;

      // Separate the balls along the collision vector
      const separationX = overlap * normalX;
      const separationY = overlap * normalY;

      // Move the balls away from each other
      this.x += separationX / 2;
      this.y += separationY / 2;

      // Rest of the collision response code (color matching and velocity adjustment) remains unchanged
      // ...

      // Balls have collided, so adjust their velocities
      const angle = Math.atan2(dy, dx);
      const speed = Math.sqrt(this.velX ** 2 + this.velY ** 2);

      // Adjust velocity based on the size of the other ball
      const impactSpeed = speed;

      this.velX = impactSpeed * Math.cos(angle);
      this.velY = impactSpeed * Math.sin(angle);
    }
  }
}



const ball = new Ball(width * (2 / 3), height * 0.5, -4, 0, randomRGB(), 20);

function animationLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Update and draw the ball
  ball.draw();
  ball.update();

  // Update and draw the mouse ball
  mouseBall.draw();
  ball.checkCollision(mouseBall);

  rectangles.forEach((rect) => {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

    // Calculate the center of the rectangle
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;

    // Set the font and text properties
    ctx.font = "16px Arial";
    ctx.fillStyle = "white"; // You can adjust the color

    // Draw the number in the middle of the rectangle
    const text = rect.number; // You can replace this with rect.number or any other property you have
    ctx.fillText(text, centerX - ctx.measureText(text).width / 2, centerY + 6); // Adjust the vertical position as needed
  });
  // Request the next animation frame
  requestAnimationFrame(animationLoop);
}

// Start the animation loop
appendedNumbersCount = 0;
const numbers = [];
const collisionInfo = document.getElementById("phonenumber");
function updateHtmlDocument(number) {
  numbers[appendedNumbersCount] = number;
  appendedNumbersCount++;

  
  collisionInfo.textContent += ` ${number}`;
  if (appendedNumbersCount === 10) {
    // Call a function to freeze the page
    gameDone(numbers);
  }
}
// Add an HTML element to display collision information
const collisionInfoElement = document.createElement("div");
collisionInfoElement.id = "collision-info";
document.body.appendChild(collisionInfoElement);

function gameDone(numbers) {
  // Create a div to display the message and numbers
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0, 0, 0, 0.5)"; // semi-transparent black overlay
  overlay.style.zIndex = "9999";

  // Create a container for the message, numbers, and buttons
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.textAlign = "center";
  container.style.color = "white";

  // Create the message
  const message = document.createElement("p");
  message.textContent = "Is this your number?";

  // Create a div to display the numbers
  const numbersDiv = document.createElement("div");
  numbersDiv.textContent = numbers.join(""); // Display the numbers separated by commas

  // Create "Yes" and "No" buttons
  const yesButton = document.createElement("button");
  yesButton.textContent = "Yes";
  yesButton.addEventListener("click", handleYesButtonClick);

  const noButton = document.createElement("button");
  noButton.textContent = "No";
  noButton.addEventListener("click", handleNoButtonClick);

  // Append elements to the container
  container.appendChild(message);
  container.appendChild(numbersDiv);
  container.appendChild(yesButton);
  container.appendChild(noButton);

  // Append the container to the overlay
  overlay.appendChild(container);

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Stop the ball and reset its position
  ball.velX = 0;
  ball.velY = 0;
  ball.x = width / 2;

  // Function to handle "Yes" button click
  function handleYesButtonClick() {
    // Add your logic for "Yes" button click
    console.log("Yes button clicked");

    // For example, you can close the overlay or perform other actions
    closeOverlay();
  }

  // Function to handle "No" button click
  function handleNoButtonClick() {
    // Add your logic for "No" button click
    console.log("No button clicked");
    // For example, you can close the overlay or perform other actions
    closeOverlay();
  }

  // Function to close the overlay
  function closeOverlay() {
    document.body.removeChild(overlay);
    ball.velX = -4;
    ball.velY = 0;
    appendedNumbersCount = 0;
    numbers = [];
    collisionInfo.textContent = "Enter Your Phone Number:";
  }
}

function startGame() {
  pregameOverlay.style.display = "none";
  // Start the animation loop
  animationLoop();
}

startGameButton.addEventListener("click", startGame);
