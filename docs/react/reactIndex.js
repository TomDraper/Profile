// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#main_content');
const root = ReactDOM.createRoot(domContainer);

// Jumbotron that appears at the top of the screen.
const jumbotronEntry = <Jumbotron title="Toms Portfolio" description="A place to put some stuff I made so that you will give me money to make stuff for you" />;

const thumbnailObjects = [
    {
        key: "GamesThumb", 
        title: "Games", 
        alt: "Games", 
        src: "./images/game_design_thumb.png", 
        link:"./pages/game_design.html",
        description: "I took Games Animation in College but from there moved to Game Development at Uni. While both I found interesting, design has always appealed more to me in general. With learning C# and Unity in university the ability to code has given me freedom to explore game concepts and ideas without being bound to just the editor tools and in the years that have followed I have only expanded my learning as evidenced by this website."
    },
    {
        key: "WebThumb", 
        title: "Web", 
        alt: "Web", 
        src: "./images/genetic_salesman_thumb.jpg", 
        link: "./pages/web.html",
        description: "I use p5 often as a quick prototyping tool or just to explore interesting equations or concepts. I've collated some of the more interesting projects for your enjoyment here with source code available. As evidenced by this website I've written a bunch of HTML as well and used various frameworks such as React.js (Which this site is powered with!)"
    },
    {
        key: "VideoThumb", 
        title: "Video Editing", 
        alt: "Video Editing", 
        src: "./images/videos_thumb.png", 
        link: "./pages/video_editing.html",
        description: "Various videos I've edited for friends and as a job for a year. I love video editing and sequencing, feels much like animating to me. However in truth it is more a skill I've aquired than a particular interest."
    },
    {
        key: "ShaderThumb", 
        title: "Shaders", 
        alt: "Shaders", 
        src: "./images/shader_thumb.png", 
        link: "./pages/shaders.html",
        description: "Writing shader code is some of the most fun, rewarding and frustrating programming I have found. The results are almost always dramatic or interesting (Or nothing at all), but the approach you have to take to solving problems is so abstract, a lot of the enjoyment I find is just thinking in those new ways."
    },
    {
        key: "AboutThumb", 
        title: "About", 
        alt: "About", 
        src: "./images/hello_world_thumb.png", 
        link: ".",
        description: "Besides computers I love drawing and art; I play guitar and recently picked up a ukelele to play duets with my long-term partner. We regularly host (except during lockdown) board games or quiz nights. My favourite computer games would be the Dark Souls series, as well as a rotating list of competitive MOBAs, FPS and Battle Royales. More traditionally I enjoy Texas Hold 'Em, Dungeons and Dragons, quiz and trivia games but am open to most board games."
    },
];

let finalEntries = ConstructThumbnailEntries(thumbnailObjects, 3);

let content = <ThumbBlock thumbnails={finalEntries} />
    
root.render(GenericPage("", "", jumbotronEntry, content))