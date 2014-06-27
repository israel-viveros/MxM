/*!
 *   TIM Developer: Israel Viveros
 *   Version: 1.3.4
 *   Copyright: Televisa Interactive Media (2014)
 */
;
(function() {
    $.fn.MxMAlineacionTD = function(options) {
        var setting = $.extend({
            'ideventomxm': 0,
            'ideventomxmtv': 0,
            'idclub': 0,
            'GolesAnotados': true,
            'Penales': true,
            'Amonestados': true,
            'Promedio': true
        }, options);

        var GlobalThis = this;
        var timerGlobal = null;


        var wdg_smex_strategy = {


            urlFinalAlienacion: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/' + setting.ideventomxmtv + '/match_lineup.js',
            urlDropdown: 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/' + setting.ideventomxm + '/' + setting.idclub + '/matchesclub.js',
            urlview: 'http://mxm.televisadeportes.esmas.com/futbol/data/' + setting.ideventomxm + '/' + setting.ideventomxmtv + '/view.js',
            // urlmxmheader: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/' + setting.ideventomxmtv + '/match_header.js',
            tagPromedio: $("#AlineacionPromedioTIM"),
            tagExpulsion: $("#ExpulsionTIM"),
            tagAlineacionList: $("#TIMAlineacionList"),
            tagAlineacionGoles: $("#TIMAlineacionGoles"),
            tagwdgPenales: $("#TIMWdgPenales"),
            tmpescuchaListener: 0,


            PintaCacha: function(tipo) {
                var ContenidoMaq = "";
                if (tipo === "dropdown") {
                    ContenidoMaq += '<div class="titulo textcolor-title4">Estrategia mÃ¡s utilizada</div>';
                    ContenidoMaq += '<div class="pleca_inferior">';
                    ContenidoMaq += '<div>';
                    ContenidoMaq += '<strong>Partidos</strong>';
                    ContenidoMaq += '</div>';
                    ContenidoMaq += '<div class="wdg_smex_strategy_01_dropdown">';
                    ContenidoMaq += '<div class="wdg_smex_strategy_01_dropdowncontent">';
                    ContenidoMaq += '<p></p>';
                    ContenidoMaq += '<div> <a id="dropdwon-right"  href="#" title="Link Description"> <i class="tvsa-caret-down"></i></a> </div>';
                    ContenidoMaq += '</div>';
                    ContenidoMaq += '<div class="wdg_smex_strategy_01_listcontainer">';
                    ContenidoMaq += '</div>';
                    ContenidoMaq += '</div>';
                    ContenidoMaq += '</div>';
                }
                if (tipo === "alineacionFinal") {
                    ContenidoMaq += '<ul class="menu">';
                    ContenidoMaq += '<li class="first active"><a href="#" data-query="inicial" class="ui-link">Alineaci\u00F3n Inicial</a></li><li><a href="#" data-query="final" class="ui-link">Alineaci\u00F3n Final</a></li>';
                    ContenidoMaq += '</ul>';
                }
                ContenidoMaq += '<div class="field" id="canchaValidate">';
                ContenidoMaq += '<div id="LoadingCancha"><div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div><div id="fountainG_7" class="fountainG"></div><div id="fountainG_8" class="fountainG"></div></div>';
                ContenidoMaq += '<img class="cancha" src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/cancha.png" alt="field" width="624" height="334"/>';
                ContenidoMaq += '<span class="players">';
                ContenidoMaq += '</span>';
                ContenidoMaq += '</div>';

                GlobalThis.html(ContenidoMaq).css("display", "none").fadeIn('slow', function() {
                    $(this).css("display", "block");
                });

                wdg_smex_strategy.FunInicio();

                (tipo === "alineacionFinal") ? wdg_smex_strategy.botonesAlineacion() : '';

                /* setInterval(function() {
                    wdg_smex_strategy.updatePlayers();
                }, 10000); */


                wdg_smex_strategy.listener = setInterval(function() {
                    //console.log("buscando etiqueta actualizable..");
                    var objTime = $("#timeUpdateMxM");
                    if (objTime.length) {
                        //console.log("Antes: " + wdg_smex_strategy.tmpescuchaListener);
                        //console.log("Ahora: " + objTime.text());
                        var timeAct = parseInt(objTime.text());
                        //clearInterval(wdg_smex_strategy.listener);
                        if (timeAct > 0 && parseInt(objTime.text()) !== parseInt(wdg_smex_strategy.tmpescuchaListener)) {
                            //console.log("ACTUALIZANDO CON ... " + objTime.text());
                            wdg_smex_strategy.tmpescuchaListener = parseInt(objTime.text());
                            clearInterval(timerGlobal);
                            timerGlobal = setInterval(function() {
                                wdg_smex_strategy.updatePlayers();
                            }, timeAct);
                        }


                    }
                }, 60000);


            },


            loadAlineacion: function(el, IDTemp, tipo) {
                var promedio = new Array();
                el.find('span.players').fadeOut('fast');
                $.ajax({
                    url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/' + IDTemp + '/match_lineup.js',
                    dataType: 'jsonp',
                    jsonpCallback: 'datagame',
                    cache: false,
                    success: function(data) {
                        var miHTML = '',
                            aliFinal = '',
                            ArregloHidden = new Array(),
                            expulsadosLocal = new Array(),
                            expulsadosVisit = new Array(),
                            rojaLocal = new Array(),
                            rojaVisit = new Array();
                        var equipo = new Array();
                        var positiony, positionx, vc, equipoString, imageJugador;

                        equipo[0] = "lineupLocal";
                        equipo[1] = "lineupVisit";

                        expulsadosLocal = data[equipo[0]].penalization;
                        expulsadosVisit = data[equipo[1]].penalization;
                        rojaLocal = data[equipo[0]].expelled;
                        rojaVisit = data[equipo[1]].expelled;


                        for (var t = 0; t < equipo.length; t++) {
                            equipoString = String(equipo[t]);
                            //console.log(data[equipoString]);


                            promedio.push(data[equipoString].average);

                            for (var i = 0; i < data[equipoString].team.length; i++) {
                                var siexpulsado = 0;
                                /* arrow styles based on px values */
                                var arrow = '';
                                var toolact = '';
                                var actions = '',
                                    icon = '';
                                positionx = parseInt(data[equipoString].team[i].posx);
                                positiony = parseInt(data[equipoString].team[i].posy);
                                positionx = (isNaN(positionx)) ? 0 : positionx;
                                positiony = (isNaN(positiony)) ? 0 : positiony;


                                if (positionx <= 290 && positiony <= 140) arrow = 'grid1';
                                else if (positionx <= 290 && positiony > 140) arrow = 'grid3';
                                else if (positionx > 290 && positiony <= 140) arrow = 'grid2';
                                else arrow = 'grid4';

                                if (typeof data[equipoString].team[i].actions !== "undefined" && data[equipoString].team[i].actions.length > 0) {
                                    actions += '<em>acciones</em><span class="actions">';
                                    for (var a = 0; a < data[equipoString].team[i].actions.length; a++) {

                                        switch (data[equipoString].team[i].actions[a].type.toLowerCase()) {
                                            case "amonestacion":
                                                clase = "tvsa-mxm-yellowcard";
                                                break;
                                            case "segundaamonestacion":
                                                clase = "tvsa-mxm-secondyellowcard";
                                                //siexpulsado = (tipo === "Alineacionfinal") ? 1 : 0;
                                                siexpulsado = 1;
                                                break;
                                            case "expulsion":
                                                clase = "tvsa-mxm-redcard";
                                                siexpulsado = 1;
                                                break;
                                            case "fueradelugar":
                                                clase = "tvsa-mxm-offside";
                                                break;
                                            case "tirodeesquina":
                                                clase = "tvsa-mxm-cornerkick";
                                                break;
                                            case "iniciaelpartido":
                                                clase = "tvsa-mxm-startfirsthalf";
                                                break;
                                            case "iniciasegundotiempo":
                                                clase = "tvsa-mxm-startsecondhalf";
                                                break;
                                            case "-":
                                                clase = "tvsa-mxm-startovertime";
                                                break;
                                            case "iniciaprimertiempoextra":
                                                clase = "tvsa-mxm-startextrafirsthalf";
                                                break;
                                            case "iniciasegundotiempoextra":
                                                clase = "tvsa-mxm-startextrasecondhalf";
                                                break;
                                            case "--":
                                                clase = "tvsa-mxm-penalties";
                                                break;
                                            case "finalizaelpartido":
                                                clase = "tvsa-mxm-gameend";
                                                break;
                                            case "pegaenelposte":
                                                clase = "tvsa-mxm-crossbar";
                                                break;
                                            case "pasaporafuera":
                                                clase = "tvsa-mxm-out";
                                                break;
                                            case "penal":
                                                clase = "tvsa-mxm-penaltykick";
                                                break;
                                            case "atajada":
                                                clase = "tvsa-mxm-block";
                                                break;
                                            case "autogollocal":
                                                clase = "tvsa-mxm-owngoal";
                                                break;
                                            case "autogolvisitante":
                                                clase = "tvsa-mxm-owngoal";
                                                break;
                                            case "gollocal":
                                                clase = "tvsa-mxm-goal";
                                                break;
                                            case "golvisitante":
                                                clase = "tvsa-mxm-goal";
                                                break;
                                            case "golpenallocal":
                                                clase = "tvsa-mxm-goal";
                                                break;
                                            case "golpenalvisitante":
                                                clase = "tvsa-mxm-goal";
                                                break;
                                            case "falta":
                                                clase = "tvsa-mxm-foul";
                                                break;
                                            case "comentario":
                                                clase = "tvsa-mxm-comment";
                                                break;
                                            case "datoestadistico":
                                                clase = "tvsa-mxm-statisticdata";
                                                break;
                                            case "entraaljuego":
                                                clase = "tvsa-mxm-playerin";
                                                break;
                                            case "saledeljuego":
                                                clase = "tvsa-mxm-playerout";
                                                break;
                                            case "suspenciontemporaljuego":
                                                clase = "tvsa-mxm-suspended";
                                                break;
                                            case "lesion":
                                                clase = "tvsa-mxm-lesion";
                                                break;
                                            default:
                                                clase = data[equipoString].team[i].actions[a].type.toLowerCase();
                                                break;


                                        }
                                        actions += '<i class="' + clase + '"></i>' + data[equipoString].team[i].actions[a].minute + '\'';
                                    }
                                    actions += '</span>';
                                }
                                if (actions === '') {
                                    toolact += 'noactions';
                                }
                                if (equipoString === "lineupLocal") {
                                    vc = "local";
                                } else {
                                    vc = "visit";
                                }
                                var visiblep = (siexpulsado == 0) ? 'visible' : 'hidden';
                                imageJugador = (data[equipoString].team[i].image !== "") ? data[equipoString].team[i].image : 'http://i2.esmas.com/img/spacer.gif';
                                miHTML += '<span data-guid="' + data[equipoString].team[i].idjugador + '" class="player ' + vc + ' ' + arrow + '" style="left:' + positionx + 'px;top:' + positiony + 'px;visibility:' + visiblep + '">' +
                                    '<a href="#" title="' + data[equipoString].team[i].nickName + '">' +
                                    '<span class="number textcolor-title2">' + data[equipoString].team[i].number + '</span>' +
                                    '<span class="tooltip ' + toolact + '">' +
                                    '<img class="playerfoto" src="' + imageJugador + '" alt="' + data[equipoString].team[i].nickName + '" width="51" height="38" />' +
                                    '<span class="arrow"></span>' +
                                    '<span class="name">' + data[equipoString].team[i].nickName + '</span>' +
                                    '<span class="position textcolor-title2">' + data[equipoString].team[i].position + '</span>' + actions +
                                    '</span>' +
                                    '</a>' +
                                    '</span>';


                            };
                            el.find('span.players').html(miHTML).fadeIn('slow', function() {
                                $(this).css("display", "block");
                            });;
                            $("#LoadingCancha").hide('slow');

                            (tipo === "actualizacion") ? '' : $(".wdg_smex_strategy_01_dropdowncontent p").text(data.week);
                            //Alineacion final
                            if (tipo === "Alineacionfinal") {

                                //console.log("calcula la alineacion final");
                                for (var d = 0; d < data[equipoString].substitutes.length; d++) {
                                    var siexpulsado = 0;
                                    //console.log(data[equipoString].substitutes[d].nickName);;                                    
                                    if (typeof data[equipoString].substitutes[d].actions !== "undefined") {
                                        if (typeof data[equipoString].team[d] !== "undefined" && typeof data[equipoString].team[d].actions !== "undefined") {
                                            var actions2 = "";
                                            actions2 += '<em>acciones</em><span class="actions">';
                                            for (var a = 0; a < data[equipoString].team[d].actions.length; a++) {
                                                switch (data[equipoString].team[d].actions[a].type.toLowerCase()) {
                                                    case "amonestacion":
                                                        icon = "tvsa-mxm-yellowcard";
                                                        break;
                                                    case "segundaamonestacion":
                                                        icon = "tvsa-mxm-secondyellowcard";
                                                        siexpulsado = 1;
                                                        break;
                                                    case "expulsion":
                                                        icon = "tvsa-mxm-redcard";
                                                        siexpulsado = 1;
                                                        break;
                                                    case "fueradelugar":
                                                        icon = "tvsa-mxm-offside";
                                                        break;
                                                    case "tirodeesquina":
                                                        icon = "tvsa-mxm-cornerkick";
                                                        break;
                                                    case "iniciaelpartido":
                                                        icon = "tvsa-mxm-startfirsthalf";
                                                        break;
                                                    case "iniciasegundotiempo":
                                                        icon = "tvsa-mxm-startsecondhalf";
                                                        break;
                                                    case "-":
                                                        icon = "tvsa-mxm-startovertime";
                                                        break;
                                                    case "iniciaprimertiempoextra":
                                                        icon = "tvsa-mxm-startextrafirsthalf";
                                                        break;
                                                    case "iniciasegundotiempoextra":
                                                        icon = "tvsa-mxm-startextrasecondhalf";
                                                        break;
                                                    case "--":
                                                        icon = "tvsa-mxm-penalties";
                                                        break;
                                                    case "finalizaelpartido":
                                                        icon = "tvsa-mxm-gameend";
                                                        break;
                                                    case "pegaenelposte":
                                                        icon = "tvsa-mxm-crossbar";
                                                        break;
                                                    case "pasaporafuera":
                                                        icon = "tvsa-mxm-out";
                                                        break;
                                                    case "penal":
                                                        icon = "tvsa-mxm-penaltykick";
                                                        break;
                                                    case "atajada":
                                                        icon = "tvsa-mxm-block";
                                                        break;
                                                    case "autogollocal":
                                                        icon = "tvsa-mxm-owngoal";
                                                        break;
                                                    case "autogolvisitante":
                                                        icon = "tvsa-mxm-owngoal";
                                                        break;
                                                    case "gollocal":
                                                        icon = "tvsa-mxm-goal";
                                                        break;
                                                    case "golvisitante":
                                                        icon = "tvsa-mxm-goal";
                                                        break;
                                                    case "golpenallocal":
                                                        icon = "tvsa-mxm-goal";
                                                        break;
                                                    case "golpenalvisitante":
                                                        icon = "tvsa-mxm-goal";
                                                        break;
                                                    case "falta":
                                                        icon = "tvsa-mxm-foul";
                                                        break;
                                                    case "comentario":
                                                        icon = "tvsa-mxm-comment";
                                                        break;
                                                    case "datoestadistico":
                                                        icon = "tvsa-mxm-statisticdata";
                                                        break;
                                                    case "entraaljuego":
                                                        icon = "tvsa-mxm-playerin";
                                                        break;
                                                    case "saledeljuego":
                                                        icon = "tvsa-mxm-playerout";
                                                        break;
                                                    case "suspenciontemporaljuego":
                                                        icon = "tvsa-mxm-suspended";
                                                        break;
                                                    case "lesion":
                                                        icon = "tvsa-mxm-lesion";
                                                        break;
                                                    default:
                                                        icon = data[equipoString].team[d].actions[a].type.toLowerCase();
                                                        break;


                                                }
                                                actions2 += '<i class="' + icon + '"></i>' + data[equipoString].team[d].actions[a].minute + '\'';
                                            }
                                            actions2 += '</span>';
                                        }
                                        if (actions2 === '') {
                                            toolact += 'noactions';
                                        }
                                        if (equipoString === "lineupLocal") {
                                            vc = "local";
                                        } else {
                                            vc = "visit";
                                        }
                                        for (var f = 0; f < data[equipoString].substitutes[d].actions.length; f++) {
                                            //console.log(data[equipoString].substitutes[d].actions[f]);
                                            if (data[equipoString].substitutes[d].actions[f].type === "entraAlJuego") {
                                                //console.log(data[equipoString].substitutes[d].nickName);
                                                //console.log(data[equipoString].substitutes[d].actions[f].playeridchange); 
                                                ArregloHidden.push(data[equipoString].substitutes[d].actions[f].playeridchange);


                                                //var itemT = $("span[data-guid=" + data[equipoString].substitutes[d].actions[f].playeridchange + "]");
                                                // var nuevox = itemT.css("top");
                                                //var nuevoy = itemT.css("left");


                                                var nuevoy = data[equipoString].substitutes[d].posx;
                                                var nuevox = data[equipoString].substitutes[d].posy;
                                                var visiblejugador = (siexpulsado == 1) ? 'hidden' : 'visible';

                                                aliFinal += '<span data-guid="' + data[equipoString].substitutes[d].idjugador + '" class="player ' + vc + ' ' + arrow + '" style="left:' + nuevoy + 'px;top:' + nuevox + 'px;visibility:' + visiblejugador + '">' +
                                                    '<a href="#" title="' + data[equipoString].substitutes[d].nickName + '">' +
                                                    '<span class="number textcolor-title2">' + data[equipoString].substitutes[d].number + '</span>' +
                                                    '<span class="tooltip">' +
                                                    '<img class="playerfoto" src="' + data[equipoString].substitutes[d].image + '" alt="' + data[equipoString].substitutes[d].nickName + '" width="51" height="38" />' +
                                                    '<span class="arrow"></span>' +
                                                    '<span class="name">' + data[equipoString].substitutes[d].nickName + '</span>' +
                                                    '<span class="position textcolor-title2">' + data[equipoString].substitutes[d].position + '</span>' + actions2 +
                                                    '</span>' +
                                                    '</a>' +
                                                    '</span>';
                                            }


                                        };
                                    }
                                };



                                for (var k = 0; k < ArregloHidden.length; k++) {
                                    $("span[data-guid=" + ArregloHidden[k] + "]").remove();
                                };
                                el.find('span.players').append(aliFinal).fadeIn('slow', function() {
                                    $(this).css("display", "block");
                                });

                            }
                            // Alineacion Final   

                            $(".grid3 .noactions").css("top", "-90px");
                            $(".grid4 .noactions").css("top", "-90px");


                        };
                        //corrigiendo ceros
                        if (tipo !== "Alineacionfinal") {
                            for (var r = 0; r < data.lineupVisit.substitutes.length; r++) {
                                //console.log(typeof(data.lineupVisit.substitutes[r].actions))
                                if (typeof(data.lineupVisit.substitutes[r].actions) === "object") {
                                    for (var e = 0; e < data.lineupVisit.substitutes[r].actions.length; e++) {
                                        //console.log(data.lineupVisit.substitutes[r])
                                        if (data.lineupVisit.substitutes[r].actions[e].type === "entraAlJuego") {
                                            $("span[data-guid=" + data.lineupVisit.substitutes[r].actions[e].playeridchange + "]").css({
                                                'top': data.lineupVisit.substitutes[r].posy + 'px',
                                                'left': data.lineupVisit.substitutes[r].posx + 'px'
                                            });
                                        }
                                    };
                                }
                            };
                            for (var r = 0; r < data.lineupLocal.substitutes.length; r++) {
                                //console.log(typeof(data.lineupLocal.substitutes[r].actions))
                                if (typeof(data.lineupLocal.substitutes[r].actions) === "object") {
                                    for (var e = 0; e < data.lineupLocal.substitutes[r].actions.length; e++) {
                                        //console.log(data.lineupLocal.substitutes[r])
                                        if (data.lineupLocal.substitutes[r].actions[e].type === "entraAlJuego") {
                                            $("span[data-guid=" + data.lineupLocal.substitutes[r].actions[e].playeridchange + "]").css({
                                                'top': data.lineupLocal.substitutes[r].posy + 'px',
                                                'left': data.lineupLocal.substitutes[r].posx + 'px'
                                            });
                                        }
                                    };
                                }
                            };
                        }
                        //terminando correccion de ceros

                        if (setting.Promedio === true) {
                            wdg_smex_strategy.promedioCancha(promedio);
                        }
                        //Modulo alineacion
                        wdg_smex_strategy.MuestraAlineacion(data);


                        //Modulo expulsados
                        if (expulsadosLocal !== "undefined" || expulsadosVisit !== "undefined" || rojaLocal !== "undefined" || rojaVisit !== "undefined") {
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
                            wdg_smex_strategy.tagExpulsion.html(maqModEx).css('display', 'none');
                            wdg_smex_strategy.Modexpulsados(expulsadosLocal, expulsadosVisit, rojaLocal, rojaVisit);
                        }

                        if ($("#datosTIMHeader").length) {
                            clearInterval(wdg_smex_strategy.intervaloVe);
                            var imgLocal = $("#localImgTIM").text();
                            var imgVisit = $("#visitImgTIM").text();
                            $(".TIMimgLocal").attr('src', imgLocal);
                            $(".TIMimgVisit").attr('src', imgVisit);
                            $(".TIMimgLocal").addClass('linkbanderalocal');
                            $(".TIMimgVisit").addClass('linkbanderavisit');
                        }



                    }
                }).fail(function() {
                    $("#LoadingCancha").hide();
                });



                wdg_smex_strategy.verificar_views();

            },

            verificar_views: function() {
                //console.log(wdg_smex_strategy.urlview);
                var offCancha = 0,
                    offpromedio = 1;

                $.ajax({
                    url: wdg_smex_strategy.urlview,
                    type: 'GET',
                    dataType: 'json'
                })
                    .done(function(data) {

                        for (var i = 0; i < data.elementos.length; i++) {
                            //console.log(data.elementos[i].id);
                            if (data.elementos[i].id === "chkCampo") {
                                offCancha = data.elementos[i].activo;
                            }
                            if (data.elementos[i].id === "campo-campo_promedTeamInField") {
                                offpromedio = data.elementos[i].activo;
                            }
                        };

                        if (parseInt(offCancha) === 0) {
                            GlobalThis.hide('fast').addClass('hiddenimportant');
                        }
                        if (parseInt(offpromedio) === 0) {
                            $("#AlineacionPromedioTIM").hide('fast');
                        }

                    })
                    .fail(function() {
                        console.log("error al cargar views");
                    });



            },

            FunInicio: function() {

                try {
                    wdg_smex_strategy.finalesNaat();
                    wdg_smex_strategy.intervaloVe = setInterval(function() {
                        wdg_smex_strategy.listenerInfo();
                    }, 3000);
                } catch (e) {
                    console.log(e);
                }

                $('section.wdg_smex_strategy_01').each(function() {
                    /* Show Retina Version */
                    var root = (typeof exports === 'undefined' ? window : exports);
                    var config = {
                        check_mime_type: true
                    };
                    root.Retina = Retina;

                    function Retina() {}
                    Retina.configure = function(options) {
                        if (options === null) options = {};
                        for (var prop in options) config[prop] = options[prop];
                    };
                    Retina.isRetina = function() {
                        var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                                           (min--moz-device-pixel-ratio: 1.5),\
                                           (-o-min-device-pixel-ratio: 3/2),\
                                           (min-resolution: 1.5dppx)";
                        if (root.devicePixelRatio > 1)
                            return true;
                        if (root.matchMedia && root.matchMedia(mediaQuery).matches)
                            return true;
                        return false;
                    };

                    var $parent = $(this); // store component

                    if (Retina.isRetina()) {
                        var low = $parent.find('img.cancha').attr('src');
                        $parent.find('img.cancha').attr('src', low.replace('.png', '@2x.png'));
                    }

                    // load the first ajax players
                    //wdg_smex_strategy.loadAlineacion($parent, setting.ideventomxmtv);

                    if (setting.ideventomxm !== 0 && setting.ideventomxmtv !== 0) {
                        wdg_smex_strategy.loadAlineacion($parent, setting.ideventomxmtv);
                    };

                    var $parent = $('.wdg_smex_strategy_01');
                    var $dropdownAnchor = $parent.find('.wdg_smex_strategy_01_dropdown');


                    var $firstItem2 = $('.pleca_inferior .wdg_smex_strategy_01_dropdownlist li:first-child');
                    $('.pleca_inferior .wdg_smex_strategy_01_dropdowncontent p').html($firstItem2.find('p').html());

                    $dropdownAnchor.bind('click', 'touchstart', function(evt) {

                        evt.preventDefault();

                        var listItems = $(this).find('.wdg_smex_strategy_01_listcontainer').find('.wdg_smex_strategy_01_dropdownlist');
                        var padre = $(this);
                        var visibilidad = listItems.css('visibility');

                        if (visibilidad === 'hidden')
                            listItems.css({
                                visibility: 'visible',
                                height: 'auto',
                                'max-height': '180px',
                                'overflow-y': 'scroll',
                                'overflow-x': 'hidden'
                            });
                        else
                            listItems.css({
                                visibility: 'hidden',
                                height: '0px'
                            });

                        /*    $dropdownAnchor.bind('mouseleave', function(evt) {
                        evt.preventDefault();
                        var $listItems = $(this).find('.wdg_smex_strategy_01_dropdownlist');
                        var visibilidad = $listItems.css('visibility');
                        if ( visibilidad == 'visible' ) {
                            $listItems.css({
                                visibility: 'hidden',
                                height: '0px'       
                            });
                        } 
                    });*/

                        //var $dropdownItems2 = $(this).find('.wdg_smex_strategy_01_dropdownlist li');
                        var dropdownItems2 = $('.wdg_smex_strategy_01_dropdownlist li');
                        //              $dropdownItems2.bind('click','touchstart', function(evt) {

                        dropdownItems2.unbind().bind('click', function(evt) {
                            evt.preventDefault();
                            $("#LoadingCancha").show();
                            padre.find('.wdg_smex_strategy_01_dropdowncontent p').html($(this).find('p').html());



                            // calling the AJAX method

                            wdg_smex_strategy.loadAlineacion($parent, $(this).find('p').data('field'));
                            //                  wdg_smex_strategy.loadAlineacion($parent, 1455,'actualizacion');


                            // Cambiar Campos //

                            $('.wdg_smex_strategy_01 table tr td').removeClass();
                            $('.wdg_smex_strategy_01 table tr td a').removeClass();
                            $('.wdg_smex_strategy_01 table tr td').addClass('largo');
                            $('.wdg_smex_strategy_01 table tr td a').addClass('font_menu');

                            var field = $(this).find('p').attr("data-field");


                            $('.wdg_smex_strategy_01 .campo').hide();
                            //$('.wdg_smex_strategy_01 .' + field).show();

                        });


                    });
                });

                /*Desktop*/
                $('section.wdg_smex_strategy_01 .player a').live('mouseenter', function(event) {
                    event.preventDefault();
                    //$(this).children('.tooltip').css('display', 'block');
                    $(this).children('.tooltip').stop(true, true).delay(100).fadeIn('fast', function() {
                        $(this).css('display', 'block');
                    });
                });
                $('section.wdg_smex_strategy_01 .player a').live('mouseleave', function(event) {
                    event.preventDefault();
                    //$(this).children('.tooltip').css('display', 'none');
                    $(this).children('.tooltip').stop(true, true).delay(500).fadeOut('fast', function() {
                        $(this).css('display', 'none');
                    });
                });
                if ($(window).width() < 948) {
                    /*Tablet-Mobile*/
                    $('section.wdg_smex_strategy_01 .player a').live('click', 'touchstart', function(event) {
                        event.preventDefault();
                        $wss1_status = $(this).children('.tooltip').css('display');
                        if ($wss1_status === 'block') {
                            //$(this).children('.tooltip').css('display', 'none');
                            $(this).children('.tooltip').stop(true, true).delay(500).fadeOut('fast', function() {
                                $(this).css('display', 'none');
                            });
                        } else {
                            //$(this).children('.tooltip').css('display', 'block');
                            $(this).children('.tooltip').stop(true, true).delay(100).fadeIn('fast', function() {
                                $(this).css('display', 'block');
                            });
                        }
                    });
                    $('section.wdg_smex_strategy_01 .player a > span').bind("touchstart", function(event) {
                        event.preventDefault();
                    });
                }

            },
            botonesAlineacion: function() {
                var preview = "";
                GlobalThis.find('.menu li').unbind().bind('click', function(event) {
                    event.preventDefault();
                    if (!$(this).hasClass('active')) {
                        $("#LoadingCancha").show();
                        $(this).parent('ul').find('li').each(function() {
                            $(this).removeClass('active');
                        });
                        $(this).addClass('active');

                        preview = String($(this).children('a').data('query')).toLowerCase();

                        switch (preview) {
                            case 'inicial':
                                wdg_smex_strategy.AlineacionInicial();
                                break;
                            case 'final':
                                $.when(wdg_smex_strategy.AlineacionFinal()).done(function() {
                                    //wdg_smex_strategy.updatePlayers();
                                });

                                break;
                        }
                    }



                });

            },
            AlineacionInicial: function() {
                //console.log("Es la alinacion INICIAL");
                wdg_smex_strategy.loadAlineacion(GlobalThis, setting.ideventomxmtv);
            },
            AlineacionFinal: function() {
                wdg_smex_strategy.loadAlineacion(GlobalThis, setting.ideventomxmtv, 'Alineacionfinal');
            },
            /*
            header: function() {
                $.ajax({
                    url: wdg_smex_strategy.urlmxmheader,
                    jsonpCallback: 'mxmheader',
                    type: 'GET',
                    dataType: 'jsonp'
                })
                    .done(function(data) {
                        wdg_smex_strategy.timeUpdate(data.fechaPartido, data.horaPartido);
                    })
                    .fail(function() {
                        console.log("Error al cargar el header " + wdg_smex_strategy.urlmxmheader);
                    })






            },

            timeUpdate: function(dia, hora) {
            console.log("entrando en timeUpdate");
                var tiempoActualizacion = 0;
                var FechaPartido = dia.substring(3, 5) + '-' + dia.substring(0, 2) + '-' + dia.substring(8, 10) + ' ' + hora.substring(0, 5) + ':00';
                $.ajax({
                    url: "http://mxm.televisadeportes.esmas.com/deportes/home/timetvjsonp.js",
                    async: false,
                    cache: false,
                    dataType: 'jsonp',
                    jsonpCallback: 'timetv',
                    success: function(data) {
                        var arr = '';
                        var m = 0;
                        var anio = 0;

                        horas = data.timetv;
                        arr = data.fechatv.replace(/_/gi, "-").split("-");
                        m = parseInt(arr[1]) + 1;

                        if (String(m).length == 1) {
                            m = '0' + m;
                        }
                        anio = parseInt(arr[2]) + 1900;
                        fechas = m + '-' + arr[0] + '-' + anio;
                        fechas = fechas + ' ' + horas + ':00';

                        var a = new Date(FechaPartido);
                        var b = new Date(fechas);

                        var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
                        var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

                        if (parseFloat(msDateA) < parseFloat(msDateB)) {
                            console.log("MENOR");
                        } else {
                            if (parseFloat(msDateA) == parseFloat(msDateB)) {
                                console.log("IGUAL");
                                tiempoActualizacion = 60000;
                                var resta = parseInt(b.getHours() - a.getHours());
                                //cop
                                if (b.getHours() >= a.getHours()) {
                                    console.log("ya empezo el partido");
                                    //Ya empezo el partido, actualizar valores cada minuto                                      
                                    tiempoActualizacion = 60000;
                                } else {
                                    var h1 = a.getHours();
                                    var h2 = b.getHours();
                                    var m1 = a.getMinutes();
                                    var m2 = b.getMinutes();
                                    //Validar cuantos minutos faltan para el inicio del partido
                                    var minutosrestantes = (((h1 - h2) * 60) + m1) - m2;

                                    if (minutosrestantes <= 15) {
                                        console.log("faltan menos de 15 min");
                                        //Faltan 15 minutos o menos para el inicio, actualizar los valores cada minuto
                                        tiempoActualizacion = 60000;

                                    } else {
                                        console.log("faltan mas de 15 pero menos de 1hr " + minutosrestantes);
                                        //Faltan mas de 15 minutos para el inicio, actualizar los valores cada 15 minutos pero menos de una hora

                                        (minutosrestantes < 60) ? tiempoActualizacion = 900000 : '';
                                    }
                                }
                                //cop
                                console.log(tiempoActualizacion)
                                if (tiempoActualizacion !== 0) {
                                    setInterval(function() {
                                        wdg_smex_strategy.updatePlayers()
                                    }, tiempoActualizacion);
                                }

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
            }, // End timeUpdate()
            */

            updatePlayers: function() {
                //console.log("method updatePlayers");
                var itemActual, itemleft, itemtop, NuevosJugadores = "";

                $.ajax({
                    url: wdg_smex_strategy.urlFinalAlienacion,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'datagame',
                    cache: false
                })
                    .done(function(data) {
                        var equipos = new Array("lineupLocal", "lineupVisit");
                        var actionsPlayer;
                        var newTop, newLeft, vc;

                        for (var z = 0; z < equipos.length; z++) {
                            var equipoString = String(equipos[z]);

                            for (var i = 0; i < data[equipoString].substitutes.length; i++) {
                                var siexpulsado = 0;
                                actionsPlayer = data[equipoString].substitutes[i].actions;
                                if (typeof actionsPlayer !== "undefined") {
                                    for (var x = 0; x < actionsPlayer.length; x++) {
                                        if (actionsPlayer[x].type.toLowerCase() === "entraaljuego") {




                                            /* if ($("div[data-guid=" + data[equipoString].substitutes[i].idjugador + "] ").hasClass('EqLTIM')) {
                                                $("div[data-guid=" + data[equipoString].substitutes[i].idjugador + "] ").prependTo('#jugadoreslocalTIM');
                                            } else {
                                                $("div[data-guid=" + data[equipoString].substitutes[i].idjugador + "]").prependTo('#jugadoresvisitTIM');
                                            }*/


                                            itemActual = $("span[data-guid=" + actionsPlayer[x].playeridchange + "]");
                                            //console.log(itemActual)

                                            /*if ($("div[data-guid=" + actionsPlayer[x].playeridchange + "]").hasClass('EqLTIM')) {
                                                $("div[data-guid=" + actionsPlayer[x].playeridchange + "]").prependTo("#localbancaTIM");
                                            } else {
                                                $("div[data-guid=" + actionsPlayer[x].playeridchange + "]").prependTo("#visitbandaTIM");

                                            }*/


                                            if (itemActual.length) {
                                                itemtop = itemActual.css('top');
                                                itemleft = itemActual.css('left');

                                                var arrow = '';
                                                var toolact = '';
                                                var actions = '',
                                                    icon = '';
                                                positionx = parseInt(itemleft);
                                                positiony = parseInt(itemtop);
                                                positionx = (isNaN(positionx)) ? 0 : positionx;
                                                positiony = (isNaN(positiony)) ? 0 : positiony;

                                                if (positionx <= 290 && positiony <= 140) arrow = 'grid1';
                                                else if (positionx <= 290 && positiony > 140) arrow = 'grid3';
                                                else if (positionx > 290 && positiony <= 140) arrow = 'grid2';
                                                else arrow = 'grid4';

                                                if (typeof data[equipoString].substitutes[i].actions !== "undefined") {
                                                    actions += '<em>acciones</em><span class="actions">';
                                                    for (var a = 0; a < data[equipoString].substitutes[i].actions.length; a++) {
                                                        switch (data[equipoString].substitutes[i].actions[a].type.toLowerCase()) {
                                                            case "amonestacion":
                                                                icon = "tvsa-mxm-yellowcard";
                                                                break;
                                                            case "segundaamonestacion":
                                                                icon = "tvsa-mxm-secondyellowcard";
                                                                siexpulsado = 1;
                                                                break;
                                                            case "expulsion":
                                                                icon = "tvsa-mxm-redcard";
                                                                siexpulsado = 1;
                                                                break;
                                                            case "fueradelugar":
                                                                icon = "tvsa-mxm-offside";
                                                                break;
                                                            case "tirodeesquina":
                                                                icon = "tvsa-mxm-cornerkick";
                                                                break;
                                                            case "iniciaelpartido":
                                                                icon = "tvsa-mxm-startfirsthalf";
                                                                break;
                                                            case "iniciasegundotiempo":
                                                                icon = "tvsa-mxm-startsecondhalf";
                                                                break;
                                                            case "-":
                                                                icon = "tvsa-mxm-startovertime";
                                                                break;
                                                            case "iniciaprimertiempoextra":
                                                                icon = "tvsa-mxm-startextrafirsthalf";
                                                                break;
                                                            case "iniciasegundotiempoextra":
                                                                icon = "tvsa-mxm-startextrasecondhalf";
                                                                break;
                                                            case "--":
                                                                icon = "tvsa-mxm-penalties";
                                                                break;
                                                            case "finalizaelpartido":
                                                                icon = "tvsa-mxm-gameend";
                                                                break;
                                                            case "pegaenelposte":
                                                                icon = "tvsa-mxm-crossbar";
                                                                break;
                                                            case "pasaporafuera":
                                                                icon = "tvsa-mxm-out";
                                                                break;
                                                            case "penal":
                                                                icon = "tvsa-mxm-penaltykick";
                                                                break;
                                                            case "atajada":
                                                                icon = "tvsa-mxm-block";
                                                                break;
                                                            case "autogollocal":
                                                                icon = "tvsa-mxm-owngoal";
                                                                break;
                                                            case "autogolvisitante":
                                                                icon = "tvsa-mxm-owngoal";
                                                                break;
                                                            case "gollocal":
                                                                icon = "tvsa-mxm-goal";
                                                                break;
                                                            case "golvisitante":
                                                                icon = "tvsa-mxm-goal";
                                                                break;
                                                            case "golpenallocal":
                                                                icon = "tvsa-mxm-goal";
                                                                break;
                                                            case "golpenalvisitante":
                                                                icon = "tvsa-mxm-goal";
                                                                break;
                                                            case "falta":
                                                                icon = "tvsa-mxm-foul";
                                                                break;
                                                            case "comentario":
                                                                icon = "tvsa-mxm-comment";
                                                                break;
                                                            case "datoestadistico":
                                                                icon = "tvsa-mxm-statisticdata";
                                                                break;
                                                            case "entraaljuego":
                                                                icon = "tvsa-mxm-playerin";
                                                                break;
                                                            case "saledeljuego":
                                                                icon = "tvsa-mxm-playerout";
                                                                break;
                                                            case "suspenciontemporaljuego":
                                                                icon = "tvsa-mxm-suspended";
                                                                break;
                                                            case "lesion":
                                                                icon = "tvsa-mxm-lesion";
                                                                break;
                                                            default:
                                                                icon = data[equipoString].substitutes[i].actions[a].type.toLowerCase();
                                                                break;


                                                        }
                                                        actions += '<i class="' + icon + '"></i>' + data[equipoString].substitutes[i].actions[a].minute + '\'';
                                                    }
                                                    actions += '</span>';
                                                }
                                                if (actions === '') {
                                                    toolact += 'noactions';
                                                }

                                                vc = (equipos[z] === "lineupLocal") ? 'local' : 'visit';
                                                var expulsaplayer = (siexpulsado == 1) ? 'hidden' : 'visible';
                                                NuevosJugadores += '<span data-guid="' + data[equipoString].substitutes[i].idjugador + '" class="player ' + vc + ' ' + arrow + '" style="left:' + itemleft + ';top:' + itemtop + ';display:none;visibility:' + expulsaplayer + '">' +
                                                    '<a href="#" title="' + data[equipoString].substitutes[i].nickName + ' ' + data[equipoString].substitutes[i].nickName + '">' +
                                                    '<span class="number textcolor-title2">' + data[equipoString].substitutes[i].number + '</span>' +
                                                    '<span class="tooltip ' + toolact + '">' +
                                                    '<img class="playerfoto" src="' + data[equipoString].substitutes[i].image + '" alt="' + data[equipoString].substitutes[i].nickName + '" width="51" height="38" />' +
                                                    '<span class="arrow"></span>' +
                                                    '<span class="name">' + data[equipoString].substitutes[i].nickName + ' ' + data[equipoString].substitutes[i].nickName + '</span>' +
                                                    '<span class="position textcolor-title2">' + data[equipoString].substitutes[i].position + '</span>' + actions +
                                                    '</span>' +
                                                    '</a>' +
                                                    '</span>';

                                                itemActual.fadeOut('fast', function() {
                                                    $(this).remove();
                                                });



                                            }


                                        }
                                    };
                                };


                            };



                        }; // equipos array

                        GlobalThis.find(".players").append(NuevosJugadores).children().fadeIn('slow', function() {
                            GlobalThis.find(".players").css("display", "block");
                        });

                        // update goles 
                        var golesLocal = (typeof(data.goalsLocal) !== "undefined") ? data.goalsLocal : '';
                        var golesVisit = (typeof(data.goalsVisit) !== "undefined") ? data.goalsVisit : '';
                        wdg_smex_strategy.updateGolesAnotados(golesLocal, golesVisit, data.lineupLocal.name, data.lineupVisit.name);

                        //update amonestados
                        var localexp = (typeof(data.lineupLocal.penalization) !== "undefined") ? data.lineupLocal.penalization : '',
                            visitexo = (typeof(data.lineupVisit.penalization) !== "undefined") ? data.lineupVisit.penalization : '',
                            localroj = (typeof(data.lineupLocal.expelled) !== "undefined") ? data.lineupLocal.expelled : '',
                            visitroj = (typeof(data.lineupVisit.expelled) !== "undefined") ? data.lineupVisit.expelled : '';

                        wdg_smex_strategy.ModexpulsadosUpdate(localexp, visitexo, localroj, visitroj);

                        if (typeof(data.PenaltiesLocal) !== "undefined" || typeof(data.PenaltiesVisit) !== "undefined") {
                            wdg_smex_strategy.wdgPenalesupdate(data.PenaltiesLocal, data.PenaltiesVisit, data.lineupLocal.name, data.lineupVisit.name);
                        }


                    })
                    .fail(function() {
                        console.log("error update jugadores");


                    });


            }, //updatePlayers

            promedioCancha: function(data) {
                var maquetado = "";

                maquetado += '<div class="wdg_avgfield_01">';
                maquetado += '<div class="str_pleca_01 collapsable">';
                maquetado += '<div class="str_pleca_01_title">';
                maquetado += '<h3 class="background-color-pleca1"><a href="#" title="Link Description" class="textcolor-title3">Promedio en cancha</a></h3></div>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_01_content">';
                maquetado += '<div class="wdg_avgfield_01_row">';
                maquetado += '<div class="wdg_avgfield_01_title">';
                maquetado += '<a class="wdg_avgfield_01_red textcolor-title1" href="">EVENTOS</a></div>';
                maquetado += '<div class="wdg_avgfield_01_teams">';
                maquetado += '<div class="wdg_avgfield_01_teama">';
                maquetado += '<div class="element"><img src="http://i2.esmas.com/img/spacer.gif" class="TIMimgLocal"></div>';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += '<div class="wdg_avgfield_01_teamb"><img src="http://i2.esmas.com/img/spacer.gif" class="TIMimgVisit"></div>';
                maquetado += '</div></div>';
                maquetado += '<div class="wdg_avgfield_01_row">';
                maquetado += '<div class="wdg_avgfield_01_title"><a href="">Edad</a></div>';
                maquetado += '<div class="wdg_avgfield_01_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_01_teama">';
                maquetado += '<div class="element textcolor-title2">' + data[0].Edad + '</div>';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += '<div class="wdg_avgfield_01_teamb textcolor-title2">' + data[1].Edad + '</div>';
                maquetado += '</div></div>';
                maquetado += '<div class="wdg_avgfield_01_row">';
                maquetado += '<div class="wdg_avgfield_01_title"><a href="">Estatura</a></div>';
                maquetado += '<div class="wdg_avgfield_01_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_01_teama">';
                maquetado += '<div class="element textcolor-title2">' + data[0].Estatura + '</div>';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += '<div class="wdg_avgfield_01_teamb textcolor-title2">' + data[1].Estatura + '</div>';
                maquetado += '</div></div>';
                maquetado += '<div class="wdg_avgfield_01_row">';
                maquetado += '<div class="wdg_avgfield_01_title"><a href="">Peso</a></div>';
                maquetado += '<div class="wdg_avgfield_01_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_01_teama">';
                maquetado += '<div class="element textcolor-title2">' + data[0].Peso + '</div>';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += '<div class="wdg_avgfield_01_teamb textcolor-title2">' + data[1].Peso + '</div> ';
                maquetado += '</div></div></div></div>';

                wdg_smex_strategy.tagPromedio.html(maquetado);


            }, // promedio Cancha

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
                        arrayGlobal[minuto] = localm;
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
                        arrayGlobal[minuto] = visitm;
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
                    wdg_smex_strategy.tagExpulsion.show('fast', function() {
                        $(this).css('display', 'block');
                    });
                    wdg_smex_strategy.tagExpulsion.find(".convocados").append(itemshtml);
                    wdg_smex_strategy.tagExpulsion.find(".bodyt").slideDown('slow', function() {
                        $(this).css('display', 'block');
                    });
                }





            }, // Modexpulsados

            ModexpulsadosUpdate: function(local, visit, rojaLocal, rojaVisit) {

                var arrayGlobal = new Array(),
                    localm = "",
                    visitm = "",
                    finalHTML = "";
                var itemfeed = local.length + visit.length + rojaLocal.length + rojaVisit.length;
                var actualitems = wdg_smex_strategy.tagExpulsion.find(".bodyt").size();
                //console.log("itemfeed: " + itemfeed);
                //console.log("actualitems: " + actualitems);
                if (itemfeed > actualitems) {
                    if (local.length !== 0) {
                        for (var i = 0; i < local.length; i++) {
                            var minuto = 0;
                            for (var z = 0; z < local[i].actions.length; z++) {
                                if (local[i].actions[z].type === "amonestacion") {
                                    minuto = z;
                                }
                            };
                            localm = "";
                            localm += '<div class="' + local[i].actions[minuto].minute + ' bodyt dotted-bottom" id="expulsado' + local[i].actions[minuto].minute + '" style="display:none;">';
                            localm += '<div class="textcolor-title1">' + local[i].number + '</div>';
                            localm += '<div class="dotted-left name"><p>' + local[i].nickName + '</p></div>';
                            localm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm-yellowcard"></i>' + local[i].actions[minuto].minute + '\'</div>';
                            localm += '<div class="textcolor-title4 dotted-left">&nbsp;</div></div>';
                            if (!$('#expulsado' + local[i].actions[minuto].minute + '').length) {
                                //arrayGlobal[minuto] = localm;
                                arrayGlobal.push(localm);
                            }

                        };

                    }
                    if (rojaLocal.length !== 0) {
                        for (var j = 0; j < rojaLocal.length; j++) {
                            var minuto = rojaLocal[j].minute,
                                clase = (rojaLocal[j].type === "segundaAmonestacion") ? 'tvsa-mxm-secondyellowcard' : 'tvsa-mxm-redcard';
                            localm = "";
                            localm += '<div class="' + minuto + ' bodyt dotted-bottom" id="expulsado' + minuto + '">';
                            localm += '<div class="textcolor-title1">' + rojaLocal[j].number + '</div>';
                            localm += '<div class="dotted-left name"><p>' + rojaLocal[j].nickName + '</p></div>';
                            localm += '<div class="textcolor-title4 dotted-left"><i class="' + clase + '"></i>' + minuto + '\'</div>';
                            localm += '<div class="textcolor-title4 dotted-left">&nbsp;</div></div>';
                            if (!$('#expulsado' + minuto + '').length) {
                                //arrayGlobal[minuto] = localm;
                                arrayGlobal.push(localm);
                            }

                        };
                    }
                    if (visit.length !== 0) {
                        for (var k = 0; k < visit.length; k++) {
                            var minuto = 0;
                            for (var y = 0; y < visit[k].actions.length; y++) {
                                if (visit[k].actions[y].type === "amonestacion") {
                                    minuto = y;
                                }
                            };
                            visitm = "";
                            visitm += '<div class="' + visit[k].actions[minuto].minute + ' bodyt dotted-bottom" id="expulsado' + visit[k].actions[minuto].minute + '" style="display:none;">';
                            visitm += '<div class="textcolor-title2">' + visit[k].number + '</div>';
                            visitm += '<div class="dotted-left name"><p>' + visit[k].nickName + '</p></div>';
                            visitm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm">&nbsp;</i></div>';
                            visitm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm-yellowcard"></i>' + visit[k].actions[minuto].minute + '\'</div></div>';
                            if (!$('#expulsado' + visit[k].actions[minuto].minute + '').length) {
                                arrayGlobal.push(visitm);
                            }

                        };

                    }
                    if (rojaVisit.length !== 0) {
                        for (var r = 0; r < rojaVisit.length; r++) {
                            var minuto = rojaVisit[r].minute,
                                clase = (rojaVisit[r].type === "segundaAmonestacion") ? 'tvsa-mxm-secondyellowcard' : 'tvsa-mxm-redcard';
                            visitm = "";
                            visitm += '<div class="' + minuto + ' bodyt dotted-bottom" id="expulsado' + minuto + '">';
                            visitm += '<div class="textcolor-title2">' + rojaVisit[r].number + '</div>';
                            visitm += '<div class="dotted-left name"><p>' + rojaVisit[r].nickName + '</p></div>';
                            visitm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm">&nbsp;</i></div>';
                            visitm += '<div class="textcolor-title4 dotted-left"><i class="' + clase + '"></i>' + minuto + '\'</div></div>';
                            if (!$('#expulsado' + minuto + '').length) {
                                arrayGlobal.push(visitm);
                            }

                        };
                    }

                    for (var x = 0; x < arrayGlobal.sort().length; x++) {
                        finalHTML += arrayGlobal.sort()[x];
                    };

                    if (finalHTML !== "") {
                        wdg_smex_strategy.tagExpulsion.show('slow', function() {
                            $(this).css('display', 'block');
                        });
                        wdg_smex_strategy.tagExpulsion.find(".convocados").append(finalHTML);
                        wdg_smex_strategy.tagExpulsion.find(".bodyt").slideDown('slow', function() {
                            $(this).css('display', 'block');
                        });
                    }


                }
            },

            MuestraAlineacion: function(data) {
                var golesLocal = (typeof(data.goalsLocal) !== "undefined") ? data.goalsLocal : '';
                var golesVisit = (typeof(data.goalsVisit) !== "undefined") ? data.goalsVisit : '';
                var ActL = "",
                    ActV = "";

                wdg_smex_strategy.GolesAnotados(golesLocal, golesVisit, data.lineupLocal.name, data.lineupVisit.name);


                if (typeof(data.PenaltiesLocal) !== "undefined" || typeof(data.PenaltiesVisit) !== "undefined") {
                    wdg_smex_strategy.wdgPenales(data.PenaltiesLocal, data.PenaltiesVisit, data.lineupLocal.name, data.lineupVisit.name);
                }

                var maquetado = "",
                    local = '',
                    visit = '',
                    visitSub = '',
                    localSub = '';

                function givemeName(parametro) {
                    var tmp = parametro;
                    var tmp2 = tmp.split(":");
                    return tmp2[tmp2.length - 1];
                }

                function formatNombre(cadena) {
                    if (cadena.length > 14) {
                        var sp = cadena.split(" ");
                        var cadenaNueva = "",
                            nuevo = sp.length - 1;
                        for (var i = 0; i < nuevo; i++) {
                            cadenaNueva += sp[i] + ' ';
                        };
                        cadenaNueva += '<br>' + sp[nuevo];
                        return cadenaNueva;
                    } else {
                        return cadena;
                    }
                }

                function giveActions(array) {
                    var acteaml = "",
                        clase = "";
                    for (var q = 0; q < array.length; q++) {
                        switch (array[q].type.toLowerCase()) {
                            case "amonestacion":
                                clase = "tvsa-mxm-yellowcard";
                                break;
                            case "segundaamonestacion":
                                clase = "tvsa-mxm-secondyellowcard";
                                break;
                            case "expulsion":
                                clase = "tvsa-mxm-redcard";
                                break;
                            case "fueradelugar":
                                clase = "tvsa-mxm-offside";
                                break;
                            case "tirodeesquina":
                                clase = "tvsa-mxm-cornerkick";
                                break;
                            case "iniciaelpartido":
                                clase = "tvsa-mxm-startfirsthalf";
                                break;
                            case "iniciasegundotiempo":
                                clase = "tvsa-mxm-startsecondhalf";
                                break;
                            case "-":
                                clase = "tvsa-mxm-startovertime";
                                break;
                            case "iniciaprimertiempoextra":
                                clase = "tvsa-mxm-startextrafirsthalf";
                                break;
                            case "iniciasegundotiempoextra":
                                clase = "tvsa-mxm-startextrasecondhalf";
                                break;
                            case "--":
                                clase = "tvsa-mxm-penalties";
                                break;
                            case "finalizaelpartido":
                                clase = "tvsa-mxm-gameend";
                                break;
                            case "pegaenelposte":
                                clase = "tvsa-mxm-crossbar";
                                break;
                            case "pasaporafuera":
                                clase = "tvsa-mxm-out";
                                break;
                            case "penal":
                                clase = "tvsa-mxm-penaltykick";
                                break;
                            case "atajada":
                                clase = "tvsa-mxm-block";
                                break;
                            case "autogollocal":
                                clase = "tvsa-mxm-owngoal";
                                break;
                            case "autogolvisitante":
                                clase = "tvsa-mxm-owngoal";
                                break;
                            case "gollocal":
                                clase = "tvsa-mxm-goal";
                                break;
                            case "golvisitante":
                                clase = "tvsa-mxm-goal";
                                break;
                            case "golpenallocal":
                                clase = "tvsa-mxm-goal";
                                break;
                            case "golpenalvisitante":
                                clase = "tvsa-mxm-goal";
                                break;
                            case "falta":
                                clase = "tvsa-mxm-foul";
                                break;
                            case "comentario":
                                clase = "tvsa-mxm-comment";
                                break;
                            case "datoestadistico":
                                clase = "tvsa-mxm-statisticdata";
                                break;
                            case "entraaljuego":
                                clase = "tvsa-mxm-playerin";
                                break;
                            case "saledeljuego":
                                clase = "tvsa-mxm-playerout";
                                break;
                            case "suspenciontemporaljuego":
                                clase = "tvsa-mxm-suspended";
                                break;
                            case "lesion":
                                clase = "tvsa-mxm-lesion";
                                break;
                            default:
                                clase = array[q].type.toLowerCase();
                                break;


                        }
                        acteaml += '<i class="' + clase + '"></i><span>' + array[q].minute + '\'</span>';
                    };
                    return acteaml;
                }

                var localportero = new Array(),
                    localdefensas = new Array(),
                    localmedios = new Array(),
                    localdelanteros = new Array(),
                    localotros = new Array(),
                    visitportero = new Array(),
                    visitdefensas = new Array(),
                    visitmedios = new Array(),
                    visitdelanteros = new Array(),
                    visitotros = new Array(),
                    positionPlayerM = "",
                    localF = "",
                    visitF = "";

                for (var i = 0; i < data.lineupLocal.team.length; i++) {
                    ActL = "", positionPlayerM = data.lineupLocal.team[i].position;
                    if (typeof(data.lineupLocal.team[i].actions) === "object") {
                        ActL = giveActions(data.lineupLocal.team[i].actions);
                    };

                    local = '<div class="player_td dotted-bottom EqLTIM" data-guid="' + data.lineupLocal.team[i].idjugador + '">';
                    local += '<div class="player_number"><p class="textcolor-title2">' + data.lineupLocal.team[i].number + '</p></div>';
                    local += '<div class="dotted-left container_card">';
                    local += '<div class="player_name"><p>' + formatNombre(data.lineupLocal.team[i].nickName) + '</p></div>';
                    local += '<div class="players_icons">';
                    local += ActL;
                    local += '</div></div></div>';


                    if (positionPlayerM === "GK") {
                        localportero.push(local);
                    } else if (positionPlayerM === "D") {
                        localdefensas.push(local);
                    } else if (positionPlayerM === "MF") {
                        localmedios.push(local);
                    } else if (positionPlayerM === "F") {
                        localdelanteros.push(local);
                    } else {
                        localotros.push(local);
                    }


                };

                var localGlobal = localportero.concat(localdefensas, localmedios, localdelanteros, localotros);
                for (var m = 0; m < localGlobal.length; m++) {
                    localF += localGlobal[m];
                };

                if (typeof(data.lineupLocal.coach) !== "undefined") {
                    localF += '<div class="player_td">';
                    localF += '<div class="player_number"><p class="textcolor-title1">DT</p></div>';
                    localF += '<div class="dotted-left container_card">';
                    localF += '<div class="player_name"><p>' + data.lineupLocal.coach.longName + '</p></div>';
                    localF += '<div class="players_icons">';
                    //local += '<i class="tvsa-mxm-yellowcard"></i><span>17\'</span>';
                    localF += '</div></div></div>';
                }




                for (var j = 0; j < data.lineupVisit.team.length; j++) {
                    ActV = "", positionPlayerM = data.lineupVisit.team[j].position;
                    if (typeof(data.lineupVisit.team[j].actions) === "object") {
                        ActV = giveActions(data.lineupVisit.team[j].actions);
                    };

                    visit = '<div class="player_td dotted-bottom EqVTIM" data-guid="' + data.lineupVisit.team[j].idjugador + '">';
                    visit += '<div class="player_number"><p class="textcolor-title2">' + data.lineupVisit.team[j].number + '</p></div>';
                    visit += '<div class="dotted-left container_card">';
                    visit += '<div class="player_name"><p>' + formatNombre(data.lineupVisit.team[j].nickName) + '</p></div>';
                    visit += '<div class="players_icons">';
                    visit += ActV;
                    visit += '</div></div></div>';
                    if (positionPlayerM === "GK") {
                        visitportero.push(visit);
                    } else if (positionPlayerM === "D") {
                        visitdefensas.push(visit);
                    } else if (positionPlayerM === "MF") {
                        visitmedios.push(visit);
                    } else if (positionPlayerM === "F") {
                        visitdelanteros.push(visit);
                    } else {
                        visitotros.push(visit);
                    }
                };
                var visitGlobal = visitportero.concat(visitdefensas, visitmedios, visitdelanteros, visitotros);
                for (var w = 0; w < visitGlobal.length; w++) {
                    visitF += visitGlobal[w];
                };
                if (typeof(data.lineupVisit.coach) !== "undefined") {
                    visitF += '<div class="player_td">';
                    visitF += '<div class="player_number"><p class="textcolor-title1">DT</p></div>';
                    visitF += '<div class="dotted-left">';
                    visitF += '<div class="player_name container_card"><p>' + data.lineupVisit.coach.longName + '</p></div>';
                    visitF += '<div class="players_icons">';
                    //visit += '<i class="tvsa-mxm-yellowcard"></i><span>17\'</span>';
                    visitF += '</div></div></div>';
                }


                for (var p = 0; p < data.lineupLocal.substitutes.length; p++) {
                    var ActLB = "";

                    if (typeof(data.lineupLocal.substitutes[p].actions) === "object") {
                        ActLB = giveActions(data.lineupLocal.substitutes[p].actions);
                    }

                    localSub += '<div class="player_td dotted-bottom EqLTIM" data-guid="' + data.lineupLocal.substitutes[p].idjugador + '">';
                    localSub += '<div class="player_number"><p class="textcolor-title2">' + data.lineupLocal.substitutes[p].number + '</p></div>';
                    localSub += '<div class="dotted-left container_card">';
                    localSub += '<div class="player_name"><p>' + formatNombre(data.lineupLocal.substitutes[p].nickName) + '</p></div>';
                    localSub += '<div class="players_icons">';
                    localSub += ActLB;
                    localSub += '</div></div></div>';
                };

                for (var o = 0; o < data.lineupVisit.substitutes.length; o++) {
                    var ActVB = "";
                    if (typeof(data.lineupVisit.substitutes[o].actions) === "object") {
                        ActVB = giveActions(data.lineupVisit.substitutes[o].actions);
                    }

                    visitSub += '<div class="player_td dotted-bottom EqVTIM" data-guid="' + data.lineupVisit.substitutes[o].idjugador + '">';
                    visitSub += '<div class="player_number"><p class="textcolor-title2">' + data.lineupVisit.substitutes[o].number + '</p></div>';
                    visitSub += '<div class="dotted-left container_card">';
                    visitSub += '<div class="player_name"><p>' + formatNombre(data.lineupVisit.substitutes[o].nickName) + '</p></div>';
                    visitSub += '<div class="players_icons">';
                    visitSub += ActVB;
                    visitSub += '</div></div></div>';
                };



                maquetado += '<div class="wdg_team_align_01" data-enhance="false">';

                maquetado += '<div class="container">';
                maquetado += '<div class="first_team ">';
                maquetado += '<div class="title">';
                maquetado += '<div class="escudo"><img src="http://i2.esmas.com/img/spacer.gif" class="TIMimgLocal"></div>';
                maquetado += '<div class="team"><p>' + data.lineupLocal.name + '</p><p></p></div>';
                maquetado += '</div>';
                maquetado += '<div class="player_table dotted-right" id="jugadoreslocalTIM">';
                maquetado += localF;
                maquetado += '</div></div>';
                maquetado += '<div class="second_team aling">';
                maquetado += '<div class="title">';
                maquetado += '<div><img src="http://i2.esmas.com/img/spacer.gif" class="TIMimgVisit"></div>';
                maquetado += '<div class="team"><p>' + data.lineupVisit.name + '</p></div>';
                maquetado += '</div>';
                maquetado += '<div class="player_table" id="jugadoresvisitTIM">';
                maquetado += visitF;
                maquetado += '</div></div>';
                maquetado += '<div class="table_title"><p class="textcolor-title1">Banca</p></div>';
                maquetado += '<div class="first_team ">';
                maquetado += '<div class="player_table dotted-right" id="localbancaTIM">';
                maquetado += localSub;
                maquetado += '</div></div>';
                maquetado += '<div class="second_team aling">';
                maquetado += '<div class="player_table" id="visitbandaTIM">';
                maquetado += visitSub;
                maquetado += '</div></div>';


                if (typeof(data.referees) !== "undefined") {
                    maquetado += '<div class="table_title"><p class="textcolor-title1">\u00C1rbitros</p></div>';
                    maquetado += '<div class="referee">';
                    maquetado += '<div class="dotted-right">';
                    if (typeof(data.referees.central) !== "undefined") {
                        maquetado += '<div class="referee-left dotted-bottom">';
                        maquetado += '<div class="referee_title"><p class="textcolor-title2">Central</p></div>';
                        maquetado += '<div class="dotted-left"><p>' + givemeName(data.referees.central) + '</p></div>';
                        maquetado += '</div>';
                    }
                    if (typeof(data.referees.assistant1) !== "undefined") {
                        maquetado += '<div class="referee-left">';
                        maquetado += '<div class="referee_title"><p class="textcolor-title2">Asistente 1</p></div>';
                        maquetado += '<div class="dotted-left"><p>' + givemeName(data.referees.assistant1) + '</p></div>';
                        maquetado += '</div>';
                        maquetado += '</div>';
                    }
                    if (typeof(data.referees.assistant2) !== "undefined") {
                        maquetado += '<div class="dotted-none">';
                        maquetado += '<div class="referee-left dotted-bottom">';
                        maquetado += '<div class="referee_title"><p class="textcolor-title2">Asistente 2</p></div>';
                        maquetado += '<div class="dotted-left"><p>' + givemeName(data.referees.assistant2) + '</p></div>';
                        maquetado += '</div>';
                    }
                    if (typeof(data.referees.fourth) !== "undefined") {
                        maquetado += '<div class="referee-left">';
                        maquetado += '<div class="referee_title"><p class="textcolor-title2">Cuarto</p></div>';
                        maquetado += '<div class="dotted-left"><p>' + givemeName(data.referees.fourth) + '</p></div>';
                        maquetado += '</div>';
                    }
                    maquetado += '</div></div>';
                }


                maquetado += '</div>';
                maquetado += '</div>';

                wdg_smex_strategy.tagAlineacionList.html(maquetado);

                //calcular height de la alineacion

                //player_table 
                //
                //$(window).resize(function() {
                if ($(window).width() >= 624) {
                    $("#jugadoresvisitTIM").find(".player_td").each(function(index) {
                        var contador = index + 1;
                        if ($(this).height() > $("#jugadoreslocalTIM").find(".player_td:nth-child(" + contador + ")").height()) {
                            $("#jugadoreslocalTIM").find(".player_td:nth-child(" + contador + ")").height($(this).height());
                            $(this).height($(this).height());
                        } else {
                            $(this).height($("#jugadoreslocalTIM").find(".player_td:nth-child(" + contador + ")").height());
                            $("#jugadoreslocalTIM").find(".player_td:nth-child(" + contador + ")").height($(this).height());
                        }
                    });
                    $("#visitbandaTIM").find(".player_td").each(function(index) {
                        var contador2 = index + 1;
                        if ($(this).height() > $("#localbancaTIM").find(".player_td:nth-child(" + contador2 + ")").height()) {
                            $("#localbancaTIM").find(".player_td:nth-child(" + contador2 + ")").height($(this).height());
                            $(this).height($(this).height());
                        } else {
                            $(this).height($("#localbancaTIM").find(".player_td:nth-child(" + contador2 + ")").height());
                            $("#localbancaTIM").find(".player_td:nth-child(" + contador2 + ")").height($(this).height());
                        }
                    });
                }
                if ($(window).width() < 624) {

                    $('.wdg_team_align_01 .first_team .title').on('touchstart', function() {
                        $(this).addClass('current');
                        $('.wdg_team_align_01 .second_team .title').removeClass('current');
                        $('.wdg_team_align_01 .art_latestnews_01_arrow').css('left', '22%');
                        $('.wdg_team_align_01 .firts_team_table').css('display', 'block');
                        $('.wdg_team_align_01 .second_team_table').css('display', 'none');
                        $('.wdg_team_align_01 .player_table_first').css('display', 'block');
                        $('.wdg_team_align_01 .player_table_second').css('display', 'none');
                    });
                    $('.wdg_team_align_01 .second_team .title').on('touchstart', function() {
                        $(this).addClass('current');
                        $('.wdg_team_align_01 .first_team .title').removeClass('current');
                        $('.wdg_team_align_01 .art_latestnews_01_arrow').css('left', '73%');
                        $('.wdg_team_align_01 .firts_team_table').css('display', 'none');
                        $('.wdg_team_align_01 .second_team_table').css('display', 'block');
                        $('.wdg_team_align_01 .player_table_first').css('display', 'none');
                        $('.wdg_team_align_01 .player_table_second').css('display', 'block');
                    });
                }
                //}
                //END calcular height de la alineacion
            },

            GolesAnotados: function(local, visit, namelocal, namevisit) {
                var maquetado = "",
                    localM,
                    visitM, finalM = "",
                    TipoGolLocal = "",
                    TipoGolVisit = "",
                    tmpGol = "",
                    arrayGlobal = new Array();
                if (local !== '') {
                    for (var i = 0; i < local.length; i++) {
                        tmpGol = local[i].formaGol;
                        TipoGolLocal = (tmpGol === "Gol de Fuera del Area" || tmpGol === "Gol de Penal" || tmpGol === "Autogol" || tmpGol === "Gol de Tiro Libre") ? tmpGol : '';
                        if (TipoGolLocal === "" && local[i].assistant_player !== "") {
                            TipoGolLocal = "Asistencia de " + local[i].assistant_player;
                        }
                        localM = "";
                        localM += '<div class="' + local[i].minute + ' block_container localTIMGol" id="goal' + local[i].minute + '">';
                        localM += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + namelocal + '</span></p></div>';
                        localM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + local[i].minute + ' \' ';
                        localM += (TipoGolLocal !== "") ? '<span class="textcolor-title2">' + TipoGolLocal + '</span></p></div>' : '</div>';
                        localM += '<div class="dotted-left marcador dotted-left"><p>' + local[i].current_score + '</p></div></div>';
                        arrayGlobal.push(localM);
                    };
                }
                if (visit !== '') {
                    for (var l = 0; l < visit.length; l++) {
                        tmpGol = visit[l].formaGol;
                        TipoGolVisit = (tmpGol === "Gol de Fuera del Area" || tmpGol === "Gol de Penal" || tmpGol === "Autogol" || tmpGol === "Gol de Tiro Libre") ? tmpGol : '';
                        if (TipoGolVisit === "" && visit[l].assistant_player !== "") {
                            TipoGolVisit = "Asistencia de " + visit[l].assistant_player;
                        }
                        visitM = "";
                        visitM += '<div class="' + visit[l].minute + ' block_container visitTIMGol" id="goal' + visit[l].minute + '">';
                        visitM += '<div class="jugador"><p>' + visit[l].nickName + '<span class="textcolor-title4">' + namevisit + '</span></p></div>';
                        visitM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + visit[l].minute + ' \' ';
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

                wdg_smex_strategy.tagAlineacionGoles.html(maquetado);
                if (local === '' && visit === '') {
                    wdg_smex_strategy.tagAlineacionGoles.hide();
                    wdg_smex_strategy.tagAlineacionGoles.parents('.wdg_goalsanoted_01').hide('fast');
                }



            },
            updateGolesAnotados: function(local, visit, namelocal, namevisit) {
                var arrayGlobal = new Array(),
                    nuevoFinal = "",
                    TipoGolLocal = "",
                    TipoGolVisit = "",
                    tmpGol = "";
                var actualNow = parseInt(local.length) + parseInt(visit.length);
                var actualGoles = parseInt(wdg_smex_strategy.tagAlineacionGoles.find('.block_container').size());
                if (actualNow > actualGoles) {
                    if (local !== '') {
                        for (var i = 0; i < local.length; i++) {
                            tmpGol = local[i].formaGol;
                            TipoGolLocal = (tmpGol === "Gol de Fuera del Area" || tmpGol === "Gol de Penal" || tmpGol === "Autogol" || tmpGol === "Gol de Tiro Libre") ? tmpGol : '';
                            if (TipoGolLocal === "" && local[i].assistant_player !== "") {
                                TipoGolLocal = "Asistencia de " + local[i].assistant_player;
                            }
                            localM = "";
                            localM += '<div class="' + local[i].minute + ' block_container localTIMGol" id="goal' + local[i].minute + '" style="display:none;">';
                            localM += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + namelocal + '</span></p></div>';
                            localM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + local[i].minute + ' \' ';
                            localM += (TipoGolLocal !== "") ? '<span class="textcolor-title2">' + TipoGolLocal + '</span></p></div>' : '</div>';
                            localM += '<div class="dotted-left marcador dotted-left"><p>' + local[i].current_score + '</p></div></div>';
                            //console.log($('#goal' + local[i].minute + ''));
                            if (!$('#goal' + local[i].minute + '').length) {
                                arrayGlobal.push(localM);
                            }

                        };
                    }
                    if (visit !== '') {
                        for (var l = 0; l < visit.length; l++) {
                            tmpGol = visit[l].formaGol;
                            TipoGolVisit = (tmpGol === "Gol de Fuera del Area" || tmpGol === "Gol de Penal" || tmpGol === "Autogol" || tmpGol === "Gol de Tiro Libre") ? tmpGol : '';
                            if (TipoGolVisit === "" && visit[l].assistant_player !== "") {
                                TipoGolVisit = "Asistencia de " + visit[l].assistant_player;
                            }
                            visitM = "";
                            visitM += '<div class="' + visit[l].minute + ' block_container visitTIMGol" id="goal' + visit[l].minute + '" style="display:none">';
                            visitM += '<div class="jugador"><p>' + visit[l].nickName + '<span class="textcolor-title4">' + namevisit + '</span></p></div>';
                            visitM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + visit[l].minute + ' \' ';
                            visitM += (TipoGolVisit !== "") ? '<span class="textcolor-title2">' + TipoGolVisit + '</span></p></div>' : '</div>';
                            visitM += '<div class="dotted-left marcador dotted-left"><p>' + visit[l].current_score + '</p></div></div>';
                            //console.log($('#goal' + visit[l].minute + ''));
                            if (!$('#goal' + visit[l].minute + '').length) {
                                arrayGlobal.push(visitM);
                            }

                        };
                    }

                    for (var z = 0; z < arrayGlobal.sort().length; z++) {
                        nuevoFinal += arrayGlobal.sort()[z];
                    };
                    wdg_smex_strategy.tagAlineacionGoles.show();
                    wdg_smex_strategy.tagAlineacionGoles.find(".convocados").append(nuevoFinal);
                    wdg_smex_strategy.tagAlineacionGoles.find(".block_container").slideDown('slow', function() {
                        $(this).css("display", "block");
                    });
                    wdg_smex_strategy.tagAlineacionGoles.parents('.wdg_goalsanoted_01').show('slow');

                }

            },
            wdgPenales: function(local, visit, nombreLocal, nombrevisit) {
                var maquetado = "",
                    content = "";
                if (typeof(local) !== "undefined") {
                    for (var i = 0; i < local.length; i++) {
                        var clase = (local[i].type === "penalAnotadoSerie") ? 'tvsa-mxm-goal' : 'tvsa-mxm-penalFallado';
                        content += '<div class="block_container dotted-bottom" id="penal' + local[i].number + '">';
                        content += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + nombreLocal + '</span></p></div>';
                        content += '<div class="estadistica dotted-left"><i class="' + clase + '"></i></div>';
                        //content += '<div class="dotted-left marcador dotted-left"><p>0-0</p></div>';
                        content += '<div class="dotted-left marcador dotted-left"><p></p></div>';
                        content += '</div>';
                    };
                }
                if (typeof(visit) !== "undefined") {
                    for (var j = 0; j < visit.length; j++) {
                        var clase = (visit[j].type === "penalAnotadoSerie") ? 'tvsa-mxm-goal' : 'tvsa-mxm-penalFallado';
                        content += '<div class="block_container dotted-bottom" id="penal' + visit[j].number + '">';
                        content += '<div class="jugador"><p>' + visit[j].nickName + '<span class="textcolor-title4">' + nombrevisit + '</span></p></div>';
                        content += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i></div>';
                        //content += '<div class="dotted-left marcador dotted-left"><p>0-0</p></div>';
                        content += '<div class="dotted-left marcador dotted-left"><p></p></div>';
                        content += '</div>';
                    };
                }

                if (content !== "") {
                    maquetado += '<div class="wdg_mxm_penalties_01">';
                    maquetado += '<div class="titulo textcolor-title1">Penales</div>';
                    maquetado += '<div class="convocados">';
                    maquetado += content;
                    maquetado += '</div></div>';
                    wdg_smex_strategy.tagwdgPenales.html(maquetado);
                    wdg_smex_strategy.tagAlineacionGoles.parents('.wdg_goalsanoted_01').show('slow');
                }

            },
            wdgPenalesupdate: function(local, visit, nombreLocal, nombrevisit) {
                var maquetado = "",
                    content = "";
                if (typeof(local) !== "undefined") {
                    for (var i = 0; i < local.length; i++) {
                        var clase = (local[i].type === "penalAnotadoSerie") ? 'tvsa-mxm-goal' : 'tvsa-mxm-penalFallado';
                        content = "";
                        content += '<div class="block_container dotted-bottom" id="penal' + local[i].number + '" style="display:none">';
                        content += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + nombreLocal + '</span></p></div>';
                        content += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i></div>';
                        //content += '<div class="dotted-left marcador dotted-left"><p>0-0</p></div>';
                        content += '<div class="dotted-left marcador dotted-left"><p></p></div>';
                        content += '</div>';
                        if (!$('#penal' + local[i].number + '').length) {
                            maquetado += content;
                        }
                    };
                }
                if (typeof(visit) !== "undefined") {
                    for (var j = 0; j < visit.length; j++) {
                        var clase = (visit[j].type === "penalAnotadoSerie") ? 'tvsa-mxm-goal' : 'tvsa-mxm-penalFallado';
                        content = "";
                        content += '<div class="block_container dotted-bottom" id="penal' + visit[j].number + '" style="display:none">';
                        content += '<div class="jugador"><p>' + visit[j].nickName + '<span class="textcolor-title4">' + nombrevisit + '</span></p></div>';
                        content += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i></div>';
                        //content += '<div class="dotted-left marcador dotted-left"><p>0-0</p></div>';
                        content += '<div class="dotted-left marcador dotted-left"><p></p></div>';
                        content += '</div>';
                        if (!$('#penal' + visit[j].number + '').length) {
                            maquetado += content;
                        }
                    };
                }

                if (maquetado !== "") {
                    if (!wdg_smex_strategy.tagwdgPenales.find('.convocados').length) {
                        var esqueleto = "";
                        esqueleto += '<div class="wdg_mxm_penalties_01">';
                        esqueleto += '<div class="titulo textcolor-title1">Penales</div>';
                        esqueleto += '<div class="convocados">';
                        esqueleto += '</div></div>';
                        wdg_smex_strategy.tagwdgPenales.html(esqueleto);
                    }
                    wdg_smex_strategy.tagwdgPenales.find('.convocados').append(maquetado);
                    wdg_smex_strategy.tagwdgPenales.find('.block_container').slideDown('slow', function() {
                        $(this).css("display", "block");
                    });
                    wdg_smex_strategy.tagAlineacionGoles.parents('.wdg_goalsanoted_01').show('slow');
                }

            },

            listenerInfo: function() {
                if ($("#datosTIMHeader").length) {
                    clearInterval(wdg_smex_strategy.intervaloVe);
                    var imgLocal = $("#localImgTIM").text();
                    var imgVisit = $("#visitImgTIM").text();
                    $(".TIMimgLocal").attr('src', imgLocal);
                    $(".TIMimgVisit").attr('src', imgVisit);


                }

            },

            finalesNaat: function() {

                (function($, T) {

                    var altura = $('.wdg_team_align_01 .principal').height();
                    altura = altura - 71;
                    //alert("Verifica alto: " + altura);
                    /*Asigno altura dinÃ¡mica separador*/
                    //$('.wdg_team_align_01 .separador').css('height',altura);
                    $firstTeam = $('.wdg_team_align_01 .first_team .logo span').text();
                    $secondTeam = $('.wdg_team_align_01 .second_team .logo span').text();

                    $('.wdg_team_align_01 .team1_name span').text($firstTeam);
                    $('.wdg_team_align_01 .team2_name span').text($secondTeam);

                    $firstImg = $('.wdg_team_align_01 .first_team .logo img').attr('src');
                    $secondImg = $('.wdg_team_align_01 .second_team .logo img').attr('src');

                    $('.wdg_team_align_01 .team1_name img').attr('src', $firstImg);
                    $('.wdg_team_align_01 .team2_name img').attr('src', $secondImg);

                    $('.wdg_team_align_01 .team1_name').on('click', function() {
                        $('.wdg_team_align_01 .second_team').hide();
                        $('.wdg_team_align_01 .first_team').show();
                        $(this).addClass('current');
                        $(this).siblings('div').removeClass('current');
                        $('.wdg_team_align_01 .art_latestnews_01_arrow').css('left', '24%');
                    });
                    $('.wdg_team_align_01 .team2_name').on('click', function() {
                        $('.wdg_team_align_01 .second_team').show();
                        $('.wdg_team_align_01 .first_team').hide();
                        $(this).addClass('current');
                        $(this).siblings('div').removeClass('current');
                        $('.wdg_team_align_01 .art_latestnews_01_arrow').css('left', '74%');
                    });

                    var firstTeamArray = $(".first_team table .widget_player_stats tr");
                    for (i = 0; i < firstTeamArray.length; i++) {
                        $(firstTeamArray[i]).height();
                    };

                    var secondTeamArray = $(".second_team table .widget_player_stats tr");
                    for (i = 0; i < secondTeamArray.length; i++) {
                        $(secondTeamArray[i]).height();
                    }

                    for (j = 0; j < 27; j++) {
                        firstItem = $(firstTeamArray[j]).height();
                        secondItem = $(secondTeamArray[j]).height();

                        //console.log(firstItem + ' = ' + secondItem);
                        if (firstItem > secondItem) {
                            $(secondTeamArray[j]).css('height', firstItem);
                        } else if (firstItem > secondItem) {
                            $(firstTeamArray[j]).css('height', firstItem);
                        }
                    }
                    $(window).resize(function() {
                        if ($(window).width() > 624) {
                            $('.wdg_team_align_01 .second_team').show();
                            $('.wdg_team_align_01 .first_team').show();
                        } else {
                            $('.wdg_team_align_01 .second_team').hide();
                        }
                        for (j = 0; j < 27; j++) {
                            firstItem = $(firstTeamArray[j]).height();
                            secondItem = $(secondTeamArray[j]).height();
                            if (firstItem > secondItem) {
                                $(secondTeamArray[j]).height(firstItem);
                            } else if (firstItem < secondItem) {
                                $(firstTeamArray[j]).height(secondItem);
                            }
                        }
                    });
                }(jQuery, Televisa));

            }

        };

        if (setting.idclub !== 0 && setting.idclub !== 0) {
            wdg_smex_strategy.PintaCacha('dropdown');
        } else {
            if (setting.ideventomxm !== 0 && setting.ideventomxmtv !== 0) {
                wdg_smex_strategy.PintaCacha('alineacionFinal');
            };

        }







    };
})(jQuery);