***MinMax算法和异步任务   第一周***

## JS的近一步理解
本周学习的内容主要集中在对JS运行机制的了解，包含：JS *V8内核的线程机制*， *事件循环的触发机制*，以及*现有的语法规范*。 以前的开发经历多集中在后端。偶尔接触前端任务时，总感觉JS的语义规范太随意，时常感觉难懂和费解。 但是其实心里也很明白， 每一种编程语言一定都是按照严密的逻辑和规范设计的， 其语义的多样性必然是与其设计思想和面对的主要业务场景密不可分。 认真对比了从ES5到ES6的巨大提升以后，感觉JS的核心思想就是以轻量化，多样性来适应多种的业务场景， 并且这两点优势还可以很好的促进以其为核心的开源社区发展。 可以体会为什么近年来JS成长迅速的原因。 如果拿乐器来比较， C++好比一架钢琴， 基本所有的乐谱从简单到复杂，从伴奏到交响乐独奏，都可以有它的一席之地。 那么*目前为止*我觉得JS现在在我心里的感觉像是一把吉他， 不需要太依赖开发环境，针对一个具体的任务目标，快速的开发，封装，并且高复用。  

## 前端的初步学习计划
仅从目前已有的对前端开发的认识上来讲，我觉得JS应该可以算是前端技术目前的核心和难点。至于CSS，HTML的学习，似乎没有什么在理解和认知上的挑战， 所以学习这两技术的重点应该放在多动手实践，尽可能多的掌握它们的规范和特性。熟练以后应该就可以快速提升效率。 接下来JS的理解还需要更加深入一些， 需要多接触一下JS的高级语法， 常见的安全问题和质量风险， JS对DOM操作的更深认识， JS中常用的数据结构和算法（如有余力深挖一下它们实现的底层逻辑）。  其他对于Node.js的学习应该放在更深入理解了JS本身的原理以后。

## 编程小技巧
1. **Promise**

    Promise object represent the eventual completion (or failure) of an asynchronous operation and its result value. So promise actually is just a *proxy*, its value not be defined when is being initiated. However; when it associates with an asynchronous operation, its value will hold the success result or  failure reason of the action.

    Promise objects have three status:
    - *pending*: initial state, neither fulfilled or rejected.
    - *fulfilled*: meaning that the operation was completed successfully
    - *rejected*： meaning that the operation failed. 
    ![Image of promise](https://mdn.mozillademos.org/files/15911/promises.png)

## 不足之处
这周的学习感觉时间的管理上，问题严重。 太过仓促的完成了既定任务，没有很好的总结下有意思的思路和遇到的小问题。 之后最好线性的管理学习的时间，这样希望可以给自己更多总结和思考的时间。 

+ >**TODO：** 五子棋还没有完全实现， 应该继续找时间把它写完， 这个还是一个很有意思的实践。JS与前端的视觉感受结合，是很愉快的学习体验。