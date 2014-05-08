;
(function() {
    $.fn.MxMTeamDraft = function(options) {               
        var setting = $.extend({            
            'idTorneo':0,
            'idTeam':0
        }, options);                

        var wdgTeamDraft = {
            urlData: 'http://lab.israelviveros.com/draft/'+setting.idTorneo+'/draft.js',           
            tagWdgTeamDraft: $("#containerwdg_teamdraft_01"), 
            arrayAltas: new Array(),
            arrayBajas: new Array(),
            arrayRumores: new Array(),
            arrayTrans: new Array(),
            arrayPrestamos: new Array(),

            remplazaComas: function(textArray) {
                var htmlArray = "";
                for (var m = 0; m < textArray.length; m++) {
                    htmlArray = htmlArray + textArray[m];
                }
                return htmlArray;
            },

            typeDraft: function(type, idPlayer, namePlayer, lastTeam, transfer, rantingTD, ratingUser, nationality) {

                switch (type) {
                    case 'ALTA':
                        playerDraft = "<tr class='vote_block'>";
                        playerDraft += "<td class='dotted-right'>";
                        playerDraft += namePlayer;
                        playerDraft += "<div class='nacionalidad'>" + nationality + "</div>";
                        playerDraft += "</td>";
                        playerDraft += "<td width='22'><img src='http://placehold.it/22x22'></td>";
                        playerDraft += "<td class='dotted-right'>" + lastTeam + "</td>";
                        playerDraft += "<td class='dotted-right center'>" + rantingTD + "</td>";
                        playerDraft += "<td class='textcolor-title1'>0</td>";
                        playerDraft += "</tr>";
                        playerDraft += "<tr>";
                        playerDraft += "<td colspan='7' class='separador' style='position:relative'><div class='dotted-top'></div>";
                        playerDraft += "<div class='qualifies'>";
                        playerDraft += "<div>califica al jugador</div>";
                        playerDraft += "</div>";
                        playerDraft += "<div class='calification  textcolor-title4'>";
                        playerDraft += "<div><a href='#'>5</a></div>";
                        playerDraft += "<div><a href='#'>6</a></div>";
                        playerDraft += "<div><a href='#'>7</a></div>";
                        playerDraft += "<div><a href='#'>8</a></div>";
                        playerDraft += "<div><a href='#'>9</a></div>";
                        playerDraft += "<div><a href='#'>10</a></div>";
                        playerDraft += "</div>";
                        playerDraft += "<div class='participated  textcolor-title4'>";
                        playerDraft += "<div class='voted'>";
                        playerDraft += "<p>Gracias por votar <i class='tvsa-like'></i></p>";
                        playerDraft += "</div>";
                        playerDraft += "</div>";
                        playerDraft += "</td>";
                        playerDraft += "</tr>";

                        wdgTeamDraft.arrayAltas.push(playerDraft);

                        break;

                    case 'BAJA':
                        playerDraft = "<tr class='vote_block'>";
                        playerDraft += "<td class='dotted-right'>";
                        playerDraft += namePlayer;
                        playerDraft += "<div class='nacionalidad'>" + nationality + "</div>";
                        playerDraft += "</td>";
                        playerDraft += "<td width='22'><img src='http://placehold.it/22x22'></td>";
                        playerDraft += "<td class='dotted-right'>" + lastTeam + "</td>";
                        playerDraft += "<td class='dotted-right center'>" + rantingTD + "</td>";
                        playerDraft += "<td class='textcolor-title1'>0</td>";
                        playerDraft += "</tr>";
                        playerDraft += "<tr>";
                        playerDraft += "<td colspan='7' class='separador' style='position:relative'><div class='dotted-top'></div>";
                        playerDraft += "<div class='qualifies'>";
                        playerDraft += "<div>califica al jugador</div>";
                        playerDraft += "</div>";
                        playerDraft += "<div class='calification  textcolor-title4'>";
                        playerDraft += "<div><a href='#'>5</a></div>";
                        playerDraft += "<div><a href='#'>6</a></div>";
                        playerDraft += "<div><a href='#'>7</a></div>";
                        playerDraft += "<div><a href='#'>8</a></div>";
                        playerDraft += "<div><a href='#'>9</a></div>";
                        playerDraft += "<div><a href='#'>10</a></div>";
                        playerDraft += "</div>";
                        playerDraft += "<div class='participated  textcolor-title4'>";
                        playerDraft += "<div class='voted'>";
                        playerDraft += "<p>Gracias por votar <i class='tvsa-like'></i></p>";
                        playerDraft += "</div>";
                        playerDraft += "</div>";
                        playerDraft += "</td>";
                        playerDraft += "</tr>";

                        wdgTeamDraft.arrayBajas.push(playerDraft);

                        break;
                    case 'PRESTAMO':
                        playerDraft = "<tr class='vote_block'>";
                        playerDraft += "<td class='dotted-right'>";
                        playerDraft += namePlayer;
                        playerDraft += "<div class='nacionalidad'>" + nationality + "</div>";
                        playerDraft += "</td>";
                        playerDraft += "<td width='22'><img src='http://placehold.it/22x22'></td>";
                        playerDraft += "<td class='dotted-right'>" + lastTeam + "</td>";
                        playerDraft += "<td class='dotted-right center'>" + rantingTD + "</td>";
                        playerDraft += "<td class='textcolor-title1'>0</td>";
                        playerDraft += "</tr>";
                        playerDraft += "<tr>";
                        playerDraft += "<td colspan='7' class='separador' style='position:relative'><div class='dotted-top'></div>";
                        playerDraft += "<div class='qualifies'>";
                        playerDraft += "<div>califica al jugador</div>";
                        playerDraft += "</div>";
                        playerDraft += "<div class='calification  textcolor-title4'>";
                        playerDraft += "<div><a href='#'>5</a></div>";
                        playerDraft += "<div><a href='#'>6</a></div>";
                        playerDraft += "<div><a href='#'>7</a></div>";
                        playerDraft += "<div><a href='#'>8</a></div>";
                        playerDraft += "<div><a href='#'>9</a></div>";
                        playerDraft += "<div><a href='#'>10</a></div>";
                        playerDraft += "</div>";
                        playerDraft += "<div class='participated  textcolor-title4'>";
                        playerDraft += "<div class='voted'>";
                        playerDraft += "<p>Gracias por votar <i class='tvsa-like'></i></p>";
                        playerDraft += "</div>";
                        playerDraft += "</div>";
                        playerDraft += "</td>";
                        playerDraft += "</tr>";

                        wdgTeamDraft.arrayPrestamos.push(playerDraft);

                        break;
                    default: 
                        console.log(type);
                        break;
                }
            },

            viewHtml: function(data){                                                                                                  
                for (var i=0; i<data['draftTeams'].length; i++) {                                    
                    if (data['draftTeams'][i]['id']==setting.idTeam) {
                        alert (data['draftTeams'][i]['name']);                                                                                                        
                        for (var n=0; n<data['draftTeams'][i]['operation'].length; n++) {
                            var type = "";
                            var idPlayer = "";
                            var namePlayer = "";
                            var lastTeam = "";
                            var transfer = "";                        
                            var rantingTD = "";
                            var ratingUser = "";
                            var nationality = "";            

                            type = data['draftTeams'][i]['operation'][n]['type'];                        
                            idPlayer = data['draftTeams'][i]['operation'][n]['id'];
                            namePlayer = data['draftTeams'][i]['operation'][n]['name'];
                            lastTeam = data['draftTeams'][i]['operation'][n]['lastTeam'];
                            transfer = data['draftTeams'][i]['operation'][n]['transfer'];                        
                            rantingTD = data['draftTeams'][i]['operation'][n]['rantingTD'];
                            ratingUser = data['draftTeams'][i]['operation'][n]['ratingUser']; 
                            nationality =  data['draftTeams'][i]['operation'][n]['nationality']; 
                            
                            wdgTeamDraft.typeDraft(type,idPlayer,namePlayer,lastTeam,transfer,rantingTD,ratingUser,nationality);

                        }
                    }
                }                
                var textArray = "";
                maquetado = "<div id='wdg_teamdraft_01' class='wdg_teamdraft_01' data-enhance='false'>";
                //Encabezado___
                maquetado += "<div class='div1'><img src='http://placehold.it/75x85'></div>";
                maquetado += "<div class='div2'>";
                maquetado += "<div class='textcolor-title1'>Guadalajara</div>";
                maquetado += "<div class='underline'></div>";
                maquetado += "<div class='nombre'>Club Guadalajara S.A. de C.V.</div>";
                maquetado += "<div class='presidente'>Jorge Carlos Vergara Madrigal</div>";
                maquetado += "<div class='puesto'>Presidente</div>";
                maquetado += "</div>";
                maquetado += "<div class='div3'>";
                maquetado += "<div>Altas Totales</div>";
                maquetado += "<div class='textcolor-title2'>"+wdgTeamDraft.arrayAltas.length+"</div>";                
                maquetado += "</div>";
                maquetado += "<div class='subtitle'>";
                maquetado += "<div class='textcolor-title4'>Elige a tu jugador y vota</div>";
                maquetado += "</div>";
                maquetado += "<div class='scroll'>";

                //Contenido___
                //Altas...
                maquetado += "<div class='verde'>";
                maquetado += "<div class='textcolor-title1 pleca'>Altas</div>";
                maquetado += "<table width='100%'' border='0' cellspacing='0' cellpadding='0' class='tblDraft'>";
                maquetado += "<tr>";
                maquetado += "<th class='textcolor-title1 td_large'>JUGADOR</th>";
                maquetado += "<th width='' class='textcolor-title1 sm' colspan='2'>EQUIPO ANTERIOR</th>";
                maquetado += "<th class='gris center f_small td_medium'>TD</th>";
                maquetado += "<th class='textcolor-title1 f_small td_short'>AFICI&Oacute;N</th>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td colspan='7' class='separador'></td>";
                maquetado += "</tr>";
                //Aqui inserto Tabla de Altas...   
                textArray = wdgTeamDraft.arrayAltas;              
                maquetado += wdgTeamDraft.remplazaComas(textArray);
                maquetado += "</table>";
                maquetado += "</div>";

                //Bajas...
                maquetado += "<div class='rojo'>";
                maquetado += "<div class='textcolor-title1 pleca'>Bajas</div>";
                maquetado += "<table width='100%'' border='0' cellspacing='0' cellpadding='0' class='tblDraft'>";
                maquetado += "<tr>";
                maquetado += "<th class='textcolor-title1 td_large'>JUGADOR</th>";
                maquetado += "<th width='' class='textcolor-title1 sm' colspan='2'>EQUIPO ANTERIOR</th>";
                maquetado += "<th class='gris center f_small td_medium'>TD</th>";
                maquetado += "<th class='textcolor-title1 f_small td_short'>AFICI&Oacute;N</th>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td colspan='7' class='separador'></td>";
                maquetado += "</tr>";
                // Aqui inserto la Tabla de Bajas... 
                textArray = wdgTeamDraft.arrayBajas;              
                maquetado += wdgTeamDraft.remplazaComas(textArray);                
                maquetado += "</table>";
                maquetado += "</div>";

                //Rumores...
                maquetado += "<div class='naranja'>";
                maquetado += "<div class='textcolor-title1 pleca'>Rumores</div>";
                maquetado += "<table width='100%'' border='0' cellspacing='0' cellpadding='0' class='tblDraft'>";
                maquetado += "<tr>";
                maquetado += "<th class='textcolor-title1 td_large'>JUGADOR</th>";
                maquetado += "<th width='' class='textcolor-title1 sm' colspan='2'>EQUIPO ANTERIOR</th>";
                maquetado += "<th class='gris center f_small td_medium'>TD</th>";
                maquetado += "<th class='textcolor-title1 f_small td_short'>AFICI&Oacute;N</th>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td colspan='7' class='separador'></td>";
                maquetado += "</tr>";
                maquetado += "<tr class='vote_block'>";
                maquetado += "<td class='dotted-right'>";
                maquetado += "Daniel Casillas";
                maquetado += "<div class='nacionalidad'>Mexicano</div>";
                maquetado += "</td>";
                maquetado += "<td width='22'><img src='http://placehold.it/22x22'></td>";
                maquetado += "<td class='dotted-right'> Chivas USA</td>";
                maquetado += "<td class='dotted-right center'>7.5</td>";
                maquetado += "<td class='textcolor-title1'>6.7</td>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td colspan='7' class='separador' style='position:relative'><div class='dotted-top'></div>";
                maquetado += "<div class='qualifies'>";
                maquetado += "<div>califica al jugador</div>";
                maquetado += "</div>";
                maquetado += "<div class='calification  textcolor-title4'>";
                maquetado += "<div><a href='#'>5</a></div>";
                maquetado += "<div><a href='#'>6</a></div>";
                maquetado += "<div><a href='#'>7</a></div>";
                maquetado += "<div><a href='#'>8</a></div>";
                maquetado += "<div><a href='#'>9</a></div>";
                maquetado += "<div><a href='#'>10</a></div>";
                maquetado += "</div>";
                maquetado += "<div class='participated  textcolor-title4'>";
                maquetado += "<div class='voted'>";
                maquetado += "<p>Gracias por votar <i class='tvsa-like'></i></p>";
                maquetado += "</div>";
                maquetado += "</div>";
                maquetado += "</td>";
                maquetado += "</tr>";
                maquetado += "</table>";
                maquetado += "</div>";

                //Transferibles...
                maquetado += "<div class='azul'>";
                maquetado += "<div class='textcolor-title1 pleca'>Transferibles</div>";
                maquetado += "<table width='100%'' border='0' cellspacing='0' cellpadding='0' class='tblDraft'>";
                maquetado += "<tr>";
                maquetado += "<th class='textcolor-title1 td_large'>JUGADOR</th>";
                maquetado += "<th width='' class='textcolor-title1 sm' colspan='2'>EQUIPO ANTERIOR</th>";
                maquetado += "<th class='gris center f_small td_medium'>TD</th>";
                maquetado += "<th class='textcolor-title1 f_small td_short'>AFICI&Oacute;N</th>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td colspan='7' class='separador'></td>";
                maquetado += "</tr>";
                maquetado += "<tr class='vote_block'>";
                maquetado += "<td class='dotted-right'>";
                maquetado += "Daniel Casillas";
                maquetado += "<div class='nacionalidad'>Mexicano</div>";
                maquetado += "</td>";
                maquetado += "<td width='22'><img src='http://placehold.it/22x22'></td>";
                maquetado += "<td class='dotted-right'> Chivas USA</td>";
                maquetado += "<td class='dotted-right center'>7.5</td>";
                maquetado += "<td class='textcolor-title1'>6.7</td>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td colspan='7' class='separador' style='position:relative'><div class='dotted-top'></div>";
                maquetado += "<div class='qualifies'>";
                maquetado += "<div>califica al jugador</div>";
                maquetado += "</div>";
                maquetado += "<div class='calification  textcolor-title4'>";
                maquetado += "<div><a href='#'>5</a></div>";
                maquetado += "<div><a href='#'>6</a></div>";
                maquetado += "<div><a href='#'>7</a></div>";
                maquetado += "<div><a href='#'>8</a></div>";
                maquetado += "<div><a href='#'>9</a></div>";
                maquetado += "<div><a href='#'>10</a></div>";
                maquetado += "</div>";
                maquetado += "<div class='participated  textcolor-title4'>";
                maquetado += "<div class='voted'>";
                maquetado += "<p>Gracias por votar <i class='tvsa-like'></i></p>";
                maquetado += "</div>";
                maquetado += "</div>";
                maquetado += "</td>";
                maquetado += "</tr>";
                maquetado += "</table>";
                maquetado += "</div>";

                //Renovación de Prestamo...
                maquetado += "<div class='azul2'>";
                maquetado += "<div class='textcolor-title1 pleca'>Renovaci&oacute;n de Prestamo</div>";
                maquetado += "<table width='100%'' border='0' cellspacing='0' cellpadding='0' class='tblDraft'>";
                maquetado += "<tr>";
                maquetado += "<th class='textcolor-title1 td_large'>JUGADOR</th>";
                maquetado += "<th width='' class='textcolor-title1 sm' colspan='2'>EQUIPO ANTERIOR</th>";
                maquetado += "<th class='gris center f_small td_medium'>TD</th>";
                maquetado += "<th class='textcolor-title1 f_small td_short'>AFICI&Oacute;N</th>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td colspan='7' class='separador'></td>";
                maquetado += "</tr>";

                //Aqui inserto la tabla de PRESTAMO...
                textArray = wdgTeamDraft.arrayPrestamos;              
                maquetado += wdgTeamDraft.remplazaComas(textArray);                                

                maquetado += "</table>";
                maquetado += "</div>";
                maquetado += "<div class='degraded'></div>";
                maquetado += "</div>"; //div scroll          
                maquetado += "</div>"; //div wdg_teamdraft_01             

                wdgTeamDraft.tagWdgTeamDraft.html(maquetado);

            },
            /*funcionesNaat: function() { 
                //e.event.preventDefault();
                alert('comienzan las funciones de Na-at');           
                /*Para IPAD
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

            },*/

            getDataTeamDraft: function() { 
                console.log(wdgTeamDraft.urlData);
                $.ajax({
                    url: wdgTeamDraft.urlData,                                        
                    type: "GET",
                    dataType: 'jsonp',
                    jsonpCallback: 'llave',
                    cache: false,
                    success: function(data) {
                        wdgTeamDraft.viewHtml(data);
                    },
                    error: function(data) {
                        alert("ERROR____");
                    }
                });
            }
        }

        wdgTeamDraft.getDataTeamDraft();
        //wdgTeamDraft.funcionesNaat();

    };


})(jQuery);