/* Swiss page effects
   1. company logos sit fixed beside their rows
   2. Impact stage: an abstract particle sculpture (Three.js) that re-forms into a recognisable icon for each number.
      ~$2M        a workflow graph: trigger → condition → two actions
      7 areas     the Slack mark, in Slack's four colours
      ~$1M        a cloud with a padlock: codes backed up, renewal kept
      40%         a security shield with a tick: policy decides at sign-in
      20 min      165 minute-blocks collapse to 20 (2D, hover to scrub)
      10M+        the Apple and Google Play marks
   Icons are drawn once to an offscreen canvas and sampled into points, so any shape can be added with a few lines. */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t,seg=(t,a,b)=>clamp((t-a)/(b-a));
  const easeOut=t=>1-Math.pow(1-t,3),ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;

  /* ---------- 1. logos: fixed in place (no scroll animation) ---------- */

  /* ---------- 2. impact stage ---------- */
  const cv=document.getElementById('imcv'),c2=document.getElementById('imcv2');if(!cv||!c2)return;
  const stage=cv.parentElement,rows=[...document.querySelectorAll('#imrows .im')],g=c2.getContext('2d');
  const hudTag=document.getElementById('imtag'),hudN=document.getElementById('imn');
  const TAGS=['JumpCloud Workflows: event → condition → actions','slack: one card, seven areas','cloud + lock: codes restored','shield: policy at sign-in','2h 45 → 20 min','app store · google play'];
  const css=getComputedStyle(document.documentElement),ACC=css.getPropertyValue('--accent').trim()||'#FF3B1F',INK='#0B0B0B',LINE='#E4E4E4',MUT='#737373';
  let age=0,cur=0,vis=false,px=null,py=null,hover=false,W=300,H=300,tx=0,ty=0,mx=0,my=0,lastT=0;

  /* the Impact section is pinned: scroll progress slides the numbers sideways, and the stage follows the slide in view */
  const imx=document.getElementById('impact'),inner=imx.firstElementChild,track=document.getElementById('imrows'),bar=document.getElementById('imbar'),nS=rows.length;
  let slidePos=0;
  const sizeImx=()=>{imx.style.height=(inner.offsetHeight+(nS-1)*innerHeight*.7)+'px'};
  const pick=()=>{const r=imx.getBoundingClientRect(),total=r.height-inner.offsetHeight,P=total>0?clamp((56-r.top)/total):0;slidePos=P*(nS-1);
    track.style.transform='translateX(-'+(slidePos/nS*100)+'%)';bar.style.width=(P*100)+'%';
    const best=clamp(Math.round(slidePos),0,nS-1);
    if(best!==cur||!hudTag.textContent){cur=best;ct=0;age=0;rows.forEach((r2,i)=>r2.classList.toggle('act',i===cur));
      hudTag.textContent=TAGS[cur]||'';hudN.textContent='0'+(cur+1)+' / 0'+nS;
      cv.style.opacity=(cur===4||cur===0)?0:1;c2.style.opacity=(cur===4||cur===0)?1:0}};
  sizeImx();addEventListener('resize',()=>{sizeImx();pick()});
  addEventListener('scroll',pick,{passive:true});
  stage.addEventListener('pointermove',e=>{const b=stage.getBoundingClientRect();px=e.clientX-b.left;py=e.clientY-b.top;hover=true;tx=px/b.width-.5;ty=py/b.height-.5});
  stage.addEventListener('pointerleave',()=>{hover=false;tx=ty=0});
  stage.addEventListener('click',()=>{ct=0;age=0});stage.addEventListener('pointerenter',()=>{if(cur===0&&age>3)age=0});
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)requestAnimationFrame(frame)}).observe(stage);

  /* ---------- icons → point clouds ---------- */
  const N=5600,LOG=256,SZ=512;
  const off=document.createElement('canvas');off.width=off.height=SZ;const o=off.getContext('2d',{willReadFrequently:true});
  const pill=(x,y,w,h,r)=>{o.beginPath();o.moveTo(x+r,y);o.arcTo(x+w,y,x+w,y+h,r);o.arcTo(x+w,y+h,x,y+h,r);o.arcTo(x,y+h,x,y,r);o.arcTo(x,y,x+w,y,r);o.closePath()};
  const APPLE=new Path2D('M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701');
  const PLAY=[['#00A0FF','M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087z'],['#00E676','M13.544 10.989l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179z'],['#FF3D57','M13.544 13.056l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54z'],['#FFC400','M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z']].map(a=>[a[0],new Path2D(a[1])]);
  const DRAW={
    /* workflow graph */
    0(){/* minimal: outlined nodes joined by thin lines, labels live on the 2D layer */
      const arrow=(x,y)=>{o.beginPath();o.moveTo(x-6,y-8);o.lineTo(x+6,y-8);o.lineTo(x,y+2);o.closePath();o.fill()};
      o.lineCap='round';o.lineJoin='round';o.strokeStyle=INK;o.fillStyle=INK;o.lineWidth=4;
      o.beginPath();o.moveTo(128,66);o.lineTo(128,98);o.stroke();arrow(128,106);
      o.beginPath();o.moveTo(128,148);o.lineTo(128,170);o.lineTo(64,170);o.lineTo(64,182);o.moveTo(128,170);o.lineTo(192,170);o.lineTo(192,182);o.stroke();arrow(64,190);arrow(192,190);
      o.strokeStyle=ACC;o.lineWidth=5;
      [[78,26,100,40],[78,108,100,40],[14,190,100,40],[142,190,100,40]].forEach(n=>{pill(n[0],n[1],n[2],n[3],10);o.stroke()})},
    /* Slack mark */
    1(){const cols=['#36C5F0','#2EB67D','#ECB22E','#E01E5A'];o.translate(LOG/2,LOG/2);
      cols.forEach((c,i)=>{o.save();o.rotate(i*Math.PI/2);o.fillStyle=c;pill(10,-112,40,100,20);o.fill();o.beginPath();o.arc(-26,-92,20,0,7);o.fill();o.restore()});
      o.setTransform(1,0,0,1,0,0)},
    /* cloud + padlock */
    2(){o.fillStyle=ACC;o.beginPath();o.arc(80,150,46,Math.PI*.5,Math.PI*1.5);o.arc(124,108,54,Math.PI,Math.PI*2);o.arc(176,146,44,Math.PI*1.5,Math.PI*.5);o.closePath();o.fill();
      o.globalCompositeOperation='destination-out';pill(98,118,60,50,9);o.fill();o.lineWidth=11;o.beginPath();o.arc(128,118,17,Math.PI,0);o.stroke();o.globalCompositeOperation='source-over';
      o.fillStyle=INK;pill(106,126,44,36,7);o.fill();o.strokeStyle=INK;o.lineWidth=7;o.beginPath();o.arc(128,126,13,Math.PI,0);o.stroke()},
    /* shield + tick */
    3(){o.fillStyle=INK;o.beginPath();o.moveTo(128,20);o.lineTo(212,52);o.lineTo(212,124);o.quadraticCurveTo(212,196,128,236);o.quadraticCurveTo(44,196,44,124);o.lineTo(44,52);o.closePath();o.fill();
      o.globalCompositeOperation='destination-out';o.lineWidth=24;o.lineCap='round';o.lineJoin='round';o.beginPath();o.moveTo(88,128);o.lineTo(119,160);o.lineTo(172,96);o.stroke();o.globalCompositeOperation='source-over';o.strokeStyle=ACC;o.lineWidth=6;o.stroke()},
    4(){},
    /* Apple + Google Play */
    5(){o.save();o.translate(8,70);o.scale(5.2,5.2);o.fillStyle=INK;o.fill(APPLE);o.restore();
      o.save();o.translate(132,70);o.scale(5.2,5.2);PLAY.forEach(p=>{o.fillStyle=p[0];o.fill(p[1])});o.restore()}
  };
  const shapes=[],colors=[];
  for(let k=0;k<6;k++){
    const P=new Float32Array(N*3),C=new Float32Array(N*3);
    if(k===4){shapes.push(null);colors.push(null);continue}
    o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,SZ,SZ);o.setTransform(2,0,0,2,0,0);o.globalCompositeOperation='source-over';DRAW[k]();o.setTransform(1,0,0,1,0,0);
    const d=o.getImageData(0,0,SZ,SZ).data,idx=[];for(let i=0;i<SZ*SZ;i++)if(d[i*4+3]>150)idx.push(i);
    for(let i=0;i<N;i++){const pI=idx[(Math.random()*idx.length)|0],xx=pI%SZ+Math.random()-.5,yy=Math.floor(pI/SZ)+Math.random()-.5;
      const W6=6.2*(k===1?.78:1);P[i*3]=(xx-SZ/2)/SZ*W6;P[i*3+1]=-(yy-SZ/2)/SZ*W6;P[i*3+2]=(Math.random()-.5)*.35;
      C[i*3]=d[pI*4]/255;C[i*3+1]=d[pI*4+1]/255;C[i*3+2]=d[pI*4+2]/255}
    shapes.push(P);colors.push(C)}

  /* ---------- Three.js ---------- */
  let renderer=null,cam=null,scene=null,group=null,geo=null,pos=null,col=null;
  if(window.THREE){try{
    const T=window.THREE;renderer=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
    scene=new T.Scene();cam=new T.PerspectiveCamera(40,1,.1,100);cam.position.set(0,0,12.5);
    pos=new Float32Array(shapes[0]);col=new Float32Array(colors[0]);
    /* start scattered so the first icon assembles itself */
    for(let i=0;i<N*3;i++)pos[i]+=(Math.random()-.5)*9;
    geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(pos,3));geo.setAttribute('color',new T.BufferAttribute(col,3));
    const tex=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.beginPath();x.arc(32,32,30,0,7);x.fillStyle='#fff';x.fill();return new T.CanvasTexture(c)})();
    const mat=new T.PointsMaterial({size:.1,vertexColors:true,map:tex,transparent:true,alphaTest:.3,depthWrite:false,sizeAttenuation:true});
    group=new T.Group();group.add(new T.Points(geo,mat));scene.add(group);
  }catch(e){renderer=null}}
  const fit=()=>{const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;W=w;H=h;
    const d=Math.min(devicePixelRatio||1,2);c2.width=w*d;c2.height=h*d;g.setTransform(d,0,0,d,0,0);
    if(renderer){renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}};
  new ResizeObserver(fit).observe(stage);fit();
  if(!renderer)cv.style.display='none';

  /* ---------- 2D scene: 165 minute-blocks collapse to 20 ---------- */
  const txt=(s,x,y,c,al,sz)=>{g.font='400 '+sz+'px Inter,system-ui,sans-serif';g.fillStyle=c;g.textAlign=al||'left';g.textBaseline='middle';g.fillText(s,x,y)};
  const MIN=165,KEEP=20;let ct=0;
  function collapse(dt){
    let p;
    if(hover&&px!=null){p=clamp((px-W*.12)/(W*.76))}
    else{/* scroll-linked: the blocks collapse as this row travels through the middle of the screen */
      p=clamp((slidePos-3.5)/.75)}
    const cols=15,rowsN=11,pad=22,cell=(W-pad*2)/cols,ch=Math.min(cell,(H-130)/rowsN),top=Math.max(40,(H-rowsN*ch)/2-18),sz=ch*.74;
    for(let i=0;i<MIN;i++){const c=i%cols,r=Math.floor(i/cols),rank=(MIN-1-i)/(MIN-KEEP),kept=i<KEEP,gone=!kept?clamp((p-rank*.8)/.2):0;
      if(gone>=1)continue;const s=sz*(1-gone),x=pad+c*cell+(cell-s)/2,y=top+r*ch+(ch-s)/2-gone*10;
      g.globalAlpha=1-gone;g.fillStyle=kept&&p>.9?ACC:(!kept&&p>.02?'#9a9a9a':INK);g.fillRect(x,y,s,s)}
    g.globalAlpha=1;
    txt(hover?'scrubbing: move left / right':'hover to scrub',W-22,28,MUT,'right',12);
    txt('1 block = 1 minute',22,28,MUT,'left',12);
    const mins=lerp(MIN,KEEP,p);g.fillStyle=LINE;g.fillRect(22,H-54,W-44,1);g.fillStyle=ACC;g.fillRect(22,H-54,(W-44)*(mins/MIN),3)}

  /* particles are too coarse for small type, so the workflow graph's labels are drawn on the 2D layer above them */
  function labels(){
    const sc=H/9.1*6.2/LOG,cx=W/2,cy=H/2,a=clamp((age-.7)/.6);if(a<=0)return;
    g.globalAlpha=a;g.font='600 13px Inter,system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';
    [['Trigger',128,46],['If / else',128,128],['Slack',64,210],['Suspend',192,210]].forEach(l=>{g.fillStyle=INK;g.fillText(l[0],cx+(l[1]-128)*sc,cy+(l[2]-128)*sc)});
    g.globalAlpha=1}

  /* ---------- scene 0: an automation, drawn abstractly ----------
     A JumpCloud event starts at the top, a pulse runs down the line, a condition splits it, and two actions complete
     (a device policy and a Slack message). No words. Hover or click to fire it again. */
  const jcImg=new Image();{const l=document.querySelector('.wr .logo img');if(l)jcImg.src=l.getAttribute('src')}
  const dotc=(x,y,r,c)=>{g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=c;g.fill()};
  const lerp2=(a,b,t)=>a+(b-a)*t;
  const along=(pts,t)=>{let tot=0,L=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(d);tot+=d}
    let r=clamp(t)*tot;for(let i=0;i<L.length;i++){if(r<=L[i]){const f=L[i]?r/L[i]:0;return [lerp2(pts[i][0],pts[i+1][0],f),lerp2(pts[i][1],pts[i+1][1],f)]}r-=L[i]}return pts[pts.length-1]};
  const strokePath=(pts,c,lw,dash,off)=>{g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.strokeStyle=c;g.lineWidth=lw;g.setLineDash(dash||[]);g.lineDashOffset=off||0;g.stroke();g.setLineDash([])};
  const rrect=(x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()};
  function node(x,y,s,lit,kind){
    const pop=lit>0?1+.12*Math.sin(clamp(lit*2)*Math.PI):1;g.save();g.translate(x,y);g.scale(pop,pop);
    if(lit>0){g.globalAlpha=.16*(1-lit);g.beginPath();g.arc(0,0,s*(.7+Math.min(lit,1)*.7),0,7);g.fillStyle=ACC;g.fill();g.globalAlpha=1}
    if(kind==='diamond'){g.beginPath();g.moveTo(0,-s*.78);g.lineTo(s*.78,0);g.lineTo(0,s*.78);g.lineTo(-s*.78,0);g.closePath()}else rrect(-s/2,-s/2,s,s,s*.24);
    g.fillStyle='#fff';g.fill();g.strokeStyle=lit>0?ACC:INK;g.lineWidth=lit>0?2.4:1.5;g.stroke();
    g.strokeStyle=INK;g.fillStyle=INK;g.lineWidth=1.6;g.lineCap='round';
    if(kind==='person'){g.beginPath();g.arc(0,-s*.1,s*.13,0,7);g.stroke();g.beginPath();g.arc(0,s*.3,s*.24,Math.PI*1.15,Math.PI*1.85);g.stroke()}
    else if(kind==='device'){g.strokeRect(-s*.24,-s*.2,s*.48,s*.3);g.beginPath();g.moveTo(-s*.34,s*.2);g.lineTo(s*.34,s*.2);g.stroke()}
    else if(kind==='slack'){const cs=['#36C5F0','#2EB67D','#ECB22E','#E01E5A'];cs.forEach((c,i)=>{g.save();g.rotate(i*Math.PI/2);g.fillStyle=c;rrect(s*.04,-s*.3,s*.1,s*.22,s*.05);g.fill();g.beginPath();g.arc(-s*.08,-s*.24,s*.05,0,7);g.fill();g.restore()})}
    if(lit>.55){g.beginPath();g.arc(s*.46,-s*.46,s*.17,0,7);g.fillStyle=ACC;g.fill();g.strokeStyle='#fff';g.lineWidth=1.8;g.beginPath();g.moveTo(s*.38,-s*.46);g.lineTo(s*.44,-s*.4);g.lineTo(s*.55,-s*.53);g.stroke()}
    g.restore()}
  function workflow(dt){
    const P=5.6,T=age%P,cx=W/2,s=Math.min(W,H)*.1,yLogo=H*.12,yTr=H*.30,yCd=H*.50,yBr=H*.64,yAc=H*.80,xL=cx-W*.22,xR=cx+W*.22;
    const top=[[cx,yLogo+s*.5],[cx,yTr-s*.5]],mid=[[cx,yTr+s*.5],[cx,yCd-s*.78]],left=[[cx,yCd+s*.78],[cx,yBr],[xL,yBr],[xL,yAc-s*.5]],right=[[cx,yCd+s*.78],[cx,yBr],[xR,yBr],[xR,yAc-s*.5]];
    const flow=T*18;
    [top,mid,left,right].forEach(p=>strokePath(p,LINE,1.5,[3,6],-flow));
    /* timeline: 0 → 0.6 logo to trigger, 0.6 → 1.3 to condition, 1.3 → 2.7 both branches, then hold, then reset */
    const a=seg(T,0,.6),b=seg(T,.6,1.3),c=seg(T,1.3,2.7),fade=1-seg(T,4.7,5.4);
    const lit=(t0,len=.9)=>reduce?1:fade*clamp((T-t0)/len);
    /* the logo, the event source */
    const lr=s*.62;g.beginPath();g.arc(cx,yLogo,lr,0,7);g.fillStyle='#fff';g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke();
    if(jcImg.complete&&jcImg.naturalWidth)g.drawImage(jcImg,cx-lr*.62,yLogo-lr*.62,lr*1.24,lr*1.24);
    node(cx,yTr,s,lit(.55),'person');node(cx,yCd,s,lit(1.25),'diamond');node(xL,yAc,s,lit(2.7),'device');node(xR,yAc,s,lit(2.7),'slack');
    /* the pulse */
    const pulse=(pts,t)=>{if(t<=0||t>=1)return;const [x,y]=along(pts,t);for(let k=5;k>0;k--){const [tx,ty]=along(pts,Math.max(0,t-k*.03));g.globalAlpha=.1*(6-k);dotc(tx,ty,3.6*(1-k*.1),ACC)}g.globalAlpha=1;dotc(x,y,5,ACC);g.globalAlpha=.25;dotc(x,y,10,ACC);g.globalAlpha=1};
    if(!reduce){pulse(top,a);pulse(mid,b);pulse(left,c);pulse(right,c)}
    txt(hover?'fired again':'hover to run it',W-22,28,MUT,'right',12)}
  function frame(t){
    if(!vis)return;
    const dt=Math.min(.05,(t-lastT)/1000||.016);lastT=t;
    age+=dt;
    if(cur===4){g.clearRect(0,0,W,H);collapse(dt)}
    else if(cur===0){g.clearRect(0,0,W,H);workflow(dt)}
    else if(renderer){
      const tp=shapes[cur],tc=colors[cur],kp=reduce?1:.07,time=t*.001;
      for(let i=0;i<N*3;i++){pos[i]+=(tp[i]-pos[i])*kp;col[i]+=(tc[i]-col[i])*.1}
      geo.attributes.position.needsUpdate=true;geo.attributes.color.needsUpdate=true;
      mx+=(tx-mx)*.06;my+=(ty-my)*.06;
      const k2=cur===0?.15:1;group.rotation.y=(mx*.9+(reduce?0:Math.sin(time*.6)*.18))*k2;group.rotation.x=(my*.5+(reduce?0:Math.sin(time*.45)*.06))*k2;
      renderer.render(scene,cam)}
    requestAnimationFrame(frame)}
  pick();requestAnimationFrame(frame);
  window.__fxFrame=frame;
})();
