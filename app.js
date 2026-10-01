(() => {
  const hero = document.querySelector('.hero-scene');
  const navLinks = [...document.querySelectorAll('.nav-center a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const progress = document.querySelector('.page-progress i');

  if (hero && matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      hero.style.setProperty('--px', ((x - .5) * 16).toFixed(2) + 'px');
      hero.style.setProperty('--py', ((y - .5) * 12).toFixed(2) + 'px');
      hero.style.setProperty('--hx', (x * 100).toFixed(1) + '%');
      hero.style.setProperty('--hy', (y * 100).toFixed(1) + '%');
    });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--px', '0px');
      hero.style.setProperty('--py', '0px');
      hero.style.setProperty('--hx', '50%');
      hero.style.setProperty('--hy', '48%');
    });
  }

  const onScroll = () => {
    const root = document.documentElement;
    const max = root.scrollHeight - innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';

    let active = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 150) active = section.id;
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + active);
    });
  };

  addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();