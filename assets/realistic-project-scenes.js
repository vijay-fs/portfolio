(() => {
  const supported=new Set(['firelink','chronos','ahmadabad-safe-city','security-policy-configure']);
  const shapes={
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-12 4h.01m4 0h.01m4 0h.01m-8 3h.01m4 0h.01"/>',
    people:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m2-15a3 3 0 0 1 0 6m2 9v-2a6 6 0 0 0-3-5"/>',
    shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
    settings:'<path d="m9 3-1 3-3 1-2 4 2 2v4l4 2 3-1 3 1 4-2v-4l2-2-2-4-3-1-1-3H9Z"/><circle cx="12" cy="12" r="3"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-12 9a3 3 0 0 0 6 0"/>',
    chevron:'<path d="m9 6 6 6-6 6"/>',
    down:'<path d="m6 9 6 6 6-6"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',
    bag:'<path d="M5 7h14l2 14H3L5 7Zm3 0V5a4 4 0 0 1 8 0v2"/>',
    heart:'<path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-4 5 2 10 8 15 6-5 12-10 8-15Z"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    pin:'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    phone:'<path d="m5 3 4 1 1 5-3 2a18 18 0 0 0 6 6l2-3 5 1 1 4c-1 5-8 1-13-4S0 4 5 3Z"/>',
    home:'<path d="m3 11 9-8 9 8v10h-6v-7H9v7H3V11Z"/>',
    file:'<path d="M14 3H5v18h14V8l-5-5Zm0 0v6h5M8 13h8m-8 4h6"/>',
    user:'<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    link:'<path d="m10 13 4-4m-7 8-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 0 1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/>',
    layers:'<path d="m12 3 10 5-10 5L2 8l10-5Zm-9 10 9 5 9-5M3 18l9 5 9-5"/>',
    activity:'<path d="M2 12h5l3-8 5 16 3-8h4"/>',
    lock:'<rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v3"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 0 0 18 17 17 0 0 0 0-18Z"/>'
  };
  const icon=(name,cls='')=>`<svg class="rs-icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${shapes[name]||shapes.grid}</svg>`;
  const badge=(label,cls='')=>`<span class="rs-badge ${cls}">${label}</span>`;
  const avatar=(letters,cls='')=>`<span class="rs-avatar ${cls}">${letters}</span>`;
  const btn=(text,cls='')=>`<span class="rs-btn ${cls}">${text}</span>`;
  const field=(label,text,extra='')=>`<div class="rs-field"><label>${label}</label><div class="rs-input ${extra}">${text}</div></div>`;
  const checkbox=(selected=true)=>`<span class="rs-checkbox ${selected?'checked':''}">${selected?icon('check'):''}</span>`;
  const menu=(items,active,count='12')=>items.map(([symbol,name])=>`<div class="rs-menu-item ${name===active?'active':''}">${icon(symbol)}<span>${name}</span>${name==='Appointments'?`<small>${count}</small>`:''}</div>`).join('');
  const browserBar=title=>`<div class="rs-browser"><span class="rs-window-dots"><i></i><i></i><i></i></span><span>${icon('lock')}${title}</span><span>⋯</span></div>`;
  const appTop=(brand,right)=>`<div class="rs-top"><div class="rs-logo"><span>${icon(brand==='Firelink'?'plus':'shield')}</span>${brand}</div><div class="rs-top-right">${right}</div></div>`;
  const cursor='<div class="rs-cursor"><svg viewBox="0 0 28 35"><path d="M2 2v25l7-7 7 12 5-3-7-12h10Z" fill="#162e29" stroke="white" stroke-width="2"/></svg><i></i></div>';
  const touchGesture='<div class="rs-touch" hidden><i class="rs-touch-ring"></i><b class="rs-touch-pad"></b></div>';
  const typed=(s,t,a,b)=>s.slice(0,Math.max(0,Math.min(s.length,Math.floor((t-a)/(b-a)*s.length))));
  const products=[['Daily Canvas Tote','Natural / Canvas','₹1,490','tote'],['Everyday Watch','Tan / Silver','₹4,800','watch'],['Studio Headphones','Charcoal / Wireless','₹6,990','headphones']];
  const productPhoto=(name,cls='')=>`<div class="rs-product-photo ${name} ${cls}"></div>`;
  function clinic(t){
    const selected=t>=4,booking=t>=7&&t<19,slots=t>=13,confirmed=t>=19,clinicName=selected?'Riverside Clinic':'City Care Clinic';
    const phase=confirmed?'appointment-confirmed':t>=17?'confirm-booking':slots?'select-time':booking?'patient-details':selected?'clinic-schedule':t>=2?'select-clinic':'clinic-overview';
    const doctors=[['MS','Dr. Meera Shah','General physician'],['RP','Dr. R. Patel','Consultant'],['AK','Dr. A. Kumar','General physician']];
    const appt=(top,doctor,name,type,cls='')=>`<div class="rs-appointment ${cls}" style="top:${top}px;left:calc(58px + ${doctor*100/3}% - ${doctor*58/3}px)"><b>${name}</b><span>${type}</span><small>${icon('clock')}${top<100?'09:00 – 09:30':top<200?'10:00 – 10:30':'11:00 – 11:30'}</small></div>`;
    let html=`<div class="rs-app clinic">${browserBar('Firelink · Clinic workspace')}${appTop('Firelink',`${badge('<i class="rs-online"></i> Live updates','green')}${icon('bell')}${avatar('MP')}`)}<div class="rs-shell"><aside class="rs-sidebar"><div class="rs-workspace">${avatar(selected?'RC':'CC','square')}<span>${clinicName}<small>Clinic workspace</small></span>${icon('down')}</div><div class="rs-sidebar-label">WORKSPACE</div>${menu([['grid','Overview'],['calendar','Appointments'],['people','Patients'],['user','Practitioners'],['settings','Settings']],'Appointments',confirmed?'13':'12')}<div class="rs-sidebar-footer">${icon('shield')}<span>Separate clinic workspaces<small>Powered by Supabase Realtime</small></span></div></aside><main class="rs-main"><div class="rs-page-title"><div><span class="rs-overline">YOUR CLINIC AT A GLANCE</span><h2>Appointments</h2><p>Manage your day. Keep every patient connected.</p></div>${btn(icon('plus')+'New appointment','primary')}</div><div class="rs-stat-grid"><div><span>Today’s appointments</span><b>${confirmed?'13':'12'}<small>Scheduled</small></b></div><div><span>Checked in</span><b>04<small class="green-text">Ready to consult</small></b></div><div><span>Available slots</span><b>${confirmed?'07':'08'}<small>Across 3 practitioners</small></b></div></div><div class="rs-calendar-toolbar"><div>${btn('‹','tiny')}${btn('›','tiny')}<b>Tuesday, 27 October</b>${badge('Today')}</div><div>${icon('search')}${btn('Day '+icon('down'),'small')}</div></div><div class="rs-calendar"><div class="rs-practitioners"><span>GMT +5:30</span>${doctors.map(([initial,name,type])=>`<div>${avatar(initial)}<span><b>${name}</b><small>${type}</small></span></div>`).join('')}</div><div class="rs-time-grid">${['09:00','10:00','11:00','12:00'].map((label,i)=>`<div class="rs-hour" style="top:${i*77}px"><span>${label}</span></div>`).join('')}${appt(12,0,'Priya Desai','Consultation','mint')}${appt(89,1,'Rahul Joshi','Follow-up','lilac')}${appt(12,2,'Aarav Mehta','Consultation','sand')}${appt(166,2,'Kiran Shah','Follow-up','mint')}${confirmed?appt(166,0,'Alex Morgan','New · Confirmed','mint rs-new-appointment'):''}<div class="rs-now-line"><span>10:42</span></div></div></div><div class="rs-calendar-footer"><span><i class="rs-online"></i> ${confirmed?'Schedule updated just now':'All changes synced'}</span><span>Clinic workspace · ${clinicName}</span></div></main></div>`;
    if(t>=2&&t<4)html+=`<div class="rs-clinic-dropdown rs-float"><span class="rs-overline">SWITCH CLINIC</span><div>${avatar('CC','square')}<span>City Care Clinic<small>Workspace 01</small></span>${icon('check')}</div><div class="selected">${avatar('RC','square')}<span>Riverside Clinic<small>Workspace 02</small></span></div></div>`;
    if(booking)html+=`<div class="rs-scrim"></div><div class="rs-booking rs-float"><div class="rs-modal-title"><span>${badge('NEW APPOINTMENT','green')}<h3>Book a patient visit</h3><p>Riverside Clinic · Tuesday, 27 October</p></span>${icon('close')}</div>${field('Patient name','<span data-rs-patient></span><i class="rs-text-caret"></i>','focused')}${field('Visit type','Consultation'+icon('down'))}<div class="rs-two-fields">${field('Practitioner','Dr. Meera Shah'+icon('down'))}${field('Appointment date',icon('calendar')+'27 Oct 2026')}</div><div class="rs-slot-heading"><b>Available times</b><span>30 minute consultation</span></div><div class="rs-slots">${['10:30 AM','11:00 AM','11:30 AM','12:00 PM'].map((s,i)=>`<span class="${i===1?'rs-slot-target':''} ${slots&&i===1?'selected':''}">${s}</span>`).join('')}</div><div class="rs-booking-info">${icon('link')} Appointment updates sync across your clinic instantly.</div><div class="rs-modal-footer">${btn('Cancel')}${btn('<span data-rs-confirm>Confirm appointment</span>','primary')}</div></div>`;
    if(confirmed)html+=`<div class="rs-toast">${icon('check')}<span><b>Appointment confirmed</b><small>Alex Morgan · 11:00 AM · Dr. Meera Shah</small></span><span class="rs-toast-live">Synced live</span></div>`;
    html+='</div>';
    return {html,phase,key:booking?'booking-panel':phase,points:[[0,769,349],[1.7,104,133,'.rs-workspace'],[2.1,104,133,'.rs-workspace'],[3.8,143,229,'.rs-clinic-dropdown .selected'],[4,143,229,'.rs-clinic-dropdown .selected'],[6.7,846,159,'.rs-page-title .rs-btn'],[7.1,846,159,'.rs-page-title .rs-btn'],[7.8,467,261,'.rs-booking .rs-input'],[11.3,567,403,'.rs-two-fields .rs-input'],[12.8,432,477,'.rs-slot-target'],[13.1,432,477,'.rs-slot-target'],[16.8,637,589,'.rs-modal-footer .primary'],[17.1,637,589,'.rs-modal-footer .primary'],[21,610,624,'.rs-toast'],[30,610,624,'.rs-toast']],clicks:[2,4,7,8,13,17]};
  }
  function commerce(t){
    const detail=t>=5,added=t>=12,cart=t>=16&&t<22,ordered=t>=22;
    const phase=ordered?'order-confirmed':cart?'review-bag':added?'added-to-bag':t>=9?'product-selected':detail?'product-details':'browse-products';
    let html=`<div class="rs-app commerce">${browserBar('Chronos · Online store')}<div class="rs-shop-announcement">Thoughtful essentials. Made for every day.<span>India · INR ₹</span></div><div class="rs-shop-nav"><b>CHRONOS<span>EVERYDAY OBJECTS</span></b><div><span class="selected">Shop</span><span>Collections</span><span>Our story</span></div><div>${icon('search')}${icon('user')}<span class="rs-shop-bag">${icon('bag')}<small>${added?'1':'0'}</small></span></div></div>`;
    if(!detail)html+=`<div class="rs-shop-heading"><span class="rs-overline">THE EVERYDAY EDIT / 01</span><h2>Less, but better.</h2><p>Considered objects. Beautifully made. Yours to live with.</p></div><div class="rs-shop-filter"><span><b>All products</b> &nbsp; Accessories &nbsp; Lifestyle</span><span>Sort by: Featured ${icon('down')}</span></div><div class="rs-product-grid">${products.map(([name,material,price,id],i)=>`<article><div class="rs-product-image">${productPhoto(id)}<span class="rs-product-tag">${i===1?'BESTSELLER':'THE ESSENTIALS'}</span><span class="rs-product-like">${icon('heart')}</span><span class="rs-quick-add">Quick add ${icon('plus')}</span></div><div class="rs-product-name"><b>${name}</b><span>${price}</span></div><p>${material}</p></article>`).join('')}</div><div class="rs-shop-bottom"><span>${icon('bag')} Carefully selected essentials</span><span>Next.js storefront / PostgreSQL</span></div>`;
    else html+=`<div class="rs-shop-breadcrumb">Shop ${icon('chevron')} Accessories ${icon('chevron')} Everyday Watch</div><div class="rs-product-detail"><div class="rs-detail-gallery"><div class="rs-main-product">${productPhoto('watch')}<span class="rs-product-tag">THE EVERYDAY COLLECTION</span></div><div class="rs-gallery-thumbs"><span class="selected">${productPhoto('watch')}</span><span>${productPhoto('watch','close-up')}</span><small>01 / 02</small></div></div><div class="rs-detail-copy"><span class="rs-overline">TIME, WELL SPENT.</span><h2>Everyday Watch</h2><div class="rs-product-rating">★★★★★ <span>Designed for your everyday</span></div><b class="rs-price">₹4,800 <small>Inclusive of all taxes</small></b><p>A clean silver dial. A supple leather strap.<br>A considered companion, every day.</p><div class="rs-color-label">Color <b>Tan leather / Silver</b></div><div class="rs-photo-swatches"><i style="--swatch:#ba8a58" class="selected"></i><i style="--swatch:#45564b"></i><i style="--swatch:#30312d"></i></div><div class="rs-shop-size">One size · Adjustable strap <span>Size guide ↗</span></div><div class="rs-buy-row"><span class="rs-quantity">− &nbsp; 1 &nbsp; +</span>${btn(added?icon('check')+'Added to bag':'Add to bag '+icon('arrow'),'dark')}</div><div class="rs-shop-details"><div>Product details ${icon('plus')}</div><div>Delivery & returns ${icon('plus')}</div></div></div></div>`;
    if(cart)html+=`<div class="rs-scrim"></div><div class="rs-cart-panel rs-float"><div class="rs-modal-title"><h3>Your bag <small>(1 item)</small></h3>${icon('close')}</div><div class="rs-cart-item">${productPhoto('watch')}<div><b>Everyday Watch</b><span>Tan leather / Silver</span><small>Quantity: 1</small><strong>₹4,800</strong></div></div><div class="rs-cart-summary"><p>Subtotal <b>₹4,800</b></p><p>Shipping <span>Calculated at checkout</span></p><p class="total">Order total <b>₹4,800</b></p></div><div class="rs-cart-note">${icon('bag')} You have one thoughtfully chosen essential.</div>${btn(t>=20?'<i class="rs-spinner"></i> Placing order…':'Place order '+icon('arrow'),'dark full')}<div class="rs-secure-note">${icon('lock')} Secure order · Storefront preview</div></div>`;
    if(ordered)html+=`<div class="rs-order-success"><div class="rs-success-icon">${icon('check')}</div><span class="rs-overline">ORDER CH-1042</span><h2>Good things, on their way.</h2><p>Thank you. Your order has been confirmed.</p><div class="rs-order-receipt">${productPhoto('watch')}<div><b>Everyday Watch</b><span>Tan leather / Silver · Qty 1</span><small>Order total</small><strong>₹4,800</strong></div>${badge('Confirmed','green')}</div>${btn('Continue exploring '+icon('arrow'),'dark')}</div>`;
    html+='</div>';
    return {html,phase,key:phase,points:[[0,647,659],[4.6,482,382,'.rs-product-grid article:nth-child(2) .rs-product-image'],[5.1,482,382,'.rs-product-grid article:nth-child(2) .rs-product-image'],[8.8,577,389,'.rs-photo-swatches .selected'],[9.1,577,389,'.rs-photo-swatches .selected'],[11.8,754,488,'.rs-buy-row .rs-btn'],[12.1,754,488,'.rs-buy-row .rs-btn'],[15.8,885,129,'.rs-shop-bag'],[16.1,885,129,'.rs-shop-bag'],[19.8,749,585,'.rs-cart-panel > .rs-btn'],[20.1,749,585,'.rs-cart-panel > .rs-btn'],[24.1,633,568,'.rs-order-success > .rs-btn'],[30,633,568,'.rs-order-success > .rs-btn']],clicks:[5,9,12,16,20]};
  }
  function cityMap(active=false){
    return `<div class="rs-map"><svg viewBox="0 0 400 470" preserveAspectRatio="xMidYMid slice"><defs><pattern id="blocks" width="73" height="78" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)"><rect width="73" height="78" fill="#e9e8e1"/><rect x="5" y="5" width="26" height="25" rx="2" fill="#deded5"/><rect x="36" y="5" width="31" height="31" rx="2" fill="#e0dfd7"/><rect x="5" y="37" width="37" height="34" rx="2" fill="#e0dfd7"/><rect x="47" y="42" width="20" height="29" rx="2" fill="#deded5"/><path d="M0 0H73V78" fill="none" stroke="#fffefa" stroke-width="7"/></pattern></defs><rect width="400" height="470" fill="url(#blocks)"/><path d="M318-20C207 100 374 164 301 267S269 364 302 490" fill="none" stroke="#f8f8ef" stroke-width="52"/><path d="M318-20C207 100 374 164 301 267S269 364 302 490" fill="none" stroke="#a7cbd4" stroke-width="37"/><path d="M-10 151 430 264M-20 326 400 117M99-20 192 490" fill="none" stroke="#d4cebd" stroke-width="13"/><path d="M-10 151 430 264M-20 326 400 117M99-20 192 490" fill="none" stroke="#fffdf5" stroke-width="8"/><path d="m28 395 43-77 65-11-10-50 73-31 54-9" fill="none" stroke="#fff" stroke-width="9"/><path d="m28 395 43-77 65-11-10-50 73-31 54-9" fill="none" stroke="${active?'#3d7aa6':'#aebebc'}" stroke-width="5" stroke-linecap="round"/><path d="M25 54 81 42 105 86 68 110 23 99Z" fill="#bcd0a9"/><path d="m338 310 48 8 8 94-40-2-26-45Z" fill="#bcd0a9"/><g font-family="Arial,sans-serif" fill="#91988e" font-size="10"><text x="29" y="81">Community park</text><text x="139" y="106">CITY CENTRE</text><text x="24" y="236">Central Road</text><text x="285" y="168" transform="rotate(65 285 168)">Riverfront</text><text x="143" y="367">Market street</text></g><g fill="#fff" stroke="#d3dad4"><circle cx="88" cy="182" r="12"/><circle cx="183" cy="299" r="12"/><circle cx="247" cy="134" r="12"/></g><g fill="#738879" font-family="Arial" font-size="13" font-weight="bold"><text x="83" y="187">+</text><text x="178" y="304">P</text><text x="242" y="139">+</text></g></svg><span class="rs-map-pin ${active?'alert':''}">${icon('pin')}</span><span class="rs-map-you"><i></i></span><span class="rs-map-caption">City centre · Interface preview</span><span class="rs-map-layers">${icon('layers')}</span></div>`;
  }
  function phone(which,body,active){return `<div class="rs-device ${which}"><div class="rs-device-screen"><div class="rs-status-bar"><b>9:41</b><span class="rs-dynamic-island"></span><span>▮▮▮ &nbsp; ▰</span></div><div class="rs-mobile-header"><span class="rs-safety-logo">${icon('shield')}</span><div>Safe City<small>${which==='citizen'?'CITIZEN APPLICATION':'POLICE APPLICATION'}</small></div>${avatar(which==='citizen'?'AV':'PS')}</div>${body}<div class="rs-mobile-tabs">${[['home',which==='citizen'?'Home':'Alerts'],['file','Complaints'],['user','Profile']].map(([sym,label])=>`<span class="${label===active?'active':''}">${icon(sym)}${label}</span>`).join('')}</div><div class="rs-home-indicator"></div></div></div>`;}
  function safety(t){
    const sos=t>=5,received=t>=8,form=t>=15,submitted=t>=23;
    const phase=submitted?'complaint-registered':form?'register-complaint':received?'police-live-tracking':sos?'sos-sent':'citizen-safety';
    let citizenBody;
    if(!form)citizenBody=`<div class="rs-mobile-greeting"><span>Hello, Aditi ${badge('Online','green')}</span><h3>Travel with confidence.</h3></div><div class="rs-map-wrap">${cityMap(sos)}<span class="rs-location-pill"><i class="rs-online"></i>${sos?'Live location sharing':'Location enabled'}</span></div><div class="rs-mobile-bottom-card"><div class="rs-emergency-heading"><b>${sos?'Help is connected.':'We’re here for you.'}</b><span>${sos?'Your location is shared with police.':'Reach the police team with one tap.'}</span></div><div class="rs-sos ${sos?'sent':''}">${icon(sos?'check':'phone')}<span>${sos?'SOS alert sent':'SOS · Get help'}<small>${sos?'Sharing your live location':'Send an emergency alert'}</small></span>${icon('arrow')}</div><div class="rs-safety-shortcuts"><span>${icon('shield')}Women’s safety</span><span>${icon('people')}Senior citizens</span></div></div>`;
    else if(!submitted)citizenBody=`<div class="rs-mobile-form"><span class="rs-overline">CITIZEN SERVICES</span><h3>Register a complaint</h3><p>Share the details with your police team.</p>${field('Complaint category','Safety concern '+icon('down'))}<label class="rs-mobile-label">What happened?</label><div class="rs-complaint-text"><span data-rs-complaint></span><i class="rs-text-caret"></i></div><div class="rs-location-attachment">${icon('pin')}<span>Current location attached<small>City centre · Location shared</small></span>${icon('check')}</div><div class="rs-mobile-submit">${btn('<span data-rs-submit>Submit complaint '+icon('arrow')+'</span>','primary full')}</div></div>`;
    else citizenBody=`<div class="rs-mobile-confirmation"><span class="rs-success-icon">${icon('check')}</span>${badge('SUBMITTED','green')}<h3>Your voice matters.</h3><p>Your complaint has been registered<br>with the police team.</p><div class="rs-complaint-receipt"><small>COMPLAINT REFERENCE</small><b>SC-1042</b><span>Safety concern</span><div>${icon('check')}Registered <i></i> ${icon('clock')}In review</div></div>${btn('View complaint '+icon('arrow'),'primary full')}</div>`;
    const policeBody=`<div class="rs-mobile-greeting"><span>Officer workspace ${badge('On duty','green')}</span><h3>Safety operations</h3></div><div class="rs-police-stats"><span><b>${received?'01':'00'}</b>Active SOS</span><span><b>${submitted?'04':'03'}</b>Complaints</span><span><b>Live</b>Tracking</span></div><div class="rs-police-alert ${received?'received':''}"><span>${icon(received?'phone':'shield')}</span><div><b>${received?'SOS · Citizen needs assistance':'Monitoring citizen safety'}</b><small>${received?'Aditi V. · Live location available':'New alerts will appear here'}</small></div>${received?badge('LIVE','red'):''}</div><div class="rs-police-map">${cityMap(received)}${received?'<div class="rs-tracking-label"><i class="rs-online"></i> Live location · Updating</div>':''}</div><div class="rs-police-report"><div><b>${submitted?'New complaint received':'Recent complaint'}</b>${badge(submitted?'New':'Open',submitted?'blue':'')}</div><strong>${submitted?'SC-1042 · Safety concern':'SC-1041 · Citizen report'}</strong><p>${submitted?'Street lighting near bus stop':'View details and update the complaint'}</p><span>${icon('file')}Open complaint ${icon('arrow')}</span></div>`;
    const html=`<div class="rs-safety-scene"><div class="rs-safety-heading"><span>${icon('shield')}Ahmadabad Safe City</span>${badge('ANDROID & iOS')}</div><div class="rs-device-label citizen-label">FOR CITIZENS <span>Safety, within reach.</span></div><div class="rs-device-label police-label">FOR POLICE <span>Connected to every alert.</span></div>${phone('citizen',citizenBody,form?'Complaints':'Home')}${phone('police',policeBody,'Alerts')}<div class="rs-safety-footer"><i class="rs-online"></i> SOS · Live tracking · Complaint registration</div></div>`;
    return {html,phase,key:phase,touches:[
      {at:5,target:'.citizen .rs-sos',name:'tap-sos'},
      {at:15,target:'.citizen .rs-mobile-tabs > span:nth-child(2)',name:'tap-complaints'},
      {at:16,target:'.citizen .rs-complaint-text',name:'tap-details'},
      {at:22,target:'.citizen .rs-mobile-submit > .rs-btn',name:'tap-submit'}
    ]};
  }
  const serviceIcon=name=>name==='Microsoft 365'?'<span class="rs-ms-logo"><i></i><i></i><i></i><i></i></span>':name==='Google Workspace'?'<span class="rs-google-logo">G</span>':`<span class="rs-service-logo">${icon('globe')}</span>`;
  const accounts=[['Northstar IT','Microsoft 365','northstar.example'],['Acme Workspace','Google Workspace','acme.example'],['Partner workspace','Other services','partner.example']];
  function policies(t){
    const selected=t>=4,review=t>=7,applying=t>=12&&t<18,done=t>=18;
    const phase=done?'tenants-configured':applying?'applying-policies':review?'review-policies':selected?'tenants-selected':'select-tenants';
    const configured=Math.min(3,Math.max(0,Math.floor((t-12)/2)));
    let main=`<div class="rs-page-title"><div><span class="rs-overline">ORGANIZATION / SECURITY</span><h2>${review?'Configure security policies':'Connected tenants'}</h2><p>One security configuration. All your tenant accounts.</p></div>${badge(icon('lock')+'IT admin','')}</div><div class="rs-policy-steps">${['Select tenants','Review policies','Apply configuration'].map((s,i)=>`<span class="${(review?applying||done?2:1:0)===i?'active':''}"><i>${i+1}</i>${s}</span>`).join('')}</div>`;
    if(!review)main+=`<div class="rs-tenant-toolbar"><div>${icon('search')}Search tenant accounts…</div>${btn('All services '+icon('down'),'small')}</div><div class="rs-tenant-table"><div class="rs-tenant-table-head">${checkbox(selected)}<span>TENANT ACCOUNT</span><span>SERVICE</span><span>CONNECTION</span></div>${accounts.map(([name,service,domain])=>`<div class="rs-tenant-row ${selected?'selected':''}">${checkbox(selected)}<div>${serviceIcon(service)}<span><b>${name}</b><small>${domain}</small></span></div><span>${service}</span>${badge('<i class="rs-online"></i> Connected','green')}</div>`).join('')}</div><div class="rs-tenant-selection"><span>${selected?icon('check')+'3 tenant accounts selected':'Select the tenants you want to configure.'}</span>${btn('Review policies '+icon('arrow'),'primary')}</div><div class="rs-policy-info">${icon('shield')}<span><b>Your tenant accounts. One consistent setup.</b><small>Apply the selected policies directly to the connected services.</small></span></div>`;
    else main+=`<div class="rs-selected-accounts"><span class="rs-overline">APPLYING TO 3 TENANT ACCOUNTS</span><div>${accounts.map(([name,service])=>`<span>${serviceIcon(service)}${name}</span>`).join('')}</div></div><div class="rs-policy-config-title"><div><h3>Security baseline</h3><p>Review the policies applied to each connected service.</p></div>${badge('3 policies','')}</div><div class="rs-policy-toggles">${[['lock','Sign-in security','Configure sign-in policies for connected accounts'],['shield','Account protection','Apply your chosen account security settings'],['people','External access','Keep access policies consistent across tenants']].map(([sym,title,copy])=>`<div>${icon(sym)}<span><b>${title}</b><small>${copy}</small></span><i class="rs-toggle"></i></div>`).join('')}</div>${applying||done?`<div class="rs-config-results ${done?'done':''}"><div><b>${done?'Configuration complete':'Applying security configuration…'}</b>${badge(`${configured} / 3 configured`,done?'green':'')}</div>${accounts.map(([name,service],i)=>`<span>${serviceIcon(service)}<b>${name}</b><small>${i<configured?icon('check')+'Configured':i===configured?'<i class="rs-spinner"></i> Applying…':'Queued'}</small></span>`).join('')}</div>`:`<div class="rs-apply-description">${icon('link')}Policies will be configured automatically in the selected accounts.</div>`}<div class="rs-policy-action">${btn('Back')}${btn(done?icon('check')+'All tenants configured':applying?'<i class="rs-spinner"></i> Applying configuration…':icon('shield')+'Configure selected tenants','primary')}</div>`;
    const html=`<div class="rs-app policy">${browserBar('Security Policy Configure · Admin console')}${appTop('Policy Configure',`${badge('<i class="rs-online"></i> 3 services connected','green')}${icon('bell')}${avatar('IT')}`)}<div class="rs-shell"><aside class="rs-sidebar"><div class="rs-workspace">${avatar('IT','square')}<span>Admin workspace<small>Organization owner</small></span>${icon('down')}</div><div class="rs-sidebar-label">ADMINISTRATION</div>${menu([['grid','Overview'],['globe','Tenants'],['shield','Security policies'],['activity','Activity'],['settings','Settings']],review?'Security policies':'Tenants')}<div class="rs-sidebar-footer">${icon('lock')}<span>IT administrator<small>Connected tenant accounts</small></span></div></aside><main class="rs-main ${applying||done?'show-results':''}">${main}</main></div></div>`;
    return {html,phase,key:phase+(applying?configured:''),points:[[0,747,327],[3.7,240,297,'.rs-tenant-table-head .rs-checkbox'],[4.1,240,297,'.rs-tenant-table-head .rs-checkbox'],[6.8,812,564,'.rs-tenant-selection .rs-btn'],[7.1,812,564,'.rs-tenant-selection .rs-btn'],[10,775,393,'.rs-policy-toggles'],[11.8,774,648,'.rs-policy-action .primary'],[12.1,774,648,'.rs-policy-action .primary'],[16,774,566,'.rs-config-results'],[23,770,604,'.rs-config-results.done'],[30,770,604,'.rs-config-results.done']],clicks:[4,7,12]};
  }
  const flows={firelink:clinic,chronos:commerce,'ahmadabad-safe-city':safety,'security-policy-configure':policies};
  const cycles={firelink:30,chronos:30,'ahmadabad-safe-city':30,'security-policy-configure':28};
  const ease=n=>{n=Math.max(0,Math.min(1,n));return n*n*(3-2*n);};
  window.PortfolioRealisticScenes={
    supports:kind=>supported.has(kind),
    mount(kind,root){
      root.innerHTML=`<link rel="stylesheet" href="assets/realistic-project-scenes.css"><div class="rs-stage ${kind}" aria-hidden="true"><div class="rs-board"><div class="rs-ui"></div>${kind==='ahmadabad-safe-city'?touchGesture:cursor}</div></div>`;
      const board=root.querySelector('.rs-board'),ui=root.querySelector('.rs-ui'),pointer=root.querySelector('.rs-cursor'),touch=root.querySelector('.rs-touch');
      let lastKey='';
      const liveMarkup=new WeakMap(),targets=new Map();
      return {
        resize(w,h){const s=Math.min(w/960,h/720);board.style.transform=`scale(${s})`;board.style.left=`${(w-960*s)/2}px`;board.style.top=`${(h-720*s)/2}px`;},
        draw(time){
          const t=time%cycles[kind],state=flows[kind](t);
          if(lastKey!==state.key){ui.innerHTML=state.html;lastKey=state.key;}
          // Preserve panels while typing and selecting, so their entrance animation runs once.
          const setText=(selector,value)=>{const el=ui.querySelector(selector);if(el&&el.textContent!==value)el.textContent=value;};
          const setHTML=(selector,value)=>{const el=ui.querySelector(selector);if(el&&liveMarkup.get(el)!==value){el.innerHTML=value;liveMarkup.set(el,value);}};
          if(kind==='firelink'){
            setText('[data-rs-patient]',typed('Alex Morgan',t,8,11));
            ui.querySelector('.rs-slot-target')?.classList.toggle('selected',t>=13);
            const caret=ui.querySelector('.rs-input .rs-text-caret');if(caret)caret.style.visibility=t<11?'visible':'hidden';
            const focused=ui.querySelector('.rs-input.focused');if(focused&&t>=13)focused.classList.remove('focused');
            setHTML('[data-rs-confirm]',t>=17?'<i class="rs-spinner"></i> Confirming…':'Confirm appointment');
          }
          if(kind==='ahmadabad-safe-city'){
            setText('[data-rs-complaint]',typed('Street lighting is not working near the bus stop. Please look into this safety concern.',t,16,21));
            setHTML('[data-rs-submit]',t>=22?'<i class="rs-spinner"></i> Submitting…':'Submit complaint '+icon('arrow'));
          }
          const fade=Math.max(0,Math.min(1,t/.3,(cycles[kind]-t)/.55));
          ui.style.opacity=String(fade);
          if(touch){
            const gesture=state.touches.find(g=>t>=g.at-.18&&t<g.at+.8);
            const control=gesture&&ui.querySelector(gesture.target);
            touch.hidden=!control;
            if(control){
              const bounds=control.getBoundingClientRect(),frame=board.getBoundingClientRect(),scale=frame.width/960;
              const age=t-gesture.at,progress=Math.max(0,age/.8);
              touch.dataset.gesture=gesture.name;
              touch.style.left=`${(bounds.x+bounds.width/2-frame.x)/scale}px`;
              touch.style.top=`${(bounds.y+bounds.height/2-frame.y)/scale}px`;
              touch.style.opacity=String(fade);
              const ring=touch.querySelector('.rs-touch-ring'),pad=touch.querySelector('.rs-touch-pad');
              ring.style.transform=`scale(${.65+progress*1.7})`;
              ring.style.opacity=age<0?'0':String(.8*(1-progress));
              pad.style.opacity=String(age<0?(age+.18)/.18:Math.max(0,1-age/.5));
              pad.style.transform=`scale(${age<0?1:.78+.22*ease(age/.18)})`;
            }
          }
          if(!pointer)return state.phase;
          pointer.style.opacity=String(fade);
          let a=state.points[0],b=a;
          for(let i=1;i<state.points.length;i++){b=state.points[i];if(t<=b[0])break;a=b;}
          const k=a===b?1:ease((t-a[0])/(b[0]-a[0]));
          // Anchor clicks to the actual controls, including their current scale and layout.
          const boardRect=board.getBoundingClientRect?.(),scale=boardRect?.width/960;
          const position=p=>{
            if(!p[3]||!scale)return [p[1],p[2]];
            const rect=ui.querySelector(p[3])?.getBoundingClientRect();
            if(rect?.width&&rect?.height)targets.set(p[3],[(rect.x+rect.width/2-boardRect.x)/scale,(rect.y+rect.height/2-boardRect.y)/scale]);
            return targets.get(p[3])||[p[1],p[2]];
          };
          const from=position(a),to=position(b);
          pointer.style.transform=`translate(${from[0]+(to[0]-from[0])*k}px,${from[1]+(to[1]-from[1])*k}px)`;
          pointer.classList.toggle('click',state.clicks.some(at=>t>=at&&t<at+.35));
          return state.phase;
        }
      };
    }
  };
})();
