webpackJsonp([2],{149:function(r,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var A=n(0),t=n.n(A),o=n(8),i=n(9),s=n(50),a=n(161),d=n.n(a),c=n(163),m=n(20),l=n(19),B=t.a.memo(function(r){var e=Object(o.c)(),n=function(){e(l.f())},i=Object(o.d)(function(r){return r.orderReducer.orders}),s=Object(o.d)(function(r){return r.orderReducer.loading});Object(A.useEffect)(function(){n()},[]);var a=t.a.createElement(m.a,null);return s||(a=i.map(function(r){return t.a.createElement(c.a,{ingredients:r.ingredients,key:r.id,price:r.price})})),t.a.createElement("div",{className:d.a.Orders},t.a.createElement("h1",null,"Your previous orders:"),a)});e.default=Object(s.a)(B,i.a)},161:function(r,e,n){var A=n(162);"string"===typeof A&&(A=[[r.i,A,""]]);var t={hmr:!1};t.transform=void 0;n(146)(A,t);A.locals&&(r.exports=A.locals)},162:function(r,e,n){e=r.exports=n(145)(!0),e.push([r.i,".Orders__Orders__1JwPt{background-color:var(--color-theme-light);border:3px solid var(--color-theme-dark);-webkit-box-shadow:0 1rem 2rem #000;box-shadow:0 1rem 2rem #000;width:60%;margin:2rem auto;padding:2rem;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}.Orders__Orders__1JwPt h1{text-align:center;font-size:2.25rem;text-transform:capitalize;background-color:#dad735;border:2px solid #000;-webkit-box-shadow:2px 2px 2px #000;box-shadow:2px 2px 2px #000;display:inline-block;padding:1rem;margin-bottom:2rem}@media(max-width:700px){.Orders__Orders__1JwPt{width:95%}}","",{version:3,sources:["C:/Users/Nischal Nikit/Desktop/Projects/Burger-Builder/src/components/Burger/Orders/Orders.css"],names:[],mappings:"AAAA,uBACI,0CAA2C,AAE3C,yCAA0C,AAC1C,oCAA2C,AACnC,4BAAmC,AAE3C,UAAW,AACX,iBAAkB,AAClB,aAAc,AAEd,oBAAqB,AAErB,aAAc,AACd,0BAA2B,AACvB,sBAAuB,AAC3B,sBAAuB,AACnB,mBAAoB,AACxB,sBAAuB,AACnB,6BAA+B,CACtC,AAED,0BACI,kBAAmB,AACnB,kBAAmB,AAEnB,0BAA2B,AAC3B,yBAA0B,AAC1B,sBAAwB,AACxB,oCAAsC,AAC9B,4BAA8B,AACtC,qBAAsB,AAEtB,aAAc,AACd,kBAAoB,CACvB,AAGD,wBACI,uBACE,SAAU,CACX,CACJ",file:"Orders.css",sourcesContent:[".Orders{\r\n    background-color: var(--color-theme-light);\r\n\r\n    border: 3px solid var(--color-theme-dark);\r\n    -webkit-box-shadow: 0 1rem 2rem rgb(0,0,0);\r\n            box-shadow: 0 1rem 2rem rgb(0,0,0);\r\n\r\n    width: 60%;\r\n    margin: 2rem auto;\r\n    padding: 2rem;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    -ms-flex-pack: justify;\r\n        justify-content: space-between;\r\n}\r\n\r\n.Orders h1{\r\n    text-align: center;\r\n    font-size: 2.25rem;\r\n\r\n    text-transform: capitalize;\r\n    background-color: #DAD735;\r\n    border: 2px solid black;\r\n    -webkit-box-shadow: 2px 2px 2px black;\r\n            box-shadow: 2px 2px 2px black;\r\n    display: inline-block;\r\n\r\n    padding: 1rem;\r\n    margin-bottom: 2rem;\r\n}\r\n\r\n\r\n@media(max-width: 700px){\r\n    .Orders{\r\n      width:95%;\r\n    }\r\n}"],sourceRoot:""}]),e.locals={Orders:"Orders__Orders__1JwPt"}},163:function(r,e,n){"use strict";var A=n(0),t=n.n(A),o=n(164),i=n.n(o),s=t.a.memo(function(r){var e=[];for(var n in r.ingredients)e.push({ingredient:n,ingredientAmount:r.ingredients[n]});var A=e.map(function(r){return t.a.createElement("span",{key:r.ingredient},r.ingredient," \u2192 ",r.ingredientAmount)});return t.a.createElement("div",{className:i.a.Order},t.a.createElement("div",null,A),t.a.createElement("p",null,"Price = $",r.price))});e.a=s},164:function(r,e,n){var A=n(165);"string"===typeof A&&(A=[[r.i,A,""]]);var t={hmr:!1};t.transform=void 0;n(146)(A,t);A.locals&&(r.exports=A.locals)},165:function(r,e,n){e=r.exports=n(145)(!0),e.push([r.i,".Order__Order__2Zjmr{background-color:#fff;border:3px solid #000;-webkit-box-shadow:2px 2px 2px #000;box-shadow:2px 2px 2px #000;margin-bottom:1rem;font-size:2.5rem;padding:1rem;width:75%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center}@media(max-width:700px){.Order__Order__2Zjmr{width:95%}}.Order__Order__2Zjmr div{margin-bottom:1rem}.Order__Order__2Zjmr p,.Order__Order__2Zjmr span{font-size:2rem;font-weight:400;margin-right:1rem}","",{version:3,sources:["C:/Users/Nischal Nikit/Desktop/Projects/Burger-Builder/src/components/Burger/Orders/Order/Order.css"],names:[],mappings:"AAAA,qBACI,sBAAwB,AACxB,sBAAwB,AACxB,oCAAsC,AAC9B,4BAA8B,AAEtC,mBAAoB,AAEpB,iBAAkB,AAClB,aAAc,AAEd,UAAW,AAEX,oBAAqB,AAErB,aAAc,AACd,0BAA2B,AACvB,sBAAuB,AAC3B,sBAAuB,AACnB,kBAAoB,CAC3B,AAED,wBACI,qBACE,SAAU,CACX,CACJ,AAED,yBACI,kBAAoB,CACvB,AAED,iDAEI,eAAgB,AAChB,gBAAiB,AACjB,iBAAmB,CACtB",file:"Order.css",sourcesContent:[".Order{\r\n    background-color: white;\r\n    border: 3px solid black;\r\n    -webkit-box-shadow: 2px 2px 2px black;\r\n            box-shadow: 2px 2px 2px black;\r\n\r\n    margin-bottom: 1rem;\r\n\r\n    font-size: 2.5rem;\r\n    padding: 1rem;\r\n\r\n    width: 75%;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n}\r\n\r\n@media(max-width: 700px){\r\n    .Order{\r\n      width:95%;\r\n    }\r\n}\r\n\r\n.Order div{\r\n    margin-bottom: 1rem;\r\n}\r\n\r\n.Order p,\r\n.Order span{\r\n    font-size: 2rem;\r\n    font-weight: 400;\r\n    margin-right: 1rem;\r\n}\r\n"],sourceRoot:""}]),e.locals={Order:"Order__Order__2Zjmr"}}});
//# sourceMappingURL=2.d393a28b.chunk.js.map