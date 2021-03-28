let message: string = "Hello"
console.log(message)

const compute = (a: number, b: number) => a * b
console.log(compute(2, 4))

import http from 'http'
http.createServer((req, res) => {
    res.end('Hello')
}).listen(3000, () => console.log("Server started"))