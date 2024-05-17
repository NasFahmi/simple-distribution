const mysql = require('mysql');

// Konfigurasi untuk koneksi ke database pertama
const db_read = {
    host: '172.25.110.31',
    user: 'root',
    password: '1234',
    database: 'distribusi',
    port: 3306
};

// Konfigurasi untuk koneksi ke database kedua
const db_write = {
    host: '172.25.110.32',
    user: 'root',
    password: '1234',
    database: 'distribusi',
    port: 3306
};
// Konfigurasi untuk koneksi ke database kedua


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