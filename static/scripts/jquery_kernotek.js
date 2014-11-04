
$(".ocultarApartado").click(function(){
	$(".editarLlave").addClass("hidden");
	$(".informacionUsuario").addClass("hidden");
	$(".tablaLlaves").removeClass("hidden");
});

$("#buscarTurnos").click(function(){
	if($("#fecha_inicio").val()==""){
		alert("El campo de Fecha de Inicio es Requerido");
		return false;
	}
});

function redireccionar(valor, direccion){
	if(valor=='si'){
		setTimeout(function(){
			window.location.href=direccion;
		},30);
	}
}


function refrescar(){
	setTimeout(function(){
		window.location.reload(true);
	}, 20000);
}


function Mensajes(valor){
	if(valor=="ActivarCuentas"){
		$("#MensajeActivar").removeClass("hidden");
		$("#MensajeActivar" ).animate({
			opacity: 0.0,
		}, 3500 );

		setTimeout(function () {
			$('#MensajeActivar').alert('close');
		}, 3500);
	}

	if(valor=="BorrarCuentas"){
		$("#MensajeBorrar").removeClass("hidden");
		$("#MensajeBorrar" ).animate({
			opacity: 0.0,
		}, 3500 );

		setTimeout(function () {
			$('#MensajeBorrar').alert('close');
		}, 3500);
	}
}

$("#configCorte").mouseover(function(){
	titulo=document.getElementById("tituloDescripcion");
	if($("#Lapso").val()=="cadaDia"){
		titulo.innerHTML="Seleccionar la hora para realizar los cortes de turno diariamente";
		$("#semana").addClass("hidden");
		$("#mes").addClass("hidden");
		$(".contenedorFecha").removeClass("col-md-6");
	}
	if($("#Lapso").val()=="cadaDetHora"){
		titulo.innerHTML="Seleccionar cada cuantas horas se realizará el corte de turno";
		$("#semana").addClass("hidden");
		$("#mes").addClass("hidden");
		$(".contenedorFecha").removeClass("col-md-6");
	}
	if($("#Lapso").val()=="cadaSemana"){
		titulo.innerHTML="Seleccionar dia de la semana y la hora de realizacion del corte de turno";
		$("#semana").removeClass("hidden");
		$("#mes").addClass("hidden");
		$(".contenedorFecha").addClass("col-md-6");
	}
	if($("#Lapso").val()=="cadaMes"){
		titulo.innerHTML="Seleccionar dia del mes y la hora de realizacion del corte de turno";
		$("#semana").addClass("hidden");
		$("#mes").removeClass("hidden");
		$(".contenedorFecha").addClass("col-md-6");
	}
});

function selectActivado(seleccionado){
	$('#estadoLlave > option[id="Desactivada"]').attr('selected', 'selected');
}

$("#Monedero").mouseover(function(){
	if($("#activoMoneda10").prop("checked")==true){
		$("#m10").val("1");	
	}
	else{
		$("#m10").val("0");	
	}
	if($("#activoMoneda5").prop("checked")==true){
		$("#m5").val("1");	
	}
	else{
		$("#m5").val("0");	
	}
	if($("#activoMoneda2").prop("checked")==true){
		$("#m2").val("1");	
	}
	else{
		$("#m2").val("0");	
	}
	if($("#activoMoneda1").prop("checked")==true){
		$("#m1").val("1");	
	}
	else{
		$("#m1").val("0");	
	}
	if($("#activoMoneda05").prop("checked")==true){
		$("#m05").val("1");	
	}
	else{
		$("#m05").val("0");	
	}
});


$("#Billetero").mouseover(function(){
	if($("#activoBillete500").prop("checked")==true){
		$("#b500").val("1");	
	}
	else{
		$("#b500").val("0");	
	}
	if($("#activoBillete200").prop("checked")==true){
		$("#b200").val("1");	
	}
	else{
		$("#b200").val("0");	
	}
	if($("#activoBillete100").prop("checked")==true){
		$("#b100").val("1");	
	}
	else{
		$("#b100").val("0");	
	}
	if($("#activoBillete50").prop("checked")==true){
		$("#b50").val("1");	
	}
	else{
		$("#b50").val("0");	
	}
	if($("#activoBillete20").prop("checked")==true){
		$("#b20").val("1");	
	}
	else{
		$("#b20").val("0");	
	}
});


