# Tucil3-Path-Planning

Tugas Kecil 3 IF2211 Strategi Algoritma Semester II Tahun 2022/2023 Implementasi Algoritma UCS dan A\* untuk Menentukan Lintasan Terpendek

## Daftar Isi

-   [Deskripsi Program](#deskripsi-program)
-   [Struktur Program](#struktur-program)
-   [Requirement Program](#requirement-program)
-   [Setup Program](#setup-program)
-   [Menjalankan Program](#menjalankan-program)
-   [Struktur Input File](#struktur-imput-file)
-   [Authors](#authors)

## Deskripsi Program

Program Tucil3-Path-Planning merupakan program Implementasi Implementasi Algoritma UCS dan A\* untuk Menentukan Lintasan Terpendek. Program akan menentukan lintasan terpendek berdasarkan peta Google Map jalan-jalan di kota Bandung. Dari ruas-ruas jalan di peta dibentuk graf. f. Simpul menyatakan persilangan jalan (simpang 3, 4 atau 5) atau ujung jalan. Asumsikan jalan dapat dilalui dari dua arah. Bobot graf menyatakan jarak (m atau km) antar simpul. Jarak antar dua simpul dapat dihitung dari koordinat kedua simpul menggunakan rumus jarak Euclidean (berdasarkan koordinat). Program ini berbasis Website, program terdiri dari Backend dengan Framework Gin dengan Bahasa Pemrogramman Go (Golang). Frontend dengan Framework Angular JS dengan bahasa pemrograman TypeScript dan bantuan API OpenLayers.

## Struktur Program

    .
    │   README.md
    │
    │
    ├───src
    │   ├───Backend
    │   │   │   go.mod
    │   │   │   go.sum
    │   │   │   main.go
    │   │   │
    │   │   ├───Controller
    │   │   │       Controller.go
    │   │   │
    │   │   └───Model
    │   │           Algorithm.go
    │   │           Graph.go
    │   │           IO.go
    │   │           Node.go
    │   │           PrioQueue.go
    │   │
    │   └───Frontend
    │       └───PathPlanning
    │           │
    │           └───src
    │               │   favicon.ico
    │               │   index.html
    │               │   main.ts
    │               │   styles.css
    │               │
    │               ├───app
    │                   │   app-routing.module.ts
    │                   │   app.component.css
    │                   │   app.component.html
    │                   │   app.component.spec.ts
    │                   │   app.component.ts
    │                   │   app.module.ts
    │                   │
    │                   └───main
    │                           main.component.css
    │                           main.component.html
    │                           main.component.spec.ts
    │                           main.component.ts
    │
    └───test
            Alun-Alun.json
            Buahbatu.json
            invalidInput.json
            sekitarDago.json
            UGMmaszeh.json

## Requirement Program

1. Go (Gin Gonic)
2. npm
3. Angular JS
4. Browser

## Setup Program

Untuk setup Program, ikuti langkah-langkah berikut :

1. Lakukan `git clone` terhadap repository ini
2. Buka directory `\Tucil3-Path-Planning\src\Backend\`
3. Jalankan file main.go dengan perintah `go run main.go` untuk mengaktifkan Backend
4. Setelah backend aktif, buka directory `\Tucil3-Path-Planning\src\Frontend\PathPlanning\`
5. Sebelum menjalankan Frontend, install dependencies yang dibutuhkan dengan perintah `npm install`, `npm install ol`, atau `npm install all dependencies`
6. Jika dependencies sudah lengkap, jalankan frontend dengan perintah `npm run start`

## Menjalankan Program

Untuk menjalankan program, pastikan setup program sudah berhasil. Berikut adalah Cara menjalankan program:

1. Masukkan file input/testcase dengan menakan button `Choose File`. Pastikan [isi dan format file](#struktur-input-file) sudah tepat
2. Masukan Input Titik Awal dan Tujuan seusai dengan id yang ada pada file input
3. Pilih Algoritma yang akan digunakan untuk mencari rute terpendek
4. Tekan Button `Submit` untuk mendapatkan hasil pencarian rute terpendek dari Titik Awal ke Titik Tujuan dan Jaraknya, serta Visualisai Graf Pada peta
5. Jika ingin melihat rute terpendek pada peta, tekan button `Route` untuk mendapatkan rute pada peta dengan warna hijau. Sebelum menekan button `Route` pastikan Graf sudah muncul pada peta!.

## Struktur Input File

Pada program yang dikambangkan, input file atau testcase yang digunakan berupa file JSON. Berikut adalah Contohnya :

    {
        "nodes": [
            {
                "id": 0,
                "name": "nama-titik",
                "coor": [lat, lon]
            },
            {
                "id": 1,
                "name": "nama-titik1",
                "coor": [lat, lon]
            }....

            // Berisi informasi tiap Node, Tiap node harus memiliki id yang berurutan mulai dari nol
        ],

        "mat": [
            [0, 1],
            [1, 0]
        ]
        // Matriks Ketetanggaan n x n, ukuran sisi matrix sesuai dengan jumlah nodes

    }

## Authors

| Nama                        | NIM      |
| --------------------------- | -------- |
| Rizky Abdillah Rasyid       | 13521109 |
| Muhammad Abdul Aziz Ghazali | 13521128 |
