$(function () {
  $("#gambarPaslon").on("change", function () {
    const fileName = $(this).val().replace(/^.*\\/, "");
    $(this).next(".custom-file-label").html(fileName);
  });
});
