// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#main_content');
const root = ReactDOM.createRoot(domContainer);

// The large jumbotron entry at the top of the page.
const jumbotronEntry = <Jumbotron title="Shaders" description="Learning to write shaders and the way you have to change your thinking was one of the most challenging and rewarding things I've done since. I've iFramed them in from p5 with a brief description of what each is doing." />;

// The HTML that will be placed(full width) below the jumbotron to show the "Tools of the Trade" section.
const toolsOfTheTradeSection = <>
    <p><b>P5 Editor</b> support GLSL2.0 which is enough for my personal needs, easy to access, easy to display.</p>
    <p><b>Shader Toy</b> is great for anything shader related and I often use it as reference if nothing else.</p>
    <p><b>Unity / Godot</b> are Game Engines which for the case of viewport shaders I tend to use because it's less complicated than setting up a rig in P5.</p>
    <p><b>Unreal Material Editor</b> I became very familiar with while working at Sprung. It's simple design and node features make it a great choice for heavy rendering effects and quick iteration.</p>
</>

const fullSpanEntry = <FullSpanExplanation title="Tools of the Trade" entries={toolsOfTheTradeSection} />;


const sketchThumbnailObjects = [
    {
        title: "Hello World",
        src: "https://editor.p5js.org/Pseu/embed/4IgeXJ1UN",
        description: "Paths are constructed from text and color is added by 'bots' of different colors following these paths. The colors are then diffused to create a blur effect and that blur strength can be controlled with the slider",
        buttons: [
            {
                title: "View Fullscreen",
                link: "https://editor.p5js.org/Pseu/full/4IgeXJ1UN"
            },
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/sketches/4IgeXJ1UN"
            }
        ]
    },
    {
        title: "Julia Set",
        src: "https://editor.p5js.org/Pseu/embed/vwxak2h5X",
        description: "Similar to the Mandelbrot set, time in this case is steadily increasing or decreasing the complex component, sliders change from left-to-right: Overall Scale, Time Scale (-/0/+), X Position, Y Position",
        buttons: [
            {
                title: "View Fullscreen",
                link: "https://editor.p5js.org/Pseu/full/vwxak2h5X"
            },
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/sketches/vwxak2h5X"
            }
        ]
    },
    {
        title: "Lavalamp (Metaballs)",
        src: "https://editor.p5js.org/Pseu/embed/y_MxcxoRi",
        description: "Metaballs are cool, and look like lava lamps. Using some physics upon the points I created this 'Lava Lamp'.",
        buttons: [
            {
                title: "View Fullscreen",
                link: "https://editor.p5js.org/Pseu/full/y_MxcxoRi"
            },
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/sketches/y_MxcxoRi"
            }
        ]
    },
    {
        title: "Voronoi",
        src: "https://editor.p5js.org/Pseu/embed/8zjATzXYI",
        description: "Voronoi are used for all sorts of things but I stumbled upon the fact that if you draw each pixels closest points color, you get a cheap and easy diagram. It is important to note though that this in itself is not producing any 'Voronoi points' and as such you cannot tesselate this for paths, however it works as a very cool demonstration and may have uses in things such as overlays for city builder games.",
        buttons: [
            {
                title: "View Fullscreen",
                link: "https://editor.p5js.org/Pseu/full/8zjATzXYI"
            },
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/sketches/8zjATzXYI"
            }
        ]
    },
    {
        title: "Conways Game of Life Shader",
        src: "https://editor.p5js.org/Pseu/embed/nEpG9LDoX",
        description: "Game of life shader, click to add more random noise and watch it go.",
        buttons: [
            {
                title: "View Fullscreen",
                link: "https://editor.p5js.org/Pseu/full/nEpG9LDoX"
            },
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/sketches/nEpG9LDoX"
            }
        ]
    },
    {
        title: "Falling Sand",
        src: "https://editor.p5js.org/Pseu/embed/_o6nB4I1w",
        description: "Click to add sand. Uses a simple cellular automata rule to dictate falling and sideways movement creating a 'realistic' sand falling. At it's core this is what Noita uses to 'simulate every pixel on the screen', using different rulesets for different pixels; and I think that is amazing.",
        buttons: [
            {
                title: "View Fullscreen",
                link: "https://editor.p5js.org/Pseu/full/_o6nB4I1w"
            },
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/sketches/_o6nB4I1w"
            }
        ]
    }
]

let sketchThumbs= ConstructSketchThumbnailEntries(sketchThumbnailObjects, 3);
let content =   <>
                    { fullSpanEntry }
                    { sketchThumbs }
                </>
root.render(GenericPage(".", 0, jumbotronEntry, content))