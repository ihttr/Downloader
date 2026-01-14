async function download(){
const url=document.getElementById('url').value;
const status=document.getElementById('status');
const video=document.getElementById('video');
const audio=document.getElementById('audio');
status.innerText='⏳ جاري التحميل...';
video.hidden=true;audio.hidden=true;
const r=await fetch(`/api/download?url=${encodeURIComponent(url)}`);
const d=await r.json();
if(!d.success){status.innerText='❌ الرابط غير مدعوم';return;}
status.innerText='✅ جاهز';
if(d.video){video.src=d.video;video.hidden=false}
if(d.audio){audio.href=d.audio;audio.hidden=false}
}