const escudos = ['boca', 'river', 'independiente', 'san-lorenzo', 'velez', 'talleres', 'estudiantes', 'linquenio'];
const escudosDuplicados = [];
for(let i=0; i<escudos.length; i++) {
    escudosDuplicados.push(escudos[i]);
    escudosDuplicados.push(escudos[i]);
}
let escudosAleatorios = []

document.querySelector('#comenzar').onclick = comenzarJuego;

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
    $ficha.style.backgroundColor = 'rgb(87, 36, 13)';
}

function ocultarFicha($ficha) {
    $ficha.classList.remove('mostrada');
    $ficha.style.backgroundColor = 'sienna';
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
}

function chequearFinDeJuego() {
    if(aciertos === ACIERTOS_NECESARIOS) {
        setTimeout(() => {
            alert('Ganaste');
            bloquearInputUsuario();
            reiniciarTablero();
            
        }, 500)
       
    }
    else {
        return;
    }
}