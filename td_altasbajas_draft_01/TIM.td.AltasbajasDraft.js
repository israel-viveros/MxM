;
(function() {
    $.fn.MxMAltasBajasDraft = function(options) {    	    	
    	var setting = $.extend({        	
    		'idTorneo':0,
    		'idEvento':0
        }, options);
    	console.log ('Altas Bajas Draft');
    	   
    	var wdg_playerdraft_01 = {
    		urlData: 'http://mxm.televisadeportes.esmas.com/futbol/draft/liga-mx-apertura-2013/draft.js',    		
    		tagWdgPlayerdraft: $("#containerwdg_playerdraft_01"),
    	
    		viewHtml: function(data){                
                //Generar variables...
                var compras = "";
                var prestamos = "";
                var transf = "";                

                //Asignamos valores...
                compras = data['draftPurchase']; 
                prestamos = data['draftLoan'];
                transf = data['draftTransfers'];
/*
    			console.log(data);
                console.log(data);                              
                console.log('compras');
                console.log(data['draftPurchase']);
                console.log("Prestamo");
                console.log(data['draftLoan']);
                console.log("Transferencias Draft");
                console.log(data['draftTransfers']);
                console.log(data['draftTeams'].length);*/
                
    			maquetado = "<div id='wdg_playerdraft_01' class='wdg_playerdraft_01'>";
    			//Encabezado___
    			maquetado += "<div class='titulo textcolor-title2'><h2>Balance en el Draft</h2></div>";
    			maquetado += "<div class='div1 dotted-right'>Compras <div class='gris'>"+compras+"</div></div>";
    			maquetado += "<div class='div2'>Prestamos";
    			maquetado += "<div class='gris'>"+prestamos+"</div>";
    			maquetado += "</div>";
    			maquetado += "<div class='dotted-top lineasep'></div>";
    			maquetado += "<div class='div3'>Transferencias Draft";
    			maquetado += "<div class='textcolor-title2'>"+transf+"</div>";
    			maquetado += "</div>";
    			maquetado += "<div class='subtitle'>";
    			maquetado += "<div class='textcolor-title4'>Elige a tu jugador y vota</div>";
    			maquetado += "</div>";    			    			
    			maquetado += "<div class='scroll'>";
    			maquetado += "<table class='tblDraft'>";
    			maquetado += "<tbody>";
                //Titulos___
    			maquetado += "<tr>";
    			maquetado += "<th width='131' class='textcolor-title1'>JUGADOR</th>"; 
    			maquetado += "<th width='78' class='textcolor-title1'>ADQUIRI&Oacute;</th>";
    			maquetado += "<th width='68' class='textcolor-title1'>TRANSFIRI&Oacute;</th>";
    			maquetado += "<th width='40' class='textcolor-title1'>OPERACI&Oacute;N</th>";
    			maquetado += "<th width='45' class='textcolor-title1'>TD</th>";
    			maquetado += "<th width='45' class='textcolor-title1'>AFICI&Oacute;N</th>";
    			maquetado += "</tr>";
    			
    			//Contenido___
    			maquetado += "<tr>";
    			maquetado += "<td colspan='6' class='separador' style='position:relative; text-shadow:0px #fff;'></td>";    			
    			maquetado += "</tr>";
    			
                for (var i=0; i<data['draftTeams'].length; i++) {                
                    console.log("Team"+i);                                            
                    for (var n=0; n<data['draftTeams'][i]['operation'].length; n++) {
                        var idPlayer = "";
                        var namePlayer = "";
                        var acquire = "";
                        var transfer = "";
                        var type = "";
                        var rantingTD = "";
                        var ratingUser = "";

                        idPlayer = data['draftTeams'][i]['operation'][n]['id'];
                        namePlayer = data['draftTeams'][i]['operation'][n]['name'];
                        acquire = data['draftTeams'][i]['operation'][n]['acquire'];
                        transfer = data['draftTeams'][i]['operation'][n]['transfer'];
                        type = data['draftTeams'][i]['operation'][n]['type'];
                        rantingTD = data['draftTeams'][i]['operation'][n]['rantingTD'];
                        ratingUser = data['draftTeams'][i]['operation'][n]['ratingUser'];

                        //Datos de Jugador___
                        maquetado += "<tr class='vote_block'>";
                        maquetado += "<td class='dotted-right'><h3>"+namePlayer+"</h3><div style='visibility:hidden;'>"+idPlayer+"</div></td>";                        
                        maquetado += "<td class='dotted-right'>"+acquire+"</td>";
                        maquetado += "<td class='dotted-right'>"+transfer+"</td>";
                        maquetado += "<td class='dotted-right'>"+type+"</td>";
                        maquetado += "<td class='dotted-right'>"+rantingTD+"</td>";
                        maquetado += "<td class='textcolor-title1'>"+ratingUser+"</td>";                        
                        maquetado += "</tr>";
                        
                        //Calificaciones del jugador___
                        maquetado += "<tr>";
                        maquetado += "<td colspan='6' class='separador' style='position:relative; text-shadow: 0px 0px 0px #FFF;'>";
                        maquetado += "<div class='dotted-top'></div>";
                        maquetado += "<div class='qualifies'><div>califica al jugador</div></div>";
                        maquetado += "<div class='calification textcolor-title4'>";
                        maquetado += "<div><a href='#'>5</a></div>";   
                        maquetado += "<div><a href='#'>6</a></div>";
                        maquetado += "<div><a href='#'>7</a></div>";
                        maquetado += "<div><a href='#'>8</a></div>";
                        maquetado += "<div><a href='#'>9</a></div>";
                        maquetado += "<div><a href='#'>10</a></div>";
                        maquetado += "</div>";
                        maquetado += "<div class='participated  textcolor-title4'>";
                        maquetado += "<div class='voted'><p>Gracias por votar <i class='tvsa-like'></i></p></div>";
                        maquetado += "</div>";
                        maquetado += "</td>";
                        maquetado += "</tr>";
                    }    
                }
                

                maquetado += "</tbody>";
                maquetado += "</table>";
                maquetado += "</div>";     			
    			maquetado += "</div>";				
    			
    			wdg_playerdraft_01.tagWdgPlayerdraft.html(maquetado);
    			
    		},
            funcionesNaat: function() { 
                //e.event.preventDefault();
                alert('comienzan las funciones de Na-at');           
                /*Para IPAD*/
                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft .vote_block').on('touchstart', function(e){
                    //e.event.preventDefault();
                    if($(window).width() > 624){
                        var state = $(this).next('tr').find('td.separador .qualifies').css('display');
                        var state2 = $(this).next('tr').find('td.separador .calification').css('display');
                        var state3 = $(this).next('tr').find('td.separador .participated').css('display');
                        if(state != "none" || state2 != "none" || state3 != "none"){
                            $(this).next('tr').find('td.separador .qualifies').hide();
                            $(this).next('tr').find('td.separador .calification').hide();
                            $(this).next('tr').find('td.separador .participated').hide();
                            $(this).next('tr').find('td.separador .dotted-top').show();
                           }else{
                            $(this).next('tr').find('td.separador .qualifies').show();
                            $(this).next('tr').find('td.separador .calification').show();
                            $(this).next('tr').find('td.separador .dotted-top').hide();
                        }
                        if(state2 == null && state3 == "none"){
                            $(this).next('tr').find('td.separador .qualifies').show();
                            $(this).next('tr').find('td.separador .participated').show();
                            $(this).next('tr').find('td.separador .dotted-top').hide();
                        }
                    }else{}
                });
    
                //Over del jugador
                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft .vote_block').mouseenter(function(){
                    
                    //provisional
                    $(this).next('tr').find('td.separador .qualifies').show();


                        //$('.wdg_playerdraft_01 .scroll').height(1388);
                        //console.log($('.wdg_playerdraft_01 .scroll').height());
                    
                    if ($(window).width() < 624) {
                        return;
                    }
                    
                    // Cerramos TODOS las calificaciones
                    setCleanRecord();
                    
                    $(this).next('tr').find('td.separador .dotted-top').hide();
                    $(this).next('tr').find('td.separador .qualifies').show();
                    
                    // Verificamos si ya votaron
                    //alert($(this).next('tr').find(' td.separador .calification'));
                    if($(this).next('tr').find(' td.separador .calification').length > 0){
                        $(this).next('tr').find(' td.separador .calification').show();                    
                    }
                    else{
                        $(this).next('tr').find(' td.separador .participated').show();                        
                    }
                    
                });
    
                //Over del jugador
                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft ').mouseleave(function(){
                    //$('.wdg_playerdraft_01 .scroll').height(1342);
                    setCleanRecord();
                });
                
                //click calificacion
                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft .separador .calification a').click(function(event){
                    event.preventDefault();
                    alert ("has dado click en " + $(this).text());    
                    alert ("la URL es http://mxm.televisadeportes.esmas.com/futbol/draft/liga-mx-clausura-2013/1733");


                    $(this).parents('.calification').hide();
                            
                    $(this).parents('.separador').find('.participated').fadeIn().delay(1000).fadeOut(function() {
                            
                        // Animation complete.
                        $(this).parents('.separador').find('.qualifies').hide();
                        $(this).parents('.separador').find('.dotted-top').show();
                        
                    });
                    $(this).parents('.calification').remove();
                });
    
                // Mouseput del "gracias por votar"
                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft .separador .participated').mouseout(function(){                    
                    $(this).hide();
                    $(this).parents('.separador').find('.qualifies').hide();
                    $(this).parents('.separador').find('.dotted-top').show();
                    
                });
    
                function setCleanRecord(){
                    $('.wdg_playerdraft_01 .tblDraft td.separador .calification').hide();
                    $('.wdg_playerdraft_01 .tblDraft td.separador .participated').hide();
                    $('.wdg_playerdraft_01 .tblDraft td.separador .qualifies').hide();
                    $('.wdg_playerdraft_01 .tblDraft td.separador .dotted-top').show();
                }

                if ($.browser.msie && parseInt($.browser.version, 10) <= 8){
                    $('.wdg_playerdraft_01 .tblDraft td').css('display','block');
                    $('.wdg_playerdraft_01 .tblDraft th').css('display','block');
                }

            },
    				
    		getDataDraft: function() {                
    			console.log(wdg_playerdraft_01.urlData);
    			$.ajax({
    				url: 'draftjsonp.js',                    
    				type: "GET",
    	            dataType: 'jsonp',
    	            jsonpCallback: 'draft',
    	            cache: false,
    	            success:function(data){                                                            
                        wdg_playerdraft_01.viewHtml(data);                        	            	
    	            },
                    error: function(data){
                        alert("ERROR____");                        
                    }                    
    			});                
    		}
    	}
    	
        wdg_playerdraft_01.getDataDraft();
        wdg_playerdraft_01.funcionesNaat();

        /*$.when(wdg_playerdraft_01.getDataDraft().done(function() {
            setTimeout(function() {
                wdg_playerdraft_01.funcionesNaat();
            }, 500);

        });*/
    	
    };


})(jQuery);