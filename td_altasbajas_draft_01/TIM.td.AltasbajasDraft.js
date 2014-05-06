;
(function() {
    $.fn.MxMAltasBajasDraft = function(options) {    	    	
    	var setting = $.extend({        	
    		'idTorneo':0,
    		'idEvento':0
        }, options);
    	console.log ('Altas Bajas Draft');
    	   
    	var wdg_playerdraft_01 = {
    		//urlData: 'http://mxm.televisadeportes.esmas.com/futbol/draft/liga-mx-apertura-2013/draft.js';
    		urlData: 'draft.js',
    		tagWdgPlayerdraft: $("#containerwdg_playerdraft_01"),
    	
    		viewHtml: function(){
    			
    			maquetado = "<div id='wdg_playerdraft_01' class='wdg_playerdraft_01'>";
    			//Encabezado___
    			maquetado += "<div class='titulo textcolor-title2'><h2>Balance en el Draft</h2></div>";
    			maquetado += "<div class='div1 dotted-right'>Compras <div class='gris'>18</div></div>";
    			maquetado += "<div class='div2'>Prestamos";
    			maquetado += "<div class='gris'>18</div>";
    			maquetado += "</div>";
    			maquetado += "<div class='dotted-top lineasep'></div>";
    			maquetado += "<div class='div3'>Transferencias Draft";
    			maquetado += "<div class='textcolor-title2'>103</div>";
    			maquetado += "</div>";
    			maquetado += "<div class='subtitle'>";
    			maquetado += "<div class='textcolor-title4'>Elige a tu jugador y vota</div>";
    			maquetado += "</div>";
    			
    			//Titulos___
    			maquetado += "<div class='scroll'>";
    			maquetado += "<table class='tblDraft'>";
    			maquetado += "<tbody>";
    			maquetado += "<tr>";
    			maquetado += "<th width='131' class='textcolor-title1'>JUGADOR</th>"; 
    			maquetado += "<th width='78' class='textcolor-title1'>ADQUIRIÓ</th>";
    			maquetado += "<th width='68' class='textcolor-title1'>TRANSFIRIÓ</th>";
    			maquetado += "<th width='40' class='textcolor-title1'>OPERACIÓN</th>";
    			maquetado += "<th width='45' class='textcolor-title1'>TD</th>";
    			maquetado += "<th width='45' class='textcolor-title1'>AFICIÓN</th>";
    			maquetado += "</tr>";
    			
    			//Contenido___
    			maquetado += "<tr>";
    			maquetado += "<td colspan='6' class='separador'></td>";    			
    			maquetado += "</tr>";
    			maquetado += "<tr class='vote_block'>";
    			maquetado += "<td class='dotted-right'><h3>Daniel Casillas</h3></td>";
    			maquetado += "<td class='dotted-right'>Chiapas FC</td>";
    			maquetado += "<td class='dotted-right'>Chivas USA</td>";
    			maquetado += "<td class='dotted-right'>Pr&eacute;stamo</td>";
    			maquetado += "<td class='dotted-right'>7.5</td>";
    			maquetado += "<td class='textcolor-title1'>6.7</td>";
    			maquetado += "</tr>"; 
    			
    			
    		
    			
    			
    			
    			
    			maquetado += "</div>";				
    			
    			wdg_playerdraft_01.tagWdgPlayerdraft.html(maquetado);
    			
    		}, 
    			
    			
    			
    		getDataDraft: function() {
    			console.log(wdg_playerdraft_01.urlData);
    			$.ajax({
    				url: 'draftjsonp.js',
    				type: "GET",
    	            dataType: 'jsonp',
    	            jsonpCallback: 'draft',
    	            cache: false,
                    success: function(data) {
                        console.log(data);
                        //wdg_playerdraft_01.pintaInfo(data);                                                  
                    }
    			});
    		}
    	
    	
    	}
    	
    	wdg_playerdraft_01.getDataDraft();
    	
};
   
})(jQuery);