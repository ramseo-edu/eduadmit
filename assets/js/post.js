
function renderMarkdown(md){
  if(!md) return '<p>No content</p>';
  const lines = md.split('\n');
  let out='';
  for(let l of lines){
    if(/^#\s+/.test(l)){ out += '<h1>'+l.replace(/^#\s+/,'')+'</h1>'; continue; }
    if(/^##\s+/.test(l)){ out += '<h2>'+l.replace(/^##\s+/,'')+'</h2>'; continue; }
    if(/^###\s+/.test(l)){ out += '<h3>'+l.replace(/^###\s+/,'')+'</h3>'; continue; }
    if(/^\*\s+/.test(l)){ out += '<li>'+l.replace(/^\*\s+/,'')+'</li>'; continue; }
    if(l.trim()==='') out += '<p></p>'; else out += '<p>'+l+'</p>';
  }
  return out;
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const params = new URLSearchParams(location.search);
  const slug = params.get('post');
  if(!slug){ document.getElementById('post-content').innerHTML = '<p>No post specified.</p>'; return; }
  try{
    const r = await fetch('/posts/'+slug+'.md');
    if(!r.ok){ document.getElementById('post-content').innerHTML = '<p>Post not found.</p>'; return; }
    const md = await r.text();
    document.getElementById('post-content').innerHTML = renderMarkdown(md);
    document.title = slug + ' – EduAdmit';
  }catch(e){ document.getElementById('post-content').innerHTML = '<p>Could not load post.</p>'; }
});
