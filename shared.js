(function(){
  const P=window.PF;
  // word-by-word blur-in
  window.splitWords=(el,delay=0)=>{
    const t=el.textContent;el.textContent='';el.setAttribute('aria-label',t);
    t.split(' ').forEach((w,i)=>{const s=document.createElement('span');s.className='w';s.setAttribute('aria-hidden','true');s.style.setProperty('--i',i);s.style.setProperty('--d',delay+'ms');s.textContent=w;el.append(s,' ')});
  };
  // scroll reveal
  window.reveal=()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
    document.querySelectorAll('.rv').forEach((el,i)=>{el.style.setProperty('--i',i%5);io.observe(el)});
  };
  // gated deck (placeholder: deck is built later)
  window.gate=root=>{
    if(!root)return;
    const f=root.querySelector('form'),err=root.querySelector('.err');
    f.addEventListener('submit',e=>{e.preventDefault();root.classList.remove('shake');void root.offsetWidth;root.classList.add('shake');
      err.innerHTML='Deck is coming soon. <a style="text-decoration:underline" href="mailto:'+P.email+'?subject=Deck%20access">Request access via email ↗</a>'});
  };
  // command palette
  window.palette=(extra=[])=>{
    const items=[...extra,
      {l:'Email me',h:'mail',go:()=>location.href='mailto:'+P.email},
      {l:'Copy email',h:'copy',go:()=>navigator.clipboard&&navigator.clipboard.writeText(P.email)},
      {l:'Resume (PDF)',h:'pdf',go:()=>window.open(P.resume,'_blank')},
      {l:P.studio.name+' studio',h:'↗',go:()=>window.open(P.studio.url,'_blank')}];
    const hint=document.createElement('div');hint.className='hint';hint.innerHTML='<b>/</b> Jump anywhere';
    const pal=document.createElement('div');pal.className='pal';pal.innerHTML='<div class="pal-box"><input placeholder="Jump to…" aria-label="Jump to"><ul></ul></div>';
    document.body.append(hint,pal);
    const inp=pal.querySelector('input'),ul=pal.querySelector('ul');let cur=0,list=items;
    const draw=()=>{ul.innerHTML='';list.forEach((it,i)=>{const li=document.createElement('li');li.className=i===cur?'on':'';li.innerHTML='<span>'+it.l+'</span><span>'+(it.h||'')+'</span>';li.onclick=()=>run(it);ul.append(li)})};
    const run=it=>{close();it.go()};
    const open=()=>{pal.classList.add('open');inp.value='';list=items;cur=0;draw();inp.focus()};
    const close=()=>pal.classList.remove('open');
    hint.onclick=open;pal.onclick=e=>{if(e.target===pal)close()};
    inp.oninput=()=>{const q=inp.value.toLowerCase();list=items.filter(i=>i.l.toLowerCase().includes(q));cur=0;draw()};
    document.addEventListener('keydown',e=>{
      const typing=/INPUT|TEXTAREA/.test(document.activeElement.tagName);
      if((e.key==='/'&&!typing)||(e.key==='k'&&(e.metaKey||e.ctrlKey))){e.preventDefault();open()}
      else if(pal.classList.contains('open')){
        if(e.key==='Escape')close();
        else if(e.key==='ArrowDown'){e.preventDefault();cur=Math.min(cur+1,list.length-1);draw()}
        else if(e.key==='ArrowUp'){e.preventDefault();cur=Math.max(cur-1,0);draw()}
        else if(e.key==='Enter'&&list[cur])run(list[cur]);
      }});
  };
  window.jump=id=>()=>document.getElementById(id).scrollIntoView({behavior:'smooth'});
})();
// ---- scroll + accordion interactions ----
(function(){
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  // project cards inside an expanded company row
  window.projHTML=w=>!w.projects?'':'<div class="acc"><div><div class="pjs">'+w.projects.map(p=>
    `<a class="pj" href="${p.url}" ${p.url.startsWith('http')?'target="_blank" rel="noopener"':''}><img src="${p.img}" alt="" loading="lazy"><span class="pj-m">${p.m}</span><span class="pj-t">${p.t}</span><span class="pj-d">${p.d}</span><span class="pj-go">${p.cta||'View project'} ↗</span></a>`).join('')+'</div></div></div>';
  // toggle rows that have projects
  window.bindAcc=root=>{
    root.querySelectorAll('[data-acc]').forEach(r=>{
      const head=r.querySelector('.head');head.setAttribute('role','button');head.tabIndex=0;head.setAttribute('aria-expanded','false');
      const t=()=>{const o=r.classList.toggle('open');head.setAttribute('aria-expanded',o)};
      head.onclick=t;head.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}};
    });
  };
  // thin progress bar
  window.progress=()=>{
    const b=document.createElement('div');b.className='prog';document.body.append(b);
    const f=()=>{const h=document.documentElement;b.style.transform='scaleX('+(scrollY/(h.scrollHeight-innerHeight||1))+')'};
    addEventListener('scroll',f,{passive:true});f();
  };
  // current-section spy
  window.spy=(ids,cb)=>{
    const els=ids.map(i=>document.getElementById(i)).filter(Boolean);
    const f=()=>{let cur=null;els.forEach(e=>{if(e.getBoundingClientRect().top<innerHeight*.4)cur=e.id});cb(cur)};
    addEventListener('scroll',f,{passive:true});f();
  };
  // count-up numbers when they enter view
  window.countUps=sel=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
      const el=e.target,m=el.textContent.match(/^([^\d]*)([\d.]+)(.*)$/);if(!m||reduce)return;
      const end=parseFloat(m[2]),dec=(m[2].split('.')[1]||'').length,t0=performance.now(),d=1100;
      const step=t=>{const k=Math.min(1,(t-t0)/d),v=end*(1-Math.pow(1-k,3));el.textContent=m[1]+v.toFixed(dec)+m[3];if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.6});
    document.querySelectorAll(sel).forEach(el=>io.observe(el));
  };
  // gentle scroll-linked drift: elements with data-drift move at a fraction of scroll
  window.drift=()=>{
    if(reduce)return;const els=[...document.querySelectorAll('[data-drift]')];
    const f=()=>els.forEach(e=>{const y=scrollY,k=parseFloat(e.dataset.drift);e.style.transform='translateY('+(y*k)+'px)';if(e.dataset.fade)e.style.opacity=Math.max(0,1-y/(innerHeight*.7))});
    addEventListener('scroll',f,{passive:true});f();
  };
})();
// ---- page wipes, clock, thanks loop ----
(function(){
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,KEY='pf-wipe';
  window.pageWipe=()=>{
    const el=document.createElement('div');el.className='wipe';el.innerHTML='<span></span>';document.body.append(el);
    const lab=el.firstChild;let inc=null;try{inc=sessionStorage.getItem(KEY);sessionStorage.removeItem(KEY)}catch(e){}
    if(inc){lab.textContent=inc;el.classList.add('cover');setTimeout(()=>{el.classList.remove('cover');el.classList.add('out')},reduce?0:380)}
    addEventListener('pageshow',e=>{if(e.persisted){el.className='wipe'}});
    document.addEventListener('click',e=>{
      const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
      let u;try{u=new URL(a.href)}catch(_){return}
      if(u.origin!==location.origin||!/\.html?$/.test(u.pathname))return;
      if(u.pathname===location.pathname&&u.search===location.search)return;
      e.preventDefault();const label=a.dataset.go||u.pathname.split('/').pop().replace(/\.html?$/,'');
      try{sessionStorage.setItem(KEY,label)}catch(_){}
      if(reduce){location.href=a.href;return}
      lab.textContent=label;el.className='wipe in';setTimeout(()=>location.href=a.href,480);
    });
  };
  window.clock=el=>{const f=()=>el.textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Kolkata',hour12:false}).format(new Date())+' IST';f();setInterval(f,20000)};
  window.thanksLoop=el=>{const L=window.PF.thanks;let i=0;el.textContent=L[0];if(reduce)return;
    setInterval(()=>{el.classList.add('sw');setTimeout(()=>{i=(i+1)%L.length;el.textContent=L[i];el.classList.remove('sw')},260)},2000)};
  window.store={get(k,d){try{return localStorage.getItem(k)||d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
})();

/* lightbox: lightbox(selector) — every matching element needs data-src + data-cap; click opens the full image */
(function(){
  let box,img,cap,num,list=[],i=0;
  const build=()=>{box=document.createElement('div');box.className='lb';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Image viewer');
    box.innerHTML='<button class="lb-x" aria-label="Close">close · esc</button><img alt=""><div class="lb-bar"><button class="lb-p" aria-label="Previous">← prev</button><span class="lb-cap"></span><span class="lb-n"></span><button class="lb-nx" aria-label="Next">next →</button></div>';
    document.body.appendChild(box);img=box.querySelector('img');cap=box.querySelector('.lb-cap');num=box.querySelector('.lb-n');
    box.addEventListener('click',e=>{if(e.target===box||e.target.closest('.lb-x'))close();else if(e.target.closest('.lb-p'))go(-1);else if(e.target.closest('.lb-nx'))go(1)});
    addEventListener('keydown',e=>{if(!box.classList.contains('on'))return;if(e.key==='Escape')close();else if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1)});
    let sx=0;box.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});box.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)go(d<0?1:-1)});};
  const show=()=>{const it=list[i];img.classList.remove('ok');img.onload=()=>img.classList.add('ok');img.src=it.src;img.alt=it.cap;cap.textContent=it.cap;num.textContent=(i+1)+' / '+list.length;
    box.querySelector('.lb-p').style.visibility=box.querySelector('.lb-nx').style.visibility=list.length>1?'visible':'hidden'};
  const go=d=>{i=(i+d+list.length)%list.length;show()};
  const close=()=>{box.classList.remove('on');document.documentElement.style.overflow='';if(box._from)box._from.focus({preventScroll:true})};
  window.lightbox=sel=>{if(!box)build();list=[...document.querySelectorAll(sel)];
    list.forEach((el,n)=>{el.setAttribute('data-lb','');el.tabIndex=0;el.setAttribute('role','button');
      const open=()=>{i=n;box._from=el;show();box.classList.add('on');document.documentElement.style.overflow='hidden'};
      el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});
    list=list.map(el=>({src:el.dataset.src,cap:el.dataset.cap||''}))};
})();
