class Grid
{
  constructor()
  {
    this.cells = [];
    let colSize = (width - 1) / cols;
    let rowSize = (height - 1) / rows;
    for (let x = 0; x < cols; x++)
    {
      this.cells[x] = [];
      for (let y = 0; y < rows; y++)
      {
        var newCell = new Cell(x * colSize, y * rowSize, colSize, rowSize, 0);
        this.cells[x][y] = newCell;
      }
    }
  }

  drawGrid ()
  {

    for(let x = 0; x < cols; x++)
    {
      for (let y = 0; y < rows; y++)
      {
        this.cells[x][y].show();
      }
    }
    stroke(0);
    strokeWeight(1);
  }

  singleUseGrid()
  {
    let returngrid = []
    let colSize = (width - 1) / cols;
    let rowSize = (height - 1) / rows;
    for (let x = 0; x < cols; x++)
    {
      returngrid[x] = [];
      for (let y = 0; y < rows; y++)
      {
        var newCell = new Cell(x * colSize, y * rowSize, colSize, rowSize, grid.cells[x][y].counter);
        returngrid[x][y] = newCell;
      }
    }
    return returngrid;
  }

  checkNeighbours(x, y)
  {
    let returnNeighbours = [];
    for (let i = -1; i < 2; i++)
    {
      for (let j = -1; j < 2; j++)
      {
        if (i == 0 && j == 0){}
        else if (x + i >= 0 && x + i < cols && y + j >= 0 && y + j < rows){
          //console.log(x+i + " , " + y+j);
          returnNeighbours.push(this.cells[x + i][y + j].state);
        } else {
          //console.log("Not a valid cell");
          returnNeighbours.push(states.dead);
        }
      }
    }
    return returnNeighbours;
  }
}
