(function () {
  const toggle  = document.getElementById('menuToggle');
  const panel   = document.getElementById('menuPanel');
  const overlay = document.getElementById('menuOverlay');
  const iconH   = document.getElementById('iconHamburger');
  const iconX   = document.getElementById('iconClose');
  let menuOpen  = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    panel.classList.toggle('open', menuOpen);
    overlay.classList.toggle('open', menuOpen);
    iconH.style.display = menuOpen ? 'none' : 'block';
    iconX.style.display = menuOpen ? 'block' : 'none';
  }

  if (toggle)  toggle.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);

  function setupSubmenu(btnId, subId) {
    const btn = document.getElementById(btnId);
    const sub = document.getElementById(subId);
    if (!btn || !sub) return;
    btn.addEventListener('click', () => {
      const isOpen = sub.classList.contains('open');
      document.querySelectorAll('.submenu').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
      if (!isOpen) {
        sub.classList.add('open');
        btn.classList.add('active');
      }
    });
  }

  setupSubmenu('btnProduct',  'subProduct');
  setupSubmenu('btnCompany',  'subCompany');
  setupSubmenu('btnConnect',  'subConnect');

  const NAV_ITEMS = document.querySelectorAll('.nav-item');
  if (!NAV_ITEMS.length) return;

  let closeTimer = null;

  function openItem(item) {
    clearTimeout(closeTimer);
    NAV_ITEMS.forEach(i => { if (i !== item) closeItem(i); });
    item.classList.add('is-open');
    item.querySelector('.nav-link').setAttribute('aria-expanded', 'true');
  }

  function closeItem(item) {
    item.classList.remove('is-open');
    item.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
  }

  function scheduleClose(item) {
    closeTimer = setTimeout(() => closeItem(item), 150);
  }

  NAV_ITEMS.forEach(item => {
    const trigger  = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');

    item.addEventListener('mouseenter', () => openItem(item));
    item.addEventListener('mouseleave', () => scheduleClose(item));

    if (dropdown) {
      dropdown.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      dropdown.addEventListener('mouseleave', () => scheduleClose(item));
    }

    trigger.addEventListener('click', () => {
      if (item.classList.contains('is-open')) {
        clearTimeout(closeTimer);
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') NAV_ITEMS.forEach(closeItem);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item')) NAV_ITEMS.forEach(closeItem);
  });
})();
