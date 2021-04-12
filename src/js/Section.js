import Card from "./Card.js";
export default class Section {
  constructor({renderer}, containerSelector) {
    //this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(element) {
    this._container.append(element)
  }
  addPhoto(element) {
    this._container.prepend(element)
  } // Метод добавления новой карточки
  renderItems(items) {
    items.forEach(item => this._renderer(item))
  }
  clear() {
    this._container.innerHTML = '';
  }
}

