let barLabel = [];
let barData = [];

$(function () {
  const ctxBar = $("#bar");
  const ctxDougnut = $("#doughnut");

  const barChart = new Chart(ctxBar, {
    type: "bar",
  });

  const doughnutChart = new Chart(ctxDougnut, {
    type: "doughnut",
  });
});
