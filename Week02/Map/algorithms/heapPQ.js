export default class HeapPQ {
  constructor(root, compareRule) {
    this.heap = root.slice();
    //abondon the first element in the array
    // let its index start from 1
    this.heap.unshift([null, null]);
    this.length = 1;
    this.compare = compareRule || ((a, b) => a - b);
    //top-down reheapfiy
    this.sink = (i) => {
      while (i * 2 <= this.length) {
        let j = 2 * i;
        if (
          j < this.length &&
          this.compare(this.heap[j], this.heap[j + 1]) > 0
        ) {
          j++;
        }

        if (this.compare(this.heap[i], this.heap[j]) < 0) break;
        this.exchange(i, j);
        i = j;
      }
    };
    //bottom-up reheapfiy
    this.swim = (i) => {
      while (
        i > 1 &&
        this.compare(this.heap[i], this.heap[Math.floor(i / 2)]) < 0
      ) {
        this.exchange(i, Math.floor(i / 2));
        i = Math.floor(i / 2);
      }
    };
    // exchange the these two nodes
    this.exchange = (n, m) => {
      let t = this.heap[n];
      this.heap[n] = this.heap[m];
      this.heap[m] = t;
    };
  }

  extract() {
    let min = this.heap[1];
    this.exchange(1, this.length);
    this.heap.pop();
    this.length--;
    this.sink(1);
    return min;
  }

  insert(node) {
    this.heap.push(node);
    this.length++;
    this.swim(this.length);
  }
}
