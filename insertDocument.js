// Mengimport modul MongoClient dan ObjectId dari 'mongodb'.
const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://127.0.0.1:27017"; // Mendefinisikan URL MongoDB server yang akan digunakan untuk koneksi.
const client = new MongoClient(url); // Membuat instance MongoClient dengan URL koneksi yang telah didefinisikan sebelumnya.
const namaDatabase = "task-manager"; // Mendefinisikan nama database yang akan digunakan.
const id = new ObjectId(); // Membuat instance ObjectId baru. ObjectId digunakan untuk menghasilkan unik identifier untuk dokumen MongoDB.

//BAGIAN INI MENCETAK INFORMASI DARI ObjectID()
console.log(id); // Mencetak ObjectId yang baru dibuat ke konsol.
console.log(id.id); // Mencetak representasi hexadecimal dari ObjectId ke konsol.
console.log(id.id.length); // Mencetak panjang (jumlah karakter) dari representasi hexadecimal ObjectId ke konsol.
console.log(id.getTimestamp()); // Mencetak timestamp yang terkait dengan ObjectId ke konsol. Kode ini akan memberikan data waktu kapan ObjectId tersebut dibuat.

// Mencetak panjang dari representasi ObjectId dalam bentuk string
console.log(id.toHexString().length);

// BAGIAN INI ADALAH FUNGSI UTAMA YANG BERJALAN SECARA ASYNCHRONOUS
// Mendefinisikan fungsi async 'main' untuk melakukan operasi-operasi terkait MongoDB.
async function main() {
  try {
    await client.connect(); // Menggunakan 'await' untuk menghubungkan ke server MongoDB.
    console.log("Berhasil terhubung ke MongoDB database server"); //BAGIAN INI TERKAIT KONEKSI KE DATABASE DAN MEMASUKAN DATA

    const db = client.db(namaDatabase); // Memilih database dengan nama 'task-manager' yang telah didefinisikan sebelumnya.
    const clPengguna = db.collection("pengguna"); // Memilih koleksi 'pengguna' di dalam database.
    const clTugas = db.collection("tugas"); // Memilih koleksi 'tugas' di dalam database.

    // MEMASUKAN SATU DATA (DOKUMEN)
    // Memasukkan dokumen ke dalam koleksi 'pengguna'.
    // Memasukkan satu dokumen ke dalam koleksi 'pengguna' secara terpisah dengan _id yang berbeda.
    const insertPengguna1 = await clPengguna.insertOne({
      _id: new ObjectId(),
      nama: "Mubarakh",
      usia: 25,
    });

    const insertPengguna2 = await clPengguna.insertOne({
      _id: new ObjectId(),
      nama: "Hayatna",
      usia: 21,
    });

    const insertPengguna3 = await clPengguna.insertOne({
      _id: new ObjectId(),
      nama: "Khairy",
      usia: 23,
    });

    console.log(
      "Memasukkan data Pengguna ke koleksi =>",
      insertPengguna1,
      insertPengguna2,
      insertPengguna3
    );

    // MEMASUKAN BANYAK DATA (DOKUMEN)
    // Memasukkan beberapa dokumen ke dalam koleksi 'tugas'.
    const insertTugas = await clTugas.insertMany([
      {
        Deskripsi: "Membersihkan rumah",
        StatusPenyelesaian: true,
      },
      {
        Deskripsi: "Mengerjakan tugas kuliah",
        StatusPenyelesaian: false,
      },
      {
        Deskripsi: "Memberikan bimbingan",
        StatusPenyelesaian: false,
      },
    ]);
    console.log("Memasukkan data Tugas ke koleksi =>", insertTugas);

    // Mengembalikan pesan sukses setelah operasi selesai.
    return "Data selesai dimasukkan.";

    // BAGIAN INI MENANGANI ERROR
  } catch (err) {
    console.error(err); // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol.
  } finally {
    client.close(); // Selalu menutup koneksi ke server MongoDB setelah operasi selesai, baik sukses maupun gagal.
  }
}

main().then(console.log).catch(console.error); // Memanggil fungsi 'main' dan menangani hasilnya menggunakan 'then' dan 'catch' untuk mencetak hasil atau pesan kesalahan ke konsol.
