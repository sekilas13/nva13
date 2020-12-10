$(function () {
  const socket = io();
  const badgeStatus = $("#socket-status");
  const log = $("#logger");
  const holder = $("#placeholder");

  const removeHolder = () => {
    if (holder.length == 1) {
      holder.remove();
      log.addClass("list-group-flush");
    }
  };

  socket.on("admin:new user", (data) => {
    removeHolder();
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
