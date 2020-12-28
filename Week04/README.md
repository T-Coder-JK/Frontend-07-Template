***字符串分析算法(String Matching Algorithms)  第四周***  
## 字典树（Tries)
字典树在性能表现上的特点：1.搜索命中所需时间与所搜索的键值长度成正比关系(Search hits take time proportional to the length of the search key). 2. 搜索没有匹配时，只需检查部分字符(Search misses involve examing only a few characters). 字典树的本质是一个由字符串中的每个字符的键值来构造的搜索树。由于其核心的目的是实现*retrieval*而命名为*trie*. *Trie(Prefixed Tree)*作为一种数据结构的核心属性是要实现搜索(search)和插入(insert)的算法。既然其实质是树的结构，那么在实现其任何的功能时，都应该仔细考虑使用递归的(recursive)方法和思路，以及递归实现的性能，进行综合的考虑。
- 在字典树中每个节点(node)的键值(key)与值(value)的使用场景分别是怎样的？  
    `node[key]`的键值key用于表示需要被用于构建为字典树的字符串的单个字符(或字母)。`node[key]`的值value用于存储子节点，和表示是否为一个完整的判定符。或一些其他的值，例如这个完整单词在符号表中对应的索引，根据使用场景来定。
- 字典树数据结构可以用于那些前端的功能实现？  
    文本编辑器的单词纠错功能。 输入地址时的自动完成填表的功能。 超长列表选择的关键字搜索功能...
- JS中并没有原生的字典树的数据结构，在JS中使用字典树对比HashTable的主要使用场景区别有那些？  
    毫无疑问，Trie的使用场景重点在于Search和Retrieval的功能实现，它并不是一个general-purpose dictionary data structure. 并且Trie依赖于其所保存数据的先后顺序。 而Hashtable则不然，它对数据没有顺序的要求，而是需要数据可进行哈希运算和等式比较。
- 字典树对比array.filter()在需要频繁的搜索应用的场景下，性能会有不少的提升。



## KMP算法(Knuth-Morris-Pratt Substring Search)  
***KMP的核心思想***  
在使用模式串(P)与长文本字符串(T)进行匹配时，通过对模式串进行预先的处理π(P)，判定模式串的自重复，可以获得模式串的一些基本信息。当不配的情况发生时，利用已知的模式串信息(通过π(P)建立的回退表或自动机)和前几位配成功的信息共同来确定下次再匹配时模式串P的起始位置(KMP中当发生不匹配时，不需要回退T的指针位置，只根据P的回跳表对P的指针进行操作)。避免机械的从前向后一位一位的匹配方法(the worst case O(mn))，从而降低程序最差和平均的时间复杂度(guaranteed worst case O(m+n))。  
- 字符串匹配最差情况：  
    T(AAAAAAAAAAAAAAAAAAAAA)  
    P(AAAAAAB)

***实现方法***  
首先对模式串进行预处理，构造与模式串相对应的字符串匹配自动机(determininstic finite-state automaton)`dfa[][]`来记录当一个模式串中的每一个字符c与T中字符比较后，模式串指针应该跳转的位置。 定义i为指向长文本字串T的指针，j为指向模式串P的指针。当这两个字符匹配时`T.charAt(i) = P.charAt(j)`，那么i和j同时向右移动一位`i++; j++`。 所以定义模式串中`DFA[P.charAt(j)][j] = j+1`,来表示当模式串相应位置的字符成功匹配后指针j向右移一位的操作。当j = length(P)时表示P与T.charAt(i-j...i)的子串匹配成功。如果T.charAt(i)与P.charAt(j)没能匹配，那么也要根据`DFA[T.charAt(i)][j]`的值来对j进行回退的操作，j = DFA[T.charAt(i)][j]。之后i++，进行下一次字符匹配的操作。直到i=length(T)程序结束返回找到的匹配结果或者null表示没有匹配的子串。 那么如何构造P对应的DFA就成为了KMP算法的核心，DFA主要关注的是P的自重复最长子串的长度。一个模式串(ABCDABD)的DFC可以用图表示为如下.
![DFA](./DFA.PNG)
圆圈中的数字表示DFA的每一种状态与指针j的值相对应。橘黄色箭头表示没有匹配成功时j的操作与方向，黑色箭头表示匹配成功时j的操作与方向(*当然无论匹配成功与否，在KMP中i都是始终向右移动一位*)。首先定义一个变量X，表示在匹配没有成功时，DFA应有的重启状态。 对于任何一个模式串P，它的DFA的第一列可以构造为: 除`DFA[P.charAt[0]][0]=1`(表示第一个字母匹配成功，DFA状态向右移动一位)外，其余元素`DFA[][0] = 0`，此时X=0。 然后可以根据如下算法完成P的DFA的构建：
```
copy DFA[][X] to DFA[][j];//for mismatch go back to the last possible matching state and restart the dfa
DFA[P.charAt(j)][j] = j+1;// for match go to the next state 
X = DFA[P.charAt(j)][X]; // update X, which represent the longest prefix string of P.charAt(j)
```
***KMP总结***  
KMP算法在理论层面上是非常优秀的，因为它保证了在最坏情况下的线性时间复杂度。在多数实践中，KMP对于brute-force的加速效果并不明显，因为KMP依赖于模式串和被匹配文本的自重复性，而往往这种大量自重复的字符串被用于搜索匹配的情况在实际的开发中并不常见。 然而由于KMP不需要对文本字符串进行回退操作，这个特性使KMP在处理大量无法确定长度的流文本时，具有很好的应用优势。 在一些对输入文本很容易进行回退操作的应用场景中，也有其他的算法可以在效率上超过KMP，比如Boyer-Moore substring search算法
## WildCard
WildCard可以对通配符进行匹配(*, ?), 在WildCard算法中处理`*`和`?`要使用不同的逻辑，而且对待模式串中出现的`*`和最后出现的`*`也要使用不同的逻辑。对于出现在最后一个`*`之前的`*`,可以将其与之后跟随的字符看做是一个子串，使用KMP算法可以处理。 对于最后出现的`*`，要考虑其在正则表达式中确实的含义。  
 O(n)


