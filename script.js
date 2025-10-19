// ==========================
// Navbar Active + Smooth Scroll
// ==========================
const navLinks = document.querySelectorAll('.navbar-links a');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Scroll to section smoothly
    const targetId = this.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });

    // Active link highlight
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ==========================
// Helpers
// ==========================
const q = document.getElementById('q');
const filter = document.getElementById('filter');

function makeStar(rating) {
  const wrap = document.createElement('div');
  wrap.className = 'rating';
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  for (let i = 0; i < totalStars; i++) {
    const s = document.createElement('span');
    if (i < fullStars) {
      s.style.color = '#fbbf24';
      s.textContent = '★';
    } else if (i === fullStars && halfStar) {
      s.style.color = '#fbbf24';
      s.textContent = '⯨';
    } else {
      s.style.color = '#555';
      s.textContent = '★';
    }
    wrap.appendChild(s);
  }

  const txt = document.createElement('span');
  txt.style.marginLeft = '8px';
  txt.style.color = '#fff';
  txt.style.opacity = 0.9;
  txt.textContent = (rating || 0).toFixed(1);
  wrap.appendChild(txt);
  return wrap;
}

// ==========================
// Card Rendering
// ==========================
function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = item.id || '';
  card.dataset.status = item.status || '';

  const head = document.createElement('div');
  head.className = 'card-head';

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.innerHTML = `<img src="${item.avatar}" alt="${item.name}">`;

  const titleBlock = document.createElement('div');
  titleBlock.className = 'title-block';
  titleBlock.innerHTML = `<div class="title">${item.name}</div>`;
  titleBlock.appendChild(makeStar(item.rating || 4.5));

  head.appendChild(avatar);
  head.appendChild(titleBlock);

  const row = document.createElement('div');
  row.className = 'row-inline';

  // Version
  row.innerHTML += `
    <div class="row-item">
      <div class="label">Version</div>
      <div class="value">${item.version || '—'}</div>
    </div>
  `;

  // Status
  const dotCls =
    item.status === 'online' ? 'online' :
    item.status === 'offline' ? 'offline' : 'neutral';
  row.innerHTML += `
    <div class="row-item">
      <div class="label">Status</div>
      <div class="value status-dot">
        <span class="dot ${dotCls}"></span>
        ${item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : '—'}
      </div>
    </div>
  `;

  // VNG fields
  if (
    (item.platforms.includes('android') || item.platforms.includes('ios')) &&
    (item.versionVng || item.statusVng)
  ) {
    const dotVngCls =
      item.statusVng === 'online' ? 'online' :
      item.statusVng === 'offline' ? 'offline' : 'neutral';
    row.innerHTML += `
      <div class="row-item">
        <div class="label">VNG Version</div>
        <div class="value">${item.versionVng || '—'}</div>
      </div>
      <div class="row-item">
        <div class="label">VNG Status</div>
        <div class="value status-dot">
          <span class="dot ${dotVngCls}"></span>
          ${item.statusVng ? item.statusVng.charAt(0).toUpperCase() + item.statusVng.slice(1) : '—'}
        </div>
      </div>
    `;
  }

  // Buttons
  const actions = document.createElement('div');
  actions.className = 'actions';

  const btnMain = document.createElement('button');
  btnMain.className = 'btn primary';
  btnMain.innerHTML = '<i class="fa-solid fa-download"></i> Download';
  if (item.downloadUrl) btnMain.onclick = () => window.open(item.downloadUrl, '_blank');
  else btnMain.disabled = true;
  actions.appendChild(btnMain);

  if (item.downloadVngUrl) {
    const btnVng = document.createElement('button');
    btnVng.className = 'btn vng';
    btnVng.innerHTML = '<i class="fa-solid fa-download"></i> VNG';
    btnVng.onclick = () => window.open(item.downloadVngUrl, '_blank');
    actions.appendChild(btnVng);
  }

  card.appendChild(head);
  card.appendChild(row);
  card.appendChild(actions);

  return card;
}

// ==========================
// Filtering + Rendering Logic
// ==========================
function renderPlatform(platform) {
  const grid = document.getElementById(`grid-${platform}`);
  const section = document.getElementById(`${platform}-executors`);
  if (!grid || !section) return;

  let list = data.filter(it => it.platforms && it.platforms.includes(platform));
  const qv = q.value.trim().toLowerCase();

  if (qv)
    list = list.filter(it =>
      [it.name, it.version, it.versionVng, it.status, it.statusVng]
        .join(' ')
        .toLowerCase()
        .includes(qv)
    );

  if (filter.value === 'online') list = list.filter(it => it.status === 'online');
  if (filter.value === 'offline') list = list.filter(it => it.status === 'offline');
  if (filter.value === 'hasVng') list = list.filter(it => it.versionVng || it.downloadVngUrl);

  grid.innerHTML = '';
  section.style.display = list.length ? 'block' : 'none';

  list.forEach((it, i) => {
    const card = createCard(it);
    grid.appendChild(card);
    setTimeout(() => card.classList.add('show'), 40 * i);
  });

  updateStats();
}

function renderAll() {
  ['android', 'ios', 'windows', 'macos'].forEach(p => renderPlatform(p));
}

function updateStats() {
  const qv = q.value.trim().toLowerCase();
  let list = data.filter(it => {
    let match = true;
    if (qv)
      match = [it.name, it.version, it.versionVng, it.status, it.statusVng]
        .join(' ')
        .toLowerCase()
        .includes(qv);
    if (filter.value === 'online') match = match && it.status === 'online';
    if (filter.value === 'offline') match = match && it.status === 'offline';
    if (filter.value === 'hasVng') match = match && (it.versionVng || it.downloadVngUrl);
    return match;
  });

  const total = list.length;
  const online = list.filter(it => it.status === 'online').length;
  const offline = list.filter(it => it.status === 'offline').length;

  document.getElementById('total-count').textContent = total;
  document.getElementById('online-count').textContent = online;
  document.getElementById('offline-count').textContent = offline;
}

// ==========================
// Platform Switching
// ==========================
function showOnly(platform) {
  const btns = document.querySelectorAll('.platform-btn');
  btns.forEach(b => b.classList.remove('active'));

  if (platform === 'all') {
    ['android', 'ios', 'windows', 'macos'].forEach(p =>
      document.getElementById(`${p}-executors`).style.display = 'block'
    );
    renderAll();
    if (btns[0]) btns[0].classList.add('active');
  } else {
    ['android', 'ios', 'windows', 'macos'].forEach(p =>
      document.getElementById(`${p}-executors`).style.display = p === platform ? 'block' : 'none'
    );
    renderPlatform(platform);
    btns.forEach(btn => {
      if (btn.textContent.trim().toLowerCase().includes(platform))
        btn.classList.add('active');
    });
  }
}

// ==========================
// Events
// ==========================
if (q) q.addEventListener('input', renderAll);
if (filter) filter.addEventListener('change', renderAll);

// Initial render
showOnly('all');

// ==========================
// Anti Inspect (Optional)
// ==========================
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.keyCode === 123) e.preventDefault();
  if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) e.preventDefault();
  if (e.ctrlKey && e.keyCode === 85) e.preventDefault();
});
