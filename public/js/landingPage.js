$(function () {
  $(".btn-vote").on("click", function () {
    Swal.fire({
      title: "Error!",
      text: "Do you want to continue",
      icon: "error",
      confirmButtonText: "Cool",
    });
  });
});
