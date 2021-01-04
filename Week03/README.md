**抽象语法树(Abstract Syntax Tree) 第三周**

## 词法和语法解析 Tokenizer(lexical analysis) and Parser(syntactic analysis)算法
常用的主要词法和语法解析算法，有NFA（Nondeterministic Finite Automaton), DFA(Deterministic Finite Automaton)， LL parser(Left-to-Right, Leftmost Derivation)和LR(Left-to-Right, Rightmost Derivation)四种。[*Reference](https://www.youtube.com/watch?v=4m7ubrdbWQU)
- **NFA和DFA**

  这两种算法常用于正则表达(Regular Expression)的解析(Tokenizer which means it's in the lexical analysis process)。 NFA可以通过*子集构造法*来转换成为每个不同状态相对应n个DFA。NFA 通常状态数量比较少，可以直接用来进行计算，但可能会涉及回溯，从而性能低下；DFA因为其确定性所以运算速度快， 但是其数量可能很大，占用更多的空间，并且生成 DFA 本身也需要消耗计算资源。[*Reference](https://time.geekbang.org/column/article/137286)
- **LL算法**
    
    LL是针对自顶向下的深度优先算法的优化而产生的，其优化的思路就是给深度优先算法加上一定的预测能力，来避免大量回溯的操作。 所以LL算法是一种自顶向下有预测功能的算法。 当LL算法执行时发现有多个候选产生式时，就向下递归一LL(1)层或K层LL(k)，来决定当前采用那一个候选式最佳。
    

- **LR算法**
    
    LR 算法是一种自底向上的算法，它能够支持更多的语法，而且没有左递归的问题。第一个字母 L，与 LL 算法的第一个 L 一样，代表从左向右读入程序。第二个字母 R，指的是 RightMost（最右推导），也就是在使用产生式的时候，是从右往左依次展开非终结符。其原理是依靠自底向上移进(Unshift)-规约(Reduce)的方法来实现的。[*Reference](https://time.geekbang.org/column/article/139628)

    ![image](https://images.squarespace-cdn.com/content/v1/58c01cea29687fdfb7c37d2d/1559558943078-Q4EG7Y6YLF3PB0M1M21X/ke17ZwdGBToddI8pDm48kNX21J0lj0t-bXR-XR1_1P0UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dlw0xLU5M5oFHn97N5qwvJWS2UKx4Bw5_H5VqrHRcWRJ7zs2yPjc1ECvpa5Zm_kMqw/stages_of_compiler_processing.jpg?format=2500w)
    
## 四则运算产生式规程

Arithmetic Expression Production Rules。 常见的一种四则运算语法产生式的规则可以表达如下：

        expression = term | expression, "+", term;
        term       = factor | term, "*", factor;
        factor     = constant | variable | "(" , expression, ")";
        variable   = "x" |  "y" | “z”;

在这个产生式中，包含了常量与自变量的情况， 同时也包含了使用括号来注明运算先后顺序的情况。（因为减法和除法是加法和乘法的逆运算， 所以直接用加法和乘法的操作就可以）

在此次实践中，采用的四则运算的产生式表达如下：

        <Expression>::=<AdditiveExpression><EOF>;

        <AdditiveExpression>::=<MultiplicativeExpression> | 
            <AdditiveExpression><+><MultiplicativeExpression> |
            <AdditiveExpression><-><MultiplicativeExpression>;

        <MultiplicativeExpression>::= <Number>|
            <MultiplicativeExpression><*><Number> |
            <MultiplicativeExpreesion></><Number>;

为方便记忆这里将其简化一下，表达为：

        expression = term | expression, "+", term;
        term   = factor | term, "*", factor;
        factor = constant (0...9) | end of file;

## 正则表达式 Regular Expression
在JS中正则表达式是一个object数据类型可以使用RegExp的`exec()`和`test()`方法, 也可以使用String的`match()`, `matchAll()`, `replace()`, `replaceAll()`, `search()`和 `split()`方法.
    
- **JS中正则表达式的两种构建方法**
    ```javascript
    /*
    Regular expression literals provide compilation of the regular expression when the script is loaded. 
    If the regular expression remains constant, using this can improve performance.
    */
    let reg = /ab+c/;

    /*
    Using the constructor function provides runtime compilation of the regular expression.
    Use the constructor function when you know the regular expression pattern will be changing,
    or you don't know the pattern and are getting it from another source, such as user input.
    */
    let reg = new RegExp('ab+c'); 
    ```

在此次实践中，JS的RegExp为主要实现词法分析(Tokenizer)的途径.

## 代码小技巧
1. JS `RegExp.prototype.exec()`的使用， 这个方法会在一个指定的字符串中执行一个搜索匹配，之后返回结果数组或`null`. 如果这个正则表达式通过`/.../g`或`/.../y`被设置为具有global或sticky的状态。 那么具有这两种状态时这个RegExp会存储属性`.lastIndex`, 用来表示下一次匹配的起始位置。如果这个RegExp没有被标记状态，那么其`.lastIndex`属性的值会一直为0.
使用`.lastIndex`这个属性，`exec()`方法可用来对单个字符串中的多次匹配结果进行逐条遍历,每次输出一个成功的匹配，并且记录下一次进行相同操作的起始位置。每次执行只返回一个捕获的匹配结果，所以需要循环执行[*Reference](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
    - RegExp global状态： `RegExp.prototype.global`是一个只读属性，其值为Boolean类型。此状态表示这个RegExp会对在String中所有符合结果进行匹配。[*Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
    - RegExp sticky状态：`RegExp.prototype.sticky`也是只读的Boolean属性。此状态表示这个RegExp只对在其`.lastIndex`所存储的索引位置在String中进行匹配，并且无论是否匹配成功都不会对string中剩余的位置进行匹配。
    - 当global和sticky状态同时为true时，global会被忽略。
    - 当RegExp使用`()|()|...`结构时，`.exec()`的返回值是一个Array数据类型， 匹配成功时Array[0]为捕获的匹配，之后的Array[1] - Aarray[n]对应RegExp的每个`()`中正则的匹配结果，匹配成功的返回捕获的结果，没有成功的返回`undefine`. 其索引顺序与`()`中正则的初始化排列顺序相同(arbitrary order)。之后Aarray中还会返回`Array[index], Array[input], Array[grounp]`等结果。 如果没有成功的匹配结果，其返回值为`null`.

2. JS中只有在``中可以使用${}插入变量的语法表达，而在`"" or ''`中不可以。

3. JS中**yield**关键字， 与C++和PHP中的用法类似，都是在生成器函数(generator function)中调用，yield会返回一个值给循环调用此生成器的代码并且只是暂停循环的执行。yield关键字只能在包含其的生成器函数本身调用，不能使用在生成器函数所包含的函数或者回调中。 生成器函数的返回的是一个可迭代的对象(IteratorResult Object)迭代器(iterator),这个返回的迭代器每次调用`.next()`方法的返回的对象包含两个属性`value`和`done`. `value`属性中保存的值就是`yield`关键字所返回的表达式或值， `done`属性表示生成器函数是否完全运行结束。 当`yield`返回值后，生成器函数会一直处于暂停状态直到下个其生成的迭代器(iterator)`.next()`方法被调. `yield*`关键字可以引用其他生成器函数或者可迭代对象。 
[*Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield).
    

+ >**TODO:**
    - 正则表达的常用符号和规则经常还是会搞混，自己写的部分除了很多错误。
    - JS中`generator and iterator`的使用




