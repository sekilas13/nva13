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
            if (result.success) socket.emit("vote", { _id });
          });
      }
    });
  });
});
