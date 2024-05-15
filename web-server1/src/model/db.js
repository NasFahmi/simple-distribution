const mysql = require('mysql');

// Konfigurasi untuk koneksi ke database pertama
const db_read = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'distribusi',
    port: 3306
};

// Konfigurasi untuk koneksi ke database kedua
const db_write = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'distribusi',
    port: 3307
};

// Membuat koneksi ke database pertama
const dbReadConnection = mysql.createConnection(db_read);

// Membuat koneksi ke database kedua
const dbWriteConnection = mysql.createConnection(db_write);

// Menghubungkan ke database pertama
dbReadConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to database read:', err);
        return;
    }
    console.log('Connected to database read!');
});

// Menghubungkan ke database kedua
dbWriteConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to database write:', err);
        return;
    }
    console.log('Connected to database write!');
});

module.exports= {
    dbReadConnection,
    dbWriteConnection
};