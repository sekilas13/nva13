import Swal from "sweetalert2";

const Login = {
  title: (
    <div>
      <h2>Loading</h2>
    </div>
  ),
  allowEscapeKey: false,
  showConfirmButton: false,
  allowOutsideClick: false,
  allowEnterKey: false,
  width: "15rem",
};

const Logout = {
  title: "Apakah anda yakin?",
  text: "Anda akan logout dan kehilangan sesi login anda!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  cancelButtonText: "Batal",
  confirmButtonText: "Ya, Logout saja",
};

const Hapus = {
  title: "Apakah anda yakin?",
  text: "Ingin menghapus siswa !",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  cancelButtonText: "Batal",
  confirmButtonText: "Ya",
};

const Toaster = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
};

const forExport = { Login, Logout, Toaster, Hapus };

export default forExport;
