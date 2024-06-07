const $pantallaInicio = document.querySelector('#inicio');
const $pantallaJuego = document.querySelector('#juego');

document.querySelector('#jugar').onclick = function (){
    $pantallaInicio.style.display = 'none';
    $pantallaJuego.classList.remove('ocultar');
}