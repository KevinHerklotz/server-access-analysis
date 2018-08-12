import log from '../dist/log.js';
import createPieChart from './createPieChart.js';

var colors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(64, 249, 255, 0.2)',
  'rgba(86, 255, 64, 0.2)',
  'rgba(179, 64, 255, 0.2)'
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
  // bar chart
}

const responseCodeDistribution = (log) => {
  createPieChart(log, ['response_code'], 'responseCodeChart', shuffleArray(colors));
}

const sizeDistribution = (log) => {
  // ??? chart
}

methodDistribution(log);
requestsPerMinute(log);
responseCodeDistribution(log);
sizeDistribution(log);
