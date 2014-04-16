;
(function() {
    $.fn.wdgLineup = function(options) {
        var settings = $.extend({
            'idTorneo': 0,
            'idEquipo': 0,
            'idEquipo2': 0,
            'title': '',
            'idPartido': 0
        }, options);
        var globalthis = this;

        var wdgLineUpOb = {
            feedDropLocal: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + settings.idTorneo + '/clubes/' + settings.idEquipo + '/matchesclub.js',
            feedDropVisit: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + settings.idTorneo + '/clubes/' + settings.idEquipo2 + '/matchesclub.js',

            inicio: function() {
                var maquetado = "";

                maquetado += '<div class="wdg_lineup_01">';
                maquetado += '<div class="str_pleca_01">';
                maquetado += '<div class="str_pleca_01_title">';
                maquetado += '<h3 class="background-color-pleca1">';
                maquetado += '<a title="Alineacion" class="textcolor-title3">';
                maquetado += 'Alineacion';
                maquetado += '<span class="str_pleca_01_arrowa selected"></span>';
                maquetado += '<span class="str_pleca_01_arrowb"></span>';
                maquetado += '</a></h3></div></div>';

                maquetado += '<div class="alineacion_partido lineaBajo" style="z-index: 980;">';
                maquetado += '<div class="encabezado_alineacion_partido lineaBajoTransform" style="z-index: 970;">';
                maquetado += '<div class="equipo_partido separadoizquierda_encabezado" style="z-index: 960;">';
                maquetado += '<div class="encabezado_alineacion_partido dotted-right" style="z-index: 950;">';
                maquetado += '<div class="simbolo" style="z-index: 940;">#</div>';
                maquetado += '<div class="equipos" id="localLineupRTIM" style="z-index: 930;"></div>';
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
                maquetado += '</div>            ';
                maquetado += '</div>';
                maquetado += '<div class="equipo_partido separadoderecha" style="z-index: 860;" >';
                maquetado += '<div class="encabezado_alineacion_partido" style="z-index: 850;">';
                maquetado += '<div class="simbolo" style="z-index: 840;">#</div>';
                maquetado += '<div class="equipos" id="visitLineupRTIM" style="z-index: 830;">';
                maquetado += '</div>';
                maquetado += '<div class="jornada" style="z-index: 810;">';
                maquetado += '<div class="wdg_lineup_012_dropdown drop2" style="z-index: 800;">';
                maquetado += '<div class="wdg_lineup_012_dropdowncontent" style="z-index: 790;">';
                maquetado += '<p id="nameJAVisit"></p>';
                maquetado += '<span class="sprite dropdown-gray"></span>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_lineup_012_listcontainer" style="z-index: 780;">';
                maquetado += '<ul class="wdg_lineup_012_dropdownlist" id="TIMPAVisit"></ul>  ';
                maquetado += '</div></div></div>';
                maquetado += '<div style="clear: both; z-index: 770;"></div>';
                maquetado += '</div>            ';
                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 760;"></div>';
                maquetado += '</div>';
                maquetado += '<div class="equipo_partido separadoizquierda" style="z-index: 750;" id="equipoLocalTIM"></div>';
                maquetado += '<div class="equipo_partido separadoderecha" style="z-index: 630;" id="equipoVistTIM"></div>';
                maquetado += '<div style="clear: both; z-index: 510;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="alineacion_partido lineaBajo" style="z-index: 500;">';
                maquetado += '<div class="encabezado_alineacion_partido lineaBajo" style="z-index: 490;">';
                maquetado += '<h3 class="head_component">Banca</h3>';
                maquetado += '<div style="clear: both; z-index: 480;"></div>';
                maquetado += '</div>';
                maquetado += '<div class="equipo_partido separadoizquierda" style="z-index: 470;" id="bancaLocalTIM">';

                maquetado += '<div class="jugador_alineacion_partido" style="z-index: 460;">';



                maquetado += '<div class="player_alineado dotted-right banca" style="z-index: 450;">';
                maquetado += '<div class="simbolo2 dotted-right" style="z-index: 440;">000</div>';
                maquetado += '<div class="jugador_info_alineado " style="z-index: 430;">';



                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 420;"></div></div>';
                maquetado += '<div style="clear: both; z-index: 410;"></div></div>';
                maquetado += '<div style="clear: both; z-index: 400;"></div></div>        ';
                maquetado += '<div class="equipo_partido separadoderecha" style="z-index: 390;" >';

                maquetado += '<div class="jugador_alineacion_partido" style="z-index: 380;" id="bancaVisitTIM">';



                maquetado += '<div class="player_alineado banca" style="z-index: 330;">';
                maquetado += '<div class="simbolo2 dotted-right" style="z-index: 320;">000</div>';
                maquetado += '<div class="jugador_info_alineado " style="z-index: 310;"></div>';
                maquetado += '<div style="clear: both; z-index: 300;"></div></div>';
                maquetado += '<div style="clear: both; z-index: 290;"></div>';
                maquetado += '</div><div style="clear: both; z-index: 280;"></div></div>        ';


                maquetado += '<div style="clear: both; z-index: 270;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="alineacion_partido" style="z-index: 260;" id="ausenciasconta">';
                maquetado += '<div class="encabezado_alineacion_partido lineaBajo" style="z-index: 250;">';
                maquetado += '<h3 class="head_component">Ausencias</h3>';
                maquetado += '<div style="clear: both; z-index: 240;"></div>';
                maquetado += '</div>';
                maquetado += '<div class="equipo_partido separadoizquierda" style="z-index: 230;">';
                maquetado += '<div class="jugador_alineacion_partido" style="z-index: 20;"  id="ausentesLocal"></div>';



                maquetado += '</div>';
                maquetado += '<div class="equipo_partido separadoderecha" style="z-index: 150;">';
                maquetado += '<div class="jugador_alineacion_partido" style="z-index: 20;"  id="ausentesVisit"></div></div>';


                maquetado += '<div style="clear: both; z-index: 70;"></div>';
                maquetado += '</div>';


                maquetado += '<div class="alineacion_partido" style="z-index: 60;">';
                maquetado += '<div class="simbologia" style="z-index: 50;">';
                maquetado += '<div class="title_simbologia" style="z-index: 40;">';

                maquetado += '<h4 class="one"><span>Simbolog\u00EDa</span></h4>';

                maquetado += '</div>';
                maquetado += '<div class="tabla_simbologia" style="z-index: 30;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: 20;"><i class="tvsa-mxm-yellowcard"> </i><h3 class="">Tarjeta Amarilla</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: 10;"><i class="tvsa-mxm-secondyellowcard"> </i><h3 class="">Doble Tarjeta Amarilla</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: 0;"><i class="tvsa-mxm-redcard"> </i><h3 class="">Tarjeta Roja</h3></div>';
                maquetado += '<div style="clear: both; z-index: -10;"></div>';
                maquetado += '</div>            ';
                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-offside"> </i><h3 class="">Fuera de Lugar</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-cornerkick"> </i><h3 class="">Tiro de Esquina</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -30;"><i class="tvsa-mxm-startfirsthalf"> </i><h3 class="">Inicio del primer tiempo</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-startsecondhalf"> </i><h3 class="">Inicio del segundo tiempo</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-startovertime"> </i><h3 class="">Tiempo de compensacion</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-startextrafirsthalf"> </i><h3 class="">Inicio primer tiempo extra</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-startextrasecondhalf"> </i><h3 class="">Inicio segundo tiempo extra</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-penalties"> </i><h3 class="">Penales</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-gameend"> </i><h3 class="">Fin del partido</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-crossbar"> </i><h3 class="">Tiro al poste</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-out"> </i><h3 class="">Pasa por afuera</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-penaltykick"> </i><h3 class="">Penalty</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-block"> </i><h3 class="">Atajada</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-owngoal"> </i><h3 class="">Autogol</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-goal"> </i><h3 class="">Gol</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-foul"> </i><h3 class="">Falta</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-comment"> </i><h3 class="">Comentario</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-statisticdata"> </i><h3 class="">Dato Estadistico</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-playerin"> </i><h3 class="">Sustitucion Entra</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-playerout"> </i><h3 class="">Sustitucion Sale</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-suspended"> </i><h3 class="">Jugador Castigado</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-lesion"> </i><h3 class="">Jugador Lesionado</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div style="clear: both; z-index: -70;"></div></div><div class="see-all textcolor-title4" id="viewmoreTIM">Ver Todo <i class="tvsa-caret-down "></i></div>';
                maquetado += '</div><div style="clear: both; z-index: -90;"></div>';

                globalthis.html(maquetado).css("display", "none");

                if ($("#viewmoreTIM").length) {
                    $("#viewmoreTIM").unbind().click(function(event) {
                        var colapsablesimbo = $(".wdg_lineup_01 .simbologia").height();
                        console.log(colapsablesimbo);
                        event.preventDefault();
                        if (colapsablesimbo == 467) {
                            $(this).html("Ver Todos <i class=\"tvsa-caret-down\"></i>");
                            $(".simbologia").animate({
                                'height': '112px'
                            }, 200);
                        } else {
                            $(this).html("Ver Menos <i class=\"tvsa-caret-up\"></i>");
                            $(".simbologia").animate({
                                'height': '467px'
                            }, 200);
                        }
                    });
                }


                (settings.idEquipo !== 0) ? wdgLineUpOb.loadDrops(wdgLineUpOb.feedDropLocal, TIMPALocal) : '';

                (settings.idEquipo2 !== 0) ? setTimeout(function() {
                    wdgLineUpOb.loadDrops(wdgLineUpOb.feedDropVisit, TIMPAVisit)
                }, 1500) : '';



                $.when(wdgLineUpOb.loadDatacomplete(settings.idPartido, "completo")).done(function() {
                    wdgLineUpOb.funcionesNaat();
                });

                wdgLineUpOb.intervaloVe = setInterval(function() {
                    wdgLineUpOb.infoequipo();
                }, 3000);

            },
            loadDrops: function(feed, ID) {

                $.ajax({
                    url: feed,
                    type: 'GET ',
                    dataType: 'jsonp ',
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

                var validaDrops = window.setInterval(function() {
                    $("#TIMPALocal").data("status", "chequed");
                    if ($("#TIMPALocal").children('li').size() === 0) {
                        $(".wdg_lineup_01_dropdown.drop1").unbind().css("cursor", "auto").find('span.sprite').removeClass('sprite');
                    }
                    if ($("#TIMPAVisit").children('li').size() === 0) {
                        $(".wdg_lineup_012_dropdown.drop2").unbind().css("cursor", "auto").find('span.sprite').removeClass('sprite');
                    }
                    if ($("#TIMPALocal").data("status") === "chequed") {
                        window.clearInterval(validaDrops);
                    }

                }, 5000);



            },

            loadDatacomplete: function(idMatch, tipo) {
                function giveActions(array) {
                    var acteaml = "",
                        clase = "";
                    for (var q = 0; q < array.length; q++) {
                        //console.log(array[q].type)

                        switch (array[q].type.toLowerCase()) {
                            case "amonestacion":
                                clase = "tvsa-mxm-yellowcard"
                                break;
                            case "segundaamonestacion":
                                clase = "tvsa-mxm-secondyellowcard"
                                break;
                            case "expulsion":
                                clase = "tvsa-mxm-redcard"
                                break;
                            case "fueradelugar":
                                clase = "tvsa-mxm-offside"
                                break;
                            case "tirodeesquina":
                                clase = "tvsa-mxm-cornerkick"
                                break;
                            case "iniciaelpartido":
                                clase = "tvsa-mxm-startfirsthalf"
                                break;
                            case "iniciasegundotiempo":
                                clase = "tvsa-mxm-startsecondhalf"
                                break;
                            case "-":
                                clase = "tvsa-mxm-startovertime"
                                break;
                            case "iniciaprimertiempoextra":
                                clase = "tvsa-mxm-startextrafirsthalf"
                                break;
                            case "iniciasegundotiempoextra":
                                clase = "tvsa-mxm-startextrasecondhalf"
                                break;
                            case "--":
                                clase = "tvsa-mxm-penalties"
                                break;
                            case "finalizaelpartido":
                                clase = "tvsa-mxm-gameend"
                                break;
                            case "pegaenelposte":
                                clase = "tvsa-mxm-crossbar"
                                break;
                            case "pasaporafuera":
                                clase = "tvsa-mxm-out"
                                break;
                            case "penal":
                                clase = "tvsa-mxm-penaltykick"
                                break;
                            case "atajada":
                                clase = "tvsa-mxm-block"
                                break;
                            case "autogollocal":
                                clase = "tvsa-mxm-owngoal"
                                break;
                            case "autogolvisitante":
                                clase = "tvsa-mxm-owngoal"
                                break;
                            case "gollocal":
                                clase = "tvsa-mxm-goal"
                                break;
                            case "golvisitante":
                                clase = "tvsa-mxm-goal"
                                break;
                            case "golpenallocal":
                                clase = "tvsa-mxm-goal"
                                break;
                            case "golpenalvisitante":
                                clase = "tvsa-mxm-goal"
                                break;
                            case "falta":
                                clase = "tvsa-mxm-foul"
                                break;
                            case "comentario":
                                clase = "tvsa-mxm-comment"
                                break;
                            case "datoestadistico":
                                clase = "tvsa-mxm-statisticdata"
                                break;
                            case "entraaljuego":
                                clase = "tvsa-mxm-playerin"
                                break;
                            case "saledeljuego":
                                clase = "tvsa-mxm-playerout"
                                break;
                            case "suspenciontemporaljuego":
                                clase = "tvsa-mxm-suspended"
                                break;
                            case "lesion":
                                clase = "tvsa-mxm-lesion"
                                break;
                            default:
                                clase = array[q].type.toLowerCase();
                                break;


                        }
                        //console.log(data.lineupVisit.team[j].actions[q]);
                        acteaml += '<h2>' + array[q].minute + '\'</h2><i class="' + clase + '"> </i>';
                    };
                    return acteaml;
                }

                function giveActionsAusen(array) {
                    var clase = "",
                        acteaml = "";
                    acteaml += '<h2></h2><i class="tvsa-' + array.type + '"> </i>';
                    return acteaml;
                }

                $("#equipoLocalTIM,#equipoVistTIM,#bancaLocalTIM,#bancaVisitTIM,#ausentesLocal,#ausentesVisit").fadeOut('fast', function() {
                    // $(this).empty;
                });

                var urlFeed = 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + settings.idTorneo + '/' + idMatch + '/match_lineup.js';
                var DtLocal = "",
                    bancalocal = "",
                    bancaVisit = "",
                    ausenLocal = "",
                    ausenVisit = "",
                    acteaml = "";
                $.ajax({
                    url: urlFeed,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'datagame'
                })
                    .done(function(data) {
                        var tmpTeam = "",
                            tmpTeamV = "",
                            flagAusenVisit = 0,
                            flagAusenLocal = 0;
                        // console.log(data);
                        if (tipo !== "drop") {
                            $("#nameJALocal").html(data.week);
                            $("#nameJAVisit").html(data.week);
                        }


                        var ActL = "";
                        for (var k = 0; k < data.lineupLocal.team.length; k++) {
                            //console.log(data.lineupLocal.team[k]);
                            if (typeof data.lineupLocal.team[k].actions !== "undefined") {
                                ActL = giveActions(data.lineupLocal.team[k].actions);
                            }
                            tmpTeam += '<div class="jugador_alineacion_partido" style="z-index: 740;"><div class="player_alineado" style="z-index: 730;"><div class="simbolo2 dotted-right" style="z-index: 720;">' + data.lineupLocal.team[k].number + '</div><div class="jugador_info_alineado" style="z-index: 710;"><h1>' + data.lineupLocal.team[k].nickName + '</h1>' + ActL + '</div><div style="clear: both; z-index: 700;"></div>  </div><div style="clear: both; z-index: 690;"></div></div>';
                        };
                        if (typeof data.lineupLocal.coach !== "undefined") {
                            tmpTeam += '<div class="dt_alineacion_partido dotted-right" style="z-index: 680;"><div class="simbolo2 dotted-right" style="z-index: 670;"><span class="textcolor-title1">DT</span></div><div class="jugador_info_alineado" style="z-index: 660;"><h1>' + data.lineupLocal.coach.name + '</h1></div><div style="clear: both; z-index: 650;"></div></div>';
                        }
                        $("#equipoLocalTIM").fadeIn('slow', function() {
                            $(this).html(tmpTeam);
                        });


                        //equipo visitante
                        var ActV = "";
                        for (var j = 0; j < data.lineupVisit.team.length; j++) {
                            acteaml = "";
                            //console.log(data.lineupVisit.team[j]);
                            //console.log(typeof data.lineupVisit.team[j].actions);
                            if (typeof data.lineupVisit.team[j].actions !== "undefined") {
                                ActV = giveActions(data.lineupVisit.team[j].actions);
                            }

                            tmpTeamV += '<div class="jugador_alineacion_partido" style="z-index: 620;"><div class="player_alineado dotted-bottom " style="z-index: 610;"><div class="simbolo2 dotted-right" style="z-index: 600;">' + data.lineupVisit.team[j].number + '</div><div class="jugador_info_alineado" style="z-index: 590;"><h1>' + data.lineupVisit.team[j].nickName + '</h1>' + ActV + '</div><div style="clear: both; z-index: 580;"></div>  </div><div style="clear: both; z-index: 570;"></div></div>';
                        };
                        if (typeof data.lineupVisit.coach !== "undefined") {
                            tmpTeamV += '<div class="dt_alineacion_partido" style="z-index: 560;"><div class="simbolo2 dotted-right" style="z-index: 550;"><span class="textcolor-title1">DT</span></div><div class="jugador_info_alineado" style="z-index: 540;"><h1>' + data.lineupVisit.coach.name + '</h1></div><div style="clear: both; z-index: 530;"></div></div>';
                        }
                        $("#equipoVistTIM").fadeIn('slow', function() {
                            $(this).html(tmpTeamV);
                        });

                        // banca local
                        var ActBL = "";
                        for (var l = 0; l < data.lineupLocal.substitutes.length; l++) {
                            //console.log(data.lineupVisit.substitutes[l])
                            if (typeof data.lineupLocal.substitutes[l].actions !== "undefined") {
                                ActBL = giveActions(data.lineupLocal.substitutes[l].actions);
                            }
                            if (ActBL !== "") {
                                bancalocal += '<div class="jugador_alineacion_partido dotted-bottom" style="z-index: 680;"><div class="player_alineado dotted-right banca" style="z-index: 670;"><div class="simbolo2 dotted-right" style="z-index: 660;">' + data.lineupLocal.substitutes[l].number + '</div><div class="jugador_info_alineado " style="z-index: 650;"><h1>' + data.lineupLocal.substitutes[l].nickName + '</h1>' + ActBL + '</div><div style="clear: both; z-index: 640;"></div>    </div><div style="clear: both; z-index: 630;"></div></div>';
                            }
                        };
                        $("#bancaLocalTIM").fadeIn('slow', function() {
                            $(this).html(bancalocal);
                        });

                        //banca visitante
                        var ActBV = "";
                        for (var m = 0; m < data.lineupVisit.substitutes.length; m++) {
                            // console.log(data.lineupVisit.substitutes[m]);
                            if (typeof data.lineupVisit.substitutes[m].actions !== "undefined") {
                                ActBV = giveActions(data.lineupVisit.substitutes[m].actions);
                            }
                            if (ActBV !== "") {
                                bancaVisit += '<div class="player_alineado dotted-bottom " style="z-index: 590;"><div class="simbolo2 dotted-right" style="z-index: 580;">' + data.lineupVisit.substitutes[m].number + '</div><div class="jugador_info_alineado" style="z-index: 570;"><h1>' + data.lineupVisit.substitutes[m].nickName + '</h1>' + ActBV + '</div><div style="clear: both; z-index: 560;"></div></div>';
                            }

                        };
                        $("#bancaVisitTIM").fadeIn('slow', function() {
                            $(this).html(bancaVisit);
                        });

                        var ausenAc,
                            ausenLoc;
                        if (typeof data.lineupLocal.ausentes !== "undefined") {
                            for (var n = 0; n < data.lineupLocal.ausentes.length; n++) {
                                ausenAc = "";
                                if (typeof data.lineupLocal.ausentes[n].actions !== "undefined") {
                                    ausenAc = giveActionsAusen(data.lineupLocal.ausentes[n].actions);
                                }
                                ausenLocal += '<div class="player_alineado dotted-bottom" style="z-index: 430;"><div class="simbolo2 dotted-right" style="z-index: 420;">' + data.lineupLocal.ausentes[n].number + '</div><div class="jugador_info_alineado" style="z-index: 410;"><h1>' + data.lineupLocal.ausentes[n].nickName + '</h1><h2>&nbsp;</h2>' + ausenAc + '</div><div style="clear: both; z-index: 400;"></div></div>';
                            };
                        } else {
                            ausenLocal = '<div class="player_alineado dotted-bottom" style="z-index: 430;"><div class="simbolo2 dotted-right" style="z-index: 420;"></div><div class="jugador_info_alineado" style="z-index: 410;"><h1></h1></div><div style="clear: both; z-index: 400;"></div></div>';
                            flagAusenLocal = 1;
                        }
                        $("#ausentesLocal").fadeIn('slow', function() {
                            $(this).html(ausenLocal);
                        });

                        if (typeof data.lineupVisit.ausentes !== "undefined") {
                            for (var o = 0; o < data.lineupVisit.ausentes.length; o++) {
                                ausenLoc = "";
                                if (typeof data.lineupVisit.ausentes[o].actions !== "undefined") {
                                    ausenLoc = giveActionsAusen(data.lineupVisit.ausentes[o].actions);
                                }
                                ausenVisit += '<div class="jugador_alineacion_partido" style="z-index: 360;"><div class="player_alineado dotted-bottom banca" style="z-index: 350;"><div class="simbolo2 dotted-right" style="z-index: 340;">' + data.lineupVisit.ausentes[o].number + '</div><div class="jugador_info_alineado" style="z-index: 330;"><h1>' + data.lineupVisit.ausentes[o].nickName + '</h1>' + ausenLoc + '</div><div style="clear: both; z-index: 320;"></div></div><div style="clear: both; z-index: 310;"></div></div>';
                            };
                        } else {
                            ausenVisit = '<div class="jugador_alineacion_partido" style="z-index: 360;"><div class="player_alineado dotted-bottom banca" style="z-index: 350;"><div class="simbolo2 dotted-right" style="z-index: 340;"></div><div class="jugador_info_alineado" style="z-index: 330;"><h1></h1></div><div style="clear: both; z-index: 320;"></div>    </div><div style="clear: both; z-index: 310;"></div>            </div>';
                            flagAusenVisit = 1;
                        }
                        $("#ausentesVisit").fadeIn('slow', function() {
                            $(this).html(ausenVisit);
                        });

                        if (typeof data.lineupVisit.ausentes !== "undefined" && typeof data.lineupLocal.ausentes !== "undefined") {
                            $("#ausentesLocal").parent('.alineacion_partido').remove();
                        }


                        if (flagAusenVisit === 1 && flagAusenLocal === 1) {
                            $("#ausenciasconta").hide('fast');
                        }

                        globalthis.slideDown('slow', function() {
                            $(this).css('display', 'block');
                        });


                    })
                    .fail(function() {
                        console.log("error");
                    })




            },

            infoequipo: function() {
                if ($("#datosTIMHeader").length) {
                    clearInterval(wdgLineUpOb.intervaloVe);
                    var Local = '<img src="' + $("#localImgTIM").text() + '"><h2>' + $("#localAbrevTIM").text() + '<span class="rojo">' + $("#localGolesTIM").text() + '</span><span class="grisPequeno">vs</span><span class="rojo">' + $("#visitGolesTIM").text() + '</span>' + $("#visitAbrevTIM").text() + '</h2><img src="' + $("#visitImgTIM").text() + '"><div style="clear: both; z-index: 920;"></div>';
                    $("#localLineupRTIM, #visitLineupRTIM").html(Local);

                }
            },

            funcionesNaat: function() {
                var zIndexNumber = 1000;
                $('.wdg_lineup_01 div').each(function() {
                    $(this).css('zIndex', zIndexNumber);
                    zIndexNumber -= 10;
                });
                // TODO: refactor for a better approach
                var $parent = $('.wdg_lineup_01 .separadoizquierda_encabezado');
                var $dropdownAnchor = $parent.find('.wdg_lineup_01_dropdown');
                var $firstItem = $('.wdg_lineup_01_dropdownlist li:first-child');
                var $dropdownItems = $parent.find('.wdg_lineup_01_dropdownlist li');
                var $listItems = $('.wdg_lineup_01_dropdownlist')
                $('.wdg_lineup_01_dropdowncontent p').html($firstItem.find('p').html());

                //                console.log($("#TIMPALocal").children('li').size());

                $dropdownAnchor.bind('click', function(evt) {
                    //console.log("DROP 1");
                    evt.preventDefault();
                    //var totalHeight= 0;
                    /*var visibilidad = $listItems.css('visibility'); */
                    var lisItemsChild = $(this).children('.wdg_lineup_01_listcontainer').children('.wdg_lineup_01_dropdownlist:first-child');
                    var visibilidad = lisItemsChild.css('visibility');
                    /*$listItems.find('li').each(function() {
                totalHeight += $(this).outerHeight(true);
            });*/

                    /* $(this).parents('.img_galry_01').find('.galleryLink').each( function (){             
                $(this).find('div.selectedGallery').removeClass('selectedGallery');
            }); */
                    visibilidadChild = $(this).children($listItems);
                    if (visibilidad == 'hidden') {

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

                    lisItemsChild.find("p").unbind('click').click(function(event) {
                        var idM = $(this).data("matchid");
                        wdgLineUpOb.loadDatacomplete(idM, 'drop');
                        $("#nameJALocal").text($(this).text());
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
                var $parent2 = $('.wdg_lineup_01 .separadoderecha');
                var $dropdownAnchor2 = $parent2.find('.wdg_lineup_012_dropdown');
                var $firstItem2 = $('.wdg_lineup_012_dropdowncontent li:first-child');
                var $dropdownItems2 = $parent2.find('.wdg_lineup_012_dropdownlist li');
                var $listItems2 = $('.wdg_lineup_012_dropdownlist')
                $('.wdg_lineup_012_dropdowncontent p').html($firstItem2.find('p').html());
                $dropdownAnchor2.bind('click', function(evt) {
                    //console.log("DROP 2");


                    //var totalHeight= 0;
                    //var visibilidad = $listItems2.css('visibility'); 
                    /*var lisItemsChild2 = $(this).children('.wdg_lineup_01_listcontainer').children('.wdg_lineup_01_dropdownlist:first-child');
            var visibilidad2 = lisItemsChild.css('visibility');*/

                    var visibilidad = $(this).children('.wdg_lineup_012_listcontainer').children().css('visibility');

                    var lisItemsChild = $(this).children('.wdg_lineup_012_listcontainer').children();
                    /*$listItems.find('li').each(function() {
                totalHeight += $(this).outerHeight(true);
            });*/
                    if (visibilidad == 'hidden') {
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
                    lisItemsChild.find("p").unbind('click').click(function(event) {
                        var idM = $(this).data("matchid");
                        wdgLineUpOb.loadDatacomplete(idM, 'drop');
                        var valorn = String($(this).text());
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


            }

        };


        wdgLineUpOb.inicio();




    }
})(jQuery);