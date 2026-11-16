/* "Designing in code", kept simple: one prompt, one result.
   A prompt types itself, a component is "written", and the real, clickable screen appears beside it. Pick another prompt to replay. */
(function(){
  const host=document.getElementById('ai');if(!host)return;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,P=window.PF||{ai:{done:9,total:11}};

  /* ---------- three prompts, each from real work ---------- */
  const SC=[
    {tab:'Approval card',file:'ApprovalCard.vue',prompt:'Make an access request card for Slack-style approvals: status, approvers, and Approve / Deny.'},
    {tab:'Tree select',file:'TreeSelect.vue',prompt:'Build a Tree select for Circuit: nested groups, search, and checkboxes where a parent selects its children.'},
    {tab:'Restore codes',file:'RestoreCodes.vue',prompt:'On a new phone, show what was found before asking for the backup key. Keep Restore off until the key looks complete.'}
  ];

  /* ---------- the results are real and clickable ---------- */
  const PV=[
    st=>`<div class="ac"><div class="ac-h"><i></i><b>Jumpcloud</b><span>APP · 11:55</span></div><h4>Access request for Salesforce</h4>
      <div class="ac-r"><small>Status</small><span class="${st.done?'ok':''}">${st.done==='approved'?'Approved ✓':st.done==='denied'?'Denied':'Pending 3 approvals'}</span></div>
      <div class="ac-r"><small>Approvers</small><span class="av"><u>Y</u><u>B</u><u>C</u></span></div>
      <div class="ac-b"><button data-a="approve" ${st.done?'disabled':''}>✓ Approve</button><button data-a="deny" ${st.done?'disabled':''}>Deny</button></div></div>`,
    st=>{const N=[['Engineering',['Platform','Workflows','Authentication']],['Design',['Circuit','Research']],['Sales',[]]];
      const row=(n,d)=>`<label class="tr d${d}"><input type="checkbox" data-n="${n}" ${st.sel.has(n)?'checked':''}>${n}</label>`;
      const leaves=[].concat(...N.map(g=>g[1].length?g[1]:[g[0]])),n=leaves.filter(x=>st.sel.has(x)).length;
      return `<div class="tsel"><div class="srch">Search groups</div>`+N.map(g=>row(g[0],0)+g[1].map(c=>row(c,1)).join('')).join('')+`<div class="cnt">${n} selected</div></div>`},
    st=>`<div class="rs"><h4>Restore your codes</h4><div class="bn"><i>✓</i><span>Backup found<small>12 accounts · last backed up Oct 6 from Alex’s iPhone</small></span></div>
      <label>Backup key</label><input class="key" value="${st.key}" placeholder="K8X2M-9PQ3V-7TNBH-4CD"><button class="go" data-a="restore" ${st.key.length>=12?'':'disabled'}>${st.done?'Restored ✓':'Restore'}</button></div>`
  ];
  const fresh=()=>({done:'',sel:new Set(),key:''});

  /* ---------- markup and styles ---------- */
  const css=document.createElement('style');css.textContent=`
  .dc{margin-top:140px}
  .dc .k{font-size:13px;color:var(--muted);margin-bottom:22px}.dc .k i{font:12px var(--mono);font-style:normal;color:var(--fg);margin-right:10px}
  .dc-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:center}
  .dc h2{font-weight:500;font-size:clamp(34px,5.4vw,68px);letter-spacing:-.055em;line-height:1}
  .dc h2 mark{background:none;color:inherit;background-image:linear-gradient(var(--accent),var(--accent));background-repeat:no-repeat;background-position:0 92%;background-size:100% .1em}
  .dc .pr{margin-top:34px;min-height:96px;font:17px/1.55 var(--mono);letter-spacing:-.01em}
  .dc .pr:before{content:"> ";color:var(--accent)}.dc .pr.typing:after{content:"";display:inline-block;width:9px;height:18px;background:var(--fg);margin-left:2px;vertical-align:-3px;animation:dcb 1s steps(1) infinite}
  @keyframes dcb{50%{opacity:0}}
  .dc .stt{font:13px/1.9 var(--mono);color:var(--muted);min-height:50px}.dc .stt b{color:var(--accent);font-weight:400;margin-right:8px}
  .dc .pick{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}
  .dc .pick button{font:inherit;font-size:13px;background:none;border:1px solid var(--line);border-radius:99px;padding:7px 15px;color:var(--fg);cursor:pointer;transition:all .2s}
  .dc .pick button:hover{border-color:var(--fg)}.dc .pick button.on{background:var(--fg);color:#fff;border-color:var(--fg)}
  .dc .stage{position:relative;background:#F4F4F2;border-radius:22px;min-height:440px;display:grid;place-items:center;padding:32px;overflow:hidden}
  .dc .stage .res{width:100%;display:grid;place-items:center;opacity:0;transform:translateY(14px) scale(.97);transition:opacity .55s,transform .55s cubic-bezier(.2,.8,.2,1)}.dc .stage .res.in{opacity:1;transform:none}
  .dc .stage .res>*{transform-origin:center;zoom:1.18}
  .dc .stage .cap{position:absolute;left:20px;bottom:14px;font-size:12px;color:var(--muted);opacity:0;transition:opacity .4s .3s}.dc .stage .res.in~.cap{opacity:1}
  .ac,.rs,.tsel{width:100%;max-width:300px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;box-shadow:0 22px 50px rgba(0,0,0,.08);font-size:13px}
  .ac-h{display:flex;align-items:center;gap:8px;margin-bottom:10px}.ac-h i{width:22px;height:22px;border-radius:6px;background:#0F2A47}.ac-h b{font-weight:600}.ac-h span{font-size:11px;color:var(--muted)}
  .ac h4,.rs h4{font-weight:500;font-size:16px;letter-spacing:-.02em;margin-bottom:12px}
  .ac-r{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-top:1px solid var(--line)}.ac-r small{color:var(--muted)}.ac-r .ok{color:#1F9D55;font-weight:600}
  .av{display:flex}.av u{text-decoration:none;width:22px;height:22px;border-radius:50%;background:#E4E4E4;display:grid;place-items:center;font-size:10px;margin-left:-5px;border:2px solid #fff}
  .ac-b{display:flex;gap:8px;margin-top:12px}.ac-b button,.rs .go{font:inherit;font-size:13px;border-radius:8px;padding:8px 12px;cursor:pointer;border:1px solid var(--line);background:#fff;transition:all .2s}
  .ac-b button:first-child{border-color:#1F9D55;color:#1F9D55}.ac-b button:hover:not(:disabled){background:var(--fg);color:#fff;border-color:var(--fg)}.ac-b button:disabled{opacity:.4;cursor:default}
  .tsel .srch{border:1px solid var(--line);border-radius:8px;padding:7px 10px;color:var(--muted);margin-bottom:8px}.tr{display:flex;align-items:center;gap:8px;padding:5px 2px;cursor:pointer}.tr.d1{padding-left:22px;color:#333}
  .tr input{accent-color:var(--accent)}.cnt{margin-top:8px;padding-top:8px;border-top:1px solid var(--line);color:var(--muted);font-size:12px}
  .rs .bn{display:flex;gap:10px;background:#F1F3F3;border-radius:8px;padding:10px;margin-bottom:12px}.rs .bn i{font-style:normal;width:20px;height:20px;border-radius:50%;background:#1F7A70;color:#fff;display:grid;place-items:center;font-size:12px;flex:none}.rs .bn small{display:block;color:var(--muted);font-size:11px}
  .rs label{display:block;color:var(--muted);font-size:12px;margin-bottom:4px}.rs .key{width:100%;border:1px solid #1F7A70;border-radius:8px;padding:9px 10px;font:13px var(--mono);margin-bottom:10px}
  .rs .go{width:100%;background:#1F7A70;color:#fff;border-color:#1F7A70}.rs .go:disabled{opacity:.35;cursor:default}
  .dc-foot{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-top:34px;font-size:14px;color:var(--muted)}
  .dc-foot .dots{display:flex;gap:6px}.dc-foot .dots i{width:11px;height:11px;border-radius:50%;border:1px solid var(--fg)}.dc-foot .dots i.f{background:var(--accent);border-color:var(--accent)}
  @media(max-width:860px){.dc-g{grid-template-columns:1fr;gap:32px}.dc .stage{min-height:360px}.dc{margin-top:100px}}
  `;document.head.appendChild(css);

  host.className='dc';
  host.innerHTML=`<div class="k"><i>04</i>Designing in code</div>
    <div class="dc-g"><div><h2>I describe it. <mark>Claude builds it.</mark> I design in the result.</h2>
      <div class="pr" id="dcp" aria-live="polite"></div><div class="stt" id="dcs"></div>
      <div class="pick" id="dck">${SC.map((s,i)=>`<button type="button" data-i="${i}">${s.tab}</button>`).join('')}</div></div>
      <div class="stage"><div class="res" id="dcr"></div><div class="cap">Real, clickable, built in Storybook. Try it.</div></div></div>
    <div class="dc-foot"><span>${P.ai.done} of my ${P.ai.total} projects went from idea to working screens this way.</span><span class="dots">${Array.from({length:P.ai.total},(_,i)=>`<i class="${i<P.ai.done?'f':''}"></i>`).join('')}</span></div>`;
  const $=id=>document.getElementById(id),pr=$('dcp'),stt=$('dcs'),res=$('dcr');

  /* ---------- engine ---------- */
  let token=0,cur=0,state=fresh();
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?0:ms));
  const paint=()=>{res.innerHTML=PV[cur](state)};
  async function run(i){
    const t=++token;cur=i;state=fresh();
    [...$('dck').children].forEach((b,k)=>b.classList.toggle('on',k===i));
    res.className='res';res.innerHTML='';stt.innerHTML='';pr.textContent='';pr.classList.add('typing');
    const text=SC[i].prompt;
    for(let k=1;k<=text.length;k++){if(t!==token)return;pr.textContent=text.slice(0,k);await sleep(20)}
    pr.classList.remove('typing');await sleep(350);if(t!==token)return;
    stt.innerHTML=`<div><b>✓</b>writing ${SC[i].file}</div>`;await sleep(650);if(t!==token)return;
    stt.innerHTML+=`<div><b>✓</b>story renders</div>`;await sleep(350);if(t!==token)return;
    paint();void res.offsetWidth;res.classList.add('in')}

  /* ---------- the result is alive ---------- */
  res.addEventListener('click',e=>{const a=e.target.closest('[data-a]');if(!a)return;const k=a.dataset.a;
    if(cur===0)state.done=k==='approve'?'approved':'denied';else if(cur===2&&k==='restore')state.done='restored';paint()});
  res.addEventListener('change',e=>{if(cur!==1)return;const n=e.target.dataset.n;if(!n)return;
    const kids={Engineering:['Platform','Workflows','Authentication'],Design:['Circuit','Research']};
    const set=(x,v)=>v?state.sel.add(x):state.sel.delete(x);set(n,e.target.checked);if(kids[n])kids[n].forEach(c=>set(c,e.target.checked));paint()});
  res.addEventListener('input',e=>{if(cur===2&&e.target.classList.contains('key')){state.key=e.target.value;const go=res.querySelector('.go');if(go)go.disabled=state.key.length<12}});
  $('dck').addEventListener('click',e=>{const b=e.target.closest('button');if(b)run(+b.dataset.i)});

  let started=false;new IntersectionObserver((es,io)=>{if(es[0].isIntersecting&&!started){started=true;io.disconnect();run(0)}},{threshold:.3}).observe(pr);
  window.__dc={run};
})();
