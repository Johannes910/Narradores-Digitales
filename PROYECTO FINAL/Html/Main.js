
//////////////////////////////////////////////////////
///////CLASES DE LA CONFIGURACIÓN/////////////////////
class Clima
{
	constructor(idClima , nombreClima, particulaClima)
	{
        this.idClima = idClima;
        this.nombreClima = nombreClima;
        this.particulaClima = particulaClima;
	}
}

class Personaje
{
    constructor(idPersonaje, nombrePersonaje, imagenPersonaje)
    {
        this.idPersonaje = idPersonaje;
        this.nombrePersonaje = nombrePersonaje;
        this.idPersonaje = imagenPersonaje;
    }
}

class Escenario
{
    constructor(idEscenario, nombreEscenario, imagenEscenario)
    {
        this.idEscenario = idEscenario;
        this.nombreEscenario = nombreEscenario;
        this.imagenEscenario = imagenEscenario;
    }
}

class Configuracion
{
    constructor(idConfiguracion, clima, personajes, escenario)
    {
        this.idConfiguracion = idConfiguracion;
        this.clima = clima;
        this.personajes = personajes;
        this.escenario = escenario;
    }
}

//////////////////////////////////////////////////////
///////CLASES DE LA HISTORIA//////////////////////////
class Reaccion
{
    constructor(idReaccion, imagenReaccion)
    {
        this.idReaccion = idReaccion;
        this.imagenReaccion = imagenReaccion;
    }
}

class Comentario
{
    constructor(idComentario, textoComentario, fechaComentario)
    {
        this.idComentario = idComentario;
        this.textoComentario = textoComentario;
        this.fechaComentario = fechaComentario;
    }
}

class Historia
{
    constructor(idHistoria, nombreHistoria, contenidoHistoria, comentarios, reacciones)
    {
        this.idHistoria = idHistoria;
        this.nombreHistoria = nombreHistoria;
        this.contenidoHistoria = contenidoHistoria;
        this.comentarios = comentarios;
        this.reacciones = reacciones;
    }
}

//////////////////////////////////////////////////////
///////CUENTA DELEGADA////////////////////////////////
class CuentaDelegada
{
    constructor(idCuentaDelegada, nombre, historias)
    {
        this.idCuentaDelegada = idCuentaDelegada;
        this.nombre = nombre;
        this.historias = historias;
    }

    CrearConfiguracion(idConfiguracion, clima, personajes, escenario)
    {
        return new Configuracion(idConfiguracion, clima, personajes, escenario);
    }

    crearHistoria(idHistoria, nombreHistoria, contenidoHistoria, comentarios, reacciones)
    {
        return new Historia(idHistoria, nombreHistoria, contenidoHistoria, comentarios, reacciones);
    }
}

//////////////////////////////////////////////////////
///////CUENTA/////////////////////////////////////////
class Cuenta
{
    constructor(idCuenta, usuario, contrasena, cuentasDelegadas)
    {
        this.idCuenta = idCuenta;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.cuentasDelegadas = cuentasDelegadas;
    }

    DelegarCuenta(idCuentaDelegada , nombreCuenta)
    {
        let historias = [];
        historias.push("gato");
        let cuentaDelegada = new CuentaDelegada(idCuentaDelegada, nombreCuenta, historias); 
        return cuentaDelegada;
    }

    CrearComentario(idComentario, textoComentario, fechaComentario)
    {
        return new Comentario(idComentario, textoComentario, fechaComentario);
    }

    PublicarHistoria(historia)
    {

    }

    PublicarReaccion(idHistoria, reaccion)
    {

    }

    PublicarComentario(idHistoria, comentario)
    {

    }

}

//////////////////////////////////////////////////////
///////MAIN///////////////////////////////////////////
class Main
{
    static AgregarCuenta(idCuenta, usuario, contrasena)
    {
        let cuentasDelegadas = [];
        return new Cuenta(idCuenta, usuario, contrasena, cuentasDelegadas);
    }

    static AgregarClima(idClima , nombreClima, particulaClima)
    {
        return new Clima(idClima , nombreClima, particulaClima);
    }

    static AgregarPersonaje(idPersonaje, nombrePersonaje, imagenPersonaje)
    {
        return new Personaje(idPersonaje, nombrePersonaje, imagenPersonaje);
    }

    static AgregarEscenario(idEscenario, nombreEscenario, imagenEscenario)
    {
        return new Escenario(idEscenario, nombreEscenario, imagenEscenario);
    }

    static CrearReaccion(idReaccion, imagenReaccion)
    {
        return new Reaccion(idReaccion, imagenReaccion);
    }
}

////////////////////////VARIABLES///////////////////////
const crearUsuario = document.querySelector("#CrearCuenta");

/////////////////////// CREAR CUENTA///////////////////
crearUsuario.addEventListener('click', () =>{
	crear_usuario();
});

//Método para crear una Cuenta usando el usuario y la contraseña
function crear_usuario() 
{
	var nombre = document.getElementById("NombreUsuario").value;
	var contrasena = document.getElementById("Contrasena").value;
	let laCuenta = Main.AgregarCuenta(1, nombre, contrasena);
    console.log(laCuenta);
}