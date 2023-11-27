import{BufferAttribute as e,Vector3 as t,Vector2 as n,Plane as r,Line3 as i,Triangle as o,Sphere as s,Matrix4 as a,BackSide as l,DoubleSide as u,Box3 as c,FrontSide as d,Object3D as f,BufferGeometry as p,Group as h,LineBasicMaterial as m,MeshBasicMaterial as x,Ray as $,Mesh as g,RGBAFormat as y,RGFormat as b,RedFormat as v,RGBAIntegerFormat as _,RGIntegerFormat as T,RedIntegerFormat as B,DataTexture as w,NearestFilter as I,IntType as A,UnsignedIntType as S,FloatType as P,UnsignedByteType as N,UnsignedShortType as E,ByteType as M,ShortType as F,Vector4 as D,Matrix3 as V}from"three";let CENTER=0,AVERAGE=1,SAH=2,NOT_INTERSECTED=0,INTERSECTED=1,CONTAINED=2,TRIANGLE_INTERSECT_COST=1.25,TRAVERSAL_COST=1,BYTES_PER_NODE=32,IS_LEAFNODE_FLAG=65535,FLOAT32_EPSILON=5960464477539063e-23;class MeshBVHNode{constructor(){}}function arrayToBox(e,t,n){return n.min.x=t[e],n.min.y=t[e+1],n.min.z=t[e+2],n.max.x=t[e+3],n.max.y=t[e+4],n.max.z=t[e+5],n}function getLongestEdgeIndex(e){let t=-1,n=-1/0;for(let r=0;r<3;r++){let i=e[r+3]-e[r];i>n&&(n=i,t=r)}return t}function copyBounds(e,t){t.set(e)}function unionBounds(e,t,n){let r,i;for(let o=0;o<3;o++){let s=o+3;r=e[o],i=t[o],n[o]=r<i?r:i,r=e[s],i=t[s],n[s]=r>i?r:i}}function expandByTriangleBounds(e,t,n){for(let r=0;r<3;r++){let i=t[e+2*r],o=t[e+2*r+1],s=i-o,a=i+o;s<n[r]&&(n[r]=s),a>n[r+3]&&(n[r+3]=a)}}function computeSurfaceArea(e){let t=e[3]-e[0],n=e[4]-e[1],r=e[5]-e[2];return 2*(t*n+n*r+r*t)}function ensureIndex(t,n){if(!t.index){let r=t.attributes.position.count,i=n.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,o;o=r>65535?new Uint32Array(new i(4*r)):new Uint16Array(new i(2*r)),t.setIndex(new e(o,1));for(let s=0;s<r;s++)o[s]=s}}function getRootIndexRanges(e){if(!e.groups||!e.groups.length)return[{offset:0,count:e.index.count/3}];let t=[],n=new Set;for(let r of e.groups)n.add(r.start),n.add(r.start+r.count);let i=Array.from(n.values()).sort((e,t)=>e-t);for(let o=0;o<i.length-1;o++){let s=i[o],a=i[o+1];t.push({offset:s/3,count:(a-s)/3})}return t}function getBounds(e,t,n,r,i=null){let o=1/0,s=1/0,a=1/0,l=-1/0,u=-1/0,c=-1/0,d=1/0,f=1/0,p=1/0,h=-1/0,m=-1/0,x=-1/0,$=null!==i;for(let g=6*t,y=(t+n)*6;g<y;g+=6){let b=e[g+0],v=e[g+1],_=b-v,T=b+v;_<o&&(o=_),T>l&&(l=T),$&&b<d&&(d=b),$&&b>h&&(h=b);let B=e[g+2],w=e[g+3],I=B-w,A=B+w;I<s&&(s=I),A>u&&(u=A),$&&B<f&&(f=B),$&&B>m&&(m=B);let S=e[g+4],P=e[g+5],N=S-P,E=S+P;N<a&&(a=N),E>c&&(c=E),$&&S<p&&(p=S),$&&S>x&&(x=S)}r[0]=o,r[1]=s,r[2]=a,r[3]=l,r[4]=u,r[5]=c,$&&(i[0]=d,i[1]=f,i[2]=p,i[3]=h,i[4]=m,i[5]=x)}function getCentroidBounds(e,t,n,r){let i=1/0,o=1/0,s=1/0,a=-1/0,l=-1/0,u=-1/0;for(let c=6*t,d=(t+n)*6;c<d;c+=6){let f=e[c+0];f<i&&(i=f),f>a&&(a=f);let p=e[c+2];p<o&&(o=p),p>l&&(l=p);let h=e[c+4];h<s&&(s=h),h>u&&(u=h)}r[0]=i,r[1]=o,r[2]=s,r[3]=a,r[4]=l,r[5]=u}function partition(e,t,n,r,i){let o=n,s=n+r-1,a=i.pos,l=2*i.axis;for(;;){for(;o<=s&&t[6*o+l]<a;)o++;for(;o<=s&&t[6*s+l]>=a;)s--;if(!(o<s))return o;for(let u=0;u<3;u++){let c=e[3*o+u];e[3*o+u]=e[3*s+u],e[3*s+u]=c;let d=t[6*o+2*u+0];t[6*o+2*u+0]=t[6*s+2*u+0],t[6*s+2*u+0]=d;let f=t[6*o+2*u+1];t[6*o+2*u+1]=t[6*s+2*u+1],t[6*s+2*u+1]=f}o++,s--}}let BIN_COUNT=32,binsSort=(e,t)=>e.candidate-t.candidate,sahBins=Array(32).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),leftBounds=new Float32Array(6);function getOptimalSplit(e,t,n,r,i,o){let s=-1,a=0;if(o===CENTER)-1!==(s=getLongestEdgeIndex(t))&&(a=(t[s]+t[s+3])/2);else if(o===AVERAGE)-1!==(s=getLongestEdgeIndex(e))&&(a=getAverage(n,r,i,s));else if(o===SAH){let l=computeSurfaceArea(e),u=1.25*i,c=6*r,d=(r+i)*6;for(let f=0;f<3;f++){let p=t[f],h=t[f+3],m=h-p,x=m/32;if(i<8){let $=[...sahBins];$.length=i;let g=0;for(let y=c;y<d;y+=6,g++){let b=$[g];b.candidate=n[y+2*f],b.count=0;let{bounds:v,leftCacheBounds:_,rightCacheBounds:T}=b;for(let B=0;B<3;B++)T[B]=1/0,T[B+3]=-1/0,_[B]=1/0,_[B+3]=-1/0,v[B]=1/0,v[B+3]=-1/0;expandByTriangleBounds(y,n,v)}$.sort(binsSort);let w=i;for(let I=0;I<w;I++){let A=$[I];for(;I+1<w&&$[I+1].candidate===A.candidate;)$.splice(I+1,1),w--}for(let S=c;S<d;S+=6){let P=n[S+2*f];for(let N=0;N<w;N++){let E=$[N];P>=E.candidate?expandByTriangleBounds(S,n,E.rightCacheBounds):(expandByTriangleBounds(S,n,E.leftCacheBounds),E.count++)}}for(let M=0;M<w;M++){let F=$[M],D=F.count,V=i-F.count,O=F.leftCacheBounds,z=F.rightCacheBounds,C=0;0!==D&&(C=computeSurfaceArea(O)/l);let R=0;0!==V&&(R=computeSurfaceArea(z)/l);let H=1+1.25*(C*D+R*V);H<u&&(s=f,u=H,a=F.candidate)}}else{for(let k=0;k<32;k++){let U=sahBins[k];U.count=0,U.candidate=p+x+k*x;let G=U.bounds;for(let L=0;L<3;L++)G[L]=1/0,G[L+3]=-1/0}for(let q=c;q<d;q+=6){let X=n[q+2*f],W=X-p,Y=~~(W/x);Y>=32&&(Y=31);let Z=sahBins[Y];Z.count++,expandByTriangleBounds(q,n,Z.bounds)}let j=sahBins[31];copyBounds(j.bounds,j.rightCacheBounds);for(let K=30;K>=0;K--){let J=sahBins[K],Q=sahBins[K+1];unionBounds(J.bounds,Q.rightCacheBounds,J.rightCacheBounds)}let ee=0;for(let et=0;et<31;et++){let en=sahBins[et],er=en.count,ei=en.bounds,eo=sahBins[et+1],es=eo.rightCacheBounds;0!==er&&(0===ee?copyBounds(ei,leftBounds):unionBounds(ei,leftBounds,leftBounds));let ea=0,el=0;0!==(ee+=er)&&(ea=computeSurfaceArea(leftBounds)/l);let eu=i-ee;0!==eu&&(el=computeSurfaceArea(es)/l);let ec=1+1.25*(ea*ee+el*eu);ec<u&&(s=f,u=ec,a=en.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${o} used.`);return{axis:s,pos:a}}function getAverage(e,t,n,r){let i=0;for(let o=t,s=t+n;o<s;o++)i+=e[6*o+2*r];return i/n}function computeTriangleBounds(e,t){let n=e.attributes.position,r=e.index.array,i=r.length/3,o=new Float32Array(6*i),s=n.normalized,a=n.array,l=n.offset||0,u=3;n.isInterleavedBufferAttribute&&(u=n.data.stride);let c=["getX","getY","getZ"];for(let d=0;d<i;d++){let f=3*d,p=6*d,h,m,x;s?(h=r[f+0],m=r[f+1],x=r[f+2]):(h=r[f+0]*u+l,m=r[f+1]*u+l,x=r[f+2]*u+l);for(let $=0;$<3;$++){let g,y,b;s?(g=n[c[$]](h),y=n[c[$]](m),b=n[c[$]](x)):(g=a[h+$],y=a[m+$],b=a[x+$]);let v=g;y<v&&(v=y),b<v&&(v=b);let _=g;y>_&&(_=y),b>_&&(_=b);let T=(_-v)/2,B=2*$;o[p+B+0]=v+T,o[p+B+1]=T+(Math.abs(v)+T)*5960464477539063e-23,v<t[$]&&(t[$]=v),_>t[$+3]&&(t[$+3]=_)}}return o}function buildTree(e,t){function n(e){f&&f(e/p)}function r(t,i,f,p=null,m=0){if(!h&&m>=l&&(h=!0,u&&(console.warn(`MeshBVH: Max depth of ${l} reached when generating BVH. Consider increasing maxDepth.`),console.warn(e))),f<=c||m>=l)return n(i+f),t.offset=i,t.count=f,t;let x=getOptimalSplit(t.boundingData,p,s,i,f,d);if(-1===x.axis)return n(i+f),t.offset=i,t.count=f,t;let $=partition(a,s,i,f,x);if($===i||$===i+f)n(i+f),t.offset=i,t.count=f;else{t.splitAxis=x.axis;let g=new MeshBVHNode,y=i,b=$-i;t.left=g,g.boundingData=new Float32Array(6),getBounds(s,y,b,g.boundingData,o),r(g,y,b,o,m+1);let v=new MeshBVHNode,_=$,T=f-b;t.right=v,v.boundingData=new Float32Array(6),getBounds(s,_,T,v.boundingData,o),r(v,_,T,o,m+1)}return t}ensureIndex(e,t);let i=new Float32Array(6),o=new Float32Array(6),s=computeTriangleBounds(e,i),a=e.index.array,l=t.maxDepth,u=t.verbose,c=t.maxLeafTris,d=t.strategy,f=t.onProgress,p=e.index.count/3,h=!1,m=[],x=getRootIndexRanges(e);if(1===x.length){let $=x[0],g=new MeshBVHNode;g.boundingData=i,getCentroidBounds(s,$.offset,$.count,o),r(g,$.offset,$.count,o),m.push(g)}else for(let y of x){let b=new MeshBVHNode;b.boundingData=new Float32Array(6),getBounds(s,y.offset,y.count,b.boundingData,o),r(b,y.offset,y.count,o),m.push(b)}return m}function buildPackedTree(e,t){let n=buildTree(e,t),r,i,o,s=[],a=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer;for(let l=0;l<n.length;l++){let u=n[l],c=f(u),d=new a(32*c);r=new Float32Array(d),i=new Uint32Array(d),o=new Uint16Array(d),p(0,u),s.push(d)}return s;function f(e){return e.count?1:1+f(e.left)+f(e.right)}function p(e,t){let n=e/4,s=e/2,a=!!t.count,l=t.boundingData;for(let u=0;u<6;u++)r[n+u]=l[u];if(a){let c=t.offset,d=t.count;return i[n+6]=c,o[s+14]=d,o[s+15]=65535,e+32}{let f=t.left,h=t.right,m=t.splitAxis,x;if((x=p(e+32,f))/4>4294967296)throw Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return i[n+6]=x/4,x=p(x,h),i[n+7]=m,x}}}class SeparatingAxisBounds{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let i=0,o=e.length;i<o;i++){let s=e[i],a=s[t];n=a<n?a:n,r=a>r?a:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let i=0,o=t.length;i<o;i++){let s=t[i],a=e.dot(s);n=a<n?a:n,r=a>r?a:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}}SeparatingAxisBounds.prototype.setFromBox=function(){let e=new t;return function t(n,r){let i=r.min,o=r.max,s=1/0,a=-1/0;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let c=0;c<=1;c++){e.x=i.x*l+o.x*(1-l),e.y=i.y*u+o.y*(1-u),e.z=i.z*c+o.z*(1-c);let d=n.dot(e);s=Math.min(d,s),a=Math.max(d,a)}this.min=s,this.max=a}}();let areIntersecting=function(){let e=new SeparatingAxisBounds;return function t(n,r){let i=n.points,o=n.satAxes,s=n.satBounds,a=r.points,l=r.satAxes,u=r.satBounds;for(let c=0;c<3;c++){let d=s[c],f=o[c];if(e.setFromPoints(f,a),d.isSeparated(e))return!1}for(let p=0;p<3;p++){let h=u[p],m=l[p];if(e.setFromPoints(m,i),h.isSeparated(e))return!1}}}(),closestPointLineToLine=function(){let e=new t,n=new t,r=new t;return function t(i,o,s){let a=i.start,l=e,u=o.start,c=n;r.subVectors(a,u),e.subVectors(i.end,i.start),n.subVectors(o.end,o.start);let d=r.dot(c),f=c.dot(l),p=c.dot(c),h=r.dot(l),m=l.dot(l),x=m*p-f*f,$,g;$=0!==x?(d*f-h*p)/x:0,g=(d+$*f)/p,s.x=$,s.y=g}}(),closestPointsSegmentToSegment=function(){let e=new n,r=new t,i=new t;return function t(n,o,s,a){closestPointLineToLine(n,o,e);let l=e.x,u=e.y;if(l>=0&&l<=1&&u>=0&&u<=1){n.at(l,s),o.at(u,a);return}if(l>=0&&l<=1){u<0?o.at(0,a):o.at(1,a),n.closestPointToPoint(a,!0,s);return}if(u>=0&&u<=1){l<0?n.at(0,s):n.at(1,s),o.closestPointToPoint(s,!0,a);return}{let c;c=l<0?n.start:n.end;let d;d=u<0?o.start:o.end;let f=r,p=i;if(n.closestPointToPoint(d,!0,r),o.closestPointToPoint(c,!0,i),f.distanceToSquared(d)<=p.distanceToSquared(c)){s.copy(f),a.copy(d);return}s.copy(c),a.copy(p);return}}}(),sphereIntersectTriangle=function(){let e=new t,n=new t,o=new r,s=new i;return function t(r,i){let{radius:a,center:l}=r,{a:u,b:c,c:d}=i;s.start=u,s.end=c;let f=s.closestPointToPoint(l,!0,e);if(f.distanceTo(l)<=a)return!0;s.start=u,s.end=d;let p=s.closestPointToPoint(l,!0,e);if(p.distanceTo(l)<=a)return!0;s.start=c,s.end=d;let h=s.closestPointToPoint(l,!0,e);if(h.distanceTo(l)<=a)return!0;let m=i.getPlane(o),x=Math.abs(m.distanceToPoint(l));if(x<=a){let $=m.projectPoint(l,n),g=i.containsPoint($);if(g)return!0}return!1}}(),DIST_EPSILON=1e-15;function isNearZero(e){return 1e-15>Math.abs(e)}class ExtendedTriangle extends o{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new t),this.satBounds=[,,,,].fill().map(()=>new SeparatingAxisBounds),this.points=[this.a,this.b,this.c],this.sphere=new s,this.plane=new r,this.needsUpdate=!0}intersectsSphere(e){return sphereIntersectTriangle(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,i=this.satAxes,o=this.satBounds,s=i[0],a=o[0];this.getNormal(s),a.setFromPoints(s,r);let l=i[1],u=o[1];l.subVectors(e,t),u.setFromPoints(l,r);let c=i[2],d=o[2];c.subVectors(t,n),d.setFromPoints(c,r);let f=i[3],p=o[3];f.subVectors(n,e),p.setFromPoints(f,r),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(s,e),this.needsUpdate=!1}}ExtendedTriangle.prototype.closestPointToSegment=function(){let e=new t,n=new t,r=new i;return function t(i,o=null,s=null){let{start:a,end:l}=i,u=this.points,c,d=1/0;for(let f=0;f<3;f++){let p=(f+1)%3;r.start.copy(u[f]),r.end.copy(u[p]),closestPointsSegmentToSegment(r,i,e,n),(c=e.distanceToSquared(n))<d&&(d=c,o&&o.copy(e),s&&s.copy(n))}return this.closestPointToPoint(a,e),(c=a.distanceToSquared(e))<d&&(d=c,o&&o.copy(e),s&&s.copy(a)),this.closestPointToPoint(l,e),(c=l.distanceToSquared(e))<d&&(d=c,o&&o.copy(e),s&&s.copy(l)),Math.sqrt(d)}}(),ExtendedTriangle.prototype.intersectsTriangle=function(){let e=new ExtendedTriangle,n=[,,,],r=[,,,],o=new SeparatingAxisBounds,s=new SeparatingAxisBounds,a=new t,l=new t,u=new t,c=new t,d=new i,f=new i,p=new i;return function t(i,h=null,m=!1){this.needsUpdate&&this.update(),i.isExtendedTriangle?i.needsUpdate&&i.update():(e.copy(i),e.update(),i=e);let x=this.plane,$=i.plane;if(Math.abs(x.normal.dot($.normal))>1-1e-10){let g=this.satBounds,y=this.satAxes;r[0]=i.a,r[1]=i.b,r[2]=i.c;for(let b=0;b<4;b++){let v=g[b],_=y[b];if(o.setFromPoints(_,r),v.isSeparated(o))return!1}let T=i.satBounds,B=i.satAxes;n[0]=this.a,n[1]=this.b,n[2]=this.c;for(let w=0;w<4;w++){let I=T[w],A=B[w];if(o.setFromPoints(A,n),I.isSeparated(o))return!1}for(let S=0;S<4;S++){let P=y[S];for(let N=0;N<4;N++){let E=B[N];if(a.crossVectors(P,E),o.setFromPoints(a,n),s.setFromPoints(a,r),o.isSeparated(s))return!1}}return h&&(m||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),h.start.set(0,0,0),h.end.set(0,0,0)),!0}{let M=this.points,F=!1,D=0;for(let V=0;V<3;V++){let O=M[V],z=M[(V+1)%3];d.start.copy(O),d.end.copy(z),d.delta(l);let C=F?f.start:f.end,R=isNearZero($.distanceToPoint(O));if(isNearZero($.normal.dot(l))&&R){f.copy(d),D=2;break}let H=$.intersectLine(d,C)||R;if(H&&!isNearZero(C.distanceTo(z))){if(D++,F)break;F=!0}}if(1===D&&i.containsPoint(f.end))return h&&(h.start.copy(f.end),h.end.copy(f.end)),!0;if(2!==D)return!1;let k=i.points,U=!1,G=0;for(let L=0;L<3;L++){let q=k[L],X=k[(L+1)%3];d.start.copy(q),d.end.copy(X),d.delta(u);let W=U?p.start:p.end,Y=isNearZero(x.distanceToPoint(q));if(isNearZero(x.normal.dot(u))&&Y){p.copy(d),G=2;break}let Z=x.intersectLine(d,W)||Y;if(Z&&!isNearZero(W.distanceTo(X))){if(G++,U)break;U=!0}}if(1===G&&this.containsPoint(p.end))return h&&(h.start.copy(p.end),h.end.copy(p.end)),!0;if(2!==G)return!1;if(f.delta(l),p.delta(u),0>l.dot(u)){let j=p.start;p.start=p.end,p.end=j}let K=f.start.dot(l),J=f.end.dot(l),Q=p.start.dot(l),ee=p.end.dot(l);return(K===ee||Q===J||J<Q!=K<ee)&&(h&&(c.subVectors(f.start,p.start),c.dot(l)>0?h.start.copy(f.start):h.start.copy(p.start),c.subVectors(f.end,p.end),0>c.dot(l)?h.end.copy(f.end):h.end.copy(p.end)),!0)}}}(),ExtendedTriangle.prototype.distanceToPoint=function(){let e=new t;return function t(n){return this.closestPointToPoint(n,e),n.distanceTo(e)}}(),ExtendedTriangle.prototype.distanceToTriangle=function(){let e=new t,n=new t,r=["a","b","c"],o=new i,s=new i;return function t(i,a=null,l=null){let u=a||l?o:null;if(this.intersectsTriangle(i,u))return(a||l)&&(a&&u.getCenter(a),l&&u.getCenter(l)),0;let c=1/0;for(let d=0;d<3;d++){let f,p=r[d],h=i[p];this.closestPointToPoint(h,e),(f=h.distanceToSquared(e))<c&&(c=f,a&&a.copy(e),l&&l.copy(h));let m=this[p];i.closestPointToPoint(m,e),(f=m.distanceToSquared(e))<c&&(c=f,a&&a.copy(m),l&&l.copy(e))}for(let x=0;x<3;x++){let $=r[x],g=r[(x+1)%3];o.set(this[$],this[g]);for(let y=0;y<3;y++){let b=r[y],v=r[(y+1)%3];s.set(i[b],i[v]),closestPointsSegmentToSegment(o,s,e,n);let _=e.distanceToSquared(n);_<c&&(c=_,a&&a.copy(e),l&&l.copy(n))}}return Math.sqrt(c)}}();class OrientedBox{constructor(e,n,r){this.isOrientedBox=!0,this.min=new t,this.max=new t,this.matrix=new a,this.invMatrix=new a,this.points=Array(8).fill().map(()=>new t),this.satAxes=[,,,].fill().map(()=>new t),this.satBounds=[,,,].fill().map(()=>new SeparatingAxisBounds),this.alignedSatBounds=[,,,].fill().map(()=>new SeparatingAxisBounds),this.needsUpdate=!1,e&&this.min.copy(e),n&&this.max.copy(n),r&&this.matrix.copy(r)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}}OrientedBox.prototype.update=function e(){let t=this.matrix,n=this.min,r=this.max,i=this.points;for(let o=0;o<=1;o++)for(let s=0;s<=1;s++)for(let a=0;a<=1;a++){let l=1*o|2*s|4*a,u=i[l];u.x=o?r.x:n.x,u.y=s?r.y:n.y,u.z=a?r.z:n.z,u.applyMatrix4(t)}let c=this.satBounds,d=this.satAxes,f=i[0];for(let p=0;p<3;p++){let h=d[p],m=c[p],x=1<<p,$=i[x];h.subVectors(f,$),m.setFromPoints(h,i)}let g=this.alignedSatBounds;g[0].setFromPointsField(i,"x"),g[1].setFromPointsField(i,"y"),g[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1},OrientedBox.prototype.intersectsBox=function(){let e=new SeparatingAxisBounds;return function t(n){this.needsUpdate&&this.update();let r=n.min,i=n.max,o=this.satBounds,s=this.satAxes,a=this.alignedSatBounds;if(e.min=r.x,e.max=i.x,a[0].isSeparated(e)||(e.min=r.y,e.max=i.y,a[1].isSeparated(e))||(e.min=r.z,e.max=i.z,a[2].isSeparated(e)))return!1;for(let l=0;l<3;l++){let u=s[l],c=o[l];if(e.setFromBox(u,n),c.isSeparated(e))return!1}return!0}}(),OrientedBox.prototype.intersectsTriangle=function(){let e=new ExtendedTriangle,n=[,,,],r=new SeparatingAxisBounds,i=new SeparatingAxisBounds,o=new t;return function t(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(e.copy(s),e.update(),s=e);let a=this.satBounds,l=this.satAxes;n[0]=s.a,n[1]=s.b,n[2]=s.c;for(let u=0;u<3;u++){let c=a[u],d=l[u];if(r.setFromPoints(d,n),c.isSeparated(r))return!1}let f=s.satBounds,p=s.satAxes,h=this.points;for(let m=0;m<3;m++){let x=f[m],$=p[m];if(r.setFromPoints($,h),x.isSeparated(r))return!1}for(let g=0;g<3;g++){let y=l[g];for(let b=0;b<4;b++){let v=p[b];if(o.crossVectors(y,v),r.setFromPoints(o,n),i.setFromPoints(o,h),r.isSeparated(i))return!1}}return!0}}(),OrientedBox.prototype.closestPointToPoint=function e(t,n){return this.needsUpdate&&this.update(),n.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),n},OrientedBox.prototype.distanceToPoint=function(){let e=new t;return function t(n){return this.closestPointToPoint(n,e),n.distanceTo(e)}}(),OrientedBox.prototype.distanceToBox=function(){let e=["x","y","z"],n=Array(12).fill().map(()=>new i),r=Array(12).fill().map(()=>new i),o=new t,s=new t;return function t(i,a=0,l=null,u=null){if(this.needsUpdate&&this.update(),this.intersectsBox(i))return(l||u)&&(i.getCenter(s),this.closestPointToPoint(s,o),i.closestPointToPoint(o,s),l&&l.copy(o),u&&u.copy(s)),0;let c=a*a,d=i.min,f=i.max,p=this.points,h=1/0;for(let m=0;m<8;m++){let x=p[m];s.copy(x).clamp(d,f);let $=x.distanceToSquared(s);if($<h&&(h=$,l&&l.copy(x),u&&u.copy(s),$<c))return Math.sqrt($)}let g=0;for(let y=0;y<3;y++)for(let b=0;b<=1;b++)for(let v=0;v<=1;v++){let _=(y+1)%3,T=(y+2)%3,B=b<<_|v<<T,w=1<<y|b<<_|v<<T,I=p[B],A=p[w],S=n[g];S.set(I,A);let P=e[y],N=e[_],E=e[T],M=r[g],F=M.start,D=M.end;F[P]=d[P],F[N]=b?d[N]:f[N],F[E]=v?d[E]:f[N],D[P]=f[P],D[N]=b?d[N]:f[N],D[E]=v?d[E]:f[N],g++}for(let V=0;V<=1;V++)for(let O=0;O<=1;O++)for(let z=0;z<=1;z++){s.x=V?f.x:d.x,s.y=O?f.y:d.y,s.z=z?f.z:d.z,this.closestPointToPoint(s,o);let C=s.distanceToSquared(o);if(C<h&&(h=C,l&&l.copy(o),u&&u.copy(s),C<c))return Math.sqrt(C)}for(let R=0;R<12;R++){let H=n[R];for(let k=0;k<12;k++){let U=r[k];closestPointsSegmentToSegment(H,U,o,s);let G=o.distanceToSquared(s);if(G<h&&(h=G,l&&l.copy(o),u&&u.copy(s),G<c))return Math.sqrt(G)}}return Math.sqrt(h)}}();let vA=new t,vB=new t,vC=new t,uvA=new n,uvB=new n,uvC=new n,intersectionPoint=new t;function checkIntersection(e,t,n,r,i,o){let s;if(null===(s=o===l?e.intersectTriangle(r,n,t,!0,i):e.intersectTriangle(t,n,r,o!==u,i)))return null;let a=e.origin.distanceTo(i);return{distance:a,point:i.clone()}}function checkBufferGeometryIntersection(e,r,i,s,a,l,u){vA.fromBufferAttribute(r,s),vB.fromBufferAttribute(r,a),vC.fromBufferAttribute(r,l);let c=checkIntersection(e,vA,vB,vC,intersectionPoint,u);if(c){i&&(uvA.fromBufferAttribute(i,s),uvB.fromBufferAttribute(i,a),uvC.fromBufferAttribute(i,l),c.uv=o.getUV(intersectionPoint,vA,vB,vC,uvA,uvB,uvC,new n));let d={a:s,b:a,c:l,normal:new t,materialIndex:0};o.getNormal(vA,vB,vC,d.normal),c.face=d,c.faceIndex=s}return c}function intersectTri(e,t,n,r,i){let o=3*r,s=e.index.getX(o),a=e.index.getX(o+1),l=e.index.getX(o+2),u=checkBufferGeometryIntersection(n,e.attributes.position,e.attributes.uv,s,a,l,t);return u?(u.faceIndex=r,i&&i.push(u),u):null}function intersectTris(e,t,n,r,i,o){for(let s=r,a=r+i;s<a;s++)intersectTri(e,t,n,s,o)}function intersectClosestTri(e,t,n,r,i){let o=1/0,s=null;for(let a=r,l=r+i;a<l;a++){let u=intersectTri(e,t,n,a);u&&u.distance<o&&(s=u,o=u.distance)}return s}function convertRaycastIntersect(e,t,n){return null===e?null:(e.point.applyMatrix4(t.matrixWorld),e.distance=e.point.distanceTo(n.ray.origin),e.object=t,e.distance<n.near||e.distance>n.far)?null:e}function setTriangle(e,t,n,r){let i=e.a,o=e.b,s=e.c,a=t,l=t+1,u=t+2;n&&(a=n.getX(t),l=n.getX(t+1),u=n.getX(t+2)),i.x=r.getX(a),i.y=r.getY(a),i.z=r.getZ(a),o.x=r.getX(l),o.y=r.getY(l),o.z=r.getZ(l),s.x=r.getX(u),s.y=r.getY(u),s.z=r.getZ(u)}function iterateOverTriangles(e,t,n,r,i,o,s){let a=n.index,l=n.attributes.position;for(let u=e,c=t+e;u<c;u++)if(setTriangle(s,3*u,a,l),s.needsUpdate=!0,r(s,u,i,o))return!0;return!1}let tempV1=new t,tempV2=new t,tempV3=new t,tempUV1=new n,tempUV2=new n,tempUV3=new n;function getTriangleHitPointInfo(e,r,i,s){let a=r.getIndex().array,l=r.getAttribute("position"),u=r.getAttribute("uv"),c=a[3*i],d=a[3*i+1],f=a[3*i+2];tempV1.fromBufferAttribute(l,c),tempV2.fromBufferAttribute(l,d),tempV3.fromBufferAttribute(l,f);let p=0,h=r.groups,m=3*i;for(let x=0,$=h.length;x<$;x++){let g=h[x],{start:y,count:b}=g;if(m>=y&&m<y+b){p=g.materialIndex;break}}let v=null;return(u&&(tempUV1.fromBufferAttribute(u,c),tempUV2.fromBufferAttribute(u,d),tempUV3.fromBufferAttribute(u,f),v=s&&s.uv?s.uv:new n,o.getUV(e,tempV1,tempV2,tempV3,tempUV1,tempUV2,tempUV3,v)),s)?(s.face||(s.face={}),s.face.a=c,s.face.b=d,s.face.c=f,s.face.materialIndex=p,s.face.normal||(s.face.normal=new t),o.getNormal(tempV1,tempV2,tempV3,s.face.normal),v&&(s.uv=v),s):{face:{a:c,b:d,c:f,materialIndex:p,normal:o.getNormal(tempV1,tempV2,tempV3,new t)},uv:v}}class PrimitivePool{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return 0===e.length?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}function IS_LEAF(e,t){return 65535===t[e+15]}function OFFSET(e,t){return t[e+6]}function COUNT(e,t){return t[e+14]}function LEFT_NODE(e){return e+8}function RIGHT_NODE(e,t){return t[e+6]}function SPLIT_AXIS(e,t){return t[e+7]}function BOUNDING_DATA_INDEX(e){return e}let boundingBox$1=new c,boxIntersection=new t,xyzFields=["x","y","z"];function raycast(e,t,n,r,i){let o=2*e,s=_float32Array,a=_uint16Array,l=_uint32Array,u=IS_LEAF(o,a);if(u){let c=OFFSET(e,l),d=COUNT(o,a);intersectTris(t,n,r,c,d,i)}else{let f=LEFT_NODE(e);intersectRay(f,s,r,boxIntersection)&&raycast(f,t,n,r,i);let p=RIGHT_NODE(e,l);intersectRay(p,s,r,boxIntersection)&&raycast(p,t,n,r,i)}}function raycastFirst(e,t,n,r){let i=2*e,o=_float32Array,s=_uint16Array,a=_uint32Array,l=IS_LEAF(i,s);if(l){let u=OFFSET(e,a),c=COUNT(i,s);return intersectClosestTri(t,n,r,u,c)}{let d=SPLIT_AXIS(e,a),f=xyzFields[d],p=r.direction[f],h=p>=0,m,x;h?(m=LEFT_NODE(e),x=RIGHT_NODE(e,a)):(m=RIGHT_NODE(e,a),x=LEFT_NODE(e));let $=intersectRay(m,o,r,boxIntersection),g=$?raycastFirst(m,t,n,r):null;if(g){let y=g.point[f],b=h?y<=o[x+d]:y>=o[x+d+3];if(b)return g}let v=intersectRay(x,o,r,boxIntersection),_=v?raycastFirst(x,t,n,r):null;return g&&_?g.distance<=_.distance?g:_:g||_||null}}let shapecast=function(){let e,t,n=[],r=new PrimitivePool(()=>new c);return function i(...o){e=r.getPrimitive(),t=r.getPrimitive(),n.push(e,t);let s=function n(r,i,o,s,a=null,l=0,u=0){function c(e){let t=2*e,n=_uint16Array,r=_uint32Array;for(;!IS_LEAF(t,n);)t=2*(e=LEFT_NODE(e));return OFFSET(e,r)}function d(e){let t=2*e,n=_uint16Array,r=_uint32Array;for(;!IS_LEAF(t,n);)t=2*(e=RIGHT_NODE(e,r));return OFFSET(e,r)+COUNT(t,n)}let f=2*r,p=_float32Array,h=_uint16Array,m=_uint32Array,x=IS_LEAF(f,h);if(x){let $=OFFSET(r,m),g=COUNT(f,h);return arrayToBox(BOUNDING_DATA_INDEX(r),p,e),s($,g,!1,u,l+r,e)}{let y=LEFT_NODE(r),b=RIGHT_NODE(r,m),v=y,_=b,T,B,w,I;if(a&&(w=e,I=t,arrayToBox(BOUNDING_DATA_INDEX(v),p,w),arrayToBox(BOUNDING_DATA_INDEX(_),p,I),T=a(w),(B=a(I))<T)){v=b,_=y;let A=T;T=B,B=A,w=I}w||(w=e,arrayToBox(BOUNDING_DATA_INDEX(v),p,w));let S=IS_LEAF(2*v,h),P=o(w,S,T,u+1,l+v),N;if(P===CONTAINED){let E=c(v),M=d(v);N=s(E,M-E,!0,u+1,l+v,w)}else N=P&&n(v,i,o,s,a,l,u+1);if(N)return!0;I=t,arrayToBox(BOUNDING_DATA_INDEX(_),p,I);let F=IS_LEAF(2*_,h),D=o(I,F,B,u+1,l+_),V;if(D===CONTAINED){let O=c(_),z=d(_);V=s(O,z-O,!0,u+1,l+_,I)}else V=D&&n(_,i,o,s,a,l,u+1);return!!V}}(...o);r.releasePrimitive(e),r.releasePrimitive(t),n.pop(),n.pop();let a=n.length;return a>0&&(t=n[a-1],e=n[a-2]),s}}(),intersectsGeometry=function(){let e=new ExtendedTriangle,t=new ExtendedTriangle,n=new a,r=new OrientedBox,i=new OrientedBox;return function o(s,a,l,u,c=null){let d=2*s,f=_float32Array,p=_uint16Array,h=_uint32Array;null===c&&(l.boundingBox||l.computeBoundingBox(),r.set(l.boundingBox.min,l.boundingBox.max,u),c=r);let m=IS_LEAF(d,p);if(m){let x=a,$=x.index,g=x.attributes.position,y=l.index,b=l.attributes.position,v=OFFSET(s,h),_=COUNT(d,p);if(n.copy(u).invert(),l.boundsTree){arrayToBox(BOUNDING_DATA_INDEX(s),f,i),i.matrix.copy(n),i.needsUpdate=!0;let T=l.boundsTree.shapecast({intersectsBounds:e=>i.intersectsBox(e),intersectsTriangle(e){e.a.applyMatrix4(u),e.b.applyMatrix4(u),e.c.applyMatrix4(u),e.needsUpdate=!0;for(let n=3*v,r=(_+v)*3;n<r;n+=3)if(setTriangle(t,n,$,g),t.needsUpdate=!0,e.intersectsTriangle(t))return!0;return!1}});return T}for(let B=3*v,w=_+3*v;B<w;B+=3){setTriangle(e,B,$,g),e.a.applyMatrix4(n),e.b.applyMatrix4(n),e.c.applyMatrix4(n),e.needsUpdate=!0;for(let I=0,A=y.count;I<A;I+=3)if(setTriangle(t,I,y,b),t.needsUpdate=!0,e.intersectsTriangle(t))return!0}}else{let S=s+8,P=h[s+6];arrayToBox(BOUNDING_DATA_INDEX(S),f,boundingBox$1);let N=c.intersectsBox(boundingBox$1)&&o(S,a,l,u,c);if(N)return!0;arrayToBox(BOUNDING_DATA_INDEX(P),f,boundingBox$1);let E=c.intersectsBox(boundingBox$1)&&o(P,a,l,u,c);return!!E}}}();function intersectRay(e,t,n,r){return arrayToBox(e,t,boundingBox$1),n.intersectBox(boundingBox$1,r)}let bufferStack=[],_prevBuffer,_float32Array,_uint16Array,_uint32Array;function setBuffer(e){_prevBuffer&&bufferStack.push(_prevBuffer),_prevBuffer=e,_float32Array=new Float32Array(e),_uint16Array=new Uint16Array(e),_uint32Array=new Uint32Array(e)}function clearBuffer(){_prevBuffer=null,_float32Array=null,_uint16Array=null,_uint32Array=null,bufferStack.length&&setBuffer(bufferStack.pop())}let SKIP_GENERATION=Symbol("skip tree generation"),aabb=new c,aabb2=new c,tempMatrix=new a,obb=new OrientedBox,obb2=new OrientedBox,temp=new t,temp1=new t,temp2=new t,temp3=new t,temp4=new t,tempBox=new c,trianglePool=new PrimitivePool(()=>new ExtendedTriangle);class MeshBVH{static serialize(e,t={}){if(t.isBufferGeometry)return console.warn("MeshBVH.serialize: The arguments for the function have changed. See documentation for new signature."),MeshBVH.serialize(arguments[0],{cloneBuffers:void 0===arguments[2]||arguments[2]});t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,i=n.getIndex(),o;return t.cloneBuffers?{roots:r.map(e=>e.slice()),index:i.array.slice()}:{roots:r,index:i.array}}static deserialize(t,n,r={}){if("boolean"==typeof r)return console.warn("MeshBVH.deserialize: The arguments for the function have changed. See documentation for new signature."),MeshBVH.deserialize(arguments[0],arguments[1],{setIndex:void 0===arguments[2]||arguments[2]});r={setIndex:!0,...r};let{index:i,roots:o}=t,s=new MeshBVH(n,{...r,[SKIP_GENERATION]:!0});if(s._roots=o,r.setIndex){let a=n.getIndex();if(null===a){let l=new e(t.index,1,!1);n.setIndex(l)}else a.array!==i&&(a.array.set(i),a.needsUpdate=!0)}return s}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw Error("MeshBVH: Only BufferGeometries are supported.");if((t=Object.assign({strategy:CENTER,maxDepth:40,maxLeafTris:10,verbose:!0,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,[SKIP_GENERATION]:!1},t)).useSharedArrayBuffer&&"undefined"==typeof SharedArrayBuffer)throw Error("MeshBVH: SharedArrayBuffer is not available.");this._roots=null,t[SKIP_GENERATION]||(this._roots=buildPackedTree(e,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new c))),this.geometry=e}refit(e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=this.geometry,n=t.index.array,r=t.attributes.position,i,o,s,a,l=0,u=this._roots;for(let c=0,d=u.length;c<d;c++)i=u[c],o=new Uint32Array(i),s=new Uint16Array(i),a=new Float32Array(i),f(0,l),l+=i.byteLength;function f(t,i,l=!1){let u=2*t,c=65535===s[u+15];if(c){let d=o[t+6],p=s[u+14],h=1/0,m=1/0,x=1/0,$=-1/0,g=-1/0,y=-1/0;for(let b=3*d,v=3*(d+p);b<v;b++){let _=n[b],T=r.getX(_),B=r.getY(_),w=r.getZ(_);T<h&&(h=T),T>$&&($=T),B<m&&(m=B),B>g&&(g=B),w<x&&(x=w),w>y&&(y=w)}return(a[t+0]!==h||a[t+1]!==m||a[t+2]!==x||a[t+3]!==$||a[t+4]!==g||a[t+5]!==y)&&(a[t+0]=h,a[t+1]=m,a[t+2]=x,a[t+3]=$,a[t+4]=g,a[t+5]=y,!0)}{let I=t+8,A=o[t+6],S=l,P=!1,N=!1;e?S||(P=e.has(I+i),N=e.has(A+i),S=!P&&!N):(P=!0,N=!0);let E=S||P,M=S||N,F=!1;E&&(F=f(I,i,S));let D=!1;M&&(D=f(A,i,S));let V=F||D;if(V)for(let O=0;O<3;O++){let z=I+O,C=A+O,R=a[z],H=a[z+3],k=a[C],U=a[C+3];a[t+O]=R<k?R:k,a[t+O+3]=H>U?H:U}return V}}}traverse(e,t=0){let n=this._roots[t],r=new Uint32Array(n),i=new Uint16Array(n);!function t(o,s=0){let a=2*o,l=65535===i[a+15];if(l){let u=r[o+6],c=i[a+14];e(s,l,new Float32Array(n,4*o,6),u,c)}else{let d=r[o+6],f=r[o+7],p=e(s,l,new Float32Array(n,4*o,6),f);p||(t(o+8,s+1),t(d,s+1))}}(0)}raycast(e,t=d){let n=this._roots,r=this.geometry,i=[],o=t.isMaterial,s=Array.isArray(t),a=r.groups,l=o?t.side:t;for(let u=0,c=n.length;u<c;u++){let f=s?t[a[u].materialIndex].side:l,p=i.length;if(setBuffer(n[u]),raycast(0,r,f,e,i),clearBuffer(),s){let h=a[u].materialIndex;for(let m=p,x=i.length;m<x;m++)i[m].face.materialIndex=h}}return i}raycastFirst(e,t=d){let n=this._roots,r=this.geometry,i=t.isMaterial,o=Array.isArray(t),s=null,a=r.groups,l=i?t.side:t;for(let u=0,c=n.length;u<c;u++){let f=o?t[a[u].materialIndex].side:l;setBuffer(n[u]);let p=raycastFirst(0,r,f,e);clearBuffer(),null!=p&&(null==s||p.distance<s.distance)&&(s=p,o&&(p.face.materialIndex=a[u].materialIndex))}return s}intersectsGeometry(e,t){let n=this.geometry,r=!1;for(let i of this._roots)if(setBuffer(i),r=intersectsGeometry(0,n,e,t),clearBuffer(),r)break;return r}shapecast(e,t,n){let r=this.geometry;if(e instanceof Function){if(t){let i=t;t=(e,t,n,r)=>{let o=3*t;return i(e,o,o+1,o+2,n,r)}}e={boundsTraverseOrder:n,intersectsBounds:e,intersectsTriangle:t,intersectsRange:null},console.warn("MeshBVH: Shapecast function signature has changed and now takes an object of callbacks as a second argument. See docs for new signature.")}let o=trianglePool.getPrimitive(),{boundsTraverseOrder:s,intersectsBounds:a,intersectsRange:l,intersectsTriangle:u}=e;if(l&&u){let c=l;l=(e,t,n,i,s)=>!!c(e,t,n,i,s)||iterateOverTriangles(e,t,r,u,n,i,o)}else l||(l=u?(e,t,n,i)=>iterateOverTriangles(e,t,r,u,n,i,o):(e,t,n)=>n);let d=!1,f=0;for(let p of this._roots){if(setBuffer(p),d=shapecast(0,r,a,l,s,f),clearBuffer(),d)break;f+=p.byteLength}return trianglePool.releasePrimitive(o),d}bvhcast(e,t,n){let{intersectsRanges:r,intersectsTriangles:i}=n,o=this.geometry.index,s=this.geometry.attributes.position,a=e.geometry.index,l=e.geometry.attributes.position;tempMatrix.copy(t).invert();let u=trianglePool.getPrimitive(),c=trianglePool.getPrimitive();if(i){function d(e,n,r,d,f,p,h,m){for(let x=r,$=r+d;x<$;x++){setTriangle(c,3*x,a,l),c.a.applyMatrix4(t),c.b.applyMatrix4(t),c.c.applyMatrix4(t),c.needsUpdate=!0;for(let g=e,y=e+n;g<y;g++)if(setTriangle(u,3*g,o,s),u.needsUpdate=!0,i(u,c,g,x,f,p,h,m))return!0}return!1}if(r){let f=r;r=function(e,t,n,r,i,o,s,a){return!!f(e,t,n,r,i,o,s,a)||d(e,t,n,r,i,o,s,a)}}else r=d}e.getBoundingBox(aabb2),aabb2.applyMatrix4(t);let p=this.shapecast({intersectsBounds:e=>aabb2.intersectsBox(e),intersectsRange:(t,n,i,o,s,a)=>(aabb.copy(a),aabb.applyMatrix4(tempMatrix),e.shapecast({intersectsBounds:e=>aabb.intersectsBox(e),intersectsRange:(e,i,a,l,u)=>r(t,n,e,i,o,s,l,u)}))});return trianglePool.releasePrimitive(u),trianglePool.releasePrimitive(c),p}intersectsBox(e,t){return obb.set(e.min,e.max,t),obb.needsUpdate=!0,this.shapecast({intersectsBounds:e=>obb.intersectsBox(e),intersectsTriangle:e=>obb.intersectsTriangle(e)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},i=0,o=1/0){e.boundingBox||e.computeBoundingBox(),obb.set(e.boundingBox.min,e.boundingBox.max,t),obb.needsUpdate=!0;let s=this.geometry,a=s.attributes.position,l=s.index,u=e.attributes.position,c=e.index,d=trianglePool.getPrimitive(),f=trianglePool.getPrimitive(),p=temp1,h=temp2,m=null,x=null;r&&(m=temp3,x=temp4);let $=1/0,g=null,y=null;return(tempMatrix.copy(t).invert(),obb2.matrix.copy(tempMatrix),this.shapecast({boundsTraverseOrder:e=>obb.distanceToBox(e),intersectsBounds:(e,t,n)=>n<$&&n<o&&(t&&(obb2.min.copy(e.min),obb2.max.copy(e.max),obb2.needsUpdate=!0),!0),intersectsRange(n,r){if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:e=>obb2.distanceToBox(e),intersectsBounds:(e,t,n)=>n<$&&n<o,intersectsRange(e,o){for(let s=3*e,b=(e+o)*3;s<b;s+=3){setTriangle(f,s,c,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let v=3*n,_=(n+r)*3;v<_;v+=3){setTriangle(d,v,l,a),d.needsUpdate=!0;let T=d.distanceToTriangle(f,p,m);if(T<$&&(h.copy(p),x&&x.copy(m),$=T,g=v/3,y=s/3),T<i)return!0}}}});{let s=c?c.count:u.count;for(let b=0,v=s;b<v;b+=3){setTriangle(f,b,c,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let _=3*n,T=(n+r)*3;_<T;_+=3){setTriangle(d,_,l,a),d.needsUpdate=!0;let B=d.distanceToTriangle(f,p,m);if(B<$&&(h.copy(p),x&&x.copy(m),$=B,g=_/3,y=b/3),B<i)return!0}}}}}),trianglePool.releasePrimitive(d),trianglePool.releasePrimitive(f),$===1/0)?null:(n.point?n.point.copy(h):n.point=h.clone(),n.distance=$,n.faceIndex=g,r&&(r.point?r.point.copy(x):r.point=x.clone(),r.point.applyMatrix4(tempMatrix),h.applyMatrix4(tempMatrix),r.distance=h.sub(r.point).length(),r.faceIndex=y),n)}closestPointToPoint(e,t={},n=0,r=1/0){let i=n*n,o=r*r,s=1/0,a=null;if(this.shapecast({boundsTraverseOrder:t=>(temp.copy(e).clamp(t.min,t.max),temp.distanceToSquared(e)),intersectsBounds:(e,t,n)=>n<s&&n<o,intersectsTriangle(t,n){t.closestPointToPoint(e,temp);let r=e.distanceToSquared(temp);return r<s&&(temp1.copy(temp),s=r,a=n),r<i}}),s===1/0)return null;let l=Math.sqrt(s);return t.point?t.point.copy(temp1):t.point=temp1.clone(),t.distance=l,t.faceIndex=a,t}getBoundingBox(e){e.makeEmpty();let t=this._roots;return t.forEach(t=>{arrayToBox(0,new Float32Array(t),tempBox),e.union(tempBox)}),e}}let boundingBox=new c;class MeshBVHRootVisualizer extends f{get isMesh(){return!this.displayEdges}get isLineSegments(){return this.displayEdges}get isLine(){return this.displayEdges}constructor(e,t,n=10,r=0){super(),this.material=t,this.geometry=new p,this.name="MeshBVHRootVisualizer",this.depth=n,this.displayParents=!1,this.mesh=e,this.displayEdges=!0,this._group=r}raycast(){}update(){let t=this.geometry,n=this.mesh.geometry.boundsTree,r=this._group;if(t.dispose(),this.visible=!1,n){let i=this.depth-1,o=this.displayParents,s=0;n.traverse((e,t)=>{if(e===i||t)return s++,!0;o&&s++},r);let a=0,l=new Float32Array(24*s);n.traverse((e,t,n)=>{let r=e===i||t;if(r||o){arrayToBox(0,n,boundingBox);let{min:s,max:u}=boundingBox;for(let c=-1;c<=1;c+=2){let d=c<0?s.x:u.x;for(let f=-1;f<=1;f+=2){let p=f<0?s.y:u.y;for(let h=-1;h<=1;h+=2){let m=h<0?s.z:u.z;l[a+0]=d,l[a+1]=p,l[a+2]=m,a+=3}}}return r}},r);let u,c;c=new Uint8Array(this.displayEdges?[0,4,1,5,2,6,3,7,0,2,1,3,4,6,5,7,0,1,2,3,4,5,6,7,]:[0,1,2,2,1,3,4,6,5,6,7,5,1,4,5,0,4,1,2,3,6,3,7,6,0,2,4,2,6,4,1,5,3,3,5,7,]),u=l.length>65535?new Uint32Array(c.length*s):new Uint16Array(c.length*s);let d=c.length;for(let f=0;f<s;f++){let p=8*f,h=f*d;for(let m=0;m<d;m++)u[h+m]=p+c[m]}t.setIndex(new e(u,1,!1)),t.setAttribute("position",new e(l,3,!1)),this.visible=!0}}}class MeshBVHVisualizer extends h{get color(){return this.edgeMaterial.color}get opacity(){return this.edgeMaterial.opacity}set opacity(e){this.edgeMaterial.opacity=e,this.meshMaterial.opacity=e}constructor(e,t=10){super(),this.name="MeshBVHVisualizer",this.depth=t,this.mesh=e,this.displayParents=!1,this.displayEdges=!0,this._roots=[];let n=new m({color:65416,transparent:!0,opacity:.3,depthWrite:!1}),r=new x({color:65416,transparent:!0,opacity:.3,depthWrite:!1});r.color=n.color,this.edgeMaterial=n,this.meshMaterial=r,this.update()}update(){let e=this.mesh.geometry.boundsTree,t=e?e._roots.length:0;for(;this._roots.length>t;){let n=this._roots.pop();n.geometry.dispose(),this.remove(n)}for(let r=0;r<t;r++){if(r>=this._roots.length){let i=new MeshBVHRootVisualizer(this.mesh,this.edgeMaterial,this.depth,r);this.add(i),this._roots.push(i)}let o=this._roots[r];o.depth=this.depth,o.mesh=this.mesh,o.displayParents=this.displayParents,o.displayEdges=this.displayEdges,o.material=this.displayEdges?this.edgeMaterial:this.meshMaterial,o.update()}}updateMatrixWorld(...e){this.position.copy(this.mesh.position),this.rotation.copy(this.mesh.rotation),this.scale.copy(this.mesh.scale),super.updateMatrixWorld(...e)}copy(e){this.depth=e.depth,this.mesh=e.mesh}clone(){return new MeshBVHVisualizer(this.mesh,this.depth)}dispose(){this.edgeMaterial.dispose(),this.meshMaterial.dispose();let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].geometry.dispose()}}let _box1=new c,_box2=new c,_vec=new t;function getPrimitiveSize(e){switch(typeof e){case"number":return 8;case"string":return 2*e.length;case"boolean":return 4;default:return 0}}function isTypedArray(e){return/(Uint|Int|Float)(8|16|32)Array/.test(e.constructor.name)}function getRootExtremes(e,t){let n={nodeCount:0,leafNodeCount:0,depth:{min:1/0,max:-1/0},tris:{min:1/0,max:-1/0},splits:[0,0,0],surfaceAreaScore:0};return e.traverse((e,t,r,i,o)=>{let s=r[3]-r[0],a=r[4]-r[1],l=r[5]-r[2],u=2*(s*a+a*l+l*s);n.nodeCount++,t?(n.leafNodeCount++,n.depth.min=Math.min(e,n.depth.min),n.depth.max=Math.max(e,n.depth.max),n.tris.min=Math.min(o,n.tris.min),n.tris.max=Math.max(o,n.tris.max),n.surfaceAreaScore+=1.25*u*o):(n.splits[i]++,n.surfaceAreaScore+=1*u)},t),n.tris.min===1/0&&(n.tris.min=0,n.tris.max=0),n.depth.min===1/0&&(n.depth.min=0,n.depth.max=0),n}function getBVHExtremes(e){return e._roots.map((t,n)=>getRootExtremes(e,n))}function estimateMemoryInBytes(e){let t=new Set,n=[e],r=0;for(;n.length;){let i=n.pop();if(!t.has(i))for(let o in t.add(i),i){if(!i.hasOwnProperty(o))continue;r+=getPrimitiveSize(o);let s=i[o];s&&("object"==typeof s||"function"==typeof s)?isTypedArray(s)?r+=s.byteLength:s instanceof ArrayBuffer?r+=s.byteLength:n.push(s):r+=getPrimitiveSize(s)}}return r}function validateBounds(e){let t=e.geometry,n=[],r=t.index,i=t.getAttribute("position"),o=!0;return e.traverse((e,t,s,a,l)=>{n[e]={depth:e,isLeaf:t,boundingData:s,offset:a,count:l},arrayToBox(0,s,_box1);let u=n[e-1];if(t)for(let c=3*a,d=(a+l)*3;c<d;c+=3){let f=r.getX(c),p=r.getX(c+1),h=r.getX(c+2),m;_vec.fromBufferAttribute(i,f),m=_box1.containsPoint(_vec),_vec.fromBufferAttribute(i,p),m=m&&_box1.containsPoint(_vec),_vec.fromBufferAttribute(i,h),m=m&&_box1.containsPoint(_vec),console.assert(m,"Leaf bounds does not fully contain triangle."),o=o&&m}if(u){arrayToBox(0,s,_box2);let x=_box2.containsBox(_box1);console.assert(x,"Parent bounds does not fully contain child."),o=o&&x}}),o}function getJSONStructure(e){let t=[];return e.traverse((e,n,r,i,o)=>{let s={bounds:arrayToBox(0,r,new c)};n?(s.count=o,s.offset=i):(s.left=null,s.right=null),t[e]=s;let a=t[e-1];a&&(null===a.left?a.left=s:a.right=s)}),t[0]}let ray=new $,tmpInverseMatrix=new a,origMeshRaycastFunc=g.prototype.raycast;function acceleratedRaycast(e,t){if(this.geometry.boundsTree){if(void 0===this.material)return;tmpInverseMatrix.copy(this.matrixWorld).invert(),ray.copy(e.ray).applyMatrix4(tmpInverseMatrix);let n=this.geometry.boundsTree;if(!0===e.firstHitOnly){let r=convertRaycastIntersect(n.raycastFirst(ray,this.material),this,e);r&&t.push(r)}else{let i=n.raycast(ray,this.material);for(let o=0,s=i.length;o<s;o++){let a=convertRaycastIntersect(i[o],this,e);a&&t.push(a)}}}else origMeshRaycastFunc.call(this,e,t)}function computeBoundsTree(e){return this.boundsTree=new MeshBVH(this,e),this.boundsTree}function disposeBoundsTree(){this.boundsTree=null}function countToStringFormat(e){switch(e){case 1:return"R";case 2:return"RG";case 3:case 4:return"RGBA"}throw Error()}function countToFormat(e){switch(e){case 1:return v;case 2:return b;case 3:case 4:return y}}function countToIntFormat(e){switch(e){case 1:return B;case 2:return T;case 3:case 4:return _}}class VertexAttributeTexture extends w{constructor(){super(),this.minFilter=I,this.magFilter=I,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t=this.overrideItemSize,n=e.itemSize,r=e.count;if(null!==t){if(n*r%t!=0)throw Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=r*n/t}let i=e.itemSize,o=e.count,s=e.normalized,a=e.array.constructor,l=a.BYTES_PER_ELEMENT,u=this._forcedType,c=i;if(null===u)switch(a){case Float32Array:u=P;break;case Uint8Array:case Uint16Array:case Uint32Array:u=S;break;case Int8Array:case Int16Array:case Int32Array:u=A}let d,f,p,h,m=countToStringFormat(i);switch(u){case P:p=1,f=countToFormat(i),s&&1===l?(h=a,m+="8",a===Uint8Array?d=N:(d=M,m+="_SNORM")):(h=Float32Array,m+="32F",d=P);break;case A:m+=8*l+"I",p=s?Math.pow(2,8*a.BYTES_PER_ELEMENT-1):1,f=countToIntFormat(i),1===l?(h=Int8Array,d=M):2===l?(h=Int16Array,d=F):(h=Int32Array,d=A);break;case S:m+=8*l+"UI",p=s?Math.pow(2,8*a.BYTES_PER_ELEMENT-1):1,f=countToIntFormat(i),1===l?(h=Uint8Array,d=N):2===l?(h=Uint16Array,d=E):(h=Uint32Array,d=S)}3===c&&(f===y||f===_)&&(c=4);let x=Math.ceil(Math.sqrt(o)),$=c*x*x,g=new h($),b=e.normalized;e.normalized=!1;for(let v=0;v<o;v++){let T=c*v;g[T]=e.getX(v)/p,i>=2&&(g[T+1]=e.getY(v)/p),i>=3&&(g[T+2]=e.getZ(v)/p,4===c&&(g[T+3]=1)),i>=4&&(g[T+3]=e.getW(v)/p)}e.normalized=b,this.internalFormat=m,this.format=f,this.type=d,this.image.width=x,this.image.height=x,this.image.data=g,this.needsUpdate=!0,this.dispose(),e.itemSize=n,e.count=r}}class UIntVertexAttributeTexture extends VertexAttributeTexture{constructor(){super(),this._forcedType=S}}class IntVertexAttributeTexture extends VertexAttributeTexture{constructor(){super(),this._forcedType=A}}class FloatVertexAttributeTexture extends VertexAttributeTexture{constructor(){super(),this._forcedType=P}}function bvhToTextures(e,t,n){let r=e._roots;if(1!==r.length)throw Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let i=r[0],o=new Uint16Array(i),s=new Uint32Array(i),a=new Float32Array(i),l=i.byteLength/32,u=2*Math.ceil(Math.sqrt(l/2)),c=new Float32Array(4*u*u),d=Math.ceil(Math.sqrt(l)),f=new Uint32Array(2*d*d);for(let p=0;p<l;p++){let h=32*p/4,m=2*h,x=BOUNDING_DATA_INDEX(h);for(let $=0;$<3;$++)c[8*p+0+$]=a[x+0+$],c[8*p+4+$]=a[x+3+$];if(IS_LEAF(m,o)){let g=COUNT(m,o),b=OFFSET(h,s),v=4294901760|g;f[2*p+0]=v,f[2*p+1]=b}else{let _=4*RIGHT_NODE(h,s)/32,B=SPLIT_AXIS(h,s);f[2*p+0]=B,f[2*p+1]=_}}t.image.data=c,t.image.width=u,t.image.height=u,t.format=y,t.type=P,t.internalFormat="RGBA32F",t.minFilter=I,t.magFilter=I,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose(),n.image.data=f,n.image.width=d,n.image.height=d,n.format=T,n.type=S,n.internalFormat="RG32UI",n.minFilter=I,n.magFilter=I,n.generateMipmaps=!1,n.needsUpdate=!0,n.dispose()}class MeshBVHUniformStruct{constructor(){this.autoDispose=!0,this.index=new UIntVertexAttributeTexture,this.position=new FloatVertexAttributeTexture,this.bvhBounds=new w,this.bvhContents=new w,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;bvhToTextures(e,this.bvhBounds,this.bvhContents),this.index.updateFrom(t.index),this.position.updateFrom(t.attributes.position)}dispose(){let{index:e,position:t,bvhBounds:n,bvhContents:r}=this;e&&e.dispose(),t&&t.dispose(),n&&n.dispose(),r&&r.dispose()}}let shaderStructs=`
#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,shaderIntersectFunction=`

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}

// Raycasting
float intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	float dist = max( t0, 0.0 );

	return t1 >= dist ? dist : INFINITY;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	BVH bvh, vec3 rayOrigin, vec3 rayDirection, uint offset, uint count,
	inout float minDistance,

	// output variables
	out uvec4 faceIndices, out vec3 faceNormal, out vec3 barycoord,
	out float side, out float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( bvh.index, i ).xyz;
		vec3 a = texelFetch1D( bvh.position, indices.x ).rgb;
		vec3 b = texelFetch1D( bvh.position, indices.y ).rgb;
		vec3 c = texelFetch1D( bvh.position, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

float intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, BVH bvh, uint currNodeIndex ) {

	vec3 boundsMin = texelFetch1D( bvh.bvhBounds, currNodeIndex * 2u + 0u ).xyz;
	vec3 boundsMax = texelFetch1D( bvh.bvhBounds, currNodeIndex * 2u + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax );

}

bool bvhIntersectFirstHit(
	BVH bvh, vec3 rayOrigin, vec3 rayDirection,

	// output variables
	out uvec4 faceIndices, out vec3 faceNormal, out vec3 barycoord,
	out float side, out float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ 60 ];
	stack[ 0 ] = 0u;

	float triangleDistance = 1e20;
	bool found = false;
	while ( ptr > - 1 && ptr < 60 ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance = intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh, currNodeIndex );
		if ( boundsHitDistance == INFINITY || boundsHitDistance > triangleDistance ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh.bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh, rayOrigin, rayDirection, offset, count, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`,shaderDistanceFunction=`

float dot2( in vec3 v ) {

	return dot( v, v );

}


// https://www.shadertoy.com/view/ttfGWl
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0-v;

	}

	barycoord = vec3( u, v, w );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	BVH bvh, vec3 point, uint offset, uint count, float closestDistanceSquared,

	out uvec4 faceIndices, out vec3 faceNormal, out vec3 barycoord, out float side, out vec3 outPoint
) {

	bool found = false;
	uvec3 localIndices;
	vec3 localBarycoord;
	vec3 localNormal;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( bvh.index, i ).xyz;
		vec3 a = texelFetch1D( bvh.position, indices.x ).rgb;
		vec3 b = texelFetch1D( bvh.position, indices.y ).rgb;
		vec3 c = texelFetch1D( bvh.position, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, BVH bvh, uint currNodeIndex ) {

	vec3 boundsMin = texelFetch1D( bvh.bvhBounds, currNodeIndex * 2u + 0u ).xyz;
	vec3 boundsMax = texelFetch1D( bvh.bvhBounds, currNodeIndex * 2u + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

float bvhClosestPointToPoint(
	BVH bvh, vec3 point,

	// output variables
	out uvec4 faceIndices, out vec3 faceNormal, out vec3 barycoord,
	out float side, out vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ 60 ];
	stack[ 0 ] = 0u;
	float closestDistanceSquared = pow( 100000.0, 2.0 );
	bool found = false;
	while ( ptr > - 1 && ptr < 60 ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh.bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh, point, offset, count, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;
			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`,_positionVector=new t,_normalVector=new t,_tangentVector=new t,_tangentVector4=new D,_morphVector=new t,_temp=new t,_skinIndex=new D,_skinWeight=new D,_matrix=new a,_boneMatrix=new a;function validateAttributes(e,t){if(!e&&!t)return;let n=e.count===t.count,r=e.normalized===t.normalized,i=e.array.constructor===t.array.constructor,o=e.itemSize===t.itemSize;if(!n||!r||!i||!o)throw Error()}function createAttributeClone(t,n=null){let r=t.array.constructor,i=t.normalized,o=t.itemSize,s=null===n?t.count:n;return new e(new r(o*s),o,i)}function copyAttributeContents(e,t,n=0){if(e.isInterleavedBufferAttribute){let r=e.itemSize;for(let i=0,o=e.count;i<o;i++){let s=i+n;t.setX(s,e.getX(i)),r>=2&&t.setY(s,e.getY(i)),r>=3&&t.setZ(s,e.getZ(i)),r>=4&&t.setW(s,e.getW(i))}}else{let a=t.array,l=a.constructor,u=a.BYTES_PER_ELEMENT*e.itemSize*n,c=new l(a.buffer,u,e.array.length);c.set(e.array)}}function addScaledMatrix(e,t,n){let r=e.elements,i=t.elements;for(let o=0,s=i.length;o<s;o++)r[o]+=i[o]*n}function boneNormalTransform(e,t,n){let r=e.skeleton,i=e.geometry,o=r.bones,s=r.boneInverses;_skinIndex.fromBufferAttribute(i.attributes.skinIndex,t),_skinWeight.fromBufferAttribute(i.attributes.skinWeight,t),_matrix.elements.fill(0);for(let a=0;a<4;a++){let l=_skinWeight.getComponent(a);if(0!==l){let u=_skinIndex.getComponent(a);_boneMatrix.multiplyMatrices(o[u].matrixWorld,s[u]),addScaledMatrix(_matrix,_boneMatrix,l)}}return _matrix.multiply(e.bindMatrix).premultiply(e.bindMatrixInverse),n.transformDirection(_matrix),n}function applyMorphTarget(e,t,n,r,i){_morphVector.set(0,0,0);for(let o=0,s=e.length;o<s;o++){let a=t[o],l=e[o];0!==a&&(_temp.fromBufferAttribute(l,r),n?_morphVector.addScaledVector(_temp,a):_morphVector.addScaledVector(_temp.sub(i),a))}i.add(_morphVector)}function mergeBufferGeometries(t,n={useGroups:!1,updateIndex:!1,skipAttributes:[]},r=new p){let i=null!==t[0].index,{useGroups:o=!1,updateIndex:s=!1,skipAttributes:a=[]}=n,l=new Set(Object.keys(t[0].attributes)),u={},c=0;r.clearGroups();for(let d=0;d<t.length;++d){let f=t[d],h=0;if(i!==(null!==f.index))throw Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(let m in f.attributes){if(!l.has(m))throw Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.');void 0===u[m]&&(u[m]=[]),u[m].push(f.attributes[m]),h++}if(h!==l.size)throw Error("StaticGeometryGenerator: Make sure all geometries have the same number of attributes.");if(o){let x;if(i)x=f.index.count;else if(void 0!==f.attributes.position)x=f.attributes.position.count;else throw Error("StaticGeometryGenerator: The geometry must have either an index or a position attribute");r.addGroup(c,x,d),c+=x}}if(i){let $=!1;if(!r.index){let g=0;for(let y=0;y<t.length;++y)g+=t[y].index.count;r.setIndex(new e(new Uint32Array(g),1,!1)),$=!0}if(s||$){let b=r.index,v=0,_=0;for(let T=0;T<t.length;++T){let B=t[T],w=B.index;if(!0!==a[T])for(let I=0;I<w.count;++I)b.setX(v,w.getX(I)+_),v++;_+=B.attributes.position.count}}}for(let A in u){let S=u[A];if(!(A in r.attributes)){let P=0;for(let N in S)P+=S[N].count;r.setAttribute(A,createAttributeClone(u[A][0],P))}let E=r.attributes[A],M=0;for(let F=0,D=S.length;F<D;F++){let V=S[F];!0!==a[F]&&copyAttributeContents(V,E,M),M+=V.count}}return r}function checkTypedArrayEquality(e,t){if(null===e||null===t)return e===t;if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}class GeometryDiff{constructor(e){this.matrixWorld=new a,this.geometryHash=null,this.boneMatrices=null,this.primitiveCount=-1,this.mesh=e,this.update()}update(){let e=this.mesh,t=e.geometry,n=e.skeleton,r=(t.index?t.index.count:t.attributes.position.count)/3;if(this.matrixWorld.copy(e.matrixWorld),this.geometryHash=t.attributes.position.version,this.primitiveCount=r,n){n.boneTexture||n.computeBoneTexture(),n.update();let i=n.boneMatrices;this.boneMatrices&&this.boneMatrices.length===i.length?this.boneMatrices.set(i):this.boneMatrices=i.slice()}else this.boneMatrices=null}didChange(){let e=this.mesh,t=e.geometry,n=(t.index?t.index.count:t.attributes.position.count)/3,r=this.matrixWorld.equals(e.matrixWorld)&&this.geometryHash===t.attributes.position.version&&checkTypedArrayEquality(e.skeleton&&e.skeleton.boneMatrices||null,this.boneMatrices)&&this.primitiveCount===n;return!r}}class StaticGeometryGenerator{constructor(e){Array.isArray(e)||(e=[e]);let t=[];e.forEach(e=>{e.traverseVisible(e=>{e.isMesh&&t.push(e)})}),this.meshes=t,this.useGroups=!0,this.applyWorldTransforms=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=Array(t.length).fill().map(()=>new p),this._diffMap=new WeakMap}getMaterials(){let e=[];return this.meshes.forEach(t=>{Array.isArray(t.material)?e.push(...t.material):e.push(t.material)}),e}generate(e=new p){let t=[],{meshes:n,useGroups:r,_intermediateGeometry:i,_diffMap:o}=this;for(let s=0,a=n.length;s<a;s++){let l=n[s],u=i[s],c=o.get(l);!c||c.didChange(l)?(this._convertToStaticGeometry(l,u),t.push(!1),c?c.update():o.set(l,new GeometryDiff(l))):t.push(!0)}for(let d in mergeBufferGeometries(i,{useGroups:r,skipAttributes:t},e),e.attributes)e.attributes[d].needsUpdate=!0;return e}_convertToStaticGeometry(e,t=new p){let n=e.geometry,r=this.applyWorldTransforms,i=this.attributes.includes("normal"),o=this.attributes.includes("tangent"),s=n.attributes,a=t.attributes;t.index||(t.index=n.index),a.position||t.setAttribute("position",createAttributeClone(s.position)),i&&!a.normal&&s.normal&&t.setAttribute("normal",createAttributeClone(s.normal)),o&&!a.tangent&&s.tangent&&t.setAttribute("tangent",createAttributeClone(s.tangent)),validateAttributes(n.index,t.index),validateAttributes(s.position,a.position),i&&validateAttributes(s.normal,a.normal),o&&validateAttributes(s.tangent,a.tangent);let l=s.position,u=i?s.normal:null,c=o?s.tangent:null,d=n.morphAttributes.position,f=n.morphAttributes.normal,h=n.morphAttributes.tangent,m=n.morphTargetsRelative,x=e.morphTargetInfluences,$=new V;$.getNormalMatrix(e.matrixWorld);for(let g=0,y=s.position.count;g<y;g++)_positionVector.fromBufferAttribute(l,g),u&&_normalVector.fromBufferAttribute(u,g),c&&(_tangentVector4.fromBufferAttribute(c,g),_tangentVector.fromBufferAttribute(c,g)),x&&(d&&applyMorphTarget(d,x,m,g,_positionVector),f&&applyMorphTarget(f,x,m,g,_normalVector),h&&applyMorphTarget(h,x,m,g,_tangentVector)),e.isSkinnedMesh&&(e.boneTransform(g,_positionVector),u&&boneNormalTransform(e,g,_normalVector),c&&boneNormalTransform(e,g,_tangentVector)),r&&_positionVector.applyMatrix4(e.matrixWorld),a.position.setXYZ(g,_positionVector.x,_positionVector.y,_positionVector.z),u&&(r&&_normalVector.applyNormalMatrix($),a.normal.setXYZ(g,_normalVector.x,_normalVector.y,_normalVector.z)),c&&(r&&_tangentVector.transformDirection(e.matrixWorld),a.tangent.setXYZW(g,_tangentVector.x,_tangentVector.y,_tangentVector.z,_tangentVector4.w));for(let b in this.attributes){let v=this.attributes[b];"position"!==v&&"tangent"!==v&&"normal"!==v&&v in s&&(a[v]||t.setAttribute(v,createAttributeClone(s[v])),validateAttributes(s[v],a[v]),copyAttributeContents(s[v],a[v]))}return t}}export{AVERAGE,CENTER,CONTAINED,ExtendedTriangle,FloatVertexAttributeTexture,INTERSECTED,IntVertexAttributeTexture,MeshBVH,MeshBVHUniformStruct,MeshBVHVisualizer,NOT_INTERSECTED,OrientedBox,SAH,StaticGeometryGenerator,UIntVertexAttributeTexture,VertexAttributeTexture,acceleratedRaycast,computeBoundsTree,disposeBoundsTree,estimateMemoryInBytes,getBVHExtremes,getJSONStructure,getTriangleHitPointInfo,shaderDistanceFunction,shaderIntersectFunction,shaderStructs,validateBounds};