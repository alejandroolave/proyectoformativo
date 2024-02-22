const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides[currentSlide].style.opacity = '0';
  slides[index].style.opacity = '1';
  currentSlide = index;
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

setInterval(nextSlide, 2000); // Cambia de imagen cada 5 segundos

// Inicia el carrusel mostrando la primera imagen
window.addEventListener('load', () => {
  showSlide(0);
});

// function toggleOptions() {
//   var userOptions = document.getElementById("userOptions");
//   userOptions.style.display = (userOptions.style.display === "block") ? "none" : "block";
// }