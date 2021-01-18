***Advanced Javascript 第七周***
### Javacript中的表达式运算优先级(排序按照优先级从高到低)
1. Member Expression(成员调用)
    - `a.b`: 对象成员访问.
    - `a[b]`： 对象成员访问，**b**可以是在运行时传入的变量.
    - ``foo`string` ``:使用反引号将string作为输入传入参数传入函数.
    - `super.b & super['b']`:在class的构造函数中使用super关键字.
    - `new.target`: 是一个伪属性，用来检查一个函数或者class是否被程序使用new这个关键字调用了.
    - `new Foo()`: new运算创建一个新的实例。在new运算中`new Foo()`的运算优先级高于`new Foo`.
2. Call Expression(函数调用)
    - `foo()`：函数调用。
    - `super()`class中调用super()
    - `foo()['b']`:当call expression之后使用member expression，member的优先级会被降级为call expression相同的优先级.
    - `foo().b`: 被降级
    - ``foo()`abc` ``: 被降级
3. Left Handside & Right Handside Expression
4. Unary Expression(一元运算符)
    - `delete a.b`
    - `void foo()`
    - `typeof a`
    - `+ a`: onverts its operand to Number type.
    - `- a`: converts its operand to Number type and then negates it.
    - `~ a`: 按位取反，按位非。
    - `! a`: 逻辑非运算。
    - `await a`
5. Multiplicative Expression
    - `**`幂运算: JS中唯一一个右结合的运算符 `3**2**3` => `3**(2**3)`,从右向左的顺序计算。
    - `* / %`
6. Additive Expression
    - `+ -`
7. Shift Expression
    - `<< >> >>>`:位运算的左移右移，按位无符号右移。
8. Relationship Expression
    - `< > <= >= instanceof in`
9. Equality Expression
    - `==`:*  *注意**JS中使用时的强制类型转换问题。
    - `!=`
    - `===`
    - `!==`
10. Bitwise Expression
    - `& ^ |` 二进制位与，或，异或“⊕”(¬a ∧ b) ∨ (a ∧¬b)(exclusive OR)。
11. Logical Expression
    - `&& ||`注意短路原则的使用。有时可用来代替if
12. Conditional Expression
    - `condition?true expression : false expression`: 唯一的三段运算符。同样使用短路逻辑，所以不能保证表达式中的所有子结构都能执行。

### Javascript中的类型转换
1. Object转换到基本类型的拆箱操作(Unboxing)
    - ToPrimitive:当一个Object在表达式中，参与运算需要进行类型转化时就会调用ToPrimitive这个过程。对象自身有三个methods(toString, valueOf, Symbol.toPrimitive)会影响最终转化完成后的结果. 当这个对象定义了Symbol.toPrimitive方法时，拆箱操作会直接调用这个方法，忽略toSting和valueOf。
    ```js
    var o = {
        toString(){return '2'},
        valueOf(){return 1},
        //[Symbol.toPrimitive](){return 3}
    }
    console.log('x'+o);//Output:x3(when there is a symbol.toPrimitive method.)
    //Otherwise,"Output: x1" because in JS valueOf() will firstly be invoked when involving operaters '=-*/'. If valueOf() is undefined JS will call toString method in this case.
    let x = {};
    x[o] = 1; // In this expression, the method toSting() of o will be called firstly. 
    //Because the object is used as a key, JS will firstly try to use toString() method.
    ```
2. 基本类型的装箱操作(Boxing)
    - 使用关键字new可以对基本类型进行显示的装箱操作。特例是Symbol类型，因为其不支持new关键字，所以使用`new Object(Symbol('a'))`的方法对其进行装箱操作。

### Javascipt中的语句(Statements)
1. Completion Record  
    JS中的每个语句都会在运行时产生其所对应的completion record。 completion record中记录了三个信息：
    - `[[type]]`: normal, break, continue, return, throw。
    - `[[value]]`: 表达式语句返回值的基本类型。
    - `[[target]]` label, 当break和continue与带label的语句发生作用时，会产生target的值。
2. 简单语句
    - ExpressionStatment: `x=0;`.
    - EmptyStatement: `;`.
    - DebuggerStatement: `debugger;`在这个语句处加入一个断点.
    - ThrowStatement: `throw new Error()`.
    - ContinueStatment: `if(...){continue;}`.
    - BreakStatement: `break;`.
    - ReturnStatement: `return;`函数返回值.
3. 复合语句
    - BlockStatement:`{....}`可以包含多个简单语句。 `[[type]]:normal; [[value]]:--; [[label]]:--`.
    - IterationStatement: `while(); do{...}while(); for(); for(in); for(of); for await(of);`.
    - IfStatement:`if(){}`.
    - SwitchStatement:`switch(){case:... break;}` JS中switch语句的性能没有明显优势.
    - WithStatement:`with(){}` with语句在严格模式下已被禁止，不建议使用.
    - LabelledStatement:`loop1: for(){}` 与break和continue配合使用，控制程序执行的流程.
    - TryStatement:`try{}catch(){}finally{}`. `[[type]]:return; [[value]]:--; [[target]]:label`
