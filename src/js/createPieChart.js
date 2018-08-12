/**
 * function that creates a pie chart
 *
 * @param {Array}  log            Array of JSON objects with log data
 * @param {Array}  valueToAnalyze Array of strings with keys to look at (for example ['request', 'method'] to analyze data of log.request.method)
 * @param {string} ElementID      HTML ID of the canvas it should be rendered to
 * @param {Array}  colors         Array of strings with css colors
 */
const createPieChart = (log, valueToAnalyze, ElementID, colors) => {
  const logValues = new Map();

  log.forEach((dataset) => {

    let logValue = dataset;
    valueToAnalyze.forEach((analyzeValue) => {
      logValue = logValue[analyzeValue];
    });

    if (logValue === '-') {
      logValue = 'Nicht definiert'
    }

    if (logValues.has(logValue)) {
      let currentVal = logValues.get(logValue);
      logValues.set(logValue, currentVal + 1);
    } else {
      logValues.set(logValue, 1);
    }
  });

  const logValueArray = Array.from(logValues.keys())
  const countArray = Array.from(logValues.values())

  // create actual pie chart
  new Chart(document.getElementById(ElementID), {
    type: 'pie',
    data: {
        labels: logValueArray,
        datasets: [{
            data: countArray,
            backgroundColor: colors,
        }]
    }
  });
}

export default createPieChart;
