import '../css/textHelpers.css'

export function BasicParagraphSection({paragraphs}:{paragraphs:string[]}){
    if (paragraphs.length === 0) return;

    return paragraphs.map((line, index)=>
        <p key={index}>{line}</p>
    );
}