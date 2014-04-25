/*your js code */
;
(function() {
    $.fn.MxMRatingMain = function(options) {    	    	
    	var setting = $.extend({        	
            'idTorneo': 0,
            'idEvento': 0
    
        }, options);
    	    	    
    	var GlobalThis = this;    	
  
        var wdg_rating_main_01 = {
        
        		urlPLayerDetail: 'http://mxm.televisadeportes.esmas.com/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/gameplayerdetailjsonp.js',
        		tagRatingMain: $("#containerwdg_rating_main_01"),
        		
        		
        		pintaInfo: function(dataGamePlayer) {
        			alert ('entra a pintar Main');
        			var maquetado = "";
        			var porcentaje = new Array();
        			var photo = new Array();        			
        			//console.log(dataGamePlayer);
        			//console.log(objeto);
        			var longitud = dataGamePlayer.poll['answers']['answer'].length;        			        		
        			console.log(longitud);
        			        			
        			for(var i=0; i<longitud; i++){        		
        				porcentaje[i] = parseFloat(dataGamePlayer.poll['answers']['answer'][i]['percent']);        				
        				photo[i] = dataGamePlayer.poll['answers']['answer'][i]['photo'];

        				//        				var objeto2 = new Array();        			
//        				objeto2[0]=dataGamePlayer.poll['answers']['answer'][i]['number'];        			
//        				objeto2[1]=dataGamePlayer.poll['answers']['answer'][i]['photo'];
//        				objeto2[2]=dataGamePlayer.poll['answers']['answer'][i]['percent'];
//        				objeto2[3]=dataGamePlayer.poll['answers']['answer'][i]['name'];
//        				
//        				objeto[i]=objeto2;
        				        				
        			}
        			
        			
        			porcentaje.sort(function(a,b){return b - a});
        			
        			
        			console.log(porcentaje);
        			
           			maquetado += "<div class='wdg_rating_main_01'>";           			
	           			maquetado += "<div class='wdg_rating_main_01_player'>";
		           			maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
		           			maquetado += "<p class='average textcolor-title4 dotted-right'>8.2</p>";
		           			maquetado += "<p class='average_total textcolor-title1'>8.5</p>";
		           			maquetado += "<img alt='' class='father' src='http://placehold.it/300x225'>";
		           			maquetado += "<p class='name'>Jonathan Orozco</p>";
		           			maquetado += "<p class='activity textcolor-title4'>Portero</p>"; 
		           			maquetado += "<p class='activityn textcolor-title1'>Monterrey</p>";
	           			maquetado += "</div>";           			
	           			maquetado += "<div class='wdg_rating_main_01_players dotted-bottom'>";
		           			maquetado += "<img alt='' src='http://placehold.it/136x102'>";
		           			maquetado += "<div class='player_data dotted-bottom'>";
			           			maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
			           			maquetado += "<p class='average textcolor-title4 dotted-right'>8.2</p>";
			           			maquetado += "<p class='average_total textcolor-title1'>8.5</p>";
			           		maquetado += "</div>";			           	
		           			maquetado += "<div class='player_data2'>";
			           			maquetado += "<p class='name'>Jonathan Orozco</p>";
			           			maquetado += "<p class='activity textcolor-title4'>Portero</p>";
			           			maquetado += "<p class='activityn textcolor-title1'>Monterrey</p>";
		           			maquetado += "</div>";
	           			maquetado += "</div>";
	           			maquetado += "<div class='separator'></div>";
	           				maquetado += "<div class='wdg_rating_main_01_players'>";
	           					maquetado += "<img alt='' src='http://placehold.it/136x102'>";
	           					maquetado += "<div class='player_data dotted-bottom'>";
				           			maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
				           			maquetado += "<p class='average textcolor-title4 dotted-right'>8.2</p>";
				           			maquetado += "<p class='average_total textcolor-title1'>8.5</p>";
				           		maquetado += "</div>";
				           		maquetado += "<div class='player_data2'>";
				           			maquetado += "<p class='name'>Jonathan Orozco</p>";
				           			maquetado += "<p class='activity textcolor-title4'>Portero</p>";
				           			maquetado += "<p class='activityn textcolor-title1'>Monterrey</p>";
				           		maquetado += "</div>";
				           	maquetado += "</div>";
				        maquetado += "</div>";
				    maquetado += "</div>";
           			           		
           			wdg_rating_main_01.tagRatingMain.html(maquetado);               			
        			
        		},
        
        		//Obtener los Detalles de los jugadores
        		getGamePlayerDetail: function(valor) {            		
		    		$.ajax({
						url: wdg_rating_main_01.urlPLayerDetail,
						type: "GET",
		                dataType: 'jsonp',
		                jsonpCallback: 'gameplayerdetail',
		                cache: false,
		                success:function(dataGamePlayer){                                  	
		                	wdg_rating_main_01.pintaInfo(dataGamePlayer);                        	                       
		                }
		    		});
        		}
        }
        
        wdg_rating_main_01.getGamePlayerDetail(true);
        
    };
        
       
	
})(jQuery);