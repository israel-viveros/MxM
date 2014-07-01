/*!
 * TIM Developer: Israel Viveros
 *   Version: 2.0
 *   Copyright: Televisa Interactive Media (2014)
 */
;
(function() {
    $.fn.wdgStrategyMxM = function(options) {
        var setting = $.extend({
            'ideventomxm': 0,
            'ideventomxmtv': 0,
            'idclub': 0,
            'title': ''
        }, options);

        var GlobalThis = this;

        var wdg_smex_strategy = {


            urlDropdown: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/clubes/' + setting.idclub + '/matchesclub.js',
            urlmxmheader: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/' + setting.ideventomxmtv + '/match_header.js',


            PintaCacha: function(tipo) {
                var ContenidoMaq = "";
                if (tipo === "dropdown") {
                    ContenidoMaq += '<div class="titulo textcolor-title4">' + setting.title + '</div>';
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
                    ContenidoMaq += '<li class="first active"><a href="#" data-query="inicial" class="ui-link">Alineación Inicial</a></li><li><a href="#" data-query="media" class="ui-link">Alineación Media</a></li><li><a href="#" data-query="final" class="ui-link">Alineación Final</a></li>';
                    ContenidoMaq += '</ul>';
                }
                ContenidoMaq += '<div class="field">';
                ContenidoMaq += '<div id="LoadingCancha"><div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div><div id="fountainG_7" class="fountainG"></div><div id="fountainG_8" class="fountainG"></div></div>';
                ContenidoMaq += '<img class="cancha" src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/cancha.png" alt="field" width="624" height="334"/>';
                ContenidoMaq += '<span class="players">';
                ContenidoMaq += '</span>';
                ContenidoMaq += '</div>';

                GlobalThis.html(ContenidoMaq).css("display", "none").fadeIn('slow', function() {
                    $(this).css("display", "block");
                });

                (setting.idclub !== 0) ? setTimeout(function() {
                    wdg_smex_strategy.loadDropdown();
                }, 1000) : '';
                wdg_smex_strategy.FunInicio();

                (tipo === "alineacionFinal") ? wdg_smex_strategy.botonesAlineacion() : '';


                (setting.ideventomxm !== 0 && setting.ideventomxmtv !== 0 && setting.idclub === 0) ? wdg_smex_strategy.header() : '';

            },

            loadDropdown: function() {
                //console.log("execute loaddropdown function");
                var ContDropdown = "";

                $.ajax({
                    url: wdg_smex_strategy.urlDropdown,
                    dataType: 'jsonp',
                    jsonpCallback: 'effectivenessByTeam',
                    cache: false
                })
                    .done(function(data) {
                        ContDropdown += '<ul class="wdg_smex_strategy_01_dropdownlist">';
                        for (var r = 0; r < data.efectividad.length; r++) {
                            ContDropdown += '<li><p data-field="' + data.efectividad[r].matchid + '">' + data.efectividad[r].weekName + '</p></li>';

                        };
                        ContDropdown += '</ul>';
                        $(".wdg_smex_strategy_01_listcontainer").html(ContDropdown);

                        var ultimoId = $(".wdg_smex_strategy_01_dropdownlist li").last().find('p').data("field");
                        $(".wdg_smex_strategy_01_dropdowncontent p").text($(".wdg_smex_strategy_01_dropdownlist li").last().find('p').text());

                        wdg_smex_strategy.loadAlineacion(GlobalThis, ultimoId);




                    })
                    .fail(function() {
                        console.log("error al cargar DROPDOWN: " + wdg_smex_strategy.urlDropdown);
                    });



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








                    }
                }).fail(function() {
                    $("#LoadingCancha").hide();
                });





            },

            FunInicio: function() {

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

                        /*	  $dropdownAnchor.bind('mouseleave', function(evt) {
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
                        //				$dropdownItems2.bind('click','touchstart', function(evt) {

                        dropdownItems2.unbind().bind('click', function(evt) {
                            evt.preventDefault();
                            $("#LoadingCancha").show();
                            padre.find('.wdg_smex_strategy_01_dropdowncontent p').html($(this).find('p').html());



                            // calling the AJAX method

                            wdg_smex_strategy.loadAlineacion($parent, $(this).find('p').data('field'));
                            //					wdg_smex_strategy.loadAlineacion($parent, 1455,'actualizacion');


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
                    $(this).children('.tooltip').css('display', 'block');
                });
                $('section.wdg_smex_strategy_01 .player a').live('mouseleave', function(event) {
                    event.preventDefault();
                    $(this).children('.tooltip').css('display', 'none');
                });
                if ($(window).width() < 948) {
                    /*Tablet-Mobile*/
                    $('section.wdg_smex_strategy_01 .player a').live('click', 'touchstart', function(event) {
                        event.preventDefault();
                        $wss1_status = $(this).children('.tooltip').css('display');
                        if ($wss1_status === 'block') {
                            $(this).children('.tooltip').css('display', 'none');
                        } else {
                            $(this).children('.tooltip').css('display', 'block');
                        }
                    });
                    $('section.wdg_smex_strategy_01 .player a > span').bind("touchstart", function(event) {
                        event.preventDefault();
                    });
                }

            },





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