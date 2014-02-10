;jQuery(function($){ 
    (function($,T){
    	
    	var activo_img = 0;
		var activo_vid = 0;	
		
function ocultar(){
			$('.wdg_mxm_live_02 .not_here').hide();
			$('.wdg_mxm_live_02 .vid_player_01 .not_here').hide();
			$('.wdg_mxm_live_02 .img_stage_01 .not_here').hide();
			$('.wdg_mxm_live_02 .vid_player_01 .not_here').css('display','none');
			$('.wdg_mxm_live_02 .img_stage_01 .not_here').css('display','none');
			$('.wdg_mxm_live_02 .tvsa-videocamera').removeClass("tvsa-error");
			$('.tvsa-camera').show(); 
	};
	     //Click camera
        $('.wdg_mxm_live_02 .tvsa-camera').on('click',function(event){
			$('.wdg_mxm_live_02 .tvsa-videocamera').removeClass("textcolor-title1"); 
			$('.wdg_mxm_live_02 .tvsa-camera').removeClass("textcolor-title1");
			$('.wdg_mxm_live_02 .vid_player_01').removeClass('here').addClass('not_here');
			$('.wdg_mxm_live_02 .img_stage_01').removeClass('here').addClass('not_here');
			$(this).parent().next('.img_stage_01').removeClass('not_here').addClass('here');
			ocultar();
			
			//---BEGIN: Ocultar y mostrar imagenes y videos. 
			
			/*activo_vid = 0;
			if(activo_img == 0){
				//Esconder todo
				$('.vid_player_01').hide();
				$('.tvsa-videocamera').removeClass("tvsa-error"); 
				$('.tvsa-videocamera').removeClass("textcolor-title1"); 
				
				
				$('.img_stage_01').hide();
				$('.tvsa-camera').removeClass("textcolor-title1");
				/*............./
				activo_img = 1;
			}
			else{
				activo_img=0;
			}*/
			var edo_this = $(this).parent().next('.img_stage_01').css('display'); 
			if(edo_this == 'block' ){
				$(this).parent().next('.img_stage_01').removeClass('here').addClass('not_here');
				$(this).parent().next('.img_stage_01').hide();
				$(this).addClass("textcolor-title1");
				
			}
			else{
				$(this).parent().next('.img_stage_01').show();
			}
			
            $(this).toggleClass("textcolor-title1");
			$(this).parent().siblings('.not_here').hide();
            $(this).parent().siblings('.vid_player_01').hide();
            $(this).parent().siblings('.icon-interactive').find('i').removeClass("textcolor-title1");
        });
        
        //Click videocamera
         $('.wdg_mxm_live_02 .tvsa-videocamera').on('click',function(event){ 
		 	$('.tvsa-videocamera').removeClass("active");          
			activo_vid = $(this).attr('class');
			if(activo_vid == "tvsa-videocamera"){
				//Esconder todo
				$('.vid_player_01').hide();
				$('.tvsa-videocamera').removeClass("tvsa-error"); 
				$('.tvsa-videocamera').removeClass("textcolor-title1"); 
				$('.img_stage_01').hide();
				$('.tvsa-camera').removeClass("textcolor-title1");	
				$('.tvsa-camera').show();			
			}
			
			//vsa-videocamera textcolor-title1 active tvsa-error
			$(this).addClass("active");
            $(this).parent().siblings('.vid_player_01').toggle();
            $(this).toggleClass("textcolor-title1");
            $(this).parent().siblings('.img_stage_01').hide();
            $(this).parent().siblings('.icon-interactive2').find('i').toggle();
            $(this).toggleClass('tvsa-error');
			activo_vid2 = $(this).attr('class');
			
			if( activo_vid2 == "tvsa-videocamera active"){
				$('.tvsa-videocamera').removeClass("active");
			}
			
        });    	
       //---END: Ocultar y mostrar imagenes y videos.
		
        /*$('.wdg_mxm_live_02').each(function(ix,element){
            
            var $this = $(this), 
                Pointer = {
                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                }, 
                $theUl = $this.find('.wdg_mxm_live_02_list');
                
            
            $this.find('a.prev, a.next').click(function(event){
                event.preventDefault();
            });
            
            $this.find('a.prev').bind(Pointer.DOWN,function(){
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() - $theUl.height()
                }, 500);
            });
            
            $this.find('a.next').bind(Pointer.DOWN,function(){
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() + $theUl.height()
                }, 500);

            });
            
        });
        
        $('.wdg_mxm_live_02 .wdg_mxm_live_02_verMas').click(function(event){
            event.preventDefault();            
			$('.wdg_mxm_live_02 ul li').css('display','block');
            $('.wdg_mxm_live_02 .wdg_mxm_live_02_verMas').hide();
			$('.wdg_mxm_live_02 .see_less').show();
			 $('.wdg_mxm_live_02 .degradado').hide();
        });
		$('.wdg_mxm_live_02 .see_less').on('click', function(){
			$('.wdg_mxm_live_02 ul li').hide();
			$('.wdg_mxm_live_02 ul li:nth-child(-n+10)').show();
			$('.wdg_mxm_live_02 .wdg_mxm_live_02_verMas').show();
			$(this).hide();
		});
		
		$('.wdg_mxm_live_02 .wdg_mxm_live_02_list').scroll(function() {
			  altura =  parseInt($('.wdg_mxm_live_02 .wdg_mxm_live_02_list').prop('scrollHeight'));
			  altura = altura;
			  $scrollTop = parseInt( $('.wdg_mxm_live_02 .wdg_mxm_live_02_list').height()) + parseInt($('.wdg_mxm_live_02 .wdg_mxm_live_02_list').scrollTop());
			  $scrollTop = $scrollTop;
				console.log('Altura total: ' + altura + ' Pos scroll: ' + $scrollTop);
			if( $('.wdg_mxm_live_02 .wdg_mxm_live_02_list').height() + $('.wdg_mxm_live_02 .wdg_mxm_live_02_list').scrollTop() == altura) {
           		 $('.wdg_mxm_live_02 .degradado').css("visibility","hidden");
      			}else{
				 $('.wdg_mxm_live_02 .degradado').css("visibility","visible");
				}
			});	 */   
		
    })($,Televisa);
});



