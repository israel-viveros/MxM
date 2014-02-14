;(function(){
	$.fn.wdgLiveMxM = function(options){
		var setting = $.extend({
			'idevento': 0,
			'actualizacion' : 0
		}, options);


		var GlobalThis = this;

		var wdgMxmLive = {
			urlfeed : 'http://lab.israelviveros.com/deportes/wdg_mxm_live_02/155/'+setting.idevento+'/mxm.jsonp',
			feedCallback: 'mxmSorteo',
			timeupdate : (setting.actualizacion!==0) ? parseInt(setting.actualizacion) : 60000,
			

			parentMaquetado : function(){

			
			
				var maquetadoP = "";				
				maquetadoP += '<div class="scroll">';
				maquetadoP += '<div class="wdg_mxm_live_02_status">';
				maquetadoP += '<div class="windows8" id="loadingMxmLive">';
				maquetadoP += '<div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div>';
				maquetadoP += '<div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div>';
				maquetadoP += '<div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div>';
				maquetadoP += '<div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div>';
				maquetadoP += '<div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div>';
				maquetadoP += '</div>';
				maquetadoP += '<ul class="wdg_mxm_live_02_list" id="pintaCont">';
				maquetadoP += '</ul>';
				maquetadoP += '</div>';
				maquetadoP += '</div>';
				GlobalThis.html(maquetadoP);

			},

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

						//<div class="textcolor-title6 time">92\'</div><div class="icon-time"> <i class="tvsa-mxm-gameend"></i> </div>
						Maquetado += '<div class="time_icon">';

					
							if(data.action[i].titulo.indexOf('@') !== -1) {	
							Maquetado += '<div class="icon-time twitter"><i class="tvsa-twitter"></i></div>';
							}else{
								Maquetado += '<div class="textcolor-title2 time">'+data.action[i].minute+'</div>';
							}
						


						


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
					$("#loadingMxmLive").hide('slow');
					GlobalThis.find("#pintaCont").css({'display':'none'}).html(Maquetado).fadeIn('slow');
					wdgMxmLive.inicio();
					
					
				})
				.fail(function() {
					console.log("Error al cargar"+wdgMxmLive.urlfeed);
				})
				
				



			},// END loadMaster

			inicio : function(){

				GlobalThis.find('.tvsa-camera').live('click',function(event){
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
			    
			    GlobalThis.find('.tvsa-videocamera').live('click',function(event){ 
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
				
				
				setInterval(function() { wdgMxmLive.updateInfo() }, wdgMxmLive.timeupdate);


			}, //inicio


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
					var TotalItemNow = GlobalThis.find("#pintaCont").children('li').size();
					var TotalItemNew = data.action.length;
					//console.log(TotalItemNew+"<-->"+TotalItemNow);
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

						GlobalThis.find("#pintaCont").prepend(Maquetado);

						$("[data-guid="+guuid+"]").slideDown('slow');



					}else{
						//console.log("NO ACTUALIZO por que hay NO nuevos Items");
					}
					
				})
				.fail(function() {
					console.log("error al actualizar"+wdgMxmLive.urlfeed);
				})
				
				

			}



		}; // END wdgMxmLive



		if(setting.idevento!==0){
			$.when(wdgMxmLive.parentMaquetado()).done(function() {
				wdgMxmLive.loadMaster()
			});
		}
		

	}
})(jQuery);