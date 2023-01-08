class Globo {
    constructor(id, y, num1, num2, operador) {
        this.id = id;
        this.y = y;
        this.num1 = num1;
        this.num2 = num2;
        this.operador = operador;
    }
    dibujar() {
        $(`.g${this.id}`).css('bottom', `${this.y}%`);
        this.y++;
    }
    eliminar() {
        $(`.g${this.id}`).remove();
    }
    getResultado() {
        let res = 0;
        switch (this.operador) {
            case '*': res = this.num1 * this.num2; break;
            case '/': res = this.num1 / this.num2; break;
            case '+': res = this.num1 + this.num2; break;
            case '-': res = this.num1 - this.num2; break;
        }
        return res;
    }
}


let arr = [];
let numInput = "";
let respuestaActual = { id: 0, resultado: 0 };
let puntos = 0;
let puntosAux = 0;
let cont = 0;

function escribirNum(num) {
    numInput += num;
    let input = document.querySelector('.input-number');
    input.value = numInput;
}
function agregarGlobo() {
    let operadores = ["-", "+"];
    let indice = Math.floor(Math.random() * 2);
    let num1 = 0;
    let num2 = 0;
    do {
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * 100);
    } while (!(num1 > num2));

    let id = Math.floor(Math.random() * 10000);
    $('.mesa').append(`<div class="globo g${id}">${num1}${operadores[indice]}${num2}</div>`);
    let x = Math.floor(Math.random() * 50);
    $(`.g${id}`).css('left', `${x}%`);
    arr.push(new Globo(id, 0, num1, num2, operadores[indice]));
}

function animar() {
    $('.btn-reiniciar').css('display', 'block');
    $('.comandos').css('display', 'none');
    $('.mesa').css('display', 'block');
    $('.mesa').css('width', '100%');

    let vidas = 5;
    agregarGlobo();
    let time = setInterval(() => {
        if (arr.length > 0) {
            $('.vidas').html(`Vidas: ${vidas}`);
            respuestaActual.id = arr[0].id;
            respuestaActual.resultado = arr[0].getResultado();
        }
        if (cont >= 100) {
            agregarGlobo();
            cont = 0;
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i].dibujar();
            if (arr[i].y >= 100) {
                vidas--;
                arr[i].eliminar();
                arr.splice(i, 1);
            }
        }
        $('.vidas').html(`Vidas: ${vidas}`);
        $('.puntos').html(`Puntos: ${puntos}`);
        if (vidas <= 0) {
            clearInterval(time);
        }
        puntosAux = Math.floor(35 - 34 * (cont / 100));
        cont++;
    }, 100);
}

function responder() {
    if (arr.length > 0) {
        let input = parseFloat(document.querySelector('.input-number').value);
        console.log(input);
        if (input == respuestaActual.resultado) {
            playSoundBien();
            $(`.g${respuestaActual.id}`).remove();
            let indice = arr.findIndex(x => x.id = respuestaActual.id);
            arr.splice(indice, 1);
            document.querySelector('.input-number').value = '';
            numInput = '';
            puntos += puntosAux;
            $('.puntos').html(`Puntos: ${puntos}`);
            cont = 0;
            agregarGlobo();
           
        } else {
            playSoundError();
            $(`.g${respuestaActual.id}`).css('background-color', 'rgb(212, 17, 17)');
            document.querySelector('.input-number').value = '';
            numInput = '';
        }
    }
}
function borrar() {
    let str = document.querySelector('.input-number');
    str.value = str.value.slice(0, -1);
    numInput = str.value;
}

function reiniciar() {
    window.location.reload();
}

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case '0': escribirNum(event.key); break;
        case '.': escribirNum(event.key); break;
        case '1': escribirNum(event.key); break;
        case '2': escribirNum(event.key); break;
        case '3': escribirNum(event.key); break;
        case '4': escribirNum(event.key); break;
        case '5': escribirNum(event.key); break;
        case '6': escribirNum(event.key); break;
        case '7': escribirNum(event.key); break;
        case '8': escribirNum(event.key); break;
        case '9': escribirNum(event.key); break;
        case 'Enter': responder(); break;
        case 'Backspace': borrar(); break;
    }
})



function playSoundBien() {
    const sound = document.getElementById('mySoundBien');
    sound.play();
}
function playSoundError() {
    const sound = document.getElementById('mySoundError');
    sound.play();
}