// *******************************************************************************************************************************************************
// CÓDIGO PARA CARGAR FORMULARIOS
// *******************************************************************************************************************************************************
abrirHome();

$("#home").click(abrirHome);
$("#buscador").click(abrirBuscador);
$("#btnBuscarCancion").click(cargarDatosBuscador);
$("#playlist").click(abrirAltaPlaylist);
$("#suscripciones").click(abrirAltaCliente);
$("#inicioSesion").click(abrirInicioSesion);
$("#cerrarSesion").click(cerrarSesion);

function abrirHome(){
    // Oculto todos los formularios menos este
    $("fieldset").hide("normal");

    // Muestro el formulario que me interesa
    $("#fsHome").show("normal");

    if(sessionStorage.getItem('correo') != undefined){
        $("#fsHome").load("homes/homeConSesion.html");
        peticionDatosUsuario();
        cargarTablaPlaylist();
    }else{
        $("#fsHome").load("homes/homeSinSesion.html");
    }

    pedirListado();
}

function abrirBuscador(){
    // Oculto todos los formularios menos este
    $("fieldset").hide("normal");

    // Muestro el formulario que me interesa
    $("#formularioBuscador").show("normal");
}

function abrirAltaCliente(){
    if(sessionStorage.getItem('correo') != undefined){
        alert("Cierre la sesión para añadir un nuevo cliente");
    }else{
        // Oculto todos los formularios menos este
        $("fieldset").hide("normal");

        // Muestro el formulario que me interesa
        $("#formularioSuscripcion").show("normal");
    }
}

function abrirAltaPlaylist(){
    // Oculto todos los formularios menos este
    $("fieldset").hide("normal");

    if(sessionStorage.getItem('correo') == undefined){
        alert("Debe iniciar sesión para crear una Playlist");
        abrirInicioSesion();
    }else{
        cargarComboCanciones();
        // Muestro el formulario que me interesa
        $("#formularioCrearPlaylist").show("normal");
    }
}

function abrirInicioSesion(){
    if(sessionStorage.getItem('correo') != undefined){
        alert("Ya hay una sesión iniciada");
    }else{
        // Oculto todos los formularios menos este
        $("fieldset").hide("normal");

        // Muestro el formulario que me interesa
        $("#formularioInicioSesion").show("normal");
    }
}





// *******************************************************************************************************************************************************
// CÓDIGO PARA HOME
// *******************************************************************************************************************************************************

// Datos Usuario
function peticionDatosUsuario() {
    $.getJSON("php/getDatosUsuario.php",
        { correo: sessionStorage.getItem('correo'), 
        contraseña: sessionStorage.getItem('password') },
        procesoDatosUsuario
    );
}

function procesoDatosUsuario(datos, textStatus, jqXHR) {
    $("#campoCorreo").text(datos.correo);
    $("#campoContraseña").text(datos.contraseña);
}


// Lista Canciones
function pedirListado() {
    // Instanciar objeto Ajax
    var oAjax = instanciarXHR();

    //Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", "php/listadoCancionesXML.php");

    //Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", procesoRespuestalistadoCancionesXML, false);

    //Hacer la llamada
    oAjax.send(null);
}

function procesoRespuestalistadoCancionesXML() {
    var oAjax = this;

    // Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) {
        //console.log(oAjax.responseText);
        var oXML = oAjax.responseXML; // Recojo un objeto XML
        
        construirListado(oXML);
    }
}

function construirListado(oXML) {
    // Crear tabla
    var oTabla = document.createElement("table");
    oTabla.classList.add("table");
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oTH = document.createElement("TH");
    oTH.textContent = "Título";
    oFila.appendChild(oTH);

    oTH = document.createElement("TH");
    oTH.textContent = "Artista";
    oFila.appendChild(oTH);

    oTH = document.createElement("TH");
    oTH.textContent = "Disco";
    oFila.appendChild(oTH);

    oTH = document.createElement("TH");
    oTH.textContent = "Género";
    oFila.appendChild(oTH);

    oTH = document.createElement("TH");
    oTH.textContent = "Año";
    oFila.appendChild(oTH);

    var oTBody = oTabla.createTBody();


    var oCanciones = oXML.querySelectorAll("cancion");
    for (var i = 0; i < oCanciones.length; i++) {
        oFila = oTBody.insertRow(-1);

        var oCelda = oFila.insertCell(-1);
        oCelda.textContent = oCanciones[i].querySelector("titulo").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = (oCanciones[i].querySelector("artista").textContent);

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = (oCanciones[i].querySelector("disco").textContent);

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = (oCanciones[i].querySelector("genero").textContent);

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = (oCanciones[i].querySelector("año").textContent);
    }
    document.querySelector("#datosCanciones").appendChild(oTabla);
}

