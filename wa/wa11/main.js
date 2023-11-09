const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */
const arr = [
  "./images/pic1.png",
  "./images/pic2.jpg",
  "./images/pic3.jpg",
  "./images/pic4.jpg",
  "./images/pic5.jpg",
];



arr.forEach((filename) => {
  const imgElement = document.createElement("img");

  imgElement.src = filename;

  imgElement.alt = `Image: ${filename}`;

  imgElement.addEventListener("click", () => {
    displayedImage.src = filename;
    displayedImage.alt = `Image: ${filename}`;
  });

  thumbBar.appendChild(imgElement);
});

/* Wiring up the Darken/Lighten button */
function darken(){
  const color = btn.getAttribute("class");
  console.log("Color Change")
  if(color === "dark"){
    btn.setAttribute("class","light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    btn.setAttribute("class","dark")
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }

};

btn.addEventListener("click",darken);
