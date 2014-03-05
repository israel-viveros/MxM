$(document).ready(function() {
    var onDocumentReady = function() {
		
		  var zIndexNumber = 1000;
			$('.wdg_lineup_01 div').each(function() {
				$(this).css('zIndex', zIndexNumber);
				zIndexNumber -= 10;
			});
        // TODO: refactor for a better approach
        var $parent = $('.wdg_lineup_01 .separadoizquierda_encabezado');
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
            $('.wdg_lineup_01_dropdowncontent p').html($(this).find('p').html());
        });
		// TODO: refactor for a better approach
        var $parent2 = $('.wdg_lineup_01 .separadoderecha');
        var $dropdownAnchor2 = $parent2.find('.wdg_lineup_012_dropdown');
        var $firstItem2 = $('.wdg_lineup_012_dropdowncontent li:first-child');
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
            $('.wdg_lineup_012_dropdowncontent p').html($(this).find('p').html());
        });
    };
    $(onDocumentReady);
});