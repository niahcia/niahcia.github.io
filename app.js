(() => {
  const root = document.documentElement;
  const field = document.querySelector('.immersive-hero');
  const prompt = document.querySelector('.hero-prompt');
  const promptText = document.querySelector('.hero-prompt-copy span');
  const navLinks = [...document.querySelectorAll('.nav-center a[href^="#"], .nav-mobile a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];

  // Pointer-reactive agent field: subtle, bounded, and purely visual.
  if (field && matchMedia('(pointer:fine)').matches) {
    field.addEventListener('pointermove', e => {
      const r = field.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      field.style.setProperty('--px', ((x - .5) * 18).toFixed(2) + 'px');
      field.style.setProperty('--py', ((y - .5) * 14).toFixed(2) + 'px');
      field.style.setProperty('--hx', (x * 100).toFixed(1) + '%');
      field.style.setProperty('--hy', (y * 100).toFixed(1) + '%');
    });
    field.addEventListener('pointerleave', () => {
      field.style.setProperty('--px', '0px');
      field.style.setProperty('--py', '0px');
      field.style.setProperty('--hx', '50%');
      field.style.setProperty('--hy', '48%');
    });
  }

  // Preview-only prompt cycling: demonstrates the future surface without implying a live agent.
  const examples = [
    'What do you want to accomplish?',
    'Find a capable GPU worker for this job…',
    'Verify this result before settlement…',
    'Discover an agent with the required capability…',
    'Route this task through memory, tools, and compute…'
  ];
  let example = 0;
  let timer;
  const cycle = () => {
    if (!promptText) return;
    example = (example + 1) % examples.length;
    promptText.classList.add('swap');
    setTimeout(() => {
      promptText.textContent = examples[example];
      promptText.classList.remove('swap');
    }, 180);
  };
  if (prompt && promptText && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer = setInterval(cycle, 4200);
    prompt.addEventListener('mouseenter', () => clearInterval(timer));
    prompt.addEventListener('mouseleave', () => timer = setInterval(cycle, 4200));
  }

  // Scroll progress and active navigation.
  const progress = document.querySelector('.page-progress i');
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';

    let active = '';
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= 150) active = s.id;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active));
  };
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Reveal dense systems UI only as it enters view.
  const reveal = [...document.querySelectorAll('.pmod,.network-stage,.rule-surface,.build-topology')];
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    reveal.forEach(el => {
      el.classList.add('reveal-ready');
      io.observe(el);
    });
  } else {
    reveal.forEach(el => el.classList.add('is-visible'));
  }

  // Keyboard shortcut focuses the preview surface visually without pretending it is functional.
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && prompt) {
      e.preventDefault();
      prompt.classList.remove('attention');
      requestAnimationFrame(() => prompt.classList.add('attention'));
      prompt.scrollIntoView({behavior:'smooth', block:'center'});
    }
  });
})();