/* Rotary dial — a physically believable 3D asset. Built to PROMPT.md.
   Angles are degrees clockwise from 12 o'clock. The plate is the only moving part. */
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';

const DEG=Math.PI/180,clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const HOLE_R=2.28,HOLE_RAD=.40,STOP=122;
const N=d=>d||10;                       // digit 0 is ten pulses
const H=d=>100-30*N(d);                 // hole rest angle
const RMAX=d=>STOP-H(d);                // travel needed to reach the finger stop = 22 + 30n
const VMAX=320;                         // governor return speed, deg/s (≈ 10 pulses per second)
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---------- renderer, scene, camera ---------- */
const host=document.getElementById('stage');
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
host.appendChild(renderer.domElement);
const scene=new THREE.Scene();
scene.environment=new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(),.04).texture;
const camera=new THREE.PerspectiveCamera(28,1,.1,80);
const CAM=new THREE.Vector3(.9,-1.6,16.2);camera.position.copy(CAM);camera.lookAt(0,0,0);

const key=new THREE.DirectionalLight(0xffffff,2.2);key.position.set(-5,6,11);key.castShadow=true;
key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=key.shadow.camera.bottom=-5;key.shadow.camera.right=key.shadow.camera.top=5;
key.shadow.camera.near=1;key.shadow.camera.far=30;key.shadow.bias=-.0004;key.shadow.radius=5;scene.add(key);
scene.add(new THREE.HemisphereLight(0xffffff,0xbfc8cc,.35));
const ground=new THREE.Mesh(new THREE.PlaneGeometry(40,40),new THREE.ShadowMaterial({opacity:.1}));ground.position.z=-.62;ground.receiveShadow=true;scene.add(ground);

/* ---------- materials ---------- */
const M={
  bakelite:new THREE.MeshStandardMaterial({color:0x111111,roughness:.42,metalness:.15}),
  chrome:new THREE.MeshStandardMaterial({color:0xffffff,metalness:1,roughness:.12,envMapIntensity:1.35,side:THREE.DoubleSide}),
  satin:new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.38,clearcoat:.7,clearcoatRoughness:.25,envMapIntensity:1.5}),
  stop:new THREE.MeshStandardMaterial({color:0xe9ecee,metalness:1,roughness:.22,envMapIntensity:2.2}),
  acrylic:new THREE.MeshPhysicalMaterial({color:0xffffff,transmission:1,thickness:.7,roughness:.05,ior:1.49,clearcoat:1,clearcoatRoughness:.04,
    attenuationColor:new THREE.Color(0xffffff),attenuationDistance:8,envMapIntensity:1.4,specularIntensity:1})
};
const lathe=(pts,seg=128)=>{const g=new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg);g.rotateX(Math.PI/2);return g};
const dial=new THREE.Group();scene.add(dial);
const add=(geo,mat,z,o={})=>{const m=new THREE.Mesh(geo,mat);m.position.z=z;m.castShadow=o.cast!==false;m.receiveShadow=o.recv!==false;(o.parent||dial).add(m);return m};

/* housing and bezel */
const housing=add(new THREE.CylinderGeometry(3.28,3.4,.56,128),M.bakelite,-.3);housing.rotation.x=Math.PI/2;
add(lathe([[2.88,0],[3.04,.02],[3.2,.07],[3.3,.15],[3.26,.23],[3.12,.27],[2.98,.23],[2.9,.12]]),M.chrome,-.02);

/* fixed number plate: silver ring, ten white discs, upright numerals */
function numberTexture(){
  const S=2048,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d'),k=S/(2*3.0);
  const g=x.createRadialGradient(S/2,S/2,S*.2,S/2,S/2,S/2);g.addColorStop(0,'#d9dcdc');g.addColorStop(.7,'#c4c8c9');g.addColorStop(1,'#a9aeb0');
  x.fillStyle=g;x.fillRect(0,0,S,S);
  for(let i=0;i<1400;i++){x.strokeStyle='rgba(255,255,255,'+(Math.random()*.05)+')';x.beginPath();const r=Math.random()*S/2,a=Math.random()*7;x.arc(S/2,S/2,r,a,a+Math.random()*.4);x.stroke()}
  x.textAlign='center';x.textBaseline='middle';
  for(let d=0;d<10;d++){const a=H(d)*DEG,px=S/2+HOLE_R*k*Math.sin(a),py=S/2-HOLE_R*k*Math.cos(a);
    const gg=x.createRadialGradient(px,py-10,10,px,py,.5*k);gg.addColorStop(0,'#ffffff');gg.addColorStop(1,'#ececea');
    x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.arc(px+6,py+8,.47*k,0,7);x.fill();
    x.fillStyle=gg;x.beginPath();x.arc(px,py,.46*k,0,7);x.fill();
    x.fillStyle='#111';x.font='700 '+Math.round(.5*k)+'px Inter,Helvetica,Arial,sans-serif';x.fillText(String(d),px,py+.03*k)}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t}
