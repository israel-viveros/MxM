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
            feedEquipos: '',
            feedDraft: 'http://lab.israelviveros.com/draft/' + setting.idTournament + '/draft.js',

            iniciaMaquetado: function() {
                var maquetado = '<div class="wdg_altasbajas_01 background-color1">';
                maquetado += '<div class="contenedor">';
                maquetado += '<div class="degraded_left"></div>';
                maquetado += '<div class="sup_izq textcolor-title3">';
                maquetado += '<a href="#" class="underline_text"><div class="background-color2">DRAFT<div class="hline"></div></div></a>';
                maquetado += '<a href="#" class="underline_text"><div class="background-color2 hide-mobile">MXM<div class="hline"></div></div></a>';
                maquetado += '<div class="subtitulo">Altas y Bajas por equipo</div>';
                maquetado += '<div class="textcolor-title2">Torneo Liga MX Apertura  2013</div>';
                maquetado += '</div>';

                maquetado += '<div class="sup_der">';
                maquetado += '<div id="target_date" data-target_date="May 15, 2014 14:00:00"></div>';
                maquetado += '<table  class="timing">';
                maquetado += '<tr class="one">';
                maquetado += '<td rowspan="2" class="textcolor-title2 cut">';
                maquetado += '<div class="vline"></div>';
                maquetado += 'El torneo comienza en:';
                maquetado += '</td>';
                maquetado += '<td class="textcolor-title3" id="months"></td>';
                maquetado += '<td class="textcolor-title3">·</td>';
                maquetado += '<td class="textcolor-title3" id="days">10</td>';
                maquetado += '<td class="espacio">&nbsp;</td>';
                maquetado += '<td class="textcolor-title3" id="hours">00</td>';
                maquetado += '<td class="textcolor-title3">:</td>';
                maquetado += '<td class="textcolor-title3" id="minutes">00</td>';
                maquetado += '<td class="textcolor-title3">:</td>';
                maquetado += '<td class="textcolor-title3" id="seconds">00</td>';
                maquetado += '</tr>';
                maquetado += '<tr class="two">';
                maquetado += '<td class="textcolor-title2"><!--MES--></td>';
                maquetado += '<td class="textcolor-title2">&nbsp;</td>';
                maquetado += '<td class="textcolor-title2"><!--DIA--></td>';
                maquetado += '<td class="textcolor-title2">&nbsp;</td>';
                maquetado += '<td class="textcolor-title2"><!--HRS--></td>';
                maquetado += '<td class="textcolor-title2">&nbsp;</td>';
                maquetado += '<td class="textcolor-title2"><!--MIN--></td>';
                maquetado += '<td class="textcolor-title2">&nbsp;</td>';
                maquetado += '<td class="textcolor-title2"><!--SEG--></td>';
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
                maquetado += '<tr>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';

                maquetado += '<td class="textcolor-title3">';
                maquetado += '<a href="#" class="underline_text">';
                maquetado += '<img src="http://placehold.it/24x24" alt="#">AME';
                maquetado += '</a>';
                maquetado += '</td>';
                maquetado += '</tr>';
                maquetado += '<tr class="ab">';
                maquetado += '<td>5</td>';
                maquetado += '<td>6</td>';
                maquetado += '<td>9</td>';
                maquetado += '<td>4</td>';
                maquetado += '<td>-</td>';
                maquetado += '<td>5</td>';
                maquetado += '<td>6</td>';
                maquetado += '<td>9</td>';
                maquetado += '<td>4</td>';
                maquetado += '<td>-</td>';
                maquetado += '<td>5</td>';
                maquetado += '<td>6</td>';
                maquetado += '<td>9</td>';
                maquetado += '<td>4</td>';
                maquetado += '<td>-</td>';
                maquetado += '<td>5</td>';
                maquetado += '<td>6</td>';
                maquetado += '<td>9</td>';
                maquetado += '</tr>';
                maquetado += '<tr class="ab">';
                maquetado += '<td>2</td>';
                maquetado += '<td>1</td>';
                maquetado += '<td>3</td>';
                maquetado += '<td>-</td>';
                maquetado += '<td>4</td>';
                maquetado += '<td>2</td>';
                maquetado += '<td>1</td>';
                maquetado += '<td>3</td>';
                maquetado += '<td>-</td>';
                maquetado += '<td>4</td>';
                maquetado += '<td>2</td>';
                maquetado += '<td>1</td>';
                maquetado += '<td>3</td>';
                maquetado += '<td>-</td>';
                maquetado += '<td>4</td>';
                maquetado += '<td>2</td>';
                maquetado += '<td>1</td>';
                maquetado += '<td>3</td>';
                maquetado += '</tr>';
                maquetado += '</table>';
                maquetado += '</div>';

                maquetado += '<div class="totales">';
                maquetado += '<div class="textcolor-title2">Totales</div>';
                maquetado += '<div class="numeros">';
                maquetado += '<div class="textcolor-title3">190</div>';
                maquetado += '<div class="textcolor-title3">70</div>';
                maquetado += '</div>';
                maquetado += '</div>';

                maquetado += '</div>';

                maquetado += '<div class="degraded_right"></div>';
                maquetado += '</div>';

                maquetado += '</div>';


                globalThis.html(maquetado);

            }


        }; // end objAltasbajas

        if (setting.idTournament !== 0) {
            objAltasbajas.iniciaMaquetado();
        } else {
            console.log("Falta el ID del torneo");
        }




    };
})(jQuery);