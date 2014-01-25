; var idTorenoValidate = (typeof IdEventoMxm ==="undefined" || IdEventoMxm === "") ? 0 : IdEventoMxm;
var idTeamValidate = (typeof IdEventoMxmtv === "undefined" || IdEventoMxmtv === "" ) ? 0 : IdEventoMxmtv;
var urlFinalHeader = (idTorenoValidate!=0 && idTeamValidate!=0)? 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+idTorenoValidate+'/'+idTeamValidate+'/previo_alineacion.js' : console.log("Falta Id de torno y partido");
var urlDropdown = (idTorenoValidate!=0 && idTeamValidate!=0)? 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+idTorenoValidate+'/'+idTeamValidate+'/previo_alineacion.js' : console.log("Falta Id de torno y partido");




var wdg_smex_strategy = {

	PintaCacha : function(){
		var ContenidoMaq ="";
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
		ContenidoMaq += '<div class="field">';
		ContenidoMaq += '<img class="cancha" src="../global/img/cancha.png" alt="field" width="624" height="334"/>';
		ContenidoMaq += '<span class="players">';
		/*
		ContenidoMaq += '<span class="player local grid1" style="left:100px;top:100px;">';
		ContenidoMaq += '<a href="#" title="Mario Goméz">';
		ContenidoMaq += '<span class="number textcolor-title2">238</span>';
		ContenidoMaq += '<span class="tooltip">';
		ContenidoMaq += '<img class="playerfoto" src="http://lorempixel.com/51/38" alt="Mario Goméz" width="51" height="38" />';
		ContenidoMaq += '<span class="arrow"></span>';
		ContenidoMaq += '<span class="name">Mario "Looser" Goméz</span>';
		ContenidoMaq += '<span class="position textcolor-title2">Picking boogers</span>';
		ContenidoMaq += '<em>acciones</em>';
		ContenidoMaq += '<span class="actions">';
		ContenidoMaq += '<i class="tvsa-mxm-goal"></i>56\' ';
		ContenidoMaq += '<i class="tvsa-mxm-owngoal"></i>57\' ';
		ContenidoMaq += '<i class="tvsa-mxm-yellowcard"></i>58\'';
		ContenidoMaq += '<i class="tvsa-mxm-goal"></i>56\' ';
		ContenidoMaq += '<i class="tvsa-mxm-owngoal"></i>57\' ';
		ContenidoMaq += '<i class="tvsa-mxm-yellowcard"></i>58\'';
		ContenidoMaq += '<i class="tvsa-mxm-goal"></i>56\' ';
		ContenidoMaq += '<i class="tvsa-mxm-owngoal"></i>&nbsp;57\' ';
		ContenidoMaq += '<i class="tvsa-mxm-yellowcard"></i>&nbsp;58\'';
		ContenidoMaq += '</span>';
		ContenidoMaq += '</span>';
		ContenidoMaq += '</a>';
		ContenidoMaq += '</span>';
		ContenidoMaq += '<span class="player local grid2" style="left:300px;top:80px;">';
		ContenidoMaq += '<a href="#" title="Mario Goméz">';
		ContenidoMaq += '<span class="number textcolor-title2">09</span>';
		ContenidoMaq += '<span class="tooltip">';
		ContenidoMaq += '<img class="playerfoto" src="http://lorempixel.com/51/38" alt="Mario Goméz" width="51" height="38" />';
		ContenidoMaq += '<span class="arrow"></span>';
		ContenidoMaq += '<span class="name">Mario Goméz</span>';
		ContenidoMaq += '<span class="position textcolor-title2">Some position</span>';
		ContenidoMaq += '<em>acciones</em>';
		ContenidoMaq += '<span class="actions">';
		ContenidoMaq += '<i class="tvsa-mxm-goal"></i>&nbsp;56\' ';
		ContenidoMaq += '<i class="tvsa-mxm-owngoal"></i>&nbsp;57\' ';
		ContenidoMaq += '<i class="tvsa-mxm-yellowcard"></i>&nbsp;58\' ';
		ContenidoMaq += '</span>';
		ContenidoMaq += '</span>';
		ContenidoMaq += '</a>';
		ContenidoMaq += '</span>';			
		ContenidoMaq += '<span class="player grid3" style="left:80px;top:250px;">';
		ContenidoMaq += '<a href="#" title="Mario Goméz">';
		ContenidoMaq += '<span class="number textcolor-title2">09</span>';
		ContenidoMaq += '<span class="tooltip">';
		ContenidoMaq += '<img class="playerfoto" src="http://lorempixel.com/51/38" alt="Mario Goméz" width="51" height="38" />';
		ContenidoMaq += '<span class="arrow"></span>';
		ContenidoMaq += '<span class="name">Mario Goméz</span>';
		ContenidoMaq += '<span class="position textcolor-title2">Missing the goal</span>';
		ContenidoMaq += '<em>acciones</em>';
		ContenidoMaq += '<span class="actions">';
		ContenidoMaq += '<i class="tvsa-mxm-goal"></i>&nbsp;56\' ';
		ContenidoMaq += '<i class="tvsa-mxm-owngoal"></i>&nbsp;57\' ';
		ContenidoMaq += '<i class="tvsa-mxm-yellowcard"></i>&nbsp;58\'';
		ContenidoMaq += '</span>';
		ContenidoMaq += '</span>';
		ContenidoMaq += '</a>';
		ContenidoMaq += '</span>';
		*/
		ContenidoMaq += '</span>';
		ContenidoMaq += '</div>';

		$("#containerWdgMexStrategy").html(ContenidoMaq).css("display","none").fadeIn('slow');
		
		setTimeout(function(){wdg_smex_strategy.loadDropdown()},1000);
		wdg_smex_strategy.FunInicio();

		
	},

	loadDropdown : function(){
		
		var ContDropdown ="";
		
			$.ajax({
			 url: 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+idTorenoValidate+'/'+idTeamValidate+'/previo_alineacion.js',
		  dataType: 'jsonp',		  
		jsonpCallback:'datagame',
		  cache: false,
		})
		.done(function(data) {			
			ContDropdown += '<ul class="wdg_smex_strategy_01_dropdownlist">';			
			for (var r = 0; r < data.PrevLineUps.localTeam.length; r++) {
			ContDropdown += '<li><p data-field="'+data.PrevLineUps.localTeam[r].url+'">'+data.PrevLineUps.localTeam[r].week+'</p></li>';

			};
			ContDropdown += '</ul>';

			$(".wdg_smex_strategy_01_listcontainer").html(ContDropdown);
			
		})
		.fail(function() {
			console.log("error al cargar DROPDOWN: "+urlDropdown);
			
			
		})
		


	},
	loadAlineacion: function(el,IDTemp,tipo) {
		console.log("llamando loadAlineacion");
		// var url = 'http://mxm.televisadeportes.esmas.com/futbol/data/284/20839/previo_alineacion.js?185';
		//var url = '../wdg_smex_strategy_01/' + type + '.json'; // just an example using plain text files
		
		el.find('span.players').fadeOut('fast', function() {
			$(this).empty().css("display", "none");
		});
		console.log('cargando--> http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+idTorenoValidate+'/'+IDTemp+'/previo_alineacion.js');
		$.ajax({
		  url: 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+idTorenoValidate+'/'+IDTemp+'/previo_alineacion.js',
		  dataType: 'jsonp',		  
		jsonpCallback:'datagame',
		  cache: false,
		  success: function(data) {
		  	console.log(data);		  	
			var miHTML = '';
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
							case 'penalFalladoSerie': icon = ''; break;
							case 'entraAlJuego': icon = 'tvsa-mxm-goal'; break;
							case 'expulsion': icon = 'tvsa-mxm-redcard'; break;
							default: icon = ''; break;
						}
						actions += '<i class="'+icon+'"></i>'+data[equipoString].team[i].actions[a].minute+'\'';
					}
					actions +='</span>';
				}
				if(parseInt(data[equipoString].team[i].team) === 1) { vc = "local"} else{ vc = "visit"}

				miHTML += '<span class="player '+vc+' '+arrow+'" style="left:'+data[equipoString].team[i].posx+'px;top:'+positiony+'px;">'+
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
					var I = String($(this).find('p').data('field'));
					var f = I.split('/');			
					wdg_smex_strategy.loadAlineacion($parent, f[4]);
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
		
	}

};


wdg_smex_strategy.PintaCacha();







	
	


