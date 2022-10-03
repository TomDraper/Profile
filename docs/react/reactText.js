function Thumbnail(props){
    return (
        <div className = "col-md-4">
            <div className="thumbnail">
                <h2 className = "caption display-4">
                    { props.caption }
                </h2>
                <a href={ props.link }>
                    <img className = "thumb_images card-img-top"
                     src= {props.src}
                     alt= {props.name}
                     style= {{ width: "100%", height: "100%" }}
                    />
                </a>
                <div className="caption">
                   <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}

function ThumbRow(props){
    return (
        <div className = "row thumb_row">
            { props.entries }
        </div>
    )
}

function ThumbnailTable(props){
    return ( <div>{ props.entries }</div> )
}
// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#main_content');
const root = ReactDOM.createRoot(domContainer);

const staticThumbnailEntries = [
    <Thumbnail key="GamesThumb" caption="Games" name="Games" src="./images/game_design_thumb.png" link="./pages/game_design.html"
        description="I took Games Animation in College but from there moved to Game Development at Uni. While both I found interesting, design has always appealed more to me in general. With learning C# and Unity in university the ability to code has given me freedom to explore game concepts and ideas without being bound to just the editor tools and in the years that have followed I have only expanded my learning as evidenced by this website."
    />,
    <Thumbnail key="WebThumb" caption="Web" name="Web"  src="./images/genetic_salesman_thumb.jpg" link="./pages/web.html"
        description="I use p5 often as a quick prototyping tool or just to explore interesting equations or concepts. I've collated some of the more interesting projects for your enjoyment here with source code available."
    />,
    <Thumbnail key="VideoThumb" caption="Video Editing" name="Video Editing" src="./images/videos_thumb.png" link="./pages/video_editing.html"
        description="Various videos I've edited for friends and as a job for a year. I love video editing and sequencing, feels much like animating to me. However in truth it is more a skill I've aquired than a particular interest."
    />,
    <Thumbnail key = "ShaderThumb" caption="Shaders" name="Shaders" src="./images/shader_thumb.png" link="./pages/shaders.html"
        description="Writing shader code is some of the most fun, rewarding and frustrating programming I have found. The results are almost always dramatic or interesting (Or nothing at all), but the approach you have to take to solving problems is so abstract, a lot of the enjoyment I find is just thinking in those new ways."
    />,
    <Thumbnail key="AboutThumb" caption="About" name="About"  src="./images/hello_world_thumb.png" link="."
        description="Besides computers I love drawing and art; I play guitar and recently picked up a ukelele to play duets with my long-term partner. We regularly host (except during lockdown) board games or quiz nights. My favourite computer games would be the Dark Souls series, as well as a rotating list of competitive MOBAs, FPS and Battle Royales. More traditionally I enjoy Texas Hold 'Em, Dungeons and Dragons, quiz and trivia games but am open to most board games."
    />
];
        
let finalEntries = [];
let last3Entries = [];
for(let i = 1; i <= staticThumbnailEntries.length; i++){
    last3Entries.push(staticThumbnailEntries[i-1]);
    console.log(i-1);
    if (i % 3 == 0 || i == staticThumbnailEntries.length){
        let _key = "ThumbRow" + i;
        const elem = <ThumbRow key={_key} entries={last3Entries.slice()} />;
        //finalEntries.push(elem);
        finalEntries.push(elem);
        last3Entries = [];
    }
}
console.log(finalEntries);

//const testMe = <ThumbnailTable entries={finalEntries}/>;
const testMe = <div>{ finalEntries }</div>
root.render(testMe);