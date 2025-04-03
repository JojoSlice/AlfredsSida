document.addEventListener("DOMContentLoaded", function () {
  var bilder = document.querySelectorAll("#gallery img");

  bilder.forEach(function (bild) {
    bild.addEventListener("click", function () {
      onToggleView(this);
    });
  });
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
