$(function () {
  const socket = io();

  let barChart;
  let doughnutChart;

  let barDatasets = [];
  let doughnutDataset = {};

  const ctxBar = $("#bar");
  const ctxDougnut = $("#doughnut");

  fetch("/admin/statistik/info")
    .then((response) => response.json())
    .then(({ data }) => {
      if (data.length > 0) {
        barChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: data.map(({ ketua, wakil }) => ketua + " - " + wakil),
            datasets: barDatasets,
          },
        });

        doughnutDataset = {
          data: data.map(({ memilih }) => memilih),
          label: data.map(({ ketua, wakil }) => ketua + " - " + wakil),
          backgroundColor: data.map(({ color }) => color),
          id: data.map(({ _id }) => _id),
        };

        doughnutChart = new Chart(ctxDougnut, {
          type: "doughnut",
          data: {
            labels: data.map(({ ketua, wakil }) => ketua + " - " + wakil),
            datasets: [doughnutDataset],
          },
        });

        socket.on("admin:upvote", ({ _id }) => {
          const index = doughnutDataset.id.indexOf(_id);
          doughnutDataset.data[index] += 1;
          doughnutChart.update();
        });
      } else {
        const colBar = ctxBar.parent();
        colBar.html(`
            <h2 class="text-center mt-2">Tidak ada data paslon</h2>
        `);

        const colDougnut = ctxDougnut.parent();
        colDougnut.html(`
            <h2 class="text-center mt-2">Silahkan tambah terlebih dahulu</h2>
        `);
      }
    });
});
