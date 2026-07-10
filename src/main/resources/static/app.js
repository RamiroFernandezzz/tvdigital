const url = "http://localhost:8080/api/clientes";



// =======================
// PESTAÑAS
// =======================

function abrirPestana(id){

    document.getElementById("clientes").classList.add("oculto");
    document.getElementById("nuevo").classList.add("oculto");

    document.getElementById(id).classList.remove("oculto");

}




function mostrarLista(id){

    document.getElementById("activos").classList.add("oculto");
    document.getElementById("proximos").classList.add("oculto");
    document.getElementById("vencidos").classList.add("oculto");


    document.getElementById(id).classList.remove("oculto");

}




// =======================
// CARGAR CLIENTES
// =======================


function cargarClientes(){


fetch(url)

.then(res=>res.json())

.then(clientes=>{


document.getElementById("totalClientes").innerHTML = clientes.length;


cargarSector("/activos","tablaActivos");

cargarSector("/proximos","tablaProximos");

cargarSector("/vencidos","tablaVencidos");


});


}







function cargarSector(endpoint,tabla){


fetch(url+endpoint)

.then(res=>res.json())

.then(clientes=>{


if(endpoint=="/activos")
document.getElementById("totalActivos").innerHTML=clientes.length;


if(endpoint=="/proximos")
document.getElementById("totalProximos").innerHTML=clientes.length;


if(endpoint=="/vencidos")
document.getElementById("totalVencidos").innerHTML=clientes.length;




let cuerpo=document.getElementById(tabla);

cuerpo.innerHTML="";



clientes.forEach(cliente=>{


cuerpo.innerHTML+=`

<tr>

<td>${cliente.nombre}</td>

<td>${cliente.telefono}</td>

<td>${cliente.usuario}</td>

<td>${cliente.fechaVencimiento}</td>


<td>


<button onclick="renovar(${cliente.id})">
🔄
</button>


<button onclick="eliminarCliente(${cliente.id})">
🗑️
</button>


</td>


</tr>

`;


});


});


}









// =======================
// GUARDAR
// =======================


function guardarCliente(){


let cliente={


nombre:document.getElementById("nombre").value,

telefono:document.getElementById("telefono").value,

usuario:document.getElementById("usuario").value,

contrasena:document.getElementById("contrasena").value,

fechaPago:document.getElementById("fechaPago").value,

activo:true


};



fetch(url,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(cliente)

})


.then(res=>res.json())


.then(()=>{


mostrarNotificacion(
"✅ Cliente agregado correctamente"
);


cargarClientes();


abrirPestana("clientes");


});


}









// =======================
// RENOVAR
// =======================


function renovar(id){


fetch(url+"/"+id+"/renovar",{

method:"PUT"

})


.then(()=>{


mostrarNotificacion(
"🔄 Cliente renovado correctamente"
);


cargarClientes();


});


}









// =======================
// ELIMINAR
// =======================


function eliminarCliente(id){


abrirModal(

"¿Seguro que querés eliminar este cliente?",

function(){


fetch(url+"/"+id,{

method:"DELETE"

})


.then(()=>{


cerrarModal();


mostrarNotificacion(
"🗑️ Cliente eliminado correctamente"
);



cargarClientes();


// limpiar resultado de búsqueda
document.getElementById("resultadoBusqueda").innerHTML="";


// limpiar campo buscador
document.getElementById("buscador").value="";


});


}


);


}









// =======================
// BUSCADOR
// =======================


function buscarCliente(){


let texto=document
.getElementById("buscador")
.value
.toLowerCase();



let resultado=document
.getElementById("resultadoBusqueda");



if(texto==""){

resultado.innerHTML="";

return;

}



fetch(url)

.then(res=>res.json())

.then(clientes=>{


let encontrados=clientes.filter(c=>


c.nombre.toLowerCase().includes(texto)

||

c.usuario.toLowerCase().includes(texto)

||

c.telefono.toLowerCase().includes(texto)


);



resultado.innerHTML="";



encontrados.forEach(c=>{


resultado.innerHTML+=`

<div class="resultado">


<h3>${c.nombre}</h3>


<p>
Usuario: ${c.usuario}
</p>


<p>
Vence: ${c.fechaVencimiento}
</p>



<button onclick="renovar(${c.id})">
🔄 Renovar
</button>


<button onclick="eliminarCliente(${c.id})">
🗑️ Eliminar
</button>


</div>


`;


});


});


}









// =======================
// NOTIFICACIONES
// =======================


function mostrarNotificacion(texto){


let caja=document.getElementById("notificacion");

let mensaje=document.getElementById("textoNotificacion");


mensaje.innerHTML=texto;


caja.classList.remove("oculto");



setTimeout(()=>{


caja.classList.add("oculto");


},3000);


}









// =======================
// MODAL
// =======================


function abrirModal(texto,accion){

    let modal = document.getElementById("modal");

    document.getElementById("mensajeModal").innerHTML = texto;

    modal.style.display = "flex";


    document.getElementById("btnConfirmar").onclick=function(){

        accion();

    };

}








function cerrarModal(){

    document.getElementById("modal").style.display="none";

}






// INICIO

document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("modal").style.display="none";

});

cargarClientes();