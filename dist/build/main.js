(()=>{var e={1138:(e,t,n)=>{"use strict";var a=n(7294),r=n(3935),i=n(3727),c=n(4575),o=n.n(c),s=n(3913),u=n.n(s),l=n(2205),m=n.n(l),d=n(8585),_=n.n(d),p=n(9754),f=n.n(p),E=n(5977),v={SEARCH:{PLACEHOLDER_INPUT:"Nunca dejes de buscar"},PRODUCT_NOT_FOUND:{VARIANT:"info",MESSAGE:"El producto no fue encontrado, verifique el numero identificador ingresado."},LOADING:{VARIANT:"info",MESSAGE:"Cargando..."},ZERO_PRODUCTS_FOUND:{VARIANT:"info",MESSAGE:"No hemos encontrado ningun producto para tu busqueda."},MELI_API:{ID_PATH:"/api/items/",SEARCH_QUERY_PATH:"/api/items?search="},MELI_WEB:{SEARCH_QUERY_STRING:"search",ITEMS_PATH:"items"},APP_URL:{PATH:"http://localhost",PORT:"9000",LOGO:"e207e1130d27e8dfdd47b4177cb022e9",LOGO_FILE_TYPE:"png"}},h=n(3038),g=n.n(h),N=n(7625),R=n(1436),A=n(8),b=n.n(A),y=function(e,t,n){return"".concat(e).concat(t).concat(n)},P=function(e){if(!("amount"in e))return"$ 00";var t=e.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1.");return"$ ".concat(t)},S=function(e){if("object"===b()(e)&&(e=e.default),void 0===e){var t=v.APP_URL,n=t.PATH,a=t.PORT,r=t.LOGO,i=t.LOGO_FILE_TYPE;return"".concat(n,":").concat(a,"/").concat(r,".").concat(i)}return e},O=n(4705),D=function(e){var t=e.inputPlaceholder,n=void 0===t?v.SEARCH.PLACEHOLDER_INPUT:t,r=e.initialValue,i=void 0===r?"":r,c=e.actionValue,o=(e.logoPath,(0,a.useState)("")),s=g()(o,2),u=s[0],l=s[1];return(0,a.useEffect)((function(){l(i)}),[i,v,l]),a.createElement("div",{className:"ui-search"},a.createElement("form",{className:"ui-search__form",action:c||"items",method:"get"},a.createElement("img",{src:S(O),alt:"logo",className:"ui-search__form__logo"}),a.createElement("div",{className:"ui-search__form__input-container"},a.createElement("input",{className:"ui-search__form__input-container__input",name:v.MELI_WEB.SEARCH_QUERY_STRING,placeholder:n,onChange:function(e){e.preventDefault(),l(e.target.value)},value:u}),a.createElement("button",{type:"submit",className:"ui-search__form__input-container__submit"},a.createElement(N.G,{icon:R.wn1})))))},T=n(9669),L=n.n(T),I=function(e){var t=e.route;return a.createElement("div",{className:"ui-breadcrumbs-container"},t.map((function(e,n){return a.createElement("div",{key:n,className:"ui-breadcrumbs-container__breadcrumbs__item"},a.createElement("span",null,e.name),n<t.length-1&&a.createElement(N.G,{icon:R._tD,className:"ui-breadcrumbs-container__breadcrumbs__item__next-item"}))})))},C=function(e){var t,n,r,i=e.item;return a.createElement("div",{className:"ui-product-detail-info"},a.createElement("div",{className:"ui-product-detail-info__main"},a.createElement("div",{className:"ui-product-detail-info__main__image-container"},a.createElement("img",{className:"ui-product-detail-info__main__image-container__image",src:i.picture,alt:"Imagen del Producto"})),a.createElement("div",{className:"ui-product-detail-info__main__values"},a.createElement("p",{className:"ui-product-detail-info__main__values--condition"},(n=i.condition,r=i.sold_quantity,"".concat("new"===n?"Nuevo":"Usado"," - ").concat(r," vendidos"))),a.createElement("p",{className:"ui-product-detail-info__main__values--title"},i.title),a.createElement("div",{className:"ui-product-detail-info__main__values__price-container"},a.createElement("span",{className:"ui-product-detail-info__main__values__price-container--amount"},P(i.price)),a.createElement("span",{className:"ui-product-detail-info__main__values__price-container--cents"},"amount"in(t=i.price)&&t.amount.toString().length>6?"":"decimals"in t?0===t.decimals?"00":t.decimals.toString().substring(2,4):"00")),a.createElement("button",{onClick:function(){return e=i.id,void console.log("You bought product id: "+e);var e},className:"ui-product-detail-info__main__values__buy-button"},"Comprar"))),a.createElement("div",{className:"ui-product-detail-info__description"},a.createElement("h2",{className:"ui-product-detail-info__description__title"},"Descripción del producto"),a.createElement("p",{className:"ui-product-detail-info__description__value"},i.description)))},w=function(e){var t=e.message,n=void 0===t?"":t,r=e.variant,i=void 0===r?"default":r;return n&&a.createElement("div",{className:"ui-not-found-page ui-not-found-page--".concat(i)},a.createElement("p",{className:"ui-not-found-page--".concat(i,"__text")},n))};var U=function(e){m()(i,e);var t,n,r=(t=i,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=f()(t);if(n){var r=f()(this).constructor;e=Reflect.construct(a,arguments,r)}else e=a.apply(this,arguments);return _()(this,e)});function i(e){var t;return o()(this,i),t=r.call(this),"staticContext"in e?t.state={isLoading:!1,data:e.staticContext}:"window"in e&&"initial_state"in e.window?t.state={isLoading:!1,data:e.window.initial_state}:t.state={isLoading:!0,data:{}},t}return u()(i,[{key:"componentDidMount",value:function(){var e=this;this.state.isLoading&&ProductDetails.fetchData().then((function(t){return e.setState({isLoading:!1,data:t})}))}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.data,r=n.item,i=n.status,c=n.appUrl;return a.createElement("div",{className:"ui-product-detail"},a.createElement(D,{initialValue:this.getInitialValue,actionValue:c}),t?a.createElement(w,{message:v.LOADING.MESSAGE,variant:v.LOADING.VARIANT}):a.createElement("div",{className:"ui-product-detail__body"},(!n||404===i)&&a.createElement(w,{message:v.PRODUCT_NOT_FOUND.MESSAGE,variant:v.PRODUCT_NOT_FOUND.VARIANT}),n&&r&&a.createElement("div",null,a.createElement(I,{route:r.breadcrumbs_route}),a.createElement(C,{item:r}))))}}],[{key:"fetchData",value:function(e,t){var n={status:404,message:"Not Found"},a=v.MELI_API.ID_PATH;return L().get(y(t,a,e)).then((function(e){return"data"in e?e.data:n})).catch((function(e){return{status:"response"in e&&"status"in e.response?e.response.status:n.status,message:"message"in e?e.message:n.message}}))}}]),i}(a.Component),x=n(1506),H=n.n(x),V=function(e){var t=e.item;return a.createElement("div",{className:"ui-product-item"},a.createElement("a",{href:"/items/".concat(t.id)},a.createElement("div",{className:"ui-product-item__image-container"},a.createElement("img",{src:t.picture,alt:"item picture",className:"ui-product-item__image-container__image"})),a.createElement("div",{className:"ui-product-item__description-container"},a.createElement("p",{className:"ui-product-item__description-container__value-price"},P(t.price)),a.createElement("p",{className:"ui-product-item__description-container__value-title"},t.title)),a.createElement("div",{className:"ui-product-item__province-container"},a.createElement("p",{className:"ui-product-item__province-container__value-province"},t.province))))};var G=function(e){m()(i,e);var t,n,r=(t=i,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=f()(t);if(n){var r=f()(this).constructor;e=Reflect.construct(a,arguments,r)}else e=a.apply(this,arguments);return _()(this,e)});function i(e){var t;return o()(this,i),t=r.call(this),"staticContext"in e&&void 0!==e.staticContext?t.state={isLoading:!1,data:e.staticContext}:window&&"initial_state"in window?t.state={isLoading:!1,data:window.initial_state}:t.state={isLoading:!0,data:{}},t.getInitialValue=t.getInitialValue.bind(H()(t)),t}return u()(i,[{key:"getInitialValue",value:function(){return new URLSearchParams((0,E.TH)().search).get("search")}},{key:"componentDidMount",value:function(){var e=this;this.state.isLoading&&i.fetchData().then((function(t){return e.setState({isLoading:!1,data:t})}))}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.data,r=this.state.data,i=r.items,c=r.breadcrumbs_route,o=r.appUrl;return a.createElement("div",{className:"ui-product-list"},a.createElement(D,{initialValue:this.getInitialValue,actionValue:o}),t?"loading...":a.createElement("div",{className:"ui-product-list__body"},(!n||!i.length||404===n.status)&&a.createElement(w,{message:v.ZERO_PRODUCTS_FOUND.MESSAGE,variant:v.ZERO_PRODUCTS_FOUND.VARIANT}),n&&!!i.length&&a.createElement("div",{className:"ui-product-list__body__items-container"},a.createElement(I,{route:c}),i.map((function(e){return a.createElement(V,{item:e,key:e.id})})))))}}],[{key:"fetchData",value:function(e,t){var n={status:404,message:"Not Found"},a=v.MELI_API.SEARCH_QUERY_PATH;return L().get(y(t,a,e)).then((function(e){return"data"in e?e.data:n})).catch((function(e){return{status:"response"in e&&"status"in e.response?e.response.status:n.status,message:"message"in e?e.message:n.message}}))}}]),i}(a.Component);var k=function(e){m()(i,e);var t,n,r=(t=i,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=f()(t);if(n){var r=f()(this).constructor;e=Reflect.construct(a,arguments,r)}else e=a.apply(this,arguments);return _()(this,e)});function i(e){return o()(this,i),r.call(this)}return u()(i,[{key:"render",value:function(){return a.createElement("div",{className:"home-app"},a.createElement(E.rs,null,a.createElement(E.AW,{path:"/",exact:!0,render:function(){return a.createElement(D,{inputPlaceholder:v.SEARCH.PLACEHOLDER_INPUT})}}),a.createElement(E.AW,{path:"/items",exact:!0,render:function(e){return a.createElement(G,e)}}),a.createElement(E.AW,{path:"/items/:id",exact:!0,render:function(e){return a.createElement(U,e)}})))}}]),i}(a.Component);r.hydrate(a.createElement(i.VK,null,a.createElement(k,null)),document.getElementById("home"))},4705:(e,t,n)=>{e.exports=n.p+"e207e1130d27e8dfdd47b4177cb022e9.png"}},t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={exports:{}};return e[a](r,r.exports,n),r.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var a=t.getElementsByTagName("script");a.length&&(e=a[a.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e+"../"})(),(()=>{var e={179:0},t=[[1138,736]],a=()=>{};function r(){for(var a,r=0;r<t.length;r++){for(var i=t[r],c=!0,o=1;o<i.length;o++){var s=i[o];0!==e[s]&&(c=!1)}c&&(t.splice(r--,1),a=n(n.s=i[0]))}return 0===t.length&&(n.x(),n.x=()=>{}),a}n.x=()=>{n.x=()=>{},c=c.slice();for(var e=0;e<c.length;e++)i(c[e]);return(a=r)()};var i=r=>{for(var i,c,[s,u,l,m]=r,d=0,_=[];d<s.length;d++)c=s[d],n.o(e,c)&&e[c]&&_.push(e[c][0]),e[c]=0;for(i in u)n.o(u,i)&&(n.m[i]=u[i]);for(l&&l(n),o(r);_.length;)_.shift()();return m&&t.push.apply(t,m),a()},c=self.webpackChunkreact_ssr=self.webpackChunkreact_ssr||[],o=c.push.bind(c);c.push=i})(),n.x()})();
//# sourceMappingURL=main.js.map