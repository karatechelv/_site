// ===========================
// KARATECH SCRIPT V1
// ===========================

// Navbar Shadow

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

if(window.scrollY > 80){

header.style.background="rgba(11,15,25,.95)";
header.style.boxShadow="0 15px 40px rgba(0,0,0,.35)";

}else{

header.style.background="rgba(11,15,25,.75)";
header.style.boxShadow="none";

}

});

// Fade Animation

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".card,.timeline div,.library-card,blockquote").forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});

// Hero Animation

window.onload=()=>{

const hero=document.querySelector(".hero-content");

hero.style.opacity="0";
hero.style.transform="translateY(40px)";

setTimeout(()=>{

hero.style.transition="1.2s";
hero.style.opacity="1";
hero.style.transform="translateY(0)";

},300);

};

// Button Effect

document.querySelectorAll(".primary,.secondary").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-5px)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0)";

});

});

// Scroll Down

const scroll=document.querySelector(".scroll");

scroll.addEventListener("click",()=>{

window.scroll({

top:window.innerHeight,

behavior:"smooth"

});

});
