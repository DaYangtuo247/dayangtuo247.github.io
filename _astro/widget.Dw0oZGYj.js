/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */function Fn(n){return typeof n>"u"||n===null}function ge(n){return typeof n=="object"&&n!==null}function xe(n){return Array.isArray(n)?n:Fn(n)?[]:[n]}function ve(n,e){var i,l,r,t;if(e)for(t=Object.keys(e),i=0,l=t.length;i<l;i+=1)r=t[i],n[r]=e[r];return n}function Ae(n,e){var i="",l;for(l=0;l<e;l+=1)i+=n;return i}function ye(n){return n===0&&Number.NEGATIVE_INFINITY===1/n}var be=Fn,Ce=ge,we=xe,_e=Ae,Se=ye,Ee=ve,y={isNothing:be,isObject:Ce,toArray:we,repeat:_e,isNegativeZero:Se,extend:Ee};function Tn(n,e){var i="",l=n.reason||"(unknown reason)";return n.mark?(n.mark.name&&(i+='in "'+n.mark.name+'" '),i+="("+(n.mark.line+1)+":"+(n.mark.column+1)+")",!e&&n.mark.snippet&&(i+=`

`+n.mark.snippet),l+" "+i):l}function j(n,e){Error.call(this),this.name="YAMLException",this.reason=n,this.mark=e,this.message=Tn(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}j.prototype=Object.create(Error.prototype);j.prototype.constructor=j;j.prototype.toString=function(e){return this.name+": "+Tn(this,e)};var _=j;function V(n,e,i,l,r){var t="",o="",u=Math.floor(r/2)-1;return l-e>u&&(t=" ... ",e=l-u+t.length),i-l>u&&(o=" ...",i=l+u-o.length),{str:t+n.slice(e,i).replace(/\t/g,"→")+o,pos:l-e+t.length}}function X(n,e){return y.repeat(" ",e-n.length)+n}function Fe(n,e){if(e=Object.create(e||null),!n.buffer)return null;e.maxLength||(e.maxLength=79),typeof e.indent!="number"&&(e.indent=1),typeof e.linesBefore!="number"&&(e.linesBefore=3),typeof e.linesAfter!="number"&&(e.linesAfter=2);for(var i=/\r?\n|\r|\0/g,l=[0],r=[],t,o=-1;t=i.exec(n.buffer);)r.push(t.index),l.push(t.index+t[0].length),n.position<=t.index&&o<0&&(o=l.length-2);o<0&&(o=l.length-1);var u="",c,a,p=Math.min(n.line+e.linesAfter,r.length).toString().length,f=e.maxLength-(e.indent+p+3);for(c=1;c<=e.linesBefore&&!(o-c<0);c++)a=V(n.buffer,l[o-c],r[o-c],n.position-(l[o]-l[o-c]),f),u=y.repeat(" ",e.indent)+X((n.line-c+1).toString(),p)+" | "+a.str+`
`+u;for(a=V(n.buffer,l[o],r[o],n.position,f),u+=y.repeat(" ",e.indent)+X((n.line+1).toString(),p)+" | "+a.str+`
`,u+=y.repeat("-",e.indent+p+3+a.pos)+`^
`,c=1;c<=e.linesAfter&&!(o+c>=r.length);c++)a=V(n.buffer,l[o+c],r[o+c],n.position-(l[o]-l[o+c]),f),u+=y.repeat(" ",e.indent)+X((n.line+c+1).toString(),p)+" | "+a.str+`
`;return u.replace(/\n$/,"")}var Te=Fe,ke=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],Oe=["scalar","sequence","mapping"];function Ie(n){var e={};return n!==null&&Object.keys(n).forEach(function(i){n[i].forEach(function(l){e[String(l)]=i})}),e}function Le(n,e){if(e=e||{},Object.keys(e).forEach(function(i){if(ke.indexOf(i)===-1)throw new _('Unknown option "'+i+'" is met in definition of "'+n+'" YAML type.')}),this.options=e,this.tag=n,this.kind=e.kind||null,this.resolve=e.resolve||function(){return!0},this.construct=e.construct||function(i){return i},this.instanceOf=e.instanceOf||null,this.predicate=e.predicate||null,this.represent=e.represent||null,this.representName=e.representName||null,this.defaultStyle=e.defaultStyle||null,this.multi=e.multi||!1,this.styleAliases=Ie(e.styleAliases||null),Oe.indexOf(this.kind)===-1)throw new _('Unknown kind "'+this.kind+'" is specified for "'+n+'" YAML type.')}var C=Le;function pn(n,e){var i=[];return n[e].forEach(function(l){var r=i.length;i.forEach(function(t,o){t.tag===l.tag&&t.kind===l.kind&&t.multi===l.multi&&(r=o)}),i[r]=l}),i}function Ne(){var n={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},e,i;function l(r){r.multi?(n.multi[r.kind].push(r),n.multi.fallback.push(r)):n[r.kind][r.tag]=n.fallback[r.tag]=r}for(e=0,i=arguments.length;e<i;e+=1)arguments[e].forEach(l);return n}function J(n){return this.extend(n)}J.prototype.extend=function(e){var i=[],l=[];if(e instanceof C)l.push(e);else if(Array.isArray(e))l=l.concat(e);else if(e&&(Array.isArray(e.implicit)||Array.isArray(e.explicit)))e.implicit&&(i=i.concat(e.implicit)),e.explicit&&(l=l.concat(e.explicit));else throw new _("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");i.forEach(function(t){if(!(t instanceof C))throw new _("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(t.loadKind&&t.loadKind!=="scalar")throw new _("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(t.multi)throw new _("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),l.forEach(function(t){if(!(t instanceof C))throw new _("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var r=Object.create(J.prototype);return r.implicit=(this.implicit||[]).concat(i),r.explicit=(this.explicit||[]).concat(l),r.compiledImplicit=pn(r,"implicit"),r.compiledExplicit=pn(r,"explicit"),r.compiledTypeMap=Ne(r.compiledImplicit,r.compiledExplicit),r};var kn=J,On=new C("tag:yaml.org,2002:str",{kind:"scalar",construct:function(n){return n!==null?n:""}}),In=new C("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return n!==null?n:[]}}),Ln=new C("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return n!==null?n:{}}}),Nn=new kn({explicit:[On,In,Ln]});function Re(n){if(n===null)return!0;var e=n.length;return e===1&&n==="~"||e===4&&(n==="null"||n==="Null"||n==="NULL")}function De(){return null}function Me(n){return n===null}var Rn=new C("tag:yaml.org,2002:null",{kind:"scalar",resolve:Re,construct:De,predicate:Me,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function Be(n){if(n===null)return!1;var e=n.length;return e===4&&(n==="true"||n==="True"||n==="TRUE")||e===5&&(n==="false"||n==="False"||n==="FALSE")}function Ye(n){return n==="true"||n==="True"||n==="TRUE"}function He(n){return Object.prototype.toString.call(n)==="[object Boolean]"}var Dn=new C("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Be,construct:Ye,predicate:He,represent:{lowercase:function(n){return n?"true":"false"},uppercase:function(n){return n?"TRUE":"FALSE"},camelcase:function(n){return n?"True":"False"}},defaultStyle:"lowercase"});function je(n){return 48<=n&&n<=57||65<=n&&n<=70||97<=n&&n<=102}function Ue(n){return 48<=n&&n<=55}function Pe(n){return 48<=n&&n<=57}function $e(n){if(n===null)return!1;var e=n.length,i=0,l=!1,r;if(!e)return!1;if(r=n[i],(r==="-"||r==="+")&&(r=n[++i]),r==="0"){if(i+1===e)return!0;if(r=n[++i],r==="b"){for(i++;i<e;i++)if(r=n[i],r!=="_"){if(r!=="0"&&r!=="1")return!1;l=!0}return l&&r!=="_"}if(r==="x"){for(i++;i<e;i++)if(r=n[i],r!=="_"){if(!je(n.charCodeAt(i)))return!1;l=!0}return l&&r!=="_"}if(r==="o"){for(i++;i<e;i++)if(r=n[i],r!=="_"){if(!Ue(n.charCodeAt(i)))return!1;l=!0}return l&&r!=="_"}}if(r==="_")return!1;for(;i<e;i++)if(r=n[i],r!=="_"){if(!Pe(n.charCodeAt(i)))return!1;l=!0}return!(!l||r==="_")}function We(n){var e=n,i=1,l;if(e.indexOf("_")!==-1&&(e=e.replace(/_/g,"")),l=e[0],(l==="-"||l==="+")&&(l==="-"&&(i=-1),e=e.slice(1),l=e[0]),e==="0")return 0;if(l==="0"){if(e[1]==="b")return i*parseInt(e.slice(2),2);if(e[1]==="x")return i*parseInt(e.slice(2),16);if(e[1]==="o")return i*parseInt(e.slice(2),8)}return i*parseInt(e,10)}function qe(n){return Object.prototype.toString.call(n)==="[object Number]"&&n%1===0&&!y.isNegativeZero(n)}var Mn=new C("tag:yaml.org,2002:int",{kind:"scalar",resolve:$e,construct:We,predicate:qe,represent:{binary:function(n){return n>=0?"0b"+n.toString(2):"-0b"+n.toString(2).slice(1)},octal:function(n){return n>=0?"0o"+n.toString(8):"-0o"+n.toString(8).slice(1)},decimal:function(n){return n.toString(10)},hexadecimal:function(n){return n>=0?"0x"+n.toString(16).toUpperCase():"-0x"+n.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Ke=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Ge(n){return!(n===null||!Ke.test(n)||n[n.length-1]==="_")}function ze(n){var e,i;return e=n.replace(/_/g,"").toLowerCase(),i=e[0]==="-"?-1:1,"+-".indexOf(e[0])>=0&&(e=e.slice(1)),e===".inf"?i===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:e===".nan"?NaN:i*parseFloat(e,10)}var Qe=/^[-+]?[0-9]+e/;function Ve(n,e){var i;if(isNaN(n))switch(e){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===n)switch(e){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===n)switch(e){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(y.isNegativeZero(n))return"-0.0";return i=n.toString(10),Qe.test(i)?i.replace("e",".e"):i}function Xe(n){return Object.prototype.toString.call(n)==="[object Number]"&&(n%1!==0||y.isNegativeZero(n))}var Bn=new C("tag:yaml.org,2002:float",{kind:"scalar",resolve:Ge,construct:ze,predicate:Xe,represent:Ve,defaultStyle:"lowercase"}),Yn=Nn.extend({implicit:[Rn,Dn,Mn,Bn]}),Hn=Yn,jn=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Un=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Ze(n){return n===null?!1:jn.exec(n)!==null||Un.exec(n)!==null}function Je(n){var e,i,l,r,t,o,u,c=0,a=null,p,f,d;if(e=jn.exec(n),e===null&&(e=Un.exec(n)),e===null)throw new Error("Date resolve error");if(i=+e[1],l=+e[2]-1,r=+e[3],!e[4])return new Date(Date.UTC(i,l,r));if(t=+e[4],o=+e[5],u=+e[6],e[7]){for(c=e[7].slice(0,3);c.length<3;)c+="0";c=+c}return e[9]&&(p=+e[10],f=+(e[11]||0),a=(p*60+f)*6e4,e[9]==="-"&&(a=-a)),d=new Date(Date.UTC(i,l,r,t,o,u,c)),a&&d.setTime(d.getTime()-a),d}function ni(n){return n.toISOString()}var Pn=new C("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:Ze,construct:Je,instanceOf:Date,represent:ni});function ei(n){return n==="<<"||n===null}var $n=new C("tag:yaml.org,2002:merge",{kind:"scalar",resolve:ei}),on=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function ii(n){if(n===null)return!1;var e,i,l=0,r=n.length,t=on;for(i=0;i<r;i++)if(e=t.indexOf(n.charAt(i)),!(e>64)){if(e<0)return!1;l+=6}return l%8===0}function ri(n){var e,i,l=n.replace(/[\r\n=]/g,""),r=l.length,t=on,o=0,u=[];for(e=0;e<r;e++)e%4===0&&e&&(u.push(o>>16&255),u.push(o>>8&255),u.push(o&255)),o=o<<6|t.indexOf(l.charAt(e));return i=r%4*6,i===0?(u.push(o>>16&255),u.push(o>>8&255),u.push(o&255)):i===18?(u.push(o>>10&255),u.push(o>>2&255)):i===12&&u.push(o>>4&255),new Uint8Array(u)}function li(n){var e="",i=0,l,r,t=n.length,o=on;for(l=0;l<t;l++)l%3===0&&l&&(e+=o[i>>18&63],e+=o[i>>12&63],e+=o[i>>6&63],e+=o[i&63]),i=(i<<8)+n[l];return r=t%3,r===0?(e+=o[i>>18&63],e+=o[i>>12&63],e+=o[i>>6&63],e+=o[i&63]):r===2?(e+=o[i>>10&63],e+=o[i>>4&63],e+=o[i<<2&63],e+=o[64]):r===1&&(e+=o[i>>2&63],e+=o[i<<4&63],e+=o[64],e+=o[64]),e}function oi(n){return Object.prototype.toString.call(n)==="[object Uint8Array]"}var Wn=new C("tag:yaml.org,2002:binary",{kind:"scalar",resolve:ii,construct:ri,predicate:oi,represent:li}),ti=Object.prototype.hasOwnProperty,ui=Object.prototype.toString;function ci(n){if(n===null)return!0;var e=[],i,l,r,t,o,u=n;for(i=0,l=u.length;i<l;i+=1){if(r=u[i],o=!1,ui.call(r)!=="[object Object]")return!1;for(t in r)if(ti.call(r,t))if(!o)o=!0;else return!1;if(!o)return!1;if(e.indexOf(t)===-1)e.push(t);else return!1}return!0}function ai(n){return n!==null?n:[]}var qn=new C("tag:yaml.org,2002:omap",{kind:"sequence",resolve:ci,construct:ai}),fi=Object.prototype.toString;function pi(n){if(n===null)return!0;var e,i,l,r,t,o=n;for(t=new Array(o.length),e=0,i=o.length;e<i;e+=1){if(l=o[e],fi.call(l)!=="[object Object]"||(r=Object.keys(l),r.length!==1))return!1;t[e]=[r[0],l[r[0]]]}return!0}function si(n){if(n===null)return[];var e,i,l,r,t,o=n;for(t=new Array(o.length),e=0,i=o.length;e<i;e+=1)l=o[e],r=Object.keys(l),t[e]=[r[0],l[r[0]]];return t}var Kn=new C("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:pi,construct:si}),di=Object.prototype.hasOwnProperty;function hi(n){if(n===null)return!0;var e,i=n;for(e in i)if(di.call(i,e)&&i[e]!==null)return!1;return!0}function mi(n){return n!==null?n:{}}var Gn=new C("tag:yaml.org,2002:set",{kind:"mapping",resolve:hi,construct:mi}),tn=Hn.extend({implicit:[Pn,$n],explicit:[Wn,qn,Kn,Gn]}),I=Object.prototype.hasOwnProperty,W=1,zn=2,Qn=3,q=4,Z=1,gi=2,sn=3,xi=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,vi=/[\x85\u2028\u2029]/,Ai=/[,\[\]\{\}]/,Vn=/^(?:!|!!|![a-z\-]+!)$/i,Xn=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function dn(n){return Object.prototype.toString.call(n)}function T(n){return n===10||n===13}function N(n){return n===9||n===32}function S(n){return n===9||n===32||n===10||n===13}function M(n){return n===44||n===91||n===93||n===123||n===125}function yi(n){var e;return 48<=n&&n<=57?n-48:(e=n|32,97<=e&&e<=102?e-97+10:-1)}function bi(n){return n===120?2:n===117?4:n===85?8:0}function Ci(n){return 48<=n&&n<=57?n-48:-1}function hn(n){return n===48?"\0":n===97?"\x07":n===98?"\b":n===116||n===9?"	":n===110?`
`:n===118?"\v":n===102?"\f":n===114?"\r":n===101?"\x1B":n===32?" ":n===34?'"':n===47?"/":n===92?"\\":n===78?"":n===95?" ":n===76?"\u2028":n===80?"\u2029":""}function wi(n){return n<=65535?String.fromCharCode(n):String.fromCharCode((n-65536>>10)+55296,(n-65536&1023)+56320)}function Zn(n,e,i){e==="__proto__"?Object.defineProperty(n,e,{configurable:!0,enumerable:!0,writable:!0,value:i}):n[e]=i}var Jn=new Array(256),ne=new Array(256);for(var R=0;R<256;R++)Jn[R]=hn(R)?1:0,ne[R]=hn(R);function _i(n,e){this.input=n,this.filename=e.filename||null,this.schema=e.schema||tn,this.onWarning=e.onWarning||null,this.legacy=e.legacy||!1,this.json=e.json||!1,this.listener=e.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=n.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function ee(n,e){var i={name:n.filename,buffer:n.input.slice(0,-1),position:n.position,line:n.line,column:n.position-n.lineStart};return i.snippet=Te(i),new _(e,i)}function s(n,e){throw ee(n,e)}function K(n,e){n.onWarning&&n.onWarning.call(null,ee(n,e))}var mn={YAML:function(e,i,l){var r,t,o;e.version!==null&&s(e,"duplication of %YAML directive"),l.length!==1&&s(e,"YAML directive accepts exactly one argument"),r=/^([0-9]+)\.([0-9]+)$/.exec(l[0]),r===null&&s(e,"ill-formed argument of the YAML directive"),t=parseInt(r[1],10),o=parseInt(r[2],10),t!==1&&s(e,"unacceptable YAML version of the document"),e.version=l[0],e.checkLineBreaks=o<2,o!==1&&o!==2&&K(e,"unsupported YAML version of the document")},TAG:function(e,i,l){var r,t;l.length!==2&&s(e,"TAG directive accepts exactly two arguments"),r=l[0],t=l[1],Vn.test(r)||s(e,"ill-formed tag handle (first argument) of the TAG directive"),I.call(e.tagMap,r)&&s(e,'there is a previously declared suffix for "'+r+'" tag handle'),Xn.test(t)||s(e,"ill-formed tag prefix (second argument) of the TAG directive");try{t=decodeURIComponent(t)}catch{s(e,"tag prefix is malformed: "+t)}e.tagMap[r]=t}};function O(n,e,i,l){var r,t,o,u;if(e<i){if(u=n.input.slice(e,i),l)for(r=0,t=u.length;r<t;r+=1)o=u.charCodeAt(r),o===9||32<=o&&o<=1114111||s(n,"expected valid JSON character");else xi.test(u)&&s(n,"the stream contains non-printable characters");n.result+=u}}function gn(n,e,i,l){var r,t,o,u;for(y.isObject(i)||s(n,"cannot merge mappings; the provided source object is unacceptable"),r=Object.keys(i),o=0,u=r.length;o<u;o+=1)t=r[o],I.call(e,t)||(Zn(e,t,i[t]),l[t]=!0)}function B(n,e,i,l,r,t,o,u,c){var a,p;if(Array.isArray(r))for(r=Array.prototype.slice.call(r),a=0,p=r.length;a<p;a+=1)Array.isArray(r[a])&&s(n,"nested arrays are not supported inside keys"),typeof r=="object"&&dn(r[a])==="[object Object]"&&(r[a]="[object Object]");if(typeof r=="object"&&dn(r)==="[object Object]"&&(r="[object Object]"),r=String(r),e===null&&(e={}),l==="tag:yaml.org,2002:merge")if(Array.isArray(t))for(a=0,p=t.length;a<p;a+=1)gn(n,e,t[a],i);else gn(n,e,t,i);else!n.json&&!I.call(i,r)&&I.call(e,r)&&(n.line=o||n.line,n.lineStart=u||n.lineStart,n.position=c||n.position,s(n,"duplicated mapping key")),Zn(e,r,t),delete i[r];return e}function un(n){var e;e=n.input.charCodeAt(n.position),e===10?n.position++:e===13?(n.position++,n.input.charCodeAt(n.position)===10&&n.position++):s(n,"a line break is expected"),n.line+=1,n.lineStart=n.position,n.firstTabInLine=-1}function A(n,e,i){for(var l=0,r=n.input.charCodeAt(n.position);r!==0;){for(;N(r);)r===9&&n.firstTabInLine===-1&&(n.firstTabInLine=n.position),r=n.input.charCodeAt(++n.position);if(e&&r===35)do r=n.input.charCodeAt(++n.position);while(r!==10&&r!==13&&r!==0);if(T(r))for(un(n),r=n.input.charCodeAt(n.position),l++,n.lineIndent=0;r===32;)n.lineIndent++,r=n.input.charCodeAt(++n.position);else break}return i!==-1&&l!==0&&n.lineIndent<i&&K(n,"deficient indentation"),l}function Q(n){var e=n.position,i;return i=n.input.charCodeAt(e),!!((i===45||i===46)&&i===n.input.charCodeAt(e+1)&&i===n.input.charCodeAt(e+2)&&(e+=3,i=n.input.charCodeAt(e),i===0||S(i)))}function cn(n,e){e===1?n.result+=" ":e>1&&(n.result+=y.repeat(`
`,e-1))}function Si(n,e,i){var l,r,t,o,u,c,a,p,f=n.kind,d=n.result,h;if(h=n.input.charCodeAt(n.position),S(h)||M(h)||h===35||h===38||h===42||h===33||h===124||h===62||h===39||h===34||h===37||h===64||h===96||(h===63||h===45)&&(r=n.input.charCodeAt(n.position+1),S(r)||i&&M(r)))return!1;for(n.kind="scalar",n.result="",t=o=n.position,u=!1;h!==0;){if(h===58){if(r=n.input.charCodeAt(n.position+1),S(r)||i&&M(r))break}else if(h===35){if(l=n.input.charCodeAt(n.position-1),S(l))break}else{if(n.position===n.lineStart&&Q(n)||i&&M(h))break;if(T(h))if(c=n.line,a=n.lineStart,p=n.lineIndent,A(n,!1,-1),n.lineIndent>=e){u=!0,h=n.input.charCodeAt(n.position);continue}else{n.position=o,n.line=c,n.lineStart=a,n.lineIndent=p;break}}u&&(O(n,t,o,!1),cn(n,n.line-c),t=o=n.position,u=!1),N(h)||(o=n.position+1),h=n.input.charCodeAt(++n.position)}return O(n,t,o,!1),n.result?!0:(n.kind=f,n.result=d,!1)}function Ei(n,e){var i,l,r;if(i=n.input.charCodeAt(n.position),i!==39)return!1;for(n.kind="scalar",n.result="",n.position++,l=r=n.position;(i=n.input.charCodeAt(n.position))!==0;)if(i===39)if(O(n,l,n.position,!0),i=n.input.charCodeAt(++n.position),i===39)l=n.position,n.position++,r=n.position;else return!0;else T(i)?(O(n,l,r,!0),cn(n,A(n,!1,e)),l=r=n.position):n.position===n.lineStart&&Q(n)?s(n,"unexpected end of the document within a single quoted scalar"):(n.position++,r=n.position);s(n,"unexpected end of the stream within a single quoted scalar")}function Fi(n,e){var i,l,r,t,o,u;if(u=n.input.charCodeAt(n.position),u!==34)return!1;for(n.kind="scalar",n.result="",n.position++,i=l=n.position;(u=n.input.charCodeAt(n.position))!==0;){if(u===34)return O(n,i,n.position,!0),n.position++,!0;if(u===92){if(O(n,i,n.position,!0),u=n.input.charCodeAt(++n.position),T(u))A(n,!1,e);else if(u<256&&Jn[u])n.result+=ne[u],n.position++;else if((o=bi(u))>0){for(r=o,t=0;r>0;r--)u=n.input.charCodeAt(++n.position),(o=yi(u))>=0?t=(t<<4)+o:s(n,"expected hexadecimal character");n.result+=wi(t),n.position++}else s(n,"unknown escape sequence");i=l=n.position}else T(u)?(O(n,i,l,!0),cn(n,A(n,!1,e)),i=l=n.position):n.position===n.lineStart&&Q(n)?s(n,"unexpected end of the document within a double quoted scalar"):(n.position++,l=n.position)}s(n,"unexpected end of the stream within a double quoted scalar")}function Ti(n,e){var i=!0,l,r,t,o=n.tag,u,c=n.anchor,a,p,f,d,h,m=Object.create(null),x,v,E,g;if(g=n.input.charCodeAt(n.position),g===91)p=93,h=!1,u=[];else if(g===123)p=125,h=!0,u={};else return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=u),g=n.input.charCodeAt(++n.position);g!==0;){if(A(n,!0,e),g=n.input.charCodeAt(n.position),g===p)return n.position++,n.tag=o,n.anchor=c,n.kind=h?"mapping":"sequence",n.result=u,!0;i?g===44&&s(n,"expected the node content, but found ','"):s(n,"missed comma between flow collection entries"),v=x=E=null,f=d=!1,g===63&&(a=n.input.charCodeAt(n.position+1),S(a)&&(f=d=!0,n.position++,A(n,!0,e))),l=n.line,r=n.lineStart,t=n.position,Y(n,e,W,!1,!0),v=n.tag,x=n.result,A(n,!0,e),g=n.input.charCodeAt(n.position),(d||n.line===l)&&g===58&&(f=!0,g=n.input.charCodeAt(++n.position),A(n,!0,e),Y(n,e,W,!1,!0),E=n.result),h?B(n,u,m,v,x,E,l,r,t):f?u.push(B(n,null,m,v,x,E,l,r,t)):u.push(x),A(n,!0,e),g=n.input.charCodeAt(n.position),g===44?(i=!0,g=n.input.charCodeAt(++n.position)):i=!1}s(n,"unexpected end of the stream within a flow collection")}function ki(n,e){var i,l,r=Z,t=!1,o=!1,u=e,c=0,a=!1,p,f;if(f=n.input.charCodeAt(n.position),f===124)l=!1;else if(f===62)l=!0;else return!1;for(n.kind="scalar",n.result="";f!==0;)if(f=n.input.charCodeAt(++n.position),f===43||f===45)Z===r?r=f===43?sn:gi:s(n,"repeat of a chomping mode identifier");else if((p=Ci(f))>=0)p===0?s(n,"bad explicit indentation width of a block scalar; it cannot be less than one"):o?s(n,"repeat of an indentation width identifier"):(u=e+p-1,o=!0);else break;if(N(f)){do f=n.input.charCodeAt(++n.position);while(N(f));if(f===35)do f=n.input.charCodeAt(++n.position);while(!T(f)&&f!==0)}for(;f!==0;){for(un(n),n.lineIndent=0,f=n.input.charCodeAt(n.position);(!o||n.lineIndent<u)&&f===32;)n.lineIndent++,f=n.input.charCodeAt(++n.position);if(!o&&n.lineIndent>u&&(u=n.lineIndent),T(f)){c++;continue}if(n.lineIndent<u){r===sn?n.result+=y.repeat(`
`,t?1+c:c):r===Z&&t&&(n.result+=`
`);break}for(l?N(f)?(a=!0,n.result+=y.repeat(`
`,t?1+c:c)):a?(a=!1,n.result+=y.repeat(`
`,c+1)):c===0?t&&(n.result+=" "):n.result+=y.repeat(`
`,c):n.result+=y.repeat(`
`,t?1+c:c),t=!0,o=!0,c=0,i=n.position;!T(f)&&f!==0;)f=n.input.charCodeAt(++n.position);O(n,i,n.position,!1)}return!0}function xn(n,e){var i,l=n.tag,r=n.anchor,t=[],o,u=!1,c;if(n.firstTabInLine!==-1)return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=t),c=n.input.charCodeAt(n.position);c!==0&&(n.firstTabInLine!==-1&&(n.position=n.firstTabInLine,s(n,"tab characters must not be used in indentation")),!(c!==45||(o=n.input.charCodeAt(n.position+1),!S(o))));){if(u=!0,n.position++,A(n,!0,-1)&&n.lineIndent<=e){t.push(null),c=n.input.charCodeAt(n.position);continue}if(i=n.line,Y(n,e,Qn,!1,!0),t.push(n.result),A(n,!0,-1),c=n.input.charCodeAt(n.position),(n.line===i||n.lineIndent>e)&&c!==0)s(n,"bad indentation of a sequence entry");else if(n.lineIndent<e)break}return u?(n.tag=l,n.anchor=r,n.kind="sequence",n.result=t,!0):!1}function Oi(n,e,i){var l,r,t,o,u,c,a=n.tag,p=n.anchor,f={},d=Object.create(null),h=null,m=null,x=null,v=!1,E=!1,g;if(n.firstTabInLine!==-1)return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=f),g=n.input.charCodeAt(n.position);g!==0;){if(!v&&n.firstTabInLine!==-1&&(n.position=n.firstTabInLine,s(n,"tab characters must not be used in indentation")),l=n.input.charCodeAt(n.position+1),t=n.line,(g===63||g===58)&&S(l))g===63?(v&&(B(n,f,d,h,m,null,o,u,c),h=m=x=null),E=!0,v=!0,r=!0):v?(v=!1,r=!0):s(n,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),n.position+=1,g=l;else{if(o=n.line,u=n.lineStart,c=n.position,!Y(n,i,zn,!1,!0))break;if(n.line===t){for(g=n.input.charCodeAt(n.position);N(g);)g=n.input.charCodeAt(++n.position);if(g===58)g=n.input.charCodeAt(++n.position),S(g)||s(n,"a whitespace character is expected after the key-value separator within a block mapping"),v&&(B(n,f,d,h,m,null,o,u,c),h=m=x=null),E=!0,v=!1,r=!1,h=n.tag,m=n.result;else if(E)s(n,"can not read an implicit mapping pair; a colon is missed");else return n.tag=a,n.anchor=p,!0}else if(E)s(n,"can not read a block mapping entry; a multiline key may not be an implicit key");else return n.tag=a,n.anchor=p,!0}if((n.line===t||n.lineIndent>e)&&(v&&(o=n.line,u=n.lineStart,c=n.position),Y(n,e,q,!0,r)&&(v?m=n.result:x=n.result),v||(B(n,f,d,h,m,x,o,u,c),h=m=x=null),A(n,!0,-1),g=n.input.charCodeAt(n.position)),(n.line===t||n.lineIndent>e)&&g!==0)s(n,"bad indentation of a mapping entry");else if(n.lineIndent<e)break}return v&&B(n,f,d,h,m,null,o,u,c),E&&(n.tag=a,n.anchor=p,n.kind="mapping",n.result=f),E}function Ii(n){var e,i=!1,l=!1,r,t,o;if(o=n.input.charCodeAt(n.position),o!==33)return!1;if(n.tag!==null&&s(n,"duplication of a tag property"),o=n.input.charCodeAt(++n.position),o===60?(i=!0,o=n.input.charCodeAt(++n.position)):o===33?(l=!0,r="!!",o=n.input.charCodeAt(++n.position)):r="!",e=n.position,i){do o=n.input.charCodeAt(++n.position);while(o!==0&&o!==62);n.position<n.length?(t=n.input.slice(e,n.position),o=n.input.charCodeAt(++n.position)):s(n,"unexpected end of the stream within a verbatim tag")}else{for(;o!==0&&!S(o);)o===33&&(l?s(n,"tag suffix cannot contain exclamation marks"):(r=n.input.slice(e-1,n.position+1),Vn.test(r)||s(n,"named tag handle cannot contain such characters"),l=!0,e=n.position+1)),o=n.input.charCodeAt(++n.position);t=n.input.slice(e,n.position),Ai.test(t)&&s(n,"tag suffix cannot contain flow indicator characters")}t&&!Xn.test(t)&&s(n,"tag name cannot contain such characters: "+t);try{t=decodeURIComponent(t)}catch{s(n,"tag name is malformed: "+t)}return i?n.tag=t:I.call(n.tagMap,r)?n.tag=n.tagMap[r]+t:r==="!"?n.tag="!"+t:r==="!!"?n.tag="tag:yaml.org,2002:"+t:s(n,'undeclared tag handle "'+r+'"'),!0}function Li(n){var e,i;if(i=n.input.charCodeAt(n.position),i!==38)return!1;for(n.anchor!==null&&s(n,"duplication of an anchor property"),i=n.input.charCodeAt(++n.position),e=n.position;i!==0&&!S(i)&&!M(i);)i=n.input.charCodeAt(++n.position);return n.position===e&&s(n,"name of an anchor node must contain at least one character"),n.anchor=n.input.slice(e,n.position),!0}function Ni(n){var e,i,l;if(l=n.input.charCodeAt(n.position),l!==42)return!1;for(l=n.input.charCodeAt(++n.position),e=n.position;l!==0&&!S(l)&&!M(l);)l=n.input.charCodeAt(++n.position);return n.position===e&&s(n,"name of an alias node must contain at least one character"),i=n.input.slice(e,n.position),I.call(n.anchorMap,i)||s(n,'unidentified alias "'+i+'"'),n.result=n.anchorMap[i],A(n,!0,-1),!0}function Y(n,e,i,l,r){var t,o,u,c=1,a=!1,p=!1,f,d,h,m,x,v;if(n.listener!==null&&n.listener("open",n),n.tag=null,n.anchor=null,n.kind=null,n.result=null,t=o=u=q===i||Qn===i,l&&A(n,!0,-1)&&(a=!0,n.lineIndent>e?c=1:n.lineIndent===e?c=0:n.lineIndent<e&&(c=-1)),c===1)for(;Ii(n)||Li(n);)A(n,!0,-1)?(a=!0,u=t,n.lineIndent>e?c=1:n.lineIndent===e?c=0:n.lineIndent<e&&(c=-1)):u=!1;if(u&&(u=a||r),(c===1||q===i)&&(W===i||zn===i?x=e:x=e+1,v=n.position-n.lineStart,c===1?u&&(xn(n,v)||Oi(n,v,x))||Ti(n,x)?p=!0:(o&&ki(n,x)||Ei(n,x)||Fi(n,x)?p=!0:Ni(n)?(p=!0,(n.tag!==null||n.anchor!==null)&&s(n,"alias node should not have any properties")):Si(n,x,W===i)&&(p=!0,n.tag===null&&(n.tag="?")),n.anchor!==null&&(n.anchorMap[n.anchor]=n.result)):c===0&&(p=u&&xn(n,v))),n.tag===null)n.anchor!==null&&(n.anchorMap[n.anchor]=n.result);else if(n.tag==="?"){for(n.result!==null&&n.kind!=="scalar"&&s(n,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+n.kind+'"'),f=0,d=n.implicitTypes.length;f<d;f+=1)if(m=n.implicitTypes[f],m.resolve(n.result)){n.result=m.construct(n.result),n.tag=m.tag,n.anchor!==null&&(n.anchorMap[n.anchor]=n.result);break}}else if(n.tag!=="!"){if(I.call(n.typeMap[n.kind||"fallback"],n.tag))m=n.typeMap[n.kind||"fallback"][n.tag];else for(m=null,h=n.typeMap.multi[n.kind||"fallback"],f=0,d=h.length;f<d;f+=1)if(n.tag.slice(0,h[f].tag.length)===h[f].tag){m=h[f];break}m||s(n,"unknown tag !<"+n.tag+">"),n.result!==null&&m.kind!==n.kind&&s(n,"unacceptable node kind for !<"+n.tag+'> tag; it should be "'+m.kind+'", not "'+n.kind+'"'),m.resolve(n.result,n.tag)?(n.result=m.construct(n.result,n.tag),n.anchor!==null&&(n.anchorMap[n.anchor]=n.result)):s(n,"cannot resolve a node with !<"+n.tag+"> explicit tag")}return n.listener!==null&&n.listener("close",n),n.tag!==null||n.anchor!==null||p}function Ri(n){var e=n.position,i,l,r,t=!1,o;for(n.version=null,n.checkLineBreaks=n.legacy,n.tagMap=Object.create(null),n.anchorMap=Object.create(null);(o=n.input.charCodeAt(n.position))!==0&&(A(n,!0,-1),o=n.input.charCodeAt(n.position),!(n.lineIndent>0||o!==37));){for(t=!0,o=n.input.charCodeAt(++n.position),i=n.position;o!==0&&!S(o);)o=n.input.charCodeAt(++n.position);for(l=n.input.slice(i,n.position),r=[],l.length<1&&s(n,"directive name must not be less than one character in length");o!==0;){for(;N(o);)o=n.input.charCodeAt(++n.position);if(o===35){do o=n.input.charCodeAt(++n.position);while(o!==0&&!T(o));break}if(T(o))break;for(i=n.position;o!==0&&!S(o);)o=n.input.charCodeAt(++n.position);r.push(n.input.slice(i,n.position))}o!==0&&un(n),I.call(mn,l)?mn[l](n,l,r):K(n,'unknown document directive "'+l+'"')}if(A(n,!0,-1),n.lineIndent===0&&n.input.charCodeAt(n.position)===45&&n.input.charCodeAt(n.position+1)===45&&n.input.charCodeAt(n.position+2)===45?(n.position+=3,A(n,!0,-1)):t&&s(n,"directives end mark is expected"),Y(n,n.lineIndent-1,q,!1,!0),A(n,!0,-1),n.checkLineBreaks&&vi.test(n.input.slice(e,n.position))&&K(n,"non-ASCII line breaks are interpreted as content"),n.documents.push(n.result),n.position===n.lineStart&&Q(n)){n.input.charCodeAt(n.position)===46&&(n.position+=3,A(n,!0,-1));return}if(n.position<n.length-1)s(n,"end of the stream or a document separator is expected");else return}function ie(n,e){n=String(n),e=e||{},n.length!==0&&(n.charCodeAt(n.length-1)!==10&&n.charCodeAt(n.length-1)!==13&&(n+=`
`),n.charCodeAt(0)===65279&&(n=n.slice(1)));var i=new _i(n,e),l=n.indexOf("\0");for(l!==-1&&(i.position=l,s(i,"null byte is not allowed in input")),i.input+="\0";i.input.charCodeAt(i.position)===32;)i.lineIndent+=1,i.position+=1;for(;i.position<i.length-1;)Ri(i);return i.documents}function Di(n,e,i){e!==null&&typeof e=="object"&&typeof i>"u"&&(i=e,e=null);var l=ie(n,i);if(typeof e!="function")return l;for(var r=0,t=l.length;r<t;r+=1)e(l[r])}function Mi(n,e){var i=ie(n,e);if(i.length!==0){if(i.length===1)return i[0];throw new _("expected a single document in the stream, but found more")}}var Bi=Di,Yi=Mi,re={loadAll:Bi,load:Yi},le=Object.prototype.toString,oe=Object.prototype.hasOwnProperty,an=65279,Hi=9,U=10,ji=13,Ui=32,Pi=33,$i=34,nn=35,Wi=37,qi=38,Ki=39,Gi=42,te=44,zi=45,G=58,Qi=61,Vi=62,Xi=63,Zi=64,ue=91,ce=93,Ji=96,ae=123,nr=124,fe=125,w={};w[0]="\\0";w[7]="\\a";w[8]="\\b";w[9]="\\t";w[10]="\\n";w[11]="\\v";w[12]="\\f";w[13]="\\r";w[27]="\\e";w[34]='\\"';w[92]="\\\\";w[133]="\\N";w[160]="\\_";w[8232]="\\L";w[8233]="\\P";var er=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],ir=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function rr(n,e){var i,l,r,t,o,u,c;if(e===null)return{};for(i={},l=Object.keys(e),r=0,t=l.length;r<t;r+=1)o=l[r],u=String(e[o]),o.slice(0,2)==="!!"&&(o="tag:yaml.org,2002:"+o.slice(2)),c=n.compiledTypeMap.fallback[o],c&&oe.call(c.styleAliases,u)&&(u=c.styleAliases[u]),i[o]=u;return i}function lr(n){var e,i,l;if(e=n.toString(16).toUpperCase(),n<=255)i="x",l=2;else if(n<=65535)i="u",l=4;else if(n<=4294967295)i="U",l=8;else throw new _("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+i+y.repeat("0",l-e.length)+e}var or=1,P=2;function tr(n){this.schema=n.schema||tn,this.indent=Math.max(1,n.indent||2),this.noArrayIndent=n.noArrayIndent||!1,this.skipInvalid=n.skipInvalid||!1,this.flowLevel=y.isNothing(n.flowLevel)?-1:n.flowLevel,this.styleMap=rr(this.schema,n.styles||null),this.sortKeys=n.sortKeys||!1,this.lineWidth=n.lineWidth||80,this.noRefs=n.noRefs||!1,this.noCompatMode=n.noCompatMode||!1,this.condenseFlow=n.condenseFlow||!1,this.quotingType=n.quotingType==='"'?P:or,this.forceQuotes=n.forceQuotes||!1,this.replacer=typeof n.replacer=="function"?n.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function vn(n,e){for(var i=y.repeat(" ",e),l=0,r=-1,t="",o,u=n.length;l<u;)r=n.indexOf(`
`,l),r===-1?(o=n.slice(l),l=u):(o=n.slice(l,r+1),l=r+1),o.length&&o!==`
`&&(t+=i),t+=o;return t}function en(n,e){return`
`+y.repeat(" ",n.indent*e)}function ur(n,e){var i,l,r;for(i=0,l=n.implicitTypes.length;i<l;i+=1)if(r=n.implicitTypes[i],r.resolve(e))return!0;return!1}function z(n){return n===Ui||n===Hi}function $(n){return 32<=n&&n<=126||161<=n&&n<=55295&&n!==8232&&n!==8233||57344<=n&&n<=65533&&n!==an||65536<=n&&n<=1114111}function An(n){return $(n)&&n!==an&&n!==ji&&n!==U}function yn(n,e,i){var l=An(n),r=l&&!z(n);return(i?l:l&&n!==te&&n!==ue&&n!==ce&&n!==ae&&n!==fe)&&n!==nn&&!(e===G&&!r)||An(e)&&!z(e)&&n===nn||e===G&&r}function cr(n){return $(n)&&n!==an&&!z(n)&&n!==zi&&n!==Xi&&n!==G&&n!==te&&n!==ue&&n!==ce&&n!==ae&&n!==fe&&n!==nn&&n!==qi&&n!==Gi&&n!==Pi&&n!==nr&&n!==Qi&&n!==Vi&&n!==Ki&&n!==$i&&n!==Wi&&n!==Zi&&n!==Ji}function ar(n){return!z(n)&&n!==G}function H(n,e){var i=n.charCodeAt(e),l;return i>=55296&&i<=56319&&e+1<n.length&&(l=n.charCodeAt(e+1),l>=56320&&l<=57343)?(i-55296)*1024+l-56320+65536:i}function pe(n){var e=/^\n* /;return e.test(n)}var se=1,rn=2,de=3,he=4,D=5;function fr(n,e,i,l,r,t,o,u){var c,a=0,p=null,f=!1,d=!1,h=l!==-1,m=-1,x=cr(H(n,0))&&ar(H(n,n.length-1));if(e||o)for(c=0;c<n.length;a>=65536?c+=2:c++){if(a=H(n,c),!$(a))return D;x=x&&yn(a,p,u),p=a}else{for(c=0;c<n.length;a>=65536?c+=2:c++){if(a=H(n,c),a===U)f=!0,h&&(d=d||c-m-1>l&&n[m+1]!==" ",m=c);else if(!$(a))return D;x=x&&yn(a,p,u),p=a}d=d||h&&c-m-1>l&&n[m+1]!==" "}return!f&&!d?x&&!o&&!r(n)?se:t===P?D:rn:i>9&&pe(n)?D:o?t===P?D:rn:d?he:de}function pr(n,e,i,l,r){n.dump=(function(){if(e.length===0)return n.quotingType===P?'""':"''";if(!n.noCompatMode&&(er.indexOf(e)!==-1||ir.test(e)))return n.quotingType===P?'"'+e+'"':"'"+e+"'";var t=n.indent*Math.max(1,i),o=n.lineWidth===-1?-1:Math.max(Math.min(n.lineWidth,40),n.lineWidth-t),u=l||n.flowLevel>-1&&i>=n.flowLevel;function c(a){return ur(n,a)}switch(fr(e,u,n.indent,o,c,n.quotingType,n.forceQuotes&&!l,r)){case se:return e;case rn:return"'"+e.replace(/'/g,"''")+"'";case de:return"|"+bn(e,n.indent)+Cn(vn(e,t));case he:return">"+bn(e,n.indent)+Cn(vn(sr(e,o),t));case D:return'"'+dr(e)+'"';default:throw new _("impossible error: invalid scalar style")}})()}function bn(n,e){var i=pe(n)?String(e):"",l=n[n.length-1]===`
`,r=l&&(n[n.length-2]===`
`||n===`
`),t=r?"+":l?"":"-";return i+t+`
`}function Cn(n){return n[n.length-1]===`
`?n.slice(0,-1):n}function sr(n,e){for(var i=/(\n+)([^\n]*)/g,l=(function(){var a=n.indexOf(`
`);return a=a!==-1?a:n.length,i.lastIndex=a,wn(n.slice(0,a),e)})(),r=n[0]===`
`||n[0]===" ",t,o;o=i.exec(n);){var u=o[1],c=o[2];t=c[0]===" ",l+=u+(!r&&!t&&c!==""?`
`:"")+wn(c,e),r=t}return l}function wn(n,e){if(n===""||n[0]===" ")return n;for(var i=/ [^ ]/g,l,r=0,t,o=0,u=0,c="";l=i.exec(n);)u=l.index,u-r>e&&(t=o>r?o:u,c+=`
`+n.slice(r,t),r=t+1),o=u;return c+=`
`,n.length-r>e&&o>r?c+=n.slice(r,o)+`
`+n.slice(o+1):c+=n.slice(r),c.slice(1)}function dr(n){for(var e="",i=0,l,r=0;r<n.length;i>=65536?r+=2:r++)i=H(n,r),l=w[i],!l&&$(i)?(e+=n[r],i>=65536&&(e+=n[r+1])):e+=l||lr(i);return e}function hr(n,e,i){var l="",r=n.tag,t,o,u;for(t=0,o=i.length;t<o;t+=1)u=i[t],n.replacer&&(u=n.replacer.call(i,String(t),u)),(k(n,e,u,!1,!1)||typeof u>"u"&&k(n,e,null,!1,!1))&&(l!==""&&(l+=","+(n.condenseFlow?"":" ")),l+=n.dump);n.tag=r,n.dump="["+l+"]"}function _n(n,e,i,l){var r="",t=n.tag,o,u,c;for(o=0,u=i.length;o<u;o+=1)c=i[o],n.replacer&&(c=n.replacer.call(i,String(o),c)),(k(n,e+1,c,!0,!0,!1,!0)||typeof c>"u"&&k(n,e+1,null,!0,!0,!1,!0))&&((!l||r!=="")&&(r+=en(n,e)),n.dump&&U===n.dump.charCodeAt(0)?r+="-":r+="- ",r+=n.dump);n.tag=t,n.dump=r||"[]"}function mr(n,e,i){var l="",r=n.tag,t=Object.keys(i),o,u,c,a,p;for(o=0,u=t.length;o<u;o+=1)p="",l!==""&&(p+=", "),n.condenseFlow&&(p+='"'),c=t[o],a=i[c],n.replacer&&(a=n.replacer.call(i,c,a)),k(n,e,c,!1,!1)&&(n.dump.length>1024&&(p+="? "),p+=n.dump+(n.condenseFlow?'"':"")+":"+(n.condenseFlow?"":" "),k(n,e,a,!1,!1)&&(p+=n.dump,l+=p));n.tag=r,n.dump="{"+l+"}"}function gr(n,e,i,l){var r="",t=n.tag,o=Object.keys(i),u,c,a,p,f,d;if(n.sortKeys===!0)o.sort();else if(typeof n.sortKeys=="function")o.sort(n.sortKeys);else if(n.sortKeys)throw new _("sortKeys must be a boolean or a function");for(u=0,c=o.length;u<c;u+=1)d="",(!l||r!=="")&&(d+=en(n,e)),a=o[u],p=i[a],n.replacer&&(p=n.replacer.call(i,a,p)),k(n,e+1,a,!0,!0,!0)&&(f=n.tag!==null&&n.tag!=="?"||n.dump&&n.dump.length>1024,f&&(n.dump&&U===n.dump.charCodeAt(0)?d+="?":d+="? "),d+=n.dump,f&&(d+=en(n,e)),k(n,e+1,p,!0,f)&&(n.dump&&U===n.dump.charCodeAt(0)?d+=":":d+=": ",d+=n.dump,r+=d));n.tag=t,n.dump=r||"{}"}function Sn(n,e,i){var l,r,t,o,u,c;for(r=i?n.explicitTypes:n.implicitTypes,t=0,o=r.length;t<o;t+=1)if(u=r[t],(u.instanceOf||u.predicate)&&(!u.instanceOf||typeof e=="object"&&e instanceof u.instanceOf)&&(!u.predicate||u.predicate(e))){if(i?u.multi&&u.representName?n.tag=u.representName(e):n.tag=u.tag:n.tag="?",u.represent){if(c=n.styleMap[u.tag]||u.defaultStyle,le.call(u.represent)==="[object Function]")l=u.represent(e,c);else if(oe.call(u.represent,c))l=u.represent[c](e,c);else throw new _("!<"+u.tag+'> tag resolver accepts not "'+c+'" style');n.dump=l}return!0}return!1}function k(n,e,i,l,r,t,o){n.tag=null,n.dump=i,Sn(n,i,!1)||Sn(n,i,!0);var u=le.call(n.dump),c=l,a;l&&(l=n.flowLevel<0||n.flowLevel>e);var p=u==="[object Object]"||u==="[object Array]",f,d;if(p&&(f=n.duplicates.indexOf(i),d=f!==-1),(n.tag!==null&&n.tag!=="?"||d||n.indent!==2&&e>0)&&(r=!1),d&&n.usedDuplicates[f])n.dump="*ref_"+f;else{if(p&&d&&!n.usedDuplicates[f]&&(n.usedDuplicates[f]=!0),u==="[object Object]")l&&Object.keys(n.dump).length!==0?(gr(n,e,n.dump,r),d&&(n.dump="&ref_"+f+n.dump)):(mr(n,e,n.dump),d&&(n.dump="&ref_"+f+" "+n.dump));else if(u==="[object Array]")l&&n.dump.length!==0?(n.noArrayIndent&&!o&&e>0?_n(n,e-1,n.dump,r):_n(n,e,n.dump,r),d&&(n.dump="&ref_"+f+n.dump)):(hr(n,e,n.dump),d&&(n.dump="&ref_"+f+" "+n.dump));else if(u==="[object String]")n.tag!=="?"&&pr(n,n.dump,e,t,c);else{if(u==="[object Undefined]")return!1;if(n.skipInvalid)return!1;throw new _("unacceptable kind of an object to dump "+u)}n.tag!==null&&n.tag!=="?"&&(a=encodeURI(n.tag[0]==="!"?n.tag.slice(1):n.tag).replace(/!/g,"%21"),n.tag[0]==="!"?a="!"+a:a.slice(0,18)==="tag:yaml.org,2002:"?a="!!"+a.slice(18):a="!<"+a+">",n.dump=a+" "+n.dump)}return!0}function xr(n,e){var i=[],l=[],r,t;for(ln(n,i,l),r=0,t=l.length;r<t;r+=1)e.duplicates.push(i[l[r]]);e.usedDuplicates=new Array(t)}function ln(n,e,i){var l,r,t;if(n!==null&&typeof n=="object")if(r=e.indexOf(n),r!==-1)i.indexOf(r)===-1&&i.push(r);else if(e.push(n),Array.isArray(n))for(r=0,t=n.length;r<t;r+=1)ln(n[r],e,i);else for(l=Object.keys(n),r=0,t=l.length;r<t;r+=1)ln(n[l[r]],e,i)}function vr(n,e){e=e||{};var i=new tr(e);i.noRefs||xr(n,i);var l=n;return i.replacer&&(l=i.replacer.call({"":l},"",l)),k(i,0,l,!0,!0)?i.dump+`
`:""}var Ar=vr,yr={dump:Ar};function fn(n,e){return function(){throw new Error("Function yaml."+n+" is removed in js-yaml 4. Use yaml."+e+" instead, which is now safe by default.")}}var br=C,Cr=kn,wr=Nn,_r=Yn,Sr=Hn,Er=tn,Fr=re.load,Tr=re.loadAll,kr=yr.dump,Or=_,Ir={binary:Wn,float:Bn,map:Ln,null:Rn,pairs:Kn,set:Gn,timestamp:Pn,bool:Dn,int:Mn,merge:$n,omap:qn,seq:In,str:On},Lr=fn("safeLoad","load"),Nr=fn("safeLoadAll","loadAll"),Rr=fn("safeDump","dump"),Dr={Type:br,Schema:Cr,FAILSAFE_SCHEMA:wr,JSON_SCHEMA:_r,CORE_SCHEMA:Sr,DEFAULT_SCHEMA:Er,load:Fr,loadAll:Tr,dump:kr,YAMLException:Or,types:Ir,safeLoad:Lr,safeLoadAll:Nr,safeDump:Rr},F=(n=>(n[n.Home=0]="Home",n[n.Archive=1]="Archive",n[n.Projects=2]="Projects",n[n.Skills=3]="Skills",n[n.Timeline=4]="Timeline",n[n.Diary=5]="Diary",n[n.Albums=6]="Albums",n[n.Anime=7]="Anime",n[n.About=8]="About",n[n.Friends=9]="Friends",n))(F||{});const Mr=`# 站点配置
site:
    siteURL: "https://www.wqlblog.cn"
    # siteURL: "https://localhost:4321"
    
    # 部署基础路径（GitHub Pages 项目页请用 "/blog/"，根域部署用 "/"）
    base: "/"
    # 站点标题
    title: "KelrinWu's Blog"
    # 站点副标题
    subtitle: "Welcome to my blog!"
    # 语言配置
    lang: "zh"
    # 时区配置
    timeZone: 8
    # 字体配置
    font:
        # 示例字体配置
        "Example - ZenMaruGothic":
            # 字体源 (字体 CSS 链接 | 字体文件路径)
            src: "https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
            family: "Noto Sans SC"
    # 主题色配置
    themeColor:
        # 主题色的默认色相 (范围从 0 到 360。例如：红色：0，青色：200，蓝绿色：250，粉色：345)
        hue: 255
    # 默认主题 ("system" 跟随系统 | "light" 浅色 | "dark" 深色)
    defaultTheme: "system"
    # 壁纸配置
    wallpaper:
        # 模式 ("banner" 横幅 | "fullscreen" 全屏 | "none" 纯色)
        mode: "banner"
        # 图片源配置 (fullscreen 和 banner 模式共享)
        src:
            # 桌面壁纸图片 (相对于 /public 目录; 支持单张图片或图片数组，当数组长度 > 1 时自动启用轮播)
            desktop:
                - "https://cdn-hsyq-static.shanhutech.cn/bizhi/staticwp/202512/ad33761836b644b0d21e66104395270e--2886454658.jpg"
            # 移动壁纸图片 (相对于 /public 目录; 支持单张图片或图片数组，当数组长度 > 1 时自动启用轮播)
            mobile:
                - "https://cdn-hsyq-static.shanhutech.cn/bizhi/staticwp/202512/ad33761836b644b0d21e66104395270e--2886454658.jpg"
        # 壁纸位置 ('top' | 'center' | 'bottom')
        position: "center"
        # 轮播配置 (fullscreen 和 banner 模式共享)
        carousel:
            # 为多张图片启用轮播，否则随机显示一张图片
            enable: true
            # 轮播间隔时间 (秒)
            interval: 3.6
            # 启用 Ken Burns 效果
            kenBurns: true
        # Banner 模式专属配置
        banner:
            # 横幅文本配置
            homeText:
                # 在主页显示文本
                enable: true
                # 主标题
                title: "欢迎来到我的博客"
                # 副标题，支持单个字符串或字符串数组
                subtitle:
                    - "世界上只有10种人，一种是懂二进制的人，一种是不懂二进制的人。"
                # 副标题打字机效果
                typewriter:
                    # 启用副标题打字机效果
                    enable: true
                    # 打字速度 (毫秒)
                    speed: 111
                    # 删除速度 (毫秒)
                    deleteSpeed: 51
                    # 完全显示后的暂停时间 (毫秒)
                    pauseTime: 3000
            # 横幅图片来源文本
            credit:
                # 显示横幅图片来源文本
                enable: false
                # 要显示的来源文本
                text: "Describe"
                # (可选) 原始艺术品或艺术家页面的 URL 链接
                url: ""
            # 导航栏配置
            navbar:
                # 导航栏透明模式 ("semi" 半透明加圆角 | "full" 完全透明 | "semifull" 动态透明)
                transparentMode: "semifull"
            # 水波纹效果配置
            waves:
                # 启用水波纹效果
                enable: true
                # 启用性能模式 (简化波浪效果以提升性能)
                performanceMode: true
        # Fullscreen 模式专属配置
        fullscreen:
            # 层级
            zIndex: -1
            # 壁纸透明度，0-1之间
            opacity: 0.9
            # 背景模糊程度 (像素值)
            blur: 1
            # 导航栏透明模式
            navbar:
                transparentMode: "semi"
    # 加载页配置
    loadingOverlay:
        # 是否启用加载页
        enable: true
        # 是否等待所有资源 (如图片、样式表) 加载完成
        waitForAllResources: false
        # 加载标题配置
        title:
            # 是否启用加载标题
            enable: true
            # 加载标题文本
            content: "LOADING"
            # 动画周期 (s)
            interval: 1.5
        # 加载动画配置
        spinner:
            # 是否启用加载动画
            enable: true
            # 动画周期 (s)
            interval: 1.5
    # favicon 配置
    favicon:
        - src: "/favicon/favicon.ico"
          sizes: "any"
    # bangumi 配置
    bangumi:
        # 用户 ID
        userId: "your-bangumi-id"
    # OpenGraph 配置
    generateOgImages: false

# 导航栏配置
navbar:
    # 链接配置 (链接预设位于 src/constants/link-presets.ts 的 LinkPresets)
    links:
        - # 一级导航链接 - 主页 (预设)
          "Home"
        - # 一级导航链接 - 归档 (预设)
          "Archive"
        # - # 一级导航链接 - 展览 (自定义)
        #   # 导航名称
        #   name: "Exhibition"
        #   # 导航链接
        #   url: "/exhibition/"
        #   # 导航图标
        #   icon: "material-symbols:person"
        #   # 导航描述
        #   description: "A collection of my creative works and experiences"
        #   # 子链接
        #   children:
        #       - # 二级导航链接 - 项目 (预设)
        #         "Projects"
        #       - # 二级导航链接 - 技能 (预设)
        #         "Skills"
        #       - # 二级导航链接 - 历程 (预设)
        #         "Timeline"
        #       - # 二级导航链接 - 日记 (预设)
        #         "Diary"
        #       - # 二级导航链接 - 相册 (预设)
        #         "Albums"
        #       - # 二级导航链接 - 动画 (预设)
        #         "Anime"
        # - # 一级导航链接 - 好友 (预设)
        #   "Friends"
        - # 一级导航链接 - 关于 (预设)
          "About"

# 侧边栏配置
sidebar:
    # 侧边栏组件配置列表 (侧栏组件预设位于 src/types/config.ts 的 WidgetComponentType)
    components:
        # 左侧侧边栏
        left:
            - # 组件 - 资料 (预设)
              # 类型
              type: "profile"
              # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
              position: "sticky"
            # - # 组件 - 目录 (预设)
              # 类型
              # type: "directory"
              # # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
              # position: "top"
            - # 组件 - 文章类别 (预设)
              # 类型
              type: "categories"
              # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
              position: "sticky"
              # 响应式配置
              responsive:
                  # 折叠阈值
                  collapseThreshold: 5
              # 目录深度
              depth: 3
        # 右侧侧边栏
        right:
            - # 组件 - 文章目录 (预设)
              # 类型
              type: "toc"
              # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
              position: "sticky"
              # 目录深度 (1-6，1 表示只显示 h1 标题，2 表示显示 h1 和 h2 标题，依此类推)
              depth: 3
              # 页面可见性配置
              visibility:
                  # 匹配模式：'include' (包含), 'exclude' (排除)
                  mode: "exclude"
                  # 页面路径匹配规则列表 (支持正则字符串)
                  paths: ["^/archive/?$"]
            - # 组件 - 文章统计 (预设)
              # 类型
              type: "statistics"
              # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
              position: "sticky"
              # 页面可见性配置
              visibility:
                  # 匹配模式：'include' (包含), 'exclude' (排除)
                  mode: "include"
                  # 页面路径匹配规则列表 (支持正则字符串)
                  paths: ["^/$", "^/\\\\d+/?$", "^/page/\\\\d+/?$", "^/archive/?$"]
            - # 组件 - 文章标签 (预设)
              # 类型
              type: "tags"
              # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
              position: "sticky"
              # 响应式配置
              responsive:
                  # 折叠阈值
                  collapseThreshold: 20

# 资料配置
profile:
    # 头像配置 (相对于 /public 目录)
    avatar: "/assets/images/avatar.png"
    # 信息配置
    name: "KelrinWu"
    # 简介配置
    bio: "世界这么大，我想去看看"
    # 链接配置
    links:
        - # 链接示例
          # 名字
          name: "GitHub"
          # 图标
          icon: "fa6-brands:github"
          # 链接
          url: "https://github.com/DaYangtuo247"
        - # LeetCode 链接
          # 名字
          name: "LeetCode"
          # 图标
          icon: "material-symbols:code-blocks"
          # 链接
          url: "https://leetcode.cn/u/dayangtuo247/"

# 文章配置
post:
    # 代码高亮配置
    expressiveCode:
        # 主题
        theme: "github-dark"
    # 许可证配置
    license:
        # 启用许可证
        enable: true
        # 许可证名称
        name: "CC BY-NC-SA 4.0"
        # 许可证链接
        url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
        
# Waline / 统计服务配置
waline:
    # 是否启用 Waline 评论/统计接口
    enable: true
    # Worker 地址（评论与统计共用）
    serverURL: "https://api.wqlblog.cn"
    # 语言
    lang: "zh"
    # 是否跟随暗色模式
    dark: "html.dark"
    # Waline 表单字段
    meta: ["nick", "mail", "link"]
    # 必填字段
    requiredMeta: ["nick", "mail"]
    # 是否启用 Waline 自身 pageview 计数
    pageview: false
    # 右侧统计图默认展示最近多少天
    dailyVisitsDays: 30

# 页脚配置
footer:
    # 启用 Footer HTML 注入功能
    enable: true
    # 自定义 HTML 内容，用于添加备案号等信息
    customHtml: "<div>\\
								<a href=\\"https://beian.miit.gov.cn/\\" target=\\"_blank\\"><img src=\\"https://img.shields.io/badge/备案-黔ICP备2022002432号-blue\\" title=\\"黔ICP备2022002432号\\"></a>
							</div>"
`,b=Dr.load(Mr),Br={Home:F.Home,Archive:F.Archive,Projects:F.Projects,Skills:F.Skills,Timeline:F.Timeline,Diary:F.Diary,Albums:F.Albums,Anime:F.Anime,About:F.About,Friends:F.Friends},me=n=>{if(typeof n=="string"){const i=Br[n];if(i===void 0)throw new Error(`Unknown LinkPreset: ${n}`);return i}if(typeof n=="number")return n;const e=n.children?.map(me);return e?{...n,children:e}:n},Yr=n=>n.map(me),Hr=b.post?.comment,L=b.post?.comment?.waline;b.waline?.enable??b.post?.comment?.enable,b.waline?.serverURL??L?.serverURL,b.waline?.lang??L?.lang??b.site.lang,b.waline?.dark??L?.dark,b.waline?.meta??L?.meta,b.waline?.requiredMeta??L?.requiredMeta,b.waline?.pageview??L?.pageview,b.waline?.dailyVisitsDays;({...b.post,comment:{...Hr}});const $r=b.site;Yr(b.navbar.links);const jr=b.sidebar;b.profile;b.footer;const Ur={profile:"@components/sidebar/profile.astro",directory:"@components/sidebar/directory.astro",categories:"@components/sidebar/categories.astro",tags:"@components/sidebar/tags.astro",toc:"@components/sidebar/toc.astro",statistics:"@components/sidebar/statistics.astro",custom:null};class Pr{config;constructor(e=jr){this.config=e}getConfig(){return this.config}shouldShowComponent(e,i){if(!e.visibility||!i)return!0;const{mode:l,paths:r}=e.visibility;let t=i;try{/^https?:\/\//i.test(i)&&(t=new URL(i).pathname)}catch{t=i}const o="/".replace(/\/+$/,"")||"/";let u=t.startsWith("/")?t:"/"+t;o!=="/"&&(u===o?u="/":u.startsWith(`${o}/`)&&(u=u.slice(o.length)||"/")),u.length>1&&u.endsWith("/")&&(u=u.slice(0,-1));const c=r.some(a=>{try{return new RegExp(a).test(u)}catch(p){return console.warn(`Invalid regex pattern in component visibility config: ${a}`,p),!1}});return l==="include"?c:l==="exclude"?!c:!0}getComponentsBySide(e,i,l="default"){let r=[];return l==="right-merged"?r=e==="right"?[...this.config.components.left||[],...this.config.components.right||[]]:[]:r=this.config.components[e]||[],i?r.filter(t=>this.shouldShowComponent(t,i)):r}getComponentsByPosition(e,i){const l=this.getComponentsBySideAndPosition("left",e,i),r=this.getComponentsBySideAndPosition("right",e,i);return[...l,...r]}getComponentsBySideAndPosition(e,i,l,r="default"){const t=(this.config.components.left||[]).filter(u=>u.position===i).filter(u=>this.shouldShowComponent(u,l)),o=(this.config.components.right||[]).filter(u=>u.position===i).filter(u=>this.shouldShowComponent(u,l));return r==="right-merged"?e==="left"?[]:[...t,...o]:e==="left"?[...t,...o]:e==="right"?o:e==="middle"?[...t,...o]:[]}getComponentClass(e,i){const l=[];e.responsive?.hidden&&e.responsive.hidden.forEach(o=>{switch(o){case"mobile":l.push("hidden md:block");break;case"tablet":l.push("md:hidden lg:block");break;case"desktop":l.push("lg:hidden");break}});const r=(this.config.components.left||[]).includes(e),t=(this.config.components.right||[]).includes(e);return i==="left"&&t&&!r&&l.push("hidden md:block lg:hidden"),l.join(" ")}getComponentStyle(e){const i=[];return e.style&&i.push(e.style),i.join("; ")}isCollapsed(e,i){return e.responsive?.collapseThreshold?i>=e.responsive.collapseThreshold:!1}getComponentPath(e){return Ur[e]}hasContentOnSide(e,i=[],l,r="default"){const t=this.getComponentsBySide(e,l,r);return t.length===0?!1:t.some(o=>o.type==="toc"?i&&i.length>0:!0)}updateConfig(e){this.config={...this.config,...e}}addComponent(e,i){this.config.components[i]||(this.config.components[i]=[]),this.config.components[i].push(e)}removeComponent(e){this.config.components.left&&(this.config.components.left=this.config.components.left.filter(i=>i.type!==e)),this.config.components.right&&(this.config.components.right=this.config.components.right.filter(i=>i.type!==e))}reorderComponent(e,i,l){const r=this.config.components[e];if(r&&i>=0&&i<r.length&&l>=0&&l<r.length){const[t]=r.splice(i,1);r.splice(l,0,t)}}isSidebarComponent(){return!0}getPageHeadings(){return typeof document>"u"?[]:Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter(e=>e.id).map(e=>({depth:parseInt(e.tagName.substring(1)),slug:e.id,text:(e.textContent||"").replace(/#+\s*$/,"")}))}getGridLayout(e=[],i,l="default"){const r=this.hasContentOnSide("left",e,i,l),t=this.hasContentOnSide("right",e,i,l),o=r||t,u=r,c=t,a=l==="right-merged"?`
                grid-cols-1
                   md:grid-cols-1
                   ${c?"lg:grid-cols-[1fr_17.5rem]":"lg:grid-cols-1"}
            `.trim().replace(/\s+/g," "):`
                grid-cols-1
                ${o?"md:grid-cols-[17.5rem_1fr]":"md:grid-cols-1"}
                ${u&&c?"lg:grid-cols-[17.5rem_1fr_17.5rem]":u?"lg:grid-cols-[17.5rem_1fr]":c?"lg:grid-cols-[1fr_17.5rem]":"lg:grid-cols-1"}
            `.trim().replace(/\s+/g," "),p=l==="right-merged"?"mb-0 col-span-1 hidden":`
                mb-0 col-span-1 hidden
                ${o?"md:block md:max-w-70":""}
                ${u?"lg:block lg:max-w-70 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2":"lg:hidden"}
            `.trim().replace(/\s+/g," "),f=l==="right-merged"?`
                mb-0 col-span-1 hidden
                   md:hidden
                ${c?"lg:block lg:max-w-70 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2":""}
            `.trim().replace(/\s+/g," "):`
                mb-0 col-span-1 hidden
                md:hidden
                ${c?u?"lg:block lg:max-w-70 lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2":"lg:block lg:max-w-70 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2":"lg:hidden"}
            `.trim().replace(/\s+/g," "),d=l==="right-merged"?`
                footer col-span-1 onload-animation-up block lg:hidden transition-swup-fade
                md:col-span-1
            `.trim().replace(/\s+/g," "):`
                footer col-span-1 onload-animation-up block lg:hidden transition-swup-fade
                ${o?"md:col-span-2":"md:col-span-1"}
            `.trim().replace(/\s+/g," "),h=l==="right-merged"?`
                col-span-1 block md:block lg:hidden
                ${o?"":"hidden"}
            `.trim().replace(/\s+/g," "):`
                col-span-1 block md:hidden
                ${o?"":"hidden"}
            `.trim().replace(/\s+/g," "),m=l==="right-merged"?`
                overflow-hidden w-full
                col-span-1
                   md:col-span-1
                ${c?"lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2":"lg:col-span-1 lg:row-start-1 lg:row-end-2"}
            `.trim().replace(/\s+/g," "):`
                overflow-hidden w-full
                col-span-1 row-start-1 row-end-2
                ${o?"md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2":"md:col-span-1"}
                ${u&&c||u?"lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2":c?"lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2":"lg:col-span-1"}
            `.trim().replace(/\s+/g," ");return{hasLeftSidebar:u,hasRightSidebar:c,hasAnyComponents:o,gridCols:a,leftSidebarClass:p,rightSidebarClass:f,mainContentClass:m,mobileFooterClass:d,middleSidebarClass:h}}}const En=new Pr;function Wr(n){const e=En.getConfig().components.left||[],i=En.getConfig().components.right||[];return e.find(l=>l.type===n)||i.find(l=>l.type===n)}function qr(n,e,i,l){if(typeof document>"u")return;const r=document.getElementById(e),t=n.target,o=Array.isArray(i)?i:[i];for(const u of o)if(t.closest(`#${u}`))return;r&&!r.contains(t)&&l()}export{F as L,Wr as g,qr as o,$r as s,En as w};
