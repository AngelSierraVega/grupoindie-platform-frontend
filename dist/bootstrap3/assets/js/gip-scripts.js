/* 
 * Copyright (C) 2016 Angel Sierra Vega. Grupo INDIE.
 *
* @license file://LICENSE
*/

/**
 * 
 * @author Angel Sierra Vega <angel.sierra@grupoindie.com>
 * @since 2017-01-05
 */
//$.fn.modal.Constructor.DEFAULTS.backdrop = 'static';

/**
 * 
 * @author Angel Sierra Vega <angel.sierra@grupoindie.com>
 * @since 2017-04-29
 * @version GIP.00.01
 */
$.blockUI.defaults.message = "";

/**
 * 
 * @author Angel Sierra Vega <angel.sierra@grupoindie.com>
 * @since 2017-04-29
 * @version GIP.00.02
 */
$(document).ajaxStart(function () {
    $.blockUI({
        baseZ: 2000
    });
})

/**
 * 
 * @author Angel Sierra Vega <angel.sierra@grupoindie.com>
 * @since 2017-04-29
 * @version GIP.00.01
 */
$(document).ajaxStop(function () {
    $.unblockUI();
});


// Declaracion de variables globales.
var id_placeholder;
var last_id_created;

// Configuraciones globales de jstree
$.jstree.defaults.core.themes.variant = "large";
$.jstree.defaults.core.themes.name = "proton";
$.jstree.defaults.core.themes.responsive = true;
$.jstree.defaults.core.themes.icons = false;

/**
 * Prevent submit
 * 
 * @since 2017-02-03
 * @author Angel Sierra Vega <angel.sierra@grupoindie.com>
 * 
 * @version beta.00.01
 */
$(document).on("submit", "form", function (e) {
    e.preventDefault();
    var oForm = $(this);

    var data = oForm.serialize();
    data += "&gip-action=" + oForm.attr("gip-action");
    data += "&gip-action-id=" + oForm.attr("gip-action-id");
    data += "&gip-action-class=" + oForm.attr("gip-action-class");
    data += "&gip-id-placeholder=" + id_placeholder;

    var target = oForm.attr("target");

    var request = $.ajax({
        url: "?",
        method: "POST",
        data: data,
        dataType: "html",
        cache: false
    });

    request.done(function (data) {
        //triggerParents(id_placeholder, oForm.attr("gip-action-id"));
        $("#" + id_placeholder).find('button[gip-action="widget-reload"]').trigger('click');
        setTimeout(function () {
            $(target).html(data);
            //$('#' + oForm.attr("id") + " .gip-form-response").html(data);
        }, 200);

        $('#gip-modal').find('.btn-success').hide();

    });

    request.fail(function (jqXHR, textStatus) {

    });

});



/**
 * Handles ajax error
 * 
 * @since 2017-03-02
 * @author Angel Sierra Vega <angel.sierra@grupoindie.com>
 * 
 * @version beta.00.01
 */
function ajaxErrorHandler(event) {
    var _modal = $('#gip-modal');
    _modal.modal("show");
    var el = $('.modal .modal-content');
    var string = "<div class='modal-header'>";
    string += "<button type='button' class='close' data-dismiss='modal' aria-label='Cerrar'><span aria-hidden='true'>&times;</span></button>"
    string += "<h4 class='modal-title '>Error: " + event.status + "</h4>";
    string += "</div>";
    string += "<div class='modal-body'>";
    string += event.responseText;
    string += "</div>";
    string += '<div class="modal-footer">';
    string += '  <div class="btn-group" role="group" aria-label="...">';
    string += '     <button class="btn btn-default" data-dismiss="modal" type="button">Cerrar</button>';
    string += '  </div>';
    string += '</div>';
    el.html(string);

}



/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-06-05
 * @version GIP.00.01
 * @description Elimia el contenido de cualquir modal que ejecute el evento hide
 */
