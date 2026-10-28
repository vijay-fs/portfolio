(() => {
  const ease=n=>{n=Math.max(0,Math.min(1,n));return n*n*(3-2*n);};
  const text=(c,s,x,y,size=20,color='#344137',weight=400)=>{c.fillStyle=color;c.font=`${weight} ${size}px Arial,sans-serif`;c.fillText(s,x,y);};
  const box=(c,x,y,w,h,fill,r=10,stroke)=>{c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=fill;c.fill();if(stroke){c.lineWidth=1;c.strokeStyle=stroke;c.stroke();}};
  const line=(c,x,y,x2,y2,color='#e2e6dd',width=1)=>{c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke();};
  const dot=(c,x,y,r,color)=>{c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill();};
  const typed=(s,t,start,end)=>s.slice(0,Math.max(0,Math.min(s.length,Math.floor((t-start)/(end-start)*s.length))));
  const tones={fsqlstudio:['#f3f0e4','#cbd4ba','#526447','#f0f3e9'],postcard:['#faeae2','#dcbcb2','#965b51','#f7ece7'],'module-builder':['#f2edf8','#c9bbd8','#79628f','#f1edf6']};
  function button(c,label,x,y,w,accent,primary=true,h=42){box(c,x,y,w,h,primary?accent:'#ffffff',8,primary?null:'#dce2d7');text(c,label,x+14,y+h/2+6,18,primary?'#ffffff':accent,600);}
  function chip(c,label,x,y,w,accent){box(c,x,y,w,28,accent+'12',14);text(c,label,x+10,y+19,14,accent,500);}
  function arrow(c,x,y,color){line(c,x-6,y-3,x,y+3,color,1.5);line(c,x,y+3,x+6,y-3,color,1.5);}
  function tick(c,x,y,color='#59734e'){c.beginPath();c.moveTo(x-5,y);c.lineTo(x-1,y+4);c.lineTo(x+6,y-5);c.strokeStyle=color;c.lineWidth=2;c.stroke();}
  function cursor(c,t,points,clicks=[]){
    let a=points[0],b=a;
    for(let i=1;i<points.length;i++){b=points[i];if(t<=b[0])break;a=b;}
    const f=a===b?1:ease((t-a[0])/(b[0]-a[0]));
    const x=a[1]+(b[1]-a[1])*f,y=a[2]+(b[2]-a[2])*f;
    for(const at of clicks){const age=t-at;if(age>=0&&age<.5){c.beginPath();c.arc(x,y,8+age*36,0,Math.PI*2);c.strokeStyle=`rgba(88,107,81,${(1-age/.5)*.6})`;c.lineWidth=2;c.stroke();}}
    c.save();c.translate(x,y);c.shadowColor='#172c3030';c.shadowBlur=7;c.shadowOffsetY=3;
    c.beginPath();c.moveTo(0,0);c.lineTo(1,25);c.lineTo(7,19);c.lineTo(14,31);c.lineTo(19,28);c.lineTo(12,17);c.lineTo(23,17);c.closePath();c.fillStyle='#283b32';c.fill();c.strokeStyle='#ffffff';c.lineWidth=1.8;c.stroke();c.restore();
  }
  function chrome(c,w,h,kind,title,paint,portrait=false){
    const p=tones[kind],H=portrait?1100:800;
    const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,p[0]);g.addColorStop(1,p[1]);c.fillStyle=g;c.fillRect(0,0,w,h);
    const scale=Math.min(w/1000,h/H)*.97;
    c.save();c.translate((w-1000*scale)/2,(h-H*scale)/2);c.scale(scale,scale);
    c.shadowColor=p[2]+'24';c.shadowBlur=30;c.shadowOffsetY=16;box(c,20,30,960,H-60,'#fdfdf9',20,'#ffffff');c.shadowColor='transparent';
    c.save();c.beginPath();c.roundRect(20,30,960,H-60,20);c.clip();c.translate(20,30);
    box(c,0,0,960,64,'#ffffff',0);line(c,0,64,960,64);
    box(c,22,19,27,27,p[2],8);text(c,title[0],28,39,19,'#ffffff',600);text(c,title,61,40,25,p[2],600);
    paint({c,H:H-60,accent:p[2],soft:p[3]});c.restore();c.restore();
  }
  function sql(c,w,h,time){
    const t=time%22,connected=t>=1.2,generated=t>=7.5,results=t>=13.1;
    chrome(c,w,h,'fsqlstudio','FSqlStudio',({H,accent,soft})=>{
      chip(c,connected?'● Fusion · Connected':'Fusion workspace',713,19,218,accent);
      box(c,0,65,155,H-65,soft,0);text(c,'WORKSPACE',19,104,13,'#849078',600);
      box(c,10,122,135,40,'#e0e7d5',7);text(c,'Fusion Production',21,148,16,accent,600);
      text(c,'TABLES',19,202,13,'#849078',600);
      ['Customers','Orders','Sales','Invoices'].forEach((v,i)=>{box(c,22,227+i*39,12,12,'#c5cfb9',2);text(c,v,45,239+i*39,16,'#718067');});
      text(c,'New query',177,99,22,'#3d4f35',600);chip(c,'Oracle Fusion',773,80,150,accent);
      text(c,'ASK YOUR DATA',177,133,13,'#87917c',600);
      box(c,177,147,558,52,'#ffffff',9,t>1.8&&t<5.4?'#9fae87':'#dce3d2');
      const question=typed('Show revenue by region',t,1.8,4.7);
      text(c,question||(t<1.8?'Ask a question in plain language':''),192,180,22,question?'#374b35':'#a0a995');
      if(t>1.8&&t<4.8&&Math.floor(t*2)%2)line(c,195+c.measureText(question).width,161,195+c.measureText(question).width,183,accent,1.5);
      button(c,t>=5.4&&t<7.5?'Generating…':'Generate SQL',749,147,177,accent);
      box(c,177,219,749,230,'#25382e',10);
      text(c,'SQL EDITOR',195,246,13,'#97ae96',600);
      const code=['SELECT region, SUM(revenue) AS revenue','FROM sales','GROUP BY region','ORDER BY revenue DESC;'];
      if(t>=5.7){
        const count=Math.floor(Math.max(0,t-5.7)*51);
        code.forEach((s,i)=>{text(c,String(i+1),195,283+i*34,16,'#789078');text(c,s.slice(0,Math.max(0,count-code.slice(0,i).join('').length)),228,283+i*34,20,i===0?'#d3c59f':'#e0e7d8');});
      }else{text(c,'Your generated SQL will appear here.',226,324,19,'#6f8975');}
      button(c,t>=12&&t<13.1?'Running…':'Run query',781,232,128,generated?accent:'#607260',true,36);
      box(c,177,468,749,220,'#ffffff',9,'#e1e7da');text(c,results?'Results · 3 rows':'Results',195,499,20,'#4a5a40',600);
      if(results){
        ['REGION','REVENUE'].forEach((v,i)=>text(c,v,197+i*274,535,13,'#8e9982',600));
        ['North','South','West'].forEach((v,i)=>{
          const visible=ease((t-13.1-i*.18)/.35);c.save();c.globalAlpha=visible;
          const y=566+i*42;line(c,195,y+13,906,y+13,'#eaf0e4');text(c,v,197,y,20,'#485b3e');text(c,['124,800','98,420','87,650'][i],471,y,20,'#485b3e',500);
          box(c,653,y-16,[215,169,151][i],17,['#839665','#a1ae82','#bbc69e'][i],3);c.restore();
        });
      }else{text(c,t>=12?'Retrieving rows from Fusion…':'Run a query to view your data.',195,580,18,'#a0ab95');}
      text(c,results?'✓ Query complete':'Read-only data workspace',179,H-19,13,results?accent:'#95a08a');
      cursor(c,t,[[0,663,95],[.6,817,36],[1.2,817,36],[1.8,338,175],[4.7,674,177],[5.3,819,174],[7.9,679,367],[11.6,839,251],[12.1,839,251],[14.1,552,566],[17,795,612],[22,795,612]],[1.2,1.8,5.3,12.1]);
    });
    return results?'query-results':generated?'generated-sql':t>=5.4?'generating-sql':connected?'typing-question':'connect-workspace';
  }
  function avatar(c,initials,x,y,color){dot(c,x,y,15,color);text(c,initials,x-8,y+5,12,'#ffffff',600);}
  function bubble(c,name,message,x,y,width,fill,color){text(c,name,x,y,14,color,600);box(c,x,y+10,width,58,fill,10);text(c,message,x+12,y+44,17,color);}
  function chat(c,w,h,time){
    const t=time%26,summary=t>=7.2,searching=t>=12&&t<19.6,selected=t>=19.6;
    chrome(c,w,h,'postcard','Postcard',({H,accent,soft})=>{
      chip(c,'Product team',765,20,164,accent);
      box(c,0,65,182,H-65,soft,0);text(c,'CHANNELS',20,105,13,'#a2877e',600);
      ['# general','# engineering','# design'].forEach((v,i)=>{if(i===1)box(c,11,163,160,43,'#ead1c7',7);text(c,v,23,151+i*40,17,i===1?accent:'#967b72',i===1?600:400);});
      text(c,'DIRECT MESSAGES',20,311,12,'#a2877e',600);avatar(c,'ML',34,344,'#b18372');text(c,'Maya Lee',59,350,16,'#967b72');avatar(c,'AK',34,385,'#b29885');text(c,'Arun Kumar',59,391,16,'#967b72');
      text(c,'# engineering',204,101,23,'#704a43',600);text(c,summary?'You’re all caught up':'3 unread messages',204,129,14,'#aa8275');
      box(c,204,149,444,43,'#fcf7f2',9,'#e9dbd1');text(c,searching?typed('ERP mapping',t,12,14.3):(selected?'ERP mapping':'Search messages'),221,177,18,searching||selected?accent:'#b0988c');
      text(c,'⌕',615,177,23,'#a8897c');
      line(c,668,83,668,H-26,'#eadfd7');text(c,'AI CATCH-UP',693,110,14,accent,600);
      button(c,t>=5.7&&t<7.2?'Summarizing…':summary?'✓ Caught up':'Summarize unread',690,135,239,accent,true,43);
      if(summary){
        text(c,'What you missed',693,222,20,'#794f46',600);
        const notes=[['Release','The API is planned','for Friday.'],['Integration','ERP mapping is','ready for review.'],['Testing','The latest test results','have been shared.']];
        notes.forEach((n,i)=>{const y=263+i*101;dot(c,700,y-5,3,'#b38671');text(c,n[0],712,y,16,accent,600);text(c,n[1],712,y+25,16,'#9d7a6d');text(c,n[2],712,y+48,16,'#9d7a6d');});
        chip(c,'3 messages summarized',692,592,223,accent);
      }else{text(c,'Catch up on unread',693,238,17,'#b29a8e');text(c,'conversations in seconds.',693,265,17,'#b29a8e');}
      if(searching&&t>=14.6){
        text(c,'SEARCH RESULTS',204,228,13,'#aa8778',600);text(c,'2 messages found',204,257,19,'#7e5448',600);
        box(c,204,282,444,133,'#f2e0d4',10,'#d7b5a3');avatar(c,'ML',232,309,'#ad7e69');text(c,'Maya · #engineering',257,315,16,accent,600);
        text(c,'The ERP mapping is ready for review.',219,357,18,'#805849');text(c,'Today, 10:24 AM',219,390,14,'#b18d7b');
        box(c,204,431,444,108,'#fffaf4',10,'#e9dbd0');text(c,'Arun · #engineering',219,461,16,accent,600);text(c,'ERP test results have been added.',219,491,18,'#977465');
      }else{
        if(!summary&&!selected){line(c,208,216,361,216,'#dfc7b9');text(c,'UNREAD',372,220,11,'#b08a76',600);line(c,439,216,645,216,'#dfc7b9');}
        avatar(c,'ML',219,252,'#ad7e69');bubble(c,'Maya · 10:20','Can we ship the revised API on Friday?',245,243,397,'#f3e2d8','#82594b');
        if(t>=1.5||selected){avatar(c,'VP',630,352,'#b0957c');bubble(c,'You · 10:22','Yes. I’ll review the final changes today.',204,343,392,'#edcfc0','#82594b');}
        if(t>=3||selected){
          if(selected)box(c,198,434,455,108,'#f0dcbb',9,'#d5b77f');
          avatar(c,'ML',219,457,'#ad7e69');bubble(c,'Maya · 10:24','The ERP mapping is ready for review.',245,448,397,selected?'#f8ecd7':'#f3e2d8','#82594b');
        }
        if(t>=4.3||selected){avatar(c,'AK',219,562,'#b29885');bubble(c,'Arun · 10:25','I’ve added the latest test results.',245,553,397,'#f3e2d8','#82594b');}
      }
      box(c,204,H-71,444,44,'#ffffff',10,'#e6d7ca');text(c,'Write a message…',220,H-43,17,'#baa090');text(c,'↗',615,H-43,22,accent);
      cursor(c,t,[[0,489,290],[4.9,796,156],[5.7,796,156],[8.8,797,316],[11.5,373,170],[14.3,460,173],[17.8,441,355],[19.5,441,355],[22,492,489],[26,492,489]],[5.7,11.5,19.5]);
    });
    return selected?'message-context':searching&&t>=14.6?'retrieved-messages':searching?'search-messages':summary?'unread-summary':'unread-conversation';
  }
  const orders=[['1034','Northstar','1,240.00'],['1035','Acme Co.','890.00'],['1036','Aster Labs','2,180.00']];
  function orderTable(c,x,y,width,accent){
    box(c,x,y,width,187,'#ffffff',9,'#e0dce8');box(c,x,y,width,39,'#f4f0f8',8);
    const columns=[x+17,x+width*.27,x+width*.74];['Order','Customer','Amount'].forEach((v,i)=>text(c,v,columns[i],y+25,16,accent,600));
    orders.forEach((r,i)=>{r.forEach((v,n)=>text(c,v,columns[n],y+70+i*43,17,'#766481'));if(i<2)line(c,x+12,y+84+i*43,x+width-12,y+84+i*43,'#efeaf3');});
  }
  function modules(c,w,h,time){
    const t=time%28,portrait=h/w>1.1,ui=t>=7,saving=t>=16&&t<17.5,saved=t>=17.5,created=t>=21;
    chrome(c,w,h,'module-builder','Module Builder',({H,accent,soft})=>{
      button(c,saving?'Saving…':saved?'✓ Saved':'Save',823,14,108,accent);
      box(c,0,65,155,H-65,soft,0);text(c,'WORKSPACE',18,104,12,'#a18daa',600);
      ['Overview','API builder','UI builder','Pages'].forEach((v,i)=>{const active=created?3:ui?2:1;if(i===active)box(c,10,122+i*44,135,37,'#e1d6ec',7);text(c,v,24,147+i*44,17,i===active?accent:'#a08baa',i===active?600:400);});
      text(c,'CONNECTIONS',18,368,12,'#a18daa',600);dot(c,27,398,4,'#8a9b77');text(c,'ERP systems',40,403,15,'#8f7d98');dot(c,27,434,4,'#8a9b77');text(c,'Third-party APIs',40,439,14,'#8f7d98');
      const steps=['1  Build API','2  Build UI','3  Save'];
      steps.forEach((v,i)=>{const active=saved?2:ui?1:0;box(c,177+i*252,82,237,39,active===i?'#e5daef':'#f7f3fa',7);text(c,v,193+i*252,108,18,active===i?accent:'#b2a2bc',active===i?600:400);});
      if(!ui){
        text(c,'Configure your API',177,168,25,'#614b73',600);text(c,'Give the endpoint a route and connect its data.',177,199,18,'#a18bab');
        chip(c,'GET',177,226,67,accent);box(c,255,220,670,48,'#ffffff',8,'#dcd2e4');text(c,typed('/api/orders',t,.7,2.7)||'Endpoint route',273,252,22,t>.7?accent:'#b4a5bc');
        text(c,'DATA SOURCE',177,309,13,'#a18bab',600);box(c,177,325,749,49,'#ffffff',8,'#dcd2e4');text(c,t>=4.5?'ERP · Orders':'Select a connection',195,357,21,t>=4.5?accent:'#b4a5bc');arrow(c,901,349,'#a18bab');
        if(t>=3.1&&t<4.5){
          c.save();c.shadowColor='#5d45621a';c.shadowBlur=12;box(c,177,380,749,128,'#ffffff',9,'#d8cce1');c.shadowColor='transparent';box(c,185,389,733,48,'#efe8f5',6);text(c,'ERP systems',203,420,21,accent,500);text(c,'Third-party APIs',203,476,21,'#9e88aa');c.restore();
        }else{
          text(c,'RESPONSE FIELDS',177,420,13,'#a18bab',600);['Order ID','Customer','Amount'].forEach((v,i)=>chip(c,v,177+i*180,439,164,accent));
          if(t>=4.5){chip(c,'✓ Connection ready',177,510,212,'#6c8760');}
        }
        button(c,'Build UI  →',748,H-77,178,accent);
      }else if(!saved){
        text(c,'Build your page',177,167,25,'#614b73',600);chip(c,'GET /api/orders',716,145,211,accent);
        text(c,'COMPONENTS',177,210,13,'#a18bab',600);
        ['Table','Text','Form'].forEach((v,i)=>button(c,v,177+i*139,225,126,accent,v==='Table'&&t>=9));
        const top=portrait?297:286,previewHeight=portrait?563:326;
        box(c,177,top,749,previewHeight,'#f9f7fc',10,'#ddd3e7');
        for(let x=194;x<915;x+=23)for(let y=top+16;y<top+previewHeight-14;y+=23)dot(c,x,y,.8,'#d7cce155');
        if(t<10){c.setLineDash([7,6]);c.strokeStyle='#c7b7d2';c.lineWidth=2;c.strokeRect(220,top+67,664,183);c.setLineDash([]);text(c,'Drop a component here',413,top+162,20,'#b8a4c5');}
        if(t>=8.8&&t<10){
          const f=ease((t-8.8)/1.2),x=196+(330-196)*f,y=244+(top+115-244)*f;c.save();c.globalAlpha=.8;box(c,x,y,158,73,'#e5daef',8,'#bca6cc');text(c,'Table',x+28,y+45,24,accent,500);c.restore();
        }
        if(t>=10){text(c,'Orders overview',201,top+43,21,accent,600);orderTable(c,201,top+64,700,accent);chip(c,'✓ Bound to ERP · Orders',201,top+270,279,'#748a67');}
        if(portrait&&t>=10){box(c,201,top+326,700,157,'#ffffff',10,'#e1d8e9');text(c,'DATA BINDING',223,top+361,13,'#a18bab',600);text(c,'GET /api/orders',223,top+399,23,accent,500);text(c,'Order ID  →  Customer  →  Amount',223,top+441,20,'#9b88a8');}
        text(c,saving?'Saving your API and page…':'Your API and UI are ready to save.',177,H-38,17,saving?accent:'#a18bab');
      }else{
        if(!created){box(c,177,145,749,100,'#edf2e6',10,'#dce6cd');dot(c,211,179,13,'#739564');tick(c,211,179,'#ffffff');text(c,'Page created',237,184,25,'#527548',600);text(c,'Your API and UI were created when you saved.',197,223,18,'#80966f');}
        else{text(c,'Orders overview',177,171,28,accent,600);chip(c,'✓ Page created',746,149,180,'#6d895f');}
        const y=created?203:267;
        if(!created){chip(c,'GET /api/orders',177,y,229,accent);chip(c,'UI · Orders overview',419,y,263,accent);}
        if(!created)text(c,'Orders overview',197,y+91,23,accent,600);
        orderTable(c,197,y+(created?60:112),708,accent);
        chip(c,'ERP connected',197,y+(created?271:324),187,'#789065');chip(c,'Third-party API support',397,y+(created?271:324),275,accent);
        if(portrait){
          const details=y+(created?340:393);
          box(c,197,details,708,164,'#f8f5fb',10,'#e3dbea');text(c,'CREATED TOGETHER',218,details+31,13,'#a18bab',600);
          text(c,'API endpoint',218,details+69,18,accent,600);text(c,'GET /api/orders',218,details+102,21,'#8e78a0');
          text(c,'Page',590,details+69,18,accent,600);text(c,'Orders overview',590,details+102,21,'#8e78a0');
          text(c,'Saved and ready to use.',218,details+140,16,'#a18bab');
        }
        if(!created)button(c,'Open page  ↗',748,H-77,178,accent);
      }
      const tableDropY=portrait?421:410;
      cursor(c,t,[[0,344,245],[2.7,463,246],[3.1,513,348],[4.4,335,413],[6.5,819,H-56],[7.1,819,H-56],[8.7,226,245],[10,480,tableDropY],[12.5,572,tableDropY+70],[15.8,865,36],[16.1,865,36],[18.7,656,388],[20.8,821,H-56],[21.1,821,H-56],[24,601,385],[28,601,385]],[3.1,4.4,6.5,8.7,10,16.1,21.1]);
    },portrait);
    return created?'created-page':saved?'page-created':saving?'save-api-and-ui':ui?'build-ui':'build-api';
  }
  const flows={fsqlstudio:sql,postcard:chat,'module-builder':modules};
  window.PortfolioUIFlows={draw(kind,c,w,h,t){return flows[kind](c,w,h,t);}};
})();
