const prisma = require('../db')

// Menambahkan data anggaran TKD
async function insertTKD (data) {
  return await prisma.anggaranTKD.create({ data })
}

// Mengambil semua data TKD berdasarkan tahun & daerah
async function findTKDByYear (tahun, daerah) {
  const where = {}
  if (tahun) where.tahun = parseInt(tahun)
  if (daerah) where.daerah = daerah

  return await prisma.anggaranTKD.findMany({
    where,
    orderBy: { jenis_tkd: 'asc' }
  })
}

async function deletedChartById (id) {
  await prisma.anggaranTKD.delete({
    where: { id: parseInt(id) }
  })
}

module.exports = {
  insertTKD,
  findTKDByYear,
  deletedChartById
}
