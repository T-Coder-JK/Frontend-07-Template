**地图寻路 第二周**

## 广度优先搜索
### 核心思想
可以将其分为两个阶段：
1. **入队阶段**：  以起点为初始值，初始化队列。之后执行出队。 从起点开始，将起点周边的点依次从尾部加入队列中, 当要加入的这个点不为通路（为墙）或者是已经被遍历过的点时，跳过这个点。

    在入队操作时应注意先插入向下左右四个节点后插入斜上，斜下四个节点。否则当节点自身有物理宽度时，仅就广度优先搜索算法自身而言，无法返回数学意义上的最短路径。如无方向地图寻路，因为斜向搜索优先的话，返回的路径也将是以斜边为优先， 但斜边总是大于任意一条直角边。但当使用广度优先搜索解决抽象的无方向的图问题时，如网页连接，社交媒体好友关系，不存在这个问题。


2. **出队阶段**：  将队列最前端的点取出，判定其是否是终点。如果不为终点，将其周边的点全部加入队列，执行入队操作。
         
         
一直循环这两步操作，直到队列为空，或者找到终点为止. 当使用栈的数据结构是（*先进后出*）可将广度优先转化为深度优先。 

**路径的保存：**路径的保存可以借由队列每次的入队操作，将这新加入节点的前驱节点的坐标保存在这个新节点中。

## A*启发式搜索 ##
### 核心思想
在广度优先算法的基础上做改进， 使用有序的数据结构（如：优先队列Priority Queue)来替换原来的无序队列，从而在每次出队操作时，可以优先拿到上一次入队操作插入元素中，相对于目标终点最接近的点来进行运算。 这样使得搜索算法在遍历地图时有方向性，来减少遍历操作的执行次数。提高了程序在搜索阶段的运行效率。

### 使用二叉堆（Binary Heap)构建优先队列

使用有序或无序数组和链表都可以轻松的实现优先队列（elementary implementation)，在面对有限的小规模问题时，这种实现方式是比较优秀的。但当面对大规模数据时，数组和链表的优先队列往往无法胜任，例如在大型电商交易流文件（stream)中, 每次找出单笔金额最高或最低的订单。因为这种队列的时间复杂度为`O(NM)`, N为steam文件中订单总数，M为优先队列的长度。所以在这种情况下使用堆（heap)来实现的PQ可以达到最优解，其时间复杂度为`O(NlogM)`. 而对于每一次入队和出队操作elementary implementations的时间复杂度也是线性增长的`O(N)`。 heap-PQ在每一次的入队和出队操作的时间复杂对可以优化到`O(logN)`.

二叉堆基于数组对象构建，以`Array[1]`(*为方便计算父节点，以`Array[1]`作为根节点，此时每个子节点i的父节点坐标为i/2*)为根节点的完全二叉树，在数组中父节点的下标如果为i， 那么它的左子节点的下标为2i,其右子节点的下标为2i+1。如此，在堆中,任意节点向上操作可以定义为`Array[i/2]`, 向下操作为`Array[2i]`和`Array[2i+1]`。 在此次编程实践中需要使用最小二叉堆，即堆中所有父节点的值均要小于等于它的两个子节点，这样可以保证这个堆的根节点所保存的数据就是最小值。 在每次插入新的节点时，运用向上操作`swim-reheapify()`确保插入新节点的堆，在每一处都符合最小堆的定义. 当从根节点移除最小值后，则需要从根节点执行向下操作`sink-qreheapify()`.

## 关于迷宫数据保存的小优化
在最初实现地图编辑功能的时候，使用一个10000长度的一维数组存储地图数据，其中`0`表示通路，`1`表示墙。但是在之后实现路径搜索算法的时候发现，如果要将路径信息存储在原地图数据的数组中时，此时`0`和`1`需要用来表示前驱结点`mapData[0]`和`mapData[1]`, 这就与之前`0`,`1`的使用逻辑发生了冲突。会产生两个潜在Bugs, 首先会使得从`mapData[0]`或`mapData[1]`为起点的搜索，在回溯路径信息时陷入死循环，因为起点数据丢失。 其次，当运行完算法后，马上使用地图保存功能的话，会错误的将`mapData[1]`的后续节点存储为墙。

所以如果在地图初始时，使用`+`表示通路， 使用`-`表示墙，就可以避免上述的程序错误。 同时不会增加运算操作，也不用在回溯路径时克隆`mapData`， 可以减少内存消耗。