$(document).on('click', 'button[gip-action]', function (e) {
    e.preventDefault();
    if (typeof $(this).attr('gip-modal') != "undefined") {

        var gip_action = $(this).attr('gip-action');
        var gip_action_id = $(this).attr('gip-action-id');
        var gip_action_class = $(this).attr('gip-action-class');
        var gip_modal_size = $(this).attr("gip-modal");
        var gip_selected_id = $(this).attr("gip-selected-id");

        $(".modal").removeClass("modal-sm");
        $(".modal").removeClass("modal-md");
        $(".modal").removeClass("modal-lg");

        if (isNaN(gip_modal_size)) {
            $(".modal").addClass("modal-" + gip_modal_size);
        }

        $('#gip-modal').modal("show");

        var data = {
            'gip-action': gip_action,
            'gip-action-id': gip_action_id,
            'gip-action-class': gip_action_class,
            'gip-selected-id': gip_selected_id
        };
        id_placeholder = $(this).closest('.panel').parent().attr("id");

        $.ajax({
            type: "POST",
            data: data,
            url: "?", //
            success: function (data) {
                $('#gip-modal').html(data);
            },
            error: ajaxErrorHandler
        });
    }

});

/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-05-27
 * @version GIP.00.01
 */
$(document).on('click', 'a[gip-action]', function (e) {
    e.preventDefault();
    if (typeof $(this).attr('gip-modal') != "undefined") {

        $('#gip-modal').modal("show");

        // Recuperamos los attributos con la informacion que sera enviada al ajax
        var gip_action = $(this).attr('gip-action');
        var gip_action_id = $(this).attr('gip-action-id');
        var gip_action_class = $(this).attr('gip-action-class');

        //if (gip_action == "edit") {
        //var data = {'gip-action': gip_action, 'gip-action-id': gip_action_id, 'gip-action-class': gip_action_class};
        //} else {
        var data = {'gip-action': gip_action, 'gip-action-id': gip_action_id, 'gip-action-class': gip_action_class};
        //}

        $.ajax({
            type: "POST",
            data: data,
            url: "?",
            success: function (data) {
                // Reemplaxamos el contenido del modal con los nuevos datos.
                $('#gip-modal').html(data);
            },
            error: ajaxErrorHandler
        });


    }

});


/**
 * @deprecated
 */
//$(document).on('click', 'a[gip-action="getModal"]', function (e) {
//    e.preventDefault();
//    var HREF = $(this).attr("href");
//    var size = $(this).attr("gip-size-modal");
//    getModal(HREF);
//});

/**
 * @deprecated
 */
$(document).on('click', '.navbar a[gip-action="setController"]', function (e) {
    e.preventDefault();
    $(".navbar-nav li").removeClass("active");
    $(this).closest("li").addClass("active");
    var HREF = this.attributes[1].value;
    $.ajax({
        type: "POST",
        data: {'gip-controller': HREF,
            'gip-action': 'setController',
            'gip-action-id': HREF},
        url: "?",
        success: function (data) {
            $('#gip-container').html(data);
        },
        error: ajaxErrorHandler
    });
});


/**
 * @deprecated
 */
function getModal(modalId) {
    //alert("getModal");

}


/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-05-22
 * @version GIP.00.01
 * @description Recarga un nuevo widget con lso datos
 */
$(document).on('click', 'button[gip-action=\'widget-reload\']', function (e) {
    var panel = $(this).closest('.panel');
    var container = panel.parent();
    var data = {
        "gip-action": "widget-reload",
        "gip-action-id": container.attr('id'),
        "gip-action-class": $(this).attr('gip-action-class'),
        "gip-selected-id": $(this).attr('gip-selected-id'),
    };
    $.ajax({
        type: "POST",
        data: data,
        url: "?",
        success: function (data) {
            $("#" + container.attr('id')).html(data);
        },
        error: ajaxErrorHandler
    });
});


/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-05-30
 * @version GIP.00.01
 * @description Al abrir un nuevo modal manda el scroll a la posicion de top
 */
$(document).on('show.bs.modal', function () {
    $("html, body").animate({scrollTop: 0}, "slow");
});

/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-06-04
 * @version GIP.00.01
 * @description Elimina el contenido de cualquir modal que ejecute el evento hide
 */
$(document).on('hidden.bs.modal', function (e) {
    $("#gip-modal .modal-header").html("");
    $("#gip-modal .modal-body").html("");
    $("#gip-modal .modal-footer").html("");
});

// Iniciia el registro del tab GUID.
register_tab_GUID();

/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-06-06
 * @version GIP.00.01
 * @description Registra un nuevo GUID del tab en el que se encuentra
 */
