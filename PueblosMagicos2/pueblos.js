function puebloMagico() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.nameAlojamiento = "";
    this.desAlojamiento = "";
    this.nameRestaurante = "";
    this.desRestaurante = "";
    this.nameAct = "";
    this.desAct = "";
}

var urlParams = new URLSearchParams(window.location.search);
var idPueblo = urlParams.get('id');
console.log(idPueblo);

// Declarar la variable pueblo en un alcance más amplio
var pueblo = new puebloMagico();

cargarPuebloMagico(idPueblo);

// Función para cargar los datos del pueblo mágico
function cargarPuebloMagico(idPueblo) {
    // Realizar una solicitud AJAX para obtener los datos del pueblo mágico
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "obtenerUno.php?idPuebloMagico=" + idPueblo, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // La solicitud se completó con éxito
                var data = JSON.parse(xhr.responseText);

                // Asignar los datos a la variable pueblo
                pueblo.id = data[0].idPuebloMagico;
                pueblo.name = data[0].Nombre_pueblomagico;
                pueblo.description = data[0].Descripcion_pueblomagico;
                pueblo.nameAlojamiento = data[0].NombreAlojamiento;
                pueblo.desAlojamiento = data[0].DescripcionAlojamiento;
                pueblo.nameRestaurante = data[0].NombreRestaurante;
                pueblo.desRestaurante = data[0].DescripcionRestaurante;
                pueblo.nameAct = data[0].NombreActividad;
                pueblo.desAct = data[0].DescripcionActividad;

                console.log(pueblo);
                setPropiedades();
            } else {
                console.error("Error en la consulta");
            }
        }
    };
    xhr.send();
}

function setPropiedades(){
    var n = document.getElementById('nomPueblo');
    n.innerHTML = pueblo.name;
    var d = document.getElementById('pDes');
    d.innerHTML = pueblo.description;

    var nAc = document.getElementById('nombreAc');
    nAc.innerHTML = pueblo.nameAct;
    var desAc = document.getElementById('desAc');
    desAc.innerHTML=pueblo.desAct;

    var nA = document.getElementById('nombreA');
    nA.innerHTML = pueblo.nameAlojamiento;
    var desA = document.getElementById('desA');
    desA.innerHTML=pueblo.desAlojamiento;

    var nAr = document.getElementById('nombreR');
    nAr.innerHTML = pueblo.nameRestaurante;
    var desAr = document.getElementById('desR');
    desAr.innerHTML=pueblo.desRestaurante;
}




