import logArray from '../dist/log.js'; // eslint-disable-line
import createPieChart from './createPieChart.js';

const colors = [
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(14, 72, 100, 0.5)',
  'rgba(255, 0, 255, 0.5)',
  'rgba(153, 72, 255, 0.5)',
  'rgba(255, 159, 64, 0.5)',
  'rgba(64, 249, 255, 0.5)',
  'rgba(86, 255, 64, 0.5)',
];


const methodDistribution = (log) => {
  createPieChart(log, ['request', 'method'], 'methodChart', colors);
};

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

    // if this hour doesn't exist in the object, add it
    if (!(hour in requestsPerMinuteObject)) {
      requestsPerMinuteObject[hour] = {};
    }

    let currentCount = 1;
    // if count for certain minute already exists, increase by 1
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
    Object.entries(minutesObject).forEach(([minute, count]) => { // eslint-disable-line no-unused-vars
      minutesAmount += 1;
      requestsWithinHour += count;
    });

    let averageRequests = requestsWithinHour / minutesAmount;
    averageRequests = Math.round(averageRequests * 10) / 10;

    timeArray.push(`${hour} Uhr`);
    averageRequestsArray.push(averageRequests);
  });

  // create actual bar chart
  new Chart(document.getElementById('requestsPerMinuteChart'), {
    type: 'bar',
    data: {
      labels: timeArray,
      datasets: [{
        data: averageRequestsArray,
        backgroundColor: 'rgba(14,72,100,0.5)',
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
            labelString: 'Requests pro Minute',
          },
        }],
      },
    },
  });
};

const responseCodeDistribution = (log) => {
  createPieChart(log, ['response_code'], 'responseCodeChart', colors.reverse());
};

const sizeDistribution = (log, stepsInByte) => {
  // line chart
  const matchingRequests = log.filter((dataset) => {
    return dataset.response_code === '200' && dataset.document_size < 1000;
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
    const position = Math.floor(dataset.document_size / stepsInByte);
    zoneCounting[position] += 1;
  });


  // create actual line chart
  new Chart(document.getElementById('documentSizeChart'), {
    type: 'line',
    data: {
      labels: zoningArray,
      datasets: [{
        data: zoneCounting,
        backgroundColor: 'rgba(142,72,100,0.5)',
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
            labelString: 'Anzahl',
          },
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Bytes',
          },
        }],
      },
    },
  });
};

methodDistribution(logArray);
requestsPerMinute(logArray);
responseCodeDistribution(logArray);
sizeDistribution(logArray, 50);
