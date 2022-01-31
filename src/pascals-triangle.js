/**
 * @param {number} numRows
 * @return {number[][]}
 */
 var generate = function(numRows) {
    let answer = [[1]]
    
    if (numRows > 1) {
        answer.push([1, 1])
    }
    
    for (let i = 2; i < numRows; i++) {
        let currentArr = []
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                currentArr.push(1)
            } else {
                currentArr.push(answer[i - 1][j - 1] + answer[i - 1][j])
            }
        }
        answer.push(currentArr)
    }
    
    return answer
};

console.log(generate(5))
console.log("Should be: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]")
console.log(generate(1))
console.log("Should be: [[1]]")