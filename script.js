let currentPlatform = 'all';
let prioritizeOnline = true;
const q = document.getElementById('q');
const filter = document.getElementById('filter');

function stars(n) {
  const full = Math.floor(n), half = (n - full) >= 0.5;
  let s = '';
  for (let i = 0; i < 5; i++) {
    const cls = i < full ? 'filled' : (i === full && half ? 'half' : 'empty');
    s += `<span class="star ${cls}">★</span>`;
  }
  return `<div class="star-rating">${s}<span class="rating-val">${n.toFixed(1)}</span></div>`;
}

function dotCls(st) { return st === 'online' ? 'online' : 'offline'; }
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'; }

function createCard(item) {
  const hasMobile = item.platforms.includes('android') || item.platforms.includes('ios');
  const hasVng = hasMobile && (item.versionVng || item.statusVng);

  let vngRows = '';
  if (hasVng) {
    vngRows = `
      <div class="row-item">
        <div class="label">VNG Version</div>
        <div class="value mono">${item.versionVng || '—'}</div>
      </div>
      <div class="row-item">
        <div class="label">VNG Status</div>
        <div class="value status-val"><span class="dot ${dotCls(item.statusVng)}"></span>${cap(item.statusVng)}</div>
      </div>`;
  }

  const dlDisabled = item.downloadUrl ? '' : 'disabled';
  const dlClick = item.downloadUrl ? `onclick="window.open('${item.downloadUrl}','_blank')"` : '';
  const vngBtn = (hasMobile && item.downloadVngUrl)
    ? `<button class="btn btn-vng" onclick="window.open('${item.downloadVngUrl}','_blank')">VNG</button>`
    : '';

  const warn = item.warn
    ? `<div class="warn-badge"><span class="warn-dot"></span>High ban risk</div>`
    : '';

  return `
    <div class="card${item.warn ? ' card-warn' : ''}">
      ${warn}
      <div class="card-head">
        <div class="avatar"><img src="${item.avatar}" alt="${item.name}" onerror="this.style.display='none'" /></div>
        <div class="title-block">
          <div class="title">${item.name}</div>
          ${stars(item.rating)}
        </div>
      </div>
      <div class="row-inline">
        <div class="row-item">
          <div class="label">Version</div>
          <div class="value mono">${item.version || '—'}</div>
        </div>
        <div class="row-item">
          <div class="label">Status</div>
          <div class="value status-val"><span class="dot ${dotCls(item.status)}"></span>${cap(item.status)}</div>
        </div>
        ${vngRows}
      </div>
      <div class="actions">
        <button class="btn btn-primary" ${dlDisabled} ${dlClick}>Download</button>
        ${vngBtn}
      </div>
    </div>`;
}

function getFiltered() {
  const qv = q.value.trim().toLowerCase();
  const fv = filter.value;
  let result = DATA.filter(it => {
    if (qv && ![it.name, it.version, it.versionVng, it.status, it.statusVng].join(' ').toLowerCase().includes(qv)) return false;
    if (fv === 'online' && it.status !== 'online') return false;
    if (fv === 'offline' && it.status !== 'offline') return false;
    if (fv === 'hasVng' && !(it.versionVng || it.downloadVngUrl)) return false;
    return true;
  });

  result.sort((a, b) => {
    if (a.status === 'online' && b.status !== 'online') return -1;
    if (a.status !== 'online' && b.status === 'online') return 1;
    return b.rating - a.rating;
  });

  return result;
}

function renderAll() {
  const list = getFiltered();
  const platforms = ['android', 'ios', 'windows', 'macos'];
  let anyVisible = false;

  platforms.forEach(p => {
    const section = document.getElementById(`${p}-section`);
    const grid = document.getElementById(`grid-${p}`);
    const cnt = document.getElementById(`${p}-count`);
    if (!section || !grid) return;

    const show = currentPlatform === 'all' || currentPlatform === p;
    if (!show) { section.style.display = 'none'; return; }

    const items = list.filter(it => it.platforms.includes(p));
    cnt.textContent = items.length;
    if (!items.length) { section.style.display = 'none'; return; }

    section.style.display = 'block';
    anyVisible = true;
    grid.innerHTML = items.map(it => createCard(it)).join('');
    grid.querySelectorAll('.card').forEach((el, i) => {
      setTimeout(() => el.classList.add('show'), i * 40);
    });
  });

  document.getElementById('empty-state').style.display = anyVisible ? 'none' : 'block';

  const online = list.filter(it => it.status === 'online').length;
  const offline = list.filter(it => it.status === 'offline').length;
  document.getElementById('total-count').textContent = list.length;
  document.getElementById('online-count').textContent = online;
  document.getElementById('offline-count').textContent = offline;
}

function showOnly(platform, btn) {
  currentPlatform = platform;
  document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAll();
}

q.addEventListener('input', renderAll);
filter.addEventListener('change', renderAll);
renderAll();

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.keyCode === 123) { e.preventDefault(); return false; }
  if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) { e.preventDefault(); return false; }
  if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); return false; }
});
