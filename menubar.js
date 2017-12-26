function menuClick(){
document.getElementById("menudropdown").classList.toggle("menushow");
}
window.onclick = function(event) {
  if (!event.target.matches('.menubutton')) {

    var dropdowns = document.getElementsByClassName("menucontent");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('menushow')) {
        openDropdown.classList.remove('menushow');
      }
    }
  }
}
