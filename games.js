/* "Off the clock": a compact game shelf. Three panels in a row; hover, tap, focus or arrow keys opens one while the
   others fold to slim strips. Art follows the pointer a little, the title decodes in. GSAP does the motion. */
(function(){
  const host=document.getElementById('games');if(!host)return;
  const base=host.dataset.img||'img/',reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,g=window.gsap;

  const G=[
    {t:'Call of Duty: Modern Warfare III',img:'mw3.jpg',pos:'50% 30%'},
    {t:'The Last of Us Part II',img:'tlou2.jpg',pos:'50% 40%'},
    {t:'FIFA',img:'fifa.jpg',pos:'55% 40%'}
  ];

  const css=document.createElement('style');css.textContent=`
  .gm{max-width:1040px;margin:140px auto 0;padding:0 24px}
  .gm .k{font-size:13px;color:var(--muted);margin-bottom:22px}.gm .k i{font:12px var(--mono);font-style:normal;color:var(--fg);margin-right:10px}
  .gm-row{display:flex;gap:8px;height:clamp(300px,42vw,440px)}
  .gp{all:unset;box-sizing:border-box;position:relative;flex:1 1 0;min-width:0;overflow:hidden;background:#0B0B0B;color:#fff;cursor:pointer;isolation:isolate;transition:flex-grow .75s cubic-bezier(.7,0,.2,1)}
  .gp[aria-expanded=true]{flex-grow:5}
  .gp:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
  .gp .pl{position:absolute;inset:-24px;will-change:transform}
  .gp img{width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(.9) brightness(.38);transform:scale(1.08);transition:filter .7s,transform 1.2s cubic-bezier(.2,.7,.2,1);will-change:transform}
  .gp[aria-expanded=true] img{filter:none;transform:scale(1)}
  .gp:not([aria-expanded=true]):hover img{filter:grayscale(.4) brightness(.75)}
  .gp:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(11,11,11,.8),rgba(11,11,11,0) 45%);pointer-events:none}
  .gp .n{position:absolute;left:18px;top:16px;z-index:2;font:12px var(--mono);letter-spacing:.04em;color:rgba(255,255,255,.8)}
  .gp .t{position:absolute;left:18px;bottom:16px;z-index:2;font-size:clamp(20px,2.6vw,34px);font-weight:500;letter-spacing:-.035em;line-height:1.1;white-space:nowrap;opacity:0;transition:opacity .35s}
  .gp[aria-expanded=true] .t{opacity:1;transition-delay:.35s}
  .gp .v{position:absolute;left:16px;bottom:16px;z-index:2;font-size:15px;font-weight:500;letter-spacing:-.01em;white-space:nowrap;writing-mode:vertical-rl;transform:rotate(180deg);transition:opacity .25s}
  .gp[aria-expanded=true] .v{opacity:0}
  .gp .c{position:absolute;z-index:2;width:18px;height:18px;border:0 solid #fff;opacity:0;transition:opacity .4s .3s;pointer-events:none}
  .gp .c.a{right:12px;top:12px;border-width:1px 1px 0 0}.gp .c.b{right:12px;bottom:12px;border-width:0 1px 1px 0}
  .gp[aria-expanded=true] .c{opacity:.8}
  .gm-hint{margin-top:14px;font:12px var(--mono);color:var(--muted)}
  @media(max-width:820px){
    .gm{margin-top:100px}
    .gm-row{flex-direction:column;height:min(116vw,520px)}
    .gp[aria-expanded=true]{flex-grow:6}
    .gp .v{writing-mode:horizontal-tb;transform:none;left:18px;bottom:auto;top:50%;margin-top:-10px;font-size:17px}
    .gp .n{display:none}
  }
  @media(prefers-reduced-motion:reduce){.gp,.gp img,.gp .t{transition:none}}
  `;document.head.appendChild(css);

  host.className='gm';
  host.setAttribute('aria-label','Off the clock: games I play');
  host.innerHTML=`<div class="k"><i>05</i>Off the clock</div>
    <div class="gm-row" id="gmrow" role="group" aria-label="Games I play">${G.map((x,i)=>`<button class="gp" type="button" aria-expanded="${i===0}" aria-label="${x.t}">
      <div class="pl"><img src="${base}${x.img}" alt="" ${i?'loading="lazy"':''} decoding="async" draggable="false" style="object-position:${x.pos}"></div>
      <span class="n">0${i+1}</span><span class="v">${x.t}</span><span class="t">${x.t}</span><i class="c a"></i><i class="c b"></i></button>`).join('')}</div>
    <div class="gm-hint" id="gmk">When I’m not designing, this is what I play.</div>`;

  const row=document.getElementById('gmrow'),ps=[...row.querySelectorAll('.gp')],pls=ps.map(p=>p.querySelector('.pl')),ts=ps.map(p=>p.querySelector('.t'));
  let cur=0;

  const GL='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>',tw=new Map();
  const decode=(el,txt)=>{if(!g||reduce){el.textContent=txt;return}
    if(tw.has(el))tw.get(el).kill();const o={p:0};
    tw.set(el,g.to(o,{p:1,duration:.7,ease:'none',onUpdate:()=>{const k=Math.floor(o.p*txt.length);
      el.textContent=txt.slice(0,k)+[...txt.slice(k)].map(c=>c===' '||c===':'?c:GL[(Math.random()*GL.length)|0]).join('')},onComplete:()=>el.textContent=txt}))};
  ts.forEach((t,i)=>t.textContent=G[i].t);

  const open=i=>{if(i===cur)return;cur=i;ps.forEach((p,k)=>p.setAttribute('aria-expanded',k===i));decode(ts[i],G[i].t)};
  ps.forEach((p,i)=>{
    p.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')open(i)});
    p.addEventListener('click',()=>open(i));
    p.addEventListener('focus',()=>open(i));
    p.addEventListener('keydown',e=>{const d=e.key==='ArrowRight'||e.key==='ArrowDown'?1:e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:0;
      if(d){e.preventDefault();ps[(i+d+ps.length)%ps.length].focus()}});
  });

  /* pointer parallax on the art */
  if(g&&!reduce&&matchMedia('(hover:hover)').matches){
    const q=pls.map(el=>({x:g.quickTo(el,'x',{duration:.9,ease:'power3'}),y:g.quickTo(el,'y',{duration:.9,ease:'power3'})}));
    ps.forEach((p,i)=>{p.addEventListener('pointermove',e=>{const b=p.getBoundingClientRect();q[i].x(-((e.clientX-b.left)/b.width-.5)*28);q[i].y(-((e.clientY-b.top)/b.height-.5)*16)});
      p.addEventListener('pointerleave',()=>{q[i].x(0);q[i].y(0)})});
  }

  /* deal the panels in when the shelf scrolls into view */
  if(g&&!reduce){
    g.set(ps,{opacity:0,y:28});
    new IntersectionObserver((es,io)=>{if(es[0].isIntersecting){io.disconnect();g.to(ps,{opacity:1,y:0,duration:.8,ease:'power3.out',stagger:.12});decode(ts[0],G[0].t)}},{threshold:.25}).observe(row);
  }

  /* gamepad: D-pad or stick left/right switches game */
  let pad=false,cool=0;
  addEventListener('gamepadconnected',()=>{pad=true;document.getElementById('gmk').textContent='Controller connected. D-pad left and right to switch.'});
  (function poll(){
    if(pad){const p=(navigator.getGamepads?navigator.getGamepads():[]).find(Boolean),r=row.getBoundingClientRect();
      if(p&&r.top<innerHeight&&r.bottom>0&&performance.now()>cool){
        const rt=p.buttons[15]?.pressed||p.axes[0]>.6,lt=p.buttons[14]?.pressed||p.axes[0]<-.6;
        if(rt&&cur<ps.length-1){open(cur+1);cool=performance.now()+350}else if(lt&&cur>0){open(cur-1);cool=performance.now()+350}}}
    requestAnimationFrame(poll)})();
})();
