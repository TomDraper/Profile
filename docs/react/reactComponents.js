function SketchThumbnail(props){
    let colConvert = [
        "col-md-12",
        "col-md-6",
        "col-md-4",
        "col-md-3",
        "col-md-2"
    ];
    let finalClassName = colConvert[props.cols-1];
    let buttons = [];
    if (props.buttons){
        for(let i = 0; i < props.buttons.length; i++){
            let obj = props.buttons[i];
            let btn = <ThumbnailButton key={"ThumbnailButton" + i} title={obj.title} link={obj.link} />;
            buttons.push(btn);
        }
    }
    return (
        <div className = {finalClassName}>
          <div className="col-xs-12 sketchThumb">
            <iframe src={props.src}></iframe>
          </div>
          <div className="thumbnail text-center caption">
            <div className="caption">
              <h2 className="display-6 thumbTitle">{props.title}</h2>
              <p>{props.description}</p>
              <div className = "text-center">
                  { buttons }
              </div>
            </div>
          </div>
        </div>
    )
}

/*
    -- FullSpanExplanation --
    Goes the full span of the page, generally used for a Tools of the Trade section at the top of sub pages.
    Can also be used to break up a long page, although Jumbotron will generally serve the stylings better.
    
    -- Properties --
    Title - A larger and bolder title seperated from the bulk message below..
    Entries - What you wish to put as the description. Accepts JSX fragments (<></>).
    
    -- Usage --
    Here is how it is used on the games page:
        const gameLine = <> <p><b>A</b></p><p> Long example line, but not the real one, because that is actually long.</p> </>
        const fullSpanEntry = <FullSpanExplanation title="Game Development" entries={gameLine} />;
        root.render(<GamesPage jumbotron={ jumboTronEntry } explanation={fullSpanEntry} thumbnails={ finalEntries } /> );
*/

function FullSpanExplanation(props){
    return (
        <div className = "col-md-12">
            <div className="thumbnail">
                <div className="fullSpan">
                    <h2>{props.title}</h2>
                    { props.entries }
                </div>
            </div>
        </div>               
    )
}

function ThumbnailButton(props){
    return (
        <a className="btn btn-secondary captionBtn" target="_blank" href={props.link} role="button">{props.title}</a>
        )
}
/*
    -- Thumbnail --
    Represents a single block including a title, image and description.
    
    -- Properties --
    Title - Title above the thumbnail.
    Name - Used as the ALT value of the image (Displayed on MouseOver image)
    Link - What link the image will use.
    Src - Image src.
    Description - Full description. You can include JSX fragments for more complex stylings (<> </>).

    -- Usage --
    Used inside of ThumbRows.
*/
function Thumbnail(props){
    let colConvert = [
        "col-md-12",
        "col-md-6",
        "col-md-4",
        "col-md-3",
        "col-md-2"
    ];
    let finalClassName = colConvert[props.cols-1];
    let buttons = [];
    if (props.buttons){
        for(let i = 0; i < props.buttons.length; i++){
            let obj = props.buttons[i];
            let btn = <ThumbnailButton key={"ThumbnailButton" + i} title={obj.title} link={obj.link} />;
            buttons.push(btn);
        }
    }
    return (
        <div className={finalClassName}>
            <div className="thumbnail">
                <a href={ props.link }>
                    <img className = "thumb_images card-img-top"
                     src= {props.src}
                     alt= {props.alt}
                     style= {{ width: "100%", height: "100%" }}>
                    </img>
                </a>
                <h2 className = "display-6 thumbTitle">
                    { props.title }
                </h2>
                <div className="caption">
                    <p>{props.description}</p>
                    <div className = "text-center">
                        { buttons }
                    </div>
                </div>
            </div>
        </div>
    )
}

/*
    -- ThumbRow --
    Represents up to 3 Thumbnails in a row.
    
    -- Properties --
    Entries - List of Thumbnails to represent.
    
    -- Usage --
    Used in ConstructThumbnailEntries(entryArray) to apply appropriate styling to the pages.
    
*/    
function ThumbRow(props){
    return (
        <div className = "row thumb_row">
            { props.entries }
        </div>
    )
}

