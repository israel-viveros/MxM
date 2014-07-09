/*!
 *   TIM Developer:
 *   Version: 1.1.4
 *   Copyright: Televisa Interactive Media (2014)
 */
;
(function() {
    $.fn.MxMAltasBajasDraft = function(options) {
        var setting = $.extend({
            'idTorneo': 0,
            'nameTournament': ''
        }, options);

        var wdg_playerdraft_01 = {
            urlData: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/draft/' + setting.nameTournament + '/teamdraft.js',
            tagWdgPlayerdraft: $("#containerwdg_playerdraft_01"),

            viewHtml: function(data) {
                var compras = "",
                    prestamos = "",
                    transf = "",
                    urlDraft = "";
                compras = data['draftPurchase'];
                prestamos = data['draftLoan'];
                transf = data['draftTransfers'];
                urlDraft = data['draftURL'];

                maquetado = "<div id='wdg_playerdraft_01' class='wdg_playerdraft_01'>";

                maquetado += "<div class='titulo textcolor-title2'><h2>Balance en el Draft</h2></div>";
                maquetado += "<div class='div1 dotted-right'>Compras <div class='gris'>" + compras + "</div></div>";
                maquetado += "<div class='div2'>Prestamos";
                maquetado += "<div class='gris'>" + prestamos + "</div>";
                maquetado += "</div>";
                maquetado += "<div class='dotted-top lineasep'></div>";
                maquetado += "<div class='div3'>Transferencias Draft";
                maquetado += "<div class='textcolor-title2'>" + transf + "</div>";
                maquetado += "</div>";
                maquetado += "<div class='subtitle'>";
                maquetado += "<div class='textcolor-title4'>Elige a tu jugador y vota</div>";
                maquetado += "</div>";
                maquetado += "<div class='scroll'>";
                maquetado += "<table class='tblDraft'>";
                maquetado += "<tbody>";

                maquetado += "<tr>";
                maquetado += "<th width='131' class='textcolor-title1'>JUGADOR</th>";
                maquetado += "<th width='78' class='textcolor-title1'>ADQUIRI&Oacute;</th>";
                maquetado += "<th width='68' class='textcolor-title1'>TRANSFIRI&Oacute;</th>";
                maquetado += "<th width='40' class='textcolor-title1'>OPERACI&Oacute;N</th>";
                maquetado += "<th width='45' class='textcolor-title1'>TD</th>";
                maquetado += "<th width='45' class='textcolor-title1'>AFICI&Oacute;N</th>";
                maquetado += "</tr>";


                maquetado += "<tr>";
                maquetado += "<td colspan='6' class='separador' style='position:relative; text-shadow:0px #fff;'></td>";
                maquetado += "</tr>";


                for (var i = 0; i < data['draftTeams'].length; i++) {
                    for (var n = 0; n < data['draftTeams'][i]['operation'].length; n++) {
                        var namePlayer = "",
                            acquire = "",
                            transfer = "",
                            type = "",
                            rantingTD = "",
                            ratingUser = "",
                            idOperation = "",
                            guidpoll = "",
                            guidsection = "",
                            guidfield = "";

                        idOperation = data['draftTeams'][i]['operation'][n]['id'];
                        namePlayer = data['draftTeams'][i]['operation'][n]['name'];
                        acquire = data['draftTeams'][i]['operation'][n]['acquire'];
                        transfer = data['draftTeams'][i]['operation'][n]['transfer'];
                        type = data['draftTeams'][i]['operation'][n]['type'];
                        rantingTD = data['draftTeams'][i]['operation'][n]['rantingTD'];
                        ratingUser = data['draftTeams'][i]['operation'][n]['ratingUser'];
                        guidpoll = data['draftTeams'][i]['operation'][n].guid_poll;
                        guidsection = data['draftTeams'][i]['operation'][n].guid_section;
                        guidfield = data['draftTeams'][i]['operation'][n].guid_field;
                        maquetado += "<tr class='vote_block' data-guidpoll=\"" + guidpoll + "\" data-guidfield=\"" + guidfield + "\" data-guidsection=\"" + guidsection + "\">";
                        maquetado += "<td class='dotted-right'>";
                        maquetado += "<h3>" + namePlayer + "</h3>";
                        maquetado += "</td>";
                        maquetado += "<td class='dotted-right'>" + acquire + "</td>";
                        maquetado += "<td class='dotted-right'>" + transfer + "</td>";
                        maquetado += "<td class='dotted-right'>" + type + "</td>";
                        maquetado += "<td class='dotted-right'>" + rantingTD + "</td>";
                        maquetado += "<td class='textcolor-title1'>" + ratingUser + "</td>";
                        maquetado += "</tr>";
                        if (typeof(data['draftTeams'][i]['operation'][n].guid_resp) !== "undefined") {
                            maquetado += "<tr>";
                            maquetado += "<td colspan='6' class='separador' style='position:relative; text-shadow: 0px 0px 0px #FFF;'>";
                            maquetado += "<div class='dotted-top'></div>";
                            maquetado += "<div class='qualifies'><div>califica al jugador</div></div>";
                            maquetado += "<div class='calification textcolor-title4'>";
                            maquetado += "<div><a href='#' data-guidfvl=\"" + data['draftTeams'][i]['operation'][n].guid_resp[0][1] + "\">5</a></div>";
                            maquetado += "<div><a href='#' data-guidfvl=\"" + data['draftTeams'][i]['operation'][n].guid_resp[1][1] + "\">6</a></div>";
                            maquetado += "<div><a href='#' data-guidfvl=\"" + data['draftTeams'][i]['operation'][n].guid_resp[2][1] + "\">7</a></div>";
                            maquetado += "<div><a href='#' data-guidfvl=\"" + data['draftTeams'][i]['operation'][n].guid_resp[3][1] + "\">8</a></div>";
                            maquetado += "<div><a href='#' data-guidfvl=\"" + data['draftTeams'][i]['operation'][n].guid_resp[4][1] + "\">9</a></div>";
                            maquetado += "<div><a href='#' data-guidfvl=\"" + data['draftTeams'][i]['operation'][n].guid_resp[5][1] + "\">10</a></div>";
                            maquetado += "</div>";
                            maquetado += "<div class='participated  textcolor-title4'>";
                            maquetado += "<div class='voted'><p>Gracias por votar <i class='tvsa-like'></i></p></div>";
                            maquetado += "</div>";
                            maquetado += "</td>";
                            maquetado += "</tr>";
                        }
                    }
                }
                maquetado += "</tbody>";
                maquetado += "</table>";
                maquetado += "</div>";
                maquetado += "</div>";

                wdg_playerdraft_01.tagWdgPlayerdraft.html(maquetado);
                wdg_playerdraft_01.funcionesNaat();

            },

            cl_url: function(a) {
                b = a.search(/\?/);
                if (b != -1) {
                    b = a.search(/\=/);
                    if (b != -1) {
                        a = a.replace(/\=/g, "_");
                        a = a.replace(/\&/g, "/");
                        a = a.replace("?", "/no_clean_url/");
                    }
                }
                b = a.search(/\#/);
                if (b != -1) {
                    a = a.substring(0, b)
                }
                b = a.search(/\?/);
                if (b != -1) {
                    a = a.substring(0, b)
                }
                return a
            },

            funcionesNaat: function() {

                /*Para IPAD*/
                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft .vote_block').on('touchstart', function(e) {
                    //e.event.preventDefault();
                    if ($(window).width() > 624) {
                        var state = $(this).next('tr').find('td.separador .qualifies').css('display');
                        var state2 = $(this).next('tr').find('td.separador .calification').css('display');
                        var state3 = $(this).next('tr').find('td.separador .participated').css('display');
                        if (state != "none" || state2 != "none" || state3 != "none") {
                            $(this).next('tr').find('td.separador .qualifies').hide();
                            $(this).next('tr').find('td.separador .calification').hide();
                            $(this).next('tr').find('td.separador .participated').hide();
                            $(this).next('tr').find('td.separador .dotted-top').show();
                        } else {
                            $(this).next('tr').find('td.separador .qualifies').show();
                            $(this).next('tr').find('td.separador .calification').show();
                            $(this).next('tr').find('td.separador .dotted-top').hide();
                        }
                        if (state2 == null && state3 == "none") {
                            $(this).next('tr').find('td.separador .qualifies').show();
                            $(this).next('tr').find('td.separador .participated').show();
                            $(this).next('tr').find('td.separador .dotted-top').hide();
                        }
                    } else {}
                });

                //Over del jugador
                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft .vote_block').mouseenter(function() {

                    //provisional
                    $(this).next('tr').find('td.separador .qualifies').show();


                    //$('.wdg_playerdraft_01 .scroll').height(1388);
                    //console.log($('.wdg_playerdraft_01 .scroll').height());

                    if ($(window).width() < 624) {
                        return;
                    }

                    // Cerramos TODOS las calificaciones
                    setCleanRecord();

                    $(this).next('tr').find('td.separador .dotted-top').hide();
                    $(this).next('tr').find('td.separador .qualifies').show();

                    // Verificamos si ya votaron
                    //alert($(this).next('tr').find(' td.separador .calification'));
                    if ($(this).next('tr').find(' td.separador .calification').length > 0) {
                        $(this).next('tr').find(' td.separador .calification').show();
                    } else {
                        $(this).next('tr').find(' td.separador .participated').show();
                    }

                });

                //Over del jugador
                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft ').mouseleave(function() {
                    //$('.wdg_playerdraft_01 .scroll').height(1342);
                    setCleanRecord();
                });

                //click calificacion
                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft .separador .calification a').click(function(event) {
                    event.preventDefault();
                    //Votacion...
                    var num_star = $(this).text(),
                        varTr = $(this).parents('tr'),
                        element = varTr.prev(),
                        firstElement = element.children(':first-child'),
                        porcentaje = element.children('.textcolor-title1');


                    var votewebservicePolls = new Image();
                    votewebservicePolls.src = "http://polls.esmas.com/calcularesultado/arreglo/@@@" + element.attr('data-guidpoll') + "@@@" + element.attr('data-guidsection') + "@@@" + element.attr('data-guidfield') + "@@@[" + element.attr('data-guidfield') + "&&&" + $(this).attr('data-guidfvl') + "]@@@@@@Sitio@@@MXM@@@Deportes@@@Futbol@@@Token-@@@CSIE-@@@Urlactual@@@SexodelUsuario@@@VIP@@@MX@@@Cuidad@@@Estado@@@1398889521@@@Mozilla@@@an%20unknown%20version@@@Mac@@@1440%20x%20900@@@Yes@@@Previous%20Page@@@es-mx@@@es-mx@@@es/voto/" + element.attr('data-guidfield') + "&&&" + $(this).attr('data-guidfvl');


                    $(this).parents('.calification').hide();

                    $(this).parents('.separador').find('.participated').fadeIn().delay(1000).fadeOut(function() {
                        // Animation complete.
                        $(this).parents('.separador').find('.qualifies').hide();
                        $(this).parents('.separador').find('.dotted-top').show();

                    });

                    $(this).parents('.calification').remove();

                });


                $('.containerwdg_playerdraft_01 .wdg_playerdraft_01 .tblDraft .separador .participated').mouseout(function() {
                    $(this).hide();
                    $(this).parents('.separador').find('.qualifies').hide();
                    $(this).parents('.separador').find('.dotted-top').show();

                });

                function setCleanRecord() {
                    $('.wdg_playerdraft_01 .tblDraft td.separador .calification').hide();
                    $('.wdg_playerdraft_01 .tblDraft td.separador .participated').hide();
                    $('.wdg_playerdraft_01 .tblDraft td.separador .qualifies').hide();
                    $('.wdg_playerdraft_01 .tblDraft td.separador .dotted-top').show();
                }

                if ($.browser.msie && parseInt($.browser.version, 10) <= 8) {
                    $('.wdg_playerdraft_01 .tblDraft td').css('display', 'block');
                    $('.wdg_playerdraft_01 .tblDraft th').css('display', 'block');
                }

            },

            getDataDraft: function() {
                $.ajax({
                    url: wdg_playerdraft_01.urlData,
                    type: "GET",
                    dataType: 'jsonp',
                    jsonpCallback: 'teamDraft',
                    cache: false,
                    success: function(data) {
                        wdg_playerdraft_01.viewHtml(data);
                    },
                    error: function(data) {
                        console.log("ERROR___");
                    }
                });
            }
        }

        wdg_playerdraft_01.getDataDraft();

    };


})(jQuery);