"use strict";(self.webpackChunknocode_platform=self.webpackChunknocode_platform||[]).push([[280],{69088:function(e,t,a){a.r(t),t.default={success:"_9-Aion8h_success",dot:"ZVMmASGJ_dot",title:"KaeMBu2m_title",state:"Z-CvAj4c_state",info:"GvzLXVo7_info",flag:"TBFeJiu+_flag",error:"KKDLfIhb_error",warning:"jnwNwgma_warning",going:"_5Fdia0us_going",reject:"SFYzHxjl_reject",item:"QO80lXi8_item",usr:"veevljfh_usr",editor:"XVWU8JJb_editor",icon:"_3ioEKe+f_icon",Auditor:"F7A5dz-7_Auditor",handler:"vsH04h6N_handler",des:"hGNfFjvv_des",node:"Nh28D1ks_node",launch:"OQk0QbW4_launch",finish:"KvvJwUIM_finish"}},89244:function(e,t,a){a.r(t),t.default={apply:"RlXB8RId_apply",mb:"SpCsExEE_mb",nav:"DAh5OVTO_nav",title:"Iu79-u2b_title",node_name:"FbedzwWE_node_name",err:"uaIt0zoF_err",btns:"qQqKgw2a_btns",list:"g5DwPN+R_list",node:"dkH4oigt_node",confirm:"Orrq7fn8_confirm",body:"GHdNFZHJ_body",footer:"HHqqCqoD_footer"}},28996:function(e,t,a){a.r(t),t.default={form_footer:"L+3T9ft1_form_footer",form_footer_main:"WRUJUeKF_form_footer_main",form_footer_main_tips:"-anEDyDY_form_footer_main_tips",btns:"xiAX4YhX_btns",bizbtns:"Btg5+xYQ_bizbtns"}},34964:function(e,t,a){a(25028)(t,"__esModule",{value:!0}),t.FLOW_ACTION_TYPES=void 0;t.FLOW_ACTION_TYPES={consent:"Consent",terminate:"Terminate",reject:"Reject",cancel:"TaskCancel"}},3308:function(e,t,a){var l=a(25028),n=a(9564);l(t,"__esModule",{value:!0}),t.default=void 0;var u=n(a(29052)),d=n(a(94924)),i=n(a(78912)),r=a(65984),o=a(63516);t.default=function(e){var t=(0,r.useState)(""),a=(0,i.default)(t,2),l=a[0],n=a[1],c=(0,r.useCallback)((0,d.default)(u.default.mark((function t(){var a,l,d,i,r;return u.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,(0,o.getStorage)("bos-core-"+e);case 4:if(t.t0=t.sent,t.t0){t.next=7;break}t.t0={};case 7:l=t.t0,d=(null==l||null===(a=l.items)||void 0===a?void 0:a[0])||{},i=d.bc,r=d.customStyle,n(r?i:"#F8FAFC");case 11:case"end":return t.stop()}}),t)}))),[e]);return(0,r.useLayoutEffect)((function(){return window.addEventListener("storage",(function(){return c()}),!1),function(){window.removeEventListener("storage",(function(){}))}}),[]),(0,r.useEffect)((function(){c()}),[e]),l}},48552:function(e,t,a){var l=a(13568),n=a(93252),u=a(25028),d=a(4884),i=a(9564);u(t,"__esModule",{value:!0}),t.UserInputItem=t.LaunchItem=t.FlowItem=t.FinishItem=t.AuditItem=void 0;var r=i(a(760)),o=i(a(23992)),c=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=l(e)&&"function"!=typeof e)return{default:e};var a=h(t);if(a&&a.has(e))return a.get(e);var n={__proto__:null},i=u&&d;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var o=i?d(e,r):null;o&&(o.get||o.set)?u(n,r,o):n[r]=e[r]}return n.default=e,a&&a.set(e,n),n}(a(65984)),f=a(63548),s=i(a(71252)),m=a(57264),p=a(82416),v=i(a(69088));function h(e){if("function"!=typeof n)return null;var t=new n,a=new n;return(h=function(e){return e?a:t})(e)}var g={willApproval:v.default.warning,willHandled:v.default.warning,approve:v.default.success,handled:v.default.success,done:v.default.success,launch:v.default.success,pass:v.default.success,terminate:v.default.reject,withdraw:v.default.reject,reject:v.default.error,exception_terminate:v.default.error},x={withdraw:"yichexiao",exception_terminate:"cuowushibai",terminate:"foujue2",approve:"tongyi",handled:"tongyi",launch:"tongyi",pass:"tongyi",done:"tongyi"},E=t.FinishItem=(0,c.memo)((function(e){var t=e.item,a=(0,s.default)(v.default.item,v.default.finish,g[t.handleState]||g.handled),l=x[t.handleState]||"right-bold";return c.default.createElement("div",{className:a},c.default.createElement("div",{className:(0,s.default)(v.default.dot,"kd-nc-flow-dot")},c.default.createElement("p",null,c.default.createElement(f.Icon,{prefix:"nocodeplatformicon",type:l}))),c.default.createElement("div",{className:v.default.info},c.default.createElement("div",{className:v.default.title,style:{marginBottom:0}},c.default.createElement("div",null,c.default.createElement("p",null,t.nodeName)),c.default.createElement("div",{className:v.default.state},t.handleStateDesc),c.default.createElement("div",null,t.message))))})),N=t.LaunchItem=(0,c.memo)((function(e){var t,a,l=e.item;return c.default.createElement("div",{className:(0,s.default)(v.default.item,v.default.launch)},c.default.createElement("div",{className:(0,s.default)(v.default.dot,"kd-nc-flow-dot")},c.default.createElement("p",null)),c.default.createElement("div",{className:v.default.info},c.default.createElement("div",{className:v.default.editor},c.default.createElement("div",{className:v.default.icon,style:{background:l.bg}},c.default.createElement(p.Avatar,{src:(null===(t=l.approverInfos)||void 0===t||null===(t=t[0])||void 0===t?void 0:t.handlerAvatar)||""})),c.default.createElement("div",{className:v.default.handler},c.default.createElement("div",{className:v.default.usr},c.default.createElement("p",null,(null==l||null===(a=l.approverInfos)||void 0===a||null===(a=a[0])||void 0===a?void 0:a.handlerName)||""),c.default.createElement("span",null,l.handleTime?(0,m.dateFormat)("MM-dd hh:mm",l.handleTime):"")),c.default.createElement("div",null,(null==l?void 0:l.handleStateDesc)||"")))))})),w=t.AuditItem=(0,c.memo)((function(e){var t,a,l,n=e.item,u=e.className,d=e.curNode,i=e.config,h=n.taskId,E=n.procInstId,N=n.handleTime,w=n.handleState,_=n.nodeName,y=n.handleStateDesc,I=n.approverInfos,k=n.message,b=i.appId,C=i.targetFormId,F=i.pkId,S=(0,s.default)(v.default.item,u,g[w]||g.willHandled),A=x[w],T=(0,c.useMemo)((function(){return(null==n?void 0:n.canHandle)&&h!==d.taskId&&"willApproval"===w}),[w,d,n,h]),M=(0,c.useCallback)((function(){var e,t,a,l;(0,m.openner)((0,r.default)(e=(0,r.default)(t=(0,r.default)(a=(0,r.default)(l="/".concat(b,"/detail/")).call(l,C,"/")).call(a,F,"/view/flow/")).call(t,E,"/task/")).call(e,h))}),[b,C,F,h,E]);return c.default.createElement("div",{className:S},c.default.createElement("div",{className:(0,s.default)(v.default.dot,"kd-nc-flow-dot")},c.default.createElement("p",null)),c.default.createElement("div",{className:v.default.info},c.default.createElement("div",{className:v.default.title},c.default.createElement("div",null,c.default.createElement("p",null,_),T&&c.default.createElement(p.BtnField,{type:"text",major:!0,"data-nc-action":(0,r.default)(t="".concat(b,"|")).call(t,C,"|fu_fr_audit"),onClick:M,icon:{prefix:"nocodeplatformicon",type:"daishenpi"}},"审批")),c.default.createElement("div",{className:v.default.state},y)),"willApproval"===w?c.default.createElement("div",{className:v.default.Auditor},(0,o.default)(I).call(I,(function(e){return c.default.createElement("p",{key:e.handlerId},c.default.createElement(p.Avatar,{src:(null==e?void 0:e.handlerAvatar)||""}),c.default.createElement("span",{title:(null==e?void 0:e.handlerName)||""},(null==e?void 0:e.handlerName)||""))}))):c.default.createElement("div",{className:v.default.editor},c.default.createElement("div",{className:v.default.icon},c.default.createElement(p.Avatar,{src:(null==I||null===(a=I[0])||void 0===a?void 0:a.handlerAvatar)||""}),A&&c.default.createElement(f.Icon,{className:v.default.flag,prefix:"nocodeplatformicon",type:A})),c.default.createElement("div",{className:v.default.handler},c.default.createElement("div",{className:v.default.usr},c.default.createElement("p",null,(null==I||null===(l=I[0])||void 0===l?void 0:l.handlerName)||""),c.default.createElement("span",null,N?(0,m.dateFormat)("MM-dd hh:mm",N):"")),c.default.createElement("div",{className:v.default.des},k||"")))))})),_=t.UserInputItem=(0,c.memo)((function(e){var t,a,l,n,u=e.item,d=e.className,i=e.config,h=u.procInstId,E=u.nodeBusinessKey,N=u.nodeId,w=(u.nodeType,u.handleState),_=u.canInputOrView,y=u.approverInfos,I=i||{},k=I.appId,b=I.targetFormId,C=I.pkId,F=I.userTaskActivityId,S=I.userTaskBusinessKey,A=(0,s.default)(v.default.item,d,g[u.handleState]||g.willHandled),T=x[u.handleState],M=(0,c.useMemo)((function(){return(0,o.default)(y).call(y,(function(e){return e.handlerId})).join()}),[]),B=(0,c.useCallback)((function(e){var t,a,l,n,u,d,i,o=(0,r.default)(t=(0,r.default)(a=(0,r.default)(l=(0,r.default)(n=(0,r.default)(u=(0,r.default)(d=(0,r.default)(i="/".concat(k,"/detail/")).call(i,b,"/")).call(d,C,"/")).call(u,e,"/flow/")).call(n,h,"/")).call(l,N,"/")).call(a,E,"/")).call(t,M);(0,m.openner)(o)}),[M,k,b,C,h,N,E,S]),P=(0,c.useMemo)((function(){return!F&&!S&&_}),[F,_,S]);return c.default.createElement("div",{className:A},c.default.createElement("div",{className:(0,s.default)(v.default.dot,"kd-nc-flow-dot")},c.default.createElement("p",null)),c.default.createElement("div",{className:v.default.info},c.default.createElement("div",{className:v.default.title},c.default.createElement("div",null,c.default.createElement("p",null,u.nodeName),P?"handled"===w?c.default.createElement(p.BtnField,{type:"text",major:!0,"data-nc-action":(0,r.default)(t="".concat(k,"|")).call(t,b,"|fu_fr_check"),onClick:function(){return B("view")},icon:{prefix:"ncicon",type:"yanjing"}},"查看"):c.default.createElement(p.BtnField,{type:"text",major:!0,"data-nc-action":(0,r.default)(a="".concat(k,"|")).call(a,b,"|fu_fr_fill"),onClick:function(){return B("edit")},icon:{prefix:"nocodeplatformicon",type:"bianji"}},"录入"):null),c.default.createElement("div",{className:v.default.state},u.handleStateDesc)),"willHandled"!==u.handleState&&c.default.createElement("div",{className:v.default.editor},c.default.createElement("div",{className:v.default.icon,style:{background:u.bg}},c.default.createElement(p.Avatar,{src:(null===(l=u.approverInfos)||void 0===l||null===(l=l[0])||void 0===l?void 0:l.handlerAvatar)||""}),T&&c.default.createElement(f.Icon,{className:v.default.flag,prefix:"nocodeplatformicon",type:T})),c.default.createElement("div",{className:v.default.handler},c.default.createElement("div",{className:v.default.usr},c.default.createElement("p",null,(null==u||null===(n=u.approverInfos)||void 0===n||null===(n=n[0])||void 0===n?void 0:n.handlerName)||""),c.default.createElement("span",null,u.handleTime?(0,m.dateFormat)("MM-dd hh:mm",u.handleTime):"")),c.default.createElement("div",{className:v.default.des},(null==u?void 0:u.message)||"")))))})),y=t.FlowItem=(0,c.memo)((function(e){var t=e.item,a=e.className,l=(0,s.default)(v.default.item,a,g[t.handleState]||g.willHandled),n=x[t.handleState];return c.default.createElement("div",{className:l},c.default.createElement("div",{className:(0,s.default)(v.default.dot,"kd-nc-flow-dot")},c.default.createElement("p",null)),c.default.createElement("div",{className:v.default.info},c.default.createElement("div",{className:v.default.title},c.default.createElement("div",null,c.default.createElement("p",null,t.nodeName)),c.default.createElement("div",{className:v.default.state},t.handleStateDesc)),c.default.createElement("div",{className:v.default.editor},c.default.createElement("div",{className:v.default.icon,style:{background:t.bg}},c.default.createElement(f.Icon,{prefix:"nocodeplatformicon",type:t.icon}),n&&c.default.createElement(f.Icon,{className:v.default.flag,prefix:"nocodeplatformicon",type:n})),c.default.createElement("div",{className:v.default.handler},c.default.createElement("div",{className:v.default.usr},c.default.createElement("p",null,t.handlerName||t.nodeTypeName),c.default.createElement("span",null,t.handleTime?(0,m.dateFormat)("MM-dd hh:mm",t.handleTime):"")),c.default.createElement("div",{className:v.default.des},(null==t?void 0:t.message)||"")))))}));_.displayName="UserInputItem",w.displayName="AuditItem",y.displayName="FlowItem",E.displayName="FinishItem",N.displayName="LaunchItem"},21044:function(e,t,a){var l=a(13568),n=a(93252),u=a(25028),d=a(4884);u(t,"__esModule",{value:!0}),t.default=void 0;var i=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=l(e)&&"function"!=typeof e)return{default:e};var a=c(t);if(a&&a.has(e))return a.get(e);var n={__proto__:null},i=u&&d;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var o=i?d(e,r):null;o&&(o.get||o.set)?u(n,r,o):n[r]=e[r]}return n.default=e,a&&a.set(e,n),n}(a(65984)),r=a(82416),o=a(28808);function c(e){if("function"!=typeof n)return null;var t=new n,a=new n;return(c=function(e){return e?a:t})(e)}var f=(0,i.lazy)((function(){return a.e(168).then(a.t.bind(a,87168,23))})),s=(0,i.memo)((function(e){var t=e.onRef,a=e.config,l=e.options,n=e.device,u=void 0===n?"pc":n;return i.default.createElement(i.Suspense,{fallback:i.default.createElement(r.Skeleton,{options:o.PopBillSkeleton})},i.default.createElement(f,{device:u,onRef:t,config:a,options:l}))}));s.displayName="NocodeEntry";t.default=s},28808:function(e,t,a){a(25028)(t,"__esModule",{value:!0}),t.PopBillSkeleton=void 0;t.PopBillSkeleton=[{width:"100%",height:"100%",flexDirection:"column",background:"#f2f9ff",child:[{width:"auto",height:"100%",margin:"12px 16px 12px 16px",type:"CONCENT",child:[{width:"auto",height:"auto",margin:"4px 12px 12px 12px",flexDirection:"column",child:[{width:"200px",height:"24px",margin:"0px",type:"INPUT"},{width:"auto",height:"auto",margin:"32px 0px 0px 0px",child:[{width:"50%",height:"auto",margin:"0px",flexDirection:"column",child:[{width:"28px",height:"16px",margin:"0px 0px 8px 0px",type:"INPUT"},{width:"100%",height:"36px",margin:"0px",type:"INPUT"},{width:"56px",height:"16px",margin:"24px 0px 0px 0px",type:"INPUT"},{width:"auto",height:"20px",margin:"16px 0px 28px 0px",child:[{width:"80px",height:"20px",margin:"0px",type:"INPUT"},{width:"56px",height:"20px",margin:"0px 0px 0px 24px",type:"INPUT"}]},{width:"96px",height:"16px",margin:"0px",type:"INPUT"},{width:"100%",height:"36px",margin:"8px 0px 0px 0px",type:"INPUT"}]},{width:"50%",height:"auto",margin:"0px 0px 0px 24px",flexDirection:"column",child:[{width:"56px",height:"16px",margin:"0px 0px 8px 0px",type:"INPUT"},{width:"100%",height:"36px",margin:"0px",type:"INPUT"},{width:"80px",height:"16px",margin:"24px 0px 0px 0px",type:"INPUT"},{width:"auto",height:"20px",margin:"16px 0px 28px 0px",child:[{width:"56px",height:"20px",margin:"0px",type:"INPUT"},{width:"160px",height:"20px",margin:"0px 0px 0px 24px",type:"INPUT"}]},{width:"120px",height:"16px",margin:"0px",type:"INPUT"},{width:"auto",height:"20px",margin:"16px 0px 0px 0px",child:[{width:"80px",height:"20px",margin:"0px",type:"INPUT"},{width:"56px",height:"20px",margin:"0px 0px 0px 24px",type:"INPUT"}]}]}]},{width:"56px",height:"16px",margin:"28px 0px 0px 0px",type:"INPUT"},{width:"100%",height:"76px",margin:"8px 0px 28px 0px",type:"INPUT"},{width:"56px",height:"16px",margin:"0px",type:"INPUT"},{width:"auto",height:"28px",margin:"8px 0px 8px 0px",child:[{width:"92px",height:"28px",margin:"0px",type:"INPUT"},{width:"72px",height:"28px",type:"INPUT"}]},{width:"100%",height:"176px",margin:"0px",type:"INPUT"},{width:"100%",height:"28px",margin:"8px 0px 0px 0px",justifyContent:"flex-end",child:[{width:"280px",height:"28px",margin:"0px",type:"INPUT"}]}]}]}]}]},84856:function(e,t,a){var l=a(13568),n=a(13939),u=a(34716),d=a(70696),i=a(4884),r=a(3464),o=a(51400),c=a(25028),f=a(93252),s=a(9564);c(t,"__esModule",{value:!0}),t.default=void 0;var m=s(a(23992)),p=s(a(38456)),v=s(a(96631)),h=s(a(78912)),g=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=l(e)&&"function"!=typeof e)return{default:e};var a=_(t);if(a&&a.has(e))return a.get(e);var n={__proto__:null},u=c&&i;for(var d in e)if("default"!==d&&Object.prototype.hasOwnProperty.call(e,d)){var r=u?i(e,d):null;r&&(r.get||r.set)?c(n,d,r):n[d]=e[d]}return n.default=e,a&&a.set(e,n),n}(a(65984)),x=a(63548),E=a(82416),N=a(98464),w=a(57264);function _(e){if("function"!=typeof f)return null;var t=new f,a=new f;return(_=function(e){return e?a:t})(e)}function y(e,t){var a=n(e);if(u){var l=u(e);t&&(l=d(l).call(l,(function(t){return i(e,t).enumerable}))),a.push.apply(a,l)}return a}function I(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?y(Object(a),!0).forEach((function(t){(0,v.default)(e,t,a[t])})):r?o(e,r(a)):y(Object(a)).forEach((function(t){c(e,t,i(a,t))}))}return e}var k=function(e){var t=e.tips,a=e.placement,l=e.children;return t?g.default.createElement(x.Tooltip,{tip:t,placement:a},l):l},b=(0,g.memo)((function(e){var t=e.pkId,a=e.formId,l=e.appId,n=e.bosApi,u=e.className,d=(0,g.useState)([]),i=(0,h.default)(d,2),r=i[0],o=i[1],c=(0,g.useState)([]),f=(0,h.default)(c,2),s=f[0],v=f[1],_=(0,g.useRef)(null),y=(0,g.useRef)(!1),b=(0,g.useState)(!1),C=(0,h.default)(b,2),F=C[0],S=C[1];(0,g.useEffect)((function(){if(n){var e=270;v((0,m.default)(r).call(r,(function(t,a){var l=null==n?void 0:n.getControlText(t.text),u=l.length;return e>=0&&(e-=u>4?90+14*(u-4):90),a===r.length-1&&u<=2&&e<0&&(e+=90),e<0&&(y.current=!0),I(I({},t),{},{text:l,isMoreBtn:0===e&&a<r.length-1||e<0})})))}}),[r,n]),(0,g.useEffect)((function(){t&&(0,N.getBizButtonList)({appId:l,formId:a,pkId:t}).then((function(e){var t=e.rows;Array.isArray(t)&&o(t)})).catch((function(e){}))}),[t]);var A=(0,g.useCallback)((function(e){n.invokeHandle("click",e,[],[],T)}),[n]),T=function(){S(!1)},M=(0,g.useCallback)((function(e){var t=e.SecondConfirm,a=e.opk,l=e.text;S(!0),t?(0,w.showConfirmModal)({title:"确定对记录执行".concat(l,"操作吗？"),actions:[{text:"取消",key:"cancel"},{text:"确定",key:"confirm"}],onAction:function(e){"confirm"===e?A(a):S(!1)},type:"prompt"}):A(a)}),[A]),B=g.default.createElement(x.Dropdown.Menu,{onClick:function(e){var t=(0,p.default)(s).call(s,(function(t){return t.opk===e}));t&&M(t)}},(0,m.default)(s).call(s,(function(e,t){return e.isMoreBtn?g.default.createElement(x.Dropdown.Item,{disabled:F,key:e.opk},g.default.createElement(k,{tips:null==e?void 0:e.HelpTips,placement:"right"},e.text)):null})));return null!=s&&s.length?g.default.createElement("div",{ref:_,className:u},(0,m.default)(s).call(s,(function(e,t){return e.isMoreBtn?null:g.default.createElement(k,{key:e.opk,tips:null==e?void 0:e.HelpTips},g.default.createElement(E.BtnField,{disabled:F,onClick:function(){M(e)}},e.text))})),y.current&&g.default.createElement(x.Dropdown,{menu:B,trigger:"click"},g.default.createElement(E.BtnField,null,"更多"))):null}));b.displayName="BizButtonList";t.default=b},49148:function(e,t,a){var l=a(13568),n=a(13939),u=a(34716),d=a(70696),i=a(4884),r=a(3464),o=a(51400),c=a(25028),f=a(93252),s=a(9564);c(t,"__esModule",{value:!0}),t.default=void 0;var m=s(a(52892)),p=s(a(38456)),v=s(a(25288)),h=s(a(50524)),g=s(a(760)),x=s(a(23992)),E=s(a(96631)),N=s(a(78912)),w=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=l(e)&&"function"!=typeof e)return{default:e};var a=M(t);if(a&&a.has(e))return a.get(e);var n={__proto__:null},u=c&&i;for(var d in e)if("default"!==d&&Object.prototype.hasOwnProperty.call(e,d)){var r=u?i(e,d):null;r&&(r.get||r.set)?c(n,d,r):n[d]=e[d]}return n.default=e,a&&a.set(e,n),n}(a(65984)),_=a(16428),y=a(82416),I=a(57264),k=a(48552),b=s(a(89244)),C=a(98464),F=a(34964),S=a(63548),A=s(a(71252)),T=a(78016);function M(e){if("function"!=typeof f)return null;var t=new f,a=new f;return(M=function(e){return e?a:t})(e)}function B(e,t){var a=n(e);if(u){var l=u(e);t&&(l=d(l).call(l,(function(t){return i(e,t).enumerable}))),a.push.apply(a,l)}return a}var P={NoCodeWfNodeUserInput:k.UserInputItem,NoCodeWfNodeEnd:k.FinishItem,NoCodeWfNodeStart:k.LaunchItem,NoCodeWfNodeAudit:k.AuditItem},j=(0,w.memo)((function(e){var t,a,l,n=e.taskId,u=e.data,d=e.config,f=void 0===d?{}:d,s=e.onSubmit,M=e.setFormLock,j=e.bosApi,U=f.procInstId,O=f.appId,L=f.targetFormId,D=(0,w.useState)([]),H=(0,N.default)(D,2),z=H[0],R=H[1],W=(0,w.useState)([]),K=(0,N.default)(W,2),J=K[0],Y=K[1],q=(0,w.useState)([]),X=(0,N.default)(q,2),Q=X[0],V=X[1],G=(0,w.useState)(""),Z=(0,N.default)(G,2),$=Z[0],ee=Z[1],te=(0,w.useState)(""),ae=(0,N.default)(te,2),le=ae[0],ne=ae[1],ue=(0,w.useState)(!1),de=(0,N.default)(ue,2),ie=de[0],re=de[1],oe=(0,w.useRef)(new m.default),ce=(0,w.useState)(!1),fe=(0,N.default)(ce,2),se=fe[0],me=fe[1],pe=(null===(t=oe.current)||void 0===t?void 0:t.get($))||{},ve=pe.approvalInfo,he=void 0===ve?[]:ve,ge=pe.canWithdraw;(0,w.useEffect)((function(){U&&ee(U)}),[U]);var xe=(0,w.useMemo)((function(){return(n&&he?(0,p.default)(he).call(he,(function(e){return e.taskId===n})):{})||{}}),[n,he]),Ee=(0,w.useCallback)((function(e){return(0,v.default)(e).call(e)?(me(!1),!0):(me(!0),!1)}),[me]),Ne=(0,w.useCallback)((function(e){ne(e)}),[ne,Ee]),we=(0,w.useCallback)((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!(arguments.length>2&&void 0!==arguments[2]&&arguments[2])){var a,l=(null===(a=oe.current)||void 0===a?void 0:a.get($)).notifyMsgMustInput;if(null!=l&&(0,h.default)(l).call(l,e.toLowerCase())&&!Ee(le))return}j&&j.invokeHandle("click","btnsave",[],[],(function(a,l){if("1001"!==a.errorCode){var n=(0,I.checkActions)(a),u=n.isSuccess;n.actions;u&&(0,C.taskApply)(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?B(Object(a),!0).forEach((function(t){(0,E.default)(e,t,a[t])})):r?o(e,r(a)):B(Object(a)).forEach((function(t){c(e,t,i(a,t))}))}return e}({action:e,taskId:null==xe?void 0:xe.taskId,message:le},t)).then((function(){(0,I.showNotice)("success","审批意见提交成功。"),null==s||s()})).catch((function(e){return(0,I.showNotice)("error","审批意见提交审批失败，".concat(e.message,"。"))}))}else(0,I.showNotice)("warnning","表单加载中，请稍候......")}))}),[$,le,xe,s,Ee]),_e=(0,w.useCallback)((function(){we(F.FLOW_ACTION_TYPES.reject,{nextNodeId:Q}),re(!1)}),[Q,we]),ye=(0,w.useCallback)((function(){var e=xe.disAllowNodeList,t=(0,x.default)(e).call(e,(function(e){return{label:e.name,value:e.nodeId}}));(0,_.unstable_batchedUpdates)((function(){V(t[0].value),Y(t),re(!0)}))}),[xe]),Ie=(0,w.useCallback)((function(){(0,C.taskCancel)({procInstId:$}).then((function(){(0,I.showNotice)("success","撤回提交成功"),null==s||s()})).catch((function(e){return(0,I.showNotice)("error","".concat(e.message))}))}),[$,s]),ke=(0,w.useCallback)((function(){var e,t;if(window.isIE){(0,I.showConfirm)("该功能暂不支持IE浏览器，\n请尝试使用其他浏览器（推荐Chrome）。","",4)}else{var a=(null===(e=oe.current)||void 0===e?void 0:e.get($))||{},l=a.procInstId,n=a.businessKey;(0,I.openner)((0,g.default)(t="/flow/".concat(l,"/")).call(t,n))}}),[$]);(0,w.useEffect)((function(){var e,t=[];null==u||u.forEach((function(e){oe.current.set(e.procInstId,e),t.push({label:e.processName||"流程",value:e.procInstId})}));var a=U||(null===(e=t[0])||void 0===e?void 0:e.value);(0,_.unstable_batchedUpdates)((function(){var e;U||ee(a),null==M||M("1"===(null===(e=oe.current.get(a))||void 0===e?void 0:e.lockStatus)),R(t)}))}),[u,U,M]);var be=(0,w.useMemo)((function(){return(null==xe?void 0:xe.canHandle)&&(null==xe?void 0:xe.taskId)&&"willApproval"===(null==xe?void 0:xe.handleState)}),[xe]),Ce=(0,w.useCallback)((function(e){ee(e),(0,T.publishClickUserEvent)({appId:O,formId:L,action:"fu_fr_open"})}),[ee]);return w.default.createElement(w.default.Fragment,null,w.default.createElement("div",{className:(0,A.default)(b.default.apply,"kd-nc-flow-list")},w.default.createElement("div",{className:b.default.nav},w.default.createElement("div",{className:b.default.title},"流程记录"),w.default.createElement("div",null,w.default.createElement(y.BtnField,{major:!0,"data-nc-action":(0,g.default)(a="".concat(O,"|")).call(a,L,"|fu_fr_fc"),type:"text",onClick:ke,disabled:!z.length},"流程图"))),z.length>1&&w.default.createElement("div",{className:b.default.mb},w.default.createElement(y.Select,{value:$,onChange:Ce,options:z})),be&&w.default.createElement("div",null,w.default.createElement("div",{className:b.default.node_name},(null==xe?void 0:xe.nodeName)||""),w.default.createElement(y.Textarea,{value:le,placeholder:"请输入审批意见",onChange:Ne,maxLength:245,showCount:!0,autoSize:{minRows:3,maxRows:3}}),se&&w.default.createElement("div",{className:b.default.err},"审批意见为必填项")),w.default.createElement("div",{className:b.default.btns},w.default.createElement(w.default.Fragment,null,be&&w.default.createElement(w.default.Fragment,null,null===(l=xe.decisionOptions)||void 0===l?void 0:(0,x.default)(l).call(l,(function(e,t){var a=e.number,l=e.name;return w.default.createElement(y.BtnField,{key:a,size:"small",type:0===t&&"primary",onClick:function(){return function(e){var t=e||{},a=t.number;t.name,(!t.auditMessageMustInput||Ee(le))&&a&&we(a,{},!0)}(e)}},l)})),xe.canDisallow&&w.default.createElement(y.BtnField,{size:"small",onClick:ye},"驳回")),ge&&w.default.createElement(y.BtnField,{size:"small",onClick:Ie},"撤回"))),w.default.createElement("div",{className:b.default.list},(0,x.default)(he).call(he,(function(e,t){var a=P[e.nodeType]||k.FlowItem;return w.default.createElement(a,{key:e.id,curNode:xe,config:f,className:t===he.length-2?b.default.node:"",item:e})})))),w.default.createElement(S.Modal,{className:b.default.confirm,title:"驳回",showline:!0,visible:ie,onCancel:function(){return re(!1)},destroyOnClose:!0,height:208,width:480,body:w.default.createElement("div",{className:b.default.body},"驳回至",w.default.createElement(y.Select,{placeholder:"请选择",value:Q,onChange:V,options:J})),footer:w.default.createElement("div",{className:b.default.footer},w.default.createElement(y.BtnField,{size:"small",onClick:function(){return re(!1)}},"取消"),w.default.createElement(y.BtnField,{type:"primary",onClick:_e,size:"small"},"确认"))}))}));j.displayName="FlowListLayout";t.default=j},64004:function(e,t,a){var l=a(13568),n=a(93252),u=a(25028),d=a(4884),i=a(9564);u(t,"__esModule",{value:!0}),t.default=void 0;var r=i(a(760)),o=i(a(78912)),c=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=l(e)&&"function"!=typeof e)return{default:e};var a=x(t);if(a&&a.has(e))return a.get(e);var n={__proto__:null},i=u&&d;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var o=i?d(e,r):null;o&&(o.get||o.set)?u(n,r,o):n[r]=e[r]}return n.default=e,a&&a.set(e,n),n}(a(65984)),f=a(82416),s=a(57264),m=i(a(84856)),p=a(78016),v=i(a(28996)),h=i(a(75020)),g=a(66028);function x(e){if("function"!=typeof n)return null;var t=new n,a=new n;return(x=function(e){return e?a:t})(e)}var E={save:!1,saveAndNew:!1,copy:!1,delete:!1,edit:!1},N=(0,c.memo)((function(e){var t=e.status,a=e.disabled,l=void 0!==a&&a,n=e.disabledCb,u=e.bosApi,d=e.authList,i=e.config,x=e.origin,N=e.isSharePage,w=e.inputAuthFixed,_=void 0!==w&&w,y=e.formLock,I=e.newPkId,k=e.extraButton,b=(e.setStatus,e.copyCallback),C=e.delCallback,F=e.saveCallback,S=d||{},A=S.deleteAuth,T=S.inputAuth,M=S.editAuth,B=S.viewAuth,P=i||{},j=P.appId,U=(P.pkId,P.targetFormId),O=P.userTaskActivityId,L=P.taskId,D=(0,c.useRef)(null),H=(0,c.useReducer)(g.assignDataReducer,E),z=(0,o.default)(H,2),R=z[0],W=z[1],K=(0,c.useCallback)((function(e){var t,a;return(0,r.default)(t=(0,r.default)(a="".concat(j,"|")).call(a,U,"|")).call(t,e)}),[j,U]),J=(0,c.useCallback)((function(e){var t,a,l=(0,s.getBosActions)(e.data)||{};return{isSuccess:0===(null==l||null===(t=l.ShowNotificationMsg)||void 0===t?void 0:t[0].type),formStatus:null==l||null===(a=l.setFormStatus)||void 0===a?void 0:a[0],actions:l}}),[]),Y=(0,c.useCallback)((function(){if(l)return null==n?void 0:n();"view"!==t&&(W({save:!0}),u.invokeHandle("click","btnsave",[],[],(function(e,t){if("1001"===e.errorCode)return(0,s.showNotice)("warnning","表单加载中，请稍候"),void W({save:!1});var a=J(e),l=a.isSuccess,n=a.actions;l&&F(n,!1,t),W({save:!1})})))}),[t,u,F,l,n,R.save]),q=(0,c.useCallback)((function(){if(l)return null==n?void 0:n();if("addNew"===t){var e=D.current.checked?"btnsaveandcopy":"btnsaveandnew";W({saveAndNew:!0}),u.invokeHandle("click",e,[],[],(function(e,t){if(W({saveAndNew:!1}),"1001"!==e.errorCode){var a=J(e),l=a.isSuccess,n=a.actions;l&&F(n,!0,t)}else(0,s.showNotice)("warnning","表单加载中，请稍候")}))}}),[t,u,l,n,R.saveAndNew]),X=(0,c.useCallback)((function(){if(l)return null==n?void 0:n();(0,s.showDeleteConfirmModal)({title:"",message:"确定删除该记录吗？",detail:"",onOk:function(){(0,p.publishUserEvent)({appId:j,formId:U,action:"au_fo_del_comf"}),W({delete:!0}),u.invokeHandle("click","btndel",[],[],(function(e){W({delete:!1}),"1001"!==e.errorCode?J(e).isSuccess&&(null==C||C()):(0,s.showNotice)("warnning","表单加载中，请稍候")}))},onCancel:function(){}})}),[j,U,u,l,n,R.delete]),Q=(0,c.useCallback)((function(){if(l)return null==n?void 0:n();"view"===t&&(W({edit:!0}),u.invokeHandle("click","btnedit",[],[],(function(e){if(W({edit:!1}),"1001"===e.errorCode)return(0,s.showNotice)("warnning","表单加载中，请稍候"),!1})))}),[t,u,l,n,R.edit]),V=(0,c.useCallback)((function(){if(l)return null==n?void 0:n();"view"===t&&(W({copy:!0}),u.invokeHandle("click","btncopy",[],[],(function(e,t){var a;W({copy:!1}),"1001"!==e.errorCode?0===(null===(a=J(e))||void 0===a?void 0:a.formStatus)&&(null==b||b()):(0,s.showNotice)("warnning","表单加载中，请稍候")})))}),[t,J,b,u,l,n,R.copy]),G=(0,h.default)(V),Z=(0,h.default)(Q),$=(0,h.default)(X),ee=(0,h.default)(q),te=(0,h.default)(Y),ae=(0,c.useMemo)((function(){return"cosmic"!==x&&B?c.default.createElement(c.default.Fragment,null,k&&k(),c.default.createElement("div",{className:v.default.btns},c.default.createElement(m.default,{className:v.default.bizbtns,bosApi:u,appId:j,formId:U,pkId:I}),!y&&A&&c.default.createElement(f.BtnField,{disabled:!u,"data-nc-action":K("fu_fo_del"),loading:R.delete,onClick:$},"删除"),!_&&T&&c.default.createElement(f.BtnField,{disabled:!u,"data-nc-action":K("fu_fo_copy"),loading:R.copy,onClick:G},"复制"),!y&&M&&c.default.createElement(f.BtnField,{disabled:!u,"data-nc-action":K("fu_fo_edit"),type:"primary",loading:R.edit,onClick:Z},"编辑"))):null}),[B,A,T,M,j,U,y,I,u,$,G,Z,K,R.copy,R.delete,R.edit]),le=(0,c.useMemo)((function(){return M?!O&&L?null:c.default.createElement(c.default.Fragment,null,c.default.createElement("div",{className:v.default.btns},c.default.createElement(f.BtnField,{disabled:!u,type:"primary",loading:R.save,onClick:te},"保存"))):null}),[te,u,M,R.save,y,O,L]),ne=(0,c.useMemo)((function(){var e;return T?c.default.createElement(c.default.Fragment,null,c.default.createElement("div",null,c.default.createElement(f.Checkbox,{ref:D,"data-nc-action":(0,r.default)(e="".concat(j,"|")).call(e,U,"|fu_fo_kc"),className:v.default.footer_main_tips},"继续录入时，保留本次提交内容")),c.default.createElement("div",{className:v.default.btns},c.default.createElement(f.BtnField,{disabled:!u,loading:R.saveAndNew,onClick:ee},"提交并新增"),c.default.createElement(f.BtnField,{disabled:!u,type:"primary",loading:R.save,onClick:te},"提交"))):null}),[ee,te,u,T,j,U,R.saveAndNew,R.save]),ue=(0,c.useMemo)((function(){return"addNew"===t?c.default.createElement("div",{className:v.default.btns},c.default.createElement(f.BtnField,{type:"primary",disabled:!u,loading:R.save,onClick:te},"提交")):"edit"===t?le:"view"===t?ae:null}),[t,te,u,R.save,le,ae]),de=(0,c.useMemo)((function(){return{view:ae,edit:le,addNew:ne}[t||"addNew"]}),[t,ae,le,ne]);return c.default.createElement("div",{className:v.default.form_footer},c.default.createElement("div",{className:v.default.form_footer_main},N?ue:de))}));N.displayName="FormDetailFooterLayout";t.default=N}}]);