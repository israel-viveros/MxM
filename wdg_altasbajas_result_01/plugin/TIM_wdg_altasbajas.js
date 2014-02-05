;(function(){
	$.fn.wdgAltasBajas = function(options){
		var settings = $.extend({
			'idtorneo':0,
			'idequipo':0,
			'idtorneo2':0
		}, options);

		var globalThis = this;



		var name_jor = "";
		var oficial = 1;
		var timeRecarga = 600;




		function regresaSiglas(abrev, nombre, numero) {
		    nombre = (abrev != undefined && abrev != null && abrev != '' && abrev != 'null') ? abrev : nombre;
		    nombre = $.trim(nombre.toUpperCase());
		    var siglas = nombre.substring(0, numero);
		    return siglas.toUpperCase();
		}

		function validaGoles(gol, status, estampa) {
		    var miFechaServidor = new Date(timeDTV.timeYear, (timeDTV.timeMonth - 1), timeDTV.timeDay, timeDTV.timeHour, timeDTV.timeMinute);
		    var miFechaEvento = new Date((estampa * 1000) + (3600000 * 6));
		    var goles = '-';

		    if (miFechaEvento < miFechaServidor) {
		        goles = isNaN(gol) ? status : gol;
		    } else {
		        goles = gol;
		    }

		    goles = (goles == null) ? '-' : goles;
		    return goles;
		}




var jornadasCalendarDTV = {
    
    jornadaCalendarRoute: url_itd + folder_deportes + "home/jornada/",
    jornadaPresente: 0,
    fechaInicio: '',
    contenidoCentral: '',
    contenidohidde: '',
    fechaAct: '',
    numeroTorneoAct: 0,
    timerCalendar: 0,
    dataCalendar: '',
    dataCalendarH: '',

    iniciar: function(fechaCalendar) {
    
    	MaqueWdgAltas = "";    	
		MaqueWdgAltas += '<div class="str_pleca_01">';
		MaqueWdgAltas += '<div class="str_pleca_01_title">';
		MaqueWdgAltas += '<strong class="background-color1"><a class="textcolor-title3" href="#" title="Link Description"><span id="title-jornada"></span><span class="str_pleca_01_arrowa selected"></span><span class="str_pleca_01_arrowb"></span></a></strong>';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '<div class="division">';
		MaqueWdgAltas += '<span>';
		MaqueWdgAltas += '<img src="" width="45" height="30">';
		MaqueWdgAltas += '</span>';
		MaqueWdgAltas += '<h2 class="games"></h2>';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '<div class="filterResultado">';		
		MaqueWdgAltas += '<div class="lineaResultado result2">';
		MaqueWdgAltas += '<span class="title">Jornada</span>';
		MaqueWdgAltas += '<div class="filter">';
		MaqueWdgAltas += '<div class="wdg_altasbajas_result_012_dropdown drop2">';
		MaqueWdgAltas += '<div class="wdg_altasbajas_result_012_dropdowncontent content2" id="name-jornada">';
		MaqueWdgAltas += '<p></p>';
		MaqueWdgAltas += '<span class="tvsa-caret-down"></span>';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '<div class="wdg_altasbajas_result_012_listcontainer">';
		MaqueWdgAltas += '<ul class="wdg_altasbajas_result_012_dropdownlist list2" id="nro_jornadas">	                            ';
		MaqueWdgAltas += '</ul>  ';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '<div id="circleGLoading">';
		MaqueWdgAltas += '<div id="circleG_1" class="circleG"></div>';
		MaqueWdgAltas += '<div id="circleG_2" class="circleG"></div>';
		MaqueWdgAltas += '<div id="circleG_3" class="circleG"></div>';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '<ul class="deg">';
		MaqueWdgAltas += '<li id="show-j"></li>';
		MaqueWdgAltas += '<li id="hidde-j"></li>';		
		MaqueWdgAltas += '</ul>';
		MaqueWdgAltas += '<div class="controls"> ';
		MaqueWdgAltas += '<a class="prev bginactive" title="Link Description" href="#">';
		MaqueWdgAltas += '<span class="tvsa-caret-up"></span>';
		MaqueWdgAltas += '</a> ';
		MaqueWdgAltas += '<a class="next bgactive" title="Link Description" href="#">';
		MaqueWdgAltas += '<span class="tvsa-caret-down"></span>';
		MaqueWdgAltas += '</a> ';
		MaqueWdgAltas += '<a class="full-timetable" href="#"> ';
		MaqueWdgAltas += '<span>Ver todos</span> ';
		MaqueWdgAltas += '</a> ';
		MaqueWdgAltas += '</div>';
		MaqueWdgAltas += '<div class="degraded"></div>';

		globalThis.html(MaqueWdgAltas);


        clearInterval(jornadasCalendarDTV.timerCalendar);
        //jornadasCalendarDTV.timerCalendar = setInterval("jornadasCalendarDTV.actualizaContenido()", (timeRecarga * 1000));
		jornadasCalendarDTV.timerCalendar = setInterval((function(){ jornadasCalendarDTV.actualizaContenido() }), (timeRecarga * 1000));
        var timeToday = new Date(timeDTV.timeYear + "/" + timeDTV.timeMonth + "/" + timeDTV.timeDay);
        fechaCalendar = timeDTV.timeYear + "/" + timeDTV.timeMonth + "/" + timeDTV.timeDay;
        jornadasCalendarDTV.fechaInicio = new Date(fechaCalendar);
        jornadasCalendarDTV.fechaAct = fechaCalendar;        
        jornadasCalendarDTV.numeroTorneoAct = settings.idtorneo,
        jornadasCalendarDTV.numeroIdEquipo = settings.idequipo,
        jornadasCalendarDTV.Jornada2 = settings.idtorneo2,
        urFinal = "";

        var fechaDiaActual = new Date(jornadasCalendarDTV.fechaAct);
        var tiempoActual = fechaDiaActual.getTime() / 1000;
        

        $.when(jornadasCalendarDTV.primeraJornada()).done(function(){
        	setTimeout(function(){jornadasCalendarDTV.segundaJornada()},1000);        	
        });
        

	   

	    if(jornadasCalendarDTV.numeroTorneoAct!==0 && jornadasCalendarDTV.numeroIdEquipo ===0){
			urFinal = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornadalistadojsonp.js';

				 $.ajax({
	            url: urFinal,
	            jsonpCallback: 'jornadalistado',
	            dataType: 'jsonp',
	            cache: true,
	            data: 'v=' + timeDTV.returnData(),
	            success: function(data) {
	                if (data == null) {
	                    data = new Array();
	                }
	                jornadasCalendarDTV.dataCalendarH = data;
	                var i = 0;
	                for (i = 0; i < jornadasCalendarDTV.dataCalendarH.length; i++) {

	                    var valorj = jornadasCalendarDTV.dataCalendarH[i];
	                    jornadasCalendarDTV.jornadaPresente = i;
	                    var startDate = new Date(valorj.enddate)
	                    name_jor += '<li data-jornada="'+startDate.format('yyyy/mm/dd')+'"><p>' + valorj.name + '</p></li>'

	                    if (tiempoActual <= valorj.startstamp) {
	                        i = jornadasCalendarDTV.dataCalendarH.length + 1;
	                    } else if (tiempoActual <= valorj.endstamp) {
	                        i = jornadasCalendarDTV.dataCalendarH.length + 1;
	                    }
	                }

	                $('#name-jornada').html("<p>" + jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].name + '</p><span class="tvsa-caret-down"></span>');
	                $('#title-jornada').html(jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].name)

	                $.ajax({
	                    url: jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornada_' + jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].weekid + 'jsonp.js',
	                    jsonpCallback: 'jornada',
	                    dataType: 'jsonp',
	                    cache: false,
	                    data: 'v=' + timeDTV.returnData(),
	                    success: function(data) {
	                        crear_jornada(data)
	                    }
	                });

	            }
	        });

    	}else{
    		if(jornadasCalendarDTV.numeroTorneoAct===0 && jornadasCalendarDTV.numeroIdEquipo ===0){
    			globalThis.remove();	
    		}else if(jornadasCalendarDTV.Jornada2===0 && jornadasCalendarDTV.numeroTorneoAct===0){
    			globalThis.remove();	
    		}
    		
    		
    	}
    	



	
        
    },
    primeraJornada:function(){
    	if (jornadasCalendarDTV.numeroIdEquipo!=0 && jornadasCalendarDTV.numeroTorneoAct!=0){
        	console.log("ejecuto la primera ronda");
    	    urFinal = "http://interacciontd.televisadeportes.esmas.com/deportes/home/jornada/"+jornadasCalendarDTV.numeroTorneoAct+"/jornada_"+jornadasCalendarDTV.numeroIdEquipo+"jsonp.js";
    	    globalThis.find('.full-timetable').css("visibility","hidden");
    	    $.ajax({
	                    url: urFinal,
	                    jsonpCallback: 'jornada',
	                    dataType: 'jsonp',
	                    cache: false,
	                    data: 'v=' + timeDTV.returnData(),
	                    success: function(data) {
	                       crear_jornada(data)
	                    },
	                    fail:function(){
	                    	console.log("Algo salio mal en 1");
	                    	jornadasCalendarDTV.primeraJornada();
	                    }
	                });
    	    globalThis.children('.filterResultado').remove();    	    
	    }
	    $("#title-jornada").text("Resultados");
    },
    segundaJornada: function(){
    		// segunda jornada     		

	   	if (jornadasCalendarDTV.Jornada2!== 0 && jornadasCalendarDTV.numeroIdEquipo!==0){
    	   	console.log("ejecuto la segunda ronda");


    	   	 urFinal = "http://interacciontd.televisadeportes.esmas.com/deportes/home/jornada/"+jornadasCalendarDTV.Jornada2+"/jornada_"+jornadasCalendarDTV.numeroIdEquipo+"jsonp.js";    	    
    	  $.ajax({
	                    url: urFinal,
	                    jsonpCallback: 'jornada',
	                    dataType: 'jsonp',
	                    cache: false,
	                    data: 'v=' + timeDTV.returnData(),
	                    success: function(data) {
	                        crear_jornada(data,'jornada2')
	                    },
	                    fail:function(){
	                    	console.log("Algo salio mal en 2");
	                    	jornadasCalendarDTV.segundaJornada();
	                    }
	                });


	    }

	   	
	   },//End segunda jornada
	   actualizaContenido:function(){
	   	

	   		if(jornadasCalendarDTV.numeroTorneoAct!==0 && jornadasCalendarDTV.numeroIdEquipo==0 && jornadasCalendarDTV.Jornada2 ===0 ){
	   			console.log("actualizo listado...");
	   		}else if(jornadasCalendarDTV.numeroTorneoAct !== 0 && jornadasCalendarDTV.numeroIdEquipo !== 0 && jornadasCalendarDTV.Jornada2 === 0){
	   			console.log("un solo equipo");
	   			
	   		}else if(jornadasCalendarDTV.Jornada2!==0 && jornadasCalendarDTV.numeroIdEquipo!==0 && jornadasCalendarDTV.numeroTorneoAct!==0){
	   			console.log("un solo equipo 2 joarnadas");
	   			

	   		}


	   },

	   procesoActualiza: function(parametro){

	   	



	   }
   
   

};




jornadasCalendarDTV.iniciar();
 
jornadasCalendarDTV.contenidoCentral = new Array();
    jornadasCalendarDTV.contenidohidde = new Array();
    jornadasCalendarDTV.contenidoJornada = new Array();    
    jornadasCalendarDTV.contenidoJornada2 = new Array();    
    jornadasCalendarDTV.Global = new Array();
    jornadasCalendarDTV.GlobalSort = new Array();




function crear_jornada(data,jornada2) {
	if(jornada2!=="jornada2"){
		jornadasCalendarDTV.Global.length = 0;
		jornadasCalendarDTV.GlobalSort.length = 0;
		jornadasCalendarDTV.contenidoJornada.length = 0;
		jornadasCalendarDTV.contenidoJornada2.length = 0;
	}
	
	
    var bandera=0;
    if (data == null) {
        data = new Array();
    }

    jornadasCalendarDTV.dataCalendar = data;
    
    var offsetCookie = zonaGMT;
    var nombreTorneo = "";
    var idTorneo = "";
    var textoHijo = '';
    var padres = new Array();
    var cuentaNodos = 0;
    var hojaContenido = 0;

    for (var i = 0; i < data.length; i++) {


    	if(i===0){    		
    		globalThis.find('.division span img').attr('src', data[i].tournament.icono);
    		globalThis.find('.division h2').text(data[i].tournament.name);
    		globalThis.find('.controls .full-timetable').attr('href', 'http://stats.televisadeportes.esmas.com/futbol/torneo/'+String(data[i].tournament.name).replace(/ /g ,"-").toLowerCase()+'/calendario/'+data[i].sef.tournamentid+'/');
    	}
    	

        conjunto = data[i];

        if (conjunto.tournament.id == jornadasCalendarDTV.numeroTorneoAct || jornadasCalendarDTV.numeroTorneoAct == 0) {
            var partidoHtml = '';

            var fechaEvento = convierteFecha(conjunto.fechastamp, offsetCookie, "dd/mmm");
            fechaEvento = fechaEvento.replace("/",".&nbsp;");
            var horaEvento = convierteFecha(conjunto.fechastamp, offsetCookie, "HH:MM");
            var sefMxmHash = (tbaner != undefined && tbaner != null && tbaner != '') ? '#' + tbaner : '';

            var clickUrlTv = (conjunto.eventurl != undefined && conjunto.eventurl != null && conjunto.eventurl != '') ? conjunto.eventurl : '';
            var clickUrlSef = (conjunto.sef.mxmurl != undefined && conjunto.sef.mxmurl != null && conjunto.sef.mxmurl != '') ?  conjunto.sef.mxmurl + sefMxmHash  : '';

            var imagenLocal = (oficial == 1) ? '<img width="24" height="24" src="' + conjunto.local.team.img.oficial + '" alt="'+conjunto.local.name+'">' : '<img width="24" height="24" src="' + conjunto.local.team.img.oficialno + '" alt="'+conjunto.local.name+'">';
            var imagenVisit = (oficial == 1) ? '<img width="24" height="24" src="' + conjunto.visit.team.img.oficial + '" alt="'+conjunto.local.name+'">' : '<img width="24" height="24" src="' + conjunto.visit.team.img.oficialno + '" alt="'+conjunto.local.name+'">';

            if (imagenLocal == '<img width="24" height="24" src="http://i2.esmas.com/canal30/img/spacer.gif" alt="'+conjunto.local.name+'">') {
                imagenLocal = '<img width="24" height="24" src="' + conjunto.local.team.img.logoch + '"  alt="'+conjunto.local.name+'">';
            }

            if (imagenVisit == '<img width="24" height="24" src="http://i2.esmas.com/canal30/img/spacer.gif" alt="'+conjunto.local.name+'">') {
                imagenVisit = '<img width="24" height="24" src="' + conjunto.visit.team.img.logoch + '"  alt="'+conjunto.local.name+'">';
            }

            var golesLocal = validaGoles(conjunto.local.team.gol, conjunto.local.team.golstatus, conjunto.fechastamp);
            var golesVisit = validaGoles(conjunto.visit.team.gol, conjunto.visit.team.golstatus, conjunto.fechastamp);


            if (parseInt(conjunto.local.team.pen) > 0 || parseInt(conjunto.visit.team.pen) > 0) {
                golesLocal = '<div class="result textcolor-title2">(' + conjunto.local.team.pen + ') ' + golesLocal + '</div>';
                golesVisit = '<div class="result textcolor-title2">' + golesVisit + ' (' + conjunto.visit.team.pen + ')</div>';
            } 
            var clasJorname =  (typeof jornada2 !=="undefined") ? '2J' : '1J';
            partidoHtml = '<div class="'+conjunto.fechastamp+' '+conjunto.eventtime+' '+clasJorname+' wdg_altasbajas_result_01_block'+((conjunto.minuto!="")?" activo":"")+'" data-link="'+clickUrlSef+'">';
            partidoHtml += '<div class="date textcolor-title2">';
            partidoHtml += '<span class="inactive">';
            partidoHtml += '<span class="inactive">' + fechaEvento + '</span>'
            partidoHtml += '</span>'
            partidoHtml += '<span class="time">' + horaEvento + '</span>'
            partidoHtml += '</div>'
            partidoHtml += '<div class="icon_team">';
            partidoHtml += imagenLocal
            partidoHtml += '</div>'
            partidoHtml += '<div class="team">' + conjunto.local.abrev + '</div>'
            partidoHtml += '<div class="result textcolor-title2">' + golesLocal + '</div>'
            partidoHtml += '<div class="content_versus">'
            partidoHtml += '<div class="versus textcolor-title4">-</div>'
            partidoHtml += '<div class="versus_time textcolor-title4">'+conjunto.periodo+' '+conjunto.minuto+'</div>'
            partidoHtml += '</div>'
            partidoHtml += '<div class="result textcolor-title2">' + golesVisit + '</div>'
            partidoHtml += '<div class="team">' + conjunto.visit.abrev + '</div>'
            partidoHtml += '<div class="icon_team">'
            partidoHtml += imagenVisit
            partidoHtml += '</div>'
            partidoHtml += "</div>"


            
        }
        

        if (jornada2==="jornada2") { 
        console.log("ES jornada 2");
        	jornadasCalendarDTV.contenidoJornada2.push(partidoHtml)
        }else{
        	console.log("ES jornada 1");
        	jornadasCalendarDTV.contenidoJornada.push(partidoHtml)
        }


    }
        
        jornadasCalendarDTV.Global = jornadasCalendarDTV.contenidoJornada.concat(jornadasCalendarDTV.contenidoJornada2);
        jornadasCalendarDTV.GlobalSort = jornadasCalendarDTV.Global.sort();
        
        var visible= "", novisible="";
        for (var p = 0; p < jornadasCalendarDTV.GlobalSort.length; p++) {
        	(p<7) ? visible+= jornadasCalendarDTV.GlobalSort[p] : novisible += jornadasCalendarDTV.GlobalSort[p];
        };
        $('#show-j').html(visible);
        $('#hidde-j').html(novisible);

    $("#nro_jornadas").html(name_jor).children('li').bind('click', function(event) { actualizar_jornada($(this).data('jornada')); });
    $(".wdg_altasbajas_result_01_block").css("cursor","pointer").bind('click', function(event) { window.location.assign($(this).data("link")); });

    
    (jornadasCalendarDTV.GlobalSort.length>7) ? $(".controls").css("display","block"): $(".controls").css("display","none");
    $("#circleGLoading").fadeOut("fast")
    
}
		

	}
})(jQuery);