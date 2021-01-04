let dragBox = document.querySelector('.drag-box');
//these two variables are used to record the element's position
//after every drag and drop operation.
let baseX = 0;
let baseY = 0;

dragBox.addEventListener('mousedown', event => {
  let x = event.clientX;
  let y = event.clientY;

  function up(event) {
    baseX = baseX + event.clientX - x;
    baseY = baseY + event.clientY - y;
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
    x;
  }
  function move(event) {
    let range = nearestNode(event.clientX, event.clientY);
    range.insertNode(dragBox);
    // dragBox.style.transform = `translate(${baseX + event.clientX - x}px, ${
    //   baseY + event.clientY - y
    // }px)`;
  }
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
});

let text = document.querySelector('.text-container');
document.addEventListener('selectstart', event => {
  event.preventDefault();
});
let textContent = text.childNodes[0];
let textLength = textContent.length;
let ranges = [];
for (let i = 0; i < textLength; i++) {
  let range = document.createRange();
  range.setStart(textContent, i);
  range.setEnd(textContent, i);
  ranges.push(range);
}

function nearestNode(x, y) {
  let min = Infinity;
  let result = null;
  for (let range of ranges) {
    let rect = range.getBoundingClientRect();
    let dist = (rect.x - x) ** 2 + (rect.y - y) ** 2;
    if (dist < min) {
      result = range;
      min = dist;
    }
  }
  return result;
}
