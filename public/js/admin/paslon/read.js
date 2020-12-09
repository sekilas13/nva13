$(function () {
  $(".btn-delete").on("click", function () {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Ingin menghapus siswa !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        const _id = $(this).data("id");
        console.log(_id);
      }
    });
  });
});
