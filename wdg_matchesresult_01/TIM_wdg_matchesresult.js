;
(function() {
    $.fn.wdgMatchResult = function(options) {
        var setting = $.extend({
            'tickermaster': 0,
            'tickertournament': 0,
            'link': '',
            'tema': 'deportes',
            'country_code': ''
        }, options);

        var Globalthis = this;

        //console.log(setting);
        var wdg_matchresult = {
            TickerMaster: setting.tickermaster,
            TickerTournamen: setting.tickertournament,
            timeUpdateA: new Array(),
            globalTimer: "",

            DrawCuerpo: function() {
                wdg_matchresult.horaServidor();
                var cuerpoHTML = "";
                cuerpoHTML += '<div class="windows8">';
                cuerpoHTML += '<div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div>';
                cuerpoHTML += '<div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div>';
                cuerpoHTML += '<div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div>';
                cuerpoHTML += '<div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div>';
                cuerpoHTML += '<div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div>';
                cuerpoHTML += '</div>';
                cuerpoHTML += '<div class="wdg_matchesresult_01_container">';
                cuerpoHTML += '<div class="wdg_matchesresult_01_left">';
                cuerpoHTML += '<div class="wdg_matchesresult_01_top">';
                cuerpoHTML += '<a class="title" href="#">Resultados</a>';
                cuerpoHTML += '<a class="subtitle" href="#">Minuto a Minuto</a>';
                //cuerpoHTML += '<a href=""><span class="wdg_matchesresult_nike"></span></a>';
                cuerpoHTML += '</div>';
                cuerpoHTML += '<div class="wdg_matchesresult_01_bottom">';
                cuerpoHTML += '<div class="wdg_matchesresult_important" id="FListTournaments">';
                cuerpoHTML += '</div>';
                cuerpoHTML += '<div class="wdg_matchesresult_contenedor"><ul id="ListTournaments"></ul></div>';
                cuerpoHTML += '</div>';
                cuerpoHTML += '<div class="wdg_matchesresult_visible">';
                cuerpoHTML += '<p><a class="wdg_matchesresult_show" href=""><span class="wdg_matchesresult_sprite uparrow"></span>Ocultar</a></p>';
                cuerpoHTML += '<p><a class="wdg_matchesresult_hide" href=""><span class="wdg_matchesresult_sprite downarrow"></span>Ver M&aacute;s</a></p>';
                cuerpoHTML += '</div>';
                cuerpoHTML += '</div>';
                cuerpoHTML += '<div class="wdg_matchesresult_01_right">';

                if (setting.tema !== "mundial") {
                    cuerpoHTML += '<div class="wdg_matchesresult_01_navcontainer">';
                    cuerpoHTML += '<div class="wdg_matchesresult_navarrowleft">';
                    cuerpoHTML += '<a class="wdg_matchesresult_navleft" href="#left">';
                    cuerpoHTML += '<i class="tvsa-double-caret-left"></i>';
                    cuerpoHTML += '</a> ';
                    cuerpoHTML += '</div>';
                    cuerpoHTML += '<div class="wdg_matchesresult_01_nav">';
                    cuerpoHTML += '<ul class="wdg_matchesresult_01_theme">';
                    cuerpoHTML += '<li class="selected">';
                    cuerpoHTML += '<a href="">';
                    cuerpoHTML += '<p>Fútbol</p>';
                    cuerpoHTML += '</a> ';
                    cuerpoHTML += '</li>';
                    cuerpoHTML += '</ul>';
                    cuerpoHTML += '<div class="linedown"></div>    ';
                    cuerpoHTML += '</div>';
                    cuerpoHTML += '<div class="wdg_matchesresult_navarrowright">';
                    cuerpoHTML += '<a class="wdg_matchesresult_navright" href="#right">';
                    cuerpoHTML += '<i class="tvsa-double-caret-right"></i>';
                    cuerpoHTML += '</a>';
                    cuerpoHTML += '</div>';
                    cuerpoHTML += '</div>';
                }

                cuerpoHTML += '<div id="left" class="wdg_matchesresult_01_mobileleft">';
                cuerpoHTML += '<a class="wdg_matchesresult_left" href="#left">';
                cuerpoHTML += '<i class="tvsa-caret-left"></i>';
                //cuerpoHTML += '<!-- <span class="wdg_matchesresult_leftmobile"></span> -->';
                cuerpoHTML += '</a>';
                cuerpoHTML += '</div>';
                cuerpoHTML += '<div class="wdg_matchesresult_01_components">';
                cuerpoHTML += '<ul class="wdg_matchesresult_01_list" id="listNow"></ul>';
                cuerpoHTML += (setting.link !== "") ? '<a href="' + setting.link + '" target="_blank" class="viewmore"><span class="wdg_matchesresult_vertodos">Ver Todos</span></a>' : '';
                cuerpoHTML += '</div>';
                cuerpoHTML += '<div id="right" class="wdg_matchesresult_01_mobileright">';
                cuerpoHTML += '<a class="wdg_matchesresult_right" href="#right">';
                cuerpoHTML += '<i class="tvsa-caret-right"></i>';
                //cuerpoHTML += '<!-- <span class="wdg_matchesresult_rightmobile"></span> -->';
                cuerpoHTML += '</a>';
                cuerpoHTML += '</div>';
                cuerpoHTML += '<div class="wdg_matchesresult_01_arrows">';
                cuerpoHTML += '<a class="wdg_matchesresult_left" href="#left">';
                cuerpoHTML += '<span class="tvsa-double-caret-left active"></span>';
                cuerpoHTML += '</a>';
                cuerpoHTML += '<a class="wdg_matchesresult_right" href="#right">';
                cuerpoHTML += '<span class="tvsa-double-caret-right inactive"></span>  ';
                cuerpoHTML += '</a>';
                cuerpoHTML += '</div>';
                //cuerpoHTML += (setting.link!=="") ? '<a href="'+setting.link+'"><span class="wdg_matchesresult_vertodos">Ver Todos</span></a>': '';
                cuerpoHTML += '</div>';
                cuerpoHTML += '</div>';
                Globalthis.html(cuerpoHTML);

                if (setting.tema === "mundial") {
                    Globalthis.attr("data-tema", "mundial");
                }
            }, // END DrawCuerpo


            LoadMaster: function(idMaster) {
                $.ajax({
                    url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/tickers/Ticker_' + wdg_matchresult.TickerMaster + '.js',
                    type: 'GET',
                    jsonpCallback: 'mainwtdata',
                    dataType: 'jsonp',
                    cache: true
                })
                    .done(function(data) {
                        DrawList = "";
                        for (var i = 0; i < data.ticker.widgets.widgets.length; i++) {
                            (i === 0) ? $("#FListTournaments").html('<a class="featured onShowItem" data-url="' + data.ticker.widgets.widgets[i].urldata + '" href="#" >' + data.ticker.widgets.widgets[i].title + '</a>') : DrawList += '<li><a href="#" data-url="' + data.ticker.widgets.widgets[i].urldata + '" ><p>' + data.ticker.widgets.widgets[i].title + '</p></a></li>';


                        };
                        $("#ListTournaments").html(DrawList);
                        $("#FListTournaments a, #ListTournaments a").bind('click', function(event) {
                            event.preventDefault();
                            if (!$(this).hasClass('onShowItem')) {
                                $(".windows8").show('fast');
                                wdg_matchresult.LoadFirst($(this).data('url'));
                                var cc;
                                if (setting.tema === "mundial") {
                                    cc = "#8f8f8f";
                                } else {
                                    cc = "#FFFFFF";
                                }

                                $("#FListTournaments").parent().find('a').css('color', cc).removeClass('onShowItem');
                                $(this).css('color', '#D6A256').addClass('onShowItem');
                            }

                        });
                        wdg_matchresult.inicio();
                    })
                    .fail(function() {
                        //console.log("error");
                    });


            }, // END LoadMaster


            LoadFirst: function(urlData, tipo) {
                //console.log("function LoadFirst");
                $.ajax({
                    url: urlData,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'wdata',
                    cache: false
                })
                    .done(function(dataFirst) {
                        //console.log(dataFirst);
                        //wdg_matchresult.DrawContentFirst(dataFirst.matches.match,tipo);
                        (tipo === "update") ? wdg_matchresult.updateGoles(dataFirst) : wdg_matchresult.DrawContentFirst(dataFirst.matches.match, tipo);
                        try {
                            //console.log("SETIMER...");
                            clearInterval(wdg_matchresult.globalTimer);
                            wdg_matchresult.setTimer();
                            wdg_matchresult.timeUpdateA.length = 0;
                        } catch (e) {
                            console.log("ha ocurrido un error al poner el setimer" + e);
                        }
                    })
                    .fail(function() {
                        //console.log("Error al cargar: "+urlData);
                    })
            }, // END LoadFirst

            DrawContentFirst: function(contenido, tipo) {
                var posibles = new Array('&aacute', '&Aacute', '&eacute', '&Eacute', '&iacute', '&Iacute', '&oacute;', '&Oacute', '&uacute', '&Uacute', '&ntilde');

                if (tipo === "only") {
                    $("#FListTournaments").html('<a class="featured onShowItem" data-url="http://interacciontd.televisadeportes.esmas.com/deportes/home/TickerFutbol_' + wdg_matchresult.TickerTournamen + 'jsonp.js" href="#" >' + contenido[0].EventTournamentName + '</a>');
                    //setInterval(function(){wdg_matchresult.updateInfo()}, wdg_matchresult.timeUpdate);
                }

                var ItemView = "";
                for (var y = 0; y < contenido.length; y++) {
                    if (y < 16) {
                        var numSplit = 7;
                        ItemView += '<li id="' + contenido[y].TimeStamp + '">';
                        ItemView += '<div class="wdg_match_01">';
                        ItemView += '<div class="wdg_match_01_time background-color1">';
                        ItemView += '<p>';
                        ItemView += '<a class="textcolor-title5">' + contenido[y].periodabrev + ' ' + (isNaN(contenido[y].time) ? contenido[y].time + '"' : '') + '</a>';
                        ItemView += '</p>';
                        ItemView += '</div> ';
                        ItemView += '<div class="wdg_match_01_team winner">';
                        ItemView += '<div class="wdg_match_01_teamname">';
                        ItemView += '<p>                ';
                        ItemView += '<a>' + contenido[y].equipos.local.name.substring(0, 18) + '</a>';
                        ItemView += '</p> ';
                        ItemView += '</div>';
                        ItemView += '<div class="wdg_match_01_teamscore">';
                        ItemView += '<p>                ';
                        ItemView += '<a>' + contenido[y].equipos.local.goals + '</a>';
                        ItemView += '</p>';
                        ItemView += '</div>';
                        ItemView += '</div>';
                        ItemView += '<div class="wdg_match_01_team loser">';
                        ItemView += '<div class="wdg_match_01_teamname">';
                        ItemView += '<p>                ';
                        ItemView += '<a>' + contenido[y].equipos.visit.name.substring(0, 18) + '</a>';
                        ItemView += '</p>';
                        ItemView += '</div>';
                        ItemView += '<div class="wdg_match_01_teamscore">';
                        ItemView += '<p>';
                        ItemView += '<a>' + contenido[y].equipos.visit.goals + '</a>  ';
                        ItemView += '</p>';
                        ItemView += '</div>';
                        ItemView += '</div><div class="shadow"></div>';
                        ItemView += '<div class="wdg_match_01_link">';
                        ItemView += '<div class="wdg_match_01_extra">';
                        ItemView += '<p>';
                        for (var m = 0; m < posibles.length; m++) {
                            if (contenido[y].txtLink.indexOf(posibles[m]) != -1) {
                                numSplit = 14;
                            }
                        };


                        if (setting.tema === "mundial") {
                            ItemView += '<a class="textcolor-title1" target="_blank" href="' + contenido[y].Website + '">' + contenido[y].txtLink.substring(0, numSplit) + '</a>';
                        } else {
                            ItemView += '<a class="textcolor-title1" target="_blank" href="' + contenido[y].Website + '">' + contenido[y].EventTournamentName.substring(0, 15);
                            ItemView += '<span class="textcolor-title4">' + contenido[y].txtLink.substring(0, numSplit) + '</span></a>';
                        }
                        ItemView += '</p>';
                        ItemView += '</div>';
                        if (setting.tema === "mundial") {
                            ItemView += '<div class="wdg_match_01_extra2"></div>';
                        }
                        ItemView += '<div class="wdg_match_01_icon">';
                        if (setting.country_code == 'USA') {
                            ItemView += (contenido[y].USAvideo != "") ? '<a href="' + contenido[y].USAvideo + '"><span class="wdg_match_01_sprite video"></span></a>' : '';
                        } else if (setting.country_code == 'MEX') {
                            ItemView += (contenido[y].MXvideo != "") ? '<a href="' + contenido[y].MXvideo + '"><span class="wdg_match_01_sprite video"></span></a>' : '';
                        }
                        ItemView += '</div>';
                        ItemView += '</div>';
                        ItemView += '</div>';
                        ItemView += '</li>';

                        (contenido[y].periodabrev.toLowerCase() !== "fin") ? (wdg_matchresult.DeterminaTiempoActualizacion(contenido[y].MatchDate, contenido[y].MatchHour)) : '';
                    }
                };

                (contenido.length <= 4) ? ($(".wdg_matchesresult_hide, .wdg_matchesresult_show").hide()) : '';


                objMasc = $("#listNow");

                if (tipo === "update") {
                    objMasc.empty().html(ItemView);
                } else {
                    objMasc.fadeOut('fast', function() {
                        objMasc.empty().html(ItemView)
                    });
                    objMasc.fadeIn('slow', function() {
                        wdg_matchresult.resize();

                    });
                }
                $(".windows8").hide();

            }, // END DrawContentFirst

            inicio: function() {
                wdg_matchresult.LoadFirst($("#FListTournaments a").eq(0).data("url"));

                //setInterval(function(){wdg_matchresult.updateInfo()}, wdg_matchresult.timeUpdate);
            },

            updateInfo: function() {
                $("#FListTournaments").parent().find('a').each(function(index, el) {
                    if ($(this).hasClass('onShowItem')) {
                        wdg_matchresult.LoadFirst($(this).data("url"), "update");
                    }
                });
            },
            updateGoles: function(data) {
                //console.log(data);
                var selectorTMP, NuevoGolV, ActGolV, NuevoGolL, ActGolL, tituloAct, tituloNue;
                for (var o = 0; o < data.matches.match.length; o++) {
                    //console.log(data.matches.match[o])
                    selectorTMP = $("#" + data.matches.match[o].TimeStamp);
                    ActGolL = String(selectorTMP.find('.wdg_match_01_teamscore').eq(0).text().trim());
                    ActGolV = String(selectorTMP.find('.wdg_match_01_teamscore').eq(1).text().trim());
                    NuevoGolL = String(data.matches.match[o].equipos.local.goals.trim());
                    NuevoGolV = String(data.matches.match[o].equipos.visit.goals.trim());
                    tituloAct = selectorTMP.find(".textcolor-title5").text();
                    tituloNue = String(data.matches.match[o].periodabrev.trim());

                    //console.log("TITLE"+tituloAct+"<->"+tituloNue);
                    //console.log("LOCAL"+ActGolL+"<->"+NuevoGolL);
                    //console.log("VISIT"+ActGolV+"<->"+NuevoGolV);


                    if (ActGolL !== NuevoGolL) {
                        selectorTMP.find('.wdg_match_01_teamscore').eq(0).css({
                            'display': 'none',
                            'position': 'relative'
                        }).text(NuevoGolL).fadeIn('slow');
                    }

                    if (ActGolV !== NuevoGolV) {
                        selectorTMP.find('.wdg_match_01_teamscore').eq(1).css({
                            'display': 'none',
                            'position': 'relative'
                        }).text(NuevoGolV).fadeIn('slow');
                    }
                    if (tituloNue !== tituloAct) {
                        selectorTMP.find(".textcolor-title5").css({
                            'display': 'none',
                            'position': 'relative'
                        }).text(tituloNue).fadeIn('slow');
                    }




                };
            },
            resize: function() {

                if ($(window).width() >= 933) {
                    $(".wdg_matchesresult_todos").show();
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components, .wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul').css('height', '100%');
                    $('.wdg_matchesresult_contenedor').css('overflow', 'visible');
                }
                if ($(window).width() < 933 && $(window).width() >= 609) {
                    $(".wdg_matchesresult_todos").hide();
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components, .wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul').css('height', '269px');
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').css('width', '748px');
                    $('.wdg_matchesresult_01_arrows').css('display', 'none');
                    $('.wdg_matchesresult_contenedor').css('overflow', 'scroll');
                }
                if ($(window).width() < 609) {
                    $(".wdg_matchesresult_todos").hide();
                    var nuevoWidth = 0;
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').css('height', '118px');
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul li').each(function(index, el) {
                        nuevoWidth = $(this).outerWidth() + nuevoWidth + 15;
                    });
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul').css({
                        'width': nuevoWidth + 'px',
                        'height': '118px',
                        'overflow': 'hidden'
                    });
                }
            },

            horaServidor: function() {
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

                        wdg_matchresult.horaServidor.vari = fechas;


                    }
                });
            }, // End timeUpdate()

            DeterminaTiempoActualizacion: function(dia, hora) {

                var FechaPartido = dia.substring(3, 5) + '-' + dia.substring(0, 2) + '-' + dia.substring(8, 10) + ' ' + hora.substring(0, 5) + ':00';
                var a = new Date(FechaPartido);
                var b = new Date(wdg_matchresult.horaServidor.vari);
                //console.log(a);
                //console.log(b);

                var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
                var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

                if (parseFloat(msDateA) < parseFloat(msDateB)) {
                    //console.log("MENOR");
                } else {
                    if (parseFloat(msDateA) == parseFloat(msDateB)) {
                        //console.log("IGUAL");										
                        var resta = parseInt(b.getHours() - a.getHours());
                        //cop
                        if (b.getHours() >= a.getHours()) {
                            //console.log("ya empezo el partido");
                            //Ya empezo el partido, actualizar valores cada minuto										
                            wdg_matchresult.timeUpdateA.push(60000);
                        } else {
                            var h1 = a.getHours();
                            var h2 = b.getHours();
                            var m1 = a.getMinutes();
                            var m2 = b.getMinutes();
                            //Validar cuantos minutos faltan para el inicio del partido
                            var minutosrestantes = parseInt((((h1 - h2) * 60) + m1) - m2);

                            if (minutosrestantes <= 15) {
                                //console.log("faltan menos de 15 min");
                                //Faltan 15 minutos o menos para el inicio, actualizar los valores cada minuto
                                wdg_matchresult.timeUpdateA.push(60000);

                            } else {
                                //console.log("faltan mas de 15 pero menos de 1hr " + minutosrestantes);
                                //Faltan mas de 15 minutos para el inicio, actualizar los valores cada 15 minutos pero menos de una hora
                                //console.log("comparo-->"+minutosrestantes);
                                (minutosrestantes <= 60) ? (wdg_matchresult.timeUpdateA.push(900000)) : '';
                            }
                        }
                        //cop



                    } else {
                        if (parseFloat(msDateA) > parseFloat(msDateB)) {
                            //console.log("MAYOR");

                        } else {
                            //console.log("Error no actualizo");
                            try {
                                wdg_matchresult.DeterminaTiempoActualizacion();
                            } catch (e) {
                                //console.log("erro en actualizar catch"+e);
                            }
                        }
                    }
                }

                //console.log(wdg_matchresult.timeUpdateA.length);



            }, // End timeUpdate()

            setTimer: function() {
                if (wdg_matchresult.timeUpdateA.length > 0) {
                    var tiempA = Math.min.apply(null, wdg_matchresult.timeUpdateA);
                    //console.log("tiempo Actualizacion: " + tiempA);					
                    wdg_matchresult.globalTimer = setInterval(function() {
                        wdg_matchresult.updateInfo()
                    }, tiempA);
                }

            }



        };

        $.when(wdg_matchresult.DrawCuerpo()).done(function() {
            if (wdg_matchresult.TickerMaster !== 0) {
                try {
                    wdg_matchresult.LoadMaster(wdg_matchresult.TickerMaster)
                } catch (e) {
                    console.log("error en tickerMaster" + e);
                }
            } else if (wdg_matchresult.TickerTournamen !== 0) {
                try {
                    wdg_matchresult.LoadFirst('http://static-televisadeportes.esmas.com/sportsdata/futbol/data/tickers/TickerFutbol_' + wdg_matchresult.TickerTournamen + '.js', 'only');
                } catch (e) {
                    console.log("Error en TickerTorunament" + e);
                }

            }
            (wdg_matchresult.TickerMaster === 0 && wdg_matchresult.TickerTournamen === 0) ? Globalthis.remove() : '';
        });

        $(window).resize(function(event) {
            wdg_matchresult.resize();
        });



    }
})(jQuery);









