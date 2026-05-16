const toggle = document.getElementById('menuToggle');
const panel = document.getElementById('menuPanel');
const overlay = document.getElementById('menuOverlay');
const iconH = document.getElementById('iconHamburger');
const iconX = document.getElementById('iconClose');
let menuOpen = false; // boolean

function toggleMenu() {
  menuOpen = !menuOpen;
  panel.classList.toggle('open', menuOpen);
  overlay.classList.toggle('open', menuOpen);
  iconH.style.display = menuOpen ? 'none' : 'block';
  iconX.style.display = menuOpen ? 'block' : 'none';
}

toggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

function setupSubmenu(btnId, subId) {
  const btn = document.getElementById(btnId);
  const sub = document.getElementById(subId);
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

setupSubmenu('btnProduct', 'subProduct');
setupSubmenu('btnCompany', 'subCompany');
setupSubmenu('btnConnect', 'subConnect');
