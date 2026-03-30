let des = document.getElementById('des').getContext('2d')

let carroInimigo = new CarroInimigo(100, -300, 60, 60, './img/comida1.png')
let carroInimigo2 = new CarroInimigo(400, -500, 60, 60, './img/sapato.png')
let carroInimigo3 = new CarroInimigo(500, -100, 60, 60, './img/comida3.png')
let carroInimigo4 = new CarroInimigo(1000, 1025, 50, 50, './img/comida4.png')
let carroInimigo5 = new CarroInimigo(1390, 225, 50, 50, './img/comida5.png')
let carroInimigo6 = new CarroInimigo(1600, 585, 60, 60, './img/comida6.png')
let carroInimigo7 = new CarroInimigo(1400, 995, 60, 60, './img/comida7.png')
let carroInimigo8 = new CarroInimigo(1400, 995, 60, 60, './img/comida_vida.png')

// troquei a posição do y, pro carro do usuario ficar na parte inferior da tela
let carro = new Carro(100, 625, 80, 80, '../img/gato_001.png')
//adicionei o segundo jogador:
let jogadores = localStorage.getItem('players') || 1;
let carro2 = null;
if (jogadores == 2) {
    carro2 = new Carro(500, 625, 80, 80, '../img/gato2_01.png');
}
//adicionei a animação game over aqui
let gameOverAnim = new Carro(50, 200, 500, 500, './img/lingua_01.png')
// adicionei a posiçãoe o tamanho do btn pause E DO BTN VOLTAR
let btnPauseCanvas = {
    x: 680,
    y: 16,
    w: 100,
    h: 50
}
let btnVoltar = {
    x: 500,
    y: 560,
    w: 200,
    h: 60
}

let t1 = new Text()
let t2 = new Text()
let t3 = new Text()
let fase_txt = new Text()
let pausado = false
let comecou = false

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
    // botão voltar
    if (
        (pausado || !jogar) &&
        mouseX >= btnVoltar.x &&
        mouseX <= btnVoltar.x + btnVoltar.w &&
        mouseY >= btnVoltar.y &&
        mouseY <= btnVoltar.y + btnVoltar.h
    ) {
        window.location.href = './index.html'
    }
})

