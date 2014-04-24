/*!
 *   TIM Developer: Israel Viveros
 *   Version: 1.1.8
 *   Copyright: Televisa Interactive Media (2014)
 */
;
(function() {
    $.fn.wdg_avgfield = function(parametros) {
        var setting = $.extend({
            'idTorneo': 0,
            'idMatch': 0,
            'title': ''
        }, parametros);
        var globalThis = this;
        var timerGlobal = null;

        var wdgavgfieldObj = {
            urlFinal: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/' + setting.idMatch + '/match_summary.js',
            tmpescuchaListener: 0,
            //urlmxmheader: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/' + setting.idMatch + '/match_header.js',

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
            update: function() {
                $.ajax({
                    url: wdgavgfieldObj.urlFinal,
                    type: 'jsonp',
                    dataType: 'jsonp',
                    jsonpCallback: 'summaryActions',
                    cache: false
                })
                    .done(function(data) {
                        wdgavgfieldObj.updateData(data);
                    })
                    .fail(function() {
                        console.log("error al cargar el feed de summary actions");
                    })
            },
            updateData: function(data) {
                var LocalAmarilla = $("#LocalamarillasTIM").text(),
                    LocalRoja = $("#rojasLocalTIM").text(),
                    LocalEsquina = $("#esquinaLocalTIM").text(),
                    LocalGol = $("#tiroslocalTIM").text(),
                    VisitAmarilla = $("#VisitAmarillasTIM").text(),
                    VisitRoja = $("#rojasVisitTIM").text(),
                    VisitEsquina = $("#esquinavisitTIM").text(),
                    VisitGol = $("#tirosvisitLocal").text(),

                    feedlocalamarilla = data.acciones.local.tarjeta_amarilla,
                    feedlocalroja = data.acciones.local.tarjeta_roja,
                    feedlocalesquina = data.acciones.local.tiros_esquina,
                    feedlocalgol = data.acciones.local.tiros_gol,

                    feedvisitamarilla = data.acciones.visitant.tarjeta_amarilla
                    feedvisitroja = data.acciones.visitant.tarjeta_roja,
                    feedvisitesquina = data.acciones.visitant.tiros_esquina,
                    feedvisitgol = data.acciones.visitant.tiros_gol;


                (LocalAmarilla !== feedlocalamarilla) ? $("#LocalamarillasTIM").text(feedlocalamarilla) : '';
                (LocalRoja !== feedlocalroja) ? $("#rojasLocalTIM").text(feedlocalroja) : '';
                (LocalEsquina !== feedlocalesquina) ? $("#esquinaLocalTIM").text(feedlocalesquina) : '';
                (feedlocalgol !== feedlocalgol) ? $("#tiroslocalTIM").text(feedlocalgol) : '';

                (VisitAmarilla !== feedvisitamarilla) ? $("#LocalamarillasTIM").text(feedvisitamarilla) : '';
                (VisitRoja !== feedvisitroja) ? $("#LocalamarillasTIM").text(feedvisitroja) : '';
                (VisitEsquina !== feedvisitesquina) ? $("#LocalamarillasTIM").text(feedvisitesquina) : '';
                (VisitGol !== feedvisitgol) ? $("#LocalamarillasTIM").text(feedvisitgol) : '';




            },
            pintar: function(data) {

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
                maquetado += (typeof(data.acciones.local.tarjeta_amarilla) !== "undefined") ? '<div class="element textcolor-title2" id="LocalamarillasTIM">' + data.acciones.local.tarjeta_amarilla + '</div>' : '';

                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += (typeof(data.acciones.visitant.tarjeta_amarilla) !== "undefined") ? '<div class="wdg_avgfield_02_teamb textcolor-title2" id="VisitAmarillasTIM">' + data.acciones.visitant.tarjeta_amarilla + '</div>' : '';
                maquetado += '</div>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_row">';
                maquetado += '<div class="wdg_avgfield_02_title">';
                maquetado += '<a class="ui-link">Tarjetas Rojas</a>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_02_teama">';
                maquetado += (typeof(data.acciones.local.tarjeta_roja) !== "undefined") ? '<div class="element textcolor-title2" id="rojasLocalTIM">' + data.acciones.local.tarjeta_roja + '</div>' : '';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += (typeof(data.acciones.visitant.tarjeta_roja) !== "undefined") ? '<div class="wdg_avgfield_02_teamb textcolor-title2" id="rojasVisitTIM">' + data.acciones.visitant.tarjeta_roja + '</div>' : '';
                maquetado += '</div>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_row">';
                maquetado += '<div class="wdg_avgfield_02_title">';
                maquetado += '<a class="ui-link">Tiros de Esquina</a>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_02_teama">';
                maquetado += (typeof(data.acciones.local.tiros_esquina) !== "undefined") ? '<div class="element textcolor-title2" id="esquinaLocalTIM">' + data.acciones.local.tiros_esquina + '</div>' : '';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += (typeof(data.acciones.visitant.tiros_esquina) !== "undefined") ? '<div class="wdg_avgfield_02_teamb textcolor-title2" id="esquinavisitTIM">' + data.acciones.visitant.tiros_esquina + '</div> ' : '';
                maquetado += '</div>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_row">';
                maquetado += '<div class="wdg_avgfield_02_title">';
                maquetado += '<a class="ui-link">Tiros de Gol</a>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_avgfield_02_teams box-gray">';
                maquetado += '<div class="wdg_avgfield_02_teama">';
                maquetado += (typeof(data.acciones.local.tiros_gol) !== "undefined") ? '<div class="element textcolor-title2" id="tiroslocalTIM">' + data.acciones.local.tiros_gol + '</div>' : '';
                maquetado += '</div>';
                maquetado += '<div class="dotted-right"></div>';
                maquetado += (typeof(data.acciones.visitant.tiros_gol) !== "undefined") ? '<div class="wdg_avgfield_02_teamb textcolor-title2" id="tirosvisitLocal">' + data.acciones.visitant.tiros_gol + '</div> ' : '';
                maquetado += '</div>';
                maquetado += '</div>';

                maquetado += '</div>';
                maquetado += '</div>';

                $(globalThis).html(maquetado).children('.wdg_avgfield_02').fadeIn('slow', function() {
                    $(this).css("display", "block");
                });


                wdgavgfieldObj.listener = setInterval(function() {
                    console.log("buscando etiqueta actualizable..")
                    var objTime = $("#timeUpdateMxM");
                    if (objTime.length) {
                        console.log("Antes: " + wdgavgfieldObj.tmpescuchaListener);
                        console.log("Ahora: " + objTime.text());
                        var timeAct = parseInt(objTime.text());
                        //clearInterval(wdg_smex_strategy.listener);
                        if (timeAct > 0 && parseInt(objTime.text()) !== parseInt(wdgavgfieldObj.tmpescuchaListener)) {
                            console.log("ACTUALIZANDO CON ... " + objTime.text());
                            wdgavgfieldObj.tmpescuchaListener = parseInt(objTime.text());
                            clearInterval(timerGlobal);
                            timerGlobal = setInterval(function() {
                                wdgavgfieldObj.update();
                            }, timeAct);
                        }


                    }
                }, 6000);
                //wdgavgfieldObj.header();

            }
            /*
            ,header: function() {
                $.ajax({
                    url: wdgavgfieldObj.urlmxmheader,
                    jsonpCallback: 'mxmheader',
                    type: 'GET',
                    dataType: 'jsonp'
                })
                    .done(function(data) {
                        wdgavgfieldObj.timeUpdate(data.fechaPartido, data.horaPartido);
                    })
                    .fail(function() {
                        console.log("Error al cargar el header " + wdgavgfieldObj.urlmxmheader);
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

                            } else {
                                if (parseFloat(msDateA) > parseFloat(msDateB)) {
                                    console.log("MAYOR");
                                } else {
                                    console.log("Error no actualizo");
                                }
                            }
                        }
                        if (tiempoActualizacion !== 0) {
                            setInterval(function() {
                                wdgavgfieldObj.update()
                            }, tiempoActualizacion);
                        }
                        console.log("tiempo de actualizacion " + tiempoActualizacion);
                    }
                });
            }, // End timeUpdate()

            */



        };

        if (setting.idMatch !== 0 && setting.idTorneo !== 0) {
            wdgavgfieldObj.loadMaster();
        } else {
            console.log("falta el idMatch o idTorneo");
        }


    }
})(jQuery);