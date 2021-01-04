***Javascript Proxy 第五周***

### Proxy的基础用法

`Proxy`对象用于创建一个对象的代理，从而实现基本操作或内置方法的拦截和自定义被代理对象的内置方法(如属性查找，赋值，枚举，函数的调用等)。  
创建一个`Proxy对象`需要两个参数：  
- `target`:  被代理的对象
- `handler`:  hander是一个对象，用于可以在handler中指明将要被拦截的操作和重新定义被拦截的操作。
```js
const target = {
    property1 = 'hello',
    property2 = 'world'
}
const handler = {
    /**
     * this property in handler will redefine the get() handle, 
     * which intercepts attempts to access properties in the target object
     **/
    get: function(target, prop, receiver){
        return 'everyone'
    }
}

const p = new Proxy(target, handler);

console.log(p.property1, p.property2)// returns 'everyone' 'everyone'
```
在这个例子中所使用的的handler函数也可以被看做是捕捉器(traps)的一种，因为这个函数捕捉了对目标对象的调用。  

可以在handler中使用Reflect来指定一些操作可以继续使用原目标对象的原本操作。
```js
const handler1 = {
    get: function (target, prop, receiver){
        if (prop === 'property2'){
            return 'everyone'
        }
        return Reflect.get(...arguments)//only traps the operation of property2, 
        //but for others, 
        //it uses the original functions define in the target object
    }
}
```

proxy由于其会使得代码的可预测性下降，所以在日常业务场景中不推荐大量使用。 但因其功能强大，对于底层库的实现有很大的帮助.  
- 对目标对象操作的捕获(Traping the operations)
- 对目标对象属性传入值的有效性校验(Validation)
- 对目标对象构造函数的扩展(Extending constructor)
- 操作DOM节点(Manipulating DOM nodes)
- 对目标对象属性的传入值进行纠正或者定义额外的属性传入操作
- 对数组对象通过传入值自定义查找操作
- 对自定义对象添加一个捕获列表 
[*Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

### Vue.js中的MVVM双向绑定(Reactive Two-Way Data Binding)
其核心特性和目的是要将存储在Javascript变量或对象中的数据自动的与DOM中对应的元素相同步.当操作DOM元素时，JS中的数据也会同时改变，反向亦然. 这个概念就是所谓的双向数据绑定，它可以简化状态的管理. 在其他的框架和实践中，常常需要使用一组事件监听和函数的逻辑来实现数据的同步，较为复杂.

- ***实现原理***  
    当一个JS对象被传入Vue中的实例并作为data选项时，Vue将遍历此对象所有的property，并创建一个此对象的代理(`Proxy`对象的实例)，使用`Object.defineProperty`把这些property全部加入其代理实例中定义的`getter/setter`.  这样可以将对这个对象property的直接操作转化为对这个对象代理实例的间接操作，然后通过`getter/setter`可以在Vue内部追踪， 当其中的某个property被访问和修改时通知变更。Vue中每个组件实例都对应一个watcher实例，它会在组件渲染的过程中把”接触“过得的数据property记录为依赖。之后当`setter`触发时，会通知watcher，从而使它所关联的组件重新渲染。
    ![image](https://cn.vuejs.org/images/data.png)


### DOM API中的Range对象
Range是一个可以在绝大多数浏览器兼容的接口，它表示一小段包含节点和文本节点的DOM元素。Range对象可以通过`Document.createRange()`这个方法创建。也有其构造函数`Range()`可以用来创建一个新的Range对象。[*Reference](https://developer.mozilla.org/en-US/docs/Web/API/Range)

### 代码小技巧
1. What's the concept of observable and unobservable in JS?
2. `Object.getOwnPropertyDescriptor(obj, 'propName/Symbol')`返回指定对象上自有属性的属性描述，返回的属性描述包含:value, writable, get, set, configurable, enumerable这些基本信息.  没有这个属性时返回undefined.
3. 对于拖拽的实现， 需要监听三组事件‘mousedown', 'mousemove', 'mouseup'. 应注意三点细节：
    - 'mousemove'和’mouseup‘因为是在被拖拽元素的'mousedown'事件触发后才会被激活监听，那么可以把这两个监听事件定义在mousedown监听事件的回调函数中。这样可以优化程序执行的性能。
    - ‘mousemove’和‘mouseup'事件监听应该作用于document上，这样操作可以避免鼠标移动太快而移出被拖拽元素范围后”拖断“的情况发生。
    - 元素的移动应考虑到它本身position的属性，所以可以使用`element.style.transform = translate(X,Y)`来实现。

>- TODO:
>1. ***CSSOM API的常用方法***
>2. ***图片拖拽的排版***