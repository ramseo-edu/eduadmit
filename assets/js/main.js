
document.addEventListener('DOMContentLoaded', async ()=>{
  const cfg = window.__SITE_CONFIG__ || {};
  const nav = document.getElementById('nav-links');
  if(nav && cfg.categories){
    cfg.categories.forEach(c=>{ const a=document.createElement('a'); a.href='/categories/'+c.toLowerCase().replace(/ /g,'-')+'.html'; a.textContent=c; nav.appendChild(a); });
  }
  let posts = [];
  try{ const r = await fetch('/posts/posts.json'); if(r.ok) posts = await r.json(); }catch(e){ console.warn(e); }
  const featured = document.getElementById('featured');
  const latest = document.getElementById('latest-grid');
  if(featured) posts.slice(0,4).forEach(p=>{
    const el = document.createElement('a'); el.className='card'; el.href=p.url; el.innerHTML = '<h3>'+p.title+'</h3><div class="meta">'+p.category+' • '+p.date+'</div><p>'+p.excerpt+'</p>';
    featured.appendChild(el);
  });
  if(latest) posts.slice(0,9).forEach(p=>{
    const el = document.createElement('a'); el.className='article-card'; el.href=p.url; el.innerHTML = '<h4>'+p.title+'</h4><div class="meta">'+p.category+' • '+p.date+' • '+p.readTime+'</div><p>'+p.excerpt+'</p>';
    latest.appendChild(el);
  });
});
