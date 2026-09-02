export type LinkListProp = {
    link: string,
    linkText: string,
    text: string
}

export function LinkList({props}:{props?:LinkListProp[]}){
    if (props == null) 
        return;
    if (props.length === 0) 
        return;

    var links = props.map((prop, index)=>
        <LinkListItem key={index} prop={prop} />
    )

    return (
        <div>
            {links}
        </div>
    );
}

export function LinkListItem({prop}:{prop:LinkListProp}){
    return (
        <div><a href={prop.link}>{prop.linkText}</a> - {prop.text}<br /></div>
    );
}