(() => {
  const hero = document.querySelector('.hero-scene');
  const promptText = document.querySelector('.hero-prompt-copy span');
  const hoverPrompt = document.querySelector('.hover-prompt');
  const hoverPromptText = hoverPrompt?.querySelector('span');
  const promptSources = [...document.querySelectorAll('[data-prompt]')];
  const navLinks = [...document.querySelectorAll('.nav-center a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const progress = document.querySelector('.page-progress i');
  const defaultPrompt = promptText?.textContent || 'What do you want to accomplish?';

  if (hero && matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      hero.style.setProperty('--px', ((x - .5) * 14).toFixed(2) + 'px');
      hero.style.setProperty('--py', ((y - .5) * 10).toFixed(2) + 'px');
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

  const showPrompt = source => {
    const suggestion = source.dataset.prompt;
    if (!suggestion || !promptText || !hoverPrompt || !hoverPromptText) return;
    promptText.textContent = suggestion;
    hoverPromptText.textContent = suggestion;
    hoverPrompt.classList.add('visible');
  };

  const clearPrompt = () => {
    if (promptText) promptText.textContent = defaultPrompt;
    hoverPrompt?.classList.remove('visible');
  };

  promptSources.forEach(source => {
    source.addEventListener('mouseenter', () => showPrompt(source));
    source.addEventListener('mouseleave', clearPrompt);
    source.addEventListener('focus', () => showPrompt(source));
    source.addEventListener('blur', clearPrompt);
  });


  const protocolSteps = [...document.querySelectorAll('.protocol-step[data-stage]')];
  const protocolItems = [...document.querySelectorAll('.protocol-item[data-stage]')];

  const setProtocolStage = stage => {
    protocolSteps.forEach(step => step.classList.toggle('active', step.dataset.stage === stage));
    protocolItems.forEach(item => item.classList.toggle('active', item.dataset.stage === stage));
  };

  const clearProtocolStage = () => {
    protocolSteps.forEach(step => step.classList.remove('active'));
    protocolItems.forEach(item => item.classList.remove('active'));
  };

  protocolSteps.forEach(step => {
    const activate = () => setProtocolStage(step.dataset.stage);
    step.addEventListener('mouseenter', activate);
    step.addEventListener('focus', activate);
    step.addEventListener('mouseleave', clearProtocolStage);
    step.addEventListener('blur', clearProtocolStage);
    step.addEventListener('click', activate);
  });

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