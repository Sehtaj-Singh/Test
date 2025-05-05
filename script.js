// 2 to 25 = header nav
const finalNavLinks = document.querySelectorAll('.final-nav .nav-link');
const finalIndicator = document.querySelector('.final-indicator');

function moveFinalIndicator(link) {
  const parentRect = link.parentElement.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const offsetLeft = linkRect.left - parentRect.left;

  finalIndicator.style.left = `${offsetLeft-8}px`;
  finalIndicator.style.width = `${link.offsetWidth+16}px`;
}

finalNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    finalNavLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    moveFinalIndicator(link);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const activeLink = document.querySelector('.final-nav .nav-link.active');
  moveFinalIndicator(activeLink);
});

const track = document.querySelector('.carousel-track');
const dotsContainer = document.querySelector('.carousel-dots');
const slides = track.children;
let startX = 0, currentTranslate = 0, prevTranslate = 0, currentIndex = 0;

// Create dots dynamically
for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active'); // First dot is active
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchmove', (e) => {
  const moveX = e.touches[0].clientX - startX;
  currentTranslate = prevTranslate + moveX;
  track.style.transform = `translateX(${currentTranslate}px)`;
});

track.addEventListener('touchend', () => {
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50 && currentIndex < slides.length - 1) currentIndex++; // Swiped left
  if (movedBy > 50 && currentIndex > 0) currentIndex--; // Swiped right

  currentTranslate = -currentIndex * slides[0].clientWidth;
  track.style.transform = `translateX(${currentTranslate}px)`;
  prevTranslate = currentTranslate;

  // Update active dot
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
});
function autoSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  currentTranslate = -currentIndex * slides[0].clientWidth;
  
  // Move the slider
  track.style.transform = `translateX(${currentTranslate}px)`;

  // Update previous position and active dot
  prevTranslate = currentTranslate;
  updateDots(); // this is the important part
}

// Start the autoplay
let autoSlideInterval = setInterval(autoSlide, 5000);

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

track.addEventListener('touchstart', () => {
  clearInterval(autoSlideInterval); // stop
});

track.addEventListener('touchend', () => {
  autoSlideInterval = setInterval(autoSlide, 3000); // resume
});

const list = document.querySelectorAll('.list');
function activeLink() {
    list.forEach((item) =>
    item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
item.addEventListener('click',activeLink));

