**地图寻路 第二周**

## 广度优先搜索

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
3. localStorage与sessionStorage都可以用与特定页面的协议， 但是sessionStorage的数据相比之下不能长期保存，当页面关闭sessionStorage的数据就会被清除。
4. Javascript中数组操作`pop()`，`push()`，`shift()`和`unshift()`中需要注意的一些问题:
    - `pop()`尾部移出， 有返回值。
    - `push()`尾部添加，返回新length。
    - `shift()`头部移出， 有返回值。
    - `unshift()`头部添加，返回length， 一次添加多个元素时`Array.unshift('item1', 'item2', ....)`, 添加后的顺序一致。 `['item1', 'item2', ......]`。 所以 `Array.unshift('item1', 'item2', ....)` **不等同于**`Array.unshift('item1'）；Array.unshift('item2');`。*在循环中使用时要注意这点。*
    - `shift()`与`unshift()`不能用来构建stack的原因与其他语言一致，因为数组是一个连续的存储空间， 如果在头部插入数据时需要将其余数据依次向后挪动。因此在JS中*实现FIFO队列的最优方式还是使用链表*
