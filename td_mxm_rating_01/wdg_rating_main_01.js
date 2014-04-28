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
        			alert ('entra a pintar Main');
        			var maquetado = "";
        			var infoArray = new Array();        			        		       			        	
        			
        			for(var i=0; i<dataGamePlayer.poll['answers']['answer'].length; i++){        		
        				
        				//Validamos si la foto viene vacia
        				switch (i){
        					case 0:
        						if (dataGamePlayer.poll['answers']['answer'][i]['photo'] == '' || dataGamePlayer.poll['answers']['answer'][i]['photo'] == null){        					                					
                					var valorFoto = 'http://placehold.it/300x225';
                				}else{
                					var valorFoto = dataGamePlayer.poll['answers']['answer'][i]['photo'];
                				}
        					case 1:
        						if (dataGamePlayer.poll['answers']['answer'][i]['photo'] == '' || dataGamePlayer.poll['answers']['answer'][i]['photo'] == null){
        							var valorFoto = 'http://placehold.it/136x102';
        						}else{
        							var valorFoto = dataGamePlayer.poll['answers']['answer'][i]['photo'];        							
        						}        						
        					case 2:
        						if (dataGamePlayer.poll['answers']['answer'][i]['photo'] == '' || dataGamePlayer.poll['answers']['answer'][i]['photo'] == null){
        							var valorFoto = 'http://placehold.it/136x102';
        						}else{
        							var valorFoto = dataGamePlayer.poll['answers']['answer'][i]['photo'];        							
        						}        						
        					default: 	 
        						var valorFoto = dataGamePlayer.poll['answers']['answer'][i]['photo'];
        				}
        				
        				if ((dataGamePlayer.poll['answers']['answer'][i]['photo'] == '' || dataGamePlayer.poll['answers']['answer'][i]['photo'] == null)){        					
        					console.log('entra');
        					var valorFoto = 'http://placehold.it/300x225';
        				}
        				
        				dataGamePlayer.poll['answers']['answer'][i]['photo']
        				infoArray.push({
        					id:i,
        					porcentaje:parseFloat(dataGamePlayer.poll['answers']['answer'][i]['percent']),
        					foto:valorFoto,
        					nombre:dataGamePlayer.poll['answers']['answer'][i]['name'],
        					posicion:wdg_rating_main_01.posicionTexto(dataGamePlayer.poll['answers']['answer'][i]['position']),
        					club:dataGamePlayer.poll['answers']['answer'][i]['clubname']
        				});        				
        			}        			
        			
        			infoArray.sort(function(a,b){
        				return b.porcentaje - a.porcentaje;
        			});
        			
        			console.log(infoArray);        			
        			
           			maquetado += "<div class='wdg_rating_main_01'>";           			
	           			maquetado += "<div class='wdg_rating_main_01_player'>";
		           			maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
		           			maquetado += "<p class='average textcolor-title4 dotted-right'>10</p>";
		           			maquetado += "<p class='average_total textcolor-title1'>"+infoArray[0]['porcentaje']+"</p>";
		           			maquetado += "<img alt='' class='father' src='"+infoArray[0]['foto']+"'>";
		           			maquetado += "<p class='name'>Nombre "+ infoArray[0]['nombre']+"</p>";
		           			maquetado += "<p class='activity textcolor-title4'>"+infoArray[0]['posicion']+"</p>"; 
		           			maquetado += "<p class='activityn textcolor-title1'>"+infoArray[0]['club']+"</p>";
	           			maquetado += "</div>";           			
	           			maquetado += "<div class='wdg_rating_main_01_players dotted-bottom'>";
		           			maquetado += "<img alt='' src='"+infoArray[1]['foto']+"'>";
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
	           					maquetado += "<img alt='' src='"+infoArray[2]['foto']+"'>";
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