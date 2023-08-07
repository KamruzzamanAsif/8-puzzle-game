import PriorityQueue from 'js-priority-queue';

class Node{
    parent: any;
    matrix: any;
    x: number;
    y: number;
    cost: any;
    level: any;

    constructor(parent: any, matrix: any, x: any, y: any, cost: any, level: any) {
        this.parent = parent;
        this.matrix = matrix;
        this.x = x;
        this.y = y;
        this.cost = cost;
        this.level = level;
      }
}


class Game{
    N = 3;
    row = [1, 0, -1, 0];
    col = [0, -1, 0, 1];
    initialMatrix: any;
    goalMatrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0], // 0 represents the empty tile
    ];


    solution_matrices = [];


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

    createNode(mat: any, x: any, y: any, newX: any, newY: any, level: any, parent: any): any{
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

    printPath(mat: any): any {
        if(mat.parent != null)
            this.printPath(mat.parent);
        console.log(mat.matrix);
        this.solution_matrices.push(mat.matrix);
    }

    isSafe(x: any, y: any): any {
        return x >= 0 && x < this.N && y >= 0 && y < this.N ? 1 : 0;
    }


    solve(initialMatrix: any, x: any, y: any): any{
        var myComparator = function(lhs: any, rhs: any) {return (lhs.cost + lhs.level) - (rhs.cost + rhs.level)};
        var priority_queue = new PriorityQueue({comparator: myComparator});

        const root = this.createNode(initialMatrix, x, y, x, y, 0, null);
        root.cost = this.calculateCost(initialMatrix, this.goalMatrix);

        priority_queue.queue(root);

        while(priority_queue.length>0){
            var min = priority_queue.dequeue();

            if(min.cost == 0){
                this.printPath(min);
                return this.solution_matrices;
            }

            for(var i = 0; i<4; i++){
                if(this.isSafe(min.x + this.row[i], min.y + this.col[i]) > 0){
                    var child = this.createNode(min.matrix, min.x, min.y, min.x + this.row[i], min.y + this.col[i], min.level+1, min);
                    child.cost = this.calculateCost(child.matrix, this.goalMatrix);
                    priority_queue.queue(child);
                }
            }   
        }
    }
}

export default Game;