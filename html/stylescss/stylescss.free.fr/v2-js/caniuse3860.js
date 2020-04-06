function showCanIuse(id='caniuse') {
	setCanIuse(id);
	$('#'+id).toggle(500);
}

function setCanIuse(id='caniuse') {
	var ciuPast = $('#'+id+'-past').prop('checked');
	var ciuNext = $('#'+id+'-next').prop('checked');
	var periods = 'current';
	if(ciuPast) {periods='past_5,past_4,past_3,past_2,past_1,'+periods;}
	if(ciuNext) {periods=periods+',future_1';}
	$('#'+id+'-embed').attr('data-periods',periods);
	iniCanIuse();	
}

/* 	Le code suivant est celui fourni par caniuse.comp
	https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/caniuse-embed.min.js
	modifié pour pouvoir être appelé à volonté et non plus sur 
	l'événement DOMContentLoaded.
*/
function iniCanIuse(){for(var e=document.getElementsByClassName("ciu_embed"),t=0;t<e.length;t++){var s=e[t],r=s.getAttribute("data-feature"),n=s.getAttribute("data-periods"),a=s.getAttribute("data-accessible-colours")||"false";if(r){var o="https://caniuse.bitsofco.de/embed/index.html",i='<iframe src="'+o+"?feat="+r+"&periods="+n+"&accessible-colours="+a+'" frameborder="0" width="100%" height="400px"></iframe>';s.innerHTML=i}else s.innerHTML="A feature was not included. Go to <a href='https://caniuse.bitsofco.de/#how-to-use'>https://caniuse.bitsofco.de/#how-to-use</a> to generate an embed."}var l=window.addEventListener?"addEventListener":"attachEvent";(0,window[l])("attachEvent"==l?"onmessage":"message",function(t){var s=t.data;if("string"==typeof s&&s.indexOf("ciu_embed")>-1)for(var r=s.split(":")[1],n=s.split(":")[2],a=0;a<e.length;a++){var o=e[a];if(o.getAttribute("data-feature")===r)
{var i=parseInt(n)+30;o.childNodes[0].height=i+"px";break}}},!1)};