"use strict";(self.webpackChunkkd_libs=self.webpackChunkkd_libs||[]).push([[443],{9443:function(r){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;r.exports=function(){try{if(!Object.assign)return!1;var r=new String("abc");if(r[5]="de","5"===Object.getOwnPropertyNames(r)[0])return!1;for(var e={},t=0;t<10;t++)e["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(r){return e[r]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(r){n[r]=r})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(r){return!1}}()?Object.assign:function(r,o){for(var c,a,i=function(r){if(null==r)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(r)}(r),s=1;s<arguments.length;s++){for(var b in c=Object(arguments[s]))t.call(c,b)&&(i[b]=c[b]);if(e){a=e(c);for(var f=0;f<a.length;f++)n.call(c,a[f])&&(i[a[f]]=c[a[f]])}}return i}}}]);