;
(function() {
    $.fn.wdg_avgfield = function(parametros) {
        var setting = $.extend({
            'idTorneo': 0,
            'idMatch': 0,
            'title': ''
        }, parametros);
        var globalThis = this;

        var wdgavgfieldObj = {
            urlFinal: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/' + setting.idMatch + '/match_summary.js',

            loadMaster: function() {
                $.ajax({
                    url: wdgavgfieldObj.urlFinal,
                    type: 'jsonp',
                    dataType: 'jsonp',
                    jsonpCallback: 'summaryActions',
                    cache: false
                })
                    .done(function(data) {
                        wdgavgfieldObj.pintar(data);
                    })
                    .fail(function() {
                        console.log("error al cargar el feed de summary actions");
                    })
            },
            pintar: function(data) {
                console.log(data);

                maquetado = '<div class="wdg_avgfield_02" style="display:none;">';
                maquetado += '<div class="str_pleca_01 collapsable">';
                maquetado += '<div class="str_pleca_01_title">';
                maquetado += '<h3 class="background-color-pleca1">';
                maquetado += '<a title="Link Description" class="textcolor-title3 ui-link">' + setting.title + '</a></h3></div></div>';


                maquetado += '<div class="wdg_avgfield_02_content">';
                maquetado += '<div class="wdg_avgfield_02_row">';
                maquetado += '<div class="wdg_avgfield_02_title">';
                maquetado += '<a class="wdg_avgfield_02_red textcolor-title1 ui-link"></a></div>';
                maquetado += '<div class="wdg_avgfield_02_teams">';
                maquetado += '<div class="wdg_avgfield_02_teama">';
                maquetado += '<div class="element">';
                maquetado += (typeof(data.acciones.local.logoch) !== "undefined") ? '<img src="' + data.acciones.local.logoch + '" alt="' + data.acciones.local.equipo + '">' : '';
                maquetado += '</div>              ';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += '<div class="wdg_avgfield_02_teamb">';
                maquetado += (typeof(data.acciones.visitant.logoch) !== "undefined") ? '<img src="' + data.acciones.visitant.logoch + '" alt="' + data.acciones.visitant.equipo + '">' : '';
                maquetado += '</div>';
                maquetado += '</div>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_row">';
                maquetado += '<div class="wdg_avgfield_02_title">';
                maquetado += '<a class="ui-link">Tarjetas Amarillas</a>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_02_teama">';
                maquetado += (typeof(data.acciones.local.tarjeta_amarilla) !== "undefined") ? '<div class="element textcolor-title2">' + data.acciones.local.tarjeta_amarilla + '</div>' : '';

                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += (typeof(data.acciones.visitant.tarjeta_amarilla) !== "undefined") ? '<div class="wdg_avgfield_02_teamb textcolor-title2">' + data.acciones.visitant.tarjeta_amarilla + '</div>' : '';
                maquetado += '</div>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_row">';
                maquetado += '<div class="wdg_avgfield_02_title">';
                maquetado += '<a class="ui-link">Tarjetas Rojas</a>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_02_teama">';
                maquetado += (typeof(data.acciones.local.tarjeta_roja) !== "undefined") ? '<div class="element textcolor-title2">' + data.acciones.local.tarjeta_roja + '</div>' : '';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += (typeof(data.acciones.visitant.tarjeta_roja) !== "undefined") ? '<div class="wdg_avgfield_02_teamb textcolor-title2">' + data.acciones.visitant.tarjeta_roja + '</div>' : '';
                maquetado += '</div>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_row">';
                maquetado += '<div class="wdg_avgfield_02_title">';
                maquetado += '<a class="ui-link">Tiros de Esquina</a>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_02_teama">';
                maquetado += (typeof(data.acciones.local.tiros_esquina) !== "undefined") ? '<div class="element textcolor-title2">' + data.acciones.local.tiros_esquina + '</div>' : '';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += (typeof(data.acciones.visitant.tiros_esquina) !== "undefined") ? '<div class="wdg_avgfield_02_teamb textcolor-title2">' + data.acciones.visitant.tiros_esquina + '</div> ' : '';
                maquetado += '</div>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_row">';
                maquetado += '<div class="wdg_avgfield_02_title">';
                maquetado += '<a class="ui-link">Tiros de Gol</a>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_02_teama">';
                maquetado += (typeof(data.acciones.local.tiros_gol) !== "undefined") ? '<div class="element textcolor-title2">' + data.acciones.local.tiros_gol + '</div>' : '';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += (typeof(data.acciones.visitant.tiros_gol) !== "undefined") ? '<div class="wdg_avgfield_02_teamb textcolor-title2">' + data.acciones.visitant.tiros_gol + '</div> ' : '';
                maquetado += '</div>';
                maquetado += '</div>';

                maquetado += '</div>';
                maquetado += '</div>';

                $(globalThis).html(maquetado).children('.wdg_avgfield_02').fadeIn('slow', function() {
                    $(this).css("display", "block");
                });


            },



        };

        if (setting.idMatch !== 0 && setting.idTorneo !== 0) {
            wdgavgfieldObj.loadMaster();
        } else {
            console.log("falta el idMatch o idTorneo");
        }


    }
})(jQuery);