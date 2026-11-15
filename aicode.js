/* "Designing in code": a small workbench you can watch and poke.
   Pick a prompt. Claude "types" the request, writes the component line by line, and a live Storybook preview builds next
   to it. The preview is real HTML you can click. Then ask Claude for a change and watch only the new lines appear. */
(function(){
  const host=document.getElementById('ai');if(!host)return;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,P=window.PF||{ai:{done:9,total:11,tools:['Cursor','Claude','Storybook']}};
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  /* one-pass highlighter, so a replacement can never land inside an earlier one */
  const HL=/(\/\/.*$)|("[^"]*"|'[^']*')|(<\/?)([A-Za-z][\w-]*)|\s([:@]?[a-zA-Z-]+)(?==)|\b(import|const|from|ref|setup|lang)\b/g;
  const hl=l=>{let out='',i=0,m;HL.lastIndex=0;while((m=HL.exec(l))){out+=esc(l.slice(i,m.index));
    if(m[1])out+=`<u class="c">${esc(m[1])}</u>`;else if(m[2])out+=`<em class="s">${esc(m[2])}</em>`;else if(m[4])out+=`${esc(m[3])}<b class="t">${m[4]}</b>`;else if(m[5])out+=` <i class="a">${m[5]}</i>`;else if(m[6])out+=`<b class="k">${m[6]}</b>`;
    i=HL.lastIndex}return out+esc(l.slice(i))};

  /* ---------- the three scenarios, each from real work ---------- */
  const SC=[
  {id:'approve',tab:'Approval card',file:'ApprovalCard.vue',prompt:'Make an access request card for Slack-style approvals: status, who has to approve, and Approve / Deny buttons.',
   code:['<script setup lang="ts">','import { ref } from \'vue\'','const status = ref(\'pending\')','</script>','','<template>','  <Card title="Access request for Salesforce">','    <Field label="Status">{{ status }}</Field>','    <Approvers :list="[\'You\', \'Bob\', \'Carol\']" />','    <Button label="Approve" @click="status = \'approved\'" />','    <Button label="Deny" severity="secondary" />','  </Card>','</template>'],
   follow:{chip:'Ask for a reason when someone denies',prompt:'When someone denies, ask for a short reason first.',
     code:['<script setup lang="ts">','import { ref } from \'vue\'','const status = ref(\'pending\')','const denying = ref(false)',null,'</script>','','<template>','  <Card title="Access request for Salesforce">','    <Field label="Status">{{ status }}</Field>','    <Approvers :list="[\'You\', \'Bob\', \'Carol\']" />','    <Button label="Approve" @click="status = \'approved\'" />','    <Button label="Deny" severity="secondary" @click="denying = true" />',null,'  </Card>','</template>'],
     adds:{4:'const reason = ref(\'\')',13:'    <Textarea v-if="denying" v-model="reason" placeholder="Why are you denying this?" />'}}},
  {id:'tree',tab:'Tree select',file:'TreeSelect.vue',prompt:'Circuit has no component for picking from nested groups. Build a Tree select: search, checkboxes, parent selects its children.',
   code:['<script setup lang="ts">','import TreeSelect from \'primevue/treeselect\'','const nodes = useGroups()          // nested groups','const picked = ref<string[]>([])','</script>','','<template>','  <TreeSelect v-model="picked"','    :options="nodes"','    selection-mode="checkbox"','    placeholder="Select groups"','    filter />','</template>'],
   follow:{chip:'Show what I picked as chips',prompt:'Show the selected groups as chips above the list.',
     code:['<script setup lang="ts">','import TreeSelect from \'primevue/treeselect\'','const nodes = useGroups()          // nested groups','const picked = ref<string[]>([])','</script>','','<template>','  <TreeSelect v-model="picked"','    :options="nodes"','    selection-mode="checkbox"','    display="chip"','    placeholder="Select groups"','    filter />','</template>'],
     adds:{10:'    display="chip"'}}},
  {id:'restore',tab:'Restore codes',file:'RestoreCodes.vue',prompt:'On a new phone, show what was found before asking for the backup key. Keep the Restore button off until the key looks complete.',
   code:['<template>','  <Screen title="Restore your codes">','    <Banner icon="check">','      Backup found · 12 accounts','    </Banner>','    <Input v-model="key" label="Backup key" />','    <Button label="Restore" :disabled="key.length < 12" />','  </Screen>','</template>'],
   follow:{chip:'Add “I can’t find my key”',prompt:'Add an “I can’t find my key” link under the button.',
     code:['<template>','  <Screen title="Restore your codes">','    <Banner icon="check">','      Backup found · 12 accounts','    </Banner>','    <Input v-model="key" label="Backup key" />','    <Button label="Restore" :disabled="key.length < 12" />',null,'  </Screen>','</template>'],
     adds:{7:'    <Link label="I can\'t find my key" to="/recover" />'}}}
  ];

  /* ---------- live previews (real, clickable) ---------- */
  const PV={
   approve(st,v2){return `<div class="ac"><div class="ac-h"><i></i><b>Jumpcloud</b><span>APP · 11:55</span></div><h4>Access request for Salesforce</h4>
     <div class="ac-r"><small>Status</small><span class="${st.done?'ok':''}">${st.done==='approved'?'Approved ✓':st.done==='denied'?'Denied':'Pending 3 approvals'}</span></div>
     <div class="ac-r"><small>Approvers</small><span class="av"><u>Y</u><u>B</u><u>C</u></span></div>
     <div class="ac-b"><button data-a="approve" ${st.done?'disabled':''}>✓ Approve</button><button data-a="deny" ${st.done?'disabled':''}>Deny</button></div>
     ${v2&&st.denying&&!st.done?'<div class="ac-w"><input placeholder="Why are you denying this?"><button data-a="send">Send</button></div>':''}</div>`},
   tree(st,v2){const N=[['Engineering',['Platform','Workflows','Authentication']],['Design',['Circuit','Research']],['Sales',[]]];
     const on=n=>st.sel.has(n),all=[].concat(...N.map(g=>g[1].length?g[1]:[g[0]]));
     const row=(n,d,p)=>`<label class="tr d${d}"><input type="checkbox" data-n="${n}" ${on(n)?'checked':''}>${n}</label>`;
     const picked=all.filter(on);
     return `<div class="tsel">${v2&&picked.length?`<div class="chips">${picked.map(x=>`<span>${x}</span>`).join('')}</div>`:''}<div class="srch">Search groups</div>`+
       N.map(g=>row(g[0],0)+g[1].map(c=>row(c,1)).join('')).join('')+`<div class="cnt">${picked.length} selected</div></div>`},
   restore(st,v2){return `<div class="rs"><h4>Restore your codes</h4><div class="bn"><i>✓</i><span>Backup found<small>12 accounts · last backed up Oct 6 from Alex’s iPhone</small></span></div>
     <label>Backup key</label><input class="key" value="${st.key}" placeholder="K8X2M-9PQ3V-7TNBH-4CD"><button class="go" data-a="restore" ${st.key.length>=12?'':'disabled'}>${st.done?'Restored ✓':'Restore'}</button>${v2?'<a class="lost" data-a="lost">I can’t find my key</a>':''}${st.note?`<p class="note">${st.note}</p>`:''}</div>`}
  };
  const freshState=()=>({done:'',denying:false,sel:new Set(),key:'',note:''});

  /* ---------- UI ---------- */
  const css=document.createElement('style');css.textContent=`
  .dc{margin-top:120px}
  .dc .k{font-size:13px;color:var(--muted);margin-bottom:18px}.dc .k i{font:12px var(--mono);font-style:normal;color:var(--fg);margin-right:10px}
  .dc h2{font-weight:500;font-size:clamp(28px,4.2vw,52px);letter-spacing:-.05em;line-height:1.02;max-width:18ch}
  .dc .sub{color:var(--muted);font-size:16px;line-height:1.55;max-width:52ch;margin:16px 0 30px}
  .wb{border:1px solid var(--fg);border-radius:14px;overflow:hidden;background:#fff}
  .wb-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 12px;border-bottom:1px solid var(--line);flex-wrap:wrap}
  .wb-tabs{display:flex;gap:6px;flex-wrap:wrap}.wb-tabs button{font:inherit;font-size:13px;background:none;border:1px solid var(--line);border-radius:99px;padding:6px 14px;color:var(--fg);cursor:pointer;transition:all .2s}
  .wb-tabs button:hover{border-color:var(--fg)}.wb-tabs button.on{background:var(--fg);color:#fff;border-color:var(--fg)}
  .wb-tools{display:flex;gap:6px;font-size:12px;color:var(--muted);align-items:center}.wb-tools span{border:1px solid var(--line);border-radius:99px;padding:3px 10px}
  .wb-body{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.25fr) minmax(0,1fr);min-height:460px}
  .wb .pane{min-width:0}
  .wb .chat{padding:14px;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:10px;font-size:13px;line-height:1.5}
  .wb .b{border:1px solid var(--line);border-radius:10px;padding:9px 11px}.wb .b.you{background:#F4F4F2}.wb .b small{display:block;font-size:11px;color:var(--muted);margin-bottom:3px}
  .wb .b.ai small{color:var(--accent)}
  .wb .stt{font:11px/1.5 var(--mono);color:var(--muted)}.wb .stt b{display:inline;color:var(--accent);font-weight:400;margin-right:6px}
  .wb .follow{margin-top:auto}.wb .follow button{font:inherit;font-size:13px;text-align:left;width:100%;background:none;border:1px dashed var(--fg);border-radius:10px;padding:10px 12px;cursor:pointer;transition:background .2s,color .2s}
  .wb .follow button:hover{background:var(--fg);color:#fff}.wb .follow button:disabled{opacity:.35;cursor:default;background:none;color:inherit}
  .wb .code{background:#0E0F10;color:#E8E8E4;display:flex;flex-direction:column;min-width:0}
  .wb .code .file{font:11px var(--mono);color:#9a9a96;padding:10px 14px;border-bottom:1px solid #26272a;display:flex;justify-content:space-between}
  .wb .code pre{margin:0;padding:12px 14px;font:12px/1.7 var(--mono);overflow:auto;white-space:pre;flex:1}
  .wb .code .ln{display:block;min-height:1.7em;padding-left:2px;border-left:2px solid transparent}.wb .code .ln.add{background:#143023;border-left-color:#3DDC84}
  .wb .code .cur:after{content:"";display:inline-block;width:7px;height:13px;background:#E8E8E4;margin-left:1px;vertical-align:-2px;animation:bl 1s steps(1) infinite}
  @keyframes bl{50%{opacity:0}}
  .wb .code .t{font-weight:400;color:#7BD3EA}.wb .code .a{font-style:normal;color:#E6C07B}.wb .code .s{font-style:normal;color:#9ED072}.wb .code .k{font-weight:400;color:#F2777A}.wb .code .c{text-decoration:none;color:#6c6c68}
  .wb .prev{background:#F4F4F2;display:flex;flex-direction:column;min-width:0}
  .wb .pvb{font-size:12px;color:var(--muted);padding:10px 14px;border-bottom:1px solid var(--line);display:flex;gap:8px;align-items:center}.wb .pvb i{width:8px;height:8px;border-radius:50%;background:#bbb;transition:background .3s}.wb .pvb.live i{background:#2FBF71}.wb .pvb em{font-style:normal;margin-left:auto;color:var(--fg)}
  .wb .pvs{flex:1;display:grid;place-items:center;padding:18px;opacity:0;transform:translateY(8px) scale(.98);transition:opacity .5s,transform .5s}.wb .pvs.in{opacity:1;transform:none}
  .wb .pvs.flash{animation:fl .7s}@keyframes fl{0%{box-shadow:inset 0 0 0 2px var(--accent)}100%{box-shadow:inset 0 0 0 2px transparent}}
  .ac,.rs,.tsel{width:100%;max-width:300px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;box-shadow:0 18px 40px rgba(0,0,0,.07);font-size:13px}
  .ac-h{display:flex;align-items:center;gap:8px;margin-bottom:10px}.ac-h i{width:22px;height:22px;border-radius:6px;background:#0F2A47}.ac-h b{font-weight:600}.ac-h span{font-size:11px;color:var(--muted)}
  .ac h4,.rs h4{font-weight:500;font-size:16px;letter-spacing:-.02em;margin-bottom:12px}
  .ac-r{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-top:1px solid var(--line)}.ac-r small{color:var(--muted)}.ac-r .ok{color:#1F9D55;font-weight:600}
  .av{display:flex}.av u{text-decoration:none;width:22px;height:22px;border-radius:50%;background:#E4E4E4;display:grid;place-items:center;font-size:10px;margin-left:-5px;border:2px solid #fff}
  .ac-b{display:flex;gap:8px;margin-top:12px}.ac-b button,.ac-w button,.rs .go{font:inherit;font-size:13px;border-radius:8px;padding:8px 12px;cursor:pointer;border:1px solid var(--line);background:#fff;transition:all .2s}
  .ac-b button:first-child{border-color:#1F9D55;color:#1F9D55}.ac-b button:hover:not(:disabled){background:var(--fg);color:#fff;border-color:var(--fg)}.ac-b button:disabled{opacity:.4;cursor:default}
  .ac-w{display:flex;gap:6px;margin-top:10px;animation:fl .7s}.ac-w input{flex:1;min-width:0;border:1px solid var(--fg);border-radius:8px;padding:8px 10px;font:inherit;font-size:13px}
  .tsel .srch{border:1px solid var(--line);border-radius:8px;padding:7px 10px;color:var(--muted);margin-bottom:8px}.tr{display:flex;align-items:center;gap:8px;padding:5px 2px;cursor:pointer}.tr.d1{padding-left:22px;color:#333}
  .tr input{accent-color:var(--accent)}.cnt{margin-top:8px;padding-top:8px;border-top:1px solid var(--line);color:var(--muted);font-size:12px}
  .chips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}.chips span{background:var(--fg);color:#fff;border-radius:99px;padding:2px 9px;font-size:11px;animation:fl .7s}
  .rs .bn{display:flex;gap:10px;background:#F1F3F3;border-radius:8px;padding:10px;margin-bottom:12px}.rs .bn i{font-style:normal;width:20px;height:20px;border-radius:50%;background:#1F7A70;color:#fff;display:grid;place-items:center;font-size:12px;flex:none}.rs .bn small{display:block;color:var(--muted);font-size:11px}
  .rs label{display:block;color:var(--muted);font-size:12px;margin-bottom:4px}.rs .key{width:100%;border:1px solid #1F7A70;border-radius:8px;padding:9px 10px;font:13px var(--mono);margin-bottom:10px}
  .rs .go{width:100%;background:#1F7A70;color:#fff;border-color:#1F7A70}.rs .go:disabled{opacity:.35;cursor:default}.rs .lost{display:block;text-align:center;color:#1F7A70;margin-top:10px;cursor:pointer;animation:fl .7s}.rs .note{font-size:12px;color:var(--muted);margin-top:8px;text-align:center}
  .dc-foot{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-top:22px;font-size:14px}
  .dc-foot .dots{display:flex;gap:6px;align-items:center}.dc-foot .dots i{width:12px;height:12px;border-radius:50%;border:1px solid var(--fg);transition:background .3s}.dc-foot .dots i.f{background:var(--accent);border-color:var(--accent)}
  @media(max-width:900px){.wb-body{grid-template-columns:1fr}.wb .chat{border-right:0;border-bottom:1px solid var(--line)}.wb .code{max-height:340px}.wb .pvs{min-height:320px}}
  `;document.head.appendChild(css);

  host.className='dc';
  host.innerHTML=`<div class="k"><i>04</i>Designing in code</div><h2 class="rv">I design in code, with AI in the loop.</h2>
    <p class="sub">I prompt Claude, build in Storybook with Cursor, and put real, clickable screens in front of customers the same day. Pick a prompt and watch one get built.</p>
    <div class="wb"><div class="wb-bar"><div class="wb-tabs" id="wbt">${SC.map((s,i)=>`<button type="button" data-i="${i}">${s.tab}</button>`).join('')}</div><div class="wb-tools">${P.ai.tools.map(t=>`<span>${t}</span>`).join('')}</div></div>
    <div class="wb-body"><div class="pane chat" id="wbc"></div><div class="pane code"><div class="file"><span id="wbf"></span><span>Vue · TypeScript</span></div><pre id="wbp" aria-label="Generated code"></pre></div>
      <div class="pane prev"><div class="pvb" id="wbv"><i></i><span>Storybook · Default</span><em id="wbm"></em></div><div class="pvs" id="wbs"></div></div></div></div>
    <div class="dc-foot"><span>${P.ai.done} of my ${P.ai.total} projects went from idea to working screens this way.</span><span class="dots" id="wbd">${Array.from({length:P.ai.total},(_,i)=>`<i class="${i<P.ai.done?'f':''}"></i>`).join('')}</span></div>`;
  const $=id=>document.getElementById(id),chat=$('wbc'),pre=$('wbp'),stage=$('wbs'),bar=$('wbv'),built=$('wbm');

  /* ---------- engine ---------- */
  let token=0,cur=null,state=freshState(),v2=false;
  const sleep=ms=>new Promise(r=>setTimeout(r,reduce?0:ms));
  const alive=t=>t===token;
  async function typeInto(el,text,speed,t,fmt){for(let i=1;i<=text.length;i++){if(!alive(t))return false;el.innerHTML=fmt?fmt(text.slice(0,i)):esc(text.slice(0,i));await sleep(speed)}return true}
  const msg=(cls,who,text)=>{const d=document.createElement('div');d.className='b '+cls;d.innerHTML=`<small>${who}</small><span></span>`;chat.appendChild(d);return d.lastChild};
  const status=(html)=>{const d=document.createElement('div');d.className='stt';d.innerHTML=html;chat.appendChild(d);return d};
  const paint=()=>{stage.innerHTML=PV[cur.id](state,v2)};
  const renderCode=(lines,adds)=>{pre.innerHTML=lines.map(()=>`<span class="ln"></span>`).join('');return [...pre.children]};

  async function run(i){
    const t=++token;cur=SC[i];state=freshState();v2=false;
    [...$('wbt').children].forEach((b,k)=>b.classList.toggle('on',k===i));
    chat.innerHTML='';pre.innerHTML='';stage.className='pvs';stage.innerHTML='';bar.classList.remove('live');built.textContent='';$('wbf').textContent=cur.file;
    const you=msg('you','You');if(!await typeInto(you,cur.prompt,reduce?0:16,t))return;
    await sleep(350);if(!alive(t))return;
    const s1=status('· reading Circuit tokens and components…');await sleep(650);if(!alive(t))return;s1.innerHTML='<b>✓</b> read Circuit tokens and components';
    const ai=msg('ai','Claude Code');const s2=status('· writing '+cur.file+'…');
    ai.textContent='Building it in Storybook so you can click it.';
    const lines=renderCode(cur.code);
    for(let k=0;k<cur.code.length;k++){if(!alive(t))return;lines[k].classList.add('cur');if(!await typeInto(lines[k],cur.code[k],reduce?0:7,t,hl))return;lines[k].classList.remove('cur');await sleep(60)}
    s2.innerHTML='<b>✓</b> wrote '+cur.file;await sleep(250);if(!alive(t))return;
    const s3=status('· starting Storybook…');await sleep(500);if(!alive(t))return;s3.innerHTML='<b>✓</b> story renders';
    paint();stage.classList.add('in');bar.classList.add('live');built.textContent='built in 0.9s';
    const f=document.createElement('div');f.className='follow';f.innerHTML=`<button type="button">↳ ${cur.follow.chip}</button>`;chat.appendChild(f);
    f.firstChild.onclick=()=>followUp(t,f.firstChild);
  }
  async function followUp(t,btn){
    if(!alive(t)||v2)return;btn.disabled=true;const tk=++token;
    const you=msg('you','You');chat.insertBefore(you.parentNode,btn.parentNode);
    if(!await typeInto(you,cur.follow.prompt,reduce?0:16,tk))return;
    const st=status('· editing '+cur.file+'…');chat.insertBefore(st,btn.parentNode);
    /* the whole file is on screen; only the new lines are typed, in place, highlighted */
    const L=cur.follow.code,adds=cur.follow.adds;pre.innerHTML='';
    const els=L.map((l,k)=>{const d=document.createElement('span');d.className='ln'+(l===null?' add':'');pre.appendChild(d);if(l!==null)d.innerHTML=hl(l);return d});
    for(let k=0;k<L.length;k++){if(L[k]!==null)continue;const txt=adds[k];if(!await typeInto(els[k],txt,reduce?0:12,tk,hl))return;await sleep(80)}
    st.innerHTML='<b>✓</b> edited '+cur.file+' · '+Object.keys(adds).length+(Object.keys(adds).length>1?' lines':' line')+' added';
    v2=true;paint();stage.classList.remove('flash');void stage.offsetWidth;stage.classList.add('flash');built.textContent='updated in 0.6s'}

  /* ---------- the preview is alive ---------- */
  stage.addEventListener('click',e=>{
    const a=e.target.closest('[data-a]');if(!a||!cur)return;const k=a.dataset.a;
    if(cur.id==='approve'){if(k==='approve')state.done='approved';else if(k==='deny'){if(v2)state.denying=true;else state.done='denied'}else if(k==='send')state.done='denied'}
    else if(cur.id==='restore'){if(k==='restore')state.done='restored';else if(k==='lost')state.note='Opening recovery help…'}
    paint()});
  stage.addEventListener('change',e=>{if(cur.id!=='tree')return;const n=e.target.dataset.n;if(!n)return;
    const kids={Engineering:['Platform','Workflows','Authentication'],Design:['Circuit','Research']};
    const set=(x,v)=>v?state.sel.add(x):state.sel.delete(x);set(n,e.target.checked);if(kids[n])kids[n].forEach(c=>set(c,e.target.checked));
    paint()});
  stage.addEventListener('input',e=>{if(cur.id==='restore'&&e.target.classList.contains('key')){state.key=e.target.value;const go=stage.querySelector('.go');if(go)go.disabled=state.key.length<12}});
  $('wbt').addEventListener('click',e=>{const b=e.target.closest('button');if(b)run(+b.dataset.i)});

  /* start the first scenario when the section is reached */
  let started=false;new IntersectionObserver((es,io)=>{if(es[0].isIntersecting&&!started){started=true;io.disconnect();run(0)}},{threshold:.25}).observe($('wbc'));
  window.__dc={run};
})();
