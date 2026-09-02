import { useFadeInView } from '../hooks/fadeInView.ts'
import NavBar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import { PageIntroProps, PageIntro } from '../components/pageIntro.tsx';
import { Carousel, CarouselItemProp } from '../components/carousel.tsx';
import { BasicParagraphSection } from '../components/textHelpers.tsx';
import { useState, useEffect } from 'react'
import { TagFilter, Taggable } from '../components/tagFilter.tsx';

import '../css/projects.css';

import defaultImage from '../images/lights.jpg';

type ProjectsPageProp = {
    title: string,
    introParagraphs: string[],
    anchorName: string,
    carouselProps: CarouselItemProp[]
}

const pageIntroProps : PageIntroProps = 
{
    title:"Projects",
    paragraphs: [
            "A selection of the projects I have worked on in my professional life as well as my personal time.",
            "Clicking on any of the projects will give you a more detailed overview.",
            "Each section is either a company or platform and each project is tagged so you can quickly filter by what you are interested in."
    ]
}

const pageSectionsProps = [
    {
        title: "Luminous XR",
        introParagraphs: [
            "Company based around creating VR/XR training modules for industry. Main job was editor tooling and maintaining tools already used for development, but I did also create modules and lead several projects; particularly ones that were more custom and not based around things we had previously done. A key thing I also made was a desktop controller so that any VR project we made could also be played on PC - Adding a marketable feature and reducing the testing time for developers dramatically."
        ],
        anchorName: "luminousAnchor",
        carouselProps: [
            {
                image: defaultImage,
                title: "Automated Localization",
                paragraphs: [
                    "Created tooling to automatically translate any projects we made using Google Translate API. It would then also create voiced lines using Google Text-To-Speech API and put the output text or audio where it needed to be to work in game.",
                    "Supported SSML and had a number of custom 'tags' that developers could use to change how words were pronounced, silence sections, say things not directly in the text etc."
                ],
                tags: new Set([
                    "Luminous",
                    "Unity Editor",
                    "Localization",
                    "Google API",
                    "TTS",
                    "Automated"
                ])
            },
            {
                image: defaultImage,
                title: "Flow System",
                paragraphs: [
                    "Worked on the Luminous 'Flow' system which was a (mostly) internal tool we used to quickly develop VR and XR scenarios using a graph system similar to that of Blueprints in Unreal Engine.",
                    "I maintained, updated and created a number of additional nodes that people could use as well as did an optimization pass to add and improve support for copy/paste, undo/redo, grouping and multiple pathing."
                ],
                tags: new Set([
                    "Luminous",
                    "Graph System",
                    "Editor Tooling",
                    "Speed Development"
                ])
            },
            {
                image: defaultImage,
                title: "Web GL 3D Quiz",
                paragraphs: [
                    "Created a custom WebGL \"Quiz\" game which used a number of custom tools and features. 14 full 3D environments, supported 10 question types, had a 3D character to walk around the environments and find question points, a driving level to traverse between environments and two minigames that players could participate in for additional points.",
                    "At its core was an editor - Accessed via a web portal - where an admin could add/update/remove questions. This would then be reflected into the Web Game where users would go through and attempt to get as many questions correct as they could.",
                    "A number of different question templates were created including fill-in-the-blank, identify places on an image and rearrange images into the correct order.",
                    "The main challenge of the game was handling, updating and maintaining the different types of questions that we needed as well as keeping the game performant/low disk space as it needed to be accessed online by people potentially running low-end hardware."
                ],
                tags: new Set([
                    "Luminous",
                    "Adnoc",
                    "WebGL",
                    "Data Structures" 
                ])
            },
            {
                image: defaultImage,
                title: "XR Training",
                paragraphs: [
                    "Throughout working with Luminous I was tasked with creating training modules which was the bread and butter of the company.",
                    "This involved working within the \"Flow System\" - described in a previous section - as well as occasionally writing custom functionality for things outside of it's scope.",
                    "While I did work on and complete a number of modules myself, more often I was tasked with tooling and enabling other developers to work faster, or automate as much of the process as I could, bringing the average turn around of a module (Blank slate -> Viable Product) from a few months to a few days."
                ],
                tags: new Set([
                    "Luminous",
                    "VR",
                    "XR",
                    "Training Modules"
                ])
            },
            {
                image: defaultImage,
                title: "Oil Rig Training Simulator",
                paragraphs: [
                    "One of the final products I worked on was an interactive training simulator set on an oil rig. The idea being that there was a 'trainer' in one room who communicated to a room of 'trainees'. The trainer would set up a scenario, such as a fire on the rig, and the trainees would have to communicate what they would do in the situation. The trainer would then perform the actions they said and the simulator would show the trainees what would happen and whether it was the correct call or not.",
                    "The main challenges for this was working with several cameras at any time - There were 4 CCTV like views which would be displayed across 4 monitors to the trainees. As well as this, just about every scenario they wanted involved some sort of particle effect, which would then be displayed to four cameras. So performance became critical. Luckily they were working with a very powerful computer, but it still needed to be reigned in a number of times.",
                    "In addition to this I created a procedural sea with waves which items could float on top of and tried to create a semi-realistic effect for the boats on it. It also included some shader work to create a transparent effect, lerp towards a 'shallow' colour where the sea intersected objects and include spray and foam."
                ],
                tags: new Set([
                    "Luminous",
                    "Desktop",
                    "Training",
                    "Simulation",
                    "Shader"
                ])
            }
        ]
    },
    {
        title: "Sprung Studios",
        introParagraphs: [
            "First company I worked for, focusing on pixel-perfect UI design and a strong emphasis on performant UI development. I mainly worked on a singular project developed using Unreal Engine covering many different areas of the game, but also helped and contributed to a number of projects during my employment."
        ],
        anchorName: "sprungAnchor",
        carouselProps: [
            {
                image: defaultImage,
                title: "Junior to Developer",
                paragraphs: [
                    "I began as a junior in Sprung, where I was creating prototypes of UIs for approval by more senior members and to transfer the skills I had in Unity over to Unreal. I actually got bumped up to a developer long before my time as a junior was due to end as I already understood the fundamentals and quickly adapted to the tools."
                ],
                tags: new Set([
                    "Sprung Studios",
                    "Unreal Engine",
                    "Localization",
                    "UI",
                    "UX",
                    "Game Development",
                    "Perforce"
                ])
            },
            {
                image: defaultImage,
                title: "Unreleased AAA MMORPG",
                paragraphs: [
                    "My main project during my time there was implementing the UI for an upcoming MMORPG developed by Amazon. This included a number of different menus as well as some spatial work for healthbars, area indicators, damage reticles etc.",
                    "Built in Unreal Engine it was my task to take what the designers had made, fill it with the information actually available in the game and then display it in a performant manner. The standard at Sprung are incredibly high and therefore anything that wasn't pixel-perfect, reactive to multiple resolutions, optimized and built to adapt for any future changes wouldn't pass the reviews. The work I produced there was of an exceptional quality.",
                    "Sadly I believe the project got scrapped after my leaving (Probably unrelated) but it was extremely interesting and taught me a lot about how large and complex games are made. It also introduced me to Unreal Engines UI system, Perforce and Unit Testing." 
                ],
                tags: new Set([
                    "Sprung Studios",
                    "Unreal Engine",
                    "UI",
                    "UX",
                    "Game Development",
                    "Perforce" 
                ])
            }
        ]
    },
    {
        title: "Web",
        introParagraphs: [
            "Over the years I've used HTML/CSS/JS for various things on the web. Here is a collection of some of them - Where they are still active I have tried to include links."
        ],
        anchorName: "webAnchor",
        carouselProps: [
            {
                image: defaultImage,
                title: "Portfolio",
                paragraphs: [
                    "This is the latest itteration of my portfolio. I tend to design from scratch, and not use templates. While I'm not against their use I want to demonstrate that I have the skills to understand and work with things on the most basic of levels so that you can feel safe knowing that should a template or particular aspect of a library not work I will have the knowledge to adapt it or write it fresh.",
                    "Currently this website only uses React and was previously built as a pure HTML/CSS page with minimal JS. My previous portfolio did use react and bootstrap and I've done some work with tailwind but not working on it with the same hours as I would a job I don't think my approach was fantastic - You can see how it was used in the history of the github repo." 
                ],
                tags: new Set([
                    "Web",
                    "HTML",
                    "CSS",
                    "JS",
                    "React" 
                ])
            },
            {
                image: defaultImage,
                title: "p5 General",
                banner: {
                    bannerTitle: "Any code here is built as a solo project!",
                    bannerText: [
                        "It may therefore be uncommented and/or difficult to read. This isn't how I would write production-level code!"
                    ]
                },
                paragraphs: [
                    "P5 is something I've used for years. I appreciate that it's online, easily accessible, and rudimentary in what it is trying to achieve. Essentially a small graphics library for the web. It helps that The Coding Train youtube channel has a lot of tutorials which is what originally got me into using p5 and since then it has just been my go-to for quick things I want to check out.",
                    "My entire library of sketches that I have written can be found HERE but I have listed some of the more interesting or impressive ones below - There is a lot and a lot of them may be blank, boring or just not work."
                ],
                linkListProps: [
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/yIpPKbQ1R",
                        linkText: "Fireworks",
                        text: "Made for my kids after November 5th so they can click and see some fireworks."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/1Y4IR3vx1",
                        linkText: "Spirograph Thing",
                        text: "Working like a spirograph it creates a pattern using a path that is randomly selected on start. Hit Stop/Play to reset and get a new pattern."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/93WYKKYam",
                        linkText: "Matrix Style Text",
                        text: "Falling text that is styled like the Matrix movie."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/U-ipOuaxQx",
                        linkText: "Plinko",
                        text: "Runs a plinko game repeatedly and shows where each ball lands. Leave it for long enough and a standard distribution will appear."
                    } 
                ],
                tags: new Set([
                    "Web",
                    "Javascript",
                    "P5"
                ])
            },
            {
                image: defaultImage,
                title: "p5 Genetic Algorithms",
                banner: {
                    bannerTitle: "Any code here is built as a solo project!",
                    bannerText: [
                        "It may therefore be uncommented and/or difficult to read. This isn't how I would write production-level code!"
                    ]
                },
                paragraphs: [
                    "At some point I became really obsessed with genetic algorithms and wrote a few of my own to solve some simple problems. I also created a perceptron which is the basis of the neural networks that we see so much news about today."
                ],
                linkListProps: [
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/-_TQR2aEh",
                        linkText: "Genetic Gravity",
                        text: "Calculates what acceleration you need from a position to get the most 'perfect' orbit using a genetic algorthim. Checking the checkbox will get rid of the visuals and just run the calculations, updating the best result over time."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/zLhK_ZdzF",
                        linkText: "Genetic Salesmen",
                        text: "Classic travelling salesman problem but using genetic algorithm. Each person chooses a route, follows that route marking down the amount of steps the route took them and that is their fitness level at the end."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/9CX0E5h2p",
                        linkText: "Genetic Walker",
                        text: "Uses a genetic algorithm to find a path from the top-left to the bottom-right of the canvas using Up/Down/Left/Right movements. Slider will speed up the simulation. After sim has finished time is paused so you can see the resulting path and where the population ended up."
                    } 
                ],
                tags: new Set([
                    "Web",
                    "Javascript",
                    "P5",
                    "Algorithms",
                    "Genetics"
                ])
            },
            {
                image: defaultImage,
                title: "p5 Shaders",
                banner: {
                    bannerTitle: "Any code here is built as a solo project!",
                    bannerText: [
                        "It may therefore be uncommented and/or difficult to read. This isn't how I would write production-level code!"
                    ]
                },
                paragraphs: [
                    "p5 includes ways to run shaders and as something I was interested in, I have a few that I have wrote. I have found that working with shaders inside of Unreal/Unity to be far easier than writing the raw code, but I like knowing what that code is as well. Nowadays I am more likely to use ShaderToy if I am looking to do something quick."
                ],
                linkListProps: [
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/kOCJm5y7o",
                        linkText: "Boids Shader",
                        text: "EPILEPSY WARNING - Little boid shader."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/Xx5HJGLZm",
                        linkText: "Text Draw Shader",
                        text: "Draws text with a shader."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/nEpG9LDoX",
                        linkText: "Conways Shader",
                        text: "Conways game of life running as a shader. Click to add extra alive/dead cells."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/8zjATzXYI",
                        linkText: "Voronoi Shader",
                        text: "Shader that shows a voronoi diagram. Drag points to move them."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/vwxak2h5X",
                        linkText: "Julia Set Shader",
                        text: "Shader that shows a Julia set. Sliders can animate and do various things."
                    } 
                ],
                tags: new Set([
                    "Web",
                    "Javascript",
                    "P5",
                    "Shaders"
                ])
            },
            {
                image: defaultImage,
                title: "p5 Physics and Math",
                banner: {
                    bannerTitle: "Any code here is built as a solo project!",
                    bannerText: [
                        "It may therefore be uncommented and/or difficult to read. This isn't how I would write production-level code!"
                    ]
                },
                paragraphs: [
                    "Anything that contains some element of physics or math at it's core idea."
                ],
                linkListProps: [
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/8wvoDsUvn",
                        linkText: "Serpinski Triangle",
                        text: "Hit play to change where the 3 points are."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/Ar1NxaeZB",
                        linkText: "Quad Tree",
                        text: "Just looking in to how quad trees work. It is not the greatest soluton and optimizations could definitely be made. Click to add particles. The number in the console is the amount of particles currently moving around."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/OPt2jyYIF",
                        linkText: "Sudoku Generator",
                        text: "Uses wave function collapse to create a Sudoku."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/smzr0kp4R",
                        linkText: "Bezier Curve Animation",
                        text: "Click somewhere on the canvas and it will play an animation of how a bezier curve would be drawn between the 3 points."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/WMVMtVolG",
                        linkText: "Two Point Pendulum",
                        text: "Example of how chaos works. Minimal changes to starting conditions cause vastly different results."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/gJ3FjOJYh",
                        linkText: "Lorenz",
                        text: "Runs a Lorenz attractor. Sliders at the bottom control the variables."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/3g9foY6BK",
                        linkText: "Strange Attractor",
                        text: "Another attractor similar to Lorenz."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/nEdkBNyjR",
                        linkText: "Calculate PI with Darts",
                        text: "Calculate PI by choosing a random point in the canvas (Square) then seeing if that point is less than a certain distance from the center. The ratio of points inside to outside multiplied by 4 approximates PI."
                    } 
                ],
                tags: new Set([
                    "Web",
                    "Javascript",
                    "P5",
                    "Shaders",
                    "Maths",
                    "Physics",
                    "Chaos"
                ])
            },
            {
                image: defaultImage,
                title: "p5 Algorithms",
                banner: {
                    bannerTitle: "Any code here is built as a solo project!",
                    bannerText: [
                        "It may therefore be uncommented and/or difficult to read. This isn't how I would write production-level code!"
                    ]
                },
                paragraphs: [
                    "Things that are running an algorithm of some description (Even if that algorithm is physics based or non-deterministic) and don't fit into the other categories neatly."
                ],
                linkListProps: [
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/WFd2m0Ue3T",
                        linkText: "Shouting Insects",
                        text: "Uses the idea of ants to create a path between home (red) and food (green). So each particle can communicate the amount of steps they have taken to try and find their destination (home or food). If the ant has a lower number of steps other ants will follow it. Over time the path will get optimized."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/3R5kU9Xpq",
                        linkText: "Self Stabilizing Structures",
                        text: "Uses attract/repel to form structures that maintain a distance from each other. Click a point to nudge it."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/-t_oMaoUQ",
                        linkText: "Attract and Repel Rules",
                        text: "Particles are attracted or repelled from others with different weights and you can add or remove from the ruleset with (relative) ease."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/vn_NVYHnp",
                        linkText: "Flocking",
                        text: "Flocking algorithm."
                    },
                    {
                        link: "https://editor.p5js.org/Pseu/sketches/S2KWYC3mB",
                        linkText: "Animal Sim",
                        text: "Animals run around eating plants that are generated. The population ebbs and flows with the abundance or lack of food."
                    }
                ],
                tags: new Set([
                    "Web",
                    "Javascript",
                    "P5",
                    "Algorithms",
                    "Maths"
                ])
            }
        ]
    }
]

