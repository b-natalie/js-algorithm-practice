/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

 var twoSum = function(nums, target) {
    for (i = 0; i < nums.length; i++) {
        for (j = 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target && i !== j) {
                return [i, j]
            }
        }
    }
    return -1
};

console.log(twoSum([2,7,11,15], 9))
console.log("Should be: [0,1]")
console.log(twoSum([3,2,4], 6))
console.log("Should be: [1,2]")
console.log(twoSum([3,3], 6))
console.log("Should be: [0,1]")