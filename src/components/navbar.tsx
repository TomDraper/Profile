import { Link } from 'react-router-dom';

import navIcon from '../images/icons/Menu.png'

type NavBarLinkProp = {
    current: boolean,
    text: string,
    url: string,
    hidden: boolean
}

var navBarLinks : NavBarLinkProp[] = [
    { current: false, text: "Home", url: "/", hidden: false },
    { current: false, text: "Projects", url: "/projects", hidden: false },
    { current: false, text: "About", url: "/about", hidden: false },
    { current: false, text: "Contact", url: "/contact", hidden: false },
    { current: false, text: "Web", url: "/web", hidden: true },
    { current: false, text: "Terminal", url: "/terminalGame", hidden: false }
]

export default function NavBar({selected}:{selected:number}){
    for(let i = 0; i < navBarLinks.length; i++){
        navBarLinks[i].current = selected === i;
    }

    return (
        <div id="navBar" className="navBar">
            <div className="navBarHeader">
                <p className="greenText title">Tom Draper</p>
                <div className="dropdownIconContainer">
                    <a onClick={displayMobileNav}>
                        <img className="dropdownIcon" src={navIcon}></img>
                    </a>
                </div>
            </div>
            <ul>
                <NavBarLinks props={navBarLinks} />
            </ul>
        </div>
    );
}

function NavBarLinks({ props } : { props:NavBarLinkProp[] }){
    return props.map((prop, index) => (
        <NavBarLink key={index} {...prop} />
    ));
}

function NavBarLink({ current, text, url, hidden }: NavBarLinkProp){
    if (hidden) return null;
    return <li><Link className={current ? "greenText" : "greyText"} to={url} onClick={hideMobileNav}>{text}</Link></li>;
}

function displayMobileNav() {
    var x = document.getElementById("navBar");
    if (x == null) return;

    if (x.className === "navBar") {
        x.className += " responsive";
    } else {
        x.className = "navBar";
    }
}

function hideMobileNav() {
    var x = document.getElementById("navBar");
    if (x == null) return;
    x.className = "navBar";
}
