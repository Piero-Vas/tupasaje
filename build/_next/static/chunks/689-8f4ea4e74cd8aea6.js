(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[689],{14:function(e,t,r){"use strict";r.d(t,{_Y:function(){return n}});var n={search:{placeholder:"Buscar..."},sort:{sortAsc:"Ordenar la columna en orden ascendente",sortDesc:"Ordenar la columna en orden descendente"},pagination:{previous:"Anterior",next:"Siguiente",navigate:function(e,t){return"P\xe1gina "+e+" de "+t},page:function(e){return"P\xe1gina "+e},showing:"Mostrando registros del",of:"de un total de",to:"al",results:"registros"},loading:"Cargando...",noRecordsFound:"No se encontraron registros",error:"Se produjo un error al recuperar datos"}},1197:function(e,t,r){"use strict";var n=r(7437),a=r(8085),o=r(1490),i=r(14),s=r(2993),c=r(2168);t.Z=()=>{let e=o.Z.get("token"),t=(0,s.T)(),r=(0,s.C)(e=>e.ItinerarySelected.cityDestinationValue),l=(0,s.C)(e=>e.ItinerarySelected.cityOriginValue),d=(0,s.C)(e=>e.ItinerarySelected.dateSince),u=e=>{let r=parseInt(e.target.value);t((0,c.SK)(r))};return(0,n.jsx)(a.r,{columns:["","SALIDA","SERVICIO","PRECIO"],language:i._Y,server:{method:"GET",headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"},url:"".concat("http://3.14.43.44:4567","/itineraries/list?city_origin=").concat(l,"&city_destination=").concat(r,"&selected_date=").concat(d),then:e=>e.data.itineraries.map(e=>[(0,a._)((0,n.jsx)("div",{className:"flex justify-center",children:(0,n.jsx)("input",{value:e.id_itinerary,type:"radio",name:"radio-1",className:"radio checked:bg-primary",onChange:u})})),e.arrival_time,(0,a._)((0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"font-bold",children:["PISO 1 ",(0,n.jsx)("span",{className:"font-bold"})]}),""!=e.second_floor_price?(0,n.jsxs)("div",{className:"font-bold",children:["PISO 2 ",(0,n.jsx)("span",{className:"font-bold"})]}):(0,n.jsx)("div",{})]})),(0,a._)((0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{children:["Desde S/.",(0,n.jsx)("span",{className:"font-bold",children:e.first_floor_price})]}),""!=e.second_floor_price?(0,n.jsxs)("div",{children:["Desde S/.",(0,n.jsx)("span",{className:"font-bold",children:e.second_floor_price})]}):(0,n.jsx)("div",{})]}))]),handle:e=>{if(404===e.status)return{data:[]};if(e.ok)return e.json();throw Error("oh no :(")}},resizable:!0,style:{td:{"text-align":"center"}}})}},2168:function(e,t,r){"use strict";r.d(t,{SK:function(){return o}});var n=r(4302);let a=(0,n.createSlice)({name:"selectItinerarie",initialState:{value:0},reducers:{selectItinerarie:(e,t)=>{e.value=t.payload}}}),{selectItinerarie:o}=a.actions;t.ZP=a.reducer},2993:function(e,t,r){"use strict";r.d(t,{C:function(){return o},T:function(){return a}});var n=r(1023);let a=()=>(0,n.I0)(),o=n.v9},4033:function(e,t,r){e.exports=r(8165)},1172:function(e,t,r){"use strict";r.d(t,{w_:function(){return c}});var n=r(2265),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=n.createContext&&n.createContext(a),i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},s=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)0>t.indexOf(n[a])&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r};function c(e){return function(t){return n.createElement(l,i({attr:i({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return n.createElement(t.tag,i({key:r},t.attr),e(t.child))})}(e.child))}}function l(e){var t=function(t){var r,a=e.attr,o=e.size,c=e.title,l=s(e,["attr","size","title"]),d=o||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,l,{className:r,style:i(i({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),c&&n.createElement("title",null,c),e.children)};return void 0!==o?n.createElement(o.Consumer,null,function(e){return t(e)}):t(a)}}}]);