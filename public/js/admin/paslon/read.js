$(function () {
  $(".btn-delete").on("click", function () {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Ingin menghapus paslon !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        const _id = $(this).data("id");
        fetch("/admin/paslon/hapus/" + _id, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(({ error, refresh }) => {
            if (!error) {
              if (refresh) document.location.reload();
            }
          });
      }
    });
  });
});
