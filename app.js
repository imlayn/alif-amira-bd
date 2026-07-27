(function () {
  let pages = [];
  let current = 0;

  const bookEl = document.getElementById('book');
  const dotsEl = document.getElementById('dots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const countEl = document.getElementById('pageCount');

  function renderPage(page, index) {
    const el = document.createElement('div');
    el.className = 'page' + (index === current ? ' active' : '');
    el.dataset.index = index;

    const illustration = document.createElement('div');
    illustration.className = 'illustration';
    const img = document.createElement('img');
    img.src = page.image;
    img.alt = page.planete || ('Page ' + (index + 1));
    illustration.appendChild(img);
    el.appendChild(illustration);

    if (page.planete) {
      const label = document.createElement('p');
      label.className = 'planete-label';
      label.textContent = page.planete;
      el.appendChild(label);
    }

    const dialogueBox = document.createElement('div');
    dialogueBox.className = 'dialogue-box';
    page.dialogue.forEach((line) => {
      const p = document.createElement('p');
      const isSpeech = line.includes(':') && line.includes('«');
      p.className = isSpeech ? 'speech' : '';
      p.textContent = line;
      dialogueBox.appendChild(p);
    });
    el.appendChild(dialogueBox);

    return el;
  }

  function renderDots() {
    dotsEl.innerHTML = '';
    pages.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', 'Aller à la page ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    });
  }

  function update() {
    document.querySelectorAll('.page').forEach((el, i) => {
      el.classList.toggle('active', i === current);
    });
    document.querySelectorAll('.dot').forEach((el, i) => {
      el.classList.toggle('active', i === current);
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === pages.length - 1;
    countEl.textContent = (current + 1) + ' / ' + pages.length;
  }

  function goTo(index) {
    if (index < 0 || index >= pages.length) return;
    current = index;
    update();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  let touchStartX = null;
  bookEl.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  bookEl.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev();
    }
    touchStartX = null;
  }, { passive: true });

  fetch('data/pages.json')
    .then((res) => res.json())
    .then((data) => {
      pages = data;
      pages.forEach((page, i) => {
        bookEl.appendChild(renderPage(page, i));
      });
      renderDots();
      update();
    })
    .catch((err) => {
      bookEl.innerHTML = '<p style="padding:24px">Impossible de charger les pages (' + err.message + ').</p>';
    });
})();
