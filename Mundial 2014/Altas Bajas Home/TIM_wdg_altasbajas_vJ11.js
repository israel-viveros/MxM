/*!
 *   TIM Developer: Israel Viveros
 *   Version: 2.2.11
 *   Copyright: Televisa Interactive Media (2014)
 */

function createLink(country) {
    clean = country.replace(" ", "-").toLowerCase();
    clean = clean.replace(/á/g, 'a');
    clean = clean.replace(/é/g, 'e');
    clean = clean.replace(/í/g, 'i');
    clean = clean.replace(/ó/g, 'o');
    clean = clean.replace(/ú/g, 'u');
    clean = clean.replace(/ñ/g, 'n');
    return "http://televisadeportes.esmas.com/copa-mundial-fifa-brasil-2014/equipos/" + clean;
}

var status_partidos_inicial = true;
var timerPartidos;

var jornadaActualiza;
var diaActualiza;

;
(function() {
    $.fn.wdgAltasBajas = function(options) {
        var settings = $.extend({
            'idtorneo': 0,
            'idequipo': 0,
            'idtorneo2': 0,
            'tema': 'deportes',
            'txtdropdown': 'Jornada'
        }, options);

        var globalThis = this;
        var name_jor = "";
        var oficial = 1;

        function regresaSiglas(abrev, nombre, numero) {
            nombre = (abrev != undefined && abrev != null && abrev != '' && abrev != 'null') ? abrev : nombre;
            nombre = $.trim(nombre.toUpperCase());
            var siglas = nombre.substring(0, numero);
            return siglas.toUpperCase();
        }

        function validaGoles(gol, status, estampa) {
            var miFechaServidor = new Date(timeDTV.timeYear, (timeDTV.timeMonth - 1), timeDTV.timeDay, timeDTV.timeHour, timeDTV.timeMinute);
            var miFechaEvento = new Date((estampa * 1000) + (3600000 * 6));
            var goles = '-';

            if (miFechaEvento < miFechaServidor) {
                goles = isNaN(gol) ? status : gol;
            } else {
                goles = gol;
            }

            goles = (goles == null) ? '-' : goles;
            return goles;
        }

        var jornadasCalendarDTV = {
            jornadaCalendarRoute: "http://static-televisadeportes.esmas.com/sportsdata/futbol/data/",
            jornadaPresente: 0,
            fechaInicio: '',
            contenidoCentral: '',
            contenidohidde: '',
            fechaAct: '',
            numeroTorneoAct: 0,
            timerCalendar: 0,
            dataCalendar: '',
            dataCalendarH: '',
            callbackJornada: 'jornada',
            callbackListado: 'jornadalistado',
            timeRecarga: 30000,
            iniciar: function(fechaCalendar) {
                var num = (settings.tema !== "mundial") ? '1' : '';
                MaqueWdgAltas = "";
                MaqueWdgAltas += (settings.title !== '') ? '<div class="str_pleca_01"><div class="str_pleca_01_title"><h3 class="str_pleca_01_title background-color' + num + '"><a class="textcolor-title3" ><span id="title-jornada"></span><span class="str_pleca_01_arrowa selected"></span><span class="str_pleca_01_arrowb"></span></a></h3></div>' : '';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '<div class="division">';
                MaqueWdgAltas += (settings.tema !== "mundial") ? '<img src="" width="45" height="30">' : '';
                MaqueWdgAltas += '<h2 class="games"></h2>';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '<div class="filterResultado">';
                MaqueWdgAltas += '<div class="lineaResultado result2">';
                MaqueWdgAltas += '<span class="title">' + settings.txtdropdown + '</span>';
                MaqueWdgAltas += '<div class="filter">';
                MaqueWdgAltas += '<div class="wdg_altasbajas_result_012_dropdown drop2">';
                MaqueWdgAltas += '<div class="wdg_altasbajas_result_012_dropdowncontent contentF2" id="name-jornada">';
                MaqueWdgAltas += '<p></p>';
                MaqueWdgAltas += '<span class="tvsa-caret-down"></span>';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '<div class="wdg_altasbajas_result_012_listcontainer">';
                MaqueWdgAltas += '<ul class="wdg_altasbajas_result_012_dropdownlist list2" id="nro_jornadas">';
                MaqueWdgAltas += '</ul>';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '<div id="circleGLoading">';
                MaqueWdgAltas += '<div id="circleG_1" class="circleG"></div>';
                MaqueWdgAltas += '<div id="circleG_2" class="circleG"></div>';
                MaqueWdgAltas += '<div id="circleG_3" class="circleG"></div>';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '<span style="display:none;" id="feedsAct" data-primero="" data-segundo=""></span>';
                MaqueWdgAltas += '<ul class="deg">';
                MaqueWdgAltas += '</ul>';
                if (settings.tema != "mundial") {
                    MaqueWdgAltas += '<div class="controls"> ';
                    MaqueWdgAltas += '<a class="prev bginactive" title="Link Description" href="#">';
                    MaqueWdgAltas += '<span class="tvsa-caret-up"></span>';
                    MaqueWdgAltas += '</a>';
                    MaqueWdgAltas += '<a class="next bgactive" title="Link Description" href="#">';
                    MaqueWdgAltas += '<span class="tvsa-caret-down"></span>';
                    MaqueWdgAltas += '</a>';
                    MaqueWdgAltas += '<a class="full-timetable" href="#"> ';
                    MaqueWdgAltas += '<span>Ver todos</span> ';
                    MaqueWdgAltas += '</a>';
                    MaqueWdgAltas += '</div>';
                }

                MaqueWdgAltas += '<div class="degraded"></div>';

                globalThis.css("display", "none").html(MaqueWdgAltas);


                clearInterval(jornadasCalendarDTV.timerCalendar);
                jornadasCalendarDTV.timerCalendar = setInterval((function() {
                    jornadasCalendarDTV.actualizaContenido()
                }), jornadasCalendarDTV.timeRecarga);


                var timeToday = new Date(timeDTV.timeYear + "/" + timeDTV.timeMonth + "/" + timeDTV.timeDay);
                fechaCalendar = timeDTV.timeYear + "/" + timeDTV.timeMonth + "/" + timeDTV.timeDay;
                jornadasCalendarDTV.fechaInicio = new Date(fechaCalendar);
                jornadasCalendarDTV.fechaAct = fechaCalendar;
                jornadasCalendarDTV.numeroTorneoAct = settings.idtorneo,
                jornadasCalendarDTV.numeroIdEquipo = settings.idequipo,
                jornadasCalendarDTV.Jornada2 = settings.idtorneo2,
                urFinal = "";

                var fechaDiaActual = new Date(jornadasCalendarDTV.fechaAct);
                var tiempoActual = fechaDiaActual.getTime() / 1000;


                $.when(jornadasCalendarDTV.primeraJornada()).done(function() {
                    setTimeout(function() {
                        jornadasCalendarDTV.segundaJornada()
                    }, 1000);
                });

                if (jornadasCalendarDTV.numeroTorneoAct !== 0 && jornadasCalendarDTV.numeroIdEquipo === 0) {
                    urFinal = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornadas/jornadalistadojsonp.js';

                    $.ajax({
                        url: urFinal,
                        jsonpCallback: jornadasCalendarDTV.callbackListado,
                        dataType: 'jsonp',
                        cache: true,
                        data: 'v=' + timeDTV.returnData(),
                        success: function(data) {

                            // Just order 5/5/14
                            data = data.sort(function(obj1, obj2) {
                                return obj1.abbreviation - obj2.abbreviation;
                            });


                            if (data == null) {
                                data = new Array();
                            }



                            jornadasCalendarDTV.dataCalendarH = data;
                            var i = 0;

                            var auxJornadasPartidos = 4272;

                            for (i = 0; i < jornadasCalendarDTV.dataCalendarH.length; i++) {

                                var valorj = jornadasCalendarDTV.dataCalendarH[i];
                                jornadasCalendarDTV.jornadaPresente = i;
                                var startDate = new Date(valorj.enddate)

                                //Ajuste "impostor": weekidata
                                //name_jor += '<li  data-weekid="' + jornadasCalendarDTV.dataCalendarH[i].weekid + '" data-jornada="' + jornadasCalendarDTV.dataCalendarH[i].weekid + '"><p>D&iacute;a ' + (i + 1) + '</p></li>'
                                if (i < 15) {
                                    name_jor += '<li  data-weekid="' + auxJornadasPartidos + '" data-jornada="' + auxJornadasPartidos + '"><p>D&iacute;a ' + (i + 1) + '</p></li>'
                                } else {
                                    if (auxJornadasPartidos == 4287) {
                                        name_jor += '<li  data-weekid="' + auxJornadasPartidos + '" data-jornada="' + auxJornadasPartidos + '"><p>Octavos de Final</p></li>'
                                    }
                                }
                                auxJornadasPartidos = auxJornadasPartidos + 1;

                                //name_jor += '<li data-jornada="' + startDate.format('yyyy/mm/dd') + '"><p>' + valorj.name + '</p></li>'

                                /* if (tiempoActual <= valorj.startstamp) {
                                    i = jornadasCalendarDTV.dataCalendarH.length + 1;
                                } else if (tiempoActual <= valorj.endstamp) {
                                    i = jornadasCalendarDTV.dataCalendarH.length + 1;
                                }*/
                            }

                            //$('#name-jornada').html("<p>" + jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].name + '</p><span class="tvsa-caret-down"></span>');
                            $('#name-jornada').html('<p>D&iacute;a 1</p><span class="tvsa-caret-down"></span>');
                            //$('#title-jornada').html(jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].name)
                            var urlfinalTmp = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornadas/jornada_' + data[0].weekid + '.js'; //da first element
                            $.ajax({
                                url: urlfinalTmp,
                                jsonpCallback: jornadasCalendarDTV.callbackJornada,
                                dataType: 'jsonp',
                                cache: false,
                                data: 'v=' + timeDTV.returnData(),
                                success: function(data) {
                                    crear_jornada(data);
                                    $("#feedsAct").data("primero", urlfinalTmp);
                                }
                            });

                        }
                    });

                } else {
                    if (jornadasCalendarDTV.numeroTorneoAct === 0 && jornadasCalendarDTV.numeroIdEquipo === 0) {
                        globalThis.remove();
                    } else if (jornadasCalendarDTV.Jornada2 === 0 && jornadasCalendarDTV.numeroTorneoAct === 0) {
                        globalThis.remove();
                    }


                }



                globalThis.fadeIn(1000);


            },
            primeraJornada: function() {
                if (jornadasCalendarDTV.numeroIdEquipo !== 0 && jornadasCalendarDTV.numeroTorneoAct !== 0) {
                    urFinal = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + "/clubes/" + jornadasCalendarDTV.numeroIdEquipo + "/teamcalendar.js";
                    //urFinal = "http://static-televisadeportes.esmas.com/sportsdata/futbol/data/335/clubes/141/teamcalendar.js";
                    globalThis.find('.full-timetable').css("visibility", "hidden");
                    $.ajax({
                        url: urFinal,
                        jsonpCallback: "matches",
                        dataType: 'jsonp',
                        cache: false,
                        data: 'v=' + timeDTV.returnData(),
                        success: function(data) {
                            crear_jornada(data);
                            $("#feedsAct").data("primero", urFinal);
                        },
                        fail: function() {
                            try {
                                jornadasCalendarDTV.primeraJornada();
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    });
                    globalThis.children('.filterResultado').remove();
                }
                $("#title-jornada").text(settings.title);
            },
            jornadasCalendarDTV: function(fechaCalendar) {
                clearInterval(jornadasCalendarDTV.timerCalendar);
                jornadasCalendarDTV.timerCalendar = setInterval((function() {
                    jornadasCalendarDTV.actualizaContenido()
                }), jornadasCalendarDTV.timeRecarga);

                jornadasCalendarDTV.fechaAct = fechaCalendar;
                //        jornadasCalendarDTV.numeroTorneoAct = (typeof IdTorneo=== "undefined") ? 0 : IdTorneo;

                var fechaDiaActual = new Date(jornadasCalendarDTV.fechaAct);
                var tiempoActual = fechaDiaActual.getTime() / 1000;

                if (jornadasCalendarDTV.numeroTorneoAct !== 0 && jornadasCalendarDTV.numeroIdEquipo === 0) {
                    $.ajax({
                        url: jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornadas/jornadalistadojsonp.js',
                        jsonpCallback: jornadasCalendarDTV.callbackListado,
                        dataType: 'jsonp',
                        cache: true,
                        data: 'v=' + timeDTV.returnData(),
                        success: function(data) {
                            if (data == null) {
                                data = new Array();
                            }

                            jornadasCalendarDTV.dataCalendarH = data;

                            var i = 0;
                            for (i = 0; i < jornadasCalendarDTV.dataCalendarH.length; i++) {

                                var valorj = jornadasCalendarDTV.dataCalendarH[i];
                                jornadasCalendarDTV.jornadaPresente = i;

                                if (tiempoActual <= valorj.startstamp) {
                                    i = jornadasCalendarDTV.dataCalendarH.length + 1;
                                } else if (tiempoActual <= valorj.endstamp) {
                                    i = jornadasCalendarDTV.dataCalendarH.length + 1;
                                }
                            }
                            //$('#title-jornada').html(jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].name)
                            var urltmp = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornadas/jornada_' + jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].weekid + '.js';
                            $.ajax({
                                url: urltmp,
                                jsonpCallback: jornadasCalendarDTV.callbackJornada,
                                dataType: 'jsonp',
                                cache: false,
                                success: function(data) {
                                    $("#feedsAct").data("primero", urltmp);
                                    crear_jornada(data);

                                }
                            });

                        }
                    });
                }


            },
            jornadasCalendarDTV_vJ: function(weekid_vJ) {

                var urltmp = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornadas/jornada_' + weekid_vJ + '.js'; //Load just by weekid
                $.ajax({
                    url: urltmp,
                    jsonpCallback: jornadasCalendarDTV.callbackJornada,
                    dataType: 'jsonp',
                    cache: false,
                    success: function(data) {
                        $("#feedsAct").data("primero", urltmp);
                        crear_jornada(data);
                    }
                });



            },
            segundaJornada: function() {
                // segunda jornada          

                if (jornadasCalendarDTV.Jornada2 !== 0 && jornadasCalendarDTV.numeroIdEquipo !== 0) {
                    urFinal = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.Jornada2 + "/clubes/" + jornadasCalendarDTV.numeroIdEquipo + "/teamcalendar.js";
                    //urFinal = "http://static-televisadeportes.esmas.com/sportsdata/futbol/data/335/clubes/141/teamcalendar.js";
                    $.ajax({
                        url: urFinal,
                        jsonpCallback: jornadasCalendarDTV.callbackJornada,
                        dataType: 'jsonp',
                        cache: false,
                        success: function(data) {
                            $("#feedsAct").data("segundo", urFinal);
                            crear_jornada(data, 'jornada2');
                        },
                        fail: function() {
                            try {
                                jornadasCalendarDTV.segundaJornada();
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    });
                }


            }, //End segunda jornada
            actualizaContenido: function() {

                var primerFeed = String($("#feedsAct").data("primero"));
                var segundoFeed = String($("#feedsAct").data("segundo"));

                if (jornadasCalendarDTV.numeroTorneoAct !== 0 && jornadasCalendarDTV.numeroIdEquipo == 0 && jornadasCalendarDTV.Jornada2 === 0) {
                    jornadasCalendarDTV.procesoActualiza(primerFeed);
                } else if (jornadasCalendarDTV.numeroTorneoAct !== 0 && jornadasCalendarDTV.numeroIdEquipo !== 0 && jornadasCalendarDTV.Jornada2 === 0) {
                    jornadasCalendarDTV.procesoActualiza(primerFeed);

                } else if (jornadasCalendarDTV.Jornada2 !== 0 && jornadasCalendarDTV.numeroIdEquipo !== 0 && jornadasCalendarDTV.numeroTorneoAct !== 0) {
                    $.when(jornadasCalendarDTV.procesoActualiza(primerFeed)).done(function() {
                        setTimeout(function() {
                            jornadasCalendarDTV.procesoActualiza(segundoFeed)
                        }, 1000);
                    });



                }


            },
            procesoActualiza: function(urlupdate) {

                var GolesActLocal, GolesActVisit, GolesNewLocal, GolesNewVisit, penalesLocal, penalesVisit, tmpgolLocal, tmpGolVisit;
                $.ajax({
                    url: urlupdate,
                    jsonpCallback: jornadasCalendarDTV.callbackJornada,
                    dataType: 'jsonp',
                    cache: false,
                    success: function(data) {

                        for (var z = 0; z < data.length; z++) {
                            GolesNewLocal = data[z].local.team.gol
                            penalesLocal = (data[z].local.team.pen !== 0) ? '<i class="penalT">(' + data[z].local.team.pen + ')</i>' : '';
                            penalesVisit = (data[z].local.team.pen !== 0) ? '<i class="penalT">(' + data[z].visit.team.pen + ')</i>' : '';

                            if (penalesLocal === "") {
                                tmpgolLocal = data[z].local.team.gol;
                            } else {
                                tmpgolLocal = '<i class="golT">' + data[z].local.team.gol + '</i>';
                            }
                            if (penalesVisit === "") {
                                tmpGolVisit = data[z].visit.team.gol;
                            } else {
                                tmpGolVisit = '<i class="golT">' + data[z].visit.team.gol + '</i>';
                                $("#jornadaMatch" + data[z].id).find(".result.textcolor-title2").eq(1).css({
                                    'position': 'relative',
                                    'left': '-5px'
                                });
                            }

                            GolesNewLocal = penalesLocal + tmpgolLocal;
                            GolesNewVisit = tmpGolVisit + penalesVisit;


                            GolesActLocal = String($("#jornadaMatch" + data[z].id).find(".result.textcolor-title2").eq(0).text());
                            GolesActVisit = String($("#jornadaMatch" + data[z].id).find(".result.textcolor-title2").eq(1).text());

                            if (data[z].periodo !== "Previo") {
                                (GolesActLocal !== GolesNewLocal) ? ($("#jornadaMatch" + data[z].id).find(".result.textcolor-title2").eq(0).html(GolesNewLocal)) : '';
                                (GolesActVisit !== GolesNewVisit) ? ($("#jornadaMatch" + data[z].id).find(".result.textcolor-title2").eq(1).html(GolesNewVisit)) : '';
                            }

                            if (data[z].periodo !== "Final" && data[z].periodo !== "Previo") {
                                $("#jornadaMatch" + data[z].id).addClass('activo');
                                var minuto = (data[z].minuto !== "") ? data[z].minuto + '"' : '';
                                $("#jornadaMatch" + data[z].id).find(".versus_time").text(data[z].periodo + ' ' + minuto);
                            } else {
                                $("#jornadaMatch" + data[z].id).removeClass('activo');
                            }

                        };


                    },
                    fail: function() {

                    }
                });




            } // End procesoActualiza



        };

        jornadasCalendarDTV.iniciar();

        jornadasCalendarDTV.contenidoCentral = new Array();
        jornadasCalendarDTV.contenidohidde = new Array();
        jornadasCalendarDTV.contenidoJornada = new Array();
        jornadasCalendarDTV.contenidoJornada2 = new Array();
        jornadasCalendarDTV.Global = new Array();
        jornadasCalendarDTV.GlobalSort = new Array();


        function actualizar_jornada(a) {
            $("ul.deg").fadeOut("slow");
            $("#circleGLoading").fadeIn("fast");
            //jornadasCalendarDTV.jornadasCalendarDTV(a);

            jornadasCalendarDTV.jornadasCalendarDTV_vJ(a); //another version
            $("ul.deg").delay(200).fadeIn("xslow");
            $("#circleGLoading").fadeOut('slow', function() {
                $(this).css("display", "none");
            });
        }

        function actualizar_jornada_home(a, cambioAuto) {

            if (cambioAuto) {
                timerPartidos = setTimeout(function() {
                    //actualizar_jornada_home(a,false);
                    jornadasCalendarDTV.jornadasCalendarDTV_vJ(a);
                }, 60000);
            } else {
                clearTimeout(timerPartidos);
            }

        }

        function crear_jornada(data, jornada2) {

            if (jornada2 !== "jornada2") {
                jornadasCalendarDTV.Global.length = 0;
                jornadasCalendarDTV.GlobalSort.length = 0;
                jornadasCalendarDTV.contenidoJornada.length = 0;
                jornadasCalendarDTV.contenidoJornada2.length = 0;
            }


            var bandera = 0;
            if (data == null) {
                data = new Array();
            }

            jornadasCalendarDTV.dataCalendar = data;

            //zonaGMT = zonaGMT - 1;
            var offsetCookie = zonaGMT;
            var nombreTorneo = "";
            var idTorneo = "";
            var textoHijo = '';
            var padres = new Array();
            var cuentaNodos = 0;
            var hojaContenido = 0;
            var valorFor = 0;

            valorFor = data.length;

            for (var i = 0; i < valorFor; i++) {


                if (i === 0) {
                    globalThis.find('.division img').attr('src', data[i].tournament.icono);
                    globalThis.find('.division h2').text(data[i].tournament.name);

                    (typeof(data[i].sef) !== "undefined" && typeof(data[i].sef.tournamentid) !== "undefined") ? globalThis.find('.controls .full-timetable').attr('href', 'http://stats.televisadeportes.esmas.com/futbol/torneo/' + String(data[i].tournament.name).replace(/ /g, "-").toLowerCase() + '/calendario/' + data[i].sef.tournamentid + '/') : '';
                }


                conjunto = data[i];

                var partidoHtml = '';

                var fechaEvento = convierteFecha(conjunto.fechastamp, offsetCookie, "dd/mmm");
                fechaEvento = fechaEvento.replace("/", ".&nbsp;");

                var hora = conjunto.eventtime.split(':');
                var horaEvento = hora[0] + ':' + hora[1];
                //var horaEvento = convierteFecha(conjunto.fechastamp, offsetCookie, "HH:MM");
                var sefMxmHash = (tbaner != undefined && tbaner != null && tbaner != '') ? '#' + tbaner : '';

                var clickUrlTv = (conjunto.eventurl != undefined && conjunto.eventurl != null && conjunto.eventurl != '') ? conjunto.eventurl : '';

                if (typeof(conjunto.sef) !== "undefined") {
                    var clickUrlSef = (conjunto.sef.mxmurl != undefined && conjunto.sef.mxmurl != null && conjunto.sef.mxmurl != '') ? conjunto.sef.mxmurl + sefMxmHash : '';
                }
                var clickUrlSef = "";
                var imagenLocal = "";
                if (typeof(conjunto.local.team) !== "undefined") {
                    imagenLocal = (oficial == 1) ? '<img width="24" height="24" src="' + conjunto.local.team.img.EscudoMundialF22014 + '" alt="' + conjunto.local.name + '" class="countryLink" data-clink="' + createLink(conjunto.local.name) + '">' : '<img width="24" height="24" src="' + conjunto.local.team.img.oficialno + '" alt="' + conjunto.local.name + '" class="countryLink" data-clink="' + createLink(conjunto.local.name) + '">';
                }
                var imagenVisit = "";
                if (typeof(conjunto.visit.team) !== "undefined") {
                    var imagenVisit = (oficial == 1) ? '<img width="24" height="24" src="' + conjunto.visit.team.img.EscudoMundialF22014 + '" alt="' + conjunto.visit.name + '" class="countryLink" data-clink="' + createLink(conjunto.visit.name) + '">' : '<img width="24" height="24" src="' + conjunto.visit.team.img.oficialno + '" alt="' + conjunto.visit.name + '" class="countryLink" data-clink="' + createLink(conjunto.visit.name) + '">';
                }

                if (imagenLocal == '<img width="24" height="24" src="http://i2.esmas.com/canal30/img/spacer.gif" alt="' + conjunto.local.name + '" class="countryLink" data-clink="' + createLink(conjunto.local.name) + '">') {
                    imagenLocal = '<img width="24" height="24" src="' + conjunto.local.team.img.EscudoMundialF22014 + '"  alt="' + conjunto.local.name + '" class="countryLink" data-clink="' + createLink(conjunto.local.name) + '">';
                }

                if (imagenVisit == '<img width="24" height="24" src="http://i2.esmas.com/canal30/img/spacer.gif" alt="' + conjunto.local.name + '" class="countryLink" data-clink="' + createLink(conjunto.local.name) + '">') {
                    imagenVisit = '<img width="24" height="24" src="' + conjunto.visit.team.img.EscudoMundialF22014 + '"  alt="' + conjunto.local.name + '" class="countryLink" data-clink="' + createLink(conjunto.local.name) + '">';
                }

                var golesLocal = (typeof(conjunto.local.team) !== "undefined") ? validaGoles(conjunto.local.team.gol, conjunto.local.team.golstatus, conjunto.fechastamp) : '';
                var golesVisit = (typeof(conjunto.visit.team) !== "undefined") ? validaGoles(conjunto.visit.team.gol, conjunto.visit.team.golstatus, conjunto.fechastamp) : '';

                if (typeof(conjunto.local.team) !== "undefined" && typeof(conjunto.visit.team) !== "undefined") {
                    if (parseInt(conjunto.local.team.pen) > 0 || parseInt(conjunto.visit.team.pen) > 0) {
                        golesLocal = '<i class="penalT">(' + conjunto.local.team.pen + ')</i><i class="golT">' + golesLocal + '</i>';
                        golesVisit = '<i class="golT">' + golesVisit + '</i><i class="penalT">(' + conjunto.visit.team.pen + ')</i>';
                    }
                }
                var clasJorname = (typeof jornada2 !== "undefined") ? '2J' : '1J';
                partidoHtml = '<li id="jornadaMatch' + conjunto.id + '" class="' + conjunto.fechastamp + ' ' + conjunto.eventtime + ' ' + clasJorname + ' wdg_altasbajas_result_01_block' + ((conjunto.minuto != "") ? " activo" : "") + '" data-link="' + clickUrlSef + '">';
                partidoHtml += '<div class="date textcolor-title2">';

                partidoHtml += '<span class="datetext inactive">' + fechaEvento + '</span>';
                partidoHtml += '<span class="time">' + horaEvento + '</span>';

                partidoHtml += '</div>';

                //Just a simple reduction and html5 incorporation to team's image-label 

                partidoHtml += '<figure>' + imagenLocal + '<figcaption>' + conjunto.local.abrev + '</figcaption></figure>';

                if (conjunto.periodo != "Previo")
                    partidoHtml += '<div class="ligaResult"><a href="' + conjunto.sef.mxmurl + '" target="_blank"><span class="result textcolor-title2">' + golesLocal + '</span>';
                else
                    partidoHtml += '<div class="ligaResult"><span class="result textcolor-title2">&nbsp;</span>';
                partidoHtml += '<div class="content_versus"> <span class="versus textcolor-title4">-</span>';

                if (conjunto.sef.mxmurl != "") {
                    if (conjunto.local.abrev == "URU" && conjunto.visit.abrev == "CRC")
                        partidoHtml += '</div>';
                    else
                        partidoHtml += '<span class="versus_time textcolor-title4" style="width:213px;margin-left:-95px;">' + conjunto.periodo + ' ' + conjunto.minuto + '</span></div>';
                } else
                    partidoHtml += '</div>';

                if (conjunto.periodo != "Previo")
                    partidoHtml += (conjunto.visit.team.pen !== 0) ? '<span class="result textcolor-title2" style="position:relative;left:-5px">' + golesVisit + '</span></a></div>' : '<span class="result textcolor-title2">' + golesVisit + '</span></a></div>';
                else
                    partidoHtml += '<span class="result textcolor-title2">&nbsp;</span></div>';


                partidoHtml += '<figure><figcaption>' + conjunto.visit.abrev + '</figcaption>' + imagenVisit + '</figure>';

                //partidoHtml += '<div class="icon_team">';
                //partidoHtml += imagenLocal
                //partidoHtml += '</div>'
                //partidoHtml += '<div class="team">' +  + '</div>'     
                //partidoHtml += '<div class="result textcolor-title2">' + golesLocal + '</div>'
                //partidoHtml += '<div class="content_versus">'
                //partidoHtml += '<div class="versus textcolor-title4">-</div>'
                //partidoHtml += '<div class="versus_time textcolor-title4">' + conjunto.periodo + ' ' + conjunto.minuto + '</div>'
                //partidoHtml += '</div>'
                //partidoHtml += '<div class="result textcolor-title2">' + golesVisit + '</div>'
                //partidoHtml += '<div class="team">' + conjunto.visit.abrev + '</div>'
                //partidoHtml += '<div class="icon_team">'
                //partidoHtml += imagenVisit
                //partidoHtml += '</div>'
                partidoHtml += "</li>"

                //wth
                if (jornada2 === "jornada2") {
                    jornadasCalendarDTV.contenidoJornada2.push(partidoHtml)
                } else {
                    jornadasCalendarDTV.contenidoJornada.push(partidoHtml)
                }


            }


            if (valorFor < 9) {
                var faltantes = parseInt(9 - valorFor);
                for (var w = 0; w < faltantes; w++) {
                    jornadasCalendarDTV.contenidoJornada.push('<li class="vacio wdg_altasbajas_result_01_block"><div class="date textcolor-title2"></div><figure></figure><div class="ligaResult"></div><figure></figure></li>');
                };
            }

            jornadasCalendarDTV.Global = jornadasCalendarDTV.contenidoJornada.concat(jornadasCalendarDTV.contenidoJornada2);
            jornadasCalendarDTV.GlobalSort = jornadasCalendarDTV.Global.sort();

            var visible = "",
                novisible = "";
            for (var p = 0; p < jornadasCalendarDTV.GlobalSort.length; p++) {
                (p < 7) ? visible += jornadasCalendarDTV.GlobalSort[p] : novisible += jornadasCalendarDTV.GlobalSort[p];
            };

            // Merge visible and no visible Just for watching
            var allContentVisible = visible + ' ' + novisible;
            $('.deg').html(allContentVisible);
            //$('.show-j').html(visible);
            //$('.show-j').html(novisible);

            $("#nro_jornadas").html(name_jor).children('li').bind('click', function(event) {
                actualizar_jornada($(this).data('jornada')); //Before "jornada"
            });
            $(".wdg_altasbajas_result_01_block[data-link]").not($("[data-link='']")).css("cursor", "pointer").bind('click', function(event) {
                window.location.assign($(this).data("link"));
            });

            (jornadasCalendarDTV.GlobalSort.length > 7) ? $(".controls").css("display", "block") : $(".controls").css("display", "none");
            $("#circleGLoading").fadeOut("fast");

            var dataJornada;
            var statusCambio = false;

            var today = new Date();
            var day = today.getDate();

            var dayClick = data[0].eventdate;
            dayClick = dayClick.split("-");

            if (status_partidos_inicial) {

                switch (day) {
                    case 20:
                        $("#nro_jornadas li:nth-of-type(9)").trigger('click');
                        $("#name-jornada > p").html('D&iacute;a 9');
                        dataJornada = $("#nro_jornadas li:nth-of-type(9)").data('jornada');
                        break;
                    case 21:
                        $("#nro_jornadas li:nth-of-type(10)").trigger('click');
                        $("#name-jornada > p").html('D&iacute;a 10');
                        dataJornada = $("#nro_jornadas li:nth-of-type(10)").data('jornada');
                        break;
                    case 22:
                        $("#nro_jornadas li:nth-of-type(11)").trigger('click');
                        $("#name-jornada > p").html('D&iacute;a 11');
                        dataJornada = $("#nro_jornadas li:nth-of-type(11)").data('jornada');
                        break;
                    case 23:
                        $("#nro_jornadas li:nth-of-type(12)").trigger('click');
                        $("#name-jornada > p").html('D&iacute;a 12');
                        dataJornada = $("#nro_jornadas li:nth-of-type(12)").data('jornada');
                        break;
                    case 24:
                        $("#nro_jornadas li:nth-of-type(13)").trigger('click');
                        $("#name-jornada > p").html('D&iacute;a 13');
                        dataJornada = $("#nro_jornadas li:nth-of-type(13)").data('jornada');
                        break;
                    case 25:
                        $("#nro_jornadas li:nth-of-type(14)").trigger('click');
                        $("#name-jornada > p").html('D&iacute;a 14');
                        dataJornada = $("#nro_jornadas li:nth-of-type(14)").data('jornada');
                        break;
                    case 26:
                        $("#nro_jornadas li:nth-of-type(15)").trigger('click');
                        $("#name-jornada > p").html('D&iacute;a 15');
                        dataJornada = $("#nro_jornadas li:nth-of-type(15)").data('jornada');
                        break;
                    case 27:
                        $("#nro_jornadas li:nth-of-type(16)").trigger('click');
                        $("#name-jornada > p").html('Octavos de Final');
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                    case 28:
                        $("#nro_jornadas li:nth-of-type(16)").trigger('click');
                        $("#name-jornada > p").html('Octavos de Final');
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                    case 29:
                        $("#nro_jornadas li:nth-of-type(16)").trigger('click');
                        $("#name-jornada > p").html('Octavos de Final');
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                    case 30:
                        $("#nro_jornadas li:nth-of-type(16)").trigger('click');
                        $("#name-jornada > p").html('Octavos de Final');
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                    case 1:
                        $("#nro_jornadas li:nth-of-type(16)").trigger('click');
                        $("#name-jornada > p").html('Octavos de Final');
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                }

                if (parseInt(dayClick[2]) == parseInt(day)) {
                    statusCambio = true;
                    actualizar_jornada_home(dataJornada, statusCambio);
                } else {
                    statusCambio = false;
                    actualizar_jornada_home(dataJornada, statusCambio);
                }

                status_partidos_inicial = false;
                $(".wdg_altasbajas_result_012_dropdownlist").trigger('mouseleave');

            } else {

                switch (day) {
                    case 20:
                        dataJornada = $("#nro_jornadas li:nth-of-type(9)").data('jornada');
                        break;
                    case 21:
                        dataJornada = $("#nro_jornadas li:nth-of-type(10)").data('jornada');
                        break;
                    case 22:
                        dataJornada = $("#nro_jornadas li:nth-of-type(11)").data('jornada');
                        break;
                    case 23:
                        dataJornada = $("#nro_jornadas li:nth-of-type(12)").data('jornada');
                        break;
                    case 24:
                        dataJornada = $("#nro_jornadas li:nth-of-type(13)").data('jornada');
                        break;
                    case 25:
                        dataJornada = $("#nro_jornadas li:nth-of-type(14)").data('jornada');
                        break;
                    case 26:
                        dataJornada = $("#nro_jornadas li:nth-of-type(15)").data('jornada');
                        break;
                    case 27:
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                    case 28:
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                    case 29:
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                    case 30:
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                    case 1:
                        dataJornada = $("#nro_jornadas li:nth-of-type(16)").data('jornada');
                        break;
                }

                if (parseInt(dayClick[2]) == parseInt(day)) {
                    statusCambio = true;
                    actualizar_jornada_home(dataJornada, statusCambio);
                } else {
                    statusCambio = false;
                    actualizar_jornada_home(dataJornada, statusCambio);
                }

            }

        }

    }
})(jQuery);



;
jQuery(function($) {
    (function($, T) {
        /*Swipe*/
        var altWdgResult01 = 0;
        if ($(window).width() < 978 && $(window).width() > 624) {
            altWdgResult01 = 568;
        } else {
            altWdgResult01 = 163;
        }

        $('.wdg_altasbajas_result_01 .deg').bind('swipeup', function() {
            $(this).animate({
                'scrollTop': $(this).scrollTop() + altWdgResult01
            }, 500);
        });
        $('.wdg_altasbajas_result_01 .deg').bind('swipedown', function() {
            $(this).animate({
                'scrollTop': $(this).scrollTop() - altWdgResult01
            }, 500);
        });


        $('.wdg_altasbajas_result_01').each(function(ix, element) {
            var $this = $(this),
                Pointer = {
                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                },
                $theUl = $this.find('>ul');

            $this.find('a.prev, a.next, .deportes-prev, .deportes-next').click(function(event) {
                event.preventDefault();
            });

            $this.find('a.prev, .deportes-prev').bind(Pointer.DOWN, function() {
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() - $theUl.height() - 7
                }, 500);
            });

            $this.find('a.next, .deportes-next').bind(Pointer.DOWN, function() {
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() + $theUl.height() + 7
                }, 500);
            });
        });


        $list = $('.wdg_altasbajas_result_01 .deg').size();
        $altura_li = parseInt($('.wdg_altasbajas_result_01 .deg').height());
        $altura = ($altura_li * $list) + $list;

        var $parent = $('.wdg_altasbajas_result_01 ');
        var $dropdownAnchor = $parent.find('.lineaResultado .filter');
        $dropdownAnchor.on('click', function(evt) {
            var $listItems = $(this).find('.wdg_altasbajas_result_012_dropdownlist');
            var $visibility = $listItems.css('visibility');
            var padre = $(this);
            if ($visibility == 'hidden')
                $listItems.css({
                    visibility: 'visible',
                    height: 'auto',
                    'max-height': '156px',
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden'
                });
            else
                $listItems.css({
                    visibility: 'hidden',
                    height: '0px'
                });
            var $dropdownItems2 = $(this).find('.wdg_altasbajas_result_012_dropdownlist li');
            $dropdownItems2.bind('click', function(evt) {
                evt.preventDefault();
                padre.find('.wdg_altasbajas_result_012_dropdowncontent p').html($(this).find('p').html());
            });

            $listItems.bind('mouseleave', function(evt) {
                evt.preventDefault();
                var visibilidad = $(this).css('visibility');
                if (visibilidad == 'visible') {
                    $(this).css({
                        visibility: 'hidden',
                        height: '0px'
                    });
                }
            });
        });

        /*Monitoreo scroll*/
        $('.wdg_altasbajas_result_01 .deg').scroll(function() {
            var $war1_position = $(this).scrollTop();

            //alert($(this).height());
            if ($(window).width() < 624) {
                $war1_altura = 813;
            }
            if ($.browser.msie) {
                $war1_altura = 470;
            } else {
                $war1_altura = $(this).height()
            }
            var $hijoAltura = $('.wdg_altasbajas_result_01 .deg').children('li').eq(0).outerHeight();
            var $multi = $war1_position + 1;
            var $newAlt = $multi * $hijoAltura;


            if ($newAlt >= $war1_altura) {
                $(this).siblings('.degraded').css("visibility", "hidden");
                //$(this).siblings('.controls').children('.next').children('.tvsa-caret-down').css('color','#000');

                $(this).siblings('.controls').children().children('.tvsa-caret-down').parent().removeClass('bgactive');
                $(this).siblings('.controls').children().children('.tvsa-caret-down').parent().addClass('bginactive');

            } else {
                $(this).siblings('.degraded').css("visibility", "visible");
                //$(this).siblings('.controls').children().children('.tvsa-caret-down').css('color','#FFF');
                $(this).siblings('.controls').children().children('.tvsa-caret-down').parent().removeClass('bginactive');
                $(this).siblings('.controls').children().children('.tvsa-caret-down').parent().addClass('bgactive');
            }

            if ($war1_position == 0) {
                //$(this).siblings('.controls').children('.prev').children('.tvsa-caret-up').css('color','#000');
                $(this).siblings('.controls').children().children('.tvsa-caret-up').parent().removeClass('bgactive');
                $(this).siblings('.controls').children().children('.tvsa-caret-up').parent().addClass('bginactive');
            } else {
                //$(this).siblings('.controls').children('.prev').children('.tvsa-caret-up').css('color','#FFF');
                $(this).siblings('.controls').children().children('.tvsa-caret-up').parent().removeClass('bginactive');
                $(this).siblings('.controls').children().children('.tvsa-caret-up').parent().addClass('bgactive');
            }
        });


    })($, Televisa);
});

if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
    $(function() {
        var zIndexNumber = 1000;
        $('.wdg_altasbajas_result_01 div').each(function() {
            $(this).css('zIndex', zIndexNumber);
            zIndexNumber -= 10;
        });
    });
}



$('img.countryLink').live('click', function() {
    window.location = $(this).data('clink');
});