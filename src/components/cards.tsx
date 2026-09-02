import { useFadeInView } from "../hooks/fadeInView.ts";

export type SmallCardProp = {
    icon?: string,
    title?: string,
    innerText?: string
}

export type SmallImageCardProp = {
    image?: string,
    title?: string,
    description?: string
}

export type SmallCardBulletProp = {
    icon: string,
    title: string,
    bulletPoints: string[]
}

export function SmallCardFlexBox({ cardProps } : { cardProps:SmallCardProp[] }){
    return (
        <div className="boxSection">
            <div className="boxGrid">
                <SmallCardBox cardProps={cardProps} />
            </div>
        </div>
    );
}

export function SmallCardBox({ cardProps } : { cardProps:SmallCardProp[] }){
    return cardProps.map((prop, index) => (
        <SmallCard key={index} {...prop} />
    ));
}

export function SmallCard({ icon, title, innerText }: SmallCardProp){

    const { ref, className } = useFadeInView("box");
    return (
        <div ref={ref} className={className}>
            <div className="boxIconBackground"><img className="boxIcon" src={ icon } alt=""/></div>
            <h3>{ title }</h3>
            <p>{ innerText }</p>
        </div>
    );
}

export function SmallImageCard({ image, title, description }: SmallImageCardProp){

    const { ref, className } = useFadeInView("smallBox");
    return (
        <div ref={ref} className={className}>
            <h3>{ title }</h3>
            <div className="smallImageCardImage"><img className="boxIcon" src={ image } alt=""/></div>
            <p>{ description }</p>
        </div>
    );
}

export function SmallCardBulletedBoxSection({title, cardProps}:{title:string, cardProps:SmallCardBulletProp[]}){
    return (
        <div className="boxSection">
            <h1 className="greenText">{title}</h1>
            <div className="smallBoxGrid">
                <SmallCardBulletedBox cardProps={cardProps} />
            </div>
        </div>
    );
}

function SmallCardBulletedBox({ cardProps } : { cardProps: SmallCardBulletProp[]}){
    return cardProps.map((prop, index)=>
        <SmallCardBulleted key={index} {...prop} />
    );
}

export function SmallCardBulleted({ icon, title, bulletPoints }:SmallCardBulletProp)
{
    const { ref, className } = useFadeInView("smallBox");

    return (
        <div ref={ref} className={className}>
            <div className="boxIconBackground"><img className="boxIcon" src={icon} alt=""/></div>
            <h3>{title}</h3>
            <ul>
                <BulletPoints bulletPoints={bulletPoints} />
            </ul>
        </div>
    );
}

function BulletPoints({bulletPoints}:{bulletPoints: string[]}){
    return bulletPoints.map((text, index) => (
        <BulletPoint key={index} text={text} />
    ));
}

function BulletPoint( {text}:{text: string}){
    return <li>{text}</li>
}