const miModulo=(()=>{"use strict";let e=[];const t=["C","H","D","S"],r=["J","Q","K","A"];let a=[];const o=document.querySelector("#PC"),l=document.querySelector("#D"),n=document.querySelector("#NJ"),s=document.querySelectorAll(".divCartas"),c=document.querySelectorAll("small"),d=(t=2)=>{e=i(),a=[];for(let e=0;t>e;e++)a.push(0);c.forEach(e=>e.innerText=0),s.forEach(e=>e.innerHTML=""),o.disabled=!1,l.disabled=!1},i=()=>{e=[];for(let r=2;r<=10;r++)for(let a of t)e.push(r+a);for(let a of t)for(let t of r)e.push(t+a);return _.shuffle(e)},u=()=>{if(0===e.length)throw"No hay cartas en el mazo";return e.pop()},m=(e,t)=>(a[t]=a[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),c[t].innerText=a[t],a[t]),f=(e,t)=>{const r=document.createElement("img");r.src=`assets/cartas/${e}.png`,r.classList.add("cartas"),s[t].append(r)},h=e=>{let t=0;do{const e=u();t=m(e,a.length-1),f(e,a.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=a;setTimeout(()=>{t===e?alert("Empate"):e>21?alert("Computadora gana"):t>21?alert("Jugador Gana"):alert("Computadora Gana")},100)})()};return o.addEventListener("click",()=>{const e=u(),t=m(e,0);f(e,0),t>21?(console.warn("Perdiste"),o.disabled=!0,l.disabled=!0,h(t)):21===t&&(console.warn("21-Genial!"),o.disabled=!0,l.disabled=!0,h(t))}),l.addEventListener("click",()=>{o.disabled=!0,l.disabled=!0,h(a[0])}),n.addEventListener("click",()=>{console.clear(),d()}),{nuevoJuego:d}})();