## 对路径的小优化（仍非最优）
寻路算法在找到终点后，会从终点出发，根据其在寻路遍历时在遍历过的每个节点中存储的其前驱节点的坐标进行路径的回溯，直到回溯到起点结束，然后返回路径。 它的实现原理是，在程序遍历每个可到达节点时，会将可到达但已经遍历过的节点和不能到达的节点（墙）排出在外， 所以每一个遍历过的节点所存储的前驱节点（父节点）一定是唯一的。 但是这样所返回的路径不确定是最优路径， 因为这样插入的前驱节点的数据只与被遍历的先后顺序有关，而与路径的最短长度无关。

综上所述，我对代码在保存其前驱节点的部分做了一些小的优化，如下：
```javascript
// when the current node/vertice has been reached.
// check the distance of previously reached path.
// if the previous path longer than the current path,
// using current path's preNode instead.
 if(typeof mapData[current] ==='object' ){
      if(mapData[current].distance > mapData[preNode].distance +1){
        mapData[current] = {
          preNode: preNode,
          distance: mapData[preNode].distance + 1,
        };
      }
    }else{
      mapData[current] = {
        preNode: preNode,
        distance: mapData[preNode].distance + 1
      };
      map.children[current].style.background = "#d8f3dc";
      sortedArray.insert([x, y]);
    }
```
**优化的思路是：** 在每个节点被遍历到时，在节点保存的数据中，保存一个距离的值，当前节点的距离值用来表示当前节点到起点的距离，当前节点的距离值等于这个节点前驱节点的距离值+1（*根据实际情况，进行更细化的计算）*。 之后当遍历一个节点所有可到达的节点时，发现其可到达的节点有的已经被遍历过了，那么对比
以当前节点为前驱节点的路径距离，是否小于其之前被遍历时所存储的路径距离。如果小于，意味着以当前节点为前驱节点的路径，在距离上是更优的选择。 那么用当前节点的坐标，替换这个点之前保存的前驱节点的坐标。

## Moduels In Javascript
本周学习关于JS模块编程后，对零星知识点的小结，今后需要不断的补充和加深理解。并且在这周的代码中做了一些初步的实践，原因是想在地图编辑器的功能上扩展一些其他不同的算法和数据结构。以下是本周学习后的一些浅显认知。 


由于JS的使用场景不断延展，独立的小规模脚本已经不能很好地支撑JS开发一个完整项目的需求。 随之而来的是对JS代码和功能模块化需求的不断加深。如果能将JS的代码的功能很好的分割为不同的模块，那么相比于调用整个Library代码将有更好的执行和加载的效率。同时也为JS开发后台的功能提供了先决的条件。`import`的功能除IE不支持外，其他浏览器均其完全支持。`import`的功能在IE和Andorid Webview上不被支持， 其他浏览器完全支持。

### Export
所有首层（top-level)的变量（`let, const, var)`，函数（`function`), 类（`class`)均可以export， 但是函数内声明的变量无法被export. 通常的实践中可以在每个module的末尾一次性export所有需要的features.
```javascript
    export {nameVariable, Xfunction, anotherFunction};
```
### Import
Import文件路径是否能省略.js后缀由不同的开发框架决定。 在原生JS（native javascript)中不支持省略后缀。

### HTML文件中使用Module
首先在嵌套式脚本中，`import`和`export`均不能运行。 所以需要用与普通脚本相同的方式：`<script>`元素来引入。 只是引入一个module的时候需要说明`<script type='module'>`

### Modules VS Standard Scripts
 - 在本地无法通过文件路径直接打开运行调用module的.htlm文件。因为JS modules需要使用CORS，所以必须经过serve运行。
 - 在HTML元素`<script>`中，modules将被自动设置为defer加载。
 - Modules中的所有定义的变量，函数，类都只能在import这个module的脚本的作用域中被调用。不能在全局作用域中被调用，如在控制台调用某个module的特性将报错。
 - Modoles全部自动使用严格模式（strict mode）

 ### Export Defualt
 如果使用`export defualt`，每一个module只能有一个defualt元素被export。可以导出匿名函数。

