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
    this.element.src = `./${this.type}/${this.count}.png`;
  }
}
