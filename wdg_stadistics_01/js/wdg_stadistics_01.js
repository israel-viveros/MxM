;(function($)
{ 
   $.fn.compareStadisticTeams = function( params )
   {
      var objSettings = $.extend( {
         idTorneo: "",
         idMatch: "",
         title: 'Estad&iacute;sticas',
         urlLogoTorneo: '',
         lblTorneo: 'Nombre del Torneo',
         lblData: ['Tiros a Gol','Efectividad','Tiros Esquina','Fuera de Lugar','Tarjeta Amarilla','Tarjeta Roja','Goles','Tiros Bloqueados'],
         lblLoading: '<b>LOADING.....</b>'
      }, params);

      if ( objSettings.idTorneo=="" || objSettings.idMatch=="" ) { return ''; }

      var $objGlobal = $(this);
      token_teams( objSettings, $objGlobal);
      return this;
   };

   var successData = function ( objSettings, $objGlobal, data_teams )
   {
      var html = createHTML_Deportes( objSettings, data_teams );

      $objGlobal.addClass('wdg_stadistics_01').hide()
         .attr("data-enhance","false").delay( 1000 )
         .html( html ).fadeIn( 4000 );
   };

   var token_teams = function ( objSettings, $objGlobal )
   {
      var domain = 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/';
      domain += objSettings.idTorneo+'/'+objSettings.idMatch+'/match_summary.js';

      $.ajax({
         type: 'GET',
         url: domain,
         jsonpCallback: 'summaryActions',
         contentType: "application/json",
         dataType: 'jsonp',
         timeout: 3000
      }).done(function(data_teams) {
         successData( objSettings, $objGlobal, data_teams);
      }).fail(function(xhr, ajaxOptions, thrownError) {
         $objGlobal.html('');
      });
   };

   /* ################################################################################################## */
   var createHTML_Deportes = function ( objSettings, data )
   {
      var html = '', findItem = '', arrSig = objSettings.lblData, img = "";
      var arrData = ['tiros_gol', 'efectividad_disparos', 'tiros_esquina','fuera_lugar',
                     'tarjeta_amarilla', 'tarjeta_roja','num_goles','tiros_bloqueados'];
        
      html += '<div class="wdg_stadistics_01_container">';

      html += '<div class="str_pleca_01"><div class="str_pleca_01_title">';
      html += '<h3 class="background-color-pleca1"> <a title="'+objSettings.title+'" class="textcolor-title3"> ';
      html += objSettings.title+' <span class="str_pleca_01_arrowa selected">';
      html += '</span> <span class="str_pleca_01_arrowb"></span></a></h3></div></div>';

      if( data.logoTorneo.length > 0 ){
         img = '<td class="logo 1"><img alt="" class="imagen" src="'+data.logoTorneo+'"></td>';
      } else if( objSettings.urlLogoTorneo.length > 0 ) {
         img = '<td class="logo 2"><img alt="" class="imagen" src="'+objSettings.urlLogoTorneo+'"></td>';
      } else {
		img = '<td style="height:66px"></td>';
	  }

      html += '<table class="titulo"><tbody><tr>';
      html += ''+img+'';
      html += '<td><p class="texto_superior">'+data.nameTorneo+'</p></td>';
      html += '</tr></tbody></table>';

      html += '<table class="encabezado" id="alto"><tbody><tr>';
      html += '<td class="textcolor-title1 izq alt_f"></td>';
      html += '<td class="der"><img alt="" class="team-left linkbanderalocal"';
      html += ' src="'+data.acciones.local.logoch+'"></td>';
      html += '<td class="borde_superior"><p class="dotted-right">&nbsp;</p></td>';
      html += '<td class="der"><img alt="" class="team-left linkbanderavisit"';
      html += ' src="'+data.acciones.visitant.logoch+'"></td>';
      html += '</tr></tbody></table>';

      html += '<div class="scroll">';
      html += '<div class="gradient_unico"></div><table class="datos" id="alto2"><tbody>';

      $.each( data.acciones.local, function(i,item){
         findItem = arrData.indexOf(i);
         if ( findItem >= 0  ) {
            if( data.acciones.local[i] == null || data.acciones.local[i] == "" ) {
               data.acciones.local[i] = '0';
            }
            if( data.acciones.visitant[i] == null || data.acciones.visitant[i] == "" ) {
               data.acciones.visitant[i] = '0';
            }
            
            html += '<tr><td class="info izq">'+arrSig[findItem]+'</td>';
            html += '<td class="fondo textcolor-title2 der">'+data.acciones.local[i]+'</td>';
            html += '<td class="fondo"><p class="dotted-right">&nbsp;</p></td>';
            html += '<td class="fondo textcolor-title2 der">'+data.acciones.visitant[i]+'</td></tr>';
            html += '';
         }
      });

      html += '</tbody></table></div><div class="wdg_stadistics_01_clear"></div>';
      html += '<div class="degradado"></div></div><div class="nav"></div>';

      return html;
   };

})(jQuery);