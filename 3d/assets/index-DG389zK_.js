(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qo="160",zh=0,Ta=1,Gh=2,Tl=1,Hh=2,Mn=3,bn=0,kt=1,Ct=2,Tn=0,Ci=1,ln=2,ba=3,wa=4,Vh=5,ei=100,Wh=101,Xh=102,Aa=103,Ra=104,qh=200,Yh=201,jh=202,Kh=203,Ro=204,Co=205,$h=206,Zh=207,Jh=208,Qh=209,eu=210,tu=211,nu=212,iu=213,su=214,ru=0,ou=1,au=2,dr=3,cu=4,lu=5,hu=6,uu=7,bl=0,du=1,fu=2,Bn=0,wl=1,Al=2,Rl=3,Cl=4,pu=5,Ll=6,Ca="attached",mu="detached",Pl=300,Ni=301,Oi=302,Lo=303,Po=304,Mr=306,hn=1e3,jt=1001,fr=1002,yt=1003,Io=1004,ir=1005,Bt=1006,Il=1007,oi=1008,kn=1009,gu=1010,_u=1011,Yo=1012,Dl=1013,On=1014,Sn=1015,an=1016,Ul=1017,Nl=1018,ii=1020,vu=1021,Kt=1023,xu=1024,yu=1025,si=1026,Fi=1027,Mu=1028,Ol=1029,Su=1030,Fl=1031,Bl=1033,zr=33776,Gr=33777,Hr=33778,Vr=33779,La=35840,Pa=35841,Ia=35842,Da=35843,kl=36196,Ua=37492,Na=37496,Oa=37808,Fa=37809,Ba=37810,ka=37811,za=37812,Ga=37813,Ha=37814,Va=37815,Wa=37816,Xa=37817,qa=37818,Ya=37819,ja=37820,Ka=37821,Wr=36492,$a=36494,Za=36495,Eu=36283,Ja=36284,Qa=36285,ec=36286,ps=2300,Bi=2301,Xr=2302,tc=2400,nc=2401,ic=2402,Tu=2500,bu=0,zl=1,Do=2,Gl=3e3,ri=3001,wu=3200,Au=3201,Hl=0,Ru=1,$t="",ct="srgb",Et="srgb-linear",jo="display-p3",Sr="display-p3-linear",pr="linear",nt="srgb",mr="rec709",gr="p3",hi=7680,sc=519,Cu=512,Lu=513,Pu=514,Vl=515,Iu=516,Du=517,Uu=518,Nu=519,_r=35044,rc="300 es",Uo=1035,En=2e3,vr=2001;class Xi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let oc=1234567;const Li=Math.PI/180,ki=180/Math.PI;function nn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[s&255]+bt[s>>8&255]+bt[s>>16&255]+bt[s>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function At(s,e,t){return Math.max(e,Math.min(t,s))}function Ko(s,e){return(s%e+e)%e}function Ou(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Fu(s,e,t){return s!==e?(t-s)/(e-s):0}function hs(s,e,t){return(1-t)*s+t*e}function Bu(s,e,t,n){return hs(s,e,1-Math.exp(-t*n))}function ku(s,e=1){return e-Math.abs(Ko(s,e*2)-e)}function zu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Gu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Hu(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Vu(s,e){return s+Math.random()*(e-s)}function Wu(s){return s*(.5-Math.random())}function Xu(s){s!==void 0&&(oc=s);let e=oc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function qu(s){return s*Li}function Yu(s){return s*ki}function No(s){return(s&s-1)===0&&s!==0}function ju(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function xr(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ku(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*p,a*l);break;case"YXY":s.set(c*p,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function on(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function $e(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const $u={DEG2RAD:Li,RAD2DEG:ki,generateUUID:nn,clamp:At,euclideanModulo:Ko,mapLinear:Ou,inverseLerp:Fu,lerp:hs,damp:Bu,pingpong:ku,smoothstep:zu,smootherstep:Gu,randInt:Hu,randFloat:Vu,randFloatSpread:Wu,seededRandom:Xu,degToRad:qu,radToDeg:Yu,isPowerOfTwo:No,ceilPowerOfTwo:ju,floorPowerOfTwo:xr,setQuaternionFromProperEuler:Ku,normalize:$e,denormalize:on};class ve{constructor(e=0,t=0){ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,t,n,i,r,o,a,c,l){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],x=i[1],v=i[4],S=i[7],C=i[2],A=i[5],w=i[8];return r[0]=o*_+a*x+c*C,r[3]=o*m+a*v+c*A,r[6]=o*f+a*S+c*w,r[1]=l*_+h*x+u*C,r[4]=l*m+h*v+u*A,r[7]=l*f+h*S+u*w,r[2]=d*_+p*x+g*C,r[5]=d*m+p*v+g*A,r[8]=d*f+p*S+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=t*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(qr.makeScale(e,t)),this}rotate(e){return this.premultiply(qr.makeRotation(-e)),this}translate(e,t){return this.premultiply(qr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const qr=new ze;function Wl(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ms(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Zu(){const s=ms("canvas");return s.style.display="block",s}const ac={};function us(s){s in ac||(ac[s]=!0,console.warn(s))}const cc=new ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),lc=new ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Es={[Et]:{transfer:pr,primaries:mr,toReference:s=>s,fromReference:s=>s},[ct]:{transfer:nt,primaries:mr,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Sr]:{transfer:pr,primaries:gr,toReference:s=>s.applyMatrix3(lc),fromReference:s=>s.applyMatrix3(cc)},[jo]:{transfer:nt,primaries:gr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(lc),fromReference:s=>s.applyMatrix3(cc).convertLinearToSRGB()}},Ju=new Set([Et,Sr]),Xe={enabled:!0,_workingColorSpace:Et,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Ju.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=Es[e].toReference,i=Es[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Es[s].primaries},getTransfer:function(s){return s===$t?pr:Es[s].transfer}};function Pi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Yr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ui;class Xl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ui===void 0&&(ui=ms("canvas")),ui.width=e.width,ui.height=e.height;const n=ui.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ui}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ms("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Pi(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Pi(t[n]/255)*255):t[n]=Pi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qu=0;class ql{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=nn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(jr(i[o].image)):r.push(jr(i[o]))}else r=jr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function jr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Xl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ed=0;class St extends Xi{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,n=jt,i=jt,r=Bt,o=oi,a=Kt,c=kn,l=St.DEFAULT_ANISOTROPY,h=$t){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=nn(),this.name="",this.source=new ql(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ri?ct:$t),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hn:e.x=e.x-Math.floor(e.x);break;case jt:e.x=e.x<0?0:1;break;case fr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hn:e.y=e.y-Math.floor(e.y);break;case jt:e.y=e.y<0?0:1;break;case fr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ct?ri:Gl}set encoding(e){us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ri?ct:$t}}St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=Pl;St.DEFAULT_ANISOTROPY=1;class je{constructor(e=0,t=0,n=0,i=1){je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,S=(p+1)/2,C=(f+1)/2,A=(h+d)/4,w=(u+_)/4,I=(g+m)/4;return v>S&&v>C?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=A/n,r=w/n):S>C?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=A/i,r=I/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=w/r,i=I/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class td extends Xi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new je(0,0,e,t),this.scissorTest=!1,this.viewport=new je(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(us("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ri?ct:$t),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new St(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ql(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zt extends td{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yl extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=yt,this.minFilter=yt,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nd extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=yt,this.minFilter=yt,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==p||h!==g){let m=1-a;const f=c*d+l*p+h*g+u*_,x=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const C=Math.sqrt(v),A=Math.atan2(C,f*x);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}const S=a*x;if(c=c*m+d*S,l=l*m+p*S,h=h*m+g*S,u=u*m+_*S,m===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-a*p,e[t+2]=l*g+h*p+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),p=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-i)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(At(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Kr.copy(this).projectOnVector(e),this.sub(Kr)}reflect(e){return this.sub(Kr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kr=new R,hc=new Xn;class wn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Jt):Jt.fromBufferAttribute(r,o),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ts.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ts.copy(n.boundingBox)),Ts.applyMatrix4(e.matrixWorld),this.union(Ts)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(es),bs.subVectors(this.max,es),di.subVectors(e.a,es),fi.subVectors(e.b,es),pi.subVectors(e.c,es),Rn.subVectors(fi,di),Cn.subVectors(pi,fi),jn.subVectors(di,pi);let t=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-jn.z,jn.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,jn.z,0,-jn.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-jn.y,jn.x,0];return!$r(t,di,fi,pi,bs)||(t=[1,0,0,0,1,0,0,0,1],!$r(t,di,fi,pi,bs))?!1:(ws.crossVectors(Rn,Cn),t=[ws.x,ws.y,ws.z],$r(t,di,fi,pi,bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const mn=[new R,new R,new R,new R,new R,new R,new R,new R],Jt=new R,Ts=new wn,di=new R,fi=new R,pi=new R,Rn=new R,Cn=new R,jn=new R,es=new R,bs=new R,ws=new R,Kn=new R;function $r(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Kn.fromArray(s,r);const a=i.x*Math.abs(Kn.x)+i.y*Math.abs(Kn.y)+i.z*Math.abs(Kn.z),c=e.dot(Kn),l=t.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const id=new wn,ts=new R,Zr=new R;class dn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):id.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ts.subVectors(e,this.center);const t=ts.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ts,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ts.copy(e.center).add(Zr)),this.expandByPoint(ts.copy(e.center).sub(Zr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gn=new R,Jr=new R,As=new R,Ln=new R,Qr=new R,Rs=new R,eo=new R;class Er{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gn.copy(this.origin).addScaledVector(this.direction,t),gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Jr.copy(e).add(t).multiplyScalar(.5),As.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(Jr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(As),a=Ln.dot(this.direction),c=-Ln.dot(As),l=Ln.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Jr).addScaledVector(As,d),p}intersectSphere(e,t){gn.subVectors(e.center,this.origin);const n=gn.dot(this.direction),i=gn.dot(gn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,gn)!==null}intersectTriangle(e,t,n,i,r){Qr.subVectors(t,e),Rs.subVectors(n,e),eo.crossVectors(Qr,Rs);let o=this.direction.dot(eo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ln.subVectors(this.origin,e);const c=a*this.direction.dot(Rs.crossVectors(Ln,Rs));if(c<0)return null;const l=a*this.direction.dot(Qr.cross(Ln));if(l<0||c+l>o)return null;const h=-a*Ln.dot(eo);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue{constructor(e,t,n,i,r,o,a,c,l,h,u,d,p,g,_,m){Ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,u,d,p,g,_,m)}set(e,t,n,i,r,o,a,c,l,h,u,d,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ue().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/mi.setFromMatrixColumn(e,0).length(),r=1/mi.setFromMatrixColumn(e,1).length(),o=1/mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sd,e,rd)}lookAt(e,t,n){const i=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Pn.crossVectors(n,Gt),Pn.lengthSq()===0&&(Math.abs(n.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Pn.crossVectors(n,Gt)),Pn.normalize(),Cs.crossVectors(Gt,Pn),i[0]=Pn.x,i[4]=Cs.x,i[8]=Gt.x,i[1]=Pn.y,i[5]=Cs.y,i[9]=Gt.y,i[2]=Pn.z,i[6]=Cs.z,i[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],x=n[3],v=n[7],S=n[11],C=n[15],A=i[0],w=i[4],I=i[8],y=i[12],T=i[1],U=i[5],B=i[9],$=i[13],P=i[2],F=i[6],V=i[10],q=i[14],X=i[3],Y=i[7],j=i[11],te=i[15];return r[0]=o*A+a*T+c*P+l*X,r[4]=o*w+a*U+c*F+l*Y,r[8]=o*I+a*B+c*V+l*j,r[12]=o*y+a*$+c*q+l*te,r[1]=h*A+u*T+d*P+p*X,r[5]=h*w+u*U+d*F+p*Y,r[9]=h*I+u*B+d*V+p*j,r[13]=h*y+u*$+d*q+p*te,r[2]=g*A+_*T+m*P+f*X,r[6]=g*w+_*U+m*F+f*Y,r[10]=g*I+_*B+m*V+f*j,r[14]=g*y+_*$+m*q+f*te,r[3]=x*A+v*T+S*P+C*X,r[7]=x*w+v*U+S*F+C*Y,r[11]=x*I+v*B+S*V+C*j,r[15]=x*y+v*$+S*q+C*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*p-n*c*p)+_*(+t*c*p-t*l*d+r*o*d-i*o*p+i*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+f*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],x=u*m*l-_*d*l+_*c*p-a*m*p-u*c*f+a*d*f,v=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,S=h*_*l-g*u*l+g*a*p-o*_*p-h*a*f+o*u*f,C=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,A=t*x+n*v+i*S+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=x*w,e[1]=(_*d*r-u*m*r-_*i*p+n*m*p+u*i*f-n*d*f)*w,e[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*f+n*c*f)*w,e[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*p-n*c*p)*w,e[4]=v*w,e[5]=(h*m*r-g*d*r+g*i*p-t*m*p-h*i*f+t*d*f)*w,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*f-t*c*f)*w,e[7]=(o*d*r-h*c*r+h*i*l-t*d*l-o*i*p+t*c*p)*w,e[8]=S*w,e[9]=(g*u*r-h*_*r-g*n*p+t*_*p+h*n*f-t*u*f)*w,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*f+t*a*f)*w,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*w,e[12]=C*w,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*w,e[14]=(g*a*i-o*_*i-g*n*c+t*_*c+o*n*m-t*a*m)*w,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,x=c*l,v=c*h,S=c*u,C=n.x,A=n.y,w=n.z;return i[0]=(1-(_+f))*C,i[1]=(p+S)*C,i[2]=(g-v)*C,i[3]=0,i[4]=(p-S)*A,i[5]=(1-(d+f))*A,i[6]=(m+x)*A,i[7]=0,i[8]=(g+v)*w,i[9]=(m-x)*w,i[10]=(1-(d+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=mi.set(i[0],i[1],i[2]).length();const o=mi.set(i[4],i[5],i[6]).length(),a=mi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Qt.copy(this);const l=1/r,h=1/o,u=1/a;return Qt.elements[0]*=l,Qt.elements[1]*=l,Qt.elements[2]*=l,Qt.elements[4]*=h,Qt.elements[5]*=h,Qt.elements[6]*=h,Qt.elements[8]*=u,Qt.elements[9]*=u,Qt.elements[10]*=u,t.setFromRotationMatrix(Qt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=En){const c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let p,g;if(a===En)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===vr)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=En){const c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*l,p=(n+i)*h;let g,_;if(a===En)g=(o+r)*u,_=-2*u;else if(a===vr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const mi=new R,Qt=new Ue,sd=new R(0,0,0),rd=new R(1,1,1),Pn=new R,Cs=new R,Gt=new R,uc=new Ue,dc=new Xn;class Tr{constructor(e=0,t=0,n=0,i=Tr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(At(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-At(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(At(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-At(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(At(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-At(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return uc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dc.setFromEuler(this),this.setFromQuaternion(dc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tr.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let od=0;const fc=new R,gi=new Xn,_n=new Ue,Ls=new R,ns=new R,ad=new R,cd=new Xn,pc=new R(1,0,0),mc=new R(0,1,0),gc=new R(0,0,1),ld={type:"added"},hd={type:"removed"};class it extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=it.DEFAULT_UP.clone();const e=new R,t=new Tr,n=new Xn,i=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ue},normalMatrix:{value:new ze}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=it.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.multiply(gi),this}rotateOnWorldAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.premultiply(gi),this}rotateX(e){return this.rotateOnAxis(pc,e)}rotateY(e){return this.rotateOnAxis(mc,e)}rotateZ(e){return this.rotateOnAxis(gc,e)}translateOnAxis(e,t){return fc.copy(e).applyQuaternion(this.quaternion),this.position.add(fc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pc,e)}translateY(e){return this.translateOnAxis(mc,e)}translateZ(e){return this.translateOnAxis(gc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ls.copy(e):Ls.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(ns,Ls,this.up):_n.lookAt(Ls,ns,this.up),this.quaternion.setFromRotationMatrix(_n),i&&(_n.extractRotation(i.matrixWorld),gi.setFromRotationMatrix(_n),this.quaternion.premultiply(gi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ld)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(hd)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,e,ad),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,cd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}it.DEFAULT_UP=new R(0,1,0);it.DEFAULT_MATRIX_AUTO_UPDATE=!0;it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new R,vn=new R,to=new R,xn=new R,_i=new R,vi=new R,_c=new R,no=new R,io=new R,so=new R;let Ps=!1;class qt{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),en.subVectors(e,t),i.cross(en);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){en.subVectors(i,t),vn.subVectors(n,t),to.subVectors(e,t);const o=en.dot(en),a=en.dot(vn),c=en.dot(to),l=vn.dot(vn),h=vn.dot(to),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getUV(e,t,n,i,r,o,a,c){return Ps===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ps=!0),this.getInterpolation(e,t,n,i,r,o,a,c)}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xn.x),c.addScaledVector(o,xn.y),c.addScaledVector(a,xn.z),c)}static isFrontFacing(e,t,n,i){return en.subVectors(n,t),vn.subVectors(e,t),en.cross(vn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return en.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),en.cross(vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return qt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return Ps===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ps=!0),qt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return qt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;_i.subVectors(i,n),vi.subVectors(r,n),no.subVectors(e,n);const c=_i.dot(no),l=vi.dot(no);if(c<=0&&l<=0)return t.copy(n);io.subVectors(e,i);const h=_i.dot(io),u=vi.dot(io);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(_i,o);so.subVectors(e,r);const p=_i.dot(so),g=vi.dot(so);if(g>=0&&p<=g)return t.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(vi,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return _c.subVectors(r,i),a=(u-h)/(u-h+(p-g)),t.copy(i).addScaledVector(_c,a);const f=1/(m+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(_i,o).addScaledVector(vi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},Is={h:0,s:0,l:0};function ro(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Xe.workingColorSpace){if(e=Ko(e,1),t=At(t,0,1),n=At(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ro(o,r,e+1/3),this.g=ro(o,r,e),this.b=ro(o,r,e-1/3)}return Xe.toWorkingColorSpace(this,i),this}setStyle(e,t=ct){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ct){const n=Kl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=Yr(e.r),this.g=Yr(e.g),this.b=Yr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ct){return Xe.fromWorkingColorSpace(wt.copy(this),e),Math.round(At(wt.r*255,0,255))*65536+Math.round(At(wt.g*255,0,255))*256+Math.round(At(wt.b*255,0,255))}getHexString(e=ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.fromWorkingColorSpace(wt.copy(this),t);const n=wt.r,i=wt.g,r=wt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.fromWorkingColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=ct){Xe.fromWorkingColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,i=wt.b;return e!==ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(In),this.setHSL(In.h+e,In.s+t,In.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(In),e.getHSL(Is);const n=hs(In.h,Is.h,t),i=hs(In.s,Is.s,t),r=hs(In.l,Is.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new fe;fe.NAMES=Kl;let ud=0;class cn extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=nn(),this.name="",this.type="Material",this.blending=Ci,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ro,this.blendDst=Co,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=dr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hi,this.stencilZFail=hi,this.stencilZPass=hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ci&&(n.blending=this.blending),this.side!==bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ro&&(n.blendSrc=this.blendSrc),this.blendDst!==Co&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==dr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Mt extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=bl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new R,Ds=new ve;class pt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=_r,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ds.fromBufferAttribute(this,t),Ds.applyMatrix3(e),this.setXY(t,Ds.x,Ds.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=on(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$e(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=on(t,this.array)),t}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=on(t,this.array)),t}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=on(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=on(t,this.array)),t}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),i=$e(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),i=$e(i,this.array),r=$e(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_r&&(e.usage=this.usage),e}}class $l extends pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zl extends pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Je extends pt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let dd=0;const Wt=new Ue,oo=new it,xi=new R,Ht=new wn,is=new wn,xt=new R;class ut extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=nn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wl(e)?Zl:$l)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return oo.lookAt(e),oo.updateMatrix(),this.applyMatrix4(oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xi).negate(),this.translate(xi.x,xi.y,xi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Je(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Ht.setFromBufferAttribute(r),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];is.setFromBufferAttribute(a),this.morphTargetsRelative?(xt.addVectors(Ht.min,is.min),Ht.expandByPoint(xt),xt.addVectors(Ht.max,is.max),Ht.expandByPoint(xt)):(Ht.expandByPoint(is.min),Ht.expandByPoint(is.max))}Ht.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)xt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(xt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)xt.fromBufferAttribute(a,l),c&&(xi.fromBufferAttribute(e,l),xt.add(xi)),i=Math.max(i,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pt(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let T=0;T<a;T++)l[T]=new R,h[T]=new R;const u=new R,d=new R,p=new R,g=new ve,_=new ve,m=new ve,f=new R,x=new R;function v(T,U,B){u.fromArray(i,T*3),d.fromArray(i,U*3),p.fromArray(i,B*3),g.fromArray(o,T*2),_.fromArray(o,U*2),m.fromArray(o,B*2),d.sub(u),p.sub(u),_.sub(g),m.sub(g);const $=1/(_.x*m.y-m.x*_.y);isFinite($)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar($),x.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar($),l[T].add(f),l[U].add(f),l[B].add(f),h[T].add(x),h[U].add(x),h[B].add(x))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let T=0,U=S.length;T<U;++T){const B=S[T],$=B.start,P=B.count;for(let F=$,V=$+P;F<V;F+=3)v(n[F+0],n[F+1],n[F+2])}const C=new R,A=new R,w=new R,I=new R;function y(T){w.fromArray(r,T*3),I.copy(w);const U=l[T];C.copy(U),C.sub(w.multiplyScalar(w.dot(U))).normalize(),A.crossVectors(I,U);const $=A.dot(h[T])<0?-1:1;c[T*4]=C.x,c[T*4+1]=C.y,c[T*4+2]=C.z,c[T*4+3]=$}for(let T=0,U=S.length;T<U;++T){const B=S[T],$=B.start,P=B.count;for(let F=$,V=$+P;F<V;F+=3)y(n[F+0]),y(n[F+1]),y(n[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new R,r=new R,o=new R,a=new R,c=new R,l=new R,h=new R,u=new R;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new pt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ut,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vc=new Ue,$n=new Er,Us=new dn,xc=new R,yi=new R,Mi=new R,Si=new R,ao=new R,Ns=new R,Os=new ve,Fs=new ve,Bs=new ve,yc=new R,Mc=new R,Sc=new R,ks=new R,zs=new R;class Ze extends it{constructor(e=new ut,t=new Mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){Ns.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(ao.fromBufferAttribute(u,e),o?Ns.addScaledVector(ao,h):Ns.addScaledVector(ao.sub(t),h))}t.add(Ns)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(r),$n.copy(e.ray).recast(e.near),!(Us.containsPoint($n.origin)===!1&&($n.intersectSphere(Us,xc)===null||$n.origin.distanceToSquared(xc)>(e.far-e.near)**2))&&(vc.copy(r).invert(),$n.copy(e.ray).applyMatrix4(vc),!(n.boundingBox!==null&&$n.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,$n)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],x=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=x,C=v;S<C;S+=3){const A=a.getX(S),w=a.getX(S+1),I=a.getX(S+2);i=Gs(this,f,e,n,l,h,u,A,w,I),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const x=a.getX(m),v=a.getX(m+1),S=a.getX(m+2);i=Gs(this,o,e,n,l,h,u,x,v,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],x=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=x,C=v;S<C;S+=3){const A=S,w=S+1,I=S+2;i=Gs(this,f,e,n,l,h,u,A,w,I),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const x=m,v=m+1,S=m+2;i=Gs(this,o,e,n,l,h,u,x,v,S),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function fd(s,e,t,n,i,r,o,a){let c;if(e.side===kt?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===bn,a),c===null)return null;zs.copy(a),zs.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(zs);return l<t.near||l>t.far?null:{distance:l,point:zs.clone(),object:s}}function Gs(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,yi),s.getVertexPosition(c,Mi),s.getVertexPosition(l,Si);const h=fd(s,e,t,n,yi,Mi,Si,ks);if(h){i&&(Os.fromBufferAttribute(i,a),Fs.fromBufferAttribute(i,c),Bs.fromBufferAttribute(i,l),h.uv=qt.getInterpolation(ks,yi,Mi,Si,Os,Fs,Bs,new ve)),r&&(Os.fromBufferAttribute(r,a),Fs.fromBufferAttribute(r,c),Bs.fromBufferAttribute(r,l),h.uv1=qt.getInterpolation(ks,yi,Mi,Si,Os,Fs,Bs,new ve),h.uv2=h.uv1),o&&(yc.fromBufferAttribute(o,a),Mc.fromBufferAttribute(o,c),Sc.fromBufferAttribute(o,l),h.normal=qt.getInterpolation(ks,yi,Mi,Si,yc,Mc,Sc,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new R,materialIndex:0};qt.getNormal(yi,Mi,Si,u.normal),h.face=u}return h}class Gn extends ut{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Je(l,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(u,2));function g(_,m,f,x,v,S,C,A,w,I,y){const T=S/w,U=C/I,B=S/2,$=C/2,P=A/2,F=w+1,V=I+1;let q=0,X=0;const Y=new R;for(let j=0;j<V;j++){const te=j*U-$;for(let ne=0;ne<F;ne++){const W=ne*T-B;Y[_]=W*x,Y[m]=te*v,Y[f]=P,l.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[f]=A>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(ne/w),u.push(1-j/I),q+=1}}for(let j=0;j<I;j++)for(let te=0;te<w;te++){const ne=d+te+F*j,W=d+te+F*(j+1),K=d+(te+1)+F*(j+1),N=d+(te+1)+F*j;c.push(ne,W,N),c.push(W,K,N),X+=6}a.addGroup(p,X,y),p+=X,d+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zi(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Nt(s){const e={};for(let t=0;t<s.length;t++){const n=zi(s[t]);for(const i in n)e[i]=n[i]}return e}function pd(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Jl(s){return s.getRenderTarget()===null?s.outputColorSpace:Xe.workingColorSpace}const Gi={clone:zi,merge:Nt};var md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Lt extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=md,this.fragmentShader=gd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zi(e.uniforms),this.uniformsGroups=pd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ql extends it{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=En}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Rt extends Ql{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ki*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Li*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ki*2*Math.atan(Math.tan(Li*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Li*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ei=-90,Ti=1;class _d extends it{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Rt(Ei,Ti,e,t);i.layers=this.layers,this.add(i);const r=new Rt(Ei,Ti,e,t);r.layers=this.layers,this.add(r);const o=new Rt(Ei,Ti,e,t);o.layers=this.layers,this.add(o);const a=new Rt(Ei,Ti,e,t);a.layers=this.layers,this.add(a);const c=new Rt(Ei,Ti,e,t);c.layers=this.layers,this.add(c);const l=new Rt(Ei,Ti,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class eh extends St{constructor(e,t,n,i,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Ni,super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vd extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(us("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ri?ct:$t),this.texture=new eh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Gn(5,5,5),r=new Lt({name:"CubemapFromEquirect",uniforms:zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kt,blending:Tn});r.uniforms.tEquirect.value=t;const o=new Ze(i,r),a=t.minFilter;return t.minFilter===oi&&(t.minFilter=Bt),new _d(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const co=new R,xd=new R,yd=new ze;class Un{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=co.subVectors(n,t).cross(xd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(co),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||yd.getNormalMatrix(e),i=this.coplanarPoint(co).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zn=new dn,Hs=new R;class $o{constructor(e=new Un,t=new Un,n=new Un,i=new Un,r=new Un,o=new Un){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],p=i[8],g=i[9],_=i[10],m=i[11],f=i[12],x=i[13],v=i[14],S=i[15];if(n[0].setComponents(c-r,d-l,m-p,S-f).normalize(),n[1].setComponents(c+r,d+l,m+p,S+f).normalize(),n[2].setComponents(c+o,d+h,m+g,S+x).normalize(),n[3].setComponents(c-o,d-h,m-g,S-x).normalize(),n[4].setComponents(c-a,d-u,m-_,S-v).normalize(),t===En)n[5].setComponents(c+a,d+u,m+_,S+v).normalize();else if(t===vr)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(e){return Zn.center.set(0,0,0),Zn.radius=.7071067811865476,Zn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Hs.x=i.normal.x>0?e.max.x:e.min.x,Hs.y=i.normal.y>0?e.max.y:e.min.y,Hs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Hs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function th(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Md(s,e){const t=e.isWebGL2,n=new WeakMap;function i(l,h){const u=l.array,d=l.usage,p=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),l.onUploadCallback();let _;if(u instanceof Float32Array)_=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=s.SHORT;else if(u instanceof Uint32Array)_=s.UNSIGNED_INT;else if(u instanceof Int32Array)_=s.INT;else if(u instanceof Int8Array)_=s.BYTE;else if(u instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,h,u){const d=h.array,p=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,l),p.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const f=g[_];t?s.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):s.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}class Hn extends ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const x=f*d-o;for(let v=0;v<l;v++){const S=v*u-r;g.push(S,-x,0),_.push(0,0,1),m.push(v/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let x=0;x<a;x++){const v=x+l*f,S=x+l*(f+1),C=x+1+l*(f+1),A=x+1+l*f;p.push(v,S,A),p.push(S,C,A)}this.setIndex(p),this.setAttribute("position",new Je(g,3)),this.setAttribute("normal",new Je(_,3)),this.setAttribute("uv",new Je(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Sd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ed=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Td=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ld=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Pd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ud=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Nd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Od=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Xd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Yd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,jd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,ef=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,tf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,of=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,af=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,df=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ff=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_f=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ef=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Tf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Af=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Cf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Lf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,If=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Df=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Of=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ff=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Bf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,kf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,zf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ep=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,rp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,op=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ap=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,up=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_p=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ep=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Lp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Op=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Fp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$p=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,em=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,De={alphahash_fragment:Sd,alphahash_pars_fragment:Ed,alphamap_fragment:Td,alphamap_pars_fragment:bd,alphatest_fragment:wd,alphatest_pars_fragment:Ad,aomap_fragment:Rd,aomap_pars_fragment:Cd,batching_pars_vertex:Ld,batching_vertex:Pd,begin_vertex:Id,beginnormal_vertex:Dd,bsdfs:Ud,iridescence_fragment:Nd,bumpmap_pars_fragment:Od,clipping_planes_fragment:Fd,clipping_planes_pars_fragment:Bd,clipping_planes_pars_vertex:kd,clipping_planes_vertex:zd,color_fragment:Gd,color_pars_fragment:Hd,color_pars_vertex:Vd,color_vertex:Wd,common:Xd,cube_uv_reflection_fragment:qd,defaultnormal_vertex:Yd,displacementmap_pars_vertex:jd,displacementmap_vertex:Kd,emissivemap_fragment:$d,emissivemap_pars_fragment:Zd,colorspace_fragment:Jd,colorspace_pars_fragment:Qd,envmap_fragment:ef,envmap_common_pars_fragment:tf,envmap_pars_fragment:nf,envmap_pars_vertex:sf,envmap_physical_pars_fragment:gf,envmap_vertex:rf,fog_vertex:of,fog_pars_vertex:af,fog_fragment:cf,fog_pars_fragment:lf,gradientmap_pars_fragment:hf,lightmap_fragment:uf,lightmap_pars_fragment:df,lights_lambert_fragment:ff,lights_lambert_pars_fragment:pf,lights_pars_begin:mf,lights_toon_fragment:_f,lights_toon_pars_fragment:vf,lights_phong_fragment:xf,lights_phong_pars_fragment:yf,lights_physical_fragment:Mf,lights_physical_pars_fragment:Sf,lights_fragment_begin:Ef,lights_fragment_maps:Tf,lights_fragment_end:bf,logdepthbuf_fragment:wf,logdepthbuf_pars_fragment:Af,logdepthbuf_pars_vertex:Rf,logdepthbuf_vertex:Cf,map_fragment:Lf,map_pars_fragment:Pf,map_particle_fragment:If,map_particle_pars_fragment:Df,metalnessmap_fragment:Uf,metalnessmap_pars_fragment:Nf,morphcolor_vertex:Of,morphnormal_vertex:Ff,morphtarget_pars_vertex:Bf,morphtarget_vertex:kf,normal_fragment_begin:zf,normal_fragment_maps:Gf,normal_pars_fragment:Hf,normal_pars_vertex:Vf,normal_vertex:Wf,normalmap_pars_fragment:Xf,clearcoat_normal_fragment_begin:qf,clearcoat_normal_fragment_maps:Yf,clearcoat_pars_fragment:jf,iridescence_pars_fragment:Kf,opaque_fragment:$f,packing:Zf,premultiplied_alpha_fragment:Jf,project_vertex:Qf,dithering_fragment:ep,dithering_pars_fragment:tp,roughnessmap_fragment:np,roughnessmap_pars_fragment:ip,shadowmap_pars_fragment:sp,shadowmap_pars_vertex:rp,shadowmap_vertex:op,shadowmask_pars_fragment:ap,skinbase_vertex:cp,skinning_pars_vertex:lp,skinning_vertex:hp,skinnormal_vertex:up,specularmap_fragment:dp,specularmap_pars_fragment:fp,tonemapping_fragment:pp,tonemapping_pars_fragment:mp,transmission_fragment:gp,transmission_pars_fragment:_p,uv_pars_fragment:vp,uv_pars_vertex:xp,uv_vertex:yp,worldpos_vertex:Mp,background_vert:Sp,background_frag:Ep,backgroundCube_vert:Tp,backgroundCube_frag:bp,cube_vert:wp,cube_frag:Ap,depth_vert:Rp,depth_frag:Cp,distanceRGBA_vert:Lp,distanceRGBA_frag:Pp,equirect_vert:Ip,equirect_frag:Dp,linedashed_vert:Up,linedashed_frag:Np,meshbasic_vert:Op,meshbasic_frag:Fp,meshlambert_vert:Bp,meshlambert_frag:kp,meshmatcap_vert:zp,meshmatcap_frag:Gp,meshnormal_vert:Hp,meshnormal_frag:Vp,meshphong_vert:Wp,meshphong_frag:Xp,meshphysical_vert:qp,meshphysical_frag:Yp,meshtoon_vert:jp,meshtoon_frag:Kp,points_vert:$p,points_frag:Zp,shadow_vert:Jp,shadow_frag:Qp,sprite_vert:em,sprite_frag:tm},re={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},rn={basic:{uniforms:Nt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:Nt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new fe(0)}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:Nt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:Nt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:Nt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new fe(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:Nt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:Nt([re.points,re.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:Nt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:Nt([re.common,re.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:Nt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:Nt([re.sprite,re.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distanceRGBA:{uniforms:Nt([re.common,re.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distanceRGBA_vert,fragmentShader:De.distanceRGBA_frag},shadow:{uniforms:Nt([re.lights,re.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};rn.physical={uniforms:Nt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const Vs={r:0,b:0,g:0};function nm(s,e,t,n,i,r,o){const a=new fe(0);let c=r===!0?0:1,l,h,u=null,d=0,p=null;function g(m,f){let x=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,c):v&&v.isColor&&(_(v,1),x=!0);const S=s.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Mr)?(h===void 0&&(h=new Ze(new Gn(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:zi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=Xe.getTransfer(v.colorSpace)!==nt,(u!==v||d!==v.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,p=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Ze(new Hn(2,2),new Lt({name:"BackgroundMaterial",uniforms:zi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=Xe.getTransfer(v.colorSpace)!==nt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,p=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,f){m.getRGB(Vs,Jl(s)),n.buffers.color.setClear(Vs.r,Vs.g,Vs.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),c=f,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function im(s,e,t,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null);let l=c,h=!1;function u(P,F,V,q,X){let Y=!1;if(o){const j=_(q,V,F);l!==j&&(l=j,p(l.object)),Y=f(P,q,V,X),Y&&x(P,q,V,X)}else{const j=F.wireframe===!0;(l.geometry!==q.id||l.program!==V.id||l.wireframe!==j)&&(l.geometry=q.id,l.program=V.id,l.wireframe=j,Y=!0)}X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,I(P,F,V,q),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(P){return n.isWebGL2?s.bindVertexArray(P):r.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?s.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function _(P,F,V){const q=V.wireframe===!0;let X=a[P.id];X===void 0&&(X={},a[P.id]=X);let Y=X[F.id];Y===void 0&&(Y={},X[F.id]=Y);let j=Y[q];return j===void 0&&(j=m(d()),Y[q]=j),j}function m(P){const F=[],V=[],q=[];for(let X=0;X<i;X++)F[X]=0,V[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:V,attributeDivisors:q,object:P,attributes:{},index:null}}function f(P,F,V,q){const X=l.attributes,Y=F.attributes;let j=0;const te=V.getAttributes();for(const ne in te)if(te[ne].location>=0){const K=X[ne];let N=Y[ne];if(N===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(N=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(N=P.instanceColor)),K===void 0||K.attribute!==N||N&&K.data!==N.data)return!0;j++}return l.attributesNum!==j||l.index!==q}function x(P,F,V,q){const X={},Y=F.attributes;let j=0;const te=V.getAttributes();for(const ne in te)if(te[ne].location>=0){let K=Y[ne];K===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));const N={};N.attribute=K,K&&K.data&&(N.data=K.data),X[ne]=N,j++}l.attributes=X,l.attributesNum=j,l.index=q}function v(){const P=l.newAttributes;for(let F=0,V=P.length;F<V;F++)P[F]=0}function S(P){C(P,0)}function C(P,F){const V=l.newAttributes,q=l.enabledAttributes,X=l.attributeDivisors;V[P]=1,q[P]===0&&(s.enableVertexAttribArray(P),q[P]=1),X[P]!==F&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,F),X[P]=F)}function A(){const P=l.newAttributes,F=l.enabledAttributes;for(let V=0,q=F.length;V<q;V++)F[V]!==P[V]&&(s.disableVertexAttribArray(V),F[V]=0)}function w(P,F,V,q,X,Y,j){j===!0?s.vertexAttribIPointer(P,F,V,X,Y):s.vertexAttribPointer(P,F,V,q,X,Y)}function I(P,F,V,q){if(n.isWebGL2===!1&&(P.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const X=q.attributes,Y=V.getAttributes(),j=F.defaultAttributeValues;for(const te in Y){const ne=Y[te];if(ne.location>=0){let W=X[te];if(W===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(W=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(W=P.instanceColor)),W!==void 0){const K=W.normalized,N=W.itemSize,ie=t.get(W);if(ie===void 0)continue;const ce=ie.buffer,xe=ie.type,ye=ie.bytesPerElement,Me=n.isWebGL2===!0&&(xe===s.INT||xe===s.UNSIGNED_INT||W.gpuType===Dl);if(W.isInterleavedBufferAttribute){const Ve=W.data,O=Ve.stride,lt=W.offset;if(Ve.isInstancedInterleavedBuffer){for(let _e=0;_e<ne.locationSize;_e++)C(ne.location+_e,Ve.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Ve.meshPerAttribute*Ve.count)}else for(let _e=0;_e<ne.locationSize;_e++)S(ne.location+_e);s.bindBuffer(s.ARRAY_BUFFER,ce);for(let _e=0;_e<ne.locationSize;_e++)w(ne.location+_e,N/ne.locationSize,xe,K,O*ye,(lt+N/ne.locationSize*_e)*ye,Me)}else{if(W.isInstancedBufferAttribute){for(let Ve=0;Ve<ne.locationSize;Ve++)C(ne.location+Ve,W.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Ve=0;Ve<ne.locationSize;Ve++)S(ne.location+Ve);s.bindBuffer(s.ARRAY_BUFFER,ce);for(let Ve=0;Ve<ne.locationSize;Ve++)w(ne.location+Ve,N/ne.locationSize,xe,K,N*ye,N/ne.locationSize*Ve*ye,Me)}}else if(j!==void 0){const K=j[te];if(K!==void 0)switch(K.length){case 2:s.vertexAttrib2fv(ne.location,K);break;case 3:s.vertexAttrib3fv(ne.location,K);break;case 4:s.vertexAttrib4fv(ne.location,K);break;default:s.vertexAttrib1fv(ne.location,K)}}}}A()}function y(){B();for(const P in a){const F=a[P];for(const V in F){const q=F[V];for(const X in q)g(q[X].object),delete q[X];delete F[V]}delete a[P]}}function T(P){if(a[P.id]===void 0)return;const F=a[P.id];for(const V in F){const q=F[V];for(const X in q)g(q[X].object),delete q[X];delete F[V]}delete a[P.id]}function U(P){for(const F in a){const V=a[F];if(V[P.id]===void 0)continue;const q=V[P.id];for(const X in q)g(q[X].object),delete q[X];delete V[P.id]}}function B(){$(),h=!0,l!==c&&(l=c,p(l.object))}function $(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:B,resetDefaultState:$,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:S,disableUnusedAttributes:A}}function sm(s,e,t,n){const i=n.isWebGL2;let r;function o(h){r=h}function a(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,d){if(d===0)return;let p,g;if(i)p=s,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,u,d),t.update(u,r,d)}function l(h,u,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function rm(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),f=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,S=o||e.has("OES_texture_float"),C=v&&S,A=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:S,floatVertexTextures:C,maxSamples:A}}function om(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new Un,a=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{const x=r?0:n,v=x*4;let S=f.clippingState||null;c.value=S,S=h(g,d,v,p);for(let C=0;C!==v;++C)S[C]=t[C];f.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,S=p;v!==_;++v,S+=4)o.copy(u[v]).applyMatrix4(x,a),o.normal.toArray(m,S),m[S+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function am(s){let e=new WeakMap;function t(o,a){return a===Lo?o.mapping=Ni:a===Po&&(o.mapping=Oi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Lo||a===Po)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new vd(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class br extends Ql{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ai=4,Ec=[.125,.215,.35,.446,.526,.582],ti=20,lo=new br,Tc=new fe;let ho=null,uo=0,fo=0;const Qn=(1+Math.sqrt(5))/2,bi=1/Qn,bc=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,Qn,bi),new R(0,Qn,-bi),new R(bi,0,Qn),new R(-bi,0,Qn),new R(Qn,bi,0),new R(-Qn,bi,0)];class wc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ho,uo,fo),e.scissorTest=!1,Ws(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ni||e.mapping===Oi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:an,format:Kt,colorSpace:Et,depthBuffer:!1},i=Ac(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ac(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cm(r)),this._blurMaterial=lm(r,e,t)}return i}_compileMaterial(e){const t=new Ze(this._lodPlanes[0],e);this._renderer.compile(t,lo)}_sceneToCubeUV(e,t,n,i){const a=new Rt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Tc),h.toneMapping=Bn,h.autoClear=!1;const p=new Mt({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1}),g=new Ze(new Gn,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Tc),_=!0);for(let f=0;f<6;f++){const x=f%3;x===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):x===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const v=this._cubeSize;Ws(i,x*v,f>2?v:0,v,v),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ni||e.mapping===Oi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rc());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new Ze(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Ws(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,lo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=bc[(i-1)%bc.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ze(this._lodPlanes[i],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ti-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ti;m>ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ti}`);const f=[];let x=0;for(let w=0;w<ti;++w){const I=w/_,y=Math.exp(-I*I/2);f.push(y),w===0?x+=y:w<m&&(x+=2*y)}for(let w=0;w<f.length;w++)f[w]=f[w]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const S=this._sizeLods[i],C=3*S*(i>v-Ai?i-v+Ai:0),A=4*(this._cubeSize-S);Ws(t,C,A,3*S,2*S),c.setRenderTarget(t),c.render(u,lo)}}function cm(s){const e=[],t=[],n=[];let i=s;const r=s-Ai+1+Ec.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Ai?c=Ec[o-s+Ai-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,x=new Float32Array(_*g*p),v=new Float32Array(m*g*p),S=new Float32Array(f*g*p);for(let A=0;A<p;A++){const w=A%3*2/3-1,I=A>2?0:-1,y=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];x.set(y,_*g*A),v.set(d,m*g*A);const T=[A,A,A,A,A,A];S.set(T,f*g*A)}const C=new ut;C.setAttribute("position",new pt(x,_)),C.setAttribute("uv",new pt(v,m)),C.setAttribute("faceIndex",new pt(S,f)),e.push(C),i>Ai&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ac(s,e,t){const n=new Zt(s,e,t);return n.texture.mapping=Mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ws(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function lm(s,e,t){const n=new Float32Array(ti),i=new R(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:ti,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Rc(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Cc(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Zo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function hm(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Lo||c===Po,h=c===Ni||c===Oi;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new wc(s)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new wc(s));const d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function um(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function dm(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],s.ARRAY_BUFFER)}}function l(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const x=p.array;_=p.version;for(let v=0,S=x.length;v<S;v+=3){const C=x[v+0],A=x[v+1],w=x[v+2];d.push(C,A,A,w,w,C)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,S=x.length/3-1;v<S;v+=3){const C=v+0,A=v+1,w=v+2;d.push(C,A,A,w,w,C)}}else return;const m=new(Wl(d)?Zl:$l)(d,1);m.version=_;const f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function fm(s,e,t,n){const i=n.isWebGL2;let r;function o(p){r=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function h(p,g){s.drawElements(r,g,a,p*c),t.update(g,r,1)}function u(p,g,_){if(_===0)return;let m,f;if(i)m=s,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,g,a,p*c,_),t.update(g,r,_)}function d(p,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<_;f++)this.render(p[f]/c,g[f]);else{m.multiDrawElementsWEBGL(r,g,0,a,p,0,_);let f=0;for(let x=0;x<_;x++)f+=g[x];t.update(f,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function pm(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function mm(s,e){return s[0]-e[0]}function gm(s,e){return Math.abs(e[1])-Math.abs(s[1])}function _m(s,e,t){const n={},i=new Float32Array(8),r=new WeakMap,o=new je,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(h);if(m===void 0||m.count!==_){let F=function(){$.dispose(),r.delete(h),h.removeEventListener("dispose",F)};var p=F;m!==void 0&&m.texture.dispose();const v=h.morphAttributes.position!==void 0,S=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],I=h.morphAttributes.color||[];let y=0;v===!0&&(y=1),S===!0&&(y=2),C===!0&&(y=3);let T=h.attributes.position.count*y,U=1;T>e.maxTextureSize&&(U=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const B=new Float32Array(T*U*4*_),$=new Yl(B,T,U,_);$.type=Sn,$.needsUpdate=!0;const P=y*4;for(let V=0;V<_;V++){const q=A[V],X=w[V],Y=I[V],j=T*U*4*V;for(let te=0;te<q.count;te++){const ne=te*P;v===!0&&(o.fromBufferAttribute(q,te),B[j+ne+0]=o.x,B[j+ne+1]=o.y,B[j+ne+2]=o.z,B[j+ne+3]=0),S===!0&&(o.fromBufferAttribute(X,te),B[j+ne+4]=o.x,B[j+ne+5]=o.y,B[j+ne+6]=o.z,B[j+ne+7]=0),C===!0&&(o.fromBufferAttribute(Y,te),B[j+ne+8]=o.x,B[j+ne+9]=o.y,B[j+ne+10]=o.z,B[j+ne+11]=Y.itemSize===4?o.w:1)}}m={count:_,texture:$,size:new ve(T,U)},r.set(h,m),h.addEventListener("dispose",F)}let f=0;for(let v=0;v<d.length;v++)f+=d[v];const x=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(s,"morphTargetBaseInfluence",x),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let S=0;S<g;S++)_[S]=[S,0];n[h.id]=_}for(let S=0;S<g;S++){const C=_[S];C[0]=S,C[1]=d[S]}_.sort(gm);for(let S=0;S<8;S++)S<g&&_[S][1]?(a[S][0]=_[S][0],a[S][1]=_[S][1]):(a[S][0]=Number.MAX_SAFE_INTEGER,a[S][1]=0);a.sort(mm);const m=h.morphAttributes.position,f=h.morphAttributes.normal;let x=0;for(let S=0;S<8;S++){const C=a[S],A=C[0],w=C[1];A!==Number.MAX_SAFE_INTEGER&&w?(m&&h.getAttribute("morphTarget"+S)!==m[A]&&h.setAttribute("morphTarget"+S,m[A]),f&&h.getAttribute("morphNormal"+S)!==f[A]&&h.setAttribute("morphNormal"+S,f[A]),i[S]=w,x+=w):(m&&h.hasAttribute("morphTarget"+S)===!0&&h.deleteAttribute("morphTarget"+S),f&&h.hasAttribute("morphNormal"+S)===!0&&h.deleteAttribute("morphNormal"+S),i[S]=0)}const v=h.morphTargetsRelative?1:1-x;u.getUniforms().setValue(s,"morphTargetBaseInfluence",v),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function vm(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class nh extends St{constructor(e,t,n,i,r,o,a,c,l,h){if(h=h!==void 0?h:si,h!==si&&h!==Fi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===si&&(n=On),n===void 0&&h===Fi&&(n=ii),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:yt,this.minFilter=c!==void 0?c:yt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ih=new St,sh=new nh(1,1);sh.compareFunction=Vl;const rh=new Yl,oh=new nd,ah=new eh,Lc=[],Pc=[],Ic=new Float32Array(16),Dc=new Float32Array(9),Uc=new Float32Array(4);function qi(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Lc[i];if(r===void 0&&(r=new Float32Array(i),Lc[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function mt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function gt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function wr(s,e){let t=Pc[e];t===void 0&&(t=new Int32Array(e),Pc[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function xm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function ym(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;s.uniform2fv(this.addr,e),gt(t,e)}}function Mm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;s.uniform3fv(this.addr,e),gt(t,e)}}function Sm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;s.uniform4fv(this.addr,e),gt(t,e)}}function Em(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Uc.set(n),s.uniformMatrix2fv(this.addr,!1,Uc),gt(t,n)}}function Tm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Dc.set(n),s.uniformMatrix3fv(this.addr,!1,Dc),gt(t,n)}}function bm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Ic.set(n),s.uniformMatrix4fv(this.addr,!1,Ic),gt(t,n)}}function wm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Am(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;s.uniform2iv(this.addr,e),gt(t,e)}}function Rm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;s.uniform3iv(this.addr,e),gt(t,e)}}function Cm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;s.uniform4iv(this.addr,e),gt(t,e)}}function Lm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Pm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;s.uniform2uiv(this.addr,e),gt(t,e)}}function Im(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;s.uniform3uiv(this.addr,e),gt(t,e)}}function Dm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;s.uniform4uiv(this.addr,e),gt(t,e)}}function Um(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?sh:ih;t.setTexture2D(e||r,i)}function Nm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||oh,i)}function Om(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ah,i)}function Fm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||rh,i)}function Bm(s){switch(s){case 5126:return xm;case 35664:return ym;case 35665:return Mm;case 35666:return Sm;case 35674:return Em;case 35675:return Tm;case 35676:return bm;case 5124:case 35670:return wm;case 35667:case 35671:return Am;case 35668:case 35672:return Rm;case 35669:case 35673:return Cm;case 5125:return Lm;case 36294:return Pm;case 36295:return Im;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return Fm}}function km(s,e){s.uniform1fv(this.addr,e)}function zm(s,e){const t=qi(e,this.size,2);s.uniform2fv(this.addr,t)}function Gm(s,e){const t=qi(e,this.size,3);s.uniform3fv(this.addr,t)}function Hm(s,e){const t=qi(e,this.size,4);s.uniform4fv(this.addr,t)}function Vm(s,e){const t=qi(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Wm(s,e){const t=qi(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Xm(s,e){const t=qi(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function qm(s,e){s.uniform1iv(this.addr,e)}function Ym(s,e){s.uniform2iv(this.addr,e)}function jm(s,e){s.uniform3iv(this.addr,e)}function Km(s,e){s.uniform4iv(this.addr,e)}function $m(s,e){s.uniform1uiv(this.addr,e)}function Zm(s,e){s.uniform2uiv(this.addr,e)}function Jm(s,e){s.uniform3uiv(this.addr,e)}function Qm(s,e){s.uniform4uiv(this.addr,e)}function eg(s,e,t){const n=this.cache,i=e.length,r=wr(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||ih,r[o])}function tg(s,e,t){const n=this.cache,i=e.length,r=wr(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||oh,r[o])}function ng(s,e,t){const n=this.cache,i=e.length,r=wr(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||ah,r[o])}function ig(s,e,t){const n=this.cache,i=e.length,r=wr(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||rh,r[o])}function sg(s){switch(s){case 5126:return km;case 35664:return zm;case 35665:return Gm;case 35666:return Hm;case 35674:return Vm;case 35675:return Wm;case 35676:return Xm;case 5124:case 35670:return qm;case 35667:case 35671:return Ym;case 35668:case 35672:return jm;case 35669:case 35673:return Km;case 5125:return $m;case 36294:return Zm;case 36295:return Jm;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return eg;case 35679:case 36299:case 36307:return tg;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return ig}}class rg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Bm(t.type)}}class og{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sg(t.type)}}class ag{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const po=/(\w+)(\])?(\[|\.)?/g;function Nc(s,e){s.seq.push(e),s.map[e.id]=e}function cg(s,e,t){const n=s.name,i=n.length;for(po.lastIndex=0;;){const r=po.exec(n),o=po.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Nc(t,l===void 0?new rg(a,s,e):new og(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new ag(a),Nc(t,u)),t=u}}}class sr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);cg(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Oc(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const lg=37297;let hg=0;function ug(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function dg(s){const e=Xe.getPrimaries(Xe.workingColorSpace),t=Xe.getPrimaries(s);let n;switch(e===t?n="":e===gr&&t===mr?n="LinearDisplayP3ToLinearSRGB":e===mr&&t===gr&&(n="LinearSRGBToLinearDisplayP3"),s){case Et:case Sr:return[n,"LinearTransferOETF"];case ct:case jo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Fc(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+ug(s.getShaderSource(e),o)}else return i}function fg(s,e){const t=dg(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function pg(s,e){let t;switch(e){case wl:t="Linear";break;case Al:t="Reinhard";break;case Rl:t="OptimizedCineon";break;case Cl:t="ACESFilmic";break;case Ll:t="AgX";break;case pu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function mg(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ri).join(`
`)}function gg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ri).join(`
`)}function _g(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function vg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Ri(s){return s!==""}function Bc(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oo(s){return s.replace(xg,Mg)}const yg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Mg(s,e){let t=De[e];if(t===void 0){const n=yg.get(e);if(n!==void 0)t=De[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oo(t)}const Sg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zc(s){return s.replace(Sg,Eg)}function Eg(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Gc(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Tg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Tl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Hh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Mn&&(e="SHADOWMAP_TYPE_VSM"),e}function bg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ni:case Oi:e="ENVMAP_TYPE_CUBE";break;case Mr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function wg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Oi:e="ENVMAP_MODE_REFRACTION";break}return e}function Ag(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case bl:e="ENVMAP_BLENDING_MULTIPLY";break;case du:e="ENVMAP_BLENDING_MIX";break;case fu:e="ENVMAP_BLENDING_ADD";break}return e}function Rg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Cg(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Tg(t),l=bg(t),h=wg(t),u=Ag(t),d=Rg(t),p=t.isWebGL2?"":mg(t),g=gg(t),_=_g(r),m=i.createProgram();let f,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ri).join(`
`),f.length>0&&(f+=`
`),x=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ri).join(`
`),x.length>0&&(x+=`
`)):(f=[Gc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ri).join(`
`),x=[p,Gc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?De.tonemapping_pars_fragment:"",t.toneMapping!==Bn?pg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,fg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ri).join(`
`)),o=Oo(o),o=Bc(o,t),o=kc(o,t),a=Oo(a),a=Bc(a,t),a=kc(a,t),o=zc(o),a=zc(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const S=v+f+o,C=v+x+a,A=Oc(i,i.VERTEX_SHADER,S),w=Oc(i,i.FRAGMENT_SHADER,C);i.attachShader(m,A),i.attachShader(m,w),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function I(B){if(s.debug.checkShaderErrors){const $=i.getProgramInfoLog(m).trim(),P=i.getShaderInfoLog(A).trim(),F=i.getShaderInfoLog(w).trim();let V=!0,q=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,A,w);else{const X=Fc(i,A,"vertex"),Y=Fc(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+X+`
`+Y)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(P===""||F==="")&&(q=!1);q&&(B.diagnostics={runnable:V,programLog:$,vertexShader:{log:P,prefix:f},fragmentShader:{log:F,prefix:x}})}i.deleteShader(A),i.deleteShader(w),y=new sr(i,m),T=vg(i,m)}let y;this.getUniforms=function(){return y===void 0&&I(this),y};let T;this.getAttributes=function(){return T===void 0&&I(this),T};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=i.getProgramParameter(m,lg)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hg++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=w,this}let Lg=0;class Pg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ig(e),t.set(e,n)),n}}class Ig{constructor(e){this.id=Lg++,this.code=e,this.usedTimes=0}}function Dg(s,e,t,n,i,r,o){const a=new jl,c=new Pg,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function m(y,T,U,B,$){const P=B.fog,F=$.geometry,V=y.isMeshStandardMaterial?B.environment:null,q=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),X=q&&q.mapping===Mr?q.image.height:null,Y=g[y.type];y.precision!==null&&(p=i.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const j=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,te=j!==void 0?j.length:0;let ne=0;F.morphAttributes.position!==void 0&&(ne=1),F.morphAttributes.normal!==void 0&&(ne=2),F.morphAttributes.color!==void 0&&(ne=3);let W,K,N,ie;if(Y){const It=rn[Y];W=It.vertexShader,K=It.fragmentShader}else W=y.vertexShader,K=y.fragmentShader,c.update(y),N=c.getVertexShaderID(y),ie=c.getFragmentShaderID(y);const ce=s.getRenderTarget(),xe=$.isInstancedMesh===!0,ye=$.isBatchedMesh===!0,Me=!!y.map,Ve=!!y.matcap,O=!!q,lt=!!y.aoMap,_e=!!y.lightMap,we=!!y.bumpMap,pe=!!y.normalMap,st=!!y.displacementMap,Ne=!!y.emissiveMap,b=!!y.metalnessMap,M=!!y.roughnessMap,z=y.anisotropy>0,Q=y.clearcoat>0,J=y.iridescence>0,ee=y.sheen>0,me=y.transmission>0,le=z&&!!y.anisotropyMap,ue=Q&&!!y.clearcoatMap,be=Q&&!!y.clearcoatNormalMap,Oe=Q&&!!y.clearcoatRoughnessMap,Z=J&&!!y.iridescenceMap,Ke=J&&!!y.iridescenceThicknessMap,Ge=ee&&!!y.sheenColorMap,Ce=ee&&!!y.sheenRoughnessMap,Se=!!y.specularMap,de=!!y.specularColorMap,Ie=!!y.specularIntensityMap,qe=me&&!!y.transmissionMap,ot=me&&!!y.thicknessMap,Be=!!y.gradientMap,se=!!y.alphaMap,L=y.alphaTest>0,oe=!!y.alphaHash,ae=!!y.extensions,Ae=!!F.attributes.uv1,Ee=!!F.attributes.uv2,Qe=!!F.attributes.uv3;let et=Bn;return y.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(et=s.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:y.type,shaderName:y.name,vertexShader:W,fragmentShader:K,defines:y.defines,customVertexShaderID:N,customFragmentShaderID:ie,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:ye,instancing:xe,instancingColor:xe&&$.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:ce===null?s.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Et,map:Me,matcap:Ve,envMap:O,envMapMode:O&&q.mapping,envMapCubeUVHeight:X,aoMap:lt,lightMap:_e,bumpMap:we,normalMap:pe,displacementMap:d&&st,emissiveMap:Ne,normalMapObjectSpace:pe&&y.normalMapType===Ru,normalMapTangentSpace:pe&&y.normalMapType===Hl,metalnessMap:b,roughnessMap:M,anisotropy:z,anisotropyMap:le,clearcoat:Q,clearcoatMap:ue,clearcoatNormalMap:be,clearcoatRoughnessMap:Oe,iridescence:J,iridescenceMap:Z,iridescenceThicknessMap:Ke,sheen:ee,sheenColorMap:Ge,sheenRoughnessMap:Ce,specularMap:Se,specularColorMap:de,specularIntensityMap:Ie,transmission:me,transmissionMap:qe,thicknessMap:ot,gradientMap:Be,opaque:y.transparent===!1&&y.blending===Ci,alphaMap:se,alphaTest:L,alphaHash:oe,combine:y.combine,mapUv:Me&&_(y.map.channel),aoMapUv:lt&&_(y.aoMap.channel),lightMapUv:_e&&_(y.lightMap.channel),bumpMapUv:we&&_(y.bumpMap.channel),normalMapUv:pe&&_(y.normalMap.channel),displacementMapUv:st&&_(y.displacementMap.channel),emissiveMapUv:Ne&&_(y.emissiveMap.channel),metalnessMapUv:b&&_(y.metalnessMap.channel),roughnessMapUv:M&&_(y.roughnessMap.channel),anisotropyMapUv:le&&_(y.anisotropyMap.channel),clearcoatMapUv:ue&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:be&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ge&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&_(y.sheenRoughnessMap.channel),specularMapUv:Se&&_(y.specularMap.channel),specularColorMapUv:de&&_(y.specularColorMap.channel),specularIntensityMapUv:Ie&&_(y.specularIntensityMap.channel),transmissionMapUv:qe&&_(y.transmissionMap.channel),thicknessMapUv:ot&&_(y.thicknessMap.channel),alphaMapUv:se&&_(y.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(pe||z),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:Ae,vertexUv2s:Ee,vertexUv3s:Qe,pointsUvs:$.isPoints===!0&&!!F.attributes.uv&&(Me||se),fog:!!P,useFog:y.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:$.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ne,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&U.length>0,shadowMapType:s.shadowMap.type,toneMapping:et,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Me&&y.map.isVideoTexture===!0&&Xe.getTransfer(y.map.colorSpace)===nt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ct,flipSided:y.side===kt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ae&&y.extensions.derivatives===!0,extensionFragDepth:ae&&y.extensions.fragDepth===!0,extensionDrawBuffers:ae&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function f(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const U in y.defines)T.push(U),T.push(y.defines[U]);return y.isRawShaderMaterial===!1&&(x(T,y),v(T,y),T.push(s.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function x(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function v(y,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function S(y){const T=g[y.type];let U;if(T){const B=rn[T];U=Gi.clone(B.uniforms)}else U=y.uniforms;return U}function C(y,T){let U;for(let B=0,$=l.length;B<$;B++){const P=l[B];if(P.cacheKey===T){U=P,++U.usedTimes;break}}return U===void 0&&(U=new Cg(s,T,y,r),l.push(U)),U}function A(y){if(--y.usedTimes===0){const T=l.indexOf(y);l[T]=l[l.length-1],l.pop(),y.destroy()}}function w(y){c.remove(y)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:S,acquireProgram:C,releaseProgram:A,releaseShaderCache:w,programs:l,dispose:I}}function Ug(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Ng(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Hc(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Vc(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,p,g,_,m){let f=s[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function c(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||Ng),n.length>1&&n.sort(d||Hc),i.length>1&&i.sort(d||Hc)}function h(){for(let u=e,d=s.length;u<d;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function Og(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new Vc,s.set(n,[o])):i>=r.length?(o=new Vc,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Fg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new fe};break;case"SpotLight":t={position:new R,direction:new R,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new R,halfWidth:new R,halfHeight:new R};break}return s[e.id]=t,t}}}function Bg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let kg=0;function zg(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Gg(s,e){const t=new Fg,n=Bg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new R);const r=new R,o=new Ue,a=new Ue;function c(h,u){let d=0,p=0,g=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let _=0,m=0,f=0,x=0,v=0,S=0,C=0,A=0,w=0,I=0,y=0;h.sort(zg);const T=u===!0?Math.PI:1;for(let B=0,$=h.length;B<$;B++){const P=h[B],F=P.color,V=P.intensity,q=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=F.r*V*T,p+=F.g*V*T,g+=F.b*V*T;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(P.sh.coefficients[Y],V);y++}else if(P.isDirectionalLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*T),P.castShadow){const j=P.shadow,te=n.get(P);te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,i.directionalShadow[_]=te,i.directionalShadowMap[_]=X,i.directionalShadowMatrix[_]=P.shadow.matrix,S++}i.directional[_]=Y,_++}else if(P.isSpotLight){const Y=t.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(F).multiplyScalar(V*T),Y.distance=q,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,i.spot[f]=Y;const j=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,j.updateMatrices(P),P.castShadow&&I++),i.spotLightMatrix[f]=j.matrix,P.castShadow){const te=n.get(P);te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,i.spotShadow[f]=te,i.spotShadowMap[f]=X,A++}f++}else if(P.isRectAreaLight){const Y=t.get(P);Y.color.copy(F).multiplyScalar(V),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),i.rectArea[x]=Y,x++}else if(P.isPointLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*T),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const j=P.shadow,te=n.get(P);te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,te.shadowCameraNear=j.camera.near,te.shadowCameraFar=j.camera.far,i.pointShadow[m]=te,i.pointShadowMap[m]=X,i.pointShadowMatrix[m]=P.shadow.matrix,C++}i.point[m]=Y,m++}else if(P.isHemisphereLight){const Y=t.get(P);Y.skyColor.copy(P.color).multiplyScalar(V*T),Y.groundColor.copy(P.groundColor).multiplyScalar(V*T),i.hemi[v]=Y,v++}}x>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=g;const U=i.hash;(U.directionalLength!==_||U.pointLength!==m||U.spotLength!==f||U.rectAreaLength!==x||U.hemiLength!==v||U.numDirectionalShadows!==S||U.numPointShadows!==C||U.numSpotShadows!==A||U.numSpotMaps!==w||U.numLightProbes!==y)&&(i.directional.length=_,i.spot.length=f,i.rectArea.length=x,i.point.length=m,i.hemi.length=v,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=A+w-I,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=y,U.directionalLength=_,U.pointLength=m,U.spotLength=f,U.rectAreaLength=x,U.hemiLength=v,U.numDirectionalShadows=S,U.numPointShadows=C,U.numSpotShadows=A,U.numSpotMaps=w,U.numLightProbes=y,i.version=kg++)}function l(h,u){let d=0,p=0,g=0,_=0,m=0;const f=u.matrixWorldInverse;for(let x=0,v=h.length;x<v;x++){const S=h[x];if(S.isDirectionalLight){const C=i.directional[d];C.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(f),d++}else if(S.isSpotLight){const C=i.spot[g];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(f),C.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(f),g++}else if(S.isRectAreaLight){const C=i.rectArea[_];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(f),a.identity(),o.copy(S.matrixWorld),o.premultiply(f),a.extractRotation(o),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const C=i.point[p];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(f),p++}else if(S.isHemisphereLight){const C=i.hemi[m];C.direction.setFromMatrixPosition(S.matrixWorld),C.direction.transformDirection(f),m++}}}return{setup:c,setupView:l,state:i}}function Wc(s,e){const t=new Gg(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Hg(s,e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let c;return a===void 0?(c=new Wc(s,e),t.set(r,[c])):o>=a.length?(c=new Wc(s,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}class Vg extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wg extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Xg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Yg(s,e,t){let n=new $o;const i=new ve,r=new ve,o=new je,a=new Vg({depthPacking:Au}),c=new Wg,l={},h=t.maxTextureSize,u={[bn]:kt,[kt]:bn,[Ct]:Ct},d=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:Xg,fragmentShader:qg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new ut;g.setAttribute("position",new pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ze(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tl;let f=this.type;this.render=function(A,w,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const y=s.getRenderTarget(),T=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),B=s.state;B.setBlending(Tn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const $=f!==Mn&&this.type===Mn,P=f===Mn&&this.type!==Mn;for(let F=0,V=A.length;F<V;F++){const q=A[F],X=q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const Y=X.getFrameExtents();if(i.multiply(Y),r.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Y.x),i.x=r.x*Y.x,X.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Y.y),i.y=r.y*Y.y,X.mapSize.y=r.y)),X.map===null||$===!0||P===!0){const te=this.type!==Mn?{minFilter:yt,magFilter:yt}:{};X.map!==null&&X.map.dispose(),X.map=new Zt(i.x,i.y,te),X.map.texture.name=q.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const j=X.getViewportCount();for(let te=0;te<j;te++){const ne=X.getViewport(te);o.set(r.x*ne.x,r.y*ne.y,r.x*ne.z,r.y*ne.w),B.viewport(o),X.updateMatrices(q,te),n=X.getFrustum(),S(w,I,X.camera,q,this.type)}X.isPointLightShadow!==!0&&this.type===Mn&&x(X,I),X.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(y,T,U)};function x(A,w){const I=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Zt(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(w,null,I,d,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(w,null,I,p,_,null)}function v(A,w,I,y){let T=null;const U=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)T=U;else if(T=I.isPointLight===!0?c:a,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const B=T.uuid,$=w.uuid;let P=l[B];P===void 0&&(P={},l[B]=P);let F=P[$];F===void 0&&(F=T.clone(),P[$]=F,w.addEventListener("dispose",C)),T=F}if(T.visible=w.visible,T.wireframe=w.wireframe,y===Mn?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:u[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,I.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const B=s.properties.get(T);B.light=I}return T}function S(A,w,I,y,T){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===Mn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const $=e.update(A),P=A.material;if(Array.isArray(P)){const F=$.groups;for(let V=0,q=F.length;V<q;V++){const X=F[V],Y=P[X.materialIndex];if(Y&&Y.visible){const j=v(A,Y,y,T);A.onBeforeShadow(s,A,w,I,$,j,X),s.renderBufferDirect(I,null,$,j,A,X),A.onAfterShadow(s,A,w,I,$,j,X)}}}else if(P.visible){const F=v(A,P,y,T);A.onBeforeShadow(s,A,w,I,$,F,null),s.renderBufferDirect(I,null,$,F,A,null),A.onAfterShadow(s,A,w,I,$,F,null)}}const B=A.children;for(let $=0,P=B.length;$<P;$++)S(B[$],w,I,y,T)}function C(A){A.target.removeEventListener("dispose",C);for(const I in l){const y=l[I],T=A.target.uuid;T in y&&(y[T].dispose(),delete y[T])}}}function jg(s,e,t){const n=t.isWebGL2;function i(){let L=!1;const oe=new je;let ae=null;const Ae=new je(0,0,0,0);return{setMask:function(Ee){ae!==Ee&&!L&&(s.colorMask(Ee,Ee,Ee,Ee),ae=Ee)},setLocked:function(Ee){L=Ee},setClear:function(Ee,Qe,et,_t,It){It===!0&&(Ee*=_t,Qe*=_t,et*=_t),oe.set(Ee,Qe,et,_t),Ae.equals(oe)===!1&&(s.clearColor(Ee,Qe,et,_t),Ae.copy(oe))},reset:function(){L=!1,ae=null,Ae.set(-1,0,0,0)}}}function r(){let L=!1,oe=null,ae=null,Ae=null;return{setTest:function(Ee){Ee?ye(s.DEPTH_TEST):Me(s.DEPTH_TEST)},setMask:function(Ee){oe!==Ee&&!L&&(s.depthMask(Ee),oe=Ee)},setFunc:function(Ee){if(ae!==Ee){switch(Ee){case ru:s.depthFunc(s.NEVER);break;case ou:s.depthFunc(s.ALWAYS);break;case au:s.depthFunc(s.LESS);break;case dr:s.depthFunc(s.LEQUAL);break;case cu:s.depthFunc(s.EQUAL);break;case lu:s.depthFunc(s.GEQUAL);break;case hu:s.depthFunc(s.GREATER);break;case uu:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ae=Ee}},setLocked:function(Ee){L=Ee},setClear:function(Ee){Ae!==Ee&&(s.clearDepth(Ee),Ae=Ee)},reset:function(){L=!1,oe=null,ae=null,Ae=null}}}function o(){let L=!1,oe=null,ae=null,Ae=null,Ee=null,Qe=null,et=null,_t=null,It=null;return{setTest:function(tt){L||(tt?ye(s.STENCIL_TEST):Me(s.STENCIL_TEST))},setMask:function(tt){oe!==tt&&!L&&(s.stencilMask(tt),oe=tt)},setFunc:function(tt,Dt,sn){(ae!==tt||Ae!==Dt||Ee!==sn)&&(s.stencilFunc(tt,Dt,sn),ae=tt,Ae=Dt,Ee=sn)},setOp:function(tt,Dt,sn){(Qe!==tt||et!==Dt||_t!==sn)&&(s.stencilOp(tt,Dt,sn),Qe=tt,et=Dt,_t=sn)},setLocked:function(tt){L=tt},setClear:function(tt){It!==tt&&(s.clearStencil(tt),It=tt)},reset:function(){L=!1,oe=null,ae=null,Ae=null,Ee=null,Qe=null,et=null,_t=null,It=null}}}const a=new i,c=new r,l=new o,h=new WeakMap,u=new WeakMap;let d={},p={},g=new WeakMap,_=[],m=null,f=!1,x=null,v=null,S=null,C=null,A=null,w=null,I=null,y=new fe(0,0,0),T=0,U=!1,B=null,$=null,P=null,F=null,V=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Y=0;const j=s.getParameter(s.VERSION);j.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(j)[1]),X=Y>=1):j.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),X=Y>=2);let te=null,ne={};const W=s.getParameter(s.SCISSOR_BOX),K=s.getParameter(s.VIEWPORT),N=new je().fromArray(W),ie=new je().fromArray(K);function ce(L,oe,ae,Ae){const Ee=new Uint8Array(4),Qe=s.createTexture();s.bindTexture(L,Qe),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let et=0;et<ae;et++)n&&(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)?s.texImage3D(oe,0,s.RGBA,1,1,Ae,0,s.RGBA,s.UNSIGNED_BYTE,Ee):s.texImage2D(oe+et,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ee);return Qe}const xe={};xe[s.TEXTURE_2D]=ce(s.TEXTURE_2D,s.TEXTURE_2D,1),xe[s.TEXTURE_CUBE_MAP]=ce(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(xe[s.TEXTURE_2D_ARRAY]=ce(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),xe[s.TEXTURE_3D]=ce(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),ye(s.DEPTH_TEST),c.setFunc(dr),Ne(!1),b(Ta),ye(s.CULL_FACE),pe(Tn);function ye(L){d[L]!==!0&&(s.enable(L),d[L]=!0)}function Me(L){d[L]!==!1&&(s.disable(L),d[L]=!1)}function Ve(L,oe){return p[L]!==oe?(s.bindFramebuffer(L,oe),p[L]=oe,n&&(L===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=oe),L===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=oe)),!0):!1}function O(L,oe){let ae=_,Ae=!1;if(L)if(ae=g.get(oe),ae===void 0&&(ae=[],g.set(oe,ae)),L.isWebGLMultipleRenderTargets){const Ee=L.texture;if(ae.length!==Ee.length||ae[0]!==s.COLOR_ATTACHMENT0){for(let Qe=0,et=Ee.length;Qe<et;Qe++)ae[Qe]=s.COLOR_ATTACHMENT0+Qe;ae.length=Ee.length,Ae=!0}}else ae[0]!==s.COLOR_ATTACHMENT0&&(ae[0]=s.COLOR_ATTACHMENT0,Ae=!0);else ae[0]!==s.BACK&&(ae[0]=s.BACK,Ae=!0);Ae&&(t.isWebGL2?s.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function lt(L){return m!==L?(s.useProgram(L),m=L,!0):!1}const _e={[ei]:s.FUNC_ADD,[Wh]:s.FUNC_SUBTRACT,[Xh]:s.FUNC_REVERSE_SUBTRACT};if(n)_e[Aa]=s.MIN,_e[Ra]=s.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(_e[Aa]=L.MIN_EXT,_e[Ra]=L.MAX_EXT)}const we={[qh]:s.ZERO,[Yh]:s.ONE,[jh]:s.SRC_COLOR,[Ro]:s.SRC_ALPHA,[eu]:s.SRC_ALPHA_SATURATE,[Jh]:s.DST_COLOR,[$h]:s.DST_ALPHA,[Kh]:s.ONE_MINUS_SRC_COLOR,[Co]:s.ONE_MINUS_SRC_ALPHA,[Qh]:s.ONE_MINUS_DST_COLOR,[Zh]:s.ONE_MINUS_DST_ALPHA,[tu]:s.CONSTANT_COLOR,[nu]:s.ONE_MINUS_CONSTANT_COLOR,[iu]:s.CONSTANT_ALPHA,[su]:s.ONE_MINUS_CONSTANT_ALPHA};function pe(L,oe,ae,Ae,Ee,Qe,et,_t,It,tt){if(L===Tn){f===!0&&(Me(s.BLEND),f=!1);return}if(f===!1&&(ye(s.BLEND),f=!0),L!==Vh){if(L!==x||tt!==U){if((v!==ei||A!==ei)&&(s.blendEquation(s.FUNC_ADD),v=ei,A=ei),tt)switch(L){case Ci:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ln:s.blendFunc(s.ONE,s.ONE);break;case ba:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wa:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ci:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ln:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ba:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wa:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}S=null,C=null,w=null,I=null,y.set(0,0,0),T=0,x=L,U=tt}return}Ee=Ee||oe,Qe=Qe||ae,et=et||Ae,(oe!==v||Ee!==A)&&(s.blendEquationSeparate(_e[oe],_e[Ee]),v=oe,A=Ee),(ae!==S||Ae!==C||Qe!==w||et!==I)&&(s.blendFuncSeparate(we[ae],we[Ae],we[Qe],we[et]),S=ae,C=Ae,w=Qe,I=et),(_t.equals(y)===!1||It!==T)&&(s.blendColor(_t.r,_t.g,_t.b,It),y.copy(_t),T=It),x=L,U=!1}function st(L,oe){L.side===Ct?Me(s.CULL_FACE):ye(s.CULL_FACE);let ae=L.side===kt;oe&&(ae=!ae),Ne(ae),L.blending===Ci&&L.transparent===!1?pe(Tn):pe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),c.setFunc(L.depthFunc),c.setTest(L.depthTest),c.setMask(L.depthWrite),a.setMask(L.colorWrite);const Ae=L.stencilWrite;l.setTest(Ae),Ae&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),z(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ye(s.SAMPLE_ALPHA_TO_COVERAGE):Me(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(L){B!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),B=L)}function b(L){L!==zh?(ye(s.CULL_FACE),L!==$&&(L===Ta?s.cullFace(s.BACK):L===Gh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Me(s.CULL_FACE),$=L}function M(L){L!==P&&(X&&s.lineWidth(L),P=L)}function z(L,oe,ae){L?(ye(s.POLYGON_OFFSET_FILL),(F!==oe||V!==ae)&&(s.polygonOffset(oe,ae),F=oe,V=ae)):Me(s.POLYGON_OFFSET_FILL)}function Q(L){L?ye(s.SCISSOR_TEST):Me(s.SCISSOR_TEST)}function J(L){L===void 0&&(L=s.TEXTURE0+q-1),te!==L&&(s.activeTexture(L),te=L)}function ee(L,oe,ae){ae===void 0&&(te===null?ae=s.TEXTURE0+q-1:ae=te);let Ae=ne[ae];Ae===void 0&&(Ae={type:void 0,texture:void 0},ne[ae]=Ae),(Ae.type!==L||Ae.texture!==oe)&&(te!==ae&&(s.activeTexture(ae),te=ae),s.bindTexture(L,oe||xe[L]),Ae.type=L,Ae.texture=oe)}function me(){const L=ne[te];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function le(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ke(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ge(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ce(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ie(L){N.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),N.copy(L))}function qe(L){ie.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),ie.copy(L))}function ot(L,oe){let ae=u.get(oe);ae===void 0&&(ae=new WeakMap,u.set(oe,ae));let Ae=ae.get(L);Ae===void 0&&(Ae=s.getUniformBlockIndex(oe,L.name),ae.set(L,Ae))}function Be(L,oe){const Ae=u.get(oe).get(L);h.get(oe)!==Ae&&(s.uniformBlockBinding(oe,Ae,L.__bindingPointIndex),h.set(oe,Ae))}function se(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},te=null,ne={},p={},g=new WeakMap,_=[],m=null,f=!1,x=null,v=null,S=null,C=null,A=null,w=null,I=null,y=new fe(0,0,0),T=0,U=!1,B=null,$=null,P=null,F=null,V=null,N.set(0,0,s.canvas.width,s.canvas.height),ie.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:ye,disable:Me,bindFramebuffer:Ve,drawBuffers:O,useProgram:lt,setBlending:pe,setMaterial:st,setFlipSided:Ne,setCullFace:b,setLineWidth:M,setPolygonOffset:z,setScissorTest:Q,activeTexture:J,bindTexture:ee,unbindTexture:me,compressedTexImage2D:le,compressedTexImage3D:ue,texImage2D:Se,texImage3D:de,updateUBOMapping:ot,uniformBlockBinding:Be,texStorage2D:Ge,texStorage3D:Ce,texSubImage2D:be,texSubImage3D:Oe,compressedTexSubImage2D:Z,compressedTexSubImage3D:Ke,scissor:Ie,viewport:qe,reset:se}}function Kg(s,e,t,n,i,r,o){const a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,M){return p?new OffscreenCanvas(b,M):ms("canvas")}function _(b,M,z,Q){let J=1;if((b.width>Q||b.height>Q)&&(J=Q/Math.max(b.width,b.height)),J<1||M===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const ee=M?xr:Math.floor,me=ee(J*b.width),le=ee(J*b.height);u===void 0&&(u=g(me,le));const ue=z?g(me,le):u;return ue.width=me,ue.height=le,ue.getContext("2d").drawImage(b,0,0,me,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+me+"x"+le+")."),ue}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return No(b.width)&&No(b.height)}function f(b){return a?!1:b.wrapS!==jt||b.wrapT!==jt||b.minFilter!==yt&&b.minFilter!==Bt}function x(b,M){return b.generateMipmaps&&M&&b.minFilter!==yt&&b.minFilter!==Bt}function v(b){s.generateMipmap(b)}function S(b,M,z,Q,J=!1){if(a===!1)return M;if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ee=M;if(M===s.RED&&(z===s.FLOAT&&(ee=s.R32F),z===s.HALF_FLOAT&&(ee=s.R16F),z===s.UNSIGNED_BYTE&&(ee=s.R8)),M===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(ee=s.R8UI),z===s.UNSIGNED_SHORT&&(ee=s.R16UI),z===s.UNSIGNED_INT&&(ee=s.R32UI),z===s.BYTE&&(ee=s.R8I),z===s.SHORT&&(ee=s.R16I),z===s.INT&&(ee=s.R32I)),M===s.RG&&(z===s.FLOAT&&(ee=s.RG32F),z===s.HALF_FLOAT&&(ee=s.RG16F),z===s.UNSIGNED_BYTE&&(ee=s.RG8)),M===s.RGBA){const me=J?pr:Xe.getTransfer(Q);z===s.FLOAT&&(ee=s.RGBA32F),z===s.HALF_FLOAT&&(ee=s.RGBA16F),z===s.UNSIGNED_BYTE&&(ee=me===nt?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function C(b,M,z){return x(b,z)===!0||b.isFramebufferTexture&&b.minFilter!==yt&&b.minFilter!==Bt?Math.log2(Math.max(M.width,M.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?M.mipmaps.length:1}function A(b){return b===yt||b===Io||b===ir?s.NEAREST:s.LINEAR}function w(b){const M=b.target;M.removeEventListener("dispose",w),y(M),M.isVideoTexture&&h.delete(M)}function I(b){const M=b.target;M.removeEventListener("dispose",I),U(M)}function y(b){const M=n.get(b);if(M.__webglInit===void 0)return;const z=b.source,Q=d.get(z);if(Q){const J=Q[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&T(b),Object.keys(Q).length===0&&d.delete(z)}n.remove(b)}function T(b){const M=n.get(b);s.deleteTexture(M.__webglTexture);const z=b.source,Q=d.get(z);delete Q[M.__cacheKey],o.memory.textures--}function U(b){const M=b.texture,z=n.get(b),Q=n.get(M);if(Q.__webglTexture!==void 0&&(s.deleteTexture(Q.__webglTexture),o.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(z.__webglFramebuffer[J]))for(let ee=0;ee<z.__webglFramebuffer[J].length;ee++)s.deleteFramebuffer(z.__webglFramebuffer[J][ee]);else s.deleteFramebuffer(z.__webglFramebuffer[J]);z.__webglDepthbuffer&&s.deleteRenderbuffer(z.__webglDepthbuffer[J])}else{if(Array.isArray(z.__webglFramebuffer))for(let J=0;J<z.__webglFramebuffer.length;J++)s.deleteFramebuffer(z.__webglFramebuffer[J]);else s.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&s.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&s.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let J=0;J<z.__webglColorRenderbuffer.length;J++)z.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(z.__webglColorRenderbuffer[J]);z.__webglDepthRenderbuffer&&s.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let J=0,ee=M.length;J<ee;J++){const me=n.get(M[J]);me.__webglTexture&&(s.deleteTexture(me.__webglTexture),o.memory.textures--),n.remove(M[J])}n.remove(M),n.remove(b)}let B=0;function $(){B=0}function P(){const b=B;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),B+=1,b}function F(b){const M=[];return M.push(b.wrapS),M.push(b.wrapT),M.push(b.wrapR||0),M.push(b.magFilter),M.push(b.minFilter),M.push(b.anisotropy),M.push(b.internalFormat),M.push(b.format),M.push(b.type),M.push(b.generateMipmaps),M.push(b.premultiplyAlpha),M.push(b.flipY),M.push(b.unpackAlignment),M.push(b.colorSpace),M.join()}function V(b,M){const z=n.get(b);if(b.isVideoTexture&&st(b),b.isRenderTargetTexture===!1&&b.version>0&&z.__version!==b.version){const Q=b.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(z,b,M);return}}t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+M)}function q(b,M){const z=n.get(b);if(b.version>0&&z.__version!==b.version){N(z,b,M);return}t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+M)}function X(b,M){const z=n.get(b);if(b.version>0&&z.__version!==b.version){N(z,b,M);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+M)}function Y(b,M){const z=n.get(b);if(b.version>0&&z.__version!==b.version){ie(z,b,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+M)}const j={[hn]:s.REPEAT,[jt]:s.CLAMP_TO_EDGE,[fr]:s.MIRRORED_REPEAT},te={[yt]:s.NEAREST,[Io]:s.NEAREST_MIPMAP_NEAREST,[ir]:s.NEAREST_MIPMAP_LINEAR,[Bt]:s.LINEAR,[Il]:s.LINEAR_MIPMAP_NEAREST,[oi]:s.LINEAR_MIPMAP_LINEAR},ne={[Cu]:s.NEVER,[Nu]:s.ALWAYS,[Lu]:s.LESS,[Vl]:s.LEQUAL,[Pu]:s.EQUAL,[Uu]:s.GEQUAL,[Iu]:s.GREATER,[Du]:s.NOTEQUAL};function W(b,M,z){if(z?(s.texParameteri(b,s.TEXTURE_WRAP_S,j[M.wrapS]),s.texParameteri(b,s.TEXTURE_WRAP_T,j[M.wrapT]),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,j[M.wrapR]),s.texParameteri(b,s.TEXTURE_MAG_FILTER,te[M.magFilter]),s.texParameteri(b,s.TEXTURE_MIN_FILTER,te[M.minFilter])):(s.texParameteri(b,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(b,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(M.wrapS!==jt||M.wrapT!==jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(b,s.TEXTURE_MAG_FILTER,A(M.magFilter)),s.texParameteri(b,s.TEXTURE_MIN_FILTER,A(M.minFilter)),M.minFilter!==yt&&M.minFilter!==Bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(s.texParameteri(b,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(b,s.TEXTURE_COMPARE_FUNC,ne[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===yt||M.minFilter!==ir&&M.minFilter!==oi||M.type===Sn&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===an&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(s.texParameterf(b,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function K(b,M){let z=!1;b.__webglInit===void 0&&(b.__webglInit=!0,M.addEventListener("dispose",w));const Q=M.source;let J=d.get(Q);J===void 0&&(J={},d.set(Q,J));const ee=F(M);if(ee!==b.__cacheKey){J[ee]===void 0&&(J[ee]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,z=!0),J[ee].usedTimes++;const me=J[b.__cacheKey];me!==void 0&&(J[b.__cacheKey].usedTimes--,me.usedTimes===0&&T(M)),b.__cacheKey=ee,b.__webglTexture=J[ee].texture}return z}function N(b,M,z){let Q=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Q=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Q=s.TEXTURE_3D);const J=K(b,M),ee=M.source;t.bindTexture(Q,b.__webglTexture,s.TEXTURE0+z);const me=n.get(ee);if(ee.version!==me.__version||J===!0){t.activeTexture(s.TEXTURE0+z);const le=Xe.getPrimaries(Xe.workingColorSpace),ue=M.colorSpace===$t?null:Xe.getPrimaries(M.colorSpace),be=M.colorSpace===$t||le===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Oe=f(M)&&m(M.image)===!1;let Z=_(M.image,Oe,!1,i.maxTextureSize);Z=Ne(M,Z);const Ke=m(Z)||a,Ge=r.convert(M.format,M.colorSpace);let Ce=r.convert(M.type),Se=S(M.internalFormat,Ge,Ce,M.colorSpace,M.isVideoTexture);W(Q,M,Ke);let de;const Ie=M.mipmaps,qe=a&&M.isVideoTexture!==!0&&Se!==kl,ot=me.__version===void 0||J===!0,Be=C(M,Z,Ke);if(M.isDepthTexture)Se=s.DEPTH_COMPONENT,a?M.type===Sn?Se=s.DEPTH_COMPONENT32F:M.type===On?Se=s.DEPTH_COMPONENT24:M.type===ii?Se=s.DEPTH24_STENCIL8:Se=s.DEPTH_COMPONENT16:M.type===Sn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===si&&Se===s.DEPTH_COMPONENT&&M.type!==Yo&&M.type!==On&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=On,Ce=r.convert(M.type)),M.format===Fi&&Se===s.DEPTH_COMPONENT&&(Se=s.DEPTH_STENCIL,M.type!==ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=ii,Ce=r.convert(M.type))),ot&&(qe?t.texStorage2D(s.TEXTURE_2D,1,Se,Z.width,Z.height):t.texImage2D(s.TEXTURE_2D,0,Se,Z.width,Z.height,0,Ge,Ce,null));else if(M.isDataTexture)if(Ie.length>0&&Ke){qe&&ot&&t.texStorage2D(s.TEXTURE_2D,Be,Se,Ie[0].width,Ie[0].height);for(let se=0,L=Ie.length;se<L;se++)de=Ie[se],qe?t.texSubImage2D(s.TEXTURE_2D,se,0,0,de.width,de.height,Ge,Ce,de.data):t.texImage2D(s.TEXTURE_2D,se,Se,de.width,de.height,0,Ge,Ce,de.data);M.generateMipmaps=!1}else qe?(ot&&t.texStorage2D(s.TEXTURE_2D,Be,Se,Z.width,Z.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Z.width,Z.height,Ge,Ce,Z.data)):t.texImage2D(s.TEXTURE_2D,0,Se,Z.width,Z.height,0,Ge,Ce,Z.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){qe&&ot&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Be,Se,Ie[0].width,Ie[0].height,Z.depth);for(let se=0,L=Ie.length;se<L;se++)de=Ie[se],M.format!==Kt?Ge!==null?qe?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,de.width,de.height,Z.depth,Ge,de.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,se,Se,de.width,de.height,Z.depth,0,de.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,de.width,de.height,Z.depth,Ge,Ce,de.data):t.texImage3D(s.TEXTURE_2D_ARRAY,se,Se,de.width,de.height,Z.depth,0,Ge,Ce,de.data)}else{qe&&ot&&t.texStorage2D(s.TEXTURE_2D,Be,Se,Ie[0].width,Ie[0].height);for(let se=0,L=Ie.length;se<L;se++)de=Ie[se],M.format!==Kt?Ge!==null?qe?t.compressedTexSubImage2D(s.TEXTURE_2D,se,0,0,de.width,de.height,Ge,de.data):t.compressedTexImage2D(s.TEXTURE_2D,se,Se,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage2D(s.TEXTURE_2D,se,0,0,de.width,de.height,Ge,Ce,de.data):t.texImage2D(s.TEXTURE_2D,se,Se,de.width,de.height,0,Ge,Ce,de.data)}else if(M.isDataArrayTexture)qe?(ot&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Be,Se,Z.width,Z.height,Z.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,Ge,Ce,Z.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Se,Z.width,Z.height,Z.depth,0,Ge,Ce,Z.data);else if(M.isData3DTexture)qe?(ot&&t.texStorage3D(s.TEXTURE_3D,Be,Se,Z.width,Z.height,Z.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,Ge,Ce,Z.data)):t.texImage3D(s.TEXTURE_3D,0,Se,Z.width,Z.height,Z.depth,0,Ge,Ce,Z.data);else if(M.isFramebufferTexture){if(ot)if(qe)t.texStorage2D(s.TEXTURE_2D,Be,Se,Z.width,Z.height);else{let se=Z.width,L=Z.height;for(let oe=0;oe<Be;oe++)t.texImage2D(s.TEXTURE_2D,oe,Se,se,L,0,Ge,Ce,null),se>>=1,L>>=1}}else if(Ie.length>0&&Ke){qe&&ot&&t.texStorage2D(s.TEXTURE_2D,Be,Se,Ie[0].width,Ie[0].height);for(let se=0,L=Ie.length;se<L;se++)de=Ie[se],qe?t.texSubImage2D(s.TEXTURE_2D,se,0,0,Ge,Ce,de):t.texImage2D(s.TEXTURE_2D,se,Se,Ge,Ce,de);M.generateMipmaps=!1}else qe?(ot&&t.texStorage2D(s.TEXTURE_2D,Be,Se,Z.width,Z.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ge,Ce,Z)):t.texImage2D(s.TEXTURE_2D,0,Se,Ge,Ce,Z);x(M,Ke)&&v(Q),me.__version=ee.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function ie(b,M,z){if(M.image.length!==6)return;const Q=K(b,M),J=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,b.__webglTexture,s.TEXTURE0+z);const ee=n.get(J);if(J.version!==ee.__version||Q===!0){t.activeTexture(s.TEXTURE0+z);const me=Xe.getPrimaries(Xe.workingColorSpace),le=M.colorSpace===$t?null:Xe.getPrimaries(M.colorSpace),ue=M.colorSpace===$t||me===le?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const be=M.isCompressedTexture||M.image[0].isCompressedTexture,Oe=M.image[0]&&M.image[0].isDataTexture,Z=[];for(let se=0;se<6;se++)!be&&!Oe?Z[se]=_(M.image[se],!1,!0,i.maxCubemapSize):Z[se]=Oe?M.image[se].image:M.image[se],Z[se]=Ne(M,Z[se]);const Ke=Z[0],Ge=m(Ke)||a,Ce=r.convert(M.format,M.colorSpace),Se=r.convert(M.type),de=S(M.internalFormat,Ce,Se,M.colorSpace),Ie=a&&M.isVideoTexture!==!0,qe=ee.__version===void 0||Q===!0;let ot=C(M,Ke,Ge);W(s.TEXTURE_CUBE_MAP,M,Ge);let Be;if(be){Ie&&qe&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ot,de,Ke.width,Ke.height);for(let se=0;se<6;se++){Be=Z[se].mipmaps;for(let L=0;L<Be.length;L++){const oe=Be[L];M.format!==Kt?Ce!==null?Ie?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,0,0,oe.width,oe.height,Ce,oe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,de,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,0,0,oe.width,oe.height,Ce,Se,oe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,de,oe.width,oe.height,0,Ce,Se,oe.data)}}}else{Be=M.mipmaps,Ie&&qe&&(Be.length>0&&ot++,t.texStorage2D(s.TEXTURE_CUBE_MAP,ot,de,Z[0].width,Z[0].height));for(let se=0;se<6;se++)if(Oe){Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Z[se].width,Z[se].height,Ce,Se,Z[se].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,de,Z[se].width,Z[se].height,0,Ce,Se,Z[se].data);for(let L=0;L<Be.length;L++){const ae=Be[L].image[se].image;Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,0,0,ae.width,ae.height,Ce,Se,ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,de,ae.width,ae.height,0,Ce,Se,ae.data)}}else{Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ce,Se,Z[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,de,Ce,Se,Z[se]);for(let L=0;L<Be.length;L++){const oe=Be[L];Ie?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,0,0,Ce,Se,oe.image[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,de,Ce,Se,oe.image[se])}}}x(M,Ge)&&v(s.TEXTURE_CUBE_MAP),ee.__version=J.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function ce(b,M,z,Q,J,ee){const me=r.convert(z.format,z.colorSpace),le=r.convert(z.type),ue=S(z.internalFormat,me,le,z.colorSpace);if(!n.get(M).__hasExternalTextures){const Oe=Math.max(1,M.width>>ee),Z=Math.max(1,M.height>>ee);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?t.texImage3D(J,ee,ue,Oe,Z,M.depth,0,me,le,null):t.texImage2D(J,ee,ue,Oe,Z,0,me,le,null)}t.bindFramebuffer(s.FRAMEBUFFER,b),pe(M)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,J,n.get(z).__webglTexture,0,we(M)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Q,J,n.get(z).__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function xe(b,M,z){if(s.bindRenderbuffer(s.RENDERBUFFER,b),M.depthBuffer&&!M.stencilBuffer){let Q=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(z||pe(M)){const J=M.depthTexture;J&&J.isDepthTexture&&(J.type===Sn?Q=s.DEPTH_COMPONENT32F:J.type===On&&(Q=s.DEPTH_COMPONENT24));const ee=we(M);pe(M)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee,Q,M.width,M.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,ee,Q,M.width,M.height)}else s.renderbufferStorage(s.RENDERBUFFER,Q,M.width,M.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,b)}else if(M.depthBuffer&&M.stencilBuffer){const Q=we(M);z&&pe(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Q,s.DEPTH24_STENCIL8,M.width,M.height):pe(M)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Q,s.DEPTH24_STENCIL8,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,b)}else{const Q=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let J=0;J<Q.length;J++){const ee=Q[J],me=r.convert(ee.format,ee.colorSpace),le=r.convert(ee.type),ue=S(ee.internalFormat,me,le,ee.colorSpace),be=we(M);z&&pe(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,be,ue,M.width,M.height):pe(M)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,be,ue,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ue,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ye(b,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,b),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V(M.depthTexture,0);const Q=n.get(M.depthTexture).__webglTexture,J=we(M);if(M.depthTexture.format===si)pe(M)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(M.depthTexture.format===Fi)pe(M)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Me(b){const M=n.get(b),z=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");ye(M.__webglFramebuffer,b)}else if(z){M.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[Q]),M.__webglDepthbuffer[Q]=s.createRenderbuffer(),xe(M.__webglDepthbuffer[Q],b,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=s.createRenderbuffer(),xe(M.__webglDepthbuffer,b,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ve(b,M,z){const Q=n.get(b);M!==void 0&&ce(Q.__webglFramebuffer,b,b.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Me(b)}function O(b){const M=b.texture,z=n.get(b),Q=n.get(M);b.addEventListener("dispose",I),b.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=s.createTexture()),Q.__version=M.version,o.memory.textures++);const J=b.isWebGLCubeRenderTarget===!0,ee=b.isWebGLMultipleRenderTargets===!0,me=m(b)||a;if(J){z.__webglFramebuffer=[];for(let le=0;le<6;le++)if(a&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[le]=[];for(let ue=0;ue<M.mipmaps.length;ue++)z.__webglFramebuffer[le][ue]=s.createFramebuffer()}else z.__webglFramebuffer[le]=s.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let le=0;le<M.mipmaps.length;le++)z.__webglFramebuffer[le]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(ee)if(i.drawBuffers){const le=b.texture;for(let ue=0,be=le.length;ue<be;ue++){const Oe=n.get(le[ue]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&pe(b)===!1){const le=ee?M:[M];z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ue=0;ue<le.length;ue++){const be=le[ue];z.__webglColorRenderbuffer[ue]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[ue]);const Oe=r.convert(be.format,be.colorSpace),Z=r.convert(be.type),Ke=S(be.internalFormat,Oe,Z,be.colorSpace,b.isXRRenderTarget===!0),Ge=we(b);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ge,Ke,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,z.__webglColorRenderbuffer[ue])}s.bindRenderbuffer(s.RENDERBUFFER,null),b.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),xe(z.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),W(s.TEXTURE_CUBE_MAP,M,me);for(let le=0;le<6;le++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)ce(z.__webglFramebuffer[le][ue],b,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,ue);else ce(z.__webglFramebuffer[le],b,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);x(M,me)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const le=b.texture;for(let ue=0,be=le.length;ue<be;ue++){const Oe=le[ue],Z=n.get(Oe);t.bindTexture(s.TEXTURE_2D,Z.__webglTexture),W(s.TEXTURE_2D,Oe,me),ce(z.__webglFramebuffer,b,Oe,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,0),x(Oe,me)&&v(s.TEXTURE_2D)}t.unbindTexture()}else{let le=s.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?le=b.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,Q.__webglTexture),W(le,M,me),a&&M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)ce(z.__webglFramebuffer[ue],b,M,s.COLOR_ATTACHMENT0,le,ue);else ce(z.__webglFramebuffer,b,M,s.COLOR_ATTACHMENT0,le,0);x(M,me)&&v(le),t.unbindTexture()}b.depthBuffer&&Me(b)}function lt(b){const M=m(b)||a,z=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let Q=0,J=z.length;Q<J;Q++){const ee=z[Q];if(x(ee,M)){const me=b.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,le=n.get(ee).__webglTexture;t.bindTexture(me,le),v(me),t.unbindTexture()}}}function _e(b){if(a&&b.samples>0&&pe(b)===!1){const M=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],z=b.width,Q=b.height;let J=s.COLOR_BUFFER_BIT;const ee=[],me=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=n.get(b),ue=b.isWebGLMultipleRenderTargets===!0;if(ue)for(let be=0;be<M.length;be++)t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let be=0;be<M.length;be++){ee.push(s.COLOR_ATTACHMENT0+be),b.depthBuffer&&ee.push(me);const Oe=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(Oe===!1&&(b.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),b.stencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),ue&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,le.__webglColorRenderbuffer[be]),Oe===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[me]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[me])),ue){const Z=n.get(M[be]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Z,0)}s.blitFramebuffer(0,0,z,Q,0,0,z,Q,J,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ue)for(let be=0;be<M.length;be++){t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,le.__webglColorRenderbuffer[be]);const Oe=n.get(M[be]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.TEXTURE_2D,Oe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function we(b){return Math.min(i.maxSamples,b.samples)}function pe(b){const M=n.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function st(b){const M=o.render.frame;h.get(b)!==M&&(h.set(b,M),b.update())}function Ne(b,M){const z=b.colorSpace,Q=b.format,J=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===Uo||z!==Et&&z!==$t&&(Xe.getTransfer(z)===nt?a===!1?e.has("EXT_sRGB")===!0&&Q===Kt?(b.format=Uo,b.minFilter=Bt,b.generateMipmaps=!1):M=Xl.sRGBToLinear(M):(Q!==Kt||J!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}this.allocateTextureUnit=P,this.resetTextureUnits=$,this.setTexture2D=V,this.setTexture2DArray=q,this.setTexture3D=X,this.setTextureCube=Y,this.rebindTextures=Ve,this.setupRenderTarget=O,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=pe}function $g(s,e,t){const n=t.isWebGL2;function i(r,o=$t){let a;const c=Xe.getTransfer(o);if(r===kn)return s.UNSIGNED_BYTE;if(r===Ul)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Nl)return s.UNSIGNED_SHORT_5_5_5_1;if(r===gu)return s.BYTE;if(r===_u)return s.SHORT;if(r===Yo)return s.UNSIGNED_SHORT;if(r===Dl)return s.INT;if(r===On)return s.UNSIGNED_INT;if(r===Sn)return s.FLOAT;if(r===an)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===vu)return s.ALPHA;if(r===Kt)return s.RGBA;if(r===xu)return s.LUMINANCE;if(r===yu)return s.LUMINANCE_ALPHA;if(r===si)return s.DEPTH_COMPONENT;if(r===Fi)return s.DEPTH_STENCIL;if(r===Uo)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Mu)return s.RED;if(r===Ol)return s.RED_INTEGER;if(r===Su)return s.RG;if(r===Fl)return s.RG_INTEGER;if(r===Bl)return s.RGBA_INTEGER;if(r===zr||r===Gr||r===Hr||r===Vr)if(c===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===zr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Gr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Vr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===zr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Gr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Hr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Vr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===La||r===Pa||r===Ia||r===Da)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===La)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Pa)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ia)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Da)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===kl)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ua||r===Na)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Ua)return c===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Na)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Oa||r===Fa||r===Ba||r===ka||r===za||r===Ga||r===Ha||r===Va||r===Wa||r===Xa||r===qa||r===Ya||r===ja||r===Ka)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Oa)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Fa)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ba)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ka)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===za)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ga)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ha)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Va)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Wa)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Xa)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===qa)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ya)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ja)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ka)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Wr||r===$a||r===Za)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Wr)return c===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===$a)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Za)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Eu||r===Ja||r===Qa||r===ec)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Wr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Ja)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Qa)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ec)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ii?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class Zg extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Pt extends it{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jg={type:"move"};class mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jg)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Pt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Qg extends Xi{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null;const _=t.getContextAttributes();let m=null,f=null;const x=[],v=[],S=new ve;let C=null;const A=new Rt;A.layers.enable(1),A.viewport=new je;const w=new Rt;w.layers.enable(2),w.viewport=new je;const I=[A,w],y=new Zg;y.layers.enable(1),y.layers.enable(2);let T=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let K=x[W];return K===void 0&&(K=new mo,x[W]=K),K.getTargetRaySpace()},this.getControllerGrip=function(W){let K=x[W];return K===void 0&&(K=new mo,x[W]=K),K.getGripSpace()},this.getHand=function(W){let K=x[W];return K===void 0&&(K=new mo,x[W]=K),K.getHandSpace()};function B(W){const K=v.indexOf(W.inputSource);if(K===-1)return;const N=x[K];N!==void 0&&(N.update(W.inputSource,W.frame,l||o),N.dispatchEvent({type:W.type,data:W.inputSource}))}function $(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",$),i.removeEventListener("inputsourceschange",P);for(let W=0;W<x.length;W++){const K=v[W];K!==null&&(v[W]=null,x[W].disconnect(K))}T=null,U=null,e.setRenderTarget(m),p=null,d=null,u=null,i=null,f=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",$),i.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,K),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new Zt(p.framebufferWidth,p.framebufferHeight,{format:Kt,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let K=null,N=null,ie=null;_.depth&&(ie=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=_.stencil?Fi:si,N=_.stencil?ii:On);const ce={colorFormat:t.RGBA8,depthFormat:ie,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(ce),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new Zt(d.textureWidth,d.textureHeight,{format:Kt,type:kn,depthTexture:new nh(d.textureWidth,d.textureHeight,N,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const xe=e.properties.get(f);xe.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(W){for(let K=0;K<W.removed.length;K++){const N=W.removed[K],ie=v.indexOf(N);ie>=0&&(v[ie]=null,x[ie].disconnect(N))}for(let K=0;K<W.added.length;K++){const N=W.added[K];let ie=v.indexOf(N);if(ie===-1){for(let xe=0;xe<x.length;xe++)if(xe>=v.length){v.push(N),ie=xe;break}else if(v[xe]===null){v[xe]=N,ie=xe;break}if(ie===-1)break}const ce=x[ie];ce&&ce.connect(N)}}const F=new R,V=new R;function q(W,K,N){F.setFromMatrixPosition(K.matrixWorld),V.setFromMatrixPosition(N.matrixWorld);const ie=F.distanceTo(V),ce=K.projectionMatrix.elements,xe=N.projectionMatrix.elements,ye=ce[14]/(ce[10]-1),Me=ce[14]/(ce[10]+1),Ve=(ce[9]+1)/ce[5],O=(ce[9]-1)/ce[5],lt=(ce[8]-1)/ce[0],_e=(xe[8]+1)/xe[0],we=ye*lt,pe=ye*_e,st=ie/(-lt+_e),Ne=st*-lt;K.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Ne),W.translateZ(st),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const b=ye+st,M=Me+st,z=we-Ne,Q=pe+(ie-Ne),J=Ve*Me/M*b,ee=O*Me/M*b;W.projectionMatrix.makePerspective(z,Q,J,ee,b,M),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function X(W,K){K===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(K.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;y.near=w.near=A.near=W.near,y.far=w.far=A.far=W.far,(T!==y.near||U!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,U=y.far);const K=W.parent,N=y.cameras;X(y,K);for(let ie=0;ie<N.length;ie++)X(N[ie],K);N.length===2?q(y,A,w):y.projectionMatrix.copy(A.projectionMatrix),Y(W,y,K)};function Y(W,K,N){N===null?W.matrix.copy(K.matrixWorld):(W.matrix.copy(N.matrixWorld),W.matrix.invert(),W.matrix.multiply(K.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(K.projectionMatrix),W.projectionMatrixInverse.copy(K.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=ki*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(W){c=W,d!==null&&(d.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)};let j=null;function te(W,K){if(h=K.getViewerPose(l||o),g=K,h!==null){const N=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ie=!1;N.length!==y.cameras.length&&(y.cameras.length=0,ie=!0);for(let ce=0;ce<N.length;ce++){const xe=N[ce];let ye=null;if(p!==null)ye=p.getViewport(xe);else{const Ve=u.getViewSubImage(d,xe);ye=Ve.viewport,ce===0&&(e.setRenderTargetTextures(f,Ve.colorTexture,d.ignoreDepthValues?void 0:Ve.depthStencilTexture),e.setRenderTarget(f))}let Me=I[ce];Me===void 0&&(Me=new Rt,Me.layers.enable(ce),Me.viewport=new je,I[ce]=Me),Me.matrix.fromArray(xe.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(xe.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(ye.x,ye.y,ye.width,ye.height),ce===0&&(y.matrix.copy(Me.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ie===!0&&y.cameras.push(Me)}}for(let N=0;N<x.length;N++){const ie=v[N],ce=x[N];ie!==null&&ce!==void 0&&ce.update(ie,K,l||o)}j&&j(W,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const ne=new th;ne.setAnimationLoop(te),this.setAnimationLoop=function(W){j=W},this.dispose=function(){}}}function e_(s,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Jl(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,x,v,S){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,x,v):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===kt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===kt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const x=e.get(f).envMap;if(x&&(m.envMap.value=x,m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const v=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*v,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,x,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*x,m.scale.value=v*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,x){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===kt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const x=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function t_(s,e,t,n){let i={},r={},o=[];const a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,v){const S=v.program;n.uniformBlockBinding(x,S)}function l(x,v){let S=i[x.id];S===void 0&&(g(x),S=h(x),i[x.id]=S,x.addEventListener("dispose",m));const C=v.program;n.updateUBOMapping(x,C);const A=e.render.frame;r[x.id]!==A&&(d(x),r[x.id]=A)}function h(x){const v=u();x.__bindingPointIndex=v;const S=s.createBuffer(),C=x.__size,A=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,C,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,S),S}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const v=i[x.id],S=x.uniforms,C=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let A=0,w=S.length;A<w;A++){const I=Array.isArray(S[A])?S[A]:[S[A]];for(let y=0,T=I.length;y<T;y++){const U=I[y];if(p(U,A,y,C)===!0){const B=U.__offset,$=Array.isArray(U.value)?U.value:[U.value];let P=0;for(let F=0;F<$.length;F++){const V=$[F],q=_(V);typeof V=="number"||typeof V=="boolean"?(U.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,B+P,U.__data)):V.isMatrix3?(U.__data[0]=V.elements[0],U.__data[1]=V.elements[1],U.__data[2]=V.elements[2],U.__data[3]=0,U.__data[4]=V.elements[3],U.__data[5]=V.elements[4],U.__data[6]=V.elements[5],U.__data[7]=0,U.__data[8]=V.elements[6],U.__data[9]=V.elements[7],U.__data[10]=V.elements[8],U.__data[11]=0):(V.toArray(U.__data,P),P+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,B,U.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(x,v,S,C){const A=x.value,w=v+"_"+S;if(C[w]===void 0)return typeof A=="number"||typeof A=="boolean"?C[w]=A:C[w]=A.clone(),!0;{const I=C[w];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return C[w]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(x){const v=x.uniforms;let S=0;const C=16;for(let w=0,I=v.length;w<I;w++){const y=Array.isArray(v[w])?v[w]:[v[w]];for(let T=0,U=y.length;T<U;T++){const B=y[T],$=Array.isArray(B.value)?B.value:[B.value];for(let P=0,F=$.length;P<F;P++){const V=$[P],q=_(V),X=S%C;X!==0&&C-X<q.boundary&&(S+=C-X),B.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=q.storage}}}const A=S%C;return A>0&&(S+=C-A),x.__size=S,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function m(x){const v=x.target;v.removeEventListener("dispose",m);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function f(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:c,update:l,dispose:f}}class ch{constructor(e={}){const{canvas:t=Zu(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const f=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ct,this._useLegacyLights=!1,this.toneMapping=Bn,this.toneMappingExposure=1;const v=this;let S=!1,C=0,A=0,w=null,I=-1,y=null;const T=new je,U=new je;let B=null;const $=new fe(0);let P=0,F=t.width,V=t.height,q=1,X=null,Y=null;const j=new je(0,0,F,V),te=new je(0,0,F,V);let ne=!1;const W=new $o;let K=!1,N=!1,ie=null;const ce=new Ue,xe=new ve,ye=new R,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ve(){return w===null?q:1}let O=n;function lt(E,D){for(let G=0;G<E.length;G++){const H=E[G],k=t.getContext(H,D);if(k!==null)return k}return null}try{const E={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qo}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",oe,!1),O===null){const D=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&D.shift(),O=lt(D,E),O===null)throw lt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let _e,we,pe,st,Ne,b,M,z,Q,J,ee,me,le,ue,be,Oe,Z,Ke,Ge,Ce,Se,de,Ie,qe;function ot(){_e=new um(O),we=new rm(O,_e,e),_e.init(we),de=new $g(O,_e,we),pe=new jg(O,_e,we),st=new pm(O),Ne=new Ug,b=new Kg(O,_e,pe,Ne,we,de,st),M=new am(v),z=new hm(v),Q=new Md(O,we),Ie=new im(O,_e,Q,we),J=new dm(O,Q,st,Ie),ee=new vm(O,J,Q,st),Ge=new _m(O,we,b),Oe=new om(Ne),me=new Dg(v,M,z,_e,we,Ie,Oe),le=new e_(v,Ne),ue=new Og,be=new Hg(_e,we),Ke=new nm(v,M,z,pe,ee,d,c),Z=new Yg(v,ee,we),qe=new t_(O,st,we,pe),Ce=new sm(O,_e,st,we),Se=new fm(O,_e,st,we),st.programs=me.programs,v.capabilities=we,v.extensions=_e,v.properties=Ne,v.renderLists=ue,v.shadowMap=Z,v.state=pe,v.info=st}ot();const Be=new Qg(v,O);this.xr=Be,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=_e.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=_e.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(E){E!==void 0&&(q=E,this.setSize(F,V,!1))},this.getSize=function(E){return E.set(F,V)},this.setSize=function(E,D,G=!0){if(Be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=E,V=D,t.width=Math.floor(E*q),t.height=Math.floor(D*q),G===!0&&(t.style.width=E+"px",t.style.height=D+"px"),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(F*q,V*q).floor()},this.setDrawingBufferSize=function(E,D,G){F=E,V=D,q=G,t.width=Math.floor(E*G),t.height=Math.floor(D*G),this.setViewport(0,0,E,D)},this.getCurrentViewport=function(E){return E.copy(T)},this.getViewport=function(E){return E.copy(j)},this.setViewport=function(E,D,G,H){E.isVector4?j.set(E.x,E.y,E.z,E.w):j.set(E,D,G,H),pe.viewport(T.copy(j).multiplyScalar(q).floor())},this.getScissor=function(E){return E.copy(te)},this.setScissor=function(E,D,G,H){E.isVector4?te.set(E.x,E.y,E.z,E.w):te.set(E,D,G,H),pe.scissor(U.copy(te).multiplyScalar(q).floor())},this.getScissorTest=function(){return ne},this.setScissorTest=function(E){pe.setScissorTest(ne=E)},this.setOpaqueSort=function(E){X=E},this.setTransparentSort=function(E){Y=E},this.getClearColor=function(E){return E.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor.apply(Ke,arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha.apply(Ke,arguments)},this.clear=function(E=!0,D=!0,G=!0){let H=0;if(E){let k=!1;if(w!==null){const he=w.texture.format;k=he===Bl||he===Fl||he===Ol}if(k){const he=w.texture.type,ge=he===kn||he===On||he===Yo||he===ii||he===Ul||he===Nl,Te=Ke.getClearColor(),Re=Ke.getClearAlpha(),Fe=Te.r,Le=Te.g,Pe=Te.b;ge?(p[0]=Fe,p[1]=Le,p[2]=Pe,p[3]=Re,O.clearBufferuiv(O.COLOR,0,p)):(g[0]=Fe,g[1]=Le,g[2]=Pe,g[3]=Re,O.clearBufferiv(O.COLOR,0,g))}else H|=O.COLOR_BUFFER_BIT}D&&(H|=O.DEPTH_BUFFER_BIT),G&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),ue.dispose(),be.dispose(),Ne.dispose(),M.dispose(),z.dispose(),ee.dispose(),Ie.dispose(),qe.dispose(),me.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",It),Be.removeEventListener("sessionend",tt),ie&&(ie.dispose(),ie=null),Dt.stop()};function se(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const E=st.autoReset,D=Z.enabled,G=Z.autoUpdate,H=Z.needsUpdate,k=Z.type;ot(),st.autoReset=E,Z.enabled=D,Z.autoUpdate=G,Z.needsUpdate=H,Z.type=k}function oe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ae(E){const D=E.target;D.removeEventListener("dispose",ae),Ae(D)}function Ae(E){Ee(E),Ne.remove(E)}function Ee(E){const D=Ne.get(E).programs;D!==void 0&&(D.forEach(function(G){me.releaseProgram(G)}),E.isShaderMaterial&&me.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,G,H,k,he){D===null&&(D=Me);const ge=k.isMesh&&k.matrixWorld.determinant()<0,Te=Oh(E,D,G,H,k);pe.setMaterial(H,ge);let Re=G.index,Fe=1;if(H.wireframe===!0){if(Re=J.getWireframeAttribute(G),Re===void 0)return;Fe=2}const Le=G.drawRange,Pe=G.attributes.position;let ht=Le.start*Fe,zt=(Le.start+Le.count)*Fe;he!==null&&(ht=Math.max(ht,he.start*Fe),zt=Math.min(zt,(he.start+he.count)*Fe)),Re!==null?(ht=Math.max(ht,0),zt=Math.min(zt,Re.count)):Pe!=null&&(ht=Math.max(ht,0),zt=Math.min(zt,Pe.count));const vt=zt-ht;if(vt<0||vt===1/0)return;Ie.setup(k,H,Te,G,Re);let pn,rt=Ce;if(Re!==null&&(pn=Q.get(Re),rt=Se,rt.setIndex(pn)),k.isMesh)H.wireframe===!0?(pe.setLineWidth(H.wireframeLinewidth*Ve()),rt.setMode(O.LINES)):rt.setMode(O.TRIANGLES);else if(k.isLine){let ke=H.linewidth;ke===void 0&&(ke=1),pe.setLineWidth(ke*Ve()),k.isLineSegments?rt.setMode(O.LINES):k.isLineLoop?rt.setMode(O.LINE_LOOP):rt.setMode(O.LINE_STRIP)}else k.isPoints?rt.setMode(O.POINTS):k.isSprite&&rt.setMode(O.TRIANGLES);if(k.isBatchedMesh)rt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else if(k.isInstancedMesh)rt.renderInstances(ht,vt,k.count);else if(G.isInstancedBufferGeometry){const ke=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Or=Math.min(G.instanceCount,ke);rt.renderInstances(ht,vt,Or)}else rt.render(ht,vt)};function Qe(E,D,G){E.transparent===!0&&E.side===Ct&&E.forceSinglePass===!1?(E.side=kt,E.needsUpdate=!0,Ss(E,D,G),E.side=bn,E.needsUpdate=!0,Ss(E,D,G),E.side=Ct):Ss(E,D,G)}this.compile=function(E,D,G=null){G===null&&(G=E),m=be.get(G),m.init(),x.push(m),G.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),E!==G&&E.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights(v._useLegacyLights);const H=new Set;return E.traverse(function(k){const he=k.material;if(he)if(Array.isArray(he))for(let ge=0;ge<he.length;ge++){const Te=he[ge];Qe(Te,G,k),H.add(Te)}else Qe(he,G,k),H.add(he)}),x.pop(),m=null,H},this.compileAsync=function(E,D,G=null){const H=this.compile(E,D,G);return new Promise(k=>{function he(){if(H.forEach(function(ge){Ne.get(ge).currentProgram.isReady()&&H.delete(ge)}),H.size===0){k(E);return}setTimeout(he,10)}_e.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let et=null;function _t(E){et&&et(E)}function It(){Dt.stop()}function tt(){Dt.start()}const Dt=new th;Dt.setAnimationLoop(_t),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(E){et=E,Be.setAnimationLoop(E),E===null?Dt.stop():Dt.start()},Be.addEventListener("sessionstart",It),Be.addEventListener("sessionend",tt),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(D),D=Be.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,D,w),m=be.get(E,x.length),m.init(),x.push(m),ce.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),W.setFromProjectionMatrix(ce),N=this.localClippingEnabled,K=Oe.init(this.clippingPlanes,N),_=ue.get(E,f.length),_.init(),f.push(_),sn(E,D,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(X,Y),this.info.render.frame++,K===!0&&Oe.beginShadows();const G=m.state.shadowsArray;if(Z.render(G,E,D),K===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ke.render(_,E),m.setupLights(v._useLegacyLights),D.isArrayCamera){const H=D.cameras;for(let k=0,he=H.length;k<he;k++){const ge=H[k];va(_,E,ge,ge.viewport)}}else va(_,E,D);w!==null&&(b.updateMultisampleRenderTarget(w),b.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(v,E,D),Ie.resetDefaultState(),I=-1,y=null,x.pop(),x.length>0?m=x[x.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function sn(E,D,G,H){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)G=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||W.intersectsSprite(E)){H&&ye.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ce);const ge=ee.update(E),Te=E.material;Te.visible&&_.push(E,ge,Te,G,ye.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||W.intersectsObject(E))){const ge=ee.update(E),Te=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ye.copy(E.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),ye.copy(ge.boundingSphere.center)),ye.applyMatrix4(E.matrixWorld).applyMatrix4(ce)),Array.isArray(Te)){const Re=ge.groups;for(let Fe=0,Le=Re.length;Fe<Le;Fe++){const Pe=Re[Fe],ht=Te[Pe.materialIndex];ht&&ht.visible&&_.push(E,ge,ht,G,ye.z,Pe)}}else Te.visible&&_.push(E,ge,Te,G,ye.z,null)}}const he=E.children;for(let ge=0,Te=he.length;ge<Te;ge++)sn(he[ge],D,G,H)}function va(E,D,G,H){const k=E.opaque,he=E.transmissive,ge=E.transparent;m.setupLightsView(G),K===!0&&Oe.setGlobalState(v.clippingPlanes,G),he.length>0&&Nh(k,he,D,G),H&&pe.viewport(T.copy(H)),k.length>0&&Ms(k,D,G),he.length>0&&Ms(he,D,G),ge.length>0&&Ms(ge,D,G),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Nh(E,D,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const he=we.isWebGL2;ie===null&&(ie=new Zt(1,1,{generateMipmaps:!0,type:_e.has("EXT_color_buffer_half_float")?an:kn,minFilter:oi,samples:he?4:0})),v.getDrawingBufferSize(xe),he?ie.setSize(xe.x,xe.y):ie.setSize(xr(xe.x),xr(xe.y));const ge=v.getRenderTarget();v.setRenderTarget(ie),v.getClearColor($),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();const Te=v.toneMapping;v.toneMapping=Bn,Ms(E,G,H),b.updateMultisampleRenderTarget(ie),b.updateRenderTargetMipmap(ie);let Re=!1;for(let Fe=0,Le=D.length;Fe<Le;Fe++){const Pe=D[Fe],ht=Pe.object,zt=Pe.geometry,vt=Pe.material,pn=Pe.group;if(vt.side===Ct&&ht.layers.test(H.layers)){const rt=vt.side;vt.side=kt,vt.needsUpdate=!0,xa(ht,G,H,zt,vt,pn),vt.side=rt,vt.needsUpdate=!0,Re=!0}}Re===!0&&(b.updateMultisampleRenderTarget(ie),b.updateRenderTargetMipmap(ie)),v.setRenderTarget(ge),v.setClearColor($,P),v.toneMapping=Te}function Ms(E,D,G){const H=D.isScene===!0?D.overrideMaterial:null;for(let k=0,he=E.length;k<he;k++){const ge=E[k],Te=ge.object,Re=ge.geometry,Fe=H===null?ge.material:H,Le=ge.group;Te.layers.test(G.layers)&&xa(Te,D,G,Re,Fe,Le)}}function xa(E,D,G,H,k,he){E.onBeforeRender(v,D,G,H,k,he),E.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),k.onBeforeRender(v,D,G,H,E,he),k.transparent===!0&&k.side===Ct&&k.forceSinglePass===!1?(k.side=kt,k.needsUpdate=!0,v.renderBufferDirect(G,D,H,k,E,he),k.side=bn,k.needsUpdate=!0,v.renderBufferDirect(G,D,H,k,E,he),k.side=Ct):v.renderBufferDirect(G,D,H,k,E,he),E.onAfterRender(v,D,G,H,k,he)}function Ss(E,D,G){D.isScene!==!0&&(D=Me);const H=Ne.get(E),k=m.state.lights,he=m.state.shadowsArray,ge=k.state.version,Te=me.getParameters(E,k.state,he,D,G),Re=me.getProgramCacheKey(Te);let Fe=H.programs;H.environment=E.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(E.isMeshStandardMaterial?z:M).get(E.envMap||H.environment),Fe===void 0&&(E.addEventListener("dispose",ae),Fe=new Map,H.programs=Fe);let Le=Fe.get(Re);if(Le!==void 0){if(H.currentProgram===Le&&H.lightsStateVersion===ge)return Ma(E,Te),Le}else Te.uniforms=me.getUniforms(E),E.onBuild(G,Te,v),E.onBeforeCompile(Te,v),Le=me.acquireProgram(Te,Re),Fe.set(Re,Le),H.uniforms=Te.uniforms;const Pe=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Pe.clippingPlanes=Oe.uniform),Ma(E,Te),H.needsLights=Bh(E),H.lightsStateVersion=ge,H.needsLights&&(Pe.ambientLightColor.value=k.state.ambient,Pe.lightProbe.value=k.state.probe,Pe.directionalLights.value=k.state.directional,Pe.directionalLightShadows.value=k.state.directionalShadow,Pe.spotLights.value=k.state.spot,Pe.spotLightShadows.value=k.state.spotShadow,Pe.rectAreaLights.value=k.state.rectArea,Pe.ltc_1.value=k.state.rectAreaLTC1,Pe.ltc_2.value=k.state.rectAreaLTC2,Pe.pointLights.value=k.state.point,Pe.pointLightShadows.value=k.state.pointShadow,Pe.hemisphereLights.value=k.state.hemi,Pe.directionalShadowMap.value=k.state.directionalShadowMap,Pe.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Pe.spotShadowMap.value=k.state.spotShadowMap,Pe.spotLightMatrix.value=k.state.spotLightMatrix,Pe.spotLightMap.value=k.state.spotLightMap,Pe.pointShadowMap.value=k.state.pointShadowMap,Pe.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=Le,H.uniformsList=null,Le}function ya(E){if(E.uniformsList===null){const D=E.currentProgram.getUniforms();E.uniformsList=sr.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function Ma(E,D){const G=Ne.get(E);G.outputColorSpace=D.outputColorSpace,G.batching=D.batching,G.instancing=D.instancing,G.instancingColor=D.instancingColor,G.skinning=D.skinning,G.morphTargets=D.morphTargets,G.morphNormals=D.morphNormals,G.morphColors=D.morphColors,G.morphTargetsCount=D.morphTargetsCount,G.numClippingPlanes=D.numClippingPlanes,G.numIntersection=D.numClipIntersection,G.vertexAlphas=D.vertexAlphas,G.vertexTangents=D.vertexTangents,G.toneMapping=D.toneMapping}function Oh(E,D,G,H,k){D.isScene!==!0&&(D=Me),b.resetTextureUnits();const he=D.fog,ge=H.isMeshStandardMaterial?D.environment:null,Te=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Et,Re=(H.isMeshStandardMaterial?z:M).get(H.envMap||ge),Fe=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Le=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pe=!!G.morphAttributes.position,ht=!!G.morphAttributes.normal,zt=!!G.morphAttributes.color;let vt=Bn;H.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(vt=v.toneMapping);const pn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,rt=pn!==void 0?pn.length:0,ke=Ne.get(H),Or=m.state.lights;if(K===!0&&(N===!0||E!==y)){const Vt=E===y&&H.id===I;Oe.setState(H,E,Vt)}let at=!1;H.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==Or.state.version||ke.outputColorSpace!==Te||k.isBatchedMesh&&ke.batching===!1||!k.isBatchedMesh&&ke.batching===!0||k.isInstancedMesh&&ke.instancing===!1||!k.isInstancedMesh&&ke.instancing===!0||k.isSkinnedMesh&&ke.skinning===!1||!k.isSkinnedMesh&&ke.skinning===!0||k.isInstancedMesh&&ke.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&ke.instancingColor===!1&&k.instanceColor!==null||ke.envMap!==Re||H.fog===!0&&ke.fog!==he||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==Oe.numPlanes||ke.numIntersection!==Oe.numIntersection)||ke.vertexAlphas!==Fe||ke.vertexTangents!==Le||ke.morphTargets!==Pe||ke.morphNormals!==ht||ke.morphColors!==zt||ke.toneMapping!==vt||we.isWebGL2===!0&&ke.morphTargetsCount!==rt)&&(at=!0):(at=!0,ke.__version=H.version);let qn=ke.currentProgram;at===!0&&(qn=Ss(H,D,k));let Sa=!1,Qi=!1,Fr=!1;const Tt=qn.getUniforms(),Yn=ke.uniforms;if(pe.useProgram(qn.program)&&(Sa=!0,Qi=!0,Fr=!0),H.id!==I&&(I=H.id,Qi=!0),Sa||y!==E){Tt.setValue(O,"projectionMatrix",E.projectionMatrix),Tt.setValue(O,"viewMatrix",E.matrixWorldInverse);const Vt=Tt.map.cameraPosition;Vt!==void 0&&Vt.setValue(O,ye.setFromMatrixPosition(E.matrixWorld)),we.logarithmicDepthBuffer&&Tt.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Tt.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,Qi=!0,Fr=!0)}if(k.isSkinnedMesh){Tt.setOptional(O,k,"bindMatrix"),Tt.setOptional(O,k,"bindMatrixInverse");const Vt=k.skeleton;Vt&&(we.floatVertexTextures?(Vt.boneTexture===null&&Vt.computeBoneTexture(),Tt.setValue(O,"boneTexture",Vt.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}k.isBatchedMesh&&(Tt.setOptional(O,k,"batchingTexture"),Tt.setValue(O,"batchingTexture",k._matricesTexture,b));const Br=G.morphAttributes;if((Br.position!==void 0||Br.normal!==void 0||Br.color!==void 0&&we.isWebGL2===!0)&&Ge.update(k,G,qn),(Qi||ke.receiveShadow!==k.receiveShadow)&&(ke.receiveShadow=k.receiveShadow,Tt.setValue(O,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Yn.envMap.value=Re,Yn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),Qi&&(Tt.setValue(O,"toneMappingExposure",v.toneMappingExposure),ke.needsLights&&Fh(Yn,Fr),he&&H.fog===!0&&le.refreshFogUniforms(Yn,he),le.refreshMaterialUniforms(Yn,H,q,V,ie),sr.upload(O,ya(ke),Yn,b)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(sr.upload(O,ya(ke),Yn,b),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Tt.setValue(O,"center",k.center),Tt.setValue(O,"modelViewMatrix",k.modelViewMatrix),Tt.setValue(O,"normalMatrix",k.normalMatrix),Tt.setValue(O,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Vt=H.uniformsGroups;for(let kr=0,kh=Vt.length;kr<kh;kr++)if(we.isWebGL2){const Ea=Vt[kr];qe.update(Ea,qn),qe.bind(Ea,qn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return qn}function Fh(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function Bh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,D,G){Ne.get(E.texture).__webglTexture=D,Ne.get(E.depthTexture).__webglTexture=G;const H=Ne.get(E);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||_e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,D){const G=Ne.get(E);G.__webglFramebuffer=D,G.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(E,D=0,G=0){w=E,C=D,A=G;let H=!0,k=null,he=!1,ge=!1;if(E){const Re=Ne.get(E);Re.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(O.FRAMEBUFFER,null),H=!1):Re.__webglFramebuffer===void 0?b.setupRenderTarget(E):Re.__hasExternalTextures&&b.rebindTextures(E,Ne.get(E.texture).__webglTexture,Ne.get(E.depthTexture).__webglTexture);const Fe=E.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(ge=!0);const Le=Ne.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Le[D])?k=Le[D][G]:k=Le[D],he=!0):we.isWebGL2&&E.samples>0&&b.useMultisampledRTT(E)===!1?k=Ne.get(E).__webglMultisampledFramebuffer:Array.isArray(Le)?k=Le[G]:k=Le,T.copy(E.viewport),U.copy(E.scissor),B=E.scissorTest}else T.copy(j).multiplyScalar(q).floor(),U.copy(te).multiplyScalar(q).floor(),B=ne;if(pe.bindFramebuffer(O.FRAMEBUFFER,k)&&we.drawBuffers&&H&&pe.drawBuffers(E,k),pe.viewport(T),pe.scissor(U),pe.setScissorTest(B),he){const Re=Ne.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+D,Re.__webglTexture,G)}else if(ge){const Re=Ne.get(E.texture),Fe=D||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Re.__webglTexture,G||0,Fe)}I=-1},this.readRenderTargetPixels=function(E,D,G,H,k,he,ge){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=Ne.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(Te=Te[ge]),Te){pe.bindFramebuffer(O.FRAMEBUFFER,Te);try{const Re=E.texture,Fe=Re.format,Le=Re.type;if(Fe!==Kt&&de.convert(Fe)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Pe=Le===an&&(_e.has("EXT_color_buffer_half_float")||we.isWebGL2&&_e.has("EXT_color_buffer_float"));if(Le!==kn&&de.convert(Le)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Le===Sn&&(we.isWebGL2||_e.has("OES_texture_float")||_e.has("WEBGL_color_buffer_float")))&&!Pe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-H&&G>=0&&G<=E.height-k&&O.readPixels(D,G,H,k,de.convert(Fe),de.convert(Le),he)}finally{const Re=w!==null?Ne.get(w).__webglFramebuffer:null;pe.bindFramebuffer(O.FRAMEBUFFER,Re)}}},this.copyFramebufferToTexture=function(E,D,G=0){const H=Math.pow(2,-G),k=Math.floor(D.image.width*H),he=Math.floor(D.image.height*H);b.setTexture2D(D,0),O.copyTexSubImage2D(O.TEXTURE_2D,G,0,0,E.x,E.y,k,he),pe.unbindTexture()},this.copyTextureToTexture=function(E,D,G,H=0){const k=D.image.width,he=D.image.height,ge=de.convert(G.format),Te=de.convert(G.type);b.setTexture2D(G,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment),D.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,H,E.x,E.y,k,he,ge,Te,D.image.data):D.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,H,E.x,E.y,D.mipmaps[0].width,D.mipmaps[0].height,ge,D.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,H,E.x,E.y,ge,Te,D.image),H===0&&G.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(E,D,G,H,k=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=E.max.x-E.min.x+1,ge=E.max.y-E.min.y+1,Te=E.max.z-E.min.z+1,Re=de.convert(H.format),Fe=de.convert(H.type);let Le;if(H.isData3DTexture)b.setTexture3D(H,0),Le=O.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)b.setTexture2DArray(H,0),Le=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment);const Pe=O.getParameter(O.UNPACK_ROW_LENGTH),ht=O.getParameter(O.UNPACK_IMAGE_HEIGHT),zt=O.getParameter(O.UNPACK_SKIP_PIXELS),vt=O.getParameter(O.UNPACK_SKIP_ROWS),pn=O.getParameter(O.UNPACK_SKIP_IMAGES),rt=G.isCompressedTexture?G.mipmaps[k]:G.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,rt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,rt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,E.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,E.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,E.min.z),G.isDataTexture||G.isData3DTexture?O.texSubImage3D(Le,k,D.x,D.y,D.z,he,ge,Te,Re,Fe,rt.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Le,k,D.x,D.y,D.z,he,ge,Te,Re,rt.data)):O.texSubImage3D(Le,k,D.x,D.y,D.z,he,ge,Te,Re,Fe,rt),O.pixelStorei(O.UNPACK_ROW_LENGTH,Pe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ht),O.pixelStorei(O.UNPACK_SKIP_PIXELS,zt),O.pixelStorei(O.UNPACK_SKIP_ROWS,vt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,pn),k===0&&H.generateMipmaps&&O.generateMipmap(Le),pe.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?b.setTextureCube(E,0):E.isData3DTexture?b.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?b.setTexture2DArray(E,0):b.setTexture2D(E,0),pe.unbindTexture()},this.resetState=function(){C=0,A=0,w=null,pe.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===jo?"display-p3":"srgb",t.unpackColorSpace=Xe.workingColorSpace===Sr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ct?ri:Gl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ri?ct:Et}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class n_ extends ch{}n_.prototype.isWebGL1Renderer=!0;class Jo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new fe(e),this.density=t}clone(){return new Jo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class i_ extends it{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class s_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=_r,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=nn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ut=new R;class Qo{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=on(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=on(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=on(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=on(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),i=$e(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),i=$e(i,this.array),r=$e(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Qo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Xc=new R,qc=new je,Yc=new je,r_=new R,jc=new Ue,Xs=new R,go=new dn,Kc=new Ue,_o=new Er;class o_ extends Ze{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ca,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new wn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Xs),this.boundingBox.expandByPoint(Xs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new dn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Xs),this.boundingSphere.expandByPoint(Xs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),go.copy(this.boundingSphere),go.applyMatrix4(i),e.ray.intersectsSphere(go)!==!1&&(Kc.copy(i).invert(),_o.copy(e.ray).applyMatrix4(Kc),!(this.boundingBox!==null&&_o.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,_o)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new je,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ca?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===mu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;qc.fromBufferAttribute(i.attributes.skinIndex,e),Yc.fromBufferAttribute(i.attributes.skinWeight,e),Xc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Yc.getComponent(r);if(o!==0){const a=qc.getComponent(r);jc.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(r_.copy(Xc).applyMatrix4(jc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class lh extends it{constructor(){super(),this.isBone=!0,this.type="Bone"}}class a_ extends St{constructor(e=null,t=1,n=1,i,r,o,a,c,l=yt,h=yt,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $c=new Ue,c_=new Ue;class ea{constructor(e=[],t=[]){this.uuid=nn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:c_;$c.multiplyMatrices(a,t[r]),$c.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ea(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new a_(t,e,e,Kt,Sn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new lh),this.bones.push(o),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Fo extends pt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const wi=new Ue,Zc=new Ue,qs=[],Jc=new wn,l_=new Ue,ss=new Ze,rs=new dn;class rr extends Ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Fo(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,l_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),Jc.copy(e.boundingBox).applyMatrix4(wi),this.boundingBox.union(Jc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new dn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),rs.copy(e.boundingSphere).applyMatrix4(wi),this.boundingSphere.union(rs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ss.geometry=this.geometry,ss.material=this.material,ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rs.copy(this.boundingSphere),rs.applyMatrix4(n),e.ray.intersectsSphere(rs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,wi),Zc.multiplyMatrices(n,wi),ss.matrixWorld=Zc,ss.raycast(e,qs);for(let o=0,a=qs.length;o<a;o++){const c=qs[o];c.instanceId=r,c.object=this,t.push(c)}qs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Fo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Ar extends cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Qc=new R,el=new R,tl=new Ue,vo=new Er,Ys=new dn;class ta extends it{constructor(e=new ut,t=new Ar){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Qc.fromBufferAttribute(t,i-1),el.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Qc.distanceTo(el);e.setAttribute("lineDistance",new Je(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(i),Ys.radius+=r,e.ray.intersectsSphere(Ys)===!1)return;tl.copy(i).invert(),vo.copy(e.ray).applyMatrix4(tl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new R,h=new R,u=new R,d=new R,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const f=Math.max(0,o.start),x=Math.min(g.count,o.start+o.count);for(let v=f,S=x-1;v<S;v+=p){const C=g.getX(v),A=g.getX(v+1);if(l.fromBufferAttribute(m,C),h.fromBufferAttribute(m,A),vo.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(d);I<e.near||I>e.far||t.push({distance:I,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,o.start),x=Math.min(m.count,o.start+o.count);for(let v=f,S=x-1;v<S;v+=p){if(l.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),vo.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(d);A<e.near||A>e.far||t.push({distance:A,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const nl=new R,il=new R;class na extends ta{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)nl.fromBufferAttribute(t,i),il.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+nl.distanceTo(il);e.setAttribute("lineDistance",new Je(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class h_ extends ta{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class gs extends cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const sl=new Ue,Bo=new Er,js=new dn,Ks=new R;class Rr extends it{constructor(e=new ut,t=new gs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),js.copy(n.boundingSphere),js.applyMatrix4(i),js.radius+=r,e.ray.intersectsSphere(js)===!1)return;sl.copy(i).invert(),Bo.copy(e.ray).applyMatrix4(sl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=l.getX(g);Ks.fromBufferAttribute(u,m),rl(Ks,m,c,i,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)Ks.fromBufferAttribute(u,g),rl(Ks,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function rl(s,e,t,n,i,r,o){const a=Bo.distanceSqToPoint(s);if(a<t){const c=new R;Bo.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}class ia extends St{constructor(e,t,n,i,r,o,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _s extends ut{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=n/2;let f=0;x(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Je(u,3)),this.setAttribute("normal",new Je(d,3)),this.setAttribute("uv",new Je(p,2));function x(){const S=new R,C=new R;let A=0;const w=(t-e)/n;for(let I=0;I<=r;I++){const y=[],T=I/r,U=T*(t-e)+e;for(let B=0;B<=i;B++){const $=B/i,P=$*c+a,F=Math.sin(P),V=Math.cos(P);C.x=U*F,C.y=-T*n+m,C.z=U*V,u.push(C.x,C.y,C.z),S.set(F,w,V).normalize(),d.push(S.x,S.y,S.z),p.push($,1-T),y.push(g++)}_.push(y)}for(let I=0;I<i;I++)for(let y=0;y<r;y++){const T=_[y][I],U=_[y+1][I],B=_[y+1][I+1],$=_[y][I+1];h.push(T,U,$),h.push(U,B,$),A+=6}l.addGroup(f,A,0),f+=A}function v(S){const C=g,A=new ve,w=new R;let I=0;const y=S===!0?e:t,T=S===!0?1:-1;for(let B=1;B<=i;B++)u.push(0,m*T,0),d.push(0,T,0),p.push(.5,.5),g++;const U=g;for(let B=0;B<=i;B++){const P=B/i*c+a,F=Math.cos(P),V=Math.sin(P);w.x=y*V,w.y=m*T,w.z=y*F,u.push(w.x,w.y,w.z),d.push(0,T,0),A.x=F*.5+.5,A.y=V*.5*T+.5,p.push(A.x,A.y),g++}for(let B=0;B<i;B++){const $=C+B,P=U+B;S===!0?h.push(P,P+1,$):h.push(P+1,P,$),I+=3}l.addGroup(f,I,S===!0?1:2),f+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cr extends _s{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Cr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class sa extends ut{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),l(n),h(),this.setAttribute("position",new Je(r,3)),this.setAttribute("normal",new Je(r.slice(),3)),this.setAttribute("uv",new Je(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const v=new R,S=new R,C=new R;for(let A=0;A<t.length;A+=3)p(t[A+0],v),p(t[A+1],S),p(t[A+2],C),c(v,S,C,x)}function c(x,v,S,C){const A=C+1,w=[];for(let I=0;I<=A;I++){w[I]=[];const y=x.clone().lerp(S,I/A),T=v.clone().lerp(S,I/A),U=A-I;for(let B=0;B<=U;B++)B===0&&I===A?w[I][B]=y:w[I][B]=y.clone().lerp(T,B/U)}for(let I=0;I<A;I++)for(let y=0;y<2*(A-I)-1;y++){const T=Math.floor(y/2);y%2===0?(d(w[I][T+1]),d(w[I+1][T]),d(w[I][T])):(d(w[I][T+1]),d(w[I+1][T+1]),d(w[I+1][T]))}}function l(x){const v=new R;for(let S=0;S<r.length;S+=3)v.x=r[S+0],v.y=r[S+1],v.z=r[S+2],v.normalize().multiplyScalar(x),r[S+0]=v.x,r[S+1]=v.y,r[S+2]=v.z}function h(){const x=new R;for(let v=0;v<r.length;v+=3){x.x=r[v+0],x.y=r[v+1],x.z=r[v+2];const S=m(x)/2/Math.PI+.5,C=f(x)/Math.PI+.5;o.push(S,1-C)}g(),u()}function u(){for(let x=0;x<o.length;x+=6){const v=o[x+0],S=o[x+2],C=o[x+4],A=Math.max(v,S,C),w=Math.min(v,S,C);A>.9&&w<.1&&(v<.2&&(o[x+0]+=1),S<.2&&(o[x+2]+=1),C<.2&&(o[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function p(x,v){const S=x*3;v.x=e[S+0],v.y=e[S+1],v.z=e[S+2]}function g(){const x=new R,v=new R,S=new R,C=new R,A=new ve,w=new ve,I=new ve;for(let y=0,T=0;y<r.length;y+=9,T+=6){x.set(r[y+0],r[y+1],r[y+2]),v.set(r[y+3],r[y+4],r[y+5]),S.set(r[y+6],r[y+7],r[y+8]),A.set(o[T+0],o[T+1]),w.set(o[T+2],o[T+3]),I.set(o[T+4],o[T+5]),C.copy(x).add(v).add(S).divideScalar(3);const U=m(C);_(A,T+0,x,U),_(w,T+2,v,U),_(I,T+4,S,U)}}function _(x,v,S,C){C<0&&x.x===1&&(o[v]=x.x-1),S.x===0&&S.z===0&&(o[v]=C/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function f(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sa(e.vertices,e.indices,e.radius,e.details)}}const $s=new R,Zs=new R,xo=new R,Js=new qt;class u_ extends ut{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(Li*t),o=e.getIndex(),a=e.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:f}=Js;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),f.fromBufferAttribute(a,l[2]),Js.getNormal(xo),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const v=(x+1)%3,S=u[x],C=u[v],A=Js[h[x]],w=Js[h[v]],I=`${S}_${C}`,y=`${C}_${S}`;y in d&&d[y]?(xo.dot(d[y].normal)<=r&&(p.push(A.x,A.y,A.z),p.push(w.x,w.y,w.z)),d[y]=null):I in d||(d[I]={index0:l[x],index1:l[v],normal:xo.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:m}=d[g];$s.fromBufferAttribute(a,_),Zs.fromBufferAttribute(a,m),p.push($s.x,$s.y,$s.z),p.push(Zs.x,Zs.y,Zs.z)}this.setAttribute("position",new Je(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Lr extends sa{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Lr(e.radius,e.detail)}}class Pr extends ut{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let u=e;const d=(t-e)/i,p=new R,g=new ve;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const f=r+m/n*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<i;_++){const m=_*(n+1);for(let f=0;f<n;f++){const x=f+m,v=x,S=x+n+1,C=x+n+2,A=x+1;a.push(v,S,A),a.push(S,C,A)}}this.setIndex(a),this.setAttribute("position",new Je(c,3)),this.setAttribute("normal",new Je(l,3)),this.setAttribute("uv",new Je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ra extends ut{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new R,u=new R,d=new R;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){const _=g/i*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){const _=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,f=(i+1)*(p-1)+g,x=(i+1)*p+g;o.push(_,m,x),o.push(m,f,x)}this.setIndex(o),this.setAttribute("position",new Je(a,3)),this.setAttribute("normal",new Je(c,3)),this.setAttribute("uv",new Je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ra(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class d_ extends Lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Yi extends cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hl,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class An extends Yi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ve(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return At(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Qs(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function f_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function p_(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function ol(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function hh(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class vs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class m_ extends vs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tc,endingEnd:tc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case nc:r=e,a=2*t-n;break;case ic:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case nc:o=e,c=2*n-t;break;case ic:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,x=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,v=(-1-p)*m+(1.5+p)*_+.5*g,S=p*m-p*_;for(let C=0;C!==a;++C)r[C]=f*o[h+C]+x*o[l+C]+v*o[c+C]+S*o[u+C];return r}}class g_ extends vs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}}class __ extends vs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class fn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Qs(t,this.TimeBufferType),this.values=Qs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Qs(e.times,Array),values:Qs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new __(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new g_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new m_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ps:t=this.InterpolantFactoryMethodDiscrete;break;case Bi:t=this.InterpolantFactoryMethodLinear;break;case Xr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ps;case this.InterpolantFactoryMethodLinear:return Bi;case this.InterpolantFactoryMethodSmooth:return Xr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&f_(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Xr,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{const u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=Bi;class ji extends fn{}ji.prototype.ValueTypeName="bool";ji.prototype.ValueBufferType=Array;ji.prototype.DefaultInterpolation=ps;ji.prototype.InterpolantFactoryMethodLinear=void 0;ji.prototype.InterpolantFactoryMethodSmooth=void 0;class uh extends fn{}uh.prototype.ValueTypeName="color";class Hi extends fn{}Hi.prototype.ValueTypeName="number";class v_ extends vs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t);let l=e*a;for(let h=l+a;l!==h;l+=4)Xn.slerpFlat(r,0,o,l-a,o,l,c);return r}}class ai extends fn{InterpolantFactoryMethodLinear(e){return new v_(this.times,this.values,this.getValueSize(),e)}}ai.prototype.ValueTypeName="quaternion";ai.prototype.DefaultInterpolation=Bi;ai.prototype.InterpolantFactoryMethodSmooth=void 0;class Ki extends fn{}Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=ps;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;class Vi extends fn{}Vi.prototype.ValueTypeName="vector";class x_{constructor(e,t=-1,n,i=Tu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=nn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(M_(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(fn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=p_(c);c=ol(c,1,h),l=ol(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Hi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,g,_){if(p.length!==0){const m=[],f=[];hh(p,m,f,g),m.length!==0&&_.push(new u(d,m,f))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(const _ in p){const m=[],f=[];for(let x=0;x!==d[g].morphTargets.length;++x){const v=d[g];m.push(v.time),f.push(v.morphTarget===_?1:0)}i.push(new Hi(".morphTargetInfluence["+_+"]",m,f))}c=p.length*o}else{const p=".bones["+t[u].name+"]";n(Vi,p+".position",d,"pos",i),n(ai,p+".quaternion",d,"rot",i),n(Vi,p+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function y_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hi;case"vector":case"vector2":case"vector3":case"vector4":return Vi;case"color":return uh;case"quaternion":return ai;case"bool":case"boolean":return ji;case"string":return Ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function M_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=y_(s.type);if(s.times===void 0){const t=[],n=[];hh(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Fn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class S_{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const E_=new S_;class $i{constructor(e){this.manager=e!==void 0?e:E_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}$i.DEFAULT_MATERIAL_NAME="__DEFAULT";const yn={};class T_ extends Error{constructor(e,t){super(e),this.response=t}}class dh extends $i{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Fn.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(yn[e]!==void 0){yn[e].push({onLoad:t,onProgress:n,onError:i});return}yn[e]=[],yn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=yn[e],u=l.body.getReader(),d=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),p=d?parseInt(d):0,g=p!==0;let _=0;const m=new ReadableStream({start(f){x();function x(){u.read().then(({done:v,value:S})=>{if(v)f.close();else{_+=S.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let A=0,w=h.length;A<w;A++){const I=h[A];I.onProgress&&I.onProgress(C)}f.enqueue(S),x()}})}}});return new Response(m)}else throw new T_(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Fn.add(e,l);const h=yn[e];delete yn[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=yn[e];if(h===void 0)throw this.manager.itemError(e),l;delete yn[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class b_ extends $i{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Fn.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=ms("img");function c(){h(),Fn.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class w_ extends $i{constructor(e){super(e)}load(e,t,n,i){const r=new St,o=new b_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Ir extends it{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const yo=new Ue,al=new R,cl=new R;class oa{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $o,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;al.setFromMatrixPosition(e.matrixWorld),t.position.copy(al),cl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cl),t.updateMatrixWorld(),yo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(yo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class A_ extends oa{constructor(){super(new Rt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=ki*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class R_ extends Ir{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new A_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ll=new Ue,os=new R,Mo=new R;class C_ extends oa{constructor(){super(new Rt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new je(2,1,1,1),new je(0,1,1,1),new je(3,1,1,1),new je(1,1,1,1),new je(3,0,1,1),new je(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),os.setFromMatrixPosition(e.matrixWorld),n.position.copy(os),Mo.copy(n.position),Mo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Mo),n.updateMatrixWorld(),i.makeTranslation(-os.x,-os.y,-os.z),ll.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ll)}}class L_ extends Ir{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new C_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class P_ extends oa{constructor(){super(new br(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fh extends Ir{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.shadow=new P_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class I_ extends Ir{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ds{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class D_ extends $i{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Fn.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Fn.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Fn.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Fn.add(e,c),r.manager.itemStart(e)}}class U_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=hl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=hl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function hl(){return(typeof performance>"u"?Date:performance).now()}const aa="\\[\\]\\.:\\/",N_=new RegExp("["+aa+"]","g"),ca="[^"+aa+"]",O_="[^"+aa.replace("\\.","")+"]",F_=/((?:WC+[\/:])*)/.source.replace("WC",ca),B_=/(WCOD+)?/.source.replace("WCOD",O_),k_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ca),z_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ca),G_=new RegExp("^"+F_+B_+k_+z_+"$"),H_=["material","materials","bones","map"];class V_{constructor(e,t,n){const i=n||Ye.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Ye{constructor(e,t,n){this.path=t,this.parsedPath=n||Ye.parseTrackName(t),this.node=Ye.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Ye.Composite(e,t,n):new Ye(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(N_,"")}static parseTrackName(e){const t=G_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);H_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Ye.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[i];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Ye.Composite=V_;Ye.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ye.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ye.prototype.GetterByBindingType=[Ye.prototype._getValue_direct,Ye.prototype._getValue_array,Ye.prototype._getValue_arrayElement,Ye.prototype._getValue_toArray];Ye.prototype.SetterByBindingTypeAndVersioning=[[Ye.prototype._setValue_direct,Ye.prototype._setValue_direct_setNeedsUpdate,Ye.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ye.prototype._setValue_array,Ye.prototype._setValue_array_setNeedsUpdate,Ye.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ye.prototype._setValue_arrayElement,Ye.prototype._setValue_arrayElement_setNeedsUpdate,Ye.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ye.prototype._setValue_fromArray,Ye.prototype._setValue_fromArray_setNeedsUpdate,Ye.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qo);const ph={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Zi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const W_=new br(-1,1,1,-1,0,1);class X_ extends ut{constructor(){super(),this.setAttribute("position",new Je([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Je([0,2,0,0,2,0],2))}}const q_=new X_;class la{constructor(e){this._mesh=new Ze(q_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,W_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Y_ extends Zi{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Gi.clone(e.uniforms),this.material=new Lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new la(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class ul extends Zi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class j_ extends Zi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class K_{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ve);this._width=n.width,this._height=n.height,t=new Zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:an}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Y_(ph),this.copyPass.material.blending=Tn,this.clock=new U_}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ul!==void 0&&(o instanceof ul?n=!0:o instanceof j_&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ve);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class $_ extends Zi{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new fe}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const Z_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new fe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Wi extends Zi{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ve(e.x,e.y):new ve(256,256),this.clearColor=new fe(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Zt(r,o,{type:an}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new Zt(r,o,{type:an});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const p=new Zt(r,o,{type:an});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),o=Math.round(o/2)}const a=Z_;this.highPassUniforms=Gi.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Lt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ve(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=ph;this.copyUniforms=Gi.clone(h.uniforms),this.blendMaterial=new Lt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:ln,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new fe,this.oldClearAlpha=1,this.basic=new Mt,this.fsQuad=new la(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new ve(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=Wi.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Wi.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Lt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ve(.5,.5)},direction:{value:new ve(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Lt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Wi.BlurDirectionX=new ve(1,0);Wi.BlurDirectionY=new ve(0,1);const J_={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Q_ extends Zi{constructor(){super();const e=J_;this.uniforms=Gi.clone(e.uniforms),this.material=new d_({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new la(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Xe.getTransfer(this._outputColorSpace)===nt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===wl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Al?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Rl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Cl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ll&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class e0{constructor(e){this.scene=e,this.particles=[],this.shockwaves=[]}create(e,t=65535){this.createParticles(e,t),this.createShockwave(e,t)}createParticles(e,t){const i=new ut,r=new Float32Array(100*3),o=[],a=new Float32Array(100*3),c=new fe(t);for(let u=0;u<100;u++){r[u*3]=e.x,r[u*3+1]=e.y,r[u*3+2]=e.z,o.push({x:(Math.random()-.5)*8,y:Math.random()*6+2,z:(Math.random()-.5)*8});const d=.2;a[u*3]=c.r+(Math.random()-.5)*d,a[u*3+1]=c.g+(Math.random()-.5)*d,a[u*3+2]=c.b+(Math.random()-.5)*d}i.setAttribute("position",new pt(r,3)),i.setAttribute("color",new pt(a,3));const l=new gs({size:.3,vertexColors:!0,transparent:!0,opacity:1,blending:ln,depthWrite:!1,sizeAttenuation:!0}),h=new Rr(i,l);this.scene.add(h),this.particles.push({points:h,velocities:o,life:2,maxLife:2,gravity:-9.8})}createShockwave(e,t){const n=new Pr(.1,.3,32),i=new Mt({color:t,transparent:!0,opacity:.8,side:Ct,blending:ln}),r=new Ze(n,i);r.position.copy(e),r.position.y+=.1,r.rotation.x=-Math.PI/2,this.scene.add(r),this.shockwaves.push({ring:r,scale:1,life:1,maxLife:1})}update(e){for(let t=this.particles.length-1;t>=0;t--){const n=this.particles[t];if(n.life-=e,n.life<=0){this.scene.remove(n.points),n.points.geometry.dispose(),n.points.material.dispose(),this.particles.splice(t,1);continue}const i=n.points.geometry.attributes.position.array;for(let o=0;o<n.velocities.length;o++){const a=n.velocities[o];a.y+=n.gravity*e,i[o*3]+=a.x*e,i[o*3+1]+=a.y*e,i[o*3+2]+=a.z*e}n.points.geometry.attributes.position.needsUpdate=!0;const r=n.life/n.maxLife;n.points.material.opacity=r}for(let t=this.shockwaves.length-1;t>=0;t--){const n=this.shockwaves[t];if(n.life-=e,n.life<=0){this.scene.remove(n.ring),n.ring.geometry.dispose(),n.ring.material.dispose(),this.shockwaves.splice(t,1);continue}n.scale+=e*15,n.ring.scale.set(n.scale,n.scale,1);const i=n.life/n.maxLife;n.ring.material.opacity=i*.8}}clear(){for(const e of this.particles)this.scene.remove(e.points),e.points.geometry.dispose(),e.points.material.dispose();this.particles=[];for(const e of this.shockwaves)this.scene.remove(e.ring),e.ring.geometry.dispose(),e.ring.material.dispose();this.shockwaves=[]}}class t0{constructor(){this.audioContext=null,this.masterGain=null,this.engineOscillator=null,this.engineGain=null,this.isInitialized=!1}init(){if(!this.isInitialized)try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.audioContext.state==="suspended"&&this.audioContext.resume(),this.masterGain=this.audioContext.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.audioContext.destination),this.isInitialized=!0,this.startEngineSound()}catch(e){console.warn("Web Audio API not supported:",e)}}startEngineSound(){this.isInitialized&&(this.stopEngineSound(),this.engineFilter=this.audioContext.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.value=400,this.engineFilter.Q.value=1.2,this.engineOscillator=this.audioContext.createOscillator(),this.engineOscillator.type="sawtooth",this.engineOscillator.frequency.value=80,this.engineOscillator2=this.audioContext.createOscillator(),this.engineOscillator2.type="sawtooth",this.engineOscillator2.frequency.value=80,this.engineOscillator2.detune.value=11,this.engineSub=this.audioContext.createOscillator(),this.engineSub.type="sine",this.engineSub.frequency.value=40,this.engineGain=this.audioContext.createGain(),this.engineGain.gain.value=.09,this.engineSubGain=this.audioContext.createGain(),this.engineSubGain.gain.value=.05,this.engineLfo=this.audioContext.createOscillator(),this.engineLfo.type="sine",this.engineLfo.frequency.value=.15,this.engineLfoGain=this.audioContext.createGain(),this.engineLfoGain.gain.value=120,this.engineLfo.connect(this.engineLfoGain),this.engineLfoGain.connect(this.engineFilter.frequency),this.engineOscillator.connect(this.engineFilter),this.engineOscillator2.connect(this.engineFilter),this.engineFilter.connect(this.engineGain),this.engineGain.connect(this.masterGain),this.engineSub.connect(this.engineSubGain),this.engineSubGain.connect(this.masterGain),this.engineOscillator.start(),this.engineOscillator2.start(),this.engineSub.start(),this.engineLfo.start())}updateEngineSound(e,t=20){if(!this.engineOscillator)return;const n=e/t,i=80+n*120,r=this.audioContext.currentTime;if(this.engineOscillator.frequency.setTargetAtTime(i,r,.1),this.engineOscillator2&&this.engineOscillator2.frequency.setTargetAtTime(i,r,.1),this.engineSub&&this.engineSub.frequency.setTargetAtTime(i/2,r,.1),this.engineFilter){const o=350+n*900;this.engineFilter.frequency.setTargetAtTime(o,r,.15)}}playTurnSound(){if(!this.isInitialized)return;const e=this.audioContext.createOscillator(),t=this.audioContext.createGain();e.type="sine",e.frequency.setValueAtTime(800,this.audioContext.currentTime),e.frequency.exponentialRampToValueAtTime(400,this.audioContext.currentTime+.1),t.gain.setValueAtTime(.2,this.audioContext.currentTime),t.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.1),e.connect(t),t.connect(this.masterGain),e.start(),e.stop(this.audioContext.currentTime+.1)}playDerezzSound(){if(!this.isInitialized)return;const e=this.audioContext.sampleRate*.5,t=this.audioContext.createBuffer(1,e,this.audioContext.sampleRate),n=t.getChannelData(0);for(let l=0;l<e;l++)n[l]=Math.random()*2-1;const i=this.audioContext.createBufferSource();i.buffer=t;const r=this.audioContext.createGain();r.gain.setValueAtTime(.5,this.audioContext.currentTime),r.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.5);const o=this.audioContext.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(2e3,this.audioContext.currentTime),o.frequency.exponentialRampToValueAtTime(100,this.audioContext.currentTime+.5),i.connect(o),o.connect(r),r.connect(this.masterGain);const a=this.audioContext.createOscillator(),c=this.audioContext.createGain();a.type="sawtooth",a.frequency.setValueAtTime(200,this.audioContext.currentTime),a.frequency.exponentialRampToValueAtTime(50,this.audioContext.currentTime+.5),c.gain.setValueAtTime(.3,this.audioContext.currentTime),c.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.5),a.connect(c),c.connect(this.masterGain),i.start(),i.stop(this.audioContext.currentTime+.5),a.start(),a.stop(this.audioContext.currentTime+.5)}playStartSound(){if(!this.isInitialized)return;const e=this.audioContext.createOscillator(),t=this.audioContext.createGain();e.type="sine",e.frequency.setValueAtTime(400,this.audioContext.currentTime),e.frequency.exponentialRampToValueAtTime(800,this.audioContext.currentTime+.2),t.gain.setValueAtTime(.3,this.audioContext.currentTime),t.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.2),e.connect(t),t.connect(this.masterGain),e.start(),e.stop(this.audioContext.currentTime+.2)}stopEngineSound(){[this.engineOscillator,this.engineOscillator2,this.engineSub,this.engineLfo].forEach(e=>{if(e)try{e.stop()}catch{}}),this.engineOscillator=null,this.engineOscillator2=null,this.engineSub=null,this.engineLfo=null,this.engineFilter=null}setMuted(e){this.masterGain&&(this.masterGain.gain.value=e?0:.3)}dispose(){this.stopEngineSound(),this.audioContext&&this.audioContext.close()}}class n0{constructor(e){this.camera=e,this.target=new R,this.offset=new R(0,15,-20),this.lookAtOffset=new R(0,0,5),this.smoothSpeed=5,this.currentMode="follow",this.modes={follow:{offset:new R(0,15,-20),lookAtOffset:new R(0,0,5)},topDown:{offset:new R(0,40,.1),lookAtOffset:new R(0,0,0)},firstPerson:{offset:new R(0,2,0),lookAtOffset:new R(0,0,10)}}}follow(e,t){if(!e)return;const n=e.position||e,i=e.rotation?e.rotation.y:0,r=new R(0,1,0),o=this.offset.clone().applyAxisAngle(r,i),a=this.lookAtOffset.clone().applyAxisAngle(r,i),c=new R;c.copy(n).add(o),this.camera.position.lerp(c,this.smoothSpeed*t);const l=new R;l.copy(n).add(a),this.camera.lookAt(l)}setMode(e){this.modes[e]&&(this.currentMode=e,this.offset.copy(this.modes[e].offset),this.lookAtOffset.copy(this.modes[e].lookAtOffset),e==="firstPerson"?this.smoothSpeed=10:this.smoothSpeed=5)}nextMode(){const e=Object.keys(this.modes),n=(e.indexOf(this.currentMode)+1)%e.length;this.setMode(e[n])}shake(e=.5,t=.3){const n=this.camera.position.clone();let i=0;const r=()=>{if(i+=.016,i<t){const o=e*(1-i/t);this.camera.position.x=n.x+(Math.random()-.5)*o,this.camera.position.y=n.y+(Math.random()-.5)*o,this.camera.position.z=n.z+(Math.random()-.5)*o,requestAnimationFrame(r)}else this.camera.position.copy(n)};r()}setOffset(e,t,n){this.offset.set(e,t,n)}setSmoothSpeed(e){this.smoothSpeed=e}}class ha{constructor(e,t=65535,n=1.2){this.scene=e,this.color=t,this.height=n,this.points=[],this._lastDirectionKey=null,this.geometry=new ut,this.material=new Mt({color:this.color,transparent:!0,opacity:.85,side:Ct,blending:ln,depthWrite:!1}),this.mesh=new Ze(this.geometry,this.material),this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}setColor(e){this.color=e,this.material.color.set(e)}_dirKey(e){return`${Math.round(e.x)},${Math.round(e.z)}`}start(e,t){this.points=[e.clone(),e.clone()],this._lastDirectionKey=t?this._dirKey(t):null,this._rebuild()}update(e,t){if(this.points.length===0){this.start(e,t);return}const n=this._dirKey(t);this._lastDirectionKey!==null&&n!==this._lastDirectionKey&&this.points.push(this.points[this.points.length-1].clone()),this._lastDirectionKey=n,this.points[this.points.length-1].copy(e),this._rebuild()}_rebuild(){if(this.points.length<2){this.geometry.setAttribute("position",new Je([],3));return}const e=[];for(let t=0;t<this.points.length-1;t++){const n=this.points[t],i=this.points[t+1];e.push(n.x,0,n.z,i.x,0,i.z,i.x,this.height,i.z,n.x,0,n.z,i.x,this.height,i.z,n.x,this.height,n.z)}this.geometry.setAttribute("position",new Je(e,3)),this.geometry.attributes.position.needsUpdate=!0}dispose(){this.scene.remove(this.mesh),this.geometry.dispose(),this.material.dispose()}}function dl(s,e){if(e===bu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Do||e===zl){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Do)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class i0 extends $i{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new c0(t)}),this.register(function(t){return new _0(t)}),this.register(function(t){return new v0(t)}),this.register(function(t){return new x0(t)}),this.register(function(t){return new h0(t)}),this.register(function(t){return new u0(t)}),this.register(function(t){return new d0(t)}),this.register(function(t){return new f0(t)}),this.register(function(t){return new a0(t)}),this.register(function(t){return new p0(t)}),this.register(function(t){return new l0(t)}),this.register(function(t){return new g0(t)}),this.register(function(t){return new m0(t)}),this.register(function(t){return new r0(t)}),this.register(function(t){return new y0(t)}),this.register(function(t){return new M0(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=ds.extractUrlBase(e);o=ds.resolveURL(l,this.path)}else o=ds.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new dh(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===mh){try{o[He.KHR_BINARY_GLTF]=new S0(e)}catch(u){i&&i(u);return}r=JSON.parse(o[He.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new N0(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case He.KHR_MATERIALS_UNLIT:o[u]=new o0;break;case He.KHR_DRACO_MESH_COMPRESSION:o[u]=new E0(r,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:o[u]=new T0;break;case He.KHR_MESH_QUANTIZATION:o[u]=new b0;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function s0(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class r0{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new fe(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Et);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new fh(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new L_(h),l.distance=u;break;case"spot":l=new R_(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Nn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class o0{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return Mt}extendParams(e,t,n){const i=[];e.color=new fe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Et),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,ct))}return Promise.all(i)}}class a0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class c0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ve(a,a)}return Promise.all(r)}}class l0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class h0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new fe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Et)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,ct)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class u0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class d0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new fe().setRGB(a[0],a[1],a[2],Et),Promise.all(r)}}class f0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class p0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new fe().setRGB(a[0],a[1],a[2],Et),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,ct)),Promise.all(r)}}class m0{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class g0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class _0{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class v0{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class x0{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class y0{constructor(e){this.name=He.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}}class M0{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==Xt.TRIANGLES&&l.mode!==Xt.TRIANGLE_STRIP&&l.mode!==Xt.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(const g of u){const _=new Ue,m=new R,f=new Xn,x=new R(1,1,1),v=new rr(g.geometry,g.material,d);for(let S=0;S<d;S++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,S),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,S),c.SCALE&&x.fromBufferAttribute(c.SCALE,S),v.setMatrixAt(S,_.compose(m,f,x));for(const S in c)if(S==="_COLOR_0"){const C=c[S];v.instanceColor=new Fo(C.array,C.itemSize,C.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&g.geometry.setAttribute(S,c[S]);it.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),p.push(v)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const mh="glTF",as=12,fl={JSON:1313821514,BIN:5130562};class S0{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,as),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==mh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-as,r=new DataView(e,as);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===fl.JSON){const l=new Uint8Array(e,as+o,a);this.content=n.decode(l)}else if(c===fl.BIN){const l=as+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class E0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=ko[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=ko[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],p=Ii[d.componentType];l[u]=p.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(const g in p.attributes){const _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(p)},a,l,Et,d)})})}}class T0{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class b0{constructor(){this.name=He.KHR_MESH_QUANTIZATION}}class gh extends vs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,g=e*l,_=g-l,m=-2*p+3*d,f=p-d,x=1-m,v=f-d+u;for(let S=0;S!==a;S++){const C=o[_+S+a],A=o[_+S+c]*h,w=o[g+S+a],I=o[g+S]*h;r[S]=x*C+v*A+m*w+f*I}return r}}const w0=new Xn;class A0 extends gh{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return w0.fromArray(r).normalize().toArray(r),r}}const Xt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ii={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},pl={9728:yt,9729:Bt,9984:Io,9985:Il,9986:ir,9987:oi},ml={33071:jt,33648:fr,10497:hn},So={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ko={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Dn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},R0={CUBICSPLINE:void 0,LINEAR:Bi,STEP:ps},Eo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function C0(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Yi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:bn})),s.DefaultMaterial}function Jn(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Nn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function L0(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function P0(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function I0(s){let e;const t=s.extensions&&s.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+To(t.attributes):e=s.indices+":"+To(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+To(s.targets[n]);return e}function To(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function zo(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function D0(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const U0=new Ue;class N0{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new s0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new w_(this.options.manager):this.textureLoader=new D_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new dh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Jn(r,a,i),Nn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(ds.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=So[i.type],a=Ii[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new pt(l,o,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=So[i.type],l=Ii[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(p&&p!==u){const f=Math.floor(d/p),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count;let v=t.cache.get(x);v||(_=new l(a,f*p,i.count*p/h),v=new s_(_,p/h),t.cache.add(x,v)),m=new Qo(v,c,d%p/h,g)}else a===null?_=new l(i.count*c):_=new l(a,d,i.count*c),m=new pt(_,c,g);if(i.sparse!==void 0){const f=So.SCALAR,x=Ii[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,C=new x(o[1],v,i.sparse.count*f),A=new l(o[2],S,i.sparse.count*c);a!==null&&(m=new pt(m.array.slice(),m.itemSize,m.normalized));for(let w=0,I=C.length;w<I;w++){const y=C[w];if(m.setX(y,A[w*c]),c>=2&&m.setY(y,A[w*c+1]),c>=3&&m.setZ(y,A[w*c+2]),c>=4&&m.setW(y,A[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=pl[d.magFilter]||Bt,h.minFilter=pl[d.minFilter]||oi,h.wrapS=ml[d.wrapS]||hn,h.wrapT=ml[d.wrapT]||hn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new St(_);m.needsUpdate=!0,d(m)}),t.load(ds.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),u.userData.mimeType=o.mimeType||D0(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[He.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new gs,cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Ar,cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Yi}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[He.KHR_MATERIALS_UNLIT]){const u=i[He.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new fe(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Et),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,ct)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Ct);const h=r.alphaMode||Eo.OPAQUE;if(h===Eo.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Eo.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Mt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ve(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Mt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Mt){const u=r.emissiveFactor;a.emissive=new fe().setRGB(u[0],u[1],u[2],Et)}return r.emissiveTexture!==void 0&&o!==Mt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,ct)),Promise.all(l).then(function(){const u=new o(a);return r.name&&(u.name=r.name),Nn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Jn(i,u,r),u})}createUniqueName(e){const t=Ye.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return gl(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=I0(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[He.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=gl(new ut,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?C0(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){const _=h[p],m=o[p];let f;const x=l[p];if(m.mode===Xt.TRIANGLES||m.mode===Xt.TRIANGLE_STRIP||m.mode===Xt.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new o_(_,x):new Ze(_,x),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===Xt.TRIANGLE_STRIP?f.geometry=dl(f.geometry,zl):m.mode===Xt.TRIANGLE_FAN&&(f.geometry=dl(f.geometry,Do));else if(m.mode===Xt.LINES)f=new na(_,x);else if(m.mode===Xt.LINE_STRIP)f=new ta(_,x);else if(m.mode===Xt.LINE_LOOP)f=new h_(_,x);else if(m.mode===Xt.POINTS)f=new Rr(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&P0(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),Nn(f,r),m.extensions&&Jn(i,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&Jn(i,u[0],r),u[0];const d=new Pt;r.extensions&&Jn(i,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Rt($u.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new br(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Nn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new Ue;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ea(a,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const p=i.channels[u],g=i.samplers[p.sampler],_=p.target,m=_.node,f=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",x)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],p=u[1],g=u[2],_=u[3],m=u[4],f=[];for(let x=0,v=d.length;x<v;x++){const S=d[x],C=p[x],A=g[x],w=_[x],I=m[x];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const y=n._createAnimationTracks(S,C,A,w,I);if(y)for(let T=0;T<y.length;T++)f.push(y[T])}return new x_(r,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,U0)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new lh:l.length>1?h=new Pt:l.length===1?h=l[0]:h=new it,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Nn(h,r),r.extensions&&Jn(n,h,r),r.matrix!==void 0){const u=new Ue;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Pt;n.name&&(r.name=i.createUniqueName(n.name)),Nn(r,n),n.extensions&&Jn(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);const l=h=>{const u=new Map;for(const[d,p]of i.associations)(d instanceof cn||d instanceof St)&&u.set(d,p);return h.traverse(d=>{const p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,c=[];Dn[r.path]===Dn.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Dn[r.path]){case Dn.weights:l=Hi;break;case Dn.rotation:l=ai;break;case Dn.position:case Dn.scale:l=Vi;break;default:switch(n.itemSize){case 1:l=Hi;break;case 2:case 3:default:l=Vi;break}break}const h=i.interpolation!==void 0?R0[i.interpolation]:Bi,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){const g=new l(c[d]+"."+Dn[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=zo(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ai?A0:gh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function O0(s,e,t){const n=e.attributes,i=new wn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new R(c[0],c[1],c[2]),new R(l[0],l[1],l[2])),a.normalized){const h=zo(Ii[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new R,c=new R;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const _=zo(Ii[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new dn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function gl(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(const o in n){const a=ko[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return Xe.workingColorSpace!==Et&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xe.workingColorSpace}" not supported.`),Nn(s,e),O0(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?L0(s,e.targets,t):s})}const F0="/TRON/3d/models/lightcycle/scene.gltf",B0=7.508,k0=Math.PI/2,z0=.044,G0=.335;let er=null,yr=null;function H0(){if(er)return er;const s=new i0;return er=new Promise((e,t)=>{s.load(F0,n=>{yr=n.scene,e(yr)},void 0,n=>{console.error("Nie udało się wczytać modelu motocykla (scene.gltf):",n),t(n)})}),er}function V0(s){const e=new Gn(1,.5,2),t=new Yi({color:s,emissive:s,emissiveIntensity:1.1,transparent:!0});return new Ze(e,t)}function ua(s){if(!yr)return console.warn("createLightCycleMesh() wywołane przed wczytaniem modelu GLTF - używam awaryjnego zastępnika."),V0(s);const e=new Pt,t=yr.clone(!0);t.scale.setScalar(B0),t.rotation.y=k0,t.position.set(0,z0,G0),e.add(t);const n=new Map;let i=null;return e.traverse(r=>{if(!r.isMesh||!r.material)return;const o=r.material;let a=n.get(o);a||(a=o.clone(),n.set(o,a),a.name==="Light"&&(a.transparent=!0,a.color.set(s),a.emissive.set(s),a.emissiveIntensity=1.1,i=a)),r.material=a}),Object.defineProperty(e,"material",{get(){return i}}),e}class W0{constructor(e,t,n=16711935,i="medium"){this.scene=e,this.position=t.clone(),this.direction=new R(-1,0,0),this.color=n,this.speed=10,this.visible=!0,this.difficulty=i,console.log("AI created at:",this.position,"direction:",this.direction),this.createMesh(),this.trail=new ha(this.scene,this.color),this.trail.start(this.position,this.direction)}createMesh(){this.mesh=ua(this.color),this.mesh.position.copy(this.position),this.scene.add(this.mesh),console.log("AI mesh created and added to scene")}setColor(e){this.color=e,this.mesh.material.color.set(e),this.mesh.material.emissive.set(e),this.trail&&this.trail.setColor(e)}getPosition(){return this.position.clone()}getGridKey(e,t){return`${Math.floor(e)},${Math.floor(t)}`}isCellFree(e,t,n,i){const r=this.getGridKey(e,t),o=45;return!(Math.abs(e)>o||Math.abs(t)>o||n&&n.has(r)||i&&i.has(r))}getTurnDirection(e,t){if(t==="left"){if(e.x===1)return new R(0,0,-1);if(e.x===-1)return new R(0,0,1);if(e.z===1)return new R(-1,0,0);if(e.z===-1)return new R(1,0,0)}else{if(e.x===1)return new R(0,0,1);if(e.x===-1)return new R(0,0,-1);if(e.z===1)return new R(1,0,0);if(e.z===-1)return new R(-1,0,0)}return e.clone()}countReachableSpace(e,t,n,i,r=400){const o=new Set,a=this.getGridKey(e,t);o.add(a);const c=[[Math.floor(e),Math.floor(t)]];let l=0;for(;c.length>0&&l<r;){const[h,u]=c.pop();l++;const d=[[h+1,u],[h-1,u],[h,u+1],[h,u-1]];for(const[p,g]of d){const _=`${p},${g}`;o.has(_)||this.isCellFree(p,g,n,i)&&(o.add(_),c.push([p,g]))}}return l}makeDecision(e,t,n){const r=this.position.clone().add(this.direction.clone().multiplyScalar(2)),o=this.isCellFree(r.x,r.z,t,n),a=performance.now(),c=!o,l=!this._lastSmartDecision||a-this._lastSmartDecision>180;if(!c&&!l)return null;this._lastSmartDecision=a;const h=this.getTurnDirection(this.direction,"left"),u=this.getTurnDirection(this.direction,"right"),d=[{turn:null,dir:this.direction},{turn:"left",dir:h},{turn:"right",dir:u}];let p=null,g=-1;for(const _ of d){const m=this.position.clone().add(_.dir.clone().multiplyScalar(2));if(!this.isCellFree(m.x,m.z,t,n))continue;const x=this.countReachableSpace(m.x,m.z,t,n)+(_.turn===null?2:0);x>g&&(g=x,p=_.turn)}return p}update(e,t,n,i){if(!this.visible){console.log("AI not visible, skipping update");return}const r=this.makeDecision(t,n,i);r==="left"?this.direction.copy(this.getTurnDirection(this.direction,"left")):r==="right"&&this.direction.copy(this.getTurnDirection(this.direction,"right"));const o=this.direction.clone().multiplyScalar(this.speed*e);this.position.add(o),this.mesh.position.copy(this.position),this.trail.update(this.position,this.direction);const a=Math.atan2(this.direction.x,this.direction.z);this.mesh.rotation.y=a,(!this.lastDebug||performance.now()-this.lastDebug>1e3)&&(console.log("AI position:",`${this.position.x.toFixed(2)}, ${this.position.y.toFixed(2)}, ${this.position.z.toFixed(2)}`,"direction:",this.direction),this.lastDebug=performance.now())}hide(){this.visible=!1,this.mesh.visible=!1}show(){this.visible=!0,this.mesh.visible=!0}reset(e){this.position.copy(e),this.direction.set(-1,0,0),this.mesh.position.copy(this.position),this.trail.start(this.position,this.direction),this._lastSmartDecision=null,this.show(),console.log("AI reset to:",this.position)}setDifficulty(e){this.difficulty=e}dispose(){this.scene.remove(this.mesh),this.mesh.traverse(e=>{e.material&&e.material.dispose()}),this.trail.dispose()}}class _l{constructor(e,t,n=16711935){this.scene=e,this.color=n,this.speed=10,this.visible=!0,this.mesh=ua(n),this.position=t.clone(),this.direction=new R(-1,0,0),this.mesh.position.copy(this.position),this.mesh.rotation.y=Math.atan2(this.direction.x,this.direction.z),this.scene.add(this.mesh),this.trail=new ha(this.scene,n),this.trail.start(this.position,this.direction)}getPosition(){return this.position.clone()}applyRemoteInput(e){this.visible&&(e==="turnLeft"?this._turn("left"):e==="turnRight"&&this._turn("right"))}_turn(e){const t=this.direction;let n;e==="left"?t.x===1?n=new R(0,0,-1):t.x===-1?n=new R(0,0,1):t.z===1?n=new R(1,0,0):t.z===-1&&(n=new R(-1,0,0)):t.x===1?n=new R(0,0,1):t.x===-1?n=new R(0,0,-1):t.z===1?n=new R(-1,0,0):t.z===-1&&(n=new R(1,0,0)),n&&(this.direction.copy(n),this.mesh.rotation.y=Math.atan2(n.x,n.z))}update(e){if(!this.visible)return;const t=this.direction.clone().multiplyScalar(this.speed*e);this.position.add(t),this.mesh.position.copy(this.position),this.trail.update(this.position,this.direction)}reset(e){this.position.copy(e),this.direction.set(-1,0,0),this.mesh.position.copy(this.position),this.mesh.rotation.y=Math.atan2(this.direction.x,this.direction.z),this.trail.start(this.position,this.direction),this.show()}hide(){this.visible=!1,this.mesh.visible=!1}show(){this.visible=!0,this.mesh.visible=!0}dispose(){this.scene.remove(this.mesh),this.mesh.traverse(e=>{e.material&&e.material.dispose()}),this.trail.dispose()}}class X0{constructor(e){this.scene=e,this.powerUps=[],this.activeEffects=[],this.spawnInterval=5e3,this.maxPowerUps=5,this.lastSpawnTime=0,this.types={shield:{color:65280,duration:5e3,symbol:"🛡️"},speed:{color:16776960,duration:3e3,symbol:"⚡"},ghost:{color:16711935,duration:4e3,symbol:"👻"},bomb:{color:16711680,duration:0,symbol:"💣"}}}createPowerUpMesh(e,t){const n=this.types[e],i=new Lr(.8),r=new Yi({color:n.color,emissive:n.color,emissiveIntensity:.8,transparent:!0,opacity:.9}),o=new Ze(i,r);o.position.copy(t),o.position.y=1;const a=new Pr(1,1.3,32),c=new Mt({color:n.color,transparent:!0,opacity:.5,side:Ct}),l=new Ze(a,c);return l.rotation.x=-Math.PI/2,l.position.y=.1,o.add(l),this.scene.add(o),o}spawnPowerUp(e=40){if(this.powerUps.length>=this.maxPowerUps)return;const t=Object.keys(this.types),n=t[Math.floor(Math.random()*t.length)],i=new R((Math.random()-.5)*e*2,0,(Math.random()-.5)*e*2),r=this.createPowerUpMesh(n,i);this.powerUps.push({type:n,position:i,mesh:r,spawnTime:performance.now(),lifetime:15e3})}checkCollision(e,t=1.5){for(let n=this.powerUps.length-1;n>=0;n--){const i=this.powerUps[n];if(e.distanceTo(i.position)<t)return this.collectPowerUp(n),i.type}return null}collectPowerUp(e){const t=this.powerUps[e];return this.scene.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose(),this.powerUps.splice(e,1),t.type}activateEffect(e,t,n=null,i=null){const r=this.types[e];switch(e){case"shield":t.hasShield=!0,this.activeEffects.push({type:e,endTime:performance.now()+r.duration,onExpire:()=>{t.hasShield=!1}});break;case"speed":const o=t.speed;t.speed*=1.8,this.activeEffects.push({type:e,endTime:performance.now()+r.duration,onExpire:()=>{t.speed=o}});break;case"ghost":t.isGhost=!0,this.activeEffects.push({type:e,endTime:performance.now()+r.duration,onExpire:()=>{t.isGhost=!1}});break;case"bomb":n&&i&&this.destroyTrailSegment(n.getPosition(),i);break}return r}destroyTrailSegment(e,t,n=5){if(!t)return;const i=[];for(const r of t){const[o,a]=r.split(",").map(Number),c=o-e.x,l=a-e.z;Math.sqrt(c*c+l*l)<n&&i.push(r)}i.forEach(r=>t.delete(r))}update(e,t,n=null,i=40,r=null){e-this.lastSpawnTime>this.spawnInterval&&(this.spawnPowerUp(i),this.lastSpawnTime=e);for(const o of this.powerUps){o.mesh.rotation.y+=.02;const a=1+Math.sin(e*.005)*.1;o.mesh.scale.set(a,a,a),e-o.spawnTime>o.lifetime&&(this.scene.remove(o.mesh),o.mesh.geometry.dispose(),o.mesh.material.dispose(),this.powerUps.splice(this.powerUps.indexOf(o),1))}for(let o=this.activeEffects.length-1;o>=0;o--){const a=this.activeEffects[o];e>a.endTime&&(a.onExpire(),this.activeEffects.splice(o,1))}if(t&&t.visible){const o=this.checkCollision(t.getPosition());if(o)return this.activateEffect(o,t,n,r),o}return null}clear(){for(const e of this.powerUps)this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();this.powerUps=[];for(const e of this.activeEffects)e.onExpire();this.activeEffects=[]}getActiveEffects(){return this.activeEffects.map(e=>({type:e.type,remainingTime:Math.max(0,e.endTime-performance.now())}))}}class q0{constructor(){this.score=0,this.combo=0,this.maxCombo=0,this.comboTimer=0,this.comboTimeout=3e3,this.multiplier=1,this.stats={closeCalls:0,powerUpsCollected:0,timeSurvived:0,distanceTraveled:0,perfectTurns:0},this.floatingTexts=[],this.onScoreChange=null,this.onComboChange=null}addCloseCall(e,t){if(e<1.5){this.combo++,this.comboTimer=t,this.stats.closeCalls++,this.multiplier=Math.min(5,1+Math.floor(this.combo/3));const n=100,i=Math.floor((1.5-e)*200),r=(n+i)*this.multiplier;return this.addScore(r),this.addFloatingText(`CLOSE CALL! +${r}`,this.combo>1?`x${this.multiplier} COMBO`:null),this.combo>this.maxCombo&&(this.maxCombo=this.combo),this.onComboChange&&this.onComboChange(this.combo,this.multiplier),r}return 0}addScore(e){this.score+=e,this.onScoreChange&&this.onScoreChange(this.score)}addPowerUpCollected(e){this.stats.powerUpsCollected++;const t={shield:50,speed:75,ghost:100,bomb:150}[e]||50;this.addScore(t),this.addFloatingText(`POWER UP! +${t}`)}updateSurvivalTime(e){this.stats.timeSurvived+=e,Math.floor(this.stats.timeSurvived)%10===0&&Math.floor(this.stats.timeSurvived-e)%10!==0&&this.addScore(50)}updateDistance(e){this.stats.distanceTraveled+=e}addPerfectTurn(){this.stats.perfectTurns++,this.addScore(25),this.addFloatingText("PERFECT TURN! +25")}addFloatingText(e,t=null){this.floatingTexts.push({text:e,subtext:t,startTime:performance.now(),duration:2e3,y:0})}updateCombo(e){this.combo>0&&e-this.comboTimer>this.comboTimeout&&(this.combo=0,this.multiplier=1,this.onComboChange&&this.onComboChange(this.combo,this.multiplier));for(let t=this.floatingTexts.length-1;t>=0;t--){const n=this.floatingTexts[t],i=e-n.startTime;i>n.duration?this.floatingTexts.splice(t,1):(n.y=i/n.duration*50,n.opacity=1-i/n.duration)}}getStats(){return{score:this.score,combo:this.combo,maxCombo:this.maxCombo,multiplier:this.multiplier,stats:{...this.stats},floatingTexts:[...this.floatingTexts]}}reset(){this.score=0,this.combo=0,this.maxCombo=0,this.comboTimer=0,this.multiplier=1,this.floatingTexts=[],this.stats={closeCalls:0,powerUpsCollected:0,timeSurvived:0,distanceTraveled:0,perfectTurns:0},this.onScoreChange&&this.onScoreChange(0),this.onComboChange&&this.onComboChange(0,1)}calculateFinalScore(){let e=this.score;return e+=this.maxCombo*100,e+=Math.floor(this.stats.timeSurvived)*10,e+=this.stats.perfectTurns*50,e}}class Y0{constructor(){this.achievements={first_blood:{name:"First Blood",description:"Win your first game",icon:"🏆",unlocked:!1,condition:e=>e.gamesWon>=1},survivor:{name:"Survivor",description:"Survive for 60 seconds",icon:"⏱️",unlocked:!1,condition:e=>e.longestSurvival>=60},close_call:{name:"Close Call",description:"Make 10 close calls in one game",icon:"😅",unlocked:!1,condition:e=>e.closeCallsInGame>=10},combo_master:{name:"Combo Master",description:"Reach 5x combo",icon:"🔥",unlocked:!1,condition:e=>e.maxCombo>=5},perfect_game:{name:"Perfect Game",description:"Win without taking damage",icon:"✨",unlocked:!1,condition:e=>e.perfectGames>=1},speed_demon:{name:"Speed Demon",description:"Win with speed boost active",icon:"⚡",unlocked:!1,condition:e=>e.winsWithSpeedBoost>=1},collector:{name:"Collector",description:"Collect 20 power-ups total",icon:"🎁",unlocked:!1,condition:e=>e.totalPowerUps>=20},veteran:{name:"Veteran",description:"Play 50 games",icon:"🎖️",unlocked:!1,condition:e=>e.gamesPlayed>=50},marathon:{name:"Marathon",description:"Survive for 3 minutes",icon:"🏃",unlocked:!1,condition:e=>e.longestSurvival>=180},untouchable:{name:"Untouchable",description:"Win 10 games in a row",icon:"👑",unlocked:!1,condition:e=>e.winStreak>=10}},this.stats=this.loadStats(),this.newlyUnlocked=[],this.onAchievementUnlock=null,this.loadAchievements()}updateStats(e){Object.assign(this.stats,e),this.checkAchievements(),this.saveStats()}incrementStat(e,t=1){this.stats[e]!==void 0&&(this.stats[e]+=t,this.checkAchievements(),this.saveStats())}checkAchievements(){this.newlyUnlocked=[];for(const[e,t]of Object.entries(this.achievements))!t.unlocked&&t.condition(this.stats)&&(t.unlocked=!0,this.newlyUnlocked.push({id:e,...t}),this.onAchievementUnlock&&this.onAchievementUnlock({id:e,...t}));return this.newlyUnlocked.length>0&&this.saveAchievements(),this.newlyUnlocked}getAchievements(){return Object.entries(this.achievements).map(([e,t])=>({id:e,...t}))}getStats(){return{...this.stats}}getNewlyUnlocked(){return[...this.newlyUnlocked]}clearNewlyUnlocked(){this.newlyUnlocked=[]}saveAchievements(){const e=Object.entries(this.achievements).filter(([t,n])=>n.unlocked).map(([t,n])=>t);localStorage.setItem("tron-achievements",JSON.stringify(e))}loadAchievements(){try{JSON.parse(localStorage.getItem("tron-achievements")||"[]").forEach(t=>{this.achievements[t]&&(this.achievements[t].unlocked=!0)})}catch(e){console.warn("Failed to load achievements:",e)}}saveStats(){localStorage.setItem("tron-stats",JSON.stringify(this.stats))}loadStats(){try{return JSON.parse(localStorage.getItem("tron-stats"))||this.getDefaultStats()}catch{return this.getDefaultStats()}}getDefaultStats(){return{gamesPlayed:0,gamesWon:0,gamesLost:0,totalTimePlayed:0,longestSurvival:0,totalDistance:0,totalPowerUps:0,closeCallsInGame:0,maxCombo:0,perfectGames:0,winsWithSpeedBoost:0,winStreak:0,currentStreak:0}}reset(){this.stats=this.getDefaultStats(),Object.values(this.achievements).forEach(e=>e.unlocked=!1),localStorage.removeItem("tron-achievements"),localStorage.removeItem("tron-stats")}}class j0{constructor(e,t){this.scene=e,this.camera=t,this.derezzEffect=new e0(e),this.audioManager=new t0,this.cameraController=new n0(t),this.powerUpSystem=new X0(e),this.scoringSystem=new q0,this.achievementSystem=new Y0,this.onGameOver=null,this._lastCloseCallTime=0,this._gridBounds=45,this._currentDifficulty="medium",this._autoRestartTimer=null,this.multiplayerManager=null,this.isMultiplayer=!1,this.isHost=!1,this.gameOver=!1,this.isStarted=!1,this.player=null,this.opponent=null,this.playerTrail=new Set,this.opponentTrail=new Set,this.init()}init(){window.addEventListener("click",()=>{this.audioManager.init()},{once:!0}),this.cameraController.setMode("follow")}initPlayer(e=new R(-15,0,0),t=65535){this.player={mesh:ua(t),position:e.clone(),direction:new R(1,0,0),speed:10,visible:!0,hasShield:!1,isGhost:!1,getPosition(){return this.position.clone()}},this.player.mesh.position.copy(e),this.player.mesh.rotation.y=Math.atan2(this.player.direction.x,this.player.direction.z),this.scene.add(this.player.mesh),this.playerTrailMesh=new ha(this.scene,t),this.playerTrailMesh.start(this.player.position,this.player.direction),console.log("Player created at:",this.player.position)}initOpponent(e=new R(15,0,0),t=16711935,n="medium"){return console.log("Initializing opponent..."),this.opponent=new W0(this.scene,e,t,n),console.log("Opponent initialized:",this.opponent),this.opponent}initRemoteOpponent(e=new R(15,0,0),t=16711935){return console.log("Initializing remote opponent..."),this.opponent=new _l(this.scene,e,t),this.opponent}_ensureOpponentType(e,t,n,i){const r=this.opponent instanceof _l;this.opponent&&r!==e&&(this.opponent.dispose(),this.opponent=null),this.opponent||(e?this.initRemoteOpponent(t,n):this.initOpponent(t,n,i))}startSinglePlayer(e="medium"){console.log("Starting single player game..."),this.isMultiplayer=!1,this._currentDifficulty=e,this.audioManager.init(),this.player||this.initPlayer(),this._ensureOpponentType(!1,new R(15,0,0),16711935,e),this.playerTrail.clear(),this.opponentTrail.clear(),this.scoringSystem.reset(),this.powerUpSystem.clear(),this.player.hasShield=!1,this.player.isGhost=!1,this.achievementSystem.incrementStat("gamesPlayed",1),this.isStarted=!0,this.gameOver=!1,this.audioManager.playStartSound(),console.log("Game started! isStarted:",this.isStarted,"player:",!!this.player,"opponent:",!!this.opponent)}startMultiplayer(e){console.log("Starting multiplayer game, isHost:",e),this.isMultiplayer=!0,this.isHost=e,this.audioManager.init(),this.player||this.initPlayer(),this._ensureOpponentType(!0,new R(15,0,0),16711935),this.playerTrail.clear(),this.opponentTrail.clear(),this.scoringSystem.reset(),this.powerUpSystem.clear(),this.player.hasShield=!1,this.player.isGhost=!1,this.achievementSystem.incrementStat("gamesPlayed",1),this.isStarted=!0,this.gameOver=!1,this.audioManager.playStartSound(),console.log("Multiplayer game started!")}_minDistanceToDanger(){const e=this.player.position;let t=this._gridBounds-Math.max(Math.abs(e.x),Math.abs(e.z));if(this.opponent&&this.opponent.trail){const n=this.opponent.trail.points;for(let i=0;i<n.length-1;i++){const r=this._pointToSegmentDistance(e,n[i],n[i+1]);r<t&&(t=r)}}return t}_pointToSegmentDistance(e,t,n){const i=n.x-t.x,r=n.z-t.z,o=e.x-t.x,a=e.z-t.z,c=i*i+r*r;let l=c>0?(o*i+a*r)/c:0;l=Math.max(0,Math.min(1,l));const h=t.x+i*l,u=t.z+r*l,d=e.x-h,p=e.z-u;return Math.sqrt(d*d+p*p)}handlePlayerInput(e){this.gameOver||!this.isStarted||!this.player||(e==="turnLeft"?(this.turnPlayer("left"),this.audioManager.playTurnSound()):e==="turnRight"&&(this.turnPlayer("right"),this.audioManager.playTurnSound()),this.isMultiplayer&&this.multiplayerManager&&this.multiplayerManager.sendInput(e))}turnPlayer(e){const t=this.player.direction;let n;if(e==="left"?t.x===1?n=new R(0,0,-1):t.x===-1?n=new R(0,0,1):t.z===1?n=new R(1,0,0):t.z===-1&&(n=new R(-1,0,0)):t.x===1?n=new R(0,0,1):t.x===-1?n=new R(0,0,-1):t.z===1?n=new R(-1,0,0):t.z===-1&&(n=new R(1,0,0)),n){const i=this._minDistanceToDanger();this.player.direction.copy(n);const r=Math.atan2(n.x,n.z);return this.player.mesh.rotation.y=r,i<2&&this.scoringSystem.addPerfectTurn(),!0}return!1}checkCollisions(){if(!this.player||!this.opponent)return;const e=this.player.position,t=this.opponent.position,n=45,i=Math.abs(e.x)>n||Math.abs(e.z)>n,r=Math.abs(t.x)>n||Math.abs(t.z)>n,o=`${Math.floor(e.x)},${Math.floor(e.z)}`,a=this.playerTrail.has(o)||this.opponentTrail.has(o),c=`${Math.floor(t.x)},${Math.floor(t.z)}`,l=this.playerTrail.has(c)||this.opponentTrail.has(c);let h=i||a;if((this.player.hasShield||this.player.isGhost&&a&&!i)&&(h=!1),h){this.handlePlayerDeath();return}if(r||l){this.handleOpponentDeath();return}}handlePlayerDeath(){if(this.gameOver)return;this.gameOver=!0,this.derezzEffect.create(this.player.position,65535),this.player.visible=!1,this.player.mesh.visible=!1,this.cameraController.shake(.8,.5),this.audioManager.playDerezzSound(),this.audioManager.stopEngineSound();const e=this.achievementSystem.stats;if(this.achievementSystem.updateStats({gamesLost:e.gamesLost+1,currentStreak:0,longestSurvival:Math.max(e.longestSurvival,this.scoringSystem.stats.timeSurvived),totalDistance:e.totalDistance+this.scoringSystem.stats.distanceTraveled,totalPowerUps:e.totalPowerUps+this.scoringSystem.stats.powerUpsCollected,closeCallsInGame:this.scoringSystem.stats.closeCalls,maxCombo:Math.max(e.maxCombo,this.scoringSystem.maxCombo)}),this.isMultiplayer&&this.multiplayerManager){const t=this.isHost?"guest":"host";this.multiplayerManager.endGame(t)}this.onGameOver&&this.onGameOver({won:!1}),console.log("Player died!"),this._scheduleAutoRestart()}handleOpponentDeath(){if(this.gameOver)return;this.gameOver=!0,this.derezzEffect.create(this.opponent.position,16711935),this.opponent.hide();const e=this.powerUpSystem.getActiveEffects().some(i=>i.type==="speed"),t=this.scoringSystem.stats.closeCalls===0,n=this.achievementSystem.stats;if(this.achievementSystem.updateStats({gamesWon:n.gamesWon+1,currentStreak:n.currentStreak+1,winStreak:Math.max(n.winStreak,n.currentStreak+1),longestSurvival:Math.max(n.longestSurvival,this.scoringSystem.stats.timeSurvived),totalDistance:n.totalDistance+this.scoringSystem.stats.distanceTraveled,totalPowerUps:n.totalPowerUps+this.scoringSystem.stats.powerUpsCollected,closeCallsInGame:this.scoringSystem.stats.closeCalls,maxCombo:Math.max(n.maxCombo,this.scoringSystem.maxCombo),perfectGames:n.perfectGames+(t?1:0),winsWithSpeedBoost:n.winsWithSpeedBoost+(e?1:0)}),this.isMultiplayer&&this.multiplayerManager){const i=this.isHost?"host":"guest";this.multiplayerManager.endGame(i)}this.onGameOver&&this.onGameOver({won:!0}),console.log("Opponent died! You win!"),this._scheduleAutoRestart()}_scheduleAutoRestart(){this.isMultiplayer||(this._autoRestartTimer&&clearTimeout(this._autoRestartTimer),this._autoRestartTimer=setTimeout(()=>{this._autoRestartTimer=null,this.gameOver&&this.restart(this._currentDifficulty)},9e3))}update(e){if(!this.gameOver&&this.isStarted&&this.player&&this.opponent){const t=this.player.position.clone();this.player.position.add(this.player.direction.clone().multiplyScalar(this.player.speed*e)),this.player.mesh.position.copy(this.player.position),this.playerTrailMesh.update(this.player.position,this.player.direction);const n=`${Math.floor(this.player.position.x)},${Math.floor(this.player.position.z)}`,i=`${Math.floor(t.x)},${Math.floor(t.z)}`;n!==i&&this.playerTrail.add(i);const r=this.opponent.position.clone();this.opponent.update(e,this.player.position,this.playerTrail,this.opponentTrail);const o=`${Math.floor(this.opponent.position.x)},${Math.floor(this.opponent.position.z)}`,a=`${Math.floor(r.x)},${Math.floor(r.z)}`;o!==a&&this.opponentTrail.add(a),this.audioManager.updateEngineSound(this.player.speed),this.cameraController.follow(this.player.mesh,e);const c=performance.now(),l=this.powerUpSystem.update(c,this.player,this.opponent,this._gridBounds,this.opponentTrail);l&&this.scoringSystem.addPowerUpCollected(l),this.player.mesh.material.opacity=this.player.isGhost?.4:1,this.player.mesh.material.emissiveIntensity=this.player.hasShield?1.8:1.1,this.scoringSystem.updateSurvivalTime(e),this.scoringSystem.updateDistance(this.player.position.distanceTo(t)),this.scoringSystem.updateCombo(c);const h=this._minDistanceToDanger();h<1.5&&c-this._lastCloseCallTime>500&&(this.scoringSystem.addCloseCall(h,c),this._lastCloseCallTime=c,this.achievementSystem.updateStats({closeCallsInGame:this.scoringSystem.stats.closeCalls,maxCombo:Math.max(this.achievementSystem.stats.maxCombo,this.scoringSystem.maxCombo)})),this.checkCollisions()}this.derezzEffect.update(e)}restart(e="medium"){var t,n;this._autoRestartTimer&&(clearTimeout(this._autoRestartTimer),this._autoRestartTimer=null),this._currentDifficulty=e,this.gameOver=!1,this.derezzEffect.clear(),this.playerTrail.clear(),this.opponentTrail.clear(),this.powerUpSystem.clear(),this.player&&(this.player.position.set(-15,0,0),this.player.direction.set(1,0,0),this.player.speed=10,this.player.visible=!0,this.player.mesh.visible=!0,this.player.mesh.position.copy(this.player.position),this.player.hasShield=!1,this.player.isGhost=!1,this.player.mesh.material.opacity=1,this.player.mesh.material.emissiveIntensity=1.1,this.playerTrailMesh.start(this.player.position,this.player.direction)),this.opponent&&(this.opponent.reset(new R(15,0,0)),(n=(t=this.opponent).setDifficulty)==null||n.call(t,e)),this.scoringSystem.reset(),this.player.hasShield=!1,this.player.isGhost=!1,this.achievementSystem.incrementStat("gamesPlayed",1),this.isStarted=!0,this.audioManager.startEngineSound(),console.log("Game restarted and round started!")}toggleCameraMode(){this.cameraController.nextMode()}toggleMute(){var t;const e=((t=this.audioManager.masterGain)==null?void 0:t.gain.value)||0;this.audioManager.setMuted(e>0)}applyThemeColors(e,t){this.player&&this.player.mesh&&(this.player.mesh.material.color.set(e),this.player.mesh.material.emissive.set(e)),this.playerTrailMesh&&this.playerTrailMesh.setColor(e),this.opponent&&typeof this.opponent.setColor=="function"&&this.opponent.setColor(t)}dispose(){this._autoRestartTimer&&(clearTimeout(this._autoRestartTimer),this._autoRestartTimer=null),this.audioManager.dispose(),this.playerTrailMesh&&this.playerTrailMesh.dispose(),this.powerUpSystem&&this.powerUpSystem.clear()}}const K0=`varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,$0=`uniform float uTime;
uniform vec3 uColor;
uniform float uPulseSpeed;
uniform float uGridSize;

uniform vec2 uPlayerPos;
uniform vec2 uOpponentPos;
uniform vec3 uPlayerColor;
uniform vec3 uOpponentColor;
uniform float uWaveRadius;

varying vec2 vUv;
varying vec3 vPosition;

// Ciągłe pierścienie światła rozchodzące się od pozycji pojazdu (jak sonar) -
// gasną z odległością (falloff) i są ograniczone promieniem uWaveRadius,
// żeby nie zalewać całej planszy naraz.
float rippleGlow(vec2 fragXZ, vec2 sourceXZ) {
  float dist = distance(fragXZ, sourceXZ);
  if (dist > uWaveRadius) return 0.0;
  float ring = sin(dist * 2.0 - uTime * 4.0) * 0.5 + 0.5;
  ring = pow(ring, 4.0); // węższe, wyraźniejsze pierścienie zamiast rozlanej fali
  float falloff = 1.0 - smoothstep(0.0, uWaveRadius, dist);
  return ring * falloff;
}

void main() {
  vec2 gridPos = vPosition.xz / uGridSize;

  vec2 grid = abs(fract(gridPos - 0.5) - 0.5) / fwidth(gridPos);
  float line = min(grid.x, grid.y);

  float pulse = sin(uTime * uPulseSpeed) * 0.5 + 0.5;
  float lineAlpha = 1.0 - min(line, 1.0);

  vec3 baseColor = uColor * (0.3 + pulse * 0.7);

  float glowP = rippleGlow(vPosition.xz, uPlayerPos);
  float glowO = rippleGlow(vPosition.xz, uOpponentPos);
  vec3 glowColor = uPlayerColor * glowP + uOpponentColor * glowO;

  vec3 finalColor = baseColor + glowColor;
  float finalAlpha = clamp(lineAlpha * 0.6 + glowP + glowO, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;class Z0{constructor(e=100,t=50){this.size=e,this.divisions=t,this.gridSize=e/t,this.uniforms={uTime:{value:0},uColor:{value:new fe(65535)},uPulseSpeed:{value:2},uGridSize:{value:this.gridSize},uPlayerPos:{value:new ve(9999,9999)},uOpponentPos:{value:new ve(9999,9999)},uPlayerColor:{value:new fe(65535)},uOpponentColor:{value:new fe(16711935)},uWaveRadius:{value:7}},this.material=new Lt({vertexShader:K0,fragmentShader:$0,uniforms:this.uniforms,transparent:!0,side:Ct});const n=new Hn(e,e,1,1);n.rotateX(-Math.PI/2),this.mesh=new Ze(n,this.material),this.mesh.position.y=-.5}update(e){this.uniforms.uTime.value=e}setColor(e){this.uniforms.uColor.value.set(e)}setPulseSpeed(e){this.uniforms.uPulseSpeed.value=e}updateRacerPositions(e,t){e&&this.uniforms.uPlayerPos.value.set(e.x,e.z),t&&this.uniforms.uOpponentPos.value.set(t.x,t.z)}setGlowColors(e,t){this.uniforms.uPlayerColor.value.set(e),this.uniforms.uOpponentColor.value.set(t)}}const un=Object.create(null);un.open="0";un.close="1";un.ping="2";un.pong="3";un.message="4";un.upgrade="5";un.noop="6";const or=Object.create(null);Object.keys(un).forEach(s=>{or[un[s]]=s});const Go={type:"error",data:"parser error"},_h=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",vh=typeof ArrayBuffer=="function",xh=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s&&s.buffer instanceof ArrayBuffer,da=({type:s,data:e},t,n)=>_h&&e instanceof Blob?t?n(e):vl(e,n):vh&&(e instanceof ArrayBuffer||xh(e))?t?n(e):vl(new Blob([e]),n):n(un[s]+(e||"")),vl=(s,e)=>{const t=new FileReader;return t.onload=function(){const n=t.result.split(",")[1];e("b"+(n||""))},t.readAsDataURL(s)};function xl(s){return s instanceof Uint8Array?s:s instanceof ArrayBuffer?new Uint8Array(s):new Uint8Array(s.buffer,s.byteOffset,s.byteLength)}let bo;function J0(s,e){if(_h&&s.data instanceof Blob)return s.data.arrayBuffer().then(xl).then(e);if(vh&&(s.data instanceof ArrayBuffer||xh(s.data)))return e(xl(s.data));da(s,!1,t=>{bo||(bo=new TextEncoder),e(bo.encode(t))})}const yl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ls=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let s=0;s<yl.length;s++)ls[yl.charCodeAt(s)]=s;const Q0=s=>{let e=s.length*.75,t=s.length,n,i=0,r,o,a,c;s[s.length-1]==="="&&(e--,s[s.length-2]==="="&&e--);const l=new ArrayBuffer(e),h=new Uint8Array(l);for(n=0;n<t;n+=4)r=ls[s.charCodeAt(n)],o=ls[s.charCodeAt(n+1)],a=ls[s.charCodeAt(n+2)],c=ls[s.charCodeAt(n+3)],h[i++]=r<<2|o>>4,h[i++]=(o&15)<<4|a>>2,h[i++]=(a&3)<<6|c&63;return l},ev=typeof ArrayBuffer=="function",fa=(s,e)=>{if(typeof s!="string")return{type:"message",data:yh(s,e)};const t=s.charAt(0);return t==="b"?{type:"message",data:tv(s.substring(1),e)}:or[t]?s.length>1?{type:or[t],data:s.substring(1)}:{type:or[t]}:Go},tv=(s,e)=>{if(ev){const t=Q0(s);return yh(t,e)}else return{base64:!0,data:s}},yh=(s,e)=>{switch(e){case"blob":return s instanceof Blob?s:new Blob([s]);case"arraybuffer":default:return s instanceof ArrayBuffer?s:s.buffer}},Mh="",nv=(s,e)=>{const t=s.length,n=new Array(t);let i=0;s.forEach((r,o)=>{da(r,!1,a=>{n[o]=a,++i===t&&e(n.join(Mh))})})},iv=(s,e)=>{const t=s.split(Mh),n=[];for(let i=0;i<t.length;i++){const r=fa(t[i],e);if(n.push(r),r.type==="error")break}return n};function sv(){return new TransformStream({transform(s,e){J0(s,t=>{const n=t.length;let i;if(n<126)i=new Uint8Array(1),new DataView(i.buffer).setUint8(0,n);else if(n<65536){i=new Uint8Array(3);const r=new DataView(i.buffer);r.setUint8(0,126),r.setUint16(1,n)}else{i=new Uint8Array(9);const r=new DataView(i.buffer);r.setUint8(0,127),r.setBigUint64(1,BigInt(n))}s.data&&typeof s.data!="string"&&(i[0]|=128),e.enqueue(i),e.enqueue(t)})}})}let wo;function tr(s){return s.reduce((e,t)=>e+t.length,0)}function nr(s,e){if(s[0].length===e)return s.shift();const t=new Uint8Array(e);let n=0;for(let i=0;i<e;i++)t[i]=s[0][n++],n===s[0].length&&(s.shift(),n=0);return s.length&&n<s[0].length&&(s[0]=s[0].slice(n)),t}function rv(s,e){wo||(wo=new TextDecoder);const t=[];let n=0,i=-1,r=!1;return new TransformStream({transform(o,a){for(t.push(o);;){if(n===0){if(tr(t)<1)break;const c=nr(t,1);r=(c[0]&128)===128,i=c[0]&127,i<126?n=3:i===126?n=1:n=2}else if(n===1){if(tr(t)<2)break;const c=nr(t,2);i=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),n=3}else if(n===2){if(tr(t)<8)break;const c=nr(t,8),l=new DataView(c.buffer,c.byteOffset,c.length),h=l.getUint32(0);if(h>Math.pow(2,21)-1){a.enqueue(Go);break}i=h*Math.pow(2,32)+l.getUint32(4),n=3}else{if(tr(t)<i)break;const c=nr(t,i);a.enqueue(fa(r?c:wo.decode(c),e)),n=0}if(i===0||i>s){a.enqueue(Go);break}}}})}const Sh=4;function ft(s){if(s)return ov(s)}function ov(s){for(var e in ft.prototype)s[e]=ft.prototype[e];return s}ft.prototype.on=ft.prototype.addEventListener=function(s,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+s]=this._callbacks["$"+s]||[]).push(e),this};ft.prototype.once=function(s,e){function t(){this.off(s,t),e.apply(this,arguments)}return t.fn=e,this.on(s,t),this};ft.prototype.off=ft.prototype.removeListener=ft.prototype.removeAllListeners=ft.prototype.removeEventListener=function(s,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+s];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+s],this;for(var n,i=0;i<t.length;i++)if(n=t[i],n===e||n.fn===e){t.splice(i,1);break}return t.length===0&&delete this._callbacks["$"+s],this};ft.prototype.emit=function(s){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+s],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(t){t=t.slice(0);for(var n=0,i=t.length;n<i;++n)t[n].apply(this,e)}return this};ft.prototype.emitReserved=ft.prototype.emit;ft.prototype.listeners=function(s){return this._callbacks=this._callbacks||{},this._callbacks["$"+s]||[]};ft.prototype.hasListeners=function(s){return!!this.listeners(s).length};const Dr=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0),Yt=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),av="arraybuffer";function Eh(s,...e){return e.reduce((t,n)=>(s.hasOwnProperty(n)&&(t[n]=s[n]),t),{})}const cv=Yt.setTimeout,lv=Yt.clearTimeout;function Ur(s,e){e.useNativeTimers?(s.setTimeoutFn=cv.bind(Yt),s.clearTimeoutFn=lv.bind(Yt)):(s.setTimeoutFn=Yt.setTimeout.bind(Yt),s.clearTimeoutFn=Yt.clearTimeout.bind(Yt))}const hv=1.33;function uv(s){return typeof s=="string"?dv(s):Math.ceil((s.byteLength||s.size)*hv)}function dv(s){let e=0,t=0;for(let n=0,i=s.length;n<i;n++)e=s.charCodeAt(n),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(n++,t+=4);return t}function Th(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function fv(s){let e="";for(let t in s)s.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(s[t]));return e}function pv(s){let e={},t=s.split("&");for(let n=0,i=t.length;n<i;n++){let r=t[n].split("=");e[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return e}class mv extends Error{constructor(e,t,n){super(e),this.description=t,this.context=n,this.type="TransportError"}}class pa extends ft{constructor(e){super(),this.writable=!1,Ur(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,n){return super.emitReserved("error",new mv(e,t,n)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=fa(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,t={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const t=fv(e);return t.length?"?"+t:""}}class gv extends pa{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let n=0;this._polling&&(n++,this.once("pollComplete",function(){--n||t()})),this.writable||(n++,this.once("drain",function(){--n||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=n=>{if(this.readyState==="opening"&&n.type==="open"&&this.onOpen(),n.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(n)};iv(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,nv(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",t=this.query||{};return this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=Th()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}}let bh=!1;try{bh=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const _v=bh;function vv(){}class xv extends gv{constructor(e){if(super(e),typeof location<"u"){const t=location.protocol==="https:";let n=location.port;n||(n=t?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||n!==e.port}}doWrite(e,t){const n=this.request({method:"POST",data:e});n.on("success",t),n.on("error",(i,r)=>{this.onError("xhr post error",i,r)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,n)=>{this.onError("xhr poll error",t,n)}),this.pollXhr=e}}let Di=class ar extends ft{constructor(e,t,n){super(),this.createRequest=e,Ur(this,n),this._opts=n,this._method=n.method||"GET",this._uri=t,this._data=n.data!==void 0?n.data:null,this._create()}_create(){var e;const t=Eh(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this._opts.xd;const n=this._xhr=this.createRequest(t);try{n.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0);for(let i in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(i)&&n.setRequestHeader(i,this._opts.extraHeaders[i])}}catch{}if(this._method==="POST")try{n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{n.setRequestHeader("Accept","*/*")}catch{}(e=this._opts.cookieJar)===null||e===void 0||e.addCookies(n),"withCredentials"in n&&(n.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(n.timeout=this._opts.requestTimeout),n.onreadystatechange=()=>{var i;n.readyState===3&&((i=this._opts.cookieJar)===null||i===void 0||i.parseCookies(n.getResponseHeader("set-cookie"))),n.readyState===4&&(n.status===200||n.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof n.status=="number"?n.status:0)},0))},n.send(this._data)}catch(i){this.setTimeoutFn(()=>{this._onError(i)},0);return}typeof document<"u"&&(this._index=ar.requestsCount++,ar.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=vv,e)try{this._xhr.abort()}catch{}typeof document<"u"&&delete ar.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}};Di.requestsCount=0;Di.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",Ml);else if(typeof addEventListener=="function"){const s="onpagehide"in Yt?"pagehide":"unload";addEventListener(s,Ml,!1)}}function Ml(){for(let s in Di.requests)Di.requests.hasOwnProperty(s)&&Di.requests[s].abort()}const yv=function(){const s=wh({xdomain:!1});return s&&s.responseType!==null}();class Mv extends xv{constructor(e){super(e);const t=e&&e.forceBase64;this.supportsBinary=yv&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new Di(wh,this.uri(),e)}}function wh(s){const e=s.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||_v))return new XMLHttpRequest}catch{}if(!e)try{return new Yt[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Ah=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class Sv extends pa{get name(){return"websocket"}doOpen(){const e=this.uri(),t=this.opts.protocols,n=Ah?{}:Eh(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,n)}catch(i){return this.emitReserved("error",i)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const n=e[t],i=t===e.length-1;da(n,this.supportsBinary,r=>{try{this.doWrite(n,r)}catch{}i&&Dr(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=Th()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}}const Ao=Yt.WebSocket||Yt.MozWebSocket;class Ev extends Sv{createSocket(e,t,n){return Ah?new Ao(e,t,n):t?new Ao(e,t):new Ao(e)}doWrite(e,t){this.ws.send(t)}}class Tv extends pa{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const t=rv(Number.MAX_SAFE_INTEGER,this.socket.binaryType),n=e.readable.pipeThrough(t).getReader(),i=sv();i.readable.pipeTo(e.writable),this._writer=i.writable.getWriter();const r=()=>{n.read().then(({done:a,value:c})=>{a||(this.onPacket(c),r())}).catch(a=>{})};r();const o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this._writer.write(o).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const n=e[t],i=t===e.length-1;this._writer.write(n).then(()=>{i&&Dr(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}}const bv={websocket:Ev,webtransport:Tv,polling:Mv},wv=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Av=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Ho(s){if(s.length>8e3)throw"URI too long";const e=s,t=s.indexOf("["),n=s.indexOf("]");t!=-1&&n!=-1&&(s=s.substring(0,t)+s.substring(t,n).replace(/:/g,";")+s.substring(n,s.length));let i=wv.exec(s||""),r={},o=14;for(;o--;)r[Av[o]]=i[o]||"";return t!=-1&&n!=-1&&(r.source=e,r.host=r.host.substring(1,r.host.length-1).replace(/;/g,":"),r.authority=r.authority.replace("[","").replace("]","").replace(/;/g,":"),r.ipv6uri=!0),r.pathNames=Rv(r,r.path),r.queryKey=Cv(r,r.query),r}function Rv(s,e){const t=/\/{2,9}/g,n=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&n.splice(0,1),e.slice(-1)=="/"&&n.splice(n.length-1,1),n}function Cv(s,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(n,i,r){i&&(t[i]=r)}),t}const Vo=typeof addEventListener=="function"&&typeof removeEventListener=="function",cr=[];Vo&&addEventListener("offline",()=>{cr.forEach(s=>s())},!1);class zn extends ft{constructor(e,t){if(super(),this.binaryType=av,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e=="object"&&(t=e,e=null),e){const n=Ho(e);t.hostname=n.host,t.secure=n.protocol==="https"||n.protocol==="wss",t.port=n.port,n.query&&(t.query=n.query)}else t.host&&(t.hostname=Ho(t.host).host);Ur(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},t.transports.forEach(n=>{const i=n.prototype.name;this.transports.push(i),this._transportsByName[i]=n}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=pv(this.opts.query)),Vo&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},cr.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=Sh,t.transport=e,this.id&&(t.sid=this.id);const n=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](n)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const e=this.opts.rememberUpgrade&&zn.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const t=this.createTransport(e);t.open(),this.setTransport(t)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",t=>this._onClose("transport close",t))}onOpen(){this.readyState="open",zn.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const t=new Error("server error");t.code=e.data,this._onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let n=0;n<this.writeBuffer.length;n++){const i=this.writeBuffer[n].data;if(i&&(t+=uv(i)),n>0&&t>this._maxPayload)return this.writeBuffer.slice(0,n);t+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,Dr(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,t,n){return this._sendPacket("message",e,t,n),this}send(e,t,n){return this._sendPacket("message",e,t,n),this}_sendPacket(e,t,n,i){if(typeof t=="function"&&(i=t,t=void 0),typeof n=="function"&&(i=n,n=null),this.readyState==="closing"||this.readyState==="closed")return;n=n||{},n.compress=n.compress!==!1;const r={type:e,data:t,options:n};this.emitReserved("packetCreate",r),this.writeBuffer.push(r),i&&this.once("flush",i),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},n=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?n():e()}):this.upgrading?n():e()),this}_onError(e){if(zn.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Vo&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const n=cr.indexOf(this._offlineEventListener);n!==-1&&cr.splice(n,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this._prevBufferLen=0}}}zn.protocol=Sh;class Lv extends zn{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),n=!1;zn.priorWebsocketSuccess=!1;const i=()=>{n||(t.send([{type:"ping",data:"probe"}]),t.once("packet",u=>{if(!n)if(u.type==="pong"&&u.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;zn.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{n||this.readyState!=="closed"&&(h(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const d=new Error("probe error");d.transport=t.name,this.emitReserved("upgradeError",d)}}))};function r(){n||(n=!0,h(),t.close(),t=null)}const o=u=>{const d=new Error("probe error: "+u);d.transport=t.name,r(),this.emitReserved("upgradeError",d)};function a(){o("transport closed")}function c(){o("socket closed")}function l(u){t&&u.name!==t.name&&r()}const h=()=>{t.removeListener("open",i),t.removeListener("error",o),t.removeListener("close",a),this.off("close",c),this.off("upgrading",l)};t.once("open",i),t.once("error",o),t.once("close",a),this.once("close",c),this.once("upgrading",l),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{n||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){const t=[];for(let n=0;n<e.length;n++)~this.transports.indexOf(e[n])&&t.push(e[n]);return t}}let Pv=class extends Lv{constructor(e,t={}){const n=typeof e=="object",i=n?{...e}:{...t};(!i.transports||i.transports&&typeof i.transports[0]=="string")&&(i.transports=(i.transports||["polling","websocket","webtransport"]).map(r=>bv[r]).filter(r=>!!r)),super(n?i:e,i)}};function Iv(s,e="",t){let n=s;t=t||typeof location<"u"&&location,s==null&&(s=t.protocol+"//"+t.host),typeof s=="string"&&(s.charAt(0)==="/"&&(s.charAt(1)==="/"?s=t.protocol+s:s=t.host+s),/^(https?|wss?):\/\//.test(s)||(typeof t<"u"?s=t.protocol+"//"+s:s="https://"+s),n=Ho(s)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";const r=n.host.indexOf(":")!==-1?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+r+":"+n.port+e,n.href=n.protocol+"://"+r+(t&&t.port===n.port?"":":"+n.port),n}const Dv=typeof ArrayBuffer=="function",Uv=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s.buffer instanceof ArrayBuffer,Rh=Object.prototype.toString,Nv=typeof Blob=="function"||typeof Blob<"u"&&Rh.call(Blob)==="[object BlobConstructor]",Ov=typeof File=="function"||typeof File<"u"&&Rh.call(File)==="[object FileConstructor]";function ma(s){return Dv&&(s instanceof ArrayBuffer||Uv(s))||Nv&&s instanceof Blob||Ov&&s instanceof File}function lr(s,e){if(!s||typeof s!="object")return!1;if(Array.isArray(s)){for(let t=0,n=s.length;t<n;t++)if(lr(s[t]))return!0;return!1}if(ma(s))return!0;if(s.toJSON&&typeof s.toJSON=="function"&&arguments.length===1)return lr(s.toJSON(),!0);for(const t in s)if(Object.prototype.hasOwnProperty.call(s,t)&&lr(s[t]))return!0;return!1}function Fv(s){const e=[],t=s.data,n=s;return n.data=hr(t,e),n.attachments=e.length,{packet:n,buffers:e}}function hr(s,e,t){if(!s)return s;if(ma(s)){const n={_placeholder:!0,num:e.length};return e.push(s),n}else if(Array.isArray(s)){const n=new Array(s.length);for(let i=0;i<s.length;i++)n[i]=hr(s[i],e);return n}else if(typeof s=="object"&&!(s instanceof Date)){if(s.toJSON&&typeof s.toJSON=="function"&&!t)return hr(s.toJSON(),e,!0);const n={};for(const i in s)Object.prototype.hasOwnProperty.call(s,i)&&(n[i]=hr(s[i],e));return n}return s}function Bv(s,e){return s.data=Wo(s.data,e),delete s.attachments,s}function Wo(s,e){if(!s)return s;if(s&&s._placeholder===!0){if(typeof s.num=="number"&&s.num>=0&&s.num<e.length)return e[s.num];throw new Error("illegal attachments")}else if(Array.isArray(s))for(let t=0;t<s.length;t++)s[t]=Wo(s[t],e);else if(typeof s=="object")for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&(s[t]=Wo(s[t],e));return s}const kv=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var We;(function(s){s[s.CONNECT=0]="CONNECT",s[s.DISCONNECT=1]="DISCONNECT",s[s.EVENT=2]="EVENT",s[s.ACK=3]="ACK",s[s.CONNECT_ERROR=4]="CONNECT_ERROR",s[s.BINARY_EVENT=5]="BINARY_EVENT",s[s.BINARY_ACK=6]="BINARY_ACK"})(We||(We={}));class zv{constructor(e){this.replacer=e}encode(e){return(e.type===We.EVENT||e.type===We.ACK)&&lr(e)?this.encodeAsBinary({type:e.type===We.EVENT?We.BINARY_EVENT:We.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===We.BINARY_EVENT||e.type===We.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=Fv(e),n=this.encodeAsString(t.packet),i=t.buffers;return i.unshift(n),i}}class ga extends ft{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e=="function"?{reviver:e}:e)}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const n=t.type===We.BINARY_EVENT;n||t.type===We.BINARY_ACK?(t.type=n?We.EVENT:We.ACK,this.reconstructor=new Gv(t)):super.emitReserved("decoded",t)}else if(ma(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const n={type:Number(e.charAt(0))};if(We[n.type]===void 0)throw new Error("unknown packet type "+n.type);if(n.type===We.BINARY_EVENT||n.type===We.BINARY_ACK){const r=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const o=e.substring(r,t);if(o!=Number(o)||e.charAt(t)!=="-")throw new Error("Illegal attachments");const a=Number(o);if(!Hv(a)||a<1)throw new Error("Illegal attachments");if(a>this.opts.maxAttachments)throw new Error("too many attachments");n.attachments=a}if(e.charAt(t+1)==="/"){const r=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););n.nsp=e.substring(r,t)}else n.nsp="/";const i=e.charAt(t+1);if(i!==""&&Number(i)==i){const r=t+1;for(;++t;){const o=e.charAt(t);if(o==null||Number(o)!=o){--t;break}if(t===e.length)break}n.id=Number(e.substring(r,t+1))}if(e.charAt(++t)){const r=this.tryParse(e.substr(t));if(ga.isPayloadValid(n.type,r))n.data=r;else throw new Error("invalid payload")}return n}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case We.CONNECT:return Sl(t);case We.DISCONNECT:return t===void 0;case We.CONNECT_ERROR:return typeof t=="string"||Sl(t);case We.EVENT:case We.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&kv.indexOf(t[0])===-1);case We.ACK:case We.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Gv{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=Bv(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Hv=Number.isInteger||function(s){return typeof s=="number"&&isFinite(s)&&Math.floor(s)===s};function Sl(s){return Object.prototype.toString.call(s)==="[object Object]"}const Vv=Object.freeze(Object.defineProperty({__proto__:null,Decoder:ga,Encoder:zv,get PacketType(){return We}},Symbol.toStringTag,{value:"Module"}));function tn(s,e,t){return s.on(e,t),function(){s.off(e,t)}}const Wv=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Ch extends ft{constructor(e,t,n){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,n&&n.auth&&(this.auth=n.auth),this._opts=Object.assign({},n),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[tn(e,"open",this.onopen.bind(this)),tn(e,"packet",this.onpacket.bind(this)),tn(e,"error",this.onerror.bind(this)),tn(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){var n,i,r;if(Wv.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;const o={type:We.EVENT,data:t};if(o.options={},o.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const h=this.ids++,u=t.pop();this._registerAckCallback(h,u),o.id=h}const a=(i=(n=this.io.engine)===null||n===void 0?void 0:n.transport)===null||i===void 0?void 0:i.writable,c=this.connected&&!(!((r=this.io.engine)===null||r===void 0)&&r._hasPingExpired());return this.flags.volatile&&!a||(c?(this.notifyOutgoingListeners(o),this.packet(o)):this.sendBuffer.push(o)),this.flags={},this}_registerAckCallback(e,t){var n;const i=(n=this.flags.timeout)!==null&&n!==void 0?n:this._opts.ackTimeout;if(i===void 0){this.acks[e]=t;return}const r=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let a=0;a<this.sendBuffer.length;a++)this.sendBuffer[a].id===e&&this.sendBuffer.splice(a,1);t.call(this,new Error("operation has timed out"))},i),o=(...a)=>{this.io.clearTimeoutFn(r),t.apply(this,a)};o.withError=!0,this.acks[e]=o}emitWithAck(e,...t){return new Promise((n,i)=>{const r=(o,a)=>o?i(o):n(a);r.withError=!0,t.push(r),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());const n={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((i,...r)=>(this._queue[0],i!==null?n.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(i)):(this._queue.shift(),t&&t(null,...r)),n.pending=!1,this._drainQueue())),this._queue.push(n),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:We.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(n=>String(n.id)===e)){const n=this.acks[e];delete this.acks[e],n.withError&&n.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case We.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case We.EVENT:case We.BINARY_EVENT:this.onevent(e);break;case We.ACK:case We.BINARY_ACK:this.onack(e);break;case We.DISCONNECT:this.ondisconnect();break;case We.CONNECT_ERROR:this.destroy();const n=new Error(e.data.message);n.data=e.data.data,this.emitReserved("connect_error",n);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const n of t)n.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let n=!1;return function(...i){n||(n=!0,t.packet({type:We.ACK,id:e,data:i}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:We.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const n of t)n.apply(this,e.data)}}}function Ji(s){s=s||{},this.ms=s.min||100,this.max=s.max||1e4,this.factor=s.factor||2,this.jitter=s.jitter>0&&s.jitter<=1?s.jitter:0,this.attempts=0}Ji.prototype.duration=function(){var s=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*s);s=Math.floor(e*10)&1?s+t:s-t}return Math.min(s,this.max)|0};Ji.prototype.reset=function(){this.attempts=0};Ji.prototype.setMin=function(s){this.ms=s};Ji.prototype.setMax=function(s){this.max=s};Ji.prototype.setJitter=function(s){this.jitter=s};class Xo extends ft{constructor(e,t){var n;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,Ur(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((n=t.randomizationFactor)!==null&&n!==void 0?n:.5),this.backoff=new Ji({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const i=t.parser||Vv;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new Pv(this.uri,this.opts);const t=this.engine,n=this;this._readyState="opening",this.skipReconnect=!1;const i=tn(t,"open",function(){n.onopen(),e&&e()}),r=a=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",a),e?e(a):this.maybeReconnectOnOpen()},o=tn(t,"error",r);if(this._timeout!==!1){const a=this._timeout,c=this.setTimeoutFn(()=>{i(),r(new Error("timeout")),t.close()},a);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(i),this.subs.push(o),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(tn(e,"ping",this.onping.bind(this)),tn(e,"data",this.ondata.bind(this)),tn(e,"error",this.onerror.bind(this)),tn(e,"close",this.onclose.bind(this)),tn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){Dr(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let n=this.nsps[e];return n?this._autoConnect&&!n.active&&n.connect():(n=new Ch(this,e,t),this.nsps[e]=n),n}_destroy(e){const t=Object.keys(this.nsps);for(const n of t)if(this.nsps[n].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let n=0;n<t.length;n++)this.engine.write(t[n],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var n;this.cleanup(),(n=this.engine)===null||n===void 0||n.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const n=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(i=>{i?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",i)):e.onreconnect()}))},t);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const cs={};function ur(s,e){typeof s=="object"&&(e=s,s=void 0),e=e||{};const t=Iv(s,e.path||"/socket.io"),n=t.source,i=t.id,r=t.path,o=cs[i]&&r in cs[i].nsps,a=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let c;return a?c=new Xo(n,e):(cs[i]||(cs[i]=new Xo(n,e)),c=cs[i]),t.query&&!e.query&&(e.query=t.queryKey),c.socket(t.path,e)}Object.assign(ur,{Manager:Xo,Socket:Ch,io:ur,connect:ur});class Xv{constructor(){this.socket=null,this.isConnected=!1,this.roomId=null,this.playerId=null,this.isHost=!1,this.opponentData=null,this.onPlayerJoined=null,this.onPlayerLeft=null,this.onGameStateUpdate=null,this.onPlayerInput=null,this.onGameStart=null,this.onGameEnd=null,this.onError=null}connect(e="http://localhost:3000"){return new Promise((t,n)=>{this.socket=ur(e),this.socket.on("connect",()=>{this.isConnected=!0,this.playerId=this.socket.id,console.log("Connected to server:",this.playerId),t()}),this.socket.on("disconnect",()=>{this.isConnected=!1,console.log("Disconnected from server")}),this.socket.on("player-joined",i=>{this.opponentData=i,this.onPlayerJoined&&this.onPlayerJoined(i)}),this.socket.on("player-left",()=>{this.opponentData=null,this.onPlayerLeft&&this.onPlayerLeft()}),this.socket.on("game-state-update",i=>{this.onGameStateUpdate&&this.onGameStateUpdate(i)}),this.socket.on("player-input",i=>{this.onPlayerInput&&this.onPlayerInput(i)}),this.socket.on("game-start",()=>{this.onGameStart&&this.onGameStart()}),this.socket.on("game-end",i=>{this.onGameEnd&&this.onGameEnd(i)}),this.socket.on("error",i=>{console.error("Socket error:",i),this.onError&&this.onError(i),n(i)}),this.socket.on("connect_error",i=>{console.error("Connection error:",i.message),this.onError&&this.onError(i),n(i)})})}createRoom(){return new Promise(e=>{this.socket.emit("create-room",{},t=>{this.roomId=t.roomId,this.isHost=!0,console.log("Room created:",this.roomId),e(t)})})}joinRoom(e){return new Promise((t,n)=>{this.socket.emit("join-room",{roomId:e},i=>{i.success?(this.roomId=e,this.isHost=!1,console.log("Joined room:",this.roomId),t(i)):n(new Error(i.error))})})}sendInput(e,t={}){!this.isConnected||!this.roomId||this.socket.emit("player-input",{roomId:this.roomId,action:e,data:t,timestamp:performance.now()})}sendGameState(e){!this.isConnected||!this.roomId||!this.isHost||this.socket.emit("game-state-update",{roomId:this.roomId,gameState:e})}startGame(){this.isHost&&this.socket.emit("start-game",{roomId:this.roomId})}endGame(e){this.socket.emit("game-end",{roomId:this.roomId,winner:e})}leaveRoom(){this.roomId&&(this.socket.emit("leave-room",{roomId:this.roomId}),this.roomId=null,this.isHost=!1,this.opponentData=null)}disconnect(){this.socket&&(this.leaveRoom(),this.socket.disconnect())}}class qv{constructor(e){this.multiplayer=e,this.isVisible=!1,this.createUI()}createUI(){this.container=document.createElement("div"),this.container.id="lobby-ui",this.container.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 20, 0.95);
      border: 2px solid #00ffff;
      border-radius: 10px;
      padding: 30px;
      color: #00ffff;
      font-family: 'Courier New', monospace;
      z-index: 1000;
      display: none;
      min-width: 400px;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    `;const e=document.createElement("h2");e.textContent="TRON MULTIPLAYER",e.style.cssText=`
      margin: 0 0 20px 0;
      text-align: center;
      font-size: 24px;
      text-shadow: 0 0 10px #00ffff;
    `,this.container.appendChild(e),this.statusDiv=document.createElement("div"),this.statusDiv.style.cssText=`
      margin-bottom: 20px;
      padding: 10px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      text-align: center;
    `,this.statusDiv.textContent="Connecting...",this.container.appendChild(this.statusDiv),this.createRoomSection=document.createElement("div"),this.createRoomSection.innerHTML=`
      <button id="create-room-btn" style="
        width: 100%;
        padding: 15px;
        background: #00ffff;
        color: #000;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: 10px;
        font-family: 'Courier New', monospace;
      ">CREATE ROOM</button>
    `,this.container.appendChild(this.createRoomSection),this.joinRoomSection=document.createElement("div"),this.joinRoomSection.innerHTML=`
      <div style="margin-bottom: 10px;">OR JOIN EXISTING ROOM:</div>
      <input id="room-code-input" type="text" placeholder="ROOM CODE" style="
        width: 100%;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid #00ffff;
        border-radius: 5px;
        color: #00ffff;
        font-size: 16px;
        margin-bottom: 10px;
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
      ">
      <button id="join-room-btn" style="
        width: 100%;
        padding: 15px;
        background: transparent;
        color: #00ffff;
        border: 2px solid #00ffff;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        font-family: 'Courier New', monospace;
      ">JOIN ROOM</button>
    `,this.container.appendChild(this.joinRoomSection),this.waitingSection=document.createElement("div"),this.waitingSection.style.display="none",this.waitingSection.innerHTML=`
      <div style="margin-bottom: 20px; text-align: center;">
        <div style="font-size: 18px; margin-bottom: 10px;">ROOM CODE:</div>
        <div id="room-code-display" style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 5px;
          text-shadow: 0 0 15px #00ffff;
        "></div>
      </div>
      <div id="waiting-status" style="
        text-align: center;
        margin-bottom: 20px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
      ">Waiting for opponent...</div>
      <button id="start-game-btn" style="
        width: 100%;
        padding: 15px;
        background: #00ff00;
        color: #000;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        display: none;
        font-family: 'Courier New', monospace;
      ">START GAME</button>
      <button id="leave-room-btn" style="
        width: 100%;
        padding: 10px;
        background: transparent;
        color: #ff0000;
        border: 1px solid #ff0000;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        margin-top: 10px;
        font-family: 'Courier New', monospace;
      ">LEAVE ROOM</button>
    `,this.container.appendChild(this.waitingSection),document.body.appendChild(this.container),this.setupEventListeners()}setupEventListeners(){document.getElementById("create-room-btn").addEventListener("click",async()=>{try{const e=await this.multiplayer.createRoom();this.showWaitingRoom(e.roomId)}catch{this.showError("Failed to create room")}}),document.getElementById("join-room-btn").addEventListener("click",async()=>{const e=document.getElementById("room-code-input").value.trim().toUpperCase();if(!e){this.showError("Please enter a room code");return}try{await this.multiplayer.joinRoom(e),this.showWaitingRoom(e,!1)}catch(t){this.showError(t.message)}}),document.getElementById("start-game-btn").addEventListener("click",()=>{this.multiplayer.startGame(),this.hide()}),document.getElementById("leave-room-btn").addEventListener("click",()=>{this.multiplayer.leaveRoom(),this.showMainMenu()})}show(){this.isVisible=!0,this.container.style.display="block"}hide(){this.isVisible=!1,this.container.style.display="none"}showMainMenu(){this.createRoomSection.style.display="block",this.joinRoomSection.style.display="block",this.waitingSection.style.display="none"}showWaitingRoom(e,t=!0){this.createRoomSection.style.display="none",this.joinRoomSection.style.display="none",this.waitingSection.style.display="block",document.getElementById("room-code-display").textContent=e,document.getElementById("start-game-btn").style.display="none"}showStartButton(){document.getElementById("start-game-btn").style.display="block",document.getElementById("waiting-status").textContent="Opponent joined! Ready to start."}updateStatus(e){this.statusDiv.textContent=e}showError(e){this.statusDiv.textContent=e,this.statusDiv.style.color="#ff0000",setTimeout(()=>{this.statusDiv.style.color="#00ffff"},3e3)}}class Nr extends Ze{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new Rt;const n=this,i=t.color!==void 0?new fe(t.color):new fe(8355711),r=t.textureWidth||512,o=t.textureHeight||512,a=t.clipBias||0,c=t.shader||Nr.ReflectorShader,l=t.multisample!==void 0?t.multisample:4,h=new Un,u=new R,d=new R,p=new R,g=new Ue,_=new R(0,0,-1),m=new je,f=new R,x=new R,v=new je,S=new Ue,C=this.camera,A=new Zt(r,o,{samples:l,type:an}),w=new Lt({name:c.name!==void 0?c.name:"unspecified",uniforms:Gi.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});w.uniforms.tDiffuse.value=A.texture,w.uniforms.color.value=i,w.uniforms.textureMatrix.value=S,this.material=w,this.onBeforeRender=function(I,y,T){if(d.setFromMatrixPosition(n.matrixWorld),p.setFromMatrixPosition(T.matrixWorld),g.extractRotation(n.matrixWorld),u.set(0,0,1),u.applyMatrix4(g),f.subVectors(d,p),f.dot(u)>0)return;f.reflect(u).negate(),f.add(d),g.extractRotation(T.matrixWorld),_.set(0,0,-1),_.applyMatrix4(g),_.add(p),x.subVectors(d,_),x.reflect(u).negate(),x.add(d),C.position.copy(f),C.up.set(0,1,0),C.up.applyMatrix4(g),C.up.reflect(u),C.lookAt(x),C.far=T.far,C.updateMatrixWorld(),C.projectionMatrix.copy(T.projectionMatrix),S.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),S.multiply(C.projectionMatrix),S.multiply(C.matrixWorldInverse),S.multiply(n.matrixWorld),h.setFromNormalAndCoplanarPoint(u,d),h.applyMatrix4(C.matrixWorldInverse),m.set(h.normal.x,h.normal.y,h.normal.z,h.constant);const U=C.projectionMatrix;v.x=(Math.sign(m.x)+U.elements[8])/U.elements[0],v.y=(Math.sign(m.y)+U.elements[9])/U.elements[5],v.z=-1,v.w=(1+U.elements[10])/U.elements[14],m.multiplyScalar(2/m.dot(v)),U.elements[2]=m.x,U.elements[6]=m.y,U.elements[10]=m.z+1-a,U.elements[14]=m.w,n.visible=!1;const B=I.getRenderTarget(),$=I.xr.enabled,P=I.shadowMap.autoUpdate;I.xr.enabled=!1,I.shadowMap.autoUpdate=!1,I.setRenderTarget(A),I.state.buffers.depth.setMask(!0),I.autoClear===!1&&I.clear(),I.render(y,C),I.xr.enabled=$,I.shadowMap.autoUpdate=P,I.setRenderTarget(B);const F=T.viewport;F!==void 0&&I.state.viewport(F),n.visible=!0},this.getRenderTarget=function(){return A},this.dispose=function(){A.dispose(),n.material.dispose()}}}Nr.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function xs(s){let e=s;return()=>(e=(e*9301+49297)%233280,e/233280)}function Ot(s,e){return s.add(e),e}const Lh=-.55;function _a(s,e,t,n){const i=t+s()*(n-t),r=Lh+e,o=e+i;return{centerY:r-o/2,totalHeight:o}}function Yv(s){const e=document.createElement("canvas");e.width=96,e.height=192;const t=e.getContext("2d");t.fillStyle="#0b0b26",t.fillRect(0,0,e.width,e.height);const n=8,i=22,r=e.width/n,o=e.height/i;for(let c=0;c<i;c++)for(let l=0;l<n;l++){if(s()<.5)continue;const h=s()<.55;t.fillStyle=h?"rgba(150,225,255,0.95)":"rgba(40,55,95,0.6)",t.fillRect(l*r+1,c*o+1,r-2,o-2)}const a=new ia(e);return a.wrapS=hn,a.wrapT=hn,a.repeat.set(2,5),a}function jv(){const s=xs(1337),e=new Pt,t=Yv(s);function n({count:p,radiusMin:g,radiusMax:_,heightMin:m,heightMax:f,color:x,spires:v,buried:S}){const C=new Gn(1,1,1),A=new Yi({color:x,map:t,roughness:.7,metalness:.2,emissive:x,emissiveIntensity:.15,fog:!0}),w=new rr(C,A,p);w.instanceMatrix.setUsage(_r);const I=new it;let y,T=0;if(v){const B=new _s(.15,.25,1,6),$=new Mt({color:16777215,transparent:!0,opacity:.9,blending:ln,depthWrite:!1,fog:!1});y=new rr(B,$,p)}const U=new fe(x);for(let B=0;B<p;B++){const $=B/p*Math.PI*2+s()*.15,P=g+s()*(_-g),F=6+s()*14,V=6+s()*14,q=m+s()*(f-m),X=Math.cos($)*P,Y=Math.sin($)*P,{centerY:j,totalHeight:te}=_a(s,q,S[0],S[1]);if(I.position.set(X,j,Y),I.scale.set(F,te,V),I.rotation.y=s()*Math.PI,I.updateMatrix(),w.setMatrixAt(B,I.matrix),w.setColorAt(B,U.clone().multiplyScalar(.75+s()*.5)),v&&s()<.35){const ne=6+s()*14;I.position.set(X,q-.55+ne/2,Y),I.scale.set(1,ne,1),I.rotation.y=0,I.updateMatrix(),y.setMatrixAt(T,I.matrix),T++}}w.instanceColor.needsUpdate=!0,Ot(e,w),v&&(y.count=T,Ot(e,y))}n({count:60,radiusMin:85,radiusMax:140,heightMin:22,heightMax:95,color:2237020,spires:!0,buried:[20,55]}),n({count:75,radiusMin:165,radiusMax:270,heightMin:45,heightMax:190,color:1315896,spires:!0,buried:[30,80]}),n({count:60,radiusMin:300,radiusMax:430,heightMin:70,heightMax:260,color:789542,buried:[40,110]});const i=900,r=new Gn(1,1,1),o=new Mt({color:16777215,transparent:!0,opacity:.95,blending:ln,depthWrite:!1,fog:!1,vertexColors:!0}),a=new rr(r,o,i),c=new it,l=new fe(65535).multiplyScalar(1.6),h=new fe(16711765).multiplyScalar(1.6),u=new Uint8Array(i),d=new Float32Array(i);for(let p=0;p<i;p++){const g=s()*Math.PI*2,_=90+s()*340,m=2+s()*250;c.position.set(Math.cos(g)*_,m-.55,Math.sin(g)*_);const f=.5+s()*1.7;c.scale.set(f,f*.35,.15),c.rotation.y=s()*Math.PI,c.updateMatrix(),a.setMatrixAt(p,c.matrix);const x=s()<.5;u[p]=x?1:0,d[p]=s()*Math.PI*2,a.setColorAt(p,x?l:h)}return a.instanceColor.needsUpdate=!0,Ot(e,a),e.userData.classicLights=a,e.userData.classicLightIsA=u,e.userData.classicLightPhases=d,e.userData.classicColorA=l,e.userData.classicColorB=h,e.userData.classicTwinkleCursor=0,e.userData.classicScratchColor=new fe,e}function Kv(s,e){const{classicLights:t,classicLightIsA:n,classicLightPhases:i,classicColorA:r,classicColorB:o,classicScratchColor:a}=s.userData;if(!t)return;const c=i.length,l=90;let h=s.userData.classicTwinkleCursor;for(let u=0;u<l;u++){const d=(h+u)%c,p=.55+.45*Math.sin(e*2.2+i[d]);a.copy(n[d]?r:o).multiplyScalar(p),t.setColorAt(d,a)}s.userData.classicTwinkleCursor=(h+l)%c,t.instanceColor.needsUpdate=!0}function $v(s,{core:e,mid:t,stripes:n}){const r=document.createElement("canvas");r.width=256,r.height=256;const o=r.getContext("2d"),a=256/2,c=o.createRadialGradient(a,a,0,a,a,a);if(c.addColorStop(0,e),c.addColorStop(.55,t),c.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=c,o.beginPath(),o.arc(a,a,a,0,Math.PI*2),o.fill(),n){o.fillStyle="rgba(8,3,18,0.92)";for(let h=0;h<6;h++){const u=256*(.28+s()*.52);o.fillRect(0,u,256,4+s()*7)}}return new ia(r)}function Ph(s,{core:e,mid:t,stripes:n,radius:i,skyY:r,opacity:o}){const a=new Pt,c=$v(s,{core:e,mid:t,stripes:n}),l=new Mt({map:c,transparent:!0,opacity:o,blending:ln,depthWrite:!1,fog:!1,side:Ct}),h=new Ze(new Hn(i*2,i*2),l);h.position.set(0,r,-260),a.add(h);const u=new Ze(new Hn(i*2,i*2),l.clone());return u.material.opacity=o*.3,u.scale.y=-1,u.position.set(0,2*Lh-r,-260),a.add(u),a}function Zv(s,e,t,n,i,r,o){const a=new Float32Array(e*3);for(let h=0;h<e;h++){const u=s()*Math.PI*2,d=n+s()*(i-n);a[h*3]=Math.cos(u)*d,a[h*3+1]=r+s()*(o-r),a[h*3+2]=Math.sin(u)*d}const c=new ut;c.setAttribute("position",new pt(a,3));const l=new gs({color:t,size:1.1,transparent:!0,opacity:.7,fog:!1,depthWrite:!1});return new Rr(c,l)}function Jv(){const s=xs(4242),e=new Pt;Ot(e,Ph(s,{core:"#fff0f8",mid:"#ff5fa8",stripes:!0,radius:60,skyY:50,opacity:.55}));function t(n,i,r,o){const a=[],c=Math.PI*2/o;for(let d=0;d<=o;d++){const p=d*c,g=i*(.4+s()*.6);a.push(new R(Math.cos(p)*n,g,Math.sin(p)*n))}const l=[];for(let d=0;d<a.length-1;d++)if(l.push(a[d].x,a[d].y,a[d].z,a[d+1].x,a[d+1].y,a[d+1].z),d%2===0){const p=-(20+s()*35);l.push(a[d].x,a[d].y,a[d].z,a[d].x,p,a[d].z)}const h=new ut;h.setAttribute("position",new Je(l,3));const u=new Ar({color:r,transparent:!0,opacity:.85,fog:!0});return new na(h,u)}return Ot(e,t(190,45,16723870,24)),Ot(e,t(240,65,60159,28)),Ot(e,t(310,100,16723870,22)),Ot(e,Zv(s,220,16777215,80,400,60,220)),e}function Qv(s){const e=document.createElement("canvas");e.width=80,e.height=640;const t=e.getContext("2d");t.fillStyle="#000000",t.fillRect(0,0,e.width,e.height),t.font="26px monospace",t.textAlign="center",t.textBaseline="middle";const n="01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ";for(let r=14;r<e.height;r+=26){const o=n[Math.floor(s()*n.length)],a=s();t.fillStyle=a<.15?"#eaffea":"#3dff6e",t.globalAlpha=.5+s()*.5,t.fillText(o,e.width/2,r)}const i=new ia(e);return i.wrapS=hn,i.wrapT=hn,i}function ex(){const s=xs(7331),e=new Pt,t=Qv(s),n=[];function i(r,o,a,c,l,h,u,d,p,g){for(let _=0;_<r;_++){const m=s()*Math.PI*2,f=o+s()*(a-o),x=c+s()*(l-c),{centerY:v,totalHeight:S}=_a(s,x,20,60),C=t.clone();C.needsUpdate=!0,C.repeat.set(1,S/14),C.offset.y=s();const A=new Mt({map:C,transparent:!0,opacity:h,blending:ln,depthWrite:!1,fog:!1,side:Ct}),w=p+s()*(g-p),I=new Hn(w,S),y=new Pt,T=new Ze(I,A),U=new Ze(I,A);U.rotation.y=Math.PI/2,y.add(T,U),y.position.set(Math.cos(m)*f,v,Math.sin(m)*f),Ot(e,y);const B=5+s()*12;n.push({texture:C,material:A,speed:u+s()*(d-u),cycleDuration:B,cycleOffset:s()*B,baseOpacity:h})}}return i(46,90,160,55,100,.9,20,45,5,9),i(64,170,300,70,150,.42,8,20,6,12),e.userData.matrixColumns=n,e}function tx(s,e,t){const n=s.userData.matrixColumns;if(n)for(const i of n){i.texture.offset.y-=i.speed*t;const r=(e+i.cycleOffset)%i.cycleDuration,o=1,a=Math.min(1,r/o),c=Math.min(1,(i.cycleDuration-r)/o);i.material.opacity=i.baseOpacity*Math.min(a,c)}}function nx(){const s=xs(9001),e=new Pt;Ot(e,Ph(s,{core:"#fff6e0",mid:"#ffb347",stripes:!1,radius:58,skyY:52,opacity:.55}));const t=[],n=26;for(let r=0;r<n;r++){const a=s()<.5?new ra(4+s()*6,.4,8,20):new Cr(4+s()*5,8+s()*8,4),c=s()<.5?16740039:16757575,l=new Mt({color:c,wireframe:!0,transparent:!0,opacity:.8,fog:!0}),h=new Ze(a,l),u=s()*Math.PI*2,d=100+s()*220;h.position.set(Math.cos(u)*d,15+s()*70,Math.sin(u)*d),h.rotation.set(s()*Math.PI,s()*Math.PI,0),h.userData.spin=.1+s()*.3,Ot(e,h),t.push(h)}e.userData.amberShapes=t;const i=22;for(let r=0;r<i;r++){const o=r/i*Math.PI*2+s()*.1,a=70+s()*45,c=22+s()*22,{centerY:l,totalHeight:h}=_a(s,c,20,50),u=new _s(2,2.6,h,12),d=new Mt({color:s()<.5?16752335:16764810,wireframe:!0,transparent:!0,opacity:.45,fog:!0}),p=new Ze(u,d);p.position.set(Math.cos(o)*a,l,Math.sin(o)*a),Ot(e,p)}return e}function ix(s,e,t){const n=s.userData.amberShapes;if(n)for(const i of n)i.rotation.y+=i.userData.spin*t,i.rotation.x+=i.userData.spin*.4*t}function sx(){const s=xs(5555),e=new Pt,t=85;for(let l=0;l<t;l++){const h=s()<.5,u=h?12+s()*24:14+s()*30,d=h?new Lr(6+s()*14,0):new Cr(5+s()*10,u,5),p=s()<.7?1717584:859952,g=new Mt({color:p,fog:!0}),_=new Ze(d,g),m=s()*Math.PI*2,f=90+s()*220,x=Math.cos(m)*f,v=Math.sin(m)*f,S=15+s()*40,A=(u+S)/u;_.position.set(x,(u-S)/2-.55,v),_.rotation.set(s()*.3,s()*Math.PI,s()*.3),_.scale.set(.7+s()*.6,A,.7+s()*.6),Ot(e,_);const w=new u_(d),I=new Ar({color:9433087,transparent:!0,opacity:.7,fog:!1}),y=new na(w,I);y.position.copy(_.position),y.rotation.copy(_.rotation),y.scale.copy(_.scale),Ot(e,y)}const n=340,i=new ut,r=new Float32Array(n*3),o=new Float32Array(n);for(let l=0;l<n;l++){const h=s()*Math.PI*2,u=20+s()*300;r[l*3]=Math.cos(h)*u,r[l*3+1]=s()*160,r[l*3+2]=Math.sin(h)*u,o[l]=3+s()*5}i.setAttribute("position",new pt(r,3));const a=new gs({color:14677759,size:.35,transparent:!0,opacity:.8,fog:!1,depthWrite:!1}),c=new Rr(i,a);return Ot(e,c),e.userData.snow=c,e.userData.snowVelocities=o,e}function rx(s,e,t){const n=s.userData.snow,i=s.userData.snowVelocities;if(!n)return;const r=n.geometry.attributes.position.array;for(let o=0;o<i.length;o++)r[o*3+1]-=i[o]*t,r[o*3+1]<-1&&(r[o*3+1]=160);n.geometry.attributes.position.needsUpdate=!0}const El={classic:{build:jv,fogDensity:.004,update:Kv},synthwave:{build:Jv,fogDensity:.0035},matrix:{build:ex,fogDensity:0,update:tx},amber:{build:nx,fogDensity:.0035,update:ix},glacier:{build:sx,fogDensity:.005,update:rx}};class ox{constructor(e){this.scene=e,this.group=new Pt,this.themeGroup=null,this.currentThemeKey=null,this._activeUpdate=null,this._buildFloorBase(),this.scene.fog=new Jo(787488,.004),this.scene.add(this.group)}_buildFloorBase(){const e=new Hn(400,400);this.floorBase=new Nr(e,{color:2894942,textureWidth:2048,textureHeight:2048,clipBias:.003}),this.floorBase.rotation.x=-Math.PI/2,this.floorBase.position.y=-.55,this.group.add(this.floorBase)}setTheme(e){const t=El[e]||El.classic;e!==this.currentThemeKey&&(this.themeGroup&&(this.group.remove(this.themeGroup),this.themeGroup.traverse(n=>{n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose()})),this.themeGroup=t.build(),this.group.add(this.themeGroup),this.currentThemeKey=e,this._activeUpdate=t.update||null,this.scene.fog&&(this.scene.fog.density=t.fogDensity))}update(e,t){this._activeUpdate&&this.themeGroup&&this._activeUpdate(this.themeGroup,e,t)}setFogColor(e){this.scene.fog&&this.scene.fog.color.set(e)}dispose(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),this.scene.remove(this.group),this.scene.fog=null}}const Vn=new i_;function Ft(s){return parseInt(s.replace("#",""),16)}const ci=window.__tronTheme||{p1:"#00f3ff",p2:"#ff0055",bg:"#0c0420"};Vn.background=new fe(Ft(ci.bg));function Ih(){return typeof window.__getFieldSize=="function"?window.__getFieldSize():{width:window.innerWidth,height:window.innerHeight}}const Wn=Ih(),Ui=new Rt(75,Wn.width/Wn.height,.1,1e3);Ui.position.set(0,30,30);Ui.lookAt(0,0,0);const ys=new ch({antialias:!0});ys.setSize(Wn.width,Wn.height);ys.setPixelRatio(window.devicePixelRatio);(document.getElementById("gameCanvasWrap")||document.body).appendChild(ys.domElement);const li=new K_(ys);li.setSize(Wn.width,Wn.height);li.setPixelRatio(window.devicePixelRatio);const ax=new $_(Vn,Ui);li.addPass(ax);const Dh=new Wi(new ve(Wn.width,Wn.height),.45,.35,.45);li.addPass(Dh);li.addPass(new Q_);const cx=new I_(16777215,.5);Vn.add(cx);const Uh=new fh(16777215,.8);Uh.position.set(10,20,10);Vn.add(Uh);const fs=new ox(Vn);fs.setFogColor(Ft(ci.bg));fs.setTheme(window.__tronThemeKey||"classic");const ni=new Z0(90,45);ni.setColor(Ft(ci.p1));ni.setGlowColors(Ft(ci.p1),Ft(ci.p2));Vn.add(ni.mesh);(async()=>{await H0();const s=new j0(Vn,Ui);s.initPlayer(void 0,Ft(ci.p1)),s.initOpponent(new R(15,0,0),Ft(ci.p2),"medium"),window.addEventListener("tron-theme-change",N=>{const ie=N.detail;ie&&(Vn.background=new fe(Ft(ie.bg)),fs.setFogColor(Ft(ie.bg)),fs.setTheme(window.__tronThemeKey||"classic"),ni.setColor(Ft(ie.p1)),ni.setGlowColors(Ft(ie.p1),Ft(ie.p2)),s.applyThemeColors(Ft(ie.p1),Ft(ie.p2)))});const e=new Xv,t=new qv(e);s.multiplayerManager=e;const i=new URLSearchParams(window.location.search).get("server")||"http://localhost:3000";let r=!1;async function o(){if(e.isConnected)return!0;if(r)return e.isConnected;r=!0,t.updateStatus("Łączenie z serwerem...");try{return await e.connect(i),t.updateStatus("Połączono. Utwórz pokój lub dołącz do istniejącego."),!0}catch(N){return console.error("Nie udało się połączyć z serwerem multiplayer:",N),t.showError("Brak połączenia z serwerem. Sprawdź adres serwera (?server=...) i spróbuj ponownie."),r=!1,!1}}e.onPlayerJoined=()=>{t.showStartButton()},e.onPlayerLeft=()=>{t.updateStatus("Przeciwnik opuścił pokój."),s.isMultiplayer&&s.isStarted&&!s.gameOver&&s.handleOpponentDeath()},e.onGameStart=()=>{t.hide(),s.startMultiplayer(e.isHost)},e.onPlayerInput=N=>{s.opponent&&typeof s.opponent.applyRemoteInput=="function"&&s.opponent.applyRemoteInput(N.action)},e.onGameEnd=N=>{if(s.gameOver)return;N.winner==="host"&&e.isHost||N.winner==="guest"&&!e.isHost?s.handleOpponentDeath():s.handlePlayerDeath()},e.onError=N=>{t.showError(`Błąd sieci: ${N.message||N}`)};let a=performance.now();const c=document.getElementById("scoreValue"),l=document.getElementById("comboValue"),h=document.getElementById("effectsHud"),u=document.getElementById("toastHud"),d=document.getElementById("touchStartBtn"),p={shield:"🛡️ TARCZA",speed:"⚡ PRĘDKOŚĆ",ghost:"👻 DUCH",bomb:"💣 BOMBA"},g=document.getElementById("achievementToast"),_=document.getElementById("achievementIcon"),m=document.getElementById("achievementName"),f=document.getElementById("achievementDesc"),x=document.getElementById("gameOverOverlay"),v=document.getElementById("gameOverTitle"),S=document.getElementById("gameOverScore"),C=document.getElementById("gameOverRecordBadge"),A=document.getElementById("gameOverStatsGrid"),w=document.getElementById("gameOverAchievements"),I=document.getElementById("gameOverLifetime"),y=document.getElementById("gameOverCountdown"),T=document.getElementById("gameOverContinueBtn"),U=[];let B=!1;function $(){if(B||U.length===0)return;B=!0;const N=U.shift();_.textContent=N.icon,m.textContent=`OSIĄGNIĘCIE: ${N.name}`,f.textContent=N.description,g.classList.add("show"),setTimeout(()=>{g.classList.remove("show"),setTimeout(()=>{B=!1,$()},400)},3500)}s.achievementSystem.onAchievementUnlock=N=>{U.push(N),$()};const P="tron-best-score",F={timeSurvived:"Czas przetrwania",distanceTraveled:"Dystans",closeCalls:"Close calle",powerUpsCollected:"Power-upy",perfectTurns:"Idealne skręty"};let V=null,q=!1;s.onGameOver=N=>{V=N};function X(N){const ie=s.scoringSystem.getStats(),ce=s.achievementSystem.getStats(),xe=s.achievementSystem.getNewlyUnlocked();v.textContent=N.won?"WYGRANA":"PRZEGRANA",v.className=N.won?"won":"lost",S.textContent=ie.score;const ye=Number(localStorage.getItem(P)||0),Me=ie.score>0&&ie.score>ye;Me&&localStorage.setItem(P,String(ie.score)),C.classList.toggle("show",Me),A.innerHTML="";const Ve=[["timeSurvived",`${ie.stats.timeSurvived.toFixed(1)}s`],["distanceTraveled",`${ie.stats.distanceTraveled.toFixed(0)}m`],["closeCalls",ie.stats.closeCalls],["powerUpsCollected",ie.stats.powerUpsCollected],["perfectTurns",ie.stats.perfectTurns]];for(const[O,lt]of Ve){const _e=document.createElement("div");_e.className="label",_e.textContent=F[O];const we=document.createElement("div");we.className="value",we.textContent=lt,A.appendChild(_e),A.appendChild(we)}if(xe.length>0){w.style.display="",w.innerHTML="";for(const O of xe){const lt=document.createElement("div");lt.className="row",lt.innerHTML=`<span class="icon">${O.icon}</span><div><div class="name">${O.name}</div><div class="desc">${O.description}</div></div>`,w.appendChild(lt)}}else w.style.display="none";I.textContent=`Rekord: ${Math.max(ye,ie.score)} · Gier: ${ce.gamesPlayed} · Wygranych: ${ce.gamesWon} · Najdłuższe przetrwanie: ${ce.longestSurvival.toFixed(0)}s`,y.textContent=s.isMultiplayer?"":"Kolejna runda zacznie się automatycznie za chwilę..."}function Y(){V&&(X(V),x.classList.add("show"))}function j(){x.classList.remove("show"),V=null}T.addEventListener("click",()=>{j(),s.isMultiplayer?o().then(N=>{N&&t.show()}):s.restart(s._currentDifficulty||"medium")});function te(){const N=s.scoringSystem.getStats();c.textContent=N.score,l.textContent=N.combo>0?`COMBO x${N.multiplier}`:"",d.style.display=s.isStarted?"none":"";const ie=s.powerUpSystem.getActiveEffects();h.innerHTML="";for(const xe of ie){const ye=document.createElement("div");ye.className="effect";const Me=Math.ceil(xe.remainingTime/1e3);ye.textContent=`${p[xe.type]||xe.type} ${Me}s`,h.appendChild(ye)}const ce=N.floatingTexts[N.floatingTexts.length-1];ce?(u.textContent=ce.subtext?`${ce.text} (${ce.subtext})`:ce.text,u.style.opacity=ce.opacity!==void 0?ce.opacity:1):u.textContent=""}function ne(N){requestAnimationFrame(ne);const ie=(N-a)/1e3;a=N;const ce=N*.001;ni.updateRacerPositions(s.player?s.player.position:null,s.opponent?s.opponent.position:null),ni.update(ce),fs.update(ce,ie),s.update(ie),te(),s.gameOver&&!q?Y():!s.gameOver&&q&&j(),q=s.gameOver,li.render()}ne(performance.now());function W(){const N=Ih();Ui.aspect=N.width/N.height,Ui.updateProjectionMatrix(),ys.setSize(N.width,N.height),li.setSize(N.width,N.height),Dh.setSize(N.width,N.height)}window.addEventListener("resize",W),window.addEventListener("game-viewport-resize",W),document.querySelectorAll(".dpad-btn").forEach(N=>{const ie=N.dataset.turn==="left"?"turnLeft":"turnRight",ce=ye=>{ye.preventDefault(),N.classList.add("pressed"),s.handlePlayerInput(ie)},xe=ye=>{ye.preventDefault(),N.classList.remove("pressed")};N.addEventListener("touchstart",ce,{passive:!1}),N.addEventListener("touchend",xe,{passive:!1}),N.addEventListener("touchcancel",xe,{passive:!1}),N.addEventListener("click",ce)}),document.getElementById("touchStartBtn").addEventListener("touchstart",N=>{N.preventDefault(),s.isStarted||s.startSinglePlayer("medium")},{passive:!1}),document.getElementById("fnRestart3d").addEventListener("touchstart",N=>{N.preventDefault(),s.isMultiplayer||s.restart("medium")},{passive:!1}),document.getElementById("fnCamera3d").addEventListener("touchstart",N=>{N.preventDefault(),s.toggleCameraMode()},{passive:!1}),document.getElementById("fnMute3d").addEventListener("touchstart",N=>{N.preventDefault(),s.toggleMute()},{passive:!1}),document.getElementById("fnLobby3d").addEventListener("touchstart",N=>{N.preventDefault(),o().then(ie=>{ie&&t.show()})},{passive:!1});function K(){s.isStarted&&!s.gameOver&&!confirm("Opuścić grę i wrócić do menu?")||(window.location.href="../index.html")}document.getElementById("escBtn").addEventListener("click",K),window.addEventListener("keydown",N=>{if(N.key==="Escape"){N.preventDefault(),K();return}(N.key==="ArrowLeft"||N.key==="a"||N.key==="A")&&s.handlePlayerInput("turnLeft"),(N.key==="ArrowRight"||N.key==="d"||N.key==="D")&&s.handlePlayerInput("turnRight"),(N.key===" "||N.key==="Enter")&&(s.isStarted||s.startSinglePlayer("medium")),(N.key==="r"||N.key==="R")&&(s.isMultiplayer||s.restart("medium")),(N.key==="c"||N.key==="C")&&s.toggleCameraMode(),(N.key==="m"||N.key==="M")&&s.toggleMute(),(N.key==="l"||N.key==="L")&&o().then(ie=>{ie&&t.show()})}),window.addEventListener("beforeunload",()=>{s.dispose(),e.disconnect()}),console.log(`
  === TRON LIGHT CYCLES ===
  Naciśnij SPACJĘ aby rozpocząć grę (single-player)
  Strzałki/A,D: Skręcanie
  R: Restart (tylko single-player)
  C: Zmień kamerę
  M: Wycisz dźwięk
  L: Otwórz lobby multiplayer

  Sprawdź konsolę dla debugowania!
  `)})();
