(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5970],{14:function(e,t,r){"use strict";r.d(t,{_Y:function(){return n}});var n={search:{placeholder:"Buscar..."},sort:{sortAsc:"Ordenar la columna en orden ascendente",sortDesc:"Ordenar la columna en orden descendente"},pagination:{previous:"Anterior",next:"Siguiente",navigate:function(e,t){return"P\xe1gina "+e+" de "+t},page:function(e){return"P\xe1gina "+e},showing:"Mostrando registros del",of:"de un total de",to:"al",results:"registros"},loading:"Cargando...",noRecordsFound:"No se encontraron registros",error:"Se produjo un error al recuperar datos"}},4352:function(e,t,r){Promise.resolve().then(r.bind(r,5950))},5950:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return j}});var n=r(7437),o=r(8085),s=r(1490),a=r(14),c=r(1812),i=r(7431),l=r(4033),u=r(6820),d=r.n(u),f=r(6004),x=()=>{let[,e]=(0,f.b)({method:"DELETE"},{manual:!0});(0,l.useRouter)();let t=s.Z.get("token"),r=async t=>{d().fire({icon:"info",title:"\xbfEsta seguro que quiere eliminar esta ciudad?",showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"Cancelar"}).then(async r=>{if(r.isConfirmed)try{await e({url:"/routes/".concat(t)}),d().fire("Borrado Correctamente","","success")}catch(e){console.error("Create failed:",e),d().fire({icon:"error",title:"Oops...",timer:2e3,text:"Ocurri\xf3 un error al eliminar la ruta"})}})};return(0,n.jsx)(o.r,{columns:["NOMBRE","ORIGEN","DESTINO","DISTANCIA","PARADAS","DURACI\xd3N ESTIMADA","ACCIONES"],language:a._Y,width:"auto",server:{method:"GET",headers:{Authorization:"Bearer ".concat(t),"Content-Type":"application/json"},url:"".concat("http://3.14.43.44:4567","/routes/list"),then:e=>e.data.routes.map(e=>{let{id_route:t,name_route:s,office_origin:a,office_destination:l,distance:u,estimated_duration:d,wait_time:f}=e;return["".concat(s),"".concat(a.office_name),"".concat(l.office_name),"".concat(u," KM"),f,"".concat(d),(0,o._)((0,n.jsxs)("div",{className:"flex justify-center",children:[(0,n.jsx)("button",{className:"h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary",onClick:()=>{},children:(0,n.jsx)(i._vs,{})}),(0,n.jsx)("button",{className:"h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bgred",onClick:async()=>{await r(t)},children:(0,n.jsx)(c.SW4,{})})]}))]}),handle:e=>404===e.status?{data:[]}:e.ok?e.json():void 0},search:{},sort:!0,footer:!1,style:{td:{"text-align":"center"}}})},m=r(1396),h=r.n(m),p=r(3159),j=()=>(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"flex flex-row justify-between",children:[(0,n.jsx)("div",{className:"p-4",children:(0,n.jsx)("h2",{className:"text-xl font-bold text-primary",children:"Administraci\xf3n de rutas"})}),(0,n.jsx)("div",{className:"p-4",children:(0,n.jsxs)(h(),{href:"/route/create",className:"btn flex flex-row items-center text-white font-bold text-sm bg-primary rounded-full px-4 py-2 hover:bg-secondary",children:[(0,n.jsx)(p.wEH,{className:"mr-2"})," Nueva Ruta"]})})]}),(0,n.jsx)("div",{className:"flex flex-row justify-between items-center mt-8",children:(0,n.jsx)("div",{className:"p-4",children:(0,n.jsxs)("div",{className:"flex items-center",children:["Mostrar",(0,n.jsxs)("select",{className:"select max-w-xs mx-4",children:[(0,n.jsx)("option",{children:"1"}),(0,n.jsx)("option",{children:"2"}),(0,n.jsx)("option",{children:"3"}),(0,n.jsx)("option",{children:"4"}),(0,n.jsx)("option",{children:"5"})]}),"entradas"]})})}),(0,n.jsx)("div",{className:"w-full mt-4",children:(0,n.jsx)(x,{})}),(0,n.jsxs)("div",{className:"flex mt-8 justify-between flex-row",children:[(0,n.jsx)("div",{}),(0,n.jsx)("div",{className:"form-control",children:(0,n.jsxs)("label",{className:"label cursor-pointer",children:[(0,n.jsx)("span",{className:"label-text",children:"Celdas adicionales"}),(0,n.jsx)("input",{type:"checkbox",className:"toggle ml-4"})]})})]})]})},5215:function(e,t,r){"use strict";r.d(t,{OT:function(){return o},T5:function(){return n},lC:function(){return s}});let n="http://3.14.43.44:4567",o=1,s="production"},6004:function(e,t,r){"use strict";r.d(t,{b:function(){return l}});var n=r(5262),o=r(9222),s=r(5215),a=r(1490);let c=a.Z.get("token"),i=o.Z.create({baseURL:s.T5,headers:{Authorization:"Bearer ".concat(c)}}),l=(0,n.gd)({axios:i})},622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2265),o=Symbol.for("react.element"),s=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,r){var n,s={},l=null,u=null;for(n in void 0!==r&&(l=""+r),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(u=t.ref),t)a.call(t,n)&&!i.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===s[n]&&(s[n]=t[n]);return{$$typeof:o,type:e,key:l,ref:u,props:s,_owner:c.current}}t.Fragment=s,t.jsx=l,t.jsxs=l},7437:function(e,t,r){"use strict";e.exports=r(622)},1396:function(e,t,r){e.exports=r(6685)},4033:function(e,t,r){e.exports=r(8165)},1172:function(e,t,r){"use strict";r.d(t,{w_:function(){return i}});var n=r(2265),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=n.createContext&&n.createContext(o),a=function(){return(a=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},c=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)0>t.indexOf(n[o])&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function i(e){return function(t){return n.createElement(l,a({attr:a({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return n.createElement(t.tag,a({key:r},t.attr),e(t.child))})}(e.child))}}function l(e){var t=function(t){var r,o=e.attr,s=e.size,i=e.title,l=c(e,["attr","size","title"]),u=s||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",a({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,l,{className:r,style:a(a({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),i&&n.createElement("title",null,i),e.children)};return void 0!==s?n.createElement(s.Consumer,null,function(e){return t(e)}):t(o)}}},function(e){e.O(0,[2420,6115,9982,6685,1729,8085,6820,2971,596,1744],function(){return e(e.s=4352)}),_N_E=e.O()}]);