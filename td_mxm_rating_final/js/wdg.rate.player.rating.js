/*!
 *   TIM Developer: Israel Viveros
 *   Version: 1.0.0
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


            inicio: function() {
                console.log("metod inicio");
                (settings.idTorneo, settings.idPartido) ? globalRating.maquetado() : console.log("Error falta el Id match o el Id Tournament");

            },

            maquetado: function() {
                console.log("metod maquetado");

                var maquetado = '<div class="wdg_rate_player_01" data-enhance="false">';
                maquetado += '<div class="qualifies textcolor-title4">Elige a tu jugador y vota</div>';
                maquetado += '<table>';
                maquetado += '<tr>';
                maquetado += '<td class="header_team">';
                maquetado += '<table class="head_table">';
                maquetado += '<tr >';
                maquetado += '<th><img alt="" src="http://placehold.it/32x32"></th>';
                maquetado += '<th colspan="3" class="equipo"><p class="title_team textcolor-title1">Monterrey</p></th>';
                maquetado += '<th><p class="title_td textcolor-title4 dotted-right">TD</p></th>';
                maquetado += '<th><p class="title_afision textcolor-title1">Afición</p></th>';
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
                maquetado += '<thead>';

                maquetado += '</thead>';
                maquetado += '<tbody id="LocalTIMTitular">';



                maquetado += '</tbody>';
                maquetado += '</table>';
                maquetado += '</td>';
                maquetado += '<td class="header_team_ext">';
                maquetado += '<table class="head_table2">';
                maquetado += '<tr>';
                maquetado += '<th><img alt="" src="http://placehold.it/32x32"></th>';
                maquetado += '<th colspan="2"><p class="title_team textcolor-title1">Monterrey</p></th>';
                maquetado += '<th><p class="title_td textcolor-title4 dotted-right">TD</p></th>';
                maquetado += '<th><p class="title_afision textcolor-title1">Afición</p></th>';
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
                maquetado += '<thead>';

                maquetado += '</thead>';
                maquetado += '<tbody id="VisitTIMTitular">';


                maquetado += '</tbody>';
                maquetado += '</table>';
                maquetado += '</td>';
                maquetado += '</tr>';
                maquetado += '<tr class="textcolor-title1">';
                maquetado += '<td colspan="3" class="reserves">Banca</td>';
                maquetado += '</tr>        ';
                maquetado += '<tr>';
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


                globalthis.html(maquetado);

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
            loadPlayers: function(idMatch) {
                console.log("metod loadPlayers");
                $.ajax({
                    url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + settings.idTorneo + '/' + idMatch + '/match_lineup.js',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: globalRating.callbackLineup
                }).done(function(data) {
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
                            maquetado += '<div class="div"><p class="textcolor-title4">-.-</p></div> ';
                            maquetado += '<div class="afision"><p class="textcolor-title1 dotted-left porcentajeplayer"></p></div> ';
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
                            maquetado += '<div class="div"><p class="textcolor-title4">-.-</p></div> ';
                            maquetado += '<div class="afision"><p class="textcolor-title1 dotted-left porcentajeplayer"></p></div> ';
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
                            maquetado += '<div class="div"><p class="textcolor-title4">-.-</p></div> ';
                            maquetado += '<div class="afision"><p class="textcolor-title1 dotted-left porcentajeplayer"></p></div> ';
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
                            maquetado += '<div class="div"><p class="textcolor-title4">-.-</p></div> ';
                            maquetado += '<div class="afision"><p class="textcolor-title1 dotted-left porcentajeplayer"></p></div> ';
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
                            console.log("quito a visit")
                            $("#nameJornadaVisit").html(data.week).css('cursor', 'auto');;
                        }
                        if ($("#localTIMDrop li").length === 0) {
                            console.log("quito a local")
                            $("#nameJornadaLocal").html(data.week).css('cursor', 'auto');;
                        }
                    }, 500);



                }).fail(function() {
                    console.log("error");
                })


            },

            loadfeedrating: function(idMatch) {
                console.log("metod loadfeedrating");
                $.ajax({
                    url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + settings.idTorneo + '/' + idMatch + '/gameplayerdetailjsonp.js',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'gameplayerdetail',
                    cache: false
                })
                    .done(function(data) {
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
                            console.log("este ID" + $(this).data("id"))
                            globalRating.loadPlayers($(this).data("id"));
                        });

                        globalthis.find(".voto5, .voto6, .voto7, .voto8, .voto9, .voto10").unbind('click').bind('click', function(event) {
                            event.preventDefault();
                            console.log("haz votado");

                        });
                    })
                    .fail(function() {
                        console.log("error");
                    });




            },

            loadDrops: function() {
                console.log("metod loadDrops");

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

            funcionesNaat: function() {
                console.log("metod funcionesNaat");
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

            }




        };

        globalRating.inicio();

    };
})(jQuery)