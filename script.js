// ** Mode Color Switcher (Dark, Light, Blue, Green, Orange, Red) **
const modeToggle = document.getElementById("mode-toggle");
let currentMode = "light"; // Default mode is light

// Fungsi untuk mengganti mode tampilan
function switchMode() {
    switch (currentMode) {
        case "light":
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            currentMode = "dark";
            break;
        case "dark":
            document.body.classList.remove("dark-mode");
            document.body.classList.add("blue-mode");
            currentMode = "blue";
            break;
        case "blue":
            document.body.classList.remove("blue-mode");
            document.body.classList.add("green-mode");
            currentMode = "green";
            break;
        case "green":
            document.body.classList.remove("green-mode");
            document.body.classList.add("orange-mode");
            currentMode = "orange";
            break;
        case "orange":
            document.body.classList.remove("orange-mode");
            document.body.classList.add("red-mode");
            currentMode = "red";
            break;
        case "red":
            document.body.classList.remove("red-mode");
            document.body.classList.add("light-mode");
            currentMode = "light";
            break;
    }

    // Menyimpan mode saat ini di localStorage agar tetap ada saat refresh
    localStorage.setItem("theme", currentMode);
}

// Event listener untuk mode toggle
modeToggle.addEventListener("click", function () {
    switchMode();
});

// Mengatur mode berdasarkan penyimpanan sebelumnya
window.addEventListener("load", function () {
    const savedMode = localStorage.getItem("theme");

    // Jika mode disimpan sebelumnya, terapkan mode tersebut
    if (savedMode) {
        document.body.classList.remove("light-mode", "dark-mode", "blue-mode", "green-mode", "orange-mode", "red-mode");
        document.body.classList.add(savedMode);
        currentMode = savedMode;
    } else {
        // Jika tidak ada mode sebelumnya, atur default ke light mode
        document.body.classList.add("light-mode");
        currentMode = "light";
    }
});

let currentMusic = null;  // Untuk melacak musik yang sedang diputar
let lastPlayedTime = {};  // Menyimpan posisi terakhir setiap musik

// Fungsi untuk memilih dan memutar musik
function selectMusic(songNumber) {
    // Hentikan musik yang sedang diputar
    if (currentMusic) {
        // Simpan posisi terakhir musik yang diputar
        lastPlayedTime[currentMusic.id] = currentMusic.currentTime;

        currentMusic.pause();
        currentMusic.currentTime = 0; // Reset musik ke awal
    }

    // Tentukan elemen audio yang sesuai dengan musik yang dipilih
    const musicElement = document.getElementById(`music-${songNumber}`);
    
    // Pastikan musik ada dan dapat diputar
    if (musicElement) {
        // Periksa jika ada posisi terakhir yang disimpan untuk musik ini
        if (lastPlayedTime[musicElement.id] !== undefined) {
            musicElement.currentTime = lastPlayedTime[musicElement.id];  // Lanjutkan dari posisi terakhir
        } else {
            musicElement.currentTime = 0;  // Mulai dari awal jika tidak ada posisi yang disimpan
        }

        // Memulai pemutaran musik
        currentMusic = musicElement;
        currentMusic.play()
            .then(() => {
                console.log(`Memutar musik ${songNumber}`);
            })
            .catch((error) => {
                console.error("Error saat memutar musik:", error);
            });
    } else {
        console.log("Musik tidak ditemukan.");
    }
    
    // Sembunyikan dropdown setelah memilih musik
    document.getElementById("music-dropdown-footer").style.display = "none";  // Menyembunyikan dropdown
}

// Fungsi untuk menghentikan musik
function stopMusic() {
    if (currentMusic) {
        // Simpan posisi saat dihentikan
        lastPlayedTime[currentMusic.id] = currentMusic.currentTime;

        currentMusic.pause();  // Hentikan musik
        console.log("Musik dihentikan.");
    }

    // Sembunyikan dropdown setelah menghentikan musik
    document.getElementById("music-dropdown-footer").style.display = "none";  // Menyembunyikan dropdown
}

// Fungsi untuk melanjutkan musik
function resumeMusic() {
    if (currentMusic) {
        // Periksa apakah ada posisi yang disimpan
        if (lastPlayedTime[currentMusic.id] !== undefined) {
            // Lanjutkan musik dari posisi terakhir
            currentMusic.currentTime = lastPlayedTime[currentMusic.id];
            currentMusic.play();
            console.log("Melanjutkan musik dari posisi terakhir.");
        } else {
            console.log("Tidak ada posisi terakhir yang ditemukan untuk melanjutkan musik.");
        }
    }
}

// Fungsi untuk toggle dropdown musik
document.getElementById("music-toggle-footer").addEventListener("click", function () {
    const musicDropdown = document.getElementById("music-dropdown-footer");
    if (musicDropdown.style.display === "none" || musicDropdown.style.display === "") {
        musicDropdown.style.display = "block"; // Menampilkan dropdown musik
    } else {
        musicDropdown.style.display = "none"; // Menyembunyikan dropdown musik
    }
});

