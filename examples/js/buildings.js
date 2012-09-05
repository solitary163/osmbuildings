var OSMBuildings=function(ia){var U=Math.PI,ya=U/2,Da=U/4,Ea=180/U,Fa=256,ja=14,ka=400,za=ka-50,V="latitude",W="longitude",I=0,H=1,y=2,ea=3,Aa=Aa||Array,Ga=Math.exp,Ha=Math.log,Ia=Math.tan,Ja=Math.atan,la=Math.min,Ka=Math.max,ma=ia.document,v=function(){function X(f,h,k){if(k<0)k+=1;if(k>1)k-=1;if(k<1/6)return f+(h-f)*6*k;if(k<0.5)return h;if(k<2/3)return f+(h-f)*(2/3-k)*6;return f}function C(f,h,k,l){this.r=f;this.g=h;this.b=k;this.a=arguments.length<4?1:l}var Y=C.prototype;Y.toString=function(){return"rgba("+
[this.r,this.g,this.b,this.a.toFixed(2)].join(",")+")"};Y.adjustLightness=function(f){var h=v.toHSLA(this);h.l*=f;h.l=Math.min(1,Math.max(0,h.l));var k,l;if(h.s===0)f=k=l=h.l;else{l=h.l<0.5?h.l*(1+h.s):h.l+h.s-h.l*h.s;var u=2*h.l-l;f=X(u,l,h.h+1/3);k=X(u,l,h.h);l=X(u,l,h.h-1/3)}return new v(~~(f*255),~~(k*255),~~(l*255),h.a)};Y.adjustAlpha=function(f){return new v(this.r,this.g,this.b,this.a*f)};C.parse=function(f){if(~f.indexOf("#")){f=f.match(/^#?(\w{2})(\w{2})(\w{2})(\w{2})?$/);return new v(parseInt(f[1],
16),parseInt(f[2],16),parseInt(f[3],16),f[4]?parseInt(f[4],16)/255:1)}if(f=f.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))return new v(parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10),f[4]?parseFloat(f[5],10):1)};C.toHSLA=function(f){var h=f.r/255,k=f.g/255,l=f.b/255,u=Math.max(h,k,l),w=Math.min(h,k,l),z,Z=(u+w)/2,D;if(u===w)z=w=0;else{D=u-w;w=Z>0.5?D/(2-u-w):D/(u+w);switch(u){case h:z=(k-l)/D+(k<l?6:0);break;case k:z=(l-h)/D+2;break;case l:z=(h-k)/D+4;break}z/=6}return{h:z,s:w,l:Z,
a:f.a}};return C}();return function(){function X(a){p=ma.createElement("canvas");p.style.webkitTransform="translate3d(0,0,0)";p.style.position="absolute";p.style.pointerEvents="none";p.style.left=0;p.style.top=0;p.style.imageRendering="optimizeSpeed";a.appendChild(p);r=p.getContext("2d");r.lineCap="round";r.lineJoin="round";r.lineWidth=1;try{r.mozImageSmoothingEnabled=false}catch(e){}}function C(a,e){var b={};a/=$;e/=$;b[V]=e<=0?90:e>=1?-90:Ea*(2*Ja(Ga(U*(1-2*e)))-ya);b[W]=(a===1?1:(a%1+1)%1)*360-
180;return b}function Y(a,e){return a.replace(/\{ *([\w_]+) *\}/g,function(b,d){return e[d]||""})}function f(a,e){var b=new XMLHttpRequest;b.onreadystatechange=function(){if(b.readyState===4)!b.status||b.status<200||b.status>299||b.responseText&&e(JSON.parse(b.responseText))};b.open("GET",a);b.send(null);return b}function h(){if(!(!na||x<ja)){var a=C(P-Q,R-oa),e=C(P+J+Q,R+A+oa);fa&&fa.abort();fa=f(Y(na,{w:a[W],n:a[V],e:e[W],s:e[V],z:x}),k)}}function k(a){var e,b,d,c=[],g=0,i=0;aa=ja;ga(x);fa=null;
if(!(!a||a.meta.z!==x)){d=a.meta;b=a.data;if(t&&m&&t.z===d.z){g=t.x-d.x;i=t.y-d.y;a=0;for(e=m.length;a<e;a++)c[a]=m[a][H][0]+g+","+(m[a][H][1]+i)}t=d;m=[];a=0;for(e=b.length;a<e;a++){m[a]=b[a];m[a][I]=la(m[a][I],za);d=m[a][H][0]+","+m[a][H][1];m[a][ea]=!(c&&~c.indexOf(d))}Ba()}}function l(a,e){var b=[],d,c,g,i,j,q,o,n,s=pa-x;d=0;for(c=a.length;d<c;d++){j=a[d];q=j[H];o=new Aa(q.length);g=0;for(i=q.length-1;g<i;g+=2){n=q[g+1];var E=la(1,Ka(0,0.5-Ha(Ia(Da+ya*q[g]/180))/U/2));n={x:~~((n/360+0.5)*$),y:~~(E*
$)};o[g]=n.x;o[g+1]=n.y}b[d]=[];b[d][I]=la(j[I]>>s,za);b[d][H]=o;b[d][y]=j[y];b[d][ea]=e}return b}function u(a,e){if(typeof a==="object")z(a,!e);else{var b=ma.documentElement,d=ma.createElement("script");ia.jsonpCallback=function(c){delete ia.jsonpCallback;b.removeChild(d);z(c,!e)};b.insertBefore(d,b.lastChild).src=a.replace(/\{callback\}/,"jsonpCallback")}}function w(a,e,b){if(b===undefined)b=[];var d,c,g,i=a[0]?a:a.features,j,q,o,n,s,E=e?1:0,S=e?0:1;if(i){d=0;for(a=i.length;d<a;d++)w(i[d],e,b);
return b}if(a.type==="Feature"){c=a.geometry;d=a.properties}if(c.type==="Polygon")j=[c.coordinates];if(c.type==="MultiPolygon")j=c.coordinates;if(j){e=d.height;if(d.color||d.wallColor)n=v.parse(d.color||d.wallColor);if(d.roofColor)s=v.parse(d.roofColor);d=0;for(a=j.length;d<a;d++){q=j[d][0];i=[];c=o=0;for(g=q.length;c<g;c++){i.push(q[c][E],q[c][S]);o+=e||q[c][2]||0}if(o){c=[];c[I]=~~(o/q.length);q=H;o=void 0;g=void 0;var K=void 0,B=void 0,T=0,F=void 0,ba=void 0;F=0;for(ba=i.length-3;F<ba;F+=2){o=
i[F];g=i[F+1];K=i[F+2];B=i[F+3];T+=o*B-K*g}if((T/2>0?"CW":"CCW")==="CW")i=i;else{o=[];for(g=i.length-2;g>=0;g-=2)o.push(i[g],i[g+1]);i=o}c[q]=i;if(n||s)c[y]=[n,s];b.push(c)}}}return b}function z(a,e){if(a){ca=w(a,e);aa=0;ga(x);t={n:90,w:-180,s:-90,e:180,x:0,y:0,z:x};m=l(ca,true);Ba()}else{ca=null;G()}}function Z(a,e){J=a;A=e;Q=~~(J/2);oa=~~(A/2);M=Q;N=A;p.width=J;p.height=A}function D(a,e){P=a;R=e}function ga(a){x=a;$=Fa<<x;O=1-(x-aa)*0.3/(pa-aa)}function Ca(){qa=true;G()}function Ba(){da=0;clearInterval(ra);
ra=setInterval(function(){da+=0.1;if(da>1){clearInterval(ra);da=1;for(var a=0,e=m.length;a<e;a++)m[a][ea]=0}G()},33)}function G(){r.clearRect(0,0,J,A);if(t&&m)if(!(x<aa||qa)){var a,e,b,d,c,g,i,j,q=P-t.x,o=R-t.y,n,s,E,S,K,B,T,F=sa.adjustAlpha(O)+"",ba=(ta||sa.adjustLightness(1.2)).adjustAlpha(O)+"";if(ha)r.strokeStyle=La.adjustAlpha(O)+"";a=0;for(e=m.length;a<e;a++){c=m[a];s=false;g=c[H];n=[];b=0;for(d=g.length-1;b<d;b+=2){n[b]=i=g[b]-q;n[b+1]=j=g[b+1]-o;s||(s=i>0&&i<J&&j>0&&j<A)}if(s){r.fillStyle=
c[y]&&c[y][0]?c[y][0].adjustAlpha(O)+"":F;b=c[ea]?c[I]*da:c[I];g=ka/(ka-b);i=[];j=[];b=0;for(d=n.length-3;b<d;b+=2){s=n[b];E=n[b+1];S=n[b+2];K=n[b+3];B={x:~~((s-M)*g+M),y:~~((E-N)*g+N)};T={x:~~((S-M)*g+M),y:~~((K-N)*g+N)};if((S-s)*(B.y-E)>(B.x-s)*(K-E)){if(!j.length){j.unshift(E);j.unshift(s);j.push(B.x,B.y)}j.unshift(K);j.unshift(S);j.push(T.x,T.y)}else{ua(j);j=[]}i[b]=B.x;i[b+1]=B.y}ua(j);r.fillStyle=!c[y]?ba:c[y][1]?c[y][1].adjustAlpha(O)+"":ta?ba:c[y][0].adjustLightness(1.2).adjustAlpha(O)+"";
ua(i,ha)}}}}function ua(a,e){if(a.length){r.beginPath();r.moveTo(a[0],a[1]);for(var b=2,d=a.length;b<d;b+=2)r.lineTo(a[b],a[b+1]);r.closePath();e&&r.stroke();r.fill()}}var J=0,A=0,Q=0,oa=0,P=0,R=0,x,$,fa,p,r,na,ha,sa=new v(200,190,180),ta=null,La=new v(145,140,135),ca,t,m,O=1,da=1,ra,aa=ja,pa=20,M,N,qa=false;this.VERSION="0.1.6a";this.render=function(){G();return this};this.setStyle=function(a){a=(a=a)||{};ha=a.strokeRoofs!==undefined?a.strokeRoofs:ha;if(a.color||a.wallColor)sa=v.parse(a.color||a.wallColor);
if(a.roofColor)ta=v.parse(a.roofColor);G();return this};this.setData=function(a,e){console.warn("OSMBuildings.loadData() is deprecated and will be removed soon.\nUse OSMBuildings.loadData({url|object}, isLatLon?) instead.");z(a,e);return this};this.loadData=function(a){na=a;h();return this};this.geoJSON=function(a,e){u(a,e);return this};var va,wa,xa;this.VERSION+="-leaflet";this.addTo=function(a){a.addLayer(this);return this};this.onAdd=function(a){this.map=a;X(a._panes.overlayPane);pa=a._layersMaxZoom;
Z(a._size.x,a._size.y);var e=a.getPixelOrigin();D(e.x,e.y);ga(a._zoom);var b=0,d=0;va=function(){var c=L.DomUtil.getPosition(a._mapPane);M=Q-(c.x-b);N=A-(c.y-d);G()};wa=function(){var c=L.DomUtil.getPosition(a._mapPane);b=c.x;d=c.y;p.style.left=-c.x+"px";p.style.top=-c.y+"px";M=Q;N=A;Z(a._size.x,a._size.y);var g=a.getPixelOrigin();D(g.x-c.x,g.y-c.y);c=C(P,R);g=C(P+J,R+A);if(t&&(c[V]>t.n||c[W]<t.w||g[V]<t.s||g[W]>t.e))h();G()};xa=function(){var c={zoom:a._zoom};qa=false;ga(c.zoom);if(ca){m=l(ca);G()}else h()};
a.on({move:va,moveend:wa,zoomstart:Ca,zoomend:xa});if(a.options.zoomAnimation)p.className="leaflet-zoom-animated";a.attributionControl.addAttribution('Buildings &copy; <a href="http://osmbuildings.org">OSM Buildings</a>');G()};this.onRemove=function(a){a.attributionControl.removeAttribution('Buildings &copy; <a href="http://osmbuildings.org">OSM Buildings</a>');a.off({move:va,moveend:wa,zoomstart:Ca,zoomend:xa});p.parentNode.removeChild(p);this.map=null};arguments.length&&this.addTo(arguments[0])}}(this);
