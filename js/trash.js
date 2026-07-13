export class Trash {
  constructor(element) {
    this.element = element;
    this.type = element.dataset.type;
    this.count = 1;
    this.touchHandled = false;
    this.touchStart = null;
    this.pointerId = null;
    this.pointerMoveHandler = this.handlePointerMove.bind(this);
    this.pointerUpHandler = this.handlePointerUp.bind(this);
    this.pointerCancelHandler = this.handlePointerCancel.bind(this);

    element.addEventListener("pointerdown", this.handlePointerDown.bind(this));
    element.addEventListener("click", this.handleClick.bind(this));
  }

  handlePointerDown(e) {
    if (e.pointerType !== "touch") {
      return;
    }

    this.touchHandled = false;
    this.touchStart = { x: e.clientX, y: e.clientY };
    this.pointerId = e.pointerId;

    window.addEventListener("pointermove", this.pointerMoveHandler);
    window.addEventListener("pointerup", this.pointerUpHandler);
    window.addEventListener("pointercancel", this.pointerCancelHandler);
  }

  handlePointerMove(e) {
    if (e.pointerId !== this.pointerId) {
      return;
    }

    const dx = e.clientX - this.touchStart.x;
    const dy = e.clientY - this.touchStart.y;

    if (Math.hypot(dx, dy) > 10) {
      this.touchHandled = true;
      this.cleanupPointerListeners();
    }
  }

  handlePointerUp(e) {
    if (e.pointerId !== this.pointerId) {
      return;
    }

    if (!this.touchHandled) {
      this.touchHandled = true;
      this.activate(e);
    }

    this.cleanupPointerListeners();
  }

  handlePointerCancel(e) {
    if (e.pointerId !== this.pointerId) {
      return;
    }

    this.cleanupPointerListeners();
  }

  cleanupPointerListeners() {
    window.removeEventListener("pointermove", this.pointerMoveHandler);
    window.removeEventListener("pointerup", this.pointerUpHandler);
    window.removeEventListener("pointercancel", this.pointerCancelHandler);
    this.pointerId = null;
    this.touchStart = null;
  }

  handleClick(e) {
    if (this.touchHandled) {
      this.touchHandled = false;
      return;
    }

    this.activate(e);
  }

  activate(e) {
    this.count = e.shiftKey ? 1 : Math.min(this.count + 1, 5);
    this.element.src = `./${this.type}/${this.count}.svg`;
    console.log(this.count);

    if (this.count !== 5) {
      if (this.type === "cans") {
        const audio = new Audio("./cans/crush.mp3");
        audio.play().catch(() => {});
      } else if (this.type === "cups") {
        const audio = new Audio("./cups/crush.mp3");
        audio.play().catch(() => {});
      } else if (this.type === "lamps") {
        const audio = new Audio("./lamps/crush.mp3");
        audio.play().catch(() => {});
      } else {
        const audio = new Audio("./lamps/crush.mp3");
        audio.play().catch(() => {});
      }
    }
  }
}
