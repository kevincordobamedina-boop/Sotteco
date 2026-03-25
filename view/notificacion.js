$(document).ready(function(){

    mostrar_notificacion();

});

function mostrar_notificacion(){

    var formData = new FormData();
    formData.append('usu_id',$('#user_idx').val());

    $.ajax({
        url: "../controller/Notificacion.php?op=mostrar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(data){
            if (!data) {
                return;
            }
            try {
                var parsed = JSON.parse(data);
            } catch (e) {
                console.error('Error al parsear JSON en notificacion.js:', e, data);
                return;
            }
            $.notify({
                icon: 'glyphicon glyphicon-star',
                message: parsed.not_mensaje,
                url: "https://sotteco-app.onrender.com/view/DetalleTicket/?ID="+parsed.tick_id
            });

            $.post("../controller/Notificacion.php?op=actualizar", {not_id : parsed.not_id}, function (data) {

            });
        }
    });

}