add(new THREE.CircleGeometry(2.96,128),new THREE.MeshStandardMaterial({map:numberTexture(),roughness:.55,metalness:.1}),.03,{cast:false});

/* fixed centre cap */
add(lathe([[.02,.36],[.5,.355],[1,.33],[1.4,.285],[1.56,.22],[1.64,.1]]),M.satin,.04);
add(new THREE.TorusGeometry(1.67,.055,24,128),M.chrome,.14);
add(new THREE.CylinderGeometry(.2,.2,.05,48),M.chrome,.4).rotation.x=Math.PI/2;      // the centre screw

/* rotating finger plate: acrylic ring with ten bevelled holes */
const plate=new THREE.Group();plate.position.z=.1;dial.add(plate);
const shape=new THREE.Shape();shape.absarc(0,0,2.96,0,Math.PI*2,false);
const inner=new THREE.Path();inner.absarc(0,0,1.76,0,Math.PI*2,true);shape.holes.push(inner);
for(let d=0;d<10;d++){const a=H(d)*DEG,h=new THREE.Path();h.absarc(HOLE_R*Math.sin(a),HOLE_R*Math.cos(a),HOLE_RAD,0,Math.PI*2,true);shape.holes.push(h)}
add(new THREE.ExtrudeGeometry(shape,{depth:.14,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:4,curveSegments:96}),M.acrylic,0,{parent:plate});
add(new THREE.TorusGeometry(2.99,.045,16,160),M.chrome,.17,{parent:plate});
add(new THREE.TorusGeometry(1.78,.04,16,128),M.chrome,.17,{parent:plate});

/* fixed finger stop: tapered chrome bar above the plate */
const sp=new THREE.Shape();sp.moveTo(-.17,2.02);sp.lineTo(.17,2.02);sp.lineTo(.12,3.6);sp.quadraticCurveTo(0,3.7,-.12,3.6);sp.closePath();
const stopG=new THREE.Group();stopG.rotation.z=-STOP*DEG;dial.add(stopG);
add(new THREE.ExtrudeGeometry(sp,{depth:.12,bevelEnabled:true,bevelThickness:.03,bevelSize:.03,bevelSegments:3}),M.stop,.22,{parent:stopG});
add(new THREE.CylinderGeometry(.2,.2,.1,32),M.chrome,.22,{parent:stopG}).rotation.x=Math.PI/2;

