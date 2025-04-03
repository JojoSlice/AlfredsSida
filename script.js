document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/bilder")
    .then((response) => response.json())
    .then((bilder) => {
      const containerOne = document.getElementById("bildbox1");
      const containerTwo = document.getElementById("bildbox2");
      const containerThree = document.getElementById("bildbox3");

      bilder.forEach((bild, index) => {
        const bildBox = document.createElement("div");
        bildBox.classList.add("p-2");

        const img = document.createElement("img");
        img.src = `http://localhost:3000/${bild}`;
        img.alt = "bild";

        bildBox.appendChild(img);

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

function onToggleView(bild) {
  var storBild = document.getElementById("imageview");
  if (storBild.src === bild.src) {
    storBild.src = "hide.jpg";
    storBild.style.display = "none";
    view.style.display = "none";
  } else {
    storBild.src = bild.src;
    storBild.style.display = "flex";
    view.style.display = "flex";
  }
}

function closeView(e) {
  if (view.style.display != "none") {
    view.style.display = "none";
    e.src = "hide.jpg";
  }
}

const navLinks = document.querySelector(".nav-links");
function onToggleMenu(e) {
  e.src = e.src.includes("menu.svg") ? "images/close.svg" : "images/menu.svg";
  navLinks.classList.toggle("top-[9%]");
}
