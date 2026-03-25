function init(){

}

$(document).ready(function(){
    var tick_id = getUrlParameter('ID');
    listardetalle(tick_id);

    /* TODO: inicializamos input de estrellas */
    $('#tick_estre').on('rating.change', function() {
        console.log($('#tick_estre').val());
    });

});

function listardetalle(tick_id){
    /* TODO: Mostra detalle de ticket */
    $.post("../../controller/ticket.php?op=mostrar_noencry", { tick_id : tick_id }, function (data) {
        if (!data) return;
        try {
            var parsed = JSON.parse(data);
        } catch (e) {
            swal("Sesión expirada", "Por favor, inicia sesión nuevamente.", "warning");
            setTimeout(function(){
                window.location.href = "/index.php";
            }, 2000);
            return;
        }
        if (parsed.error && parsed.error === 'Sesión expirada') {
            swal("Sesión expirada", "Por favor, inicia sesión nuevamente.", "warning");
            setTimeout(function(){
                window.location.href = "/index.php";
            }, 2000);
            return;
        }
        $('#lblestado').val(parsed.tick_estado_texto);
        $('#lblnomusuario').val(parsed.usu_nom +' '+parsed.usu_ape);
        $('#lblfechcrea').val(parsed.fech_crea);
        $('#lblnomidticket').val(parsed.tick_id);
        $('#cat_nom').val(parsed.cat_nom);
        $('#cats_nom').val(parsed.cats_nom);
        $('#tick_titulo').val(parsed.tick_titulo);
        $('#prio_nom').val(parsed.prio_nom);
        $('#lblfechcierre').val(parsed.fech_cierre);

        if (parsed.tick_estado_texto=='Abierto') {
            window.open('http://localhost:90/PERSONAL_HelpDesk/','_self');
        }else{
            if (parsed.tick_estre==null){

            }else{
                $('#panel1').hide();
            }
        }
    });
}

/* TODO: Obtener ID de la Url */
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

/* TODO:Guardar Informacion de estrella del ticket */
$(document).on("click","#btnguardar", function(){
    var tick_id = getUrlParameter('ID');
    var tick_estre = $('#tick_estre').val();
    var tick_coment = $('#tick_coment').val();

    $.post("../../controller/ticket.php?op=encuesta", { tick_id : tick_id,tick_estre:tick_estre,tick_coment:tick_coment}, function (data) {
        console.log(data);
        $('#panel1').hide();
        swal("Correcto!", "Gracias por su Tiempo", "success");
    }); 
});