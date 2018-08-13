import log from '../dist/log.js';
import createPieChart from './createPieChart.js';

var colors = [
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(14, 72, 100, 0.5)',
  'rgba(153, 72, 255, 0.5)',
  'rgba(255, 159, 64, 0.5)',
  'rgba(64, 249, 255, 0.5)',
  'rgba(86, 255, 64, 0.5)',
  'rgba(255, 0, 255, 0.5)',
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const methodDistribution = (log) => {
  createPieChart(log, ['request', 'method'], 'methodChart', shuffleArray(colors));
}

const requestsPerMinute = (log) => {
  // requestsPerMinuteObject will look like this
  // {
  //   22: { // hour 23
  //     01: 14, // minute: amount of requests
  //     02: 35 ,
  //     ...
  //   },
  //   23: {...
  //   }
  // }
  const requestsPerMinuteObject = {};

  log.forEach((dataset) => {
    let hour = dataset.datetime.hour;
    // remove leading zero for sorting reasons
    if (hour[0] === '0') {
      hour = hour[1];
    }
    const minute = dataset.datetime.minute;

    //
    if (!(hour in requestsPerMinuteObject)) {
      requestsPerMinuteObject[hour] = {}
    }

    let currentCount = 1;
    if (minute in requestsPerMinuteObject[hour]) {
      currentCount = requestsPerMinuteObject[hour][minute] + 1;
    }

    requestsPerMinuteObject[hour][minute] = currentCount;
  });

  const timeArray = [];
  const averageRequestsArray = [];

  Object.entries(requestsPerMinuteObject).forEach(([hour, minutesObject]) => {
    // there are not alway 60 logged minutes per hour
    let minutesAmount = 0;
    let requestsWithinHour = 0;
    Object.entries(minutesObject).forEach(([minute, count]) => {
      minutesAmount++;
      requestsWithinHour += count;
    });

    let averageRequests = requestsWithinHour/minutesAmount;
    averageRequests = Math.round( averageRequests * 10 ) / 10

    timeArray.push(`${hour} Uhr`);
    averageRequestsArray.push(averageRequests);
  });

  console.log(timeArray);
  console.log(averageRequestsArray);

  // create actual pie chart
  new Chart(document.getElementById('requestsPerMinuteChart'), {
    type: 'bar',
    data: {
      labels: timeArray,
      datasets: [{
        data: averageRequestsArray,
        backgroundColor: "rgba(14,72,100,0.5)",
      }],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Requests pro Minute'
          }
        }]
      }
    }
  });
}

const responseCodeDistribution = (log) => {
  createPieChart(log, ['response_code'], 'responseCodeChart', shuffleArray(colors));
}

const sizeDistribution = (log, stepsInByte) => {
  // line chart
  const matchingRequests = log.filter((dataset) => {
    return dataset.response_code === '200' && dataset.document_size < 1000
  });

  // create array like ['0 - 50', '50 - 100', ..., '950 - 1000']
  const zoningArray = [];
  // create array like [0, 0, 0, ..., 0, 0]
  const zoneCounting = [];
  for (let i = 0; i < 1000; i += stepsInByte) {
    zoningArray.push(`${i} - ${i + stepsInByte}`);
    zoneCounting.push(0);
  }

  // count amount of requests for each 'zone'
  matchingRequests.forEach((dataset) => {
    let position = Math.floor(dataset.document_size / stepsInByte);
    zoneCounting[position] += 1;
  });


  // create actual line chart
  new Chart(document.getElementById('documentSizeChart'), {
    type: 'line',
    data: {
      labels: zoningArray,
      datasets: [{
        data: zoneCounting,
        backgroundColor: "rgba(142,72,100,0.5)",
      }],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Anzahl'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Bytes'
          }
        }]
      }
    }
  });
}

methodDistribution(log);
requestsPerMinute(log);
responseCodeDistribution(log);
sizeDistribution(log, 50);