// ** Quotes Logic ** 
const quotes = [
    {
        text_en: "",
        text_id: "Gelar Sarjana, empat buku dan ratusan artikel, tapi masih saja aku salah membaca, kamu menuliskan padaku Selamat Pagi dan aku membacanya Aku Mencintaimu.",
        author: "Satria Raja Waringin",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Aku akan berbohong jika bilang aku tidak kecewa, tapi aku tidak memiliki pikiran buruk tentang hubungan cinta yang putus, apa yang pernah kami lakukan, itu tetap yang terbaik, terimakasih untuk sudah mau bersamaku melalui banyak hal yang kita lalui, semua itu adalah wak tu yang baik yang begitu indah untuk dikenang, dulu kita pernah berharap kita akan selalu bisa bersama-sama, dulu aku merasa aku akan selama-lamanya denganmu ketika tertawa diatas motor sonic, mudah-mudahan kita kuat, sekuat kehidupan cinta dan pemahaman, rasa sedih dan kegagalan tidak selalu berarti kekalahan, sekarang yang tetap didalam diriku adalah kenangan.",
        author: "Zyyad",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Kita hanya sebatas pernah, bukan punah dan bukan juga menyerah, hanya sudah.",
        author: "GA",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Hidup saya agak seperti sebuah cerita, yang jika saya ceritakan tentang hal itu, anda mungkin tidak akan percaya, karna itu akan tampak seperti fiksi, namun itu Aku.",
        author: "PtrYgha",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Jika kamu ingin sembuh dari trauma masa lalu, maka langkah pertama yang harus kamu lakukan adalah merubah pandanganmu (Pola pikir) tentang kejadian itu.",
        author: "Maulln Gasuka Logmat",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Aku tertawa ketika mengingat pernah Menangisimu, tapi aku menangis ketika mengingat pernah Bersamamu.",
        author: "Satria Raja Waringin",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Percintaan itu kalo di-analogikan seperti dua buah percabangan jalan, Namun kebanyakan orang mengambil arah yang salah, Mereka mulai bingung bahkan saling menyalahkan, dan pada akhirnya mereka terpecah lalu terluka.",
        author: "Maulln Gasuka Logmat",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Wanita adalah makhluk misteri sekaligus keajaiban dunia yang ke-delapan, tapi sayangnya laki-laki gagal memahaminya karena ketika hawa diciptakan adam sedang tertidur.",
        author: "GA",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Aku tak akan memksamu untuk terus bersamaku, tapi jika rumah barumu tak seindah itu, kembalilah aku masih disini menunggumu.",
        author: "Satria Raja Waringin",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Yang terlihat belum tentu yang sebenarnya terjadi, dan yang tidak terlihat lebih berbahaya daripada yang terlihat.",
        author: "GA",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Apakah kamu pernah mendengar sebuah kata atau kutipan 'Dia sangat dekat tapi terasa asing'? Sebenarnya kata itu tertuju kepada kamu dan diri kamu, karna tidak sedikit orang yang tidak mengenali dirinya sendiri, Maka dari itu mulailah berkenalan dan jalin hubungan yang baik.",
        author: "Maulln Gasuka Logmat",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Kenangan hanya sebuah mimpi.",
        author: "GA",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Aku sama sekali tidak membencimu, berbahagialah dulu dengan orang barumu itu.",
        author: "Satria Raja Waringin",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Hati sekuat badai tidak akan hancur karna terpaan gerimis.",
        author: "GA",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Rest Area itu dibuat untuk pemberhentian atau tempat istirahat sementara, tapi beberapa orang justru memilih untuk berhenti lebih lama dengan alibi ingin beristirahat sebentar lagi, tanpa disadari mereka mulai terjebak di zona itu dan karakter baru mulai terbentuk, lalu seiring berjalannya waktu tujuan mereka kini sudah tidak berambisi lagi dan pada akhirnya mereka tidak melanjutkan perjalanan. ",
        author: "Maulln Gasuka Logmat",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Hanya karna cantik dan banyak yang menyukaimu lantas kau bertingkah layaknya ratu di depanku, Menyingkirlah nona kau merusak pandanganku.",
        author: "GA",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Jatuh cinta terbesarku adalah bersamamu, apa kamu tidak ingin kembali pulang padaku.",
        author: "Satria Raja Waringin",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
    {
        text_en: "",
        text_id: "Cinta itu racun berdosis tinggi, walaupun dosis yang tinggi itu bisa merangsang Dopamin, tapi yang namanya racun itu susah untuk di Netralkan.",
        author: "Maulln Gasuka Logmat",
        hasTranslationEnToId: false,
        hasTranslationIdToEn: false,
    },
];

let currentQuoteIndex = 0;
let isTranslated = false; // Status apakah quote sudah diterjemahkan
let audioPlaying = null; // Untuk melacak audio yang sedang diputar

// Function untuk menampilkan quote
function displayQuote() {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    const currentQuote = quotes[currentQuoteIndex];
    
    // Menampilkan teks sesuai dengan status terjemahan
    if (isTranslated) {
        if (currentQuote.text_id && currentQuote.hasTranslationIdToEn) {
            quoteText.textContent = `"${currentQuote.text_id}"`; // Tampilkan versi Bahasa Indonesia
        } else if (!currentQuote.text_id && currentQuote.hasTranslationEnToId) {
            // Jika tidak ada terjemahan ke Bahasa Indonesia, beri notifikasi
            alert("Terjemahan Bahasa Indonesia tidak tersedia.");
            quoteText.textContent = `"${currentQuote.text_en}"`; // Tetap tampilkan versi Bahasa Inggris
        } else if (!currentQuote.text_en && currentQuote.hasTranslationIdToEn) {
            // Jika tidak ada terjemahan Bahasa Inggris, tampilkan terjemahan jika tersedia
            alert("Terjemahan Bahasa Inggris tidak tersedia.");
            quoteText.textContent = `"${currentQuote.text_id}"`; // Tetap tampilkan versi Bahasa Indonesia
        }
    } else {
        // Jika tidak diterjemahkan, tampilkan versi Bahasa Inggris
        quoteText.textContent = `"${currentQuote.text_en || currentQuote.text_id}"`; 
    }

    quoteAuthor.textContent = `- ${currentQuote.author}`;
    
    // Hentikan audio yang sedang diputar (jika ada)
    if (audioPlaying) {
        audioPlaying.pause();
        audioPlaying.currentTime = 0; // Reset audio ke awal
    }
}

// Function untuk berpindah ke quote berikutnya
function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    isTranslated = false; // Reset status terjemahan (tetap Bahasa Inggris)
    displayQuote();
}

