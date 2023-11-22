(()=>{"use strict";const e=function(){let e;return{setCity:function(t){e=async function(e){return async function(e){try{const t="29f7bb886J64ei9j00b44Z69413Tajb99DbX7h1y4v311E2Y0N273C2U0g141f".split("").filter(((e,t)=>t%2==0)).join(""),n=await fetch(`https://api.weatherapi.com/v1/current.json?key=${t}&q=${e}`,{mode:"cors"}),i=await n.json();if(void 0!==i.error)throw new Error(i.error.message);return i}catch(e){return console.error(e),e}}(e)}(t)},getData:function(t,n){return e.then((e=>({city:e.location.name,country:e.location.country,localTime:e.location.localtime.split(" ")[1],currTemp:"C"===t?e.current.temp_c:e.current.temp_f,perceivedTemp:"C"===t?e.current.feelslike_c:e.current.feelslike_f,windSpeed:"kph"===n?e.current.wind_kph:e.current.wind_mph,windDir:e.current.wind_dir})))}}}();!function(){const t=function(){const e=document.querySelector("form"),t=e.querySelector("input#city-name"),n=document.querySelector("div.info"),i=n.querySelector(".location"),r=n.querySelector(".curr-temperature > h2"),c=n.querySelector("span.feels-like-temp"),o=n.querySelector("span.wind"),u=n.querySelector("span.local-time"),s=document.querySelector("div.units");function p(){return"dist-unit-km"===s.querySelector("input[name='dist-unit']:checked").id?"km/h":"mi/h"}return{form:e,search:t,location:i,currTemp:r,percTemp:c,wind:o,localTime:u,tempUnitsC:s.querySelector("input#temp-unit-ce"),tempUnitsF:s.querySelector("input#temp-unit-fa"),distUnitsK:s.querySelector("input#dist-unit-km"),distUnitsM:s.querySelector("input#dist-unit-mi"),getTempUnitDisp:function(){return"temp-unit-ce"===s.querySelector("input[name='temp-unit']:checked").id?"C":"F"},getDistUnitDisp:p,getDistUnit:function(){return"km/h"===p()?"kph":"mph"}}}();function n(n){e.setCity(n),e.getData(t.getTempUnitDisp(),t.getDistUnit()).then((e=>{t.location.textContent=`${e.city}, ${e.country}`,t.currTemp.textContent=`${e.currTemp}°${t.getTempUnitDisp()}`,t.percTemp.textContent=`${e.perceivedTemp}°${t.getTempUnitDisp()}`,t.wind.textContent=`${e.windSpeed} ${t.getDistUnitDisp()}`,t.localTime.textContent=e.localTime}))}t.form.addEventListener("submit",(e=>{e.preventDefault(),n(t.search.value)})),[t.distUnitsK,t.distUnitsM,t.tempUnitsC,t.tempUnitsF].forEach((e=>{e.addEventListener("click",(()=>{n(t.search.value)}))})),n(t.search.value)}()})();