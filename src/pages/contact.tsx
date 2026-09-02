import NavBar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';

import '../css/pageIntro.css';
import '../css/contact.css';

import emailIcon from '../images/icons/Profile.png';
import socialIcon from '../images/icons/Mail.png';
import githubIcon from '../images/icons/Code.png';
import linkedInIcon from '../images/icons/Briefcase.png';

export type EmailProp = {
    icon: string,
    email: string,
    emailSubject:string,
    emailIntro: string
}

export type SocialProp = {
    icon: string,
    link: string,
    text: string
}

const emailProp : EmailProp =
{ 
    icon: emailIcon,
    email: "mythirdalias@gmail.com",
    emailSubject: "Hello, I saw your site!",
    emailIntro: "Hello!%0D%0A%0D%0ASaw your site and would like to talk to you about..."
}

const socialProps : SocialProp[] = [
    {
        icon: githubIcon,
        link: "https://github.com/TomDraper",
        text: "GitHub"
    },
    {
        icon: linkedInIcon,
        link: "https://www.linkedin.com/in/tom-draper-88836321a",
        text: "LinkedIn"
    }
]

export default function ContactPage(){
    return (
        <div>
            <NavBar selected={3} />
            <PageIntro />
            <ContactGrid emailProp={emailProp} socialProps={socialProps} />
            <Footer includeProjectButton={true} includeContactButton={false} />
        </div>
    );
}

function PageIntro(){
    return (
        <div className="pageIntro contactIntro">
            <h1>Get in <span className="greenText">Touch</span></h1>
            <p>Interested in collaboration or have a project in mind? Let's connect!</p>
        </div>
    );
}

function ContactGrid({emailProp, socialProps}:{emailProp:EmailProp, socialProps:SocialProp[]}){
    return (
        <div className="contactGrid">
            <EmailBox prop={emailProp} />
            <SocialBox props={socialProps} />
            <ContactForm />
        </div>
    );
}

function EmailBox({prop}:{prop:EmailProp}){
    var mailLink = `mailto:${prop.email}?subject=${prop.emailSubject}&body=${prop.emailIntro}`;
    return (
        <div className="emailBox">
            <div className="socialsTitleContainer">
                <a className="whiteLink" href={mailLink}><img className="emailIcon" src={prop.icon} alt="Icon for Email"/></a>
                <h3 className="greenText">Email</h3>
            </div>
            <a className="whiteLink" href={mailLink}>{prop.email}</a>
        </div>
    );
}

function SocialBox({props}:{props:SocialProp[]}){
    return (
        <div className="socials">
            <div className="socialsTitleContainer">
                <img className="emailIcon" src={socialIcon} alt="Icon for Socials" />
                <h3 className="greenText">Socials</h3>
            </div>
            <SocialBoxLinks props={props} />
        </div>
    );
}

function SocialBoxLinks({props} : {props:SocialProp[]} ){
    return props.map((prop, index)=>
        <SocialLink key={index} prop={prop} />
    );
}

function SocialLink({prop}:{prop:SocialProp}){
    return (
        <div className="socialLink">
            <a href={prop.link}><img className="socialIcon" src={prop.icon} alt="Icon"/></a>
            <a href={prop.link} className="whiteLink">{prop.text}</a>
        </div>
    );
}

function ContactForm(){
    return (
        <div className="contactForm">
            <h3>Send a Message</h3>
            <p>Will send from your default email app! Not setting up a backend for a simple profile.</p>
            <form action={SubmitContactForm} id="contactForm">
                <label>Name <input id="name" name="name" type="text"></input></label><br />
                <label>Subject <input id="subject" name="subject" type="text"></input></label><br />
                <div className="contactMessage"><textarea id="message" name="message" placeholder="Message..."></textarea></div><br />
                <input type="submit" value="Send message"></input>
            </form>
        </div>
    );
}

function SubmitContactForm(formData:FormData){    
    var entries = Object.fromEntries(formData);
    var name = entries.name;
    var subject = encodeURIComponent(`${entries.subject}`);
    var body = entries.message;
    var message = encodeURIComponent(`Hi Tom, it's ${name}.\r\nI've seen your profile and I'd like to get in touch:\r\n${body}`);
    window.location.href = `mailto:mythirdalias@gmail.com?subject=${subject}&body=${message}`;
}