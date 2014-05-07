/*!
 *   TIM Developer: Israel Viveros
 *   Version: 1
 *   Copyright: Televisa Interactive Media (2014)
 */
;
(function() {
    $.fn.wdgAltasbajas = function(parametros) {
        var setting = $.extend({
            'idTournament': 0,
            'abbody': false,
            'title': ''
        }, parametros);


        var globalThis = this;


        var objAltasbajas = {
            feedEquipos: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTournament + '/teamsclassification.js',
            feedDraft: 'http://lab.israelviveros.com/draft/' + setting.idTournament + '/draft.js',
            secondIDdraw: $("#altasbajasbodyTIM"),

            iniciaMaquetado: function() {
                var maquetado = '<div class="wdg_altasbajas_01 background-color1">';
                maquetado += '<div class="contenedor">';
                maquetado += '<div class="degraded_left"></div>';
                maquetado += '<div class="sup_izq textcolor-title3">';
                maquetado += '<a id="targetDraft" href="#" class="underline_text"><div class="background-color2">DRAFT<div class="hline"></div></div></a>';
                maquetado += '<a id="targetMxMDraft" href="#" class="underline_text"><div class="background-color2 hide-mobile">MXM<div class="hline"></div></div></a>';
                maquetado += '<div class="subtitulo">Altas y Bajas por equipo</div>';
                maquetado += '<div class="textcolor-title2" id="nameTournDraft"></div>';
                maquetado += '</div>';

                maquetado += '<div class="sup_der">';
                maquetado += '<div id="target_date"></div>';
                maquetado += '<table  class="timing">';
                maquetado += '<tr class="one" id="countdownDraft"></tr>';
                maquetado += '<tr class="two">';
                maquetado += '<td class="textcolor-title2">MES</td>';
                maquetado += '<td class="textcolor-title2">&nbsp;</td>';
                maquetado += '<td class="textcolor-title2">DIA</td>';
                maquetado += '<td class="textcolor-title2">&nbsp;</td>';
                maquetado += '<td class="textcolor-title2">HRS</td>';
                maquetado += '<td class="textcolor-title2">&nbsp;</td>';
                maquetado += '<td class="textcolor-title2">MIN</td>';
                maquetado += '<td class="textcolor-title2">&nbsp;</td>';
                maquetado += '<td class="textcolor-title2">SEG</td>';
                maquetado += '</tr>';
                maquetado += '</table>';
                maquetado += '</div>';

                maquetado += '<div class="tabla_ab">';

                maquetado += '<div class="titles">';
                maquetado += '<div class="textcolor-title3">ALTAS</div>';
                maquetado += '<div class="textcolor-title3">BAJAS</div>';
                maquetado += '</div>';

                maquetado += '<div class="tabla">';

                maquetado += '<table  class="teams">';
                maquetado += '<tr id="firstlogo">';


                maquetado += '</tr>';
                maquetado += '<tr class="ab" id="altTIM"></tr>';
                maquetado += '<tr class="ab" id="bajTIM"></tr>';
                maquetado += '</table>';
                maquetado += '</div>';

                maquetado += '<div class="totales">';
                maquetado += '<div class="textcolor-title2">Totales</div>';
                maquetado += '<div class="numeros">';
                maquetado += '<div class="textcolor-title3" id="totAl">-</div>';
                maquetado += '<div class="textcolor-title3" id="totBaj">-</div>';
                maquetado += '</div>';
                maquetado += '</div>';

                maquetado += '</div>';

                maquetado += '<div class="degraded_right"></div>';
                maquetado += '</div>';

                maquetado += '</div>';


                globalThis.html(maquetado);

                try {
                    objAltasbajas.infoequipos();
                } catch (e) {
                    console.log(e);
                }

            },

            infoequipos: function() {
                var maquetado = "",
                    altas = "",
                    bajas = "";
                $.ajax({
                    url: objAltasbajas.feedEquipos,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'teamsClassification',
                    cache: false
                })
                    .done(function(data) {
                        for (var i = 0; i < data.dataEstadistica.length; i++) {
                            if (i < 18) {
                                maquetado += '<td class="textcolor-title3" id="lg' + data.dataEstadistica[i].idTeam + '">';
                                maquetado += '<a href="#" class="underline_text">';
                                maquetado += '<img src="' + data.dataEstadistica[i].urlLogoClub + '" width="24" height="24" alt="#">' + data.dataEstadistica[i].aliasTeam;
                                maquetado += '</a>';
                                maquetado += '</td>';

                                altas += '<td class="al' + data.dataEstadistica[i].idTeam + '">-</td>';
                                bajas += '<td class="ba' + data.dataEstadistica[i].idTeam + '">-</td>';
                            }
                        };
                        $("#firstlogo").html(maquetado);
                        $("#altTIM").html(altas);
                        $("#bajTIM").html(bajas);

                        try {
                            if (setting.abbody === true) {
                                objAltasbajas.secondDraw(data);
                            } else {
                                objAltasbajas.infodraft();
                            }

                        } catch (e) {
                            console.log(e);
                        }


                    })
                    .fail(function() {
                        console.log("error al cargar el feed: " + objAltasbajas.feedEquipos);
                    })



            },

            infodraft: function() {
                var maquetado = "",
                    total = 0;

                $.ajax({
                    url: objAltasbajas.feedDraft,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'llave',
                    cache: false
                })
                    .done(function(data) {
                        var endDate = data.draftEndDate.split("/"),
                            finalYea = endDate[2] + "/" + endDate[1] + "/" + endDate[0],
                            target = finalYea + " " + data.draftEnd;

                        for (var i = 0; i < data.draftTeams.length; i++) {
                            altas = data.draftTeams[i].teamAdd;
                            bajas = data.draftTeams[i].teamDelete;

                            $(".al" + data.draftTeams[i].id).text(altas);
                            $(".ba" + data.draftTeams[i].id).text(bajas);

                            total = parseInt(altas) + parseInt(bajas);
                            $(".tot" + data.draftTeams[i].id).text(total);
                        };

                        (typeof(data.draftTotalAdd) === "string") ? $("#totAl").text(data.draftTotalAdd) : '';
                        (typeof(data.draftTotalDelete) === "string") ? $("#totBaj").text(data.draftTotalDelete) : '';
                        (typeof(data.draftTournament.name) === "string") ? $("#nameTournDraft").text(data.draftTournament.name) : '';
                        (typeof(data.draftURL) === "string") ? $("#targetDraft").attr("href", data.draftURL) : '';
                        (typeof(data.draftURL) === "string") ? $("#targetMxMDraft").attr("href", data.draftURL + "mxm.html") : '';

                        try {
                            objAltasbajas.startCountdown(target);
                        } catch (e) {
                            console.log(e)
                        }


                    })
                    .fail(function() {
                        console.log("error al cargar el feed: " + objAltasbajas.feedDraft);
                    })




            },
            spanish: function() {
                $.countdown.regionalOptions['es'] = {
                    labels: ['A\u00F1os', 'Meses', 'Semanas', 'D\u00EDas', 'Hrs.', 'Min.', 'Seg.'],
                    labels1: ['A\u00F1o', 'Mes', 'Semana', 'D\u00EDas', 'Hrs.', 'Min.', 'Seg.'],
                    compactLabels: ['a', 'm', 's', 'g'],
                    whichLabels: null,
                    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    timeSeparator: ':',
                    isRTL: false
                };
                $.countdown.setDefaults($.countdown.regionalOptions['es']);
            },


            startCountdown: function(target) {
                objAltasbajas.spanish();
                //new Date(year, month, day, hours, minutes, seconds, milliseconds)

                var austDay = new Date(target)
                $('#countdownDraft').countdown({
                    until: austDay,
                    format: 'ODHMS',
                    layout: '<td rowspan="2" class="textcolor-title2 cut"><div class="vline"></div>El torneo comienza en:</td>' +
                        '<td class="textcolor-title3" id="months">{on}</td>' +
                        '<td class="textcolor-title3">·</td>' +
                        '<td class="textcolor-title3" id="days">{dn}</td>' +
                        '<td class="espacio">&nbsp;</td>' +
                        '<td class="textcolor-title3" id="hours">{hn}</td>' +
                        '<td class="textcolor-title3">:</td>' +
                        '<td class="textcolor-title3" id="minutes">{mn}</td>' +
                        '<td class="textcolor-title3">:</td>' +
                        '<td class="textcolor-title3" id="seconds">{sn}</td>'
                });





            },

            secondDraw: function(data) {
                console.log(data)
                var maquetado = "";
                maquetado += '<div class="wdg_stats_teams_02" data-enhance="false">    ';
                maquetado += '<h2 class="textcolor-title2">' + setting.title + '</h2>';
                maquetado += '<div class="more_teams_stadistics">';
                maquetado += '<div class="teams_stadistics_table">';

                for (var i = 0; i < data.dataEstadistica.length; i++) {

                    maquetado += '<div class="teams_stadistics">';
                    maquetado += '<a class="link_table" target="_self" href="' + data.dataEstadistica[i].webNameTeam + '.html">';
                    maquetado += '<div class="name_team"><h3>' + data.dataEstadistica[i].nameTeam + '</h3></div>';
                    maquetado += '<div class="img_team"><img src="' + data.dataEstadistica[i].urlLogoClub + '" alt="' + data.dataEstadistica[i].nameTeam + '"></div>';
                    maquetado += '<div class="textcolor-title4 tot' + data.dataEstadistica[i].idTeam + '">-</div>';
                    maquetado += '<div class="titles_left">';
                    maquetado += '<p class="textcolor-title1">ALTAS</p>';
                    maquetado += '<p class="textcolor-title2 al' + data.dataEstadistica[i].idTeam + '">-</p>';
                    maquetado += '</div>';
                    maquetado += '<div class="separator_title"></div>';
                    maquetado += '<div class="titles_right">';
                    maquetado += '<p class="textcolor-title1">BAJAS</p>';
                    maquetado += '<p class="textcolor-title2 ba' + data.dataEstadistica[i].idTeam + '">-</p>';
                    maquetado += '</div>';
                    maquetado += '<div class="marrow"><i class="tvsa-caret-right"></i></div>';
                    maquetado += '</a>';
                    maquetado += '</div>';
                    if (i !== 3 && i !== 7 && i !== 11 && i !== 15 && i !== 19) {
                        maquetado += '<div class="separator_team"></div>';
                    }

                };

                maquetado += '</div>';
                maquetado += '</div>';
                maquetado += '<div class="degraded"></div ></div>';



                $("#altasbajasbodyTIM").html(maquetado);

                objAltasbajas.infodraft();

            }


        };
        //end objAltasbajas

        if (setting.idTournament !== 0) {
            objAltasbajas.iniciaMaquetado();
        } else {
            console.log("Falta el ID del torneo");
        }




    };
})(jQuery);