function register_tab_GUID() {
    // Verificamos que el uso de localstorage este disponible
    if (typeof (Storage) !== "undefined") {
        // obtenemos (Sino establecemos) la GUID de la tab y almacenamos la sesion de esa tab
        if (sessionStorage["tabGUID"] == null)
            sessionStorage["tabGUID"] = tab_GUID();
        var guid = sessionStorage["tabGUID"];

        // Agregamos un event listener al localstorage
        window.addEventListener("storage", storage_Handler, false);

        // establaecemos la GUID del tab en local storage
        localStorage["tabGUID"] = guid;
    }
}

/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-06-06
 * @version GIP.00.01
 * @description Verifica la existencia de algun GUID
 */
function storage_Handler(e) {
    // Si el GUID de la tab no coincide con alguna de las demas tabs
    if (e.key == 'tabGUID') {
        // Si coincide entonces mandamos el mensaje de alerta
        if (e.oldValue != e.newValue)
            tab_Warning();
    }
}


/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-06-06
 * @version GIP.00.01
 * @description Crea el GUID para cada nueva tab que encuentre
 */
function tab_GUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
}

/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-06-06
 * @version GIP.00.01
 * @description Envia el mensaje al GUID  cirreosibduebte
 */
function tab_Warning() {
    $('body').html('<div class="col-xs-12"><p ><h3 class="text-center">Ya hay una sesión abierta.</h3><h6 class="text-center">Nuestro sistema solo permite una sesión abierta del sistema.</h6></p></div>');
}



// Funciones de uso global


/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-06-11
 * @version GIP.00.01
 * @description Crea un nuevo jstree
 */
function create_jstree(widgetId) {

    // Inicializamos nuestro jstree
    $('#' + widgetId).jstree({
        'core': {
            "multiple": false,
            "animation": 250
        },
        "plugins": [
            "search",
            //"state",
            "actions"

        ],
        "state": {"key": widgetId},
        "search": {
            "show_only_matches": true,
        }
    }).bind("ready.jstree", function (event, data) {
        $(this).jstree("open_all");

        /*$('.gip-buttons-jstree').each(function(){
         var parent = $(this).closest('.jstree-node');
         var element = $(this).detach();
         parent.prepend(element);
         });*/

    });


    // Codigo para la busqueda de elementos dentro de jstree
    var to = false;
    $('#search_' + widgetId).keyup(function () {
        if (to) {
            clearTimeout(to);
        }
        to = setTimeout(function () {
            var v = $('#search_' + widgetId).val();
            $('#' + widgetId).jstree(true).search(v);
        }, 250);
    });

    // Evento de seleccion de nodo
    $("#" + widgetId).on("select_node.jstree", function (evt, data) {
        // Obtenemos el id del elemento que estamos seleccionando de nuestro jstree
        var idelement = data.node.li_attr.idelement;
        //var btn_reload = $(evt.target).closest('.panel button[gip-action=\'widget-reload\']');

        //console.log("TEST");

        //$(this).closest("li").addClass("active");
        setTimeout(function () {
            //var btn_reload = $(evt.target).closest('.panel').find('button');
            var btn_reload = $(evt.target).closest('.panel')[0];
            //console.log(btn_reload);
            btn_reload = $(btn_reload).find('.panel-heading')[0];
            //console.log(btn_reload);
            btn_reload = $(btn_reload).find('button');
            for (i = 0; i < btn_reload.length; i++) {
                $(btn_reload[i]).attr("gip-selected-id", idelement);
            }
            // Obtenemos el id del panel desde donde se ejecuta la accion
            var id_parent = $(evt.target).closest('.panel').parent().attr('id');
            // usamos la funcion de sendChildrensId para enviar el id del elemento seleccionaoo
            // en el jstree ademas del id del padre en donde se encuentra el evento.
            sendChildrensId(idelement, id_parent);
        }, 50);

    });
}

/**
 * @author Izmir Sanchez Juarez <izmirreffi@gmail.com>
 * @since 2017-06-11
 * @version GIP.00.02
 * @description Crea un nuevo datatable
 */