$("#ConfiguracionReporte").mouseover(function(){
	$("#valorticket").val($("#tic").val());
	$("#valorturno").val($("#tur").val());
	$("#valorfecha").val($("#fec").val());
	$("#valortarifa").val($("#tar").val());
	$("#valortotal").val($("#tot").val());
	$("#valorCambio").val($("#cam").val());
});


$("#ReportesAceptar").click(function(){
	if($("#valorticket").val()==0 && $("#valorturno").val()==0 && $("#valorfecha").val()==0 && $("#valortarifa").val()==0 && $("#valortotal").val()==0){
		$("#MensajeReportes").addClass("hidden");
		$("#MensajeReportes").removeClass("hidden");
	return false;
	}
});


function EReporte(estado){
	if(estado=="si"){
		$("#tur").select2();
		$("#fec").select2();
		$("#tar").select2();
		$("#tic").select2();
		$("#tot").select2();
		$("#cam").select2();
	}
}


function reporteTurno(sa){
	$("#valorTurno").select2();
	alert(sa);
}


function llavesSistema(){
	$("#estadoLlave").select2({
		placeholder: "Estado llave"
	});
	$("#tipoLlave").select2({
		placeholder: "Tipo De Llave"
	});
}


$("#aceptarCambio").click(function(){
	nContraseña=$("#nuevoPassword").val();
	cContraseña=$("#confirmarPassword").val();
	$('#passwordActual').focus();
	ventanaAlerta=document.getElementById("textoAlerta");
	if(nContraseña.length == 0 && cContraseña.length == 0){
		ventanaAlerta.innerHTML="Algunos de Los Campos del Formulario Estan Vacios, Ingresa Los Valores Correspondientes.";
		$("article.mensajesPerfil").show();
		$("#cambioContraseña2").removeClass("has-success");
	    $("#cambioContraseña3").removeClass("has-success");
	    $("#cambioContraseña2").addClass("has-error");
        $("#cambioContraseña3").addClass("has-error");
        return false;
	}

	if(nContraseña.length<6){
		ventanaAlerta.innerHTML="Las Contraseñas Deben de Contener Por lo Menos 6 caracteres.";
		$("article.mensajesPerfil").show();
		$("#nuevoPassword").val("");
		$("#confirmarPassword").val("");
		$("#cambioContraseña2").removeClass("has-success");
	    $("#cambioContraseña3").removeClass("has-success");
	    $("#cambioContraseña2").addClass("has-error");
        $("#cambioContraseña3").addClass("has-error");
        return false;
	}

	if(nContraseña != cContraseña){
		ventanaAlerta.innerHTML="Las Contraseñas No son Iguales, Introduce Nuevamente los Valores";
		$("article.mensajesPerfil").show();
		$("#confirmarPassword").val("");
		$("#nuevoPassword").val("");
		$("#cambioContraseña2").removeClass("has-success");
	    $("#cambioContraseña3").removeClass("has-success");
	    $("#cambioContraseña2").addClass("has-error");
        $("#cambioContraseña3").addClass("has-error");
		return false;
		}

	if(/\s/.test(nContraseña)){
	    ventanaAlerta.innerHTML="Las Contraseñas No pueden Contener Espacios en Blanco";
		$("article.mensajesPerfil").show();
		$("#nuevoPassword").val("");
		$("#confirmarPassword").val("");
		$("#cambioContraseña2").removeClass("has-success");
	    $("#cambioContraseña3").removeClass("has-success");
	    $("#cambioContraseña2").addClass("has-error");
        $("#cambioContraseña3").addClass("has-error");
		return false;
	}
});

