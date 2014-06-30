$(document).ready(function(){
       
    if($(window).width()<948){
    	$('.wdg_rate_player_01 .vote_block').on('touchstart',function(event){
    		$(this).next('div').toggle();
    		event.preventDefault(event);
    	});
    }   
	$('.wdg_rate_player_01 .vote_block').click(function(){
		//$(this).hide();
		$(this).next('div').show();
		$(this).next().find('div').css('border-top','0');
		$(".participated").delay(5000).fadeOut('slow');
		//$(this).parents('.first_child').find('td').css('border-top','1px solid #ccc');
		//$(this).parents('.evaluation').next().children('td').find('div').css('border-top','0');
		//$(this).parents('.evaluation').next().children('td').css('border-top','0');
		
	});

	 $('.wdg_rate_player_01 .calification div').mouseenter(function() {
		$(this).children('p').removeClass();
		$(this).children('p').addClass('textcolor-title1');
	}).mouseleave(function() {
		$(this).children('p').removeClass();
		$(this).children('p').addClass('textcolor-title4');
	});

	$('.wdg_rate_player_01 .calification div').on('click',function(){
		console.log( $(this).next());
        //$(this).parents('.evaluation').find('td').css('border-top','1px solid #ccc');
        //$(this).parents('.evaluation').prev('.evaluation').children('td').find('div').css('border-bottom','0');
        $(this).parents('.calification').prev('.calification').remove();
        //$(this).parents('.evaluation').prev('.evaluation').find('td').find('.calification').css('border-bottom','0');
        //$(this).parents('.evaluation').prev('.evaluation').find('td').find('.participated').css('border-bottom','0');
        $(this).parents('.calification').next('.participated').find('div').css('border-bottom','1px solid #ccc');
        //$(this).parents('.calification').next('.first_child').find('div').css('border-top','1px solid #ccc');
        //$(this).parents('.calification').next('.calification').find('div').css('border-top','0');
        //$(this).parents('.calification').next().next().next().find('div').css('border-top','0');
        $(this).parents('.calification').next().show();
        $(this).parents('.calification').remove();
        $('.wdg_rate_player_01 .last_child div').css('border-bottom','0');
        $(".participated").delay(5000).fadeOut('slow'); 
	});
	
	$(".wdg_rate_player_01 .conteiner_two").mouseleave(function(){
		$('.wdg_rate_player_01 .calification').hide();
	});


	/*Salgo del div calificaciones */
	$('.wdg_rate_player_01 .calification').mouseleave(function() {
		$(this).hide();
		$(this).prev('tr').prev('.vote').show();
		$(this).prev('tr').show();
		$//(this).parents('.first_child').find('td').css('border-top','0');
		//console.log($(this).parents('.evaluation').children('td').find('.participated'));
		//$(this).parents('.evaluation').next('.evaluation').children('td').find('.participated').css('border-top','1px solid #ccc');
	});
	
	
	if (!$.browser.opera) {
			// select element styling
			$('.wdg_rate_player_01 select.team1').each(function(){
				var title = $(this).attr('title');
				if ($.browser.msie && $.browser.version < 9) {
	
				}
				else
			{
				if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
				$(this)
					.css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
					.after('<span class="select1">' + title + '</span>')
					.change(function(){
						val = $('option:selected',this).text();
						$(this).next().text(val);
						})
				}
			});
			
				// select element styling
			$('.wdg_rate_player_01 select.team2').each(function(){
				var title = $(this).attr('title');
				if ($.browser.msie && $.browser.version < 9) {
	
				}
				else
			{
				if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
				$(this)
					.css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
					.after('<span class="select2">' + title + '</span>')
					.change(function(){
						val = $('option:selected',this).text();
						$(this).next().text(val);
						})
				}
			});
		};
		
		
		
		
		
		
		
		
		
		
		
		
		// TODO: refactor for a better approach
        var $parent = $('.wdg_rate_player_01');
        var $dropdownAnchor = $parent.find('.wdg_lineup_01_dropdown');
        var $firstItem = $('.wdg_lineup_01_dropdownlist li:first-child');
        var $dropdownItems = $parent.find('.wdg_lineup_01_dropdownlist li');
        var $listItems = $('.wdg_lineup_01_dropdownlist')
        $('.wdg_lineup_01_dropdowncontent p').html($firstItem.find('p').html());
		
		
        $dropdownAnchor.bind('click', function(evt) {
            evt.preventDefault();
            //var totalHeight= 0;
            /*var visibilidad = $listItems.css('visibility'); */
            var lisItemsChild = $(this).children('.wdg_lineup_01_listcontainer').children('.wdg_lineup_01_dropdownlist:first-child');
            var visibilidad = lisItemsChild.css('visibility');
            /*$listItems.find('li').each(function() {
                totalHeight += $(this).outerHeight(true);
            });*/

        /* $(this).parents('.img_galry_01').find('.galleryLink').each( function (){             
                $(this).find('div.selectedGallery').removeClass('selectedGallery');
            }); */
            visibilidadChild = $(this).children($listItems);
            if ( visibilidad == 'hidden' ) {
                lisItemsChild.css({
                    visibility: 'visible',
                    height: '176px',
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden'         
                });
                
            } else {
                lisItemsChild.css({
                    visibility: 'hidden',
                    height: '0px'
                });
            }
        });
        
        $dropdownAnchor.bind('mouseleave', function(evt) {
            evt.preventDefault();
			var $listItems = $(this).find('.wdg_lineup_01_dropdownlist');
			var visibilidad = $listItems.css('visibility');
            if ( visibilidad == 'visible' ) {
                $listItems.css({
                    visibility: 'hidden',
                    height: '0px'     
                });
            } 
        });
        
        
        $dropdownItems.bind('click', function(evt) {
            evt.preventDefault();
            $(this).parents('.wdg_rate_player_01').find('.wdg_lineup_01_dropdowncontent p').html($(this).find('p').html());
        });
		
		
		
		
		// TODO: refactor for a better approach
        var $parent2 = $('.wdg_rate_player_01');
        var $dropdownAnchor2 = $parent2.find('.drop2');
        var $firstItem2 = $('.wdg_lineup_012_dropdownlist li:first-child');
        var $dropdownItems2 = $parent2.find('.wdg_lineup_012_dropdownlist li');
        var $listItems2 = $('.wdg_lineup_012_dropdownlist')
        $('.wdg_lineup_012_dropdowncontent p').html($firstItem2.find('p').html());
        $dropdownAnchor2.bind('click', function(evt) {
            evt.preventDefault();
            //var totalHeight= 0;
            //var visibilidad = $listItems2.css('visibility'); 
            /*var lisItemsChild2 = $(this).children('.wdg_lineup_01_listcontainer').children('.wdg_lineup_01_dropdownlist:first-child');
            var visibilidad2 = lisItemsChild.css('visibility');*/

            var visibilidad = $(this).children('.wdg_lineup_012_listcontainer').children().css('visibility');

            var lisItemsChild = $(this).children('.wdg_lineup_012_listcontainer').children();
            /*$listItems.find('li').each(function() {
                totalHeight += $(this).outerHeight(true);
            });*/
            if ( visibilidad == 'hidden' ) {
                lisItemsChild.css({
                    visibility: 'visible',
                    height: '176px',
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden'         
                });
                
            } else {
                lisItemsChild.css({
                    visibility: 'hidden',
                    height: '0px'
                });
            }
        });
        
        $dropdownAnchor2.bind('mouseleave', function(evt) {
            evt.preventDefault();
			var $listItems = $(this).find('.wdg_lineup_012_dropdownlist');
			var visibilidad = $listItems.css('visibility');
            if ( visibilidad == 'visible' ) {
                $listItems.css({
                    visibility: 'hidden',
                    height: '0px'      
                });
            } 
        });
        
        $dropdownItems2.bind('click', function(evt) {
            evt.preventDefault();
            $parent2.find('.wdg_lineup_012_dropdowncontent p').html($(this).find('p').html());
        });
		
		
		
		
		
		
	
	
	
});