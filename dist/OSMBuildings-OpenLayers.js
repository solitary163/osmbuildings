var OSMBuildings=function(){function Ka(a,c){var b=a[0]-c[0],e=a[1]-c[1];return b*b+e*e}function nb(a){for(var c=0,b=0,e=0,d=a.length-3;e<d;e+=2)c+=a[e],b+=a[e+1];a=(a.length-2)/2;return[c/a<<0,b/a<<0]}function sa(a,c){var b,e,d,f,h=0,g,k;g=0;for(k=a.length-3;g<k;g+=2)b=a[g],e=a[g+1],d=a[g+2],f=a[g+3],h+=b*f-d*e;if((0<h/2?"CW":"CCW")===c)return a;b=[];for(e=a.length-2;0<=e;e-=2)b.push(a[e],a[e+1]);return b}function ta(a,c){var b={};a/=T;c/=T;b[ob]=0>=c?90:1<=c?-90:pb*(2*qb(rb(U*(1-2*c)))-La);b[sb]=
360*(1===a?1:(a%1+1)%1)-180;return b}function tb(a,c,b){function e(a){if("XDomainRequest"in window&&a!==d.readyState&&(d.readyState=a,d.onreadystatechange))d.onreadystatechange()}a=a.replace(/\{ *([\w_]+) *\}/g,function(a,b){return c[b]||a});var d="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;d.onerror=function(){d.status=500;d.statusText="Error";e(4)};d.ontimeout=function(){d.status=408;d.statusText="Timeout";e(4)};d.onprogress=function(){e(3)};d.onload=function(){d.status=200;
d.statusText="Ok";e(4)};d.onreadystatechange=function(){4===d.readyState&&d.status&&!(200>d.status||299<d.status)&&b&&d.responseText&&b(JSON.parse(d.responseText))};e(0);d.open("GET",a);e(1);d.send(null);e(2);return d}function M(){V.render();ba.render();Ma()}function Ma(){t.clearRect(0,0,A,w);if(!(H<ca||da)){var a,c,b,e,d,f,h,g=ba.MAX_HEIGHT,k=[N+y,O+z],n=y,j=y+A,l=z,r=z+w,p,J,u,v;s.renderItems.sort(function(a,b){return Ka(b.center,k)/b.height-Ka(a.center,k)/a.height});a=0;for(c=s.renderItems.length;a<
c;a++)if(d=s.renderItems[a],!(d.height<=g)){f=!1;p=d.footprint;b=0;for(e=p.length-1;b<e;b+=2)f||(f=p[b]>n&&p[b]<j&&p[b+1]>l&&p[b+1]<r);if(f){b=1>d.scale?d.height*d.scale:d.height;f=W/(W-b);h=0;d.minHeight&&(b=1>d.scale?d.minHeight*d.scale:d.minHeight,h=W/(W-b));u=d.wallColor||ua;v=d.altColor||ea;p=Na(p,f,h,u,v);J=[];if(d.holes){b=0;for(e=d.holes.length;b<e;b++)J[b]=Na(d.holes[b],f,h,u,v)}t.fillStyle=d.roofColor||X;t.strokeStyle=v;Oa(p,!0,J)}}}}function Na(a,c,b,e,d){for(var f={x:0,y:0},h={x:0,y:0},
g,k,n=[],j=0,l=a.length-3;j<l;j+=2)f.x=a[j]-y,f.y=a[j+1]-z,h.x=a[j+2]-y,h.y=a[j+3]-z,g=fa(f.x,f.y,c),k=fa(h.x,h.y,c),b&&(f=fa(f.x,f.y,b),h=fa(h.x,h.y,b)),(h.x-f.x)*(g.y-f.y)>(g.x-f.x)*(h.y-f.y)&&(t.fillStyle=f.x<h.x&&f.y<h.y||f.x>h.x&&f.y>h.y?d:e,Oa([h.x,h.y,f.x,f.y,g.x,g.y,k.x,k.y])),n[j]=g.x,n[j+1]=g.y;return n}function Oa(a,c,b){if(a.length){var e,d,f,h;t.beginPath();t.moveTo(a[0],a[1]);e=2;for(d=a.length;e<d;e+=2)t.lineTo(a[e],a[e+1]);if(b){e=0;for(d=b.length;e<d;e++){a=b[e];t.moveTo(a[0],a[1]);
f=2;for(h=a.length;f<h;f+=2)t.lineTo(a[f],a[f+1])}}t.closePath();c&&t.stroke();t.fill()}}function fa(a,c,b){return{x:(a-N)*b+N<<0,y:(c-O)*b+O<<0}}function Pa(a,c){A=a;w=c;Y=A/2<<0;Qa=w/2<<0;N=Y;O=w;ga.setSize(A,w);va=W-50}function Ra(a){H=a;T=ub<<H;a=H;var c=ca,b=wa;a=ha(xa(a,c),b);B=1-ha(xa(0+0.3*((a-c)/(b-c)),0),0.3);ua=I.setAlpha(B)+"";ea=ia.setAlpha(B)+"";X=P.setAlpha(B)+""}var Sa=Sa||Array,Ta=Ta||Array,C=Math,rb=C.exp,vb=C.log,wb=C.sin,xb=C.cos,Ua=C.tan,qb=C.atan,ha=C.min,xa=C.max,Va=C.ceil,
Wa=C.floor,Xa=document,K,Ya=function(a){var c,b,e;if(0===a.s)c=b=e=a.l;else{e=0.5>a.l?a.l*(1+a.s):a.l+a.s-a.l*a.s;var d=2*a.l-e;a.h/=360;c=ya(d,e,a.h+1/3);b=ya(d,e,a.h);e=ya(d,e,a.h-1/3)}return new F(255*c<<0,255*b<<0,255*e<<0,a.a)},ya=function(a,c,b){0>b&&(b+=1);1<b&&(b-=1);return b<1/6?a+6*(c-a)*b:0.5>b?c:b<2/3?a+6*(c-a)*(2/3-b):a},F=function(a,c,b,e){this.r=a;this.g=c;this.b=b;this.a=4>arguments.length?1:e},za=F.prototype;za.toString=function(){return"rgba("+[this.r<<0,this.g<<0,this.b<<0,this.a.toFixed(2)].join()+
")"};za.setLightness=function(a){var c=F.toHSLA(this);c.l*=a;c.l=Math.min(1,Math.max(0,c.l));return Ya(c)};za.setAlpha=function(a){return new F(this.r,this.g,this.b,this.a*a)};F.parse=function(a){var c;a+="";if(~a.indexOf("#")&&(c=a.match(/^#?(\w{2})(\w{2})(\w{2})(\w{2})?$/)))return new F(parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16),c[4]?parseInt(c[4],16)/255:1);if(c=a.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))return new F(parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10),
c[4]?parseFloat(c[5]):1);if(c=a.match(/hsla?\(([\d.]+)\D+([\d.]+)\D+([\d.]+)(\D+([\d.]+))?\)/))return Ya({h:parseInt(c[1],10),s:parseFloat(c[2]),l:parseFloat(c[3]),a:c[4]?parseFloat(c[5]):1})};F.toHSLA=function(a){var c=a.r/255,b=a.g/255,e=a.b/255,d=Math.max(c,b,e),f=Math.min(c,b,e),h,g=(d+f)/2,k;if(d===f)h=f=0;else{k=d-f;f=0.5<g?k/(2-d-f):k/(d+f);switch(d){case c:h=(b-e)/k+(b<e?6:0);break;case b:h=(e-c)/k+2;break;case e:h=(c-b)/k+4}h/=6}return{h:360*h,s:f,l:g,a:a.a}};K=F;var Za,Q=Math,Aa=Q.PI,x=
Q.sin,G=Q.cos,$a=Q.tan,ab=Q.asin,bb=Q.atan2,L=Aa/180,ja=23.4397*L;Za=function(a,c,b){b=L*-b;c*=L;a=a.valueOf()/864E5-0.5+2440588-2451545;var e=L*(357.5291+0.98560028*a),d=L*(1.9148*x(e)+0.02*x(2*e)+3E-4*x(3*e)),d=e+d+102.9372*L+Aa,e=ab(x(0)*G(ja)+G(0)*x(ja)*x(d)),d=bb(x(d)*G(ja)-$a(0)*x(ja),G(d));b=L*(280.16+360.9856235*a)-b-d;return{altitude:ab(x(c)*x(e)+G(c)*G(e)*G(b)),azimuth:bb(x(b),G(b)*x(c)-$a(e)*G(c))-Aa/2}};var cb,ka=function(a){var c=parseFloat(a);return~a.indexOf("m")?c<<0:~a.indexOf("yd")?
c*yb<<0:~a.indexOf("ft")?c*db<<0:~a.indexOf("'")?(a=a.split("'"),a[0]*db+a[1]*zb<<0):c<<0},Z=function(a){a=a.toLowerCase();return"#"===a[0]?a:Ab[Bb[a]||a]||null},eb=function(a){return(a=a.tags)&&!a.landuse&&(a.building||a["building:part"])&&(!a.layer||0<=a.layer)},Ca=function(a){if(a){for(var c=[],b,e=0,d=a.length;e<d;e++)b=Ba[a[e]],c.push(b[0],b[1]);c[c.length-2]!==c[0]&&c[c.length-1]!==c[1]&&c.push(c[0],c[1]);if(!(8>c.length))return c}},Da=function(a){var c=0,b=0;a.height&&(c=ka(a.height));!c&&
a["building:height"]&&(c=ka(a["building:height"]));!c&&a.levels&&(c=a.levels*la<<0);!c&&a["building:levels"]&&(c=a["building:levels"]*la<<0);a.min_height&&(b=ka(a.min_height));!b&&a["building:min_height"]&&(b=ka(a["building:min_height"]));!b&&a.min_level&&(b=a.min_level*la<<0);!b&&a["building:min_level"]&&(b=a["building:min_level"]*la<<0);var e,d;a["building:material"]&&(e=Z(a["building:material"]));a["building:facade:material"]&&(e=Z(a["building:facade:material"]));a["building:cladding"]&&(e=Z(a["building:cladding"]));
a["building:color"]&&(e=a["building:color"]);a["building:colour"]&&(e=a["building:colour"]);a["roof:material"]&&(d=Z(a["roof:material"]));a["building:roof:material"]&&(d=Z(a["building:roof:material"]));a["roof:color"]&&(d=a["roof:color"]);a["roof:colour"]&&(d=a["roof:colour"]);a["building:roof:color"]&&(d=a["building:roof:color"]);a["building:roof:colour"]&&(d=a["building:roof:colour"]);return{height:c,minHeight:b,wallColor:e,roofColor:d}},fb=function(a,c,b,e){a={id:a,footprint:sa(b,"CW"),holes:e};
c.height&&(a.height=c.height);c.minHeight&&(a.minHeight=c.minHeight);c.wallColor&&(a.wallColor=c.wallColor);c.roofColor&&(a.roofColor=c.roofColor);e&&(a.holes=e);Ea.push(a)},yb=0.9144,db=0.3048,zb=0.0254,la=3,Bb={asphalt:"tar_paper",bitumen:"tar_paper",block:"stone",bricks:"brick",glas:"glass",glassfront:"glass",grass:"plants",masonry:"stone",granite:"stone",panels:"panel",paving_stones:"stone",plastered:"plaster",rooftiles:"roof_tiles",roofingfelt:"tar_paper",sandstone:"stone",sheet:"canvas",sheets:"canvas",
shingle:"tar_paper",shingles:"tar_paper",slates:"slate",steel:"metal",tar:"tar_paper",tent:"canvas",thatch:"plants",tile:"roof_tiles",tiles:"roof_tiles"},Ab={brick:"#cc7755",bronze:"#ffeecc",canvas:"#fff8f0",concrete:"#999999",copper:"#a0e0d0",glass:"#e8f8f8",gold:"#ffcc00",plants:"#009933",metal:"#aaaaaa",panel:"#fff8f0",plaster:"#999999",roof_tiles:"#f08060",silver:"#cccccc",slate:"#666666",stone:"#996666",tar_paper:"#333333",wood:"#deb887"},Ba,$,Ea;cb=function(a){Ba={};$={};Ea=[];for(var c,b=0,
e=a.length;b<e;b++)switch(c=a[b],c.type){case "node":Ba[c.id]=[c.lat,c.lon];break;case "way":var d=void 0,f=void 0;if(eb(c))d=Da(c.tags),(f=Ca(c.nodes))&&fb(c.id,d,f);else if(d=c.tags,!d||!d.highway&&!d.railway&&!d.landuse)$[c.id]=c;break;case "relation":var f=c,h=void 0,g=void 0;c=[];var k=void 0,n=void 0,d=void 0;if(eb(f)&&("multipolygon"===f.tags.type||"building"===f.tags.type)){for(var h=f.members,n=g=void 0,k=[],j=0,l=h.length;j<l;j++)g=h[j],"way"===g.type&&$[g.ref]&&(!g.role||"outer"===g.role?
n=$[g.ref]:("inner"===g.role||"enclave"===g.role)&&k.push($[g.ref]));h=n&&n.tags?{outer:n,inner:k}:void 0;if(h&&(j=Da(f.tags),g=h.outer))if(k=Da(g.tags),n=Ca(g.nodes)){f=k;k=j;j=void 0;for(j in k)f[j]||(f[j]=k[j]);k=f;f=0;for(j=h.inner.length;f<j;f++)(d=Ca(h.inner[f].nodes))&&c.push(sa(d,"CCW"));fb(g.id,k,n,c.length?c:null)}}}return Ea};var U=Math.PI,La=U/2,Cb=U/4,pb=180/U,ub=256,ob="latitude",sb="longitude",A=0,w=0,Y=0,Qa=0,y=0,z=0,H,T,t,I=new K(200,190,180),ia=I.setLightness(0.8),P=I.setLightness(1.2),
ua=I+"",ea=ia+"",X=P+"",ma,B=1,ca=15,wa=20,va,N,O,W=450,da,Fa=new Date,R={},Ga={add:function(a,c){R[a]={data:c,time:Date.now()}},get:function(a){return R[a]&&R[a].data},purge:function(){Fa.setMinutes(Fa.getMinutes()-5);for(var a in R)R[a].time<Fa&&delete R[a]}},s,Db=function(a){return function(c){gb(c,a)}},gb=function(a,c){if(a){var b;if("FeatureCollection"===a.type){b=a.features;var e,d,f,h,g,k,n=[],j,l,r,p,J,u,v,m;e=0;for(d=b.length;e<d;e++)if(j=b[e],"Feature"===j.type&&(l=j.geometry,j=j.properties,
"LineString"===l.type&&(u=r.length-1,r[0][0]===r[u][0]&&r[0][1]===r[u][1]&&(r=l.coordinates)),"Polygon"===l.type&&(r=l.coordinates),"MultiPolygon"===l.type&&(r=l.coordinates[0]),r)){if(j.color||j.wallColor)p=j.color||j.wallColor;j.roofColor&&(J=j.roofColor);l=r[0];m=[];v=j.height;f=u=0;for(h=l.length;f<h;f++)m.push(l[f][1],l[f][0]),u+=v||l[f][2]||0;v=[];f=1;for(h=r.length;f<h;f++){l=r[e];v[f-1]=[];g=0;for(k=l.length;g<k;g++)v[f-1].push(l[g][1],l[g][0])}f={id:j.id||m[0]+","+m[1],footprint:sa(m,"CW")};
u&&(f.height=u/l.length<<0);j.minHeight&&(f.minHeight=j.minHeight);p&&(f.wallColor=p);J&&(f.roofColor=J);v.length&&(f.holes=v);n.push(f)}b=n}else a.osm3s&&(b=cb(a.elements));c&&Ga.add(c,b);hb(b,!0)}},ib=function(a){for(var c,b,e=new Sa(a.length),d=0,f=a.length-1;d<f;d+=2)c=a[d+1],b=ha(1,xa(0,0.5-vb(Ua(Cb+La*a[d]/180))/U/2)),c=(c/360+0.5)*T<<0,b=b*T<<0,e[d]=c,e[d+1]=b;a=e;e=a.length/2;d=new Ta(e);f=0;c=e-1;var h,g,k,n=[],j=[],l=[];for(d[f]=d[c]=1;c;){h=0;for(b=f+1;b<c;b++){g=a[2*b];var r=a[2*b+1],
p=a[2*f],m=a[2*f+1],u=a[2*c],v=a[2*c+1],s=u-p,q=v-m,t=void 0;if(0!==s||0!==q)t=((g-p)*s+(r-m)*q)/(s*s+q*q),1<t?(p=u,m=v):0<t&&(p+=s*t,m+=q*t);s=g-p;q=r-m;g=s*s+q*q;g>h&&(k=b,h=g)}2<h&&(d[k]=1,n.push(f),j.push(k),n.push(k),j.push(c));f=n.pop();c=j.pop()}for(b=0;b<e;b++)d[b]&&l.push(a[2*b],a[2*b+1]);e=l;if(!(8>e.length))return e},hb=function(a,c){var b,e,d,f,h=[],g,k,n,j,l,m,p,q,u=wa-H;b=0;for(e=a.length;b<e;b++)if(g=a[b],k=1*(g.height||5)>>u)if(n=1*g.minHeight>>u,!(n>va)&&(j=ib(g.footprint))){p=[];
if(g.holes){d=0;for(f=g.holes.length;d<f;d++)(q=ib(g.holes[d]))&&p.push(q)}f=d=null;if(g.wallColor&&(l=K.parse(g.wallColor)))d=l.setAlpha(B),f=""+d.setLightness(0.8),d=""+d;m=null;if(g.roofColor&&(l=K.parse(g.roofColor)))m=""+l.setAlpha(B);h.push({id:g.id,footprint:j,height:ha(k,va),minHeight:n,wallColor:d,altColor:f,roofColor:m,center:nb(j),holes:p.length?p:null})}e=0;for(g=h.length;e<g;e++)b=h[e],na[b.id]||(b.scale=c?0:1,aa.renderItems.push(h[e]),na[b.id]=1);ma||(ma=setInterval(function(){for(var a,
b=!1,c=0,d=s.renderItems.length;c<d;c++)a=s.renderItems[c],1>a.scale&&(a.scale+=0.1,1<a.scale&&(a.scale=1),b=!0);M();b||(clearInterval(ma),ma=null)},33))},Ha,na={},aa={renderItems:[],load:function(a){Ha=a||"http://overpass-api.de/api/interpreter?data=[out:json];(way[%22building%22]({s},{w},{n},{e});node(w);way[%22building:part%22=%22yes%22]({s},{w},{n},{e});node(w);relation[%22building%22]({s},{w},{n},{e});way(r);node(w););out;";aa.update()},update:function(){if(Ha&&!(15>H)){var a=ta(y,z),c=ta(y+
A,z+w),b=0.0075*Va(a.latitude/0.0075),e=0.015*Va(c.longitude/0.015),c=0.0075*Wa(c.latitude/0.0075),a=0.015*Wa(a.longitude/0.015);Ga.purge();aa.renderItems=[];na={};for(var d,f,h;c<=b;c+=0.0075)for(d=a;d<=e;d+=0.015)h=c+","+d,(f=Ga.get(h))?hb(f):tb(Ha,{n:(1E4*(c+0.0075)<<0)/1E4,e:(1E4*(d+0.015)<<0)/1E4,s:(1E4*c<<0)/1E4,w:(1E4*d<<0)/1E4},Db(h))}},set:function(a){aa.renderItems=[];na={};gb(a)}};s=aa;var V,pa=function(a,c,b){return{x:a+oa.x*b,y:c+oa.y*b}},m,jb=!0,kb=new K(0,0,0),lb=null,oa={x:0,y:0},
Ia={setContext:function(a){m=a;Ia.setDate((new Date).setHours(10))},enable:function(a){jb=!!a},render:function(){var a,c,b,e;m.clearRect(0,0,A,w);if(jb&&!(H<ca||da))if(a=ta(y+Y,z+Qa),a=Za(lb,a.latitude,a.longitude),!(0>=a.altitude)){c=1/Ua(a.altitude);b=0.4/c;oa.x=xb(a.azimuth)*c;oa.y=wb(a.azimuth)*c;kb.a=b;e=kb+"";var d,f,h,g,k,n,j,l,r,p,q,u,t=[];m.beginPath();a=0;for(c=s.renderItems.length;a<c;a++){f=s.renderItems[a];l=!1;h=f.footprint;j=[];b=0;for(d=h.length-1;b<d;b+=2)j[b]=k=h[b]-y,j[b+1]=n=h[b+
1]-z,l||(l=0<k&&k<A&&0<n&&n<w);if(l){h=1>f.scale?f.height*f.scale:f.height;f.minHeight&&(g=1>f.scale?f.minHeight*f.scale:f.minHeight);k=null;b=0;for(d=j.length-3;b<d;b+=2)n=j[b],r=j[b+1],l=j[b+2],p=j[b+3],q=pa(n,r,h),u=pa(l,p,h),f.minHeight&&(r=pa(n,r,g),p=pa(l,p,g),n=r.x,r=r.y,l=p.x,p=p.y),(l-n)*(q.y-r)>(q.x-n)*(p-r)?(1===k&&m.lineTo(n,r),k=0,b||m.moveTo(n,r),m.lineTo(l,p)):(0===k&&m.lineTo(q.x,q.y),k=1,b||m.moveTo(q.x,q.y),m.lineTo(u.x,u.y));m.closePath();t.push(j)}}m.fillStyle=e;m.fill();m.globalCompositeOperation=
"destination-out";m.beginPath();a=0;for(c=t.length;a<c;a++){g=t[a];m.moveTo(g[0],g[1]);b=2;for(d=g.length;b<d;b+=2)m.lineTo(g[b],g[b+1]);m.lineTo(g[0],g[1]);m.closePath()}m.fillStyle="#00ff00";m.fill();m.globalCompositeOperation="source-over"}},setDate:function(a){lb=a;Ia.render()}};V=Ia;var ba,D,mb={MAX_HEIGHT:8,setContext:function(a){D=a},render:function(){D.clearRect(0,0,A,w);if(!(H<ca||da)){var a,c,b,e,d,f,h,g,k;D.beginPath();a=0;for(c=s.renderItems.length;a<c;a++)if(b=s.renderItems[a],!(b.height>
mb.MAX_HEIGHT)){k=!1;d=b.footprint;g=[];b=0;for(e=d.length-1;b<e;b+=2)g[b]=f=d[b]-y,g[b+1]=h=d[b+1]-z,k||(k=0<f&&f<A&&0<h&&h<w);if(k){b=0;for(e=g.length-3;b<e;b+=2)k=g[b],d=g[b+1],b?D.lineTo(k,d):D.moveTo(k,d);D.closePath()}}D.fillStyle=X;D.strokeStyle=ea;D.stroke();D.fill()}}};ba=mb;var ga,Ja=function(){var a=Xa.createElement("CANVAS");a.style.webkitTransform="translate3d(0,0,0)";a.style.imageRendering="optimizeSpeed";a.style.position="absolute";a.style.left=0;a.style.top=0;var c=a.getContext("2d");
c.lineCap="round";c.lineJoin="round";c.lineWidth=1;c.mozImageSmoothingEnabled=!1;c.webkitImageSmoothingEnabled=!1;qa.push(a);E.appendChild(a);return c},E=Xa.createElement("DIV");E.style.pointerEvents="none";E.style.position="absolute";E.style.left=0;E.style.top=0;var qa=[];V.setContext(Ja());ba.setContext(Ja());t=Ja();ga={appendTo:function(a){a.appendChild(E)},remove:function(){E.parentNode.removeChild(E)},setSize:function(a,c){for(var b=0,e=qa.length;b<e;b++)qa[b].width=a,qa[b].height=c},setPosition:function(a,
c){E.style.left=a+"px";E.style.top=c+"px"}};var S=OpenLayers.Layer.prototype,ra=function(a){this.dySum=this.dxSum=0;S.initialize.call(this,this.name,{projection:"EPSG:900913"});a.addLayer(this)},q=ra.prototype=new OpenLayers.Layer;q.name="OSM Buildings";q.attribution='&copy; <a href="http://osmbuildings.org">OSM Buildings</a>';q.isBaseLayer=!1;q.alwaysInRange=!0;q.setOrigin=function(){var a=this.map,c=a.getLonLatFromPixel(new OpenLayers.Pixel(0,0)),b=a.resolution,e=this.maxExtent,a=Math.round((c.lon-
e.left)/b),c=Math.round((e.top-c.lat)/b);y=a;z=c};q.setMap=function(a){this.map||S.setMap.call(this,a);ga.appendTo(this.div);wa=a.baseLayer.numZoomLevels;Pa(a.size.w,a.size.h);Ra(a.zoom);this.setOrigin();s.update();M()};q.removeMap=function(a){ga.remove();S.removeMap.call(this,a);this.map=null};q.onMapResize=function(){var a=this.map;S.onMapResize.call(this);Pa(a.size.w,a.size.h);M();s.update()};q.moveTo=function(a,c,b){var e=this.map;a=S.moveTo.call(this,a,c,b);if(!b){b=parseInt(e.layerContainerDiv.style.left,
10);var d=parseInt(e.layerContainerDiv.style.top,10);this.div.style.left=-b+"px";this.div.style.top=-d+"px"}this.setOrigin();b=this.dySum=this.dxSum=0;N=Y+this.dxSum;O=w+b;c?(c=e.zoom,da=!1,Ra(c),s.update(),M()):(M(),s.update());return a};q.moveByPx=function(a,c){this.dxSum+=a;this.dySum+=c;var b=S.moveByPx.call(this,a,c),e=this.dySum;N=Y+this.dxSum;O=w+e;Ma();return b};q.setStyle=function(a){a=a||{};if(a.color||a.wallColor)I=K.parse(a.color||a.wallColor),ua=I.setAlpha(B)+"",ia=I.setLightness(0.8),
ea=ia.setAlpha(B)+"",P=I.setLightness(1.2),X=P.setAlpha(B)+"";a.roofColor&&(P=K.parse(a.roofColor),X=P.setAlpha(B)+"");void 0!==a.shadows&&V.enable(a.shadows);M();return this};q.setDate=function(a){V.setDate(a);return this};q.loadData=function(a){s.load(a);return this};q.setData=function(a){s.set(a);return this};ra.VERSION="0.1.8a";ra.ATTRIBUTION='&copy; <a href="http://osmbuildings.org">OSM Buildings</a>';return ra}();
