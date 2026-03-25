function init(){

}

$(document).ready(function(){
    var usu_id = $('#user_idx').val();

    function safeParseAndHandle(data, cb) {
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
        cb(parsed);
    }

    if ( $('#rol_idx').val() == 1){
        $.post("../../controller/ticket.php?op=total", {usu_id:usu_id}, function (data) {
            safeParseAndHandle(data, function(parsed){
                $('#lbltotal').html(parsed.TOTAL);
            });
        }); 

        $.post("../../controller/ticket.php?op=totalabierto", {usu_id:usu_id}, function (data) {
            safeParseAndHandle(data, function(parsed){
                $('#lbltotalabierto').html(parsed.TOTAL);
            });
        });

        $.post("../../controller/ticket.php?op=totalcerrado", {usu_id:usu_id}, function (data) {
            safeParseAndHandle(data, function(parsed){
                $('#lbltotalcerrado').html(parsed.TOTAL);
            });
        });

        $.post("../../controller/ticket.php?op=grafico", {usu_id:usu_id},function (data) {
            safeParseAndHandle(data, function(parsed){
                new Morris.Bar({
                    element: 'divgrafico',
                    data: parsed,
                    xkey: 'nom',
                    ykeys: ['total'],
                    labels: ['Value'],
                    barColors: ["#1d1ab2"], 
                });
            });
        });

        $('#idcalendar').fullCalendar({
            lang:'es',
            header:{
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'  
            },
            defaultView:'month',
            events:{
                url:'../../controller/ticket.php?op=usu_calendar',
                method:'POST',
                data:{usu_id:usu_id}
            }
        });

    }else{
        $.post("../../controller/ticket.php?op=total",function (data) {
            safeParseAndHandle(data, function(parsed){
                $('#lbltotal').html(parsed.TOTAL);
            });
        });

        $.post("../../controller/ticket.php?op=totalabierto",function (data) {
            safeParseAndHandle(data, function(parsed){
                $('#lbltotalabierto').html(parsed.TOTAL);
            });
        });

        $.post("../../controller/ticket.php?op=totalcerrado", function (data) {
            safeParseAndHandle(data, function(parsed){
                $('#lbltotalcerrado').html(parsed.TOTAL);
            });
        });
        
        $.post("../../controller/usuario.php?op=totalanulado", {usu_id:usu_id}, function (data) {
            safeParseAndHandle(data, function(parsed){
                $('#lbltotalanulado').html(parsed.TOTAL);
            });
        });

        $.post("../../controller/ticket.php?op=grafico",function (data) {
            safeParseAndHandle(data, function(parsed){
                new Morris.Bar({
                    element: 'divgrafico',
                    data: parsed,
                    xkey: 'nom',
                    ykeys: ['total'],
                    labels: ['Value'],
                    barColors: ["#1d1ab2"], 
                });
            });
        });
        $('#idcalendar').fullCalendar({
            lang:'es',
            header:{
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'  
            },
            defaultView:'month',
            events:{
                url:'../../controller/ticket.php?op=all_calendar'
            }
        });

    }

    

});

init();