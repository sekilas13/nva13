$(function () {
  const socket = io();
  const badgeStatus = $("#socket-status");

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
