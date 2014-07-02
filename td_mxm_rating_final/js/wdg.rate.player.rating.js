/*!
 *   TIM Developer: Israel Viveros
 *   Version: 2.0.1
 *   Copyright: Televisa Interactive Media (2014)
 */
;
(function() {
    $.fn.wdgMxMRating = function(options) {
        var settings = $.extend({
            'idTorneo': 0,
            'idPartido': 0,
            'idEquipo': 0,
            'idEquipo2': 0,
            'title': '',
        }, options);
        var globalthis = this;

        var globalRating = {
            feedclublocal: "http://static-televisadeportes.esmas.com/sportsdata/futbol/data/" + settings.idTorneo + "/clubes/" + settings.idEquipo + "/matchesclub.js",
            feedclubVisit: "http://static-televisadeportes.esmas.com/sportsdata/futbol/data/" + settings.idTorneo + "/clubes/" + settings.idEquipo2 + "/matchesclub.js",
            callbackRating: "gameplayerdetail",
            callbackLineup: "datagame",
            callbackClub: "effectivenessByTeam",
            tagAlineacionGoles: $("#TIMAlineacionGoles"),
            tagwdgPenales: $("#TIMWdgPenales"),
            tagExpulsion: $("#ExpulsionTIM"),

            inicio: function() {
                (settings.idTorneo, settings.idPartido) ? globalRating.maquetado() : console.log("Error falta el Id match o el Id Tournament");

            },

            maquetado: function() {
                var maquetado = '<div class="wdg_rate_player_01" data-enhance="false">';
                maquetado += '<div class="qualifies textcolor-title4">Elige a tu jugador y vota</div>';
                maquetado += '<table>';
                maquetado += '<tr>';
                maquetado += '<td class="header_team">';
                maquetado += '<table class="head_table">';
                maquetado += '<tr >';
                maquetado += '<th><img alt="" src="" class="TIMimgLocal"></th>';
                maquetado += '<th colspan="3" class="equipo"><p class="title_team textcolor-title1" id="nameLocalTeam"></p></th>';
                maquetado += '<th><p class="title_td textcolor-title4 dotted-right"><!--TD--></p></th>';
                maquetado += '<th><p class="title_afision textcolor-title1">Votaci&oacute;n</p></th>';
                maquetado += '</tr>';
                maquetado += '<tr class="dotted-right">';
                maquetado += '<th colspan="6" class="day_relative">';

                maquetado += '<div class="jornada">';
                maquetado += '<div class="wdg_lineup_01_dropdown drop1">';
                maquetado += '<div class="wdg_lineup_01_dropdowncontent">';
                maquetado += '<p id="nameJornadaLocal"></p>';
                maquetado += '<span class="sprite dropdown-gray"></span>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_lineup_01_listcontainer">';
                maquetado += '<ul class="wdg_lineup_01_dropdownlist" id="localTIMDrop"></ul>';
                maquetado += '</div>';
                maquetado += '</div>';

                maquetado += '</div>';
                maquetado += '<div style="clear:both;"></div>';
                maquetado += '</th>';
                maquetado += '</tr>';
                maquetado += '</table>        ';
                maquetado += '<table class="dotted-right">';
                maquetado += '<thead></thead>';
                maquetado += '<tbody id="LocalTIMTitular">';



                maquetado += '</tbody>';
                maquetado += '</table>';
                maquetado += '</td>';
                maquetado += '<td class="header_team_ext">';
                maquetado += '<table class="head_table2">';
                maquetado += '<tr>';
                maquetado += '<th><img alt="" src="" class="TIMimgVisit"></th>';
                maquetado += '<th colspan="2"><p class="title_team textcolor-title1" id="nameVisitTeam"></p></th>';
                maquetado += '<th><p class="title_td textcolor-title4 dotted-right"><!--TD--></p></th>';
                maquetado += '<th><p class="title_afision textcolor-title1">Votaci&oacute;n</p></th>';
                maquetado += '</tr>';
                maquetado += '<tr>';
                maquetado += '<td colspan="6" class="day_relative2">';
                maquetado += '<div class="jornada">';
                maquetado += '<div class="wdg_lineup_012_dropdown drop2">';
                maquetado += '<div class="wdg_lineup_012_dropdowncontent">';
                maquetado += '<p id="nameJornadaVisit"></p>';
                maquetado += '<span class="sprite dropdown-gray"></span>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_lineup_012_listcontainer">';
                maquetado += '<ul class="wdg_lineup_012_dropdownlist" id="visitTIMDrop"></ul>  ';
                maquetado += '</div>';
                maquetado += '</div>';

                maquetado += '</div>';
                maquetado += '<div style="clear:both;"></div>';
                maquetado += '</td>';
                maquetado += '</tr>';
                maquetado += '</table>  ';
                maquetado += '<table class="header_team_2">';
                maquetado += '<thead></thead>';
                maquetado += '<tbody id="VisitTIMTitular">';


                maquetado += '</tbody>';
                maquetado += '</table>';
                maquetado += '</td>';
                maquetado += '</tr>';
                maquetado += '<tr class="textcolor-title1">';
                maquetado += '<td colspan="3" class="reserves">Banca</td>';
                maquetado += '</tr><tr>';
                maquetado += '<td class="header_team dotted-right">';
                maquetado += '<table>';

                maquetado += '<tbody id="LocalTIMBanca">';




                maquetado += '</tbody>';
                maquetado += '</table>';
                maquetado += '</td>';
                maquetado += '<td class="header_team_2 header_team_ext2">';
                maquetado += '<table class="rate_team_2">';

                maquetado += '<tbody id="VisitTIMBanca">';
                maquetado += '</tbody>';
                maquetado += '</table>';
                maquetado += '</td>';
                maquetado += '</tr>';
                maquetado += '</table>';

                maquetado += '<div class="errorrating" style="display:none">Aun no existe informacion, para este partido</div>';

                maquetado += '</div>';


                globalthis.css('display', 'none').html(maquetado).slideDown('slow', function() {
                    $(this).css('display', 'block');
                });

                globalRating.loadPlayers(settings.idPartido);
                globalRating.loadDrops();

            },

            givemePosition: function(str) {
                var posicion = "";
                switch (str) {
                    case "F":
                        return "Defensa";
                        break;
                    case "GK":
                        return "Portero";
                        break;
                    case "D":
                        return "Defensa";
                        break;
                    case "MF":
                        return "Medio Campo";
                        break;
                    case "F":
                        return "Delantero";
                        break;
                }
            },
            loadPlayers: function(idMatch, type) {
                $.ajax({
                    url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + settings.idTorneo + '/' + idMatch + '/match_lineup.js',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: globalRating.callbackLineup
                }).done(function(data) {
                    $("#nameLocalTeam").html(data.lineupLocal.name);
                    $("#nameVisitTeam").html(data.lineupVisit.name);
                    // Widgets Alineacion
                    if (typeof(type) === "undefined") {
                        if (typeof(data.goalsLocal) !== "undefined" || typeof(data.goalsVisit) !== "undefined") {
                            globalRating.GolesAnotados(data.goalsLocal, data.goalsVisit, data.lineupLocal.name, data.lineupVisit.name);
                        }
                        if (typeof(data.PenaltiesLocal) !== "undefined" || typeof(data.PenaltiesVisit) !== "undefined") {
                            globalRating.wdgPenales(data.PenaltiesLocal, data.PenaltiesVisit, data.lineupLocal.name, data.lineupVisit.name);
                        }
                        if (typeof(data.lineupLocal.penalization) !== "undefined" || typeof(data.lineupVisit.penalization) !== "undefined" || typeof(data.lineupLocal.expelled) !== "undefined" || typeof(data.lineupVisit.expelled) !== "undefined") {
                            var maqModEx = '<div class = "wdg_mxm_plcards_01" >';
                            maqModEx += '<div class="str_pleca_01 collapsable">';
                            maqModEx += '<div class="str_pleca_01_title">';
                            maqModEx += '<h3 class="background-color-pleca1">';
                            maqModEx += '<a href="#" title="Link Description" class="textcolor-title3 ui-link">Amonestados y Expulsados</a></h3></div></div>';
                            maqModEx += '<div class="convocados"><div class="head">';
                            maqModEx += '<div class="textcolor-title1 player">JUGADOR</div>';
                            maqModEx += '<div class="icon-team1"><img alt="" src="http://i2.esmas.com/img/spacer.gif" class="TIMimgLocal"></div>';
                            maqModEx += '<div class="icon-team2 dotted-left"><img alt="" src="http://i2.esmas.com/img/spacer.gif" class="TIMimgVisit"></div>';
                            maqModEx += '</div>';
                            maqModEx += '</div></div></div>';
                            globalRating.tagExpulsion.html(maqModEx).css('display', 'none');
                            globalRating.Modexpulsados(data.lineupLocal.penalization, data.lineupVisit.penalization, data.lineupLocal.expelled, data.lineupVisit.expelled);
                        }
                    }


                    var maquetado = "";

                    if (typeof(data.lineupLocal.team) !== "undefined" && typeof(data.lineupLocal.team) !== "undefined") {
                        //Equipo Local titular
                        for (var i = 0; i < data.lineupLocal.team.length; i++) {
                            var arreglo = data.lineupLocal.team[i];
                            maquetado += '<tr class="evaluation first_child" data-guid="' + arreglo.guid + '"> ';
                            maquetado += '<td>';
                            maquetado += '<div class="conteiner_two">';
                            maquetado += '<div class="vote_block vote dotted-bottom">';
                            maquetado += '<div class="player_name"><p>' + arreglo.nickName + '</p></div>';
                            maquetado += '<div class="div"><p class="textcolor-title4 porcentajetd">&nbsp;&nbsp;</p></div> ';
                            maquetado += '<div class="afision"><p class="textcolor-title1 dotted-left porcentajeplayer">&nbsp;&nbsp;</p></div> ';
                            maquetado += '<div class="position"><p class="textcolor-title4">' + globalRating.givemePosition(arreglo.position) + '</p></div>';
                            maquetado += '</div>';
                            maquetado += '<div class="calification  textcolor-title4">';
                            maquetado += '<div><p class="voto5">5</p></div>';
                            maquetado += '<div><p class="voto6">6</p></div>';
                            maquetado += '<div><div class="qualifies">califica al jugador</div><p class="voto7">7</p></div>';
                            maquetado += '<div><p class="voto8">8</p></div>';
                            maquetado += '<div><p class="voto9">9</p></div>';
                            maquetado += '<div><p class="voto10">10</p></div>';
                            maquetado += '</div>';
                            maquetado += '<div class="participated  textcolor-title4">';
                            maquetado += '<div class="voted"><p>Gracias por votar</p></div>';
                            maquetado += '<div><div class="qualifies">califica al jugador</div></div>';
                            maquetado += '<div class="check"><i class="tvsa-like"></i></div>';
                            maquetado += '</div>';
                            maquetado += '</div>';
                            maquetado += '</td>';
                            maquetado += '</tr>';
                        };
                        $("#LocalTIMTitular").html(maquetado);

                        //Equipo local banca
                        maquetado = "";
                        for (var e = 0; e < data.lineupLocal.substitutes.length; e++) {
                            var arreglo = data.lineupLocal.substitutes[e];
                            maquetado += '<tr class="evaluation first_child" data-guid="' + arreglo.guid + '"> ';
                            maquetado += '<td>';
                            maquetado += '<div class="conteiner_two">';
                            maquetado += '<div class="vote_block vote dotted-bottom">';
                            maquetado += '<div class="player_name"><p>' + arreglo.nickName + '</p></div>';
                            maquetado += '<div class="div"><p class="textcolor-title4 porcentajetd">&nbsp;&nbsp;</p></div> ';
                            maquetado += '<div class="afision"><p class="textcolor-title1 dotted-left porcentajeplayer">&nbsp;&nbsp;</p></div> ';
                            maquetado += '<div class="position"><p class="textcolor-title4">' + globalRating.givemePosition(arreglo.position) + '</p></div>';
                            maquetado += '</div>';
                            maquetado += '<div class="calification  textcolor-title4">';
                            maquetado += '<div><p class="voto5">5</p></div>';
                            maquetado += '<div><p class="voto6">6</p></div>';
                            maquetado += '<div><div class="qualifies">califica al jugador</div><p class="voto7">7</p></div>';
                            maquetado += '<div><p class="voto8">8</p></div>';
                            maquetado += '<div><p class="voto9">9</p></div>';
                            maquetado += '<div><p class="voto10">10</p></div>';
                            maquetado += '</div>';
                            maquetado += '<div class="participated  textcolor-title4">';
                            maquetado += '<div class="voted"><p>Gracias por votar</p></div>';
                            maquetado += '<div><div class="qualifies">califica al jugador</div></div>';
                            maquetado += '<div class="check"><i class="tvsa-like"></i></div>';
                            maquetado += '</div>';
                            maquetado += '</div>';
                            maquetado += '</td>';
                            maquetado += '</tr>';
                        };
                        $("#LocalTIMBanca").html(maquetado);


                        maquetado = "";
                        //Equipo visitante Titulares
                        for (var a = 0; a < data.lineupVisit.team.length; a++) {
                            var arreglo = data.lineupVisit.team[a];
                            maquetado += '<tr class="evaluation first_child" data-guid="' + arreglo.guid + '"> ';
                            maquetado += '<td>';
                            maquetado += '<div class="conteiner_two">';
                            maquetado += '<div class="vote_block vote dotted-bottom">';
                            maquetado += '<div class="player_name"><p>' + arreglo.nickName + '</p></div>';
                            maquetado += '<div class="div"><p class="textcolor-title4 porcentajetd"></p></div> ';
                            maquetado += '<div class="afision"><p class="textcolor-title1 dotted-left porcentajeplayer">&nbsp;&nbsp;</p></div> ';
                            maquetado += '<div class="position"><p class="textcolor-title4">' + globalRating.givemePosition(arreglo.position) + '</p></div>';
                            maquetado += '</div>';
                            maquetado += '<div class="calification  textcolor-title4">';
                            maquetado += '<div><p class="voto5">5</p></div>';
                            maquetado += '<div><p class="voto6">6</p></div>';
                            maquetado += '<div><div class="qualifies">califica al jugador</div><p class="voto7">7</p></div>';
                            maquetado += '<div><p class="voto8">8</p></div>';
                            maquetado += '<div><p class="voto9">9</p></div>';
                            maquetado += '<div><p class="voto10">10</p></div>';
                            maquetado += '</div>';
                            maquetado += '<div class="participated  textcolor-title4">';
                            maquetado += '<div class="voted"><p>Gracias por votar</p></div>';
                            maquetado += '<div><div class="qualifies">califica al jugador</div></div>';
                            maquetado += '<div class="check"><i class="tvsa-like"></i></div>';
                            maquetado += '</div>';
                            maquetado += '</div>';
                            maquetado += '</td>';
                            maquetado += '</tr>';
                        };
                        $("#VisitTIMTitular").html(maquetado);

                        //Equipo visitante banca
                        maquetado = "";
                        for (var r = 0; r < data.lineupVisit.substitutes.length; r++) {
                            var arreglo = data.lineupVisit.substitutes[r];
                            maquetado += '<tr class="evaluation first_child" data-guid="' + arreglo.guid + '"> ';
                            maquetado += '<td>';
                            maquetado += '<div class="conteiner_two">';
                            maquetado += '<div class="vote_block vote dotted-bottom">';
                            maquetado += '<div class="player_name"><p>' + arreglo.nickName + '</p></div>';
                            maquetado += '<div class="div"><p class="textcolor-title4 porcentajetd">&nbsp;&nbsp;</p></div> ';
                            maquetado += '<div class="afision"><p class="textcolor-title1 dotted-left porcentajeplayer">&nbsp;&nbsp;</p></div> ';
                            maquetado += '<div class="position"><p class="textcolor-title4">' + globalRating.givemePosition(arreglo.position) + '</p></div>';
                            maquetado += '</div>';
                            maquetado += '<div class="calification  textcolor-title4">';
                            maquetado += '<div><p class="voto5">5</p></div>';
                            maquetado += '<div><p class="voto6">6</p></div>';
                            maquetado += '<div><div class="qualifies">califica al jugador</div><p class="voto7">7</p></div>';
                            maquetado += '<div><p class="voto8">8</p></div>';
                            maquetado += '<div><p class="voto9">9</p></div>';
                            maquetado += '<div><p class="voto10">10</p></div>';
                            maquetado += '</div>';
                            maquetado += '<div class="participated  textcolor-title4">';
                            maquetado += '<div class="voted"><p>Gracias por votar</p></div>';
                            maquetado += '<div><div class="qualifies">califica al jugador</div></div>';
                            maquetado += '<div class="check"><i class="tvsa-like"></i></div>';
                            maquetado += '</div>';
                            maquetado += '</div>';
                            maquetado += '</td>';
                            maquetado += '</tr>';
                        };
                        $("#VisitTIMBanca").html(maquetado);



                        globalRating.loadfeedrating(idMatch);
                        globalRating.funcionesNaat();
                    } else {
                        $(".errorRating").css('display', 'block');
                    }

                    setTimeout(function() {
                        if ($("#visitTIMDrop li").length === 0) {
                            $("#nameJornadaVisit").html(data.week).css('cursor', 'auto');;
                        }
                        if ($("#localTIMDrop li").length === 0) {
                            $("#nameJornadaLocal").html(data.week).css('cursor', 'auto');;
                        }
                    }, 500);



                }).fail(function() {
                    console.log("error");
                })


            },

            loadfeedrating: function(idMatch) {
                $.ajax({
                    url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + settings.idTorneo + '/' + idMatch + '/gameplayerdetailjsonp.js',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'gameplayerdetail',
                    cache: false
                })
                    .done(function(data) {
                        //Best jugadores
                        globalRating.bestRating(data);

                        for (var i = 0; i < data.poll.length; i++) {
                            if (typeof(data.poll[i].answers) !== "undefined" && typeof(data.poll[i].answers.answer[0]) !== "undefined") {
                                var arreglo = data.poll[i].answers.answer[0];
                                var selectortmp = $('tr[data-guid="' + arreglo.value + '"]');

                                //console.log(data.poll[i].answers.answer[0])
                                selectortmp.attr({
                                    'data-guidpoll': arreglo.guid_poll,
                                    'data-guidsection': arreglo.guid_section,
                                    'data-guidfield': arreglo.guid_field
                                });
                                //Calificaciones
                                selectortmp.find('.voto5').attr('data-guidfvl', arreglo.guid_resp[0].guid_fvl);
                                selectortmp.find('.voto6').attr('data-guidfvl', arreglo.guid_resp[1].guid_fvl);
                                selectortmp.find('.voto7').attr('data-guidfvl', arreglo.guid_resp[2].guid_fvl);
                                selectortmp.find('.voto8').attr('data-guidfvl', arreglo.guid_resp[3].guid_fvl);
                                selectortmp.find('.voto9').attr('data-guidfvl', arreglo.guid_resp[4].guid_fvl);
                                selectortmp.find('.voto10').attr('data-guidfvl', arreglo.guid_resp[5].guid_fvl);

                                selectortmp.find(".porcentajeplayer").html(arreglo.percent);
                            }

                        };
                        $(".wdg_lineup_012_listcontainer ul li, .wdg_lineup_01_listcontainer ul li").unbind("click").bind('click', function(event) {
                            globalRating.loadPlayers($(this).data("id"), 'drop');
                        });

                        globalthis.find(".voto5, .voto6, .voto7, .voto8, .voto9, .voto10").unbind('click').bind('click', function(event) {
                            event.preventDefault();
                            var parent = $(this).parents('tr.evaluation');
                            var urlVoto = 'http://polls.esmas.com/calcularesultado/arreglo/@@@' + parent.data('guidpoll') + '@@@' + parent.data('guidsection') + '@@@' + parent.data('guidfield') + '@@@[' + parent.data('guidfield') + '&&&' + $(this).data('guidfvl') + ']@@@@@@Sitio@@@MXM@@@Deportes@@@Futbol@@@Token-@@@CSIE-@@@Urlactual@@@SexodelUsuario@@@VIP@@@MX@@@Cuidad@@@Estado@@@1398889521@@@Mozilla@@@an%20unknown%20version@@@Mac@@@1440%20x%20900@@@Yes@@@Previous%20Page@@@es-mx@@@es-mx@@@es/voto/' + parent.data('guidfield') + '&&&' + $(this).data('guidfvl') + '';

                            var pingpolls = new Image();
                            pingpolls.src = urlVoto;

                            //console.log('guid poll: ' + parent.data('guidpoll'));
                            //console.log('guid fvl: ' + $(this).data('guidfvl'));


                        });
                    })
                    .fail(function() {
                        console.log("error");
                    });




            },

            loadDrops: function() {
                $.ajax({
                    url: globalRating.feedclublocal,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: globalRating.callbackClub,
                    cache: false
                }).done(function(data) {
                    var maquetado = "";
                    for (var i = 0; i < data.efectividad.length; i++) {
                        var arreglo = data.efectividad[i];
                        maquetado += '<li data-id="' + arreglo.matchid + '"><p>' + arreglo.weekName + '</p></li>';
                    };
                    $("#localTIMDrop").html(maquetado);
                    $("#nameJornadaLocal").html(data.efectividad[data.efectividad.length - 1].weekName);
                }).fail(function() {
                    console.log("error");
                });

                setTimeout(function() {
                    $.ajax({
                        url: globalRating.feedclubVisit,
                        type: 'GET',
                        dataType: 'jsonp',
                        jsonpCallback: globalRating.callbackClub,
                        cache: false
                    }).done(function(data) {
                        var maquetado = "";
                        for (var d = 0; d < data.efectividad.length; d++) {
                            var arreglo = data.efectividad[d];
                            maquetado += '<li data-id="' + arreglo.matchid + '"><p>' + arreglo.weekName + '</p></li>';
                        };
                        $("#visitTIMDrop").html(maquetado);
                        $("#nameJornadaVisit").html(data.efectividad[data.efectividad.length - 1].weekName);


                    }).fail(function() {
                        console.log("error");
                    });
                }, 500);


                $(".wdg_lineup_012_listcontainer ul, .wdg_lineup_01_listcontainer ul").css('height', '0px');


            },

            bestRating: function(dataGamePlayer) {
                var maquetado = "";
                var infoArray = new Array();


                for (var i = 0; i < dataGamePlayer.poll.length; i++) {
                    //console.log(dataGamePlayer.poll[i].answers['answer'])
                    for (var f = 0; f < dataGamePlayer.poll[i].answers['answer'].length; f++) {
                        //console.log(dataGamePlayer.poll[i].answers['answer'][f]);
                        infoArray.push({
                            id: i,
                            porcentaje: parseFloat(dataGamePlayer.poll[i].answers['answer'][f]['percent']).toFixed(1),
                            foto: dataGamePlayer.poll[i].answers['answer'][f]['photoRaiting'],
                            nombre: dataGamePlayer.poll[i].answers['answer'][f]['namePlayer'],
                            posicion: globalRating.givemePosition(dataGamePlayer.poll[i].answers['answer'][f]['position']),
                            club: dataGamePlayer.poll[i].answers['answer'][f]['clubname']
                        });

                    };
                };





                infoArray.sort(function(a, b) {
                    return b.porcentaje - a.porcentaje;
                });

                //Validar que el campo de la foto no este vacio...
                if (infoArray[0]['foto'] == '' || infoArray[0]['foto'] == null) {
                    var valorFoto0 = 'http://placehold.it/300x225';
                } else {
                    var valorFoto0 = infoArray[0]['foto'];
                }
                if (infoArray[1]['foto'] == '' || infoArray[1]['foto'] == null) {
                    var valorFoto1 = 'http://placehold.it/300x225';
                } else {
                    var valorFoto1 = infoArray[1]['foto'];
                }
                if (infoArray[2]['foto'] == '' || infoArray[2]['foto'] == null) {
                    var valorFoto2 = 'http://placehold.it/300x225';
                } else {
                    var valorFoto2 = infoArray[2]['foto'];
                }

                maquetado += "<div class='wdg_rating_main_01'>";
                maquetado += "<div class='wdg_rating_main_01_player'>";
                maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
                maquetado += "<p class='average textcolor-title4 dotted-right'>10</p>";
                maquetado += "<p class='average_total textcolor-title1'>" + infoArray[0]['porcentaje'] + "</p>";
                maquetado += "<img alt='' class='father' src='" + valorFoto0 + "' width='300' height='225'>";
                maquetado += "<p class='name'>" + infoArray[0]['nombre'] + "</p>";
                maquetado += "<p class='activity textcolor-title4'>" + infoArray[0]['posicion'] + "</p>";
                maquetado += "<p class='activityn textcolor-title1'>" + infoArray[0]['club'] + "</p>";
                maquetado += "</div>";
                maquetado += "<div class='wdg_rating_main_01_players dotted-bottom'>";
                maquetado += "<img alt='' src='" + valorFoto1 + "' width='136' height='102'>";
                maquetado += "<div class='player_data dotted-bottom'>";
                maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
                maquetado += "<p class='average textcolor-title4 dotted-right'>10</p>";
                maquetado += "<p class='average_total textcolor-title1'>" + infoArray[1]['porcentaje'] + "</p>";
                maquetado += "</div>";
                maquetado += "<div class='player_data2'>";
                maquetado += "<p class='name'>" + infoArray[1]['nombre'] + "</p>";
                maquetado += "<p class='activity textcolor-title4'>" + infoArray[1]['posicion'] + "</p>";
                maquetado += "<p class='activityn textcolor-title1'>" + infoArray[1]['club'] + "</p>";
                maquetado += "</div>";
                maquetado += "</div>";
                maquetado += "<div class='separator'></div>";
                maquetado += "<div class='wdg_rating_main_01_players'>";
                maquetado += "<img alt='' src='" + valorFoto2 + "' width='136' height='102'>";
                maquetado += "<div class='player_data dotted-bottom'>";
                maquetado += "<p class='activity_title textcolor-title4'>Promedio</p>";
                maquetado += "<p class='average textcolor-title4 dotted-right'>10</p>";
                maquetado += "<p class='average_total textcolor-title1'>" + infoArray[2]['porcentaje'] + "</p>";
                maquetado += "</div>";
                maquetado += "<div class='player_data2'>";
                maquetado += "<p class='name'>" + infoArray[2]['nombre'] + "</p>";
                maquetado += "<p class='activity textcolor-title4'>" + infoArray[2]['posicion'] + "</p>";
                maquetado += "<p class='activityn textcolor-title1'>" + infoArray[2]['club'] + "</p>";
                maquetado += "</div>";
                maquetado += "</div>";
                maquetado += "</div>";
                maquetado += "</div>";

                $("#RatingMxMBest").css('display', 'none').html(maquetado).slideDown('slow', function() {
                    $(this).css('display', 'block');
                });

            },

            funcionesNaat: function() {
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
                    $(this).children('p').removeClass('textcolor-title1');
                    $(this).children('p').addClass('textcolor-title1');
                }).mouseleave(function() {
                    $(this).children('p').removeClass('textcolor-title4');
                    $(this).children('p').addClass('textcolor-title4');
                });

                $('.wdg_rate_player_01 .calification div').on('click', function() {
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


                if (!$.browser.opera) {
                    // select element styling
                    $('.wdg_rate_player_01 select.team1').each(function() {
                        var title = $(this).attr('title');
                        if ($.browser.msie && $.browser.version < 9) {

                        } else {
                            if ($('option:selected', this).val() != '') title = $('option:selected', this).text();
                            $(this)
                                .css({
                                    'z-index': 10,
                                    'opacity': 0,
                                    '-khtml-appearance': 'none'
                                })
                                .after('<span class="select1">' + title + '</span>')
                                .change(function() {
                                    val = $('option:selected', this).text();
                                    $(this).next().text(val);
                                })
                        }
                    });

                    // select element styling
                    $('.wdg_rate_player_01 select.team2').each(function() {
                        var title = $(this).attr('title');
                        if ($.browser.msie && $.browser.version < 9) {

                        } else {
                            if ($('option:selected', this).val() != '') title = $('option:selected', this).text();
                            $(this)
                                .css({
                                    'z-index': 10,
                                    'opacity': 0,
                                    '-khtml-appearance': 'none'
                                })
                                .after('<span class="select2">' + title + '</span>')
                                .change(function() {
                                    val = $('option:selected', this).text();
                                    $(this).next().text(val);
                                })
                        }
                    });
                };









                // TODO: refactor for a better approach
                var $parent = $('.wdg_rate_player_01');
                var $dropdownAnchor = $parent.find('.wdg_lineup_01_dropdown');
                var $firstItem = $('.wdg_lineup_01_dropdownlist li:first-child');
                var $dropdownItems = $parent.find('.wdg_lineup_01_dropdownlist li');
                var $listItems = $('.wdg_lineup_01_dropdownlist')
                //$('.wdg_lineup_01_dropdowncontent p').html($firstItem.find('p').html());


                $dropdownAnchor.unbind("click").bind('click', function(evt) {
                    evt.preventDefault();
                    var lisItemsChild = $(this).children('.wdg_lineup_01_listcontainer').children('.wdg_lineup_01_dropdownlist:first-child');
                    var visibilidad = lisItemsChild.css('visibility');
                    var lenghtli = lisItemsChild.children('li').length;
                    visibilidadChild = $(this).children($listItems);
                    if (visibilidad == 'hidden' && lenghtli > 0) {
                        lisItemsChild.css({
                            visibility: 'visible',
                            height: '176px',
                            'overflow-y': 'scroll',
                            'overflow-x': 'hidden'
                        });

                    } else {
                        lisItemsChild.css({
                            visibility: 'hidden',
                            height: '0px'
                        });
                    }
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


                $dropdownItems.unbind("click").bind('click', function(evt) {
                    evt.preventDefault();
                    $(this).parents('.wdg_rate_player_01').find('.wdg_lineup_01_dropdowncontent p').html($(this).find('p').html());
                });




                // TODO: refactor for a better approach
                var $parent2 = $('.wdg_rate_player_01');
                var $dropdownAnchor2 = $parent2.find('.drop2');
                var $firstItem2 = $('.wdg_lineup_012_dropdownlist li:first-child');
                var $dropdownItems2 = $parent2.find('.wdg_lineup_012_dropdownlist li');
                var $listItems2 = $('.wdg_lineup_012_dropdownlist');


                //$('.wdg_lineup_012_dropdowncontent p').html($firstItem2.find('p').html());
                $dropdownAnchor2.unbind("click").bind('click', function(evt) {
                    evt.preventDefault();
                    var visibilidad = $(this).children('.wdg_lineup_012_listcontainer').children().css('visibility');
                    var $lengli2 = $listItems2.children('li').length;

                    var lisItemsChild = $(this).children('.wdg_lineup_012_listcontainer').children();

                    if (visibilidad == 'hidden' && $lengli2 > 0) {
                        lisItemsChild.css({
                            visibility: 'visible',
                            height: '176px',
                            'overflow-y': 'scroll',
                            'overflow-x': 'hidden'
                        });

                    } else {
                        lisItemsChild.css({
                            visibility: 'hidden',
                            height: '0px'
                        });
                    }
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

                $dropdownItems2.unbind("click").bind('click', function(evt) {
                    evt.preventDefault();
                    $parent2.find('.wdg_lineup_012_dropdowncontent p').html($(this).find('p').html());
                });

            },

            //Metodos de alineacion

            GolesAnotados: function(local, visit, namelocal, namevisit) {
                var maquetado = "",
                    localM,
                    visitM, finalM = "",
                    TipoGolLocal = "",
                    TipoGolVisit = "",
                    tmpGol = "",
                    golicon = "";
                arrayGlobal = new Array();
                if (typeof(local) !== "undefined") {
                    for (var i = 0; i < local.length; i++) {
                        tmpGol = local[i].formaGol;
                        TipoGolLocal = (tmpGol === "Gol de Fuera del Area" || tmpGol === "Gol de Penal" || tmpGol === "Autogol" || tmpGol === "Gol de Tiro Libre") ? tmpGol : '';
                        if (TipoGolLocal === "" && local[i].assistant_player !== "") {
                            TipoGolLocal = "Asistencia de " + local[i].assistant_player;
                        }
                        if (tmpGol === "Autogol") {
                            golicon = 'tvsa-mxm-owngoal';
                        } else {
                            golicon = 'tvsa-mxm-goal';
                        }

                        localM = "";
                        localM += '<div class="' + local[i].minute + ' block_container localTIMGol" id="goal' + local[i].minute + '">';
                        localM += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + namelocal + '</span></p></div>';
                        localM += '<div class="estadistica dotted-left"><i class="' + golicon + '"></i><p class="grado textcolor-title4">' + local[i].minute + ' \' ';
                        localM += (TipoGolLocal !== "") ? '<span class="textcolor-title2">' + TipoGolLocal + '</span></p></div>' : '</div>';
                        localM += '<div class="dotted-left marcador dotted-left"><p>' + local[i].current_score + '</p></div></div>';
                        arrayGlobal.push(localM);
                    };
                }
                if (typeof(visit) !== 'undefined') {
                    for (var l = 0; l < visit.length; l++) {
                        tmpGol = visit[l].formaGol;
                        TipoGolVisit = (tmpGol === "Gol de Fuera del Area" || tmpGol === "Gol de Penal" || tmpGol === "Autogol" || tmpGol === "Gol de Tiro Libre") ? tmpGol : '';
                        if (TipoGolVisit === "" && visit[l].assistant_player !== "") {
                            TipoGolVisit = "Asistencia de " + visit[l].assistant_player;
                        }
                        if (tmpGol === "Autogol") {
                            golicon = 'tvsa-mxm-owngoal';
                        } else {
                            golicon = 'tvsa-mxm-goal';
                        }
                        visitM = "";
                        visitM += '<div class="' + visit[l].minute + ' block_container visitTIMGol" id="goal' + visit[l].minute + '">';
                        visitM += '<div class="jugador"><p>' + visit[l].nickName + '<span class="textcolor-title4">' + namevisit + '</span></p></div>';
                        visitM += '<div class="estadistica dotted-left"><i class="' + golicon + '"></i><p class="grado textcolor-title4">' + visit[l].minute + ' \' ';
                        visitM += (TipoGolVisit !== "") ? '<span class="textcolor-title2">' + TipoGolVisit + '</span></p></div>' : '</div>';
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

                globalRating.tagAlineacionGoles.html(maquetado);
                if (local === '' && visit === '') {
                    globalRating.tagAlineacionGoles.hide();
                    globalRating.tagAlineacionGoles.parents('.wdg_goalsanoted_01').hide('fast');
                }



            },
            wdgPenales: function(local, visit, nombreLocal, nombrevisit) {
                var maquetado = "",
                    content = "",
                    globalcon = new Array();
                if (typeof(local) !== "undefined") {
                    for (var i = 0; i < local.length; i++) {
                        var marcador = local[i].current_score;
                        var spliMarcador = marcador.substring(1, 2) + '-' + marcador.substring(9, 10);
                        var clase = (local[i].type === "penalAnotadoSerie") ? 'tvsa-mxm-goal' : 'tvsa-mxm-penalFallado';
                        content = '<div class="block_container dotted-bottom" id="penal' + local[i].number + local[i].minuto + '">';
                        content += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + nombreLocal + '</span></p></div>';
                        content += '<div class="estadistica dotted-left"><i class="' + clase + '"></i></div>';
                        content += '<div class="dotted-left marcador dotted-left"><p>' + spliMarcador + '</p></div>';
                        content += '</div>';
                        globalcon[local[i].minuto] = content;
                    };
                }
                if (typeof(visit) !== "undefined") {
                    for (var j = 0; j < visit.length; j++) {
                        var marcador = visit[j].current_score;
                        var spliMarcador = marcador.substring(1, 2) + '-' + marcador.substring(9, 10);
                        var clase = (visit[j].type === "penalAnotadoSerie") ? 'tvsa-mxm-goal' : 'tvsa-mxm-penalFallado';
                        content = '<div class="block_container dotted-bottom" id="penal' + visit[j].number + visit[j].minuto + '">';
                        content += '<div class="jugador"><p>' + visit[j].nickName + '<span class="textcolor-title4">' + nombrevisit + '</span></p></div>';
                        content += '<div class="estadistica dotted-left"><i class="' + clase + '"></i></div>';
                        content += '<div class="dotted-left marcador dotted-left"><p>' + spliMarcador + '</p></div>';
                        content += '</div>';
                        globalcon[visit[j].minuto] = content;
                    };
                }

                if (globalcon.length !== 0) {
                    maquetado += '<div class="wdg_mxm_penalties_01">';
                    maquetado += '<div class="titulo textcolor-title1">Penales</div>';
                    maquetado += '<div class="convocados">';
                    for (var f = 0; f < globalcon.length; f++) {
                        maquetado += (typeof(globalcon[f]) !== "undefined") ? globalcon[f] : '';
                    };
                    //maquetado += content;
                    maquetado += '</div></div>';
                    globalRating.tagwdgPenales.html(maquetado);
                    globalRating.tagAlineacionGoles.parents('.wdg_goalsanoted_01').show('slow');
                }

            },
            Modexpulsados: function(local, visit, rojaLocal, rojaVisit) {
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
                        //arrayGlobal.push(localm);
                        arrayGlobal[local[i].actions[minuto].minute] = localm;
                    };
                }
                if (typeof(rojaLocal) !== "undefined") {
                    for (var j = 0; j < rojaLocal.length; j++) {
                        var minuto = rojaLocal[j].minute,
                            clase = (rojaLocal[j].type === "segundaAmonestacion") ? 'tvsa-mxm-secondyellowcard' : 'tvsa-mxm-redcard';
                        localm = "";
                        localm += '<div class="' + minuto + ' bodyt dotted-bottom" id="expulsado' + minuto + '">';
                        localm += '<div class="textcolor-title1">' + rojaLocal[j].number + '</div>';
                        localm += '<div class="dotted-left name"><p>' + rojaLocal[j].nickName + '</p></div>';
                        localm += '<div class="textcolor-title4 dotted-left"><i class="' + clase + '"></i>' + minuto + '\'</div>';
                        localm += '<div class="textcolor-title4 dotted-left">&nbsp;</div></div>';
                        //arrayGlobal.push(localm);
                        arrayGlobal[minuto] = localm;
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
                        //arrayGlobal.push(visitm);
                        arrayGlobal[visit[k].actions[minuto].minute] = visitm;
                    };

                }
                if (typeof(rojaVisit) !== "undefined") {
                    for (var r = 0; r < rojaVisit.length; r++) {
                        var minuto = rojaVisit[r].minute,
                            clase = (rojaVisit[r].type === "segundaAmonestacion") ? 'tvsa-mxm-secondyellowcard' : 'tvsa-mxm-redcard';
                        visitm = "";
                        visitm += '<div class="' + minuto + ' bodyt dotted-bottom" id="expulsado' + minuto + '">';
                        visitm += '<div class="textcolor-title2">' + rojaVisit[r].number + '</div>';
                        visitm += '<div class="dotted-left name"><p>' + rojaVisit[r].nickName + '</p></div>';
                        visitm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm">&nbsp;</i></div>';
                        visitm += '<div class="textcolor-title4 dotted-left"><i class="' + clase + '"></i>' + minuto + '\'</div></div>';
                        //arrayGlobal.push(visitm);
                        arrayGlobal[minuto] = visitm;
                    };
                }

                for (var x = 0; x < arrayGlobal.sort().length; x++) {
                    var temp = arrayGlobal.sort()[x];

                    itemshtml += (typeof(temp) !== "undefined") ? temp : '';
                };

                if (itemshtml !== "") {
                    globalRating.tagExpulsion.show('fast', function() {
                        $(this).css('display', 'block');
                    });
                    globalRating.tagExpulsion.find(".convocados").append(itemshtml);
                    globalRating.tagExpulsion.find(".bodyt").slideDown('slow', function() {
                        $(this).css('display', 'block');
                    });
                }





            } // Modexpulsados




        };

        globalRating.inicio();

    };
})(jQuery)