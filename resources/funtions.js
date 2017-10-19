function operar(){
    if((!isNumber(document.getElementById("op1").value)) || (!isNumber(document.getElementById("op2").value))){
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
}

function deshabilitar() {
    if(document.getElementById('terminosCondiciones').checked){
        document.getElementById("registro").disabled = true
        document.getElementById('terminosCondiciones').checked = false
    }
}

function eliminarOp(pos) {

}

function equivalenciaOP(op) {
    if(op == "+")return 1;
    else if(op == "-")return 2;
    else if(op == "*")return 3;
    else if(op == "/")return 4;
    else if(op == "b")return 5;
}

$(document).ready(function(){
    $("button").click(function(){
        $("p").toggle();
        $("h1").toggle();
    });
});