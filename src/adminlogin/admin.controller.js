const express = require('express');
const router = express.Router();
const  isAdmin = require('../middleware/adminAuthorize'); // Middleware otorisasi admin

const adminService = require('./admin.service');

// Registrasi Admin
router.post('/register', async (req, res) => {
  const { email, kode } = req.body;
  try {
    const newAdmin = await adminService.register(email, kode);
    res.status(201).json({ data: { email: newAdmin.email }, message: "Registrasi sukses" });
  } catch (error) {
    console.log('apa yang error', error)
    res.status(400).json({ error: error.message });
  }
});

// LOGIN Admin
router.post('/login', async (req, res) => {
  const { email, kode } = req.body;
  try {
    const admin = await adminService.login(email, kode);
    res.status(200).json({ data: { email: admin.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ubah Kata Sandi Admin
router.put('/change-password', isAdmin, async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const updatedAdmin = await adminService.changePassword(email, oldPassword, newPassword);
    res.status(200).json({ message: 'Kata sandi berhasil diubah', admin: { email: updatedAdmin.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// LOGOUT Admin
router.post('/logout', (req, res) => {
  // Logika logout, seperti menghapus sesi atau token
  // Jika menggunakan token, Anda bisa mengabaikan token di sisi klien
  res.status(200).json({ message: 'Logout berhasil' });
});

module.exports = router;