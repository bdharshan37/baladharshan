/* "Designing in code": a simple section. Text on the left, one Three.js particle asset on the right that
   keeps turning between the two halves of the idea: code  </>  and AI  ✦. Same particle language as the Impact section. */
(function(){
  const host=document.getElementById('ai');if(!host)return;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,P=window.PF||{ai:{done:9,total:11,tools:['Cursor','Claude','Storybook']}};

  const css=document.createElement('style');css.textContent=`
  .dc{margin-top:140px}
  .dc .k{font-size:13px;color:var(--muted);margin-bottom:22px}.dc .k i{font:12px var(--mono);font-style:normal;color:var(--fg);margin-right:10px}
  .dc-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:center}
  .dc h2{font-weight:500;font-size:clamp(26px,3.4vw,42px);letter-spacing:-.045em;line-height:1.08}
  .dc h2 mark{background:none;color:inherit;background-image:linear-gradient(var(--accent),var(--accent));background-repeat:no-repeat;background-position:0 92%;background-size:100% .1em}
  .dc .tx{margin-top:26px;font-size:17px;line-height:1.6;color:var(--muted);max-width:42ch}
  .dc .tl{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px}.dc .tl span{font-size:13px;border:1px solid var(--fg);border-radius:99px;padding:4px 14px}
  .dc .stat{margin-top:34px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-size:14px}
  .dc .dots{display:flex;gap:6px}.dc .dots i{width:11px;height:11px;border-radius:50%;border:1px solid var(--fg)}.dc .dots i.f{background:var(--accent);border-color:var(--accent)}
  .dc .stage{position:relative;aspect-ratio:1/1;max-height:520px;width:100%;border:1px solid var(--line);background:var(--bg);overflow:hidden;cursor:pointer}
  .dc .stage canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
  .dc .stage .cap{position:absolute;left:14px;right:14px;bottom:10px;display:flex;justify-content:space-between;font-size:12px;color:var(--muted);pointer-events:none}
  .dc .stage .cap b{font-weight:400;color:var(--accent);transition:opacity .3s}
  @media(max-width:860px){.dc-g{grid-template-columns:1fr;gap:32px}.dc{margin-top:100px}.dc .stage{max-height:400px}}
  `;document.head.appendChild(css);

  host.className='dc';
  host.innerHTML=`<div class="k"><i>04</i>Designing in code</div>
    <div class="dc-g"><div><h2>I’ve been <mark>designing in code</mark>, with Claude as my pair.</h2>
      <p class="tx">I prompt, review and refine in Storybook, so customers click through something real in the same call. That is how Workflows shipped in 25 days.</p>
      <div class="tl">${P.ai.tools.map(t=>`<span>${t}</span>`).join('')}</div>
      <div class="stat"><span>${P.ai.done} of my ${P.ai.total} projects went from idea to working screens this way.</span><span class="dots">${Array.from({length:P.ai.total},(_,i)=>`<i class="${i<P.ai.done?'f':''}"></i>`).join('')}</span></div></div>
      <div class="stage" id="dcst" role="img" aria-label="A particle sculpture that turns between code brackets and an AI sparkle"><canvas></canvas><div class="cap"><b id="dccap">code</b><span>click to switch</span></div></div></div>`;
  const stage=document.getElementById('dcst'),cv=stage.querySelector('canvas'),capEl=document.getElementById('dccap');
  if(!window.THREE){stage.style.display='none';return}

  /* ---------- two shapes, sampled from canvas drawings ---------- */
  const T=window.THREE,N=5200,LOG=256,SZ=512;
  const css0=getComputedStyle(document.documentElement),ACC=css0.getPropertyValue('--accent').trim()||'#FF3B1F',INK='#0B0B0B';
  const off=document.createElement('canvas');off.width=off.height=SZ;const o=off.getContext('2d',{willReadFrequently:true});
  const star=(cx,cy,r)=>{o.beginPath();o.moveTo(cx,cy-r);o.quadraticCurveTo(cx+r*.06,cy-r*.06,cx+r,cy);o.quadraticCurveTo(cx+r*.06,cy+r*.06,cx,cy+r);o.quadraticCurveTo(cx-r*.06,cy+r*.06,cx-r,cy);o.quadraticCurveTo(cx-r*.06,cy-r*.06,cx,cy-r);o.closePath();o.fill()};
  const DRAW=[
    ()=>{/* code: </> */o.font='800 132px Inter, system-ui, sans-serif';o.textBaseline='middle';const w=['<','/','>'].map(s=>o.measureText(s).width),tot=w[0]+w[1]+w[2],x0=LOG/2-tot/2;
      o.fillStyle=INK;o.fillText('<',x0,LOG/2+4);o.fillStyle=ACC;o.fillText('/',x0+w[0],LOG/2+4);o.fillStyle=INK;o.fillText('>',x0+w[0]+w[1],LOG/2+4)},
    ()=>{/* AI: a sparkle and two small ones */o.fillStyle=ACC;star(118,138,104);o.fillStyle=INK;star(206,52,34);star(52,208,24)}
  ];
  const shapes=[],colors=[];
  DRAW.forEach(draw=>{
    o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,SZ,SZ);o.setTransform(2,0,0,2,0,0);draw();o.setTransform(1,0,0,1,0,0);
    const d=o.getImageData(0,0,SZ,SZ).data,idx=[];for(let i=0;i<SZ*SZ;i++)if(d[i*4+3]>150)idx.push(i);
    const Pp=new Float32Array(N*3),C=new Float32Array(N*3);
    for(let i=0;i<N;i++){const pI=idx[(Math.random()*idx.length)|0],xx=pI%SZ+Math.random()-.5,yy=Math.floor(pI/SZ)+Math.random()-.5;
      Pp[i*3]=(xx-SZ/2)/SZ*6.4;Pp[i*3+1]=-(yy-SZ/2)/SZ*6.4;Pp[i*3+2]=(Math.random()-.5)*.35;C[i*3]=d[pI*4]/255;C[i*3+1]=d[pI*4+1]/255;C[i*3+2]=d[pI*4+2]/255}
    shapes.push(Pp);colors.push(C)});

  /* ---------- Three.js ---------- */
  let renderer;try{renderer=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch(e){stage.style.display='none';return}
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
  const scene=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,100);cam.position.set(0,0,12.5);
  const pos=new Float32Array(shapes[0]),col=new Float32Array(colors[0]);for(let i=0;i<N*3;i++)pos[i]+=(Math.random()-.5)*9;   // starts scattered and assembles
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(pos,3));geo.setAttribute('color',new T.BufferAttribute(col,3));
  const tex=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.beginPath();x.arc(32,32,30,0,7);x.fillStyle='#fff';x.fill();return new T.CanvasTexture(c)})();
  const group=new T.Group();group.add(new T.Points(geo,new T.PointsMaterial({size:.1,vertexColors:true,map:tex,transparent:true,alphaTest:.3,depthWrite:false,sizeAttenuation:true})));scene.add(group);
  const fit=()=>{const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};
  new ResizeObserver(fit).observe(stage);fit();

  let cur=0,age=0,vis=false,last=0,tx=0,ty=0,mx=0,my=0;
  const NAMES=['code','AI'];
  const toggle=()=>{cur=(cur+1)%2;age=0;capEl.style.opacity=0;setTimeout(()=>{capEl.textContent=NAMES[cur];capEl.style.opacity=1},180)};
  stage.addEventListener('click',toggle);
  stage.addEventListener('pointermove',e=>{const b=stage.getBoundingClientRect();tx=(e.clientX-b.left)/b.width-.5;ty=(e.clientY-b.top)/b.height-.5});
  stage.addEventListener('pointerleave',()=>{tx=ty=0});
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)requestAnimationFrame(frame)}).observe(stage);

  function frame(t){
    if(!vis)return;const dt=Math.min(.05,(t-last)/1000||.016);last=t;age+=dt;
    if(!reduce&&age>3.6)toggle();                              // turn between code and AI on its own
    const tp=shapes[cur],tc=colors[cur],k=reduce?1:.07;
    for(let i=0;i<N*3;i++){pos[i]+=(tp[i]-pos[i])*k;col[i]+=(tc[i]-col[i])*.1}
    geo.attributes.position.needsUpdate=true;geo.attributes.color.needsUpdate=true;
    mx+=(tx-mx)*.06;my+=(ty-my)*.06;const time=t*.001;
    group.rotation.y=mx*.9+(reduce?0:Math.sin(time*.6)*.18);group.rotation.x=my*.5+(reduce?0:Math.sin(time*.45)*.06);
    renderer.render(scene,cam);requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  window.__dc={frame,toggle};
})();
