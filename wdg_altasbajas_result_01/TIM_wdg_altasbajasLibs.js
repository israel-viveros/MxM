//http://i2.esmas.com/deportes30/deportestv/js/FrontMainFunction.js
function showHome() {
    document.getElementById('tabHOME').className = 'activo';
    document.getElementById('tabTV').className = '';
    document.getElementById('tabFUTBOL').className = '';
    document.getElementById('tabNBA').className = '';
}


function showTV() {
    document.getElementById('tabTV').className = 'activo';
    document.getElementById('tabHOME').className = '';
    document.getElementById('tabFUTBOL').className = '';
    document.getElementById('tabNBA').className = '';
}

function showFUTBOL() {
    document.getElementById('tabTV').className = '';
    document.getElementById('tabHOME').className = '';
    document.getElementById('tabFUTBOL').className = 'activo';
    document.getElementById('tabNBA').className = '';
}

function showNBA() {
    document.getElementById('tabTV').className = '';
    document.getElementById('tabHOME').className = '';
    document.getElementById('tabFUTBOL').className = '';
    document.getElementById('tabNBA').className = 'activo';
}

function showAyuda() {
    document.getElementById('ItemsAux_1').className = '';
    document.getElementById('ItemsAux_2').className = 'activo';
    document.getElementById('ItemsAux_3').className = '';
    $('#zonahoraria').hide();
}

function showZonaHoraria() {
    document.getElementById('ItemsAux_1').className = '';
    document.getElementById('ItemsAux_2').className = '';
    document.getElementById('ItemsAux_3').className = 'activo';

    offsetCookie = readCookie("offsetCookie");

    if (zonaGMT == -7) {
        $('#escogeOffset').val((parseFloat(offsetCookie) + 1));
    } else {
        $('#escogeOffset').val(offsetCookie);
    }

    $('#zonahoraria').show();

    if ($('span.customStyleSelectBox').length == 0) {
        $('select.styled').customStyle();
    }
}

function showItemsPORTADA() {
    agenIzq = '<img src="http://i2.esmas.com/deportes30/deportestv/img/televisadeportesTV_index_subMenLft.jpg" />';
    imagenDer = '<img src="http://i2.esmas.com/deportes30/deportestv/img/televisadeportesTV_index_subMenuRgh.jpg" />';

    document.getElementById('ItemsSubMenu_1').className = 'activo';
    document.getElementById('ItemsSubMenu_2').className = '';
    document.getElementById('imgIzqSubmenu_1').innerHTML = imagenIzq;
    document.getElementById('imgDerSubmenu_1').innerHTML = imagenDer;
    document.getElementById('imgIzqSubmenu_2').innerHTML = "";
    document.getElementById('imgDerSubmenu_2').innerHTML = "";
}

function showItemsRESULTADOS() {
    imagenIzq = '<img src="http://i2.esmas.com/deportes30/deportestv/img/televisadeportesTV_index_subMenLft.jpg" />';
    imagenDer = '<img src="http://i2.esmas.com/deportes30/deportestv/img/televisadeportesTV_index_subMenuRgh.jpg" />';

    document.getElementById('ItemsSubMenu_1').className = '';
    document.getElementById('ItemsSubMenu_2').className = 'activo';
    document.getElementById('imgIzqSubmenu_2').innerHTML = imagenIzq;
    document.getElementById('imgDerSubmenu_2').innerHTML = imagenDer;
    document.getElementById('imgIzqSubmenu_1').innerHTML = '';
    document.getElementById('imgDerSubmenu_1').innerHTML = '';

}

