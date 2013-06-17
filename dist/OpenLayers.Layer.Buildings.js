var OSMBuildings=function(){function f(a,b){var e=a[0]-b[0],g=a[1]-b[1];return e*e+g*g}function M(a){for(var b=0,e=0,g=0,d=a.length-3;g<d;g+=2)b+=a[g],e+=a[g+1];a=(a.length-2)/2;return[b/a<<0,e/a<<0]}function r(a){var b,e,g,d,f=0,l,h;l=0;for(h=a.length-3;l<h;l+=2)b=a[l],e=a[l+1],g=a[l+2],d=a[l+3],f+=b*d-g*e;if("CW"===(0<f/2?"CW":"CCW"))return a;b=[];for(e=a.length-2;0<=e;e-=2)b.push(a[e],a[e+1]);return b}var Y=Y||Array,Fa=Fa||Array,h=Math,Ma=h.exp,Na=h.log,Oa=h.sin,Pa=h.cos,xa=h.tan,Qa=h.atan,ra=
h.min,ya=h.max,Ga=document,S,ca=function(a){var b,e,g;if(0===a.s)b=e=g=a.l;else{g=0.5>a.l?a.l*(1+a.s):a.l+a.s-a.l*a.s;var d=2*a.l-g;a.h/=360;b=T(d,g,a.h+1/3);e=T(d,g,a.h);g=T(d,g,a.h-1/3)}return new y(255*b<<0,255*e<<0,255*g<<0,a.a)},T=function(a,b,e){0>e&&(e+=1);1<e&&(e-=1);return e<1/6?a+6*(b-a)*e:0.5>e?b:e<2/3?a+6*(b-a)*(2/3-e):a},y=function(a,b,e,g){this.r=a;this.g=b;this.b=e;this.a=4>arguments.length?1:g},h=y.prototype;h.toString=function(){return"rgba("+[this.r<<0,this.g<<0,this.b<<0,this.a.toFixed(2)].join()+
")"};h.setLightness=function(a){var b=y.toHSLA(this);b.l*=a;b.l=Math.min(1,Math.max(0,b.l));return ca(b)};h.setAlpha=function(a){return new y(this.r,this.g,this.b,this.a*a)};y.parse=function(a){var b;a+="";if(~a.indexOf("#")&&(b=a.match(/^#?(\w{2})(\w{2})(\w{2})(\w{2})?$/)))return new y(parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16),b[4]?parseInt(b[4],16)/255:1);if(b=a.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))return new y(parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10),b[4]?
parseFloat(b[5]):1);if(b=a.match(/hsla?\(([\d.]+)\D+([\d.]+)\D+([\d.]+)(\D+([\d.]+))?\)/))return ca({h:parseInt(b[1],10),s:parseFloat(b[2]),l:parseFloat(b[3]),a:b[4]?parseFloat(b[5]):1})};y.toHSLA=function(a){var b=a.r/255,e=a.g/255,g=a.b/255,d=Math.max(b,e,g),f=Math.min(b,e,g),l,h=(d+f)/2,u;if(d===f)l=f=0;else{u=d-f;f=0.5<h?u/(2-d-f):u/(d+f);switch(d){case b:l=(e-g)/u+(e<g?6:0);break;case e:l=(g-b)/u+2;break;case g:l=(b-e)/u+4}l/=6}return{h:360*l,s:f,l:h,a:a.a}};S=y;var Ha,h=Math,x=h.sin,F=h.cos,
Ra=h.tan,da=h.asin,ea=h.atan2,U=h.PI,v=180/U,Sa=357.5291/v,Ta=0.98560028/v,Ua=1.9148/v,Va=0.02/v,Wa=3E-4/v,Xa=102.9372/v,fa=23.45/v,Ya=280.16/v,Za=360.9856235/v;Ha=function(a,b,e){e=-e/v;b/=v;a=a.valueOf()/864E5-0.5+2440588;var g=Sa+Ta*(a-2451545),d=Ua*x(g)+Va*x(2*g)+Wa*x(3*g),d=g+Xa+d+U,g=da(x(d)*x(fa)),d=ea(x(d)*F(fa),F(d));e=Ya+Za*(a-2451545)-e-d;return{altitude:da(x(b)*x(g)+F(b)*F(g)*F(e)),azimuth:ea(x(e),F(e)*x(b)-Ra(g)*F(b))-U/2}};var Ia,O=function(a){var b=parseFloat(a);return~a.indexOf("m")?
b<<0:~a.indexOf("yd")?b*$a<<0:~a.indexOf("ft")?b*ga<<0:~a.indexOf("'")?(a=a.split("'"),a[0]*ga+a[1]*ab<<0):b<<0},B=function(a){a=a.toLowerCase();return"#"===a[0]?a:bb[a]||null},I=function(a){a=a.toLowerCase();return"#"===a[0]?a:cb[db[a]||a]||null},ha=function(a){return(a=a.tags)&&!a.landuse&&(a.building||a["building:part"])&&(!a.layer||0<=a.layer)},Ja=function(a){if(a){for(var b=[],e,g=0,d=a.length;g<d;g++)e=G[a[g]],b.push(e[0],e[1]);b[b.length-2]!==b[0]&&b[b.length-1]!==b[1]&&b.push(b[0],b[1]);if(!(8>
b.length))return b}},V=function(a){var b=0,e=0;a.height&&(b=O(a.height));!b&&a["building:height"]&&(b=O(a["building:height"]));!b&&a.levels&&(b=a.levels*z<<0);!b&&a["building:levels"]&&(b=a["building:levels"]*z<<0);a.min_height&&(e=O(a.min_height));!e&&a["building:min_height"]&&(e=O(a["building:min_height"]));!e&&a.min_level&&(e=a.min_level*z<<0);!e&&a["building:min_level"]&&(e=a["building:min_level"]*z<<0);var g,d;a["building:material"]&&(g=I(a["building:material"]));a["building:facade:material"]&&
(g=I(a["building:facade:material"]));a["building:cladding"]&&(g=I(a["building:cladding"]));a["building:color"]&&(g=B(a["building:color"]));a["building:colour"]&&(g=B(a["building:colour"]));a["roof:material"]&&(d=I(a["roof:material"]));a["building:roof:material"]&&(d=I(a["building:roof:material"]));a["roof:color"]&&(d=B(a["roof:color"]));a["roof:colour"]&&(d=B(a["roof:colour"]));a["building:roof:color"]&&(d=B(a["building:roof:color"]));a["building:roof:colour"]&&(d=B(a["building:roof:colour"]));return{height:b,
minHeight:e,wallColor:g,roofColor:d}},Ka=function(a,b,e){a={id:a,footprint:r(e)};b.height&&(a.height=b.height);b.minHeight&&(a.minHeight=b.minHeight);b.wallColor&&(a.wallColor=b.wallColor);b.roofColor&&(a.roofColor=b.roofColor);ia.push(a)},$a=0.9144,ga=0.3048,ab=0.0254,z=3,bb={black:"#000000",white:"#ffffff",brown:"#8b4513",green:"#00ff7f",grey:"#bebebe",gray:"#bebebe",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",yellow:"#ffff00",red:"#ff0000",blue:"#0000ff"},db={asphalt:"tar_paper",bitumen:"tar_paper",
block:"stone",bricks:"brick",glas:"glass",glassfront:"glass",grass:"plants",masonry:"stone",granite:"stone",panels:"panel",paving_stones:"stone",plastered:"plaster",rooftiles:"roof_tiles",roofingfelt:"tar_paper",sandstone:"stone",sheet:"canvas",sheets:"canvas",shingle:"tar_paper",shingles:"tar_paper",slates:"slate",steel:"metal",tar:"tar_paper",tent:"canvas",thatch:"plants",tile:"roof_tiles",tiles:"roof_tiles"},cb={brick:"#cc7755",bronze:"#ffeecc",canvas:"#fff8f0",concrete:"#999999",copper:"#a0e0d0",
glass:"#e8f8f8",gold:"#ffcc00",plants:"#009933",metal:"#aaaaaa",panel:"#fff8f0",plaster:"#999999",roof_tiles:"#f08060",silver:"#cccccc",slate:"#666666",stone:"#996666",tar_paper:"#333333",wood:"#deb887"},G,Z,ia;Ia=function(a){G={};Z={};ia=[];for(var b,e=0,g=a.length;e<g;e++)switch(b=a[e],b.type){case "node":G[b.id]=[b.lat,b.lon];break;case "way":var d=void 0,f=void 0;ha(b)?(d=V(b.tags),(f=Ja(b.nodes))&&Ka(b.id,d,f)):(d=b.tags)&&(!d.highway&&!d.railway&&!d.landuse)&&(Z[b.id]=b);break;case "relation":var h=
d=d=void 0,f=void 0;if(ha(b)&&("multipolygon"===b.tags.type||"building"===b.tags.type)){a:{for(var d=b.members,f=void 0,h=0,r=d.length;h<r;h++)if(f=d[h],"way"===f.type&&"outer"===f.role){d=f;break a}d=void 0}if(d&&(b=V(b.tags),d=Z[d.ref]))if(h=V(d.tags),f=Ja(d.nodes)){r=void 0;for(r in b)h[r]||(h[r]=b[r]);Ka(d.id,h,f)}}}return ia};var ja=Math.PI,La=ja/2,eb=ja/4,fb=180/ja,gb=256,hb="latitude",ib="longitude",h=function(){function a(A,a){var c={};A/=F;a/=F;c[hb]=0>=a?90:1<=a?-90:fb*(2*Qa(Ma(ja*(1-2*
a)))-La);c[ib]=360*(1===A?1:(A%1+1)%1)-180;return c}function b(a,b){return a.replace(/\{ *([\w_]+) *\}/g,function(a,A){return b[A]||a})}function e(a,b){var c=new XMLHttpRequest;c.onreadystatechange=function(){4===c.readyState&&c.status&&!(200>c.status||299<c.status)&&b&&c.responseText&&b(JSON.parse(c.responseText))};c.open("GET",a);c.send(null);return c}function g(){ka.render();sa.render();d()}function d(){C.clearRect(0,0,u,w);if(!(P<z||la)){var a,b,c,e,d,g,za,t,j,m=sa.MAX_HEIGHT,p=[ma+D,na+K],J,
q,k,s,W,n;E.renderItems.sort(function(a,A){return f(A.center,p)/A.height-f(a.center,p)/a.height});a=0;for(b=E.renderItems.length;a<b;a++)if(d=E.renderItems[a],!(d.height<=m)){q=!1;g=d.footprint;J=[];c=0;for(e=g.length-1;c<e;c+=2)J[c]=t=g[c]-D,J[c+1]=j=g[c+1]-K,q||(q=0<t&&t<u&&0<j&&j<w);if(q){c=1>d.scale?d.height*d.scale:d.height;g=$/($-c);d.minHeight&&(c=1>d.scale?d.minHeight*d.scale:d.minHeight,za=$/($-c));t=[];c=0;for(e=J.length-3;c<e;c+=2)j=J[c],k=J[c+1],q=J[c+2],s=J[c+3],W=l(j,k,g),n=l(q,s,g),
d.minHeight&&(k=l(j,k,za),s=l(q,s,za),j=k.x,k=k.y,q=s.x,s=s.y),(q-j)*(W.y-k)>(W.x-j)*(s-k)&&(C.fillStyle=j<q&&k<s||j>q&&k>s?d.altColor||oa:d.wallColor||I,h([q,s,j,k,W.x,W.y,n.x,n.y])),t[c]=W.x,t[c+1]=W.y;C.fillStyle=d.roofColor||pa;C.strokeStyle=d.altColor||oa;h(t,!0)}}}}function h(a,b){if(a.length){C.beginPath();C.moveTo(a[0],a[1]);for(var c=2,d=a.length;c<d;c+=2)C.lineTo(a[c],a[c+1]);C.closePath();b&&C.stroke();C.fill()}}function l(a,b,c){return{x:(a-ma)*c+ma<<0,y:(b-na)*c+na<<0}}function v(a){P=
a;F=gb<<P;a=P;var b=z,c=T;a=ra(ya(a,b),c);N=1-ra(ya(0+0.3*((a-b)/(c-b)),0),0.3);I=L.setAlpha(N)+"";oa=B.setAlpha(N)+"";pa=aa.setAlpha(N)+""}var u=0,w=0,x=0,y=0,D=0,K=0,P,F,C,L=new S(200,190,180),B=L.setLightness(0.8),aa=L.setLightness(1.2),I=L+"",oa=B+"",pa=aa+"",O,N=1,z=15,T=20,U,ma,na,$,la,G=new Date,ba={},V={add:function(a,b){ba[a]={data:b,time:Date.now()}},get:function(a){return ba[a]&&ba[a].data},purge:function(){G.setMinutes(G.getMinutes()-5);for(var a in ba)ba[a].time<G&&delete ba[a]}},E,ia=
function(a){return function(b){Z(b,a)}},Z=function(a,b){if(a){var c;if("FeatureCollection"===a.type){c=a.features;var d,e,g,f,h=[],j,m,p,J,q,k,s,n;d=0;for(e=c.length;d<e;d++)if(j=c[d],"Feature"===j.type&&(m=j.geometry,j=j.properties,"LineString"===m.type&&(k=p.length-1,p[0][0]===p[k][0]&&p[0][1]===p[k][1]&&(p=m.coordinates)),"Polygon"===m.type&&(p=m.coordinates),"MultiPolygon"===m.type&&(p=m.coordinates[0]),p)){if(j.color||j.wallColor)J=j.color||j.wallColor;j.roofColor&&(q=j.roofColor);m=p[0];n=[];
s=j.height;g=k=0;for(f=m.length;g<f;g++)n.push(m[g][1],m[g][0]),k+=s||m[g][2]||0;g={id:j.id||n[0]+","+n[1],footprint:r(n)};k&&(g.height=k/m.length<<0);j.minHeight&&(g.minHeight=j.minHeight);J&&(g.wallColor=J);q&&(g.roofColor=q);h.push(g)}c=h}else a.osm3s&&(c=Ia(a.elements));b&&V.add(b,c);ca(c,!0)}},ca=function(a,b){var c,d,e,f,h,t,j=[],m,p,n,q,k,s,l,r,u,x=T-P;e=0;for(f=a.length;e<f;e++)if(u=r=l=null,m=a[e],n=3*(m.height||15)>>x)if(q=3*m.minHeight>>x,!(q>U)){p=m.footprint;k=new Y(p.length);h=0;for(t=
p.length-1;h<t;h+=2)c=p[h+1],d=ra(1,ya(0,0.5-Na(xa(eb+La*p[h]/180))/ja/2)),c=(c/360+0.5)*F<<0,d=d*F<<0,k[h]=c,k[h+1]=d;h=k;t=h.length/2;p=new Fa(t);k=0;c=t-1;var v=d=void 0,w=void 0,y=void 0,B=[],C=[],H=[];for(p[k]=p[c]=1;c;){v=0;for(d=k+1;d<c;d++){var w=h[2*d],I=h[2*d+1],z=h[2*k],D=h[2*k+1],K=h[2*c],L=h[2*c+1],Q=K-z,R=L-D,G=void 0;if(0!==Q||0!==R)G=((w-z)*Q+(I-D)*R)/(Q*Q+R*R),1<G?(z=K,D=L):0<G&&(z+=Q*G,D+=R*G);Q=w-z;R=I-D;w=Q*Q+R*R;w>v&&(y=d,v=w)}2<v&&(p[y]=1,B.push(k),C.push(y),B.push(y),C.push(c));
k=B.pop();c=C.pop()}for(d=0;d<t;d++)p[d]&&H.push(h[2*d],h[2*d+1]);k=H;if(!(8>k.length)){if(m.wallColor&&(s=S.parse(m.wallColor)))l=s.setAlpha(N),r=""+l.setLightness(0.8),l=""+l;if(m.roofColor&&(s=S.parse(m.roofColor)))u=""+s.setAlpha(N);j.push({id:m.id,footprint:k,height:ra(n,U),minHeight:q,wallColor:l,altColor:r,roofColor:u,center:M(k)})}}f=0;for(m=j.length;f<m;f++)e=j[f],ta[e.id]||(e.scale=b?0:1,qa.renderItems.push(j[f]),ta[e.id]=1);O||(O=setInterval(function(){for(var a,b=!1,c=0,A=E.renderItems.length;c<
A;c++)a=E.renderItems[c],1>a.scale&&(a.scale+=0.1,1<a.scale&&(a.scale=1),b=!0);g();b||(clearInterval(O),O=null)},33))},Aa,ta={},qa={renderItems:[],load:function(a){Aa=a;qa.update()},update:function(){if(Aa&&!(15>P)){var A=a(D,K),d=a(D+u,K+w),c=0.0075*(A.latitude/0.0075<<0)+0.0075,g=0.015*(d.longitude/0.015<<0)+0.015,d=0.0075*(d.latitude/0.0075<<0),A=0.015*(A.longitude/0.015<<0);V.purge();qa.renderItems=[];ta={};for(var f,h,n;d<=c;d+=0.0075)for(f=A;f<=g;f+=0.015)n=d+","+f,(h=V.get(n))?ca(h):e(b(Aa,
{n:(1E4*(d+0.0075)<<0)/1E4,e:(1E4*(f+0.015)<<0)/1E4,s:(1E4*d<<0)/1E4,w:(1E4*f<<0)/1E4}),ia(n))}},set:function(a){qa.renderItems=[];ta={};Z(a)}};E=qa;var ka,va=function(a,b,c){return{x:a+ua.x*c,y:b+ua.y*c}},n,da=!0,ea=new S(0,0,0),fa=null,ua={x:0,y:0},Ba={setContext:function(a){n=a;Ba.setDate((new Date).setHours(10))},enable:function(a){da=!!a},render:function(){var b,d,c,e;n.clearRect(0,0,u,w);if(da&&!(P<z||la))if(b=a(D+x,K+y),b=Ha(fa,b.latitude,b.longitude),!(0>=b.altitude)){d=1/xa(b.altitude);c=
0.4/d;ua.x=Pa(b.azimuth)*d;ua.y=Oa(b.azimuth)*d;ea.a=c;e=ea+"";var g,f,h,t,j,m,p,l,q,k,s,r,v=[];n.beginPath();b=0;for(d=E.renderItems.length;b<d;b++){f=E.renderItems[b];l=!1;h=f.footprint;p=[];c=0;for(g=h.length-1;c<g;c+=2)p[c]=j=h[c]-D,p[c+1]=m=h[c+1]-K,l||(l=0<j&&j<u&&0<m&&m<w);if(l){h=1>f.scale?f.height*f.scale:f.height;f.minHeight&&(t=1>f.scale?f.minHeight*f.scale:f.minHeight);j=null;c=0;for(g=p.length-3;c<g;c+=2)m=p[c],q=p[c+1],l=p[c+2],k=p[c+3],s=va(m,q,h),r=va(l,k,h),f.minHeight&&(q=va(m,q,
t),k=va(l,k,t),m=q.x,q=q.y,l=k.x,k=k.y),(l-m)*(s.y-q)>(s.x-m)*(k-q)?(1===j&&n.lineTo(m,q),j=0,c||n.moveTo(m,q),n.lineTo(l,k)):(0===j&&n.lineTo(s.x,s.y),j=1,c||n.moveTo(s.x,s.y),n.lineTo(r.x,r.y));n.closePath();v.push(p)}}n.fillStyle=e;n.fill();n.globalCompositeOperation="destination-out";n.beginPath();b=0;for(d=v.length;b<d;b++){t=v[b];n.moveTo(t[0],t[1]);c=2;for(g=t.length;c<g;c+=2)n.lineTo(t[c],t[c+1]);n.lineTo(t[0],t[1]);n.closePath()}n.fillStyle="#00ff00";n.fill();n.globalCompositeOperation="source-over"}},
setDate:function(a){fa=a;Ba.render()}};ka=Ba;var sa,H,ga={MAX_HEIGHT:8,setContext:function(a){H=a},render:function(){H.clearRect(0,0,u,w);if(!(P<z||la)){var a,b,c,d,e,f,g,h,j;H.beginPath();a=0;for(b=E.renderItems.length;a<b;a++)if(c=E.renderItems[a],!(c.height>ga.MAX_HEIGHT)){j=!1;e=c.footprint;h=[];c=0;for(d=e.length-1;c<d;c+=2)h[c]=f=e[c]-D,h[c+1]=g=e[c+1]-K,j||(j=0<f&&f<u&&0<g&&g<w);if(j){c=0;for(d=h.length-3;c<d;c+=2)j=h[c],e=h[c+1],c?H.lineTo(j,e):H.moveTo(j,e);H.closePath()}}H.fillStyle=pa;
H.strokeStyle=oa;H.stroke();H.fill()}}};sa=ga;var Ca,Da=function(){var a=Ga.createElement("CANVAS");a.style.webkitTransform="translate3d(0,0,0)";a.style.imageRendering="optimizeSpeed";a.style.position="absolute";a.style.left=0;a.style.top=0;var b=a.getContext("2d");b.lineCap="round";b.lineJoin="round";b.lineWidth=1;b.mozImageSmoothingEnabled=!1;b.webkitImageSmoothingEnabled=!1;wa.push(a);X.appendChild(a);return b},X=Ga.createElement("DIV");X.style.pointerEvents="none";X.style.position="absolute";
X.style.left=0;X.style.top=0;var wa=[];ka.setContext(Da());sa.setContext(Da());C=Da();Ca={appendTo:function(a){a.appendChild(X);return X},setSize:function(a,b){for(var c=0,d=wa.length;c<d;c++)wa[c].width=a,wa[c].height=b}};var ha=this;if(window.DeviceMotionEvent){var Ea=Math.abs;window.addEventListener("devicemotion",function(a){var b;if(a=a.accelerationIncludingGravity||a.acceleration)if(2<Ea(a.x)||2<Ea(a.y)||2<Ea(a.z)){switch(window.orientation){case -90:b=a.x;a.x=a.y;a.y=-b;break;case 90:b=a.x;
a.x=-a.y;a.y=b;break;case 180:case -180:a.x*=-1,a.y*=-1}ha.setCamOffset(10*-a.x,10*-a.y);d()}})}window.addEventListener("mousemove",function(a){var b=Math.abs,c=u/2-a.x;a=w-a.y;if(2<b(c)||2<b(a))ha.setCamOffset(-c/3,-a/3),d()});this.setStyle=function(a){a=a||{};if(a.color||a.wallColor)L=S.parse(a.color||a.wallColor),I=L.setAlpha(N)+"",B=L.setLightness(0.8),oa=B.setAlpha(N)+"",aa=L.setLightness(1.2),pa=aa.setAlpha(N)+"";a.roofColor&&(aa=S.parse(a.roofColor),pa=aa.setAlpha(N)+"");void 0!==a.shadows&&
ka.enable(a.shadows);g();return this};this.setCamOffset=function(a,b){ma=x+a;na=w+b};this.setMaxZoom=function(a){T=a};this.setDate=function(a){ka.setDate(a);return this};this.appendTo=function(a){return Ca.appendTo(a)};this.loadData=function(a){E.load(a);return this};this.setData=function(a){E.set(a);return this};this.onMoveEnd=function(){g();E.update()};this.onZoomEnd=function(a){la=!1;v(a.zoom);E.update();g()};this.onZoomStart=function(){la=!0;g()};this.setOrigin=function(a,b){D=a;K=b};this.setSize=
function(a,b){u=a;w=b;x=u/2<<0;y=w/2<<0;ma=x;na=w;$=u/(1.5/(window.devicePixelRatio||1))/xa(45)<<0;Ca.setSize(u,w);U=$-50};this.setZoom=v;this.render=d};h.VERSION="0.1.8a";h.ATTRIBUTION='&copy; <a href="http://osmbuildings.org">OSM Buildings</a>';h.OSM_XAPI_URL="http://overpass-api.de/api/interpreter?data=[out:json];(way[%22building%22]({s},{w},{n},{e});node(w);way[%22building:part%22=%22yes%22]({s},{w},{n},{e});node(w);relation[%22building%22]({s},{w},{n},{e});way(r);node(w););out;";return h}();
OpenLayers.Layer.Buildings=OpenLayers.Class(OpenLayers.Layer,{CLASS_NAME:"OpenLayers.Layer.Buildings",name:"OSM Buildings",attribution:OSMBuildings.ATTRIBUTION,isBaseLayer:!1,alwaysInRange:!0,dxSum:0,dySum:0,initialize:function(f){f=f||{};f.projection="EPSG:900913";OpenLayers.Layer.prototype.initialize.call(this,this.name,f)},setOrigin:function(){var f=this.map.getLonLatFromPixel(new OpenLayers.Pixel(0,0)),M=this.map.resolution,r=this.maxExtent,Y=Math.round((f.lon-r.left)/M),f=Math.round((r.top-f.lat)/
M);this.osmb.setOrigin(Y,f)},setMap:function(f){this.map||OpenLayers.Layer.prototype.setMap.call(this,f);this.osmb||(this.osmb=new OSMBuildings,this.container=this.osmb.appendTo(this.div));this.osmb.setSize(this.map.size.w,this.map.size.h);this.osmb.setZoom(this.map.zoom);this.setOrigin()},removeMap:function(f){this.container.parentNode.removeChild(this.container);OpenLayers.Layer.prototype.removeMap.call(this,f)},onMapResize:function(){OpenLayers.Layer.prototype.onMapResize.call(this);this.osmb.onResize({width:this.map.size.w,
height:this.map.size.h})},moveTo:function(f,M,r){f=OpenLayers.Layer.prototype.moveTo.call(this,f,M,r);if(!r){r=parseInt(this.map.layerContainerDiv.style.left,10);var Y=parseInt(this.map.layerContainerDiv.style.top,10);this.div.style.left=-r+"px";this.div.style.top=-Y+"px"}this.setOrigin();this.dySum=this.dxSum=0;this.osmb.setCamOffset(this.dxSum,this.dySum);if(M)this.osmb.onZoomEnd({zoom:this.map.zoom});else this.osmb.onMoveEnd();return f},moveByPx:function(f,M){this.dxSum+=f;this.dySum+=M;var r=
OpenLayers.Layer.prototype.moveByPx.call(this,f,M);this.osmb.setCamOffset(this.dxSum,this.dySum);this.osmb.render();return r},setStyle:function(f){this.osmb.setStyle(f);return this},setDate:function(f){this.osmb.setDate(f);return this},load:function(f){this.osmb.loadData(f);return this},geoJSON:function(f){this.osmb.setData(f);return this}});
