import { Trash } from "./trash.js";
import { playhtml } from "https://unpkg.com/playhtml";

const initTrash = (element) => {
  new Trash(element);
};

const setupPlayElement = (element) => {
  if (typeof playhtml.setupPlayElement === "function") {
    playhtml.setupPlayElement(element);
  } else {
    playhtml.init();
  }
};

const trashItems = document.getElementById("trash-items");
// initialize image behavior (click/crush)
document.querySelectorAll(".trash").forEach((element) => {
  initTrash(element);
});

// initialize playhtml/movement for any element that has the can-move attribute
document.querySelectorAll("[can-move]").forEach((element) => {
  setupPlayElement(element);
});

document.getElementById("add-item").addEventListener("click", () => {
  const itemType = document.getElementById("item-type").value;
  const newItem = document.createElement("img");
  const itemCount =
    document.querySelectorAll(`.trash[data-type="${itemType}"]`).length + 1;
  const itemId = `${itemType}${itemCount}`;

  newItem.className = "trash";
  newItem.id = itemId;
  newItem.src = `./${itemType}/1.svg`;
  newItem.dataset.type = itemType;
  newItem.dataset.count = "1";
  newItem.setAttribute("can-move", "");
  newItem.draggable = false;

  trashItems.appendChild(newItem);
  initTrash(newItem);
  setupPlayElement(newItem);
});

// prevent touch scrolling on mobile while keeping inputs functional
document.addEventListener(
  "touchmove",
  function (e) {
    if (e.target.closest && e.target.closest("input, textarea, select")) return;
    e.preventDefault();
  },
  { passive: false },
);
