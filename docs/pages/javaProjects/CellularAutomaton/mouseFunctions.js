// function mousePressed()
// {
//   for (let i = 0; i < cols; i++)
//   {
//     for (let j = 0; j < rows; j++)
//     {
//       grid.cells[i][j].clicked(mouseX, mouseY, choosingStart, true);
//     }
//   }
//   console.log("Click");
// }

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
}

function mouseDragged()
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
  //console.log("dragging");
  return false;
}
