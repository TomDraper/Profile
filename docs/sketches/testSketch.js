const labels = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

function getRandomColorString(id){
    let col = [id/12 * 255, id/12 * 255, id/12 * 255];
    return 'rgb(' + col[0] + col[1]+ col[2] + ')'
}

const data = {
    labels: labels, // X-Axis days.
    datasets: [
        {
            id: "Rolling Sum",
            label: "Rolling Sum",
            backgroundColor: getRandomColorString(0),
            borderColor: getRandomColorString(12),
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

const config = {
    type: 'bar',
    data: data,
    options: {}
};

function NewChart(){
    myChart = new Chart(
        document.getElementById('chartCanvas'),
        config
    );
}

function performRoll(){
    let r1 = floor(random(1, 7));
    let r2 = floor(random(1, 7));
    let sum = int(r1 + r2)-2;
    data.datasets[0].data[sum]++;
    myChart.update();
    
}


let canvasDiv;
let myChart;

function setup(){
    let canvas = createCanvas(400, 400);
    canvas.parent("canvasDiv");
    NewChart();
    //performRoll();
}

function draw(){
    performRoll();
    background(220);
    let arr = data.datasets[0].data.slice();
    let total = 0;
    for(let num of arr){
        total += num;
    }
    let y = 20;
    let x = 20;
    for(let tot of arr){
        text((tot / total * 100).toFixed(2), x, y);
        y+= 20;
    }
}