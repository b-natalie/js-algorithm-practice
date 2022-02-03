/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
 var validPath = function(n, edges, start, end) {
    const graph = {}
    for (let edge of edges) {
        const [a, b] = edge
        if (!(graph[a])) graph[a] = []
        if (!(graph[b])) graph[b] = []
        graph[a].push(b)
        graph[b].push(a)
    }
    // console.log(graph)
    
    const visited = new Set()
    
    return hasValidPathHelper(graph, start, end, visited)
};

function hasValidPathHelper(graph, start, end, visited) {
    if (start === end) return true
    if (visited.has(start)) return false
    visited.add(start)
    
    for (let neighbor of graph[start]) {
        if (hasValidPathHelper(graph, neighbor, end, visited)) {
            return true
        }
    }
    
    return false
}