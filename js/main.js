/* Nexxus Consultancy — Main JS */
(function(){
  var SUPABASE_FN='https://cnhlcgxnzmlgatxxaeai.supabase.co/functions/v1/submit-enquiry';

  window.addEventListener('load',function(){setTimeout(function(){document.getElementById('preloader').classList.add('hide');},2200);});
  var nb=document.getElementById('navbar'),bt=document.getElementById('backTop');
  window.addEventListener('scroll',function(){
    var sy=window.scrollY;
    nb.classList.toggle('scrolled',sy>60);
    bt.classList.toggle('vis',sy>400);
    document.querySelectorAll('section[id]').forEach(function(s){
      var lk=document.querySelector('.nav-link[href="#'+s.id+'"]');
      if(lk)lk.classList.toggle('active',sy>=s.offsetTop-120&&sy<s.offsetTop+s.offsetHeight-120);
    });
  });
  var hb=document.getElementById('hamburger'),nl=document.getElementById('navLinks');
  hb.addEventListener('click',function(){var o=nl.classList.toggle('open');hb.classList.toggle('open',o);hb.setAttribute('aria-expanded',o);});
  nl.querySelectorAll('.nav-link').forEach(function(l){l.addEventListener('click',function(){nl.classList.remove('open');hb.classList.remove('open');hb.setAttribute('aria-expanded','false');});});
  document.addEventListener('click',function(e){if(nl.classList.contains('open')&&!nl.contains(e.target)&&!hb.contains(e.target)){nl.classList.remove('open');hb.classList.remove('open');hb.setAttribute('aria-expanded','false');}});
  var ro=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('revealed');ro.unobserve(e.target);}});},{threshold:0.08});
  document.querySelectorAll('.reveal').forEach(function(el){ro.observe(el);});
  var so=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){var d=parseInt(e.target.getAttribute('data-delay'))||0;setTimeout(function(){e.target.classList.add('visible');},d);so.unobserve(e.target);}});},{threshold:0.06});
  document.querySelectorAll('.svc-card').forEach(function(c){so.observe(c);});
  function counter(el,target,sfx){var s=0,inc=Math.max(1,Math.floor(target/60)),t=setInterval(function(){s=Math.min(s+inc,target);el.textContent=s+sfx;if(s>=target)clearInterval(t);},1800/Math.ceil(target/inc));}
  var co=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.querySelectorAll('.n').forEach(function(n){var t=parseInt(n.textContent),sfx=n.textContent.includes('%')?'%':'+';counter(n,t,sfx);});co.unobserve(e.target);}});},{threshold:0.5});
  var sr=document.querySelector('.stats-row');if(sr)co.observe(sr);

  var form=document.getElementById('cForm');
  if(form){form.addEventListener('submit',function(e){
    e.preventDefault();
    var fn=document.getElementById('fn').value.trim();
    var em=document.getElementById('fe').value.trim();
    var msg=document.getElementById('fm').value.trim();
    if(!fn||!em||!msg){alert('Please fill in all required fields.');return;}
    var ln=document.getElementById('ln').value.trim();
    var ph=document.getElementById('fp').value.trim();
    var sv=document.getElementById('fs').value;
    var btn=form.querySelector('button[type="submit"]');
    var origText=btn.innerHTML;
    btn.innerHTML='Submitting...';btn.disabled=true;

    fetch(SUPABASE_FN,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        first_name:fn,last_name:ln,email:em,phone:ph,
        service:sv,message:msg,source_page:window.location.pathname
      })
    }).then(function(r){return r.json();})
    .then(function(data){
      if(data.success){
        form.reset();
        var ok=document.getElementById('fok');
        ok.classList.add('show');
        setTimeout(function(){ok.classList.remove('show');},6000);
      } else {
        alert('Something went wrong. Please try WhatsApp instead.');
      }
    }).catch(function(){
      alert('Connection error. Please try WhatsApp instead.');
    }).finally(function(){
      btn.innerHTML=origText;btn.disabled=false;
    });
  });}

  document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'});}});});
})();
