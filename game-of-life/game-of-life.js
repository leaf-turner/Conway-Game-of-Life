/*
*   THE GAME OF LIFE  https://en.wikipedia.org/wiki/Conway's_Game_of_Life
*
*   Wesley Shaw 12/11/2018
*
*   Project idea from The Coding Train on youtube
*   https://www.youtube.com/watch?v=FWSR_7kZuYg
*
*   Game Of Life:
*       Alive = 1 , Dead = 0
*       -life is created (0-->1) if 0 has 3 live neighbors 
*       -life dies(1-->0) if 1 has <2 live neighbors or >3 live neighbors(overpopulation)
*
*/

// web has cols first, usually done [row,col]
function make2DArray(cols,rows){
    let arr = new Array(cols);
    for(let i =0; i< arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 5;

function setup(){
    
    createCanvas(800,600);
    cols= width/resolution;
    rows = height/resolution;

    grid = make2DArray(cols,rows);
    for(let i =0; i < cols; i++){
        for(let j =0; j < rows; j++){
           
            //p5.js
           grid[i][j] = floor(random(2));
           
        }
    }
}

function draw(){
    background(0);

    for(let i =0; i < cols; i++){
        for(let j =0; j < rows; j++){
            let x= i *resolution;
            let y= j *resolution;
            if(grid[i][j] == 1){
                fill(255);
                stroke(0);
                // canvas is a square so only need width and width
                
                //shape of each cell?
                rect(x,y,resolution-1,resolution-1);
            }
            
        }
    }

    let next = make2DArray(cols, rows);

    //compute  let next on grid

    for(let i =0; i < cols; i++){
        for(let j =0; j < rows; j++){
            let state = grid[i][j];
            
                //count live neighbors
                // eight neighbors where starting location is grid[i][j]
                let sum = 0;
                let neighbors = countNeighbors(grid,i,j);
                

                //rules of the game, see header ^line1
                if(state == 0 && neighbors == 3){
                    next[i][j] = 1;
                }else if(state ==1 && (neighbors <2 || neighbors > 3)){
                    next[i][j] = 0;

                }else{
                    //current state
                    next[i][j] = state;
                }
            
        }
    }

    grid = next;
}//draw()

function countNeighbors(grid,x,y){
    let sum = 0;
    //using i =-1 for its 1 behind grid[i-1][j-1] current location grid[i][j]
    //this function is cycling through the local area of the current state
    for(let i =-1; i < 2; i++){
        for(let j =-1; j < 2; j++){
            //modulus magic from Coding Train youtube channel
            // find more intuitive way to do it?
            let col = (x+i+cols) % cols;
            let row = (y+j+rows) % rows;

            sum+= grid[col][row];
        }
    }
    //take out current location
    sum -= grid[x][y];
    return sum;
}
