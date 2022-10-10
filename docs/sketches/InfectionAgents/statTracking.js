const labels = [
    'Days'
];
const data = {
    labels: labels, // X-Axis days.
    datasets: [
        {
            id: 0,
            label: "Infected",
            backgroundColor: 'rgb(255, 0, 0)',
            borderColor: 'rgb(255, 0, 0)',
            data: [0]
        },
        {
            id: 1,
            label: "Sum Infection",
            backgroundColor: 'rgb(0, 255, 0)',
            borderColor: 'rgb(0, 255, 0)',
            data: [0]
        },
        {
            id: 2,
            label: "Average Infection",
            backgroundColor: 'rgb(0, 0, 255)',
            borderColor: 'rgb(0, 0, 255)',
            data: [0]
        },
        {
            id: 3,
            label: "Quarantine",
            backgroundColor: 'rgb(0, 255, 255)',
            borderColor: 'rgb(0, 255, 255)',
            data: [0]
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

function NewChart(){
    myChart = new Chart(
        document.getElementById('chartCanvas'),
        config
    );
    logSim();
}

function logSim(){
    let sumSymptoms = 0;
    let infected = 0;
    let quarantine = 0;
    for (let a of agents) {
        if (a.infected) { infected++; }
        if (a.quarantine) { quarantine++; }
        sumSymptoms += max(0, a.symptomLevel);
    }
    let avgSymptoms = sumSymptoms / agents.length;
    data.labels.push(currentDay + " / " + currentTime.toFixed(0));
    for(let d of data.datasets){
        switch(d.id){
            case 0:
                d.data.push(infected)
                break;
            case 1:
                d.data.push(sumSymptoms)
                break;
            case 2:
                d.data.push(avgSymptoms);
                break;
            case 3:
                d.data.push(quarantine);
                break;
            default:
                console.log("Something went wrong!");
                break;
        }
    }
    myChart.update();
}


let canvasDiv;
let myChart;