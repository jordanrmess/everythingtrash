export class Trash {
  constructor(element) {
    this.element = element;
    //setting which trash type it is
    this.type = element.dataset.type;
    this.count = 1;

    element.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(e) {
    this.count = e.shiftKey ? 1 : Math.min(this.count + 1, 5);
    this.element.src = `./${this.type}/${this.count}.svg`;
    console.log(this.count);
    if (this.count != 5) {
      if (this.type === "cans") {
        const audio = new Audio("./cans/crush.mp3");
        audio.play().catch(() => {});
      } else if (this.type === "cups") {
        const audio = new Audio("./cups/crush.mp3");
        audio.play().catch(() => {});
      }
    }
  }
}
