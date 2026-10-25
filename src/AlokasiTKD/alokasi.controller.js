const prisma = require('../db');
const express = require('express');
const router = express.Router();
const alokasiService = require('./alokasi.service');
const isAdmin = require('../middleware/adminAuthorize');

// Tambah data alokasi TKD
router.post('/create', isAdmin, async (req, res) => {
  try {
    const result = await alokasiService.createAlokasiTKD(req.body);

    res.status(201).json({
      result: {
        ...result,
        dbh: result.dbh?.toString(),
        dau: result.dau?.toString(),
        dakFisik: result.dakFisik?.toString(),
        dakNonfisik: result.dakNonfisik?.toString(),
        danaDesa: result.danaDesa?.toString(),
        infis: result.infis?.toString(),
        total: result.total?.toString()
      },
      message: 'Data Alokasi TKD berhasil ditambahkan'
    });
  } catch (error) {
    console.error('Gagal menambahkan data Alokasi TKD:', error);
    res.status(400).json({ error: error.message });
  }
});

// Ambil data untuk grafik per tahun
router.get('/grafik', async (req, res) => {
  try {
    const tahun = req.query.tahun || new Date().getFullYear();
    const result = await alokasiService.getAlokasiChart(parseInt(tahun));

    const serialize = result.map(item => ({
      ...item,
      dbh: item.dbh?.toString(),
      dau: item.dau?.toString(),
      dakFisik: item.dakFisik?.toString(),
      dakNonfisik: item.dakNonfisik?.toString(),
      danaDesa: item.danaDesa?.toString(),
      infis: item.infis?.toString(),
      total: item.total?.toString()
    }));

    res.status(200).json(serialize);
  } catch (error) {
    console.error('Gagal ambil data grafik:', error);
    res.status(500).json({ error: 'Gagal Mengambil Data Grafik Alokasi TKD' });
  }
});

// DELETE /api/alokasi/:id
const deleteAlokasi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.alokasiTKD.delete({
      where: { id: id },
    });
    res.status(200).json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data' });
  }
};

// Tambah route untuk delete
router.delete('/:id', isAdmin, deleteAlokasi);


module.exports = router;
