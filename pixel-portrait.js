// Pixel engine. One image resolves from a few big blocks up to full detail.
// modes: 'duo' (palette-limited, dithered 8-bit), 'halftone' (dots), 'color' (plain pixelation)
window.pixelPortrait=function(o){
  const cv=o.canvas,cx=cv.getContext('2d'),cap=o.caption,mode=o.mode||'duo';
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const levels=o.levels||(mode==='color'?[3,5,8,13,20,32,52,84]:[4,6,9,14,22,34,50,72]);
  const key=o.keyBackdrop!==undefined?o.keyBackdrop:mode!=='color';
  const bayer=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
  const hex=h=>{h=h.replace('#','');return[0,2,4].map(i=>parseInt(h.substr(i,2),16))};
  const mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
  const img=new Image();img.src=o.src;let ready=false,crop=o.crop;
  img.onload=()=>{ready=true;if(!crop){const a=cv.width/cv.height,ia=img.width/img.height;crop=ia>a?{h:img.height,w:img.height*a,x:(img.width-img.height*a)/2,y:0}:{w:img.width,h:img.width/a,x:0,y:(img.height-img.width/a)/2}}};
  const tiny=document.createElement('canvas'),tx=tiny.getContext('2d',{willReadFrequently:true});
  let lvl=-1,dir=0,timer=null;
  function draw(n){
    const w=n,h=Math.max(1,Math.round(n*cv.height/cv.width));tiny.width=w;tiny.height=h;
    tx.imageSmoothingEnabled=true;tx.drawImage(img,crop.x,crop.y,crop.w,crop.h,0,0,w,h);
    const d=tx.getImageData(0,0,w,h).data,cw=cv.width/w,ch=cv.height/h;
    cx.clearRect(0,0,cv.width,cv.height);
    const accent=hex((getComputedStyle(document.documentElement).getPropertyValue('--accent')||'#F2B35E').trim());
    const dark=o.dark||[30,33,38],pal=[dark,mix(dark,accent,.5),accent,mix(accent,[255,255,255],.8)],ink=o.ink||accent;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=(y*w+x)*4,r=d[i],g=d[i+1],b=d[i+2];
      if(key&&r>215&&g>150&&g<215&&b<90)continue;
      if(mode==='color'){cx.fillStyle='rgb('+r+','+g+','+b+')';cx.fillRect(Math.floor(x*cw),Math.floor(y*ch),Math.ceil(cw),Math.ceil(ch));continue}
      let l=(0.3*r+0.59*g+0.11*b)/255;l=Math.min(1,Math.max(0,(l-.12)*1.25));
      if(mode==='halftone'){const rad=cw*.62*Math.sqrt(1-l);if(rad<.4)continue;cx.fillStyle='rgb('+ink.join(',')+')';cx.beginPath();cx.arc((x+.5)*cw,(y+.5)*ch,rad,0,6.283);cx.fill();continue}
      const t=l*3+(bayer[(y%4)*4+(x%4)]/16-.5)*(n>16?.9:.2);
      const c=pal[Math.min(3,Math.max(0,Math.round(t)))];
      cx.fillStyle='rgb('+c.join(',')+')';cx.fillRect(Math.floor(x*cw),Math.floor(y*ch),Math.ceil(cw),Math.ceil(ch));
    }
  }
  function show(i){
    lvl=i;
    if(i<0){cx.clearRect(0,0,cv.width,cv.height);cv.classList.remove('on');if(cap)cap.textContent='';return}
    cv.classList.add('on');draw(levels[i]);
    if(cap)cap.textContent=(o.label||'portrait.png')+' '+Math.round((i+1)/levels.length*100)+'%'+(i===levels.length-1?' ✓':'');
  }
  function run(){
    clearTimeout(timer);
    if(!ready){timer=setTimeout(run,80);return}
    if(reduce){show(dir>0?levels.length-1:-1);return}
    const next=lvl+dir;
    if(next>=levels.length||next<-1)return;
    show(next);timer=setTimeout(run,dir>0?(o.speed||95):45);
  }
  const on=()=>{dir=1;run()},off=()=>{dir=-1;run()};
  if(o.hover){
    o.hover.addEventListener('mouseenter',on);o.hover.addEventListener('mouseleave',o.keep?()=>{}:off);
    o.hover.addEventListener('focusin',on);o.hover.addEventListener('focusout',o.keep?()=>{}:off);
    o.hover.addEventListener('touchstart',()=>{dir>0&&lvl===levels.length-1&&!o.keep?off():on()},{passive:true});
  }
  if(o.auto){new IntersectionObserver((es,io)=>es.forEach(e=>{if(e.isIntersecting){io.disconnect();on()}}),{threshold:.2}).observe(cv)}
  if(o.replay){cv.addEventListener('mouseenter',()=>{if(lvl===levels.length-1){lvl=-1;on()}})}
  return{on,off};
};
