function validarEnvio() {
    if((!isNumber(document.getElementById("op1").value)) || (!isNumber(document.getElementById("op2").value))){
        alert("Imposible leer los parámetros. Por favor, asegúrese de que ha introducido los operandos correctamente");
        return false
    }
    else return true
}


function operar(){
    if(!validarEnvio()){
        alert("Imposible leer los parámetros. Por favor, asegúrese de que ha introducido los operandos correctamente");
    }
    else{
        var op1 = parseInt(document.getElementById("op1").value);
        var op2 = parseInt(document.getElementById("op2").value);

        var result = calcular(op1,op2);
        document.getElementById("result").value = result;
    }
}

function calcular(op1,op2){
    var op = document.getElementById("lista").value;
    if(op == "+")return op1 + op2;
    else if(op == "-")return op1 - op2;
    else if(op == "*")return op1 * op2;
    else if(op == "/")return op1 / op2;
    else if(op == "b")return Math.pow(op1,op2);

}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isNumber2(n) {
    if(!isNaN(parseFloat(n)) && isFinite(n)){
        return 1;
    }
    else{
        return 0;
    }
}

function limpiarTexto() {
    document.getElementById("op1").value ="";
    document.getElementById("op2").value ="";
    document.getElementById("result").value ="";
}

function copiado() {
    alert("Correo copiado al portapapeles")
}

function validarMail(mail)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("mail").value ))
    {
        return (true)
    }
    alert("Correo no válido.")
    document.getElementById("mail").value == ""
    return (false)
}

function comprobarContra() {
    var contra1 = document.getElementById("pass1").value
    var contra2 = document.getElementById("pass2").value
    if(contra1.length == 0) {
        alert("Contraseña vacía.")
        return false
    }
    if(contra1.localeCompare(contra2) == 0){
        return true
    }
    else{
        alert("Las contraseñas no coinciden.")
        document.getElementById("pass2").value == ""
        return false
    }

}

function comprobarTodo() {
    if(document.getElementById('terminosCondiciones').checked){
        var bol1 = validarMail()
        var bol2 = comprobarContra()
        if(bol1 && bol2 == true){
            document.getElementById("registro").disabled = false
            return true
        }
        else{
            document.getElementById('terminosCondiciones').checked = false
            return false
        }

    }
    else{
        alert("Debe aceptar los términos y condiciones antes de registrarse");
        return false;
    }
}

function guardarOP() {
    if(!validarEnvio()) return
    else{
        var op1 = document.getElementById("op1").value;
        var lista = document.getElementById("lista").value;
        var op2 = document.getElementById("op2").value;

        var data =  {op1: op1, lista: lista, op2: op2};

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/insertOP", false);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
        var response = xhr.statusText;
        if (response == "OK") {
            getData();
        }
        else {
            alert("Error al guardar la operacion en el servidor: "+response);
        }

    }
}

function eliminarOp(pos) {
    var pos1 =""+ pos + 1;
    var pos2 =""+ pos + 2;
    var pos3 =""+ pos + 3;
    var op1 = document.getElementById(pos1).innerHTML;
    var lista = document.getElementById(pos2).innerHTML;
    var op2 = document.getElementById(pos3).innerHTML;
    if((!isNumber(op1)) || (!isNumber(op2))){
        alert("No hay operación que borrar en esa posición.");
        return;
    }
    var data =  {op1: op1, lista: lista, op2: op2}

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/removeOP", false);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(JSON.stringify(data));
    var response = xhr.statusText;
    if(response == "OK"){
        getData();
    }
    else {
        alert("Error al borrar la operacion del servidor: "+response);
    }
}

function ocultar() {
    $("p").toggle();
    $("h1").toggle();
}

function rellenarTabla(data) {
    var j = 1;
    var k = 1;
    var aux;
    for (var i = 0;i < data.length; i++){
        if (data[i] == ':') {
            if (k < 4) {
                aux = data.slice(i + 1, data.indexOf(","));
                aux = aux.replace(/"/g,'');
                var idField =""+ j + k ;
                document.getElementById(idField).innerHTML = aux;
                i = (data.indexOf(",") + 1);
                data = data.slice(i, data.length);
                // alert('Valor data '+data);
                k++;
                i = 0;
            }
            else {
                aux = data.slice(i + 1, data.indexOf(",") - 1);
                // data = data.slice(aux.length, data.length);
                var idField =""+ j + k;
                document.getElementById(idField).innerHTML = aux;
                data = data.slice(data.indexOf(",") + 1, data.length);
                k = 1;
                j++;
                i = 0;
            }

        }
    }

}

function getData() {
    if(!(document.getElementById("11") == "No Op"))limpiarTabla();
    $.ajax({
        url: 'http://localhost:8080/get-data',
        dataType: "json",
        cache: false,
        timeout: 5000,
        success: function(data) {
            rellenarTabla(data);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error obteniendo las operaciones' + textStatus + " " + errorThrown);
        }
    });
}

function enviarMensaje() {

    var name = document.getElementById("name").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    if(!comprobarMensaje(name, message)) return;


    var data = {name : name, subject : subject, message : message};

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/sendMs", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    var response = xhr.statusText;
    if (response == "OK") {
        alert("Gracias por su mensaje.");
        limpiarCamposMsg();
    }
    else {
        alert("Error al enviar el mensaje: " + response);
    }



}
function focus(idField) {
    document.getElementById(idField).className  += "active";
}

function defocus() {
    var campos = ["index","calculadora","contacto"];
    for(var i = 0; i < campos.length; i++){
        if( document.getElementById(campos[i]).classList.contains("active"));
        document.getElementById(campos[i]).classList.remove("active");
    }
}

function limpiarTabla(){

    var aux;
    var idField;
    for (var i = 1;i <= 4; i++){
        for(var k = 1; k <= 4; k++) {
            idField =""+ i + k ;
            if (k == 4) {
                document.getElementById(idField).innerHTML = "No Rs";
            }
            else {
                document.getElementById(idField).innerHTML = "No Op";
            }
        }

    }
}

function comprobarMensaje(name, text) {
    if(name == null || name == "") {
        alert("El campo del nombre no puede estar vacio.");
        return false;
    }
    if(text == null || text == ""){
        alert("El campo del mensaje no puede estar vacio.");
        return false;
    }
    return true;
}

function limpiarCamposMsg() {
    document.getElementById("name").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
}