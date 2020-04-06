
$(document).ready(function() {
	tdmIni();
	deprecatedIni();
	if(getCookie('allowCookies')!='true') {
		$('#privacy').load(
			'v2-lib/privacy.html',
			function() {
				$('#privacy').dialog({
					'dialogClass': 'no-close',
					'modal': true,
					'draggable': false,
					'resizable': false,
					'width': '75%'
				})
			});
	}
});

// Gestion RGPD --------------------------------------------------

function refuseCookies() {
	setCookie('allowCookies',false,0);
}
function allowCookies() {
	setCookie('allowCookies',true,365);
	setCookie('allowPreferences',true,365);
	setCookie('allowAnalytic',true,365);
	setCookie('allowAdsense',true,365);
	$('#privacy').dialog('close');
}
function allowPreferences(value) {
	setCookie('allowPreferences',value,365);
	location.reload();
}
function allowAnalytic(value) {
	setCookie('allowAnalytic',value,365);
	location.reload();
}
function allowAdsense(value) {
	setCookie('allowAdsense',value,365);
	location.reload();
}

// Table des matières --------------------------------------------

function tdmToggle(id) {
	if($('#'+id).css('display')=='none') {
		$('.tdm-toggle').hide(100);
		$('#'+id).show(500, function() {
			var obj=document.getElementById(id);
			if(obj) {window.scrollTo(0, obj.offsetTop-100);}
		});
	}else {
		$('#'+id).hide(500);
	}
}
function tdmIni() {
	$('.tdm-toggle').hide();
	var url=window.location.href;
	if(url.indexOf('v2-functions')>=0) {
		$('#tdm-functions').show(0);
	}
	if(url.indexOf('v2-properties')>=0) {
		$('#tdm-properties').show(0);
	}
	if(url.indexOf('v2-references')>=0) {
		$('#tdm-references').show(0);
	}
	if(url.indexOf('v2-selectors')>=0) {
		$('#tdm-references').show(0);
	}
	if(url.indexOf('v2-tools')>=0) {
		$('#tdm-tools').show(0);
	}
	if(url.indexOf('v2-tricks')>=0) {
		$('#tdm-tricks').show(0);
	}
	if(url.indexOf('v2-tutoriels')>=0) {
		$('#tdm-tutoriels').show(0);
	}
	// Retirer les liens et ne laisser que les onClick (permet d'ajuster le scroll de la tdm):
//	$('.tdm-lettre a').attr('onclick','tdmJumpLetter(this)');
	$('.tdm-lettre a').removeAttr('href');
}
function tdmShow(id) {
	$(id).show(500);
}
function tdmJumpLetter(obj) {
	$('#tdm-properties').show(0);
	var lettre=obj.innerText;
	var obj=document.getElementById('tdm-'+lettre);
	if(obj) {window.scrollTo(0, obj.offsetTop-100);}
}

// Gestion du message flash ----------------------------------------

function closeFlash() {
	$('#flash').dialog('close');
	setCookie('flashVu','true',1);
}
function initFlash() {
	setCookie('flashVu','false',1);
}

// Gestion des cases à cocher Obsolète / expérimental --------------

function deprecatedIni() {
	var deprecated=(getCookie('showDeprecated')=='true');
	var experimental=(getCookie('showExperimental')=='true');
	$('#cbDeprecated').prop('checked',deprecated);
	$('#cbExperimental').prop('checked',experimental);
	showDeprecated(deprecated);
	showExperimental(experimental);
}
function showDeprecated(value) {
	if(value) {
		$('#tdm .deprecated').css('display','block');
	}
	else {
		$('#tdm .deprecated').css('display','none');
	}
	setCookie('showDeprecated',value,3);
}
function showExperimental(value) {
	if(value) {
		$('#tdm .experimental').css('display','block');
	}
	else {
		$('#tdm .experimental').css('display','none');
	}
	setCookie('showExperimental',value,3);
}

// Gestion des cookies ---------------------------------------

function setCookie(key, value, days) {
	var d = new Date();
	d.setTime(d.getTime() + (days*24*60*60*1000));
	var expires = "; expires="+d.toUTCString();
	var path = "; path=/;";
	document.cookie = key + "=" + value + expires + path;
}
function getCookie(key) {
	var name = key + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// Affiche le code HTML d'un élément dans l'info-bulle
// A appeler sur onmouseenter="settitle(this)"

function setTitle(obj){
	obj.removeAttribute('title');
	var wrap=document.createElement('div');
	wrap.appendChild(obj.cloneNode(true));
	var html=wrap.innerHTML;
	html=html.replace(/\t/g, '  ');
	html=html.replace('onmouseenter="setTitle(this)"', '');
	obj.setAttribute('title',html);
}

// Affiche ou masque le code CSS correspondant à l'élément cliqué
// On peut passer l'ID de la balise <style> ou un élément (this)
// Dans ce cas, suppose que id du CSS = id de l'élément suivi de -css

function toggleCss(obj) {
	if((typeof obj)=='string')
		{id=obj;}
	else
		{id=obj.id+'-css';}
	$('#'+id).toggle(500);
}
function showCode(obj,w,t) {
	if((typeof obj)=='string') {id=obj;} else {id=obj.id+'-css';}
	var width='400'; if(w) {width=w;}
	var title=$('#'+id).attr('title'); if(t) {title=t;}
	$('#'+id).dialog({
		'width':width,
		'title':title,
		'position': { my: "left top", at: "left+20 top+50", of: window }
	});
}

// Gestion des simulateurs --------------------------------------

function changePrefix() {
	var prefix=$('#choix-prefix').val();
	$('#demo-std').hide();
	$('#demo-moz').hide();
	$('#demo-mse').hide();
	$('#demo-ope').hide();
	$('#demo-wkt').hide();
//	$('.demo-buttons').hide();
	$('#demo-'+prefix).show(500);
}
function changeProperty(selector,property,value,add,prefix) {
	if(add==undefined){add=false;}
	if(prefix==undefined) {prefix='std';}
	var style=''; 
	if(add) {style=$(selector).attr('style');}
	if(!style) {style='';}
	//var style=property+':'+value+';';
	switch(prefix) {
		case 'std': style+=property+':'+value+';'; break;
		case 'moz': style+='-moz-'+property+':'+value+';'; break;
		case 'wkt': style+='-webkit-'+property+':'+value+';'; break;
		case 'mse': style+='-ms-'+property+':'+value+';'; break;
		case 'ope': style+='-o-'+property+':'+value+';'; break;
	}
	$(selector).attr('style',style);
}
function enterForIE(id) {
	if(event.keyCode==13) {changeValue(id);}	// Fait que la touche ENTER valide la saisie sur IE
}
// Gestion du formulaire de remarque :

function postRemarque() {
	if($('#frm-remarque #rem-description').val().trim()=='') {
		alert("Vous n'avez pas formulé de remarque.");
		return;
	}
 	if($('#frm-remarque #rem-antispam').val().trim()=='') {
		alert("Vous n'avez pas répondu à la question antispam.");
		return;
	}
   $.ajax({type:'POST', url: '/v2-lib/remarque-post.php', data: $('#frm-remarque').serialize(), 
		success: function(data){$('#frm-remarque').hide(); alert('Nous vous remercions de votre participation.');},
		error: function(xhr){$('#ar').text(xhr.responseText);}
	});
}
