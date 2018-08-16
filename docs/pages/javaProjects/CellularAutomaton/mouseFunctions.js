function mousePressed()
{
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
  {
    return;
  }
  for (let i = 0; i < cols; i++)
  {
    for (let j = 0; j < rows; j++)
    {
      grid.cells[i][j].clicked(mouseX, mouseY, choosingStart, true);
    }
  }
  console.log("Click");
}

function mouseReleased()
{
  for (let i = 0; i < cols; i++)
  {
    for (let j = 0; j < rows; j++)
    {
      grid.cells[i][j].dragging = false;
      grid.cells[i][j].changed = false;
    }
  }
  // window.clearInterval(speedChanged);
  // speedChanged = window.setInterval(function(){main();}, speedSlider.value * 10)
}

function mouseDragged()
{
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
  {
    return;
  }
  // window.clearInterval(speedChanged);
  // speedChanged = window.setInterval(function(){main();}, 1)
  for (let i = 0; i < cols; i++)
  {
    for (let j = 0; j < rows; j++)
    {
      grid.cells[i][j].clicked(mouseX, mouseY, choosingStart, true);
    }
  }
  //console.log("dragging");
  return false;
}
