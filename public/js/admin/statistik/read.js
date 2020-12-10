let barChart;
let doughnutChart;

let barDatasets = [];

$(function () {
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

        doughnutChart = new Chart(ctxDougnut, {
          type: "doughnut",
          data: {
            labels: data.map(({ ketua, wakil }) => ketua + " - " + wakil),
            datasets: [
              {
                data: data.map(({ memilih }) => memilih),
                label: data.map(({ ketua, wakil }) => ketua + " - " + wakil),
                backgroundColor: data.map(({ color }) => color),
                id: data.map(({ _id }) => _id),
              },
            ],
          },
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
