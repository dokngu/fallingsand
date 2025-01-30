function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

let grid;
let w = 10;
let cols, rows;

function setup() {
    createCanvas(700, 700);
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }

    grid[20][10] = 1;

}

function mouseDragged() {
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);

    let matrix = 3;
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
            if (random(1) < 0.66) {
                let col = mouseCol + i;
                let row = mouseRow + j;
                if (col > 3 * extent && col < cols - 5 * extent &&
                    row > 3 * extent && row < rows - 5 * extent) {
                    //console.log(col + ' ' + row);
                    grid[col][row] = 1;
                }
            }
        }
    }

    //check if cursor outside canvas

}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            noStroke();
            if (grid[i][j] === 1) {
                let x = i * w;
                let y = j * w;
                square(x, y, w);
            }
        }
    }

    let nextGrid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            if (state === 1) {
                let below = grid[i][j + 1];
                let dir = random(1) > 0.5 ? 1 : -1;

                let belowA, belowB;
                if (i + dir >= 0 && i + dir < cols) {
                    belowA = grid[i + dir][j + 1];
                }
                if (i - dir >= 0 && i - dir < cols) {
                    belowB = grid[i - dir][j + 1];
                }

                if (below === 0) { // empty space beneath sand grain
                    nextGrid[i][j] = 0;
                    nextGrid[i][j + 1] = 1; // sand grain moves to space below
                } else if (belowA === 0) {
                    nextGrid[i + 1][j + 1] = 1;
                } else if (belowB === 0) {
                    nextGrid[i - 1][j + 1] = 1;
                } else { // sand grain beneath sand grain
                    nextGrid[i][j] = 1; // stay where it is
                }
            }
        }
    }
    grid = nextGrid;
}