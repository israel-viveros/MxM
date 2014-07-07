/*!
 *   TIM Developer: Israel Viveros
 *   Version: 2.3.12
 *   Copyright: Televisa Interactive Media (2014)
 */
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
            timeRecarga: 60000,
            createLink: function(text) {
                text = text.toLowerCase(); // a minusculas
                text = text.replace(/[á]/, 'a');
                text = text.replace(/[é]/, 'e');
                text = text.replace(/[í]/, 'i');
                text = text.replace(/[ó]/, 'o');
                text = text.replace(/[ú]/, 'u');
                text = text.replace(/ /, '-');
                return "http://televisadeportes.esmas.com/copa-mundial-fifa-brasil-2014/equipos/" + text;
            },
            iniciar: function(fechaCalendar) {

                (settings.tema !== "mundial") ? $('head').append('<link rel="stylesheet" href="http://i2.esmas.com/deportes30/mxm/css/TIM_wdg_altasbajas.min.css">') : '';
                var num = (settings.tema !== "mundial") ? '1' : '';
                MaqueWdgAltas = "";
                MaqueWdgAltas += (settings.title !== '') ? '<div class="str_pleca_01"><div class="str_pleca_01_title"><h3 class="str_pleca_01_title background-color' + num + '"><a class="textcolor-title3" ><span id="title-jornada"></span><span class="str_pleca_01_arrowa selected"></span><span class="str_pleca_01_arrowb"></span></a></h3></div>' : '';
                MaqueWdgAltas += '</div>';
                MaqueWdgAltas += '<div class="division">';
                MaqueWdgAltas += (settings.tema !== "mundial") ? '<img src="" id="ALtournamentLogo" width="45" height="30">' : '';
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
                    MaqueWdgAltas += '<a class="next bginactive" href="#">';
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
                if (settings.tema !== "mundial") {
                    jornadasCalendarDTV.timerCalendar = setInterval((function() {
                        jornadasCalendarDTV.actualizaContenido()
                    }), jornadasCalendarDTV.timeRecarga);
                }


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
                    }, 800);
                });

                if (jornadasCalendarDTV.numeroTorneoAct !== 0 && jornadasCalendarDTV.numeroIdEquipo === 0) {
                    urFinal = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornadas/jornadalistadojsonp.js';
                    $.ajax({
                        url: urFinal,
                        jsonpCallback: jornadasCalendarDTV.callbackListado,
                        dataType: 'jsonp',
                        cache: false,
                        data: 'v=' + timeDTV.returnData(),
                        success: function(data) {
                            if (data == null) {
                                data = new Array();
                            }
                            jornadasCalendarDTV.dataCalendarH = data;
                            var arrayFechas = new Array();
                            var Ahorita = new Date();
                            for (var i = 0; i < jornadasCalendarDTV.dataCalendarH.length; i++) {
                                var valorj = jornadasCalendarDTV.dataCalendarH[i];
                                jornadasCalendarDTV.jornadaPresente = i;
                                name_jor += '<li data-jornada="' + valorj.enddate.replace(/-/gi, "/") + '"><p>' + valorj.name + '</p></li>'


                                if (Ahorita >= new Date(valorj.startdate)) {
                                    arrayFechas.push(valorj.startdate)
                                }

                                /* if (tiempoActual <= valorj.startstamp) {
                                    i = jornadasCalendarDTV.dataCalendarH.length + 1;
                                } else if (tiempoActual <= valorj.endstamp) {
                                    i = jornadasCalendarDTV.dataCalendarH.length + 1;
                                }*/
                            }



                            jornadasCalendarDTV.jornadaPresente = arrayFechas.length - 1;


                            $('#name-jornada').html("<p>" + jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].name + '</p><span class="tvsa-caret-down"></span>');
                            //$('#title-jornada').html(jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].name)
                            var urlfinalTmp = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornadas/jornada_' + jornadasCalendarDTV.dataCalendarH[jornadasCalendarDTV.jornadaPresente].weekid + '.js';
                            $.ajax({
                                url: urlfinalTmp,
                                jsonpCallback: jornadasCalendarDTV.callbackJornada,
                                dataType: 'jsonp',
                                cache: false,
                                data: 'v=' + timeDTV.returnData(),
                                success: function(data) {
                                    crear_jornada(data);
                                    $("#feedsAct").data("primero", urlfinalTmp);
                                    globalThis.fadeIn(1000);
                                    jornadasCalendarDTV.naat();

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

            },
            primeraJornada: function() {
                if (jornadasCalendarDTV.numeroIdEquipo !== 0 && jornadasCalendarDTV.numeroTorneoAct !== 0) {
                    //console.log("ejecuto la primera ronda");
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
                            globalThis.fadeIn(1000);
                            jornadasCalendarDTV.naat();

                        },
                        fail: function() {
                            //console.log("Algo salio mal en 1");
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
                if (settings.tema !== "mundial") {
                    jornadasCalendarDTV.timerCalendar = setInterval((function() {
                        jornadasCalendarDTV.actualizaContenido()
                    }), jornadasCalendarDTV.timeRecarga);
                }

                jornadasCalendarDTV.fechaAct = fechaCalendar;
                //        jornadasCalendarDTV.numeroTorneoAct = (typeof IdTorneo=== "undefined") ? 0 : IdTorneo;

                var fechaDiaActual = new Date(jornadasCalendarDTV.fechaAct);
                var tiempoActual = fechaDiaActual.getTime() / 1000;

                if (jornadasCalendarDTV.numeroTorneoAct !== 0 && jornadasCalendarDTV.numeroIdEquipo === 0) {
                    $.ajax({
                        url: jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.numeroTorneoAct + '/jornadas/jornadalistadojsonp.js',
                        jsonpCallback: jornadasCalendarDTV.callbackListado,
                        dataType: 'jsonp',
                        cache: false,
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
            segundaJornada: function() {
                // segunda jornada     		

                if (jornadasCalendarDTV.Jornada2 !== 0 && jornadasCalendarDTV.numeroIdEquipo !== 0) {
                    //console.log("ejecuto la segunda ronda");
                    urFinal = jornadasCalendarDTV.jornadaCalendarRoute + jornadasCalendarDTV.Jornada2 + "/clubes/" + jornadasCalendarDTV.numeroIdEquipo + "/teamcalendar.js";
                    //urFinal = "http://static-televisadeportes.esmas.com/sportsdata/futbol/data/335/clubes/141/teamcalendar.js";
                    $.ajax({
                        url: urFinal,
                        jsonpCallback: "matches",
                        dataType: 'jsonp',
                        cache: false,
                        success: function(data) {
                            $("#feedsAct").data("segundo", urFinal);
                            crear_jornada(data, 'jornada2');
                        },
                        fail: function() {
                            //console.log("Algo salio mal en 2");
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
                    //console.log("actualizo listado...");
                    jornadasCalendarDTV.procesoActualiza(primerFeed);
                } else if (jornadasCalendarDTV.numeroTorneoAct !== 0 && jornadasCalendarDTV.numeroIdEquipo !== 0 && jornadasCalendarDTV.Jornada2 === 0) {
                    //console.log("un solo equipo");
                    jornadasCalendarDTV.procesoActualiza(primerFeed);

                } else if (jornadasCalendarDTV.Jornada2 !== 0 && jornadasCalendarDTV.numeroIdEquipo !== 0 && jornadasCalendarDTV.numeroTorneoAct !== 0) {
                    //console.log("un solo equipo 2 joarnadas");
                    $.when(jornadasCalendarDTV.procesoActualiza(primerFeed)).done(function() {
                        setTimeout(function() {
                            jornadasCalendarDTV.procesoActualiza(segundoFeed)
                        }, 1000);
                    });



                }


            },
            procesoActualiza: function(urlupdate) {

                //console.log("--->URL update: " + urlupdate);
                var GolesActLocal, GolesActVisit, GolesNewLocal, GolesNewVisit;
                $.ajax({
                    url: urlupdate,
                    jsonpCallback: jornadasCalendarDTV.callbackJornada,
                    dataType: 'jsonp',
                    cache: false,
                    success: function(data) {
                        for (var z = 0; z < data.length; z++) {

                            GolesNewLocal = String(data[z].local.team.gol);
                            GolesNewVisit = String(data[z].visit.team.gol);

                            GolesActLocal = String($(".JfromTicker" + data[z].sef.matchid).children('.result').eq(0).text());
                            GolesActVisit = String($(".JfromTicker" + data[z].sef.matchid).children('.result').eq(1).text());

                            (GolesActLocal !== GolesNewLocal) ? ($(".JfromTicker" + data[z].sef.matchid).children('.result').eq(0).text(GolesActLocal)) : '';
                            (GolesActVisit !== GolesNewVisit) ? ($(".JfromTicker" + data[z].sef.matchid).children('.result').eq(1).text(GolesActVisit)) : '';
                        };


                    },
                    fail: function() {

                    }
                });


            }, // End procesoActualiza

            naat: function() {
                //console.log("aplicando lo de naat");
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

                    //cambio de ubicacion drop y carrusel a naat()

                })($, Televisa);

                var $parent = $('.wdg_altasbajas_result_01 ');
                var $dropdownAnchor = $parent.find('.lineaResultado .filter');
                $dropdownAnchor.on('click', function(evt) {
                    //console.log("drop")
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
                    //console.log('Scroll: '+$war1_position+' suma: '+$(this).height());
                });
            }



        };




        jornadasCalendarDTV.iniciar();

        jornadasCalendarDTV.contenidoCentral = new Array();
        jornadasCalendarDTV.contenidohidde = new Array();
        jornadasCalendarDTV.contenidoJornada = new Array();
        jornadasCalendarDTV.contenidoJornada2 = new Array();
        jornadasCalendarDTV.Global = new Array();
        jornadasCalendarDTV.GlobalSort = new Array();


        function actualizar_jornada(a) {
            $("ul.deg").fadeOut("fast");
            $("#circleGLoading").fadeIn("fast");
            jornadasCalendarDTV.jornadasCalendarDTV(a);
            $("ul.deg").delay(10).fadeIn("slow");
            $("#circleGLoading").fadeOut('slow', function() {
                $(this).css("display", "none");
            });
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
                    if (typeof(data[i].tournament.icono) !== "undefined" && data[i].tournament.icono !== "") {
                        globalThis.find('#ALtournamentLogo').attr('src', data[i].tournament.icono);
                    } else {
                        globalThis.find('#ALtournamentLogo').remove();
                    }


                    (typeof(data[i].sef) !== "undefined" && typeof(data[i].sef.tournamentid) !== "undefined") ? globalThis.find('.controls .full-timetable').attr('href', 'http://stats.televisadeportes.esmas.com/futbol/torneo/' + String(data[i].tournament.name).replace(/ /g, "-").toLowerCase() + '/calendario/' + data[i].sef.tournamentid + '/') : '';
                }


                conjunto = data[i];



                var partidoHtml = '';

                //var fechaEvento = convierteFecha(conjunto.fechastamp, offsetCookie, "dd/mmm");
                //fechaEvento = fechaEvento.replace("/", ".&nbsp;");

                var fechasp = conjunto.eventdate.split("-");
                var nombreMes = "";


                switch (parseInt(fechasp[1])) {
                    case 1:
                        nombreMes = "Ene";
                        break;
                    case 2:
                        nombreMes = "Feb";
                        break;
                    case 3:
                        nombreMes = "Mar";
                        break;
                    case 4:
                        nombreMes = "Abr";
                        break;
                    case 5:
                        nombreMes = "May";
                        break;
                    case 6:
                        nombreMes = "Jun";
                        break;
                    case 7:
                        nombreMes = "Jul";
                        break;
                    case 8:
                        nombreMes = "Ago";
                        break;
                    case 9:
                        nombreMes = "Sep";
                        break;
                    case 10:
                        nombreMes = "Oct";
                        break;
                    case 11:
                        nombreMes = "Nov";
                        break;
                    case 12:
                        nombreMes = "Dic";
                        break;
                    default:
                        nombreMes = "";
                        break;
                }
                var fechaEvento = fechasp[2] + " " + nombreMes;
                //var horaEvento = convierteFecha(conjunto.fechastamp, offsetCookie, "HH:MM");
                var horaEvento = conjunto.eventtime.substring(0, 5);

                var sefMxmHash = (tbaner != undefined && tbaner != null && tbaner != '') ? '#' + tbaner : '';

                var clickUrlTv = (conjunto.eventurl != undefined && conjunto.eventurl != null && conjunto.eventurl != '') ? conjunto.eventurl : '';
                var clickUrlSef = "";
                if (typeof(conjunto.sef) !== "undefined") {
                    clickUrlSef = (typeof(conjunto.sef.mxmurl) != "undefined" && conjunto.sef.mxmurl != '') ? conjunto.sef.mxmurl : '';
                }


                var imagenLocal = (settings.tema === "deportes") ? '<img width="24" height="24" src="' + conjunto.local.team.img.logo + '"  alt="' + conjunto.local.name + '">' : '<img width="24" height="24" src="' + conjunto.local.team.img.EscudoMundialF22014 + '"  alt="' + conjunto.local.name + '">';

                var imagenVisit = (settings.tema === "deportes") ? '<img width="24" height="24" src="' + conjunto.visit.team.img.logo + '"  alt="' + conjunto.local.name + '">' : '<img width="24" height="24" src="' + conjunto.visit.team.img.EscudoMundialF22014 + '"  alt="' + conjunto.local.name + '">';


                var golesLocal = (typeof(conjunto.local.team) !== "undefined") ? conjunto.local.team.gol : '';
                var golesVisit = (typeof(conjunto.visit.team) !== "undefined") ? conjunto.visit.team.gol : '';

                if (typeof(conjunto.local.team) !== "undefined" && typeof(conjunto.visit.team) !== "undefined") {
                    if (parseInt(conjunto.local.team.pen) > 0 || parseInt(conjunto.visit.team.pen) > 0) {
                        golesLocal = '<div class="result textcolor-title2"><i class="penalT">(' + conjunto.local.team.pen + ')</i><i class="golT">' + golesLocal + '</i></div>';
                        golesVisit = '<div class="result textcolor-title2" style="position: relative; left: -5px;"><i class="golT">' + golesVisit + '</i><i class="penalT">(' + conjunto.visit.team.pen + ')</i></div>';
                    }
                }
                golesLocal = (golesLocal > 0 || conjunto.periodo !== "Previo") ? golesLocal : '';
                golesVisit = (golesVisit > 0 || conjunto.periodo !== "Previo") ? golesVisit : '';
                var clasJorname = (typeof jornada2 !== "undefined") ? '2J' : '1J';
                partidoHtml = '<li class="JfromTicker' + conjunto.sef.matchid + ' ' + conjunto.fechastamp + ' ' + conjunto.eventtime + ' ' + clasJorname + ' wdg_altasbajas_result_01_block' + ((conjunto.minuto != "") ? " activo" : "") + '" >';
                partidoHtml += '<div class="date textcolor-title2">';

                partidoHtml += '<span class="datetext inactive">' + fechaEvento + '</span>';
                partidoHtml += '<span class="time">' + horaEvento + '</span>';

                partidoHtml += '</div>';

                var linkLocal = (conjunto.local.name !== "" && settings.tema === "mundial") ? jornadasCalendarDTV.createLink(conjunto.local.name) : '';
                var linkVisit = (conjunto.visit.name !== "" && settings.tema === "mundial") ? jornadasCalendarDTV.createLink(conjunto.visit.name) : '';
                var estilosMundial = (settings.tema == "mundial") ? 'style="width:213px;margin-left:-95px;"' : '';

                var minutostmp = (conjunto.minuto !== "" && conjunto.minuto > 0) ? conjunto.minuto + '\'' : '';
                var periodoMuestra = (conjunto.sef.mxmurl !== "") ? conjunto.periodo + minutostmp : '';
                //Just a simple reduction and html5 incorporation to team's image-label 
                partidoHtml += '<figure style="cursor:pointer;" data-link="' + linkLocal + '" >' + imagenLocal + '<figcaption>' + conjunto.local.abrev + '</figcaption></figure>';
                partidoHtml += (clickUrlSef !== "") ? '<div class="ligaResult" style="cursor:pointer" data-link="' + clickUrlSef + '"><span class="result textcolor-title2">' + golesLocal + '</span>' : '<div class="ligaResult" data-link=""><span class="result textcolor-title2">' + golesLocal + '</span>';
                partidoHtml += '<div class="content_versus"> <span class="versus textcolor-title4">-</span>';
                partidoHtml += '<span class="versus_time textcolor-title4" ' + estilosMundial + '>' + periodoMuestra + '</span></div>';
                partidoHtml += '<span class="result textcolor-title2">' + golesVisit + '</span></div>';
                partidoHtml += '<figure style="cursor:pointer;" data-link="' + linkVisit + '"><figcaption>' + conjunto.visit.abrev + '</figcaption>' + imagenVisit + '</figure>';


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
                    //console.log("ES jornada 2");
                    jornadasCalendarDTV.contenidoJornada2.push(partidoHtml)
                } else {
                    //console.log("ES jornada 1");
                    jornadasCalendarDTV.contenidoJornada.push(partidoHtml)
                }


            }




            jornadasCalendarDTV.Global = jornadasCalendarDTV.contenidoJornada.concat(jornadasCalendarDTV.contenidoJornada2);
            jornadasCalendarDTV.GlobalSort = jornadasCalendarDTV.Global.sort();

            var visible = "",
                novisible = "";
            if (settings.tema === "deportes") {
                for (var p = 0; p < jornadasCalendarDTV.GlobalSort.length; p++) {
                    (p < 7) ? visible += jornadasCalendarDTV.GlobalSort[p] : novisible += jornadasCalendarDTV.GlobalSort[p];
                };
            } else {
                for (var p = 0; p < jornadasCalendarDTV.contenidoJornada.length; p++) {
                    (p < 7) ? visible += jornadasCalendarDTV.contenidoJornada[p] : novisible += jornadasCalendarDTV.contenidoJornada[p];
                };

            }


            // Merge visible and no visible Just for watching
            var allContentVisible = visible + ' ' + novisible;
            $('.deg').html(allContentVisible);
            //$('.show-j').html(visible);
            //$('.show-j').html(novisible);

            $("#nro_jornadas").html(name_jor).children('li').bind('click', function(event) {
                actualizar_jornada($(this).data('jornada'));
            });
            /*$(".wdg_altasbajas_result_01_block[data-link]").not($("[data-link='']")).css("cursor", "pointer").bind('click', function(event) {
                window.location.assign($(this).data("link"));
            }); */


            //(jornadasCalendarDTV.GlobalSort.length > 7) ? $(".controls").css("display", "block") : $(".controls").css("display", "none");
            if (jornadasCalendarDTV.GlobalSort.length > 7) {
                $(".controls .next").removeClass('bginactive');
                $(".controls .next").addClass('bgactive');
            }
            $("#circleGLoading").hide('slow', function() {
                $(this).css('display', 'none');
            });

            $(".wdg_altasbajas_result_01_block figure, .wdg_altasbajas_result_01_block .ligaResult").click(function(event) {
                event.preventDefault();
                if ($(this).attr('data-link') !== "") {
                    window.open($(this).attr('data-link'), '_blank');
                }
            });

        }


    }
})(jQuery);



if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
    $(function() {
        var zIndexNumber = 1000;
        $('.wdg_altasbajas_result_01 div').each(function() {
            $(this).css('zIndex', zIndexNumber);
            zIndexNumber -= 10;
        });
    });
}