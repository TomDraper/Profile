import NavBar from '../components/navbar.tsx';
import { PageIntroProps, PageIntro } from '../components/pageIntro.tsx';
import { SmallCardBulletProp, SmallCardBulletedBoxSection } from '../components/cards.tsx';
import { ExperienceProp, ExperienceSection } from '../components/experience.tsx';
import Footer from '../components/footer.tsx';

import defaultImage from '../images/lights.jpg';
import controllerIcon from '../images/icons/Controller.png'
import codeIcon from '../images/icons/Code.png'
import cogIcon from '../images/icons/Cog.png'
import documentIcon from '../images/icons/Document.png'
import boltIcon from '../images/icons/Bolt.png'
import vrControllerIcon from '../images/icons/VRController.png'

const pageIntroProps : PageIntroProps = 
{
    title:"About Me",
    sideImage: defaultImage,
    paragraphs: [
            "Passionate programmer, with 4 years industry experience, enjoying anything that allows me to 'solve a puzzle' regardless of what that entails. Generally tasked with creating tooling to enable developers to be more efficient, but have worked on both sides of development. In my free time I like to create and work with the more 'flashy' side of development such as creating shaders or particle effects.",
            "Started out with flash games and Actionscript in school where I made some classic 'infinite runner' type games. Moved on through College and University pursuing games but closer to the design side. After university spent a lot of time on solo projects and creating things using P5 due to the ease of access and simplified approach. Landed a job with Sprung which taught me C++ and the nuances of creating award winning UIs.",
            "Worked in the games and XR training industry across a number  of engines, devices and platforms including XR/VR, Unity, Unreal, Python, C++, C#, Javascript and HTML delivering to a number of devices and platforms including Web, Xbox, PS4, Quest 2/3, Apple Vision Pro, iPad, iPhone, Android Tablets/Phones, HoloLens as well as various other VR devices.",
            "Outside of programming I'm a recreational boulderer, hoping to try outdoors climbing in the summer when it's a bit warmer. I have a regularly scheduled board games night with friends and enjoy taking my twin daughters out to see the various parks, seasides and areas of interest around me."
    ]
}

const bulletCards : SmallCardBulletProp[] = [
    { 
        icon: controllerIcon, 
        title: "Game Engines", 
        bulletPoints: [
            "Unity Editor (C#)",
            "Unreal Engine (C++)",
            "Godot (Python)"
        ]
    },
    { 
        icon: codeIcon, 
        title: "Languages", 
        bulletPoints: [
            "C# / C++ / Python",
            "HTML / CSS / Javascript",
            "GLSL / ShaderToy / Material Editor"
        ]
    },
    { 
        icon: cogIcon, 
        title: "Source Control", 
        bulletPoints: [
            "Plastic SCM",
            "Git",
            "Perforce"
        ]
    },
    { 
        icon: documentIcon, 
        title: "IDEs", 
        bulletPoints: [
            "Visual Studio",
            "Visual Code",
            "Rider"
        ]
    },
    { 
        icon: boltIcon, 
        title: "APIs / Extensions", 
        bulletPoints: [
            "Photon / ObiRope",
            "Google TTS / Translate",
            "React / Bootstrap"
        ]
    },
    { 
        icon: vrControllerIcon, 
        title: "Built Games For", 
        bulletPoints: [
            "PC / Mac Computers",
            "Android / Apple Tablets and Phones",
            "Web - OpenGL / p5 / Three.js",
            "Oculus Quest / Microsoft HoloLens / Apple Vision / HTC Vive / Pico"
        ]
    }
]

const experienceBlocks : ExperienceProp[] = [
    {
        fromMonth: "January",
        fromYear: "2023",
        toMonth: "March",
        toYear: "2026",
        jobTitle: "Unity XR Developer",
        companyName: "Luminous XR",
        paragraphs: [
            "Created a number of different products over my time there, worked on internal tooling and expanding the tooling that they already had. I also lead a number of projects which required custom creations/code outside of the regular 'bread-and-butter' of the company.",
            "Biggest accomplishments were automating the localization and audio generation for past and future projects, creating the first-ever WebGL game the company had ever made and converting the previous VR only projects they had made to use a Desktop Controller; both so devs could iterate and test faster, but also so that customers had the option of VR vs Desktop."
        ]
    },
    {
        fromMonth: "December",
        fromYear: "2021",
        toMonth: "October",
        toYear: "2022",
        jobTitle: "UX/UI Developer",
        companyName: "Sprung Studios",
        paragraphs: [
            "Creating a number of pixel-perfect UIs and systems that supported those UIs. Worked on two AAA titles during that time and helped colleagues across a number of other projects. Used Unity and Unreal while there, but my main focus was Unreal Engine.",
            "Biggest achievements was seeing my UI in game and getting that huge sense of accomplishment. The whole thing was a fantastic learning experience with some incredibly talented and enthusiastic people. It was an incredibly difficult decision not to move to Brighton, but ultimately had to do what was best for my family."
        ]
    }
]

export default function AboutPage(){
    return (
        <div>
            <NavBar selected={2} />
            <PageIntro props={pageIntroProps} />
            <SmallCardBulletedBoxSection title="Skills and Experience" cardProps={bulletCards} />
            <ExperienceSection title="Experience" props={experienceBlocks} />
            <Footer includeProjectButton={true} includeContactButton={true} />
        </div>
    );
}