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
                        console.log("success");
                        for (var i = 0; i < data.length; i++) {
                            maquetado += '<li>';
                            maquetado += '<div class="textcolor-title2 time">10:40</div>';
                            maquetado += '<div class="chronic">';
                            maquetado += '<div class="logoTeam"><img src="' + data[i].icon + '" alt="Image description"> </div>';
                            maquetado += (typeof(data[i].Jugador) !== "undefined") ? '<h2>' + data[i].Jugador + '</h2>' : '';
                            maquetado += (typeof(data[i].descripcion) !== "undefined") ? '<div class="chronic_description">' + data[i].descripcion + '</div>' : '';
                            maquetado += '</div>';
                            maquetado += '</li>';
                        };
                        globalThis.find("ul.wdg_mxm_live_03_list").html(maquetado);
                    })
                    .fail(function() {
                        console.log("error al cargar el feed " + objLiveDraft.feedActions);
                    })


            }

        };

        objLiveDraft.drawMaquetado();

    };

})(jQuery);