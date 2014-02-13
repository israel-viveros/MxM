//$(document).ready(function() { //Html esencial y DOM
$(window).load(function() {	 //Imágenes y demas HTML
    if( $(window).width() <  624 ){
         $('.mix_carru_01b').css('overflow','hidden')
        var $height = $('.mix_carru_01b .resize img');
        $height.load(function() {
                var $imageHeight = $(this).width(); 
                var $totalHeight = $imageHeight * 0.75;
                $height.height($totalHeight);
                $height.parents('.resize').height($totalHeight);
        });
    }
	
    $(window).resize(function() {
        if( $(window).width() <  624 ){
            var $imageHeight = $height.width(); 
                var $totalHeight = $imageHeight * 0.75;
                $height.height($totalHeight+10);
                $height.parents('.resize').height($totalHeight);
        }
    });
	
    $('.mix_carru_01b .resize img').load(function() {
        if( $(window).width() <  624 ){
            var $imageHeight = $height.width(); 
                var $totalHeight = $imageHeight * 0.75;
                $height.height($totalHeight+10);
                $height.parents('.resize').height($totalHeight);
        }
    });
	
	var elem = document.getElementById('mix_carru_01b_swipe');
    var $time = $('.mix_carru_01b .type2b2_02').attr('data-time');
    window.mySwipe = Swipe(elem, {
        startSlide: 0,
        auto: $time, 
        continuous: true, 
        callback: function(index, element) { 
            /** inicia seccion para activar el bullet actual **/
            $(".mix_carru_01b .bullets_02 ul li").each(function(){
                id = $(this).attr("id"); 
                if("bullet_"+index == id) 
                {
                    $(this).removeClass('background-color4');
                    $(this).addClass('background-color1');
                }
                else 
                {
                    $(this).removeClass('background-color1');
                    $(this).addClass('background-color4');
                }
            });   
            /** termina seccion para activar el bullet actual **/  

            /** inicia seccion para activar el thumb_ actual **/
            $(".mix_carru_01b .galleryThumbs li").each(function(){
                id_thumb = $(this).attr("id"); 
                if("thumb_"+index == id_thumb)  
                { 
                    $(this).addClass("active");
                    title_item = $("#"+id_thumb +" a").attr('data-title'); 
                    $(".mix_carru_01b .galleryCaption_02 h2 a").html(title_item);
                } 
                else 
                { $(this).removeClass("active"); }
            });
			if($.browser.msie && $.browser.version <= 9)
					{	
						if(index == 0){
							$('.mix_carru_01b .galleryImages_02').scrollLeft(0);
						}
						if(index == 1){
							$('.mix_carru_01b .galleryImages_02').scrollLeft(624);
						}
						if(index == 2){
							$('.mix_carru_01b .galleryImages_02').scrollLeft(1248);
						}
						if(index == 3){
							$('.mix_carru_01b .galleryImages_02').scrollLeft(1872);
						}
						if(index == 4){
							$('.mix_carru_01b .galleryImages_02').scrollLeft(2496);
						}
						if(index == 5){
							$('.mix_carru_01b .galleryImages_02').scrollLeft(3120);
						}
					}    
            /** termina seccion para activar el thumb_ actual **/
        },
        transitionEnd: function(index, element) {} 
    });  
 		/*Mouse Enter*/
		$('.mix_carru_01b .swipe-wrap')
			.mouseenter(function() {
			//$(this).attr('id');
			$hijo_act = $(this).parent().siblings('.galleryThumbs').children('.active').index();
			window.mySwipe.slide(parseInt($hijo_act), 0);
			})
			.mouseleave(function() {
				//window.mySwipe.slide(parseInt($hijo_act), 1);
				 window.mySwipe = Swipe(elem, {
        startSlide: $hijo_act,
        auto: $time, 
        continuous: true, 
        callback: function(index, element) { 
            /** inicia seccion para activar el bullet actual **/
            $(".mix_carru_01b .bullets_02 ul li").each(function(){
                id = $(this).attr("id"); 
                if("bullet_"+index == id) 
                {
                    $(this).removeClass('background-color4');
                    $(this).addClass('background-color1');
                }
                else 
                {
                    $(this).removeClass('background-color1');
                    $(this).addClass('background-color4');
                }
            });   
            /** termina seccion para activar el bullet actual **/  

            /** inicia seccion para activar el thumb_ actual **/
            $(".mix_carru_01b .galleryThumbs li").each(function(){
                id_thumb = $(this).attr("id"); 
                if("thumb_"+index == id_thumb)  
                { 
					
                    $(this).addClass("active");
                    title_item = $(".mix_carru_01b #"+id_thumb +" a").attr('data-title'); 
					
                    $(".mix_carru_01b .galleryCaption_02 h2 a").html(title_item);
                } 
                else 
                { $(this).removeClass("active"); }
            });    
            /** termina seccion para activar el thumb_ actual **/
        },
        transitionEnd: function(index, element) {} 
    });  
			});
		/*END Mouse Enter*/
 
 
    /** Evento click para los thumbs **/
    $(".mix_carru_01b .galleryThumbs li").click(function(e){
        e.preventDefault();
		if($.browser.msie && $.browser.version <= 9)
		{	
			var id_actual = $(this).attr('id');
			id_actual = id_actual.split("_");  
			id_actual = id_actual[1];
			if(id_actual == 0){
				$('.mix_carru_01b .galleryImages_02').scrollLeft(0);
			}
			if(id_actual == 1){
				$('.mix_carru_01b .galleryImages_02').scrollLeft(624);
			}
			if(id_actual == 2){
				$('.mix_carru_01b .galleryImages_02').scrollLeft(1248);
			}
			if(id_actual == 3){
				$('.mix_carru_01b .galleryImages_02').scrollLeft(1872);
			}
			if(id_actual == 4){
				$('.mix_carru_01b .galleryImages_02').scrollLeft(2496);
			}
			if(id_actual == 5){
				$('.mix_carru_01b .galleryImages_02').scrollLeft(3120);
			}
		}else{
			var id_actual = $(this).attr('id');
			id_actual = id_actual.split("_");  
			id_actual = id_actual[1]; 
			window.mySwipe.slide(parseInt(id_actual), 1);  
		}
		
		
		
    });  
	/*Tablet*/
	$(".mix_carru_01b .galleryThumbs li").on('touchstart',function(e) {
		event.preventDefault();
	 	var id_actual = $(this).attr('id');
        id_actual = id_actual.split("_");  
        id_actual = id_actual[1]; 
        window.mySwipe.slide(parseInt(id_actual), 1); 
	});
    var clickEvent = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
    $(".mix_carru_01b .galleryThumbs li").bind(clickEvent, obtener_foto); 

    function obtener_foto()   
    { 
        var id_actual = $(this).attr('id');
        id_actual = id_actual.split("_");  
        id_actual = id_actual[1]; 
        window.mySwipe.slide(parseInt(id_actual), 1); 
    }
});
 