const allTags:Set<string> = new Set<string>();

function GetAllTags(){
    pageSectionsProps.forEach((prop)=>{
        for(let i = 0; i < prop.carouselProps.length; i++){
            let item = prop.carouselProps[i];
            item.tags.forEach((tag)=>allTags.add(tag));
        }
    });
}

export default function ProjectsPage(){
    GetAllTags();
    return (
        <div>
            <NavBar selected={1} />
            <PageIntro props={pageIntroProps} />
            
            <BoxSection props={pageSectionsProps} />           
            <Footer includeProjectButton={false} includeContactButton={true} />
        </div>
    );
}

function BoxSection({props}:{props:ProjectsPageProp[]}){
    const [filter, setFilter] = useState<Set<string>>(new Set());
    return (
        <div className="largeBoxSection">
            <TagFilter tags={allTags} filter={filter} setFilter={setFilter} />
            <Sections props={props} filter={filter}/>
        </div>
    );
}

function Sections({props, filter}:{props:ProjectsPageProp[], filter:Set<string>}){
    return props.map((prop, index)=>
        <Section key={index} prop={prop} filter={filter} />
    );
}

function Section({prop, filter}:{prop:ProjectsPageProp, filter:Set<string>}) {
    const {ref, className} = useFadeInView("")

    return (
        <div className="projectsSection">
            <div ref={ref} className={className}>
                <h1 className="greenText">{prop.title}</h1>
                <BasicParagraphSection paragraphs={prop.introParagraphs} />
            </div>
            <Carousel anchorName={prop.anchorName} props={prop.carouselProps} filter={filter} />
        </div>
    );
}