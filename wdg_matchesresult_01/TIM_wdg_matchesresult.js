/*!
 * TIM Developer: Israel Viveros
 *   Version: 5.2.7
 *   Copyright: Televisa Interactive Media (2014)
 */

jQuery.fn.animateAuto = function(prop, speed, callback) {
    var elem, height, width;
    return this.each(function(i, el) {
        el = jQuery(el), elem = el.clone().css({
            "height": "auto",
            "width": "auto"
        }).appendTo("body");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();

        if (prop === "height")
            el.animate({
                "height": height
            }, speed, callback);
        else if (prop === "width")
            el.animate({
                "width": width
            }, speed, callback);
        else if (prop === "both")
            el.animate({
                "width": width,
                "height": height
            }, speed, callback);
    });
};
(function() {
    $.fn.wdgMatchResult = function(options) {
        var setting = $.extend({
            'tickermaster': 0,
            'tickertournament': 0,
            'link': '',
            'tema': 'deportes',
            'country_code': 'MEX'
        }, options);

        var Globalthis = this;

        //console.log(setting);
        var wdg_matchresult = {
            TickerMaster: setting.tickermaster,
            TickerTournamen: setting.tickertournament,
            timeUpdateA: new Array(),
            globalTimer: "",

            DrawCuerpo: function() {
                var rndm = Math.random() * 1000000;
                var ord = Math.round(rndm);
                var sourceJump = "http://pubads.g.doubleclick.net/gampad/jump?iu=/5644/es.esmas.dep/mxm/widget&sz=37x26&c=" + ord;
                var sourceAd = "http://pubads.g.doubleclick.net/gampad/ad?iu=/5644/es.esmas.dep/mxm/widget&sz=37x26&c=" + ord;

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
                cuerpoHTML += (setting.tema === "deportes") ? '<a target="_blank" href="' + sourceJump + '"><span class="wdg_matchesresult_nike"><img class="adformxm" src="' + sourceAd + '"></span></a>' : '';
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
                    cuerpoHTML += '<ul class="wdg_matchesresult_01_theme"></ul>';
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

                if (setting.tema !== "mundial") {
                    $.ajax({
                        url: 'http://i2.esmas.com/deportes30/mxm/js/section.js',
                        type: 'GET',
                        dataType: 'jsonp',
                        cache: false,
                        jsonpCallback: 'section'
                    })
                        .done(function(data) {
                            var contentli = "";
                            for (var h = 0; h < data.length; h++) {
                                var classitem = (h === 0) ? "selected" : '';
                                var linkTo = (data[h].url !== "") ? href = "' + data[h].url + '" : '';
                                contentli += '<li class="' + classitem + '"><a ' + linkTo + '><p>' + data[h].name + '</p></a></li>';
                            };
                            Globalthis.find(".wdg_matchesresult_01_theme").html(contentli);
                            var finalW = 0;
                            Globalthis.find(".wdg_matchesresult_01_theme li").each(function(index, el) {
                                finalW = finalW + $(this).outerWidth();
                            });
                            Globalthis.find(".wdg_matchesresult_01_theme").css('width', finalW + 'px');
                        })
                        .fail(function() {
                            console.log("error");
                        });
                }


                (setting.tema !== "mundial") ? $('head').append('<link rel="stylesheet" href="http://i2.esmas.com/deportes30/mxm/css/TIM_wdg_matchesresult.min.css">') : '';
                //(setting.tema !== "mundial") ? $('head').append('<link rel="stylesheet" href="http://localhost/~israelviveros/mxm/wdg_matchesresult_01/css/TIM_wdg_matchesresult.css">') : '';

                if (setting.tema === "mundial") {
                    Globalthis.attr("data-tema", "mundial");
                }

                window.onresize = function(event) {
                    var t;
                    clearTimeout(t);
                    t = setTimeout(function() {
                        wdg_matchresult.rezisewindow();
                    }, 500);
                };
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
                        $("#FListTournaments a, #ListTournaments a").unbind("click").bind('click', function(event) {
                            event.preventDefault();
                            if (!$(this).hasClass('onShowItem')) {
                                $(".windows8").show('fast');
                                wdg_matchresult.LoadFirst($(this).data('url'), 'nuevoContenido');
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

                if (tipo !== "update") {
                    setInterval(function() {
                        wdg_matchresult.updateInfo();
                    }, 20000);
                }
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
                        if (tipo !== "rezise" && tipo !== "update") {
                            wdg_matchresult.rezisewindow('inicio');
                        }
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
                    });
            }, // END LoadFirst

            DrawContentFirst: function(contenido, tipo) {
                var posibles = new Array('&aacute', '&Aacute', '&eacute', '&Eacute', '&iacute', '&Iacute', '&oacute;', '&Oacute', '&uacute', '&Uacute', '&ntilde');

                if (tipo === "only") {
                    $("#FListTournaments").html('<a class="featured onShowItem" data-url="http://static-televisadeportes.esmas.com/sportsdata/futbol/data/tickers/TickerFutbol_' + wdg_matchresult.TickerTournamen + '.js" href="#" >' + contenido[0].EventTournamentName + '</a>');
                    //setInterval(function(){wdg_matchresult.updateInfo()}, wdg_matchresult.timeUpdate);
                }

                var ItemView = "";
                for (var y = 0; y < contenido.length; y++) {
                    if (y < 16) {
                        var numSplit = 7,
                            tituloMatch = "",
                            //golesTotalLocal = parseInt(contenido[y].equipos.local.goals) + parseInt(contenido[y].equipos.local.penales),
                            //golestotalVisit = parseInt(contenido[y].equipos.visit.goals) + parseInt(contenido[y].equipos.visit.penales);
                            golesTotalLocal = (contenido[y].equipos.local.penales !== 0) ? '(' + String(contenido[y].equipos.local.penales) + ')' : '',
                            golestotalVisit = (contenido[y].equipos.visit.penales !== 0) ? '(' + String(contenido[y].equipos.visit.penales) + ')' : '';


                        if ((String(contenido[y].period) === "P")) {
                            var fechacompleta = contenido[y].MatchDate.split('/'),
                                mest = wdg_matchresult.givemeMes(parseInt(fechacompleta[1]));
                            tituloMatch = fechacompleta[0] + '&bull;' + mest + '&bull;' + fechacompleta[2] + " " + contenido[y].MatchHour.substring(0, 5);
                        } else {
                            if (String(contenido[y].period) === "F") {
                                tituloMatch = 'Final del partido';
                            } else {
                                tituloMatch = contenido[y].periodabrev.replace('1T', 'Primer Tiempo').replace('2T', 'Segundo Tiempo');
                            }
                        }
                        ItemView += '<li id="' + contenido[y].MatchGuid + '">';
                        ItemView += '<div class="wdg_match_01">';
                        ItemView += '<div class="wdg_match_01_time background-color1">';
                        ItemView += '<p>';
                        //ItemView += '<a class="textcolor-title5">' + contenido[y].periodabrev + ' ' + (isNaN(contenido[y].time) ? contenido[y].time + '"' : '') + '</a>';
                        ItemView += '<a class="textcolor-title5">' + tituloMatch + '</a>';
                        ItemView += '</p>';
                        ItemView += '</div> ';
                        ItemView += '<div class="wdg_match_01_team winner">';
                        ItemView += '<div class="wdg_match_01_teamname">';
                        ItemView += '<p>';
                        ItemView += '<a>' + contenido[y].equipos.local.name.substring(0, 18) + '</a>';
                        ItemView += '</p> ';
                        ItemView += '</div>';
                        ItemView += '<div class="wdg_match_01_teamscore">';
                        ItemView += '<p>';
                        ItemView += (contenido[y].period === "P") ? '<a>-</a>  ' : '<a>' + contenido[y].equipos.local.goals + golesTotalLocal + '</a>  ';
                        ItemView += '</p>';
                        ItemView += '</div>';
                        ItemView += '</div>';
                        ItemView += '<div class="wdg_match_01_team loser">';
                        ItemView += '<div class="wdg_match_01_teamname">';
                        ItemView += '<p>';
                        ItemView += '<a>' + contenido[y].equipos.visit.name.substring(0, 18) + '</a>';
                        ItemView += '</p>';
                        ItemView += '</div>';
                        ItemView += '<div class="wdg_match_01_teamscore">';
                        ItemView += '<p>';
                        ItemView += (contenido[y].period === "P") ? '<a>-</a>  ' : '<a>' + contenido[y].equipos.visit.goals + golestotalVisit + '</a>  ';
                        ItemView += '</p>';
                        ItemView += '</div>';
                        ItemView += '</div><div class="shadow"></div>';
                        ItemView += '<div class="wdg_match_01_link">';
                        ItemView += '<div class="wdg_match_01_extra">';
                        ItemView += '<p>';
                        for (var m = 0; m < posibles.length; m++) {
                            if (contenido[y].txtLink.indexOf(posibles[m]) !== -1) {
                                numSplit = 14;
                            }
                        };


                        if (setting.tema === "mundial") {
                            //ItemView += '<a class="textcolor-title1" target="_blank" href="' + contenido[y].Website + '">' + contenido[y].txtLink.substring(0, numSplit) + '</a>';
                            var periodNow = contenido[y].period,
                                clasevivo = "novivo",
                                banderavivo = 0;
                            if (periodNow !== 'P' && periodNow !== "F") {
                                clasevivo = (contenido[y].EventUrl !== "") ? 'vivo' : '';
                                //contenido[y].txtLink = (contenido[y].EventUrl !== "") ? "EN VIVO AHORA" : contenido[y].txtLink;
                                banderavivo = 1;
                            }
                            ItemView += ((contenido[y].txtVideo) !== "undefined" && contenido[y].txtVideo !== "" && banderavivo === 0) ? '<i class="txtsefvivo">' + contenido[y].txtVideo + '</i>' : '<i class="txtsefvivo"></i>';
                            ItemView += '<a class="textcolor-title1" target="_blank" href="' + contenido[y].Website + '? ' + Math.random() + '">' + contenido[y].txtLink + '</a><a class="textcolor-title1"></a>';

                        } else {
                            contenido[y].txtLink = (contenido[y].txtLink === "Minuto a minuto") ? 'MxM' : contenido[y].txtLink;
                            ItemView += '<a class="textcolor-title1" target="_blank" href="' + contenido[y].Website + '?' + Math.random() + '">' + contenido[y].EventTournamentName.substring(0, 15);
                            ItemView += '<span class="textcolor-title4">' + contenido[y].txtLink + '</span></a>';
                        }
                        ItemView += '</p>';
                        ItemView += '</div>';
                        if (setting.tema === "mundial") {
                            ItemView += '<div class="wdg_match_01_extra2"></div>';
                        }
                        ItemView += '<div class="wdg_match_01_icon">';
                        if (setting.country_code === 'USA') {
                            ItemView += (contenido[y].USAvideo !== "" && typeof(contenido[y].USAvideo) !== "undefined") ? '<a target="_blank" href="' + contenido[y].USAvideo + '"><span class="wdg_match_01_sprite video"></span></a>' : '';
                        } else if (setting.country_code === 'MEX') {

                            if (setting.tema === "mundial") {
                                ItemView += (periodNow === "F" && contenido[y].ResumenTransmision !== "" && typeof contenido[y].ResumenTransmision !== "") ? '<a target="_blank" href="' + contenido[y].ResumenTransmision + '"><span class="wdg_match_01_sprite video"></span></a>' : '';
                                ItemView += (periodNow !== "F" && periodNow !== "P" && contenido[y].EventUrl !== "" && typeof(contenido[y].EventUrl) !== "undefined") ? '<a target="_blank" href="' + contenido[y].EventUrl + '"><span class="wdg_match_01_sprite video vivo"></span></a>' : '';
                            } else {
                                ItemView += (contenido[y].MXvideo !== "" && typeof(contenido[y].MXvideo) !== "undefined") ? '<a target="_blank" href="' + contenido[y].MXvideo + '"><span class="wdg_match_01_sprite video"></span></a>' : '';
                            }


                        }
                        ItemView += '</div>';
                        ItemView += '</div>';
                        ItemView += '</div>';
                        ItemView += '</li>';

                        //(contenido[y].periodabrev.toLowerCase() !== "fin") ? (wdg_matchresult.DeterminaTiempoActualizacion(contenido[y].MatchDate, contenido[y].MatchHour)) : '';
                    }
                };

                (contenido.length <= 4 && tipo === "only") ? ($(".wdg_matchesresult_hide, .wdg_matchesresult_show").hide()) : '';


                objMasc = $("#listNow");

                if (tipo === "update") {
                    objMasc.empty().html(ItemView);
                } else {
                    objMasc.fadeOut('fast', function() {
                        objMasc.empty().html(ItemView);
                    });
                    objMasc.fadeIn('slow', function() {
                        //wdg_matchresult.resize();

                    });
                }
                $(".windows8").hide();
                setTimeout(function() {
                    (tipo === 'nuevoContenido') ? Globalthis.animateAuto("height", 1000) : '';
                }, 700);



                /*
                if ($(window).width() >= 933) {
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width(800);
                }
                if ($(window).width() < 933 && $(window).width() >= 609) {
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width(748);

                }
                if ($(window).width() < 609) {
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width(3546);
                    $('.wdg_matchesresult_01_theme').css('width', '450px');
                }
                */


                wdg_matchresult.funcionesNaat();


            }, // END DrawContentFirst

            inicio: function() {
                wdg_matchresult.LoadFirst($("#FListTournaments a").eq(0).data("url"));

                //setInterval(function(){wdg_matchresult.updateInfo()}, wdg_matchresult.timeUpdate);
            },

            updateInfo: function() {
                $("#FListTournaments").parent().find('a').each(function(index, el) {
                    if ($(this).hasClass('onShowItem')) {
                        wdg_matchresult.LoadFirst($(this).data("url"), 'update');
                    }
                });
            },
            givemeMes: function(str) {
                switch (str) {
                    case 1:
                        return "Enero";
                        break;
                    case 2:
                        return "Febrero";
                        break;
                    case 3:
                        return "Marzo";
                        break;
                    case 4:
                        return "Abril";
                        break;
                    case 5:
                        return "Mayo";
                        break;
                    case 6:
                        return "Junio";
                        break;
                    case 7:
                        return "Julio";
                        break;
                    case 8:
                        return "Agosto";
                        break;
                    case 9:
                        return "Septiembre";
                        break;
                    case 10:
                        return "Octubre";
                        break;
                    case 11:
                        return "Noviembre";
                        break;
                    case 12:
                        return "Diciembre";
                        break;

                }
            },
            updateGoles: function(data) {
                var selectorTMP, NuevoGolV, ActGolV, NuevoGolL, ActGolL, tituloAct, tituloNue, textoLink, textoLinkNuevo;
                for (var o = 0; o < data.matches.match.length; o++) {
                    var tituloMatch = "";
                    if ((String(data.matches.match[o].period) === "P")) {
                        var fechacompleta = data.matches.match[o].MatchDate.split('/'),
                            mest = wdg_matchresult.givemeMes(parseInt(fechacompleta[1]));
                        tituloMatch = fechacompleta[0] + '&bull;' + mest + '&bull;' + fechacompleta[2] + " " + data.matches.match[o].MatchHour.substring(0, 5);
                    } else {
                        if (String(data.matches.match[o].period) === "F") {
                            tituloMatch = 'Final del partido';
                        } else {
                            var tituloFi = data.matches.match[o].periodabrev;
                            tituloMatch = tituloFi.replace(/1T/, "Primer Tiempo").replace(/2T/, "Segundo Tiempo");
                        }
                    }

                    textoLinkNuevo = data.matches.match[o].txtLink;
                    //console.log(data.matches.match[o])
                    var selectornuevo = data.matches.match[o].MatchGuid;
                    selectorTMP = $("#" + selectornuevo);
                    //console.log(selectorTMP);
                    ActGolL = String(selectorTMP.find('.wdg_match_01_teamscore').eq(0).text());
                    ActGolV = String(selectorTMP.find('.wdg_match_01_teamscore').eq(1).text());
                    //NuevoGolL = data.matches.match[o].equipos.local.goals + data.matches.match[o].equipos.local.penales;
                    //NuevoGolV = data.matches.match[o].equipos.visit.goals + data.matches.match[o].equipos.visit.penales;
                    var penalesLocal = (data.matches.match[o].equipos.local.penales !== 0) ? '(' + data.matches.match[o].equipos.local.penales + ')' : '';
                    var penalesVisit = (data.matches.match[o].equipos.visit.penales !== 0) ? '(' + data.matches.match[o].equipos.visit.penales + ')' : '';
                    NuevoGolL = String(data.matches.match[o].equipos.local.goals) + penalesLocal;
                    NuevoGolV = String(data.matches.match[o].equipos.visit.goals) + penalesVisit;

                    tituloAct = selectorTMP.find(".textcolor-title5").text();
                    tituloNue = String(tituloMatch);
                    //textoLink = selectorTMP.find(".wdg_match_01_extra span").text();
                    textoLink = selectorTMP.find(".wdg_match_01_extra p a").eq(0).text();

                    //console.log("TITLE"+tituloAct+"<->"+tituloNue);
                    //console.log("LOCAL" + ActGolL + "<->" + NuevoGolL);
                    //console.log("VISIT" + ActGolV + "<->" + NuevoGolV);
                    if (data.matches.match[o].period !== "P" && data.matches.match[o].period !== "F") {
                        //console.log("actualizo goles de: ");
                        //console.log(data.matches.match[o]);
                        if (ActGolL !== NuevoGolL) {
                            //console.log("entro local");
                            selectorTMP.find('.wdg_match_01_teamscore').eq(0).css({
                                'display': 'none',
                                'position': 'relative'
                            }).text(NuevoGolL).fadeIn('slow');
                        }

                        if (ActGolV !== NuevoGolV) {
                            //console.log("entro visit");
                            selectorTMP.find('.wdg_match_01_teamscore').eq(1).css({
                                'display': 'none',
                                'position': 'relative'
                            }).text(NuevoGolV).fadeIn('slow');
                        }


                        //mundial UX
                        if (setting.tema === "mundial") {
                            selectorTMP.find('.txtsefvivo').css('display', 'none');
                            selectorTMP.find('.wdg_match_01_sprite.video').addClass('vivo');
                            //textoLinkNuevo = (data.matches.match[o].EventUrl !== "") ? "EN VIVO AHORA" : data.matches.match[o].txtLink;
                            //(data.matches.match[o].EventUrl !== "") ? selectorTMP.find(".wdg_match_01_extra p a").addClass("vivo") : '';
                        }

                    }

                    if (setting.tema === "mundial" && data.matches.match[o].period === "F") {
                        selectorTMP.find(".wdg_match_01_extra p a").removeClass("vivo");
                        (typeof(data.matches.match[o].txtVideo) !== "undefined") ? selectorTMP.find('.txtsefvivo').html(data.matches.match[o].txtVideo) : '';
                        selectorTMP.find('.txtsefvivo').css('display', 'block');
                    }

                    //Modulo de altasbajas result (mundial)
                    if (setting.tema === "mundial") {
                        var selectorMundial = $(".JfromTicker" + data.matches.match[o].MatchId);
                        (data.matches.match[o].period !== "P") ? selectorMundial.find(".versus_time").html(tituloMatch) : '';

                        //Goles
                        var penalesLocalJ = data.matches.match[o].equipos.local.penales;
                        var penalesvisitJ = data.matches.match[o].equipos.visit.penales;

                        var GoleslocalJ = data.matches.match[o].equipos.local.goals;
                        var GolesVisitJ = data.matches.match[o].equipos.visit.goals;

                        var finalGolesLocalJ = (penalesLocalJ !== 0) ? '<i class="penalT">(' + penalesLocalJ + ')</i><i class="golT">' + GoleslocalJ + '</i>' : GoleslocalJ;
                        var finalGolesVisitJ = (penalesvisitJ !== 0) ? '<i class="golT">' + GolesVisitJ + '</i><i class="penalT">(' + penalesvisitJ + ')</i>' : GolesVisitJ;

                        (GoleslocalJ !== 0) ? selectorMundial.find(".result.textcolor-title2").eq(0).html(finalGolesLocalJ) : '';
                        (GolesVisitJ !== 0) ? selectorMundial.find(".result.textcolor-title2").eq(1).html(finalGolesVisitJ) : '';
                        /* if (penalesLocalJ !== 0) {
                            selectorMundial.find(".result.textcolor-title2").eq(0).css({
                                'position': 'relative',
                                'left': '-5px'
                            });
                        }*/
                        if (penalesvisitJ !== 0) {
                            selectorMundial.find(".result.textcolor-title2").eq(1).css({
                                'position': 'relative',
                                'left': '-5px'
                            });
                        }
                        //add current class
                        (data.matches.match[o].period !== "P" && data.matches.match[o].period !== "F") ? selectorMundial.addClass('activo') : '';
                    };
                    //End Modulo de altasbajas result (mundial)


                    if (tituloNue !== tituloAct) {
                        selectorTMP.find(".textcolor-title5").html(tituloNue).fadeIn('slow');
                    }
                    //console.log("comparando tiempos: " + textoLink + " - " + textoLinkNuevo);
                    if (textoLink !== textoLinkNuevo) {
                        if (setting.tema == "mundial") {
                            selectorTMP.find(".wdg_match_01_extra p a").eq(0).html(textoLinkNuevo);
                        } else {
                            textoLinkNuevo = (textoLinkNuevo === "Minuto a minuto") ? 'MxM' : textoLinkNuevo;
                            selectorTMP.find(".wdg_match_01_extra p a span").eq(0).html(textoLinkNuevo);
                        }

                    }

                    if (data.matches.match[o].period !== "P" && setting.tema === "mundial") {
                        //vivo minuto a minuto
                        if (data.matches.match[o].period === "F" && data.matches.match[o].ResumenTransmision !== "" && typeof data.matches.match[o].ResumenTransmision !== "undefined") {
                            //console.log("FINAL con " + data.matches.match[o].equipos.visit.name + " - " + data.matches.match[o].equipos.local.name)
                            selectorTMP.find('.wdg_match_01_icon').html('<a target="_blank" href="' + data.matches.match[o].ResumenTransmision + '"><span class="wdg_match_01_sprite video"></span></a>');
                        } else if (data.matches.match[o].EventUrl !== "" && data.matches.match[o].period !== "F" && typeof(data.matches.match[o].EventUrl) !== "undefined") {
                            //console.log("VIVO con " + data.matches.match[o].equipos.visit.name + " - " + data.matches.match[o].equipos.local.name)
                            selectorTMP.find('.wdg_match_01_icon').html('<a target="_blank" href="' + data.matches.match[o].EventUrl + '"><span class="wdg_match_01_sprite video vivo"></span></a>');
                        }

                    }


                };
            },
            resize: function() {
                /*
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
                }*/
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

                        if (String(m).length === 1) {
                            m = '0' + m;
                        }
                        anio = parseInt(arr[2]) + 1900;
                        fechas = m + '-' + arr[0] + '-' + anio;
                        fechas = fechas + ' ' + horas + ':00';

                        wdg_matchresult.horaServidor.vari = fechas;


                    }
                });
            }, // End timeUpdate()


            Banner: function(tiempo) { //funcion que pone banner cada cierto tiempo. La funciÃ³n se manda a llamar en la linea 447. Solo aplica para USA
                googletag.cmd.push(function() {
                    //Map Sizing Banner Logo en Header
                    var mappingHeader = googletag.sizeMapping().
                    addSize([980, 70], [
                        [970, 90],
                        [955, 90],
                        [955, 75],
                        [955, 31],
                        [955, 70]
                    ]). //Desktop and landscape.
                    addSize([460, 70], [468, 60]). // /Ipad.
                    addSize([300, 70], [320, 50]). // Iphones.

                    build();

                    var adUnit = "es.esmas.dep/home";
                    var slotG = googletag.defineSlot("/5644/" + adUnit, [
                        [970, 90],
                        [955, 90],
                        [955, 75],
                        [955, 31],
                        [728, 90]
                    ], "banWid_955x90").defineSizeMapping(mappingHeader).addService(googletag.pubads()).setTargeting("position", "atf");
                    var slotHome1 = googletag.defineSlot("/5644/" + adUnit, [
                        [970, 90],
                        [955, 90],
                        [955, 75],
                        [955, 31],
                        [728, 90]
                    ], "banHome01_955x90").defineSizeMapping(mappingHeader).addService(googletag.pubads()).setTargeting("position", "middle-btf");
                    var slotHome2 = googletag.defineSlot("/5644/" + adUnit, [
                        [970, 90],
                        [955, 90],
                        [955, 75],
                        [955, 31],
                        [728, 90]
                    ], "banHome02_955x90").defineSizeMapping(mappingHeader).addService(googletag.pubads()).setTargeting("position", "middle-btf");
                    var PotesSponsor = googletag.defineOutOfPageSlot("/5644/" + adUnit, "oop-ad").addService(googletag.pubads()).setTargeting("intertype", "layer");
                    googletag.enableServices();
                    googletag.display("banWid_955x90");
                    googletag.display("banHome01_955x90");
                    googletag.display("banHome02_955x90");
                    setInterval(function() {
                        googletag.pubads().refresh([slotG]);
                    }, tiempo);
                });
            },

            DeterminaTiempoActualizacion: function(dia, hora) {

                var FechaPartido = dia.substring(3, 5) + '-' + dia.substring(0, 2) + '-' + dia.substring(8, 10) + ' ' + hora.substring(0, 5) + ':00';
                var a = new Date(FechaPartido);
                var b = new Date(wdg_matchresult.horaServidor.vari);
                //console.log(a);
                //console.log(b);

                var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
                var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

                if (parseFloat(msDateA) < parseFloat(msDateB)) {
                    console.log("MENOR");
                    if (setting.country_code === 'USA') {
                        //console.log('actualiza cada 5min');
                        wdg_matchresult.Banner(60000);
                    }
                } else {
                    if (parseFloat(msDateA) === parseFloat(msDateB)) {
                        //console.log("IGUAL");										
                        var resta = parseInt(b.getHours() - a.getHours());
                        //cop
                        if (b.getHours() >= a.getHours()) {
                            console.log("ya empezo el partido");
                            //Ya empezo el partido, actualizar valores cada 20 seg										
                            wdg_matchresult.timeUpdateA.push(20000);
                            if (setting.country_code === 'USA') {
                                wdg_matchresult.Banner(20000);
                            }
                        } else {
                            var h1 = a.getHours();
                            var h2 = b.getHours();
                            var m1 = a.getMinutes();
                            var m2 = b.getMinutes();
                            //Validar cuantos minutos faltan para el inicio del partido
                            var minutosrestantes = parseInt((((h1 - h2) * 60) + m1) - m2);

                            if (minutosrestantes <= 15) {
                                //console.log("faltan menos de 15 min");
                                //Faltan 15 minutos o menos para el inicio, actualizar los valores cada 20 seg
                                wdg_matchresult.timeUpdateA.push(20000);

                            } else {
                                //console.log("faltan mas de 15 pero menos de 1hr " + minutosrestantes);
                                //Faltan mas de 15 minutos para el inicio, actualizar los valores cada 5 minutos pero menos de una hora
                                //console.log("comparo-->"+minutosrestantes);
                                (minutosrestantes <= 60) ? (wdg_matchresult.timeUpdateA.push(350000)) : '';
                            }
                        }
                        //cop



                    } else {
                        if (parseFloat(msDateA) > parseFloat(msDateB)) {
                            console.log("MAYOR");
                            if (setting.country_code === 'USA') {
                                //console.log('actualiza cada 5min');
                                wdg_matchresult.Banner(300000);
                            }

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

                /*
                if (parseInt(wdg_matchresult.timeUpdateA.length) > 0) {
                    var tiempA = Math.min.apply(null, wdg_matchresult.timeUpdateA);
                    console.log("tiempo Actualizacion: " + tiempA);
                    wdg_matchresult.globalTimer = setInterval(function() {
                        wdg_matchresult.updateInfo();
                    }, tiempA);
                }*/

            },
            rezisewindow: function(tipo) {
                var FeedActual = "";
                $("#FListTournaments").parent().find('a').each(function(index, el) {
                    if ($(this).hasClass('onShowItem')) {
                        FeedActual = $(this).data("url");
                        //wdg_matchresult.LoadFirst($(this).data("url"), "update");
                    }
                });

                //625
                var widthWindow = $(window).width();
                var carrusel = $('.wdg_matchesresult_01_list#listNow');
                if (widthWindow <= 625 && setting.tema !== "mundial") {
                    //console.log("Es smartphone");
                    //if (carrusel.children(".microfiche-screen").length === 0 || tipo === "inicio") {
                    $(".wdg_matchesresult_todos").hide();
                    var nuevoWidth = 0;
                    var esperando = setInterval(function() {
                        if ($('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul li').length) {
                            clearInterval(esperando);
                            $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').css({
                                'height': '132px',
                                'width': '216px',
                                'overflow-y': 'hidden',
                                'overflow-x': 'scroll'
                            });

                            $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul li').each(function(index, el) {
                                nuevoWidth = $(this).outerWidth() + nuevoWidth + 15;
                            });
                            $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul').css({
                                'width': nuevoWidth + 'px',
                                //'width': '207px',
                                'height': '132px',
                                'position': 'relative'
                            });
                            /* $('.wdg_matchesresult_01_list#listNow').microfiche({
                                bullets: false,
                                keyboard: true,
                                buttons: true,
                                clickToAdvance: true
                            });*/
                        }
                    }, 500);


                    //}
                } else if (widthWindow <= 948 && setting.tema !== "mundial") {
                    //console.log("es tablet");
                    //if (carrusel.children(".microfiche-screen").length > 0 || tipo === "inicio") {
                    $(".wdg_matchesresult_todos").hide();
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components, .wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul').css({
                        'height': '300px',
                        'overflow-y': 'scroll',
                        'width': '100%',
                        'overflow-x': 'hidden'
                    });
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').css('width', '400px');

                    $('.wdg_matchesresult_01_arrows').css('display', 'none');
                    $('.wdg_matchesresult_contenedor').css('overflow', 'scroll');
                    //(tipo !== "inicio") ? wdg_matchresult.LoadFirst(FeedActual, 'rezise') : '';
                    //}
                } else {
                    //console.log("es desktop");
                    //if (carrusel.children(".microfiche-screen").length > 0 || tipo === "inicio") {
                    $(".wdg_matchesresult_todos").show();
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components, .wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul').css({
                        'height': '100%',
                        'width': '100%'
                    });
                    $('.wdg_matchesresult_contenedor').css('overflow', 'visible');
                    //(tipo !== "inicio") ? wdg_matchresult.LoadFirst(FeedActual, 'rezise') : '';
                    //}
                }


            },

            funcionesNaat: function() {
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
                                if (position === large_tot) {
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
                    /*
        $(document).ready(function() {
            $('.wdg_matchesresult_01_arrows').css('display', 'none');
            if ($(window).width() >= 933) {
                $_brinca = 888;
            }
            if ($(window).width() >= 609) {
                $_brinca = 370;
            }
            if ($(window).width() < 609) {
                $_brinca = 222;
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
        }); */

                    /*Monitorea scroll*/
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').scroll(function() {

                        var $scroll = $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components');
                        var $width = $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width() - 5;
                        var $widthT = $scroll.scrollLeft() + $scroll.width();
                        // var $height = $parent.height();
                        $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-left').css('color', '#D6A256');
                        if ($scroll.scrollLeft() === 0) {
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
                                if (position === 0) {
                                    $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#6C0808');
                                } else {
                                    $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#D6A256');
                                }
                                if (position !== 0) {
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
                                if (position === 0) {
                                    $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#6C0808');
                                } else {
                                    $(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#D6A256');
                                }
                                if (position !== 0) {
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

                    $hide.unbind("click").click(function(e) {
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
                        if (visShow === 'hidden') {
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




                    $show.unbind("click").click(function(e) {
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
                            $("#FListTournaments").hide();
                        }




                        if (numeroItems <= 4) {
                            heightModulo = 221;
                            if (listaItems > 11) {
                                heightModulo = 675;
                            } else if (listaItems <= 11 && listaItems >= 8) {
                                heightModulo = 515;
                            } else if (listaItems < 8 && listaItems >= 1) {
                                heightModulo = 366;
                            }
                        } else if (numeroItems > 4 && numeroItems <= 8) {
                            heightModulo = 366;
                            if (listaItems > 11) {
                                heightModulo = 675;
                            } else if (listaItems <= 11 && listaItems >= 8) {
                                heightModulo = 515;
                            }
                        } else if (numeroItems > 8 && numeroItems <= 12) {
                            heightModulo = 515;
                            if (listaItems > 11) {
                                heightModulo = 675;
                            }
                        } else if (numeroItems > 12) {
                            heightModulo = 675;
                        }
                        //  }// tema mundial

                        if (setting.tema == "mundial") {
                            if (T.getDeviceSize() === 'large') {
                                $('.wdg_matchesresult_01 .wdg_matchesresult_01_left .wdg_matchesresult_visible').css({
                                    'margin-top': '10%',
                                    'position': 'absolute',
                                    'bottom': '10px'
                                });

                                $('.wdg_matchesresult_01 .wdg_matchesresult_01_container , .wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components ul').css('height', heightModulo + 'px');
                                $("#listNow").parent(".wdg_matchesresult_01_components").css('height', heightModulo - 75 + 'px');
                                $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right').css('height', heightModulo - 30 + 'px');
                                $closeElement.animate({
                                    'height': heightModulo
                                }, animationDelay);
                            }
                        } else {
                            if (T.getDeviceSize() === 'large') {

                                Globalthis.animateAuto("height", 1000);

                            }
                        }

                        if (T.getDeviceSize() === 'medium') {
                            $closeElement.animate({
                                'height': 460
                            }, animationDelay);
                        }
                        $(this).closest('.wdg_matchesresult_01_left').find('.wdg_matchesresult_01_bottom').show();
                        if (visHide === 'hidden') {
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



                }(Televisa, jQuery));
            }



        };

        $.when(wdg_matchresult.DrawCuerpo()).done(function() {
            if (wdg_matchresult.TickerMaster !== 0) {
                try {
                    wdg_matchresult.LoadMaster(wdg_matchresult.TickerMaster);
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

        /*$(window).resize(function(event) {
            wdg_matchresult.resize();
        });*/



    };
})(jQuery);