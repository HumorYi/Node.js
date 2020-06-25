const { promises } = require('fs')

const logTime = name => console.log(`Log...${name} ` + new Date().toLocaleDateString())

class EventEmitter {
  constructor() {
    this.handler = {}
  }

  on(eventName, callback) {
    if (!this.handler[eventName]) {
      this.handler[eventName] = []
    }

    this.handler[eventName].push(callback)
  }

  emit(eventName, ...args) {
    const eventCallbacks = this.handler[eventName]
    if (!eventCallbacks) {
      return
    }

    eventCallbacks.forEach(eventCallback => eventCallback(...args))
  }
}

exports.promise = (name, delay) =>
  new Promise(resolve => {
    setTimeout(() => {
      logTime(name)
      resolve()
    }, delay)
  })

exports.co = (function () {
  return function co(generator) {
    let it
    if ((it = generator.next().value)) {
      it.then(res => co(generator))
    } else {
      return
    }
  }
})()

exports.event = async () => {
  const asyncFun = name => event => {
    setTimeout(() => {
      logTime(name)
      event.emit('end')
    }, 100)

    return event
  }

  const tasks = [asyncFun('event1'), asyncFun('event2'), asyncFun('event3')]

  // const { EventEmitter } = require('events')
  const event = new EventEmitter()
  let i = 0

  event.on('end', () => {
    if (i < tasks.length) {
      tasks[i](event)

      i++
    }
  })

  event.emit('end')
}
