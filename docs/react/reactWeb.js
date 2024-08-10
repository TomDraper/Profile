// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#main_content');
const root = ReactDOM.createRoot(domContainer);

// Jumbotro that appears at the top of the screen.

const jumboEntry1 = <>
      I began coding with Javascript mainly inspired by <a href="https://www.youtube.com/user/shiffman">The Coding Train</a> YouTube channel. Here are some that I've cleaned up. If you wish to view the entire sketchbook it should be available on any "View Code" link.
      </>
const jumbotronEntry1 = <Jumbotron title="Web Development" description={jumboEntry1}/>;

const toolsOfTheTradeEntry = <>
    <i>Web Specific Languages: HTML/CSS/JS, Typescript, React, Bootstrap</i>
    
    <p><b>P5 Editor</b> is a quick to access browser based text editor with some common and easy-to-use libraries for vectors and shape drawing already included, namely the p5 library. </p>
        
    <p><b>React</b> powers this website (Mostly). </p>

    <p><b>IDEs</b> used a few. Latest has been Phoenix, also use brackets, VS Code, VS Editor and Atom.</p>
    
    <p><b>Glitch</b> for Node and server stuff.</p>
</>

const toolsEntry = <FullSpanExplanation title="Tools of the Trade" entries={toolsOfTheTradeEntry} />;

const sketchThumbnailObjects = [
    {
        title: "Genetic Salesman",
        src: "https://editor.p5js.org/Pseu/embed/zLhK_ZdzF",
        description: "The travelling saleman problem 'solved' by using genetic algorithms and several hundred populations to achieve a shortest route.",
        buttons: [
            {
                title: "View Fullscreen",
                link: "https://editor.p5js.org/Pseu/full/zLhK_ZdzF"
            },
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/sketches/zLhK_ZdzF"
            }
        ]
    },
    {
        title: "Pendulums",
        src: "https://editor.p5js.org/Pseu/embed/WMVMtVolG",
        description: "A classic example of minor changes in initial conditions creating dramatic differences in outcomes. Set the start angle to 180. The difference is then the amount of degrees the pendulums can possibly spawn between (default is 1, so values between 179 and 181). Pendulums with more than 3 nodes (centre counts as a node) will have wildly different results. Damping and gravity are arbitrary.",
        buttons: [
            {
                title: "View Fullscreen",
                link: "https://editor.p5js.org/Pseu/full/WMVMtVolG"
            },
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/sketches/WMVMtVolG"
            }
        ]
    },
    {
        title: "Boids",
        src: "https://editor.p5js.org/Pseu/embed/ANsGTjtZA",
        description: "Boids (first made by Craig Reynolds in 1987) are agents with rules that emulate realistic 'flocking' behaviour seen in the real world with animals such as birds or fish. I have included some parameters to create different results and display information. I'd stay away from the debug button on mobiles.",
        buttons: [
            {
                title: "View Fullscreen",
                link: "https://editor.p5js.org/Pseu/full/ANsGTjtZA"
            },
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/sketches/ANsGTjtZA"
            }
        ]
    }
]

const jumbotronEntry2 = <Jumbotron title="The Rest" description="These sketches are older and often not as clean as the ones embedded above. Generally just clicking view sketch will be enough to understand what is happening, but the code is available for viewing as well." />;

