let barChart;
let doughnutChart;

$(function () {
  const ctxBar = $("#bar");
  const ctxDougnut = $("#doughnut");

  fetch("/admin/statistik/info")
    .then((response) => response.json())
    .then(({ data }) => {
      barChart = new Chart(ctxBar, {
        type: "bar",
        data: {
          labels: data.map(({ ketua, wakil }) => ketua + " - " + wakil),
        },
      });

      doughnutChart = new Chart(ctxDougnut, {
        type: "doughnut",
        data: {
          labels: data.map(({ ketua, wakil }) => ketua + " - " + wakil),
        },
      });
    });
});