function instanciarXHR() {
    var xhttp = null;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xhttp;
}


// Lista playlists
function cargarTablaPlaylist() {
    $.ajax({
        url: "php/getPlaylist.php",
        dataType: 'json',
        data: "usuario="+sessionStorage['correo'],
        cache: false,
        async: true, // por defecto
        method: "GET",
        success: procesarGetPlaylist
    });
}
 
function procesarGetPlaylist(oDatos) {
    var divPlaylist = document.getElementById("datosPlaylist");
    if(oDatos.length != 0){
        var nombrePlaylist = oDatos[0].nombre;

        var oTabla = document.createElement("TABLE");
        oTabla.classList.add("table");
        oTabla.classList.add("table-bordered");
        oTabla.classList.add("table-hover");

        var nombreTabla = document.createElement("H5");
        var textoNombre = document.createTextNode(nombrePlaylist);
        nombreTabla.appendChild(textoNombre);
        divPlaylist.appendChild(nombreTabla);

        //Crear fila encabezado
        var oTHead = oTabla.createTHead();
        var oFila = oTHead.insertRow(-1);
        var oCelda = document.createElement("TH");
        oCelda.textContent = "Título";
        oFila.appendChild(oCelda);

        //Crear filas de contenido
        var oTBody = document.createElement("TBODY");
        oTabla.appendChild(oTBody);

        for(var i = 0; i<oDatos.length; i++){
            if(oDatos[i].nombre == nombrePlaylist){
                oFila = oTBody.insertRow(-1);
                oCelda = oFila.insertCell(-1);
                oCelda.textContent = oDatos[i].titulo;
                oFila.appendChild(oCelda);
                if(i == (oDatos.length-1)){
                    divPlaylist.appendChild(oTabla);
                }
            }else{
                divPlaylist.appendChild(oTabla);

                var oTabla = document.createElement("TABLE");
                oTabla.classList.add("table");
                oTabla.classList.add("table-bordered");
                oTabla.classList.add("table-hover");

                var nombreTabla = document.createElement("H5");
                var textoNombre = document.createTextNode(oDatos[i].nombre);
                nombreTabla.appendChild(textoNombre);
                divPlaylist.appendChild(nombreTabla);

                //Crear fila encabezado
                var oTHead = oTabla.createTHead();
                var oFila = oTHead.insertRow(-1);
                var oCelda = document.createElement("TH");
                oCelda.textContent = "Título";
                oFila.appendChild(oCelda);

                //Crear filas de contenido
                var oTBody = document.createElement("TBODY");
                oTabla.appendChild(oTBody);

                nombrePlaylist = oDatos[i].nombre;
            }
        }
    }else{
        var oParrafo = document.createElement("p");
        var oTexto = document.createTextNode("No hay playlists registradas");
        oParrafo.appendChild(oTexto);
        divPlaylist.appendChild(oParrafo);
    }
}





// *******************************************************************************************************************************************************
// CÓDIGO PARA MOSTRAR LA CANCIÓN BUSCADA
// *******************************************************************************************************************************************************

function cargarDatosBuscador() {
    $.get("php/getDatosCanciones.php",
        $("#formBuscador").serialize(),
        respuestaDatosBuscador,
        'json');
};

