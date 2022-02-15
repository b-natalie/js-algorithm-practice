var climbStairs = function(n) {
    // if (n === 1) {
    //     return 1
    // } else if (n === 2) {
    //     return 2
    // } else {
    //     return climbStairs(n - 1) + climbStairs(n - 2)
    // }
    
    if (n === 1 || n === 2) {
        return n
    }
    
    let a = 1
    let b = 2
    let num = 0
    for (let i = 3; i <= n; i++) {
        num = a + b
        a = b
        b = num
    }
    return num
};