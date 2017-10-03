/*
var lista;
var listar_dep = function(){

	var xhr = new XMLHttpRequest();

  	xhr.onreadystatechange = function() {
    	if (xhr.readyState == 4 && xhr.status == 200) {
     		lista = JSON.parse(xhr.responseText);
    	}
  	};
  	xhr.open("GET", "http://45.55.64.102/g2/departamento/listar", true);
  	xhr.send();
}
var crear_dep = function(){
	
} */
var xhr = new XMLHttpRequest();
var lista = 0;

xhr.onreadystatechange = function() {
   	if (xhr.readyState == 4 && xhr.status == 200) {
  		lista = JSON.parse(xhr.responseText);
    }
};

xhr.open("GET", "http://45.55.64.102/g2/departamento/listar", true);
xhr.send();

var crear_dep = function(){
	var documentos = document.getElementById("departamentos");
	var dep = document.createElement("td");
	dep.innerHTML = lista[0].nombre;
	documentos.appendChild(dep)
}





var main = function(){
	
}

window.onload = main;
