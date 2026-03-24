let des = document.getElementById('des').getContext('2d')

let carroInimigo = new CarroInimigo(100, -300, 60, 60, './img/comida1.png')
let carroInimigo2 = new CarroInimigo(400, -500, 60, 60, './img/sapato.png')
let carroInimigo3 = new CarroInimigo(500, -100, 60, 60, './img/comida3.png')
let carroInimigo4 = new CarroInimigo(1000, 1025, 50, 50, './img/comida4.png')
let carroInimigo5 = new CarroInimigo(1390, 225, 50, 50, './img/comida5.png')
let carroInimigo6 = new CarroInimigo(1600, 585, 60, 60, './img/comida6.png')
let carroInimigo7 = new CarroInimigo(1400, 995, 60, 60, './img/comida7.png')
// troquei a posição do y, pro carro do usuario ficar na parte inferior da tela
let carro = new Carro(100, 625, 80, 80, '../img/gato_001_bg.png')
//adicionei o segundo jogador:
let jogadores = localStorage.getItem('players') || 1;
let carro2 = null;
if (jogadores == 2) {
    carro2 = new Carro(500, 625, 80, 80, '../img/gato2_01.png');
}
//adicionei a animação game over aqui
let gameOverAnim = new Carro(50, 200, 500, 500, './img/lingua_01.png')

// adicionei a posiçãoe o tamanho do btn pause
let btnPauseCanvas = {
    x: 680,
    y: 16,
    w: 100,
    h: 50
}

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()
let pausado = false

// adicionei o personalizar musica
let musicaSalva = localStorage.getItem('musica')
let motor = new Audio(musicaSalva || './img/musica_fundo1.wav')
motor.play()


let batida = new Audio('./img/comendo2.mp3')

motor.volume = 0.5
motor.loop = true
batida.volume = 0.5

let jogar = true
let fase = 1

// aqui são os botões de movimento
//Troquei W/S por A/D e mudei os Arrow
// adicionei um if que bloqueia o controle do jogador morto
document.addEventListener('keydown', (e) => {

    // jogador 1
    if (carro.vida > 0) {
        if (e.key === 'ArrowLeft') {
            carro.dir -= 10;
        } else if (e.key === 'ArrowRight') {
            carro.dir += 10;
        }
    }

    // jogador 2
    if (jogadores == 2 && carro2 && carro2.vida > 0) {
        if (e.key === 'a') {
            carro2.dir -= 10;
        } else if (e.key === 'd') {
            carro2.dir += 10;
        }
    }

});

// aqui são os botões de movimento
document.addEventListener('keyup', (e) => {
    // jogador 1
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        carro.dir = 0;
    }

    // jogador 2
    if (jogadores == 2 && carro2) {
        if (e.key === 'a' || e.key === 'd') {
            carro2.dir = 0;
        }
    }
});

//adicionei um pause no jogo
document.addEventListener('click', (e) => {
    let canvas = document.getElementById('des')
    let rect = canvas.getBoundingClientRect()

    let mouseX = e.clientX - rect.left
    let mouseY = e.clientY - rect.top

    if (
        mouseX >= btnPauseCanvas.x &&
        mouseX <= btnPauseCanvas.x + btnPauseCanvas.w &&
        mouseY >= btnPauseCanvas.y &&
        mouseY <= btnPauseCanvas.y + btnPauseCanvas.h
    ) {
        pausado = !pausado

        if (pausado) {
            motor.pause()
        } else {
            motor.play()
        }
    }
})

function game_over() {
    if (jogadores == 2 && carro2) {
        if (carro.vida <= 0 && carro2.vida <= 0) {
            jogar = false
            motor.pause()
            //Troquei o fundo quando a funçaõ é chamada
            let canvas = document.querySelector("canvas");
            canvas.style.backgroundImage = "url('./img/fundo_game_over2.png')";
        }
    } else {
        if (carro.vida <= 0) {
            jogar = false
            motor.pause()
            //Troquei o fundo quando a funçaõ é chamada
            let canvas = document.querySelector("canvas");
            canvas.style.backgroundImage = "url('./img/fundo_game_over2.png')";
        }
    }
}

