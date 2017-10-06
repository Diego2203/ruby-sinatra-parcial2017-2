///////////////
var crear_tablas_nombre = function (lista_db, nodo_id, i) {

    var depar = document.getElementById(nodo_id);
    var dep_tr = document.createElement("tr");
    var dep_td = document.createElement("td");
    depar.appendChild(dep_tr);
    dep_td.textContent = lista_db.nombre;
    //console.log(lista[i].id);
    dep_tr.appendChild(dep_td);
    var iconos = document.createElement("td");
    if (nodo_id != "distritos") {
        var i_search = document.createElement("i");
        i_search.className = "fa fa-search h_azul animated pulse";
        i_search.addEventListener("click", function () {
            if (nodo_id == "departamentos") {
                if (document.getElementById("provincias").childNodes.length == 0) {
                    mostrar_prov(i + 1);
                }
                else {
                    eliminar_nodos("provincias")
                    eliminar_nodos("prov_head")
                }
            }
            if (nodo_id == "provincias") {
                if (document.getElementById("distritos").childNodes.length == 0) {
                    mostrar_distr(i + 1);
                }
                else {
                    eliminar_nodos("distritos")
                    eliminar_nodos("distr_head")
                }
            }

        })
        iconos.appendChild(i_search);
    }
    var i_pencil = document.createElement("i");
    var i_eliminar = document.createElement("i");


    i_eliminar.addEventListener("click", function () {
        if (nodo_id == "departamentos") {
            eleminar_dep(i+1);
        }
        if (nodo_id == "provincias") {
            eleminar_prov(i+1);
        }
        if (nodo_id == "distritos") {
            eleminar_dis(i+1);
        }
    })
    i_pencil.addEventListener("click",function(){
        if(dep_td.lastChild.type == "text"){
            //aqui van las funciones con ajax
            if (nodo_id == "departamentos") {
                editar_dep(i+1,dep_td.lastChild.value);
            }
            if (nodo_id == "provincias") {
                editar_prov(i+1,dep_td.lastChild.value);
            }
            if (nodo_id == "distritos") {
                editar_dis(i+1,dep_td.lastChild.value);
            }
        }
        else{
            dep_td.removeChild(dep_td.lastChild);
            var inp_txt = document.createElement("input");
            inp_txt.type = "text";
            dep_td.appendChild(inp_txt)
        }

    })
    i_pencil.className = "fa fa-pencil ml-3 h_azul animated pulse";
    i_eliminar.className = "fa fa-times ml-3 h_rojo animated pulse";


    iconos.appendChild(i_pencil);
    iconos.appendChild(i_eliminar);
    dep_tr.appendChild(iconos);
}

