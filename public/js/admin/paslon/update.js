const required = "Bidang ini harus diisi !";
const minLength = "Nama minimal harus memiliki panjang 3 kata !";

$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    var re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
  },
  "Please check your input."
);

$(function () {
  $("#paslon-update").validate({
    rules: {
      nameKetua: {
        required: true,
        minLength: 3,
        regex: /^[a-zA-Z\s\-]+$/,
      },
      nameWaketu: {
        required: true,
        minLength: 3,
        regex: /^[a-zA-Z\s\-]+$/,
      },
    },
    messages: {
      nameKetua: {
        required,
        regex: "Nama harus berupa huruf kecil atau kapital !",
      },
      nameWaketu: {
        required,
        regex: "Nama harus berupa huruf kecil atau kapital !",
      },
    },
    submitHandler: function (form) {
      form.submit();
    },
    errorPlacement: function (label, element) {
      label.addClass("invalid-feedback");
      label.insertAfter(element);
    },
  });
});