/*
    -- ThumbBlock --
    The main bulk delivery of content will be done using this. 
    It represents a full span section that includes many thumbnails laid out in a grid pattern.
    
    -- Properties --
    Thumbnails -    You can generate an appropriate property using ConstructThumbnailEntries(entryArray)
    
    -- Usage --    
    const exampleEntries = [
        <Thumbnail key="thumb1" caption="example1" name="ex1" src="./example.png" link="./pages/example.html" description="Example Description" />,
        ...
        <Thumbnail key="thumb100" caption="example100" name="ex100" src="./example100.png" link="./pages/example100.html" description="Example Description 100" />
        />
    ]
    let finalList = ConstructThumbnailEntries(exampleEntries);
    <ThumbBlock thumbnails = { finalList } />
    
    Most usage will be done using this pattern though:
    root.render(<Page jumbotron={ jumboTronEntry } thumbnails={ finalEntries } />)
    
    
*/    
function ThumbBlock(props){
    return (
        <div className = "col-md-12" >
            <div>{ props.thumbnails }</div>
        </div>
    )
}

/*
    -- Jumbotron --
    Large display. Usually only shown once at the top of the screen but can be used to seperate appropriate sections of a page.
    
    -- Properties --
    Title - What should we use as the title -- Usually the same as the page name.
    Description -- What goes underneath the horizontal rule.
    
    -- Construction --
        <Jumbotron title="Example" description="Example" />;
        For more complex paragraphs you may wish to use this pattern:
        let exampleComplexLine = <>My complex lines are <b>complex</b> and <br/> can use <p>html.</p></>
        <Jumbotron title="Example" description={ exampleComplexLine } />;
        
*/
function Jumbotron(props){
    return (
        <div className="row">
            <div className="jumbotron">
                <h1 className="display-4">{props.title}</h1>
                <hr className="my-4"></hr>
                <p className="lead">{props.description}</p>
            </div>
        </div>
    )
}

/*
    Helper used in navbar. Styles the links if you wish.
    Exclude border is used for the right most link to make it match the style.
*/
function NavBarLink(props){
    let border = props.exludeBorder ? {} : { borderRight: "1px solid slategrey" };
    let linkClass = props.active ? "nav-link active" : "nav-link";
    return (
        <li className="nav-item" style={border}>
            <a className={linkClass} href={props.link}>{props.title}</a>
        </li>
    )
}

    

/*
    -- Nav Bar --
    Displayed as a floating element above every page. 
    Contains an object with links that are valid from the index.
    If you wish to use an page inside /pages then use the prefix prop to add "." or ".." etc.
    Styling is set here to keep everything consistent.
    
    -- Properties --
    Prefix --   This prefix will be applied to every property of the standard links. 
                Should return the directory back to index NEEDS TO BE INCLUDED -- Even if it's the index page and just "".
*/
function NavBar(props){
    let newLinks = {
        index: props.prefix + "./index.html",
        game: props.prefix + "./pages/game_design.html",
        web: props.prefix + "./pages/web.html",
        video: props.prefix + "./pages/video_editing.html",
        shader: props.prefix + "./pages/shaders.html"
    };
    let activeArray = [false, false, false, false ]
    activeArray[props.active] = true;
    return (
        <nav className="navbar navbar-expand-md fixed-top bg-dark navbar-dark " id="followme">
            <a className="navbar-brand" href={newLinks.index} style={{paddingLeft: 20}}>Tom D</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar"  style={{marginRight: 20 }} >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar" style={{paddingLeft:40}}>
                <ul className="navbar-nav">
                    <NavBarLink title="Game Development" link={newLinks.game} active={activeArray[0]} />
                    <NavBarLink title="Web Development" link={newLinks.web} active={activeArray[1]} />
                    <NavBarLink title="Video Editing" link={newLinks.video} active={activeArray[2]} />
                    <NavBarLink title="Shaders" link={newLinks.shader} excludeBorder="true" active={activeArray[3]} />
                </ul>
            </div>
        </nav>
    )
}