// Function untuk toggle terjemahan
function toggleTranslation() {
    const currentQuote = quotes[currentQuoteIndex];
    
    // Periksa apakah terjemahan ada atau tidak
    if (currentQuote.text_en && !currentQuote.hasTranslationEnToId) {
        // Jika ada teks dalam Bahasa Inggris, tapi tidak ada terjemahan ke Bahasa Indonesia
        alert("Terjemahan Bahasa Indonesia tidak tersedia untuk quote ini.");
        return; // Hentikan proses lebih lanjut
    }
    
    if (currentQuote.text_id && !currentQuote.hasTranslationIdToEn) {
        // Jika ada teks dalam Bahasa Indonesia, tapi tidak ada terjemahan ke Bahasa Inggris
        alert("Terjemahan Bahasa Inggris tidak tersedia untuk quote ini.");
        return; // Hentikan proses lebih lanjut
    }

    // Toggle status terjemahan
    isTranslated = !isTranslated;
    displayQuote();
}

// ** Function untuk memutar audio (voice) ** 
function playAudio() {
    const currentQuote = quotes[currentQuoteIndex];

    // Menentukan ID audio berdasarkan terjemahan yang ditampilkan
    let audioElement;
    if (isTranslated) {
        // Jika teks terjemahan dalam Bahasa Indonesia, play audio Bahasa Indonesia
        audioElement = document.getElementById(`audio-quote-${currentQuoteIndex + 1}-id`);
    } else {
        // Jika teks dalam Bahasa Inggris, play audio Bahasa Inggris
        audioElement = document.getElementById(`audio-quote-${currentQuoteIndex + 1}-en`);
    }

    // Cek apakah ada musik yang sedang diputar
    if (currentMusic) {
        // Tampilkan pemberitahuan jika musik sedang diputar
        const userWantsToContinue = confirm("Saat ini musik sedang diputar. Untuk mendengarkan voice dengan jelas, lebih baik matikan musik terlebih dahulu. Apakah anda ingin melanjutkan memutar voice dan musik sekaligus?");
        
        if (!userWantsToContinue) {
            // Jika pengguna memilih untuk tidak melanjutkan, batalkan pemutaran voice
            return;
        }
    }

    // Jika elemen audio ditemukan, putar audio voice
    if (audioElement) {
        audioPlaying = audioElement;  // Menyimpan referensi ke audio yang diputar
        audioPlaying.play()
            .then(() => {
                console.log("Audio diputar.");
            })
            .catch((error) => {
                console.error("Error saat memutar audio:", error);
            });
    } else {
        // Jika audio tidak ditemukan untuk quote ini
        alert("Audio untuk quote ini tidak tersedia.");
    }
}

// ** Event listener untuk ikon suara ** 
document.getElementById("voice-icon").addEventListener("click", playAudio);

// ** Event listener untuk ikon terjemahan ** 
document.getElementById("translate-icon").addEventListener("click", toggleTranslation);

// Initial quote display
displayQuote();

