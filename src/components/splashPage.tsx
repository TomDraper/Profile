import { useFadeInView } from '../hooks/fadeInView.ts'

export default function SplashPage(){
    const { ref, className } = useFadeInView("splashPage center");

    return (
        <div ref={ref}className={className}>
            <div className="splashPageVignette center">
                <h2>Tom Draper</h2>
                <h1 className="greenText">Games Programmer</h1>
                <h3>Creating immersive gaming experiences, improving tooling to enable faster development and polishing with pixel perfect UI designed for a seamless user experience. 
                    <p>Created using React.
                    <br/><a href="https://github.com/TomDraper/React-Profile/tree/master">Source Code</a></p>
                </h3>
                
                <div className="horizontalContainer center">
                    <a href="#/projects"><button className="btn greenButton">View Projects</button></a><a href="#/contact"><button className="btn transparentButton">Get in Touch</button></a><a href="#/terminalGame"><button className="btn transparentButton">Terminal</button></a>
                </div>
            </div>
        </div>
    );
}