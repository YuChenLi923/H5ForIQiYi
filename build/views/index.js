webpackJsonp([3],[,,,,,,,,function(t,e,n){"use strict";function r(t){if(!n.i(a.a)(t)||n.i(o.a)(t)!=c)return!1;var e=n.i(i.a)(t);if(null===e)return!0;var r=p.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&l.call(r)==f}var o=n(38),i=n(40),a=n(45),c="[object Object]",s=Function.prototype,u=Object.prototype,l=s.toString,p=u.hasOwnProperty,f=l.call(Object);e.a=r},,function(t,e,n){"use strict";function r(t){"undefined"!=typeof console&&console.error;try{throw new Error(t)}catch(t){}}e.a=r},,function(t,e,n){"use strict";function r(){var t=l.getBoundingClientRect().width,e=l.clientHeight;return o(t,c.dpr),{width:t,height:e}}function o(t,e){var n=void 0;t/e>540&&(t=540*e),n=t/10,c.rem=n,l.style.fontSize=n+"px"}function i(t){var e=decodeURI(t).split("?")[1],n={};if(e){var r=e.split("&"),o=void 0,i=void 0,a=void 0;for(o=0,a=r.length;o<a;o++)i=r[o].split("="),n[i[0]]=i[1]}return n}function a(t,e,n,r){var o=e-r,i=n-t,a=Math.sqrt(i*i+o*o),c=Math.atan2(o,i)/Math.PI*180;return a<3?0:c<=135&&c>45?1:c<=-45&&c>-135?-1:c<=45&&c>-45?2:c>=135&&c<=180||i<=-135&&c>-180?-2:0}var c={host:"http://iface.qiyi.com",publicData:{app_k:"f0f6c3ee5709615310c0f053dc9c65f2",app_v:8.4,app_t:0,platform_id:10,dev_os:6,dev_ua:"MI 5",dev_hw:{cpu:0,gpu:"",mem:"50.4MB"},net_sts:1,scrn_sts:1,scrn_res:"1334*750",scrn_dpi:"153600",qyid:"87390BD2-DACE-497B-9CD4-2FD14354B2A4",secure_v:1,secure_p:"GPhone",core:1,req_sn:"1493946331320",req_times:1},dpr:1,isMobile:!1,width:0,height:0},s=document,u=window,l=s.documentElement;s.querySelector('meta[name="viewport"]');!function(){var t=u.navigator.appVersion,e=t.match(/android (\d\.\d)/i),n=t.match(/iphone os (\d)/i),r=u.devicePixelRatio,i=l.getBoundingClientRect().width,a=l.clientHeight,s=1,p=0;(e||n)&&(c.isMobile=!0,p=e?e[1]:n[1]),s=n?r>=3?3:r>=2?2:1:1,l.setAttribute("data-dpr",s),o(i,s),c.dpr=s,c.width=i,c.height=a,c.publicData.scrn_dpi=i*a,c.publicData.scrn_res=i+"*"+a,c.publicData.dev_os=p||6}(),t.exports={config:c,parseURLQuery:i,getScreenSize:r,getTouchDirection:a}},,,function(t,e,n){"use strict";(function(t){var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n=function(){function t(t,n){return null!=t&&("object"==(void 0===t?"undefined":e(t))&&1===t.nodeType&&(!n||"all"==n||t.nodeName.toLowerCase()==n.toLowerCase()))}function n(t){var e=t.split(".");return e[e.length-1]}function r(){return new XMLHttpRequest}function o(t,r,o,i){var a,c,s,u,l="",p=!0,f=!0,d="",h={},y=[];switch(i){case"json":if("object"==(void 0===t?"undefined":e(t)))for(u in t)t[u]&&(l+=""!==l?"&"+u+"="+JSON.stringify(t[u]).replace(/\"/g,""):u+"="+JSON.stringify(t[u]).replace(/\"/g,""));else"string"==typeof t&&(l=t);break;case"form":if(window.FormData){var v=new FormData;if("object"==(void 0===t?"undefined":e(t))){for(u in t)if("[object FileList]"==Object.prototype.toString.call(t[u].value)){if(h={isCheck:!0,type:t[u].type||u},s=t[u].value.length,0==s&&(o.ischeck=!1,h.isCheck=!1),t[u].suffix&&o.ischeck)for(a=0;a<s;a++)c=n(t[u].value[a].name),o.ischeck=t[u].suffix.some(function(t){return c.toLowerCase()==t.toLowerCase()}),p=o.ischeck;if(t[u].maxSize&&p&&o.ischeck)for(a=0;a<s;a++)t[u].value[a].size>1024*t[u].maxSize*1024&&(o.ischeck=!1,f=!1);if(s>0&&!o.ischeck&&(p?f||(d="文件大小超过:"+t[u].maxSize+"mb"):d="文件格式不满足:"+t[u].suffix.join(",")+"格式",h.isCheck=!1),o.ischeck)for(a=0;a<s;a++)v.append(u,t[u].value[a]);h.errorInf=d||t[u].errorInf,y.push(h)}else if(t[u].pattern){h={isCheck:!0,type:t[u].type||u};var b;b=void 0!=t[u].checkValue?t[u].checkValue:t[u].value,t[u].pattern.test(b)?v.append(u,t[u].value):(o.ischeck=!1,h.isCheck=!1),h.errorInf=t[u].errorInf,y.push(h)}else v.append(u,t[u].value);o.onCheck&&o.onCheck(y),l=v}}}return l}return{init:function(t){var e=this[t.name]={};e.result=null,e.handleData=t.handleData||null,e.type=t.type||"get",e.async=t.async||!1,e.dataType=t.dataType||"json",e.timeOut=t.timeOut,e.xhr=r()},send:function(t,e,n){var r,i=this[e],a=i.xhr;if(i.ischeck=!0,i.onCheck=t.onCheck,r=o(t.data,e,i,i.dataType),i.ischeck){if(i.stopFlag=!1,i.timeoutFlag=!1,t.onStart&&t.onStart(),n||(n=i),t.onProgress)try{a.onprogress=function(e){e.total>0&&t.onProgress.call(n,e.loaded,e.total)}}catch(t){}if(t.onAbort)try{a.onabort=function(e){i.stopFlag&&t.onAbort.call(n,a.status)}}catch(t){}if(t.onError)try{a.onerror=function(e){t.onError.call(n)}}catch(t){}a.onreadystatechange=function(e){if(4===a.readyState&&(clearTimeout(r),a.status>=200&&a.status<300||304==a.status?(i.result=null==i.handleData?a.responseText:i.handleData(a.responseText),t.onSuccess&&t.onSuccess.call(n,i.result)):i.stopFlag||i.timeoutFlag||t.onFail&&t.onFail.call(n,a.status)),0===a.readyState)var r=setTimeout(function(){i.timeoutFlag=!0,i.async&&i.timeoutFlag&&(a.abort(),t.onTimeOut&&t.onTimeOut.call(n))},i.timeOut)},"post"==i.type?a.open(i.type,t.url,i.async):"get"==i.type&&(t.data?a.open(i.type,t.url+"?"+r,i.async):a.open(i.type,t.url,i.async)),"json"==i.dataType&&a.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),"get"==i.type?a.send(null):a.send(r)}},stop:function(e){this[e].xhr&&!t(this[e].xhr)&&(this[e].stopFlag=!0,this[e].xhr.abort())},parse:function(t,n,r){var o,i,a;switch((void 0===t?"undefined":e(t)).toLowerCase()){case"string":"json"===r.toLowerCase()&&(o=JSON.parse(t));break;case"object":if("[object Array]"===Object.prototype.toString.call(r)){for(i=0,a=r.length;i<a;i++)if(r[i][2])"[object Array]"===Object.prototype.toString.call(r[i][0])&&(n[r[i][1]]=r[i][2](t[r[i][0]])),n[r[i][1]]=r[i][2](t[r[i][0]]);else{if("[object Array]"===Object.prototype.toString.call(r[i][0]))throw new Error("输入的数据不能是数组,除非有处理函数");n[r[i][1]]=t[r[i][0]]}o=n}else"function"==typeof r&&(o=r(t));break;default:o=t}return o}}}();"object"==e(t)&&(t.exports={ajaxExpanding:n})}).call(e,n(17)(t))},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){"use strict";var r=n(44),o=r.a.Symbol;e.a=o},function(t,e,n){t.exports=n(46)()},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}function c(){}function s(t,e){var n={run:function(r){try{var o=t(e.getState(),r);(o!==n.props||n.error)&&(n.shouldComponentUpdate=!0,n.props=o,n.error=null)}catch(t){n.shouldComponentUpdate=!0,n.error=t}}};return n}function u(t){var e,u,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},f=l.getDisplayName,w=void 0===f?function(t){return"ConnectAdvanced("+t+")"}:f,O=l.methodName,S=void 0===O?"connectAdvanced":O,x=l.renderCountProp,j=void 0===x?void 0:x,C=l.shouldHandleStateChanges,E=void 0===C||C,P=l.storeKey,_=void 0===P?"store":P,k=l.withRef,N=void 0!==k&&k,T=a(l,["getDisplayName","methodName","renderCountProp","shouldHandleStateChanges","storeKey","withRef"]),I=_+"Subscription",M=m++,D=(e={},e[_]=v.a,e[I]=v.b,e),R=(u={},u[I]=v.b,u);return function(e){d()("function"==typeof e,"You must pass a component to the function returned by connect. Instead received "+JSON.stringify(e));var a=e.displayName||e.name||"Component",u=w(a),l=b({},T,{getDisplayName:w,methodName:S,renderCountProp:j,shouldHandleStateChanges:E,storeKey:_,withRef:N,displayName:u,wrappedComponentName:a,WrappedComponent:e}),f=function(a){function p(t,e){r(this,p);var n=o(this,a.call(this,t,e));return n.version=M,n.state={},n.renderCount=0,n.store=t[_]||e[_],n.propsMode=Boolean(t[_]),n.setWrappedInstance=n.setWrappedInstance.bind(n),d()(n.store,'Could not find "'+_+'" in either the context or props of "'+u+'". Either wrap the root component in a <Provider>, or explicitly pass "'+_+'" as a prop to "'+u+'".'),n.initSelector(),n.initSubscription(),n}return i(p,a),p.prototype.getChildContext=function(){var t,e=this.propsMode?null:this.subscription;return t={},t[I]=e||this.context[I],t},p.prototype.componentDidMount=function(){E&&(this.subscription.trySubscribe(),this.selector.run(this.props),this.selector.shouldComponentUpdate&&this.forceUpdate())},p.prototype.componentWillReceiveProps=function(t){this.selector.run(t)},p.prototype.shouldComponentUpdate=function(){return this.selector.shouldComponentUpdate},p.prototype.componentWillUnmount=function(){this.subscription&&this.subscription.tryUnsubscribe(),this.subscription=null,this.notifyNestedSubs=c,this.store=null,this.selector.run=c,this.selector.shouldComponentUpdate=!1},p.prototype.getWrappedInstance=function(){return d()(N,"To access the wrapped instance, you need to specify { withRef: true } in the options argument of the "+S+"() call."),this.wrappedInstance},p.prototype.setWrappedInstance=function(t){this.wrappedInstance=t},p.prototype.initSelector=function(){var e=t(this.store.dispatch,l);this.selector=s(e,this.store),this.selector.run(this.props)},p.prototype.initSubscription=function(){if(E){var t=(this.propsMode?this.props:this.context)[I];this.subscription=new y.a(this.store,t,this.onStateChange.bind(this)),this.notifyNestedSubs=this.subscription.notifyNestedSubs.bind(this.subscription)}},p.prototype.onStateChange=function(){this.selector.run(this.props),this.selector.shouldComponentUpdate?(this.componentDidUpdate=this.notifyNestedSubsOnComponentDidUpdate,this.setState(g)):this.notifyNestedSubs()},p.prototype.notifyNestedSubsOnComponentDidUpdate=function(){this.componentDidUpdate=void 0,this.notifyNestedSubs()},p.prototype.isSubscribed=function(){return Boolean(this.subscription)&&this.subscription.isSubscribed()},p.prototype.addExtraProps=function(t){if(!(N||j||this.propsMode&&this.subscription))return t;var e=b({},t);return N&&(e.ref=this.setWrappedInstance),j&&(e[j]=this.renderCount++),this.propsMode&&this.subscription&&(e[I]=this.subscription),e},p.prototype.render=function(){var t=this.selector;if(t.shouldComponentUpdate=!1,t.error)throw t.error;return n.i(h.createElement)(e,this.addExtraProps(t.props))},p}(h.Component);return f.WrappedComponent=e,f.displayName=u,f.childContextTypes=R,f.contextTypes=D,f.propTypes=D,p()(f,e)}}e.a=u;var l=n(36),p=n.n(l),f=n(37),d=n.n(f),h=n(5),y=(n.n(h),n(59)),v=n(22),b=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},m=0,g={}},function(t,e,n){"use strict";function r(t){return function(e,n){function r(){return o}var o=t(e,n);return r.dependsOnOwnProps=!1,r}}function o(t){return null!==t.dependsOnOwnProps&&void 0!==t.dependsOnOwnProps?Boolean(t.dependsOnOwnProps):1!==t.length}function i(t,e){return function(e,n){var r=(n.displayName,function(t,e){return r.dependsOnOwnProps?r.mapToProps(t,e):r.mapToProps(t)});return r.dependsOnOwnProps=!0,r.mapToProps=function(e,n){r.mapToProps=t,r.dependsOnOwnProps=o(t);var i=r(e,n);return"function"==typeof i&&(r.mapToProps=i,r.dependsOnOwnProps=o(i),i=r(e,n)),i},r}}e.b=r,e.a=i;n(23)},function(t,e,n){"use strict";n.d(e,"b",function(){return i}),n.d(e,"a",function(){return a});var r=n(19),o=n.n(r),i=o.a.shape({trySubscribe:o.a.func.isRequired,tryUnsubscribe:o.a.func.isRequired,notifyNestedSubs:o.a.func.isRequired,isSubscribed:o.a.func.isRequired}),a=o.a.shape({subscribe:o.a.func.isRequired,dispatch:o.a.func.isRequired,getState:o.a.func.isRequired})},function(t,e,n){"use strict";n(8),n(10)},function(t,e,n){"use strict";function r(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];if(0===e.length)return function(t){return t};if(1===e.length)return e[0];var r=e[e.length-1],o=e.slice(0,-1);return function(){return o.reduceRight(function(t,e){return e(t)},r.apply(void 0,arguments))}}e.a=r},function(t,e,n){"use strict";function r(t,e,i){function s(){m===b&&(m=b.slice())}function u(){return v}function l(t){if("function"!=typeof t)throw new Error("Expected listener to be a function.");var e=!0;return s(),m.push(t),function(){if(e){e=!1,s();var n=m.indexOf(t);m.splice(n,1)}}}function p(t){if(!n.i(o.a)(t))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===t.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(g)throw new Error("Reducers may not dispatch actions.");try{g=!0,v=y(v,t)}finally{g=!1}for(var e=b=m,r=0;r<e.length;r++)e[r]();return t}function f(t){if("function"!=typeof t)throw new Error("Expected the nextReducer to be a function.");y=t,p({type:c.INIT})}function d(){var t,e=l;return t={subscribe:function(t){function n(){t.next&&t.next(u())}if("object"!=typeof t)throw new TypeError("Expected the observer to be an object.");return n(),{unsubscribe:e(n)}}},t[a.a]=function(){return this},t}var h;if("function"==typeof e&&void 0===i&&(i=e,e=void 0),void 0!==i){if("function"!=typeof i)throw new Error("Expected the enhancer to be a function.");return i(r)(t,e)}if("function"!=typeof t)throw new Error("Expected the reducer to be a function.");var y=t,v=e,b=[],m=b,g=!1;return p({type:c.INIT}),h={dispatch:p,subscribe:l,getState:u,replaceReducer:f},h[a.a]=d,h}n.d(e,"b",function(){return c}),e.a=r;var o=n(8),i=n(64),a=n.n(i),c={INIT:"@@redux/INIT"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(25),o=n(63),i=n(62),a=n(61),c=n(24);n(27);n.d(e,"createStore",function(){return r.a}),n.d(e,"combineReducers",function(){return o.a}),n.d(e,"bindActionCreators",function(){return i.a}),n.d(e,"applyMiddleware",function(){return a.a}),n.d(e,"compose",function(){return c.a})},function(t,e,n){"use strict"},,,,,,,,,function(t,e,n){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,arguments:!0,arity:!0},i="function"==typeof Object.getOwnPropertySymbols;t.exports=function(t,e,n){if("string"!=typeof e){var a=Object.getOwnPropertyNames(e);i&&(a=a.concat(Object.getOwnPropertySymbols(e)));for(var c=0;c<a.length;++c)if(!(r[a[c]]||o[a[c]]||n&&n[a[c]]))try{t[a[c]]=e[a[c]]}catch(t){}}return t}},function(t,e,n){"use strict";var r=function(t,e,n,r,o,i,a,c){if(!t){var s;if(void 0===e)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,r,o,i,a,c],l=0;s=new Error(e.replace(/%s/g,function(){return u[l++]})),s.name="Invariant Violation"}throw s.framesToPop=1,s}};t.exports=r},function(t,e,n){"use strict";function r(t){return null==t?void 0===t?s:c:u&&u in Object(t)?n.i(i.a)(t):n.i(a.a)(t)}var o=n(18),i=n(41),a=n(42),c="[object Null]",s="[object Undefined]",u=o.a?o.a.toStringTag:void 0;e.a=r},function(t,e,n){"use strict";(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.a=n}).call(e,n(16))},function(t,e,n){"use strict";var r=n(43),o=n.i(r.a)(Object.getPrototypeOf,Object);e.a=o},function(t,e,n){"use strict";function r(t){var e=a.call(t,s),n=t[s];try{t[s]=void 0;var r=!0}catch(t){}var o=c.call(t);return r&&(e?t[s]=n:delete t[s]),o}var o=n(18),i=Object.prototype,a=i.hasOwnProperty,c=i.toString,s=o.a?o.a.toStringTag:void 0;e.a=r},function(t,e,n){"use strict";function r(t){return i.call(t)}var o=Object.prototype,i=o.toString;e.a=r},function(t,e,n){"use strict";function r(t,e){return function(n){return t(e(n))}}e.a=r},function(t,e,n){"use strict";var r=n(39),o="object"==typeof self&&self&&self.Object===Object&&self,i=r.a||o||Function("return this")();e.a=i},function(t,e,n){"use strict";function r(t){return null!=t&&"object"==typeof t}e.a=r},function(t,e,n){"use strict";var r=n(7),o=n(0),i=n(68);t.exports=function(){function t(t,e,n,r,a,c){c!==i&&o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e};return n.checkPropTypes=r,n.PropTypes=n,n}},,,,,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"store",n=arguments[1],a=n||e+"Subscription",s=function(t){function n(i,a){r(this,n);var c=o(this,t.call(this,i,a));return c[e]=i.store,c}return i(n,t),n.prototype.getChildContext=function(){var t;return t={},t[e]=this[e],t[a]=null,t},n.prototype.render=function(){return c.Children.only(this.props.children)},n}(c.Component);return s.propTypes={store:l.a.isRequired,children:u.a.element.isRequired},s.childContextTypes=(t={},t[e]=l.a.isRequired,t[a]=l.b,t),s.displayName="Provider",s}e.b=a;var c=n(5),s=(n.n(c),n(19)),u=n.n(s),l=n(22);n(10);e.a=a()},function(t,e,n){"use strict";function r(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}function o(t,e,n){for(var r=e.length-1;r>=0;r--){var o=e[r](t);if(o)return o}return function(e,r){throw new Error("Invalid value of type "+typeof t+" for "+n+" argument when connecting component "+r.wrappedComponentName+".")}}function i(t,e){return t===e}var a=n(20),c=n(60),s=n(53),u=n(54),l=n(55),p=n(56),f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.connectHOC,n=void 0===e?a.a:e,d=t.mapStateToPropsFactories,h=void 0===d?u.a:d,y=t.mapDispatchToPropsFactories,v=void 0===y?s.a:y,b=t.mergePropsFactories,m=void 0===b?l.a:b,g=t.selectorFactory,w=void 0===g?p.a:g;return function(t,e,a){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},u=s.pure,l=void 0===u||u,p=s.areStatesEqual,d=void 0===p?i:p,y=s.areOwnPropsEqual,b=void 0===y?c.a:y,g=s.areStatePropsEqual,O=void 0===g?c.a:g,S=s.areMergedPropsEqual,x=void 0===S?c.a:S,j=r(s,["pure","areStatesEqual","areOwnPropsEqual","areStatePropsEqual","areMergedPropsEqual"]),C=o(t,h,"mapStateToProps"),E=o(e,v,"mapDispatchToProps"),P=o(a,m,"mergeProps");return n(w,f({methodName:"connect",getDisplayName:function(t){return"Connect("+t+")"},shouldHandleStateChanges:Boolean(t),initMapStateToProps:C,initMapDispatchToProps:E,initMergeProps:P,pure:l,areStatesEqual:d,areOwnPropsEqual:b,areStatePropsEqual:O,areMergedPropsEqual:x},j))}}()},function(t,e,n){"use strict";function r(t){return"function"==typeof t?n.i(c.a)(t,"mapDispatchToProps"):void 0}function o(t){return t?void 0:n.i(c.b)(function(t){return{dispatch:t}})}function i(t){return t&&"object"==typeof t?n.i(c.b)(function(e){return n.i(a.bindActionCreators)(t,e)}):void 0}var a=n(26),c=n(21);e.a=[r,o,i]},function(t,e,n){"use strict";function r(t){return"function"==typeof t?n.i(i.a)(t,"mapStateToProps"):void 0}function o(t){return t?void 0:n.i(i.b)(function(){return{}})}var i=n(21);e.a=[r,o]},function(t,e,n){"use strict";function r(t,e,n){return c({},n,t,e)}function o(t){return function(e,n){var r=(n.displayName,n.pure),o=n.areMergedPropsEqual,i=!1,a=void 0;return function(e,n,c){var s=t(e,n,c);return i?r&&o(s,a)||(a=s):(i=!0,a=s),a}}}function i(t){return"function"==typeof t?o(t):void 0}function a(t){return t?void 0:function(){return r}}var c=(n(23),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t});e.a=[i,a]},function(t,e,n){"use strict";function r(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}function o(t,e,n,r){return function(o,i){return n(t(o,i),e(r,i),i)}}function i(t,e,n,r,o){function i(o,i){return h=o,y=i,v=t(h,y),b=e(r,y),m=n(v,b,y),d=!0,m}function a(){return v=t(h,y),e.dependsOnOwnProps&&(b=e(r,y)),m=n(v,b,y)}function c(){return t.dependsOnOwnProps&&(v=t(h,y)),e.dependsOnOwnProps&&(b=e(r,y)),m=n(v,b,y)}function s(){var e=t(h,y),r=!f(e,v);return v=e,r&&(m=n(v,b,y)),m}function u(t,e){var n=!p(e,y),r=!l(t,h);return h=t,y=e,n&&r?a():n?c():r?s():m}var l=o.areStatesEqual,p=o.areOwnPropsEqual,f=o.areStatePropsEqual,d=!1,h=void 0,y=void 0,v=void 0,b=void 0,m=void 0;return function(t,e){return d?u(t,e):i(t,e)}}function a(t,e){var n=e.initMapStateToProps,a=e.initMapDispatchToProps,c=e.initMergeProps,s=r(e,["initMapStateToProps","initMapDispatchToProps","initMergeProps"]),u=n(t,s),l=a(t,s),p=c(t,s);return(s.pure?i:o)(u,l,p,t,s)}e.a=a;n(57)},function(t,e,n){"use strict";n(10)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(51),o=n(20),i=n(52);n.d(e,"Provider",function(){return r.a}),n.d(e,"createProvider",function(){return r.b}),n.d(e,"connectAdvanced",function(){return o.a}),n.d(e,"connect",function(){return i.a})},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(){var t=[],e=[];return{clear:function(){e=i,t=i},notify:function(){for(var n=t=e,r=0;r<n.length;r++)n[r]()},subscribe:function(n){var r=!0;return e===t&&(e=t.slice()),e.push(n),function(){r&&t!==i&&(r=!1,e===t&&(e=t.slice()),e.splice(e.indexOf(n),1))}}}}n.d(e,"a",function(){return c});var i=null,a={notify:function(){}},c=function(){function t(e,n,o){r(this,t),this.store=e,this.parentSub=n,this.onStateChange=o,this.unsubscribe=null,this.listeners=a}return t.prototype.addNestedSub=function(t){return this.trySubscribe(),this.listeners.subscribe(t)},t.prototype.notifyNestedSubs=function(){this.listeners.notify()},t.prototype.isSubscribed=function(){return Boolean(this.unsubscribe)},t.prototype.trySubscribe=function(){this.unsubscribe||(this.unsubscribe=this.parentSub?this.parentSub.addNestedSub(this.onStateChange):this.store.subscribe(this.onStateChange),this.listeners=o())},t.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.listeners.clear(),this.listeners=a)},t}()},function(t,e,n){"use strict";function r(t,e){return t===e?0!==t||0!==e||1/t==1/e:t!==t&&e!==e}function o(t,e){if(r(t,e))return!0;if("object"!=typeof t||null===t||"object"!=typeof e||null===e)return!1;var n=Object.keys(t),o=Object.keys(e);if(n.length!==o.length)return!1;for(var a=0;a<n.length;a++)if(!i.call(e,n[a])||!r(t[n[a]],e[n[a]]))return!1;return!0}e.a=o;var i=Object.prototype.hasOwnProperty},function(t,e,n){"use strict";function r(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return function(n,r,a){var c=t(n,r,a),s=c.dispatch,u=[],l={getState:c.getState,dispatch:function(t){return s(t)}};return u=e.map(function(t){return t(l)}),s=o.a.apply(void 0,u)(c.dispatch),i({},c,{dispatch:s})}}}e.a=r;var o=n(24),i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}},function(t,e,n){"use strict";function r(t,e){return function(){return e(t.apply(void 0,arguments))}}function o(t,e){if("function"==typeof t)return r(t,e);if("object"!=typeof t||null===t)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===t?"null":typeof t)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var n=Object.keys(t),o={},i=0;i<n.length;i++){var a=n[i],c=t[a];"function"==typeof c&&(o[a]=r(c,e))}return o}e.a=o},function(t,e,n){"use strict";function r(t,e){var n=e&&e.type;return"Given action "+(n&&'"'+n.toString()+'"'||"an action")+', reducer "'+t+'" returned undefined. To ignore an action, you must explicitly return the previous state.'}function o(t){Object.keys(t).forEach(function(e){var n=t[e];if(void 0===n(void 0,{type:a.b.INIT}))throw new Error('Reducer "'+e+'" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');if(void 0===n(void 0,{type:"@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".")}))throw new Error('Reducer "'+e+"\" returned undefined when probed with a random type. Don't try to handle "+a.b.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.')})}function i(t){for(var e=Object.keys(t),n={},i=0;i<e.length;i++){var a=e[i];"function"==typeof t[a]&&(n[a]=t[a])}var c,s=Object.keys(n);try{o(n)}catch(t){c=t}return function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=arguments[1];if(c)throw c;for(var o=!1,i={},a=0;a<s.length;a++){var u=s[a],l=n[u],p=t[u],f=l(p,e);if(void 0===f){var d=r(u,e);throw new Error(d)}i[u]=f,o=o||f!==p}return o?i:t}}e.a=i;var a=n(25);n(8),n(27)},function(t,e,n){t.exports=n(65)},function(t,e,n){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0});var o,i=n(66),a=function(t){return t&&t.__esModule?t:{default:t}}(i);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:r;var c=(0,a.default)(o);e.default=c}).call(e,n(16),n(17)(t))},function(t,e,n){"use strict";function r(t){var e,n=t.Symbol;return"function"==typeof n?n.observable?e=n.observable:(e=n("observable"),n.observable=e):e="@@observable",e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(){O=setInterval(function(){w.dispatch({type:"changIndex",changIndexType:1})},3e3)}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{items:[],index:0},e=arguments[1];switch(e.type){case"getNavListItems":return Object.assign({},t,{items:e.items,index:e.index,showLen:e.showLen,callback:e.callback,isOn:!1});case"scrollChange":return Object.assign({},t,{showLen:e.showLen});case"clickItem":return Object.assign({},t,{index:e.index});case"clickBtn":return Object.assign({},t,{isOn:!t.isOn});default:return t}}function a(t,e){switch(void 0===t&&(t={index:0,width:1180,time:3e3,setIntervalTime:2e3,items:[]}),e.type){case"getCarouselItems":return o(),Object.assign({},t,{items:e.items,width:e.width,height:e.height,index:0});case"changIndex":var n=void 0,r=e.changIndexType;return r?(n=(t.index+r)%t.items.length)<0&&(n=t.items.length-1):n=e.index,Object.assign({},t,{index:n});case"scrollChange":return Object.assign({},t,{width:e.width,height:e.height});case"getStartXY":return Object.assign({},t,{startX:e.x,startY:e.y});case"touchChangeIndex":var i=(0,h.getTouchDirection)(t.startX,t.startY,e.x,e.y),a=0,c=void 0;return 2==i?a=-1:-2==i&&(a=1),c=(t.index+a)%t.items.length,c<0&&(c=t.items.length-1),Object.assign({},t,{index:c});default:return t}}function c(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{value:""},e=arguments[1];switch(e.type){case"inputValue":return Object.assign({},t,{value:e.value});case"submit":var n=t.value;if(S){var r=localStorage.getItem("searchHistory")||"";""===r?r=n:r+="&"+n,localStorage.setItem("searchHistory",r)}return window.location.href="search.html?searchContent="+encodeURI(n),t;case"showMobileSearch":window.location.href="searchMobile.html";break;default:return t}}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cards:[]},e=arguments[1];switch(e.type){case"getCardInf":var n=t.cards;return n.push(e.card),Object.assign({},t,{cards:n});default:return t}}function u(t){return{NavListState:t.NavList,CarouselState:t.Carousel,CardsState:t.Cards,searchState:t.search}}function l(t){return{NavListDispatch:{clickBtn:function(){t({type:"clickBtn"})}},CarouseDispatch:{clickLast:function(){clearInterval(O),t({type:"changIndex",changIndexType:-1})},clickNext:function(){clearInterval(O),t({type:"changIndex",changIndexType:1})},clickNav:function(e){var n=e.target,r=parseInt(n.getAttribute("data-index"));clearInterval(O),t({type:"changIndex",index:r})},touchStart:function(e){var n=e.touches[0];t({type:"getStartXY",x:n.pageX,y:n.pageY}),clearInterval(O)},touchEnd:function(e){var n=e.changedTouches[0];return n.pageX,n.pageY,t({type:"touchChangeIndex",x:n.pageX,y:n.pageY}),clearInterval(O),o(),!1},mouseOut:function(t){clearInterval(O),o()},mouseOver:function(t){clearInterval(O)}},topDisPatch:{search:function(){var e=h.config.isMobile;t(e?{type:"showMobileSearch"}:{type:"submit"})},input:function(e){var n=e.target.value;t({type:"inputValue",value:n})}}}}var p=n(26),f=n(58),d=n(128),h=n(12),y=n(67),v=r(y),b=n(5),m=r(b),g=(0,p.combineReducers)({NavList:i,Carousel:a,Cards:s,search:c}),w=(0,p.createStore)(g),O=null,S=!!window.localStorage,x=(0,f.connect)(u,l)(d.Blue_Container);v.default.render(m.default.createElement(f.Provider,{store:w},m.default.createElement(x,null)),document.getElementById("container")),t.exports=w},,,function(t,e,n){"use strict";function r(){clearTimeout(y),y=setTimeout(function(){v=(0,u.getScreenSize)().width,p.default.dispatch(o("scrollChange",{showLen:v>768?10:4,width:v>768?1180:v,height:v>768?582.625:.49375*v}))},300)}function o(t,e){var n=e||{};return n.type=t,n}function i(t,e){switch(t){case"轮播图":a(e);break;default:c(e)}}function a(t){var e=void 0,n=[],r=t.video_list,i=r.length;for(e=0;e<i;e++)n.push({src:"#",img:r[e].img,title:r[e].short_title});p.default.dispatch(o("getCarouselItems",{items:n,width:v<=768?v:1180,height:v>768?582.625:.49375*v}))}function c(t){var e=void 0,n=[],r={},i=t.title,a=t.channel_id,c=t.video_list,s=c.length;for(e=0;e<s;e++)n.push({src:"#",img:c[e].img,title:c[e].short_title});r.id=a,r.title=i,r.items=n,p.default.dispatch(o("getCardInf",{card:r}))}var s=n(15),u=n(12),l=n(121),p=function(t){return t&&t.__esModule?t:{default:t}}(l),f=window,d=u.config.host,h=u.config.publicData,y=void 0,v=(0,u.getScreenSize)().width;s.ajaxExpanding.init({name:"getNavList",dataType:"json",type:"get",async:!0,handleData:function(t){return JSON.parse(t)}}),s.ajaxExpanding.init({name:"getCarousel",dataType:"json",type:"get",async:!0,handleData:function(t){return JSON.parse(t)}}),function(){function t(t,e){window.location.href="pagination.html?type="+t.id}var e=d+"/openapi/realtime/channel",n=h;n.type="list",n.version=7.5,s.ajaxExpanding.send({url:e,data:n,onSuccess:function(e){var n,r,i=e.data,a=[];for(n=0,r=i.length;n<r;n++)a.push({name:i[n].name,id:i[n].id});p.default.dispatch(o("getNavListItems",{items:a,index:-1,callback:t,showLen:v>768?10:4}))}},"getNavList"),f.addEventListener("resize",r,!1),f.addEventListener("pageshow",r,!1)}(),function(){var t=d+"/openapi/realtime/recommend",e=h;s.ajaxExpanding.send({url:t,data:e,onSuccess:function(t){var e=void 0,n=void 0,r=(t.code,t.data);for(e=0,n=r.length;e<n;e++)i(r[e].title,r[e])}},"getCarousel")}()},,,,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=n(5),u=function(t){return t&&t.__esModule?t:{default:t}}(s),l=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n._clickBtn=n._clickBtn.bind(n),n}return i(e,t),c(e,[{key:"_click",value:function(t,e){var n=this;return function(){n.props.callback(t,e)}}},{key:"_createList",value:function(t,e){var n=void 0,r=void 0,o=[];for(n=0,r=t.length;n<r;n++)o.push(u.default.createElement("a",{onClick:this._click(t[n],n),key:n,className:e===n?"on":"off"},t[n].name));return o}},{key:"_clickBtn",value:function(){this.props.clickBtn({type:"clickBtn"})}},{key:"render",value:function(){var t=this.props,e=t.items,n=t.index,r=t.callback,o=t.isOn,i=t.showLen,a=e.length;return u.default.createElement("nav",{className:"Blue_NavList"},u.default.createElement("div",{className:"list maxWarp",style:{height:o?20*Math.ceil(a/i)+"px":"40px"}},this._createList(e,n,r)),u.default.createElement("div",{className:"dropBox"},u.default.createElement("button",{onClick:this._clickBtn,className:o?"on":"off"})))}}]),e}(u.default.Component),p=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),c(e,[{key:"render",value:function(){var t=[],e=[],n=void 0,r=this.props,o=r.items,i=r.width,a=(r.CarouseDispatch,r.index),c=r.clickLast,s=r.clickNext,l=r.clickNav,p=r.touchStart,f=r.touchEnd,d=r.mouseOut,h=r.mouseOver,y=r.height,v=o.length;for(n=0;n<v;n++)t.push(u.default.createElement("li",{key:n,style:{width:i+"px"}},u.default.createElement("img",{src:o[n].img}),u.default.createElement("span",null,o[n].title))),e.push(u.default.createElement("li",{"data-index":n,key:n,onClick:l,className:n==a?"on":"off"}));return u.default.createElement("div",{onMouseOut:d,onMouseOver:h,onTouchStart:p,onTouchEnd:f,style:{height:y+"px"},className:"BluMUI_Carousel "},u.default.createElement("ul",{className:"body",style:{left:-1*a*i+"px",width:v*i+"px"}},t),u.default.createElement("div",{className:"nav"},u.default.createElement("ul",{className:"control"},i>768?u.default.createElement("button",{onClick:c,className:"last"}):void 0,u.default.createElement("ul",{className:"showNav"},e),i>768?u.default.createElement("button",{onClick:s,className:"next"}):void 0)))}}]),e}(u.default.Component),f=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),c(e,[{key:"_createItems",value:function(t){var e=void 0,n=void 0,r=[];for(e=0,n=t.length;e<n;e++)r.push(u.default.createElement("div",{key:e,className:"card"},u.default.createElement("img",{src:t[e].img}),u.default.createElement("span",null,t[e].title)));return r}},{key:"render",value:function(){var t=this.props.card;return u.default.createElement("section",{className:"Blue_CardBox"},u.default.createElement("header",{className:"header"},u.default.createElement("span",{className:"title",style:{backgroundImage:"url(../resource/images/title-"+t.id+".png)"}},t.title),u.default.createElement("span",{className:"more"},"更多")),u.default.createElement("div",{className:"cardWarp"},this._createItems(t.items)))}}]),e}(u.default.Component),d=function(t){function e(t){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}return i(e,t),c(e,[{key:"render",value:function(){var t=this.props,e=t.search,n=t.input;return u.default.createElement("div",{className:"Blue_Top"},u.default.createElement("div",{className:"maxWarp"},u.default.createElement("div",{className:"search"},u.default.createElement("input",{placeholder:"请输入你想搜索的内容",onInput:n}),u.default.createElement("button",{onClick:e}))))}}]),e}(u.default.Component),h=function(t){function e(t){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}return i(e,t),c(e,[{key:"render",value:function(){var t=this.props,e=t.CarouseDispatch,n=t.NavListDispatch,r=t.topDisPatch,o=t.NavListState,i=t.CarouselState,c=t.CardsState;return u.default.createElement("div",{className:"Blue_Container"},u.default.createElement("header",null,u.default.createElement(d,r),u.default.createElement(l,a({},o,n))),u.default.createElement(p,a({},i,e)),u.default.createElement("div",{id:"body"},c.cards.map(function(t,e){return u.default.createElement(f,{card:t,key:e})})),u.default.createElement("footer",null,"蓝山工作室15级前端组制作"))}}]),e}(u.default.Component);t.exports={Blue_Container:h}}],[124]);