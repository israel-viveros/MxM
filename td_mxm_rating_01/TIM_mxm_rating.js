/*your js code */
;
(function() {
	
	var resultadoGlobal;
	
    $.fn.MxMRating = function(options) {
    	console.log('Asigna valores a las variables');
    	var setting = $.extend({        	
            'idTorneo': 0,
            'idEvento': 0
    
        }, options);
    	
    	console.log(setting);    	
    	var GlobalThis = this;
    	
  
        var wdg_mxm_rating = {
        		
        		urlFinalAlineacion: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/match_lineup.js',
        		urlMatchHeader: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/match_header.js',
        		url: 'http://mxm.televisadeportes.esmas.com/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/gameplayerdetail.js',
        		
        		tagRating: $("#containerwdg_mxm_rating_01"),
        		
        		//-- Carga la alineacion
        		loadAlineacion: function(){
        			console.log('loadAlineacion');
        			$.ajax({
                        url: wdg_mxm_rating.urlFinalAlineacion,
                        dataType: 'jsonp',
                        jsonpCallback: 'datagame',
                        cache: false,
                        success: function(dataAlineacion) {
                        	console.log('dataAlineacion');
                        	wdg_mxm_rating.getInfo(dataAlineacion);                			
                        }
            		});        			        			        			                	        	        		
        		},
        		        		        		
        		pintaInfo: function(dataAlineacion,dataMatchHeader) {
        			//console.log(data.poll['answers']['answer']['0']['number']);
        			//alert (data.poll['answers']['answer']['0']['clubname']);
        			var equipo = new Array();
        			var equipoMatch = new Array();
        			
        			console.log(wdg_mxm_rating.getInfo());
        			
        			//var dataMatchHeader = 
        			console.log(dataMatchHeader);
        			
        			equipo[0] = "lineupLocal";
                    equipo[1] = "lineupVisit";
                    equipoMatch[0] = "equipoLocal";
                    equipoMatch[1] = "equipoVisitante";
                                        
                    console.log('dshkjdhkjdhsj' + dataMatchHeader);
                    //console.log(dataMatchHeader[equipoMatch[1]]['smallImage']);
                    //console.log(equipoMatch.length);                    
                    //console.log(dataAlineacion[equipo[0]]['teamShirt']);
                    //console.log(dataAlineacion[equipo[1]]['teamShirt']);
                    console.log(equipo.length);
        			
        			
        			for (var i=0; i<equipo.length; i++){  
        				console.log('pinta ' + i);
           			var maquetado = "";
           			maquetado += "<div class='wdg_rate_player_01' data-enhance='false'>";
           			maquetado += "<div class='qualifies textcolor-title4'>Elige a tu jugador y vota</div>";
           			maquetado += "<table><tr><td class='header_team'><table class='head_table'><tr>";
           			maquetado += "<th><img alt='' src='http://placehold.it/32x32'></th>";
           			//maquetado += "<th colspan='3' class='equipo'><p class='title_team textcolor-title1'>" + data.poll['answers']['answer']['0']['clubname'] + "</p></th>";
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
           			maquetado += "</table></td></tr></table";
           			maquetado += "</div>";					
           			
        			}
                                        
            		wdg_mxm_rating.tagRating.html(maquetado);
            	},            	
            	
        		getInfo: function(dataAlineacion){        		
        			console.log ('getInfo');
        			var equipoMatch = new Array();
        			
        			//Obtiene el logotipo de los equipos y nombre
        			$.ajax({
        				url: wdg_mxm_rating.urlMatchHeader,
                        dataType: 'jsonp',
                        jsonpCallback: 'mxmheader',
                        cache: false,
                        success:function(dataMatchHeader){
                        	console.log(dataMatchHeader);
                        	console.log(dataAlineacion);                        			
                            equipoMatch[0] = "equipoLocal";
                            equipoMatch[1] = "equipoVisitante";
                            
                            console.log(dataMatchHeader.length);
                            console.log(dataMatchHeader[equipoMatch[0]]['smallImage']);
                            console.log(dataMatchHeader[equipoMatch[1]]['smallImage']);
                            
                            wdg_mxm_rating.pintaInfo(dataAlineacion,dataMatchHeader);
                            
                            
                        }
                        		                        		           			        			
        			});        			        			        			        		
        		}
        
        	
  		
        }
        
        
        console.log(wdg_mxm_rating.url);
        wdg_mxm_rating.loadAlineacion(true);
 
	
    };
  
    
    
    
})(jQuery);
