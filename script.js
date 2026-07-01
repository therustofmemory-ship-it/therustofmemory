// TRM optimized interactions
(function(){
  const body=document.body;
  try{
    if(localStorage.getItem('trm-theme')==='dark') body.classList.add('dark-mode');
  }catch(e){}

  const menuBtn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.nav-links');
  if(menuBtn && nav){
    const closeMenu=()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')};
    menuBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const open=nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
    document.addEventListener('click',(e)=>{if(!nav.contains(e.target) && !menuBtn.contains(e.target)) closeMenu()});
    window.addEventListener('resize',()=>{if(window.innerWidth>900) closeMenu()});
  }

  const glow=document.querySelector('.cursor-glow');
  const canHover=window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(glow && canHover){
    let x=0,y=0,ticking=false;
    document.addEventListener('mousemove',e=>{
      x=e.clientX;y=e.clientY;
      if(!ticking){
        requestAnimationFrame(()=>{glow.style.left=x+'px';glow.style.top=y+'px';ticking=false});
        ticking=true;
      }
    },{passive:true});
  }else if(glow){glow.remove()}

  const revealEls=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('active')}});
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(el=>observer.observe(el));
  }else{revealEls.forEach(el=>el.classList.add('active'))}

  const progress=document.querySelector('.scroll-progress');
  const topBtn=document.querySelector('.back-top');
  let scrollTick=false;
  const onScroll=()=>{
    if(scrollTick) return;
    scrollTick=true;
    requestAnimationFrame(()=>{
      const h=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      const sc=(window.scrollY/h)*100;
      if(progress) progress.style.width=sc+'%';
      if(topBtn) topBtn.classList.toggle('show',window.scrollY>450);
      scrollTick=false;
    });
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
  if(topBtn){topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))}

  const counters=document.querySelectorAll('.counter');
  if(counters.length && 'IntersectionObserver' in window){
    const counterObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el=entry.target;
          if(el.dataset.done) return;
          el.dataset.done='true';
          const target=Number(el.dataset.target||0);
          let current=0;
          const step=Math.max(1,Math.ceil(target/42));
          const timer=setInterval(()=>{
            current+=step;
            if(current>=target){current=target;clearInterval(timer)}
            el.textContent=current;
          },28);
        }
      });
    },{threshold:.35});
    counters.forEach(counter=>counterObserver.observe(counter));
  }else{counters.forEach(c=>c.textContent=c.dataset.target||c.textContent)}

  const magneticButtons=document.querySelectorAll('.magnetic');
  if(canHover){
    magneticButtons.forEach(btn=>{
      btn.addEventListener('mousemove',e=>{
        const rect=btn.getBoundingClientRect();
        const x=e.clientX-rect.left-rect.width/2;
        const y=e.clientY-rect.top-rect.height/2;
        btn.style.transform=`translate(${x*.08}px,${y*.08}px)`;
      });
      btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0)'});
    });
  }

  const header=document.querySelector('.site-header');
  if(header && !document.querySelector('.theme-toggle')){
    const btn=document.createElement('button');
    btn.className='theme-toggle';
    btn.type='button';
    btn.setAttribute('aria-label','Toggle dark mode');
    const setIcon=()=>{btn.textContent=body.classList.contains('dark-mode')?'☀️':'🌙'};
    setIcon();
    const menu=document.querySelector('.menu-btn');
    header.insertBefore(btn, menu || null);
    btn.addEventListener('click',()=>{
      body.classList.toggle('dark-mode');
      try{localStorage.setItem('trm-theme',body.classList.contains('dark-mode')?'dark':'light')}catch(e){}
      setIcon();
    });
  }

  window.addEventListener('load',()=>body.classList.add('loaded'));
  setTimeout(()=>body.classList.add('loaded'),1200);
})();
