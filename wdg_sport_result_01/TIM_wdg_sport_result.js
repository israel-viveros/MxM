; var idTorenoValidate = (typeof idTorneo ==="undefined" || idTorneo === "") ? 0 : idTorneo;
var idTeamValidate = (typeof idTeam === "undefined" || idTeam === "" ) ? 0 : idTeam;
var urlFinalHeader = (idTorenoValidate!=0 && idTeamValidate!=0)? 'http://lab.israelviveros.com/deportes/wdg_sport_result_01/'+idTorenoValidate+'/'+idTeamValidate+'/mxm_header.js' : '';

var wdf_sportResult = {


	loadInfo : function(tipo){

		$.ajax({
			url: urlFinalHeader,
			type: 'GET',
			dataType: 'jsonp',
			jsonpCallback:'mxmheader',
			cache: false
		})
		.done(function(data) {
			//console.log("success");
			//console.log(data);			
			(tipo==="update") ? wdf_sportResult.updateGoles(data) : wdf_sportResult.drawHeader(data);
		})
		.fail(function() {
			console.log("error al cargar: "+urlFinalHeader);
		})
		
		

	},

	drawHeader : function(data){
		console.log(data);
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
		MaquetadoHEader += '<div class="escudo"><img src="'+data.equipoLocal.logo+'" alt="'+data.partido.local+'" width="48" height="48"></div>';
		MaquetadoHEader += '<div class="equipo">'+data.partido.local+'</div>';
		MaquetadoHEader += '<div class="score">'+data.equipoLocal.goles+'</div>';	
		MaquetadoHEader += (data.equipoLocal.penales==="") ? '<div class="penales" style="visibility:hidden"><span class="penal"></span> PENALES</div>' : '<div class="penales"><span class="penal">'+data.equipoLocal.penales+'</span> PENALES</div>';
		MaquetadoHEader += '</div>';
		MaquetadoHEader += '<div class="dotted_separator"></div>';
		MaquetadoHEader += '<div class="team2">';
		MaquetadoHEader += (data.equipoVisitante.penales==="") ? '<div class="penales" style="visibility:hidden"><span class="penal"></span> PENALES</div>' : '<div class="penales"><span class="penal">'+data.equipoVisitante.penales+'</span> PENALES</div>';
		MaquetadoHEader += '<div class="score">'+data.equipoVisitante.goles+'</div>';
		MaquetadoHEader += '<div class="equipo">'+data.partido.visitante+'</div>';
		MaquetadoHEader += '<div class="escudo"><img src="'+data.equipoVisitante.logo+'" width="48" height="48" alt="'+data.partido.visitante+'"></div>';
		MaquetadoHEader += '</div>';
		MaquetadoHEader += '<div class="team2_m">';
		MaquetadoHEader += (data.equipoVisitante.logo!=="") ? '<div class="escudo"><img src="'+data.equipoVisitante.logo+'" width="48" height="48" alt="'+data.partido.visitante+'"></div>' : '';
		MaquetadoHEader += '<div class="equipo">'+data.partido.visitante+'</div>';
		MaquetadoHEader += '<div class="score">'+data.equipoVisitante.goles+'</div>';
		MaquetadoHEader += (data.equipoVisitante.penales==="") ? '<div class="penales" style="visibility:hidden"><span class="penal"></span> PENALES</div>' : '<div class="penales"><span class="penal">'+data.equipoVisitante.penales+'</span> PENALES</div>';
		MaquetadoHEader += '</div>';
		MaquetadoHEader += '<div class="solid_separator"></div>';
		MaquetadoHEader += '<div class="match_info">';
		MaquetadoHEader += (typeof data.partidoIda !== "undefined") ? '<div class="ida">Partido ida: <span class="blanco">'+data.partidoIda.local+' '+data.partidoIda.golesLocal+' - '+data.partidoIda.golesVisitante+' '+data.partidoIda.visitante+'</span></div>' : '';
		MaquetadoHEader += '<div class="scoreglobal">Global: <span class="blanco">'+data.equipoLocal.nombre+' '+data.equipoLocal.golesGlobal+' - '+data.equipoVisitante.golesGlobal+' '+data.equipoVisitante.nombre+'</span></div>';
		MaquetadoHEader += '</div>';
		MaquetadoHEader += '</div>';
		MaquetadoHEader += '<div class="date_venue">';
		MaquetadoHEader += '<div class="when">'+data.fechaPartidoLetra.replace(/-/g," ")+' '+data.horaPartido+'</div>';
		MaquetadoHEader += (typeof data.estadio !=="undefined") ? '<div class="where">'+data.estadio.nombre+' '+data.estadio.ciudad+', '+data.estadio.pais+'</div>' : '';
		MaquetadoHEader += (typeof data.datocurioso !=="undefined") ? '<div class="info">'+data.datocurioso+'</div>' : '';
		MaquetadoHEader += '</div>';
		MaquetadoHEader += '</div>';
		

		$("#TIMwdg_sport_result").css('display', 'none').html(MaquetadoHEader).slideDown('slow');
		if(data.tiempo.toLowerCase() !="final"){
			console.log("es diferentes a final");
			wdf_sportResult.timeUpdate(data.fechaPartido,data.horaPartido);
		}
		
	},

	updateGoles:  function(data){
		var NuevoGolLocal= "", NuevoGolLocal= "", NuevoGolVisit="", NuevoPenalLocal="", NuevoPenalVisit="", ActGolLocal="", ActGolVisit="", ActPEnalLocal="",ActPenalVisit="";
		var NuevoGolLocal = String(data.equipoLocal.goles),
		NuevoGolVisit = String(data.equipoVisitante.goles),
		NuevoPenalLocal = String(data.equipoLocal.penales),
		NuevoPenalVisit= String(data.equipoVisitante.penales),
		ActGolLocal = $(".team1 .score").text(), 
		ActGolVisit = $(".team2 .score").text(),
		ActPEnalLocal = $(".team1 .penal").text(),
		ActPenalVisit = $(".team2 .penal").text();
		//console.log(NuevoGolLocal +'-'+ActGolLocal);
		//console.log(NuevoGolVisit +'-'+ActGolVisit);
		console.log(NuevoPenalLocal+'-'+ActPEnalLocal);
		console.log(NuevoPenalVisit+'-'+ActPenalVisit);

		(NuevoGolLocal !== String(ActGolLocal)) ?  wdf_sportResult.nuevoValor($(".team1 .score"),data.equipoLocal.goles) : '' ;
		(NuevoGolVisit !== String(ActGolVisit)) ? wdf_sportResult.nuevoValor($(".team2 .score, .team2_m .score"),data.equipoVisitante.goles) : '';
		(ActPEnalLocal !== String(NuevoPenalLocal)) ? wdf_sportResult.nuevoValor($(".team1 .penal"),data.equipoLocal.penales) : '';
		(ActPenalVisit !== String(NuevoPenalVisit)) ? wdf_sportResult.nuevoValor($(".team2 .penal,.team2_m .penal"),data.equipoLocal.penales) : '';		
		
	},
	nuevoValor: function(selector,valor){
		
		selector.parent('.penales').css('visibility', 'visible');
		selector.fadeOut('slow', function() {
			$(this).empty();
			$(this).text(valor).slideDown('fast');
		});
	},
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
							//console.log(PartidoDate);
							//console.log(ServerDate);
							//console.log(PartidoDate.getTime());
							//console.log(ServerDate.getTime());


							console.log(b);

				      var msDateA = Date.UTC(a.getFullYear(), a.getMonth()+1, a.getDate());
				      var msDateB = Date.UTC(b.getFullYear(), b.getMonth()+1, b.getDate());

						if (parseFloat(msDateA) < parseFloat(msDateB)) {
							console.log("MENOR");
						} else {
							if (parseFloat(msDateA) == parseFloat(msDateB)) {
								console.log("IGUAL");
								
								var resta = parseInt(b.getHours()-a.getHours());
								
									//cop
									if (b.getHours() >= a.getHours()) {
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
											//Faltan 15 minutos o menos para el inicio, actualizar los valores cada minuto
											tiempoActualizacion = 60000;

										} else {
											//Faltan mas de 15 minutos para el inicio, actualizar los valores cada 15 minutos pero menos de una hora
											(minutosrestantes<=60) ? tiempoActualizacion = 900000 : '';
											
										}
									}
									//cop
									console.log(tiempoActualizacion)
									setInterval(function(){wdf_sportResult.loadInfo('update')},tiempoActualizacion);
								

							} else {
								if (parseFloat(msDateA) > parseFloat(msDateB)) {
									console.log("MAYOR");
									
								} else {
									console.log("error");
								}
							}
						}







						}
				});


		
		

	}


};


//wdf_sportResult.fecha_sistema();
wdf_sportResult.loadInfo();
//setInterval(function(){wdf_sportResult.loadInfo('update')},10000);