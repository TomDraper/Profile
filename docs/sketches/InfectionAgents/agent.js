const walkingInfectRadius = 30;
const immunityCooldown = 10;
const recoverSpeed = 0.01;
const sicknessSpeed = 0.005;
const quarantineLevel = 0.3;

const AgentStates = {
    home: 0,
    travelToHome: 1,
    work: 2,
    travelToWork: 3,
    quarantine: 4
}




let loggedWorkStart = false;
let loggedWorkEnd = false;
function LogDayTimer(){
    if (currentTime >= workStart && currentTime <= workEnd && !loggedWorkStart){
        logSim();
        loggedWorkStart = true;
    }
    if (currentTime >= workEnd && !loggedWorkEnd){
        logSim();
        loggedWorkEnd = true;
    }
}

class Agent {
    constructor(home, work) {
        // The place this agent will return.
        this.home = home;
        this.home.family.push(this);
        this.homePos = createVector(
            random(this.home.pos.x, this.home.br.x),
            random(this.home.pos.y, this.home.br.y)
        )
        this.pos = createVector(
            random(this.homePos.x, this.homePos.x),
            random(this.homePos.y, this.homePos.y)
        );
        // The place this agent will leave to every day.
        this.work = work;
        this.work.employees.push(this);
        this.workPos = createVector(
            random(this.work.pos.x, this.work.br.x),
            random(this.work.pos.y, this.work.br.y)
        )
        // What is our current state ? Going to work, going home or quarantined (staying home)
        this.state = AgentStates.home;

        this.infected = false; // Whether the agent is currently infected.
        this.recovering = false; // Whether we should reduce our symptom level.
        this.quarantine = false; // Whether the agent is in quarantine.
        this.susceptiblity = 0.0001; // How susceptible an agent is. 1% == 0.01
        this.symptomLevel = 0;
        this.infectedTime = 0;
        this.immune = false;
        this.immuneTimer = 0;

        this.workStart = workStart; // 1 second for travel time -- Work starts at 9AM
        this.workEnd = workEnd; // Leave at 5:00pm
    }

    isWorkDay() {
        if (currentTime >= this.workStart && currentTime <= this.workEnd) {
            return true;
        }
        return false;
    }

    isAtWork() {
        if (dist(this.pos.x, this.pos.y, this.workPos.x, this.workPos.y) < agentSpeed) {
            return true;
        }
        return false;
    }
    isAtHome() {
        if (dist(this.pos.x, this.pos.y, this.homePos.x, this.homePos.y) < agentSpeed) {
            return true;
        }
        return false;
    }

    shouldQuarantine() {
        for (let a of this.home.family) {
            if (a.symptomLevel >= quarantineLevel) {
                return true;
            }
        }
        return false;
    }

    tick() {
        if (this.immune) {
            this.immuneTimer += deltaTime / 1000;
            if (this.immuneTimer >= immunityCooldown) {
                this.immune = false;
            }
        }
        if (this.infected) {
            if (this.recovering) {
                this.symptomLevel -= recoverSpeed * (deltaTime / 1000);
                if (this.symptomLevel <= 0) {
                    this.infected = false;
                    this.recovering = false;
                    this.immune = true;
                    this.immuneTimer = 0;
                }
            } else {
                this.symptomLevel += sicknessSpeed * (deltaTime / 1000);
                if (this.symptomLevel >= 1.) {
                    this.recovering = true;
                }
            }
        }
        this.quarantine = this.shouldQuarantine();
        if (this.quarantine) {
            this.homeTick();
            return;
        }
        this.isWorkDay() ? this.workTick() : this.homeTick();
    }

    workTick() {
        if (this.isAtWork()) {
            // We are within range of our work position.
            for (let other of this.work.employees) {
                if (other.isAtWork()) { // If they are also at work.
                    infect(this, other);
                }
            }
            return;
        }
        let dir = p5.Vector.sub(this.workPos, this.pos);
        //dir.normalize();
        dir.setMag(agentSpeed);
        this.pos.add(dir);

        for (let other of agents) {
            if (!other.isAtWork() && !other.isAtHome()) {
                // They are not at work and not at home.
                if (other == this) {
                    continue;
                } // self.
                if (dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < walkingInfectRadius) {
                    infect(this, other);
                }
            }
        }
    }

    homeTick() {
        if (this.isAtHome()) {
            // We are within range of our home position.
            for (let other of this.home.family) {
                if (other.isAtHome()) { // If they are also at home.
                    infect(this, other);
                }
            }
            return;
        }
        let dir = p5.Vector.sub(this.homePos, this.pos);
        dir.setMag(agentSpeed);
        //dir.normalize();
        this.pos.add(dir);
        for (let other of agents) {
            if (!other.isAtWork() && !other.isAtHome()) {
                // They are not at work and not at home.
                if (other == this) {
                    continue;
                } // self.
                if (dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < walkingInfectRadius) {
                    infect(this, other);
                }
            }
        }
    }

    show() {
        push();
        if (this.infected) {
            fill(255 * this.symptomLevel, 0, 0)
        }
        if (this.quarantine) {
            fill(255 * this.symptomLevel, 255, 0)
        }
        if (this.immune) {
            fill(0, 0, 255)
        }
        //line(this.homePos.x, this.homePos.y, this.workPos.x, this.workPos.y)
        ellipse(this.pos.x, this.pos.y, 5);
        pop();
    }
}