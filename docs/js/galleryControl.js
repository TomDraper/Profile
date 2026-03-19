const galleryCenter = document.querySelector('.centerGalleryContent');

function waitForAnimation(element){
    return new Promise(resolve => {
        const onTransitionEnd = (event) => {
            console.log("transition ended");
            if (event.target === element) {
                element.removeEventListener('animationend', onTransitionEnd);
                resolve();
            }
        };
        element.addEventListener('animationend', onTransitionEnd, { once: true });
        console.log("waiting for transition to end");
    });
}

let targetTitle = "";
let targetDescription = "";

async function AnimatedChange(title, description){
    if (targetTitle === title && targetDescription === description){
        return;
    }

    targetTitle = title;
    targetDescription = description;

    galleryCenter.removeEventListener('animationend', (event)=>{ event.stopImmediatePropagation(); });

    galleryCenter.classList.remove('fadeIn');
    galleryCenter.classList.add('fadeOut');

    await waitForAnimation(galleryCenter);

    SetToString(targetTitle, targetDescription);
    galleryCenter.classList.remove('fadeOut');
    void galleryCenter.offsetWidth;
    galleryCenter.classList.add('fadeIn');

    await waitForAnimation(galleryCenter);

    galleryCenter.classList.remove('fadeIn');
}

function GetString(title, description){
    return `<h1>${title}</h1><p>${description}</p>`;
}

function SetToString(title, description){
    galleryCenter.innerHTML = GetString(title, description);
}

function SetToLuminous(){
    AnimatedChange("Luminous", "This is where I will talk about Luminous.");
}

function SetToSprung(){
    AnimatedChange("Sprung", "This is where I will talk about Sprung.");
}

function SetToUnity(){
    AnimatedChange("Unity", "This is where I will talk about Unity.");
}

function SetToGodot(){
    AnimatedChange("Godot", "This is where I will talk about Godot.");
}

function SetToJavascript(){
    AnimatedChange("Javascript", "This is where I will talk about Javascript.");
}

function SetToWebDevelopment(){
    AnimatedChange("Web Design", "This is where I will talk about Web Design.");
}

function SetToSketch(){
    AnimatedChange("Sketch", "This is where I will talk about Sketch.");
}
