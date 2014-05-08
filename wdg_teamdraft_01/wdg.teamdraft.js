;
(function() {
    $.fn.MxMTeamDraft = function(options) {               
        var setting = $.extend({            
            'idTorneo':0,
            'idTeam':0
        }, options);                

        var wdgTeamDraft = {
            // ....................................................................
            // -- Creacion y asignacion de valores a las variables
            // ....................................................................
            urlData: 'http://lab.israelviveros.com/draft/'+setting.idTorneo+'/draft.js',           
            tagWdgTeamDraft: $("#containerwdg_teamdraft_01"),         
            arrayAltas: new Array(),
            arrayBajas: new Array(),
            arrayRumores: new Array(),            
            arrayTrans: new Array(),
            arrayPrestamos: new Array(),
            flagTypeAltas: 0,
            flagTypeBajas: 0,
            flagTypeRumores: 0,
            flagTypeTransf: 0,
            flagTypePrestamos: 0, 

            // ....................................................................
            // -- Funcion que concatena los registros del array en una variable
            // ....................................................................
            remplazaComas: function(textArray) {
                var htmlArray = "";
                for (var m = 0; m < textArray.length; m++) {
                    htmlArray = htmlArray + textArray[m];
                }
                return htmlArray;
            },

            // .....................................................................................
            // Funcion que pinta el html para los casos (ALTA,BAJA,RUMORES,TRANSFERIBLES,PRESTAMO)
            // .....................................................................................
            typeDraft: function(type, idPlayer, namePlayer, lastTeam, transfer, rantingTD, ratingUser, nationality, details) {

                switch (type) {
                    case 'ALTA':
                        wdgTeamDraft.flagTypeAltas = 1;
                        maquetado = "<tr class='vote_block'>";
                        maquetado += "<td class='dotted-right'>";
                        maquetado += "<div style='visibility:hidden;'>"+idPlayer+"</div>";
                        maquetado += namePlayer;
                        maquetado += "<div class='nacionalidad'>" + nationality + "</div>";
                        maquetado += "</td>";
                        maquetado += "<td width='22'><img src='http://placehold.it/22x22'></td>";
                        maquetado += "<td class='dotted-right'>" + lastTeam + "</td>";
                        maquetado += "<td class='dotted-right center'>" + rantingTD + "</td>";
                        maquetado += "<td class='textcolor-title1'>0</td>";
                        maquetado += "</tr>";
                        maquetado += "<tr>";
                        maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow: 0px 0px 0px #FFF; left:0;'><div class='dotted-top'></div>";
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

                        wdgTeamDraft.arrayAltas.push(maquetado);

                        break;

                    case 'BAJA':
                        wdgTeamDraft.flagTypeBajas = 1;
                        maquetado = "<tr class='vote_block'>";
                        maquetado += "<td class='dotted-right'>";
                        maquetado += "<div style='visibility:hidden;'>"+idPlayer+"</div>";
                        maquetado += namePlayer;
                        maquetado += "<div class='nacionalidad'>" + nationality + "</div>";
                        maquetado += "</td>";
                        maquetado += "<td width='22'><img src='http://placehold.it/22x22'></td>";
                        maquetado += "<td class='dotted-right'>" + lastTeam + "</td>";
                        maquetado += "<td class='dotted-right center'>" + rantingTD + "</td>";
                        maquetado += "<td class='textcolor-title1'>0</td>";
                        maquetado += "</tr>";
                        maquetado += "<tr>";
                        maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow: 0px 0px 0px #FFF; left:0'><div class='dotted-top'></div>";
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

                        wdgTeamDraft.arrayBajas.push(maquetado);

                        break;
                    
                    case 'RUMORES':                        
                        wdgTeamDraft.flagTypeRumores = 1;
                        maquetado = "<tr class=''>";
                        maquetado += "<td class='dotted-right'>";
                        maquetado += "<div style='visibility:hidden;'>"+idPlayer+"</div>";
                        maquetado += namePlayer;
                        maquetado += "<div class='nacionalidad'>"+ nationality +"</div>";
                        maquetado += "</td>";
                        maquetado += "<td class='dotted-right'>"+ nationality +"</td>";
                        maquetado += "<td class='gris'>"+ details +"</td>";
                        maquetado += "</tr>"; 
                        maquetado += "<tr>";
                        maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow: 0px 0px 0px #FFF; left:0;'><div class='dotted-top'></div></td>";
                        maquetado += "</tr>";
                
                        wdgTeamDraft.arrayRumores.push(maquetado);

                        break;  

                    case 'TRANSFERIBLES':
                        wdgTeamDraft.flagTypeTransf = 1;
                        maquetado = "<tr class=''>";
                        maquetado += "<td class='dotted-right'>";
                        maquetado += "<div style='visibility:hidden;'>"+idPlayer+"</div>";
                        maquetado += namePlayer;
                        maquetado += "<div class='nacionalidad'>"+ nationality +"</div>";
                        maquetado += "</td>";
                        maquetado += "<td class='dotted-right'>"+ nationality +"</td>";
                        maquetado += "<td class='gris'>"+ details +"</td>";
                        maquetado += "</tr>"; 
                        maquetado += "<tr>";
                        maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow: 0px 0px 0px #FFF;left:0;'><div class='dotted-top'></div></td>";
                        maquetado += "</tr>";  

                        wdgTeamDraft.arrayTrans.push(maquetado);

                        break;

                    case 'PRESTAMO':
                        wdgTeamDraft.flagTypePrestamos = 1;
                        maquetado = "<tr class='vote_block'>";
                        maquetado += "<td class='dotted-right'>";
                        maquetado += "<div style='visibility:hidden;'>"+idPlayer+"</div>";
                        maquetado += namePlayer;
                        maquetado += "<div class='nacionalidad'>" + nationality + "</div>";
                        maquetado += "</td>";
                        maquetado += "<td width='22'><img src='http://placehold.it/22x22'></td>";
                        maquetado += "<td class='dotted-right'>" + lastTeam + "</td>";
                        maquetado += "<td class='dotted-right center'>" + rantingTD + "</td>";
                        maquetado += "<td class='textcolor-title1'>0</td>";
                        maquetado += "</tr>";
                        maquetado += "<tr>";
                        maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow: 0px 0px 0px #FFF; left:0;'><div class='dotted-top'></div>";
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

                        wdgTeamDraft.arrayPrestamos.push(maquetado);

                        break;
                    default: 
                        console.log(type);
                        break;
                }
            },

            // ..............................................................................
            // -- Funcion que recorre la informacion.
            // -- Pinta el Encabezado del equipo.
            // -- Hace un llamado a las funciones que contruyen los arreglos con los registros
            //    de cada uno de los tipos de Draft.
            // ..............................................................................
            viewHtml: function(data){                                                                                                  
                for (var i=0; i<data['draftTeams'].length; i++) {                                    
                    if (data['draftTeams'][i]['id']==setting.idTeam) {
                        var nameTeam = data['draftTeams'][i]['name'];                                                                                                                                                    
                        for (var n=0; n<data['draftTeams'][i]['operation'].length; n++) {
                            var type = "";
                            var idPlayer = "";
                            var namePlayer = "";
                            var lastTeam = "";
                            var transfer = "";                        
                            var rantingTD = "";
                            var ratingUser = "";
                            var nationality = "";                                        
                            var details = "";

                            type = data['draftTeams'][i]['operation'][n]['type'];                        
                            idPlayer = data['draftTeams'][i]['operation'][n]['id'];
                            namePlayer = data['draftTeams'][i]['operation'][n]['name'];
                            lastTeam = data['draftTeams'][i]['operation'][n]['lastTeam'];
                            transfer = data['draftTeams'][i]['operation'][n]['transfer'];                        
                            rantingTD = data['draftTeams'][i]['operation'][n]['rantingTD'];
                            ratingUser = data['draftTeams'][i]['operation'][n]['ratingUser']; 
                            nationality = data['draftTeams'][i]['operation'][n]['nationality']; 
                            details = data['draftTeams'][i]['operation'][n]['Detail']; 
                            
                            wdgTeamDraft.typeDraft(type,idPlayer,namePlayer,lastTeam,transfer,rantingTD,ratingUser,nationality,details);

                        }
                    }
                }                
                
                var textArray = "";
                maquetado = "<div id='wdg_teamdraft_01' class='wdg_teamdraft_01' data-enhance='false'>";
                
                // ENCABEZADO
                maquetado += "<div class='div1'><img src='http://placehold.it/75x85'></div>";
                maquetado += "<div class='div2'>";
                maquetado += "<div class='textcolor-title1'>"+ nameTeam +"</div>";
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

                // CONTENIDO
                // -- ALTAS --
                if(wdgTeamDraft.flagTypeAltas == 1){
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
                    maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow:0px #fff;'></td>";
                    maquetado += "</tr>";
                    // ...Tabla de Altas...   
                    textArray = wdgTeamDraft.arrayAltas;              
                    maquetado += wdgTeamDraft.remplazaComas(textArray);
                    maquetado += "</table>";
                    maquetado += "</div>";
                }                
                
                // -- BAJAS --
                if (wdgTeamDraft.flagTypeBajas == 1) {
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
                    maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow:0px #fff;'></td>";
                    maquetado += "</tr>";
                    // ...Tabla de Bajas... 
                    textArray = wdgTeamDraft.arrayBajas;              
                    maquetado += wdgTeamDraft.remplazaComas(textArray);                
                    maquetado += "</table>";
                    maquetado += "</div>";    
                }
                
                //  -- RUMORES --
                if (wdgTeamDraft.flagTypeRumores == 1) {
                    maquetado += "<div class='naranja'>";
                    maquetado += "<div class='textcolor-title1 pleca'>Rumores</div>";
                    maquetado += "<table width='100%'' border='0' cellspacing='0' cellpadding='0' class='tblDraft'>";
                    maquetado += "<tr>";
                    maquetado += "<th width='140' class='extcolor-title1'>JUGADOR</th>";
                    maquetado += "<th width='120' class='textcolor-title1 sp'>NACIONALIDAD</th>";
                    maquetado += "<th width='' class='textcolor-title1'>COMENTARIO</th>";
                    maquetado += "</tr>";                                    
                    maquetado += "<tr>";
                    maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow:0px #fff;'></td>";
                    maquetado += "</tr>";
                    // ...Tabla de Rumores... 
                    textArray = wdgTeamDraft.arrayRumores;              
                    maquetado += wdgTeamDraft.remplazaComas(textArray);                
                    maquetado += "</table>";
                    maquetado += "</div>";
                }
                
                // -- TRANSFERIBLES --
                if (wdgTeamDraft.flagTypeTransf == 1) {
                    maquetado += "<div class='azul'>";
                    maquetado += "<div class='textcolor-title1 pleca'>Transferibles</div>";
                    maquetado += "<table width='100%'' border='0' cellspacing='0' cellpadding='0' class='tblDraft'>";
                    maquetado += "<tr>";
                    maquetado += "<th width='140' class='extcolor-title1'>JUGADOR</th>";
                    maquetado += "<th width='120' class='textcolor-title1 sp'>NACIONALIDAD</th>";
                    maquetado += "<th width='' class='textcolor-title1'>COMENTARIO</th>";
                    maquetado += "</tr>";                                    
                    maquetado += "<tr>";
                    maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow:0px #fff;'></td>";
                    maquetado += "</tr>";
                    // ...Tabla de Transferibles... 
                    textArray = wdgTeamDraft.arrayTrans;              
                    maquetado += wdgTeamDraft.remplazaComas(textArray);                
                    maquetado += "</table>";
                    maquetado += "</div>";
                }
                
                // -- RENOVACION DE PRESTAMO --
                if (wdgTeamDraft.flagTypePrestamos == 1) {
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
                    maquetado += "<td colspan='7' class='separador' style='position:relative; text-shadow:0px #fff;'></td>";
                    maquetado += "</tr>";
                    // ...Tabla de Prestamo...
                    textArray = wdgTeamDraft.arrayPrestamos;              
                    maquetado += wdgTeamDraft.remplazaComas(textArray);                                
                    maquetado += "</table>";
                    maquetado += "</div>";                    
                }
                maquetado += "<div class='degraded'></div>";
                maquetado += "</div>"; //div scroll          
                maquetado += "</div>"; //div wdg_teamdraft_01             

                wdgTeamDraft.tagWdgTeamDraft.html(maquetado);

            },
            funcionesNaat: function() { 
                // e.event.preventDefault();
                alert('funciones de Na-at');           
                // Para IPAD
                $('containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft .vote_block').on('touchstart', function(e){
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
                $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft .vote_block').mouseenter(function(){
                    $(this).next('tr').find('td.separador .qualifies').show();                    
                    if ($(window).width() < 624) {
                        return;
                    }
                    
                    // Cerramos TODOS las calificaciones
                    setCleanRecord();
                    
                    $(this).next('tr').find('td.separador .dotted-top').hide();
                    $(this).next('tr').find('td.separador .qualifies').show();
                    
                    // Verificamos si ya votaron                    
                    if($(this).next('tr').find(' td.separador .calification').length > 0){
                        $(this).next('tr').find(' td.separador .calification').show();                    
                    }
                    else{
                        $(this).next('tr').find(' td.separador .participated').show();                        
                    }
                    
                });

                //Over del jugador
                $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft').mouseleave(function(){                      
                    setCleanRecord();
                });
                

                $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft .separador .calification a').click(function(event){
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
                $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft .separador .participated').mouseout(function(){
                    $(this).hide();
                    $(this).parents('.separador').find('.qualifies').hide();
                    $(this).parents('.separador').find('.dotted-top').show();
                    
                });

                // Over de calificaciones
                $('.containerwdg_teamdraft_01 .wdg_teamdraft_01  .tblDraft .calification div a').mouseover(function(){
                    $(this).addClass('textcolor-title1');
                });
                
                $('.containerwdg_teamdraft_01 .wdg_teamdraft_01  .tblDraft .calification div a').mouseout(function(){
                    $(this).removeClass('textcolor-title1');
                });

                function setCleanRecord(){
                    $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft td.separador .calification').hide();
                    $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft td.separador .participated').hide();
                    $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft td.separador .qualifies').hide();
                    $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft td.separador .dotted-top').show();
                }

                if ($.browser.msie && parseInt($.browser.version, 10) <= 8){
                    $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft td').css('display','block');
                    $('.containerwdg_teamdraft_01 .wdg_teamdraft_01 .tblDraft th').css('display','block');
                }

            },

            getDataTeamDraft: function() { 
                console.log(wdgTeamDraft.urlData);
                $.ajax({
                    url: wdgTeamDraft.urlData, 
                    // url: 'draft.js',                                       
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

        //wdgTeamDraft.getDataTeamDraft();
        //wdgTeamDraft.funcionesNaat();
        
        $.when(wdgTeamDraft.getDataTeamDraft().done(function() {
            setTimeout(function() {
                wdgTeamDraft.funcionesNaat();
            }, 500);

        });

    };


})(jQuery);