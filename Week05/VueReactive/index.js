import * as Reactive from "./reactive.js";
let color = {
  r: 69,
  g: 123,
  b: 157,
  a: 100,
};

let colorP = Reactive.reactive(color);
const colorR = document.querySelector("#r");
const colorB = document.querySelector("#b");
const colorG = document.querySelector("#g");
const colorA = document.querySelector("#a");
const palette = document.querySelector("#palette");
colorR.addEventListener("input", (event) => (colorP.r = event.target.value));
colorG.addEventListener("input", (event) => (colorP.g = event.target.value));
colorB.addEventListener("input", (event) => (colorP.b = event.target.value));
colorA.addEventListener("input", (event) => (colorP.a = event.target.value));
Reactive.watcher(() => {
  colorR.value = colorP.r;
});
Reactive.watcher(() => {
  colorG.value = colorP.g;
});
Reactive.watcher(() => {
  colorB.value = colorP.b;
});
Reactive.watcher(() => {
  colorA.value = colorP.a;
});
Reactive.watcher(() => {
  palette.children[0].innerHTML =
    "rgba(" +
    colorP.r +
    "," +
    colorP.g +
    "," +
    colorP.b +
    "," +
    colorP.a / 100 +
    ")";
  palette.style.backgroundColor =
    "rgba(" +
    colorP.r +
    "," +
    colorP.g +
    "," +
    colorP.b +
    "," +
    colorP.a / 100 +
    ")";
});
