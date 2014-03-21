;
(function() {

    $.fn.wdgMxmLive = function(options) {
        var settings = $.extend({
            'idjornada': 0,
            'idmatch': 0,
            'title': ''
        }, options);

        var globalThis = this;


        var wdgLiveObj = {
            urlFinal: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + settings.idjornada + '/' + settings.idmatch + '/match_mxm.js',
            callback: 'datamxmvivo',
            urlfeedHeader: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + settings.idjornada + '/' + settings.idmatch + '/match_header.js',
            feedCallbackHeader: 'mxmheader',

            inicio: function() {
                Maquetado = '';
                Maquetado += '<div class="wdg_mxm_live_04_title textcolor-title1">' + settings.title + '</div>';
                Maquetado += '<div class="wdg_mxm_live_04_status">';
                Maquetado += '<ul class="wdg_mxm_live_04_list" id="pintaAcciones"></ul>';
                Maquetado += '</div>';
                Maquetado += '<div class="see_less textcolor-title4">Ocultar</div>';

                globalThis.html(Maquetado);

                wdgLiveObj.loadMaster();
            },

            loadMaster: function() {
                var guuid = Math.floor((1 + Math.random()) * 0x10000).toString(16);
                var item = "",
                    icono = "";
                $.ajax({
                    url: wdgLiveObj.urlFinal,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: wdgLiveObj.callback,
                    cache: false
                })
                    .done(function(data) {

                        for (var i = 0; i < data.actionsMXM.length; i++) {
                            var video = "",
                                galeria = "";
                        //console.log(data.actionsMXM[i].type.toLowerCase());
                            switch (data.actionsMXM[i].type.toLowerCase()) {
                                case "amonestacion":
                                    icono = "mxm-yellowcard";
                                    break;
                                case "autogol":
                                    icono = "mxm-owngoal";
                                    break;
                                case "comentario":
                                    icono = "mxm-comment";
                                    break;
                                case "datoestadistico":
                                    icono = "mxm-statisticdata";
                                    break;
                                case "desdeafueradelarea":
                                    icono = "mxm-offside";
                                    break;
                                case "elpartidohasidosuspendido":
                                    icono = "";
                                    break;
                                case "empiezasegundotiempo":
                                    icono = "mxm-startsecondhalf";
                                    break;
                                case "empiezanpenales":
                                    icono = "mxm-penalties";
                                    break;
                                case "expulsion":
                                    icono = "mxm-redcard";
                                    break;
                                case "fallaelpenal":
                                    icono = "mxm-out";
                                    break;
                                case "finalizaelpartido":
                                    icono = "mxm-gameend";
                                    break;
                                case "fueradelugar":
                                    icono = "mxm-offside";
                                    break;
                                case "twitter":
                                    icono = "twitter";
                                    break;
                                case "gol":
                                    icono = "mxm-goal";
                                    break;
                                case "iniciaelsegundotiempo":
                                    icono = "mxm-startsecondhalf";
                                    break;
                                case "iniciaprimertiempoextra":
                                    icono = "mxm-startextrafirsthalf";
                                    break;
                                case "iniciasegundotiempoextra":
                                    icono = "mxm-startextrasecondhalf";
                                    break;
                                case "pasaporafuera":
                                    icono = "mxm-out";
                                    break;
                                case "pegaenelposte":
                                    icono = "mxm-crossbar";
                                    break;
                                case "penal":
                                    icono = "mxm-penaltykick";
                                    break;
                                case "segundaamonestacion":
                                    icono = "mxm-secondyellowcard";
                                    break;
                                case "terminaprimertiempo":
                                    icono = "mxm-gameend";
                                    break;
                                case "terminaprimertiempoextra":
                                    icono = "mxm-gameend";
                                    break;
                                case "terminasegundotiempo":
                                    icono = "mxm-gameend";
                                    break;
                                case "terminasegundotiempoextra":
                                    icono = "mxm-gameend";
                                    break;
                                case "falta":
                                    icono = "mxm-foul";
                                    break;
                                case "tirodeesquina":
                                    icono = "mxm-cornerkick";
                                    break;
                                case "entraaljuego":
                                    icono = "mxm-playerin";
                                    break;
                                default:
                                    icono = "";
                                    break;

                            }

                            item += '<li data-id="' + guuid + '" style="display:none">';
                            item += (icono === "twitter") ? '<div class="time-icon twitter">' : '<div class="time-icon">';
                            item += '<div class="textcolor-title6 time">' + data.actionsMXM[i].minute + '\'</div>';
                            if (icono === "twitter") {
                                item += '<div class="icon-time"><i class="tvsa-twitter"></i></div>';
                            } else {
                                item += '<div class="icon-time"><i class="tvsa-' + icono + '"></i></div>';
                            }
                            item += '</div>';
                            item += (icono !== "twitter") ? '<div class="chronic"><span>' + data.actionsMXM[i].description + '</span></div>' : '';

                            if (icono === "twitter") {
                                var comaA = data.actionsMXM[i].description.replace(",", "|")
                                var coma = comaA.split("|");
                                var usertw = coma[0].split("@");
                                item += '<div class="chronic">';
                                item += '<p class="textcolor-title2">' + usertw[0] + '<span class="textcolor-title4">@' + usertw[1] + '</span></p>';
                                item += '<p>' + coma[1] + '</p></div>';
                            }


                            if (typeof data.actionsMXM[i].datarelated !== "undefined") {

                                for (var l = 0; l < data.actionsMXM[i].datarelated.length; l++) {
                                    if (data.actionsMXM[i].datarelated[l].type.toLowerCase() === "galeria") {
                                        galeria += '<div class="img_stage_01 not_here" style="display: none;">';
                                        galeria += '<div class="img_stage_01_image"> <img src="' + data.actionsMXM[i].datarelated[l].url + '" alt="Image description"> </div>';

                                        if (typeof data.actionsMXM[i].datarelated[l].imagenTitulo !== "undefined" && typeof data.actionsMXM[i].datarelated[l].imagenDesc !== "undefined") {
                                            galeria += (data.actionsMXM[i].datarelated[l].imagenDesc !== "") ? '<a class="img_stage_01_whtbkg" href="#"><p class="img_stage_01_black">' + data.actionsMXM[i].datarelated[l].imagenTitulo + '</p>' : '';
                                            galeria += (data.actionsMXM[i].datarelated[l].imagenTitulo !== "") ? '<p class="img_stage_01_gray">' + data.actionsMXM[i].datarelated[l].imagenDesc + '</p></a>' : '';
                                            galeria += '</div>';
                                        }
                                    }

                                    if (data.actionsMXM[i].datarelated[l].type.toLowerCase() === "video") {
                                        video += '<div class="vid_player_01 not_here" style="display: none;">';
                                        video += '<div class="vid_player_01_image">';
                                        video += '<iframe width="100%" height="100%" src="" data-id="' + data.actionsMXM[i].datarelated[l].id + '" ></iframe>';
                                        video += '<div class="theaterContainer">';
                                        video += '<div class="theaterSideSpacer"></div>';
                                        video += '<div class="theaterContainerVideo">';
                                        video += '<div class="videoLink"></div>';
                                        video += '<div class="contenedor"></div>';
                                        video += '</div>';
                                        video += '<div class="theaterSideSpacer"></div>';
                                        video += '</div>';
                                        video += '<div class="companionBanner"></div>';
                                        video += '</div>';
                                        /*video += '<a href="javascript: void(0);"> <i class="tvsa-play" id="videobtn"></i> </a>';
									video += '<div class="vid_player_01_whtbkg">';
									video += '<p class="vid_player_01_black">Video Title</p>';
									video += '</div>';*/
                                        video += '</div>';
                                    }

                                };

                            };

                            item += (video !== "") ? '<div class="icon-interactive textcolor-title4"> <i class="tvsa-videocamera"></i><i class="tvsa-error not-displayed"></i> </div>' : '';
                            item += (galeria !== "") ? '<div class="icon-interactive2 dotted-right textcolor-title4"> <i class="tvsa-camera"></i> </div>' : '';

                            item += galeria + video;




                            item += '</li>';

                        };


                        globalThis.find("#pintaAcciones").html(item);
                        $("[data-id=" + guuid + "]").fadeIn('slow');

                        wdgLiveObj.funciones();


                    })
                    .fail(function() {
                        console.log("error");
                    })



            },

            funciones: function() {

                globalThis.find('.tvsa-camera').live('click', function(event) {
                    event.preventDefault();
                    var parentContainer = $(this).parent().siblings('.img_stage_01');
                    if (!$(this).hasClass('active')) {
                        $('.tvsa-camera').removeClass('active textcolor-title1 tvsa-error');
                        $(this).addClass('active textcolor-title1 tvsa-error');
                        $('.img_stage_01').slideUp('slow');
                        parentContainer.slideDown('slow', function() {});
                    } else {
                        $(this).removeClass('active textcolor-title1 tvsa-error');
                        parentContainer.slideUp('slow');
                    }


                });

                globalThis.find('.tvsa-videocamera').live('click', function(event) {
                    event.preventDefault();
                    var parentContainer = $(this).parent().siblings('.vid_player_01.not_here');
                    var iframeChild, heightac;
                    if (!$(this).hasClass('active')) {
                        $('.tvsa-videocamera').removeClass('active textcolor-title1 tvsa-error');
                        $(this).addClass('active textcolor-title1 tvsa-error');
                        $('.vid_player_01.not_here').slideUp('slow').find('iframe').attr({
                            'src': ''
                        });
                        parentContainer.slideDown('slow', function() {
                            heightac = parseInt($(this).outerWidth() * 9 / 16);
                            $(this).height(heightac);
                            $(this).find('.vid_player_01_image').height(heightac);
                            iframeChild = $(this).find('iframe');
                            iframeChild.attr({
                                'src': 'http://tv.televisadeportes.esmas.com/embed/embed_ampp.php?id=' + iframeChild.data('id') + '&w=' + $(this).outerWidth() + '&h=' + heightac + ''
                            });
                        });


                    } else {
                        $(this).removeClass('active textcolor-title1 tvsa-error');
                        parentContainer.slideUp('slow', function() {
                            iframeChild = $(this).find('iframe');
                            iframeChild.attr({
                                'src': ''
                            });
                        });
                    }

                });

                wdgLiveObj.header();


            },
            header: function() {
                $.ajax({
                    url: wdgLiveObj.urlfeedHeader,
                    jsonpCallback: wdgLiveObj.feedCallbackHeader,
                    type: 'GET',
                    dataType: 'jsonp'
                })
                    .done(function(data) {
                        wdgLiveObj.timeUpdate(data.fechaPartido, data.horaPartido);
                    })
                    .fail(function() {
                        console.log("Error al cargar el header " + wdgLiveObj.urlfeedHeader);
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
                                setInterval(function() {
                                    wdgLiveObj.updateMxm()
                                }, tiempoActualizacion);
                                //setInterval(function(){wdgLiveObj.updateMxm()},10000);
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
            updateMxm: function() {
                var item = "",
                    icono = "";
                $.ajax({
                    url: wdgLiveObj.urlFinal,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: wdgLiveObj.callback,
                    cache: false
                })
                    .done(function(data) {
                        var guuid = Math.floor((1 + Math.random()) * 0x10000).toString(16);
                        var TotalItemNow = globalThis.find("#pintaAcciones").children('li').size();
                        var totalitemNew = data.actionsMXM.length;
                        //console.log(totalitemNew+">"+TotalItemNow);
                        if (totalitemNew > TotalItemNow) {
                            //actualizo
                            var ItemsNuevos = totalitemNew - TotalItemNow;

                            for (var i = 0; i < ItemsNuevos; i++) {
                                //console.log(data.actionsMXM[i]);


                                var video = "",
                                    galeria = "";

                                switch (data.actionsMXM[i].type.toLowerCase()) {
                                    case "fueradelarea":
                                        icono = "";
                                        break;
                                    case "centroalarea":
                                        icono = "";
                                        break;
                                    case "tirodeesquina":
                                        icono = "";
                                        break;
                                    case "disparoagol":
                                        icono = "";
                                        break;
                                    case "atajada":
                                        icono = "block";
                                        break;
                                    case "comentario":
                                        icono = "";
                                        break;
                                    case "gollocal":
                                        icono = "goal";
                                        break;
                                    case "saledeljuego":
                                        icono = "";
                                        break;
                                    case "entraaljuego":
                                        icono = "";
                                        break;
                                    case "empiezasegundotiempo":
                                        icono = "gameend";
                                        break;
                                    case "golvisitante":
                                        icono = "goal";
                                        break;
                                    case "amonestacion":
                                        icono = "yellowcard";
                                        break;
                                    case "twitter":
                                        icono = "twitter";
                                        break;
                                }

                                item += '<li data-id="' + guuid + '" style="display:none">';
                                item += (icono === "twitter") ? '<div class="time-icon twitter">' : '<div class="time-icon">';
                                item += '<div class="textcolor-title6 time">' + data.actionsMXM[i].minute + '\'</div>';
                                if (icono === "twitter") {
                                    item += '<div class="icon-time"><i class="tvsa-' + icono + '"></i></div>';
                                } else {
                                    item += '<div class="icon-time"><i class="tvsa-mxm-' + icono + '"></i></div>';
                                }

                                item += '</div>';
                            item += (icono !== "twitter") ? '<div class="chronic"><span>' + data.actionsMXM[i].description + '</span></div>' : '';

                                if (icono === "twitter") {
                                    var comaA = data.actionsMXM[i].description.replace(",", "|")
                                    var coma = comaA.split("|");
                                    var usertw = coma[0].split("@");
                                    item += '<div class="chronic">';
                                    item += '<p class="textcolor-title2">' + usertw[0] + '<span class="textcolor-title4">@' + usertw[1] + '</span></p>';
                                    item += '<p>' + coma[1] + '</p></div>';
                                }


                                if (typeof data.actionsMXM[i].datarelated !== "undefined") {

                                    for (var l = 0; l < data.actionsMXM[i].datarelated.length; l++) {
                                        if (data.actionsMXM[i].datarelated[l].type.toLowerCase() === "galeria") {
                                            galeria += '<div class="img_stage_01 not_here" style="display: none;">';
                                            galeria += '<div class="img_stage_01_image"> <img src="' + data.actionsMXM[i].datarelated[l].url + '" alt="Image description"> </div>';

                                            if (typeof data.actionsMXM[i].datarelated[l].imagenTitulo !== "undefined" && typeof data.actionsMXM[i].datarelated[l].imagenDesc !== "undefined") {
                                                galeria += (data.actionsMXM[i].datarelated[l].imagenDesc !== "") ? '<a class="img_stage_01_whtbkg" href="#"><p class="img_stage_01_black">' + data.actionsMXM[i].datarelated[l].imagenTitulo + '</p>' : '';
                                                galeria += (data.actionsMXM[i].datarelated[l].imagenTitulo !== "") ? '<p class="img_stage_01_gray">' + data.actionsMXM[i].datarelated[l].imagenDesc + '</p></a>' : '';
                                                galeria += '</div>';
                                            }
                                        }

                                        if (data.actionsMXM[i].datarelated[l].type.toLowerCase() === "video") {
                                            video += '<div class="vid_player_01 not_here" style="display: none;">';
                                            video += '<div class="vid_player_01_image">';
                                            video += '<iframe width="100%" height="100%" src="" data-id="' + data.actionsMXM[i].datarelated[l].id + '" ></iframe>';
                                            video += '<div class="theaterContainer">';
                                            video += '<div class="theaterSideSpacer"></div>';
                                            video += '<div class="theaterContainerVideo">';
                                            video += '<div class="videoLink"></div>';
                                            video += '<div class="contenedor"></div>';
                                            video += '</div>';
                                            video += '<div class="theaterSideSpacer"></div>';
                                            video += '</div>';
                                            video += '<div class="companionBanner"></div>';
                                            video += '</div>';
                                            /*video += '<a href="javascript: void(0);"> <i class="tvsa-play" id="videobtn"></i> </a>';
									video += '<div class="vid_player_01_whtbkg">';
									video += '<p class="vid_player_01_black">Video Title</p>';
									video += '</div>';*/
                                            video += '</div>';
                                        }

                                    };

                                };

                                item += (video !== "") ? '<div class="icon-interactive textcolor-title4"> <i class="tvsa-videocamera"></i><i class="tvsa-error not-displayed"></i> </div>' : '';
                                item += (galeria !== "") ? '<div class="icon-interactive2 dotted-right textcolor-title4"> <i class="tvsa-camera"></i> </div>' : '';

                                item += galeria + video;




                                item += '</li>';



                            }

                            globalThis.find("#pintaAcciones").prepend(item);
                            $("li[data-id=" + guuid + "]").slideDown('slow');



                        }
                    })
                    .fail(function() {
                        console.log("Error al actualizar: " + wdgLiveObj.urlFinal);

                    })


            }


        }; // END wdgLiveObj


        (settings.idjornada !== 0 && settings.idmatch !== 0) ? wdgLiveObj.inicio() : '';

    }

})(jQuery);