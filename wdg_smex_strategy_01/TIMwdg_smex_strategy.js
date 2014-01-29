; var idTorenoValidate = (typeof IdEventoMxm ==="undefined" || IdEventoMxm === "") ? 0 : IdEventoMxm;
var idTeamValidate = (typeof IdEventoMxmtv === "undefined" || IdEventoMxmtv === "" ) ? 0 : IdEventoMxmtv;
var idClubIdValidate = (typeof IdClub === "undefined" || IdClub === "" ) ? 0 : IdClub;
var urlFinalHeader = (idTorenoValidate!=0 && idTeamValidate!=0)? 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+idTorenoValidate+'/'+idTeamValidate+'/previo_alineacion.js' : console.log("Falta Id de torno y partido");
var urlDropdown = (idTorenoValidate!=0 && idClubIdValidate!=0)? 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+idTorenoValidate+'/'+idClubIdValidate+'/matchesclub.js' : console.log("Falta Id de torneo y/o club");




var wdg_smex_strategy = {

	PintaCacha : function(tipo){
		var ContenidoMaq ="";
		if(tipo === "dropdown"){			
			ContenidoMaq += '<div class="titulo textcolor-title4">Estrategia más utilizada</div>'
			ContenidoMaq += '<div class="pleca_inferior">'
			ContenidoMaq += '<div>'
			ContenidoMaq += '<strong>Partidos</strong>'
			ContenidoMaq += '</div>'
			ContenidoMaq += '<div class="wdg_smex_strategy_01_dropdown">'
			ContenidoMaq += '<div class="wdg_smex_strategy_01_dropdowncontent">'
			ContenidoMaq += '<p></p>'
			ContenidoMaq += '<div> <a id="dropdwon-right"  href="#" title="Link Description"> <i class="tvsa-caret-down"></i></a> </div>'
			ContenidoMaq += '</div>'
			ContenidoMaq += '<div class="wdg_smex_strategy_01_listcontainer">'		
			ContenidoMaq += '</div>'
			ContenidoMaq += '</div>'
			ContenidoMaq += '</div>'
		}
		if (tipo === "alineacionFinal") {
			ContenidoMaq += '<ul class="menu">';
	    	ContenidoMaq += '<li class="first active"><a href="#" data-query="inicial" class="ui-link">Alineación Inicial</a></li><li><a href="#" data-query="media" class="ui-link">Alineación Media</a></li><li><a href="#" data-query="final" class="ui-link">Alineación Final</a></li>';
			ContenidoMaq += '</ul>';
		}
		ContenidoMaq += '<div class="field">';
		ContenidoMaq += '<img class="cancha" src="../global/img/cancha.png" alt="field" width="624" height="334"/>';
		ContenidoMaq += '<span class="players">';		
		ContenidoMaq += '</span>';
		ContenidoMaq += '</div>';

		$("#containerWdgMexStrategy").html(ContenidoMaq).css("display","none").fadeIn('slow');
		
		setTimeout(function(){wdg_smex_strategy.loadDropdown()},1000);
		wdg_smex_strategy.FunInicio();

		(tipo==="alineacionFinal") ? wdg_smex_strategy.botonesAlineacion() : '';
		
	},

	loadDropdown : function(){
		console.log("execute loaddropdown function");
		var ContDropdown ="";
		
			$.ajax({
			 url: urlDropdown,
		  dataType: 'jsonp',		  
		jsonpCallback:'matches',
		  cache: false,
		})
		.done(function(data) {	
		console.log(data);
			ContDropdown += '<ul class="wdg_smex_strategy_01_dropdownlist">';			
			for (var r = 0; r < data.Team.length; r++) {
			ContDropdown += '<li><p data-field="'+data.Team[r].matchid+'">'+data.Team[r].week+'</p></li>';

			};
			ContDropdown += '</ul>';

			$(".wdg_smex_strategy_01_listcontainer").html(ContDropdown);
			
		})
		.fail(function() {
			console.log("error al cargar DROPDOWN: "+urlDropdown);
			
			
		})
		


	},
	loadAlineacion: function(el,IDTemp,tipo) {
		// var url = 'http://mxm.televisadeportes.esmas.com/futbol/data/284/20839/previo_alineacion.js?185';
		//var url = '../wdg_smex_strategy_01/' + type + '.json'; // just an example using plain text files
		
		el.find('span.players').fadeOut('fast', function() {
			$(this).empty().css("display", "none");
		});
		//console.log('cargando--> http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+idTorenoValidate+'/'+IDTemp+'/previo_alineacion.js');
		$.ajax({
		  url: 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+idTorenoValidate+'/'+IDTemp+'/previo_alineacion.js',
		  dataType: 'jsonp',		  
		jsonpCallback:'datagame',
		  cache: false,
		  success: function(data) {
		  	console.log(data);		  	
			var miHTML = '', aliFinal = '',ArregloHidden="";
			var equipo = new Array();
			var positiony, positionx,vc,equipoString;			

			equipo[0] = "lineuplocal";
			equipo[1]= "lineUpVisit";
			
			for (var t = 0; t < equipo.length; t++) {
				console.log(equipo[t])
			equipoString = String(equipo[t]);
			//console.log(data[equipoString]);

			for (var i = 0; i < data[equipoString].team.length; i++) {			
				/* arrow styles based on px values */
				var arrow = '';
				var actions = '',icon='';
				positionx = parseInt(data[equipoString].team[i].posx);
				positiony = parseInt(data[equipoString].team[i].posy);
				if (positionx <= 290 && positiony <= 140) arrow = 'grid1';
				else if (positionx <= 290 && positiony> 140) arrow = 'grid3';
				else if (positionx > 290 && positiony <= 140) arrow = 'grid2';
				else arrow = 'grid4';
				
				if ( typeof data[equipoString].team[i].actions !== "undefined"){
					actions += '<em>acciones</em><span class="actions">';
					for (var a=0;a<data[equipoString].team[i].actions.length;a++) {
						switch(data[equipoString].team[i].actions[a].type){
							case 'golVisitante': icon = 'tvsa-mxm-goal'; break;
							case 'amonestacion': icon = 'tvsa-mxm-owngoal'; break;
							case 'saleDelJuego': icon = 'tvsa-mxm-offside'; break;							
							case 'entraAlJuego': icon = 'tvsa-mxm-goal'; break;
							case 'expulsion': icon = 'tvsa-mxm-redcard'; break;
							default: icon = ''; break;
						}
						actions += '<i class="'+icon+'"></i>'+data[equipoString].team[i].actions[a].minute+'\'';
					}
					actions +='</span>';
				}
				if(parseInt(data[equipoString].team[i].team) === 1) { vc = "local"} else{ vc = "visit"}

				miHTML += '<span data-guid="'+data[equipoString].team[i].guid+'" class="player '+vc+' '+arrow+'" style="left:'+data[equipoString].team[i].posx+'px;top:'+positiony+'px;">'+
					'<a href="#" title="'+data[equipoString].team[i].name+' '+data[equipoString].team[i].name+'">'+
						'<span class="number textcolor-title2">'+data[equipoString].team[i].number+'</span>'+
						'<span class="tooltip">'+
							'<img class="playerfoto" src="'+data[equipoString].team[i].image+'" alt="'+data[equipoString].team[i].name+'" width="51" height="38" />'+
							'<span class="arrow"></span>'+
							'<span class="name">'+data[equipoString].team[i].name+' '+data[equipoString].team[i].nickName+'</span>'+
							'<span class="position textcolor-title2">'+data[equipoString].team[i].position+'</span>'+actions+							
						'</span>'+
					'</a>'+
				'</span>';
			
			};
			el.find('span.players').html(miHTML).fadeIn('slow');

			(tipo ==="actualizacion" ) ? '' : $(".wdg_smex_strategy_01_dropdowncontent p").text(data.week);
//Alineacion final
			if(tipo==="Alineacionfinal"){
								
				console.log("calcula la alineacion final");
				for (var d = 0; d < data[equipoString].substitutes.length; d++) {
					//console.log(data[equipoString].substitutes[d].nickName);
					if(typeof data[equipoString].substitutes[d].actions !== "undefined"){
						if(parseInt(data[equipoString].substitutes[d].team) === 1) { vc = "local"} else{ vc = "visit"}
						for (var f = 0; f < data[equipoString].substitutes[d].actions.length; f++) {
							//console.log(data[equipoString].substitutes[d].actions[f]);
							if(data[equipoString].substitutes[d].actions[f].type === "entraAlJuego" ){
								//console.log(data[equipoString].substitutes[d].nickName);
								//console.log(data[equipoString].substitutes[d].actions[f].playeridchange);								
								ArregloHidden += String(data[equipoString].substitutes[d].actions[f].playeridchange)+',';

								aliFinal += '<span data-guid="'+data[equipoString].substitutes[d].guid+'" class="player '+vc+' '+arrow+'" style="left:'+data[equipoString].substitutes[d].posx+'px;top:'+positiony+'px;">'+
									'<a href="#" title="'+data[equipoString].substitutes[d].name+' '+data[equipoString].substitutes[d].name+'">'+
										'<span class="number textcolor-title2">'+data[equipoString].substitutes[d].number+'</span>'+
										'<span class="tooltip">'+
											'<img class="playerfoto" src="'+data[equipoString].substitutes[d].image+'" alt="'+data[equipoString].substitutes[d].name+'" width="51" height="38" />'+
											'<span class="arrow"></span>'+
											'<span class="name">'+data[equipoString].substitutes[d].name+' '+data[equipoString].substitutes[d].nickName+'</span>'+
											'<span class="position textcolor-title2">'+data[equipoString].substitutes[d].position+'</span>'+							
										'</span>'+
									'</a>'+
								'</span>';
							}

							
						};
					}
				};
				console.log("Arreglo Hidden");
				var arrspl = ArregloHidden.split(",");
				for (var k = 0; k < arrspl.length; k++) {					
					$("span[data-guid="+arrspl[k]+"]").remove();
				};
				el.find('span.players').append(aliFinal).fadeIn('slow');
			}
// Alineacion Final			
		


		};
		  }
		}).done(function() {
			// post update
		});
	},
	
	FunInicio : function(){

		$('section.wdg_smex_strategy_01').each(function(){
			/* Show Retina Version */
			var root = (typeof exports == 'undefined' ? window : exports);
			var config = {check_mime_type: true};
			root.Retina = Retina;
			function Retina() {}
			Retina.configure = function(options) {
				if (options == null) options = {};
				for (var prop in options) config[prop] = options[prop];
			};
			Retina.isRetina = function(){
				var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
								   (min--moz-device-pixel-ratio: 1.5),\
								   (-o-min-device-pixel-ratio: 3/2),\
								   (min-resolution: 1.5dppx)";
				if (root.devicePixelRatio > 1) 
					return true;
				if (root.matchMedia && root.matchMedia(mediaQuery).matches)
					return true;
				return false;
			};
			
			var $parent = $(this); // store component
			
			if (Retina.isRetina()) {
				var low = $parent.find('img.cancha').attr('src');
				$parent.find('img.cancha').attr('src',low.replace('.png','@2x.png'));
			}
			
			// load the first ajax players
			wdg_smex_strategy.loadAlineacion($parent, idTeamValidate);
		
			var $parent = $('.wdg_smex_strategy_01');
			var $dropdownAnchor = $parent.find('.wdg_smex_strategy_01_dropdown');
			
			
			var $firstItem2 = $('.pleca_inferior .wdg_smex_strategy_01_dropdownlist li:first-child'); 
			$('.pleca_inferior .wdg_smex_strategy_01_dropdowncontent p').html($firstItem2.find('p').html());
			
			$dropdownAnchor.bind('click','touchstart', function(evt) {
				
				evt.preventDefault();
				
				var listItems = $(this).find('.wdg_smex_strategy_01_listcontainer').find('.wdg_smex_strategy_01_dropdownlist');
				var padre = $(this);
				var visibilidad = listItems.css('visibility'); 
				
				if ( visibilidad == 'hidden' ) 
					listItems.css({
						visibility: 'visible',
						height: 'auto',
						'max-height' : '180px',
						'overflow-y': 'scroll',
						'overflow-x': 'hidden'         
					});
				 else 
					 listItems.css({
						visibility: 'hidden',
						height: '0px'
					});
					
		/*	  $dropdownAnchor.bind('mouseleave', function(evt) {
				evt.preventDefault();
				var $listItems = $(this).find('.wdg_smex_strategy_01_dropdownlist');
				var visibilidad = $listItems.css('visibility');
				if ( visibilidad == 'visible' ) {
					$listItems.css({
						visibility: 'hidden',
						height: '0px'       
					});
				} 
			});*/
				
				//var $dropdownItems2 = $(this).find('.wdg_smex_strategy_01_dropdownlist li');
				var dropdownItems2 = $('.wdg_smex_strategy_01_dropdownlist li');
//				$dropdownItems2.bind('click','touchstart', function(evt) {
				
				dropdownItems2.unbind().bind('click', function(evt) {
					evt.preventDefault();
					console.log("clickeando");
					padre.find('.wdg_smex_strategy_01_dropdowncontent p').html($(this).find('p').html());
					
					

					// calling the AJAX method
					
					wdg_smex_strategy.loadAlineacion($parent,$(this).find('p').data('field'));
//					wdg_smex_strategy.loadAlineacion($parent, 1455,'actualizacion');

					
					// Cambiar Campos //
					
					$('.wdg_smex_strategy_01 table tr td').removeClass();
					$('.wdg_smex_strategy_01 table tr td a').removeClass();
					$('.wdg_smex_strategy_01 table tr td').addClass('largo');
					$('.wdg_smex_strategy_01 table tr td a').addClass('font_menu');
					
					var field = $(this).find('p').attr("data-field");

					
					$('.wdg_smex_strategy_01 .campo').hide();
					//$('.wdg_smex_strategy_01 .' + field).show();
					
				});
				
				
			});
		});
		
		/*Desktop*/
		$('section.wdg_smex_strategy_01 .player a').live('mouseenter',function(event){
			event.preventDefault();
				$(this).children('.tooltip').css('display','block');
		});
		$('section.wdg_smex_strategy_01 .player a').live('mouseleave',function(event){
			event.preventDefault();
				$(this).children('.tooltip').css('display','none');
		});
		if($(window).width() < 948)
		{
			/*Tablet-Mobile*/
			$('section.wdg_smex_strategy_01 .player a').live('click','touchstart',function(event){
				event.preventDefault();
				$wss1_status = $(this).children('.tooltip').css('display');
				if($wss1_status == 'block'){
					$(this).children('.tooltip').css('display','none');
				}else{
					$(this).children('.tooltip').css('display','block');
				}
			});
			$('section.wdg_smex_strategy_01 .player a > span').bind("touchstart",function(event){
				event.preventDefault();
			});
		}
		
	},
	botonesAlineacion : function(){
		var preview="";
		$("#containerWdgMexStrategy .menu li").unbind().bind('click', function(event) {
			event.preventDefault();
			$(this).parent('ul').find('li').each(function() {
				$(this).removeClass('active');
			});
			$(this).addClass('active');

			preview = String($(this).children('a').data('query')).toLowerCase();

			switch(preview){
				case 'inicial': wdg_smex_strategy.AlineacionInicial(); break;
				case 'final': wdg_smex_strategy.AlineacionFinal(); break;
			}

			
		});
	},
	AlineacionInicial: function(){
		console.log("Es la alinacion INICIAL");
		wdg_smex_strategy.loadAlineacion($("#containerWdgMexStrategy"), idTeamValidate);
	},
	AlineacionFinal: function(){
		wdg_smex_strategy.loadAlineacion($("#containerWdgMexStrategy"), idTeamValidate,'Alineacionfinal');
	}

};

if(idClubIdValidate !== 0) { 
	wdg_smex_strategy.PintaCacha('dropdown'); 
}
else{
	if (urlFinalHeader!="") {
		wdg_smex_strategy.PintaCacha('alineacionFinal');
	};
	
}


