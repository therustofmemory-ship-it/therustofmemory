// TRM premium dark mode
(function(){
  try{
    if(localStorage.getItem('trm-theme')==='dark'){document.body.classList.add('dark-mode')}
  }catch(e){}
})();

const menuBtn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav-links');if(menuBtn){menuBtn.addEventListener('click',()=>nav.classList.toggle('open'))}const glow=document.querySelector('.cursor-glow');document.addEventListener('mousemove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('active')}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));const progress=document.querySelector('.scroll-progress');const topBtn=document.querySelector('.back-top');window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;const sc=(window.scrollY/h)*100;if(progress)progress.style.width=sc+'%';if(topBtn)topBtn.classList.toggle('show',window.scrollY>450)});if(topBtn){topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))}window.addEventListener('load',()=>document.body.classList.add('loaded'));

// Premium digital counters
const counters=document.querySelectorAll('.counter');
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
  })
},{threshold:.35});
counters.forEach(counter=>counterObserver.observe(counter));

// Subtle magnetic button movement
const magneticButtons=document.querySelectorAll('.magnetic');
magneticButtons.forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const rect=btn.getBoundingClientRect();
    const x=e.clientX-rect.left-rect.width/2;
    const y=e.clientY-rect.top-rect.height/2;
    btn.style.transform=`translate(${x*.08}px,${y*.08}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0)'});
});


// Dark mode toggle button with saved preference
(function(){
  const header=document.querySelector('.site-header');
  if(!header || document.querySelector('.theme-toggle')) return;
  const btn=document.createElement('button');
  btn.className='theme-toggle';
  btn.type='button';
  btn.setAttribute('aria-label','Toggle dark mode');
  const setIcon=()=>{btn.textContent=document.body.classList.contains('dark-mode')?'☀️':'🌙'};
  setIcon();
  const menu=document.querySelector('.menu-btn');
  header.insertBefore(btn, menu || null);
  btn.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
    try{localStorage.setItem('trm-theme',document.body.classList.contains('dark-mode')?'dark':'light')}catch(e){}
    setIcon();
  });
})();
