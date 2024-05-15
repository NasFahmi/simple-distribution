const slugify = require('slugify');
const dbConnection = require('../model/db')
const getAllPost = (req, res) => {
    // Membuat kueri untuk mengambil semua posting dari database read
    const query = 'SELECT * FROM posts';
    
    // Menggunakan koneksi database read untuk menjalankan kueri
    dbConnection.dbReadConnection.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving posts:', error);
            res.status(500).json({ error: 'Error retrieving posts' });
            return;
        }
        // Mengirim hasil kueri sebagai respons
        res.json({
            location:'Server node 2',
            posts: results
        });
    });
};

const getPostBySlug = (req, res) => {
    const slug = req.params.slug;
    // Membuat kueri untuk mengambil posting berdasarkan slug dari database read
    const query = 'SELECT * FROM posts WHERE slug = ?';
    
    // Menggunakan koneksi database read untuk menjalankan kueri
    dbConnection.dbReadConnection.query(query, [slug], (error, results) => {
        if (error) {
            console.error('Error retrieving post by slug:', error);
            res.status(500).json({ error: 'Error retrieving post by slug' });
            return;
        }
        // Mengirim hasil kueri sebagai respons
        res.json({
            location:'Server node 2',
            posts: results
        });
    });
};

const createPost = (req, res) => {
    const { title, content } = req.body;
    // Membuat slug dari judul
    const slug = slugify(title, { lower: true });
    // Membuat kueri untuk membuat posting baru di database write
    const query = 'INSERT INTO posts (title, content, slug) VALUES (?, ?, ?)';
    
    // Menggunakan koneksi database write untuk menjalankan kueri
    dbConnection.dbWriteConnection.query(query, [title, content, slug], (error, results) => {
        if (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Error creating post' });
            return;
        }
        // Mengirim pesan sukses sebagai respons
        res.json({  
            location:'Server node 2',
            posts: results,
            message: 'Post created successfully' 
        });
    });
};

const editPostById = (req, res) => {
    const postId = req.params.id;
    // Mendapatkan data yang akan diedit dari body permintaan
    const { title, content } = req.body;
    const slug = slugify(title, { lower: true });
    // Membuat kueri untuk mengedit posting berdasarkan ID di database write
    const query = 'UPDATE posts SET title = ?, content = ?, slug = ? WHERE id = ?';
    
    // Menggunakan koneksi database write untuk menjalankan kueri
    dbConnection.dbWriteConnection.query(query, [title, content, slug,postId], (error, results) => {
        if (error) {
            console.error('Error editing post:', error);
            res.status(500).json({ error: 'Error editing post' });
            return;
        }
        // Mengirim pesan sukses sebagai respons
        res.json({ 
            location:'Server node 2',
            posts: results,
            message: 'Post edited successfully' 
        });
    });
};

const deletePostById = (req, res) => {
    const postId = req.params.id;
    // Membuat kueri untuk menghapus posting berdasarkan ID dari database write
    const query = 'DELETE FROM posts WHERE id = ?';
    
    // Menggunakan koneksi database write untuk menjalankan kueri
    dbConnection.dbWriteConnection.query(query, [postId], (error, results) => {
        if (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ error: 'Error deleting post' });
            return;
        }
        // Mengirim pesan sukses sebagai respons
        res.json({
            location:'Server node 2',
            posts: results, 
            message: 'Post deleted successfully' 
        });
    });
};

module.exports= {
    getAllPost,
    getPostBySlug,
    createPost,
    editPostById,
    deletePostById
};
