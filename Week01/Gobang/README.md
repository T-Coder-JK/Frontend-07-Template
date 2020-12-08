**Gobang Game**

## Game Board
There are two alternative methods to implement the game board:
1. Using `<canvas>` as a container of the board. a picture for its background. `ctx.strokeRect()` draws lines and `ctx.drawImage()` shows pieces when the click event triggered. This method needs calculate the `clientX` and `clientY` for every drop.
The calculation of coordinates may differ in varying browsers and layouts.
2. Javascript, create the `<div class='cell'>` element with its pseudo elements (`::after` and `::before`) to draw blocks and lines. This way requires extra work to make the board showing responsively and modify edges. However; it's more flexible to handle data for future usage of an algorithm;

In this project, I chose the second method as a practice.


## JS Events Tips
1. `mouseleave` and `mouseout` events are similar but not identical. The only difference is that event `mouseleave` is not a bubble event while `mouseout` is. So I feel `mouseleave` could be a better choice in most cases because it avoids bubbling the event to trigger another erroring usage.