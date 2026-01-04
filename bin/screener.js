let epsChart, fcfChart;
let fundamentals = {};

async function loadFundamentals() {
  const response = await fetch("../data/fundamentals.json");
  fundamentals = await response.json();
}

function renderCharts(ticker) {
  const company = fundamentals[ticker];
  if (!company) return alert(`No data for ${ticker}`);

  const years = company.eps.map(d => d.year);
  const epsValues = company.eps.map(d => d.value);
  const fcfValues = company.fcf_growth.map(d => d.value);

  // Show both charts
  document.querySelectorAll(".chart-wrapper").forEach(wrapper => wrapper.style.display = "block");

  // EPS chart
  if (epsChart) epsChart.destroy();
  epsChart = new Chart(document.getElementById("epsChart"), {
    type: "line",
    data: {
      labels: years,
      datasets: [{
        label: `EPS (${ticker})`,
        data: epsValues,
        borderColor: "#4285f4",
        backgroundColor: "rgba(66,133,244,0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // FCF Growth chart
  if (fcfChart) fcfChart.destroy();
  fcfChart = new Chart(document.getElementById("fcfChart"), {
    type: "line", // same type as EPS
    data: {
      labels: years,
      datasets: [{
        label: `FCF/Share Growth (${ticker})`,
        data: fcfValues,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76,175,80,0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

document.getElementById("searchButton").addEventListener("click", () => {
  const ticker = document.getElementById("ticker").value.trim().toUpperCase();
  if (ticker) renderCharts(ticker);
});

loadFundamentals();