function game_over() {
    if (jogadores == 2 && carro2) {
        if (carro.vida <= 0 || carro2.vida <= 0) {
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

// adicionei a tela de vencedor aqui
// lembrete: para mudar a quantidade de pontos necessarios para o jogador vencer (agr ta no 400 pontos), mude aqui e no atualiza, apara aparecer o jogador vencedor
function vencer() {
    if (jogadores == 2 && carro2) {
        if (carro.pontos >= 400 || carro2.pontos >= 400) {
            jogar = false
            motor.pause()
            //Troquei o fundo quando a funçaõ é chamada
            let canvas = document.querySelector("canvas");
            canvas.style.backgroundImage = "url('./img/tela_vencer.png')";
        }
    } else {
        if (carro.pontos >= 400) {
            jogar = false
            motor.pause()
            //Troquei o fundo quando a funçaõ é chamada
            let canvas = document.querySelector("canvas");
            canvas.style.backgroundImage = "url('./img/tela_vencer.png')";
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
        carroInimigo8.vel = 6
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
        carroInimigo8.vel = 6

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
        comecou = true   // aqui só começa o jogo quando o primeiro carro chegar a chão

    }

    if (jogador.colid(carroInimigo2)) {
        jogador.pontos -= 2
        jogador.vida -= 1
        carroInimigo2.recomeca()
        comecou = true   // aqui só começa o jogo quando o primeiro carro chegar a chão


        let batida_ruim = new Audio('./img/comendo_ruim.mp3')
        batida_ruim.play()
    }

    if (jogador.colid(carroInimigo3)) {
        batida.play()
        carroInimigo3.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando o primeiro carro chegar a chão

    }

    if (jogador.colid(carroInimigo4)) {
        batida.play()
        carroInimigo4.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando o primeiro carro chegar a chão

    }

    if (jogador.colid(carroInimigo5)) {
        batida.play()
        carroInimigo5.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando o primeiro carro chegar a chão

    }

    if (jogador.colid(carroInimigo6)) {
        batida.play()
        carroInimigo6.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando o primeiro carro chegar a chão

    }

    if (jogador.colid(carroInimigo7)) {
        batida.play()
        carroInimigo7.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando o primeiro carro chegar a chão

    }
    if (jogador.colid(carroInimigo8)) {
        batida.play()
        carroInimigo8.recomeca()
        jogador.vida += 1
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
    if (jogadores == 2) return;

    if (!comecou) return; // BLOQUEIA PERDER PONTO O INICIO, pois o jogo ainda não "começou" e ele só começa quando colidir pela primeira vez

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
    if (carro.point(carroInimigo8)) {
        carro.pontos -= 2
    }
}

// ADICIONEI O PAUSE E O VOLTAR AQUI
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
        if (carro.vida <= 1) {
            carroInimigo8.des_carro()
        }
        // Troquei os limites da tela, então ajustei os valores para todos aparecerem
        t1.des_text('Pontos: ' + carro.pontos, 200, 40, 'white', '26px Arial')
        t2.des_text('J1 Vidas: ' + carro.vida, 40, 40, 'white', '26px Arial')
        if (jogadores == 2 && carro2) {
            t1.des_text('Pontos: ' + carro2.pontos, 200, 80, 'orange', '26px Arial')
            t2.des_text('J2 Vidas: ' + carro2.vida, 40, 80, 'orange', '26px Arial')
        }
        fase_txt.des_text('Fase: ' + fase, 550, 40, 'white', '26px Arial')
        if (pausado) {
            // botão voltar
            des.fillStyle = 'pink'
            des.fillRect(btnVoltar.x, btnVoltar.y, btnVoltar.w, btnVoltar.h)

            des.fillStyle = 'black'
            des.font = '24px Arial'
            des.fillText('VOLTAR', btnVoltar.x + 50, btnVoltar.y + 38)
        }
        // desenhar botão pause
        des.fillStyle = 'white'
        des.font = '26px Arial'
        des.fillText(pausado ? '▶️' : '⏸️', btnPauseCanvas.x + 40, btnPauseCanvas.y + 32)
    } else {
        // adicionei um gato mostrandoa lingua aqui
        if (jogadores == 1 && carro) {

            if (carro.vida <= 0) {
                t1.des_text('Você Perdeu', 500, 120, 'white', '30px Arial')
            } else if (carro.pontos >= 400) {
                t1.des_text('Você ganhou', 350, 190, 'white', '30px Arial')
            }
        
            t2.des_text('Pontuação Final: ' + carro.pontos, 500, 70, 'white', '30px Arial')
            gameOverAnim.des_carro()
        
        } else if (jogadores == 2 && carro2) {
        
            if (carro.vida <= 0 || carro2.pontos >= 400) {
                t3.des_text('Ganhador: Jogador 2', 350, 190, 'white', '30px Arial')
            } else if (carro2.vida <= 0 || carro.pontos >= 400) {
                t3.des_text('Ganhador: Jogador 1', 350, 190, 'white', '30px Arial')
            }
        
            t2.des_text('Jogador 1 - Pontuação Final: ' + carro.pontos, 350, 70, 'white', '30px Arial')
            t1.des_text('Jogador 2 - Pontuação Final: ' + carro2.pontos, 350, 110, 'white', '30px Arial')
            gameOverAnim.des_carro()
        }
        // botão voltar
        des.fillStyle = 'pink'
        des.fillRect(btnVoltar.x, btnVoltar.y, btnVoltar.w, btnVoltar.h)

        des.fillStyle = 'black'
        des.font = '24px Arial'
        des.fillText('VOLTAR', btnVoltar.x + 50, btnVoltar.y + 38)
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
        if (carro.vida <= 2) {
            carroInimigo8.mov_car()
        }
        colisao()
        pontuacao()
        ver_fase()
        vencer()
        game_over()
        //adicionei um gato mostrandoa lingua na tela game over aqui
    }
    if (!jogar) {
        gameOverAnim.anim_game_over('lingua_0')
    }
}

function main() {
    des.clearRect(0, 0, 800, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()