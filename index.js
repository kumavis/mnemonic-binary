var sourceData = new Buffer('d46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675', 'hex')
var hexString = sourceData.toString('hex')

var bip39 = require('bip39')
console.log('==================== bip39 ================')
console.log(bip39.entropyToMnemonic(hexString))
console.log('===========================================\n')

var mnemo = require('mnemo')
console.log('==================== mnemo ================')
console.log(mnemo.fromInteger(parseInt(hexString, 16)))
console.log('===========================================\n')

var proquint = require('proquint-')
console.log('==================== proquint ================')
console.log(proquint.encode(sourceData))
console.log('===========================================\n')

// var words = require('mngen/words.json')
// console.log('==================== mngen ================')
// console.log(words.length, highestPowerOfTwo(words.length))
// console.log('===========================================\n')

// var words = require('bip39/wordlists/en.json')
// console.log('==================== bip 39 words ================')
// console.log(words.length, highestPowerOfTwo(words.length))
// console.log('===========================================\n')

var adjList = require('./wordlists/adj.json')
console.log('==================== adj adjList ================')
console.log(adjList.length, highestPowerOfTwo(adjList.length), bytesPer(adjList.length))
console.log('===========================================\n')

var nounList = require('./wordlists/noun.json')
console.log('==================== noun nounList ================')
console.log(nounList.length, highestPowerOfTwo(nounList.length), bytesPer(nounList.length))
console.log('===========================================\n')

var verbList = require('./wordlists/verb.json')
console.log('==================== verb verbList ================')
console.log(verbList.length, highestPowerOfTwo(verbList.length), bytesPer(verbList.length))
console.log('===========================================\n')

// var input = sourceData
// var input = new Buffer('hello', 'utf8')
// var result = sliceBitsFromBuffer(input, 0, 10)

// console.log(input.toString('utf8'))
// console.log(input.toString('hex'))
// console.log(bufferToNumber(input).toString(2))

// console.log(result.toString())
// console.log(result.toString(16))
// console.log(result.toString(2))
var wordIndex
var wordPos = 0

wordIndex = sliceBitsFromBuffer(sourceData, wordPos*10, 10)
var adj = adjList[wordIndex]
wordPos++

wordIndex = sliceBitsFromBuffer(sourceData, wordPos*10, 10)
console.log(wordIndex, wordIndex.toString(2))
var noun = nounList[wordIndex]
console.log(noun)
wordPos++

wordIndex = sliceBitsFromBuffer(sourceData, wordPos*10, 10)
var verb = verbList[wordIndex]

console.log('words:', adj+' '+noun+' '+verb+' '+adj+' '+noun)

function highestPowerOfTwo(number){
  return Math.pow(2,Math.floor(Math.log(number)/Math.log(2)))
}

function bytesPer(number){
  return highestPowerOfTwo(number)
}

function sliceBitsFromBuffer(buffer, from, length){
  console.log('slice', bufferToNumber(buffer).toString(2), from, length)

  var startIndex = Math.floor(from/8)
  var startError = (from % 8)
  
  var end = (from+length)
  var endIndex = Math.ceil(end/8)
  var endError = 8 - (end % 8)

  console.log('start:', from, startIndex, startError)
  console.log('end:', end, endIndex, endError)
  var smallestSlice = buffer.slice(startIndex, endIndex)
  var binString = bufferToNumber(smallestSlice).toString(2)
  console.log('binString:', binString)
  var corrected = binString.slice(startError,length)
  console.log('corrected:', corrected)
  console.log('length:', corrected.length)


  // var num = bufferToNumber(buffer)
  // var binString = num.toString(2).slice(from, length)
  // console.log('num:', num)
  // console.log('binString full:', num.toString(2))
  // console.log('binString:', binString)
  // console.log('from,length:', from, length)
  var bitMask = parseInt(binString, 2)
  return bitMask
}

function bufferToNumber(buffer){
  return parseInt(buffer.toString('hex'),16)
}

// function numberToUtf8(number){
//   return (new Buffer(number.toString(16),'hex')).toString('utf8')
// }