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

  // for each JSON object
  log.forEach((dataset) => {

    let logValue = dataset;
    // get the actual value that should be analyzed and store it into logValue
    valueToAnalyze.forEach((analyzeValue) => {
      logValue = logValue[analyzeValue];
    });

    if (logValue === '-') {
      logValue = 'Nicht definiert'
    }

    if (logValues.has(logValue)) {
      // increment count
      let currentVal = logValues.get(logValue);
      logValues.set(logValue, currentVal + 1);
    } else {
      // set new value with count of 1
      logValues.set(logValue, 1);
    }
  });

  // const logValueArray = Array.from(logValues);
  // const countArray = Array.from(logValues.values());

  const logValueArray = [];
  const countArray = [];
  logValues.forEach((value, key) => {
    logValueArray.push(`${key}: ${value}`);
    countArray.push(value);
  });

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
