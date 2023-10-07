(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2522],{8515:function(e,t,n){Promise.resolve().then(n.bind(n,8612))},8612:function(e,t,n){"use strict";n.r(t);var l=n(7437),a=n(2265),i=n(4033),s=n(4127),c=n(6004),r=n(1396),o=n.n(r),d=n(6820),u=n.n(d);let m={office_name:"",address:"",phone:"",latitude:8.1,longitude:8.1,id_city:1,id_office:0,id_company:0,id_terminal:null,created_at:"",updated_at:"",deleted_at:null,city:{city_name:""}};t.default=e=>{let{params:t}=e,n=t.id,r=(0,a.useId)(),d=(0,i.useRouter)(),[{loading:x,data:f}]=(0,c.b)("/office/detail/".concat(n),{useCache:!1}),[{loading:p},h]=(0,c.b)({method:"PUT",url:"/office/".concat(n)},{manual:!0}),[b,v]=(0,a.useState)((null==f?void 0:f.office)||m),j=async e=>{e.preventDefault();try{var t,n;await h({data:{id_company:1,office_name:null==b?void 0:b.office_name,address:null==b?void 0:b.address,phone:null==b?void 0:b.phone,latitude:null!==(t=null==b?void 0:b.latitude)&&void 0!==t?t:8.1000001,longitude:null!==(n=null==b?void 0:b.longitude)&&void 0!==n?n:8.200001,id_city:1}}),u().fire("Oficina editada correctamente","","success").then(()=>{d.push("/office")})}catch(e){console.error("Update failed",e)}};return(0,a.useEffect)(()=>{let e=(0,s.q)(n);if(!e){d.replace("/office");return}},[d,n]),(0,a.useEffect)(()=>{if(!x){if(!(null==f?void 0:f.office)){d.replace("/office");return}v(f.office)}},[f,x,d]),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("div",{className:"flex flex-row justify-between",children:(0,l.jsx)("div",{className:"",children:(0,l.jsxs)("h2",{className:"text-xl text-primary",children:["Editar ",(0,l.jsx)("span",{className:"font-bold",children:null==b?void 0:b.office_name})]})})}),(0,l.jsxs)("form",{onSubmit:j,children:[(0,l.jsx)("div",{className:"flex mt-8 gap-4",children:(0,l.jsx)("div",{className:"flex flex-1",children:(0,l.jsxs)("div",{className:"bg-white shadow rounded-[25px] border-[0.5px] border-borderPane flex flex-1 px-6 py-8 ",children:[(0,l.jsxs)("div",{className:"flex flex-grow flex-col",children:[(0,l.jsx)("h3",{className:"font-medium text-sm text-textMuted uppercase",children:"Detalles"}),(0,l.jsxs)("div",{className:"mt-6",children:[(0,l.jsxs)("div",{className:"mb-4",children:[(0,l.jsx)("label",{htmlFor:"".concat(r,"-office-name-input"),className:"block mb-1 font-medium text-sm text-textMuted",children:"Nombre de la oficina"}),(0,l.jsx)("input",{type:"text",id:"".concat(r,"-office-name-input"),className:"input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black",placeholder:"Agencia de encomiendas",value:null==b?void 0:b.office_name,onChange:e=>{let{target:{value:t}}=e;v({...b,office_name:t})},required:!0})]}),(0,l.jsxs)("div",{className:"mb-4",children:[(0,l.jsx)("label",{htmlFor:"".concat(r,"-phone-number-input"),className:"block mb-1 font-medium text-sm text-textMuted",children:"Celular"}),(0,l.jsx)("input",{type:"text",id:"".concat(r,"-phone-number-input"),className:"input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black",placeholder:"+51",value:null==b?void 0:b.phone,onChange:e=>{let{target:{value:t}}=e;v({...b,phone:t})},required:!0})]}),(0,l.jsxs)("div",{className:"mb-4",children:[(0,l.jsx)("label",{htmlFor:"".concat(r,"-address-input"),className:"block mb-1 font-medium text-sm text-textMuted",children:"Direcci\xf3n"}),(0,l.jsx)("input",{type:"text",id:"".concat(r,"-address-input"),className:"input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black",placeholder:"Av. Manuel Echeandia",value:null==b?void 0:b.address,onChange:e=>{let{target:{value:t}}=e;v({...b,address:t})},required:!0})]})]})]}),(0,l.jsx)("div",{className:"divider divider-horizontal"}),(0,l.jsxs)("div",{className:"flex flex-grow flex-col",children:[(0,l.jsx)("h3",{className:"font-medium text-sm text-textMuted uppercase",children:"Localizaci\xf3n"}),(0,l.jsxs)("div",{className:"mt-6",children:[(0,l.jsxs)("div",{className:"mb-4",children:[(0,l.jsx)("label",{htmlFor:"".concat(r,"-departament-input"),className:"block mb-1 font-medium text-sm text-textMuted",children:"Departamento"}),(0,l.jsx)("select",{id:"".concat(r,"-departament-input"),className:"select w-full bg-bgCommonInput rounded-xl",children:(0,l.jsx)("option",{value:"LIMA",children:"Lima"})})]}),(0,l.jsxs)("div",{className:"mb-4",children:[(0,l.jsx)("label",{htmlFor:"".concat(r,"-provincia-input"),className:"block mb-1 font-medium text-sm text-textMuted",children:"Provincia"}),(0,l.jsx)("select",{id:"".concat(r,"-provincia-input"),className:"select w-full bg-bgCommonInput rounded-xl",children:(0,l.jsx)("option",{value:"LIMA",children:"Lima"})})]}),(0,l.jsxs)("div",{className:"mb-4",children:[(0,l.jsx)("label",{htmlFor:"".concat(r,"-distrito-input"),className:"block mb-1 font-medium text-sm text-textMuted",children:"Distrito"}),(0,l.jsx)("select",{id:"".concat(r,"-distrito-input"),className:"select w-full bg-bgCommonInput rounded-xl",children:(0,l.jsx)("option",{value:"LaVictoria",children:"La Victoria"})})]})]})]})]})})}),(0,l.jsx)("div",{className:"divider"}),(0,l.jsxs)("div",{className:"flex justify-between",children:[(0,l.jsx)("div",{}),(0,l.jsxs)("div",{className:"flex gap-4",children:[(0,l.jsx)(o(),{className:"btn rounded-[14px] border border-textStepsChecked bg-transparent text-primary hover:bg-primary hover:text-white",href:"/office",children:"Cancelar"}),(0,l.jsx)("button",{type:"submit",className:"btn rounded-[14px] bg-primary text-white hover:bg-secondary",disabled:p,children:p?(0,l.jsx)("span",{className:"loading loading-spinner"}):"Actualizar"})]})]})]})]})}},5215:function(e,t,n){"use strict";n.d(t,{OT:function(){return a},T5:function(){return l},lC:function(){return i}});let l="http://3.14.43.44:4567",a=1,i="production"},6004:function(e,t,n){"use strict";n.d(t,{b:function(){return o}});var l=n(5262),a=n(9222),i=n(5215),s=n(1490);let c=s.Z.get("token"),r=a.Z.create({baseURL:i.T5,headers:{Authorization:"Bearer ".concat(c)}}),o=(0,l.gd)({axios:r})},4127:function(e,t,n){"use strict";n.d(t,{q:function(){return a}});var l=n(4578);let a=e=>{let t=l.z.number().positive();try{return t.parse(Number(e)),!0}catch(e){return console.log("false",e),!1}}},622:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l=n(2265),a=Symbol.for("react.element"),i=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,c=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,r={key:!0,ref:!0,__self:!0,__source:!0};function o(e,t,n){var l,i={},o=null,d=null;for(l in void 0!==n&&(o=""+n),void 0!==t.key&&(o=""+t.key),void 0!==t.ref&&(d=t.ref),t)s.call(t,l)&&!r.hasOwnProperty(l)&&(i[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===i[l]&&(i[l]=t[l]);return{$$typeof:a,type:e,key:o,ref:d,props:i,_owner:c.current}}t.Fragment=i,t.jsx=o,t.jsxs=o},7437:function(e,t,n){"use strict";e.exports=n(622)},1396:function(e,t,n){e.exports=n(6685)}},function(e){e.O(0,[6685,1729,6820,383,2971,596,1744],function(){return e(e.s=8515)}),_N_E=e.O()}]);