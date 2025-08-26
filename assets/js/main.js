
document.addEventListener('DOMContentLoaded', async ()=>{
    const cfg = window.__SITE_CONFIG__ || {};
    const nav = document.getElementById('nav-links');
    if(nav){
        cfg.categories.forEach(c=>{
            const a=document.createElement('a');
            a.href='/categories/'+c.toLowerCase().replace(/ /g,'-')+'.html';
            a.textContent=c;
            a.className='nav-links-item';
            nav.appendChild(a);
        });
    }
    let posts=[];
    try{
        const r = await fetch('/posts/posts.json');
        if(r.ok) posts = await r.json();
    }catch(e){ console.warn('posts load failed',e); }

    const featured = document.getElementById('featured-grid');
    if(featured) posts.slice(0,6).forEach(p=>{
        const el = document.createElement('article');
        el.className='card';
        el.innerHTML=`<a href="${p.url}"><h3>${p.title}</h3></a><div class="post-meta">${p.category} • ${p.date}</div><p>${p.excerpt}</p>`;
        featured.appendChild(el);
    });

    const latest = document.getElementById('latest-list');
    if(latest) posts.slice(0,9).forEach(p=>{
        latest.innerHTML += `<div class="card" style="margin-bottom:12px"><a href="${p.url}"><h4>${p.title}</h4></a><div class="post-meta">${p.category} • ${p.date}</div></div>`;
    });

    // Add related posts if on post.html
    const postWrap = document.getElementById('post-wrap');
    if(postWrap){
        const params = new URLSearchParams(location.search);
        const slug = params.get('post');
        const post = posts.find(p=>p.slug===slug);
        if(post){
            const relatedDiv = document.getElementById('related-list');
            if(relatedDiv){
                posts.filter(p=>p.category===post.category && p.slug!==slug).slice(0,3).forEach(rp=>{
                    relatedDiv.innerHTML += `<div class="card"><a href="${rp.url}"><h4>${rp.title}</h4></a><div class="post-meta">${rp.date}</div></div>`;
                });
            }
        }
    }
});
