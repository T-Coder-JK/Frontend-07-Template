//uses a Map to record all the callbacks found by watcher
//because map can accept an object as a key while the object can't
let callbacks = new Map();
let reactivities = new Map();
let usedReactivities = [];

//the watcher function will record every invoking of reactive objects into the Map callbacks
//in order to re-invoke recorded functions when objects' properties were changed
export function watcher(callback) {
  usedReactivities = [];
  callback();
  for (let reactivity of usedReactivities) {
    if (!callbacks.has(reactivity[0])) {
      callbacks.set(reactivity[0], new Map());
    }
    if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
      callbacks.get(reactivity[0]).set(reactivity[1], []);
    }
    callbacks.get(reactivity[0]).get(reactivity[1]).push(callback);
  }
}

export function reactive(obj) {
  if (reactivities.has(obj)) {
    return reactivities.get(obj);
  }
  let handler = {
    //custom targeted object's default getter method of the target object
    get: (obj, prop) => {
      if (obj[prop] === undefined) {
        return undefined;
      }
      //when a function invokes any property in the target object
      //records the invoking
      usedReactivities.push([obj, prop]);
      if (typeof obj[prop] === "object") {
        return reactive(obj[prop]);
      }
      return obj[prop];
    },
    // custom targeted object's default setter method of the target object
    set: (obj, prop, value) => {
      if (obj[prop] === undefined) {
        throw new Error("This property is not defined");
      }
      obj[prop] = value;
      if (callbacks.has(obj)) {
        if (callbacks.get(obj).has(prop)) {
          for (let callback of callbacks.get(obj).get(prop)) {
            callback();
          }
        }
      }
      return true;
    },
  };
  let proxy = new Proxy(obj, handler);
  reactivities.set(obj, proxy);
  return proxy;
}
