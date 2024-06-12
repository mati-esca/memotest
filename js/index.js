const escudos = ['boca', 'river', 'independiente', 'san-lorenzo', 'velez', 'talleres', 'estudiantes', 'linquenio'];
const escudosDuplicados = [];
for(let i=0; i<escudos.length; i++) {
    escudosDuplicados.push(escudos[i]);
    escudosDuplicados.push(escudos[i]);
}
let escudosAleatorios = [];

// LOGICA BOTONES

document.querySelector('#reiniciar').onclick = function() {
    reiniciarTablero();
    reloj(false);
    aciertos = 0;
    comenzarJuego();
}
document.querySelector('#volver-inicio').onclick = function() {
    reiniciarTablero();
    reloj(false);
    aciertos = 0;
    document.querySelector('#juego').classList.add('ocultar');
    document.querySelector('#inicio').classList.remove('ocultar');
}
document.querySelector('#juego-nuevo').onclick = function () {
    ocultarVictoria();
    document.querySelector('#juego').classList.remove('ocultar');
    comenzarJuego();
}
document.querySelector('#ir-inicio').onclick = function() {
    document.querySelector('#victoria').classList.remove('mostrar');
    document.querySelector('#victoria').classList.add('ocultar');
    document.querySelector('#inicio').classList.remove('ocultar');
}

let primeraFicha = null;
let segundaFicha = null;

const CANTIDAD_FICHAS = document.querySelectorAll('.ficha').length;
const ACIERTOS_NECESARIOS = CANTIDAD_FICHAS / 2;
let aciertos = 0;

function mezclarArray(array) { //Fisher-Yates Sorting Algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function mostrarFicha($ficha) {
    $ficha.classList.add('mostrada');
    $ficha.style.backgroundColor = 'rgb(0, 53, 16)';
}

function ocultarFicha($ficha) {
    $ficha.classList.remove('mostrada');
    $ficha.style.backgroundColor = 'rgb(0, 116, 35)';
}

function manejarInputEnFicha(e) {
    const $ficha = e.target;

    if ($ficha.classList.contains('mostrada')) {
        return;
    }

    mostrarFicha($ficha);
    if(!primeraFicha) {
        primeraFicha = $ficha;
    } else if (!segundaFicha) {
        segundaFicha = $ficha;
    }
    if(primeraFicha != null && segundaFicha != null) {
        compararFichas();
    }  
}

function compararFichas() {
    if (primeraFicha.name === segundaFicha.name) {
        resetearFichas();
        aciertos++;
        chequearFinDeJuego();
    }
    else {
        bloquearInputUsuario();
        setTimeout(() => {
            ocultarFicha(primeraFicha);
            ocultarFicha(segundaFicha);
            resetearFichas();
            desbloquearInputUsuario();
        }, 1000)
    }
}

function resetearFichas() {
    primeraFicha = null;
    segundaFicha = null;
}
function desbloquearInputUsuario() {
    document.querySelectorAll('.ficha').forEach(function($ficha) {
        $ficha.onclick = manejarInputEnFicha;
    });
}
function bloquearInputUsuario() {
    document.querySelectorAll('.ficha').forEach(function($ficha) {
        $ficha.onclick = function() {

        };
    });
}

function inicializarTablero(array) {
    const $imagenes = document.querySelectorAll('.ficha img');
    const $fichas = document.querySelectorAll('.ficha');
    for(let i = 0; i< $imagenes.length; i++) {
        $imagenes[i].src = `/img/${array[i]}.png`;
        $fichas[i].name = array[i];
    }
}

function reiniciarTablero() {
    const $fichas = document.querySelectorAll('.ficha');
    $fichas.forEach(function($ficha){
        ocultarFicha($ficha);
    })
}
function comenzarJuego() {
    escudosAleatorios = mezclarArray(escudosDuplicados);
    inicializarTablero(escudosAleatorios);
    desbloquearInputUsuario();
    reloj(true);
}

function chequearFinDeJuego() {
    if(aciertos === ACIERTOS_NECESARIOS) {
        const $tiempo = document.querySelector('#tiempo').textContent;
        setTimeout(() => {
            bloquearInputUsuario();
            reiniciarTablero();
            reloj(false);
            mostrarVictoria($tiempo);
            aciertos = 0;
        }, 500)
    }
    else {
        return;
    }
}
function mostrarVictoria(tiempo) {
    const $pantallaVictoria = document.querySelector('#victoria');
    const $pantallaJuego = document.querySelector('#juego');
    const $mostrarTiempo = document.querySelector('#mostrar-tiempo')
    $pantallaJuego.classList.add('ocultar');
    $pantallaVictoria.classList.add('mostrar');
    $mostrarTiempo.textContent = tiempo; 
}
function ocultarVictoria() {
    const $pantallaVictoria = document.querySelector('#victoria');
    $pantallaVictoria.classList.remove('mostrar');
    $pantallaVictoria.classList.add('ocultar');
}
let inicioReloj;

function reloj(iniciar = false) {
    const $minutosReloj = document.querySelector('#reloj-mins');
    const $segundosReloj = document.querySelector('#reloj-segs');
    let segundos = 0;
    let minutos = 0;
    if(iniciar) {
        inicioReloj = setInterval(() => {
            segundos++
            if(segundos >= 60){
                minutos = Math.floor(segundos/60);
                segundos = segundos%60;
            }
            if(segundos < 10) {
                $segundosReloj.textContent = `0${segundos}`
            } else {
                $segundosReloj.textContent = segundos;
            }
            if(minutos < 10) {
                $minutosReloj.textContent = `0${minutos}`
            } else {
                $minutosReloj.textContent = minutos;
            }
        },1000)
    } else {
        clearInterval(inicioReloj)
        inicioReloj = null;

        minutos = 0;
        segundos = 0;
        $minutosReloj.textContent = '00';
        $segundosReloj.textContent = '00';
    }
}