function respuestaDatosBuscador(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        alert(oDatos.mensaje);
    } else { 
        if (oDatos.datos.length == 0) {
            sTabla = "<h5>Canción no registrada</h5>";
        } else {
            var sTabla = '<table class="table">';
 
            sTabla += '<thead><tr><th>Título</th><th>Artista</th><th>Disco</th><th>Genero</th><th>Año</th></thead>';
 
            sTabla += "<tbody>";
            for (var i = 0; i < oDatos.datos.length; i++) {
                sTabla += "<tr>";
                sTabla += "<td>" + oDatos.datos[i].titulo + "</td>";
                sTabla += "<td>" + oDatos.datos[i].artista + "</td>";
                sTabla += "<td>" + oDatos.datos[i].disco + "</td>";
                sTabla += "<td>" + oDatos.datos[i].genero + "</td>";
                sTabla += "<td>" + oDatos.datos[i].año + "</td>";
                sTabla += "</tr>";
            }
 
            sTabla += "</tbody></table>";
        }
 
        $("#resultadoBusqueda").html(sTabla);
    }
}





// *******************************************************************************************************************************************************
// CÓDIGO PARA ALTA CLIENTE
// *******************************************************************************************************************************************************
$("#btnSuscripcion").click(validarFormularioAltaCliente);

function validarFormularioAltaCliente() {

    let sErrores = "";
    let bValido = true; // en principio el formulario es válido

    // Validación Nombre Usuario
    let sNombreUsuario = formSuscripcion.nombre.value.trim();
    let oExpRegNomUs = /^[A-Za-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑ]{5,10}$/;

    if (!oExpRegNomUs.test(sNombreUsuario)) {
        bValido = false;
        sErrores = "\n- El Nombre de usuario no tiene el formato definido";
        formSuscripcion.nombre.classList.add("errorForm");
        formSuscripcion.nombre.focus();
    } else {
        formSuscripcion.nombre.classList.remove("errorForm");
    }

    // Validación email 1
    let sEmail = formSuscripcion.email.value.trim();
    let oExpRegEm = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!oExpRegEm.test(sEmail)) {
        if (bValido) {
            formSuscripcion.email.focus();
            bValido = false;
        }
        sErrores += "\n- El email no es válido";
        formSuscripcion.email.classList.add("errorForm");
    } else {
        formSuscripcion.email.classList.remove("errorForm");
    }

    // Validación contraseña 1
    let sPass1 = formSuscripcion.password.value.trim();
    let oExpRegPass = /^(?=(?:.*\d))(?=(?:.*[A-Z]))(?=(?:.*[a-z]))\S{5,10}$/;

    if (!oExpRegPass.test(sPass1)) {
        // Si hasta el momento era correcto -> este el primer error
        if (bValido) {
            formSuscripcion.password.focus();
            bValido = false;
        }
        sErrores += "\n- La contraseña no tiene el formato correcto (de 5 a 10 caracteres)";
        formSuscripcion.password.classList.add("errorForm");
    } else {
        formSuscripcion.password.classList.remove("errorForm");
    }

    // Validación contraseña 2 
    let sPass2 = formSuscripcion.password2.value.trim();

    if (!oExpRegPass.test(sPass2)) {
        if (bValido) {
            formSuscripcion.password2.focus();
            bValido = false;
        }
        sErrores += "\n- La confirmación de contraseña no tiene el formato correcto (de 5 a 10 caracteres)";
        formSuscripcion.password2.classList.add("errorForm");
    } else {
        formSuscripcion.password2.classList.remove("errorForm");
    }

    // Validación de que las dos contraseñas son iguales -----------------------------------------------------------
    if (sPass1 != sPass2) {
        formSuscripcion.password2.focus();
        bValido = false;
        sErrores += "\n- Las contraseñas no coinciden";
        formSuscripcion.password2.classList.add("errorForm");
    } else {
        //alert("Las contraseñas son iguales");
        formSuscripcion.password2.classList.remove("errorForm");
    }

    // --------------------------------------------------------------
    // COMPROBACIÓN FINAL
    if (bValido) { // Si todo OK
        altaCliente();
    } else {
        //generamos el alert -------
        alert(sErrores);
    }

}

function altaCliente(){
    var oCliente = {
        nombre: formSuscripcion.nombre.value.trim(),
        email: formSuscripcion.email.value.trim(),
        password: formSuscripcion.password.value.trim(),
        premium: formSuscripcion.checkboxPremium_0.checked
    };
    
    if(oCliente.premium){
        oCliente.premium = 1;
    }else{
        oCliente.premium = 0;
    }

    var sParametros = "datosCliente=" + JSON.stringify(oCliente);

    $.post("altaCliente/altaCliente.php", sParametros, respuestaAltaCliente, "json");
}

