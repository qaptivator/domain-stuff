import{_ as u,c as a,a as n,b as d,d as e,F as p,r as f,o as r,e as m,w as _,t as y,f as x}from"./FIi6ZkoF.js";const b={name:"External tools",data(){return{externalTools:[],fetchFailed:!1}},mounted(){fetch("https://raw.githubusercontent.com/qaptivator/domain-stuff/refs/heads/main/external-tools.txt").then(t=>t.text()).then(t=>this.toolsFetched(t)).catch(t=>{this.fetchFailed=!0,console.error("Failed to fetch the latest external tool list! Try reloading this page or checking your internet connection, and if this issue persists, file a GitHub issue in the repository page.")})},computed:{validateForm(){}},methods:{routerPush(t){this.$router.push(t)},toolsFetched(t){if(!t)return;const i=t.split(/\n/);if(i)for(const l of i){const[c,o]=l.split("|")??["",""];if(!c)return;this.externalTools.push({name:c,link:o})}}}},g={class:"p-4 text-xl"},k=e("h1",null,"> best external tools",-1),F=e("p",{class:"mb-8"}," the best open source tools, which prefer utility and quality over annoyance and greed ",-1),T=e("p",{class:"mb-2"},[n(" this is a list of best open source, which have some utilitary functions. "),e("span",{class:"text-sm opacity-30"},"(p.s. not all of them are open source, im sorry. im just picking the ones that are good)"),e("br"),n(" these are hand picked by my personal preference, so you are not forced to use them."),e("br"),n(" i am not responsible for any issues occuring on these external tools, because they are not owned by me."),e("br"),e("span",{class:"italic"},"paid tools are marked by * (asterisk)."),e("br"),e("br")],-1),v={key:0,class:"text-red-500"},w=e("br",null,null,-1);function B(t,i,l,c,o,N){const h=x;return r(),a("div",g,[k,F,T,o.fetchFailed?(r(),a("p",v,[n(" Failed to fetch the latest external tool list!"),w,n(" Try reloading this page or checking your internet connection, and if this issue persists, file a GitHub issue in the repository page. ")])):d("",!0),e("ul",null,[(r(!0),a(p,null,f(o.externalTools,s=>(r(),a("li",null,[n(" > "),(r(),m(h,{key:s==null?void 0:s.name,class:"no-underline hover:underline",to:s==null?void 0:s.link,target:"_blank"},{default:_(()=>[n(y(s==null?void 0:s.name),1)]),_:2},1032,["to"]))]))),256))])])}const $=u(b,[["render",B]]);export{$ as default};
