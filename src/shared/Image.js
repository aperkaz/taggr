class Image {
  constructor(count) {
    this.count = count;
  }

  print() {
    return this.count++;
  }
}

export default new Image(0);
