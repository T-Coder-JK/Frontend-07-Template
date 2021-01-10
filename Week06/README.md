***Advanced Javascript 第六周***

### 产生式 BNF(Backus-Naur Form)
用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。
- 用尖括号括起来的名称来表示语法结构名。
- 语法结构分成基础结构和其他需要用语法定义的复合结构
    - 基础结构称为终结符
    - 复合结构称为非终结符
- 引号和中间的操作符也表示终结符
- 可以有括号
- ‘*’表示重复多次， ‘|’表示逻辑或， ‘+’表示至少一次
- Example Arithmetric Expression:  
    ```
    <PrimaryExpression>::= <Number> | ‘(’ <AddtiveExpression> ‘)’

    <MultiplicativeExpression>::= <PrimaryExpression> | 
                                  <Number> ‘*’ <MultiplicativeExpression> |
                                  <Number> ‘/’ <MultiplicativeExpression> |

    <AddtiveExpression>::= <MultiplicativeExpression> | 
                            <Number> ‘+’ <MultiplicativeExpression> |
                            <Number> ‘-’ <MultiplicativeExpression> |
    ```
    其中`<Number>`, '+', '-', '*', '/', '(', ')'为终结符， `<PrimaryExpression>, <MultiplicativeExpression>, <AddtiveExpression>`为非终结符。

### 乔姆斯基谱系(Chomsky Hierarchy)
将文法的刻画能力进行分类  
（0）*短语结构文法*（phrase structure grammar):产生式左右两边可以有多个非终结符。  
（1）*上下文相关文法*（context-sensitive grammar):每条产生式左右两边可以有多个非终结符，但是只能在左边有一个非终结符被替换为其他符号，且这个替换复合上下文前后关系。  
（2）*上下文无关文法*（context-free grammar）:  每条产生式的左边只能有一个非终结符，右边的非终结符数量没有限制。  
（3）*正则文法*（regular grammar），或称，有限状态文法（ﬁnite-state grammar）  

![Chomsky](https://media.geeksforgeeks.org/wp-content/uploads/20190227115949/Comsky-1.png)
Javacript语言宽泛的讲大部分属于上下文无关文法，而JS中表达式部分属于正则文法。 但也要注意一些特例，如`2 ** 1 ** 2`值为2， 因为平方运算是右结合`2 ** 1 ** 2 => 2 ** 1 => 2`,故这个表达式并不是正则文法。 Javacript引擎在处理代码时，多数情况是针对上下文无关文法对代码解析， 但当遇到一些特殊定义如`{ get a {return 1}, get: 1}`这样的语句时，也需要用上下文相关文法的方式进行特殊处理。所以要是严格意义上定义Javascript应属于上下文相关文法的语言。

### 编程语言的谱系(Programming Language Spectrum)
1. ***声明式(Declarative)***
    - 函数式语言(Functional): ML, Hashkell, Lisp, Clojure
    - 数据描述(Dataflow): JSON, HTML, SQL, CSS, Id, Val
2. ***命令式(Imperative)***
    - 脚本语言(Scripting): Perl, PHP, Python, Javascript
    - 面向对象(Object-oriented): C++, Java, C#  
    - 命令式编程语言的一般结构：
    Atom(identifier, literal)=>Expression(atom, operator, punctuator)=>Statement(expression, keyword, punctuator)=>Structures(function, class, process, namespace)=>Programs(program, module, package, library)


### 编程与语言的动态与静态(Dynamic and Static)
1. ***动态(Dynamic)***
    - Runtime
    - 是在用户的设备上/在线服务器
    - 产品实时运行时

2. ***静态(Static)***
    - Compiletime
    - 在开发设备上
    - 产品开发时


### Javascript中的基本类型重点

1. *Number:* IEEE754 float 表示方法和精度。
2. *String:* ASCII, Unicode字符集和UTF的编码方式。
3. *Null & Undefined:* Null在JS中是关键字， Undefined在JS中是一个全局变量，可以被重新赋值。 所以为避免出错，可以用viod0运算代替undefined.  
4. *Object & Symbol:* JS中Object的分类是原型继承的方式来作为主要的设计思想，所谓‘照猫画虎’，即一个新的对象只需要描述它与它原型的区别就可以了，它们相同的地方通过原型链的方式继承了。 在设计对象的方法时，应首先考虑这个方法所改变的是那个对象的什么状态，再决定方法定义在那个对象里以及其操作对于状态的改变和应该被传入参数的形式。一个实例化对象的唯一性标识，是由其内存地址表示的。symbol因为其在设计时具有唯一性，把它用作对象属性名，可以避免命名冲突和增强属性访问的权限控制。
    - 对象的属性(Property):
        1. 数据属性(Data Property): value, writable, enumerable, configurable. 这其中writable, enumerable, configurable在JS中称之为这个属性的特性(attribute). 可以通过‘.'运算和’Object.defineProperty‘等方法来修改这些特性。
        2. 访问器属性(Accessor Property): get, set, enumerable and configurable.   
        
        一般来书数据属性用于描述对象的状态，访问器属性用来描述对象的行为。如果在对象的数据属性中存储的是一个函数时，可以称这个函数为对象的方法(Method). 如果这个方法用于操作对象的内部属性，这个方法可以被看作是一个访问器属性，即描述的是对象的行为。而这个方法的操作与对象本身状态无关时，那么这个方法被看做是对象的数据属性。
    - 对象相关的语法和API
        1. {}.[] Object.defineProperty 定义一个对象的基础操作的方法和语法。
        2. Object.create/Object.setPropertyOf/Object.getPropertyOf 基于原型来定义和扩展一个对象的操作方法。
        3. new/class/extends 模仿基于类的方式来描述对象。
        4. new/function/prototype ES3版本的较早使用函数和原型组合的方式描述对象。

5. *Function Object:* 在JS中function是带Call方法的一种特殊对象。当使用关键字`function`，箭头运算符或者FUNCTION构造器声明一个对象时，这个对象就会内置一个Call方法，这个对象也就是一个函数。 当这个函数声明完成后，使用语法`funName()`来调用这个函数时，会默认访问到它的Call方法。 使用这个语法调用一个非函数的对象时，因为没有Call方法，程序会报错。

### JavaScript中具有特殊行为的对象
1. Boolean, Number, String装箱操作后与基础类型所对应的对象。
2. Arrays和类似数组的对象(Maps, Sets, TypeArrays)
3. Dates
4. Regular Expressions
5. Maths
6. Function