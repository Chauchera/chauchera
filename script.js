if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
}

function toggleMenu() {
    var menu = document.getElementById('menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('show');
    } else {
        menu.classList.remove('show');
        menu.classList.add('hidden');
    }
}

// Variables para rastrear el toque
let touchStartX = 0;
let touchEndX = 0;

// Añadir eventos de toque al contenedor principal
document.getElementById('content').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('content').addEventListener('touchmove', function(e) {
    touchEndX = e.changedTouches[0].screenX;
});

document.getElementById('content').addEventListener('touchend', function() {
    handleSwipe();
});

// Añadir eventos de toque al menú para detectar el inicio del toque
document.getElementById('menu').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('menu').addEventListener('touchmove', function(e) {
    touchEndX = e.changedTouches[0].screenX;
});

document.getElementById('menu').addEventListener('touchend', function() {
    handleSwipe();
});

function handleSwipe() {
    // Detectar deslizamiento a la izquierda
    if (touchEndX < touchStartX - 50) { // Asegurarse de que el deslizamiento es significativo
        closeMenu();
    }
}

function closeMenu() {
    var menu = document.getElementById('menu');
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        menu.classList.add('hidden');
    }
}

function playSong(src) {
    var audio = document.getElementById("audio");
    var audioSource = document.getElementById("audio-source");
    var currentSongTitle = document.getElementById("current-song-title");
    var currentSongArtist = document.getElementById("current-song-artist");
    var currentSongCover = document.querySelector(".audio-player .song-cover");

    audioSource.src = src;
    audio.load();
    audio.play();

    var songElement = document.querySelector(`li[onclick="playSong('${src}')"]`);
    if (songElement) {
        currentSongTitle.innerText = songElement.querySelector(".song-title").innerText;
        currentSongArtist.innerText = "Chauchera";
        currentSongCover.src = songElement.querySelector(".song-cover").src;
    }
}
