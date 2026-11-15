/* Case studies, "presented live": a rotary telephone you dial to connect.
   The old phone keypad letters spell the code: C·A·S·E = 2·2·7·3. A right number rings, then connects and
   reveals what a case-study call looks like and how to book one. */
(function(){
  const root=document.getElementById('call');if(!root)return;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const CODE='2273',LETTERS=['C','A','S','E'],cx=150,cy=150;
  const $=id=>document.getElementById(id);
  const ang=d=>100-30*(d===0?10:d);                       /* hole angle, degrees clockwise from the top */
  const pt=(a,r)=>[cx+r*Math.sin(a*Math.PI/180),cy-r*Math.cos(a*Math.PI/180)];
  const circ=(x,y,r)=>`M${x-r},${y}a${r},${r} 0 1,0 ${2*r},0a${r},${r} 0 1,0 ${-2*r},0Z`;

  /* ----- the 3D dial (lazy loaded) ----- */
  $('dial').innerHTML='<div id="stage" role="img" aria-label="Rotary telephone dial. Pull a number round to the finger stop and let go, or press a number key. Dial 2 2 7 3 to connect."></div>';
  const stage=$('stage');
  new IntersectionObserver((es,io)=>{if(es[0].isIntersecting){io.disconnect();import('./dial3d/dial3d.js').catch(()=>{stage.textContent='The 3D dial needs WebGL.'})}},{rootMargin:'400px'}).observe(stage);
  stage.addEventListener('dialed',e=>{if(!done)push(e.detail.digit)});
  const num=$('num'),ctext=$('ctext'),conn=$('conn'),cline=$('cline');

  /* ----- number display ----- */
  num.innerHTML=LETTERS.map(l=>`<span><b></b><small>${l}</small></span>`).join('');
  const slots=[...num.querySelectorAll('b')];
  let seq='',done=false,timer=null,t0=0;
  const paint=()=>slots.forEach((s,i)=>s.textContent=seq[i]||'');

  function push(d){
    seq+=d;paint();
    if(seq.length<4){ctext.textContent=seq.length+' of 4 digits';return}
    if(seq===CODE)connect();
    else{num.classList.add('err');ctext.textContent='Wrong number. Try C · A · S · E on the keypad letters.';
      setTimeout(()=>{num.classList.remove('err');seq='';paint();ctext.textContent='Dial C · A · S · E (2 · 2 · 7 · 3) to connect'},900)}}

  function connect(){
    done=true;root.classList.add('ringing');ctext.textContent='Ringing…';
    setTimeout(()=>{root.classList.remove('ringing');root.classList.add('live');t0=Date.now();
      const tick=()=>{const s=Math.floor((Date.now()-t0)/1000);ctext.textContent='Connected · '+String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
      tick();timer=setInterval(tick,1000);conn.classList.add('on');
      setTimeout(()=>conn.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'}),350)},reduce?0:1700)}
  function hangUp(){clearInterval(timer);done=false;seq='';paint();root.classList.remove('live','ringing');conn.classList.remove('on');ctext.textContent='Dial C · A · S · E (2 · 2 · 7 · 3) to connect'}

  root.addEventListener('click',e=>{if(e.target.closest('#hang'))hangUp()});

  /* ----- what the call is ----- */
  const list=(window.PJ||[]).filter(p=>['workflows','slack','protect','conditional-access'].includes(p.slug));
  const mail='mailto:'+PF.email+'?subject='+encodeURIComponent('Case study call')+'&body='+encodeURIComponent('Hi Baladharshan,\n\nI would like to book a 30-minute call to walk through your case studies.\n\nThanks');
  conn.innerHTML=`<div class="connin">
    <div class="agenda"><small>On the call · about 30 minutes</small><ol>${list.map((p,i)=>`<li><i>0${i+1}</i><b>${p.name}</b><span>${p.metric} ${p.metricL}</span></li>`).join('')}</ol></div>
    <div class="how"><small>How it works</small><p>I share my screen and walk through each project: the problem, the real screens, and the decisions I would defend. Bring questions, and pick the one you want to go deep on.</p>
      <div class="cta"><a class="btn" href="${mail}">Book the call →</a><a class="lnk" href="${PF.resume}" target="_blank" rel="noopener">Résumé ↗</a><button type="button" id="hang">Hang up</button></div></div></div>`;
})();
