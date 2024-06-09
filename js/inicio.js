const $pantallaInicio = document.querySelector('#inicio');
const $pantallaJuego = document.querySelector('#juego');

document.querySelector('#jugar').onclick = function (){
    //$pantallaInicio.style.display = 'none';
    $pantallaInicio.classList.add('ocultar');
    $pantallaJuego.classList.remove('ocultar');
    comenzarJuego();
}