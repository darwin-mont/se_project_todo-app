class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }
  addItem(item) {
    const element = this._renderer(item);
    this._container.append(element);
  }
}

export default Section;
