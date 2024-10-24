const utils=require('./models/utils.js')

console.log('my lucky number', utils.luckyNumber)
console.log('secret result', utils.addSecret(100))
console.log('secret number', utils.secretNumber)