let o=[],f=!1;function E(t){const s=new Date(t);if(Number.isNaN(s.getTime()))return"";const n=s.getUTCFullYear(),r=String(s.getUTCMonth()+1).padStart(2,"0"),a=String(s.getUTCDate()).padStart(2,"0");return`${n}-${r}-${a}`}function u(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function T(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function h(t,s){const n=u(t);if(!s)return n;const r=new RegExp(T(u(s)),"ig");return n.replace(r,a=>`<mark class="search-highlight">${a}</mark>`)}async function g(){if(f)return o;const t=await fetch("/articles.json");if(!t.ok)throw new Error(`Search index request failed: ${t.status}`);const s=await t.json();return o=Array.isArray(s?.articles)?s.articles:[],f=!0,o}function M(t,s){const n=t.title.toLowerCase(),r=(t.description||"").toLowerCase(),a=(t.content||"").toLowerCase(),c=(t.tags||[]).join(" ").toLowerCase();let e=0;return n.includes(s)&&(e+=n.startsWith(s)?6:4),c.includes(s)&&(e+=3),r.includes(s)&&(e+=2),a.includes(s)&&(e+=1),e}function w(t,s){const n=t.title||"",r=t.description||"",a=t.content||"",c=s.trim().toLowerCase();if(!c||n.toLowerCase().includes(c))return r||n;if(r.toLowerCase().includes(c))return r;const i=a.toLowerCase().indexOf(c);if(i===-1)return r||n;const d=Math.max(0,i-42),p=Math.min(a.length,i+c.length+56),v=d>0?"...":"",L=p<a.length?"...":"";return`${v}${a.slice(d,p).trim()}${L}`}function m(t,s){const n=document.getElementById("searchResults"),r=document.getElementById("searchMeta");if(!(n instanceof HTMLElement)||!(r instanceof HTMLElement))return;const a=t.trim().toLowerCase();if(!a){r.innerHTML="Press <kbd>/</kbd> to open, <kbd>Esc</kbd> to close",n.innerHTML=`
			<div class="search-empty">
				<div class="search-empty-title">Start searching</div>
				<div class="search-empty-text">Matching posts will appear here in real time.</div>
			</div>
		`;return}const c=s.map(e=>({article:e,score:M(e,a)})).filter(e=>e.score>0).sort((e,i)=>i.score-e.score||Date.parse(i.article.published)-Date.parse(e.article.published)).slice(0,12).map(e=>e.article);if(r.textContent=c.length>0?`Found ${c.length} matching post${c.length===1?"":"s"}`:"No matching results",c.length===0){n.innerHTML=`
			<div class="search-empty">
				<div class="search-empty-title">No results found</div>
				<div class="search-empty-text">Try a different keyword, like a post title, tag, or technical term.</div>
			</div>
		`;return}n.innerHTML=c.map(e=>`
		<a class="search-result-link" href="${u(e.url)}">
			<div class="search-result-row">
				<div class="search-result-date">${u(E(e.published))}</div>
				<div class="search-result-body">
					<div class="search-result-title">${h(e.title,a)}</div>
					<div class="search-result-desc">${h(w(e,a),a)}</div>
					${e.tags?.length?`<div class="search-tags">${e.tags.slice(0,4).map(i=>`<span class="pill-tag px-2 py-0.5 text-xs">${h(i,a)}</span>`).join("")}</div>`:""}
				</div>
			</div>
		</a>
	`).join("")}function l(t){const s=document.getElementById("searchOverlay"),n=document.getElementById("searchInput");!(s instanceof HTMLElement)||!(n instanceof HTMLInputElement)||(s.classList.toggle("hidden",!t),s.setAttribute("aria-hidden",t?"false":"true"),document.body.classList.toggle("search-open",t),t?requestAnimationFrame(()=>n.focus()):(n.value="",o&&m("",o)))}function y(){const t=document.getElementById("searchToggle"),s=document.getElementById("searchClose"),n=document.getElementById("searchOverlay"),r=document.getElementById("searchInput"),a=document.getElementById("searchResults");if(!(t instanceof HTMLButtonElement)||!(s instanceof HTMLButtonElement)||!(n instanceof HTMLElement)||!(r instanceof HTMLInputElement)||!(a instanceof HTMLElement)||t.dataset.bound==="true")return;t.dataset.bound="true";const c=async()=>{l(!0);try{const e=await g();m(r.value,e)}catch(e){console.error("Failed to load search index:",e),a.innerHTML=`
				<div class="search-empty">
					<div class="search-empty-title">Search unavailable</div>
					<div class="search-empty-text">Failed to load the post index. Please try again later.</div>
				</div>
			`}};t.addEventListener("click",c),s.addEventListener("click",()=>l(!1)),n.addEventListener("click",e=>{e.target?.hasAttribute("data-search-close")&&l(!1)}),r.addEventListener("input",async()=>{try{const e=await g();m(r.value,e)}catch(e){console.error("Failed to load search index:",e)}}),document.addEventListener("keydown",async e=>{const i=e.target,d=i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement||i?.isContentEditable;e.key==="/"&&!d&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.preventDefault(),await c()),e.key==="Escape"&&!n.classList.contains("hidden")&&l(!1)}),a.addEventListener("click",e=>{e.target?.closest(".search-result-link")&&l(!1)})}y();document.addEventListener("astro:page-load",y);
