/*your js code */ ;
(function() {
    //-----------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------

    var resultadoGlobal;

    $.fn.MxMRating = function(options) {
        var setting = $.extend({
            'idTorneo': 0,
            'idEvento': 0,
            'idEquipo': 0,
            'idEquipo2': 0,
            'title': ''
        }, options);
        console.log("idTorneo:" + setting.idTorneo + " idEvento:" + setting.idEvento + " idEquipo:" + setting.idEquipo + " idEquipo2:" + setting.idEquipo2 + " title:" + setting.title);
        var GlobalThis = this;

        var wdg_mxm_rating = {
            urlfeedDropLocal: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/clubes/' + setting.idEquipo + '/matchesclub.js',
            urlfeedDropVisit: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/clubes/' + setting.idEquipo2 + '/matchesclub.js',
            urlFinalAlineacion: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/match_lineup.js',
            urlMatchHeader: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/match_header.js',
            urlPlayerDetail: 'http://mxm.televisadeportes.esmas.com/futbol/data/' + setting.idTorneo + '/' + setting.idEvento + '/gameplayerdetailjsonp.js',
            tagRating: $("#containerwdg_mxm_rating_01"),

            //Metodo para colocar la posicion del jugador
            posicionTexto: function(posicion) {
                console.log(wdg_mxm_rating.urlfeedDropLocal);
                var posicionTexto;
                switch (posicion) {
                    case "GK":
                        posicionTexto = "Portero";
                        break;
                    case "D":
                        posicionTexto = "Defensa";
                        break;
                    case "MF":
                        posicionTexto = "Medio";
                        break;
                    case "F":
                        posicionTexto = "Delantero";
                        break;

                    default:
                        posicionTexto = "<span style='display:block; height:10px; width:50px;'>";
                }
                return posicionTexto;
            },

            pintaInfo: function(dataAlineacion, dataMatchHeader, dataGamePlayer) {
                var equipo = new Array();
                var equipoMatch = new Array();
                var textoPosicion;
                var nombreJugador;
                var posicion;
                var playerDetailPorcentaje;

                equipo[0] = "lineupLocal";
                equipo[1] = "lineupVisit";
                equipoMatch[0] = "equipoLocal";
                equipoMatch[1] = "equipoVisitante";

                var logoLocal = dataMatchHeader[equipoMatch[0]]['smallImage'];
                var logoVisitante = dataMatchHeader[equipoMatch[1]]['smallImage'];
                var nombreLocal = dataMatchHeader[equipoMatch[0]]['nombre'];
                var nombreVisit = dataMatchHeader[equipoMatch[1]]['nombre'];
                var regLocal = dataAlineacion[equipo[0]]['team'].length;
                var regVisit = dataAlineacion[equipo[1]]['team'].length;
                var regbancaLocal = dataAlineacion[equipo[0]]['substitutes'].length;
                var regbancaVisit = dataAlineacion[equipo[1]]['substitutes'].length;
                var regPlayerDetail = dataGamePlayer.poll['answers']['answer'].length;

                //ALINEACION LOCAL
                var maquetado = "";
                maquetado += "<div class='wdg_rate_player_01' data-enhance='false'>";
                maquetado += "<div class='qualifies textcolor-title4'>Elige a tu jugador y vota</div>";
                maquetado += "<table><tr><td class='header_team'><table class='head_table'><tr>";
                maquetado += "<th><img alt='' src='" + logoLocal + "'></th>";
                maquetado += "<th colspan='3' class='equipo'><p class='title_team textcolor-title1'>" + nombreLocal + "</p></th>";

                maquetado += "<th><p class='title_td textcolor-title4 dotted-right'>TD</p></th>";
                maquetado += "<th><p class='title_afision textcolor-title1'>Afici&oacute;n</p></th>";
                maquetado += "</tr>";
                maquetado += "<tr class='dotted-right'>";
                maquetado += "<th colspan='6' class='day_relative'>";

                //Drop Equipo Local
                maquetado += '<div class="jornada" style="z-index: 910;">';
                maquetado += '<div class="wdg_lineup_01_dropdown drop1" style="z-index: 900;">';
                maquetado += '<div class="wdg_lineup_01_dropdowncontent" style="z-index: 890;">';
                maquetado += '<p id="nameJALocal"></p>';
                maquetado += '<span class="sprite dropdown-gray"></span></div>';

                maquetado += '<div class="wdg_lineup_01_listcontainer" style="z-index: 880;">';
                maquetado += '<ul class="wdg_lineup_01_dropdownlist" id="TIMPALocal"></ul>  ';
                maquetado += '</div>';

                maquetado += '</div>';
                maquetado += '</div>';

                maquetado += '<div style="clear: both; z-index: 870;"></div>';
                //....

                maquetado += "</th></tr>";
                maquetado += "</table>";
                maquetado += "<table class='dotted-right'>";
                maquetado += "<thead><!-- Listbox --></thead>";
                maquetado += "<tbody>";
                for (var i = 0; i < regLocal; i++) {
                    nombreJugador = dataAlineacion[equipo[0]]['team'][i]['nickName'];
                    posicion = dataAlineacion[equipo[0]]['team'][i]['position'];
                    textoPosicion = wdg_mxm_rating.posicionTexto(posicion);
                    idEquipo = dataAlineacion[equipo[0]]['idTeam'];
                    numPlayer = dataAlineacion[equipo[0]]['team'][i]['number'];
                    idPlayer = dataAlineacion[equipo[0]]['team'][i]['guid'];
                    if (i == 0) {
                        maquetado += "<tr class='evaluation first_child'>";
                    } else {
                        maquetado += "<tr class='evaluation'>";
                    }
                    maquetado += "<td>";
                    maquetado += "<div class='conteiner_two'>";
                    maquetado += "<div class='vote_block vote dotted-bottom'>";
                    maquetado += "<div id ='" + idPlayer + "' class='player_name'><p>" + nombreJugador + "</p></div>";
                    //maquetado += "<input type='hidden' value="++">";
                    maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
                    //--Pintar porcentaje
                    for (var a = 0; a < regPlayerDetail; a++) {
                        var playerDetailClubId = dataGamePlayer.poll['answers']['answer'][a]['club'];
                        var playerDetailPlayerId = dataGamePlayer.poll['answers']['answer'][a]['number'];
                        if (idEquipo == playerDetailClubId && numPlayer == playerDetailPlayerId) {
                            playerDetailPorcentaje = parseFloat(dataGamePlayer.poll['answers']['answer'][a]['percent']).toFixed(1);
                        }
                    }
                    maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>" + playerDetailPorcentaje + "</p></div>";
                    maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='calification  textcolor-title4'>";
                    maquetado += "<div><p>5</p></div>";
                    maquetado += "<div><p>6</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
                    maquetado += "<div><p>8</p></div>";
                    maquetado += "<div><p>9</p></div>";
                    maquetado += "<div><p>10</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='participated  textcolor-title4'>";
                    maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
                    maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                    maquetado += "</div>";
                    maquetado += "</div>";
                    maquetado += "</td>";
                    maquetado += "</tr>";
                }
                maquetado += "</tbody></table></td>";

                //ALINEACION VISITANTE---
                maquetado += "<td class='header_team_ext'>";
                maquetado += "<table class='head_table2'>";
                maquetado += "<tr>";
                maquetado += "<th><img alt='' src='" + logoVisitante + "'></th>";
                maquetado += "<th colspan='2'><p class='title_team textcolor-title1'>" + nombreVisit + "</p></th>";
                maquetado += "<th><p class='title_td textcolor-title4 dotted-right'>TD</p></th>";
                maquetado += "<th><p class='title_afision textcolor-title1'>Afici&oacuten</p></th>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td colspan='6' class='day_relative2'>";

                //Drop Equipo Visitante...
                maquetado += '<div class="jornada" style="z-index: -1160;">';
                maquetado += '<div class="wdg_lineup_012_dropdown drop2" style="z-index: 800;">';
                maquetado += '<div class="wdg_lineup_012_dropdowncontent" style="z-index: 790;">';
                maquetado += '<p id="nameJAVisit"></p>';
                maquetado += '<span class="sprite dropdown-gray"></span>';
                maquetado += '</div>';
                maquetado += '<div class="wdg_lineup_012_listcontainer" style="z-index: 780;">';
                maquetado += '<ul class="wdg_lineup_012_dropdownlist" id="TIMPAVisit"></ul>  ';
                maquetado += '</div>';
                maquetado += '</div>'
                maquetado += '</div>';
                maquetado += '<div style="clear: both; z-index: 770;"></div>';

                maquetado += "</td>";
                maquetado += "</tr>";
                maquetado += "</table>";

                maquetado += "<table class='header_team_2'>";
                maquetado += "<thead><!-- Listbox --></thead>";
                maquetado += "<tbody>";
                for (var i = 0; i < regVisit; i++) {
                    nombreJugador = dataAlineacion[equipo[1]]['team'][i]['nickName'];
                    posicion = dataAlineacion[equipo[1]]['team'][i]['position'];
                    textoPosicion = wdg_mxm_rating.posicionTexto(posicion);
                    idEquipoVisit = dataAlineacion[equipo[1]]['idTeam'];
                    numPlayerVisit = dataAlineacion[equipo[1]]['team'][i]['number'];
                    idPlayer = dataAlineacion[equipo[1]]['team'][i]['guid'];
                    if (i == 0) {
                        maquetado += "<tr class='evaluation first_child'>";
                    } else {
                        maquetado += "<tr class='evaluation'>";
                    }
                    maquetado += "<td>";
                    maquetado += "<div class='conteiner_two'>";
                    maquetado += "<div class='vote_block vote dotted-bottom'>";
                    maquetado += "<div class='player_name' id='" + idPlayer + "'><p>" + nombreJugador + "</p></div>";
                    maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
                    //--Pintar porcentaje
                    for (var b = 0; b < regPlayerDetail; b++) {
                        var playerDetailClubIdVisit = dataGamePlayer.poll['answers']['answer'][b]['club'];
                        var playerDetailPlayerIdVisit = dataGamePlayer.poll['answers']['answer'][b]['number'];
                        if (idEquipoVisit == playerDetailClubIdVisit && numPlayerVisit == playerDetailPlayerIdVisit) {
                            playerDetailPorcVisit = parseFloat(dataGamePlayer.poll['answers']['answer'][b]['percent']).toFixed(1);
                        }
                    }
                    maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>" + playerDetailPorcVisit + "</p></div>";
                    maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='calification  textcolor-title4'>";
                    maquetado += "<div><p>5</p></div>";
                    maquetado += "<div><p>6</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
                    maquetado += "<div><p>8</p></div>";
                    maquetado += "<div><p>9</p></div>";
                    maquetado += "<div><p>10</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='participated  textcolor-title4'>";
                    maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
                    maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                    maquetado += "</div>";
                    maquetado += "</div>";
                    maquetado += "</td>";
                    maquetado += "</tr>";
                }
                maquetado += "</tbody></table></td></tr>";

                // ALINEACION BANCA 
                // Local
                maquetado += "<tr class='textcolor-title1'>";
                maquetado += "<td colspan='3' class='reserves'>Banca</td>";
                maquetado += "</tr>";
                maquetado += "<tr>";
                maquetado += "<td class='header_team dotted-right'>";
                maquetado += "<table>";
                maquetado += "<tbody>";
                for (var i = 0; i < regbancaLocal; i++) {
                    nombreJugador = dataAlineacion[equipo[0]]['substitutes'][i]['nickName'];
                    posicion = dataAlineacion[equipo[0]]['substitutes'][i]['position'];
                    textoPosicion = wdg_mxm_rating.posicionTexto(posicion);
                    if (i == 0) {
                        maquetado += "<tr class='evaluation first_child'>";
                    } else {
                        maquetado += "<tr class='evaluation'>";
                    }
                    maquetado += "<td>";
                    maquetado += "<div class='conteiner_two'>";
                    maquetado += "<div class='vote_block vote dotted-bottom'>";
                    maquetado += "<div class='player_name'><p>" + nombreJugador + "</p></div>";
                    maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
                    maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>0.00</p></div>";
                    maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='calification  textcolor-title4'>";
                    maquetado += "<div><p>5</p></div>";
                    maquetado += "<div><p>6</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
                    maquetado += "<div><p>8</p></div>";
                    maquetado += "<div><p>9</p></div>";
                    maquetado += "<div><p>10</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='participated  textcolor-title4'>";
                    maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
                    maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                    maquetado += "</div>";
                    maquetado += "</div>";
                    maquetado += "</td>";
                    maquetado += "</tr>";
                }

                maquetado += "</tbody></table></td>";

                // Visitante
                maquetado += "<td class='header_team_2 header_team_ext2'><table class='rate_team_2'><tbody>";
                for (var i = 0; i < regbancaVisit; i++) {
                    nombreJugador = dataAlineacion[equipo[1]]['substitutes'][i]['nickName'];
                    posicion = dataAlineacion[equipo[1]]['substitutes'][i]['position'];
                    textoPosicion = wdg_mxm_rating.posicionTexto(posicion);
                    if (i == 0) {
                        maquetado += "<tr class='evaluation first_child'>";
                    } else {
                        maquetado += "<tr class='evaluation'>";
                    }

                    maquetado += "<td>";
                    maquetado += "<div class='conteiner_two'>";
                    maquetado += "<div class='vote_block vote dotted-bottom'>";
                    maquetado += "<div class='player_name'><p>" + nombreJugador + "</p></div>";
                    maquetado += "<div class='div'><p class='textcolor-title4'>10</p></div>";
                    maquetado += "<div class='afision'><p class='textcolor-title1 dotted-left'>0.00</p></div>";
                    maquetado += "<div class='position'><p class='textcolor-title4'>" + textoPosicion + "</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='calification  textcolor-title4'>";
                    maquetado += "<div><p>5</p></div>";
                    maquetado += "<div><p>6</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div><p>7</p></div>";
                    maquetado += "<div><p>8</p></div>";
                    maquetado += "<div><p>9</p></div>";
                    maquetado += "<div><p>10</p></div>";
                    maquetado += "</div>";
                    maquetado += "<div class='participated  textcolor-title4'>";
                    maquetado += "<div class='voted'><p>Gracias por votar</p></div>";
                    maquetado += "<div><div class='qualifies'>califica al jugador</div></div>";
                    maquetado += "<div class='check'><i class='tvsa-like'></i></div>";
                    maquetado += "</div>";
                    maquetado += "</div>";
                    maquetado += "</td>";
                    maquetado += "</tr>";
                }
                maquetado += "</tbody>";
                maquetado += "</table>";
                maquetado += "</td></tr></table";
                maquetado += "</div>";

                wdg_mxm_rating.tagRating.html(maquetado);


                (setting.idEquipo !== 0) ? wdg_mxm_rating.loadDrops(wdg_mxm_rating.urlfeedDropLocal, TIMPALocal) : '';

                (setting.idEquipo2 !== 0) ? setTimeout(function() {
                    wdg_mxm_rating.loadDrops(wdg_mxm_rating.urlfeedDropVisit, TIMPAVisit);
                }, 1500) : '';

            },

            loadDrops: function(feed, ID) {
                $.ajax({
                    url: feed,
                    type: 'GET ',
                    dataType: 'jsonp',
                    jsonpCallback: 'effectivenessByTeam'
                })
                    .done(function(data) {
                        var tmp = "";
                        for (var i = 0; i < data.efectividad.length; i++) {
                            tmp += '<li><p data-matchid="' + data.efectividad[i].matchid + '">' + data.efectividad[i].weekName + '</p></li>';
                        };

                        $(ID).html(tmp);

                    })
                    .fail(function() {
                        console.log("error");
                    })

                var validaDrops = window.setInterval(function() {
                    $("#TIMPALocal").data("status", "chequed");
                    if ($("#TIMPALocal").children('li').size() === 0) {
                        $(".wdg_lineup_01_dropdown.drop1").unbind().css("cursor", "auto").find('span.sprite').removeClass('sprite');
                    }
                    if ($("#TIMPAVisit").children('li').size() === 0) {
                        $(".wdg_lineup_012_dropdown.drop2").unbind().css("cursor", "auto").find('span.sprite').removeClass('sprite');
                    }
                    if ($("#TIMPALocal").data("status") === "chequed") {
                        window.clearInterval(validaDrops);
                    }

                }, 5000);

            },

            //Obtener los Detalles de los jugadores
            getGamePlayerDetail: function(dataAlineacion, dataMatchHeader) {
                $.ajax({
                    url: wdg_mxm_rating.urlPlayerDetail,
                    type: "GET",
                    dataType: 'jsonp',
                    jsonpCallback: 'gameplayerdetail',
                    cache: false,
                    success: function(dataGamePlayer) {
                        wdg_mxm_rating.pintaInfo(dataAlineacion, dataMatchHeader, dataGamePlayer);
                    }
                });
            },

            //Obtiene el logotipo de los equipos y nombre
            getInfo: function(dataAlineacion) {
                $.ajax({
                    url: wdg_mxm_rating.urlMatchHeader,
                    dataType: 'jsonp',
                    jsonpCallback: 'mxmheader',
                    cache: false,
                    success: function(dataMatchHeader) {
                        wdg_mxm_rating.getGamePlayerDetail(dataAlineacion, dataMatchHeader)
                    }

                });
            },

            //-- Carga la alineacion
            loadAlineacion: function() {
                alert('alineacion');
                $.ajax({
                    url: wdg_mxm_rating.urlFinalAlineacion,
                    dataType: 'jsonp',
                    jsonpCallback: 'datagame',
                    cache: false,
                    success: function(dataAlineacion) {
                        wdg_mxm_rating.getInfo(dataAlineacion);
                    }
                });
            },

            //FUNCIONES NA-AT-------------------------------------------
            funcionesNaat: function() {

                var zIndexNumber = 1000;
                $('.wdg_mxm_rating_01 div').each(function() {
                    $(this).css('zIndex', zIndexNumber);
                    zIndexNumber -= 10;
                });
                // TODO: refactor for a better approach
                var $parent = $('.wdg_mxm_rating_01 table');
                var $dropdownAnchor = $parent.find('.wdg_lineup_01_dropdown');
                var $firstItem = $('.wdg_lineup_01_dropdownlist li:first-child');
                var $dropdownItems = $parent.find('.wdg_lineup_01_dropdownlist li');
                var $listItems = $('.wdg_lineup_01_dropdownlist')
                $('.wdg_lineup_01_dropdowncontent p').html($firstItem.find('p').html());

                $dropdownAnchor.bind('click', function(evt) {
                    console.log("DROP 1");
                    evt.preventDefault();
                    var lisItemsChild = $(this).children('.wdg_lineup_01_listcontainer').children('.wdg_lineup_01_dropdownlist:first-child');
                    var visibilidad = lisItemsChild.css('visibility');
                    visibilidadChild = $(this).children($listItems);
                    if (visibilidad == 'hidden') {
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

                    lisItemsChild.find("p").unbind('click').click(function(event) {
                        var idM = $(this).data("matchid");
                        setting.idEvento = idM;
                        console.log(setting.idEvento);
                        wdg_mxm_rating.loadAlineacion();
                        $("#nameJALocal").text($(this).text());
                    });
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


                $dropdownItems.bind('click', function(evt) {
                    $('.wdg_lineup_01_dropdowncontent p').html($(this).find('p').html());
                });
                // TODO: refactor for a better approach                    
                var $parent2 = $('.wdg_mxm_rating_01 table');
                var $dropdownAnchor2 = $parent2.find('.wdg_lineup_012_dropdown');
                var $firstItem2 = $('.wdg_lineup_012_dropdowncontent li:first-child');
                var $dropdownItems2 = $parent2.find('.wdg_lineup_012_dropdownlist li');
                var $listItems2 = $('.wdg_lineup_012_dropdownlist');

                $('.wdg_lineup_012_dropdowncontent p').html($firstItem2.find('p').html());

                $dropdownAnchor2.bind('click', function(evt) {
                    console.log("DROP 2");
                    evt.preventDefault();
                    var visibilidad = $(this).children('.wdg_lineup_012_listcontainer').children().css('visibility');
                    var lisItemsChild = $(this).children('.wdg_lineup_012_listcontainer').children();
                    if (visibilidad == 'hidden') {
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
                    lisItemsChild.find("p").unbind('click').click(function(event) {
                        var idM = $(this).data("matchid");
                        console.log($(this).data("matchid"));

                        //wdg_mxm_rating.loadDatacomplete(idM, 'drop');
                        var valorn = String($(this).text());
                        $("#nameJAVisit").text(valorn);
                    });
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

                $dropdownItems2.bind('click', function(evt) {
                    evt.preventDefault();
                    $('.wdg_lineup_012_dropdowncontent p').html($(this).find('p').html());
                });


                //-- MOSTRAR VOTACION
                //----
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
                    $(this).children('p').removeClass();
                    $(this).children('p').addClass('textcolor-title1');
                }).mouseleave(function() {
                    $(this).children('p').removeClass();
                    $(this).children('p').addClass('textcolor-title4');
                });


                $('.wdg_rate_player_01 .calification div').on('click', function() {


                    var votacion = $(this).children('p').text();
                    var padre = $(this).parent('div');
                    var hermano = padre.siblings('div.vote_block.vote.dotted-bottom');
                    var idPlayer = hermano.children('div').attr('id');


                    $.ajax({
                        url: wdg_mxm_rating.urlPlayerDetail,
                        type: 'GET ',
                        dataType: 'jsonp',
                        jsonpCallback: 'gameplayerdetail',
                        cache: false,
                    }).done(function(data) {
                        var tmp = '';
                        var guid_box = '';
                        var guid_spl = '';
                        var guid_sec = '';
                        var guid_fld = '';
                        var guid_fvl = '';
                        var guid_thm_spl = '';
                        var altern_field_value = 'Sitio';
                        var pixvote = new Image();
                        var cookieName = 'galleta';
                        var cookieName2 = 'galleta2';
                        var sefVPrograma = 'MXM';
                        var sefVCategoria = 'Deportes';
                        var sefVSubcategoria = 'Futbol';
                        var sefVToken = 'Token-';
                        var sefVCSIE = 'CSIE-';
                        var sefVUrlactual = 'Urlactual';
                        var sefVSexodelUsuario = 'SexodelUsuario';
                        var sefVIP = 'VIP';
                        var sefVCodigodelPais = 'MX';
                        var sefVCuidad = 'Cuidad';
                        var sefVEstado = 'Estado';
                        var sefVTimestamp = Math.round(new Date().getTime() / 1000);

                        //var sefVNavegador=SEFBrowserDetect.browser;
                        //var sefVVersion=SEFBrowserDetect.version;
                        //var sefVSistemaOperativo=SEFBrowserDetect.OS;                    			
                        var sefVNavegador = '';
                        var sefVVersion = '';
                        var sefVSistemaOperativo = '';

                        var sefVResoluciondelapantalla = screen.width + ' x ' + screen.height;
                        var sefVjavaEnabled = 'Yes';
                        var sefVDireccionanterior = 'Previous Page';
                        var sefVLenguajedelsistema = 'es-mx';
                        var sefVLenguajedelUsuario = 'es-mx';
                        var sefVLenguajedelNavegador = 'es';

                        console.log(data);
                        for (var i = 0; i < data.poll['answers']['answer'].length; i++) {
                            if (data.poll['answers']['answer'][i].value == idPlayer) {
                                var photoRaiting = data.poll['answers']['answer'][i]['photoRaiting'];
                                var number = data.poll['answers']['answer'][i]['number'];
                                var conteo = data.poll['answers']['answer'][i]['conteo'];
                                var photo = data.poll['answers']['answer'][i]['photo'];
                                var percent = data.poll['answers']['answer'][i]['percent'];
                                var guidsection = data.poll['answers']['answer'][i]['guid_section'];
                                var value = data.poll['answers']['answer'][i]['value'];
                                var name = data.poll['answers']['answer'][i]['name'];
                                var clubname = data.poll['answers']['answer'][i]['clubname'];
                                var position = data.poll['answers']['answer'][i]['clubname'];
                                var club = data.poll['answers']['answer'][i]['club'];
                                var guidfield = data.poll['answers']['answer'][i]['guid_field'];
                                var valueorder = data.poll['answers']['answer'][i]['valueorde'];
                                var nameplayer = data.poll['answers']['answer'][i]['namePlayer'];
                                var guidpoll = data.poll['answers']['answer'][i]['guid_poll'];
                                var guidfvl = data.poll['answers']['answer'][i]['guid_fvl'];
                            }
                        }

                        guid_spl = guidpoll;
                        guid_sec = guidsection;
                        guid_fld = guidfield;
                        guid_fvl = guidfvl;

                        console.log(guid_box + "/" + guid_spl + "/" + guid_sec + "/" + guid_fld + "/" + guid_fvl);
                        voteslog = guid_box + '@@@' + guid_spl + '@@@' + guid_sec + '@@@' + guid_fld + '@@@[' + guid_fld + '&&&' + guid_fvl + ']@@@' + guid_thm_spl + '@@@' + altern_field_value + '@@@';
                        voteslog += sefVPrograma + '@@@' + sefVCategoria + '@@@' + sefVSubcategoria + '@@@' + sefVToken + '@@@' + sefVCSIE + '@@@' + sefVUrlactual + '@@@' + sefVSexodelUsuario + '@@@' + sefVIP + '@@@' + sefVCodigodelPais + '@@@' + sefVCuidad + '@@@' + sefVEstado + '@@@' + sefVTimestamp + '@@@' + sefVNavegador + '@@@' + sefVVersion + '@@@' + sefVSistemaOperativo + '@@@' + sefVResoluciondelapantalla + '@@@' + sefVjavaEnabled + '@@@' + sefVDireccionanterior + '@@@' + sefVLenguajedelsistema + '@@@' + sefVLenguajedelUsuario + '@@@' + sefVLenguajedelNavegador;
                        pixvote.src = 'http://polls.esmas.com/calcularesultado/arreglo/' + voteslog + '/voto/' + guid_fld + '&&&' + guid_fvl;
                        //alert('http://polls.esmas.com/calcularesultado/arreglo/'+voteslog+'/voto/'+guid_fld+'&&&'+guid_fvl);

                        //createCookie(cookieName,'1', 60);

                        //                            	if(readCookie(cookieName2) != null){		
                        //                    				createCookie(cookieName2,'',-1);	
                        //                    			}

                        //                            	createCookie(cookieName2, value, 120);
                        //informacionactualizada();
                        //secondScreen();
                        //setTimeout('pantallaCorrecta()',refreshtimeesp*60000);

                        //                    			function createCookie(name,value,segundos) {
                        //                    				alert ("aqui");
                        //                    				if (segundos) {
                        //                    					var date = new Date();
                        //                    					date.setTime(date.getTime()+(segundos*1000));
                        //                    					var expires = "; expires="+date.toGMTString();
                        //                    				}
                        //                    				else var expires = "";
                        //                    				document.cookie = name+"="+value+expires+"; path=/";                    				
                        //                    			}
                        //                    			
                        //                    			function readCookie(name) {
                        //                    				var nameEQ = name + "=";
                        //                    				var ca = document.cookie.split(';');
                        //                    				for(var i=0;i < ca.length;i++) {
                        //                    					var c = ca[i];
                        //                    					while (c.charAt(0)==' ') c = c.substring(1,c.length);
                        //                    					if (c.indexOf(nameEQ) == 0) console.log(c.substring(nameEQ.length,c.length)); return c.substring(nameEQ.length,c.length);
                        //                    				}
                        //                    				return null;
                        //                    			}



                    }).fail(function() {
                        console.log("error");
                    });

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

            }

        }

        $.when(wdg_mxm_rating.loadAlineacion(true)).done(function() {
            setTimeout(function() {
                wdg_mxm_rating.funcionesNaat();
            }, 500);

        });

    };


})(jQuery);