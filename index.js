//esta funcion abre el formulario de creacion presionando el boton "crear_usuario"
var abrir_registro = function() {
  //si ya creaste un usuario se ponen en blanco todos los campos del formulario
    document.getElementById("input1").value='';
    document.getElementById("input2").value='';
    document.getElementById("input3").value='';
    document.getElementById("input4").value='';
    document.getElementById("input5").value='';
    //vuelve visible el formulario
    var modal = document.getElementById("mimodal");
    modal.classList.remove("invisible");
    modal.classList.add("visible");
    //animaciones
    modal.classList.add("animated");
    modal.classList.add("bounceInDown");
    modal.addEventListener("animationend", function() {
        modal.classList.remove("animated");
        modal.classList.remove("bounceInDown");
    })
}

//presionando el boton x, se vuelve invisible el modal
var cerrar_registro = function() {
    var modal = document.getElementById("mimodal");
    //animacion de cierre
    modal.classList.add("animated");
    modal.classList.add("bounceOut");
    //funcion para crear la animacion y volver invisible el modal
    modal.addEventListener("animationend", function() {
        if (modal.classList.contains("bounceOut")) {
            modal.classList.remove("visible");
            modal.classList.add("invisible");
            modal.classList.remove("animated");
            modal.classList.remove("bounceOut");
        }
    })
}
//si el boton de condiciones para el registro no se activa, los campos para rellenar tampoco
var habilitar_botones = function() {
    var condicion = document.getElementById("input0").checked;
    var a = document.getElementById("input1");
    var b = document.getElementById("input2");
    var c = document.getElementById("input3");
    var d = document.getElementById("input4");
    var e = document.getElementById("input5");
    if (condicion == false) {
        a.disabled = true;
        b.disabled = true;
        c.disabled = true;
        d.disabled = true;
        e.disabled = true;
    } else {
        a.disabled = false;
        b.disabled = false;
        c.disabled = false;
        d.disabled = false;
        e.disabled = false;
    }
};

//sacado de internet para validar que es un Email
function validarQueEsEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

//funcion que te dice si el email ingresado en el campo ya existe en la base de datos
function validateEmail() {
    var email = document.getElementById("input1").value;
    var resultado = document.getElementById("result");
    resultado.classList.add("texto_rojo")
    var jsRequest = {
        "correo": email
    };
    //se llama a la funcion validar email para que no acepte nada que no tenga formato email
    if (validarQueEsEmail(email)) {
        //se vuele vacio el campo y valor de resultado
        resultado.innerHTML = "";
        resultado.value = "";
        //te pinta en la consola lo que vas a mandar a correo_repetido
        console.log(JSON.stringify(jsRequest));
        //Iniciamos la comunicacion con el servidor
        var url = "http://45.55.64.102/g2/usuario/correo_repetido";
        //creacion un objeto para intercambiar informacion con el servidor
        var req = new XMLHttpRequest();
        //abre el servidor
        req.open("POST", url);
        //manda la informacion al servidor
        req.send(JSON.stringify(jsRequest));
        //define una funcion que validara la respuesta y estado completado
        req.onreadystatechange = respuesta;
    } else {
        resultado.innerHTML = "no es un correo valido";
    }
};

//mismo que la funcion de validar email pero con usuario
function validateUser() {
    var user = document.getElementById("input3").value;
    var resultado = document.getElementById("result3").value;
    var jsRequest = {
        "usuario": user
    };
    console.log(JSON.stringify(jsRequest));
    var url = "http://45.55.64.102/g2/usuario/usuario_repetido";
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.send(JSON.stringify(jsRequest));
    req.onreadystatechange = respuesta1;
}

//funcion para validar la respuesta y estado
function respuesta(evt) {
    var resultado = document.getElementById("result");
    if (this.readyState == 4 && this.status == 200) {
        console.log(evt.target.responseText);
        var respuesta = JSON.parse(evt.target.responseText);
        //condicional para que no se repitan correos existentes
        if (respuesta.mensaje[0] == 0) {
            resultado.innerHTML = "";
            resultado.value = "";
        } else if (respuesta.mensaje[0] == 1) {
            resultado.innerHTML = "correo ingresado existe";
        }
    }
};

//funcion para validar la respuesta y estado (usuario)
function respuesta1(evt) {
    var resultado = document.getElementById("result3");
    if (this.readyState == 4 && this.status == 200) {
        console.log(evt.target.responseText);
        var respuesta = JSON.parse(evt.target.responseText);
        //condicional para que no se repitan usuarios ya existentes
        if (respuesta.mensaje[0] == 0) {
            resultado.innerHTML = "";
            resultado.value = "";
        } else if (respuesta.mensaje[0] == 1) {
            resultado.innerHTML = "Usuario ya existente";
        }
    }
};

//funcion para validar que se repitio bien el correo existente
function repetirCorreo() {
    var correo = document.getElementById("input1").value;
    var correo_repetido = document.getElementById("input2").value;
    var resultado = document.getElementById("result2");
    resultado.classList.add("texto_rojo");
    //´pinta que el correo no coincide hasta que acierte con el otro
    if (correo != correo_repetido) {
        resultado.innerHTML = "Correo ingresado no coincide";
    } else {
        resultado.innerHTML = "";
        resultado.value = "";
    }
};

