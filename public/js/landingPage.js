const socket = io();

$(function () {
  $(".btn-vote").on("click", function () {
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
      if (isConfirmed) {
        const _id = $(this).data("id");
        socket.emit("vote", { _id });
      }
    });
  });
});
