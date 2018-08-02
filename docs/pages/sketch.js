var n = 0; // N
var c = 3; // Scaling Factor.
var prev; // Previous vector.

function setup()
{
  //Create a canvas.
  createCanvas(512, 512);
  //Set the p5 angle mode to degrees instead of radians.
  angleMode(DEGREES);
  //Color mode to HSB just for ease.
  colorMode(HSB);
  //Background set to black.
  background (0);
}

function draw()
{
  // For loop is just to speed up.
  // Modify i < x to increase/decrease speed.
  for (var i = 0; i < 10; i++){
    //Work out the angle and the distance.
    var a = n * 137.5;
    var r = c * sqrt(n);
    //Plot that angle and distance to x, y coords.
    //And then center the result.
    var x = r * cos(a) + width/2;
    var y = r * sin(a) + height/2;
    //Check to see if any of the lines have reached
    //the edge of the canvas.
    if (x > width || x < 0 || y > height || y < 0)
    {
      noLoop();
      console.log("Finished");
    }

    //2 Ways of rendering, either filled circles
    //or producing lines with the previous x and y values.
    //Color is defined by the modulus of n.

    //fill(n % 256, 255, 255);
    stroke(n % 256, 255, 255);
    //noStroke();
    strokeWeight(1);
    if (prev != null){
      line(prev.x, prev.y, x, y);
      //ellipse(x, y, 4, 4);
    }
    //Log the current x and y coords and then increase n.
    prev = createVector(x,y);
    n++;
  }
}
