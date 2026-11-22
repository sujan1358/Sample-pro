// Typewriter
const words=["modern web apps","full stack solutions","clean, responsive UIs","secure & smart tools"];
let w=0,c=0,del=false;const el=document.getElementById("type");
(function tick(){const t=words[w];el.textContent=t.slice(0,c);
 if(!del&&c++===t.length){del=true;return setTimeout(tick,1400)}
 if(del&&c--===0){del=false;w=(w+1)%words.length}
 setTimeout(tick,del?35:75)})();

// Scroll reveal
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add("show")),{threshold:.12});
document.querySelectorAll(".reveal").forEach(s=>io.observe(s));

// Tilt cards
document.querySelectorAll(".tilt").forEach(card=>{
 card.addEventListener("mousemove",e=>{const r=card.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`});
 card.addEventListener("mouseleave",()=>card.style.transform="");
});

// Cursor glow
const glow=document.getElementById("glow");
addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

// Interactive particle network
const cv=document.getElementById("bg"),ctx=cv.getContext("2d");
let W,H,pts=[],mouse={x:-999,y:-999};
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;
 pts=Array.from({length:Math.min(90,Math.floor(W*H/16000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
addEventListener("resize",size);size();
addEventListener("mousemove",e=>{mouse.x=e.clientX;mouse.y=e.clientY});
(function draw(){ctx.clearRect(0,0,W,H);
 for(const p of pts){p.x+=p.vx;p.y+=p.vy;
  if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
  const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.hypot(dx,dy);
  if(d<120){p.x+=dx/d*1.5;p.y+=dy/d*1.5}
  ctx.fillStyle="rgba(124,245,197,.7)";ctx.beginPath();ctx.arc(p.x,p.y,1.6,0,7);ctx.fill()}
 for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
  const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
  if(d<130){ctx.strokeStyle=`rgba(124,140,255,${.25*(1-d/130)})`;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke()}}
 requestAnimationFrame(draw)})();

document.getElementById("yr").textContent=new Date().getFullYear();
