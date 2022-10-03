'use strict';
// caption
// sourceImage,
// imageClickLink.
// name,
// description


class Thumbnail extends React.Component{
  render(){
    return (
      //<div class = "col-md-4">
        <div class="thumbnail">
          <h2 class = "caption display-4">{ props.caption }</h2>
          <a href="./pages/game_design.html">
            <img class = "thumb_images card-img-top"
            src= {props.sourceImage}
            alt= {props.name}
            style="width:100%; ">
          </a>
            <div class="caption">
              <p>{props.description}</p>
            </div>
        </div>
      //</div>
    );
  }
}

const domContainer = document.querySelector('#game_design_thumb');
const root = ReactDOM.createRoot(domContainer);
const element = <Thumbnail caption="Hey" sourceImage="./images/game_design_thumb.png" name="Game Design", description="HELLOOOO" />;
root.render(React.createElement(element));
console.log("HELLLO");
console.log(element);
