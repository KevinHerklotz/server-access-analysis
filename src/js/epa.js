import log from '../dist/log.js';


const methodDistribution = (log) => {
  const methods = new Map();

  log.forEach((dataset) => {
    const method = dataset.request.method;

    method === "cons/circle_logo_small.gif" ? console.log(dataset) : null;

    if (methods.has(method)) {
      let currentVal = methods.get(method);
      methods.set(method, currentVal + 1);
    } else {
      methods.set(method, 1);
    }
  });

  console.log(methods);
  const methodArray = Array.from(methods.keys())
  const countArray = Array.from(methods.values())

  // pie chart
  const ctx = document.getElementById("methodChart");
  new Chart(ctx, {
    type: 'pie',
    data: {
        labels: methodArray,
        datasets: [{
            data: countArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ]
        }]
    }
  });

}

const requestsPerMinute = (log) => {
  // bar chart
}

const responseCodeDistribution = (log) => {
  // pie chart

}

const sizeDistribution = (log) => {
  // ??? chart

}

methodDistribution(log);
