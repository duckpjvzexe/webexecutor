  const links = document.querySelectorAll('.navbar-links a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  
    document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }

      document.querySelectorAll('.navbar-links a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
const q=document.getElementById('q');
const filter=document.getElementById('filter');

function makeStar(n){
  const wrap=document.createElement('div');wrap.className='rating';
  for(let i=0;i<5;i++){const s=document.createElement('span');s.textContent='★';wrap.appendChild(s)}
  const txt=document.createElement('span');txt.style.marginLeft='8px';txt.style.color='#fff';txt.style.opacity=0.9;txt.textContent=(n||0).toFixed(1);wrap.appendChild(txt);return wrap;
}

function createCard(item){
  const card=document.createElement('div');card.className='card';
  card.dataset.id = String(item.id);
  card.dataset.status = item.status || '';
  
  const head=document.createElement('div');head.className='card-head';
  const av=document.createElement('div');av.className='avatar';
  const img=document.createElement('img');img.alt=item.name+' avatar';img.src=item.avatar;av.appendChild(img);
  const tb=document.createElement('div');tb.className='title-block';
  const title=document.createElement('div');title.className='title';title.textContent=item.name;
  const stars=makeStar(item.rating||4.5);
  tb.appendChild(title);tb.appendChild(stars);
  head.appendChild(av);head.appendChild(tb);

  const row=document.createElement('div');row.className='row-inline';
  const v1=document.createElement('div');
  v1.className='row-item';
  v1.innerHTML=`<div class="label">Version</div><div class="value">${item.version||'—'}</div>`;
  row.appendChild(v1);

  if ((item.platforms.includes('android') || item.platforms.includes('ios')) && (item.versionVng || item.statusVng)) {
    const v2=document.createElement('div');
    v2.className='row-item';
    v2.innerHTML=`<div class="label">VNG Version</div><div class="value">${item.versionVng||'—'}</div>`;
    row.appendChild(v2);

    const s2=document.createElement('div');
    s2.className='row-item';
    const dot2Cls=item.statusVng==='online'?'online':(item.statusVng==='offline'?'offline':'neutral');
    s2.innerHTML=`<div class="label">VNG Status</div><div class="value status-dot"><span class="dot ${dot2Cls}"></span>${item.statusVng? item.statusVng.charAt(0).toUpperCase()+item.statusVng.slice(1):'—'}</div>`;
    row.appendChild(s2);
  }

  const s1=document.createElement('div');s1.className='row-item';
  const dot1Cls=item.status==='online'?'online':(item.status==='offline'?'offline':'neutral');
  s1.innerHTML=`<div class="label">Status</div><div class="value status-dot"><span class="dot ${dot1Cls}"></span>${item.status? item.status.charAt(0).toUpperCase()+item.status.slice(1):'—'}</div>`;
  row.appendChild(s1);

  const actions=document.createElement('div');actions.className='actions';
  const dl=document.createElement('button');dl.className='btn primary';dl.textContent='Download';
  if(item.downloadUrl) dl.onclick=()=>window.open(item.downloadUrl,'_blank');else dl.disabled=true;
  actions.appendChild(dl);

  if ((item.platforms.includes('android') || item.platforms.includes('ios')) && item.downloadVngUrl) {
    const dlv=document.createElement('button');dlv.className='btn vng';dlv.textContent='VNG';
    dlv.onclick=()=>window.open(item.downloadVngUrl,'_blank');
    actions.appendChild(dlv);
  }

  card.appendChild(head);card.appendChild(row);card.appendChild(actions);
  return card;
}

function renderPlatform(platform){
  const grid=document.getElementById(`grid-${platform}`);
  const section=document.getElementById(`${platform}-executors`);
  if(!grid || !section) return;
  let list=data.filter(it=>it.platforms&&it.platforms.includes(platform));
  if(q.value){
    const qv=q.value.trim().toLowerCase();
    list=list.filter(it=>[it.name,it.version,it.versionVng,it.status,it.statusVng].join(' ').toLowerCase().includes(qv));
  }
  if(filter.value==='online') list=list.filter(it=>it.status==='online');
  if(filter.value==='offline') list=list.filter(it=>it.status==='offline');
  if(filter.value==='hasVng') list=list.filter(it=>(it.versionVng||it.downloadVngUrl));

  grid.innerHTML='';
  if(!list.length){section.style.display='none'; updateStats(); return;} else {section.style.display='block';}

  list.forEach(it=>{
    const card=createCard(it);
    grid.appendChild(card);
    setTimeout(()=>card.classList.add('show'),50);
  });

  updateStats();
}

function updateStats() {
  const qv = q.value.trim().toLowerCase();
  let list = data.filter(it => {
    let match = true;
    if(qv) match = [it.name,it.version,it.versionVng,it.status,it.statusVng]
                   .join(' ').toLowerCase().includes(qv);
    if(filter.value==='online') match = match && it.status==='online';
    if(filter.value==='offline') match = match && it.status==='offline';
    if(filter.value==='hasVng') match = match && (it.versionVng||it.downloadVngUrl);
    return match;
  });

  const total = list.reduce((sum,it)=> sum + (it.platforms ? it.platforms.length : 0), 0);
  const online = list.reduce((sum,it)=> sum + (it.status==='online' ? it.platforms.length : 0), 0);
  const offline = list.reduce((sum,it)=> sum + (it.status==='offline' ? it.platforms.length : 0), 0);

  document.getElementById('total-count').textContent = total;
  document.getElementById('online-count').textContent = online;
  document.getElementById('offline-count').textContent = offline;
}

function renderAll() {
  const platforms = ['android','ios','windows','macos'];
  platforms.forEach(platform => {
    const grid = document.getElementById(`grid-${platform}`);
    const section = document.getElementById(`${platform}-executors`);
    if(!grid || !section) return;

    let list = data.filter(it => it.platforms && it.platforms.includes(platform));

    if(q.value){
      const qv = q.value.trim().toLowerCase();
      list = list.filter(it => [it.name,it.version,it.versionVng,it.status,it.statusVng].join(' ').toLowerCase().includes(qv));
    }
    if(filter.value==='online') list = list.filter(it=>it.status==='online');
    if(filter.value==='offline') list = list.filter(it=>it.status==='offline');
    if(filter.value==='hasVng') list = list.filter(it=>(it.versionVng||it.downloadVngUrl));

    grid.innerHTML='';
    if(!list.length){section.style.display='none'; return;} else {section.style.display='block';}
    list.forEach(it=>{
      const card=createCard(it);
      grid.appendChild(card);
      setTimeout(()=>card.classList.add('show'),50);
    });
  });

  updateStats();
}

function showOnly(platform){
  const btns=document.querySelectorAll('.platform-btn');
  btns.forEach(b=>b.classList.remove('active'));

  if(platform==='all'){
    ['android','ios','windows','macos'].forEach(p=>document.getElementById(p+'-executors').style.display='block');
    renderAll();
    if(btns[0]) btns[0].classList.add('active');
  } else {
    ['android','ios','windows','macos'].forEach(p=>document.getElementById(p+'-executors').style.display=(p===platform?'block':'none'));
    renderPlatform(platform);
    btns.forEach(btn=>{
      if(btn.textContent.trim().toLowerCase().includes(platform)) btn.classList.add('active');
    });
  }
}

if(q) q.addEventListener('input',()=>renderAll());
if(filter) filter.addEventListener('change',()=>renderAll());

showOnly('all');

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 123) {
        event.preventDefault();
        return false;
    }
    if ((event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74))) {
        event.preventDefault();
        return false;
    }
    if (event.ctrlKey && event.keyCode === 85) {
        event.preventDefault();
        return false;
    }
});
