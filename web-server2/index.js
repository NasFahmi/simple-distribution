// Import module Express.js
const express = require('express');

// Buat instance aplikasi Express
const app = express();

// Definisikan rute utama
app.get('/', (req, res) => {
    res.send('Hello, world! from node 2');
});

// Tentukan port yang akan digunakan untuk server
const port = 3000 ;

// Mulai server Express pada port tertentu
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