## 代码小技巧
1. 实现鼠标拖拽移动的监听:
可以使用`mousemove`和`mousedown`的组合事件来实现这一功能。 首先为元素添加一个监听`mousemove`, 之后将另一事件`mousedown`作为`mousemove`的回调，来达到两个事件组合的功能。    
    ``` javascript
    let mousedown = false;
    element.addEventListener('mousemove', () => {
        if(mousedown){
            .......
        }
    });

    document.addEventListener('mousedown', () => {
        mousedown = true;
    });

    document.addEventListener('mouseup', () => {
        mousedown = false;
    });

    //或者用两个按键组合实现保存操作
    document.addEventListener('keydown', (event) => {
        if(event.ctrKey && event.key === 's'){
            ......save()......
        }
    });
    ```
    *当需要判别鼠标按键时，推荐使用mouseEvent.button属性和.buttons属性。 因为.which属性可能会在今后的技术标准中被移除。button返回单个的按键， buttons返回组合按键值之和*


2. CSS定义紧密排列的元素border属性时，应该避免周围元素border叠加的情况出现， 否则会打乱排版的顺序。
3. localStorage与sessionStorage都可以用于特定页面的协议， 但是sessionStorage的数据相比之下不能长期保存，当页面关闭sessionStorage的数据就会被清除。
4. Javascript中数组操作`pop()`，`push()`，`shift()`和`unshift()`中需要注意的一些问题:
    - `pop()`尾部移出， 有返回值。
    - `push()`尾部添加，返回新length。
    - `shift()`头部移出， 有返回值。
    - `unshift()`头部添加，返回length， 一次添加多个元素时`Array.unshift('item1', 'item2', ....)`, 添加后的顺序一致。 `['item1', 'item2', ......]`。 所以 `Array.unshift('item1', 'item2', ....)` **不等同于**`Array.unshift('item1'）；Array.unshift('item2');`。*在循环中使用时要注意这点。*
    - `shift()`与`unshift()`不能用来构建stack的原因与其他语言一致，因为数组是一个连续的存储空间， 如果在头部插入数据时需要将其余数据依次向后挪动**O(n)**。因此只能使用`push()`和`pop() - **O(1)**. 实现大型队列的最优方式还是需要自定义Dequeue或者Enqueue操作，实现卷绕，和动态扩容的方法 [*Reference](http://code.iamkate.com/javascript/queues/).


      ![push and unshift performance](https://i.stack.imgur.com/K79Lu.png)
5. element.children[index]可以实现使用编号选定子元素的功能。 但注意父元素初始时`<tag>`与`</tag>`之间最好不要有换行或空元素， 否则element.children[0]可能会被空元素占据。

6. Array.slice() returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.[*Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

 7. JS中的赋值传递和引用传递默认操作（assign-by-value and assign-by-reference)。 javascript中所有6种元类型的赋值操作均为值传递并且这6种元类型均为immutabel。 而合成类型（compound value)（Object, Array)的赋值操作均为引用传递并且为mutable.JS中的引用只能指向其所传递值的地址，而不能指向变量或者其他的引用。如果一个Object需要assign-by-value操作，可以使用`Object.create()`. Array可以使用`Array.slice()`. 当元类型需要进行assign-by-reference操作，可以将元类型包裹在一个Object中进行操作。[*Reference](https://medium.com/@naveenkarippai/learning-how-references-work-in-javascript-a066a4e15600)

 8. 变量使用与（OR||）操作符进行默认值赋值时，要注意当0或undefine为合法情况需要被传入会引发Bug. [*Reference](https://www.codereadability.com/javascript-default-parameters-with-or-operator/)

 9. JS中的变量提升（Hoisting), 概念上讲Hoisting是将变量和函数的声明在物理层面上移动到代码的最前面。 但实际上变量和函数声明在代码里的位置不会变，而是在编译阶段先被放入内存中。这样做的好处是变量和函数可以在其声明之前被调用。函数和变量相比会被优先提升。

    **注意：**
    
    - 只有声明会被提升，而不会提升初始化。 如果一个变量先被调用在被声明和初始化，调用时的值会是`undefined`
    - 使用`let`和`const`声明的变量不会被提升。也就是说使用这两个关键词声明的变量，不能在其声明之前被调用。
### TODO
> Javascript Strict Mode. 

> JS中怎样量化的分析代码的时间复杂度？有没有什么好的工具或者思路？

> JS代码的编译过程[*Resource](https://medium.com/@osmanakar_65575/javascript-how-the-engine-compiles-6df6d5c6439c)

> 路径的最优算法？