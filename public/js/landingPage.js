const socket = io();

$(function () {
  socket.on("connect", () => socket.emit("new user", { time: new Date() }));

  $(".btn-vote").on("click", function () {
    $(this).trigger("blur");
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Ingin memilih paslon ini !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya",
    }).then(({ isConfirmed }) => {
      if (socket.connected) {
        if (isConfirmed) {
          const _id = $(this).data("id");
          fetch("/vote/upvote", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id }),
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.success)
                socket.emit("vote", { _id, time: new Date() });
            });
        }
      } else {
        Swal.fire({
          title: "Error",
          text:
            "Koneksi soket saat ini sedang tidak terhubung, beritahu admin tentang masalah ini.",
          icon: "error",
          allowEscapeKey: false,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEnterKey: false,
        });
      }
    });
  });
});
