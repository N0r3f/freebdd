
	$(document).ready(function() {
		setMode();
		$('#r-slider').attr('max','255');
		$('#r-slider').attr('value','0');	$('#r-value-dec').attr('value','0');
		$('#g-slider').attr('max','255');
		$('#g-slider').attr('value','0');	$('#g-value-dec').attr('value','0');
		$('#b-slider').attr('max','255');
		$('#b-slider').attr('value','0');	$('#b-value-dec').attr('value','0');
		$('#a-slider').attr('max','100');
		$('#a-slider').attr('value','100');	$('#a-value-dec').attr('value','1');
		$('#h-slider').attr('max','360');
		$('#h-slider').attr('value','180');	$('#h-value-dec').attr('value','180');
		$('#s-slider').attr('max','100');
		$('#s-slider').attr('value','50');	$('#s-value-dec').attr('value','50');
		$('#l-slider').attr('max','100');
		$('#l-slider').attr('value','50');	$('#l-value-dec').attr('value','50');
		$('#hwb-h-slider').attr('max','360');
		$('#hwb-h-slider').attr('value','180');	$('#h-value-dec').attr('value','180');
		$('#hwb-w-slider').attr('max','100');
		$('#hwb-w-slider').attr('value','50');	$('#s-value-dec').attr('value','50');
		$('#hwb-b-slider').attr('max','100');
		$('#hwb-b-slider').attr('value','50');	$('#l-value-dec').attr('value','50');
		setColor();
	});
	
	var mode='rgb';
	function setMode(value) {
		if(value){mode=value;}
		$('#rgb').hide(500);
		$('#hsl').hide(500);
		$('#hwb').hide(500);
		$('#'+mode).show(500);
		setColor();
	}
	function setSlider(id,value){
		$('#'+id).val(value);
		setColor();
	}
	function setColor(){
		if(mode=='rgb'){setColorRGB();}
		if(mode=='hsl'){setColorHSL();}
		if(mode=='hwb'){setColorHWB();}
	}
	function setColorRGB(r,g,b,a) {
		if(r==null){r=$('#r-slider').val()*1;}
		if(g==null){g=$('#g-slider').val()*1;}
		if(b==null){b=$('#b-slider').val()*1;}
		if(a==null){a=$('#a-slider').val()/100;}
		$('#r-value-dec').attr('value',r);
		$('#g-value-dec').attr('value',g);
		$('#b-value-dec').attr('value',b);
		$('#a-value-dec').attr('value',a);
		var R=r.toString(16); if(R.length<2) {R='0'+R;}
		var G=g.toString(16); if(G.length<2) {G='0'+G;}
		var B=b.toString(16); if(B.length<2) {B='0'+B;}
		var A=Math.round(a*255);A=A.toString(16); if(A.length<2) {A='0'+A;}
		R='<span class="red">'+R+'</span>';
		G='<span class="green">'+G+'</span>';
		B='<span class="blue">'+B+'</span>';
		A='<span class="alpha">'+A+'</span>';
		$('#color-result-hex').html('#'+R+G+B);
		$('#color-result-hexa').html('#'+R+G+B+A);
		$('#color-result-rgb').html('rgb(<span class="red">'+r+'</span>,<span class="green">'+g+'</span>,<span class="blue">'+b+'</span>)');
		$('#color-result-rgba').html('rgba(<span class="red">'+r+'</span>,<span class="green">'+g+'</span>,<span class="blue">'+b+'</span>,<span class="alpha">'+a+'</span>)');
		$('#color-result-color').css('background-color', 'rgba('+r+','+g+','+b+','+a+')');
		
		// récupérer par ajax le nom de la couleur :
		
		var url='colors-synth-2.php?r='+r+'&g='+g+'&b='+b;
		$('#color-result-name').load(url);
	}
	function setColorHSL() {
		var h=$('#h-slider').val()*1; var s=$('#s-slider').val()*1; var l=$('#l-slider').val()*1;
		$('#h-value-dec').val(h); $('#s-value-dec').val(s); $('#l-value-dec').val(l);
		var rgb=hslToRgb(h/360,s/100,l/100);
		setColorRGB(rgb[0],rgb[1],rgb[2]);
	}
	function setColorHWB() {
		var h=$('#hwb-h-slider').val()*1; var w=$('#hwb-w-slider').val()*1; var b=$('#hwb-b-slider').val()*1;
		$('#hwb-h-value-dec').val(h); $('#hwb-w-value-dec').val(w); $('#hwb-b-value-dec').val(b);
		var hsl=hwbToHsl(h,w,b);
		var rgb=hslToRgb(hsl[0],hsl[1],hsl[2]);
		setColorRGB(rgb[0],rgb[1],rgb[2]);
	}
	function hslToRgb(h,s,l){
		var m1,m2;
		if(l<=0.5) {m2=l*(s+1);}
		else {m2=l+s-l*s;}
		m1=l*2-m2;
		var r=hueToRgb(m1,m2,h+1/3);
		var g=hueToRgb(m1,m2,h);
		var b=hueToRgb(m1,m2,h-1/3);
		return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
	}
	function hwbToHsl(h,w,b){
		var s=1-w/(1-b);
		var l=1-b;
		return [h,s,l];
	}
	function hueToRgb(m1,m2,h){
       if(h<0) {h=h+1;}
       if(h>1) {h=h-1;}
       if(h*6<1) {return m1+(m2-m1)*h*6;}
       if(h*2<1) {return m2;}
       if(h*3<2) {return m1+(m2-m1)*(2/3-h)*6;}
       return m1;
	}

