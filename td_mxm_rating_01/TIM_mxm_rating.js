/*your js code */ ;
(function() {
    //-----------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------
    
    $.fn.MxMRating = function(options) {
        var setting = $.extend({
            'idTorneo': 0,
            'idEvento': 0,
            'idEquipo': 0,
            'idEquipo2': 0,
            'title': '',
            'votos': 0
        }, options);
    
        var GlobalThis = this;

        var wdg_mxm_rating = {
            urlfeedDropLocal: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/clubes/' + setting.idEquipo + '/matchesclub.js',
            urlfeedDropVisit: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/clubes/' + setting.idEquipo2 + '/matchesclub.js',
            
            tagRating: $("#containerwdg_mxm_rating_01"),
            tagAlineacionGoles: $("#TIMAlineacionGoles"),
            tagwdgPenales: $("#TIMWdgPenales"),
            tagExpulsion: $("#ExpulsionTIM"),            
            jornadaText: '',
        
            //Metodo para colocar la posicion del jugador
            posicionTexto: function(posicion) {
                var posicionTexto;
                switch (posicion) {
                    case "GK":
                        posicionTexto = "Portero";
                        break;
                    case "D":
                        posicionTexto = "Defensa";
                        break;
                    case "MF":
                        posicionTexto = "Medio";
                        break;
                    case "F":
                        posicionTexto = "Delantero";
                        break;
                    default:
                        posicionTexto = "<span style='display:block; height:10px; width:50px;'>";
                }
                return posicionTexto;
            },

            pintaInfo: function(dataAlineacion, dataMatchHeader, dataGamePlayer) {
            	            	            	
                // START Israel Viveros
                wdg_mxm_rating.intervaloVe = setInterval(function() {
                    wdg_mxm_rating.listenerInfo();
                }, 3000);
                var golesLocal = (typeof(dataAlineacion.goalsLocal) !== "undefined") ? dataAlineacion.goalsLocal : '';
                var golesVisit = (typeof(dataAlineacion.goalsVisit) !== "undefined") ? dataAlineacion.goalsVisit : '';


                wdg_mxm_rating.GolesAnotados(golesLocal, golesVisit, dataAlineacion.lineupLocal.name, dataAlineacion.lineupVisit.name);


                if (typeof(dataAlineacion.PenaltiesLocal) !== "undefined" || typeof(dataAlineacion.PenaltiesVisit) !== "undefined") {
                    wdg_mxm_rating.wdgPenales(dataAlineacion.PenaltiesLocal, dataAlineacion.PenaltiesVisit, dataAlineacion.lineupLocal.name, dataAlineacion.lineupVisit.name);
                }

                //Modulo expulsados
                var expulsadosLocal = new Array(),
                    expulsadosVisit = new Array();
                expulsadosLocal = dataAlineacion['lineupLocal'].penalization;
                expulsadosVisit = dataAlineacion['lineupVisit'].penalization;
                if (expulsadosLocal !== "undefined" || expulsadosVisit !== "undefined") {
                    wdg_mxm_rating.Modexpulsados(expulsadosLocal, expulsadosVisit);
                }
                // END Israel Viveros


                var equipo = new Array();
                var equipoMatch = new Array();
                var textoPosicion;
                var nombreJugador;
                var posicion;
                var playerDetailPorcentaje;

                equipo[0] = "lineupLocal";
                equipo[1] = "lineupVisit";
                equipoMatch[0] = "equipoLocal";
                equipoMatch[1] = "equipoVisitante";                
                
                wdg_mxm_rating.jornadaText = dataMatchHeader['jornada']['nombre']; 
                var logoLocal = dataMatchHeader[equipoMatch[0]]['smallImage'];
                var logoVisitante = dataMatchHeader[equipoMatch[1]]['smallImage'];
                var nombreLocal = dataMatchHeader[equipoMatch[0]]['nombre'];
                var nombreVisit = dataMatchHeader[equipoMatch[1]]['nombre'];
                var regLocal = dataAlineacion[equipo[0]]['team'].length;
                var regVisit = dataAlineacion[equipo[1]]['team'].length;
                var regbancaLocal = dataAlineacion[equipo[0]]['substitutes'].length;
                var regbancaVisit = dataAlineacion[equipo[1]]['substitutes'].length;
                var regPlayerDetail = dataGamePlayer.poll['answers']['answer'].length;
                setting.votos = dataGamePlayer.poll['summary']['conteo'];
                

                //ALINEACION LOCAL
                var maquetado = "";
                maquetado += "<div class='wdg_rate_player_01' data-enhance='false'>";
                maquetado += "<div class='qualifies textcolor-title4'>Elige a tu jugador y vota</div>";
                maquetado += "<table><tr><td class='header_team'><table class='head_table'><tr>";
                maquetado += "<th><img alt='' src='" + logoLocal + "'></th>";
                maquetado += "<th colspan='3' class='equipo'><p class='title_team textcolor-title1'>" + nombreLocal + "</p></th>";

                maquetado += "<th><p class='title_td textcolor-title4 dotted-right'>TD</p></th>";
                maquetado += "<th><p class='title_afision textcolor-title1'>Afici&oacute;n</p></th>";
                maquetado += "</tr>";
                maquetado += "<tr class='dotted-right'>";
                maquetado += "<th colspan='6' class='day_relative'>";

                //Drop Equipo Local
                maquetado += '<div class="jornada" style="z-index: 910;">';
                maquetado += '<div class="wdg_lineup_01_dropdown drop1" style="z-index: 900;">';
                maquetado += '<div class="wdg_lineup_01_dropdowncontent" style="z-index: 890;">';
                maquetado += '<p id="nameJALocal"></p>';
                maquetado += '<span class="sprite dropdown-gray"></span></div>';

                maquetado += '<div class="wdg_lineup_01_listcontainer" style="z-index: 880;">';
                maquetado += '<ul class="wdg_lineup_01_dropdownlist" id="TIMPALocal"></ul>  ';
                maquetado += '</div>';

                maquetado += '</div>';
                maquetado += '</div>';

                maquetado += '<div style="clear: both; z-index: 870;"></div>';
                //....

                maquetado += "</th></tr>";
                maquetado += "</table>";
                maquetado += "<table class='dotted-right'>";
                maquetado += "<thead><!-- Listbox --></thead>";
                maquetado += "<tbody>";
                for (var i = 0; i < regLocal; i++) {
                    nombreJugador = dataAlineacion[equipo[0]]['team'][i]['nickName'];
                    posicion = dataAlineacion[equipo[0]]['team'][i]['position'];
                    textoPosicion = wdg_mxm_rating.posicionTexto(posicion);
                    idEquipo = dataAlineacion[equipo[0]]['idTeam'];
                    numPlayer = dataAlineacion[equipo[0]]['team'][i]['number'];
                    idPlayer = dataAlineacion[equipo[0]]['team'][i]['guid'];
                    if (i == 0) {
                        maquetado += "<tr class='evaluation first_child'>";
                    } else {
                        maquetado += "<tr class='evaluation'>";
                    }
                    maquetado += "<td>";
                    maquetado += "<div class='conteiner_two'>";
                    maquetado += "<div class='vote_block vote dotted-bottom'>";                    
                    maquetado += "<div class='player_name' data-url='http://polls.esmas.com/jugadores/torneo/"+setting.idTorneo+"/partido/"+setting.idEvento+"/jugador/" + idPlayer + "'><p>" + nombreJugador + "</p></div>";
                    maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
                    //--Pintar porcentaje
                    for (var a = 0; a < regPlayerDetail; a++) {
                        var playerDetailClubId = dataGamePlayer.poll['answers']['answer'][a]['club'];
                        var playerDetailPlayerId = dataGamePlayer.poll['answers']['answer'][a]['number'];
                        if (idEquipo == playerDetailClubId && numPlayer == playerDetailPlayerId) {
                            playerDetailPorcentaje = parseFloat(dataGamePlayer.poll['answers']['answer'][a]['percent']).toFixed(1);
                            votePlayer = parseInt(dataGamePlayer.poll['answers']['answer'][a]['conteo']);
                        }
                    }
                    maquetado += "<div class='afision'><p data-vote='"+votePlayer+"' class='textcolor-title1 dotted-left'>" + playerDetailPorcentaje + "</p></div>";
                    maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='calification  textcolor-title4'>";
                    maquetado += "<div><p>5</p></div>";
                    maquetado += "<div><p>6</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
                    maquetado += "<div><p>8</p></div>";
                    maquetado += "<div><p>9</p></div>";
                    maquetado += "<div><p>10</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='participated  textcolor-title4'>";
                    maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
                    maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                    maquetado += "</div>";
                    maquetado += "</div>";
                    maquetado += "</td>";
                    maquetado += "</tr>";
                }
                maquetado += "</tbody></table></td>";

                //ALINEACION VISITANTE---
                maquetado += "<td class='header_team_ext'>";
                maquetado += "<table class='head_table2'>";
                maquetado += "<tr>";
                maquetado += "<th><img alt='' src='" + logoVisitante + "'></th>";
                maquetado += "<th colspan='2'><p class='title_team textcolor-title1'>" + nombreVisit + "</p></th>";
                maquetado += "<th><p class='title_td textcolor-title4 dotted-right'>TD</p></th>";
                maquetado += "<th><p class='title_afision textcolor-title1'>Afici&oacuten</p></th>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td colspan='6' class='day_relative2'>";

                //Drop Equipo Visitante...
                maquetado += '<div class="jornada" style="z-index: -1160;">';
                maquetado += '<div class="wdg_lineup_012_dropdown drop2" style="z-index: 800;">';
                maquetado += '<div class="wdg_lineup_012_dropdowncontent" style="z-index: 790;">';
                maquetado += '<p id="nameJAVisit"></p>';
                maquetado += '<span class="sprite dropdown-gray"></span>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_lineup_012_listcontainer" style="z-index: 780;">';
                maquetado += '<ul class="wdg_lineup_012_dropdownlist" id="TIMPAVisit"></ul>  ';
                maquetado += '</div>';
                maquetado += '</div>'
                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 770;"></div>';

                maquetado += "</td>";
                maquetado += "</tr>";
                maquetado += "</table>";

                maquetado += "<table class='header_team_2'>";
                maquetado += "<thead><!-- Listbox --></thead>";
                maquetado += "<tbody>";
                for (var i = 0; i < regVisit; i++) {
                    nombreJugador = dataAlineacion[equipo[1]]['team'][i]['nickName'];
                    posicion = dataAlineacion[equipo[1]]['team'][i]['position'];
                    textoPosicion = wdg_mxm_rating.posicionTexto(posicion);
                    idEquipoVisit = dataAlineacion[equipo[1]]['idTeam'];
                    numPlayerVisit = dataAlineacion[equipo[1]]['team'][i]['number'];
                    idPlayer = dataAlineacion[equipo[1]]['team'][i]['guid'];
                    if (i == 0) {
                        maquetado += "<tr class='evaluation first_child'>";
                    } else {
                        maquetado += "<tr class='evaluation'>";
                    }
                    maquetado += "<td>";
                    maquetado += "<div class='conteiner_two'>";
                    maquetado += "<div class='vote_block vote dotted-bottom'>";
                    maquetado += "<div class='player_name' data-url='http://polls.esmas.com/jugadores/torneo/"+setting.idTorneo+"/partido/"+setting.idEvento+"/jugador/" + idPlayer + "'><p>" + nombreJugador + "</p></div>";
                    maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
                    //--Pintar porcentaje
                    for (var b = 0; b < regPlayerDetail; b++) {
                        var playerDetailClubIdVisit = dataGamePlayer.poll['answers']['answer'][b]['club'];
                        var playerDetailPlayerIdVisit = dataGamePlayer.poll['answers']['answer'][b]['number'];
                        if (idEquipoVisit == playerDetailClubIdVisit && numPlayerVisit == playerDetailPlayerIdVisit) {
                            playerDetailPorcVisit = parseFloat(dataGamePlayer.poll['answers']['answer'][b]['percent']).toFixed(1);
                            votePlayer = parseInt(dataGamePlayer.poll['answers']['answer'][b]['conteo']);
                        }
                    }
                    maquetado += "<div class='afision'><p data-vote='"+votePlayer+"' class='textcolor-title1 dotted-left'>" + playerDetailPorcVisit + "</p></div>";
                    maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='calification  textcolor-title4'>";
                    maquetado += "<div><p>5</p></div>";
                    maquetado += "<div><p>6</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
                    maquetado += "<div><p>8</p></div>";
                    maquetado += "<div><p>9</p></div>";
                    maquetado += "<div><p>10</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='participated  textcolor-title4'>";
                    maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
                    maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                    maquetado += "</div>";
                    maquetado += "</div>";
                    maquetado += "</td>";
                    maquetado += "</tr>";
                }
                maquetado += "</tbody></table></td></tr>";

                // ALINEACION BANCA 
                // Local
                maquetado += "<tr class='textcolor-title1'>";
                maquetado += "<td colspan='3' class='reserves'>Banca</td>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td class='header_team dotted-right'>";
                maquetado += "<table>";
                maquetado += "<tbody>";
                for (var i = 0; i < regbancaLocal; i++) {
                    nombreJugador = dataAlineacion[equipo[0]]['substitutes'][i]['nickName'];
                    posicion = dataAlineacion[equipo[0]]['substitutes'][i]['position'];
                    textoPosicion = wdg_mxm_rating.posicionTexto(posicion);
                    if (i == 0) {
                        maquetado += "<tr class='evaluation first_child'>";
                    } else {
                        maquetado += "<tr class='evaluation'>";
                    }
                    maquetado += "<td>";
                    maquetado += "<div class='conteiner_two'>";
                    maquetado += "<div class='vote_block vote dotted-bottom'>";
                    maquetado += "<div class='player_name'><p>" + nombreJugador + "</p></div>";
                    maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
                    maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>0.00</p></div>";
                    maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
                    maquetado += "</div>";
                                      
	                    maquetado += "<div class='calification  textcolor-title4'>";
	                    maquetado += "<div><p>5</p></div>";
	                    maquetado += "<div><p>6</p></div>";
	                    maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
	                    maquetado += "<div><p>8</p></div>";
	                    maquetado += "<div><p>9</p></div>";
	                    maquetado += "<div><p>10</p></div>";
	                    maquetado += "</div>";
	                    
	                    maquetado += "<div class='participated  textcolor-title4'>";
	                    maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
	                    maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
	                    maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
	                    maquetado += "</div>";
                   
                    maquetado += "</div>";
                    maquetado += "</td>";
                    maquetado += "</tr>";
                }

                maquetado += "</tbody></table></td>";

                // Visitante
                maquetado += "<td class='header_team_2 header_team_ext2'><table class='rate_team_2'><tbody>";
                for (var i = 0; i < regbancaVisit; i++) {
                    nombreJugador = dataAlineacion[equipo[1]]['substitutes'][i]['nickName'];
                    posicion = dataAlineacion[equipo[1]]['substitutes'][i]['position'];
                    textoPosicion = wdg_mxm_rating.posicionTexto(posicion);
                    if (i == 0) {
                        maquetado += "<tr class='evaluation first_child'>";
                    } else {
                        maquetado += "<tr class='evaluation'>";
                    }

                    maquetado += "<td>";
                    maquetado += "<div class='conteiner_two'>";
                    maquetado += "<div class='vote_block vote dotted-bottom'>";
                    maquetado += "<div class='player_name'><p>" + nombreJugador + "</p></div>";
                    maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
                    maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>0.00</p></div>";
                    maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
                    maquetado += "</div>";
                     
	                    maquetado += "<div class='calification  textcolor-title4'>";
	                    maquetado += "<div><p>5</p></div>";
	                    maquetado += "<div><p>6</p></div>";
	                    maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
	                    maquetado += "<div><p>8</p></div>";
	                    maquetado += "<div><p>9</p></div>";
	                    maquetado += "<div><p>10</p></div>";
	                    maquetado += "</div>";
	                    maquetado += "<div class='participated  textcolor-title4'>";
	                    maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
	                    maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
	                    maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
	                    maquetado += "</div>";
                    
                    maquetado += "</div>";
                    maquetado += "</td>";
                    maquetado += "</tr>";
                }
                maquetado += "</tbody>";
                maquetado += "</table>";
                maquetado += "</td></tr></table";
                maquetado += "</div>";

                wdg_mxm_rating.tagRating.html(maquetado);

                setting.idEquipo = dataMatchHeader[equipoMatch[0]]['id'];
                setting.idEquipo2 = dataMatchHeader[equipoMatch[1]]['id'];
                wdg_mxm_rating.urlfeedDropLocal = 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/clubes/' + setting.idEquipo + '/matchesclub.js',
                wdg_mxm_rating.urlfeedDropVisit = 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/clubes/' + setting.idEquipo2 + '/matchesclub.js',

                console.log('local '+wdg_mxm_rating.urlfeedDropLocal);
                console.log('Visitante '+wdg_mxm_rating.urlfeedDropVisit);

                (setting.idEquipo !== 0) ? wdg_mxm_rating.loadDrops(wdg_mxm_rating.urlfeedDropLocal, TIMPALocal) : '';
                (setting.idEquipo2 !== 0) ? setTimeout(function() {
                    wdg_mxm_rating.loadDrops(wdg_mxm_rating.urlfeedDropVisit, TIMPAVisit);
                }, 1000) : '';
            },

            loadDrops: function(feed, ID) {                
                $.ajax({
                    url: feed,
                    type: 'GET ',
                    dataType: 'jsonp',
                    jsonpCallback: 'effectivenessByTeam'
                })
                    .done(function(data) {
                        var tmp = "";
                        for (var i = 0; i < data.efectividad.length; i++) {
                            tmp += '<li><p data-matchid="' + data.efectividad[i].matchid + '">' + data.efectividad[i].weekName + '</p></li>';
                        };

                        $(ID).html(tmp);

                    })
                    .fail(function() {
                        console.log("error");
                    })
            },

            //Obtener los Detalles de los jugadores
            getGamePlayerDetail: function(idtorneo, idMatch, dataAlineacion, dataMatchHeader) {
            	setting.idEvento = idMatch;
                //console.log('http://mxm.televisadeportes.esmas.com/futbol/data/' + idtorneo + '/' + idMatch + '/gameplayerdetailjsonp.js');
                $.ajax({
                    url: 'http://mxm.televisadeportes.esmas.com/futbol/data/' + idtorneo + '/' + idMatch + '/gameplayerdetailjsonp.js',
                    type: "GET",
                    dataType: 'jsonp',
                    jsonpCallback: 'gameplayerdetail',
                    cache: false,
                    success: function(dataGamePlayer) {
                        
                        wdg_mxm_rating.pintaInfo(dataAlineacion, dataMatchHeader, dataGamePlayer);
                    },
                    error: function(data) {
                    	console.log("error en gatGame Player");                    	
                    }
                });
            },

            //Obtiene el logotipo de los equipos y nombre
            getInfo: function(idtorneo, idMatch, dataAlineacion) {
                //console.log('http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + idtorneo + '/' + idMatch + '/match_header.js');
                $.ajax({
                    url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + idtorneo + '/' + idMatch + '/match_header.js',
                    dataType: 'jsonp',
                    jsonpCallback: 'mxmheader',
                    cache: false,
                    success: function(dataMatchHeader) {
                        wdg_mxm_rating.getGamePlayerDetail(idtorneo, idMatch, dataAlineacion, dataMatchHeader)
                    },
                    error: function(data) {
                    	console.log("error en info");                    	
                    }

                });
            },

            //-- Carga la alineacion
            loadAlineacion: function(idtorneo, idMatch) {               
                //console.log('http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + idtorneo + '/' + idMatch + '/match_lineup.js');
                $.ajax({
                    url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + idtorneo + '/' + idMatch + '/match_lineup.js',
                    dataType: 'jsonp',
                    jsonpCallback: 'datagame',
                    cache: false,
                    success: function(dataAlineacion) {
                    	console.log("exitoso Load");
                        wdg_mxm_rating.getInfo(idtorneo, idMatch, dataAlineacion);
                    },                    
                    error: function(data) {
                    	console.log("error en load");                	
                    }                    
                });                
            },

            GolesAnotados: function(local, visit, namelocal, namevisit) {
                var maquetado = "",
                    localM,
                    visitM, finalM = "",
                    arrayGlobal = new Array();
                if (local !== '') {
                    for (var i = 0; i < local.length; i++) {
                        localM = "";
                        localM += '<div class="' + local[i].minute + ' block_container localTIMGol" id="goal' + local[i].minute + '">';
                        localM += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + namelocal + '</span></p></div>';
                        localM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + local[i].minute + ' \' ';
                        localM += (typeof(local[i].formaGol) !== "undefined") ? '<span class="textcolor-title2">' + local[i].formaGol + '</span></p></div>' : '</div>';
                        localM += '<div class="dotted-left marcador dotted-left"><p>' + local[i].current_score + '</p></div></div>';
                        arrayGlobal.push(localM);
                    };
                }
                if (visit !== '') {
                    for (var l = 0; l < visit.length; l++) {
                        visitM = "";
                        visitM += '<div class="' + visit[l].minute + ' block_container visitTIMGol" id="goal' + visit[l].minute + '">';
                        visitM += '<div class="jugador"><p>' + visit[l].nickName + '<span class="textcolor-title4">' + namevisit + '</span></p></div>';
                        visitM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + visit[l].minute + ' \' ';
                        visitM += (typeof(visit[l].formaGol) !== "undefined") ? '<span class="textcolor-title2">' + visit[l].formaGol + '</span></p></div>' : '</div>';
                        visitM += '<div class="dotted-left marcador dotted-left"><p>' + visit[l].current_score + '</p></div></div>';
                        arrayGlobal.push(visitM);
                    };
                }
                for (var d = 0; d < arrayGlobal.sort().length; d++) {
                    finalM += arrayGlobal.sort()[d];
                };

                maquetado += '<div class="convocados">';
                maquetado += finalM;
                maquetado += '</div>';

                wdg_mxm_rating.tagAlineacionGoles.html(maquetado);
                if (local === '' && visit === '') {
                    wdg_mxm_rating.tagAlineacionGoles.hide();
                    wdg_mxm_rating.tagAlineacionGoles.parents('.wdg_goalsanoted_01').hide('fast');
                }
            },

            wdgPenales: function(local, visit, nombreLocal, nombrevisit) {
                var maquetado = "",
                    content = "";
                for (var i = 0; i < local.length; i++) {
                    content += '<div class="block_container dotted-bottom" id="penal' + local[i].number + '">';
                    content += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + nombreLocal + '</span></p></div>';
                    content += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i></div>';
                    content += '<div class="dotted-left marcador dotted-left"><p>0-0</p></div>';
                    content += '</div>';
                };
                for (var j = 0; j < visit.length; j++) {
                    content += '<div class="block_container dotted-bottom" id="penal' + visit[j].number + '">';
                    content += '<div class="jugador"><p>' + visit[j].nickName + '<span class="textcolor-title4">' + nombrevisit + '</span></p></div>';
                    content += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i></div>';
                    content += '<div class="dotted-left marcador dotted-left"><p>0-0</p></div>';
                    content += '</div>';
                };


                maquetado += '<div class="wdg_mxm_penalties_01">';
                maquetado += '<div class="titulo textcolor-title1">Penales</div>';
                maquetado += '<div class="convocados">';
                maquetado += content;
                maquetado += '</div></div>';
                wdg_mxm_rating.tagwdgPenales.html(maquetado);

            },

            Modexpulsados: function(local, visit) {
                var arrayGlobal = new Array(),
                    itemshtml = "",
                    localm = "",
                    visitm = "";
                if (typeof(local) !== "undefined") {
                    for (var i = 0; i < local.length; i++) {
                        var minuto = 0;
                        for (var z = 0; z < local[i].actions.length; z++) {
                            if (local[i].actions[z].type === "amonestacion") {
                                minuto = z;
                            }
                        };
                        localm = "";
                        localm += '<div class="' + local[i].actions[minuto].minute + ' bodyt dotted-bottom" id="expulsado' + local[i].actions[minuto].minute + '">';
                        localm += '<div class="textcolor-title1">' + local[i].number + '</div>';
                        localm += '<div class="dotted-left name"><p>' + local[i].nickName + '</p></div>';
                        localm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm-yellowcard"></i>' + local[i].actions[minuto].minute + '\'</div>';
                        localm += '<div class="textcolor-title4 dotted-left">&nbsp;</div></div>';
                        arrayGlobal.push(localm);
                    };

                }
                if (typeof(visit) !== "undefined") {
                    for (var k = 0; k < visit.length; k++) {
                        var minuto = 0;
                        for (var y = 0; y < visit[k].actions.length; y++) {
                            if (visit[k].actions[y].type === "amonestacion") {
                                minuto = y;
                            }
                        };
                        visitm = "";
                        visitm += '<div class="' + visit[k].actions[minuto].minute + ' bodyt dotted-bottom" id="expulsado' + visit[k].actions[minuto].minute + '">';
                        visitm += '<div class="textcolor-title2">' + visit[k].number + '</div>';
                        visitm += '<div class="dotted-left name"><p>' + visit[k].nickName + '</p></div>';
                        visitm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm">&nbsp;</i></div>';
                        visitm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm-yellowcard"></i>' + visit[k].actions[minuto].minute + '\'</div></div>';
                        arrayGlobal.push(visitm);
                    };

                }
                for (var x = 0; x < arrayGlobal.sort().length; x++) {
                    itemshtml += arrayGlobal.sort()[x];
                };
                var maquetado = '<div class = "wdg_mxm_plcards_01" >';
                maquetado += '<div class="str_pleca_01 collapsable">';
                maquetado += '<div class="str_pleca_01_title">';
                maquetado += '<h3 class="background-color-pleca1">';
                maquetado += '<a href="#" title="Link Description" class="textcolor-title3 ui-link">Amonestados</a></h3></div></div>';
                maquetado += '<div class="convocados"><div class="head">';
                maquetado += '<div class="textcolor-title1 player">JUGADOR</div>';
                maquetado += '<div class="icon-team1"><img alt="" src="http://i2.esmas.com/img/spacer.gif" class="TIMimgLocal"></div>';
                maquetado += '<div class="icon-team2 dotted-left"><img alt="" src="http://i2.esmas.com/img/spacer.gif" class="TIMimgVisit"></div>';
                maquetado += '</div>' + itemshtml;
                maquetado += '</div></div></div>';

                if (typeof(visit) !== "undefined" || typeof(local) !== "undefined") {
                    wdg_mxm_rating.tagExpulsion.html(maquetado);
                }
            }, // Modexpulsados

            listenerInfo: function() {
                if ($("#datosTIMHeader").length) {
                    clearInterval(wdg_mxm_rating.intervaloVe);
                    var imgLocal = $("#localImgTIM").text();
                    var imgVisit = $("#visitImgTIM").text();
                    $(".TIMimgLocal").attr('src', imgLocal);
                    $(".TIMimgVisit").attr('src', imgVisit);


                }

            },
                        
            //FUNCIONES DE ACCION 
            funcionesAccion: function() {
            	
                // TODO: refactor for a better approach
                var $parent = $('.wdg_mxm_rating_01 table');
                var $dropdownAnchor = $parent.find('.wdg_lineup_01_dropdown');
                //var $firstItem = $('.wdg_lineup_01_dropdownlist li:first-child');
                var $dropdownItems = $parent.find('.wdg_lineup_01_dropdownlist li');
                var $listItems = $('.wdg_lineup_01_dropdownlist');
                                
                $('.wdg_rate_player_01 .wdg_lineup_01_listcontainer ul, .wdg_rate_player_01 .wdg_lineup_012_listcontainer ul').css('display','none');
                
                $('.wdg_lineup_01_dropdowncontent p').html(wdg_mxm_rating.jornadaText);
                $('.wdg_lineup_012_dropdowncontent p').html(wdg_mxm_rating.jornadaText);
                                                
                $dropdownAnchor.bind('click', function(evt) {
                    console.log("DROP 1");
                    //evt.preventDefault();
                    var lisItemsChild = $(this).children('.wdg_lineup_01_listcontainer').children('.wdg_lineup_01_dropdownlist:first-child');
                    var visibilidad = lisItemsChild.css('visibility');
                    visibilidadChild = $(this).children($listItems);
                    if (visibilidad == 'hidden') {
                    	console.log("entra a oculto");
                        lisItemsChild.css({
                        	display: 'block',
                            visibility: 'visible',
                            height: '176px',
                            'overflow-y': 'scroll',
                            'overflow-x': 'hidden'
                        });

                    } 
                    
                    lisItemsChild.find("p").unbind('click').click(function(event) {                    	
                    	console.log("click");
                        var idMatch = $(this).data("matchid");
                        idtorneo = setting.idTorneo;
                        
                        wdg_mxm_rating.loadAlineacion(idtorneo, idMatch);
                        setTimeout(function() {                          
                           wdg_mxm_rating.cargaFunciones();
                        }, 1200);                        
                            
                        var valorn = String($(this).text());
                        $("#nameJALocal").text(valorn);
                    });
                });

                $dropdownAnchor.bind('mouseleave', function(evt) {
                    evt.preventDefault();
                    var $listItems = $(this).find('.wdg_lineup_01_dropdownlist');
                    var visibilidad = $listItems.css('visibility');
                    if (visibilidad == 'visible') {
                        $listItems.css({
                            visibility: 'hidden',
                            height: '0px'
                        });
                    }
                });


                $dropdownItems.bind('click', function(evt) {
                    $('.wdg_lineup_01_dropdowncontent p').html($(this).find('p').html());
                });
                // TODO: refactor for a better approach                    
                var $parent2 = $('.wdg_mxm_rating_01 table');
                var $dropdownAnchor2 = $parent2.find('.wdg_lineup_012_dropdown');
                var $firstItem2 = $('.wdg_lineup_012_dropdowncontent li:first-child');
                var $dropdownItems2 = $parent2.find('.wdg_lineup_012_dropdownlist li');
                var $listItems2 = $('.wdg_lineup_012_dropdownlist');

                $('.wdg_lineup_012_dropdowncontent p').html($firstItem2.find('p').html());

                $dropdownAnchor2.bind('click', function(evt) {
                    //console.log("DROP 2");
                    evt.preventDefault();
                    var visibilidad = $(this).children('.wdg_lineup_012_listcontainer').children().css('visibility');
                    var lisItemsChild = $(this).children('.wdg_lineup_012_listcontainer').children();
                    if (visibilidad == 'hidden') {
                        lisItemsChild.css({
                        	display: 'block',
                            visibility: 'visible',
                            height: '176px',
                            'overflow-y': 'scroll',
                            'overflow-x': 'hidden'
                        });

                    } 

                    lisItemsChild.find("p").unbind('click').click(function(event) {
                        var idMatch = $(this).data("matchid");
                        idtorneo = setting.idTorneo;                        
                        wdg_mxm_rating.loadAlineacion(idtorneo, idMatch);                        
                        setTimeout(function() {                          
                           wdg_mxm_rating.cargaFunciones();
                        }, 1200);
                        
                        var valorn = String($(this).text());
                        console.log (valorn);
                        $("#nameJAVisit").text(valorn);
                    });
                });

                $dropdownAnchor2.bind('mouseleave', function(evt) {
                    evt.preventDefault();
                    var $listItems = $(this).find('.wdg_lineup_012_dropdownlist');
                    var visibilidad = $listItems.css('visibility');
                    if (visibilidad == 'visible') {
                        $listItems.css({
                            visibility: 'hidden',
                            height: '0px'
                        });
                    }
                });

                $dropdownItems2.bind('click', function(evt) {
                    evt.preventDefault();
                    $('.wdg_lineup_012_dropdowncontent p').html($(this).find('p').html());
                });

                //-- MOSTRAR VOTACION
                //----
                if ($(window).width() < 948) {
                    $('.wdg_rate_player_01 .vote_block').on('touchstart', function(event) {
                        $(this).next('div').toggle();
                        event.preventDefault(event);
                    });
                }

                $('.wdg_rate_player_01 .vote_block').click(function() {
                    $(this).next('div').show();
                    $(this).next().find('div').css('border-top', '0');
                    $(".participated").delay(5000).fadeOut('slow');
                });

                $('.wdg_rate_player_01 .calification div').mouseenter(function() {
                    $(this).children('p').removeClass();
                    $(this).children('p').addClass('textcolor-title1');
                }).mouseleave(function() {
                    $(this).children('p').removeClass();
                    $(this).children('p').addClass('textcolor-title4');
                });


                $('.wdg_rate_player_01 .calification div').on('click', function() {                    
                    var votacion = $(this).children('p').text();
                    var padre = $(this).parent('div');
                    var hermano = padre.siblings('div.vote_block.vote.dotted-bottom');
                    var url = hermano.children('div').data('url');
                    var votPorcentAfision = hermano.children('div.afision').find('p').text();
                    var totalVotes = hermano.children('div.afision').find('p').data('vote'); //Votos del jugador
                    console.log("___________________click___________________");
                    console.log("Total de votos del jugador:" + totalVotes);                    
                    console.log("Porcentaje:" + votPorcentAfision);
                    console.log("URL:"+ url);
                    console.log("Calificacion del Usuario:"+ votacion);
                    var calificacion = 1;
                    var totalaux = setting.votos + 1; //total de votos lo podemos obtener del Feed "poll-summary-conteo"
                                    
                    totalVotes = totalVotes + calificacion;                                     
                    //sprintf("%.2f",(($pollitem->{conteo}*100)/$totalaux));
                    var newPorcent = parseFloat((totalVotes*100)/totalaux).toFixed(1);                                                            
                    //actualiza el porcentaje
                    hermano.children('div.afision').find('p').html(newPorcent);
                                        
                    $(this).parents('.calification').prev('.calification').remove();
                    $(this).parents('.calification').next('.participated').find('div').css('border-bottom', '1px solid #ccc');
                    $(this).parents('.calification').next().show();
                    $(this).parents('.calification').remove();
                    $('.wdg_rate_player_01 .last_child div').css('border-bottom', '0');
                    $(".participated").delay(5000).fadeOut('slow');
                });

                $(".wdg_rate_player_01 .conteiner_two").mouseleave(function() {
                    $('.wdg_rate_player_01 .calification').hide();
                });

                /*Salgo del div calificaciones */
                $('.wdg_rate_player_01 .calification').mouseleave(function() {
                    $(this).hide();
                    $(this).prev('tr').prev('.vote').show();
                    $(this).prev('tr').show();
                });

            },
            
            cargaFunciones: function() {
            	console.log("carga funciones");
            	wdg_mxm_rating.funcionesAccion();
            }

        }

        $.when(wdg_mxm_rating.loadAlineacion(setting.idTorneo, setting.idEvento)).done(function() {
            setTimeout(function() {
                wdg_mxm_rating.cargaFunciones();
            }, 1200);

        });
                

    };


})(jQuery);