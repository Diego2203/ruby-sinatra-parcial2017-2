var crear_tablas_nombre = function(lista_db,nodo_id,i) {

    var depar = document.getElementById(nodo_id);
    var dep_tr = document.createElement("tr");
    var dep_td = document.createElement("td");
    depar.appendChild(dep_tr);
    dep_td.textContent = lista_db.nombre;
    //console.log(lista[i].id);
    dep_tr.appendChild(dep_td);
    var iconos = document.createElement("td");
    var i_search = document.createElement("i");
    var i_pencil = document.createElement("i");
    var i_eliminar = document.createElement("i");

    i_search.className = "fa fa-search h_azul animated pulse";  
    i_search.addEventListener("click", function(){
        
        mostrar_dpts(i+1);
    })
    i_pencil.className = "fa fa-pencil ml-3 h_azul animated pulse";
    i_eliminar.className = "fa fa-times ml-3 h_rojo animated pulse";

    iconos.appendChild(i_search);
    iconos.appendChild(i_pencil);
    iconos.appendChild(i_eliminar);
    dep_tr.appendChild(iconos);
}


var mostrar_dep = function() {

    var xhr = new XMLHttpRequest();
    var lista = 0;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            lista = JSON.parse(xhr.responseText);

            for (var i = 0; i < lista.length; i++) {

                crear_tablas_nombre(lista[i],"departamentos",i)
            }
        }
    };

    xhr.open("GET", "http://45.55.64.102/g2/departamento/listar", true);
    xhr.send();
}
var mostrar_dpts = function(depart_id) {
    var xhr = new XMLHttpRequest();
    var lista_prov = 0;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            lista_prov = JSON.parse(xhr.responseText);
            //console.log(lista_prov);
            var nombre_head = document.createElement("th");
            nombre_head.textContent = "Nombre";
            var ope_head = document.createElement("th");
            ope_head.textContent = "Operaciones";
            document.getElementById("prov_head").appendChild(nombre_head);
            document.getElementById("prov_head").appendChild(ope_head);
            for (var i = 0; i < lista_prov.length; i++) {
                crear_tablas_nombre(lista_prov[i],"provincias");
            }
        }
    }
    xhr.open("GET", "http://45.55.64.102/g2/provincia/listar/" + depart_id, true);
    xhr.send();
}





var main = function() {
    mostrar_dep();
}

window.onload = main;