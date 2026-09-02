import { useFadeInView } from '../hooks/fadeInView.ts'
import { LinkListProp, LinkList } from './linkLines.tsx'
import { BasicParagraphSection } from './textHelpers.tsx'
import { BannerProp, Banner } from './banner.tsx';
import { TagBox, Taggable, FilterByTags } from '../components/tagFilter.tsx';
import '../css/carousel.css';

export type CarouselItemProp = Taggable & {
    image: string,
    title: string,
    banner?: BannerProp,
    paragraphs: string[],
    linkListProps?: LinkListProp[]
}

export function Carousel({anchorName, props, filter}:{anchorName:string, props:CarouselItemProp[], filter: Set<string>}){
    var sectionClassNames = `largeBoxCarousel ${anchorName} fadeWhenInView`
    const { ref, className } = useFadeInView(sectionClassNames);
    const filteredProps = FilterByTags(props, filter);
    return (
        <div ref={ref} className={className}>
            <CarouselItems props={filteredProps} />
        </div>
    );
}

function CarouselItems({props}:{props:CarouselItemProp[]}){
    return props.map((prop, index)=>
        <CarouselItem key={index} prop={prop} />
    );
}

function CarouselItem({prop}:{prop:CarouselItemProp}){
    return (
        <div className="largeBoxScroll">
            <div className="largeBoxScrollImageColumn">
                <img src={prop.image} alt=""/>
            </div>
            <div className="largeBoxScrollContentColumn">
                <h3>{prop.title}</h3>
                <div className="largeBoxScrollContent">
                    <Banner prop={prop.banner} />
                    <BasicParagraphSection paragraphs={prop.paragraphs} />
                    <LinkList props={prop.linkListProps} />
                </div>
                <TagBox prop={prop} />
            </div>
        </div>
    );
}