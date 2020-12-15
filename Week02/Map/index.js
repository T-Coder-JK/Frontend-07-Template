import bfs from "./algorithms/bfs.js";
import aStar from "./algorithms/aStar.js";
import heapAStart from "./algorithms/heapAStar.js";
const map = document.querySelector(".map");
const save = document.querySelector("#save");
const remove = document.querySelector("#remove");
const pathOutput = document.querySelector("#path-length");
let mapData = localStorage.getItem("mapData")
  ? JSON.parse(localStorage.getItem("mapData"))
  : new Array(10000).fill("+");
let mousedown = false;
let clear = false;

//get coordinate of start point and end point from input
let start = {
  preX: null,
  preY: null,
  x: () => {
    return parseInt(document.querySelector("#start-x").value);
  },
  y: () => {
    return parseInt(document.querySelector("#start-y").value);
  },
  valid: () => {
    if (
      start.x() >= 0 &&
      start.y() >= 0 &&
      start.x() <= 100 &&
      start.y() <= 100
    ) {
      return true;
    }
    return false;
  },
  preValid: () => {
    if (
      start.x() >= 0 &&
      start.y() >= 0 &&
      start.x() <= 100 &&
      start.y() <= 100
    ) {
      return true;
    }
    return false;
  },
};
let end = {
  preX: null,
  preY: null,
  x: () => {
    return parseInt(document.querySelector("#end-x").value);
  },
  y: () => {
    return parseInt(document.querySelector("#end-y").value);
  },
  valid: () => {
    if (end.x() >= 0 && end.y() >= 0 && end.x() <= 100 && end.y() <= 100) {
      return true;
    }
    return false;
  },
  preValid: () => {
    if (end.x() >= 0 && end.y() >= 0 && end.x() <= 100 && end.y() <= 100) {
      return true;
    }
    return false;
  },
};
function show() {
  if (map.innerHTML) {
    map.innerHTML = "";
  }
  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      const cell = document.createElement("span");
      let index = y * 100 + x;
      cell.classList.add("cell");
      if (mapData[index] === "-") {
        cell.style.background = "#03045e";
      } else {
        cell.style.background = "";
      }
      cell.addEventListener("mousemove", (e) => {
        if (mousedown) {
          if (clear) {
            cell.style.background = "";
            mapData[index] = "+";
          } else {
            mapData[index] = "-";
            cell.style.background = "#03045e";
          }
        }
      });

      map.append(cell);
    }
  }
  showStartEnd();
}

show();
// console.log(bfs([0, 0], [50, 0], mapData, map));
document.addEventListener("mousedown", (e) => {
  mousedown = true;
  if (e.button === 2) {
    clear = true;
  }
});

document.addEventListener("mouseup", () => {
  mousedown = false;
  clear = false;
});

document.addEventListener("contextmenu", (e) => e.preventDefault());

save.addEventListener("click", () => {
  let saveData = mapData.map((element) => {
    if (element != "-") {
      element = "+";
    }
    return element;
  });
  localStorage.setItem("mapData", JSON.stringify(saveData));
  save.style.border = "5px solid #06d6a0";
  const saveNoti = document.querySelector(".save");
  saveNoti.style.opacity = 1;

  setTimeout(() => {
    save.style.border = "1px solid gray";
    saveNoti.style.opacity = 0;
  }, 1000);
});

remove.addEventListener("click", () => {
  mapData.fill("+");
  remove.style.border = "5px solid #e63946";
  const removeNoti = document.querySelector(".remove");
  removeNoti.style.opacity = 1;
  setTimeout(() => {
    remove.style.border = "1px solid gray";
    removeNoti.style.opacity = 0;
  }, 1000);
  localStorage.clear();
  show();
});

const buttonBFS = document.querySelector("#bfs");
buttonBFS.addEventListener("click", () => {
  mapData = localStorage.getItem("mapData")
    ? JSON.parse(localStorage.getItem("mapData"))
    : new Array(10000).fill("+");
  show();
  // console.log(startX, startY, endX, endY, map);
  bfs([start.x(), start.y()], [end.x(), end.y()], mapData, map).then(
    (result) => {
      showPathResult(result);
    }
  );
});
const buttonAstar1 = document.querySelector("#aStar");
buttonAstar1.addEventListener("click", () => {
  mapData = localStorage.getItem("mapData")
    ? JSON.parse(localStorage.getItem("mapData"))
    : new Array(10000).fill("+");
  show();
  aStar([start.x(), start.y()], [end.x(), end.y()], mapData, map).then(
    (result) => {
      showPathResult(result);
    }
  );
});

const buttonAstar2 = document.querySelector("#heap");
buttonAstar2.addEventListener("click", () => {
  mapData = localStorage.getItem("mapData")
    ? JSON.parse(localStorage.getItem("mapData"))
    : new Array(10000).fill("+");
  show();
  heapAStart([start.x(), start.y()], [end.x(), end.y()], mapData, map).then(
    (result) => {
      showPathResult(result);
    }
  );
});

//showing start point and end point on map
function showStartEnd() {
  if (start.preValid() && end.preValid()) {
    let Spoint = coordinateToIndex(start.preX, start.preY);
    let Epoint = coordinateToIndex(end.preX, end.preY);
    map.children[Spoint].style.background = "";
    map.children[Epoint].style.background = "";
  }
  let Spoint = coordinateToIndex(start.x(), start.y());
  let Epoint = coordinateToIndex(end.x(), end.y());
  map.children[Spoint].style.background = "#48bfe3";
  map.children[Epoint].style.background = "#fca311";
}

//convert coordinate x and y into array indxe for mapData
function coordinateToIndex(x, y) {
  return y * 100 + x;
}


const cordInputs = document.querySelectorAll("input");
cordInputs.forEach((cordInput) => {
  cordInput.addEventListener("keyup", () => {
    if (start.valid() && end.valid()) {
      showStartEnd();
    }
  });
  cordInput.addEventListener("keydown", () => {
    if (start.valid() && end.valid()) {
      start.preX = start.x();
      start.preY = start.y();
      end.preX = end.x();
      end.preY = end.y();
    }
  });
});

function showPathResult(result) {
  if (result !== null) {
    pathOutput.innerHTML = result.length;
  } else {
    pathOutput.innerHTML = "null";
  }
}
