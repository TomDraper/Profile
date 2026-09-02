import { useFadeInView } from '../hooks/fadeInView.ts'


export default function Footer({includeProjectButton, includeContactButton} : {includeProjectButton : boolean, includeContactButton : boolean}){
    const { ref, className } = useFadeInView("");  

    return (
        <div ref={ref} className={className}>
            <FooterComponent includeProjectButton={includeProjectButton} includeContactButton={includeContactButton} />
            <div className="bottomSpacer"></div>
        </div>
    );
}

function FooterComponent ({ includeProjectButton, includeContactButton } : { includeProjectButton:boolean, includeContactButton:boolean }){
    return (
        <div className="mainPageFooter center">
            <h2>Let's Build Something Amazing</h2>
            <p>Always interested in collaborating on exciting game projects and exploring new technologies.</p>
            <div className="horizontalContainer center">
                { 
                includeProjectButton ? 
                <a href="#/projects"><button className="btn greenButton">View Projects</button></a> :
                "" 
                }
                { 
                includeContactButton ? 
                <a href="#/contact"><button className="btn transparentButton">Get in Touch</button></a> :
                "" 
                }
                
            </div>
        </div>
    );
}