const STAGES=[
{n:"Pond preparation",img:["pond_bund_walk","Pond bund and water during the field visit."],t:"Getting the pond ready before stocking.",l:["Drain, dry and plough the pond bottom to remove black soil and pathogens.","Apply lime to correct soil pH and raise alkalinity.","Fill through fine-mesh filters and treat the water before stocking.","Fence the pond against crabs and birds, which carry disease."]},
{n:"Seed selection",t:"Healthy seed decides the whole crop.",l:["Buy post-larvae from registered hatcheries.","For shrimp, choose seed tested free of white spot virus and other listed diseases.","Check activity, gut fullness and uniform size, then acclimatise to pond salinity and temperature."]},
{n:"Stocking",t:"Number of animals per unit area.",l:["Stock in the cooler early morning or evening.","Keep density to what the pond and aeration can support.","Record stocking date, count and source of seed."]},
{n:"Feeding",img:["farmer_talk_rotated","A farmer explaining pond management."],t:"Feed is the largest running cost.",l:["Use quality pelleted feed in small, regular amounts.","Use feed trays to check how much is eaten and adjust the next ration.","Overfeeding spoils water and raises ammonia."]},
{n:"Water quality",img:["pond_aerators_1","Aerators running in a culture pond."],t:"Checked daily, often more than once.",l:["Measure pH, dissolved oxygen, temperature, salinity and ammonia.","Run aerators at night and in cloudy weather when oxygen falls.","Exchange water or use probiotics only as needed."]},
{n:"Health and biosecurity",img:["pond_aerators_3","Pond with aerators in operation."],t:"Prevention costs less than treatment.",l:["Watch for slow feeding, red body, white spots and surface swimming.","Keep tools, nets and visitors from spreading disease between ponds.","Report mass mortality early to fisheries officers."]},
{n:"Harvest",t:"Timing and handling set the price.",l:["Harvest at market size, usually after the price is checked with buyers.","Chill quickly and keep records for traceability.","Clean and dry the pond before the next crop."]}];
const PROBS=[
{c:"Disease",p:"Viral and bacterial diseases",s:"Shrimp stop feeding, show white spots or red body, and die in large numbers.",f:"Use tested seed, strict biosecurity, probiotics, and lower stocking; harvest early if an outbreak starts."},
{c:"Water",p:"Poor water quality",s:"Low oxygen at dawn, green or brown water, ammonia smell.",f:"Install enough aerators, feed to tray response, keep reservoir and treatment ponds."},
{c:"Cost",p:"High feed and power cost",s:"Margins shrink even when survival is good.",f:"Improve feed conversion with trays and records; consider shared power or solar for aerators."},
{c:"Market",p:"Price swings and buyer dependence",s:"Farm-gate price drops near harvest.",f:"Form farmer groups, sign advance buyer agreements, and track daily prices."},
{c:"Seed",p:"Poor seed quality",s:"Uneven growth and early mortality after stocking.",f:"Buy only from registered hatcheries and ask for disease test reports."},
{c:"Climate",p:"Cyclones, floods and heat",s:"Bund breaches, sudden salinity change, stress and loss.",f:"Strengthen bunds, keep emergency aeration, and take crop insurance where available."},
{c:"Regulation",p:"Residue and export rejection",s:"Consignments refused for banned antibiotics.",f:"Use only permitted inputs, keep treatment records, register the farm with the coastal aquaculture authority."},
{c:"Knowledge",p:"Limited training and record keeping",s:"Decisions are based on habit, not data.",f:"Attend training from fisheries department and universities; keep a simple pond log such as the one on this site."}];
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* Practices */
STAGES.forEach((s,i)=>{const b=document.createElement("button");b.textContent=s.n;b.setAttribute("role","tab");b.onclick=()=>showStage(i);$("#stages").append(b)});
function showStage(i){[...$("#stages").children].forEach((b,j)=>b.setAttribute("aria-selected",i===j));const s=STAGES[i];$("#stageBody").innerHTML=`<h3>${esc(s.n)}</h3><p>${esc(s.t)}</p><ul>${s.l.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>${s.img?`<figure class="photo"><img src="images/${s.img[0]}.jpg" alt="${esc(s.img[1])}"><figcaption>${esc(s.img[1])}</figcaption></figure>`:""}`}
showStage(0);

