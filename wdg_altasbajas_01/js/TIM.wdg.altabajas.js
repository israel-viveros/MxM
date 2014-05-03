/*!
 *   TIM Developer: Israel Viveros
 *   Version: 1
 *   Copyright: Televisa Interactive Media (2014)
 */
;
(function() {
    $.fn.wdgAltasbajas = function(parametros) {
        var setting = $.extend({
            'idTournament': 0
        }, parametros);


        var globalThis = this;


        var objAltasbajas = {
            feedEquipos: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTournament + '/teamsclassification.js',
            feedDraft: 'http://lab.israelviveros.com/draft/' + setting.idTournament + '/draft.js',

            iniciaMaquetado: function() {
                var maquetado = '<div class="wdg_altasbajas_01 background-color1">';
                maquetado += '<div class="contenedor">';
                maquetado += '<div class="degraded_left"></div>';
                maquetado += '<div class="sup_izq textcolor-title3">';
                maquetado += '<a id="targetDraft" href="#" class="underline_text"><div class="background-color2">DRAFT<div class="hline"></div></div></a>';
                maquetado += '<a href="#" class="underline_text"><div class="background-color2 hide-mobile">MXM<div class="hline"></div></div></a>';
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

                                altas += '<td id="al' + data.dataEstadistica[i].idTeam + '">-</td>';
                                bajas += '<td id="ba' + data.dataEstadistica[i].idTeam + '">-</td>';
                            }
                        };
                        $("#firstlogo").html(maquetado);
                        $("#altTIM").html(altas);
                        $("#bajTIM").html(bajas);

                        try {
                            objAltasbajas.infodraft();
                        } catch (e) {
                            console.log(e);
                        }


                    })
                    .fail(function() {
                        console.log("error al cargar el feed: " + objAltasbajas.feedEquipos);
                    })



            },

            infodraft: function() {
                var maquetado = "";

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
                            if (i < 18) {
                                altas = data.draftTeams[i].teamAdd;
                                bajas = data.draftTeams[i].teamDelete;

                                $("#al" + data.draftTeams[i].id).text(altas);
                                $("#ba" + data.draftTeams[i].id).text(bajas);
                            }
                        };

                        (typeof(data.draftTotalAdd) === "string") ? $("#totAl").text(data.draftTotalAdd) : '';
                        (typeof(data.draftTotalDelete) === "string") ? $("#totBaj").text(data.draftTotalDelete) : '';
                        (typeof(data.draftTournament.name) === "string") ? $("#nameTournDraft").text(data.draftTournament.name) : '';
                        (typeof(data.draftURL) === "string") ? $("#targetDraft").attr("href", data.draftURL) : '';

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


            startCountdown: function(target) {
                //new Date(year, month, day, hours, minutes, seconds, milliseconds)
                function hell() {
                    console.log("hey")
                }
                var austDay = new Date(target)
                $('#countdownDraft').countdown({
                    until: austDay,
                    format: 'odHM',
                    onTick: hell,
                    layout: '<td rowspan="2" class="textcolor-title2 cut"><div class="vline"></div>El torneo comienza en:</td>' +
                        '<td class="textcolor-title3" id="months">{on}</td>' +
                        '<td class="textcolor-title3">·</td>' +
                        '<td class="textcolor-title3" id="days">{dn}</td>' +
                        '<td class="espacio">&nbsp;</td>' +
                        '<td class="textcolor-title3" id="hours">{hn}</td>' +
                        '<td class="textcolor-title3">:</td>' +
                        '<td class="textcolor-title3" id="minutes">{mn}</td>' +
                        '<td class="textcolor-title3">:</td>' +
                        '{s<}<td class="textcolor-title3" id="seconds">{sn}</td>{s>}'
                });


            },


        };
        //end objAltasbajas

        if (setting.idTournament !== 0) {
            objAltasbajas.iniciaMaquetado();
        } else {
            console.log("Falta el ID del torneo");
        }




    };
})(jQuery);