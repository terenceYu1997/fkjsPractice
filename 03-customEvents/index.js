/**
 * Created by Terence on 2021/4/25 - 9:49 上午
 * Description :
 */



// 1. on -> 订阅事件, 保存事件key&func关系, 传入的参数 也得保存下来? -> 另一个map?
// 2. fire -> 打印所有队列中的事件?
// 3. once -> 不往队列中存事件?
// 4. off -> 移除map关系?
class Events {
  fnsObj = {};
  on(key, fn, ...args) {
    const currentFn = {
      fn,
      args,
      isOnce: false
    }

    if (this.fnsObj[key]) {
      this.fnsObj[key].push(currentFn)
    } else {
      this.fnsObj[key] = [currentFn];
    }
  }

  fire(key, ...args) {
    const list = this.fnsObj[key];
    list.forEach(item => item.fn(...item.args, ...args))
    this.fnsObj[key] = list.filter(item => !item.isOnce)
    // console.log(list)
  }

  once(key, fn, ...args) {
    const currentFn = {
      fn,
      args,
      isOnce: true
    }

    if (this.fnsObj[key]) {
      this.fnsObj[key].push(currentFn)
    } else {
      this.fnsObj[key] = [currentFn];
    }
  }

  off(key, fn) {
    for (let kk in this.fnsObj[key]) {
      const singleFn = this.fnsObj[key][kk];
      if (singleFn.fn === fn) {
        delete this.fnsObj[key][kk]
      }
    }
  }
}


// 请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能
try {
  const fn1 = (... args)=>console.log('I want sleep1', ... args)
  const fn2 = (... args)=>console.log('I want sleep2', ... args)
  const event = new Events();
  event.on('sleep', fn1, 1, 2, 3);
  event.on('sleep', fn2, 1, 2, 3);
  event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
  event.off('sleep', fn1);
  event.once('sleep', () => console.log('I want sleep'));
  event.fire('sleep');
// I want sleep2 1 2 3
// I want sleep
  event.fire('sleep');
// I want sleep2 1 2 3
} catch (e) {
  console.error(e)
}