function create_datatable(tableId, options_backend) {

    // Iniciamos las opciones con el idioma en español
     var options = {};
//    var options = {
//        "sProcessing": "Procesando...",
//        "sLengthMenu": "Mostrar _MENU_ registros",
//        "sZeroRecords": "No se encontraron resultados",
//        "sEmptyTable": "Ningún dato disponible en esta tabla",
//        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
//        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
//        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
//        "sInfoPostFix": "",
//        "sSearch": "Buscar:",
//        "sUrl": "",
//        "sInfoThousands": ",",
//        "sLoadingRecords": "Cargando...",
//        "oPaginate": {
//            "sFirst": "Primero",
//            "sLast": "Último",
//            "sNext": "Siguiente",
//            "sPrevious": "Anterior"
//        },
//        "oAria": {
//            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
//            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
//        }
//    };


    // Colocamos opciones que iran por default
    //options.responsive = true;
    options.scrollX = true;

    if (options_backend.selectable == true) {
        options.select = {
            style: 'single'
        };
    }

    options.autoWidth = false;
    options.length = -1;

    // Cambiamos el texto para el select y el texto de la paginacion por iconos
    options.language = {
        "paginate": {
            "previous": '<i class="glyphicon glyphicon-chevron-left" aria-hidden="true"></i>',
            "next": '<i class="glyphicon glyphicon-chevron-right" aria-hidden="true"></i>'
        },
        select: {
            rows: "%d filas seleccionadas"
        }

    };

    // Establecemos las opciones para la paginacion.
    if (options_backend.pagination) {
        options.bPaginate = true;
    } else {
        options.bPaginate = false;
        options.sPaginate = '';
    }

    // Habilita la opcion de busqueda dependiendo de las
    // opciones del backedn
    options.searching = options_backend.search;

    // Verificamos que el backend permita la exportacion en archivos.
    if (options_backend.export) {
        options.dom = 'lBfrtip';
        options.buttons = [{
                extend: 'pdfHtml5',
                download: 'open',
                text: 'Crear PDF',
                className: "btn btn-primary btn-sm pull-left",
                footer: true,
                title: options_backend.title,
                exportOptions: {
                    modifier: {
                    },
                    columns: options_backend.columns
                },

                customize: function (doc) {
                    //doc.columns   {fontsize:22, bold:true};
                }
            }, {
                extend: 'excelHtml5',
                text: 'Crear Excel',
                className: "btn btn-primary btn-sm pull-left",
                footer: true,
                title: options_backend.title,
                exportOptions: {
                    columns: options_backend.columns
                }
            },
            {
                extend: 'csvHtml5',
                text: 'Crear CSV',
                className: "btn btn-primary btn-sm pull-left",
                footer: true,
                title: options_backend.title,
                exportOptions: {
                    columns: options_backend.columns
                }
            },
            {
                extend: 'copyHtml5',
                text: 'Portapapeles',
                className: "btn btn-primary btn-sm pull-left",
                footer: true,
                title: options_backend.title,
                exportOptions: {
                    columns: options_backend.columns
                }
            }
        ];
    }

    // Inicializamos datable con las opciones previas
    var table = $('#' + tableId).DataTable(options);

//    var column = table.column(3);
//
//    $(column.footer()).html(
//            column.data().reduce(function (a, b) {
//        return a + b;
//    })
//            );

    // Verificamos que la tabla pueda ser seleccionable.
    if (options_backend.selectable) {
        $("table button").click(function (e) {

//            setTimeout(function () {
//                $(e.target).closest("tr").removeClass("selected");
//            }, 50);

        });

        table.on('select', function (e, dt, type, indexes) {
            /**
             * @todo usar atributo gip-record dentro de tr para encontrar el id
             *      del elemento seleccionado
             * @type jQuery
             */
            var rowData = table.rows(indexes).data().toArray()[0][1];
            /**
             * @todo usar atributo gip-placeholder para encontrar id_parent
             * @type jQuery
             */
            var id_parent = $(e.target).closest('.panel').parent().attr('id');
            var tr_element = table.row(indexes).node();

            var id_element = $(tr_element).attr("gip-record");

//            setTimeout(function () {
//                //var btn_reload = $(evt.target).closest('.panel').find('button');
//                var btn_reload = $(e.target).closest('.panel')[0];
//                //console.log(btn_reload);
//                btn_reload = $(btn_reload).find('.panel-heading')[0];
//                //console.log(btn_reload);
//                btn_reload = $(btn_reload).find('button');
//                for (i = 0; i < btn_reload.length; i++) {
//                    $(btn_reload[i]).attr("gip-selected-id", id_element);
//                }
//            }, 50);

            sendChildrensId(id_element, id_parent);
        });

        table.on('user-select', function (e, dt, type, cell, originalEvent) {
            if ($(cell.node()).parent().hasClass('selected')) {
                e.preventDefault();
            }
        });

    }


}