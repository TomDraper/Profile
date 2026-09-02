import { BasicParagraphSection } from './textHelpers.tsx';

import '../css/banner.css';

export type BannerProp = {
    bannerTitle?:string,
    bannerText?:string[]
}

export function Banner({prop}:{prop?:BannerProp}){
    if (prop == null) return;

    var validText = prop.bannerText != null && prop.bannerText.length > 0;
    if (prop.bannerTitle == null && validText === false) return;

    let bannerTitle = prop.bannerTitle ? <h3><b>{prop.bannerTitle}</b></h3> : "";
    let bannerText = prop.bannerText ? <BasicParagraphSection paragraphs={prop.bannerText} /> : ""

    return (
        <div className="banner">
            {bannerTitle}
            {bannerText}
        </div>
    );
}