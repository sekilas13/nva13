const required = "Bidang ini harus diisi !";

$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    var re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
  },
  "Please check your input."
);

$(function () {
  $("#form-daftar").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      username: {
        required: true,
        regex: /^[a-zA-Z\s\-]+$/,
      },
      password: {
        minlength: 5,
      },
      passwordconf: {
        minlength: 5,
        equalTo: "#password",
      },
    },
    messages: {
      email: {
        required,
        email: "Bidang ini harus berupa format email yang valid !",
      },
      username: {
        required,
        regex: "Nama harus berupa huruf kecil atau kapital !",
      },
      password: {
        required,
        minlength: "Kata sandi minimal memiliki panjang 5 digit !",
      },
      passwordconf: {
        required,
        minlength: "Kata sandi minimal memiliki panjang 5 digit !",
        equalTo: "Kata sandi tidak sama !",
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