/* ---------- sound (synthesised) ---------- */
let ac=null,master=null,muted=false,noise=null,whir=null;
const audio=()=>{if(!ac){ac=new (window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=.8;master.connect(ac.destination);
  const b=ac.createBuffer(1,ac.sampleRate*.4,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;noise=b}
  if(ac.state==='suspended')ac.resume();return ac};
function click(gain=.25,freq=3200,dur=.012,q=3){
  if(muted||!ac)return;const t=ac.currentTime,s=ac.createBufferSource(),bp=ac.createBiquadFilter(),g=ac.createGain();
  s.buffer=noise;bp.type='bandpass';bp.frequency.value=freq*(.9+Math.random()*.2);bp.Q.value=q;
  g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(bp).connect(g).connect(master);s.start(t,Math.random()*.2);s.stop(t+dur+.02)}
function thunk(strength){
  if(muted||!ac)return;const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();
  o.frequency.setValueAtTime(120,t);o.frequency.exponentialRampToValueAtTime(45,t+.14);g.gain.setValueAtTime(.5*strength,t);g.gain.exponentialRampToValueAtTime(.001,t+.16);
  o.connect(g).connect(master);o.start(t);o.stop(t+.18);click(.3*strength,900,.05,1.2)}
function whirOn(){if(muted||!ac||whir)return;const s=ac.createBufferSource(),bp=ac.createBiquadFilter(),g=ac.createGain();
  s.buffer=noise;s.loop=true;bp.type='bandpass';bp.frequency.value=950;bp.Q.value=2.2;g.gain.value=0;s.connect(bp).connect(g).connect(master);s.start();whir={s,g}}
function whirSet(v){if(whir)whir.g.gain.setTargetAtTime(.045*v,ac.currentTime,.03)}
function whirOff(){if(!whir)return;whir.g.gain.setTargetAtTime(0,ac.currentTime,.03);const w=whir;whir=null;setTimeout(()=>{try{w.s.stop()}catch(e){}},200)}
const buzz=ms=>{try{if(navigator.vibrate&&(!navigator.userActivation||navigator.userActivation.hasBeenActive))navigator.vibrate(ms)}catch(e){}};

/* ---------- physics state ---------- */
const S={theta:0,omega:0,target:0,mode:'idle',max:0,digit:0,grab:null,auto:null,rt:0,pulses:0,nextT:-1,count:0,shake:0,stopHit:false,ratchet:0,t:0};
const seq=[];
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const inOutCubic=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

function release(){
  S.pulses=S.theta>22?Math.min(10,Math.ceil((S.theta-22)/30)):0;
  S.nextT=S.pulses>0?22+30*(S.pulses-1):-1;S.count=0;S.rt=0;S.omega=0;S.mode='return';S.grab=null;S.auto=null;
  if(S.theta>.5){audio();whirOn()}
}
function startAuto(d){
  if(S.mode!=='idle')return;audio();S.digit=d;S.max=RMAX(d);S.theta=0;S.omega=0;S.stopHit=false;S.ratchet=0;
  const dur=(reduce?.6:1)*(.38+S.max/360*.5);S.auto={t:0,dur,hold:0};S.mode='auto'}
function impact(){
  if(S.stopHit)return;S.stopHit=true;const v=clamp(Math.abs(S.omega)/400,.35,1);thunk(v);buzz(8);
  S.omega=-Math.min(25,Math.abs(S.omega)*.04);S.shake=reduce?0:1}                     // hard stop, a hair of rebound
function finish(){
  whirOff();if(S.pulses>0){const dg=S.pulses===10?0:S.pulses;seq.push(dg);paintNum();
    host.dispatchEvent(new CustomEvent('dialed',{detail:{digit:dg,sequence:seq.join('')}}))}
  S.mode='idle'}

function step(dt){
  S.t+=dt;
  if(S.mode==='auto'){
    const a=S.auto;if(a.t<a.dur){a.t+=dt;S.target=S.max*inOutCubic(clamp(a.t/a.dur,0,1))}
    else{S.target=S.max;a.hold+=dt;if(a.hold>.09&&S.stopHit)release()}
  }
  if(S.mode==='drag'||S.mode==='auto'){
    const k=900,c=2*Math.sqrt(k)*.85;S.omega+=(k*(S.target-S.theta)-c*S.omega)*dt;S.theta+=S.omega*dt;
    if(S.theta<0){S.theta=0;S.omega=Math.max(0,S.omega)}
    if(S.theta>=S.max-.001){S.theta=S.max;impact()}
    const r=Math.floor(S.theta/15);if(r!==S.ratchet){if(r>S.ratchet)click(.07,4200,.008,5);S.ratchet=r}
  }else if(S.mode==='return'){
    S.rt+=dt;const v=VMAX*smooth(0,.09,S.rt);S.theta-=v*dt;whirSet(v/VMAX);
    while(S.nextT>=22&&S.theta<=S.nextT){click(.34,3300,.013,3);buzz(4);S.count++;S.nextT-=30}
    if(S.theta<=0){S.theta=0;S.omega=-v*.045;S.mode='settle';click(.22,1700,.02,1.4);whirOff()}
  }else if(S.mode==='settle'){
    const k=1400,c=2*Math.sqrt(k)*.35;S.omega+=(k*(0-S.theta)-c*S.omega)*dt;S.theta+=S.omega*dt;
    if(Math.abs(S.theta)<.02&&Math.abs(S.omega)<.6){S.theta=0;S.omega=0;finish()}
  }
  S.shake*=Math.exp(-18*dt);
}

/* ---------- pointer interaction ---------- */
const ray=new THREE.Raycaster(),ndc=new THREE.Vector2(),plane=new THREE.Plane(new THREE.Vector3(0,0,1),-.18),hit=new THREE.Vector3();
const toDial=e=>{const r=renderer.domElement.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ndc,camera);return ray.ray.intersectPlane(plane,hit)?hit:null};
const angleOf=p=>Math.atan2(p.x,p.y)/DEG;
const wrap=a=>{while(a>180)a-=360;while(a<-180)a+=360;return a};
const holeAt=p=>{for(let d=0;d<10;d++){const a=H(d)*DEG;if(Math.hypot(p.x-HOLE_R*Math.sin(a),p.y-HOLE_R*Math.cos(a))<HOLE_RAD*1.2)return d}return null};
const cv=renderer.domElement;let mouse={x:0,y:0};

cv.addEventListener('pointerdown',e=>{
  const p=toDial(e);if(!p||S.mode!=='idle')return;const d=holeAt(p);if(d==null)return;
  audio();cv.setPointerCapture(e.pointerId);S.mode='drag';S.digit=d;S.max=RMAX(d);S.theta=0;S.omega=0;S.target=0;S.stopHit=false;S.ratchet=0;
  S.grab={last:angleOf(p),acc:0,t0:performance.now()};cv.style.cursor='grabbing'});
cv.addEventListener('pointermove',e=>{
  const r=cv.getBoundingClientRect();mouse.x=(e.clientX-r.left)/r.width-.5;mouse.y=(e.clientY-r.top)/r.height-.5;
  const p=toDial(e);if(!p)return;
  if(S.mode==='drag'&&S.grab){const a=angleOf(p);S.grab.acc=clamp(S.grab.acc+wrap(a-S.grab.last),-6,S.max+40);S.grab.last=a;S.target=clamp(S.grab.acc,0,S.max)}
  else if(S.mode==='idle')cv.style.cursor=holeAt(p)==null?'default':'grab'});
const up=e=>{if(S.mode!=='drag')return;cv.style.cursor='default';
  const g=S.grab,quick=performance.now()-g.t0<250&&Math.abs(g.acc)<4;
  if(quick){const d=S.digit;S.mode='idle';S.grab=null;S.theta=0;S.omega=0;startAuto(d)}else release()};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);cv.addEventListener('lostpointercapture',up);