function ver_fase() {
    let canvas = document.querySelector("canvas");
    if (carro.pontos > 150 && fase === 1) {
        fase = 2
        canvas.style.backgroundImage = "url('./img/fundo_02.png')";
        carroInimigo.vel = 4
        carroInimigo2.vel = 2
        carroInimigo3.vel = 4
        carroInimigo4.vel = 1
        carroInimigo5.vel = 2
        carroInimigo6.vel = 4
        carroInimigo7.vel = 4
    } else if (carro.pontos > 300 && fase === 2) {
        fase = 3
        canvas.style.backgroundImage = "url('./img/fundo_03.png')";
        carroInimigo.vel = 5
        carroInimigo2.vel = 3
        carroInimigo3.vel = 5
        carroInimigo4.vel = 2
        carroInimigo5.vel = 1
        carroInimigo6.vel = 5
        carroInimigo7.vel = 1
    }
}
//Troquei VIDA por PONTOS, agora cada vez que colidir ele ganha pontos e não perde vidas
//Adicionei mais carros inimigos
// quando o usuario colidir com o carroInimigo 2 (o sapato) ele perde uma vida
function colisaoJogador(jogador) {
    if (jogador.colid(carroInimigo)) {
        batida.play()
        carroInimigo.recomeca()
        jogador.pontos += 5
    }

    if (jogador.colid(carroInimigo2)) {
        jogador.pontos -= 2
        jogador.vida -= 1
        carroInimigo2.recomeca()

        let batida_ruim = new Audio('./img/comendo_ruim.mp3')
        batida_ruim.play()
    }

    if (jogador.colid(carroInimigo3)) {
        batida.play()
        carroInimigo3.recomeca()
        jogador.pontos += 5
    }

    if (jogador.colid(carroInimigo4)) {
        batida.play()
        carroInimigo4.recomeca()
        jogador.pontos += 5
    }

    if (jogador.colid(carroInimigo5)) {
        batida.play()
        carroInimigo5.recomeca()
        jogador.pontos += 5
    }

    if (jogador.colid(carroInimigo6)) {
        batida.play()
        carroInimigo6.recomeca()
        jogador.pontos += 5
    }

    if (jogador.colid(carroInimigo7)) {
        batida.play()
        carroInimigo7.recomeca()
        jogador.pontos += 5
    }
}


function colisao() {
    // jogador 1
    if (carro.vida > 0) {
        colisaoJogador(carro)
    }

    // jogador 2
    if (jogadores == 2 && carro2 && carro2.vida > 0) {
        colisaoJogador(carro2)
    }
}

function pontuacao() {
     // se for 2 jogadores, não faz nada
    if (jogadores == 2) return;

    if (carro.point(carroInimigo)) {
        carro.pontos -= 7
    }
    if (carro.point(carroInimigo3)) {
        carro.pontos -= 7
    }
    if (carro.point(carroInimigo4)) {
        carro.pontos -= 7
    }
    if (carro.point(carroInimigo5)) {
        carro.pontos -= 7
    }
    if (carro.point(carroInimigo6)) {
        carro.pontos -= 7
    }
    if (carro.point(carroInimigo7)) {
        carro.pontos -= 7
    }
}


function desenha() {

    if (jogar) {
        // desenhar jogadores
        if (carro.vida > 0) {
            carro.des_carro();
        }
        if (jogadores == 2 && carro2 && carro2.vida > 0) {
            carro2.des_carro();
        }
        carroInimigo.des_carro()
        carroInimigo2.des_carro()
        carroInimigo3.des_carro()
        carroInimigo4.des_carro()
        carroInimigo5.des_carro()
        carroInimigo6.des_carro()
        carroInimigo7.des_carro()
        // Troquei os limites da tela, então ajustei os valores para todos aparecerem
        t1.des_text('Pontos: ' + carro.pontos, 200, 40, 'yellow', '26px Arial')
        t2.des_text('Vidas: ' + carro.vida, 40, 40, 'red', '26px Arial')
        if (jogadores == 2 && carro2) {
            t1.des_text('P2 Pontos: ' + carro2.pontos, 200, 70, 'cyan', '20px Arial')
            t2.des_text('P2 Vidas: ' + carro2.vida, 40, 70, 'orange', '20px Arial')
        }
        fase_txt.des_text('Fase: ' + fase, 550, 40, 'white', '26px Arial')
        if (pausado) {
            t1.des_text('PAUSADO', 330, 350, 'white', '40px Arial')
        }
        // desenhar botão pause
        des.fillStyle = 'white'
        des.font = '26px Arial'
        des.fillText(pausado ? '▶️' : '⏸️', btnPauseCanvas.x + 40, btnPauseCanvas.y + 32)
    } else {
        // adicionei um gato mostrandoa lingua aqui
                if (jogadores == 1 && carro) {
        t2.des_text('Pontuação Final: ' + carro.pontos, 500, 70, 'white', '30px Arial')
        gameOverAnim.des_carro()

                }
        if (jogadores == 2 && carro2) {
            t2.des_text('Jogador 1 - Pontuação Final: ' + carro.pontos, 350, 70, 'white', '30px Arial')
            t1.des_text('Jogador 2 - Pontuação Final: ' + carro2.pontos, 350, 110, 'white', '30px Arial')
            gameOverAnim.des_carro()
        }
    }
}

// adicionei o pause aqui 
function atualiza() {
    if (jogar && !pausado) {
        // P1
        if (carro.vida > 0) {
            carro.mov_car();
            carro.anim('gato_00');
        }

        // P2
        if (jogadores == 2 && carro2 && carro2.vida > 0) {
            carro2.mov_car();
            carro2.anim('gato2_0');
        }
        carroInimigo.mov_car()
        carroInimigo2.mov_car()
        carroInimigo3.mov_car()
        carroInimigo4.mov_car()
        carroInimigo5.mov_car()
        carroInimigo6.mov_car()
        carroInimigo7.mov_car()
        colisao()
        pontuacao()
        ver_fase()
        game_over()
    }
    //adicionei um gato mostrandoa lingua na tela game over aqui
    gameOverAnim.anim_game_over('lingua_0')

}

function main() {
    des.clearRect(0, 0, 800, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()