// Components.
import * as Cards from '../components/cards.tsx';
import NavBar from '../components/navbar.tsx';
import SplashPage from '../components/splashPage.tsx';
import Footer from '../components/footer.tsx';

// CSS
import '../css/navbar.css';
import '../css/splashPage.css';
import '../css/cards.css';
import '../css/footer.css';

// Images
import controllerLogo from '../images/icons/Controller.png';
import codeLogo from '../images/icons/Code.png';
import profileLogo from '../images/icons/Profile.png';

const smallCards : Cards.SmallCardProp[] = [
    { 
        icon: controllerLogo, 
        title: "Game Development", 
        innerText: "Experienced in Unity, Unreal Engine and Godot. Creating gameplay elements, dealing with data structure as well as editor tooling." 
    },
    { 
        icon: codeLogo, 
        title: "Programmer at Heart", 
        innerText: "Experienced in and used a lot of languages. Strong understanding of the fundamentals that go into programming regardless of the language used." 
    },
    { 
        icon: profileLogo, 
        title: "Make it Pretty", 
        innerText: "Love working with shaders or with visual effects such as particles as well as physics systems or procedural generation." 
    },
]

export default function HomePage(){
    return (
        <div>
            <NavBar selected={0} />
            <SplashPage />
            <Cards.SmallCardFlexBox cardProps={smallCards} />
            <Footer includeProjectButton={true} includeContactButton={true} />
        </div>
    );
}