(this["webpackJsonpflight-coding-challenge"]=this["webpackJsonpflight-coding-challenge"]||[]).push([[0],[,,,,function(e,a,t){e.exports=t(11)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(3),c=t.n(r),i=(t(9),t(1)),s=function(){var e=Object(n.useState)(""),a=Object(i.a)(e,2),t=a[0],r=a[1],c=Object(n.useState)(null),s=Object(i.a)(c,2),u=s[0],o=s[1],m=Object(n.useState)(!1),h=Object(i.a)(m,2),d=h[0],p=h[1],g=Object(n.useState)(!1),v=Object(i.a)(g,2),E=v[0],f=v[1],b=function(e){var a=new Date(e),t=a.getFullYear(),n=a.getMonth()+1;return a.getDate()+"-"+n+"-"+t+"/"},_=function(e){var a=new Date(e);return a.getHours()+":"+a.getMinutes()};return l.a.createElement(n.Fragment,null,l.a.createElement("div",{className:"search__container"},l.a.createElement("h1",null,"Check Flight Status"),l.a.createElement("div",{className:"search__input-fields m-2"},l.a.createElement("input",{className:"mr-3",type:"text",placeholder:"ex: FR123",onChange:function(e){return r(e.target.value)}}),l.a.createElement("button",{className:"btn btn-info",onClick:function(){p(!0),o(null);var e="access_key=".concat("861229bb28962d6e0ad1ee407cb41a20"),a="flight_iata=".concat(t.toUpperCase()),n="".concat("https://cors-anywhere.herokuapp.com/http://api.aviationstack.com/v1/flights","?").concat(e,"&").concat(a);fetch(n).then((function(e){return e.json()})).then((function(e){if(0===e.data.length)return p(!1),f(!0),void setTimeout((function(){f(!1)}),3e3);o(e.data[0]),p(!1)})).catch((function(){p(!1),f(!0)}))}},"Search"),d&&l.a.createElement("div",{className:"text-center"},l.a.createElement("div",{className:"spinner-border",role:"status"},l.a.createElement("span",{className:"sr-only"},"Loading...")))),E&&l.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Wrong flight number, please try again."),u&&u.arrival&&u.departure&&l.a.createElement("div",{className:"search__flight-info animated fadeIn"},l.a.createElement("div",{className:"search__status"},l.a.createElement("h2",null,"Flight Status: ",l.a.createElement("span",null,u.flight_status)),l.a.createElement("h2",null,"Flight duration:"," ",l.a.createElement("span",null,function(e,a){e=e.split(":"),a=a.split(":");var t=new Date(0,0,0,e[0],e[1],0),n=new Date(0,0,0,a[0],a[1],0).getTime()-t.getTime(),l=Math.floor(n/1e3/60/60);n-=1e3*l*60*60;var r=Math.floor(n/1e3/60);return(l<9?"0":"")+l+":"+(r<9?"0":"")+r}(_(u.departure.scheduled),_(u.arrival.scheduled))," ","hours"))),l.a.createElement("div",{className:"search__departure-arrival"},l.a.createElement("div",{className:"search__departure"},l.a.createElement("h3",null,"Departure"),l.a.createElement("h5",null,"Airport: ",l.a.createElement("span",null,u.departure.iata)),l.a.createElement("h5",null,"Arrival Time:",l.a.createElement("span",null,b(u.departure.scheduled)," ",_(u.departure.scheduled))),l.a.createElement("h5",null,"Terminal: ",l.a.createElement("span",null,u.departure.terminal)," Gate:",l.a.createElement("span",null,null==u.departure.gate?"Info is not available":u.departure.gate))),l.a.createElement("div",{className:"search__arrival"},l.a.createElement("h3",null,"Arrival"),l.a.createElement("h5",null,"Airport: ",l.a.createElement("span",null,u.arrival.iata)),l.a.createElement("h5",null,"Arrival Time:",l.a.createElement("span",null,b(u.arrival.scheduled)," ",_(u.arrival.scheduled))),l.a.createElement("h5",null,"Terminal: ",l.a.createElement("span",null,u.arrival.terminal)," Gate:",l.a.createElement("span",null,null===u.arrival.gate?"Info is not available":u.arrival.gate)),l.a.createElement("h5",null,"Baggage belt Nr:"," ",l.a.createElement("span",null,null===u.arrival.baggage?"Info is not available":u.arrival.baggage)))))))};t(10);var u=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(s,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(u,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[4,1,2]]]);
//# sourceMappingURL=main.bd990015.chunk.js.map