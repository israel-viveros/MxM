;var wdg_matchresult = {
	TickerMaster :(typeof TickerMaster === "undefined") ? 0 : TickerMaster,
	TickerTournamen : (typeof TickerTournamen === "undefined") ? 0 : TickerTournamen,
	timeUpdate : 10000,



	LoadMaster : function(idMaster){
		$.ajax({
			url: 'http://lab.israelviveros.com/deportes/wdg_matchesresult_01/pruebas/Ticker_'+TickerMaster+'.js',
			type: 'GET',
			jsonpCallback: 'masterticker',
			dataType: 'jsonp',
			cache:true
		})
		.done(function(data) {
			DrawList="";
			for (var i = 0; i < data.ticker.widgets.widgets.length; i++) {
			(i===0)? $("#FListTournaments").html('<a class="featured onShowItem" data-url="'+data.ticker.widgets.widgets[i].urldata+'" href="#" >'+data.ticker.widgets.widgets[i].title+'</a>')  : DrawList += '<li><a href="#" data-url="'+data.ticker.widgets.widgets[i].urldata+'" ><p>'+data.ticker.widgets.widgets[i].title+'</p></a></li>';
			
				
			};
			$("#ListTournaments").html(DrawList);
			$("#FListTournaments a, #ListTournaments a").bind('click', function(event) {
				event.preventDefault();
				$(".windows8").show('fast');
				wdg_matchresult.LoadFirst($(this).data('url'));
				$("#FListTournaments").parent().find('a').css('color', '#FFF').removeClass('onShowItem');
				$(this).css('color', '#D6A256').addClass('onShowItem');
			});	

			wdg_matchresult.inicio();		
		})
		.fail(function() {
			console.log("error");
		});
		
		
	},
	LoadFirst: function(urlData,tipo){
		//console.log("recibo"+ urlData);

		$.ajax({
			url: urlData,
			type: 'GET',
			dataType: 'jsonp',
			jsonpCallback:'wtdata',
			cache: false			
		})
		.done(function(dataFirst) {
			//console.log(dataFirst);
			wdg_matchresult.DrawContentFirst(dataFirst.matches.match,tipo)
		})
		.fail(function() {
			console.log("Error al cargar: "+urlData);
		})
		
		
	},
	DrawContentFirst: function(contenido,tipo){
		//console.log(contenido);

		if(tipo === "only"){
			$("#FListTournaments").html('<a class="featured onShowItem" data-url="http://interacciontd.televisadeportes.esmas.com/deportes/home/TickerFutbol_'+wdg_matchresult.TickerTournamen+'jsonp.js" href="#" >'+contenido[0].EventTournamentName+'</a>');
			setInterval(function(){wdg_matchresult.updateInfo()}, wdg_matchresult.timeUpdate);
		}

		var ItemView = "";		
		for (var y = 0; y < contenido.length; y++) {
			ItemView += '<li>';
			ItemView += '<div class="wdg_match_01">';
			ItemView += '<div class="wdg_match_01_time background-color1">';
			ItemView += '<p>';
			ItemView += '<a class="textcolor-title5" href="">'+contenido[y].periodabrev+' '+(isNaN(contenido[y].time) ? contenido[y].time+'"' : '')+'</a>';
			ItemView += '</p>';
			ItemView += '</div> ';
			ItemView += '<div class="wdg_match_01_team winner">';
			ItemView += '<div class="wdg_match_01_teamname">';
			ItemView += '<p>                ';
			ItemView += '<a href="">'+contenido[y].equipos.local.name.substring(0,18)+'</a>';
			ItemView += '</p> ';
			ItemView += '</div>';
			ItemView += '<div class="wdg_match_01_teamscore">';
			ItemView += '<p>                ';
			ItemView += '<a href="">'+contenido[y].equipos.visit.goals+'</a>';
			ItemView += '</p>';
			ItemView += '</div>';
			ItemView += '</div>';
			ItemView += '<div class="wdg_match_01_team loser">';
			ItemView += '<div class="wdg_match_01_teamname">';
			ItemView += '<p>                ';
			ItemView += '<a href="">'+contenido[y].equipos.visit.name.substring(0,18)+'</a>';
			ItemView += '</p>';
			ItemView += '</div>';
			ItemView += '<div class="wdg_match_01_teamscore">';
			ItemView += '<p>';
			ItemView += '<a href="">'+contenido[y].equipos.visit.goals+'</a>  ';
			ItemView += '</p>';
			ItemView += '</div>';
			ItemView += '</div>';
			ItemView += '<div class="wdg_match_01_link">';
			ItemView += '<div class="wdg_match_01_extra">';
			ItemView += '<p>';
			ItemView += '<a class="textcolor-title1" href="'+contenido[y].Website+'">'+contenido[y].EventTournamentName.substring(0,15)+'<span class="textcolor-title4">'+contenido[y].txtLink.substring(0,14)+'</span></a>';			
			ItemView += '</p>';
			ItemView += '</div>';
			ItemView += '<div class="wdg_match_01_icon">';			
			ItemView += (contenido[y].MXvideo !="") ? '<a href="'+contenido[y].MXvideo+'"><span class="wdg_match_01_sprite video"></span></a>' : '' ;
			ItemView += '</div>';
			ItemView += '</div>';
			ItemView += '</div>';
			ItemView += '</li>';
		};
		objMasc = $("#listNow");
		
		if(tipo === "update"){			
			objMasc.empty().html(ItemView);	
		}else{
			objMasc.fadeOut('fast', function() { objMasc.empty().html(ItemView) });
			objMasc.fadeIn('slow',function(){
				if ($(window).width()>800) {
					$('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').css('height','575px');
				}
				if ($(window).width()<624) {
					var nuevoWidth =0;
				$('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').css('height','150px');	
				$('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul li').each(function(index, el) {
					nuevoWidth = $(this).outerWidth()+nuevoWidth;
				});
				$('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul').css({'width': nuevoWidth+'px','height':'150px','overflow':'hidden'});
				}
			});
		}
		$(".windows8").hide();
		

		
		


		
		

	},

	inicio : function(){		
		wdg_matchresult.LoadFirst($("#FListTournaments a").eq(0).data("url"));
		setInterval(function(){wdg_matchresult.updateInfo()}, wdg_matchresult.timeUpdate);
	},

	updateInfo: function(){
		$("#FListTournaments").parent().find('a').each(function(index, el) {
			if($(this).hasClass('onShowItem')){
			 wdg_matchresult.LoadFirst($(this).data("url"),"update");
			}
		});
	}
	







};


		(wdg_matchresult.TickerMaster>0) ? wdg_matchresult.LoadMaster(wdg_matchresult.TickerMaster) : '' ;
		(wdg_matchresult.TickerTournamen>0) ? wdg_matchresult.LoadFirst('http://interacciontd.televisadeportes.esmas.com/deportes/home/TickerFutbol_'+wdg_matchresult.TickerTournamen+'jsonp.js','only') : '';
		(typeof TickerMaster === "undefined" && typeof TickerTournamen === "undefined") ? $("#parentWDG_matchresult_01").remove() : '';
