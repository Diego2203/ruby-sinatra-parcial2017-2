var no_coin = function(){   
    var nodo_login = document.getElementById("login");
    var nodo_ingresar = document.getElementById("ingresar");
    nodo_ingresar.classList.remove("mt-4")
    var n_span = document.createElement("span");
    n_span.textContent = "Usuario y/o contraseña no coinciden";
    nodo_login.insertBefore(n_span, nodo_ingresar);  
}

var abrir_registro = function(){
    var modal = document.getElementById("mimodal");
    modal.classList.remove("invisible");
    modal.classList.add("visible");
    
}
var cerrar_registro = function(){
    var modal = document.getElementById("mimodal");
    modal.classList.remove("visible");
    modal.classList.add("invisible");
}

var main = function(){
    
    document.getElementById("crear_usuario").addEventListener("click", abrir_registro)

}

window.onload = main;