function respuestaAltaCliente(oDatos, sStatus, oXHR){
    if(oDatos.error){
        alert(oDatos.mensaje);
    }else{
        alert(oDatos.mensaje);
        formSuscripcion.reset();
        abrirHome();
    }
}





// *******************************************************************************************************************************************************
// CÓDIGO PARA ALTA PLAYLIST
// *******************************************************************************************************************************************************
document.getElementById("btnAñadirCancion").addEventListener("click", añadirCanciones);
document.getElementById("btnEliminarCancion").addEventListener("click", eliminarCanciones);

function cargarComboCanciones(){
    var oArrayCanciones = null;

    if(localStorage['canciones'] != null){
        oArrayCanciones = JSON.parse(localStorage['canciones']);
        rellenaCombo(oArrayCanciones);
    }else{
        $.get('altaPlaylist/getCanciones.php',null, tratarGetCanciones, 'json');
    }
}

function tratarGetCanciones(oArrayCanciones, sStatus, oXHR){
    rellenaCombo(oArrayCanciones)
    
    // Guardar en localStorage
    localStorage['canciones'] = JSON.stringify(oArrayCanciones);
}

function rellenaCombo(oArrayCanciones){
    $("#comboCrearCanciones").empty();

    $.each(oArrayCanciones, function(i,elemento){
        $('<option value="' + elemento.titulo + '">' + elemento.titulo + '</option>').appendTo("#comboCrearCanciones");
    });
}

// Añadir canciones a la playlist
function añadirCanciones() {
    var listaCanciones = document.getElementById("comboCrearCanciones");
    var playlist = document.getElementById("comboCrearPlaylist");
    var valoresListaCanciones = listaCanciones.options;
    var valoresPlaylist = playlist.options;

    for (var i = 0; i < valoresListaCanciones.length; i++) {
        var noPasar = false;
        if (valoresListaCanciones[i].selected) {
            for (var j = 0; j < valoresPlaylist.length; j++) {
                if (valoresListaCanciones[i].value == valoresPlaylist[j].value) {
                    noPasar = true;
                }
            }
            if (!noPasar) {
                var opcion = document.createElement("option");
                opcion.text = valoresListaCanciones[i].text;
                opcion.value = valoresListaCanciones[i].value;
                valoresPlaylist.add(opcion);
            }
        }
    }
}

// Eliminar canciones de la playlist
function eliminarCanciones() {
    var playlist = document.getElementById("comboCrearPlaylist");
    var valoresPlaylist = playlist.options;

    for (var i = (valoresPlaylist.length - 1); i >= 0; i--) {
        if (valoresPlaylist[i].selected) {
            playlist.remove(i);
        }
    }
}

$("#btnCrearPlaylist").click(validarFormularioCrearPlaylist);

function validarFormularioCrearPlaylist() {

    let sErrores = "";
    let bValido = true; // en principio el formulario es válido

    // Validación Nombre Playlist
    let sNombrePlaylist = formCrearPlaylist.nombrePlayList.value.trim();
    let oExpRegNomPlaylist = /^[A-Za-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑ]{5,30}$/;

    if (!oExpRegNomPlaylist.test(sNombrePlaylist)) {
        bValido = false;
        sErrores = "\n- El Nombre de la playlist no es válido";
        formCrearPlaylist.nombrePlayList.classList.add("errorForm");
        formCrearPlaylist.nombrePlayList.focus();
    } else {
        formCrearPlaylist.nombrePlayList.classList.remove("errorForm");
    }

    // Validación Canciones Añadidas
    let sComboPlaylist = document.getElementById('comboCrearPlaylist');

    if (sComboPlaylist.options.length == 0) {
        bValido = false;
        sErrores = "\n- Debe añadir al menos una canción";
        formCrearPlaylist.comboCrearPlaylist.classList.add("errorForm");
        formCrearPlaylist.comboCrearPlaylist.focus();
    } else {
        formCrearPlaylist.comboCrearPlaylist.classList.remove("errorForm");
    }

    // --------------------------------------------------------------
    // COMPROBACIÓN FINAL
    if (bValido) { // Si todo OK
       //alert("El formulario se ha rellenado correctamente");
       altaPlaylist();
    } else {
        //generamos el alert -------
        alert(sErrores);
    }

}

