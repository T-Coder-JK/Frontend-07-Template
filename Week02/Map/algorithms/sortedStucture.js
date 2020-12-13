export default class Sorted {
  constructor(data, compareRule) {
    this.data = data.slice();
    this.compare = compareRule || ((a, b) => a - b);
    this.length = this.data.length;
  }

  insert(newNode) {
    this.data.push(newNode);
  }

  extract() {
    if (!this.data.length) return;
    let min = this.data[0];
    let minIndex = 0;
    for (let i = 0; i < this.data.length; i++) {
      if (this.compare(this.data[i], min) < 0) {
        minIndex = i;
        min = this.data[i];
      }
    }
    this.data[minIndex] = this.data[this.data.length - 1];
    this.data.pop();
    return min;
  }
}
