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
    modal.classList.add("animated");
    modal.classList.add("bounceInDown");
    modal.addEventListener("animationend", function(){
        modal.classList.remove("animated");
        modal.classList.remove("bounceInDown");
    })
}
var cerrar_registro = function(){
    var modal = document.getElementById("mimodal");
    modal.classList.remove("visible");
    modal.classList.add("invisible");
}

var habilitar_botones=function()
{
    var condicion=document.getElementById("input0").checked;
    var a=document.getElementById("input1");
    var b=document.getElementById("input2");
    var c=document.getElementById("input3");
    var d=document.getElementById("input4");
    var e=document.getElementById("input5");
    if(condicion==false)
    {
      a.disabled=true;
      b.disabled=true;
      c.disabled=true;
      d.disabled=true;
      e.disabled=true;


    }
    else {
      a.disabled=false;
      b.disabled=false;
      c.disabled=false;
      d.disabled=false;
      e.disabled=false;
    }
};

function validateEmail(){
  var email = document.getElementById("input1").value;
    var jsRequest = {
      "correo" : email
    };
    console.log(JSON.stringify(jsRequest));
    //Iniciamos la comunicacion con el servidor
    var url = "http://45.55.64.102/g2/usuario/correo_repetido"
    var req = new XMLHttpRequest();
    req.open("POST",url);
    req.send(JSON.stringify(jsRequest));
    req.onreadystatechange = respuestaEmail;
};

function respuestaEmail(evt){
  var resultado = document.getElementById("result");
  if (this.readyState == 4 && this.status == 200) {
    console.log(evt.target.responseText);
    var respuesta = JSON.parse(evt.target.responseText);
    if (respuesta.mensaje[0] == 0) {
      resultado.innerHTML = "Correo ingresado no existe";
    }else if(respuesta.mensaje[0] == 1){
      resultado.innerHTML = "";
    }
  }
};

function repetirCorreo()
{

  console.log("hola");
  var correo=document.getElementById("input1").value;
  var correo_repetido=document.getElementById("input2").value;
  var resultado=document.getElementById("result2");
  if(correo!=correo_repetido)
  {
    resultado.innerHTML="Correo ingresado no coincide";
  }
  else{
    resultado.innerHTML="";
  }
}


var main = function(){
    document.getElementById("crear_usuario").addEventListener("click", abrir_registro);
    document.getElementById("icon_cerrar").addEventListener("click", cerrar_registro);
    document.getElementById("input1").addEventListener("keyup",validateEmail);
    document.addEventListener("click", habilitar_botones);
    document.getElementById("input2 ").addEventListener("keyup",repetirCorreo);
}

window.onload = main;
