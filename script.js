// highlight nav by section in the scroll container
const main = document.querySelector('main');
const sections = Array.from(document.querySelectorAll('.snap-section'));
const navItems = Array.from(document.querySelectorAll('nav li'));

function updateActiveNav() {
  // find section whose top is closest to scroll top + offset
  const scrollTop = main.scrollTop;
  let activeIndex = 0;
  for (let i = 0; i < sections.length; i++) {
    if (main.scrollTop + 120 >= sections[i].offsetTop) activeIndex = i;
  }
  navItems.forEach(i => i.classList.remove('active'));
  if (navItems[activeIndex]) navItems[activeIndex].classList.add('active');
}

main.addEventListener('scroll', () => {
  updateActiveNav();
});

// nav clicks
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const id = item.getAttribute('data-target');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior:'smooth'});
  });
});

// helper to programmatically scroll to an inner subsection
function scrollToHash(hash) {
  // scroll to the target element (works for subsections in the same page)
  setTimeout(() => {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({behavior:'smooth'});
  }, 80);
}

// explicit helper used by Contact button
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({behavior:'smooth'});
}

// on load: if URL has a fragment (e.g., index.html#projects-fsae), scroll there
window.addEventListener('load', () => {
  const fragment = location.hash.replace('#','');
  if (fragment) {
    const el = document.getElementById(fragment);
    if (el) setTimeout(()=> el.scrollIntoView({behavior:'smooth'}), 120);
  }
  updateActiveNav();
});
