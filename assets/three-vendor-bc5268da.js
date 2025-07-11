import{r as l,a as m}from"./react-vendor-861e4728.js";var x={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=l,y=Symbol.for("react.element"),R=Symbol.for("react.fragment"),v=Object.prototype.hasOwnProperty,d=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,j={key:!0,ref:!0,__self:!0,__source:!0};function c(t,r,a){var e,o={},n=null,p=null;a!==void 0&&(n=""+a),r.key!==void 0&&(n=""+r.key),r.ref!==void 0&&(p=r.ref);for(e in r)v.call(r,e)&&!j.hasOwnProperty(e)&&(o[e]=r[e]);if(t&&t.defaultProps)for(e in r=t.defaultProps,r)o[e]===void 0&&(o[e]=r[e]);return{$$typeof:y,type:t,key:n,ref:p,props:o,_owner:d.current}}s.Fragment=R;s.jsx=c;s.jsxs=c;x.exports=s;var i=x.exports;const O=i.jsx,h=i.jsxs;var _={},f=m;_.createRoot=f.createRoot,_.hydrateRoot=f.hydrateRoot;export{O as a,_ as c,h as j};