function createCookie(name, value, segundos) {
    if (segundos) {
        var date = new Date();
        date.setTime(date.getTime() + (segundos * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function convierteFecha(timeStamp, offset, formato) {

    // Creamos un Date con timeStamp considerando que es hora de México
    d = new Date((timeStamp * 1000) + (3600000 * 6));
    // convert to msec
    // add local time zone offset: México = 6 * 60
    // get UTC time in msec
    utc = d.getTime() + (420 * 60000);

    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000 * offset));
    return nd.format(formato);
}

function utf8_decode(str_data) {
    var tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return tmp_arr.join('');
}

// http://i2.esmas.com/deportes30/js/fut_mx_equipos.js

function limpia_hashtag_js(str1) {
    var str2 = str1.replace(/\,/g, "");
    str2 = str2.replace(/^\s+|\s+|\s+$/g, ""); //quita espacios en blanco 
    str2 = str2.replace(/\'/g, "");
    str2 = str2.replace(/>/g, "");
    str2 = str2.replace(/</g, "");
    str2 = str2.replace(/:/g, "");
    str2 = str2.replace(/\(/g, "");
    str2 = str2.replace(/\)/g, "");
    str2 = str2.replace(/\#/g, "");
    str2 = str2.replace(/\!/g, "");
    str2 = str2.replace(/\Â¿/g, "");
    str2 = str2.replace(/\?/g, "");
    str2 = str2.replace(/\&/g, "");
    str2 = str2.replace(/select/g, "");
    str2 = str2.replace(/drop/g, "");
    str2 = str2.replace(/insert/g, "");
    str2 = str2.replace(/delete/g, "");
    str2 = str2.replace(/xp_/g, "");
    str2 = str2.replace(/update/g, "");
    str2 = str2.replace(/from/g, "");
    str2 = str2.replace(/where/g, "");
    str2 = str2.replace(/count/g, "");
    str2 = str2.replace(/into/g, "");
    str2 = str2.replace(/set/g, "");
    str2 = str2.replace(/or/g, "");
    str2 = str2.replace(/and/g, "");
    str2 = str2.replace(/table/g, "");
    return str2;
}

var tbaner = limpia_hashtag_js(location.hash);

//http://i2.esmas.com/deportes30/deportestv/js/date.format.js
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function() {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function(val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function(date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    deportesTv: "dd/mm/yyyy HH:MM 'hrs'",
    deportesHome: "dddd d 'de' mmmm HH:MM 'hrs'",
    deportesTime: "HH:MM 'hrs'",
    deportesDate: "dd/mm/yyyy",
    deportesEvent: "ddd dd-mm-yy HH:MM 'hrs'",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb",
        "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    ],
    monthNames: [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
};

// For convenience...
Date.prototype.format = function(mask, utc) {
    return dateFormat(this, mask, utc);
};

// http://i2.esmas.com/deportes30/deportestv/js/DtvConfig.js

var url_mxm = 'http://mxm.televisadeportes.esmas.com/';
var url_itd = 'http://interacciontd.televisadeportes.esmas.com/';
var url_timedtv = 'http://interacciontd.televisadeportes.esmas.com/';
var url_dtv = 'http://tv.televisadeportes.esmas.com/';
var url_stats = 'http://stats.televisadeportes.esmas.com/';
var folder_futbol = 'futbol/data/';
var folder_deportes = 'deportes/';
var EvenCatIDhome = 1;
var EvenCatIDFutbol = 2;
var EvenCatIDTV = 3;
var EvenCatIDJuegos = 4;
var RefreshDTVTime = 50;
var torneoGeneral = 33;
var eventoGeneral = 1803;
var zonaGMT = -7;
var WebClipHome = 5;
var WebClipFutbol = 6;
var WebClipTV = 7;
var WebClipJuegos = 8;
var comment_url = "http://tv.televisadeportes.esmas.com/";
var domain_url = "http://tv.televisadeportes.esmas.com/";

function leerCookieAux(nombre) {
    a = document.cookie.substring(document.cookie.indexOf(nombre + '=') + nombre.length + 1, document.cookie.length);
    if (a.indexOf(';') != -1) a = a.substring(0, a.indexOf(';'))
    return a;
}

if (leerCookieAux("offsetCookie") == "-6") {
    var d = new Date();
    document.cookie = "offsetCookie=-7;expires=" + d.toGMTString() + ";" + ";";
    //createCookie("offsetCookie", -7 );
}

senalRadio = 'mms://a321.l8776524320.c87765.g.lm.akamaistream.net/D/321/87765/v0001/reflector:24320';
facebookdtvpage = 'http://www.facebook.com/TelevisaDeportes';
twitterdtvpage = 'http://twitter.com//TD_Deportes';
twitterdtvvia = 'TD_Deportes';
SiteFrame = 'es.esmas.videodep';
ZoneFrame = 'tv.deportes.home';
videoSiteFrame = 'es.esmas.videodep';
videoZoneFrame = 'tv.deportes.home';
videoSizeFrame = '1x1';
videoTileFrame = '9';
videoConfigFrame = '10000';
parent.tvCodeAux = 'player';
streaming = '';
torneo = '';
categ = '';
id_event = '';
esmas_dart_ord = Math.floor(Math.random() * 1E16);

// // Segundos en los que va a realizar la actualización del valor

var timeRecarga = 60;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

var fecha = new Date();

var timeDTV = {
    // Propiedades del objeto
    timeDay: (fecha.getDate() < 10) ? "0" + fecha.getDate() : fecha.getDate(),
    timeMonth: ((fecha.getMonth() + 1) < 10) ? "0" + (fecha.getMonth() + 1) : (fecha.getMonth() + 1),
    timeYear: (fecha.getYear() + 1900) > 3000 ? fecha.getYear() : (fecha.getYear() + 1900),
    timeHour: fecha.getHours(),
    timeMinute: fecha.getMinutes(),
    timeRoute: url_itd + folder_deportes + "/home/timetvjsonp.js",

    // Función initTime
    timeDTV: function() {
        $.ajax({
            url: timeDTV.timeRoute,
            jsonpCallback: 'timetv',
            dataType: 'jsonp',
            cache: true,
            data: 'v=' + timeDTV.timeHour + "" + timeDTV.timeMinute,
            success: function(data) {
                horaServidor = data.timetv.split(":");
                timeDTV.timeHour = parseInt(horaServidor[0]);
                timeDTV.timeMinute = parseInt(horaServidor[1]);

                fechaServidor = data.fechatv.split("_");
                timeDTV.timeDay = (parseInt(fechaServidor[0]) < 10) ? "0" + parseInt(fechaServidor[0]) : parseInt(fechaServidor[0]);
                timeDTV.timeMonth = (parseInt(fechaServidor[1]) + 1) < 10 ? "0" + (parseInt(fechaServidor[1]) + 1) : (parseInt(fechaServidor[1]) + 1);
                timeDTV.timeYear = parseInt(fechaServidor[2]) + 1900;
            }
        });
    },

    // Función counterTime
    counterTime: function() {
        if ((timeDTV.timeMinute + 1) < 60) {
            timeDTV.timeMinute = timeDTV.timeMinute + 1;
        } else {
            timeDTV.timeMinute = 0;
            timeDTV.timeHour = ((timeDTV.timeHour + 1) < 24) ? timeDTV.timeHour + 1 : 0;
        }
    },

    // Función returnData
    returnData: function() {
        return (timeDTV.timeHour + "" + timeDTV.timeMinute);
    },

    // Función returnDataDiez
    returnDataDiez: function() {
        return (timeDTV.timeHour + "" + Math.floor(timeDTV.timeMinute / 10));
    }

}

timeDTV.timeDTV();
setInterval("timeDTV.counterTime()", (timeRecarga * 1000));
//alert(timeDTV.returnData());
//setInterval("alert(timeDTV.returnData())" , (timeRecarga*1000) );