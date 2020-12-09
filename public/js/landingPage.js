$(function () {
  $(".btn-vote").on("click", function () {
    const id = $(this).data("id");
    Swal.fire({
      title: "Data ID!",
      text: "Do you want to continue " + id,
      icon: "info",
      confirmButtonText: "Cool",
    });
  });
});
