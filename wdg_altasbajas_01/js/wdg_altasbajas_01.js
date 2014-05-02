;jQuery(function($){ 
    (function($,T){
		
    	//desaparecer degradados izquierdo y derecho
    	 $('.wdg_altasbajas_01 .contenedor .tabla').scroll(function(event) {
	    	var anchoUL_carrusel;
	    	var position;
	    	var finaltotal;
	    	var anchotabla = $('.wdg_altasbajas_01 .contenedor .tabla .teams').width();
	    	
	    	anchoUL_carrusel = $('.wdg_altasbajas_01 .contenedor .tabla').width();	    	
	    	position = $('.wdg_altasbajas_01 .contenedor .tabla').scrollLeft();	    		    	
	    	finaltotal = position + anchoUL_carrusel;
	    	
	    	//degradado izquierdo	    		    
	    	if (position == 0){
	    		$('.wdg_altasbajas_01 .contenedor .degraded_left').hide();	    		
	    	}
	    	else {
	    		$('.wdg_altasbajas_01 .contenedor .degraded_left').show();	    		
	    	}
	    	
	    	//degradado derecho
	    	if (finaltotal >= anchotabla){	    			    		
	    		$('.wdg_altasbajas_01 .contenedor .degraded_right').hide();    		
	    	}
	    	else{
	    		$('.wdg_altasbajas_01 .contenedor .degraded_right').show();
	    	}
	    	
    	 });
    	
    	
		// set the date we're counting down to
		var target_date = new Date( $('.wdg_altasbajas_01 #target_date').attr('data-target_date') ).getTime();
		 
		// variables for time units
		var months, days, hours, minutes, seconds;
		
		// update the tag with id "countdown" every 1 second
		setInterval(function () {
		 
			// find the amount of "seconds" between now and target
			var current_date = new Date().getTime();
			var seconds_left = (target_date - current_date) / 1000;
		 
			// do some time calculations
			months = "<div class='superior'>"+parseInt(seconds_left / 2594000)+"<\/div><div class='inferior'>MES<\/div>";
			days = "<div class='superior'>"+parseInt(seconds_left / 86400)+"<\/div><div class='inferior'>DIA<\/div>";
			
			if(days > 30)
				days = days -30;
			
			seconds_left = seconds_left % 86400;
			 
			hours = "<div class='superior'>"+parseInt(seconds_left / 3600)+"<\/div><div class='inferior'>HRS<\/div>";
			seconds_left = seconds_left % 3600;
			 
			minutes = "<div class='superior'>"+parseInt(seconds_left / 60)+"<\/div><div class='inferior'>MIN<\/div>";
			seconds = "<div class='superior'>"+parseInt(seconds_left % 60)+"<\/div><div class='inferior'>SEG<\/div>";
			 
			
			$('.wdg_altasbajas_01 #months').html(months);
			$('.wdg_altasbajas_01 #days').html(days);
			$('.wdg_altasbajas_01 #hours').html(hours);
			$('.wdg_altasbajas_01 #minutes').html(minutes);
			$('.wdg_altasbajas_01 #seconds').html(seconds);
		 
		}, 1000);
		
		
	})($,Televisa);
});