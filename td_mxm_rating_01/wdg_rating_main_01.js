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
        		
        		posicionTexto: function(posicion){        			
        			var posicionTexto;        			
        			switch (posicion){
        				case "GK":
        					posicionTexto = "Portero";
        					break;        					
	        			case "D":
	        				posicionTexto = "Defensa";
	        				break;	        				
	        			case "MF":
	        				posicionTexto = "Medio";
	        				break;	        				
	        			case "F":
	        				posicionTexto = "Delantero";
	        				break;
	        				
	        			default: 
	        				posicionTexto = "<span style='display:block; height:10px; width:50px;'>";	        			
        			}        			
        			return posicionTexto;        			
        		},        		        		
        		
        		pintaInfo: function(dataGamePlayer) {        			
        			var maquetado = "";
        			var infoArray = new Array();        			        		       			        	
       
        			for(var i=0; i<dataGamePlayer.poll['answers']['answer'].length; i++){        		        				        				     		
        				infoArray.push({
        					id:i,
        					porcentaje:parseFloat(dataGamePlayer.poll['answers']['answer'][i]['percent']),
        					foto:dataGamePlayer.poll['answers']['answer'][i]['photo'],
        					nombre:dataGamePlayer.poll['answers']['answer'][i]['name'],
        					posicion:wdg_rating_main_01.posicionTexto(dataGamePlayer.poll['answers']['answer'][i]['position']),
        					club:dataGamePlayer.poll['answers']['answer'][i]['clubname']
        				});        				
        			}        			
        			
        			infoArray.sort(function(a,b){
        				return b.porcentaje - a.porcentaje;
        			});        			        			     		
        			
        			//Validar que el campo de la foto no este vacio...
					if (infoArray[0]['foto'] == '' || infoArray[0]['foto'] == null){
						console.log('entra 0');
        				var valorFoto0 = 'http://placehold.it/300x225';
        			}else{
        				var valorFoto0 = infoArray[0]['foto'];
        			}
					if (infoArray[1]['foto'] == '' || infoArray[1]['foto'] == null){
						console.log('entra 1');
        				var valorFoto1 = 'http://placehold.it/300x225';
        			}else{
        				var valorFoto1 = infoArray[1]['foto'];
        			}
					if (infoArray[2]['foto'] == '' || infoArray[2]['foto'] == null){
						console.log('entra 2');
        				var valorFoto2 = 'http://placehold.it/300x225';
        			}else{
        				var valorFoto2 = infoArray[2]['foto'];
        			}
										
           			maquetado += "<div class='wdg_rating_main_01'>";           			
	           			maquetado += "<div class='wdg_rating_main_01_player'>";
		           			maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
		           			maquetado += "<p class='average textcolor-title4 dotted-right'>10</p>";
		           			maquetado += "<p class='average_total textcolor-title1'>"+infoArray[0]['porcentaje']+"</p>";
		           			maquetado += "<img alt='' class='father' src='"+valorFoto0+"'>";
		           			maquetado += "<p class='name'>Nombre "+ infoArray[0]['nombre']+"</p>";
		           			maquetado += "<p class='activity textcolor-title4'>"+infoArray[0]['posicion']+"</p>"; 
		           			maquetado += "<p class='activityn textcolor-title1'>"+infoArray[0]['club']+"</p>";
	           			maquetado += "</div>";           			
	           			maquetado += "<div class='wdg_rating_main_01_players dotted-bottom'>";
		           			maquetado += "<img alt='' src='"+valorFoto1+"'>";
		           			maquetado += "<div class='player_data dotted-bottom'>";
			           			maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
			           			maquetado += "<p class='average textcolor-title4 dotted-right'>10</p>";
			           			maquetado += "<p class='average_total textcolor-title1'>"+infoArray[1]['porcentaje']+"</p>";
			           		maquetado += "</div>";			           	
		           			maquetado += "<div class='player_data2'>";
			           			maquetado += "<p class='name'>Nombre "+ infoArray[1]['nombre']+"</p>";
			           			maquetado += "<p class='activity textcolor-title4'>"+infoArray[1]['posicion']+"</p>";
			           			maquetado += "<p class='activityn textcolor-title1'>"+infoArray[1]['club']+"</p>";
		           			maquetado += "</div>";
	           			maquetado += "</div>";
	           			maquetado += "<div class='separator'></div>";
	           				maquetado += "<div class='wdg_rating_main_01_players'>";
	           					maquetado += "<img alt='' src='"+valorFoto2+"'>";
	           					maquetado += "<div class='player_data dotted-bottom'>";
				           			maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
				           			maquetado += "<p class='average textcolor-title4 dotted-right'>10</p>";
				           			maquetado += "<p class='average_total textcolor-title1'>"+infoArray[2]['porcentaje']+"</p>";
				           		maquetado += "</div>";
				           		maquetado += "<div class='player_data2'>";
				           			maquetado += "<p class='name'> Nombre"+ infoArray[2]['nombre']+"</p>";
				           			maquetado += "<p class='activity textcolor-title4'>"+infoArray[2]['posicion']+"</p>";
				           			maquetado += "<p class='activityn textcolor-title1'>"+infoArray[2]['club']+"</p>";
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