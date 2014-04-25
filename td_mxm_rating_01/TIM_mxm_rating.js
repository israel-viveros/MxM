/*your js code */
;
(function() {	
	//-----------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------
   
        
	var resultadoGlobal;
	
    $.fn.MxMRating = function(options) {    	
    	var setting = $.extend({        	
            'idTorneo': 0,
            'idEvento': 0
    
        }, options);
    	    	    
    	var GlobalThis = this;    	
  
        var wdg_mxm_rating = {
        		
        		urlFinalAlineacion: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/match_lineup.js',
        		urlMatchHeader: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/match_header.js',
        		urlPLayerDetail: 'http://mxm.televisadeportes.esmas.com/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/gameplayerdetail.js',        		
        		tagRating: $("#containerwdg_mxm_rating_01"),
        		        		
        		//Metodo para colocar la posicion del jugador
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
        		      		        		
        		pintaInfo: function(dataAlineacion,dataMatchHeader,dataGamePlayer) {
        			alert ('entra a pintar');        			
        			var equipo = new Array();
        			var equipoMatch = new Array();
        			var textoPosicion;
    				var nombreJugador; 
    				var posicion;
    				var playerDetailPorcentaje;
    				
        			equipo[0] = "lineupLocal";
                    equipo[1] = "lineupVisit";
                    equipoMatch[0] = "equipoLocal";
                    equipoMatch[1] = "equipoVisitante";
                    
                    var logoLocal = dataMatchHeader[equipoMatch[0]]['smallImage'];
                    var logoVisitante = dataMatchHeader[equipoMatch[1]]['smallImage'];
                    var nombreLocal = dataMatchHeader[equipoMatch[0]]['nombre'];
                    var nombreVisit = dataMatchHeader[equipoMatch[1]]['nombre'];                                                        
                    var regLocal = dataAlineacion[equipo[0]]['team'].length;
                    var regVisit = dataAlineacion[equipo[1]]['team'].length;    
                    var regbancaLocal = dataAlineacion[equipo[0]]['substitutes'].length;
                    var regbancaVisit = dataAlineacion[equipo[1]]['substitutes'].length;
                    var regPlayerDetail = dataGamePlayer.poll['answers']['answer'].length;
                    
                    //ALINEACION LOCAL
           			var maquetado = "";
           			maquetado += "<div class='wdg_rate_player_01' data-enhance='false'>";
           			maquetado += "<div class='qualifies textcolor-title4'>Elige a tu jugador y vota</div>";
           			maquetado += "<table><tr><td class='header_team'><table class='head_table'><tr>";
           			maquetado += "<th><img alt='' src='" + logoLocal + "'></th>";
           			maquetado += "<th colspan='3' class='equipo'><p class='title_team textcolor-title1'>" + nombreLocal + "</p></th>";
           			maquetado += "<th><p class='title_td textcolor-title4 dotted-right'>TD</p></th>";
           			maquetado += "<th><p class='title_afision textcolor-title1'>Afici&oacute;n</p></th>";
           			maquetado += "</tr>";
           			maquetado += "<tr class='dotted-right'>";
           			maquetado += "<th colspan='6' class='day_relative'>";
			        maquetado += "<div class='jornada'>";
					maquetado += "<div class='wdg_lineup_01_dropdown drop1'>";
					maquetado += "<div class='wdg_lineup_01_dropdowncontent'>";
					maquetado += "<p>Jornada 16</p>";
					maquetado += "<span class='sprite dropdown-gray'></span>";
					maquetado += "</div>";
					maquetado += "<div class='wdg_lineup_01_listcontainer'>";
					maquetado += "<ul class='wdg_lineup_01_dropdownlist'>";
					maquetado += "<li><p>Jornada 1</p></li>";
					maquetado += "<li><p>Jornada 2</p></li>";
					maquetado += "<li><p>Jornada 3</p></li>";
					maquetado += "<li><p>Jornada 4</p></li>";
					maquetado += "<li><p>Jornada 5</p></li>";
					maquetado += "<li><p>Jornada 6</p></li>";
					maquetado += "<li><p>Jornada 7</p></li>";
					maquetado += "</ul>";  
					maquetado += "</div>";
					maquetado += "</div>";
					maquetado += "</div>";
					maquetado += "<div style='clear:both;'></div>";
                    maquetado += "</th></tr>";                    
           			maquetado += "</table>";
           			maquetado += "<table class='dotted-right'>";
                    maquetado += "<thead><!-- Listbox --></thead>";
                    maquetado += "<tbody>";
                    for (var i=0; i < regLocal ; i++){          				      		      		
        				nombreJugador = dataAlineacion[equipo[0]]['team'][i]['nickName'];	
        				posicion = dataAlineacion[equipo[0]]['team'][i]['position']; 
        				textoPosicion = wdg_mxm_rating.posicionTexto(posicion);        				
        				idEquipo = dataAlineacion[equipo[0]]['idTeam']; 
        				numPlayer = dataAlineacion[equipo[0]]['team'][i]['number'];         				
        				if (i == 0){        					
        					maquetado += "<tr class='evaluation first_child'>";        					
        				}
        				else{
        					maquetado += "<tr class='evaluation'>";        					
        				}        				
        				maquetado += "<td>";
        				maquetado += "<div class='conteiner_two'>";
        				maquetado += "<div class='vote_block vote dotted-bottom'>";
        				maquetado += "<div class='player_name'><p>" + nombreJugador + "</p></div>";
        				maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
        				//--Pintar porcentaje
        				for (var a=0; a < regPlayerDetail; a++){                        	        				
                        	var playerDetailClubId = dataGamePlayer.poll['answers']['answer'][a]['club'];    						
    						var playerDetailPlayerId = dataGamePlayer.poll['answers']['answer'][a]['number'];    						    						    					
    						if (idEquipo == playerDetailClubId && numPlayer == playerDetailPlayerId ){    							    							
    							playerDetailPorcentaje = dataGamePlayer.poll['answers']['answer'][a]['percent'];    							
    						}    						
                        }
        				maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>"+playerDetailPorcentaje+"</p></div>";        			
        				maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
        				maquetado += "</div>";
        				maquetado += "<div class='calification  textcolor-title4'>";
        				maquetado += "<div><p>5</p></div>";
        				maquetado += "<div><p>6</p></div>";
        				maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
        				maquetado += "<div><p>8</p></div>";
        				maquetado += "<div><p>9</p></div>";
        				maquetado += "<div><p>10</p></div>";
        				maquetado += "</div>";
        				maquetado += "<div class='participated  textcolor-title4'>";
                        maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
        				maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
        				maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                        maquetado += "</div>";            
                        maquetado += "</div>";        
                        maquetado += "</td>";
                        maquetado += "</tr>";                                				
        			}                    
                    maquetado += "</tbody></table></td>";
                                        
                    //ALINEACION VISITANTE---
                    maquetado += "<td class='header_team_ext'>";
                    maquetado += "<table class='head_table2'>";
                    maquetado += "<tr>";
                    maquetado += "<th><img alt='' src='" + logoVisitante + "'></th>";
                    maquetado += "<th colspan='2'><p class='title_team textcolor-title1'>" + nombreVisit + "</p></th>";
                    maquetado += "<th><p class='title_td textcolor-title4 dotted-right'>TD</p></th>";
                    maquetado += "<th><p class='title_afision textcolor-title1'>Afici&oacuten</p></th>";
                    maquetado += "</tr>";
                    maquetado += "<tr><td colspan='6' class='day_relative2'><div class='jornada'><div class='wdg_lineup_012_dropdown drop2'><div class='wdg_lineup_012_dropdowncontent'><p>Jornada 16</p><span class='sprite dropdown-gray'></span></div><div class='wdg_lineup_012_listcontainer'><ul class='wdg_lineup_012_dropdownlist'><li><p>Jornada 1</p></li><li><p>Jornada 2</p></li><li><p>Jornada 3</p></li><li><p>Jornada 4</p></li><li><p>Jornada 5</p></li><li><p>Jornada 6</p></li><li><p>Jornada 7</p></li></ul> </div></div></div><div style='clear:both;'></div></td></tr>";
                    maquetado += "</table>";
                    
                    maquetado += "<table class='header_team_2'>";
                    maquetado += "<thead><!-- Listbox --></thead>";
                    maquetado += "<tbody>";
                    for (var i=0; i < regVisit ; i++){          				    				
        				nombreJugador = dataAlineacion[equipo[1]]['team'][i]['nickName'];	
        				posicion = dataAlineacion[equipo[1]]['team'][i]['position'];        				
        				textoPosicion = wdg_mxm_rating.posicionTexto(posicion);
        				idEquipoVisit = dataAlineacion[equipo[1]]['idTeam']; 
        				numPlayerVisit = dataAlineacion[equipo[1]]['team'][i]['number']; 
        				
        				if (i == 0){        					
        					maquetado += "<tr class='evaluation first_child'>";        					
        				}
        				else{
        					maquetado += "<tr class='evaluation'>";        					
        				}         				
        				maquetado += "<td>";
        				maquetado += "<div class='conteiner_two'>";
        				maquetado += "<div class='vote_block vote dotted-bottom'>";
        				maquetado += "<div class='player_name'><p>" + nombreJugador + "</p></div>";
        				maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";        				
        				//--Pintar porcentaje
        				for (var b=0; b < regPlayerDetail; b++){         					
                        	var playerDetailClubIdVisit = dataGamePlayer.poll['answers']['answer'][b]['club'];    						
    						var playerDetailPlayerIdVisit = dataGamePlayer.poll['answers']['answer'][b]['number'];
    						console.log(idEquipoVisit);
    						console.log(playerDetailClubIdVisit);
    						console.log(numPlayerVisit);
    						console.log(playerDetailPlayerIdVisit);
    						if (idEquipoVisit == playerDetailClubIdVisit && numPlayerVisit == playerDetailPlayerIdVisit){
    							console.log ('son iguales...');    				
    							playerDetailPorcVisit = dataGamePlayer.poll['answers']['answer'][b]['percent'];
    							console.log(playerDetailPorcVisit);
    						}    						
                        }
        				maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>"+playerDetailPorcVisit+"</p></div>";        				
        				maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
        				maquetado += "</div>";
        				maquetado += "<div class='calification  textcolor-title4'>";
        				maquetado += "<div><p>5</p></div>";
        				maquetado += "<div><p>6</p></div>";
        				maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
        				maquetado += "<div><p>8</p></div>";
        				maquetado += "<div><p>9</p></div>";
        				maquetado += "<div><p>10</p></div>";
        				maquetado += "</div>";
        				maquetado += "<div class='participated  textcolor-title4'>";
                        maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
        				maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
        				maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                        maquetado += "</div>";            
                        maquetado += "</div>";        
                        maquetado += "</td>";
                        maquetado += "</tr>";                                				
        			}	
                    maquetado += "</tbody></table></td></tr>";
                    
                    // ALINEACION BANCA 
                    // Local
                    maquetado += "<tr class='textcolor-title1'>";
                    maquetado += "<td colspan='3' class='reserves'>Banca</td>";            
                    maquetado += "</tr>";
                    maquetado += "<tr>";
                    maquetado += "<td class='header_team dotted-right'>";
                    maquetado += "<table>";
                    maquetado += "<tbody>";
                    for (var i=0; i < regbancaLocal ; i++){  
        				nombreJugador = dataAlineacion[equipo[0]]['substitutes'][i]['nickName'];	
        				posicion = dataAlineacion[equipo[0]]['substitutes'][i]['position'];        				
        				textoPosicion = wdg_mxm_rating.posicionTexto(posicion);        				        			        				        			
        				if (i == 0){
        					maquetado += "<tr class='evaluation first_child'>";        					
        				}
        				else{
        					maquetado += "<tr class='evaluation'>";        					
        				}         				
        				maquetado += "<td>";
        				maquetado += "<div class='conteiner_two'>";
        				maquetado += "<div class='vote_block vote dotted-bottom'>";
        				maquetado += "<div class='player_name'><p>" + nombreJugador + "</p></div>";
        				maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
        				maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>0.00</p></div>";
        				maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
        				maquetado += "</div>";
        				maquetado += "<div class='calification  textcolor-title4'>";
        				maquetado += "<div><p>5</p></div>";
        				maquetado += "<div><p>6</p></div>";
        				maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
        				maquetado += "<div><p>8</p></div>";
        				maquetado += "<div><p>9</p></div>";
        				maquetado += "<div><p>10</p></div>";
        				maquetado += "</div>";
        				maquetado += "<div class='participated  textcolor-title4'>";
                        maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
        				maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
        				maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                        maquetado += "</div>";            
                        maquetado += "</div>";        
                        maquetado += "</td>";
                        maquetado += "</tr>";                                				
        			}
                    
                    maquetado += "</tbody></table></td>";
                    
                    // Visitante
                    maquetado += "<td class='header_team_2 header_team_ext2'><table class='rate_team_2'><tbody>";
                    for (var i=0; i < regbancaVisit ; i++){          				        				
        				nombreJugador = dataAlineacion[equipo[1]]['substitutes'][i]['nickName'];	
        				posicion = dataAlineacion[equipo[1]]['substitutes'][i]['position'];        				
        				textoPosicion = wdg_mxm_rating.posicionTexto(posicion);        						
        				if (i == 0){        					
        					maquetado += "<tr class='evaluation first_child'>";        					
        				}
        				else{
        					maquetado += "<tr class='evaluation'>";        					
        				}
        				
        				maquetado += "<td>";
        				maquetado += "<div class='conteiner_two'>";
        				maquetado += "<div class='vote_block vote dotted-bottom'>";
        				maquetado += "<div class='player_name'><p>" + nombreJugador + "</p></div>";
        				maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
        				maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>0.00</p></div>";
        				maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
        				maquetado += "</div>";
        				maquetado += "<div class='calification  textcolor-title4'>";
        				maquetado += "<div><p>5</p></div>";
        				maquetado += "<div><p>6</p></div>";
        				maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
        				maquetado += "<div><p>8</p></div>";
        				maquetado += "<div><p>9</p></div>";
        				maquetado += "<div><p>10</p></div>";
        				maquetado += "</div>";
        				maquetado += "<div class='participated  textcolor-title4'>";
                        maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
        				maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
        				maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                        maquetado += "</div>";            
                        maquetado += "</div>";        
                        maquetado += "</td>";
                        maquetado += "</tr>";                                				
        			}
                    maquetado += "</tbody>";
                    maquetado += "</table>";
           			maquetado += "</td></tr></table";            					
           			maquetado += "</div>";					
           			        		                                       
            		wdg_mxm_rating.tagRating.html(maquetado);
            		
            	},            	
            	
            	//Obtener los Detalles de los jugadores
            	getGamePlayerDetail: function(dataAlineacion,dataMatchHeader) {            		
            		$.ajax({
        				url: 'jason.js', //wdg_mxm_rating.urlPLayerDetail,
        				type: "GET",
                        dataType: 'json',
                        //jsonpCallback: 'mxmheader',
                        cache: false,
                        success:function(dataGamePlayer){                                  	
                        	wdg_mxm_rating.pintaInfo(dataAlineacion,dataMatchHeader,dataGamePlayer);                        	                       
                        }
            		});
            	},
            	
            	
            	//Obtiene el logotipo de los equipos y nombre
        		getInfo: function(dataAlineacion){        		        			        			      			        		
        			$.ajax({
        				url: wdg_mxm_rating.urlMatchHeader,
                        dataType: 'jsonp',
                        jsonpCallback: 'mxmheader',
                        cache: false,
                        success:function(dataMatchHeader){ 
                        	wdg_mxm_rating.getGamePlayerDetail(dataAlineacion,dataMatchHeader)                        
                        }
                        		                        		           			        			
        			});        			        			        			        		
        		},
            	            	            
            	//-- Carga la alineacion
        		loadAlineacion: function(){        			
        			$.ajax({
                        url: wdg_mxm_rating.urlFinalAlineacion,
                        dataType: 'jsonp',
                        jsonpCallback: 'datagame',
                        cache: false,
                        success: function(dataAlineacion) {                          	
                        	wdg_mxm_rating.getInfo(dataAlineacion);                			
                        }
            		});        			        			        			                	        	        		
        		}
        }
        
        wdg_mxm_rating.loadAlineacion(true);
 
	
    };
  
    
    
    
})(jQuery);
