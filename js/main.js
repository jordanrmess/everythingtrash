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

// Helper function to check if two elements overlap
function checkCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}
// initialize image behavior (click/crush)
document.querySelectorAll(".trash").forEach((element) => {
  initTrash(element);
});

// initialize playhtml/movement for any element that has the can-move attribute
document.querySelectorAll("[can-move]").forEach((element) => {
  setupPlayElement(element);
});

// trash can click to open/close effect
const trashcanImg = document.getElementById("trashcan");
let trashcanOpen = false;

if (trashcanImg) {
  trashcanImg.addEventListener("click", () => {
    trashcanOpen = !trashcanOpen;
    trashcanImg.src = trashcanOpen
      ? "./trashcan/trash_open.svg"
      : "./trashcan/trash_closed.svg";
  });

  // Continuously check for collision with trash items
  setInterval(() => {
    if (trashcanOpen) {
      document.querySelectorAll(".trash").forEach((item) => {
        if (checkCollision(item, trashcanImg)) {
          trashcanImg.style.opacity = "0.7";
          // Fade out and scale down the item before removing
          item.style.transition = "opacity 0.3s, transform 0.3s";
          item.style.opacity = "0";
          item.style.transform = "scale(0)";
          // Remove after animation completes
          setTimeout(() => {
            item.remove();
          }, 300);
          // Close trash after item is deleted
          trashcanOpen = false;
          trashcanImg.src = "./trashcan/trash_closed.svg";
          trashcanImg.style.opacity = "1";
        }
      });
    } else {
      trashcanImg.style.opacity = "1";
    }
  }, 50);
}

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
  newItem.setAttribute("can-mirror", "");
  newItem.draggable = false;

  trashItems.appendChild(newItem);
  initTrash(newItem);
  setupPlayElement(newItem);
});

// Reset button - reset all items to state 1
document.getElementById("reset-btn").addEventListener("click", () => {
  document.querySelectorAll(".trash").forEach((item) => {
    item.dataset.count = "1";
    item.src = `./${item.dataset.type}/1.svg`;
  });
});