$("#aceptarCodigo").click(function(){
	var codigo=$("#codigoLlave").val();
	var ventana=document.getElementById("textoAlerta");
	if(!/^[0-9A-Fa-f]{12}?$/.test(codigo)){
		ventana.innerHTML="El Ćódigo Introducido Es Erroneo, Vuelva a Introducir El Código";
		$("article.mensajesLlaves").show();
		$("#codigoLlave").val("");
		return false;
	}
});
	


function mostrarVentanas(parametro){
	this.nombreVentana=parametro;
	$("#"+nombreVentana).removeClass("hidden");
}

function estadoActualSistema(valor){
	this.parametro=valor;
	if(parametro=="True"){
		document.getElementById('lblEstado').innerHTML="<strong>Estado Actual: Activo</strong>";
		$("#btnEstado").addClass("blue");
		document.getElementById('btnEstado').innerHTML='Activo'
		$("#inputEstado").val('False');
	}
	if(parametro=="False"){
		document.getElementById('lblEstado').innerHTML="<strong>Estado Actual: Desactivo</strong>";
		$("#btnEstado").addClass("red");
		document.getElementById('btnEstado').innerHTML='Desactivo'
		$("#inputEstado").val('True');
	}
}


function corteActual(entrada){
	this.estado=entrada;
	$("#tipoDate").select2();
	$("#Lapso").select2();
	$("#mes").select2();
	$("#semana").select2();
	if(estado=='manual'){
		$("#hacerCorte").removeClass("hidden");
		$("#cambiarCorte").val('0');
		$("#corteTipo").val("0");
		$(".valorCorte").val('0');
	}
	if(estado=='automatico'){
		$("#cambiarCorte").val('1');
		$("#corteTipo").val("1");
		$("#configurarCorte").removeClass("hidden");
		$(".valorCorte").val('1');
		$("#izquierdo").removeClass("col-md-3");
		$("#derecho").removeClass("col-md-3");		
	}
}



$("#enviarConfiguracion").click(function(){
	var numerosValidacion=$("#numeroMedida").val();
	if(!/^[0-9]{1,4}?$/.test(numerosValidacion)){
		document.getElementById('textoAlerta').innerHTML="Los valores introducidos no estan dentro del rango válido";
		$("article.mensajesPassword").show();
		$("#numeroMedida").val("");
		return false;
	}
});


$("#cambioConfiguracion").mouseover(function(){
	valorRadio=$('input:radio[name=valor]:checked').val();
	$("#cambiarCorte").val(valorRadio);
});

$("#cambiarCorteturnoAceptar").click(function(){
	if($("#valor1").attr("checked")){
		$("#cambiarCorteturno").modal("show");
	}
	if($(".valorCorte").val()==0 && $("#valor2").attr("checked")){
		$("#corteTipo").val("1");
		$("#configurarCorte").removeClass("hidden");
		$("#izquierdo").removeClass("col-md-3");
		$("#derecho").removeClass("col-md-3");
		$("#configTurno").addClass("hidden");
		$("#valor1").prop("disabled",true);
	}
});


function cambiarEstado(parametro){
	this.respuesta=parametro;
	if(respuesta=='cambioTipo'){
		$(".thead1").addClass("hidden");
		$("#hacerCorte").addClass("hidden");
		$("#configTurno").removeClass("hidden");
		$("#seleccionTurno").removeClass("hidden");
		$("#enlaceConfigurar").addClass("hidden");
	}
	if(respuesta=='configAutomatico'){
		$(".tituloCambioConfig").removeClass('hidden');
		$(".tituloConfigActual").addClass('hidden');
		$(".lblIngresarValores").removeClass('hidden');
		$("#Lapso").removeAttr('disabled');
		$("#semana").removeAttr('disabled');
		$("#mes").removeAttr('disabled');
		$("#horaC").removeAttr('disabled');	
		$("#configAutomatico").addClass('hidden');
		$(".btnConfigurar").removeClass('hidden');
		$("#tituloDescripcion").removeClass("hidden");
		$("#tituloLapso").removeClass("hidden");
	}
	if(respuesta=="cancelar"){
		window.location.reload(true);
	}

}