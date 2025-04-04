document.addEventListener("DOMContentLoaded", function () {
  initSwipeListeners();

  fetch("http://localhost:3000/bilder")
    .then((response) => response.json())
    .then((bilder) => {
      const containerOne = document.getElementById("bildbox1");
      const containerTwo = document.getElementById("bildbox2");
      const containerThree = document.getElementById("bildbox3");

      bilder.forEach((bild, index) => {
        const bildBox = document.createElement("div");
        bildBox.classList.add("p-2", "relative", "inline-block", "bildBox");

        const img = document.createElement("img");
        img.src = `http://localhost:3000/${bild}`;
        img.alt = "bild";
        img.id = index;

        const button = document.createElement("button");
        button.classList.add("likeButton");

        button.addEventListener("click", function () {
          onLike(button);
        });

        const heart = document.createElement("img");
        heart.id = `heart${index}`;
        heart.src = "images/heart.svg";
        heart.width = "3em";

        button.appendChild(heart);

        bildBox.appendChild(img);
        bildBox.appendChild(button);

        img.addEventListener("click", function () {
          onToggleView(this);
        });

        if (index % 3 === 0) {
          containerOne.appendChild(bildBox);
        } else if (index % 3 === 1) {
          containerTwo.appendChild(bildBox);
        } else {
          containerThree.appendChild(bildBox);
        }
      });
    })
    .catch((error) => console.error("Fel vid hämtning:", error));
});

let startY = 0;
let isTouch = false;
let currentId = 1;

function initSwipeListeners() {
  const storBild = document.getElementById("imageview");

  storBild.addEventListener("touchstart", function (e) {
    isTouch = true;
    startY = e.touches[0].clientY;
  });

  storBild.addEventListener("touchend", function (e) {
    let endY = e.changedTouches[0].clientY;
    handleSwipe(startY, endY);
  });

  storBild.addEventListener("mousedown", function (e) {
    if (!isTouch) startY = e.clientY;
    console.log("mousedown");
  });

  storBild.addEventListener("mouseup", function (e) {
    console.log("mouseup");
    if (!isTouch) {
      let endY = e.clientY;
      handleSwipe(startY, endY);
    }
  });
}

function onLike(button) {
  const heart = button.querySelector("img");
  if (heart.src.includes("heartFilled.svg")) {
    heart.src = "images/heart.svg";
  } else {
    heart.src = "images/heartFilled.svg";
  }
}

function onToggleView(bild) {
  const storBild = document.getElementById("imageview");
  const view = document.getElementById("view");

  storBild.src = bild.src;
  view.style.display = "flex";
  currentId = parseInt(bild.id);
}

function handleSwipe(startY, endY) {
  let diffY = startY - endY;

  console.log("swipe", startY, endY);

  if (Math.abs(diffY) < 10) {
    closeView();
  }

  if (diffY > 50) {
    showNextImage();
  } else if (diffY < -50) {
    showPreviousImage();
  }
}

function showNextImage() {
  const nextId = currentId + 1;
  const nextBild = document.getElementById(nextId);
  if (nextBild) {
    currentId = nextId;
    document.getElementById("imageview").src = nextBild.src;
  }
}

function showPreviousImage() {
  const prevId = currentId - 1;
  const prevBild = document.getElementById(prevId);
  if (prevBild) {
    currentId = prevId;
    document.getElementById("imageview").src = prevBild.src;
  }
}

function closeView() {
  console.log("closeView");
  if (view.style.display != "none") {
    view.style.display = "none";
  }
}

const navLinks = document.querySelector(".nav-links");
function onToggleMenu(e) {
  e.src = e.src.includes("menu.svg") ? "images/close.svg" : "images/menu.svg";
  navLinks.classList.toggle("top-[9%]");
}
