// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#main_content');
const root = ReactDOM.createRoot(domContainer);

// The large jumbotron entry at the top of the page.
const jumbotronEntry = <Jumbotron title="Game Development" description="Games are really the heart of what I want to do. It's where my passion lies and I love the intricacies of developing systems for players as well as the challenges faced in designing new game elements. I have created small games for myself for years and while working at Sprung (A games UX/UI company) on a AAA title." />;

// The HTML that will be placed(full width) below the jumbotron to show the "Tools of the Trade" section.
const toolsOfTheTradeSection = <>
    <i>Games Specific Languages: GodotScript(Python), Unreal C++/Blueprints, Unity C#, HTML/Javascript/P5 Libraries, (some) Typescript</i><p/>
    
    <p><b>Godot</b> is an open-source games engine, mainly aimed at 2D sprite based games but does include capabilities for 3D. I've recently switched to this being my engine of choice for personal projects due to its "tool" keyword, a workflow more suited to individuals, and I wanted to delve deeper into Python. </p>

    <p><b>Unity</b> and <b>Unreal Engine</b> were taught to me at University, although we were never taught the coding side in particular. I taught myself C# and later the stranger ECS system that was introduced. I was lucky enough to work at Sprung and spent 10 months working on a AAA game inside of Unreal where I had to learn C++ very quickly.</p>
    
    <p>I use <b>Blendr</b> for when I need 3D models, <b>Krita</b> for digital painting and manipulation, <b>Graphics Gale</b> for 2D sprite creation / animation, and <b>Inkscape</b> for vector drawing. These are all free or open source versions of popular software I have used in the past; Photoshop, Illustrator, 3DS Max, Maya etc.</p>
</>

const fullSpanEntry = <FullSpanExplanation title="Tools of the Trade" entries={toolsOfTheTradeSection} />;

// Each thumbnail that is on the page and their information.
const thumbnailObjects = [
    {
        title: "Luminous VR", 
        alt: "Luminous", 
        src: "../images/LuminousLogo.png", 
        link:"./luminous.html",
        description: "Working within the XR sector to deliver excellent training tools as well as interactable environments within VR/MR/AR environments. This is an end-to-end solution where I touched on most places at various times."
    },
    {
        title: "Sprung Studios", 
        alt: "Sprung", 
        src: "../images/SprungStudiosLogo.png", 
        link:"./sprung.html",
        description: "Working on delivering professional, pixel-perfect UIs that are performant and reactive."
    },
    {
        title: "Godot - Space Game", 
        alt: "Godot", 
        src: "../images/space_game_screens/space_game_pc_gif.gif", 
        link:"./space_game_breakdown.html",
        description: "Created mainly as a way to see how I could utilize control nodes to give instant visual feedback to a developer without them having to dig through an objects resources."
    },
    {
        title: "Unity - ECS Terrain", 
        alt: "Unity - ECS Terrain", 
        src: "../images/unity_terrain_screens/Standard.png", 
        link: "./UnityTerrain.html",
        description: "A project to teach myself the ECS architecture, includes a terrain generated using perlin noise with controls to allow easy manipulation. All data is loaded into ECS including collision, simple pathfinding, and pawns."
    },
    {
        title: "Unity - Fifty Fifty", 
        alt: "Unity - Fifty Fifty", 
        src: "../images/5050_screens/50_50Builders_Example.png", 
        link: "./50_50_Breakdown.html",
        description: "I had an interesting concept for how a text adventure could be created to create multiple and dynamic storylines procedurally. The main bulk of which would be with creating large amounts of characters, places, and events for the player and then depending on what choices the player made having those characters/worlds seemingly 'know' of the players choice by limiting the selection pool of possible events."
    }
];

let thumbnailEntries = ConstructThumbnailEntries(thumbnailObjects, 3);

let content =   <>
                    { fullSpanEntry }
                    <ThumbBlock thumbnails={ thumbnailEntries } />
                </>
root.render(GenericPage(".", 0, jumbotronEntry, content))