4. 声明
    - FunctionDeclaration:`function`作用域：function body. 声明被提升
        - GeneratorDeclaration:`function*`.
        - AsyncFunctionDeclaration:`async function`.
        - AsyncGeneratorDeclaration:`async function*`.
    - VariableStatement: `var`.声明被提升
    - ClassDeclaration:`class` 声明不会被提升
    - LexicalDeclaration:`let const`声明不会被提升

### Javascript执行粒度(运行时，粒度由大到小的包含关系)
1. 宏任务: 由程序直接传给JS引擎的任务，即所需要在当前执行的代码，可能包含多个需要异步执行的微任务。
2. 微任务(Promise)： JS引擎内部的任务。
3. 函数调用(Execution Context)
4. 语句/声明(Completion Record)
5. 表达式(Reference)
6. 直接量/变量/this......

### 执行上下文(Execution Context)
- Code Evaluation State: aysnc and generator function保存代码现阶段执行到的步骤。
- Fuction：由function初始化的block会包含这一部分信息。
- Script or Module：保存这段代码是否引用了其他script或module的执行上下文。
- Generator：保存generator函数每次执行后所生成隐藏的generator信息。
- Realm：realm是一个抽象概念，描述了一个固有对象的集合(a realm consists if a set of intrinsic objects), 它封装了单独的全局环境。当一个执行上下文被创建时，它与一个特定的realm相关联，这个realm为这个上下文提供了全局的环境。浏览器环境中的直接领域是iframe元素，它恰好提供了一个自定义的全局环境。在Node.js中，它靠近vm模块的沙箱。在两个不同realm中的相同类型的对象是不相等的，因为他们被两个不同的全局环境所声明。
```js
    const iframe = document.createElement('iframe');
    document.documentElement.appendChild(iframe);
    iframe.src="javascript:var b = {};";
    var b1 = iframe.contentWindow.b;
    var b2 = {};
    console.log(typeof b1, typeof b2); //object object。
    objectconsole.log(b1 instanceof Object, b2 instanceof Object); //false true
```
- Lexical Environment：保存所有当前程序可访问到的变量(let, const, class)。以及this, new.target, super等。Lexical Environment中的变量是静态的，这意味这个其在这个函数被声明时就确定了。通过引入this，来确定一个动态的范围，以访问不同的执行上下文中的变量。但是箭头函数中的this关键字是静态的，因为它的function environment没有提供this的值，它需要在其父环境中捕获。在global context内，this值是全局对象（全球环境记录的绑定对象）。 以前只有一个全局对象。 在当前版本的规范中，可能有多个全局对象是代码领域(realm)的一部分。[*Reference](http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition/)
    ```js
    var x = 10;
    let foo = {
      x: 20,

      // Dynamic `this`.
      bar() {
        return this.x;
      },

      // Lexical `this`.
      baz: () => this.x,

      qux() {
        // Lexical this within the invocation.
        let arrow = () => this.x;

        return arrow();
      },
    };

    console.log(
      foo.bar(), // 20, from `foo`
      foo.baz(), // 10, from global
      foo.qux(), // 20, from `foo` and arrow
    );
    ```
- Variable Environment: 保存当前程序可访问到的使用var关键字声明的变量。

### 函数的闭包(Function Closure)
在JS中每一个函数都会生成一个闭包，闭包的概念可以理解为closed environment，可以用来解决函数作为参数传递的问题(FunctionArgument). 在生成的闭包中包含两个部分：Environment Records和Codes. Environment Records里所保存的信息决定了这个函数的作用域和能访问到的所有变量或对象。Codes保存着这个函数所要执行的所有的语句。当这个函数被当做参数传入别的模块，对象或者函数时，它都会带着自身这个闭包里所有Environment Records和Codes一起传入。 


### 代码小技巧
1. JS中判断对象类型的方法
    - `typeof`:typeof主要为了区分对象类型和原生类型，所以只能用于判断一个变量是不是对象或者是不是字符串等。涉及到对象的具体细节，比如这个对象是哪个构造函数的实例，typeof就无能为力了. *注意：*对null或function使用typeof时的返回值为object和function.
    - `instanceof`：其返回值是Boolen类型，只能用来判定一个实例是否是某一个构造函数的实例，不能判别其具体类型。在不同的realm中(比如嵌套了iframe)，在一个iframe中的Array实例，在父窗口中使用instanceof Array的结果是false，因为在两个不通realm中的Array类型是对JS来说是不同的.
    - `Object.prototype.toString.call(obj)`:调用Object原型的toString方法，将需要判别的对象作为参数传入，可配合正则判断来得到这个对象的具体类型。 使用Object原型的toString方法是为了防止其他对象上的toString方法是被重构过的。使用这个方法有一些特例：`Proxy`会被判别为object, 所有的不同种类的Error对象都会仅仅返回Error.
    ```js
        function type(obj) {
        return Object.prototype.toString.call(obj).match(/\[\w+ (\w+)\]/)[1]
        }
    ```
    - `Object.getPrototypeOf(obj).constructor.name`:一个对象的原型的构造函数的命名绝大多数时候与其对应的类型是相同的。但是当遇到`null`和`undefined`时是不适用的。`Atomics`、`Proxy`、`JSON`会被判别为object

>**TODO:**
> 1. 怎样判别一个object是Proxy的实例？