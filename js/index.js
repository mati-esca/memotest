const escudos = ['boca', 'river', 'independiente', 'san-lorenzo', 'velez', 'talleres', 'estudiantes', 'linquenio'];
const escudosDuplicados = [];
for(let i=0; i<escudos.length; i++) {
    escudosDuplicados.push(escudos[i]);
    escudosDuplicados.push(escudos[i]);
}
const escudosAleatorios = mezclarArray(escudosDuplicados);

document.querySelector('#comenzar').onclick = comenzarJuego;

function mezclarArray(array) { //Fisher-Yates Sorting Algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function manejarInputUsuario(e) {
    const $ficha = e.target;
    console.log($ficha);
    
}
function desbloquearInputUsuario() {
    document.querySelectorAll('.ficha').forEach(function($ficha) {
        $ficha.onclick = manejarInputUsuario;
    })
}

function repartirFichas(array) {
    const $imagenes = document.querySelectorAll('.ficha img');
    const $fichas = document.querySelectorAll('.ficha');
    for(let i = 0; i< $imagenes.length; i++) {
        $imagenes[i].src = `/img/${array[i]}.png`;
        $imagenes[i].name = array[i];
        $imagenes[i].id = `${$imagenes[i].name}-${i+1}`;
        $fichas[i].name = array[i];
        
        $imagenes[i].classList.remove('oculto'); //sacar
    }
    
}

function comenzarJuego() {
    repartirFichas(escudosAleatorios);
    desbloquearInputUsuario();
}