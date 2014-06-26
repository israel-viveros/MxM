/*!
    TIM Developer: Israel Viveros
    Version: 1.0
 */

(function(window, document) {

    var layout = document.getElementById('layout'),
        menu = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for (; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function(e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };

}(this, this.document));



var globalWdgs = {
    feedTournaments: 'http://192.168.7.229:81/futbol/data/widgets/mxm/tournaments.js',
    feedPartidos: 'http://192.168.7.229:81/futbol/data/widgets/mxm/matches.js',
    _init: function() {
        $.ajax({
            url: 'http://localhost/~israelviveros/mxm/generate_widgets/js/widgets.js',
            type: 'GET',
            dataType: 'jsonp',
            cache: false,
            jsonpCallback: 'wdgMxM'
        })
            .done(function(data) {
                globalWdgs.CondfigData = data;
                globalWdgs._menu();

                //load Feeds


                globalWdgs._torneos();

            })
            .fail(function() {
                console.log("error al cargar la configuracion");
            })
    }, // _init
    _menu: function() {
        //console.log(globalWdgs.CondfigData);
        var menuhtml = "";

        for (var i = 0; i < globalWdgs.CondfigData.length; i++) {
            //console.log(globalWdgs.CondfigData[i])
            menuhtml += ' <li><a href="#" rel ="' + globalWdgs.CondfigData[i].id + '">' + globalWdgs.CondfigData[i].nombre + '</a></li>'
        };
        $("#menu ul").eq(0).html(menuhtml);

        $("#menu ul a").click(function(event) {
            event.preventDefault();
            $("#menu li").each(function(index, el) {
                $(this).removeClass('current');
            });
            $(this).parent("li").addClass('current');
            globalWdgs._giveform($(this).attr('rel'));
            $("#codesubmit").attr('rel', $(this).attr('rel'));
        });


    }, // _menu

    _replaceTags: function(str) {
        var torneo_id_selec = $("#insertaTorneo select option:selected").data('id'),
            torneo_name_selec = $("#insertaTorneo select option:selected").data('name'),
            nomenclatura = new Array('%T%', '%TN%'),
            valoresReales = new Array(torneo_id_selec, torneo_name_selec);
        for (var f = 0; f <= nomenclatura.length; f++) {
            console.log("Remplazando: " + nomenclatura[f] + " por " + valoresReales[f]);
            str = str.replace(nomenclatura[f], valoresReales[f]);
            if (f == nomenclatura.length) {
                return str;
            }
        };
    },
    _givemescript: function(tipo) {
        console.log("_givemescript");
        console.log(tipo);
        var css = "",
            js = "",
            js2 = "",
            htmlc = "";
        for (var i = 0; i < globalWdgs.CondfigData.length; i++) {
            var tmpAct = globalWdgs.CondfigData[i];
            if (tmpAct.id === tipo) {
                console.log(tmpAct);


                //HTML
                htmlc += (tmpAct.html.tags !== "") ? tmpAct.html.tags : '';
                $("#wdgcodehtml").html(globalWdgs._htmlEntities(htmlc));

                //Js
                js += (tmpAct.js.actions !== "") ? '<script src="' + tmpAct.js.actions + '"></script>' : '';
                js += (tmpAct.js.libs !== "") ? '\r<script src="' + tmpAct.js.libs + '"></script>' : '';
                $("#wdgcodejssrc").empty().html(globalWdgs._htmlEntities(js));

                var scripteje = tmpAct.js.tags;

                js2 += (tmpAct.js.tags !== "") ? '<script>' + globalWdgs._replaceTags(scripteje) + '</script>' : '';

                $("#wdgcodejs").empty().html(globalWdgs._htmlEntities(js2));

                //css
                css += (tmpAct.css.mobile !== "") ? '<link rel="stylesheet" href="' + tmpAct.css.mobile + '">' : '';
                css += (tmpAct.css.tablet !== "") ? '\r<link rel="stylesheet" href="' + tmpAct.css.tablet + '">' : '';
                css += (tmpAct.css.desktop !== "") ? '\r<link rel="stylesheet" href="' + tmpAct.css.desktop + '">' : '';

                $("#wdgcodecss").empty().html(globalWdgs._htmlEntities(css));

                $(".mxmcode").slideDown('slow', function() {
                    $(this).css('display', 'block');
                });


                //Pintando el Resultado
                var resultCode = htmlc + css + js;
                $("#resultcode .pintaconte").empty().html(resultCode);
                setTimeout(function() {
                    $("#resultcode .pintaconte").append(js2);
                }, 1000);






            }
        };
    },
    _giveform: function(tipo) {

        for (var i = 0; i < globalWdgs.CondfigData.length; i++) {
            var tmpAct = globalWdgs.CondfigData[i];
            if (tmpAct.id === tipo) {
                $("#nameh1").html(tmpAct.nombre);
                $(".mxmcode").slideUp('slow', function() {
                    $(this).css('display', 'none');
                });

                globalWdgs._constructForm(tmpAct.input, tmpAct.id);
            }
        };

    },
    _htmlEntities: function(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },
    _torneos: function() {
        var formi = "";
        $.ajax({
            url: globalWdgs.feedTournaments,
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: 'wdgMxM'
        }).done(function(data) {
            //formi += '<select id="torneo">';
            formi += '<option value="" disabled selected>Selecciona una opcion</option>';
            for (var i = 0; i < data.length; i++) {
                var nombresaneado = data[i].Name.replace(/[^-A-Za-z0-9]+/g, '-').toLowerCase();
                formi += '<option data-guid="' + data[i].TournamentGuid + '" data-name="' + nombresaneado + '" data-id="' + data[i].TournamentId + '">' + data[i].Name + '</option>';
            };
            //formi += '</select>';
            globalWdgs.dataTorneos = formi;
            console.log("Feed torneos ready!");
        }).fail(function() {
            console.log("error");
        });
    },
    _partidos: function(guidtorneo) {
        //console.log("ME ENVIAN" + guidtorneo);
        var formi = "";
        $.ajax({
            url: globalWdgs.feedPartidos,
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: 'wdgMxM'
        }).done(function(data) {
            //formi += '<select id="partido">';
            formi += '<option value="" disabled selected>Selecciona una opcion</option>';
            for (var i = 0; i < data.length; i++) {
                formi += (data[i].TournamentGuid === guidtorneo) ? '<option  data-id="' + data[i].MatchId + '">' + data[i].MatchName + '</option>' : '';
            };
            //formi += '</select></div>';
            //console.log(formi);
            $("#insertaMatch select").empty().html(formi);

        }).fail(function(jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);

        });
    },
    _constructForm: function(data, tipo) {
        var formi = "";

        $("#formasigned").show();

        if (data.idTorneo === 1) {
            //formi += globalWdgs.dataTorneos;
            $("#insertaTorneo select").empty().html(globalWdgs.dataTorneos);
        }


        //formi += '<div class="pure-controls"><button type="submit" class="pure-button pure-button-primary" id="codesubmit" rel="' + tipo + '">Generar Widget</button></div></fieldset></form>';

        $("#codesubmit").unbind('click').click(function(event) {
            event.preventDefault();
            //console.log($(this).attr('rel'));
            globalWdgs._givemescript($(this).attr('rel'));
        });

        $("#insertaTorneo").unbind('change').bind('change', $("#torneo"), function(event) {
            console.log("change")
            globalWdgs._partidos($(this).find('option:selected').data('guid'));
        });


        //$("#formasigned").html(formi);
    }





};

try {
    globalWdgs._init();
} catch (e) {
    console.log(e);
}