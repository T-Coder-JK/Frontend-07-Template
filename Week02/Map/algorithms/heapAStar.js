import HeapPQ from "./heapPQ.js";
export default async function (sPoint, ePoint, mapData, map) {
  let sortedArray = new HeapPQ(
    [sPoint],
    (a, b) => distanceToEnd(a) - distanceToEnd(b)
  );
  let path = [];
  function distanceToEnd(node) {
    return (node[0] - ePoint[0]) ** 2 + (node[1] - ePoint[1]) ** 2;
  }
  //lx, ly represent the coordinate of its previous node
  async function insert(x, y, lx, ly) {
    if (x < 0 || x >= 100 || y < 0 || y >= 100) {
      return;
    }
    let index = y * 100 + x;
    let preNode = ly * 100 + lx;
    // let distoPre = (x - lx) ** 2 + (y - ly) ** 2;
    let distoPre = 1;
    if (mapData[index] == "-") {
      return;
    }
    if (typeof mapData[index] === "object") {
      if (mapData[index].distance > mapData[preNode].distance + distoPre) {
        mapData[index] = {
          preNode: preNode,
          distance: mapData[preNode].distance + distoPre,
        };
      }
    } else {
      mapData[index] = {
        preNode: preNode,
        distance: mapData[preNode].distance + distoPre,
      };
      await timeoutPromise(1);
      map.children[index].style.background = "#d8f3dc";
      sortedArray.insert([x, y]);
    }
  }




  while (sortedArray.length) {
    let point = sortedArray.extract();
    if (point[0] === sPoint[0] && point[1] === sPoint[1]) {
      mapData[point[1] * 100 + point[0]] = {
        preNode: null,
        distance: 0,
      };
    }
    if (point[0] === ePoint[0] && point[1] === ePoint[1]) {
      let endIndex = point[1] * 100 + point[0];
      let startIndex = sPoint[1] * 100 + sPoint[0];
      path.push(endIndex);
      map.children[endIndex].style.background = "#fca311";
      let preNode = mapData[endIndex].preNode;
      while (preNode != startIndex) {
        path.push(preNode);
        await timeoutPromise(1);
        map.children[preNode].style.background = "#ffff3f";
        preNode = mapData[preNode].preNode;
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