const thumbnailObjects = [
    {
        key: "Game of Life", 
        title: "Game of Life", 
        alt: "Conway's Game of Life Thumbnail", 
        src: "../images/p5_screens/conway.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/G2Cotprc-",
        description: "This is a quick and dirty version of Conways Game of Life. For a shader powered version please see the Shader page. Random seed, refresh to change it.",
        buttons: [
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/present/G2Cotprc-"
            },
            {
                title: "View Code",
                link: "https://editor.p5js.org/Pseu/sketches/G2Cotprc-"
            }
        ]
    },
    {
        key: "Circle Walkers", 
        title: "Circle Walkers", 
        alt: "Circle Walkers Thumbnail", 
        src: "../images/p5_screens/circle_walkers.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/YRPTXRMq7",
        description: "Genetic algorithm that produces a sequence of rotations of two arms to move a central body closer to a point.",
        buttons: [
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/present/YRPTXRMq7"
            },
            {
                title: "View Code",
                link: "https://editor.p5js.org/Pseu/sketches/YRPTXRMq7"
            }
        ]
    },
    {
        key: "Genetic Ships", 
        title: "Genetic Ships", 
        alt: "Genetic Ships Thumbnail", 
        src: "../images/p5_screens/genetic_ships.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/XafkNBu3c",
        description: "Genetic algorithm that directs ships (polygons with a 'thruster' at each vertex) towards a spot over generations.",
        buttons: [
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/present/XafkNBu3c"
            },
            {
                title: "View Code",
                link: "https://editor.p5js.org/Pseu/sketches/XafkNBu3c"
            }
        ]
    },
    {
        key: "2D/3D Gravity Bodies", 
        title: "2D/3D Gravity Bodies", 
        alt: "2D/3D Gravity Bodies Thumbnail", 
        src: "../images/p5_screens/gravity_2d_and_3d.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/7ueOH3iHO",
        description: "Particles using gravity to create orbits around a central point. Can also be toggled to make everything have gravity for amazingly chaotic results (Three-Body Problem).",
        buttons: [
            {
                title: "View 2D Sketch",
                link: "https://editor.p5js.org/Pseu/present/7ueOH3iHO"
            },
            {
                title: "View 2D Code",
                link: "https://editor.p5js.org/Pseu/sketches/7ueOH3iHO"
            },
            {
                title: "View 3D Sketch",
                link: "https://editor.p5js.org/Pseu/present/xI9pwgYWd"
            },
            {
                title: "View 3D Code",
                link: "https://editor.p5js.org/Pseu/sketches/xI9pwgYWd"
            }
            
        ]
    },
    {
        key: "Flow Field", 
        title: "Flow Field", 
        alt: "Flow Field Thumbnail", 
        src: "../images/p5_screens/flow_field.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/QaILU0I5x",
        description: "This is a flow field created using perlin noise for adjustable parameters. I suggest turning gravity up and hitting apply a bunch to see. Mouseclicks also add particles.",
        buttons: [
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/present/QaILU0I5x"
            },
            {
                title: "View Code",
                link: "https://editor.p5js.org/Pseu/sketches/QaILU0I5x"
            }
        ]
    },
    {
        key: "Trippy Cells", 
        title: "Trippy Cells", 
        alt: "Trippy Cells Thumbnail", 
        src: "../images/p5_screens/trippy_cells.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/R7CydhEOL",
        description: <>Using several overlayed noise maps with adjustable parameters to view various effects and changes. A version with no controls but animated over time to create a 'trippy' look can be found <a href = "https://editor.p5js.org/Pseu/present/sD00iQPVD">here</a>.</> ,
        buttons: [
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/present/R7CydhEOL"
            },
            {
                title: "View Code",
                link: "https://editor.p5js.org/Pseu/sketches/R7CydhEOL"
            }
        ]
    },
    {
        key: "Hexagonal March", 
        title: "Hexagonal March", 
        alt: "Hexagonal March Thumbnail", 
        src: "../images/p5_screens/hexagonal_march.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/FAhp9k7oG",
        description: "I found out about marching cubes and marching squares and thought this the next step. It does not work as well as one might imagine.",
        buttons: [
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/present/FAhp9k7oG"
            },
            {
                title: "View Code",
                link: "https://editor.p5js.org/Pseu/sketches/FAhp9k7oG"
            }
        ]
    },
    {
        key: "Lootboxes", 
        title: "Lootboxes", 
        alt: "Lootboxes Thumbnail", 
        src: "../images/p5_screens/lootbox.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/r7HNCKOFm",
        description: "Here I was thinking of making an auto clicker/endless game using lootboxes as the central theme. This was initial testing and to a certain degree finding out how to use JSON.",
        buttons: [
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/present/r7HNCKOFm"
            },
            {
                title: "View Code",
                link: "https://editor.p5js.org/Pseu/sketches/r7HNCKOFm"
            }
        ]
    },
    {
        key: "Solar System", 
        title: "Solar System", 
        alt: "Solar System Thumbnail", 
        src: "../images/p5_screens/solar_system.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/jqB8Fobu-",
        description: "A somewhat accurate representation of the solar system, planets move at the same rate as reality.",
        buttons: [
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/present/jqB8Fobu-"
            },
            {
                title: "View Code",
                link: "https://editor.p5js.org/Pseu/sketches/jqB8Fobu-"
            }
        ]
    },
    {
        key: "Space Game", 
        title: "Space Game", 
        alt: "Space Game Thumbnail", 
        src: "../images/p5_screens/space_game_js.jpg", 
        link:"https://editor.p5js.org/Pseu/sketches/njcKwwo3q",
        description: "Simple game. You play a small dot in the screen and you must try and not touch the edges as each 'planet' comes towards you. Bigger planets have larger gravity.",
        buttons: [
            {
                title: "View Sketch",
                link: "https://editor.p5js.org/Pseu/present/njcKwwo3q"
            },
            {
                title: "View Code",
                link: "https://editor.p5js.org/Pseu/sketches/njcKwwo3q"
            }
        ]
    }
    
];
let sketchThumbnailEntries = ConstructSketchThumbnailEntries(sketchThumbnailObjects, 3);
let thumbnailEntries = ConstructThumbnailEntries(thumbnailObjects, 3);

let content =   <>
                    { toolsEntry }
                    {sketchThumbnailEntries}
                    {jumbotronEntry2}
                    <ThumbBlock thumbnails={ thumbnailEntries } />
                </>
root.render(GenericPage(".", 1, jumbotronEntry1, content))