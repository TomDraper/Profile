import { useFadeInView } from '../hooks/fadeInView.ts'

// Images
import '../css/pageIntro.css';

export type PageIntroProps = {
    title: string,
    sideImage?: string,
    paragraphs: string[]
}

export function PageIntro({props}:{props:PageIntroProps}) {
    const { ref, className } = useFadeInView("pageIntro");

    return (
        <div ref={ref} className={className}>
            <h1 className="greenText">{props.title}</h1>
            {props.sideImage ?
                <img className="pageIntroSideImage" src={props.sideImage} alt="Decorative accompanying Text"></img> :
                ""}
            <div className="paragraphBlock">
                <IntroParagraphs lines={props.paragraphs} />
            </div>
        </div>
    );
}

function IntroParagraphs({lines}:{lines:string[]}){
    return lines.map((prop, index)=>
        <p key={index}>{prop}</p>
    );
}

// export function AboutPageIntro() {
//     return (
//         <div className="pageIntro fadeWhenInView">
//             <h1 className="greenText">About Me</h1>
//             <img className="pageIntroSideImage" src={defaultImage}></img>
//             <p>Passionate programmer, with 4 years industry experience, enjoying anything that allows me to 'solve a puzzle' regardless of what that entails. Generally tasked with creating tooling to enable developers to be more efficient, but have worked on both sides of development. In my free time I like to create and work with the more 'flashy' side of development such as creating shaders or particle effects.</p>
//             <p>Started out with flash games and Actionscript in school where I made some classic 'infinite runner' type games. Moved on through College and University pursuing games but closer to the design side. After university spent a lot of time on solo projects and creating things using P5 due to the ease of access and simplified approach. Landed a job with Sprung which taught me C++ and the nuances of creating award winning UIs.</p>
//             <p>Worked in the games and XR training industry across a number  of engines, devices and platforms including XR/VR, Unity, Unreal, Python, C++, C#, Javascript and HTML delivering to a number of devices and platforms including Web, Xbox, PS4, Quest 2/3, Apple Vision Pro, iPad, iPhone, Android Tablets/Phones, HoloLens as well as various other VR devices.</p>
//             <p>Outside of programming I'm a recreational boulderer, hoping to try outdoors climbing in the summer when it's a bit warmer. I have a regularly scheduled board games night with friends and enjoy taking my twin daughters out to see the various parks, seasides and areas of interest around me.</p>        
//         </div>
//     );
// }