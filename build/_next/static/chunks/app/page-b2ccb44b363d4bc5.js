(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{767:function(e,t,s){Promise.resolve().then(s.bind(s,5091))},5091:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return C}});var r,n,a,i,c=s(7437),l=s(2265),o=s(4033),u=s(8270),d=s(1865),m=s(8110),h=s(4578);let f=h.ZP.object({username:h.ZP.string(),password:h.ZP.string()}),p=()=>(0,d.cI)({resolver:(0,m.F)(f)});var b=s(1396),g=s.n(b),x=s(6820),v=s.n(x),y=s(1490);function A(){return(A=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e}).apply(this,arguments)}var j=function(e){return l.createElement("svg",A({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none"},e),l.createElement("mask",{id:"visibility_svg__a",width:24,height:24,x:0,y:0,maskUnits:"userSpaceOnUse",style:{maskType:"alpha"}},r||(r=l.createElement("path",{fill:"#D9D9D9",d:"M0 0h24v24H0z"}))),n||(n=l.createElement("g",{mask:"url(#visibility_svg__a)"},l.createElement("path",{fill:"#4185EF",d:"M12 16c1.25 0 2.313-.438 3.188-1.313.874-.874 1.312-1.937 1.312-3.187 0-1.25-.438-2.313-1.313-3.188C14.313 7.439 13.25 7 12 7c-1.25 0-2.313.438-3.188 1.313C7.939 9.187 7.5 10.25 7.5 11.5c0 1.25.438 2.313 1.313 3.188C9.687 15.562 10.75 16 12 16Zm0-1.8c-.75 0-1.387-.262-1.912-.787A2.604 2.604 0 0 1 9.3 11.5c0-.75.262-1.387.787-1.912A2.604 2.604 0 0 1 12 8.8c.75 0 1.387.262 1.912.787.525.526.788 1.163.788 1.913s-.262 1.387-.787 1.912A2.604 2.604 0 0 1 12 14.2Zm0 4.8c-2.433 0-4.65-.68-6.65-2.038-2-1.358-3.45-3.179-4.35-5.462.9-2.283 2.35-4.104 4.35-5.463C7.35 4.68 9.567 4 12 4c2.433 0 4.65.68 6.65 2.037 2 1.359 3.45 3.18 4.35 5.463-.9 2.283-2.35 4.104-4.35 5.462C16.65 18.322 14.433 19 12 19Z"}))))};function w(){return(w=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e}).apply(this,arguments)}var _=function(e){return l.createElement("svg",w({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none"},e),l.createElement("mask",{id:"visibility_off_svg__a",width:24,height:24,x:0,y:0,maskUnits:"userSpaceOnUse",style:{maskType:"alpha"}},a||(a=l.createElement("path",{fill:"#D9D9D9",d:"M0 0h24v24H0z"}))),i||(i=l.createElement("g",{mask:"url(#visibility_off_svg__a)"},l.createElement("path",{fill:"#4185EF",d:"m19.8 22.6-4.2-4.15c-.583.183-1.17.32-1.762.413-.592.091-1.205.137-1.838.137-2.517 0-4.758-.696-6.725-2.087C3.308 15.52 1.883 13.717 1 11.5c.35-.883.792-1.704 1.325-2.462A11.514 11.514 0 0 1 4.15 7L1.4 4.2l1.4-1.4 18.4 18.4-1.4 1.4ZM12 16a4.9 4.9 0 0 0 .512-.025c.159-.017.33-.05.513-.1l-5.4-5.4c-.05.183-.083.354-.1.513a4.91 4.91 0 0 0-.025.512c0 1.25.438 2.313 1.313 3.188C9.687 15.562 10.75 16 12 16Zm7.3.45-3.175-3.15c.117-.283.208-.57.275-.863.067-.291.1-.604.1-.937 0-1.25-.438-2.312-1.313-3.187C14.313 7.438 13.25 7 12 7a4.2 4.2 0 0 0-.938.1c-.291.067-.579.167-.862.3L7.65 4.85A11.081 11.081 0 0 1 12 4c2.517 0 4.758.696 6.725 2.088C20.692 7.479 22.117 9.283 23 11.5a11.692 11.692 0 0 1-1.512 2.738A11.01 11.01 0 0 1 19.3 16.45Zm-4.625-4.6-3-3a2.296 2.296 0 0 1 1.287.113c.392.158.73.387 1.013.687.283.3.488.646.613 1.037.125.392.154.78.087 1.163Z"}))))},k=s(6004),N=s(4977),O=s(5215);function C(){let e=(0,l.useId)(),{value:t,toggle:s}=(0,u.k)(!1),{handleSubmit:r,register:n,formState:a}=p(),[{loading:i},d]=(0,k.b)({method:"POST",url:"/auth/login"},{manual:!0}),m=(0,o.useRouter)(),h=r(async e=>{let{password:t,username:s}=e;try{let e=await d({data:{username:s,password:t}}),r=e.data.access_token,n=new Date;n.setTime(n.getTime()+36e5*Number(O.OT)),y.Z.set("token",r,{expires:n,httpOnly:"production"===O.lC,secure:"production"===O.lC,path:"/",sameSite:"strict"}),m.push("/checkout")}catch(e){console.error("Login failed:",e),v().fire({icon:"error",title:"Oops...",timer:2e3,text:"Credenciales incorrectas"})}});return(0,c.jsx)(N.g,{children:(0,c.jsxs)("form",{onSubmit:h,className:"mt-20",children:[(0,c.jsxs)("div",{className:"mb-4",children:[(0,c.jsx)("label",{htmlFor:"".concat(e,"-username"),className:"block mb-1 font-book text-sm ",children:"Usuario"}),(0,c.jsx)("input",{type:"text",id:"".concat(e,"-username"),className:"w-full py-3 px-5 rounded-br18 bg-bginput text-sm text-black",placeholder:"Ingresa tu nombre de usuario",required:!0,...n("username")})]}),(0,c.jsxs)("div",{className:"my-4",children:[(0,c.jsx)("label",{htmlFor:"".concat(e,"-password"),className:"block mb-1 font-book text-sm",children:"Contrase\xf1a"}),(0,c.jsxs)("div",{className:"relative",children:[(0,c.jsx)("input",{type:t?"text":"password",id:"".concat(e,"-password"),className:"w-full py-3 px-5 rounded-br18 bg-bginput text-sm text-black",placeholder:"Ingresa tu contrase\xf1a",required:!0,...n("password")}),(0,c.jsx)("div",{className:"absolute right-0 top-0",children:(0,c.jsx)("button",{type:"button",className:"inline-flex cursor-pointer items-center justify-center h-11 px-4",onClick:s,children:t?(0,c.jsx)(_,{className:"h-5"}):(0,c.jsx)(j,{className:"h-5"})})})]})]}),(0,c.jsx)("div",{className:"mb-12",children:(0,c.jsx)(g(),{href:"/forgot-password",className:"block font-bold text-sm",children:"\xbfOlvidaste tu contrase\xf1a?"})}),(0,c.jsx)("button",{className:"btn bg-primary hover:bg-tertiary text-white w-full font-bold py-2 px-4 rounded-br18 transition-colors text-base",type:"submit",disabled:i,children:i?(0,c.jsx)("span",{className:"loading loading-spinner"}):"Ingresar"})]})})}},5215:function(e,t,s){"use strict";s.d(t,{OT:function(){return n},T5:function(){return r},lC:function(){return a}});let r="http://3.14.43.44:4567",n=1,a="production"},8270:function(e,t,s){"use strict";s.d(t,{k:function(){return n}});var r=s(2265);let n=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],[t,s]=(0,r.useState)(e),n=(0,r.useCallback)(()=>s(!0),[]),a=(0,r.useCallback)(()=>s(!1),[]),i=(0,r.useCallback)(()=>s(e=>!e),[]);return{value:t,setValue:s,setTrue:n,setFalse:a,toggle:i}}},4977:function(e,t,s){"use strict";s.d(t,{g:function(){return c}});var r=s(7437),n=s(6691),a=s.n(n),i={src:"/_next/static/media/logotupasaje.c9759380.png",height:92,width:228,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAbklEQVR4nAFjAJz/AR1irUHjAQQoAI9Ol/jMATUHBk7cAdwbA8KyuzYjru/mAQBirIhW9/YohMeEERyR2gqHy53tg/zq+NPJeSQRvyl+AQBnsyvlmU3n+zYAPhF9AAZ3uZv+mCPLLNiumuwIwyLNY/ctxjdY+M8AAAAASUVORK5CYII=",blurWidth:8,blurHeight:3};let c=e=>{let{children:t}=e;return(0,r.jsxs)("div",{className:"flex flex-row items-center md:justify-end justify-center min-h-screen",children:[(0,r.jsx)("div",{className:"basis-0 sm:basis-4/6 login min-h-screen"}),(0,r.jsxs)("div",{className:"basis-1 sm:basis-2/6 p-8 m-8 ",children:[(0,r.jsx)("div",{className:"flex justify-center",children:(0,r.jsx)("div",{className:"w-72 md:w-52",children:(0,r.jsx)(a(),{src:i,width:2500,alt:"TuPasaje.pe"})})}),t]})]})}},6004:function(e,t,s){"use strict";s.d(t,{b:function(){return o}});var r=s(5262),n=s(9222),a=s(5215),i=s(1490);let c=i.Z.get("token"),l=n.Z.create({baseURL:a.T5,headers:{Authorization:"Bearer ".concat(c)}}),o=(0,r.gd)({axios:l})},622:function(e,t,s){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=s(2265),n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,c=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function o(e,t,s){var r,a={},o=null,u=null;for(r in void 0!==s&&(o=""+s),void 0!==t.key&&(o=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,r)&&!l.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:n,type:e,key:o,ref:u,props:a,_owner:c.current}}t.Fragment=a,t.jsx=o,t.jsxs=o},7437:function(e,t,s){"use strict";e.exports=s(622)},1396:function(e,t,s){e.exports=s(6685)}},function(e){e.O(0,[6685,1729,6820,383,8110,9240,2971,596,1744],function(){return e(e.s=767)}),_N_E=e.O()}]);