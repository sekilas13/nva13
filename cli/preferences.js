module.exports = [
  {
    name: "email",
    type: "input",
    message: "Masukkan Email :",
    validate: (text) => {
      if (text) {
        const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(text);
        if (valid) return true;
        console.log("\nFormat email tidak valid !");
        return false;
      } else {
        console.log("Email harus diisi !");
        return false;
      }
    },
  },
  {
    name: "username",
    type: "input",
    message: "Masukkan nama :",
    validate: (text) => {
      if (text) {
        if (text.length < 6) {
          console.log("\nPanjang minimal nama harus 6 karakter");
          return false;
        } else {
          const valid = /^[a-zA-Z ]+$/.test(text);
          if (valid) return true;
          console.log("\nNama hanya boleh huruf kecil dan kapital !");
          return false;
        }
      } else {
        console.log("Nama harus diisi !");
        return false;
      }
    },
  },
  {
    name: "role",
    type: "list",
    message: "Pilih user access :",
    choices: ["admin", "guru", "siswa"],
  },
  {
    name: "password",
    type: "password",
    message: "Masukkan kata sandi :",
    validate: (pw) => {
      if (pw) {
        if (pw.length < 6) {
          console.log("Panjang minimal password harus 6 karakter");
          return false;
        }
        return true;
      } else {
        console.log("Kata sandi harus diisi !");
        return false;
      }
    },
  },
  {
    name: "kelas",
    type: "input",
    message: "Masukkan kelas jika role siswa tanpa titik dan koma :",
  },
  {
    name: "absen",
    type: "input",
    message: "Masukkan absen jika role siswa :",
  },
];
