var n = 3; // Starting n.
var x = 3; // CurrentNumber ie: 3x + 1.
var origin;
var pInc = 10; // Amount of pixels between branchs.
var currentPos;
var knownValues;
var sizing = 1;
var currentScale = 0;
var canvas;
var modeEnum = Object.freeze({Circle: 0, Horizontal: 1})
var mode = modeEnum.Circle;
var uniqueNumbers = false;
var drawgrid = false;
var speedSlider;
var speedText;
var stop = true;
var xText;


function setup()
{
  var canvasDiv = document.getElementById('sketchDiv');
  var width = canvasDiv.offsetWidth;
  var sketchCanvas = createCanvas(width,512);
  console.log(sketchCanvas);
  //sketchCanvas.parent("myCanvas");
  //canvas = createCanvas(512, 512);
  sketchCanvas.parent('sketchHolder');
  speedSlider = document.getElementById("speedSlider");
  speedText = document.getElementById("speedText");
  xText = document.getElementById("currentX");

  speedText.innerHTML = speedSlider.value;
  //centerCanvas();
  reset(modeEnum.Circle);
  xText.innerHTML = "n: " + n + " x: " + x;
  console.log(speedSlider);
  console.log(speedSlider.value);
  console.log(speedText);
  speedSlider.oninput = function()
  {
    speedText.innerHTML = "Speed: " + speedSlider.value;
    reset(mode);
  }
}

function mainCalculation()
{
  if (x % 2 == 0)
  {
    x = x / 2;
  } else if (x % 2 == 1) {
    x = x * 3 + 1;
  }
}

function draw()
{
  if (mode == modeEnum.Circle && uniqueNumbers == true){
    for (let i = 0; i < speedSlider.value; i++){
      drawCircleUniques();
    }
  } else if (mode == modeEnum.Circle && uniqueNumbers == false)
  {
    for (let i = 0; i < speedSlider.value; i++){
      drawCircle();
    }
  }
  if (mode == modeEnum.Horizontal && uniqueNumbers == true){
    for (let i = 0; i < speedSlider.value; i++){
      drawHorizontalUniques();
    }
  } else if (mode == modeEnum.Horizontal && uniqueNumbers == false){
    for (let i = 0; i < speedSlider.value; i++){
      drawHorizontal();
    }
  }
  xText.innerHTML = "n = " + n + "    x = " + x;

}

function toggleUniqueNumbers()
{
  if (uniqueNumbers == true)
  {
    uniqueNumbers = false;
    console.log("Uniques turned off");
  } else if (uniqueNumbers == false)
  {
    uniqueNumbers = true;
    console.log("Uniques turned on");
  }
  reset(mode);
}
function toggleDrawGrid()
{
  if (drawgrid == true)
  {
    drawgrid = false;
    console.log("Draw grid turned off");
  } else if (drawgrid == false)
  {
    drawgrid = true;
    console.log("Draw grid turned on");
  }
  reset(mode);
}
function toggleStop()
{
  if (stop == true)
  {
    stop = false;
    console.log("Stop turned off");
  } else if (stop == false)
  {
    stop = true;
    console.log("Stop turned on");
  }
  reset(mode);
}
function speedSlider()
{
  console.log("Called");
}
function reset(_mode)
{
  console.log("Reset");
  knownValues = [];
  knownValues.push(1);
  n = 3;
  x = 3;

  currentPos = createVector(sizing,0);
  background(155);
  if (drawgrid == true){
    drawGrid();
  }
  if (_mode == modeEnum.Circle)
  {
    origin = createVector(width/2, height/2);
    console.log("CircleMode");
  }
  if (_mode == modeEnum.Horizontal)
  {
    console.log("Horizontal Mode");
    origin = createVector(0, 0);
  }
  mode = _mode;
  loop();
}
// NO LONGER NEEDED //
// function centerCanvas() {
//   let cx = canvas.parent.x;
//   let cy = canvas.parent.y;
//   canvas.position(cx, cy);
// }
// function windowResized()
// {
//   centerCanvas();
// }

function drawGrid()
{
  textSize(16);
  let topLabel = "Produced Numbers";
  text (topLabel, width/2 - (topLabel.length / 2 * 8), 20);
  textSize(8);
  for (let i = 0; i < width; i += 50)
  {
    text (i, i - (i.toString().length / 2 * 4), 10);
    line(i, 0, i, height);
  }
  textSize(16);
  let leftLabel = "Nth Number";
  text (leftLabel, 20, height/2);
  textSize(8);
  for (let j = 0; j < height; j += 50)
  {
    text (j, 10, j);
    line(0, j, width, j);
  }
}





function drawCircle()
{
  mainCalculation();
  if (x == 1)
  {
    n++;
    x = n;
  }
  let thisX = sin (radians(n)) * x;
  let thisY = cos (radians(n)) * x;
  //Center the graph.
  thisX += width/2;
  thisY += height/2;
  point(thisX, thisY);
  if (stop == true && n >= 360){
    noLoop();
  }
}

function drawCircleUniques()
{
  mainCalculation();

  if (jQuery.inArray(x, knownValues) >= 0)
  {
    n++;
    x = n;
  }
  else
  {
    knownValues.push(x);
    let thisX = sin (radians(n)) * x;
    let thisY = cos (radians(n)) * x;
    //Center the graph.
    thisX += width/2;
    thisY += height/2;
    //text(x, thisX, thisY);
    point(thisX, thisY);
    //text(x, thisX, thisY);
  }
  if (stop == true && n >= 360)
  {
    noLoop();
  }

}

function drawHorizontal()
{
  for (let i = 0; i < 10; i++){
      //Check if the branch is finished. If it is increase the starting n.
      if (x == 1)
      {
        n++;
        x = n;
      }
      //Check if n is even.
      if (x % 2 == 0)
      {
        x = x / 2;
      } else if (x % 2 == 1) {
        x = x * 3 + 1;
      }

      let v = createVector(origin.x + x,  origin.y + n );
      point(v.x, v.y);
  }
  if (stop == true && n > height + 1)
  {
    noLoop();
  }
}

function drawHorizontalUniques()
{
  mainCalculation();
  if (jQuery.inArray(x, knownValues) >= 0)
  {
    // console.log("n = " + n);
    // console.log("x = " + x);
    n++;
    x = n;
  }
  else
  {
    knownValues.push(x);
    //text(x, currentPos.x, currentPos.y);
    let v = createVector(origin.x + (x * 1),  origin.y + (n * 1));
    point(v.x, v.y);
    //text(x, v.x, v.y);
    //point(currentPos.x + (x % width), currentPos.y);
    if (currentPos.y + sizing > height)
    {
      currentPos.x += 1;
      currentPos.y = 1;
    } else {
      currentPos = createVector(currentPos.x, currentPos.y + sizing)
    }
  }
  if (stop == true && n > height)
  {
    noLoop();
  }
}