/* Problems */
const cats=["All",...new Set(PROBS.map(p=>p.c))];
function drawProblems(cat="All"){[...$("#filters").children].forEach(b=>b.setAttribute("aria-selected",b.textContent===cat));
$("#problemRows").innerHTML=PROBS.filter(p=>cat==="All"||p.c===cat).map(p=>`<tr><td><strong>${esc(p.p)}</strong></td><td>${esc(p.s)}</td><td>${esc(p.f)}</td></tr>`).join("")}
cats.forEach(c=>{const b=document.createElement("button");b.textContent=c;b.onclick=()=>drawProblems(c);$("#filters").append(b)});
drawProblems();

/* Records */
const KEY="dandigunta_pond_records";
const FIELDS=["date","pond","species","doc","ph","do","temp","sal","nh3","feed","mort","remarks"];
const HEAD=["Date","Pond ID","Species","Days of culture","pH","DO (mg/L)","Temp (C)","Salinity (ppt)","Ammonia (mg/L)","Feed (kg)","Mortality","Remarks"];
const RANGES={ph:[7.5,8.5],do:[4,99],temp:[26,32],sal:[10,35],nh3:[0,0.1]};
let recs=[];
function load(){try{recs=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){recs=[]}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(recs));return true}catch(e){say("Browser storage is blocked. Export your CSV before closing this page.");return false}}
function say(m){$("#status").textContent=m}
function bad(k,v){if(!RANGES[k]||v===""||v==null)return false;const n=+v;return n<RANGES[k][0]||n>RANGES[k][1]}
function draw(){
 $("#empty").style.display=recs.length?"none":"block";
 $("#recRows").innerHTML=recs.map((r,i)=>"<tr>"+FIELDS.map(k=>`<td class="${bad(k,r[k])?"bad":""}">${esc(r[k])}${bad(k,r[k])?" ⚠":""}</td>`).join("")+`<td><button class="del" data-i="${i}" aria-label="Delete record ${i+1}">Delete</button></td></tr>`).join("");
}
$("#recForm").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target),r={};FIELDS.forEach(k=>r[k]=(f.get(k)||"").toString().trim());
 recs.unshift(r);if(save()){say("Record saved.");e.target.reset();setToday()}draw()});
$("#recRows").addEventListener("click",e=>{const i=e.target.dataset.i;if(i===undefined)return;recs.splice(+i,1);save();draw();say("Record deleted.")});
$("#clearBtn").onclick=()=>{if(recs.length&&confirm("Delete all saved records?")){recs=[];save();draw();say("All records deleted.")}};
$("#sample").onclick=()=>{const f=$("#recForm").elements;Object.entries({pond:"P1",doc:"35",ph:"8.1",do:"5.2",temp:"29.5",sal:"18",nh3:"0.05",feed:"12.5",mort:"3",remarks:"Water light green, feed tray empty in 2 hours"}).forEach(([k,v])=>f[k].value=v)};
function csvCell(v){v=String(v??"");if(/^[=+\-@]/.test(v))v="'"+v;return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
$("#exportBtn").onclick=()=>{
 if(!recs.length){say("Nothing to export yet.");return}
 const rows=[HEAD,...recs.map(r=>FIELDS.map(k=>r[k]))].map(r=>r.map(csvCell).join(",")).join("\r\n");
 const blob=new Blob(["\ufeff"+rows],{type:"text/csv;charset=utf-8"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="dandigunta_pond_records.csv";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
 say("CSV exported.")};
function setToday(){$("#recForm").elements.date.value=new Date().toISOString().slice(0,10)}
load();setToday();draw();
