;(function(){
	$.fn.wdgLiveMxM = function(options){
		var setting = $.extend({
			'idmxm': 0,
			'idmxmtv': 0
		}, options);


		var GlobalThis = this;

		var wdgMxmLive = {
			urlfeed : 'http://lab.israelviveros.com/deportes/wdg_mxm_live_02/'+setting.idmxm+'/'+setting.idmxmtv+'/mxm.jsonp',
			feedCallback: 'mxmSorteo',
			urlfeedHeader: 'http://lab.israelviveros.com/deportes/wdg_mxm_live_02/'+setting.idmxm+'/'+setting.idmxmtv+'/mxm_header.js',
			feedCallbackHeader : 'mxmheader',			

			loadMaster: function(){
				var Maquetado="";
				$.ajax({
					url: wdgMxmLive.urlfeed,
					type: 'GET',
					dataType: 'jsonp',
					jsonpCallback : wdgMxmLive.feedCallback,
					cache:false
				})
				.done(function(data) {
					//console.log(data.action);
					var guuid = Math.floor((1 + Math.random()) * 0x10000).toString(16);


					for (var i = 0; i < data.action.length; i++) {
						
						var tituloTw = '';

						if(data.action[i].titulo.indexOf('@')!==-1){
							var twp = data.action[i].titulo.split("@");
							tituloTw = '<p class="textcolor-title2">'+twp[0]+'<span class="textcolor-title4">@'+twp[1]+'</span></p>';
						}else{
							tituloTw = data.action[i].titulo.replace(/'/g,"&#39;");
						};


						Maquetado += '<li data-guid="'+guuid+'">';
						Maquetado += '<div class="time_icon">';						
						Maquetado += (data.action[i].titulo.indexOf('@') !== -1) ?'<div class="icon-time twitter"><i class="tvsa-twitter"></i></div>' : '<div class="textcolor-title2 time">'+data.action[i].minute+'</div>';
						Maquetado += '</div>';
						Maquetado += '<div class="chronic">'+tituloTw;						
						Maquetado += '<div class="chronic_description">'+data.action[i].description.replace(/'/g,"&#39;")+'</div>';						
						Maquetado += (data.action[i].URL!=="") ? '<div class="wdg_mxm_live_02_verMas"><a class="textcolor-title1 ui-link" href="'+data.action[i].URL+'">Ver Más</a></div>' : '';
						Maquetado += '</div>';
						Maquetado +='<div class="icon-interactive textcolor-title4">';						
						if(parseInt(data.action[i].videoId)!==0){
							Maquetado +='<i class="tvsa-videocamera"></i>'	
						}
						Maquetado += '</div>';
						if(data.action[i].imagePath!==""){
						Maquetado += '<div class="icon-interactive2 textcolor-title4"><i class="tvsa-camera"></i></div>';
							Maquetado += '<div class="img_stage_01 not_here">';
							Maquetado += '<div class="img_stage_01_image">';
							Maquetado += '<img src="'+data.action[i].imagePath+'" alt="'+data.action[i].imagenTitulo+'">';
							Maquetado += '</div>';
							Maquetado += (data.action[i].imagenTitulo!=="" || data.action[i].imagenDesc!=="") ? '<a class="img_stage_01_whtbkg" href="">' : '';
							Maquetado += (data.action[i].imagenTitulo!=="") ? '<p class="img_stage_01_black">'+data.action[i].imagenTitulo+'</p> ' : '';
							Maquetado += (data.action[i].imagenDesc!=="") ? '<p class="img_stage_01_gray">'+data.action[i].imagenDesc+'</p>' : '';
							Maquetado +=  (data.action[i].imagenTitulo!=="" || data.action[i].imagenDesc!=="") ? '</a> ' : '';
							Maquetado += '</div>';
						}
						if(parseInt(data.action[i].videoId)!==0){
							Maquetado += '<div class="vid_player_01 not_here mantener">';
							Maquetado += '<div class="vid_player_01_image">';
							Maquetado += '<iframe width="100%" height="100%" src="" data-id="'+data.action[i].videoId+'" ></iframe>';
							Maquetado += '<div class="vid_player_01_image_player">';
							Maquetado += '<div class="theaterSideSpacer"></div>';
							Maquetado += '<div class="vid_player_01_ip">';
							Maquetado += '<div class="ip_1"></div>';
							Maquetado += '<div class="ip_2"></div>';
							Maquetado += '</div>';
							Maquetado += '<div class="theaterSideSpacer"></div>';
							Maquetado += '</div>';
							Maquetado += '<div class="vid_player_01_image_player_none"></div>';
							Maquetado += '</div>';
							//Maquetado += '<a href="javascript: void(0);" class="ui-link"><i class="tvsa-play" id="videobtn"></i> </a>';
							Maquetado += (data.action[i].videoTitulo !== '') ? '<div class="vid_player_01_whtbkg"><p class="vid_player_01_black">'+data.action[i].videoTitulo+'</p></div>' : '';
							Maquetado += '</div>';
						}

						Maquetado += '</li>';



					};

					GlobalThis.css({'display':'none'}).html(Maquetado).fadeIn('slow');
					wdgMxmLive.inicio();
					wdgMxmLive.header();
					// SI TENGO ACCESO A LA FECHA Y HORA AQUI INICIALIZO
					//wdgMxmLive.timeUpdate();
				})
				.fail(function() {
					console.log("Error al cargar"+wdgMxmLive.urlfeed);
				})
				
				



			},// END loadMaster

			inicio : function(){

				$('.wdg_mxm_live_02 .tvsa-camera').live('click',function(event){
					event.preventDefault();
					var parentContainer = $(this).parent().siblings('.img_stage_01');
					if(!$(this).hasClass('active')){
					$('.tvsa-camera').removeClass('active textcolor-title1 tvsa-error');
					$(this).addClass('active textcolor-title1 tvsa-error');
			    	$('.img_stage_01').slideUp('slow');
			    	parentContainer.slideDown('slow', function() { });
			    }else{
			    	$(this).removeClass('active textcolor-title1 tvsa-error');
			    	parentContainer.slideUp('slow');
			    }


				});
			    
			    $('.wdg_mxm_live_02 .tvsa-videocamera').live('click',function(event){ 
			    	event.preventDefault();
			    	var parentContainer = $(this).parent().siblings('.vid_player_01.not_here.mantener');
			    	var iframeChild,heightac;
			    	if(!$(this).hasClass('active')){
			    	$('.tvsa-videocamera').removeClass('active textcolor-title1 tvsa-error');
			    	$(this).addClass('active textcolor-title1 tvsa-error');
			    	$('.vid_player_01.not_here.mantener').slideUp('slow').find('iframe').attr({'src': ''});
			    		parentContainer.slideDown('slow', function() {
			    			heightac = parseInt($(this).outerWidth()*9/16);
			    			$(this).height(heightac);
			    			$(this).find('.vid_player_01_image').height(heightac);
				  			iframeChild = $(this).find('iframe');
			    			iframeChild.attr({'src': 'http://tv.televisadeportes.esmas.com/embed/embed_ampp.php?id='+iframeChild.data('id')+ '&w='+$(this).outerWidth()+'&h='+heightac+'' });
			    		});


			    	}else{    		
			    		$(this).removeClass('active textcolor-title1 tvsa-error');
			    		parentContainer.slideUp('slow', function() {
			    			iframeChild = $(this).find('iframe');
			    			iframeChild.attr({'src': '' });
			    		});
			    	}
					
				}); 


			}, //inicio

			header: function(){
				$.ajax({
					url: wdgMxmLive.urlfeedHeader,
					jsonpCallback: wdgMxmLive.feedCallbackHeader,
					type: 'GET',
					dataType: 'jsonp'
				})
				.done(function(data) {					
					wdgMxmLive.timeUpdate(data.fechaPartido,data.horaPartido);
				})
				.fail(function() {
					console.log("Error al cargar el header "+ wdgMxmLive.urlfeedHeader);
				})
				
				




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
													
													(minutosrestantes<60) ? tiempoActualizacion = 900000 : '';											
												}
											}
											//cop
											console.log(tiempoActualizacion)
											//setInterval(function(){wdgMxmLive.updateInfo()},tiempoActualizacion);
											setInterval(function(){wdgMxmLive.updateInfo()},10000);
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

			updateInfo : function(){
				$.ajax({
					url: wdgMxmLive.urlfeed,
					type: 'GET',
					dataType: 'jsonp',
					jsonpCallback : wdgMxmLive.feedCallback,
					cache:false
				})
				.done(function(data) {
					var guuid = Math.floor((1 + Math.random()) * 0x10000).toString(16);
					var Maquetado = '';
					var TotalItemNow = GlobalThis.children('li').size();
					var TotalItemNew = data.action.length;
					console.log(TotalItemNew+"<-->"+TotalItemNow);
					if (TotalItemNew>TotalItemNow) {
						//console.log("ACTUALIZO por que hay nuevos Items");
						var ItemsNuevos = TotalItemNew-TotalItemNow;

						for (var i = 0; i < ItemsNuevos; i++) {
							//data.actions[i]
							var tituloTw = '';

						if(data.action[i].titulo.indexOf('@')!==-1){
							var twp = data.action[i].titulo.split("@");
							tituloTw = '<p class="textcolor-title2">'+twp[0]+'<span class="textcolor-title4">@'+twp[1]+'</span></p>';
						}else{
							tituloTw = data.action[i].titulo.replace(/'/g,"&#39;");
						};


						Maquetado += '<li data-guid="'+guuid+'" style="display:none;">';
						Maquetado += '<div class="time_icon">';						
						Maquetado += (data.action[i].titulo.indexOf('@') !== -1) ?'<div class="icon-time twitter"><i class="tvsa-twitter"></i></div>' : '<div class="textcolor-title2 time">'+data.action[i].minute+'</div>';
						Maquetado += '</div>';
						Maquetado += '<div class="chronic">'+tituloTw;						
						Maquetado += '<div class="chronic_description">'+data.action[i].description.replace(/'/g,"&#39;")+'</div>';						
						Maquetado += (data.action[i].URL!=="") ? '<div class="wdg_mxm_live_02_verMas"><a class="textcolor-title1 ui-link" href="'+data.action[i].URL+'">Ver Más</a></div>' : '';
						Maquetado += '</div>';
						Maquetado +='<div class="icon-interactive textcolor-title4">';						
						if(parseInt(data.action[i].videoId)!==0){
							Maquetado +='<i class="tvsa-videocamera"></i>'	
						}
						Maquetado += '</div>';
						if(data.action[i].imagePath!==""){
						Maquetado += '<div class="icon-interactive2 textcolor-title4"><i class="tvsa-camera"></i></div>';
							Maquetado += '<div class="img_stage_01 not_here">';
							Maquetado += '<div class="img_stage_01_image">';
							Maquetado += '<img src="'+data.action[i].imagePath+'" alt="'+data.action[i].imagenTitulo+'">';
							Maquetado += '</div>';
							Maquetado += (data.action[i].imagenTitulo!=="" || data.action[i].imagenDesc!=="") ? '<a class="img_stage_01_whtbkg" href="">' : '';
							Maquetado += (data.action[i].imagenTitulo!=="") ? '<p class="img_stage_01_black">'+data.action[i].imagenTitulo+'</p> ' : '';
							Maquetado += (data.action[i].imagenDesc!=="") ? '<p class="img_stage_01_gray">'+data.action[i].imagenDesc+'</p>' : '';
							Maquetado +=  (data.action[i].imagenTitulo!=="" || data.action[i].imagenDesc!=="") ? '</a> ' : '';
							Maquetado += '</div>';
						}
						if(parseInt(data.action[i].videoId)!==0){
							Maquetado += '<div class="vid_player_01 not_here mantener">';
							Maquetado += '<div class="vid_player_01_image">';
							Maquetado += '<iframe width="100%" height="100%" src="" data-id="'+data.action[i].videoId+'" ></iframe>';
							Maquetado += '<div class="vid_player_01_image_player">';
							Maquetado += '<div class="theaterSideSpacer"></div>';
							Maquetado += '<div class="vid_player_01_ip">';
							Maquetado += '<div class="ip_1"></div>';
							Maquetado += '<div class="ip_2"></div>';
							Maquetado += '</div>';
							Maquetado += '<div class="theaterSideSpacer"></div>';
							Maquetado += '</div>';
							Maquetado += '<div class="vid_player_01_image_player_none"></div>';
							Maquetado += '</div>';
							//Maquetado += '<a href="javascript: void(0);" class="ui-link"><i class="tvsa-play" id="videobtn"></i> </a>';
							Maquetado += (data.action[i].videoTitulo !== '') ? '<div class="vid_player_01_whtbkg"><p class="vid_player_01_black">'+data.action[i].videoTitulo+'</p></div>' : '';
							Maquetado += '</div>';
						}

						Maquetado += '</li>';
						};

						GlobalThis.prepend(Maquetado);

						$("[data-guid="+guuid+"]").slideDown('slow');



					}else{
						console.log("NO ACTUALIZO por que hay NO nuevos Items");
					}
					
				})
				.fail(function() {
					console.log("error al actualizar"+wdgMxmLive.urlfeed);
				})
				
				

			}



		}; // END wdgMxmLive



		(setting.idmxm!==0 && setting.idmxmtv!==0)? wdgMxmLive.loadMaster() : '';

	}
})(jQuery);