function init(){

}

$(document).ready(function(){
    var usu_id = $('#user_idx').val();

    /* TODO: Llenar graficos segun rol  */
    if ( $('#rol_idx').val() == 1){
        $.post("../../controller/ticket.php?op=total", {usu_id:usu_id}, function (data) {
            data = JSON.parse(data);
            $('#lbltotal').html(data.TOTAL);
        }); 

        $.post("../../controller/ticket.php?op=totalabierto", {usu_id:usu_id}, function (data) {
            data = JSON.parse(data);
            $('#lbltotalabierto').html(data.TOTAL);
        });

        $.post("../../controller/ticket.php?op=totalcerrado", {usu_id:usu_id}, function (data) {
            data = JSON.parse(data);
            $('#lbltotalcerrado').html(data.TOTAL); 
        });

      

        $.post("../../controller/ticket.php?op=grafico", {usu_id:usu_id},function (data) {
            data = JSON.parse(data);

            new Morris.Bar({
                element: 'divgrafico',
                data: data,
                xkey: 'nom',
                ykeys: ['total'],
                labels: ['Value'],
                barColors: ["#1d1ab2"], 
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
            data = JSON.parse(data);
            $('#lbltotal').html(data.TOTAL);
        });

        $.post("../../controller/ticket.php?op=totalabierto",function (data) {
            data = JSON.parse(data);
            $('#lbltotalabierto').html(data.TOTAL);
        });

        $.post("../../controller/ticket.php?op=totalcerrado", function (data) {
            data = JSON.parse(data);
            $('#lbltotalcerrado').html(data.TOTAL);
        });
        
        $.post("../../controller/usuario.php?op=totalanulado", {usu_id:usu_id}, function (data) {
            data = JSON.parse(data);
            $('#lbltotalanulado').html(data.TOTAL);
        });


        $.post("../../controller/ticket.php?op=grafico",function (data) {
            data = JSON.parse(data);

            new Morris.Bar({
                element: 'divgrafico',
                data: data,
                xkey: 'nom',
                ykeys: ['total'],
                labels: ['total']
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