;(function(){
	$.fn.wdgLiveMxM = function(options){
		var setting = $.extend({
			'idmxm': 0,
			'idmxmtv': 0
		}, options);


			var IdEventoMxmV = setting.idmxm;
			var IdEventoTVMxMV = setting.idmxmtv;
			var urlFinalHeader = (IdEventoMxmV!=0 && IdEventoTVMxMV!=0)? 'http://lab.israelviveros.com/deportes/wdg_mxm_live_02/'+IdEventoMxmV+'/'+IdEventoTVMxMV+'/mxm_header.js' : console.log("Falta Id de torno y partido");
			var urlFinalMxm = (IdEventoMxmV!=0 && IdEventoTVMxMV!=0)? 'http://lab.israelviveros.com/deportes/wdg_mxm_live_02/'+IdEventoMxmV+'/'+IdEventoTVMxMV+'/mxm.jsonp' : console.log("Falta Id de torno y partido");

			$(document).ready(function(){
				var activo_img = 0;
				var activo_vid = 0;	



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
					
				/*AutomatizaciÃ³n de json*/
				var url='';
				var longitudini=0,longitud2=0,longitudfin=0,gral=1;
				var minuto=0, icono="",tipo="",comentario="",titulo="",imagen="",video="",titulo_ant="", comentario_ant="";
				var tiempo_ac=1000;
				var tc=0;
				var ban=0;
				var w=0,h=0,bandera=0;		
				var fechatv=0, timetv=0, horainicio=0;
				var acciones={};
				var ban_titulo_ant=0,ban_comentario_ant=0;
				
				
				if (parseInt($(window).width())>=400)
				{
					w=624;
					h=351;
				}
				else
				{
					w=250;
					h=200;
				}
				//Funcion acciones mxm
				var mxm = function() {
					return $.ajax({			
						type: 'GET',
						url: urlFinalMxm,
						async: false,
						jsonpCallback: 'mxmSorteo',
						contentType: "application/json",
						dataType: 'jsonp'
			    	});		
				}
				var obtenerFecha = function() {
					return $.ajax({	
						type:'GET',		
						url: 'http://mxm.televisadeportes.esmas.com/deportes/home/timetvjsonp.js',			
						async: false,
						jsonpCallback:"timetv",
						contentType:"application/json; charset=utf-8",
						dataType: 'jsonp'
			    	});		
				}
					
				
				
				function recargamxmcompleto()
				{
					console.log("ejecutando recargamxmcompleto");
					$.when(mxm()).done(function(request){	
					//$(".wdg_mxm_live_02_list").html("");	
					$(".wdg_mxm_live_02_list").empty();
					longitudini=0;
					longitudini=0;
					//if (longitudini==0)
						//{
							if (request.action!=null)
							{
								longitudini=request.action.length;
								longitudfin=parseInt(longitudini)-1;
							}
						//}
					
					while (parseInt(longitudfin) >= 0)
						{
							var contenido='';
							imagen='',tituloimg='',descimg='';
							video='',titulovideo='',descimg='';
							icono="";
							minuto=request.action[parseInt(longitudfin)].minute;
							titulo=request.action[parseInt(longitudfin)].titulo;				
							url=request.action[parseInt(longitudfin)].URL;
							comentario=request.action[parseInt(longitudfin)].description;	
							titulo_ant=titulo;
							comentario_ant=comentario;		
							
							if(typeof(request.action[parseInt(longitudfin)].tipo)!='undefined'){
								tipo=request.action[parseInt(longitudfin)].tipo;
							}else{
								var tweet = titulo.split("@");
								if(tweet.length==1){
									tipo='comentario';
								}else{
									tipo='';
								}
							}
							
							if (request.action[parseInt(longitudfin)].icon!="")
							{
								icono=request.action[parseInt(longitudfin)].icon;
							}
							
							if (request.action[parseInt(longitudfin)].imagePath!="")
							{
								imagen=request.action[parseInt(longitudfin)].imagePath;
							}
							
							if (request.action[parseInt(longitudfin)].videoId!=""&&request.action[parseInt(longitudfin)].videoId!="0" && request.action[parseInt(longitudfin)].videoId!=null)
							{
								video=request.action[parseInt(longitudfin)].videoId;
							}
							
							if(tipo == 'comentario')
							{
							contenido='<li><div class="time_icon"><div class="textcolor-title2 time">'+minuto+'</div><div class="icon-time"></div></div><div class="chronic">';
							
							
							contenido+=titulo+'</span><div class="chronic_description">'+comentario+'</div><div class="wdg_mxm_live_02_verMas">';
							if (url!="")
							{
								contenido+='<a class="textcolor-title1" href="'+url+'">Ver M&aacute;s</a>';
							}
							contenido+='</div></div>';
							
							if ((imagen!="" && imagen!=null) || (video!="" && video!=null) )
							{
								if (imagen!="" && (video=="" || video!=null))
								{
									tituloimg=request.action[parseInt(longitudfin)].imagenTitulo;
									descimg=request.action[parseInt(longitudfin)].imagenDesc;
									
									//contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-camera"></i></div><div class="img_stage_01"><div class="img_stage_01_image"><img src="'+imagen+'" alt="Image description"><span class="img_stage_01_sprite video-corner"></span></div><a class="img_stage_01_whtbkg" href="#"><p class="img_stage_01_black">'+tituloimg+'</p><p class="img_stage_01_gray">'+descimg+'</p></a></div>';
									contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-camera"></i></div><div class="img_stage_01"><div class="img_stage_01_image"><img src="'+imagen+'" alt="Image description"><span class="img_stage_01_sprite"></span></div>';
									
									if (tituloimg!="" || descimg!="")
									{
										contenido+='<a class="img_stage_01_whtbkg" href="#">';							
										if (tituloimg!="")
										{
											
											contenido+='<p class="img_stage_01_black">'+tituloimg+'</p>';							
										}
										
										if (descimg!="")
										{
											
											contenido+='<p class="img_stage_01_gray">'+descimg+'</p></a></div>';							
										}
										
											contenido+='</a></div>';
										
									}
								}
								if (video!="" && video!=null && imagen == "")
								{
									titulovideo=request.action[parseInt(longitudfin)].videoTitulo;
									descvideo=request.action[parseInt(longitudfin)].videoDesc;
									contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-videocamera"></i></div><div class="vid_player_01 not_here mantener"><div class="vid_player_01_image"><iframe style="width:100%;height:100%" data-id="'+video+'" class="img_stage_01_IMG"></iframe><div class="theaterContainer"><div class="theaterSideSpacer leftBarLink"></div><div class="izq_vid"><div class="videoLink"></div><div class="contenedor"></div></div><div class="rightBarLink theaterSideSpacer"></div></div><div class="companionBanner"></div></div></div>';
									//<a href="http://tv.televisadeportes.esmas.com/embed/embed_ampp.php?id='+video+'" target="reproductor" class="btn_vid square"><i class="tvsa-play videobtn"></i></a><div class="vid_player_01_whtbkg"><p class="vid_player_01_black">'+titulovideo+'</p></div>
								}
								if (video!="" && video!=null && imagen != "")
								{
									tituloimg=request.action[parseInt(longitudfin)].imagenTitulo;
									descimg=request.action[parseInt(longitudfin)].imagenDesc;
									titulovideo=request.action[parseInt(longitudfin)].videoTitulo;
									descvideo=request.action[parseInt(longitudfin)].videoDesc;
									contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-videocamera"></i></div><div class="icon-interactive2 textcolor-title4"><i class="tvsa-camera"></i></div><div class="img_stage_01"><div class="img_stage_01_image"><img src="'+imagen+'" alt="Image description"><span class="img_stage_01_sprite"></span></div><a class="img_stage_01_whtbkg" href="#"><p class="img_stage_01_black">'+tituloimg+'</p><p class="img_stage_01_gray">'+descimg+'</p></a></div><div class="vid_player_01 not_here mantener"><div class="vid_player_01_image"><iframe style="width:100%;height:100%" data-id="'+video+'" class="img_stage_01_IMG"></iframe><div class="theaterContainer"><div class="theaterSideSpacer leftBarLink"></div><div class="izq_vid"><div class="videoLink"></div><div class="contenedor"></div></div><div class="rightBarLink theaterSideSpacer"></div></div><div class="companionBanner"></div></div></div>';
									//antes de cerrar el ultimo div <a href="#" class="btn_vid square"> <i class="tvsa-play videobtn"></i></a><div class="vid_player_01_whtbkg"><p class="vid_player_01_black">'+titulovideo+'</p></div>
								}
								contenido+='</div>';					
							}//END comen con video y/o image.
						}else{
								div_tit = titulo.split("@");
								titulo= '@'+div_tit[1];
								tit_opc= div_tit[0];
								contenido='<li><div class="time_icon"><div class="icon-time twitter"><i class="tvsa-twitter"></i></div></div><div class="chronic"><p class="textcolor-title2">'+tit_opc+'<span class="textcolor-title4">'+titulo+'</span></p><div class="chronic_description">'+comentario+'</div></div>';
							}
							
							contenido+='</li>';
							if ($(".div_minutoxminuto_vacio").css('display')!='none')
							{					
								$(".div_minutoxminuto_vacio").css('display','none');
								$(".wdg_mxm_live_02").css('display','block');					
								$(".wdg_mxm_live_02 .azul").css('display','block');					
							}
							$(".wdg_mxm_live_02_list").prepend(contenido);		
							gral++;
							longitudfin--;
						}
					});
				}
				var recargamxm= function() {
					var tipo ="";
					$.when(mxm()).done(function(request){
					
						if (longitudini===0)
						{
							if (request.action!==null)
							{
								longitudini=request.action.length;
								longitudfin=parseInt(longitudini)-1;
							}
						}
						else
						{	
							if (request.action.length!=longitudini)
							{							
								longitud2=request.action.length;
								longitudfin=parseInt(longitud2)-parseInt(longitudini)-1;
								longitudini=request.action.length;
							}
							
				

						//console.log("longitudfin: "+longitudfin);						
						//comentario=request.action[parseInt(longitudfin)].description;
						if (longitudfin>=0)
						{
						//console.log("titulo: "+request.action[parseInt(longitudfin)].titulo);
						//console.log("titulo_ant: "+titulo_ant);
							
							//console.log("comparo: "+titulo+" ** "+titulo_ant);
						if (request.action[parseInt(longitudfin)].titulo===titulo_ant)
						{
							ban_titulo_ant=1;				
						}
						else
						{
							titulo_ant=titulo;
							ban_titulo_ant=0;
						}
						//console.log("comparo: "+comentario_ant+ " ** "+request.action[parseInt(longitudfin)].description);
						if (comentario_ant===request.action[parseInt(longitudfin)].description)
						{
							ban_comentario_ant=1;
						}
						else
						{
							comentario_ant=comentario;
							ban_comentario_ant=0;
						}
						if (ban_titulo_ant===1 && ban_comentario_ant===1)
						{
							/*if (request.action!=null)
							{
								longitudini=request.action.length;
								longitudfin=parseInt(longitudini)-1;
							}*/
							
							//empieza agregue while

							
							recargamxmcompleto();
							//break;
							//termina agregue while				
							
							
						}
						
						}
									
							
						}
						
						/*if (longitudfin>=0)
						{
						titulo=request.action[parseInt(longitudfin)].titulo;	
						//console.log("longitudfin: "+longitudfin);						
						comentario=request.action[parseInt(longitudfin)].description;
						console.log("titulo: "+request.action[parseInt(longitudfin)].titulo);
						console.log("titulo_ant: "+titulo_ant);
							
						if (titulo==titulo_ant)
						{
							ban_titulo_ant=1;
						}
						else
						{
							titulo_ant=titulo;
						}
						if (comentario_ant==comentario)
						{
							ban_comentario_ant=1;
						}
						else
						{
							comentario_ant=comentario;
						}
						if (ban_titulo_ant==1 || ban_comentario_ant==1)
						{
							/*if (request.action!=null)
							{
								longitudini=request.action.length;
								longitudfin=parseInt(longitudini)-1;
							}*/
							
							//empieza agregue while
							
							/*recargamxmcompleto();
							//termina agregue while				
							
							}
						}
						
						else
						{*/
						var classTemp = "";
						classTemp= Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
						while (parseInt(longitudfin) >= 0)
						{
							var contenido='';
							imagen='',tituloimg='',descimg='';
							video='',titulovideo='',descimg='';
							icono="";
							minuto=request.action[parseInt(longitudfin)].minute;
							titulo=request.action[parseInt(longitudfin)].titulo;				
							url=request.action[parseInt(longitudfin)].URL;
							comentario=request.action[parseInt(longitudfin)].description;
							titulo_ant=titulo;
							comentario_ant=comentario;
								
								
							
							
							if(typeof(request.action[parseInt(longitudfin)].tipo)!='undefined'){
								tipo=request.action[parseInt(longitudfin)].tipo;
							}else{
								var tweet = titulo.split("@");
								if(tweet.length==1){
									tipo='comentario';
								}else{
									tipo='';
								}
							}
							
							if (request.action[parseInt(longitudfin)].icon!="")
							{
								icono=request.action[parseInt(longitudfin)].icon;
							}
							
							if (request.action[parseInt(longitudfin)].imagePath!="")
							{
								imagen=request.action[parseInt(longitudfin)].imagePath;
							}
							
							if (request.action[parseInt(longitudfin)].videoId!=""&&request.action[parseInt(longitudfin)].videoId!="0" && request.action[parseInt(longitudfin)].videoId!=null)
							{
								video=request.action[parseInt(longitudfin)].videoId;
							}
							
							if(tipo == 'comentario')
							{
							contenido='<li class="'+classTemp+'" style="display:none"><div class="time_icon"><div class="textcolor-title2 time">'+minuto+'</div><div class="icon-time"></div></div><div class="chronic">';
							
							
							contenido+=titulo+'<div class="chronic_description">'+comentario+'</div><div class="wdg_mxm_live_02_verMas">';
							if (url!="")
							{
								contenido+='<a class="textcolor-title1" href="'+url+'" target="_blank">Ver M&aacute;s</a>';
							}
							contenido+='</div></div>';
							
							if ((imagen!="" && imagen!=null) || (video!="" && video!=null) )
							{
								if (imagen!="" && (video=="" || video!=null))
								{
									tituloimg=request.action[parseInt(longitudfin)].imagenTitulo;
									descimg=request.action[parseInt(longitudfin)].imagenDesc;
									
									//contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-camera"></i></div><div class="img_stage_01"><div class="img_stage_01_image"><img src="'+imagen+'" alt="Image description"><span class="img_stage_01_sprite video-corner"></span></div><a class="img_stage_01_whtbkg" href="#"><p class="img_stage_01_black">'+tituloimg+'</p><p class="img_stage_01_gray">'+descimg+'</p></a></div>';
									contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-camera"></i></div><div class="img_stage_01"><div class="img_stage_01_image"><img src="'+imagen+'" alt="Image description"><span class="img_stage_01_sprite"></span></div>';
									
									if (tituloimg!="" || descimg!="")
									{
										contenido+='<a class="img_stage_01_whtbkg" href="#">';							
										if (tituloimg!="")
										{
											
											contenido+='<p class="img_stage_01_black">'+tituloimg+'</p>';							
										}
										
										if (descimg!="")
										{
											
											contenido+='<p class="img_stage_01_gray">'+descimg+'</p></a></div>';							
										}
										
											contenido+='</a></div>';
										
									}
								}
								if (video!="" && video!=null && imagen == "")
								{
									titulovideo=request.action[parseInt(longitudfin)].videoTitulo;
									descvideo=request.action[parseInt(longitudfin)].videoDesc;
									contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-videocamera"></i></div><div class="vid_player_01 not_here mantener"><div class="vid_player_01_image"><iframe style="width:100%;height:100%" data-id="'+video+'" class="img_stage_01_IMG"></iframe><div class="theaterContainer"><div class="theaterSideSpacer leftBarLink"></div><div class="izq_vid"><div class="videoLink"></div><div class="contenedor"></div></div><div class="rightBarLink theaterSideSpacer"></div></div><div class="companionBanner"></div></div></div>';
									//<a href="http://tv.televisadeportes.esmas.com/embed/embed_ampp.php?id='+video+'" target="reproductor" class="btn_vid square"><i class="tvsa-play videobtn"></i></a><div class="vid_player_01_whtbkg"><p class="vid_player_01_black">'+titulovideo+'</p></div>
								}
								if (video!="" && video!=null && imagen != "")
								{
									/*tituloimg=request.action[parseInt(longitudfin)].imagenTitulo;
									descimg=request.action[parseInt(longitudfin)].imagenDesc;
									titulovideo=request.action[parseInt(longitudfin)].videoTitulo;
									descvideo=request.action[parseInt(longitudfin)].videoDesc;
									contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-videocamera"></i></div><div class="icon-interactive2 textcolor-title4"><i class="tvsa-camera"></i></div><div class="img_stage_01"><div class="img_stage_01_image"><img src="'+imagen+'" alt="Image description"><span class="img_stage_01_sprite video-corner"></span></div><a class="img_stage_01_whtbkg" href="#"><p class="img_stage_01_black">'+tituloimg+'</p><p class="img_stage_01_gray">'+descimg+'</p></a></div><div class="vid_player_01 not_here mantener"><div class="vid_player_01_image"><iframe data-id="'+video+'" class="img_stage_01_IMG"></iframe><div class="theaterContainer"><div class="theaterSideSpacer leftBarLink"></div><div class="izq_vid"><div class="videoLink"></div><div class="contenedor"></div></div><div class="rightBarLink theaterSideSpacer"></div></div><div class="companionBanner"></div></div></div>';
									//antes de cerrar el ultimo div <a href="#" class="btn_vid square"> <i class="tvsa-play videobtn"></i></a><div class="vid_player_01_whtbkg"><p class="vid_player_01_black">'+titulovideo+'</p></div>*/
									tituloimg=request.action[parseInt(longitudfin)].imagenTitulo;
									descimg=request.action[parseInt(longitudfin)].imagenDesc;
									titulovideo=request.action[parseInt(longitudfin)].videoTitulo;
									descvideo=request.action[parseInt(longitudfin)].videoDesc;
									contenido+='<div class="icon-interactive textcolor-title4"><i class="tvsa-videocamera"></i><div class="linea_p"></div></div><div class="vid_player_01 not_here mantener"><div class="vid_player_01_image"><iframe style="width:100%;height:100%" data-id="'+video+'" class="img_stage_01_IMG"></iframe><div class="theaterContainer"><div class="theaterSideSpacer leftBarLink"></div><div class="izq_vid"><div class="videoLink"></div><div class="contenedor"></div></div><div class="rightBarLink theaterSideSpacer"></div></div><div class="companionBanner"></div></div></div>';
									//antes de cerrar el ultimo div <a href="#" class="btn_vid square"> <i class="tvsa-play videobtn"></i></a><div class="vid_player_01_whtbkg"><p class="vid_player_01_black">'+titulovideo+'</p></div>
								}
								contenido+='</div>';					
							}//END comen con video y/o image.
						}else{
								div_tit = titulo.split("@");
								titulo= '@'+div_tit[1];
								tit_opc= div_tit[0];
								
								contenido='<li class="'+classTemp+'" style="display:none"><div class="time_icon"><div class="icon-time twitter"><i class="tvsa-twitter"></i></div></div><div class="chronic"><p class="textcolor-title2">'+tit_opc+'<span class="textcolor-title4">'+titulo+'</span></p><div class="chronic_description">'+comentario+'</div></div>';
							}
							
							contenido+='</li>';
							if ($(".div_minutoxminuto_vacio").css('display')!='none')
							{					
								$(".div_minutoxminuto_vacio").css('display','none');
								$(".wdg_mxm_live_02").css('display','block');					
								$(".wdg_mxm_live_02 .azul").css('display','block');					
							}
							$(".wdg_mxm_live_02_list").prepend(contenido);
							
								
							
							gral++;
							longitudfin--;
						}
						//}//fin del else de banderas titulo y comentario
						$("."+classTemp+"").fadeIn('slow');
						
					});

								

					$(window).resize(function() {		
						var pantalla=$(window).width();
						if (parseInt($(window).width())>=400)
						{
							w=900;
							h=400;
						}
						else
						{
							w=250;
							h=200;
						}		
					});
					//mostrar imagen
					setImg = function(divBox,imgUrl) {
						if ($(divBox).html() == ''){
							$(divBox).html('<img src="' + imgUrl + '" alt=""/>');
						}else{
							$(divBox).html('');
						}
						
						if ($('.unom').css('display')=='block')
						{
							//$('.lightbox').show();				
							$('.unom').css('display', 'none');
							$('.dosm').css('display', 'block');
						}
						else
						{
							//$('.lightbox').hide();				
							$('.unom').css('display', 'block');
							$('.dosm').css('display', 'none');
						}
					}
					//mostrar video
					setVid = function(id,idVid) { 
						if (ban==0)
						{	
							var a=$('.vide').css('height');
							
							if ($('.vide').css('height')>='450px')
							{			
								$('#vid'+id).attr('data', 'http://www.tvolucion.com/embed/embed_ampp.php?id=' + idVid+ '&w='+w+'&h='+h+'');
							}
							else
							{			
								$('#vid'+id).attr('data', 'http://www.tvolucion.com/embed/embed_ampp.php?id=' + idVid+ '&w='+w+'&h='+h+'');
							}
							//$('.lightbox').show();
							$('#con_video').show();
							$('#con_video'+id).css('display', 'block');
							$('#vid'+id).css('display', 'block');
							$('.unov').css('display', 'none');
							$('.dosv').css('display', 'block');
							ban=1;
						}
						else
						{
							//$('.lightbox').hide();
							$('#con_video').hide();
							$('#con_video'+id).css('display', 'none');
							$('#vid'+id).css('display', 'none');
							$('.unov').css('display', 'block');
							$('.dosv').css('display', 'none');
							ban=0;
						}
					}
					
					//tiempo_ac = 5000;

			// calculo tiempo actualizacion
					$.ajax({
						url: urlFinalHeader,
						type: 'GET',
						dataType: 'jsonp',
						jsonpCallback:'mxmheader',
						cache: false
					})
					.done(function(data) {
						
						if(data.tiempo.toLowerCase() !== "final"){
							var dia = data.fechaPartido;
							var hora = data.horaPartido;


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
												
												var refreshId=setTimeout(recargamxm,tiempoActualizacion); 
											

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


						}
						
						 
					})
					.fail(function() {
						console.log("error al cargar: "+urlFinalHeader);
						
					});





						
				}	
				recargamxm();					

			});



		
		
	} // End wdgLiveMxM
})(jQuery)