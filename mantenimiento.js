
var crear_dep = function() {

    var xhr = new XMLHttpRequest();
    var lista = 0;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            lista = JSON.parse(xhr.responseText);

            for (var i = 0; i < lista.length; i++) {
              
                var depar = document.getElementById("departamentos");
                var dep_tr = document.createElement("tr");
                var dep_td = document.createElement("td");
                depar.appendChild(dep_tr);
                dep_td.textContent = lista[i].nombre;
                dep_tr.appendChild(dep_td);
                var iconos = document.createElement("td");
                var i_search = document.createElement("i");
                var i_pencil = document.createElement("i");
                var i_eliminar = document.createElement("i");

                i_search.className = "fa fa-search h_azul animated pulse";
                i_pencil.className = "fa fa-pencil ml-3 h_azul animated pulse";
                i_eliminar.className = "fa fa-times ml-3 h_rojo animated pulse";

                iconos.appendChild(i_search);
                iconos.appendChild(i_pencil);
                iconos.appendChild(i_eliminar);
                dep_tr.appendChild(iconos);
            }
        }
    };

    xhr.open("GET", "http://45.55.64.102/g2/departamento/listar", true);
    xhr.send();


}







var main = function() {
    crear_dep();
}

window.onload = main;