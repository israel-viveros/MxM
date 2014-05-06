/*!
 *   TIM Developer: Israel Viveros
 *   Version: 1.0
 *   Copyright: Televisa Interactive Media (2014)
 */
;
(function() {
    $.fn.mxmLiveDraft = function(opciones) {
        var setting = $.extend({
            'idTournament': 0
        }, opciones);

        var globalThis = this;

        var objLiveDraft = {
            feedActions: 'http://lab.israelviveros.com/draft/' + setting.idTournament + '/feed.js',

            drawMaquetado: function() {
                var maquetado = "";
                maquetado += '<div class="wdg_mxm_live_03"> ';

                maquetado += '<div class="scroll">';
                maquetado += '<div class="wdg_mxm_live_03_status">';
                maquetado += '<ul class="wdg_mxm_live_03_list"></ul>';
                maquetado += '</div></div>';
                maquetado += '<div class="arrow_buttons"> ';
                maquetado += '<a href="#" title="Link Description" class="prev ui-link"><div class="dropdown-white"><i class="tvsa-caret-up"></i></div></a> ';
                maquetado += '<a href="#" title="Link Description" class="next ui-link"><div class="dropdown-white"><i class="tvsa-caret-down"></i></div></a>  ';
                maquetado += '</div>';
                maquetado += '<div class="degraded"></div>';
                maquetado += '</div>';

                globalThis.html(maquetado);
                try {
                    objLiveDraft.loadFeed();
                } catch (e) {
                    console.log(e);
                }

            },


            loadFeed: function() {
                var maquetado = "";
                $.ajax({
                    url: objLiveDraft.feedActions,
                    type: 'GET',
                    jsonpCallback: 'actionsDraft',
                    dataType: 'jsonp',
                    cache: false

                })
                    .done(function(data) {
                        console.log(data)
                        for (var i = 0; i < data.length; i++) {
                            var fecha = String(data[i].fecha).split("/");
                            var nombreMes = "";
                            switch (parseInt(fecha[1])) {
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

                            }
                            maquetado += '<li>';
                            maquetado += '<div class="textcolor-title2 time">' + fecha[0] + ' ' + nombreMes + '</div>';
                            maquetado += '<div class="chronic">';
                            maquetado += '<div class="logoTeam"><img src="' + data[i].icon + '" alt="Image description"> </div>';
                            maquetado += (typeof(data[i].Jugador) !== "undefined") ? '<h2>' + data[i].Jugador + '</h2>' : '';
                            maquetado += (typeof(data[i].descripcion) !== "undefined") ? '<div class="chronic_description">' + data[i].descripcion + '</div>' : '';
                            maquetado += '</div>';
                            maquetado += '</li>';
                        };

                        globalThis.find("ul.wdg_mxm_live_03_list").html(maquetado);

                        objLiveDraft.funcionesNAAT();
                    })
                    .fail(function() {
                        console.log("error al cargar el feed " + objLiveDraft.feedActions);
                    })


            },

            funcionesNAAT: function() {


                ;
                jQuery(function($) {
                    (function($, T) {

                        function ocultar() {
                            $('.wdg_mxm_live_03 .not_here').hide();
                            $('.wdg_mxm_live_03 .vid_player_01 .not_here').hide();
                            $('.wdg_mxm_live_03 .img_stage_01 .not_here').hide();
                            $('.wdg_mxm_live_03 .vid_player_01 .not_here').css('display', 'none');
                            $('.wdg_mxm_live_03 .img_stage_01 .not_here').css('display', 'none');
                            $('.wdg_mxm_live_03 .tvsa-videocamera').removeClass("tvsa-mxm-close");
                            $('.wdg_mxm_live_03 .tvsa-camera').show();
                        };


                        $('.wdg_mxm_live_03').each(function(ix, element) {

                            var $this = $(this),
                                Pointer = {
                                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                                },
                                $theUl = $this.find('.wdg_mxm_live_03_list');


                            $this.find('a.prev, a.next').click(function(event) {
                                event.preventDefault();
                            });

                            $this.find('a.prev').bind(Pointer.DOWN, function() {
                                $('.wdg_mxm_live_03 .scroll').animate({
                                    'scrollTop': $('.wdg_mxm_live_03 .scroll').scrollTop() - $theUl.height()
                                }, 500);
                            });

                            $this.find('a.next').bind(Pointer.DOWN, function() {
                                $('.wdg_mxm_live_03 .scroll').animate({
                                    'scrollTop': $('.wdg_mxm_live_03 .scroll').scrollTop() + $theUl.height()
                                }, 500);

                            });

                        });

                        $('.wdg_mxm_live_03 .wdg_mxm_live_03_verMas').click(function(event) {
                            event.preventDefault();
                            $('.wdg_mxm_live_03 ul').css('height', 'auto');
                            $('.wdg_mxm_live_03 .wdg_mxm_live_03_verMas').hide();
                            $('.wdg_mxm_live_03 .degradado').hide();
                        });

                        var activo_img = 0;
                        var activo_vid = 0;
                        $('.wdg_mxm_live_03 .tvsa-camera').on('click', function(event) {

                            $('.wdg_mxm_live_03 .tvsa-videocamera').removeClass("textcolor-title1");
                            $('.wdg_mxm_live_03 .tvsa-camera').removeClass("textcolor-title1");
                            $('.wdg_mxm_live_03 .vid_player_01').removeClass('here').addClass('not_here');
                            $('.wdg_mxm_live_03 .img_stage_01').removeClass('here').addClass('not_here');
                            $(this).parent().next('.img_stage_01').removeClass('not_here').addClass('here');
                            ocultar();

                            var edo_this = $(this).parent().next('.img_stage_01').css('display');
                            if (edo_this == 'block') {
                                $(this).parent().next('.img_stage_01').removeClass('here').addClass('not_here');
                                $(this).parent().next('.img_stage_01').hide();
                                $(this).addClass("textcolor-title1");

                            } else {
                                $(this).parent().next('.img_stage_01').show();
                            }

                            $(this).toggleClass("textcolor-title1");
                            $(this).parent().siblings('.not_here').hide();
                            $(this).parent().siblings('.vid_player_01').hide();
                            $(this).parent().siblings('.icon-interactive').find('i').removeClass("textcolor-title1");
                            $(this).toggleClass('tvsa-mxm-close');
                        });
                        $('.wdg_mxm_live_03 .tvsa-videocamera').on('click', function(event) {
                            /*console.log( $(this).parent().siblings('.vid_player_01'));
            $alt_prev = $(this).parent().attr('data-nombre');
            $alt_prev2 = $(this).parent().attr('class')
            $hermano_del_padre = $(this).parent().siblings('.chronic');
            console.log($(this).parent().siblings('.chronic'));*/
                            //console.log("entro: "+$(this).attr('class'));
                            $('.tvsa-videocamera').removeClass("active");
                            activo_vid = $(this).attr('class');
                            if (activo_vid == "tvsa-videocamera") {
                                /*Esconder todo*/
                                $('.vid_player_01').hide();
                                $('.tvsa-videocamera').removeClass("tvsa-mxm-close");
                                $('.tvsa-videocamera').removeClass("textcolor-title1");
                                $('.img_stage_01').hide();
                                $('.tvsa-camera').removeClass("textcolor-title1");
                                $('.tvsa-camera').show();
                                //alert("mostrar video");       
                                /*.............*/

                            }
                            //vsa-videocamera textcolor-title1 active tvsa-error
                            $(this).addClass("active");
                            $(this).parent().siblings('.vid_player_01').toggle();
                            $(this).toggleClass("textcolor-title1");
                            $(this).parent().siblings('.img_stage_01').hide();
                            //$(this).parent().siblings('.icon-interactive2').find('i').toggle();
                            $(this).toggleClass('tvsa-mxm-close');
                            activo_vid2 = $(this).attr('class');
                            $('.wdg_mxm_live_03 .tvsa-camera').removeClass("tvsa-mxm-close");
                            $('tvsa-camera').show();
                            if (activo_vid2 == "tvsa-videocamera active") {
                                //alert("cerrar video");
                                $('.tvsa-videocamera').removeClass("active");
                            }
                            //console.log("salgo: "+$(this).attr('class'));
                        });



                        $('.wdg_mxm_live_03 .scroll').scroll(function() {
                            var altura = $('.wdg_mxm_live_03 .wdg_mxm_live_03_list').height();
                            $scrollTop = parseInt($('.wdg_mxm_live_03 .scroll').scrollTop()) + parseInt($('.wdg_mxm_live_03 .scroll').height());
                            if (parseInt($scrollTop) == parseInt(altura)) {
                                $('.wdg_mxm_live_03 .degraded').css("visibility", "hidden");
                            } else {
                                $('.wdg_mxm_live_03 .degraded').css("visibility", "visible");
                            }
                        });

                    })($, Televisa);
                });




            }

        };

        objLiveDraft.drawMaquetado();

    };

})(jQuery);