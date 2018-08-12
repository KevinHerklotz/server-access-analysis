import log from '../dist/log.js';
import createPieChart from './createPieChart.js';

const methodDistribution = (log) => {
  createPieChart(log, ['request', 'method'], 'methodChart');
}

const requestsPerMinute = (log) => {
  // bar chart
}

const responseCodeDistribution = (log) => {
  createPieChart(log, ['response_code'], 'responseCodeChart');
}

const sizeDistribution = (log) => {
  // ??? chart
}

methodDistribution(log);
requestsPerMinute(log);
responseCodeDistribution(log);
sizeDistribution(log);
