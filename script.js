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
