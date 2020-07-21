require("./index.css")

require("./index.less")

// let a = require("./a.js")

// a()

const test = () => {
  console.log("includes:", [1, 2, 3].includes(1))
}

@log
class A {
  a = 1
}

function log(target) {
  console.log("target", target)
}

console.log("a", new A().a)


function * gen(params) {
  yield 1
}

console.log(gen().next())