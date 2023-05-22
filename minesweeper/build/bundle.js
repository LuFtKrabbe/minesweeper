(()=>{"use strict";class e{constructor(e){this.elem=document.createElement("div"),this.elem.className="cell",this.elem.setAttribute("num",`${e}`)}}function t(t){document.querySelector(".field")&&document.querySelector(".field").remove();const c=document.createElement("div");c.className="field",document.body.append(c);for(let n=0;n<t;n+=1){const o=document.createElement("div");o.className="cell-row",c.append(o);for(let c=0;c<t;c+=1){const l=new e(n*t+c);o.append(l.elem)}}}function c(e){if(document.querySelector(".sound-block").matches(".mode-active")){const t=new Audio;"set-flag"===e&&(t.src="./assets/sounds/set-flag.mp3"),"set-question"===e&&(t.src="./assets/sounds/set-question.mp3"),"game-win"===e&&(t.src="./assets/sounds/game-win.mp3"),"game-defeat"===e&&(t.src="./assets/sounds/game-defeat.mp3"),"click-cell"===e&&(t.src="./assets/sounds/click-cell.mp3"),t.play()}}function n(e){const t=document.querySelector(".cell-row").childElementCount;e.matches(".flag")||e.matches(".question")||e.classList.add("opened"),"1"===e.innerText&&e.classList.add("cell-1"),"2"===e.innerText&&e.classList.add("cell-2"),"3"===e.innerText&&e.classList.add("cell-3"),"4"===e.innerText&&e.classList.add("cell-4"),"5"===e.innerText&&e.classList.add("cell-5"),"6"===e.innerText&&e.classList.add("cell-6"),"7"===e.innerText&&e.classList.add("cell-7"),"8"===e.innerText&&e.classList.add("cell-8"),"0"===e.innerText&&e.classList.add("empty"),"0"===e.innerText&&function(){const c=Math.floor(Number(e.attributes.num.value)/t),o=Number(e.attributes.num.value)%t;for(let e=-1;e<=1;e+=1)for(let l=-1;l<=1;l+=1)if(c+e>=0&&c+e<t&&o+l>=0&&o+l<t){const a=document.querySelector(`[num="${(c+e)*t+(o+l)}"]`);a.matches(".empty")||n(a)}}()}function o(e){const t=document.querySelector(".message"),c=document.querySelector(".step-value"),n=document.querySelector(".time-value");"start"===e&&(t.innerText="Find all mines!"),"game-win"===e&&(t.innerText=`Hooray! You found all mines in\n    ${n.innerText} second(s) and ${c.innerText} move(s)!`),"game-defeat"===e&&(t.innerText="Game over. Try again!"),"setup"===e&&(t.innerText="Choose the field size and set the mine quantity")}function l(){const e=document.querySelectorAll(".cell");let t=0;return e.forEach((e=>{"*"===e.textContent&&(t+=1)})),t}function a(){const e=function(){const e=document.querySelectorAll(".cell");let t=0;return e.forEach((e=>{e.matches(".flag")&&(t+=1)})),t}(),t=l();document.querySelector(".flag-value").innerText=`${e}`,t-e>=0?(document.querySelector(".mine-value").innerText=""+(t-e),document.querySelector(".mine-value").classList.remove("mode-active"),document.querySelector(".flag-value").classList.remove("mode-active")):(document.querySelector(".mine-value").innerText="0",document.querySelector(".mine-value").classList.add("mode-active"),document.querySelector(".flag-value").classList.add("mode-active"))}const s=JSON.parse(localStorage.getItem("records"))??[];function r(){const e=JSON.parse(localStorage.getItem("records"))??[];document.querySelectorAll(".record").forEach(((t,c)=>{e[c]?t.innerText=`${c+1}. TIME: ${e[c][0]} s, STEPS: ${e[c][1]}`:t.innerText=`${c+1}. --------------------------------------- `}))}let m=!1;function d(){const e=document.querySelector(".time-value");m=setInterval((()=>{e.innerText=Number(e.innerText)+1,999===Number(e.innerText)&&clearTimeout(m)}),1e3)}function u(){clearTimeout(m)}let i=Number(localStorage.getItem("field"))||10,g=Number(localStorage.getItem("mines"))||10,S=JSON.parse(localStorage.getItem("cells")),p=!0,v=!1;!function(e,t){const c=document.createElement("div");c.className="menu",document.body.append(c);const n=document.createElement("div");n.className="mode-block",c.append(n);const o=document.createElement("div");o.className="mode-easy",o.innerText="EASY\n(10X10)",n.append(o);const l=document.createElement("div");l.className="mode-medium",l.innerText="MEDIUM\n(15X15)",n.append(l);const a=document.createElement("div");a.className="mode-hard",a.innerText="HARD\n(25X25)",n.append(a);const s=document.createElement("div");s.className="mine-set-block",c.append(s);const r=document.createElement("div");r.className="mine-set-label",r.innerText=`MINES QUANTITY: ${e}`,s.append(r);const m=document.createElement("input");m.className="mine-set-input",m.type="range",m.min="10",m.max="99",m.value=`${e}`,s.append(m);const d=document.createElement("div");d.className="media-block",c.append(d);const u=document.createElement("div");u.className="sound-block",u.innerText="SOUND: OFF",d.append(u);const i=document.createElement("div");i.className="color-block",i.innerText="COLOR: LIGHT",d.append(i);const g=document.createElement("div");g.className="new-game-block",g.innerText="START NEW GAME",c.append(g);const S=document.createElement("div");S.className="records-block",c.append(S);const p=document.createElement("div");p.className="records-label",p.innerText="RECORDS",S.append(p);const v=document.createElement("div");v.className="records-value",S.append(v);for(let e=1;e<=10;e+=1){const e=document.createElement("div");e.className="record",v.append(e)}10===t&&document.querySelector(".mode-easy").classList.add("mode-active"),15===t&&document.querySelector(".mode-medium").classList.add("mode-active"),25===t&&document.querySelector(".mode-hard").classList.add("mode-active")}(g,i),function(){const e=document.createElement("div");e.className="info",document.body.append(e);const t=document.createElement("div");t.className="stats",e.append(t);const c=document.createElement("div");c.className="mine-block",t.append(c);const n=document.createElement("div");n.className="mine-label",n.innerText="MINES",c.append(n);const o=document.createElement("div");o.className="mine-value",o.innerText="0",c.append(o);const l=document.createElement("div");l.className="flag-block",t.append(l);const a=document.createElement("div");a.className="flag-label",a.innerText="FLAGS",l.append(a);const s=document.createElement("div");s.className="flag-value",s.innerText="0",l.append(s);const r=document.createElement("div");r.className="time-block",t.append(r);const m=document.createElement("div");m.className="time-label",m.innerText="TIME",r.append(m);const d=document.createElement("div");d.className="time-value",d.innerText="0",r.append(d);const u=document.createElement("div");u.className="step-block",t.append(u);const i=document.createElement("div");i.className="step-label",i.innerText="STEPS",u.append(i);const g=document.createElement("div");g.className="step-value",g.innerText="0",u.append(g);const S=document.createElement("div");S.className="message",S.innerText="Choose the field size and set the mine quantity",e.append(S)}(),t(i),r(),function(){const e=document.querySelector(".sound-block"),t=document.querySelector(".color-block"),c=document.querySelector(".style"),n=document.querySelector(".records-label"),o=document.querySelector(".records-block");if(S){const e=document.querySelectorAll(".cell"),t=document.querySelector(".time-value"),c=document.querySelector(".step-value"),n=document.querySelector(".message");e.forEach(((e,t)=>{e.className=S[t][0],e.textContent=S[t][1]})),c.innerText=localStorage.getItem("step")||0,t.innerText=localStorage.getItem("time")||0,n.innerText=localStorage.getItem("message"),v="true"===localStorage.getItem("mineBursted"),v||d(),a(),p=!1}e.className=localStorage.getItem("soundClass")||"sound-block",e.innerText=localStorage.getItem("soundText")||"SOUND: OFF",t.className=localStorage.getItem("colorClass")||"color-block",t.innerText=localStorage.getItem("colorText")||"COLOR: LIGHT",c.href=localStorage.getItem("colorStyle")||"./src/sass/style-light.css",n.className=localStorage.getItem("recordsLabel")||"records-label",o.className=localStorage.getItem("recordsBlock")||"records-block"}();const f=document.querySelector(".mode-block"),y=document.querySelector(".records-block"),T=document.querySelector(".new-game-block"),q=document.querySelector(".mine-set-input");function x(){localStorage.setItem("cells",JSON.stringify("")),u(),t(i),a(),o("setup"),document.querySelector(".mine-value").innerText=0,document.querySelector(".flag-value").innerText=0,document.querySelector(".time-value").innerText=0,document.querySelector(".step-value").innerText=0,p=!0,v=!1}function N(){const e=document.querySelectorAll(".cell");let t=0,c=0;return e.forEach((e=>{e.matches(".opened")&&(c+=1),t+=1})),t-c===l()&&!v}function E(){return v}f.addEventListener("click",(function(e){document.querySelector(".mode-easy").classList.remove("mode-active"),document.querySelector(".mode-medium").classList.remove("mode-active"),document.querySelector(".mode-hard").classList.remove("mode-active"),e.target.matches(".mode-easy")&&(i=10,e.target.classList.add("mode-active")),e.target.matches(".mode-medium")&&(i=15,e.target.classList.add("mode-active")),e.target.matches(".mode-hard")&&(i=25,e.target.classList.add("mode-active")),x()})),q.addEventListener("input",(function(e){g=Number(e.target.value),document.querySelector(".mine-set-label").innerText=`MINES QUANTITY: ${g}`})),T.addEventListener("click",x),y.addEventListener("click",(function(){const e=document.querySelector(".records-label"),t=document.querySelector(".records-block");e.classList.toggle("mode-active"),t.classList.toggle("records-mode-active")})),window.addEventListener("beforeunload",(function(){const e=document.querySelector(".sound-block"),t=document.querySelector(".color-block"),c=document.querySelector(".style"),n=document.querySelector(".records-label"),o=document.querySelector(".records-block");if(!p){const e=document.querySelectorAll(".cell"),t=document.querySelector(".time-value"),c=document.querySelector(".step-value"),n=document.querySelector(".message");S=[],e.forEach((e=>{S.push([e.className,e.textContent])})),localStorage.setItem("mineBursted",v),localStorage.setItem("step",c.innerText),localStorage.setItem("time",t.innerText),localStorage.setItem("message",n.innerText),localStorage.setItem("cells",JSON.stringify(S))}localStorage.setItem("field",i),localStorage.setItem("mines",g),localStorage.setItem("soundClass",e.className),localStorage.setItem("soundText",e.innerText),localStorage.setItem("colorClass",t.className),localStorage.setItem("colorText",t.innerText),localStorage.setItem("colorStyle",c.href),localStorage.setItem("recordsLabel",n.className),localStorage.setItem("recordsBlock",o.className)})),addEventListener("click",(e=>{e.preventDefault(),e.target.matches(".sound-block")&&function(){const e=document.querySelector(".sound-block");e.classList.toggle("mode-active"),e.matches(".mode-active")?e.innerText="SOUND: ON":e.innerText="SOUND: OFF"}(),e.target.matches(".color-block")&&function(){const e=document.querySelector(".color-block"),t=document.querySelector(".style");e.classList.toggle("mode-active"),e.matches(".mode-active")?(t.href="./src/sass/style-dark.css",e.innerText="COLOR: DARK"):(t.href="./src/sass/style-light.css",e.innerText="COLOR: LIGHT")}(),"*"===e.target.textContent&&(v=!0,document.querySelectorAll(".cell").forEach((e=>{"*"===e.innerText&&e.classList.add("mine")})),u(),o("game-defeat"),c("game-defeat")),N()||E()||"cell"===e.target.className&&(p&&(function(e){const t=document.querySelector(".mine-set-input").valueAsNumber,c=document.querySelector(".cell-row").childElementCount,n=[],o=[];!function(){for(;n.length!==t;){const t=Math.floor(Math.random()*c*c).toString();n.includes(t)||t===e||n.push(t)}}(),function(){for(let e=0;e<c;e+=1){const t=[];for(let o=0;o<c;o+=1){const l=(e*c+o).toString();n.includes(l)?t.push("*"):t.push(0)}o.push(t)}}(),function(){function e(e,t){for(let c=-1;c<=1;c+=1)for(let n=-1;n<=1;n+=1)if(e+c>=0&&e+c<o[0].length&&t+n>=0&&t+n<o.length){if("*"===o[e+c][t+n])continue;o[e+c][t+n]+=1}}for(let t=0;t<o.length;t+=1)for(let c=0;c<o[0].length;c+=1)"*"===o[t][c]&&e(t,c)}(),document.querySelectorAll(".cell").forEach(((e,t)=>{e.innerText=o.flat()[t]}))}(e.target.attributes.num.value),a(),d(),o("start"),p=!1),n(e.target),function(){const e=document.querySelector(".step-value");e.innerText=Number(e.innerText)+1,c("click-cell")}(),N()&&(document.querySelectorAll(".cell").forEach((e=>{"cell"===e.className&&e.classList.add("flag")})),function(){const e=document.querySelector(".step-value"),t=document.querySelector(".time-value");s.unshift([t.innerText,e.innerText]),11===s.length&&s.pop(),localStorage.setItem("records",JSON.stringify(s)),r()}(),u(),o("game-win"),c("game-win")))})),addEventListener("contextmenu",(e=>{var t;e.preventDefault(),N()||E()||["cell","cell flag","cell question"].includes(e.target.className)&&((t=e.target).matches(".flag")?(t.classList.toggle("flag"),t.classList.toggle("question"),c("set-question")):t.matches(".question")?t.classList.toggle("question"):(t.classList.toggle("flag"),c("set-flag")),a())})),document.addEventListener("mousedown",(e=>{"mine-set-input"!==e.target.className&&e.preventDefault()}))})();