wdgMxM([{
    "nombre": "Balance del Draft",
    "id": "balancedraft",
    "css": {
        "mobile": "http://166.78.2.40/deportes/wdg_playerdraft_01/css/wdg_playerdraft_01_mobile.css",
        "tablet": "http://166.78.2.40/deportes/wdg_playerdraft_01/css/wdg_playerdraft_01_tablet.css",
        "desktop": "http://166.78.2.40/deportes/wdg_playerdraft_01/css/wdg_playerdraft_01.css"
    },
    "js": {
        "tags": "$(function() {$(\"#containerwdg_playerdraft_01\").MxMAltasBajasDraft({'idTorneo':'356','nameTournament': 'liga-mx-clausura-2014'}); });",
        "actions": "http://i2.esmas.com/deportes30/mxm/js/TIM.td.AltasbajasDraft.min.js",
        "libs": ""
    },
    "html": {
        "tags": "<section class=\"containerwdg_playerdraft_01\" id=\"containerwdg_playerdraft_01\"></section>"
    },
    "input": {
        "idTorneo": 1,
        "idmatch": 0
    }
}, {
    "nombre": "Alineacion MxM",
    "id": "alineacionmxm",
    "css": {
        "mobile": "http://localhost/~israelviveros/Deportes_restructura/televisa-deportes/alineacion.css",
        "tablet": "",
        "desktop": ""
    },
    "js": {
        "tags": "$(function() {$(\"#containerWdgMexStrategy\").MxMAlineacionTD({'ideventomxm': 359,'ideventomxmtv': 25349});});",
        "actions": "http://i2.esmas.com/deportes30/mxm/js/TIMTD_mxm_alineacion.min.js",
        "libs": ""
    },
    "html": {
        "tags": "<section class=\"wdg_smex_strategy_01\" id=\"containerWdgMexStrategy\"></section> <div class=\"wdg_goalsanoted_01\"><div class=\"str_pleca_01 collapsable\"><div class=\"str_pleca_01_title\"><h3 class=\"background-color-pleca1\"><a  class=\"textcolor-title3\">Goles anotados</a></h3></div></div><div class=\"scroll-carrusel\"><div class=\"scroll\"><div id=\"TIMAlineacionGoles\"></div><div id=\"TIMWdgPenales\"></div></div></div><div class=\"degraded\"></div></div> <div id=\"ExpulsionTIM\"></div> <div id=\"AlineacionPromedioTIM\"></div>"
    },
    "input": {
        "idTorneo": 1,
        "idmatch": 1
    }
}, {
    "nombre": "Rating MxM",
    "id": "ratingmxm",
    "css": {
        "mobile": "#mmobile",
        "tablet": "#tablet",
        "desktop": "#desktop"
    },
    "js": {
        "tags": "#tags",
        "actions": "#actions",
        "libs": ""
    },
    "html": {
        "tags": "#html"
    }
}, {
    "nombre": "Altas bajas Draft",
    "id": "abdraft",
    "css": {
        "mobile": "http://localhost/~israelviveros/mxm/wdg_altasbajas_01/css/wdg_altasbajas_01_mobile.css",
        "tablet": "http://localhost/~israelviveros/mxm/wdg_altasbajas_01/css/wdg_altasbajas_01_tablet.css",
        "desktop": "http://localhost/~israelviveros/mxm/wdg_altasbajas_01/css/wdg_altasbajas_01.css"
    },
    "js": {
        "tags": "$(function() {$(\"#altasbajasTIM\").wdgAltasbajas({'idTournament':356,'nameTournament': 'liga-mx-apertura-2014','abbody' : true,'title' : 'Titulo de muestra'});});",
        "actions": "http://i2.esmas.com/deportes30/mxm/js/TIM.wdg.altabajas.min.js",
        "libs": "http://i2.esmas.com/deportes30/mxm/js/libs.countdown.altasbajas.js"
    },
    "html": {
        "tags": "<div id=\"altasbajasTIM\"></div><div id=\"altasbajasbodyTIM\"></div>"
    }
}, {
    "nombre": "Jornadas",
    "id": "jornadas",
    "css": {
        "mobile": "",
        "tablet": "",
        "desktop": ""
    },
    "js": {
        "tags": "$(function() {$(\"#TIMwdg_altasbajas_result\").wdgAltasBajas({'idtorneo': 356,//'idequipo':1,//'idtorneo2':356,'title':'Jornadas..','txtdropdown' : 'Jornada'});});",
        "actions": "http://i2.esmas.com/deportes30/mxm/js/TIM_wdg_altasbajas.min.js",
        "libs": "http://i2.esmas.com/deportes30/mxm/js/TIM_wdg_altasbajasLibs.js"
    },
    "html": {
        "tags": " <div class=\"wdg_altasbajas_result_01\" data-enhance=\"false\" id=\"TIMwdg_altasbajas_result\"></div>"
    }
}, {
    "nombre": "Promedio del partido",
    "id": "promediopartido",
    "css": {
        "mobile": "http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/css/wdg_avgfield_02_mobile.css",
        "tablet": "http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/css/wdg_avgfield_02_tablet.css",
        "desktop": ""
    },
    "js": {
        "tags": "$(function() {$(\"#wdg_avgfieldTIM\").wdg_avgfield({'idTorneo': 148,'idMatch':25521,'title':'asd'});});",
        "actions": "http://i2.esmas.com/deportes30/mxm/js/TIM.wdg.avgfield02.min.js",
        "libs": ""
    },
    "html": {
        "tags": "<div id=\"wdg_avgfieldTIM\"></div>"
    },
    "input": {
        "idTorneo": 1,
        "idmatch": 1
    }
}, {
    "nombre": "Alineacion previa",
    "id": "alineacionprevia",
    "css": {
        "mobile": "http://localhost/~israelviveros/mxm/wdg_lineup_01/css/wdg_lineup_01_mobile.css",
        "tablet": "http://localhost/~israelviveros/mxm/wdg_lineup_01/css/wdg_lineup_01_tablet.css",
        "desktop": "http://localhost/~israelviveros/mxm/wdg_lineup_01/css/wdg_lineup_01.css"
    },
    "js": {
        "tags": "$(function(){$(\"#TIMWdg_lineUp\").wdgLineup({'idTorneo': 359,'idEquipo': 134,'idEquipo2': 408,'title': 'Alineacion','idPartido': 25333});});",
        "actions": "http://i2.esmas.com/deportes30/mxm/js/TIM_wdg_lineup.min.js",
        "libs": ""
    },
    "html": {
        "tags": "<div id=\"TIMWdg_lineUp\"></div>"
    },
    "input": {
        "idTorneo": 1,
        "idmatch": 1
    }
}, {
    "nombre": "MxM Acciones 2",
    "id": "mxmacciones2",
    "css": {
        "mobile": "http://localhost/~israelviveros/mxm/wdg_mxm_live_02/css/wdg_mxm_live_02_mobile.css",
        "tablet": "http://localhost/~israelviveros/mxm/wdg_mxm_live_02/css/wdg_mxm_live_02_tablet.css",
        "desktop": "http://localhost/~israelviveros/mxm/wdg_mxm_live_02/css/wdg_mxm_live_02.css"
    },
    "js": {
        "tags": "$(function() {$(\"#wdg_mxm_live\").wdgLiveMxM({'idevento': 1233});});",
        "actions": "http://i2.esmas.com/deportes30/mxm/js/TIMwdg_mxm_live_02.min.js",
        "libs": ""
    },
    "html": {
        "tags": "<div class=\"wdg_mxm_live_02\" id=\"wdg_mxm_live\"></div>"
    }
}, {
    "nombre": "Minuto por Minuto partido",
    "id": "mxmmatch",
    "css": {
        "mobile": "http://localhost/~israelviveros/mxm/wdg_mxm_live_04/css/wdg_mxm_live_04_mobile.css",
        "tablet": "http://localhost/~israelviveros/mxm/wdg_mxm_live_04/css/wdg_mxm_live_04_tablet.css",
        "desktop": "http://localhost/~israelviveros/mxm/wdg_mxm_live_04/css/wdg_mxm_live_04.css"
    },
    "js": {
        "tags": "$(function() {$(\"#contenidoMxM\").wdgMxmLive({'idjornada': 359,'idmatch':25338,'title': 'El Partido Minuto por Minuto'});});",
        "actions": "http://i2.esmas.com/deportes30/mxm/js/TIM_wdg_mxm_live_04.min.js",
        "libs": ""
    },
    "html": {
        "tags": "<div class=\"wdg_mxm_live_04\" data-enhance=\"false\" id=\"contenidoMxM\"></div>"
    },
    "input": {
        "idTorneo": 1,
        "idmatch": 1
    }
}, {
    "nombre": "Estrategia del equipo",
    "id": "estrategiaequipo",
    "css": {
        "mobile": "http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/css/wdg_smex_strategy_01_mobile.css",
        "tablet": "http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/css/wdg_smex_strategy_01_tablet.css",
        "desktop": "http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/css/wdg_smex_strategy_01.css"
    },
    "js": {
        "tags": " $(function() {$(\"#containerWdgMexStrategy\").wdgStrategyMxM({'ideventomxm': 359,'idclub': 134,'title':'mi titulo'});});",
        "actions": "http://i2.esmas.com/deportes30/mxm/js/TIMwdg_smex_strategy.js",
        "libs": ""
    },
    "html": {
        "tags": "<section class=\"wdg_smex_strategy_01\" id=\"containerWdgMexStrategy\"></section>"
    },
    "input": {
        "idTorneo": 1,
        "idmatch": 1
    }
}])