function altaPlaylist(){
    var listaCanciones = [];
    var opciones = document.getElementById("comboCrearPlaylist").options;
    for(var i = 0; i < opciones.length; i++){
        listaCanciones.push(opciones[i].value);
    }

    var oPlaylist = {
        cliente: sessionStorage.getItem('correo'),
        nombre: formCrearPlaylist.nombrePlayList.value.trim(),
        canciones: listaCanciones
    }

    var sParametros = "datosPlaylist=" + JSON.stringify(oPlaylist);

    $.post("altaPlaylist/altaPlaylist.php", sParametros, respuestaAltaPlaylist, "json");
}

function respuestaAltaPlaylist(oDatos, sStatus, oXHR){
    if(oDatos.error){
        alert(oDatos.mensaje);
    }else{
        alert(oDatos.mensaje);
        formCrearPlaylist.reset();
        limpiarComboCrearPlaylist();
        abrirHome();
    }
}

// Elimina las canciones de la lista
function limpiarComboCrearPlaylist() {
    var listaCanciones = document.getElementById("comboCrearPlaylist");
    while (listaCanciones.childElementCount > 0) {
        listaCanciones.removeChild(listaCanciones.childNodes[0]);
    }
}





// *******************************************************************************************************************************************************
// CÓDIGO PARA INICIO SESIÓN
// *******************************************************************************************************************************************************
$("#btnInicioSesion").click(validarFormularioIniSesion);

// VALIDACIÓN FORMULARIO INICIO DE SESIÓN *********
function validarFormularioIniSesion() {
    let sErrores = "";
    let bValido = true; // en principio el formulario es válido

    // Validación email 1
    let sEmail = formInicioSesion.emailIni.value.trim();
    let oExpRegEm = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!oExpRegEm.test(sEmail)) {
        if (bValido) {
            formInicioSesion.emailIni.focus();
            bValido = false;
        }
        sErrores += "\n- El email no es válido";
        formInicioSesion.emailIni.classList.add("errorForm");
    } else {
        formInicioSesion.emailIni.classList.remove("errorForm");
    }


    // Validación contraseña 
    let sPass = formInicioSesion.passwordIni.value.trim();
    let oExpRegPass = /^(?=(?:.*\d))(?=(?:.*[A-Z]))(?=(?:.*[a-z]))\S{5,10}$/;

    if (!oExpRegPass.test(sPass)) {
        // Si hasta el momento era correcto -> este el primer error
        if (bValido) {
            formInicioSesion.passwordIni.focus();
            bValido = false;
        }
        sErrores += "\n- La contraseña no tiene el formato correcto (de 5 a 10 caracteres)";
        formInicioSesion.passwordIni.classList.add("errorForm");
    } else {
        formInicioSesion.passwordIni.classList.remove("errorForm");
    }

    // --------------------------------------------------------------
    // COMPROBACIÓN FINAL
    if (bValido) { // Si todo OK
        inciarSesion();
    } else {
        alert(sErrores);
    }
}

    
function inciarSesion(){
    var oInicioSesion = {
        email: formInicioSesion.emailIni.value.trim(),
        password: formInicioSesion.passwordIni.value.trim()
    };

    var sParametros = "datosSesion="+JSON.stringify(oInicioSesion);

    $.post("inicioSesion/inicioSesion.php", sParametros, respuestaInicioSesion, "json");
}

function respuestaInicioSesion(oDatos,sStatus,oXHR){
    if(oDatos.error){
        alert(oDatos.mensaje);
    }else{
        alert(oDatos.mensaje);
        sessionStorage.setItem('correo',formInicioSesion.emailIni.value.trim());
        sessionStorage.setItem('password', formInicioSesion.passwordIni.value.trim());
        formInicioSesion.reset();
        abrirHome();
    }
}





// *******************************************************************************************************************************************************
// CÓDIGO PARA CERRAR SESIÓN
// *******************************************************************************************************************************************************
function cerrarSesion(){
    if(sessionStorage['correo'] != undefined){
        if(confirm("¿Desea cerrar la sesión?")){
            sessionStorage.removeItem('correo');
            sessionStorage.removeItem('password');
            alert("Sesión cerrada");
            abrirHome();
        }
    }else{
        alert("No hay sesión iniciada");
    }
}