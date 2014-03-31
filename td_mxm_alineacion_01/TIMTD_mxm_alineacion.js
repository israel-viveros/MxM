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


        var wdg_smex_strategy = {


            urlFinalAlienacion: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/' + setting.ideventomxmtv + '/match_lineup.js',
            urlDropdown: 'http://lab.israelviveros.com/deportes/wdg_smex_strategy_01/' + setting.ideventomxm + '/' + setting.idclub + '/matchesclub.js',
            urlmxmheader: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.ideventomxm + '/' + setting.ideventomxmtv + '/match_header.js',
            tagPromedio: $("#AlineacionPromedioTIM"),
            tagExpulsion: $("#ExpulsionTIM"),
            tagAlineacionList: $("#TIMAlineacionList"),
            tagAlineacionGoles: $("#TIMAlineacionGoles"),
            tagwdgPenales: $("#TIMWdgPenales"),


            PintaCacha: function(tipo) {
                var ContenidoMaq = "";
                if (tipo === "dropdown") {
                    ContenidoMaq += '<div class="titulo textcolor-title4">Estrategia mÃ¡s utilizada</div>'
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
                    ContenidoMaq += '<li class="first active"><a href="#" data-query="inicial" class="ui-link">Alineaci\u00F3n Inicial</a></li><li><a href="#" data-query="final" class="ui-link">Alineaci\u00F3n Final</a></li>';
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
                            expulsadosVisit = new Array();
                        var equipo = new Array();
                        var positiony, positionx, vc, equipoString, imageJugador;

                        equipo[0] = "lineupLocal";
                        equipo[1] = "lineupVisit";

                        expulsadosLocal = data[equipo[0]].penalization;
                        expulsadosVisit = data[equipo[1]].penalization;


                        for (var t = 0; t < equipo.length; t++) {
                            equipoString = String(equipo[t]);
                            //console.log(data[equipoString]);


                            promedio.push(data[equipoString].average);

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
                                    '<a href="#" title="' + data[equipoString].team[i].nickName + ' ' + data[equipoString].team[i].nickName + '">' +
                                    '<span class="number textcolor-title2">' + data[equipoString].team[i].number + '</span>' +
                                    '<span class="tooltip ' + toolact + '">' +
                                    '<img class="playerfoto" src="' + imageJugador + '" alt="' + data[equipoString].team[i].nickName + '" width="51" height="38" />' +
                                    '<span class="arrow"></span>' +
                                    '<span class="name">' + data[equipoString].team[i].nickName + ' ' + data[equipoString].team[i].nickName + '</span>' +
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
                                                    '<a href="#" title="' + data[equipoString].substitutes[d].nickName + ' ' + data[equipoString].substitutes[d].nickName + '">' +
                                                    '<span class="number textcolor-title2">' + data[equipoString].substitutes[d].number + '</span>' +
                                                    '<span class="tooltip">' +
                                                    '<img class="playerfoto" src="' + data[equipoString].substitutes[d].image + '" alt="' + data[equipoString].substitutes[d].nickName + '" width="51" height="38" />' +
                                                    '<span class="arrow"></span>' +
                                                    '<span class="name">' + data[equipoString].substitutes[d].nickName + ' ' + data[equipoString].substitutes[d].nickName + '</span>' +
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

                        if (setting.Promedio === true) {
                            wdg_smex_strategy.promedioCancha(promedio)
                        }
                        //Modulo alineacion
                        wdg_smex_strategy.MuestraAlineacion(data);


                        //Modulo expulsados
                        wdg_smex_strategy.Modexpulsados(expulsadosLocal, expulsadosVisit);

                        if ($("#datosTIMHeader").length) {
                            clearInterval(wdg_smex_strategy.intervaloVe);
                            var imgLocal = $("#localImgTIM").text();
                            var imgVisit = $("#visitImgTIM").text();
                            $(".TIMimgLocal").attr('src', imgLocal);
                            $(".TIMimgVisit").attr('src', imgVisit);


                        }



                    }
                }).fail(function() {
                    $("#LoadingCancha").hide();
                })


            },

            FunInicio: function() {

                try {
                    wdg_smex_strategy.finalesNaat();
                    wdg_smex_strategy.intervaloVe = setInterval(function() {
                        wdg_smex_strategy.listenerInfo();
                    }, 3000);
                } catch (e) {
                    console.log(e)
                }

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
                                $.when(wdg_smex_strategy.AlineacionFinal()).done(function() {
                                    wdg_smex_strategy.updatePlayers();
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
                                if (tiempoActualizacion !== 0) {
                                    setInterval(function() {
                                        wdg_smex_strategy.updatePlayers()
                                    }, tiempoActualizacion);
                                }
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
                                actionsPlayer = data[equipoString].substitutes[i].actions;
                                if (typeof actionsPlayer !== "undefined") {
                                    for (var x = 0; x < actionsPlayer.length; x++) {
                                        if (actionsPlayer[x].type.toLowerCase() === "entraaljuego") {




                                            if ($("div[data-guid=" + data[equipoString].substitutes[i].idjugador + "] ").hasClass('EqLTIM')) {
                                                $("div[data-guid=" + data[equipoString].substitutes[i].idjugador + "] ").prependTo('#jugadoreslocalTIM');
                                            } else {
                                                $("div[data-guid=" + data[equipoString].substitutes[i].idjugador + "]").prependTo('#jugadoresvisitTIM');
                                            }


                                            itemActual = $("span[data-guid=" + actionsPlayer[x].playeridchange + "]");
                                            //console.log(itemActual)

                                            if ($("div[data-guid=" + actionsPlayer[x].playeridchange + "]").hasClass('EqLTIM')) {
                                                $("div[data-guid=" + actionsPlayer[x].playeridchange + "]").prependTo("#localbancaTIM");
                                            } else {
                                                $("div[data-guid=" + actionsPlayer[x].playeridchange + "]").prependTo("#visitbandaTIM");

                                            }

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

                                                NuevosJugadores += '<span data-guid="' + data[equipoString].substitutes[i].idjugador + '" class="player ' + vc + ' ' + arrow + '" style="left:' + itemleft + ';top:' + itemtop + ';display:none">' +
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
                            $(this).css("display", "block");
                        });

                        // update goles 
                        var golesLocal = (typeof(data.goalsLocal) !== "undefined") ? data.goalsLocal : '';
                        var golesVisit = (typeof(data.goalsVisit) !== "undefined") ? data.goalsVisit : '';
                        wdg_smex_strategy.updateGolesAnotados(golesLocal, golesVisit, data.lineupLocal.name, data.lineupVisit.name);

                        //update amonestados
                        var localexp = (typeof(data.lineupLocal.penalization) !== "undefined") ? data.lineupLocal.penalization : '';
                        var visitexo = (typeof(data.lineupVisit.penalization) !== "undefined") ? data.lineupVisit.penalization : '';
                        wdg_smex_strategy.ModexpulsadosUpdate(localexp, visitexo);

                        if (typeof(data.PenaltiesLocal) !== "undefined" || typeof(data.PenaltiesVisit) !== "undefined") {
                            wdg_smex_strategy.wdgPenales(data.PenaltiesLocal, data.PenaltiesVisit, data.lineupLocal.name, data.lineupVisit.name);
                        }


                    })
                    .fail(function() {
                        console.log("error update jugadores");


                    })


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

            Modexpulsados: function(local, visit) {
                var arrayGlobal = new Array(),
                    itemshtml = "",
                    localm = "",
                    visitm = "";
                if (local.length !== 0) {
                    for (var i = 0; i < local.length; i++) {
                        var minuto = 0;
                        for (var z = 0; z < local[i].actions.length; z++) {
                            if (local[i].actions[z].type === "amonestacion") {
                                minuto = z;
                            }
                        };
                        localm = "";
                        localm += '<div class="' + local[i].actions[minuto].minute + ' bodyt dotted-bottom">';
                        localm += '<div class="textcolor-title1">' + local[i].number + '</div>';
                        localm += '<div class="dotted-left name"><p>' + local[i].nickName + '</p></div>';
                        localm += '<div class="textcolor-title4 dotted-left">' + local[i].actions[minuto].minute + '\'<i class="tvsa-mxm-yellowcard"></i></div>';
                        localm += '<div class="textcolor-title4 dotted-left">&nbsp;</div></div>';
                        arrayGlobal.push(localm);
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
                        visitm += '<div class="' + visit[k].actions[minuto].minute + ' bodyt dotted-bottom">';
                        visitm += '<div class="textcolor-title2">' + visit[k].number + '</div>';
                        visitm += '<div class="dotted-left name"><p>' + visit[k].nickName + '</p></div>';
                        visitm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm">&nbsp;</i></div>';
                        visitm += '<div class="textcolor-title4 dotted-left">' + visit[k].actions[minuto].minute + '\'<i class="tvsa-mxm-yellowcard"></i></div></div>';
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

                wdg_smex_strategy.tagExpulsion.html(maquetado);
            }, // Modexpulsados

            ModexpulsadosUpdate: function(local, visit) {
                var arrayGlobal = new Array(),
                    localm = "",
                    visitm = "",
                    finalHTML = "";
                var itemfeed = local.length + visit.length;
                var actualitems = wdg_smex_strategy.tagExpulsion.find(".bodyt").size();

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
                            localm += '<div class="' + local[i].actions[minuto].minute + ' bodyt dotted-bottom">';
                            localm += '<div class="textcolor-title1">' + local[i].number + '</div>';
                            localm += '<div class="dotted-left name"><p>' + local[i].nickName + '</p></div>';
                            localm += '<div class="textcolor-title4 dotted-left">' + local[i].actions[minuto].minute + '\'<i class="tvsa-mxm-yellowcard"></i></div>';
                            localm += '<div class="textcolor-title4 dotted-left">&nbsp;</div></div>';
                            arrayGlobal.push(localm);
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
                            visitm += '<div class="' + visit[k].actions[minuto].minute + ' bodyt dotted-bottom">';
                            visitm += '<div class="textcolor-title2">' + visit[k].number + '</div>';
                            visitm += '<div class="dotted-left name"><p>' + visit[k].nickName + '</p></div>';
                            visitm += '<div class="textcolor-title4 dotted-left"><i class="tvsa-mxm">&nbsp;</i></div>';
                            visitm += '<div class="textcolor-title4 dotted-left">' + visit[k].actions[minuto].minute + '\'<i class="tvsa-mxm-yellowcard"></i></div></div>';
                            arrayGlobal.push(visitm);
                        };

                    }
                    for (var x = actualitems; x < arrayGlobal.sort().length; x++) {
                        finalHTML += arrayGlobal.sort()[x];
                    };

                    wdg_smex_strategy.tagExpulsion.find(".convocados").append(finalHTML);

                }
            },

            MuestraAlineacion: function(data) {
                var golesLocal = (typeof(data.goalsLocal) !== "undefined") ? data.goalsLocal : '';
                var golesVisit = (typeof(data.goalsVisit) !== "undefined") ? data.goalsVisit : '';
                var ActL = "",
                    ActV = "";

                wdg_smex_strategy.GolesAnotados(golesLocal, golesVisit, data.lineupLocal.name, data.lineupVisit.name);


                /*if (typeof(data.PenaltiesLocal) !== "undefined" || typeof(data.PenaltiesVisit) !== "undefined") {
                    wdg_smex_strategy.wdgPenales(data.PenaltiesLocal, data.PenaltiesVisit, data.lineupLocal.name, data.lineupVisit.name);
                }*/
                var localp = [{
                    longName: 'Diego Martan Forla¡n Corazo',
                    name: 'D. Forlan',
                    nickName: 'Diego Forlan',
                    number: 10,
                    url: '/futbol/jugadores/diegomartinforlan/1016',
                    type: 'penalAnotadoSerie'
                }, {
                    longName: 'Mauricio Bernardo Victorino Dansilio',
                    name: 'M. Victorino',
                    nickName: 'Mauricio Victorino',
                    number: 6,
                    url: '/futbol/jugadores/mauricio-bernardo-victorino/2002',
                    type: 'penalAnotadoSerie'
                }, {
                    longName: 'Andras Scotti Ponce de Leon',
                    name: 'A. Scotti',
                    nickName: 'Andrao Scotti ',
                    number: 19,
                    url: '/futbol/jugadores/andres-scotti/2789',
                    type: 'penalAnotadoSerie'
                }, {
                    longName: 'Victorio Maximiliano Pereira Paez',
                    name: 'M. Pereira',
                    nickName: 'Maximiliano Pereira',
                    number: 16,
                    url: '/futbol/jugadores/maximiliano-pereira/4786',
                    type: 'penalFalladoSerie'
                }, {
                    longName: 'Washington Sebastian Abreu Gallo',
                    name: 'S. Abreu',
                    nickName: 'Sebastian Abreu',
                    number: 13,
                    url: '/futbol/jugadores/washington-sebastian-abreu/474',
                    type: 'penalAnotadoSerie'
                }];
                var visitp = [{
                    longName: 'Asamoah Gyan ',
                    name: 'A. Gyan',
                    nickName: 'Asamoah Gyan',
                    number: 3,
                    url: '/futbol/jugadores/asamoah-gyan/1572',
                    type: 'penalAnotadoSerie'
                }, {
                    longName: 'Stephen Leroy Appiah ',
                    name: 'S. Appiah',
                    nickName: 'Stephen Appiah',
                    number: 10,
                    url: '/futbol/jugadores/stephen-leroy-appiah/1566',
                    type: 'penalAnotadoSerie'
                }, {
                    longName: 'John Mensah ',
                    name: 'J. Mensah',
                    nickName: 'John Mensah',
                    number: 5,
                    url: '/futbol/jugadores/john-mensah/1559',
                    type: 'penalFalladoSerie'
                }, {
                    longName: 'Dominic Adiyiah ',
                    name: 'D. Adiyiah',
                    nickName: 'Dominic Adiyiah',
                    number: 18,
                    url: '/futbol/jugadores/dominic-adiyiah/11587',
                    type: 'penalFalladoSerie'
                }];

                wdg_smex_strategy.wdgPenales(localp, visitp, data.lineupLocal.name, data.lineupVisit.name);




                var maquetado = "",
                    local = '',
                    visit = '',
                    visitSub = '',
                    localSub = '';

                function givemeName(parametro) {
                    var tmp = parametro;
                    var tmp2 = tmp.split(":");
                    return tmp2[1];
                }

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
                        acteaml += '<i class="tvsa-' + clase + '"></i><span>' + array[q].minute + '\'</span>';
                    };
                    return acteaml;
                }


                for (var i = 0; i < data.lineupLocal.team.length; i++) {
                    ActL = "";
                    if (typeof(data.lineupLocal.team[i].actions) === "object") {
                        ActL = giveActions(data.lineupLocal.team[i].actions);
                    };

                    local += '<div class="player_td dotted-bottom EqLTIM" data-guid="' + data.lineupLocal.team[i].idjugador + '">';
                    local += '<div class="player_number"><p class="textcolor-title2">' + data.lineupLocal.team[i].number + '</p></div>';
                    local += '<div class="dotted-left container_card">';
                    local += '<div class="player_name"><p>' + data.lineupLocal.team[i].nickName + '</p></div>';
                    local += '<div class="players_icons">';
                    local += ActL;
                    local += '</div></div></div>';


                };

                if (typeof(data.lineupLocal.coach) !== "undefined") {
                    local += '<div class="player_td">';
                    local += '<div class="player_number"><p class="textcolor-title1">DT</p></div>';
                    local += '<div class="dotted-left container_card">';
                    local += '<div class="player_name"><p>' + data.lineupLocal.coach.longName + '</p></div>';
                    local += '<div class="players_icons">';
                    //local += '<i class="tvsa-mxm-yellowcard"></i><span>17\'</span>';
                    local += '</div></div></div>';
                }




                for (var j = 0; j < data.lineupVisit.team.length; j++) {
                    ActV = "";
                    if (typeof(data.lineupVisit.team[j].actions) === "object") {
                        ActV = giveActions(data.lineupVisit.team[j].actions);
                    };
                    visit += '<div class="player_td dotted-bottom EqVTIM" data-guid="' + data.lineupVisit.team[j].idjugador + '">';
                    visit += '<div class="player_number"><p class="textcolor-title2">' + data.lineupVisit.team[j].number + '</p></div>';
                    visit += '<div class="dotted-left container_card">';
                    visit += '<div class="player_name"><p>' + data.lineupVisit.team[j].nickName + '</p></div>';
                    visit += '<div class="players_icons">';
                    visit += ActV;
                    visit += '</div></div></div>';
                };
                if (typeof(data.lineupVisit.coach) !== "undefined") {
                    visit += '<div class="player_td">';
                    visit += '<div class="player_number"><p class="textcolor-title1">DT</p></div>';
                    visit += '<div class="dotted-left">';
                    visit += '<div class="player_name"><p>' + data.lineupVisit.coach.longName + '</p></div>';
                    visit += '<div class="players_icons">';
                    //visit += '<i class="tvsa-mxm-yellowcard"></i><span>17\'</span>';
                    visit += '</div></div></div>';
                }


                for (var p = 0; p < data.lineupLocal.substitutes.length; p++) {
                    var ActLB = "";
                    if (typeof(data.lineupLocal.substitutes[p].idjugador.actions) === "object") {
                        ActLB = giveActions(data.lineupLocal.substitutes[p].idjugador.actions);
                    }

                    localSub += '<div class="player_td dotted-bottom EqLTIM" data-guid="' + data.lineupLocal.substitutes[p].idjugador + '">';
                    localSub += '<div class="player_number"><p class="textcolor-title2">' + data.lineupLocal.substitutes[p].number + '</p></div>';
                    localSub += '<div class="dotted-left container_card">';
                    localSub += '<div class="player_name"><p>' + data.lineupLocal.substitutes[p].nickName + '</p></div>';
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
                    visitSub += '<div class="player_name"><p>' + data.lineupVisit.substitutes[o].nickName + '</p></div>';
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
                maquetado += local;
                maquetado += '</div></div>';
                maquetado += '<div class="second_team aling">';
                maquetado += '<div class="title">';
                maquetado += '<div><img src="http://i2.esmas.com/img/spacer.gif" class="TIMimgVisit"></div>';
                maquetado += '<div class="team"><p>' + data.lineupVisit.name + '</p></div>';
                maquetado += '</div>';
                maquetado += '<div class="player_table" id="jugadoresvisitTIM">';
                maquetado += visit;
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

                maquetado += '<div class="table_title"><p class="textcolor-title1">Arbitros</p></div>';

                if (typeof(data.referees) !== "undefined") {
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
            },

            GolesAnotados: function(local, visit, namelocal, namevisit) {
                var maquetado = "",
                    localM,
                    visitM, finalM = "",
                    arrayGlobal = new Array();
                if (local !== '') {
                    for (var i = 0; i < local.length; i++) {
                        localM = "";
                        localM += '<div class="' + local[i].minute + ' block_container localTIMGol">';
                        localM += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + namelocal + '</span></p></div>';
                        localM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + local[i].minute + ' \' ';
                        localM += '<span class="textcolor-title2">' + local[i].formaGol + '</span></p></div>';
                        localM += '<div class="dotted-left marcador dotted-left"><p>' + local[i].current_score + '</p></div></div>';
                        arrayGlobal.push(localM);
                    };
                }
                if (visit !== '') {
                    for (var l = 0; l < visit.length; l++) {
                        visitM = "";
                        visitM += '<div class="' + visit[l].minute + ' block_container visitTIMGol">';
                        visitM += '<div class="jugador"><p>' + visit[l].nickName + '<span class="textcolor-title4">' + namevisit + '</span></p></div>';
                        visitM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + visit[l].minute + ' \' ';
                        visitM += '<span class="textcolor-title2">Tiro Libre</span></p></div>';
                        visitM += '<div class="dotted-left marcador dotted-left"><p>' + local[l].current_score + '</p></div></div>';
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
                }



            },
            updateGolesAnotados: function(local, visit, namelocal, namevisit) {
                var arrayGlobal = new Array(),
                    nuevoFinal = "";
                var actualNow = parseInt(local.length) + parseInt(visit.length);
                var actualGoles = parseInt(wdg_smex_strategy.tagAlineacionGoles.find('.block_container').size());
                if (actualNow > actualGoles) {
                    if (local !== '') {
                        for (var i = 0; i < local.length; i++) {
                            localM = "";
                            localM += '<div class="' + local[i].minute + ' block_container localTIMGol">';
                            localM += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + namelocal + '</span></p></div>';
                            localM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + local[i].minute + ' \' ';
                            localM += '<span class="textcolor-title2">' + local[i].formaGol + '</span></p></div>';
                            localM += '<div class="dotted-left marcador dotted-left"><p>' + local[i].current_score + '</p></div></div>';
                            arrayGlobal.push(localM);
                        };
                    }
                    if (visit !== '') {
                        for (var l = 0; l < visit.length; l++) {
                            visitM = "";
                            visitM += '<div class="' + visit[l].minute + ' block_container visitTIMGol">';
                            visitM += '<div class="jugador"><p>' + visit[l].nickName + '<span class="textcolor-title4">' + namevisit + '</span></p></div>';
                            visitM += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i><p class="grado textcolor-title4">' + visit[l].minute + ' \' ';
                            visitM += '<span class="textcolor-title2">Tiro Libre</span></p></div>';
                            visitM += '<div class="dotted-left marcador dotted-left"><p>' + local[l].current_score + '</p></div></div>';
                            arrayGlobal.push(visitM);
                        };
                    }

                    for (var z = actualGoles; z < arrayGlobal.sort().length; z++) {
                        nuevoFinal += arrayGlobal.sort()[z];
                    };

                    wdg_smex_strategy.tagAlineacionGoles.find(".convocados").append(nuevoFinal);

                }

            },
            wdgPenales: function(local, visit, nombreLocal, nombrevisit) {
                var maquetado = "",
                    content = "";
                for (var i = 0; i < local.length; i++) {
                    content += '<div class="block_container dotted-bottom">';
                    content += '<div class="jugador"><p>' + local[i].nickName + '<span class="textcolor-title4">' + nombreLocal + '</span></p></div>';
                    content += '<div class="estadistica dotted-left"><i class="tvsa-mxm-goal"></i></div>';
                    content += '<div class="dotted-left marcador dotted-left"><p>0-0</p></div>';
                    content += '</div>';
                };
                for (var j = 0; j < visit.length; j++) {
                    content += '<div class="block_container dotted-bottom">';
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
                wdg_smex_strategy.tagwdgPenales.html(maquetado);

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
                //player_table 
                //
                $(".wdg_team_align_01 .second_team  .player_table").find(".player_td").each(function(index) {
                    var contador = index + 1;
                    if ($(this).height() > $(".wdg_team_align_01 .first_team .player_table").find(".player_td:nth-child(" + contador + ")").height())
                        $(".wdg_team_align_01 .first_team .player_table").find(".player_td:nth-child(" + contador + ")").height($(this).height())
                    else
                        $(this).height($(".wdg_team_align_01 .first_team .player_table").find(".player_td:nth-child(" + contador + ")").height())
                });
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