/*
    Helper function to construct rows of thumbnails .
    -- Usage --
    To easily create a readable list in js (Alternatively do this in a table somewhere) and parse it, or json etc...
    Meant to be used as the thumbnails entry for 
    
    const thumbnailObjects = [
        { 
            title: "Games", 
            alt: "Games", 
            src: "./images/game_design_thumb.png", 
            link:"./pages/game_design.html",
            description: "I took Games Animation in College but from there moved to Game Development at Uni. While both I found interesting, design has always appealed more to me in general. With learning C# and Unity in university the ability to code has given me freedom to explore game concepts and ideas without being bound to just the editor tools and in the years that have followed I have only expanded my learning as evidenced by this website."
        },
        {
            title: "Games", 
            alt: "Games", 
            src: "./images/game_design_thumb.png", 
            link:"./pages/game_design.html",
            description: "I took Games Animation in College but from there moved to Game Development at Uni. While both I found interesting, design has always appealed more to me in general. With learning C# and Unity in university the ability to code has given me freedom to explore game concepts and ideas without being bound to just the editor tools and in the years that have followed I have only expanded my learning as evidenced by this website."
        },
    ];
    
    let finalEntries = ConstructThumbnailEntries(thumbnailObjects, 3);
    root.render(<Page thumbnails={ finalEntries } ... /> );
*/

function ConstructThumbnailFromObject(index, colAmount, thumbObject){
    let obj = thumbObject;
    return <Thumbnail key={"Thumbnail" + index} cols={colAmount} title={obj.title} name={obj.name} alt={obj.alt} link={obj.link} src={obj.src} description={obj.description} buttons={obj.buttons}/>
}

function ConstructThumbnailEntries(entryArray, desiredColumns = 3){
    let finalEntries = [];
    let lastEntries = [];
    for(let i = 1; i <= entryArray.length; i++){
        let thumb = ConstructThumbnailFromObject(i, desiredColumns, entryArray[i-1]);
        lastEntries.push(thumb);
        if (i % desiredColumns == 0 || i == entryArray.length){
            const elem = <ThumbRow key={"ThumbRow" + i} entries={lastEntries.slice()} />;
            finalEntries.push(elem);
            lastEntries = [];
        }
    }
    return finalEntries;
}
/*
    Helper function to construct rows of thumbnails .
    -- Usage --
    To easily create a readable list in js (Alternatively do this in a table somewhere) and parse it, or json etc...
    
    Used exactly like ConstructThumbnail but requires a sketch link for src;
*/
function ConstructSketchThumbnailFromObject(index, colAmount, thumbObject){
    let obj = thumbObject;
    return <SketchThumbnail key={"SketchThumbnail" + index} cols={colAmount} title={obj.title} src={obj.src} description={obj.description} buttons={obj.buttons}/>
}

function ConstructSketchThumbnailEntries(entryArray, desiredColumns = 3){
    let finalEntries = [];
    let lastEntries = [];
    for(let i = 1; i <= entryArray.length; i++){
        let thumb = ConstructSketchThumbnailFromObject(i, desiredColumns, entryArray[i-1]);
        lastEntries.push(thumb);
        if (i % desiredColumns == 0 || i == entryArray.length){
            const elem = <ThumbRow key={"ThumbRow" + i} entries={lastEntries.slice()} />;
            finalEntries.push(elem);
            lastEntries = [];
        }
    }
    return finalEntries;
}


function GenericPage(navPrefix, navActiveIndex, jumbotronEntry, content){
    return <>
                <div>
                    <NavBar prefix={navPrefix} active={navActiveIndex} />
                    <div className="container" style={{marginTop: "20px"}}>
                        <div style={{paddingTop:40}}>{ jumbotronEntry }</div>
                        {content}
                    </div>
                </div>
            </>
}