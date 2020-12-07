const required = "Bidang ini harus diisi !";

$(function () {
  $("#form-login").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      pw: {
        required: true,
        minlength: 5,
      },
    },
    messages: {
      email: {
        required,
        email: "Bidang ini harus berupa format email yang valid !",
      },
      pw: {
        required,
        minlength: "Kata sandi minimal memiliki panjang 5 digit !",
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
