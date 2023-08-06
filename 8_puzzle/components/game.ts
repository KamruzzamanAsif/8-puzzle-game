import PriorityQueue from 'js-priority-queue';

class Node{
    parent: any;
    matrix: any;
    x: number;
    y: number;
    cost: any;
    level: any;

    constructor(parent, matrix, x, y, cost, level) {
        this.parent = parent;
        this.matrix = matrix;
        this.x = x;
        this.y = y;
        this.cost = cost;
        this.level = level;
      }
}


class Game{
    const N = 3;
    const row = [1, 0, -1, 0];
    const col = [0, -1, 0, 1];
    const initialMatrix: any;
    const goalMatrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0], // 0 represents the empty tile
    ];

    constructor(initialMatrix: any){
        this.initialMatrix = initialMatrix;
    }

    calculateCost(initialMat: any, finalMat: any): any {
        let count = 0;
        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.N; j++) {
                if (initialMat[i][j] !== 0 && initialMat[i][j] !== finalMat[i][j]) {
                count++;
                }
            }
        }
        return count;
    }

    createNode(mat, x, y, newX, newY, level, parent): any{
        var newMatrix = [];
        // copy data from the parent node to the current node
        for (let i = 0; i < this.N; i++) {
        newMatrix[i] = mat[i].slice(); // make a copy of each row
        }

        // move tile by 1 position
        const temp = newMatrix[x][y];
        newMatrix[x][y] = newMatrix[newX][newY];
        newMatrix[newX][newY] = temp;

        const cost = this.calculateCost(newMatrix, this.goalMatrix);

        return new Node(parent, newMatrix, newX, newY, cost, level);
    }

    function printPath(mat) {
        if(mat.parent != null)
        printPath(mat.parent);
        console.log(mat.matrix);
    }

    function isSafe(x, y) {
        return x >= 0 && x < N && y >= 0 && y < N ? 1 : 0;
    }


    function solve(initialMatrix, x, y, goalMatrix){
        var myComparator = function(lhs, rhs) {return (lhs.cost + lhs.level) - (rhs.cost + rhs.level)};
        var priority_queue = new PriorityQueue({comparator: myComparator});

        const root = createNode(initialMatrix, x, y, x, y, 0, null);
        root.cost = calculateCost(initialMatrix, goalMatrix);

        priority_queue.queue(root);

        while(priority_queue.length>0){
        var min = priority_queue.dequeue();

        if(min.cost == 0){
            printPath(min);
            return;
        }

        for(var i = 0; i<4; i++){
            if(isSafe(min.x + row[i], min.y + col[i]) > 0){
            var child = createNode(min.matrix, min.x, min.y, min.x + row[i], min.y + col[i], min.level+1, min);
            child.cost = calculateCost(child.matrix, goalMatrix);
            priority_queue.queue(child);
            }
        }
        }
    }

    solve(initialMatrix, x, y, goalMatrix);
}

