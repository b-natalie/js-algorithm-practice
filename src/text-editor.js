function textEditor(queries) {
    let stepStack = []
    let currentString = ""
    let startIndex = 0
    let endIndex = 0
    let copied = ""
    let undoIndex = 0
    let redoIndex = 0
    for (let i = 0; i < queries.length; i++) {
        if (queries[i][0] === "APPEND") {
            let addedString = queries[i][1]
            if (i > 0 && queries[i-1][0] === "SELECT") {
                currentString = currentString.slice(0, startIndex) + addedString + currentString.slice(endIndex)
            } else {
                currentString = currentString.slice(0, startIndex) + addedString + currentString.slice(startIndex)
            }
            stepStack.push(currentString)
            startIndex = startIndex + addedString.length
            endIndex = 0
            undoIndex++
        } else if (queries[i][0] === "MOVE") {
            startIndex = parseInt(queries[i][1])
            endIndex = 0
            if (startIndex < 0) {
                startIndex = 0
            }
            if (startIndex > currentString.length) {
                startIndex = currentString.length
            }
            stepStack.push(currentString)
            undoIndex++
        } else if (queries[i][0] === "DELETE") {
            if (i > 0 && queries[i-1][0] === "SELECT") {
                currentString = currentString.slice(0, startIndex) + currentString.slice(endIndex)
            } else {
                currentString = currentString.slice(0, startIndex) + currentString.slice(startIndex + 1)
            }
            stepStack.push(currentString)
            endIndex = 0
            undoIndex++
        } else if (queries[i][0] === "SELECT") {
            startIndex = parseInt(queries[i][1])
            endIndex = parseInt(queries[i][2])
            stepStack.push(currentString)
            undoIndex++
        } else if (queries[i][0] === "COPY") {
            if (endIndex > startIndex) {
                copied = currentString.slice(startIndex, endIndex)
            } else {
                copied = ""
            }
            stepStack.push(currentString)
            undoIndex++
        } else if (queries[i][0] === "PASTE") {
            if (copied.length > 0 && endIndex > startIndex) {
                currentString = currentString.slice(0, startIndex) + copied + currentString.slice(endIndex)
            } else if (copied.length > 0) {
                currentString = currentString.slice(0, startIndex) + copied + currentString.slice(startIndex)
            }
            startIndex = startIndex + copied.length
            endIndex = 0
            stepStack.push(currentString)
            undoIndex++
        } else if (queries[i][0] === "UNDO") {
            if (i > 0) {
                while (undoIndex - 1 >= 0) {
                    if (stepStack[undoIndex - 1] !== currentString) {
                        console.log(currentString)
                        currentString = stepStack[undoIndex - 1]
                        stepStack.push(currentString)
                        redoIndex = undoIndex + 1
                        break
                    }
                    undoIndex--
                }
            }
        }
    }
    return stepStack
}

let queriesA = [["APPEND", "Hey"],["APPEND", " there"], ["APPEND", "!"]]
let queriesB = [["APPEND", "Hey you"],["MOVE", "3"], ["APPEND", ","]]
let queriesC = [["APPEND", "Hello! world!"],["MOVE", "5"], ["DELETE"], ["APPEND", ","]]
let queriesD = [["APPEND", "!"], ["DELETE"], ["MOVE", "0"], ["DELETE"], ["DELETE"]]
let queriesE = [["APPEND", "Hello cruel world!"], ["SELECT", "5", "11"], ["APPEND", ","]]
let queriesF = [["APPEND", "Hello"], ["SELECT", "2", "5"], ["APPEND", "y there"]]
let queriesG = [["APPEND", "Hello, world!"], ["SELECT", "7", "12"], ["DELETE"], ["APPEND", "you"]]
let queriesH = [["APPEND", "Hello, world!"], ["SELECT", "5", "12"], ["COPY"], ["MOVE", "12"], ["PASTE"], ["PASTE"]]
let queriesI = [["APPEND", "Hello, world!"],["SELECT", "7", "12"], ["DELETE"], ["UNDO"], ["APPEND", "you"]]

console.log(textEditor(queriesI))