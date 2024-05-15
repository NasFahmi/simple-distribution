// Import module Express.js
const express = require('express');
const cors = require('cors'); // Import cors module
const postRouter = require('./src/routes/post.route')
// Buat instance aplikasi Express
const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json()); // Use express.json() middleware

// Gunakan router post setelah middleware telah didefinisikan
app.use('/posts', postRouter);

// Definisikan rute utama
app.get('/', (req, res) => {
    res.send('Hello, world! from node 1');
});

// Tentukan port yang akan digunakan untuk server
const port = 3000 ;

// Mulai server Express pada port tertentu
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
