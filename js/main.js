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
document.querySelectorAll(".trash").forEach((element) => {
  initTrash(element);
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
  newItem.src = `./${itemType}/1.png`;
  newItem.dataset.type = itemType;
  newItem.dataset.count = "1";
  newItem.setAttribute("can-move", "");

  trashItems.appendChild(newItem);
  initTrash(newItem);
  playhtml.setupPlayElement(newItem);
});
