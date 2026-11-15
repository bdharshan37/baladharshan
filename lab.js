/* Terminal "work lab": three of my JumpCloud projects as animations.
   All three sit on the page as finished, static frames. As each one scrolls into view it rewinds and
   replays, tied to its own scroll position (scroll back up to rewind). */
(function(){
  const host=document.getElementById('labs');if(!host)return;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const W=590,H=330,cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t,seg=(t,a,b)=>cl((t-a)/(b-a)),
        ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  let ctx,A,F,M,L,B,BAD='#E5584B';

  /* drawing helpers (logical 590×330 space) */
  const box=(x,y,w,h,o={})=>{ctx.beginPath();ctx.rect(x,y,w,h);if(o.fill){ctx.fillStyle=o.fill;ctx.fill()}ctx.strokeStyle=o.stroke||L;ctx.lineWidth=o.lw||1;ctx.setLineDash(o.dash||[]);ctx.stroke();ctx.setLineDash([])};
  const tx=(s,x,y,c,al,sz)=>{ctx.font=(sz||12)+'px "IBM Plex Mono",ui-monospace,monospace';ctx.fillStyle=c||F;ctx.textAlign=al||'left';ctx.textBaseline='middle';ctx.fillText(s,x,y)};
  const ln=(x1,y1,x2,y2,c,lw,dash)=>{ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=c||L;ctx.lineWidth=lw||1;ctx.setLineDash(dash||[]);ctx.stroke();ctx.setLineDash([])};
  const dot=(x,y,r,c)=>{ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fillStyle=c;ctx.fill()};
  const glow=(x,y,r,c)=>{ctx.globalAlpha=.18;dot(x,y,r*2.4,c);ctx.globalAlpha=1;dot(x,y,r,c)};

  /* ---------- scene 1: conditional access (BLOCK → MFA → ALLOW; it ends on the happy path) ---------- */
  const OUT=[{l:'ALLOW'},{l:'REQUIRE MFA'},{l:'BLOCK'}];
  const CA=[{u:'unknown',dev:'managed',loc:'unknown VPN',risk:'high',o:2,ok:[1,0,0],end:'→ BLOCK  ·  40% fewer access-related tickets'},
            {u:'sam@acme',dev:'unmanaged',loc:'Bangalore',risk:'low',o:1,ok:[0,1,1],end:'→ REQUIRE MFA  (step-up, not a wall)'},
            {u:'priya@acme',dev:'managed',loc:'Bangalore',risk:'low',o:0,ok:[1,1,1],end:'→ ALLOW  (no friction for trusted devices)'}];
  function s1(t){
    const k=Math.min(2,Math.floor(t*3)),u=t*3-k,D=CA[k],gx=205,gw=175,gy=24,gh=282,oy=[62,165,268];
    OUT[0].c=A;OUT[1].c=F;OUT[2].c=BAD;
    box(14,138,92,54,{stroke:M});tx('sign-in',60,156,F,'center');tx(D.u,60,176,M,'center',10);
    ln(106,165,gx,165,L);
    OUT.forEach((o,i)=>{const on=u>.84&&i===D.o;ln(gx+gw,165,455,oy[i],on?o.c:L,on?2:1);
      box(455,oy[i]-24,124,48,{stroke:on?o.c:L,fill:on?o.c:null,lw:on?2:1});tx(o.l,517,oy[i],on?B:M,'center')});
    box(gx,gy,gw,gh,{stroke:A});tx('conditional-access',gx+gw/2,gy+17,A,'center',11);
    [['device',D.dev],['location',D.loc],['risk',D.risk]].forEach((r,i)=>{const y=gy+62+i*70,show=u>.24+.13*i;
      tx(r[0],gx+14,y,M,'left',11);ln(gx+14,y+14,gx+gw-14,y+14,L);
      if(show){tx(r[1],gx+14,y+32,D.ok[i]?A:BAD,'left',13);tx(D.ok[i]?'✓':'✗',gx+gw-16,y+32,D.ok[i]?A:BAD,'right',14)}
      else tx('· · ·',gx+14,y+32,M,'left',13)});
    let px,py;if(u<.22){px=lerp(106,gx,u/.22);py=165}else if(u<.62){px=gx;py=165}else{const v=ease(seg(u,.62,.84));px=lerp(gx+gw,455,v);py=lerp(165,oy[D.o],v)}
    if(u<.84){if(u>=.22&&u<.62)ln(gx,165,gx+gw,165,A,1,[3,4]);glow(px,py,4,A)}
    return ['$ policy eval --user '+D.u+' --app salesforce',u>.5?'device='+D.dev+'  location='+D.loc+'  risk='+D.risk:'',u>.84?D.end:''];
  }

  /* ---------- scene 2: TOTP cloud backup ---------- */
  const code=i=>{let h=(Math.imul(i+7,2654435761))>>>0;h^=h>>>13;h=Math.imul(h,1274126177)>>>0;return String(h%1000000).padStart(6,'0')};
  const phone=(x,y,w,h,label,alpha,c,ring,state)=>{
    ctx.globalAlpha=alpha;box(x,y,w,h,{stroke:state==='ghost'?M:F,dash:state==='ghost'?[4,4]:[]});tx(label,x+w/2,y-14,M,'center',11);
    if(c){ln(x+w/2-14,y+14,x+w/2+14,y+14,L,3);tx(c.slice(0,3)+' '+c.slice(3),x+w/2,y+h/2+6,F,'center',16);
      ctx.beginPath();ctx.arc(x+w/2,y+h/2-30,13,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-ring));ctx.strokeStyle=A;ctx.lineWidth=3;ctx.stroke()}
    ctx.globalAlpha=1};
  function s2(t){
    const win=Math.floor(t*40),ring=(t*40)%1,lost=seg(t,.48,.58),rest=seg(t,.62,.92),cx=295,cy=150;
    phone(18,64,96,200,'phone A',1-lost*.8,lost>.5?null:code(win),ring,'live');
    if(lost>.3){tx('✗ lost',66,164,BAD,'center',13)}
    phone(476,64,96,200,'new phone',.35+.65*rest,rest>.55?code(win):null,ring,rest>.55?'live':'ghost');
    if(rest>.9)tx('✓ restored',524,282,A,'center',11);
    const cc=t>.1?A:M;ctx.beginPath();ctx.arc(cx-34,cy+8,26,Math.PI*.5,Math.PI*1.5);ctx.arc(cx-6,cy-18,34,Math.PI,Math.PI*2);ctx.arc(cx+30,cy+6,28,Math.PI*1.5,Math.PI*.5);ctx.closePath();
    ctx.strokeStyle=cc;ctx.lineWidth=1.6;ctx.stroke();tx('encrypted',cx-4,cy-2,cc,'center',11);tx('seed vault',cx-4,cy+14,M,'center',10);
    const flow=(x1,x2,a,b,rev)=>{const v=seg(t,a,b);if(v<=0||v>=1)return;ln(x1,cy,x2,cy,L,1,[3,5]);
      for(let i=0;i<5;i++){const f=((t*14+i/5)%1);const x=rev?lerp(x2,x1,f):lerp(x1,x2,f);dot(x,cy,3,A)}};
    flow(118,244,.1,.5,false);flow(346,472,.62,.92,true);
    return t<.48?['$ totp seed --encrypt --backup','seeds sealed with your key, synced to the cloud']
          :t<.62?['! device lost','without a backup: re-enrol every account, one by one']
          :['$ totp restore --device new-phone',rest>.9?'codes match ✓   ~$1M MRR retained at renewal':'unsealing seeds…'];
  }

  /* ---------- scene 3: workflows ---------- */
  const NODES=[['trigger','user joins','Engineering'],['condition','device','managed?'],['action','assign','policy'],['action','notify','#it-ops']];
  function s3(t){
    const p=t*4.3,y=84,w=118,h=76,xs=[10,157,304,451];
    NODES.forEach((n,i)=>{const run=p>=i&&p<i+.7,done=p>=i+.7,x=xs[i];
      box(x,y,w,h,{stroke:run?A:done?A:L,fill:done?A:null,lw:run?2:1});
      tx(n[0],x+10,y+14,done?B:M,'left',10);tx(n[1],x+10,y+38,done?B:F,'left',13);tx(n[2],x+10,y+56,done?B:F,'left',13);
      if(done)tx('✓',x+w-12,y+14,B,'right',12);
      if(i<3){const v=seg(p,i+.7,i+1),x1=x+w,x2=xs[i+1];ln(x1,y+h/2,x2,y+h/2,L);if(v>0){ln(x1,y+h/2,lerp(x1,x2,v),y+h/2,A,2);if(v<1)glow(lerp(x1,x2,v),y+h/2,4,A)}}
      if(run){const pr=(p-i)/.7;ctx.fillStyle=A;ctx.fillRect(x,y+h-3,w*pr,3)}});
    const orgs=Math.round(lerp(93,232,ease(seg(t,.05,.95))));
    tx('orgs running workflows',10,214,M,'left',11);tx(String(orgs),580,214,F,'right',22);
    box(10,228,570,10,{stroke:L});ctx.fillStyle=A;ctx.fillRect(10,228,570*(orgs/232),10);
    tx('93 → 232',10,258,M,'left',11);
    tx(p>=4?'run complete · first working workflow in 20 min (was 2h 45)':'running…',10,290,p>=4?A:M,'left',12);
    const done=NODES.map((n,i)=>p>=i+.7?'✓ '+n[0]:'').filter(Boolean);
    return ['$ workflow run onboard-engineer',done.join('   '),p>=4?'~$2M MRR of customer demand answered':''];
  }

  /* ---------- cards ---------- */
  const SCENES=[['conditional-access',s1,.9],['totp-cloud-backup',s2,.75],['workflows',s3,.75]];
  host.innerHTML=SCENES.map((s,i)=>`<div class="wl-in" data-i="${i}"><div class="wl-h"><span class="t">./${s[0]}</span><span class="n">0${i+1}/03</span></div><canvas></canvas><div class="wl-log"></div></div>`).join('');
  const cards=[...host.children].map((el,i)=>({el,cv:el.querySelector('canvas'),log:el.querySelector('.wl-log'),n:el.querySelector('.n'),i,last:'',state:''}));

  function draw(){
    const cs=getComputedStyle(document.documentElement),vh=innerHeight;
    A=cs.getPropertyValue('--accent').trim()||'#F2B35E';F=cs.getPropertyValue('--fg').trim()||'#D7D9DC';M=cs.getPropertyValue('--muted').trim()||'#868B93';L=cs.getPropertyValue('--line').trim()||'#2A2D32';B=cs.getPropertyValue('--bg').trim()||'#15171A';
    cards.forEach(c=>{
      const r=c.el.getBoundingClientRect();if(r.bottom<-40||r.top>vh+40)return;
      /* t: 0 as the card enters at the bottom, 1 once it has travelled `span` of the viewport — then it rests as a finished frame */
      const span=SCENES[c.i][2],t=reduce?1:cl((vh*.92-r.top)/(vh*span));
      const cssW=c.cv.clientWidth||W,sc=cssW/W,dpr=Math.min(devicePixelRatio||1,2),ph=Math.round(H*sc);
      if(c.cv.style.height!==ph+'px')c.cv.style.height=ph+'px';
      if(c.cv.width!==Math.round(cssW*dpr)){c.cv.width=Math.round(cssW*dpr);c.cv.height=Math.round(ph*dpr)}
      ctx=c.cv.getContext('2d');ctx.setTransform(dpr*sc,0,0,dpr*sc,0,0);ctx.clearRect(0,0,W,H);
      const lines=SCENES[c.i][1](Math.min(.9999,t));
      const key=lines.join('|');if(key!==c.last){c.last=key;c.log.innerHTML=lines.filter(Boolean).map((l,i)=>`<div>${i===0?'<i>$</i>':''}${l.replace(/^\$ /,'').replace(/^(→|!)/,'<b>$1</b>')}</div>`).join('')}
      const st=t>=1?'done':t<=0?'start':'run';if(st!==c.state){c.state=st;c.n.textContent=st==='run'?'running…':'0'+(c.i+1)+'/03'}
    });
  }
  let tick=false;const req=()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;draw()})};
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req);setInterval(draw,600);
  (document.fonts&&document.fonts.ready||Promise.resolve()).then(draw);draw();
})();
