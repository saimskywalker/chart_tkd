const adminRepository = require('./admin.repository')

async function register (email, kode){
    try{
        const admin = {
            email,
            kode,
        };
        if (!email || !kode) {
            throw new Error('Email dan kode harus diisi');
        }
        const newAdmin = await adminRepository.createAdmin(admin);
        return newAdmin;
    } catch (error) {
        console.error(error); 
        throw new Error('Gagal registrasi admin')
    }
}

async function login(email, kode) {
    const admin = await adminRepository.findAdminByEmail(email);

    if (!admin || admin.kode !== kode) {
        throw new Error("Email dan kode tidak betul");
    }

    return admin; // Kembalikan objek admin jika berhasil
}

async function changePassword(email, oldKode, newKode) {
    const admin = await adminRepository.findAdminByEmail(email);

    if (!admin) {
        throw new Error('Admin tidak ditemukan');
    }

    // Periksa apakah kode lama cocok
    if (oldKode !== admin.kode) {
        throw new Error('Kode lama tidak valid');
    }

    // Langsung memperbarui kode tanpa hashing
    const updatedAdmin = await adminRepository.updateAdminPassword(email, newKode);
    
    return updatedAdmin;
}

module.exports = { register, login, changePassword };