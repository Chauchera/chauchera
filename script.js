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

// Funciones para el carrusel en index.html
function initializeLastShowCarousel() {
    let slideIndex = 0;

    function showSlides(n) {
        const slides = document.getElementsByClassName("carousel-item");
        if (n >= slides.length) { slideIndex = 0 }
        if (n < 0) { slideIndex = slides.length - 1 }
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        slides[slideIndex].classList.add("active");
    }

    document.querySelector(".prev").addEventListener('click', () => {
        showSlides(--slideIndex);
    });

    document.querySelector(".next").addEventListener('click', () => {
        showSlides(++slideIndex);
    });

    // Iniciar el carrusel
    showSlides(slideIndex);
}

if (document.getElementById('carousel')) {
    initializeLastShowCarousel();
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
