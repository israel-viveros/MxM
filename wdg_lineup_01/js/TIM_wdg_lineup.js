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
            feedDropLocal: 'http://lab.israelviveros.com/deportes/wdg_lineup_01/' + settings.idTorneo + '/' + settings.idEquipo + '/matchesclub.js',
            feedDropVisit: 'http://lab.israelviveros.com/deportes/wdg_lineup_01/' + settings.idTorneo + '/' + settings.idEquipo2 + '/matchesclub.js',

            inicio: function() {
                var maquetado = "";


                maquetado += '<div class="wdg_lineup_01">';

                maquetado += '<div class="str_pleca_01">';
                maquetado += '<div class="str_pleca_01_title">';
                maquetado += '<h3 class="background-color-pleca1">';
                maquetado += '<a href="http://www.televisa.com" title="Link Description" class="textcolor-title3">';
                maquetado += 'Alineacion';
                maquetado += '<span class="str_pleca_01_arrowa selected"></span>';
                maquetado += '<span class="str_pleca_01_arrowb"></span>';
                maquetado += '</a></h3></div></div>';

                maquetado += '<div class="alineacion_partido lineaBajo" style="z-index: 980;">';
                maquetado += '<div class="encabezado_alineacion_partido lineaBajoTransform" style="z-index: 970;">';
                maquetado += '<div class="equipo_partido separadoizquierda_encabezado" style="z-index: 960;">';
                maquetado += '<div class="encabezado_alineacion_partido dotted-right" style="z-index: 950;">';
                maquetado += '<div class="simbolo" style="z-index: 940;">#</div>';
                maquetado += '<div class="equipos" style="z-index: 930;">					';
                maquetado += '<img src="http://lorempixel.com/20/20/"><h2>Leo<span class="rojo">1</span><span class="grisPequeno">vs</span><span class="rojo">10</span>ame</h2><img src="http://lorempixel.com/20/20/"><div style="clear: both; z-index: 920;"></div>';
                maquetado += '</div>';
                maquetado += '<div class="jornada" style="z-index: 910;">';
                maquetado += '<div class="wdg_lineup_01_dropdown drop1" style="z-index: 900;">';
                maquetado += '<div class="wdg_lineup_01_dropdowncontent" style="z-index: 890;">';
                maquetado += '<p id="nameJALocal"></p>';
                maquetado += '<span class="sprite dropdown-gray"></span>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_lineup_01_listcontainer" style="z-index: 880;">';
                maquetado += '<ul class="wdg_lineup_01_dropdownlist" id="TIMPALocal"></ul>  ';
                maquetado += '</div>';
                maquetado += '</div>';

                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 870;"></div>';
                maquetado += '</div>			';
                maquetado += '</div>';
                maquetado += '<div class="equipo_partido separadoderecha" style="z-index: 860;" >';
                maquetado += '<div class="encabezado_alineacion_partido" style="z-index: 850;">';
                maquetado += '<div class="simbolo" style="z-index: 840;">#</div>';
                maquetado += '<div class="equipos" style="z-index: 830;">					';
                maquetado += '<img src="http://lorempixel.com/20/20/">';
                maquetado += '<h2>Leo';
                maquetado += '<span class="rojo">1</span>';
                maquetado += '<span class="grisPequeno">vs</span>';
                maquetado += '<span class="rojo">10</span>Ame</h2>';
                maquetado += '<img src="http://lorempixel.com/20/20/">';
                maquetado += '<div style="clear: both; z-index: 820;"></div>					';

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
                maquetado += '</div>			';
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
                maquetado += '<div style="clear: both; z-index: 420;"></div>	';
                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 410;"></div>			';
                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 400;"></div>';
                maquetado += '</div>		';
                maquetado += '<div class="equipo_partido separadoderecha" style="z-index: 390;" >';

                maquetado += '<div class="jugador_alineacion_partido" style="z-index: 380;" id="bancaVisitTIM">';


                maquetado += '<div class="player_alineado dotted-bottom " style="z-index: 370;">';
                maquetado += '<div class="simbolo2 dotted-right" style="z-index: 360;">10</div>';
                maquetado += '<div class="jugador_info_alineado" style="z-index: 350;">';
                maquetado += '<h1>Cuauhtemoc Blanco</h1>';

                maquetado += '<h2>96\'</h2>';
                maquetado += '<i class="tvsa-videocamera"> </i>					';
                maquetado += '<h2>96\'</h2>';
                maquetado += '<i class="tvsa-videocamera"> </i>					';
                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 340;"></div>	';
                maquetado += '</div>';
                maquetado += '<div class="player_alineado banca" style="z-index: 330;">';
                maquetado += '<div class="simbolo2 dotted-right" style="z-index: 320;">000</div>';
                maquetado += '<div class="jugador_info_alineado " style="z-index: 310;">';

                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 300;"></div>	';
                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 290;"></div>			';
                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 280;"></div>';
                maquetado += '</div>		';


                maquetado += '<div style="clear: both; z-index: 270;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="alineacion_partido" style="z-index: 260;">';
                maquetado += '<div class="encabezado_alineacion_partido lineaBajo" style="z-index: 250;">';
                maquetado += '<h3 class="head_component">Ausencias</h3>';
                maquetado += '<div style="clear: both; z-index: 240;"></div>';
                maquetado += '</div>';
                maquetado += '<div class="equipo_partido separadoizquierda" style="z-index: 230;" id="ausentesLocal">';



                maquetado += '</div>';
                maquetado += '<div class="equipo_partido separadoderecha" style="z-index: 150;" id="ausentesVisit">';


                maquetado += '</div>		';


                maquetado += '<div style="clear: both; z-index: 70;"></div>';
                maquetado += '</div>';


                maquetado += '<div class="alineacion_partido" style="z-index: 60;">';
                maquetado += '<div class="simbologia" style="z-index: 50;">';
                maquetado += '<div class="title_simbologia" style="z-index: 40;">';

                maquetado += '<h4 class="one"><span>simbologia</span></h4>';

                maquetado += '</div>';
                maquetado += '<div class="tabla_simbologia" style="z-index: 30;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: 20;"><i class="tvsa-mxm-yellowcard "> </i><h3 class="">Amonestación</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: 10;"><i class="tvsa-mxm-owngoal "> </i><h3 class="">Autogol</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: 0;"><i class="tvsa-mxm-comment"> </i><h3 class="">Convocatoria a Comentario</h3></div>';
                maquetado += '<div style="clear: both; z-index: -10;"></div>';
                maquetado += '</div>			';
                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-statisticdata"> </i><h3 class="">Dato estadístico</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-offside"> </i><h3 class="">Desde afuera del área</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-"> </i><h3 class="">El partido ha sido suspendido</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-startsecondhalf"> </i><h3 class="">Empieza segundo tiempo</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-penalties"> </i><h3 class="">Empiezan penales</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-redcard"> </i><h3 class="">Expulsión</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-out"> </i><h3 class="">Falla el penal</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-gameend"> </i><h3 class="">Finaliza el partido</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-offside"> </i><h3 class="">Fuera de lugar</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-goal"> </i><h3 class="">Gol</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-startsecondhalf"> </i><h3 class="">Inicia el segundo tiempo</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-startextrafirsthalf"> </i><h3 class="">Inicia primer tiempo extra</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-startextrasecondhalf"> </i><h3 class="">Inicia segundo tiempo extra</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class=" tvsa-mxm-out"> </i><h3 class="">Pasa por afuera</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-crossbar"> </i><h3 class="">Pega en el poste</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-penaltykick"> </i><h3 class="">Penal</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-secondyellowcard"> </i><h3 class="">Segunda amonestación</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-gameend"> </i><h3 class="">Termina primer tiempo</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-mxm-gameend"> </i><h3 class="">Termina primer tiempo extra</h3></div>';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -40;"><i class="tvsa-mxm-gameend"> </i><h3 class="">Termina segundo tiempo</h3></div>';
                maquetado += '<div class="icon_simbologia" style="z-index: -50;"><i class="tvsa-mxm-gameend"> </i><h3 class="">Termina segundo tiempo extra</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_simbologia" style="z-index: -20;">';
                maquetado += '<div class="icon_simbologia dotted-right" style="z-index: -30;"><i class="tvsa-videocamera"> </i><h3 class="">Terminan penales</h3></div>';
                maquetado += '<div style="clear: both; z-index: -60;"></div>';
                maquetado += '</div>';

                maquetado += '<div style="clear: both; z-index: -70;"></div>';
                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: -80;"></div>';
                maquetado += '</div><div style="clear: both; z-index: -90;"></div>';

                globalthis.html(maquetado);

                (settings.idEquipo !== 0) ? wdgLineUpOb.loadDrops(wdgLineUpOb.feedDropLocal, TIMPALocal) : '';

                (settings.idEquipo2 !== 0) ? setTimeout(function() {
                    wdgLineUpOb.loadDrops(wdgLineUpOb.feedDropVisit, TIMPAVisit)
                }, 1500) : '';



                $.when(wdgLineUpOb.loadDatacomplete(settings.idPartido, "completo")).done(function() {
                    wdgLineUpOb.funcionesNaat();
                });




            },
            loadDrops: function(feed, ID) {

                $.ajax({
                    url: feed,
                    type: 'GET ',
                    dataType: 'jsonp ',
                    jsonpCallback: 'matches'
                })
                    .done(function(data) {
                        //console.log(data);
                        var tmp = "";
                        for (var i = 0; i < data.Team.length; i++) {
                            tmp += '<li><p data-matchid="' + data.Team[i].matchid + '">' + data.Team[i].week + '</p></li>';
                        };

                        $(ID).html(tmp);
                    })
                    .fail(function() {
                        console.log("error");
                    })

            },
            loadDatacomplete: function(idMatch, tipo) {
                function giveActions(array) {
                    var acteaml = "",
                        clase = "";
                    for (var q = 0; q < array.length; q++) {
                        //console.log(array[q].type)
                        switch (array[q].type.toLowerCase()) {
                            case "golvisitante":
                                clase = "mxm-goal"
                                break;
                            case "gollocal":
                                clase = "mxm-goal"
                                break;
                            case "saledeljuego":
                                clase = "mxm-playerout"
                                break;
                            case "amonestacion":
                                clase = "mxm-yellowcard"
                                break;
                            case "expulsion":
                                clase = "mxm-redcard"
                                break;
                            case "penalfalladoserie":
                                clase = "mxm-penaltykick"
                                break;
                            case "entraaljuego":
                                clase = "mxm-playerin"
                                break;


                        }
                        //console.log(data.lineUpVisit.team[j].actions[q]);
                        acteaml += '<h2>' + array[q].minute + '\'</h2><i class="tvsa-' + clase + '"> </i>';
                    };
                    return acteaml;
                }

                $("#equipoLocalTIM,#equipoVistTIM,#bancaLocalTIM,#bancaVisitTIM,#ausentesLocal,#ausentesVisit").fadeOut('fast', function() {
                    // $(this).empty;
                });

                var urlFeed = 'http://lab.israelviveros.com/deportes/wdg_lineup_01/' + settings.idTorneo + '/' + idMatch + '/match_lineup.js';
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
                            tmpTeamV = "";
                        // console.log(data);
                        $("#nameJALocal").html(data.week);
                        $("#nameJAVisit").html(data.week);

                        var ActL = "";
                        for (var k = 0; k < data.lineuplocal.team.length; k++) {
                            //console.log(data.lineuplocal.team[k]);
                            if (typeof data.lineuplocal.team[k].actions !== "undefined") {
                                ActL = giveActions(data.lineuplocal.team[k].actions);
                            }
                            tmpTeam += '<div class="jugador_alineacion_partido" style="z-index: 740;"><div class="player_alineado" style="z-index: 730;"><div class="simbolo2 dotted-right" style="z-index: 720;">' + data.lineuplocal.team[k].number + '</div><div class="jugador_info_alineado" style="z-index: 710;"><h1>' + data.lineuplocal.team[k].longName + '</h1>' + ActL + '</div><div style="clear: both; z-index: 700;"></div>	</div><div style="clear: both; z-index: 690;"></div></div>';
                        };
                        tmpTeam += '<div class="dt_alineacion_partido dotted-right" style="z-index: 680;"><div class="simbolo2 dotted-right" style="z-index: 670;"><span class="textcolor-title1">DT</span></div><div class="jugador_info_alineado" style="z-index: 660;"><h1>' + data.lineuplocal.coach.name + '</h1></div><div style="clear: both; z-index: 650;"></div></div>';
                        $("#equipoLocalTIM").fadeIn('slow', function() {
                            $(this).html(tmpTeam);
                        });


                        //equipo visitante
                        var ActV = "";
                        for (var j = 0; j < data.lineUpVisit.team.length; j++) {
                            acteaml = "";
                            //console.log(data.lineUpVisit.team[j]);
                            //console.log(typeof data.lineUpVisit.team[j].actions);
                            if (typeof data.lineUpVisit.team[j].actions !== "undefined") {
                                ActV = giveActions(data.lineUpVisit.team[j].actions);
                            }

                            tmpTeamV += '<div class="jugador_alineacion_partido" style="z-index: 620;"><div class="player_alineado dotted-bottom " style="z-index: 610;"><div class="simbolo2 dotted-right" style="z-index: 600;">' + data.lineUpVisit.team[j].number + '</div><div class="jugador_info_alineado" style="z-index: 590;"><h1>' + data.lineUpVisit.team[j].longName + '</h1>' + ActV + '</div><div style="clear: both; z-index: 580;"></div>	</div><div style="clear: both; z-index: 570;"></div></div>';
                        };
                        tmpTeamV += '<div class="dt_alineacion_partido" style="z-index: 560;"><div class="simbolo2 dotted-right" style="z-index: 550;"><span class="textcolor-title1">DT</span></div><div class="jugador_info_alineado" style="z-index: 540;"><h1>' + data.lineUpVisit.coach.name + '</h1></div><div style="clear: both; z-index: 530;"></div></div>';
                        $("#equipoVistTIM").fadeIn('slow', function() {
                            $(this).html(tmpTeamV);
                        });

                        // banca local
                        var ActBL = "";
                        for (var l = 0; l < data.lineuplocal.substitutes.length; l++) {
                            //console.log(data.lineUpVisit.substitutes[l])
                            if (typeof data.lineuplocal.substitutes[l].actions !== "undefined") {
                                ActBL = giveActions(data.lineuplocal.substitutes[l].actions);
                            }
                            bancalocal += '<div class="jugador_alineacion_partido" style="z-index: 680;"><div class="player_alineado dotted-right banca" style="z-index: 670;"><div class="simbolo2 dotted-right" style="z-index: 660;">' + data.lineuplocal.substitutes[l].number + '</div><div class="jugador_info_alineado " style="z-index: 650;"><h1>' + data.lineuplocal.substitutes[l].longName + '</h1>' + ActBL + '</div><div style="clear: both; z-index: 640;"></div>	</div><div style="clear: both; z-index: 630;"></div></div>';
                        };
                        $("#bancaLocalTIM").fadeIn('slow', function() {
                            $(this).html(bancalocal);
                        });

                        //banca visitante
                        var ActBV = "";
                        for (var m = 0; m < data.lineUpVisit.substitutes.length; m++) {
                            // console.log(data.lineUpVisit.substitutes[m]);
                            if (typeof data.lineUpVisit.substitutes[m].actions !== "undefined") {
                                ActBV = giveActions(data.lineUpVisit.substitutes[m].actions);
                            }
                            bancaVisit += '<div class="player_alineado dotted-bottom " style="z-index: 590;"><div class="simbolo2 dotted-right" style="z-index: 580;">' + data.lineUpVisit.substitutes[m].number + '</div><div class="jugador_info_alineado" style="z-index: 570;"><h1>' + data.lineUpVisit.substitutes[m].longName + '</h1>' + ActBV + '</div><div style="clear: both; z-index: 560;"></div></div>';
                        };
                        $("#bancaVisitTIM").fadeIn('slow', function() {
                            $(this).html(bancaVisit);
                        });


                        if (typeof data.lineuplocal.ausentes !== "undefined") {
                            for (var n = 0; n < data.lineUpVisit.ausentes.length; n++) {
                                ausenLocal += '<div class="player_alineado" style="z-index: 430;"><div class="simbolo2 dotted-right" style="z-index: 420;">' + data.lineUpVisit.ausentes[n].number + '</div><div class="jugador_info_alineado" style="z-index: 410;"><h1>' + data.lineUpVisit.ausentes[n].longName + '</h1><h2>&nbsp;</h2><i class="tvsa-videocamera"> </i></div><div style="clear: both; z-index: 400;"></div></div>';
                            };
                        } else {
                            ausenLocal = '<div class="player_alineado" style="z-index: 430;"><div class="simbolo2 dotted-right" style="z-index: 420;"></div><div class="jugador_info_alineado" style="z-index: 410;"><h1></h1></div><div style="clear: both; z-index: 400;"></div></div>';
                        }
                        $("#ausentesLocal").fadeIn('slow', function() {
                            $(this).html(ausenLocal);
                        });

                        if (typeof data.lineUpVisit.ausentes !== "undefined") {
                            var ActAL = "";
                            for (var o = 0; o < data.lineUpVisit.ausentes.length; o++) {
                                ausenVisit += '<div class="jugador_alineacion_partido" style="z-index: 360;"><div class="player_alineado dotted-bottom banca" style="z-index: 350;"><div class="simbolo2 dotted-right" style="z-index: 340;">' + data.lineUpVisit.ausentes[o].number + '</div><div class="jugador_info_alineado" style="z-index: 330;"><h1>' + data.lineUpVisit.ausentes[o].longName + '</h1>' + ActAL + '</div><div style="clear: both; z-index: 320;"></div></div><div style="clear: both; z-index: 310;"></div></div>';
                            };
                        } else {
                            ausenVisit = '<div class="jugador_alineacion_partido" style="z-index: 360;"><div class="player_alineado dotted-bottom banca" style="z-index: 350;"><div class="simbolo2 dotted-right" style="z-index: 340;"></div><div class="jugador_info_alineado" style="z-index: 330;"><h1></h1></div><div style="clear: both; z-index: 320;"></div>	</div><div style="clear: both; z-index: 310;"></div>			</div>';
                        }
                        $("#ausentesVisit").fadeIn('slow', function() {
                            $(this).html(ausenVisit);
                        });

                        if (typeof data.lineUpVisit.ausentes !== "undefined" && typeof data.lineuplocal.ausentes !== "undefined") {
                            $("#ausentesLocal").parent('.alineacion_partido').remove();
                        }



                    })
                    .fail(function() {
                        console.log("error");
                    })




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
                $dropdownAnchor.bind('click', function(evt) {
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
                        wdgLineUpOb.loadDatacomplete(idM);
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
                        wdgLineUpOb.loadDatacomplete(idM);
                        $("#nameJAVisit").text($(this).text());
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