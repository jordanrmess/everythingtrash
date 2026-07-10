import { Trash } from "./Trash.js";

document.querySelectorAll(".trash").forEach((el) => {
  new Trash(el);
});
