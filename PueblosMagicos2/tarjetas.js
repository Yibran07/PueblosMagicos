
function puebloMagico() {
    this.idPueblo = 0;
    this.name = "";
    this.description = "";
    this.urlPueblo = "";
}

var pueblos = [];

window.onload = function () {
    loadPueblos();
}

function loadPueblos() {
    // Elimina la declaración de la variable local pueblos aquí
    var idRegion = document.getElementById('idReg').innerHTML;
    console.log(idRegion);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "tarjetas_pueblos.php?idRegion=" + idRegion, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                for (var i = 0; i < data.length; i++) {
                    var pueblo = new puebloMagico();
                    pueblo.idPueblo = data[i].idPuebloMagico;
                    pueblo.name = data[i].Nombre_pueblomagico;
                    pueblo.description = data[i].Descripcion_pueblomagico;
                    pueblo.urlPueblo = data[i].url_PuebloMagico;
                    pueblos.push(pueblo);
                }
                console.log(pueblos);

                agregarTarjetas();
            } else {
                console.error("Error en la consulta");
            }
        }
    };
    xhr.send();
}

var divCard = document.getElementById('cardsContainer');

function agregarTarjetas() {
    console.log('Agregando tarjetas');

    if (pueblos.length === 0) {
        console.log('El array de pueblos está vacío.');
        return;
    }

    for (let i = 0; i < pueblos.length; i++) {
        console.log('tarjeta');
        var tarjeta = document.createElement('div');
        tarjeta.setAttribute('class', "tarjeta");

        var imagen = document.createElement('img');
        imagen.setAttribute('src', "imagenes/tuxtepec.jpg");

        var divContenido = document.createElement('div');
        divContenido.setAttribute('class', "contenido");

        var titulo = document.createElement('h2');
        titulo.innerHTML = pueblos[i].name;
        var descrip = document.createElement('p');
        descrip.innerHTML = pueblos[i].description;

        var boton  = document.createElement ('button');
        boton.setAttribute('class',"btnP");
        boton.setAttribute('id',pueblos[i].idPueblo);
        boton.onclick = function () {redireccionar(this.id);};
        boton.innerHTML = "Más Información";
        

        divContenido.appendChild(titulo);
        divContenido.appendChild(descrip);
        divContenido.appendChild(boton);

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(divContenido);

        divCard.appendChild(tarjeta);
    }
}

function redireccionar(id) {
    window.location.href = "pueblo.html?id="+ id;
}