!function(){var t,e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");function d(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}a.disabled=!0,e.addEventListener("click",(function(){e.disabled=!0,t=setInterval(d,1e3),a.disabled=!1})),a.addEventListener("click",(function(){e.disabled=!1,clearInterval(t),a.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.7bbfd1ed.js.map