const embedded=!!document.getElementById('call');            // on the portfolio the keys only work while the dial has focus
const keyTarget=embedded?host:window;if(embedded)host.tabIndex=0;
keyTarget.addEventListener('keydown',e=>{if(/^\d$/.test(e.key)&&!e.metaKey&&!e.ctrlKey){e.preventDefault();startAuto(+e.key)}else if(e.key==='Backspace'&&!embedded){seq.pop();paintNum()}});

/* ---------- number readout + controls ---------- */
const num=document.getElementById('dialnum'),dbg=document.getElementById('dbg');
function paintNum(){if(num)num.innerHTML=seq.map(d=>`<span>${d}</span>`).join('')}
const clr=document.getElementById('dclear');if(clr)clr.onclick=()=>{seq.length=0;paintNum()};
const mute=document.getElementById('dmute');if(mute)mute.onclick=()=>{muted=!muted;mute.setAttribute('aria-pressed',muted);mute.textContent=muted?'Sound off':'Sound on';if(muted)whirOff()};
paintNum();

/* ---------- loop ---------- */
function size(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
new ResizeObserver(size).observe(host);size();
let last=performance.now();
function frame(now){
  const dt=Math.min(1/30,(now-last)/1000||1/60);last=now;
  step(dt);
  plate.rotation.z=-S.theta*DEG;
  const tx=CAM.x+mouse.x*.6+(Math.random()-.5)*.03*S.shake,ty=CAM.y-mouse.y*.45+(Math.random()-.5)*.03*S.shake;
  camera.position.set(tx,ty,CAM.z);camera.lookAt(0,0,0);
  renderer.render(scene,camera);
  if(dbg&&location.search.includes('debug'))dbg.textContent=`mode ${S.mode}  θ ${S.theta.toFixed(1)}°  max ${S.max.toFixed(0)}°  pulses ${S.pulses}  counted ${S.count}`;
  requestAnimationFrame(frame)}
requestAnimationFrame(frame);
window.__dial={S,seq,startAuto,frame};
