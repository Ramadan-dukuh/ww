function gacha() {
    const nameInput = document.getElementById('name');
    const button = document.getElementById('button');
    const judul = document.getElementById('Judul');
    const result = document.getElementById('result');
    const back = document.getElementById('back');
    const gacha = document.getElementById('gacha');
    const message = document.getElementById('message'); // Elemen pesan selesai

    // Daftar peran beserta deskripsi dan kelas CSS yang sesuai
    const rolesConfig = [
        { name: "Warewolf", description: "Bunuh Semua Warga", class: "warewolf", limit: 1 },
        { name: "Villager", description: "Bertahan Hidup dan Temukan Warewolf", class: "villager", limit: 1 },
        { name: "Witch", description: "Lindungi Para Warga", class: "Witch", limit: 1 },
        { name: "Hunter", description: "Cobalah Membunuh Warewolf saat kamu mati atau di-vote keluar", class: "Hunter", limit: 1 },
        { name: "Fortune Teller", description: "Tolong Temukan Warewolf", class: "FortuneTeller", limit: 1 },
        { name: "Detective", description: "Cobalah Membunuh Warewolf", class: "Detective", limit: 1 },
        { name: "Doctor", description: "Cobalah Menghidupkan warga yang mati", class: "doctor", limit: 1 }
    ];

    // Fungsi untuk memilih peran acak yang masih tersedia
    function getRole() {
        // Filter roles that can still be selected
        const availableRoles = rolesConfig.filter(role => role.limit > 0);
        
        if (availableRoles.length === 0) {
            return null; // Return null if no roles are available
        }
        
        // Randomly select a role from available roles
        const randomIndex = Math.floor(Math.random() * availableRoles.length);
        const selectedRole = availableRoles[randomIndex];

        // Decrement the limit for the selected role
        selectedRole.limit -= 1; 

        return selectedRole; // Return the selected role
    }

    // Pastikan tombol gacha belum dinonaktifkan
    if (button.disabled) {
        return; // Jika tombol disabled, hentikan eksekusi
    }

    // Pilih peran acak menggunakan fungsi role selection
    const selectedRole = getRole();

    if (selectedRole) {
        // Sembunyikan elemen input dan tombol
        judul.style.display = "none";
        nameInput.style.display = "none";
        button.style.display = "none";
        back.style.display = "block";
        gacha.style.display = "block";

        // Masukkan hasil ke dalam div dengan id "result"
        result.innerHTML = `
            <h2 class="${selectedRole.class}">${nameInput.value}, Peranmu Adalah ${selectedRole.name}</h2>
            <p id="role-description">${selectedRole.description}</p>
        `;

        back.addEventListener('click', function() {
            location.reload();  // Refresh the page
        });
    } else {
        // Jika semua role sudah habis
        result.innerHTML = "<h2>Gacha selesai, semua peran telah diambil!</h2>"; // Menampilkan pesan selesai
        button.disabled = true; // Menonaktifkan tombol gacha
        message.style.display = "block"; // Tampilkan pesan selesai
    }
}

// Set event listener for the gacha button
document.getElementById('button').addEventListener('click', gacha);
