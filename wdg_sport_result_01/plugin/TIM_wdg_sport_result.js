(function(){
	$.fn.WdgSportResult = function(options){
		var settings = $.extend({
			'idtorneo':0,
			'idteam':0
		},options);
		
		var GlobalThis = this;
		
		var wdf_sportResult = {			
			urlFinalHeader : 'http://lab.israelviveros.com/deportes/wdg_sport_result_01/'+settings.idtorneo+'/'+settings.idteam+'/mxm_header.js',
			jsonpcallback: 'mxmheader',
			IdPestanasMenu : $("#TIMnav_smnu_sports"),
			
			loadInfo : function(tipo){
				$.ajax({
					url: wdf_sportResult.urlFinalHeader,
					type: 'GET',
					dataType: 'jsonp',
					jsonpCallback: wdf_sportResult.jsonpcallback,
					cache: false
				})
				.done(function(data) {
					(tipo==="update") ? wdf_sportResult.updateGoles(data) : wdf_sportResult.drawHeader(data);
				})
				.fail(function() {
					console.log("---->Error al cargar: "+wdf_sportResult.urlFinalHeader);
					GlobalThis.remove();
				})

			}, // loadInfo END


			drawHeader : function(data){				
				var MaquetadoHEader = "";
				MaquetadoHEader += '<div class="wrapper">';
				MaquetadoHEader += '<div class="match_title">';
				MaquetadoHEader += '<div class="cup_name">';
				MaquetadoHEader += (data.transimisionVivo != "") ? '<div class="live-container textcolor-title3 background-color2" onclick="javascript:window.open(\''+data.transimisionVivo+'\');" style="cursor:pointer"><div class="icon-video"><i class="tvsa-videocamera"></i></div><div class="see-now">VER AHORA</div><div class="online">EN VIVO</div></div>' : '';
				MaquetadoHEader += '<div class="titulo textcolor-title3">'+data.torneo.nombre+'</div>';
				MaquetadoHEader += '<div class="subtitulo textcolor-title2">'+data.jornada.nombre+'</div>';
				MaquetadoHEader += '</div>';
				MaquetadoHEader += '<div class="realtedimg">';
				MaquetadoHEader += '<img src="http://placehold.it/300x50" alt="">';
				MaquetadoHEader += '</div>';
				MaquetadoHEader += '</div>';
				MaquetadoHEader += '<div class="live_time textcolor-title3 background-color1">'+data.tiempo.replace(/'/g, "\'")+'</div>';
				MaquetadoHEader += '<div class="leftside">';
				MaquetadoHEader += '<div class="team1">';
				MaquetadoHEader += '<div class="escudo"><img src="'+data.equipoLocal.logo+'" alt="'+data.equipoLocal.nombre+'" width="48" height="48"></div>';
				MaquetadoHEader += '<div class="equipo">'+data.equipoLocal.nombre+'</div>';
				MaquetadoHEader += '<div class="score">'+data.equipoLocal.goles+'</div>';	
				MaquetadoHEader += (data.equipoLocal.penales==="") ? '<div class="penales" style="visibility:hidden"><span class="penal"></span> PENALES</div>' : '<div class="penales"><span class="penal">'+data.equipoLocal.penales+'</span> PENALES</div>';
				MaquetadoHEader += '</div>';
				MaquetadoHEader += '<div class="dotted_separator"></div>';
				MaquetadoHEader += '<div class="team2">';
				MaquetadoHEader += (data.equipoVisitante.penales==="") ? '<div class="penales" style="visibility:hidden"><span class="penal"></span> PENALES</div>' : '<div class="penales"><span class="penal">'+data.equipoVisitante.penales+'</span> PENALES</div>';
				MaquetadoHEader += '<div class="score">'+data.equipoVisitante.goles+'</div>';
				MaquetadoHEader += '<div class="equipo">'+data.equipoVisitante.nombre+'</div>';
				MaquetadoHEader += '<div class="escudo"><img src="'+data.equipoVisitante.logo+'" width="48" height="48" alt="'+data.equipoVisitante.nombre+'"></div>';
				MaquetadoHEader += '</div>';
				MaquetadoHEader += '<div class="team2_m">';
				MaquetadoHEader += (data.equipoVisitante.logo!=="") ? '<div class="escudo"><img src="'+data.equipoVisitante.logo+'" width="48" height="48" alt="'+data.equipoVisitante.nombre+'"></div>' : '';
				MaquetadoHEader += '<div class="equipo">'+data.equipoVisitante.nombre+'</div>';
				MaquetadoHEader += '<div class="score">'+data.equipoVisitante.goles+'</div>';
				MaquetadoHEader += (data.equipoVisitante.penales==="") ? '<div class="penales" style="visibility:hidden"><span class="penal"></span> PENALES</div>' : '<div class="penales"><span class="penal">'+data.equipoVisitante.penales+'</span> PENALES</div>';
				MaquetadoHEader += '</div>';
				MaquetadoHEader += '<div class="solid_separator"></div>';
				MaquetadoHEader += '<div class="match_info">';
				MaquetadoHEader += (typeof data.partidoIda !== "undefined") ? '<div class="ida">Partido ida: <span class="blanco">'+data.partidoIda.local+' '+data.partidoIda.golesLocal+' - '+data.partidoIda.golesVisitante+' '+data.partidoIda.visitante+'</span></div>' : '';
				MaquetadoHEader += '<div class="scoreglobal">Global: <span class="blanco">'+data.equipoLocal.nombre+' <span id="globalLoc">'+data.equipoLocal.golesGlobal+'</span> - <span id="globalVi">'+data.equipoVisitante.golesGlobal+'</span> '+data.equipoVisitante.nombre+'</span></div>';
				MaquetadoHEader += '</div>';
				MaquetadoHEader += '</div>';
				MaquetadoHEader += '<div class="date_venue">';
				MaquetadoHEader += '<div class="when">'+data.fechaPartidoLetra.replace(/-/g," ")+' '+data.horaPartido+'</div>';
				MaquetadoHEader += (typeof data.estadio !=="undefined") ? '<div class="where">'+data.estadio.nombre+' '+data.estadio.ciudad+', '+data.estadio.pais+'</div>' : '';
				MaquetadoHEader += (typeof data.datocurioso !=="undefined") ? '<div class="info">'+data.datocurioso+'</div>' : '';
				MaquetadoHEader += '</div>';
				MaquetadoHEader += '</div>';
				

				GlobalThis.css('display', 'none').html(MaquetadoHEader).slideDown('slow');
				if(data.tiempo.toLowerCase() !="final"){					
					wdf_sportResult.timeUpdate(data.fechaPartido,data.horaPartido);
				}

				
				(typeof data.paginas !== "undefined" && wdf_sportResult.IdPestanasMenu.length ) ? wdf_sportResult.drawMenu(data.paginas) : wdf_sportResult.IdPestanasMenu.remove();
				
			}, // End drawHeader

			updateGoles:  function(data){
				var NuevoGolLocal= "", NuevoGolLocal= "", NuevoGolVisit="", NuevoPenalLocal="", NuevoPenalVisit="", ActGolLocal="", ActGolVisit="", ActPEnalLocal="",ActPenalVisit="",NuevoStatusPartido="", ActStatusPartido ="",ActGlobalVisit="",NuevoGlobalVisit="",ActGlobalLocal="",NuevoGlobalLocal="";
				var NuevoGolLocal = String(data.equipoLocal.goles),
				NuevoGolVisit = String(data.equipoVisitante.goles),
				NuevoPenalLocal = String(data.equipoLocal.penales),
				NuevoPenalVisit= String(data.equipoVisitante.penales),
				NuevoStatusPartido = String(data.tiempo),
				NuevoGlobalLocal = String(data.equipoLocal.golesGlobal),
				NuevoGlobalVisit = String(data.equipoVisitante.golesGlobal);
				ActGolLocal = $(".team1 .score").text(), 
				ActGolVisit = $(".team2 .score").text(),
				ActPEnalLocal = $(".team1 .penal").text(),
				ActPenalVisit = $(".team2 .penal").text(),
				ActStatusPartido = $(".live_time").text(),
				ActGlobalLocal = $("#globalLoc").text(),
				ActGlobalVisit = $("#globalVi").text();
				

				(NuevoGolLocal !== String(ActGolLocal)) ?  wdf_sportResult.nuevoValor($(".team1 .score"),NuevoGolLocal) : '' ;
				(NuevoGolVisit !== String(ActGolVisit)) ? wdf_sportResult.nuevoValor($(".team2 .score, .team2_m .score"),NuevoGolVisit) : '';
				(ActPEnalLocal !== String(NuevoPenalLocal)) ? wdf_sportResult.nuevoValor($(".team1 .penal"),NuevoPenalLocal) : '';
				(ActPenalVisit !== String(NuevoPenalVisit)) ? wdf_sportResult.nuevoValor($(".team2 .penal,.team2_m .penal"),NuevoPenalVisit) : '';
				(NuevoStatusPartido !== String(ActStatusPartido)) ? wdf_sportResult.nuevoValor($(".live_time"),NuevoStatusPartido) : '';
				(NuevoGlobalLocal !== String(ActGlobalLocal)) ? wdf_sportResult.nuevoValor($("#globalLoc"),NuevoGlobalLocal) : '';
				(NuevoGlobalVisit !== String(ActGlobalVisit)) ? wdf_sportResult.nuevoValor($("#globalVi"),NuevoGlobalVisit) : '';
				
			}, // End updateGoles

			nuevoValor: function(selector,valor){		
				selector.parent('.penales').css('visibility', 'visible');
				selector.fadeOut('slow', function() {
					$(this).empty();
					$(this).text(valor).slideDown('fast');
				});
			}, // End nuevoValor()


			timeUpdate : function(dia,hora){
				var tiempoActualizacion = 0;
				var FechaPartido = dia.substring(3,5)+'-'+dia.substring(0,2)+'-'+dia.substring(8,10)+ ' '+ hora.substring(0,5)+':00';
				$.ajax({url: "http://mxm.televisadeportes.esmas.com/deportes/home/timetvjsonp.js",
								async: false,
								cache:false,
								dataType: 'jsonp',
								jsonpCallback: 'timetv',
								success: function(data) {
									var arr='';
									var m=0;
									var anio=0;
									
									horas = data.timetv;
									arr=data.fechatv.replace(/_/gi,"-").split("-");
									m= parseInt(arr[1])+1;
									
									if (String(m).length==1)
									{
										m='0'+m;
									}
									anio= parseInt(arr[2])+1900;
									fechas=m+'-'+arr[0]+'-'+anio;	
									fechas = fechas+' '+horas+':00';

									var a = new Date(FechaPartido);
									var b = new Date(fechas);

						      var msDateA = Date.UTC(a.getFullYear(), a.getMonth()+1, a.getDate());
						      var msDateB = Date.UTC(b.getFullYear(), b.getMonth()+1, b.getDate());

								if (parseFloat(msDateA) < parseFloat(msDateB)) {
									console.log("MENOR");
								} else {
									if (parseFloat(msDateA) == parseFloat(msDateB)) {
										console.log("IGUAL");
										tiempoActualizacion = 60000;
										var resta = parseInt(b.getHours()-a.getHours());
											//cop
											if (b.getHours() >= a.getHours()) {
												console.log("ya empezo el partido");
												//Ya empezo el partido, actualizar valores cada minuto										
												tiempoActualizacion = 60000;
											} else {
												var h1= a.getHours();
												var h2= b.getHours();
												var m1= a.getMinutes();
												var m2= b.getMinutes();
												//Validar cuantos minutos faltan para el inicio del partido
												var minutosrestantes = (((h1 - h2) * 60) + m1) - m2;

												if (minutosrestantes <= 15) {
													console.log("faltan menos de 15 min");
													//Faltan 15 minutos o menos para el inicio, actualizar los valores cada minuto
													tiempoActualizacion = 60000;

												} else {
													console.log("faltan mas de 15 pero menos de 1hr " + minutosrestantes);
													//Faltan mas de 15 minutos para el inicio, actualizar los valores cada 15 minutos pero menos de una hora
													
													(minutosrestantes>60) ? tiempoActualizacion = 900000 : '';											
												}
											}
											//cop
											console.log(tiempoActualizacion)
											setInterval(function(){wdf_sportResult.loadInfo('update')},tiempoActualizacion);
									} else {
										if (parseFloat(msDateA) > parseFloat(msDateB)) {
											console.log("MAYOR");
											
										} else {
											console.log("Error no actualizo");
										}
									}
								}

								}
						});
			},// End timeUpdate()


			drawMenu : function(data){				
				var MaqMenu ="";	
				MaqMenu += '<div class="navarrowleft">';
				MaqMenu += '<a class="wdg_matchesresult_navleft" href="#left"> ';
				MaqMenu += '<span class="navlefticon">';
				MaqMenu += '<i class="tvsa-double-caret-left inactive"></i>';
				MaqMenu += '</span>';
				MaqMenu += '</a>';
				MaqMenu += '</div>';
				MaqMenu += '<div class="container">';
				MaqMenu += '<div class="nav_smnu_sports_01_bar">';
				MaqMenu += '<ul>';
				MaqMenu += (typeof data.previo !== 'undefined' && data.previo!== "") ?'<li class="previoMenuTim"> <a href="'+data.previo+'">Previo</a></li>' : '';
				MaqMenu += (typeof data.alineacion !== 'undefined' && data.alineacion!== "") ?'<li class="nav_smnu_sports_01_block alineacionMenuTim"><a href="'+data.alineacion+'" title="Alineacion">Alineación</a></li>': '';
				MaqMenu += (typeof data.rating !== 'undefined' && data.rating!== "") ?'<li class="hide1 ratingMenuTim"><a href="'+data.rating+'" title="Rating">Rating</a></li>': '';
				MaqMenu += (typeof data.mxm !== 'undefined' && data.mxm!== "") ?'<li class="nav_smnu_sports_01_block nav_smnu_sports_01_block2 mxmMenuTim"><a href="'+data.mxm+'" title="MxM">MxM</a></li>': '';
				MaqMenu += (typeof data.pizarra !== 'undefined' && data.pizarra!== "") ?'<li class="hide2 pizarraMenuTim"><a href="'+data.pizarra+'" title="Pizarra">Pizarra</a></li>': '';
				MaqMenu += (typeof data.cronica !== 'undefined' && data.cronica!== "") ?'<li class="nav_smnu_sports_01_block nav_smnu_sports_01_block2 cronicaMenuTim"><a href="'+data.cronica+'" title="Cronica">Cronica</a></li>': '';
				MaqMenu += (typeof data.video !== 'undefined' && data.video!== "") ?'<li class="last nav_smnu_sports_01_block videoMenuTim"><a href="'+data.video+'" title="Video">Video</a></li>': '';
				MaqMenu += '</ul>';
				MaqMenu += '</div>';
				MaqMenu += '</div>';
				MaqMenu += '<div class="navarrowright">';
				MaqMenu += '<a class="wdg_matchesresult_navright" href="#right">';
				MaqMenu += '<span class="navrighticon"><i class="tvsa-double-caret-right active"></i></span>';
				MaqMenu += '</a>';
				MaqMenu += '</div>';

				wdf_sportResult.IdPestanasMenu.html(MaqMenu).show();

				var urlAc = document.URL;
				(/previo/.test(urlAc)) ? $(".previoMenuTim").addClass('current') : '' ;
				(/alineacion/.test(urlAc)) ? $(".alineacionMenuTim").addClass('current') : '' ;
				(/rating/.test(urlAc)) ? $(".ratingMenuTim").addClass('current') : '' ;
				(/mxm/.test(urlAc)) ? $(".mxmMenuTim").addClass('current') : '' ;
				(/pizarra/.test(urlAc)) ? $(".pizarraMenuTim").addClass('current') : '' ;
				(/cronica/.test(urlAc)) ? $(".cronicaMenuTim").addClass('current') : '' ;
				(/video/.test(urlAc)) ? $(".videoMenuTim").addClass('current') : '' ;
			} // ENd drawMenu()

		}; // end wdf_sportResult object

		
		(settings.idtorneo!=0 && settings.idteam !== 0) ? wdf_sportResult.loadInfo() : (console.log("---->Faltan los Id's de team y/o torneo"));		
	}
})(jQuery);