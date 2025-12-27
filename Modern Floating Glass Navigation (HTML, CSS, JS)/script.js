const links = document.querySelectorAll('.nav a');
const indicator = document.querySelector('.indicator');
const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('.section');

function moveIndicator(el) {
  const rect = el.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  indicator.style.width = rect.width + 'px';
  indicator.style.transform =
    `translateX(${rect.left - navRect.left}px)`;
}

function setActive(link) {
  links.forEach(l => l.classList.remove('active'));
  link.classList.add('active');
  moveIndicator(link);
}

/* hover + click */
links.forEach(link => {
  link.addEventListener('mouseenter', () => moveIndicator(link));
  link.addEventListener('click', () => setActive(link));
});

/* ===== SCROLL SPY ===== */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
        if (activeLink) setActive(activeLink);
      }
    });
  },
  {
    threshold: 0.6
  }
);

sections.forEach(section => observer.observe(section));

window.addEventListener('load', () => {
  moveIndicator(document.querySelector('.nav a.active'));
});