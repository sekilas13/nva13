<p align="center">
  <a href="https://github.com/sekilas13/rva13"><img width="150" height="150" src="./asset/kir.png"><img width="150" height="150" src="./asset/logo.png"></a>
</p>

<h2 align="center">NVA 13</h2>
<h2 align="center">Node Voting App 13</h2>

---

Halo, ini adalah aplikasi yang bernama [NVA 13](https://github.com/sekilas13/rva13) yang memiliki kepanjangan `Node Voting App 13`. Aplikasi ini dibuat untuk voting langsung ditempat menggunakan komputer. Aplikasi voting ini merupakan aplikasi _real time vote app_ karena pada saat user memilih siapa yang dia pilih, admin akan mendapatkan data secara langsung tanpa susah lagi merefresh halaman.
<br /><br />

## Prerequisites

Anda butuh

- Node.js Dan NPM
- MongoDB untuk menyimpan data

## Pemakaian

### Menginstall package

Anda ke root directory project dan menjalankan

```sh
node install
```

### Menjalankan Aplikasinya

> Mohon maaf jika ini adalah cara yang tidak efisien. Hal ini akan segera diperbaiki di masa mendatang.

> :warning: **Pastikan** MongoDB sudah berjalan dengan benar.

Lakukan di dua command line yang berbeda.

```sh
# masuk ke direktori server
npm run dev
```

```sh
# masuk ke directory client
npm start
```

Anda bisa membukanya di http://localhost:4000

## Dibuat dengan

- [Node.js](https://nodejs.org/en/) - Software untuk backend
- [MongoDB](https://www.mongodb.com/) - Database penyimpanan data
- [ExpressJS](https://expressjs.com/) - Web framework untuk backend
- [React.js](https://reactjs.org/) - Web framework untuk Frontend
- [Bootstrap](https://getbootstrap.com/) - Web framework frontend untuk memperindah tampilan
- [Socket.io](https://socket.io/) - Library Real Time Websocket
