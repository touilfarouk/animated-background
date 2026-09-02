const config = {
  theme: 'system',
};

const themeButtons = [...document.querySelectorAll('[data-theme-option]')];

const updateThemeUI = () => {
  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeOption === config.theme;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const update = () => {
  document.documentElement.dataset.theme = config.theme;
  updateThemeUI();
};

const sync = () => {
  if (!document.startViewTransition) return update();
  document.startViewTransition(() => update());
};

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    config.theme = button.dataset.themeOption;
    sync();
  });
});

update();

const list = document.querySelector('ul');
const items = [...list.querySelectorAll('li')];

const setActiveItem = (target) => {
  const closest = target?.closest?.('li');
  if (!closest) return;

  const index = items.indexOf(closest);
  if (index === -1) return;

  items.forEach((item, i) => {
    item.dataset.active = String(i === index);
  });

  const columns = items
    .map((_, i) => (i === index ? 'minmax(220px, 6fr)' : 'minmax(48px, 0.85fr)'))
    .join(' ');

  list.style.gridTemplateColumns = columns;
};

const resync = () => {
  const nextWidth = Math.max(...items.map((item) => item.offsetWidth));
  list.style.setProperty('--article-width', String(nextWidth));
};

items.forEach((item) => {
  item.dataset.active = 'false';
});

if (items.length) {
  setActiveItem(items[0]);
}

list.addEventListener('focusin', (event) => setActiveItem(event.target));
list.addEventListener('click', (event) => setActiveItem(event.target));
list.addEventListener('pointermove', (event) => setActiveItem(event.target));
window.addEventListener('resize', resync);
resync();