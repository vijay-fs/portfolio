(() => {
  const TAU = Math.PI * 2;
  const mix = (a,b,t) => a+(b-a)*t;
  const shade = (hex,factor) => '#'+[1,3,5].map(i=>Math.max(0,Math.min(255,Math.round(parseInt(hex.slice(i,i+2),16)*factor))).toString(16).padStart(2,'0')).join('');
  const blend = (a,b,t) => '#'+[1,3,5].map(i=>Math.round(mix(parseInt(a.slice(i,i+2),16),parseInt(b.slice(i,i+2),16),t)).toString(16).padStart(2,'0')).join('');
  const descriptions = {
    fsqlstudio: 'Animated FSqlStudio workflow: connect to Fusion, type a question, generate SQL, run the query and inspect results.',
    postcard: 'Animated Postcard workflow: read new messages, summarize unread conversations, search message history and open matching context.',
    'module-builder': 'Animated Module Builder workflow: configure an ERP API, build its UI, save both, then open the created page. Third-party APIs are supported.',
    metamarch: 'Animated jacket designer with a cursor selecting garment layers and color swatches to create a multicolor jacket.',
    firelink: 'Illustrative Firelink UI flow: select a clinic, book an appointment, choose a time and see the live schedule update.',
    chronos: 'Illustrative Chronos UI flow: browse products, choose a color, add an item to the bag and confirm an order.',
    'ahmadabad-safe-city': 'Illustrative Ahmadabad Safe City UI flow: a citizen sends SOS and live location to police, then registers a complaint.',
    'security-policy-configure': 'Illustrative security policy UI flow: select Microsoft, Google and other tenant accounts, choose policies and apply configuration in one click.'
  };

  const text=(c,value,x,y,size=22,color='#303b32',weight=400)=>{
    c.fillStyle=color;c.font=`${weight} ${size}px Arial, sans-serif`;c.fillText(value,x,y);
  };
  const round=(c,x,y,w,h,r,fill,stroke)=>{
    c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1.2;c.stroke();}
  };
  const bar=(c,x,y,w,color='#c3c9be',h=7)=>round(c,x,y,w,h,h/2,color);
  const dot=(c,x,y,r,color)=>{c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();};
  const jacketPalette=['#355b60','#d8d2b8','#aa6b4c','#7f9584','#243f49','#e1bc94'];
  const designSteps=[['sleeves',1],['pockets',2],['body',4],['hood',3],['sleeves',3],['pockets',1],['body',0],['hood',2]];
  const layerNames=['body','sleeves','pockets','hood'];
  const ease=t=>{const v=Math.max(0,Math.min(1,t));return v*v*(3-2*v);};
  const cloth=document.createElement('canvas');cloth.width=8;cloth.height=8;
  const weave=cloth.getContext('2d');weave.strokeStyle='#ffffff12';weave.lineWidth=.6;
  weave.beginPath();weave.moveTo(0,1);weave.lineTo(8,1);weave.moveTo(0,5);weave.lineTo(8,5);weave.moveTo(1,0);weave.lineTo(1,8);weave.moveTo(5,0);weave.lineTo(5,8);weave.stroke();

  const hoodieArtwork=new Image();
  hoodieArtwork.src='assets/projects/metamarch-hoodie-realistic.png';
  const hoodieDye=document.createElement('canvas');
  const hoodieDyeContext=hoodieDye.getContext('2d');
  let hoodieDyeKey='';
  hoodieArtwork.addEventListener('load',()=>{
    hoodieDyeKey='';
    document.querySelectorAll('project-scene[project="metamarch"]').forEach(scene=>scene.draw());
  });

  function drawRealisticHoodie(c,colors) {
    if(!hoodieArtwork.complete||!hoodieArtwork.naturalWidth)return false;
    const key=Object.values(colors).join('|');
    if(key!==hoodieDyeKey){
      hoodieDyeKey=key;
      const width=600,height=Math.round(width*hoodieArtwork.naturalHeight/hoodieArtwork.naturalWidth);
      hoodieDye.width=width;hoodieDye.height=height;
      const d=hoodieDyeContext;
      d.fillStyle=colors.body;d.fillRect(0,0,width,height);
      const dye=(path,color,mirror=false)=>{
        d.save();d.scale(width/1000,height/1000);
        if(mirror){d.translate(1000,0);d.scale(-1,1);}
        d.fillStyle=color;d.fill(new Path2D(path));d.restore();
      };
      // These regions follow the photographed garment's actual panel seams.
      const sleeve='M0 290 L186 322 L226 365 C217 450 221 598 218 720 L207 833 L172 1000 L0 1000 Z';
      const shoulder='M238 285 L294 263 L432 313 L470 386 L272 409 L216 359 Z';
      const pocket='M291 616 Q387 603 488 614 L488 844 Q385 855 294 846 C227 832 222 759 251 704 Z';
      [false,true].forEach(mirror=>{
        dye(sleeve,colors.sleeves,mirror);
        dye(shoulder,colors.pockets,mirror);
        dye(pocket,colors.pockets,mirror);
      });
      dye('M500 0 C688 10 782 159 715 258 C679 290 604 322 511 335 L484 335 C395 312 314 293 282 253 C214 158 310 11 500 0 Z',colors.hood);
      dye('M235 845 Q490 864 765 845 L765 914 L235 914 Z',shade(colors.hood,.9));
      dye('M0 897 L214 883 L214 1000 L0 1000 Z',shade(colors.hood,.88));
      dye('M786 883 L1000 897 L1000 1000 L786 1000 Z',shade(colors.hood,.88));
      // Multiply color into the original weave and folds; preserve the cutout.
      d.globalCompositeOperation='multiply';d.filter='grayscale(1) brightness(1.18)';
      d.drawImage(hoodieArtwork,0,0,width,height);d.filter='none';
      d.globalCompositeOperation='destination-in';d.drawImage(hoodieArtwork,0,0,width,height);
      // Keep the silver hardware neutral while cloth colors change.
      d.globalCompositeOperation='source-over';d.save();
      d.beginPath();d.rect(width*.487,height*.318,width*.028,height*.594);d.clip();
      d.drawImage(hoodieArtwork,0,0,width,height);d.restore();
    }
    const width=414,height=width*hoodieArtwork.naturalHeight/hoodieArtwork.naturalWidth;
    c.save();c.shadowColor='#304b3823';c.shadowBlur=12;c.shadowOffsetY=8;
    c.drawImage(hoodieDye,407-width/2,185,width,height);c.restore();return true;
  }

  function drawDesigner(c,w,h,t) {
    const cycle=t%32,step=Math.floor(cycle/4),phase=cycle%4,action=designSteps[step],previous=designSteps[(step+7)%8];
    const colors={body:jacketPalette[0],sleeves:jacketPalette[3],pockets:jacketPalette[1],hood:jacketPalette[2]};
    for(let i=0;i<step;i++)colors[designSteps[i][0]]=jacketPalette[designSteps[i][1]];
    colors[action[0]]=blend(colors[action[0]],jacketPalette[action[1]],ease((phase-2.4)/.5));
    const selected=phase>1.1?action[0]:previous[0];
    const wash=c.createLinearGradient(0,0,w,h);wash.addColorStop(0,'#f1f0e7');wash.addColorStop(1,'#ced7cb');c.fillStyle=wash;c.fillRect(0,0,w,h);
    const scale=Math.min(w/1000,h/800)*.96;
    c.save();c.translate((w-1000*scale)/2,(h-800*scale)/2);c.scale(scale,scale);
    c.shadowColor='#334c3b20';c.shadowBlur=45;c.shadowOffsetY=18;
    round(c,28,34,944,732,26,'#fcfcf6','#ffffff');c.shadowColor='transparent';
    round(c,54,60,29,29,9,'#365b54');text(c,'M',61,82,21,'#f8f5e7',600);
    text(c,'Metamarch',99,82,29,'#293f37',600);text(c,'GARMENT STUDIO',727,79,15,'#7e8b7d',500);
    bar(c,53,111,893,'#e3e7dc',1);
    round(c,48,135,72,592,16,'#edf0e8');
    for(let i=0;i<4;i++) {
      round(c,60,157+i*87,48,58,10,i===0?'#dce4d7':'#f8f9f2',i===0?'#a6b6a0':null);
      c.strokeStyle=i===0?'#526b56':'#9ba998';c.lineWidth=2;
      c.beginPath();c.moveTo(74,174+i*87);c.lineTo(67,181+i*87);c.lineTo(73,191+i*87);c.lineTo(76,188+i*87);c.lineTo(76,202+i*87);c.lineTo(94,202+i*87);c.lineTo(94,188+i*87);c.lineTo(97,191+i*87);c.lineTo(102,181+i*87);c.lineTo(95,174+i*87);c.stroke();
    }
    round(c,140,135,540,592,18,'#e9eee6');
    text(c,'Hoodie',165,173,20,'#455d4e',600);text(c,'FRONT VIEW',551,173,12,'#83917f');
    for(let x=164;x<660;x+=25)for(let y=201;y<710;y+=25)dot(c,x,y,.8,'#b8c6b64a');

    // The illustrated version remains available while the photographic asset loads.
    if(!drawRealisticHoodie(c,colors)){
    c.save();c.translate(407,427);c.scale(1.13,1.13);
    const texture=c.createPattern(cloth,'repeat');
    const paint=(path,color,layer)=>{
      const gradient=c.createLinearGradient(-180,-160,180,170);gradient.addColorStop(0,shade(color,1.14));gradient.addColorStop(.45,color);gradient.addColorStop(1,shade(color,.86));
      c.fillStyle=gradient;c.fill(path);c.fillStyle=texture;c.fill(path);
      c.strokeStyle=selected===layer?'#be9a64':'#1e3b3540';c.lineWidth=selected===layer?2:1;c.stroke(path);
    };
    c.shadowColor='#28432d23';c.shadowBlur=16;c.shadowOffsetY=13;
    const hood=new Path2D('M-65 -126 C-87 -201 87 -201 65 -126 L39 -97 L-39 -97 Z');paint(hood,colors.hood,'hood');
    c.shadowColor='transparent';
    const lining=new Path2D('M-44 -140 Q0 -171 44 -140 L29 -113 L-29 -113 Z');paint(lining,shade(colors.hood,.6),'');
    const sleeve=new Path2D('M-83 -124 Q-121 -124 -147 -91 L-180 -52 L-151 119 Q-147 132 -120 124 L-108 34 L-91 -15 Z');
    const sleevePanel=new Path2D('M-140 -95 L-178 -51 L-168 9 L-114 23 L-106 -29 Z');
    const cuff=new Path2D('M-152 107 L-119 105 L-116 135 L-147 138 Z');
    [-1,1].forEach(side=>{c.save();c.scale(side,1);paint(sleeve,colors.sleeves,'sleeves');paint(sleevePanel,colors.pockets,'');paint(cuff,shade(colors.hood,.82),'');c.restore();});
    const body=new Path2D('M-55 -132 L-92 -120 Q-111 -90 -104 -28 L-100 159 Q0 185 100 159 L104 -28 Q111 -90 92 -120 L55 -132 Q31 -103 0 -105 Q-31 -103 -55 -132 Z');paint(body,colors.body,'body');
    const shoulder=new Path2D('M-55 -132 L-92 -120 Q-104 -100 -105 -76 L-67 -54 L-21 -68 L-26 -111 Z');
    [-1,1].forEach(side=>{c.save();c.scale(side,1);paint(shoulder,colors.pockets,'');c.restore();});
    // Contrast lower pockets and neat welt flaps.
    [-1,1].forEach(side=>{
      c.save();c.scale(side,1);round(c,24,35,62,77,6,colors.pockets,selected==='pockets'?'#be9a64':'#3d4d3b35');
      round(c,22,32,66,16,3,shade(colors.pockets,.88));dot(c,55,41,2.5,'#e7dec3');
      c.strokeStyle='#ffffff45';c.lineWidth=.8;c.setLineDash([2.5,3]);c.strokeRect(29,51,51,54);c.setLineDash([]);c.restore();
    });
    const hem=new Path2D('M-101 150 Q0 175 101 150 L99 173 Q0 197 -99 173 Z');paint(hem,shade(colors.hood,.84),'');
    c.save();c.clip(hem);c.strokeStyle='#ffffff17';c.lineWidth=1;
    for(let x=-100;x<=100;x+=4){c.beginPath();c.moveTo(x,151);c.lineTo(x,194);c.stroke();}c.restore();
    // Silver zipper, tape, teeth and pull tab.
    c.strokeStyle='#203c3b';c.lineWidth=6;c.beginPath();c.moveTo(0,-103);c.lineTo(0,178);c.stroke();
    c.strokeStyle='#dfd8be';c.lineWidth=1;
    for(let y=-100;y<176;y+=4){c.beginPath();c.moveTo(-2.7,y);c.lineTo(2.7,y+1.5);c.stroke();}
    round(c,-4,-94,8,13,2,'#c7c7b7','#e7e9d9');c.strokeStyle='#d7d9c8';c.lineWidth=2;c.strokeRect(-3,-81,6,12);
    c.strokeStyle='#f3ead34a';c.lineWidth=1;c.setLineDash([2,4]);
    c.beginPath();c.moveTo(-96,-32);c.lineTo(-92,139);c.moveTo(96,-32);c.lineTo(92,139);c.moveTo(-63,-52);c.lineTo(-24,-66);c.moveTo(63,-52);c.lineTo(24,-66);c.stroke();c.setLineDash([]);
    dot(c,19,-113,3,'#ddd6bb');c.restore();
    }

    // Layer and color selections track the animated pointer.
    round(c,703,135,244,592,16,'#f7f8f2','#e1e6d9');text(c,'LAYERS',727,172,15,'#7d8976',600);
    layerNames.forEach((layer,i)=>{
      const y=193+i*57;
      round(c,719,y,212,45,8,selected===layer?'#e1e8d9':'#fbfcf7',selected===layer?'#a5b49a':null);
      text(c,layer[0].toUpperCase()+layer.slice(1),756,y+29,21,'#435b4a',selected===layer?600:400);
      c.strokeStyle='#8b9c83';c.lineWidth=1.4;c.strokeRect(731,y+15,11,13);dot(c,911,y+23,8,colors[layer]);
    });
    text(c,'COLOR',727,464,15,'#7d8976',600);
    jacketPalette.forEach((color,i)=>{
      const x=752+i%3*60,y=505+Math.floor(i/3)*57;dot(c,x,y,21,color);
      if(i===action[1]&&phase>2.4){c.beginPath();c.arc(x,y,25,0,TAU);c.strokeStyle='#768869';c.lineWidth=1.6;c.stroke();}
    });
    bar(c,727,608,193,'#dde4d5',1);text(c,'Designed by you.',727,646,20,'#4d6652',500);text(c,'One layer at a time.',727,675,16,'#8c9983');
    const swatch=i=>[752+i%3*60,505+Math.floor(i/3)*57];
    const start=swatch(previous[1]),target=[815,216+layerNames.indexOf(action[0])*57],end=swatch(action[1]);
    let p;
    if(phase<1.45){const f=ease(phase/1.1);p=[mix(start[0],target[0],f),mix(start[1],target[1],f)-Math.sin(f*Math.PI)*22];}
    else{const f=ease((phase-1.55)/.9);p=[mix(target[0],end[0],f),mix(target[1],end[1],f)-Math.sin(f*Math.PI)*15];}
    for(const at of [1.18,2.5]){
      const age=phase-at;if(age>=0&&age<.45){c.beginPath();c.arc(p[0],p[1],7+age*42,0,TAU);c.strokeStyle=`rgba(93,120,80,${(1-age/.45)*.6})`;c.lineWidth=2;c.stroke();}
    }
    c.save();c.translate(p[0],p[1]);c.shadowColor='#17372840';c.shadowBlur=9;c.shadowOffsetY=3;
    c.beginPath();c.moveTo(0,0);c.lineTo(1,28);c.lineTo(8,21);c.lineTo(15,34);c.lineTo(21,31);c.lineTo(14,18);c.lineTo(25,18);c.closePath();c.fillStyle='#253e31';c.fill();c.strokeStyle='#ffffff';c.lineWidth=2;c.stroke();c.restore();
    c.restore();
  }

  class ProductScene extends HTMLElement {
    connectedCallback() {
      this.kind=this.getAttribute('project');
      if(!Object.hasOwn(descriptions,this.kind))return;
      const root=this.shadowRoot||this.attachShadow({mode:'open'});
      if(window.PortfolioRealisticScenes?.supports(this.kind)){
        this.ui=window.PortfolioRealisticScenes.mount(this.kind,root);
      }else{
        root.innerHTML='<style>canvas{position:absolute;inset:0;width:100%;height:100%;display:block}</style><canvas aria-hidden="true"></canvas>';
        this.canvas=root.querySelector('canvas');
        this.ctx=this.canvas.getContext('2d');
      }
      this.setAttribute('role','img');this.setAttribute('aria-label',descriptions[this.kind]);
      this.time=0;this.visible=false;this.frame=0;
      this.media=matchMedia('(prefers-reduced-motion: reduce)');this.abort=new AbortController();
      const options={signal:this.abort.signal};
      this.media.addEventListener('change',()=>{this.draw();this.sync();},options);
      document.addEventListener('visibilitychange',()=>this.sync(),options);
      this.resize=new ResizeObserver(()=>{
        const r=this.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,2);
        this.w=r.width;this.h=r.height;
        if(this.ui){this.ui.resize(r.width,r.height);}
        else{this.canvas.width=Math.round(r.width*ratio);this.canvas.height=Math.round(r.height*ratio);this.ctx.setTransform(ratio,0,0,ratio,0,0);}
        this.draw();
      });this.resize.observe(this);
      this.intersection=new IntersectionObserver(e=>{this.visible=e[0].isIntersecting;this.sync();},{threshold:.01});this.intersection.observe(this);
      this.tick=now=>{
        this.frame=0;if(!this.running())return;
        const elapsed=Math.max(0,(now-this.last)/1000);
        this.time+=this.ui?elapsed:Math.min(elapsed,.05);this.last=now;this.draw();this.frame=requestAnimationFrame(this.tick);
      };
    }
    disconnectedCallback(){cancelAnimationFrame(this.frame);this.resize?.disconnect();this.intersection?.disconnect();this.abort?.abort();this.ctx=null;this.ui=null;}
    running(){return this.isConnected&&this.visible&&!this.media.matches&&!document.hidden&&(this.closest('dialog')||!document.querySelector('dialog[open]'));}
    sync(){cancelAnimationFrame(this.frame);this.frame=0;if(this.running()){this.last=performance.now();this.frame=requestAnimationFrame(this.tick);}}
    draw(){
      if(!this.w||!this.h)return;
      const t=this.media.matches?({fsqlstudio:16,postcard:22,'module-builder':23,firelink:19,chronos:24,'ahmadabad-safe-city':25,'security-policy-configure':21}[this.kind]??4):this.time;
      if(this.ui){
        const phase=this.ui.draw(t);
        if(this.dataset.flowStep!==phase)this.dataset.flowStep=phase;
        return;
      }
      if(this.kind==='metamarch'){drawDesigner(this.ctx,this.w,this.h,t);return;}
      const phase=window.PortfolioUIFlows.draw(this.kind,this.ctx,this.w,this.h,t);
      if(this.dataset.flowStep!==phase)this.dataset.flowStep=phase;
    }
  }
  customElements.define('project-scene',ProductScene);
  document.querySelectorAll('dialog').forEach(dialog=>new MutationObserver(()=>document.querySelectorAll('project-scene').forEach(scene=>scene.sync())).observe(dialog,{attributes:true,attributeFilter:['open']}));
})();
