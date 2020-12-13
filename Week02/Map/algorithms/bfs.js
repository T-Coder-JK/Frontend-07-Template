// this bfs algorithem uses a queue as the container of path
// this function reture the path from start to end in Array format.
export default async function (sPoint, ePoint, mapData, map) {
  let queue = [sPoint];
  let path = [];
  //lx, ly represent the coordinate of its previous node
  async function insert(x, y, lx, ly) {
    if (x < 0 || x >= 100 || y < 0 || y >= 100) {
      return;
    }
    let index = y * 100 + x;
    if (mapData[index] != "+") {
      return;
    }
    let preNode = ly * 100 + lx;
    // await timeoutPromise(1);
    mapData[index] = preNode;
    map.children[index].style.background = "#d8f3dc";
    queue.push([x, y]);
  }

  while (queue.length) {
    let point = queue.shift();
    if (point[0] === ePoint[0] && point[1] === ePoint[1]) {
      let endIndex = point[1] * 100 + point[0];
      let startIndex = sPoint[1] * 100 + sPoint[0];
      path.push(endIndex);
      map.children[endIndex].style.background = "#fca311";
      let preNode = mapData[endIndex];
      while (preNode != startIndex) {
        path.push(preNode);
        await timeoutPromise(1);
        map.children[preNode].style.background = "#ffff3f";
        preNode = mapData[preNode];
      }
      path.push(startIndex);
      map.children[startIndex].style.background = "#48bfe3";
      return path;
    }
    await insert(point[0] + 1, point[1], point[0], point[1]);
    await insert(point[0] - 1, point[1], point[0], point[1]);
    await insert(point[0], point[1] + 1, point[0], point[1]);
    await insert(point[0], point[1] - 1, point[0], point[1]);
    await insert(point[0] + 1, point[1] + 1, point[0], point[1]);
    await insert(point[0] - 1, point[1] - 1, point[0], point[1]);
    await insert(point[0] - 1, point[1] + 1, point[0], point[1]);
    await insert(point[0] + 1, point[1] - 1, point[0], point[1]);
  }
  return null;
}

//set the time for waiting
//input: time 'ms'
//retrun:  Promise
function timeoutPromise(interval) {
  return new Promise(function (resolve) {
    setTimeout(resolve, interval);
  });
}
