$(function () {
  const socket = io();
  const badgeStatus = $("#socket-status");
  const log = $("#logger");
  const holder = $("#placeholder");

  const removeHolder = () => {
    if (holder.length == 1) {
      holder.remove();
      log.addClass("list-group-flush text-center");
    }
  };

  socket.on("admin:new user", (data) => {
    removeHolder();

    const time = JamLengkap(data.time);

    log.append(`
      <li class="list-group-item">Pemilih baru | ${time}</li>
    `);
  });

  socket.on("admin:upvote", (data) => {
    removeHolder();
  });

  socket.on("connect", () => {
    if (socket.connected) {
      badgeStatus
        .removeAttr("class")
        .addClass("badge badge-pill badge-success")
        .html("Terhubung");
    }
  });

  socket.on("disconnect", () => {
    if (!socket.connected) {
      badgeStatus
        .removeAttr("class")
        .addClass("badge badge-pill badge-danger")
        .html("Terputus");
    }
  });
});

function JamLengkap(date) {
  const time = new Date(date);

  const jam = updateTime(time.getHours());
  const menit = updateTime(time.getMinutes());
  const detik = updateTime(time.getSeconds());

  return `${jam}:${menit}:${detik}`;
}

const updateTime = (t) => (t < 10 ? "0" + t : t);
