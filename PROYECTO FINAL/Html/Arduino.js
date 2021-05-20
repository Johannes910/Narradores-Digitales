// Declara el objeto de "SerialPort" que se va a utilizar
let dato;
let contador1 = 0;
let contador2 = 0;
let contador3 = 0;
var serial;
var port = 'COM5'; // variable que indica el puerto serial utilizado por el Arduino
var backgroundColor = 'rgb(0, 0, 0)'; // variable donde se almacena el color de fondo

function setup() {
 createCanvas(windowWidth, windowHeight);

 // Crea un objeto del tipo SerialPort
 serial = new p5.SerialPort();

 // Determina el método que se llama para listar los puertos seriales conectados
 serial.list();
 serial.on('list', portList);

 // Abre la conexión con el puerto donde está conectado el Arduino
 serial.open(port);

 // Determina el método que se llama cuando hay datos en el puerto
 serial.on('data', getData);
}


// Método que muestra por consola los puertos seriales conectados al PC
function portList(ports) {
 console.log('Listado de puertos seriales:');
 // recorre el listado de puertos seriales y los muestra por consola
 for (var i = 0; i < ports.length; i++) {
 	console.log(ports[i]);
 }
}

// Método que llama al recibir datos desde el puerto serial
function getData() {
   var data = serial.readStringUntil("\r\n");// lee los datos desde el puerto serial
   trim(data);                	// elimina los espacios en blanco al principio y final de los datos, si los hay
   if (!data) return;         	// si los datos leídos están vacíos no hace nada
   console.log(data);         	// muestra los datos leídos
   dato = data;
}



function draw() 
{
    drawScreen();
}


class Personaje {
    constructor(posX,posY,tam){
        this.posX = posX;
        this.posY = posY;
        this.tam  = tam;
    }
}

class Rectangle extends Personaje {
    constructor(posX,posY,tam){
        super(posX,posY,tam);
        this.speed = 20;
        this.jumpSpeed = 30; 
    }

    draw(){
        fill(255,0,0);
        rect(this.posX,this.posY,this.tam,this.tam);
        fill(255);
    }
    move(){

        switch (dato)
        {
            case '1':
                contador1++;
                dato = '0';     
            break;
            
            case '2':
                contador2++;
                dato = '0';
            break;

            case '3':
                this.posY -= this.jumpSpeed;
                if(this.posY<1400)
                {
                    this.jumpSpeed = -this.jumpSpeed;
                }
                if(this.posY > 2000)
                {
                    this.jumpSpeed = -this.jumpSpeed;
                    dato = '0';
                }
            break;
        }

    if(contador1 % 2 !== 0)
    {
        this.posX=this.posX+this.speed;
    } 

    if(contador2 % 2 !== 0 )
    {
        this.posX=this.posX-this.speed;
    }

    if(this.posX > width-this.tam)
    {
        this.posX = width-this.tam;
    }else
    {
        if(this.posX - this.tam<0)
        {
            this.posX = this.tam;
        }
    }
    }
}

let personaje = new Rectangle(2000, 2000, 500);

function drawScreen()
{
 background(232,120,146);
 rectMode(CENTER);
 fill(255);
 personaje.draw();
 personaje.move();
}