///////////
var mostrar_dep = function () {

    var xhr = new XMLHttpRequest();
    var lista = 0;

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            lista = JSON.parse(xhr.responseText);

            for (var i = 0; i < lista.length; i++) {

                crear_tablas_nombre(lista[i], "departamentos", i)
            }
        }
    };

    xhr.open("GET", "http://45.55.64.102/g2/departamento/listar", true);
    xhr.send();
}
////////////
var mostrar_prov = function (depart_id) {
    var xhr = new XMLHttpRequest();
    var lista_prov = 0;
    xhr.onreadystatechange = function () {
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
                crear_tablas_nombre(lista_prov[i], "provincias", i);
            }
        }
    }
    xhr.open("GET", "http://45.55.64.102/g2/provincia/listar/" + depart_id, true);
    xhr.send();
}
///////////
var mostrar_distr = function (prov_id) {
    var xhr = new XMLHttpRequest();
    var lista_prov = 0;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            lista_prov = JSON.parse(xhr.responseText);
            //console.log(lista_prov);
            var nombre_head = document.createElement("th");
            nombre_head.textContent = "Nombre";
            var ope_head = document.createElement("th");
            ope_head.textContent = "Operaciones";
            document.getElementById("distr_head").appendChild(nombre_head);
            document.getElementById("distr_head").appendChild(ope_head);
            for (var i = 0; i < lista_prov.length; i++) {
                crear_tablas_nombre(lista_prov[i], "distritos", i);
            }
        }
    }
    xhr.open("GET", "http://45.55.64.102/g2/distrito/listar/" + prov_id, true);
    xhr.send();
}
var eliminar_nodos = function (nodo_id) {
    var nodo = document.getElementById(nodo_id);
    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }
}
var agregar_tr = function (t_body) {
    var tabla = document.getElementById(t_body);
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    tr.appendChild(td1);

    var input_t = document.createElement("input");
    input_t.className = "form-control";
    input_t.type = "text";
    td1.appendChild(input_t);
    //input_t.setAttribute("readonly","")
    tabla.appendChild(tr);

    var icon_mas = document.createElement("i");
    icon_mas.className = "fa fa-plus h_azul animated pulse";
    td2.appendChild(icon_mas);
    icon_mas.addEventListener("click", function () {
        if (t_body == "departamentos") {
            var obj_env = {
                "nombre": input_t.value
            };
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(t_body + "guardado");
                    document.getElementById("dep_ing").textContent = t_body + " guardado";

                }
            }
            xhr.open("POST", "http://45.55.64.102/g2/departamento/crear", true);
            xhr.send(JSON.stringify(obj_env))
        }
        if (t_body == "provincias") {
            var obj_env2 = {
                "departamento_id": 1,
                "nombre": input_t.value
            };
            var xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = function () {
                if (xhr2.readyState == 4 && xhr2.status == 200) {
                    console.log(t_body + "guardado");
                    document.getElementById("prov_ing").textContent = t_body + " guardado";
                }
            }
            xhr2.open("POST", "http://45.55.64.102/g2/provincia/crear", true);
            xhr2.send(JSON.stringify(obj_env2))
        }
        if (t_body == "distritos") {
            var obj_env3 = {
                "provincia_id": 1,
                "nombre": input_t.value
            };
            var xhr3 = new XMLHttpRequest();
            xhr3.onreadystatechange = function () {
                if (xhr3.readyState == 4 && xhr3.status == 200) {
                    console.log(t_body + "guardado");
                    document.getElementById("dist_ing").textContent = t_body + " guardado";
                }
            }
            xhr3.open("POST", "http://45.55.64.102/g2/distrito/crear", true);
            xhr3.send(JSON.stringify(obj_env3))
        }
    })

    var icon_x = document.createElement("i");
    icon_x.className = "fa fa-times ml-3 h_rojo animated pulse";
    td2.appendChild(icon_x);

    tr.appendChild(td2);
}
var escuchar_botones = function () {
    var btn_depar = document.getElementById("btn_depar");
    var btn_prov = document.getElementById("btn_prov");
    var btn_dist = document.getElementById("btn_dist");
    btn_depar.addEventListener("click", function () {
        agregar_tr("departamentos")
    });
    btn_prov.addEventListener("click", function () {
        agregar_tr("provincias")
    });
    btn_dist.addEventListener("click", function () {
        agregar_tr("distritos")
    });

}
////////////////////////////////////
var eleminar_dep = function (id) {
    obj_env = {
        "id": id,
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("departamento eliminado")
        }
    };

    xhr.open("POST", "http://45.55.64.102/g2/departamento/eliminar", true);
    xhr.send(JSON.stringify(obj_env));
}
var eleminar_prov = function (id) {
    obj_env = {
        "id": id,
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("provincia eliminada")
        }
    };

    xhr.open("POST", "http://45.55.64.102/g2/provincia/eliminar", true);
    xhr.send(JSON.stringify(obj_env));
}
var eleminar_dis = function (id) {
    obj_env = {
        "id": id,
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("distrito eliminado")
        }
    };

    xhr.open("POST", "http://45.55.64.102/g2/distrito/eliminar", true);
    xhr.send(JSON.stringify(obj_env));
}
var editar_dep = function(id,valor){
    obj_env = {
        "id": id,
        "nombre" : valor
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("dep_ing").textContent = "departamento editado";
        }
    };

    xhr.open("POST", "http://45.55.64.102/g2/departamento/editar", true);
    xhr.send(JSON.stringify(obj_env));
}
var editar_prov = function(id,valor){
    obj_env = {
        "id": id,
        "nombre" : valor
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("prov_ing").textContent = "provincia editada";
        }
    };

    xhr.open("POST", "http://45.55.64.102/g2/provincia/editar", true);
    xhr.send(JSON.stringify(obj_env));
}
var editar_dis = function(id,valor){
    obj_env = {
        "id": id,
        "nombre" : valor
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("dist_ing").textContent = "distrito editado"
        }
    };

    xhr.open("POST", "http://45.55.64.102/g2/distrito/editar", true);
    xhr.send(JSON.stringify(obj_env));
}



var main = function () {
    mostrar_dep();
    escuchar_botones();
}

window.onload = main;
