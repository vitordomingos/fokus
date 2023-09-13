const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const playPauseImg = document.querySelector('.app__card-primary-butto-icon')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const play = new Audio('/sons/play.wav')
const pause = new Audio('/sons/pause.mp3')
const beep = new Audio('/sons/beep.mp3')
musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {

    if (musica.paused) {

        musica.play()
    } else {

        musica.pause()
    }
})

focoBt.addEventListener('click', () => {

    tempoDecorridoEmSegundos = 1500
    alteraContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {

    tempoDecorridoEmSegundos = 300
    alteraContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {

    tempoDecorridoEmSegundos = 900
    alteraContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alteraContexto(contexto) {

    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    
    if (intervaloId) {

        iniciarOuPausar()
    }

    switch (contexto) {
        case 'foco':

            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':

            titulo.innerHTML = `Que tal dar uma respirada,<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case 'descanso-longo':

            titulo.innerHTML = `Hora de voltar à superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {

    if (tempoDecorridoEmSegundos <= 0) {

        beep.play()
        alert('Tempo finalizado!')
        zerar()
        tempoDecorridoEmSegundos = 5
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {

    if (intervaloId) {

        zerar()
        pause.play()
        return
    }
    play.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    playPauseImg.setAttribute('src', `imagens/pause.png`)
}

function zerar() {

    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    playPauseImg.setAttribute('src', `imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {

    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.textContent = `${tempoFormatado}`
}

mostrarTempo()