## 代码小技巧
1. `__proto__` vs `.prototype`? JS常会被描述为是“prototype-based language”, 它的思想是通过原型来继承方法和属性(JS中方法，属性都可以被描述为对象的属性)。那么一个对象的原型对象也和可以有其原型对象，这就产生了原型链的概念(prototype chain)。这也是造成定义在其他对象上的属性可以在这个对象上被调用的原因。在基于原型的面向对象的思想下，提倡关注对象与对象之间的关系，将一些使用方式相近的对象划分成为原型对象，而不是将它们分成类。创建新的对象是通过复制的方式来实现，在一些情况下允许复制一个空对象，实际上就是创建了一个全新的对象。JS在ES6之前的版本中所有的对象都有私有的字段[[prototype]],它描述的就是这个对象的原型。在ES6之后的版本中，JS提供内置函数`Object.getPrototype(obj)`来直接访问对象的原型，在部分浏览器中`obj.__proto__`可以访问对象构造函数的原型对象(which contains the object's constructor's prototype object, `obj.__proto__` and `obj.__proto__.__proto__` to vist the prototype chain). 一个对象原型链中的持有的属性，都是通过引用的形式来保存的，也就是是说如果这个属性在新的对象上没有被重写而其原型对象的这个属性发生更改后，在新对象调用这个属性时也会发生相应的改变(It's really useful because the whole inheritance chain will update dynamically, automatically making new methods available on all object instances derived from the constructor)。 `.prototype`这个属性并不指向当前对象的原型对象，它存储的是以***它为原型时可以被继承的属性***。当程序读取一个对象自身没有的属性时，就会尝试继续访问对象的原型，直到原型为空或者找打这个属性为止。
In fact, a fairly common pattern for more object definitions is to define the properties inside the constructor, and the methods on the prototype. This makes the code easier to read, as the constructor only contains the property definitions, and the methods are split off into separate blocks.[*Reference](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes#Revisiting_create)

2. Object.create() vs new Object()?
在ES6之后，JS提供了内置函数`Object.create()`来根据指定的原型创建对象，这里的原型可以是`null`. 所以`Object.create(null)`就相当于创建了一个全新的空对象, 此时这个共对象的原型和原型链上没有定义任何的属性。而是使用`new Object()`创建的新对象的原型和原型链都不为空。

3. JS中`void`是一个运算符，对给定的表达式进行求值，然后返回`undefined`. 所以void(0)可以用于表示undefined的原始值。

4. JS中的**装箱操作**就是把基本的类型(primitive)装换为相对应的基本包装对象(primitive wrapper objects)。而装箱操作又分为*隐式和显式*两种: `var s1 = "something";//implicit`就是*隐式装箱操作*，当读取一个基本类型值时，JS后台会创建一个基本包装对象。所以可以支持`s1.substring()`这样调用对象上的方法操作。 但是这个创建的基本包装对象是临时的，其只存在方法调用代码执行的一瞬间，执行完成之后就会销毁(对于性能要求较高时，因尽量避免这种操作)。所以手动在*隐式装箱*的基本类型上添加自定义的属性和方法是不可行的。 那么对于*显式装箱*操作，如：`var s2 = new String("something else");`所声明的变量是可以添加自定义的属性与方法，因为通过关键字`new`所创建的基本包装对象的实例，在执行流离开当前作用域之前会一直保存在内存中。 **拆箱操作**，也就是将基本包装对象转换为基本类型的过程， 一般可以通过类似`valueOf()`和`toSting()`这样的方法来实现。  除了`null`和`undefined`以外，其余的基本类型都有其相对应的基本包装对象。要注意的是Symbol类型，无法使用`new`关键字的调用。但是依然可以通过`call()`的方法将其*隐式装箱(或者强制装箱)*为其包装对象。  
    ```js
    var symbolObject = (function(){ return this; }).call(Symbol("a")); 
    console.log(typeof symbolObject); //object 
    console.log(symbolObject instanceof Symbol); //true 
    console.log(symbolObject.constructor == Symbol); //true
    //When a Symbol wrapper object is used as a property key, this object will be coerced to its wrapped symbol.
    ```
    或者通过`Object()`进行*显示装箱*
    ```js
    var symbolObject = Object(Symbol("a"));
    console.log(typeof symbolObject); //object 
    console.log(symbolObject instanceof Symbol); //true 
    console.log(symbolObject.constructor == Symbol); //true
    ```

+ >**TODO：** 学习理解WildCard的算法细节以及更普遍的运用思路