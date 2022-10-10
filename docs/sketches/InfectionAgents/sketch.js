const homes = [];
const workplaces = [];

const homeAmount = 40;
const maxFamilySize = 3;

const workAmount = 15;

const agents = []

const agentAmount = 20;

let currentTime = 0;
let currentDay = 0;
const secondsInDay = 24;
const agentSpeed = 5 * (24 / secondsInDay); 
// A speed of 5 will mean it takes them roughly 1 second (1 hour simtime) @ 24 hours to get to work and back. 
const workStart = 8 * (secondsInDay / 24);
const workEnd = 17 * (secondsInDay / 24);

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent("canvasDiv");
    
    textAlign(CENTER, CENTER)
    let homeSize = createVector(50, 5);
    let workSize = createVector(50, 20);
    for (let y = 1; y <= homeAmount; y++) {
        homes.push(new Home(10, y / (homeAmount + 1) * height, homeSize))
    }
    for (let y = 1; y <= workAmount; y++) {
        workplaces.push(new Workplace(width - 10 - workSize.x, y / (workAmount + 1) * height, workSize))
    }

    for (let h of homes) {
        let famAmount = floor(random(1, maxFamilySize));
        for (let i = 0; i < famAmount; i++) {
            agents.push(new Agent(h, random(workplaces)))
        }
    }
    for (let i = 0; i < 3; i++) {
        random(agents).infected = true;
    }
    NewChart();
}

function draw() {
    background(220);
    currentTime += deltaTime / 1000;
    if (currentTime > secondsInDay) {
        currentTime = 0;
        currentDay++;
        logSim();
        loggedWorkStart = false;
        loggedWorkEnd = false;
        //print("Day " + currentDay + " started.")
    }
    for (let h of homes) {
        h.show();
    }
    for (let w of workplaces) {
        w.show();
    }
    for (let a of agents) {
        a.tick();
        a.show();
    }
    LogDayTimer();
}

function infect(from, to) {
    if (from == to) {
        return;
    }
    if (from.infected && to.infected) {
        return;
    } // Both are already affected.
    if (!from.infected && !to.infected) {
        return;
    } // Neither have the virus.
    //line(from.pos.x, from.pos.y, to.pos.x, to.pos.y);
    if (from.infected && !to.immune) {
        if (to.susceptiblity > random()) {
            to.infected = true;
        }
    }
    if (to.infected && !from.immune) {
        if (from.susceptiblity > random()) {
            from.infected = true;
        }
    }
}
