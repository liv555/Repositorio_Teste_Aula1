document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-item-js");

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const indicators = document.querySelectorAll(".carousel-indicators-js span");

    let index = 0;
    const total = slides.length;

    // Largura correta do container
    track.style.width = `${total * 100}%`;

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`;
        indicators.forEach(i => i.classList.remove("active"));
        indicators[index].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % total;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + total) % total;
        updateCarousel();
    });

    indicators.forEach(dot => {
        dot.addEventListener("click", () => {
            index = Number(dot.dataset.slide);
            updateCarousel();
        });
    });

    updateCarousel();

});
