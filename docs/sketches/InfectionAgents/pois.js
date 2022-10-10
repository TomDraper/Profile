const homeColor = [255, 0, 0];
const workColor = [0, 0, 255];

// Place an agent will return to after their work day.
// Homes can get quarantined meaning no one in that house will leave for work until everyone is 
// symptomless.
// Agents within a homes boundaries cannot be affected by anything outside the home.

class Home {
    constructor(x, y, dims) {
        this.pos = createVector(x, y);
        this.dims = dims.copy();
        // Useful for checking if an agent is home.
        this.br = createVector(x + this.dims.x, y + this.dims.y);
        this.family = [];
    }

    show() {
        push();
        fill(homeColor[0], homeColor[1], homeColor[2])
        rect(this.pos.x, this.pos.y, this.dims.x, this.dims.y);
        pop();
    }
}

// Agents within a workplace boundary cannot be affected by anything outside the workplace.
class Workplace {
    constructor(x, y, dims) {
        this.pos = createVector(x, y);
        this.dims = dims.copy();
        // Useful for checking if an agent is home.
        this.br = createVector(x + this.dims.x, y + this.dims.y);
        this.employees = [];
    }

    show() {
        push();
        fill(workColor[0], workColor[1], workColor[2])
        rect(this.pos.x, this.pos.y, this.dims.x, this.dims.y);
        pop();
    }
}