;
jQuery(function($) {
    (function(T, $) {
        // var $widthF = $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width() - 5;
        var $x = $('.wdg_matchesresult_01_nav');
        var $y = $('.wdg_matchesresult_01_nav ul li');
        var $z = $('.wdg_matchesresult_01_nav ul li:first-child');
        var $show = $('.wdg_matchesresult_hide');
        var $hide = $('.wdg_matchesresult_show');
        var $totalWidth = 0;
        var $slide = $z.outerWidth(true);
        $y.each(function() {
            $totalWidth += $(this).outerWidth(true);
        });
        var $m = $('.wdg_matchesresult_01_components'),
            animationDelay = 500;
        var $w = $('.wdg_matchesresult_01_components ul li');
        var $count = 0;
        $w.each(function() {
            $count++;
        });
        var $unitary = $w.outerWidth(true);
        var $unitaryH = $w.outerHeight(true);
        var $round = 1;
        if ($.browser.msie && parseFloat($.browser.version) <= 8) {} else {
            $(window).resize(function() {
                var visShow = $show.css('visibility');
                //var visHide = $hide.css('visibility'); 
                $unitary = $w.outerWidth(true);
                $totalWidth = 0;
                $y.each(function() {
                    $totalWidth += $(this).outerWidth(true);
                });

                if ($(window).width() >= 933) {
                    $round = Math.round($count / 3);
                    if (($count / 3) > $round)
                        $m.find('ul').width(800);
                    else
                        $m.find('ul').width(800);
                    $m.find('ul').height(600);
                    $m.height(600);
                    $x.find('ul').width(800);
                    if (visShow == 'hidden') {
                        $('.wdg_matchesresult_01').animate({
                            'height': 665
                        }, 0);
                    }
                }
                if ($(window).width() < 933 && $(window).width() >= 609) {

                    if (visShow == 'hidden') {
                        $('.wdg_matchesresult_01').animate({
                            'height': 460
                        }, 0);
                    }
                    // $round = Math.round($count/2);

                    // Se comentan estas lineas ya que modifican el ancho del ul del carrusel y descuadra en tablet
                    /*if( ($count / 2) > $round )
                        $m.find('ul').width( (($round + 1) * $unitary) - 152);
                    else
                        $m.find('ul').width( ($round * $unitary) - 152);
					
                    $m.find('ul').height($unitaryH * 2);*/
                    // $m.height($unitaryH * 2);
                    //$x.find('ul').width( $totalWidth + 20 );
                    // if ( visShow == 'hidden' ) {
                    //     $('.wdg_matchesresult_01').animate({
                    //         'height': 460
                    //     }, 0);
                    // }
                }
                if ($(window).width() < 609) {
                    // $round = Math.round($count);
                    // $m.find('ul').width( ($round * $unitary) - 6);
                    // $m.height($unitaryH + 28);
                    // $m.find('ul').height($unitaryH);
                    /*if ( visShow == 'hidden' ) {

                    }*/
                    $('.wdg_matchesresult_01_theme').css('width', '450px');
                    $('.wdg_matchesresult_01').animate({
                        'height': 218
                    }, 0);

                }
                $m.animate({
                    'scrollLeft': 0
                }, 0);


            });
        }
        $m.each(function() {
            var $parent = $(this);
            var $items = $(this).find('ul li');
            $count = 0;
            $items.each(function() {
                $count++;
            });
            if (T.getDeviceSize() === 'large') {
                $round = Math.round($count / 3);
                if (($count / 3) > $round)
                    $(this).find('ul').width(($round + 1) * $unitary);
                else
                    $(this).find('ul').width($round * $unitary);
                $(this).find('ul').height($unitaryH * 3);
                $(this).height($unitaryH * 3);
            }
            if (T.getDeviceSize() === 'medium') {
                $round = Math.round($count / 2);
                /*if( ($count / 2) > $round )
                    $(this).find('ul').width( ($round + 1) * $unitary);
                else
                    $(this).find('ul').width( $round * $unitary);*/
                $(this).find('ul').height($unitaryH * 2);
                $(this).height($unitaryH * 2);
            }
            if (T.getDeviceSize() === 'small') {
                $round = Math.round($count);
                $(this).find('ul').width(($round * $unitary));
                $(this).find('ul').height($unitaryH);
                $(this).height($unitaryH + 28);
            }
            /*Arrows Mobile*/
            $parent.parent().find('.wdg_matchesresult_01_mobileleft a.wdg_matchesresult_left').click(function(e) {
                e.preventDefault();
                $parent.animate({
                    'scrollLeft': $parent.scrollLeft() - 222
                }, animationDelay, "linear", function() {
                    /*Verifico posiciÃ³n del scroll*/
                    var large_tot = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_list').width();
                    large_tot = large_tot - 220;
                    var position = $parent.scrollLeft(); //alert("termine izq " + position +" "+ large_tot);
                    if (position < 222) {
                        //$('.wdg_matchesresult_01 #left').addClass('end');
                        $('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#6C0808');
                    } else {
                        //$('.wdg_matchesresult_01 #left').removeClass('end');
                        $('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#D6A256');
                    }
                    if (position == large_tot) {
                        $('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#6C0808');
                    } else {
                        $('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#D6A256');
                    }
                });

            });

            $parent.parent().find('.wdg_matchesresult_01_mobileright a.wdg_matchesresult_right').unbind().click(function(e) {
                e.preventDefault();
                $parent.animate({
                    'scrollLeft': $parent.scrollLeft() + 222
                }, animationDelay, "linear", function() {
                    /*Verifico posiciÃ³n del scroll*/
                    var large_tot = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_list').width();
                    large_tot = large_tot - 220;
                    var position2 = $parent.scrollLeft(); //alert("termine der " + position2);
                    if (position2 < 222) {
                        //$('.wdg_matchesresult_01 #left').addClass('end');
                        $('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#6C0808');
                    } else {
                        //$('.wdg_matchesresult_01 #left').removeClass('end');
                        $('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#D6A256');
                    }
                    if (position2 >= large_tot) {
                        $('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#6C0808');
                    } else {
                        $('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#D6A256');
                    }
                });

            });
            /*Arrows Tablet*/
            $parent.parent().find('.wdg_matchesresult_01_arrows a.wdg_matchesresult_left').unbind().click(function(e) {
                e.preventDefault();
                $parent.animate({
                    'scrollLeft': $parent.scrollLeft() - 370
                }, 500);
            });
            $parent.parent().find('.wdg_matchesresult_01_arrows a.wdg_matchesresult_right').unbind().click(function(e) {
                e.preventDefault();
                $parent.animate({
                    'scrollLeft': $parent.scrollLeft() + 370
                }, 500);
            });

        });
        $(document).ready(function() {
            $('.wdg_matchesresult_01_arrows').css('display', 'none');
            if ($(window).width() >= 933) {
                $_brinca = 888
            }
            if ($(window).width() >= 609) {
                $_brinca = 370
            }
            if ($(window).width() < 609) {
                $_brinca = 222
            }
            $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').bind('swipeleft', function() {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').animate({
                    'scrollLeft': $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').scrollLeft() + $_brinca
                }, 500);
            });
            $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').bind('swiperight', function() {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').animate({
                    'scrollLeft': $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').scrollLeft() - $_brinca
                }, 500);
            });
        });

        /*Monitorea scroll*/
        $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').scroll(function() {

            var $scroll = $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components');
            var $width = $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width() - 5;
            var $widthT = $scroll.scrollLeft() + $scroll.width();
            // var $height = $parent.height();
            $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-left').css('color', '#D6A256');
            if ($scroll.scrollLeft() == 0) {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-left, .wdg_matchesresult_01 .wdg_matchesresult_01_arrows .tvsa-double-caret-left').css('color', '#6C0808');
            } else {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-left, .wdg_matchesresult_01 .wdg_matchesresult_01_arrows .tvsa-double-caret-left').css('color', '#D6A256');
            }
            if ($width < $widthT) {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-right, .wdg_matchesresult_01 .wdg_matchesresult_01_arrows .tvsa-double-caret-right').css('color', '#6C0808');
            } else {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-right, .wdg_matchesresult_01 .wdg_matchesresult_01_arrows .tvsa-double-caret-right').css('color', '#D6A256');
            }


            var position3 = $(this).scrollLeft();
            var large_tot = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_list').width();
            large_tot = large_tot - 220;
            if (position3 < 222) {
                //$('.wdg_matchesresult_01 #left').addClass('end');
                $('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#6C0808');
            } else {
                //$('.wdg_matchesresult_01 #left').removeClass('end');
                $('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#D6A256');
            }
            if (position3 >= large_tot) {
                $('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#6C0808');
            } else {
                $('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#D6A256');
            }
        });


        $x.each(function() {

            var $parent = $(this);

            if (T.getDeviceSize() === 'small') {
                $x.find('ul').width($totalWidth + 20);
            }
            $p = 0;
            $slide = 0;


            /*Sub menu principal*/
            $parent.parent().find('a.wdg_matchesresult_navleft').click(function(e) {
                e.preventDefault();
                //calculate move
                /*for($i=1;$i<4;$i++)
					{
					$z = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_theme li:nth-child('+$i+')');
						$sl = $z.outerWidth(true);
						$slide = $slide + $sl;
					}*/
                $parent.stop(true).animate({
                    'scrollLeft': $parent.scrollLeft() - 250
                }, animationDelay, "linear", function() {
                    /*Verifico posiciÃ³n del scroll*/
                    var large_tot = $(this).children().width();
                    var position = $parent.scrollLeft();
                    med = position + $(this).parent().width();
                    if (position == 0) {
                        $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#6C0808');
                    } else {
                        $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#D6A256');
                    }
                    if (position != 0) {
                        $(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#6C0808');
                    } else {
                        $(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#D6A256');
                    }
                });
            });


            $parent.stop(true).parent().find('a.wdg_matchesresult_navright').click(function(e) {
                e.preventDefault();
                //calculate move
                /*for($i=1;$i<4;$i++)
					{
					$z = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_theme li:nth-child('+$i+')');
						$sl = $z.outerWidth(true);
						$slide = $slide + $sl;
					}*/
                $parent.animate({
                    'scrollLeft': $parent.scrollLeft() + 250
                }, animationDelay, "linear", function() {
                    /*Verifico posiciÃ³n del scroll*/
                    var large_tot = $(this).children().width();
                    var position = $parent.scrollLeft();
                    med = position + $(this).parent().width();
                    //console.log('This es:'+$(this).attr('class')+' position: '+position);	
                    if (position == 0) {
                        $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#6C0808');
                    } else {
                        $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#D6A256');
                    }
                    if (position != 0) {
                        $(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#6C0808');
                    } else {
                        $(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#D6A256');
                    }
                });
            });
        });

        /*Monitorea scroll sub menu principal*/
        $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_navcontainer .wdg_matchesresult_01_nav').scroll(function() {
            var position4 = $(this).scrollLeft();
            var large_tot4 = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_theme').width();
            large_tot4 = large_tot4 - 245;
            if (position4 < 57) {
                $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#6C0808');
            } else {
                $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#D6A256');
            }
            //console.log('position: '+position4+' largo: '+large_tot4); 
            if (position4 >= large_tot4) {
                $(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#6C0808');
            } else {
                $(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#D6A256');
            }
        });

        $hide.click(function(e) {
            e.preventDefault();
            var $closeElement = $(this).closest('.wdg_matchesresult_01');
            $show = $closeElement.find('.wdg_matchesresult_hide');
            $hide = $closeElement.find('.wdg_matchesresult_show');
            var visShow = $show.css('visibility');
            if (T.getDeviceSize() === 'large') {
                //$('.wdg_matchesresult_01 .wdg_matchesresult_01_left .wdg_matchesresult_visible').css('margin-top','32%');
            }
            var heich = 218;
            if ($(".wdg_matchesresult_01").data("tema") === "mundial") {
                heich = 168;
            }
            $closeElement.animate({
                'height': heich
            }, animationDelay);
            $(this).closest('.wdg_matchesresult_01_left').find('.wdg_matchesresult_01_bottom').hide();
            if (visShow == 'hidden') {
                $show.css({
                    visibility: 'visible'
                });
                $hide.css({
                    visibility: 'hidden'
                });

            } else {
                $show.css({
                    visibility: 'hidden'
                });
                $hide.css({
                    visibility: 'visible'
                });
            }
        });


        $show.click(function(e) {
            e.preventDefault();
            var $closeElement = $(this).closest('.wdg_matchesresult_01');
            $show = $closeElement.find('.wdg_matchesresult_hide');
            $hide = $closeElement.find('.wdg_matchesresult_show');
            var visHide = $hide.css('visibility');
            var heightModulo = 0,
                porce = 0,
                heightModuloc = 0;
            var numeroItems = parseInt($("#listNow li").size());
            var listaItems = parseInt($("#ListTournaments li").size());
            if (listaItems < 1) {
                $("#FListTournaments").hide()
            }

            /*if($(".wdg_matchesresult_01").data("tema") ==="mundial"){
					$(".wdg_matchesresult_01_components").css("height","100%");
					if (numeroItems <= 4) {
						heightModulo = 171;
						if(listaItems>11){heightModulo=650} else if(listaItems<=11 && listaItems>=8) {heightModulo=465}else if(listaItems<8 && listaItems>=1){heightModulo=315}
					} else if (numeroItems > 4 && numeroItems <= 8) {
						heightModulo = 315;			
						if(listaItems>11){heightModulo=650} else if(listaItems<=11 && listaItems>=8) {heightModulo=465}
					} else if (numeroItems > 8 && numeroItems <= 12) {
						heightModulo = 465;
						if(listaItems>11){heightModulo=650}
					} else if (numeroItems > 12) {
						heightModulo = 650;				
					} 
				}else{*/


            if (numeroItems <= 4) {
                heightModulo = 221;
                if (listaItems > 11) {
                    heightModulo = 665
                } else if (listaItems <= 11 && listaItems >= 8) {
                    heightModulo = 515
                } else if (listaItems < 8 && listaItems >= 1) {
                    heightModulo = 366
                }
            } else if (numeroItems > 4 && numeroItems <= 8) {
                heightModulo = 366;
                if (listaItems > 11) {
                    heightModulo = 665
                } else if (listaItems <= 11 && listaItems >= 8) {
                    heightModulo = 515
                }
            } else if (numeroItems > 8 && numeroItems <= 12) {
                heightModulo = 515;
                if (listaItems > 11) {
                    heightModulo = 665
                }
            } else if (numeroItems > 12) {
                heightModulo = 665;
            }
            //	}// tema mundial


            if (T.getDeviceSize() === 'large') {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_left .wdg_matchesresult_visible').css({
                    'margin-top': '10%',
                    'position': 'absolute',
                    'bottom': '10px'
                });


                //$('.wdg_matchesresult_01 .wdg_matchesresult_01_left .wdg_matchesresult_visible').css('margin-top','95%');
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_container , .wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul').css('height', heightModulo + 'px');
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right').css('height', heightModulo - 30 + 'px');
                $closeElement.animate({
                    'height': heightModulo
                }, animationDelay);
            }
            if (T.getDeviceSize() === 'medium') {
                $closeElement.animate({
                    'height': 460
                }, animationDelay);
            }
            $(this).closest('.wdg_matchesresult_01_left').find('.wdg_matchesresult_01_bottom').show();
            if (visHide == 'hidden') {
                $hide.css({
                    visibility: 'visible'
                });
                $show.css({
                    visibility: 'hidden'
                });

            } else {
                $show.css({
                    visibility: 'visible'
                });
                $hide.css({
                    visibility: 'hidden'
                });
            }
        });
        $(window).load(function() {

            if ($(window).width() >= 933) {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width(800)
            }
            if ($(window).width() < 933 && $(window).width() >= 609) {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width(748);

            }
            if ($(window).width() < 609) {
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width(3546);
                $('.wdg_matchesresult_01_theme').css('width', '450px');
            }
        });


    }(Televisa, jQuery));
});