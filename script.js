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
 // REPRODUCTOR DE CANCIONES

 function playSong(src, startTime = 0) {
    var audio = document.getElementById("audio");
    var audioSource = document.getElementById("audio-source");
    var currentSongTitle = document.getElementById("current-song-title");
    var currentSongArtist = document.getElementById("current-song-artist");
    var currentSongCover = document.querySelector(".audio-player .song-cover");

    // Pausar y reiniciar la canción actual antes de cargar la nueva
    audio.pause();
    audio.currentTime = 0;

    // Configurar la nueva canción
    audioSource.src = src;
    audio.load();

    // Actualizar la información de la canción
    var songElement = document.querySelector(`li[onclick="playSong('${src}')"]`);
    if (songElement) {
        currentSongTitle.innerText = songElement.querySelector(".song-title").innerText;
        currentSongArtist.innerText = "Chauchera";
        currentSongCover.src = songElement.querySelector(".song-cover").src;
    }

    // Reproducir la nueva canción desde el tiempo especificado
    audio.onloadedmetadata = function() {
        audio.currentTime = startTime; // Establecer el tiempo de inicio
        audio.play();
    };

}



// Función para mostrar carrusel en index.html
function openCarousel() {
    document.getElementById("carousel").classList.remove("hidden");
    showSlides(0);
}

function closeCarousel() {
    document.getElementById("carousel").classList.add("hidden");
}

let slideIndex = 0;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[slideIndex].classList.add("active");
}

// Funciones para el carrusel en material.html
function initializePromoCarousel() {
    document.addEventListener("DOMContentLoaded", function() {
        const images = document.querySelectorAll('.carousel-slide img');
        const carouselContainer = document.getElementById('carousel-container');
        const loadingIndicator = document.getElementById('loading-indicator');
        let loadedImagesCount = 0;

        images.forEach((img) => {
            const tempImg = new Image();
            tempImg.src = img.src;

            tempImg.onload = function() {
                loadedImagesCount++;
                if (loadedImagesCount === images.length) {
                    loadingIndicator.classList.add('hidden');
                    carouselContainer.classList.remove('hidden');
                    initializeCarousel();
                    console.log("Carrusel de Material Promocional inicializado");
                }
            };

            tempImg.onerror = function() {
                console.error(`Error al cargar la imagen: ${img.src}`);
            };
        });

        function initializeCarousel() {
            const carouselSlide = document.querySelector('.carousel-slide');
            const carouselImages = document.querySelectorAll('.carousel-slide img');
            const downloadBtn = document.getElementById('downloadCurrent');

            let counter = 0;
            const size = carouselImages[0].clientWidth;

            document.getElementById('nextBtn').addEventListener('click', () => {
                if (counter >= carouselImages.length - 1) counter = -1;
                carouselSlide.style.transition = "transform 0.4s ease-in-out";
                counter++;
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
                updateDownloadLink();
            });

            document.getElementById('prevBtn').addEventListener('click', () => {
                if (counter <= 0) counter = carouselImages.length;
                carouselSlide.style.transition = "transform 0.4s ease-in-out";
                counter--;
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
                updateDownloadLink();
            });

            function updateDownloadLink() {
                const currentImg = carouselImages[counter].getAttribute('src').replace('mini', '');
                downloadBtn.setAttribute('href', currentImg);
            }
        }
    });
}

if (document.getElementById('carousel-container')) {
    initializePromoCarousel();
}
