;
(function() {
    $.fn.wdgStrategyMxM = function(options) {
        var setting = $.extend({
            'ideventomxm': 0,
            'ideventomxmtv': 0,
            'idclub': 0
        }, options);

        var GlobalThis = this;

        var wdg_smex_strategy = {


            urlFinalAlienacion: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/' + setting.ideventomxmtv + '/match_lineup.js',
            //urlDropdown: 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/' + setting.ideventomxm + '/' + setting.idclub + '/matchesclub.js',
            urlDropdown: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/clubes/' + setting.idclub + '/matchesclub.js',
            urlmxmheader: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/' + setting.ideventomxmtv + '/match_header.js',


            PintaCacha: function(tipo) {
                var ContenidoMaq = "";
                if (tipo === "dropdown") {
                    ContenidoMaq += '<div class="titulo textcolor-title4">Estrategia más utilizada</div>'
                    ContenidoMaq += '<div class="pleca_inferior">'
                    ContenidoMaq += '<div>'
                    ContenidoMaq += '<strong>Partidos</strong>'
                    ContenidoMaq += '</div>'
                    ContenidoMaq += '<div class="wdg_smex_strategy_01_dropdown">'
                    ContenidoMaq += '<div class="wdg_smex_strategy_01_dropdowncontent">'
                    ContenidoMaq += '<p></p>'
                    ContenidoMaq += '<div> <a id="dropdwon-right"  href="#" title="Link Description"> <i class="tvsa-caret-down"></i></a> </div>'
                    ContenidoMaq += '</div>'
                    ContenidoMaq += '<div class="wdg_smex_strategy_01_listcontainer">'
                    ContenidoMaq += '</div>'
                    ContenidoMaq += '</div>'
                    ContenidoMaq += '</div>'
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
                });;

                (setting.idclub !== 0) ? setTimeout(function() {
                    wdg_smex_strategy.loadDropdown()
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
                    jsonpCallback: 'matches',
                    cache: false,
                })
                    .done(function(data) {
                        ContDropdown += '<ul class="wdg_smex_strategy_01_dropdownlist">';
                        for (var r = 0; r < data.Team.length; r++) {
                            ContDropdown += '<li><p data-field="' + data.Team[r].matchid + '">' + data.Team[r].week + '</p></li>';

                        };
                        ContDropdown += '</ul>';

                        $(".wdg_smex_strategy_01_listcontainer").html(ContDropdown);

                        var ultimoId = $(".wdg_smex_strategy_01_dropdownlist li").eq(0).find('p').data("field");

                        wdg_smex_strategy.loadAlineacion(GlobalThis, ultimoId);




                    })
                    .fail(function() {
                        console.log("error al cargar DROPDOWN: " + wdg_smex_strategy.urlDropdown);


                    })



            },
            loadAlineacion: function(el, IDTemp, tipo) {
                // var url = 'http://mxm.televisadeportes.esmas.com/futbol/data/284/20839/previo_alineacion.js?185';
                //var url = '../wdg_smex_strategy_01/' + type + '.json'; // just an example using plain text files

                el.find('span.players').fadeOut('fast');
                //console.log('cargando--> http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/'+setting.ideventomxm+'/'+IDTemp+'/previo_alineacion.js');				
                $.ajax({
                    //url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/' + IDTemp + '/match_lineup.js',
                    url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/356/24911/match_lineup.js',
                    dataType: 'jsonp',
                    jsonpCallback: 'datagame',
                    cache: false,
                    success: function(data) {
                        var miHTML = '',
                            aliFinal = '',
                            ArregloHidden = new Array();
                        var equipo = new Array();
                        var positiony, positionx, vc, equipoString, imageJugador;

                        equipo[0] = "lineupLocal";
                        equipo[1] = "lineupVisit";

                        for (var t = 0; t < equipo.length; t++) {
                            equipoString = String(equipo[t]);
                            //console.log(data[equipoString]);

                            for (var i = 0; i < data[equipoString].team.length; i++) {
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

                                if (typeof data[equipoString].team[i].actions !== "undefined") {
                                    actions += '<em>acciones</em><span class="actions">';
                                    for (var a = 0; a < data[equipoString].team[i].actions.length; a++) {
                                        switch (data[equipoString].team[i].actions[a].type) {
                                            case 'golVisitante':
                                                icon = 'tvsa-mxm-goal';
                                                break;
                                            case 'amonestacion':
                                                icon = 'tvsa-mxm-owngoal';
                                                break;
                                            case 'saleDelJuego':
                                                icon = 'tvsa-mxm-offside';
                                                break;
                                            case 'entraAlJuego':
                                                icon = 'tvsa-mxm-goal';
                                                break;
                                            case 'expulsion':
                                                icon = 'tvsa-mxm-redcard';
                                                break;
                                            default:
                                                icon = '';
                                                break;
                                        }
                                        actions += '<i class="' + icon + '"></i>' + data[equipoString].team[i].actions[a].minute + '\'';
                                    }
                                    actions += '</span>';
                                }
                                if (actions == '') {
                                    toolact += 'noactions';
                                }
                                if (equipoString === "lineupLocal") {
                                    vc = "local"
                                } else {
                                    vc = "visit"
                                }
                                imageJugador = (data[equipoString].team[i].image !== "") ? data[equipoString].team[i].image : 'http://i2.esmas.com/img/spacer.gif';
                                miHTML += '<span data-guid="' + data[equipoString].team[i].idjugador + '" class="player ' + vc + ' ' + arrow + '" style="left:' + positionx + 'px;top:' + positiony + 'px;">' +
                                    '<a href="#" title="' + data[equipoString].team[i].name + ' ' + data[equipoString].team[i].name + '">' +
                                    '<span class="number textcolor-title2">' + data[equipoString].team[i].number + '</span>' +
                                    '<span class="tooltip ' + toolact + '">' +
                                    '<img class="playerfoto" src="' + imageJugador + '" alt="' + data[equipoString].team[i].name + '" width="51" height="38" />' +
                                    '<span class="arrow"></span>' +
                                    '<span class="name">' + data[equipoString].team[i].name + ' ' + data[equipoString].team[i].nickName + '</span>' +
                                    '<span class="position textcolor-title2">' + data[equipoString].team[i].position + '</span>' + actions +
                                    '</span>' +
                                    '</a>' +
                                    '</span>';

                            };
                            el.find('span.players').html(miHTML).fadeIn('slow');
                            $("#LoadingCancha").hide('slow');

                            (tipo === "actualizacion") ? '' : $(".wdg_smex_strategy_01_dropdowncontent p").text(data.week);
                            //Alineacion final
                            if (tipo === "Alineacionfinal") {

                                //console.log("calcula la alineacion final");
                                for (var d = 0; d < data[equipoString].substitutes.length; d++) {
                                    //console.log(data[equipoString].substitutes[d].nickName);
                                    if (typeof data[equipoString].substitutes[d].actions !== "undefined") {
                                        if (typeof data[equipoString].team[d].actions !== "undefined") {
                                            var actions2 = "";
                                            actions2 += '<em>acciones</em><span class="actions">';
                                            for (var a = 0; a < data[equipoString].team[d].actions.length; a++) {
                                                switch (data[equipoString].team[d].actions[a].type) {
                                                    case 'golVisitante':
                                                        icon = 'tvsa-mxm-goal';
                                                        break;
                                                    case 'amonestacion':
                                                        icon = 'tvsa-mxm-owngoal';
                                                        break;
                                                    case 'saleDelJuego':
                                                        icon = 'tvsa-mxm-offside';
                                                        break;
                                                    case 'entraAlJuego':
                                                        icon = 'tvsa-mxm-goal';
                                                        break;
                                                    case 'expulsion':
                                                        icon = 'tvsa-mxm-redcard';
                                                        break;
                                                    default:
                                                        icon = '';
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
                                            vc = "local"
                                        } else {
                                            vc = "visit"
                                        }
                                        for (var f = 0; f < data[equipoString].substitutes[d].actions.length; f++) {
                                            //console.log(data[equipoString].substitutes[d].actions[f]);
                                            if (data[equipoString].substitutes[d].actions[f].type === "entraAlJuego") {
                                                //console.log(data[equipoString].substitutes[d].nickName);
                                                //console.log(data[equipoString].substitutes[d].actions[f].playeridchange);	
                                                ArregloHidden.push(data[equipoString].substitutes[d].actions[f].playeridchange);


                                                var itemT = $("span[data-guid=" + data[equipoString].substitutes[d].actions[f].playeridchange + "]");
                                                var nuevox = itemT.css("top");
                                                var nuevoy = itemT.css("left");

                                                nuevox = (typeof nuevoy === "undefined") ? 0 : nuevox;
                                                nuevoy = (typeof nuevoy === "undefined") ? 0 : nuevoy;

                                                aliFinal += '<span data-guid="' + data[equipoString].substitutes[d].idjugador + '" class="player ' + vc + ' ' + arrow + '" style="left:' + nuevoy + ';top:' + nuevox + '">' +
                                                    '<a href="#" title="' + data[equipoString].substitutes[d].name + ' ' + data[equipoString].substitutes[d].name + '">' +
                                                    '<span class="number textcolor-title2">' + data[equipoString].substitutes[d].number + '</span>' +
                                                    '<span class="tooltip">' +
                                                    '<img class="playerfoto" src="' + data[equipoString].substitutes[d].image + '" alt="' + data[equipoString].substitutes[d].name + '" width="51" height="38" />' +
                                                    '<span class="arrow"></span>' +
                                                    '<span class="name">' + data[equipoString].substitutes[d].name + ' ' + data[equipoString].substitutes[d].nickName + '</span>' +
                                                    '<span class="position textcolor-title2">' + data[equipoString].substitutes[d].position + '</span>' + actions2 +
                                                    '</span>' +
                                                    '</a>' +
                                                    '</span>';
                                            }


                                        };
                                    }
                                };


                                console.log(ArregloHidden);
                                for (var k = 0; k < ArregloHidden.length; k++) {
                                    $("span[data-guid=" + ArregloHidden[k] + "]").remove();
                                };
                                el.find('span.players').append(aliFinal).fadeIn('slow');

                            }
                            // Alineacion Final			

                            $(".grid3 .noactions").css("top", "-90px");
                            $(".grid4 .noactions").css("top", "-90px");

                        };
                    }
                }).fail(function() {
                    $("#LoadingCancha").hide();
                })
            },

            FunInicio: function() {

                $('section.wdg_smex_strategy_01').each(function() {
                    /* Show Retina Version */
                    var root = (typeof exports == 'undefined' ? window : exports);
                    var config = {
                        check_mime_type: true
                    };
                    root.Retina = Retina;

                    function Retina() {}
                    Retina.configure = function(options) {
                        if (options == null) options = {};
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

                        if (visibilidad == 'hidden')
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
                        if ($wss1_status == 'block') {
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
                                wdg_smex_strategy.AlineacionFinal();
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
                            //console.log("MENOR");
                        } else {
                            if (parseFloat(msDateA) == parseFloat(msDateB)) {
                                //console.log("IGUAL");
                                tiempoActualizacion = 60000;
                                var resta = parseInt(b.getHours() - a.getHours());
                                //cop
                                if (b.getHours() >= a.getHours()) {
                                    //console.log("ya empezo el partido");
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
                                        //console.log("faltan menos de 15 min");
                                        //Faltan 15 minutos o menos para el inicio, actualizar los valores cada minuto
                                        tiempoActualizacion = 60000;

                                    } else {
                                        //console.log("faltan mas de 15 pero menos de 1hr " + minutosrestantes);
                                        //Faltan mas de 15 minutos para el inicio, actualizar los valores cada 15 minutos pero menos de una hora

                                        (minutosrestantes < 60) ? tiempoActualizacion = 900000 : '';
                                    }
                                }
                                //cop
                                //console.log(tiempoActualizacion)
                                setInterval(function() {
                                    wdg_smex_strategy.updatePlayers()
                                }, tiempoActualizacion);
                                //setInterval(function(){wdg_smex_strategy.updatePlayers()},15000);

                            } else {
                                if (parseFloat(msDateA) > parseFloat(msDateB)) {
                                    //console.log("MAYOR");

                                } else {
                                    //console.log("Error no actualizo");
                                }
                            }
                        }

                    }
                });
            }, // End timeUpdate()

            updatePlayers: function() {
                var itemActual, itemleft, itemtop, NuevosJugadores = "";

                $.ajax({
                    url: wdg_smex_strategy.urlFinalAlienacion,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'datagame'
                })
                    .done(function(data) {

                        var equipos = new Array("lineupLocal", "lineupVisit");
                        var actionsPlayer;
                        var newTop, newLeft, vc;

                        for (var z = 0; z < equipos.length; z++) {
                            var equipoString = String(equipos[z]);

                            for (var i = 0; i < data[equipoString].substitutes.length; i++) {
                                actionsPlayer = data[equipoString].substitutes[i].actions;
                                if (typeof actionsPlayer !== "undefined") {
                                    for (var x = 0; x < actionsPlayer.length; x++) {
                                        if (actionsPlayer[x].type.toLowerCase() === "entraaljuego") {
                                            itemActual = $("span[data-guid=" + actionsPlayer[x].playeridchange + "]");

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
                                                        switch (data[equipoString].substitutes[i].actions[a].type) {
                                                            case 'golVisitante':
                                                                icon = 'tvsa-mxm-goal';
                                                                break;
                                                            case 'amonestacion':
                                                                icon = 'tvsa-mxm-owngoal';
                                                                break;
                                                            case 'saleDelJuego':
                                                                icon = 'tvsa-mxm-offside';
                                                                break;
                                                            case 'entraAlJuego':
                                                                icon = 'tvsa-mxm-goal';
                                                                break;
                                                            case 'expulsion':
                                                                icon = 'tvsa-mxm-redcard';
                                                                break;
                                                            default:
                                                                icon = '';
                                                                break;
                                                        }
                                                        actions += '<i class="' + icon + '"></i>' + data[equipoString].substitutes[i].actions[a].minute + '\'';
                                                    }
                                                    actions += '</span>';
                                                }
                                                if (actions == '') {
                                                    toolact += 'noactions';
                                                }

                                                vc = (equipos[z] === "lineupLocal") ? 'local' : 'visit';

                                                NuevosJugadores += '<span data-guid="' + data[equipoString].substitutes[i].guid + '" class="player ' + vc + ' ' + arrow + '" style="left:' + itemleft + ';top:' + itemtop + ';display:none">' +
                                                    '<a href="#" title="' + data[equipoString].substitutes[i].name + ' ' + data[equipoString].substitutes[i].name + '">' +
                                                    '<span class="number textcolor-title2">' + data[equipoString].substitutes[i].number + '</span>' +
                                                    '<span class="tooltip ' + toolact + '">' +
                                                    '<img class="playerfoto" src="' + data[equipoString].substitutes[i].image + '" alt="' + data[equipoString].substitutes[i].name + '" width="51" height="38" />' +
                                                    '<span class="arrow"></span>' +
                                                    '<span class="name">' + data[equipoString].substitutes[i].name + ' ' + data[equipoString].substitutes[i].nickName + '</span>' +
                                                    '<span class="position textcolor-title2">' + data[equipoString].substitutes[i].position + '</span>' + actions +
                                                    '</span>' +
                                                    '</a>' +
                                                    '</span>';

                                                itemActual.fadeOut('fast', function() {
                                                    $(this).remove()
                                                });


                                            }


                                        }
                                    };
                                };


                            };



                        }; // equipos array

                        GlobalThis.find(".players").append(NuevosJugadores).children().fadeIn('slow');



                    })
                    .fail(function() {
                        console.log("error update jugadores");


                    })


            } //updatePlayers

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