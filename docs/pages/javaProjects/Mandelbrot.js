// Needs a slider to set what zoom level you want. ???
// Needs a slider to select the realBounds
// Needs a slider to select the imaginaryBounds
// Some way of selecting a color pallette. Lategame.

var z = 0;
var scl = 1;
var currentN = 0;
var currentX = 0;
var currentY = 0;
var xyBounds = {
  get bounds() {
    newArr = [xValue.value, yValue.value];
    return newArr;
  }
}
var rBounds = {
  get bounds () {
    newArr = [realNumberX.value, realNumberY.value];
    return newArr;
  }
}
var iBounds = {
  get bounds () {
    newArr = [imaginaryNumberX.value, imaginaryNumberY.value];
    return newArr;
  }
}


var realNumberX;
var rnXText;
var realNumberY;
var rnYText;
var imaginaryNumberX;
var inXText;
var imaginaryNumberY;
var inYText;

var width;
var height;

var stop = false;
var stopDisplay;
var xValue;
var yValue;

function RecalculateBounds()
{
  var b = xyBounds.bounds;
}

function setup()
{
  //var canvasDiv = document.getElementById('sketchHolder');
  //The variable above is for making fancy height and width things happen
  //later which to be honest I just can't be bothered with right now.
  //Create a canvas.
  width = 512;
  height = 512;
  var sketchCanvas = createCanvas(width,height);
  sketchCanvas.parent('sketchHolder');
  stopDisplay = document.getElementById('stopDisplay');
  stopDisplay.innerHTML = stop;
  //createCanvas(width, height);
  //Set the p5 angle mode to degrees instead of radians.
  angleMode(DEGREES);
  //Color mode to HSB just for ease.
  colorMode(RGB);
  //Background set to black.
  background (0);
  //Set the Reference to the XYValues
  xValue = document.getElementById('xValue');
  yValue = document.getElementById('yValue');
  xValue.oninput = function () { reset(); }
  yValue.oninput = function () { reset();}
  //Set the reference to the sliders.
  realNumberX = document.getElementById('realBoundsX');
  rnXText = document.getElementById('realBoundsX_Text');
  realNumberY = document.getElementById('realBoundsY');
  rnYText = document.getElementById('realBoundsY_Text');
  imaginaryNumberX = document.getElementById('imaginaryBoundsX');
  inXText = document.getElementById('imaginaryBoundsX_Text');
  imaginaryNumberY = document.getElementById('imaginaryBoundsY');
  inYText = document.getElementById('imaginaryBoundsY_Text');
  zoomSlider = document.getElementById('ZoomSlider');
  zoomText = document.getElementById('ZoomSlider_Text');
  // Every time they change call reset.
  realNumberX.oninput = function () { rnXText.innerHTML = realNumberX.value; reset(); }
  realNumberY.oninput = function () { rnYText.innerHTML = realNumberY.value; reset(); }
  imaginaryNumberX.oninput = function () { inXText.innerHTML = imaginaryNumberX.value; reset(); }
  imaginaryNumberY.oninput = function () { inYText.innerHTML = imaginaryNumberY.value; reset(); }
  zoomSlider.oninput = function () { zoomText.innerHTML = zoomSlider.value; reset(); }
  //rBounds.bounds([realNumberX.value, realNumberY.value]);
  //console.log(rBounds.bounds);
  drawGraph();

}

function reset()
{
  currentX = 0;
  currentY = 0;
  stopTest(false);
}

function stopTest(i)
{
  console.log("Stop was called and bool was: " + i);
  if (i == true)
  {
    stop = true;
  } else
  {
    stop = false;
  }
  if (stop == false)
  {
    stopDisplay.innerHTML = "Searching!";
  }
  else if (stop == true)
  {
    stopDisplay.innerHTML = "Stopped!"
  }
}

function drawGraph()
{
  //FourPoints of the graph we define.
  center = [width/2, height/2];
  iUpperPoint = width/2;
  rLowerPoint = height/2;
  //PlottingPoints.
  //ellipse(iUpperPoint, rLowerPoint, 5, 5);
  stroke(0);
  fill(255);
  // line(width/2, 0, width/2, height);
  // line(0, height/2, width, height/2);
  // ellipse(width/2, 0, 3); // iUpperPoint;
  var x_ = 0;
  var increments = 10;

  var currentIncrement = 0;
  var rBounds_ = rBounds.bounds;
  var previousValue = float(rBounds_[0]);
  //console.log(previousValue);
  var difference = rBounds_[0] - rBounds_[1];
  difference = abs(difference);
  difference = float(difference/increments);
  //console.log(difference);
  while(x_ < width)
  {
    // Draw a circle at the point we are at.
    // Always at height/2
    ellipse(x_, height/2, 3);

    text(previousValue.toFixed(3), x_, height/2 - 10);
    previousValue = float(previousValue)
    previousValue += float(difference);
    x_ += width/increments;
  }
  var iBounds_ = iBounds.bounds;
  previousValue = float(iBounds_[0]);
  difference = iBounds_[0] - iBounds_[1];
  difference = abs(difference);
  difference = float(difference/increments);
  var y_ = 0;
  while(y_ < height)
  {
    // Draw a circle at the point we are at.
    // Always at height/2
    ellipse(width/2, y_, 3);
    text(previousValue.toFixed(3), width/2, y_ - 10);
    previousValue = float(previousValue);
    previousValue += float(difference);
    y_ += height/increments;
  }
  // var y_ = 0;
  // currentIncrement = 0;
  // var iBounds_ = iBounds.bounds;
  //
  // while(y_ < height)
  // {
  //   ellipse(width/2, y_, 3);
  //   var str = iBounds_[1] / (height / currentIncrement);
  //   text(str, width/2 - 20, y_);
  //   y_ += height/increments;
  //   currentIncrement++;
  // }

}

function draw()
{
  //drawGraph();
  if (stop) { return; }
  var i = 0;
  while(i < width)
  {
    ellipse(currentX, currentY, 5, 5);
    Test(currentX, currentY);
    currentX++;
    if (currentX == width)
    {
      currentY += 1;
      if (currentY == height)
      {
        stopTest(true);
      }
      currentX = 0;
    }
    i++;
  }
}

function Test(Px, Py)

{
  var realBoundaries = rBounds.bounds;
  var imaginaryBoundaries = iBounds.bounds;
  var offset = xyBounds.bounds;
  //console.log(b[0] + " / " + b[1]);
  var scaledX = map(Px, 0.0, width, float(realBoundaries[0]), float(realBoundaries[1]));
  var scaledY = map(Py, 0.0, height, float(imaginaryBoundaries[0]), float(imaginaryBoundaries[1]));
  // scaledX += offset[0];
  // scaledY += offset[1];
  scaledX /= zoomSlider.value;
  scaledY /= zoomSlider.value;
  // var x = offset[0];
  // var y = offset[1];
  var x = 0.0;
  var y = 0.0;
  while(x*x + y * y < 4 && currentN < 256)
  {
    xtemp = x * x - y * y + scaledX;
    y = 2 * x * y + scaledY;
    x = xtemp;
    currentN++;
  }
  if (currentN > 256) {
    col = 255;
  } else {
    col = currentN;
  }
  stroke(col, col, col);
  point(Px, Py);
  currentN = 0;
}
