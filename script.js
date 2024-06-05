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

let touchStartX = 0;
let touchEndX = 0;

document.getElementById('content').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('content').addEventListener('touchmove', function(e) {
    touchEndX = e.changedTouches[0].screenX;
});

document.getElementById('content').addEventListener('touchend', function() {
    handleSwipe();
});

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
    if (touchEndX < touchStartX - 50) {
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

function playSong(song) {
    const audio = document.getElementById('audio');
    const audioSource = document.getElementById('audio-source');
    const currentSongTitle = document.getElementById('current-song-title');
    const currentSongArtist = document.getElementById('current-song-artist');
    const songCover = document.querySelector('.audio-player .song-cover');

    const selectedSongElement = document.querySelector(`[onclick="playSong('${song}')"]`);
    const songTitle = selectedSongElement.querySelector('.song-title').innerText;
    const songArtist = selectedSongElement.querySelector('.song-artist').innerText;
    const songCoverSrc = selectedSongElement.querySelector('.song-cover').src;

    audioSource.src = song;
    audio.load();
    audio.play();

    currentSongTitle.innerText = songTitle;
    currentSongArtist.innerText = songArtist;
    songCover.src = songCoverSrc;
}