//funcion para validar que se repitio bien la contraseña
function repetirContraseña() {
    var contraseña = document.getElementById("input4").value;
    var confContraseña = document.getElementById("input5").value;
    var resultado = document.getElementById("result4");
    resultado.classList.add("texto_rojo");
    //´pinta que la contraseña no coincide hasta que acierte con la otro
    if (contraseña == confContraseña) {
        resultado.innerHTML = "";
        resultado.value = "";
    } else {
        resultado.innerHTML = "Contraseña ingresada no coincide";
    }
};

//funcion que encripta el password mediante el metodo dado al presionar el boton guar_camb
function cifrarPassword() {
    var password = document.getElementById("input4").value;
    var jsRequest = {
        "texto": password
    };
    var xhr = new XMLHttpRequest();
    var url = "http://45.55.64.102/g2/cipher/encode";
    xhr.open("POST", url);
    xhr.onreadystatechange = respuestaPassword;
    xhr.send(JSON.stringify(jsRequest));
};


function respuestaPassword(evt) {
    if (evt.target.readyState == 4 && evt.target.status == 200) {
        var password = JSON.parse(evt.target.responseText);
        var cifrado = password.mensaje[0];
        //pinta en la consola la contraseña cifrada
        console.log(cifrado);

        var correo = document.getElementById("input1").value;
        var user = document.getElementById("input3").value;

        var jsRequest1 = {
            "usuario": user,
            "correo": correo,
            "contrasenia": cifrado
        };
        //pinta la informacion del usuario que se guardara en la base de datos
        console.log(JSON.stringify(jsRequest1));
        var req1 = new XMLHttpRequest();
        var url1 = "http://45.55.64.102/g2/usuario/guardar";
        req1.open("POST", url1);
        req1.onreadystatechange = respuestaAddTodo;
        console.log("ESTO ES LO QUE SE ESTA MANDANDO COMO FORMULARIO");
        req1.send(JSON.stringify(jsRequest1));
    }
};

//funcion para pintar que se realizo correctamente el guardado del nuevo usuario
var respuestaAddTodo = function(evt) {
    if (evt.target.readyState == 4) {
        if (evt.target.status == 200) {
            // Todo OK en la comunicacion
            console.log(evt.target.responseText);
        }
    }
};


//funcion que verifica si el usuario esta en la base de datos para otorgarle el acceso a la pagina web
function login() {
    var password = document.getElementById("password_login").value;
    var jsRequest = {
        "texto": password
    };
    var xhr = new XMLHttpRequest();
    var url = "http://45.55.64.102/g2/cipher/encode";
    xhr.open("POST", url);
    xhr.onreadystatechange = verificarPassword;
    xhr.send(JSON.stringify(jsRequest));
};

//funcion que verifica la contraseña del usuario
function verificarPassword(evt) {
    if (evt.target.readyState == 4 && evt.target.status == 200) {
        var password = JSON.parse(evt.target.responseText);
        var cifrado = password.mensaje[0];
        console.log(cifrado);
        var usuario = document.getElementById("usuario_login").value;
        var jsRequest = {
            "usuario": usuario,
            "contrasenia": cifrado
        };
        console.log(JSON.stringify(jsRequest));
        var url = "http://45.55.64.102/g2/usuario/validar";
        var req = new XMLHttpRequest();
        req.open("POST", url);
        req.onreadystatechange = redireccion;
        req.send(JSON.stringify(jsRequest));
    }
};

//funcion que redirige a la pagina web mantanimiento.
function redireccion(evt) {
    if (evt.target.readyState == 4 && evt.target.status == 200) {
        console.log(evt.target.responseText);
        var respuesta = JSON.parse(evt.target.responseText);
        if (respuesta.mensaje[0] == 1) {
            document.getElementById("result5").innerHTML = "Login OK"; //Listo
            window.location.href = "mantanimiento.html";
        } else {
            document.getElementById("result5").innerHTML = "Usuario y/o contraseña no coinciden";
        }
    }
}

//funcion que restringe mandar informacion a la base de datos si los campos no estan correctamente terminados
function restringirRegistro() {
    var a = document.getElementById("result").value;
    var b = document.getElementById("result2").value;
    var c = document.getElementById("result3").value;
    var d = document.getElementById("result4").value;
    var boton = document.getElementById("guar_camb");
    //si todos los campos no presenta error se habilita el guardado
    if (a == "" && b == "" && c == "" && d == "") {
        boton.disabled = false;
    } else {
        boton.disabled = true;
    }
}
//funcion main donde se llama a todas las funciones mediante eventos
var main = function() {
  document.getElementById("ingresar").addEventListener("click", login);
    document.getElementById("crear_usuario").addEventListener("click", abrir_registro);
    document.getElementById("icon_cerrar").addEventListener("click", cerrar_registro);
    document.getElementById("guar_camb").addEventListener("click", cerrar_registro);
    document.getElementById("guar_camb").addEventListener("click", cifrarPassword);
    document.getElementById("input1").addEventListener("keyup", validateEmail);
    document.getElementById("input2").addEventListener("keyup", repetirCorreo);
    document.getElementById("input3").addEventListener("keyup", validateUser);
    document.getElementById("input5").addEventListener("keyup", repetirContraseña);
    document.addEventListener("keyup", restringirRegistro);
    document.addEventListener("click", habilitar_botones);
}

window.onload = main;
