function puebloMagico() {
    this.idPueblo = 0;
    this.name = "";
    this.description = "";
    this.idregion = 0;
}

var pueblos = [];
var tabla;

document.getElementById("pueblo-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Llama a la función setPueblo cuando se envía el formulario
    setPueblo();
});



function setPueblo() {
    var nameValue = document.getElementById("nombre").value;
    var descripcionValue = document.getElementById("descripcion").value;
    var transportValue = document.getElementById("transporte").value;
    var linkValue = document.getElementById("URL").value;
    var regionValue = document.getElementById("region").value;
    var nombreAct = document.getElementById("act").value;
    var nombreAloj = document.getElementById("aloj").value;
    var nombreRes = document.getElementById("res").value;
    var desAct = document.getElementById("descAct").value;
    var desAloj = document.getElementById("descAloj").value;
    var desRes = document.getElementById("descRes").value;

    var formData = new FormData();
    formData.append("nombre", nameValue);
    formData.append("descripcion", descripcionValue);
    formData.append("transporte", transportValue);
    formData.append("url", linkValue);
    formData.append("region", regionValue);
    formData.append("act", nombreAct);
    formData.append("descAct", desAct);
    formData.append("aloj", nombreAloj);
    formData.append("descAloj", desAloj);
    formData.append("res", nombreRes);
    formData.append("descRes", desRes);


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "insertar_pueblo.php", true);

    // Manejar la respuesta solo cuando la solicitud se ha completado (readyState = 4)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // La solicitud se completó con éxito
                console.log(xhr.responseText);
                // Limpia los campos de nombre y descripción después de agregar la fila
                document.getElementById("nombre").value = "";
                document.getElementById("descripcion").value = "";
                document.getElementById("transporte").value = "";
                document.getElementById("URL").value = "";
                window.alert ("Registro guardado correctamente");
                cargarPueblos(); // Recargar los datos en la tabla
            } else {
                console.error("Error en la solicitud de inserción");
            }
        }
    };

    xhr.send(formData);
}


window.onload = function () {
    cargarPueblos();
}
function cargarPueblos() {
    pueblos = [];
    // Realizar una solicitud AJAX para obtener los registros de la base de datos
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "obtener_pueblos.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // La solicitud se completó con éxito
                var data = JSON.parse(xhr.responseText);

                // Agregar los registros al array de pueblos
                for (var i = 0; i < data.length; i++) {
                    var pueblo = new puebloMagico();
                    pueblo.idPueblo = data[i].idPuebloMagico;
                    pueblo.name = data[i].Nombre_pueblomagico;
                    pueblo.description = data[i].Descripcion_pueblomagico;
                    pueblo.idregion = data[i].Region_idRegion;
                    pueblos.push(pueblo);
                }

                // Llamar a setTabla después de cargar los datos
                setTabla();
            } else {
                console.error("Error en la consulta");
            }
        }
    };
    xhr.send();
}


function setTabla() {
    console.log("Tabla actualizada");
    tabla = document.getElementById("pueblos-table");

    // Eliminar todas las filas de datos (empezando desde el índice 1)
    for (let i = tabla.rows.length - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }

    for (let i = 0; i < pueblos.length; i++) {

        var newRow = document.createElement("tr");
        var idCell = document.createElement("td");
        var nameCell = document.createElement("td");
        var descripcionCell = document.createElement("td");
        var regCell = document.createElement("td");
        var buttonsCell = document.createElement('td')

        idCell.innerHTML = pueblos[i].idPueblo;
        var deletebtn = document.createElement("button");
        var editbtn = document.createElement("button");

        deletebtn.innerHTML = "Eliminar";
        //deletebtn.style = " background-color: #204218;"
        deletebtn.onclick = function() { eliminar(this); };

        editbtn.innerHTML = "Editar";
        editbtn.setAttribute('class', 'btnEditar');
        editbtn.onclick = function () {editar(this);};

        buttonsCell.appendChild(deletebtn);
        buttonsCell.append(editbtn);

        var inputName = document.createElement("input");
        var inputDescripcion = document.createElement("textarea");

        inputName.type = "text";   
        inputName.value = pueblos[i].name;
        inputDescripcion.value = pueblos[i].description;


        nameCell.appendChild(inputName);
        descripcionCell.appendChild(inputDescripcion);

        // Crear el elemento select para la región
        var selectRegion = document.createElement("select");
        selectRegion.id = "region_" + i; // Asignar un ID único
        //selectRegion.disabled = true; // Deshabilitar el select por defecto

        // Definir las opciones para el select
        var regiones = ["Costa", "Cañada", "Istmo", "Valles Centrales", "Sierra sur", "Sierra Norte", "Papaloapan", "La Mixteca"];
        for (var j = 0; j < regiones.length; j++) {
            var option = document.createElement("option");
            option.value = j + 1;
            option.text = regiones[j];
            selectRegion.appendChild(option);
        }

        // Establecer el valor seleccionado en base al valor de pueblos[i].idregion
        selectRegion.value = pueblos[i].idregion;

        regCell.appendChild(selectRegion);

        newRow.appendChild(idCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(descripcionCell);
        newRow.appendChild(regCell);
        newRow.appendChild(buttonsCell);

        tabla.appendChild(newRow);
    }
}


function eliminar(boton) {
    console.log("funcion eliminar activada");

    // Obtener la información del registro que necesitas para identificarlo
    var idRegistro = boton.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
    
    // Realizar una solicitud AJAX para eliminar el registro
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "eliminar_pueblo.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // La solicitud se completó con éxito
                console.log(xhr.responseText);
                // Eliminar la fila de la tabla después de eliminar el registro de la base de datos
                boton.parentNode.parentNode.remove();
                window.alert ("Registro eliminado correctamente");
            } else {
                console.error("Error en la solicitud de eliminación");
            }
        }
    };

    // Enviar la solicitud con la información del registro a eliminar
    xhr.send("nombre=" + encodeURIComponent(idRegistro));
}

function editar(botonE) {
    console.log("funcion editar activada");
    // Obtener el índice de la fila actual
    var rowIndex = botonE.parentNode.parentNode.rowIndex;

    // Obtener el valor de la región seleccionada
    var selectId = "region_" + (rowIndex - 1);
    var opcionSelected = document.getElementById(selectId).value;

    // Obtener el valor de la descripción
    var descripcionRegistro = botonE.parentNode.previousSibling.previousSibling.children[0].value;

    // Obtener el valor del nombre
    var nombreRegistro = botonE.parentNode.previousSibling.previousSibling.previousSibling.children[0].value;

    // Obtener el id
    var idRegistro = botonE.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;

    // Realizar una solicitud AJAX para actualizar el registro
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "actualizar_pueblo.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // La solicitud se completó con éxito
                console.log(xhr.responseText);
                window.alert ("Registro editado correctamente");
                cargarPueblos();
            } else {
                console.error("Error al actualizar el registro");
            }
        }
    };

    // Enviar la solicitud con los nuevos valores
    xhr.send("id=" + encodeURIComponent(idRegistro) + "&nombre=" + encodeURIComponent(nombreRegistro) + "&descripcion=" + encodeURIComponent(descripcionRegistro) + "&region=" + encodeURIComponent(opcionSelected));
}

