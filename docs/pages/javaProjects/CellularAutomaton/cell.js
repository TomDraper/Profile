class Cell
{
  constructor(x, y, w, h, c)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = states.dead;
    this.counter = c;
    this.speed = 5;
    this.changed = false;
    this.clicked = function (mx, my, cs, drag) {
      if (drag == true && this.changed == false){
        if (cs == true){
          var d = dist (mx, my, this.x + this.w/2, this.y + this.h/2);
          if (d <= this.w/2 && d <= this.h/2){
            if (this.state == states.dead){
              this.state = states.alive;
            } else if (this.state == states.alive){
              this.state = states.dead;
            } else {

            }
            this.changed = true;
          }
        }
      }
    }
  }

  show()
  {
    colorMode(HSB);
    let hSpeed = this.counter % 100;
    let sSpeed = this.counter % 256;
    if (this.state == states.alive){
      push();

      fill(255 - hSpeed, 255 - sSpeed, 255);
      //fill(0, 0, 0);
      rect(this.x, this.y, this.w, this.h);
      pop();
      //console.log("state is equal to false");
    }
    else if (this.state == states.dead)
    {
      push();
      fill(0, 0, 255);
      rect(this.x, this.y, this.w, this.h);
      pop();
      //console.log("state is equal to true");
    } else if (this.state == states.wall)
    {
      fill(0, 0, 0);
    } else {
      console.log("Something went wrong. State was not set!");
    }
    this.counter += this.speed;
  }
}
