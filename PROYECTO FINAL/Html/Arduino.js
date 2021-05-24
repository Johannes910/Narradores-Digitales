let dato;
let contador1 = 0;
let contador2 = 0;
let contador3 = 0;
let contador4 = 0;
var serial;
var port = 'COM5'; // variable que indica el puerto serial utilizado por el Arduino
var backgroundColor = 'rgb(0, 0, 0)'; // variable donde se almacena el color de fondo

/// GODSENT //////////////
let cwidth = 640;
let cheight = 360;
let button;
let encoder;
const frate = 30; // frame rate
const numFrames = 0; // num of frames to record
let recording = false;
let recordedFrames = 0;
let count = 0;
let stopRecording = false;


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

//  button = createButton('record')
//  button.mousePressed(() => recording = true)
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

    // keep adding new frame
    if (recording) {
        console.log('recording')
        encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
        recordedFrames++
    }
    

}

function StopRecording() 
{
    if(recordedFrames > numFrames)
    {
        recording = false
        recordedFrames = 0
        console.log('recording stopped')

        encoder.finalize();
        const uint8Array = encoder.FS.readFile(encoder.outputFilename);
        const anchor = document.createElement('a')
        anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }))
        anchor.download = encoder.outputFilename
        anchor.click()
        encoder.delete()

        preload() // reinitialize encoder
        final = false;
    }
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
        this.speed = 2;
        this.jumpSpeed = 3; 
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
                if(this.posY< 140)
                {
                    this.jumpSpeed = -this.jumpSpeed;
                }
                if(this.posY > 180)
                {
                    this.jumpSpeed = -this.jumpSpeed;
                    dato = '0';
                }
            break;

            case '4':
                contador4++;
                dato = '0';
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

    if(contador4 % 2 !== 0)
    {
        recording = true;
    }else
    {
        StopRecording();
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

let personaje = new Rectangle(320, 180, 25);

function drawScreen()
{
createCanvas(cwidth,cheight);   
 background(232,120,146);
 rectMode(CENTER);
 fill(255);
 personaje.draw();
 personaje.move();
}

function preload() {
    HME.createH264MP4Encoder().then(enc => {
        encoder = enc;
        encoder.outputFilename = 'test';
        encoder.width = cwidth*2;
        encoder.height = cheight*2;
        encoder.frameRate = frate;
        encoder.kbps = 50000; // video quality
        encoder.groupOfPictures = 10; // lower if you have fast actions.
        encoder.initialize()
    })
}




