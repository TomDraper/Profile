var grid;
var cols;
var rows;
var ruleSet;
var states = Object.freeze ({"alive": 1, "dead":0});
var rules = Object.freeze({"conway":0, "majority":1, "odd":2});
var currentRule;
var colText;
var rowText;
var speedText;
var colSlider;
var rowSlider;
var speedSlider;
var choosingStart;
var startGrid;
var dontDrag;
var speedChanged;

function setup()
{
  //Retrieve the div of the canvas.
  var canvasDiv = document.getElementById('sketchDiv');
  //Find the amount its offset from the edge in pixels.
  var width = canvasDiv.offsetWidth;
  var height = canvasDiv.offsetHeight;
  var sketchCanvas = createCanvas(width,height);
  currentRule = rules.conway;
  startGrid = new Grid();
  sketchCanvas.parent('sketchHolder');
  cols = 0;
  rows = 0;
  colText = document.getElementById('colText');
  rowText = document.getElementById('rowText');
  speedText = document.getElementById('speedText');
  colSlider = document.getElementById('colSlider');
  rowSlider = document.getElementById('rowSlider');
  speedSlider = document.getElementById('speedSlider');
  speedChanged = window.setInterval(function(){main();}, speedSlider.value * 10);
  colSlider.oninput = function()
  {
    //dontDrag = true;
    if (colSlider.value % 2 == 0)
    {
    colText.innerHTML = "Columns: " + colSlider.value;
    } else {
    colSlider.value++;
    colText.innerHTML = "Columns: " + colSlider.value;
    }

  }
  rowSlider.oninput = function()
  {
    //dontDrag = true;
    if (rowSlider.value % 2 == 0)
    {
    rowText.innerHTML = "Rows: " + rowSlider.value;
    } else {
    rowSlider.value++;
    rowText.innerHTML = "Rows: " + rowSlider.value;
    }
  }
  speedSlider.oninput = function()
  {
    //dontDrag = true;
    speedText.innerHTML = "Speed: " + speedSlider.value;
    window.clearInterval(speedChanged);
    speedChanged = window.setInterval(function(){main();}, speedSlider.value * 10)
    //frameRate(speedSlider.value);
  }
  //createCanvas(1024, 1024);
  background(0);
  frameRate(30);

  // grid = new Grid();
  // setStartConditions();
  reset(0);
}

function reset(rule)
{
  choosingStart = false;
  cols = colSlider.value;
  rows = rowSlider.value;
  //console.log(cols + " / " + rows);
  grid = new Grid();
  //console.log(startGrid);
  console.log("Columns: " + cols + "  Start Grid Length: " + startGrid.cells.length + "  Grid Length: " + grid.cells.length);
  if (startGrid.cells.length != grid.cells.length){
    console.log("NewStartGrid!");
    console.log(grid);
    console.log(startGrid);
    resetStartGrid();
    console.log("NewStartGrid 2nd Page!");
    console.log(grid);
    console.log(startGrid);
  }
  console.log("Columns: " + cols + "  Start Grid Length: " + startGrid.cells.length + "  Grid Length: " + grid.cells.length);
  setStartConditions();
  //console.log("Reset called, rule was: " + rule);
  switch(rule)
  {
    case 0:
      currentRule = rules.conway;
      break;
    case 1:
      currentRule = rules.majority;
      //console.log("Rule changed to majority: " + currentRule);
      break;
    case 2:
      currentRule = rules.odd;
      break;
    default:
      //console.log("Something went wrong with reset, rule set to: " + currentRule);
      break;
  }
}

function main()
{
  //background(255);
  //console.log(choosingStart);
  if (choosingStart == true)
  {
    saveStartGrid();
    //console.log("choosingStart is true");
  }
  else
  {
    //RETURNS AN ARRAY NOT A GRID OBJECT//
    let newGrid = grid.singleUseGrid();
    for (let i = 0; i < cols; i++)
    {
      for (let j = 0; j < rows; j++)
      {
        let neighbours = grid.checkNeighbours(i, j);
        // console.log(neighbours);
        // console.log(neighbours.length);
        let alive = 0;
        let dead = 0;
        for (let n = 0; n < neighbours.length; n++)
        {
          if (neighbours[n] == states.alive)
          {
            alive++;
          } else if (neighbours[n] == states.dead)
          {
            dead++;
          }
        }

        if (currentRule == rules.majority) {
          newGrid[i][j].state = majorityVote(alive, dead, grid.cells[i][j].state);
        }
        if (currentRule == rules.odd) {
          newGrid[i][j].state = CheckIfOdd(alive);
        }
        if (currentRule == rules.conway) {
          newGrid[i][j].state = GameOfLife(alive, dead, grid.cells[i][j].state);
        }
        if (newGrid[i][j].state == states.dead)
        {
          newGrid[i][j].counter = 0;
        }
      }
    }

    for (let i = 0; i < cols; i++)
    {
      for (let j = 0; j < rows; j++)
      {
        grid.cells[i][j] = newGrid[i][j];
      }
    }
    //grid.drawGrid();
  }
  grid.drawGrid();
  //console.log(grid.cells);
  //grid.cells = newGrid;
  //console.log(currentRule);
  }

  function setStartConditions(){
    // if (grid.cells.length != startGrid.cells.length){
    //   grid = new Grid();
    //   startGrid = new Grid();
    // }
    for (let i = 0; i < cols; i++)
    {
      for (let j = 0; j < rows; j++)
      {
        grid.cells[i][j] = startGrid.cells[i][j];
      }
    }
  }

  function saveStartGrid()
  {
    if (grid.cells.length != startGrid.cells.length){
      grid = new Grid();
      startGrid = new Grid();
    }
    for (let i = 0; i < cols; i++)
    {
      for (let j = 0; j < rows; j++)
      {
        startGrid.cells[i][j] = grid.cells[i][j];
      }
    }
  }

  function drawStartConditions()
  {
    //console.log("drawStartConditions");
    if (choosingStart == false){
      grid = new Grid();
      setStartConditions();
      choosingStart = true;
      return;
    }
    if (choosingStart == true){
      choosingStart = false;
      return;
    }
  }

  function resetStartGrid()
  {
    //grid = new Grid();
    startGrid = new Grid();
    saveStartGrid();
  }

  function GameOfLife(a, d, c)
  {
    if (a < 2 && c == states.alive){
      // console.log("Died from underpopulation");
      return states.dead;
    }
    if (a > 3 && c == states.alive)
    {
      // console.log("Died from overpopulation");
      return states.dead;
    }
    if (a == 2 && c == states.alive)
    {
      // console.log("Survived.. two alive and your alive!");
      return states.alive;
    }
    if (a == 3 && c == states.alive)
    {
      // console.log("Surived! 3 alive and your alive!");
      return states.alive;
    }
    if (a == 3 && c == states.dead)
    {
      // console.log("Born! 3 alive and your dead!")
      return states.alive;
    }
    else {
      // console.log("Returned same values")
      return c;
    }
  }

  function CheckIfOdd(amount)
  {
    //Returns even
    if (amount % 2 == 0)
    {
      //console.log("alive" + amount % 2 + " / " + amount);
      return states.dead;
    }
    //Returns odd
    if (amount % 2 == 1)
    {
      //console.log("dead" + amount % 2);
      return states.alive;
    }
  }

  function majorityVote(a, d, c)
  {
    if (a - d > 0)
    {
      return states.alive;
    }
    if (a - d == 0)
    {
      return c;
    }
    if (a - d < 0)
    {
      return states.dead;
    }
    console.log("Something went wrong: " + a + "," + d + "," + c);
  }
