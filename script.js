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
    .map((_, i) => (i === index ? '10fr' : '1fr'))
    .join(' ');

  list.style.gridTemplateColumns = columns;
};

const resync = () => {
  const width = Math.max(...items.map((item) => item.offsetWidth));
  list.style.setProperty('--article-width', String(width));
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