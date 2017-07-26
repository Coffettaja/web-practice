// ## Array Cardio Day 2

const people = [
{ name: 'Wes', year: 1988 },
{ name: 'Kait', year: 1986 },
{ name: 'Irv', year: 1970 },
{ name: 'Lux', year: 2015 }
]

const comments = [
{ text: 'Love this!', id: 523423 },
{ text: 'Super good', id: 823423 },
{ text: 'You are the best', id: 2039842 },
{ text: 'Ramen is my fav food ever', id: 123523 },
{ text: 'Nice Nice Nice!', id: 542328 }
]

function isAtLeast19(person) {
  return 2017 - person.year >= 19
}

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
let atLeast19 = people.some(isAtLeast19)
console.log("Some people are at least 19 years old? " + atLeast19)
// Array.prototype.every() // is everyone 19 or older?
let everyone19 = people.every(isAtLeast19)
console.log("Everyone is at least 19? " + everyone19)

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
let theComment = comments.find(x => x.id === 823423)
console.log(theComment)

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
let commentIndex = comments.findIndex(x => x.id === 823423)
comments.splice(commentIndex, 1)
console.log(comments)
