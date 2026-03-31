let des = document.getElementById('des').getContext('2d')

let comida = new Comida(100, -300, 60, 60, './img/comida1.png')
let comida2 = new Comida(400, -500, 60, 60, './img/sapato.png')
let comida3 = new Comida(500, -100, 60, 60, './img/comida3.png')
let comida4 = new Comida(1000, 1025, 50, 50, './img/comida4.png')
let comida5 = new Comida(1390, 225, 50, 50, './img/comida5.png')
let comida6 = new Comida(1600, 585, 60, 60, './img/comida6.png')
let comida7 = new Comida(1400, 995, 60, 60, './img/comida7.png')
let comida8 = new Comida(1400, 900, 60, 60, './img/comida_vida.png')

// troquei a posição do y, pro gato do usuario ficar na parte inferior da tela
let gato = new Gato(100, 625, 80, 80, '../img/gato_001.png')

//adicionei o segundo jogador:
let jogadores = localStorage.getItem('players') || 1;

let gato2 = null;

if (jogadores == 2) {
    gato2 = new Gato(500, 625, 80, 80, '../img/gato2_01.png');
}

//adicionei a animação game over aqui
let gameOverAnim = new Gato(50, 200, 500, 500, './img/lingua_01.png')

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
let musica_fundo = new Audio(musicaSalva || './img/musica_fundo1.wav')
musica_fundo.play()


let colisao_som = new Audio('./img/comendo2.mp3')

musica_fundo.volume = 0.5
musica_fundo.loop = true
colisao_som.volume = 0.5

let jogar = true
let fase = 1

// aqui são os botões de movimento
//Troquei W/S por A/D e mudei os Arrow
// adicionei um if que bloqueia o controle do jogador morto
document.addEventListener('keydown', (e) => {

    // jogador 1
    if (gato.vida > 0) {
        if (e.key === 'ArrowLeft') {
            gato.dir -= 10;
        } else if (e.key === 'ArrowRight') {
            gato.dir += 10;
        }
    }

    // jogador 2
    if (jogadores == 2 && gato2 && gato2.vida > 0) {
        if (e.key === 'a') {
            gato2.dir -= 10;
        } else if (e.key === 'd') {
            gato2.dir += 10;
        }
    }

});

// aqui são os botões de movimento
document.addEventListener('keyup', (e) => {
    // jogador 1
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        gato.dir = 0;
    }

    // jogador 2
    if (jogadores == 2 && gato2) {
        if (e.key === 'a' || e.key === 'd') {
            gato2.dir = 0;
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
            musica_fundo.pause()
        } else {
            musica_fundo.play()
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
    if (jogadores == 2 && gato2) {
        if (gato.vida <= 0 || gato2.vida <= 0) {
            jogar = false
            musica_fundo.pause()
            //Troquei o fundo quando a funçaõ é chamada
            let canvas = document.querySelector("canvas");
            canvas.style.backgroundImage = "url('./img/fundo_game_over2.png')";
        }
    } else {
        if (gato.vida <= 0) {
            jogar = false
            musica_fundo.pause()
            //Troquei o fundo quando a funçaõ é chamada
            let canvas = document.querySelector("canvas");
            canvas.style.backgroundImage = "url('./img/fundo_game_over2.png')";
        }
    }
}

// adicionei a tela de vencedor aqui
// lembrete: para mudar a quantidade de pontos necessarios para o jogador vencer (agr ta no 400 pontos), mude aqui e no atualiza, apara aparecer o jogador vencedor
function vencer() {
    if (jogadores == 2 && gato2) {
        if (gato.pontos >= 400 || gato2.pontos >= 400) {
            jogar = false
            musica_fundo.pause()
            //Troquei o fundo quando a funçaõ é chamada
            let canvas = document.querySelector("canvas");
            canvas.style.backgroundImage = "url('./img/tela_vencer.png')";
        }
    } else {
        if (gato.pontos >= 400) {
            jogar = false
            musica_fundo.pause()
            //Troquei o fundo quando a funçaõ é chamada
            let canvas = document.querySelector("canvas");
            canvas.style.backgroundImage = "url('./img/tela_vencer.png')";
        }
    }
}

function ver_fase() {
    let canvas = document.querySelector("canvas");
    if (gato.pontos > 150 && fase === 1) {
        fase = 2
        canvas.style.backgroundImage = "url('./img/fundo_02.png')";
        comida.vel = 4
        comida2.vel = 2
        comida3.vel = 4
        comida4.vel = 1
        comida5.vel = 2
        comida6.vel = 4
        comida7.vel = 4
        comida8.vel = 6
    } else if (gato.pontos > 300 && fase === 2) {
        fase = 3
        canvas.style.backgroundImage = "url('./img/fundo_03.png')";
        comida.vel = 5
        comida2.vel = 3
        comida3.vel = 5
        comida4.vel = 2
        comida5.vel = 1
        comida6.vel = 5
        comida7.vel = 1
        comida8.vel = 6

    }
}
//Troquei VIDA por PONTOS, agora cada vez que colidir ele ganha pontos e não perde vidas
//Adicionei mais comidas
// quando o usuario colidir com o comida2 (o sapato) ele perde uma vida
function colisaoJogador(jogador) {
    if (jogador.colid(comida)) {
        colisao_som.play()
        comida.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando o primeira comida chegar a chão

    }

    if (jogador.colid(comida2)) {
        jogador.pontos -= 2
        jogador.vida -= 1
        comida2.recomeca()
        comecou = true   //  aqui só começa o jogo quando o primeira comida chegar a chão


        let batida_ruim = new Audio('./img/comendo_ruim.mp3')
        batida_ruim.play()
    }

    if (jogador.colid(comida3)) {
        colisao_som.play()
        comida3.recomeca()
        jogador.pontos += 5
        comecou = true   //  aqui só começa o jogo quando a primeira comida chegar a chão

    }

    if (jogador.colid(comida4)) {
        colisao_som.play()
        comida4.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando a primeira comida chegar a chão

    }

    if (jogador.colid(comida5)) {
        colisao_som.play()
        comida5.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando a primeira comida chegar a chão

    }

    if (jogador.colid(comida6)) {
        colisao_som.play()
        comida6.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando a primeira comida chegar a chão

    }

    if (jogador.colid(comida7)) {
        colisao_som.play()
        comida7.recomeca()
        jogador.pontos += 5
        comecou = true   // aqui só começa o jogo quando a primeira comida chegar a chão

    }
    if (jogador.colid(comida8)) {
        colisao_som.play()
        comida8.recomeca()
        jogador.vida += 1
        }
}


function colisao() {
    // jogador 1
    if (gato.vida > 0) {
        colisaoJogador(gato)
    }

    // jogador 2
    if (jogadores == 2 && gato2 && gato2.vida > 0) {
        colisaoJogador(gato2)
    }
}

function pontuacao() {
    if (jogadores == 2) return;

    if (!comecou) return; // BLOQUEIA PERDER PONTO O INICIO, pois o jogo ainda não "começou" e ele só começa quando colidir pela primeira vez

    if (gato.point(comida)) {
        gato.pontos -= 7
    }
    if (gato.point(comida3)) {
        gato.pontos -= 7
    }
    if (gato.point(comida4)) {
        gato.pontos -= 7
    }
    if (gato.point(comida5)) {
        gato.pontos -= 7
    }
    if (gato.point(comida6)) {
        gato.pontos -= 7
    }
    if (gato.point(comida7)) {
        gato.pontos -= 7
    }
    if (gato.point(comida8)) {
        gato.pontos -= 2
    }
}

// ADICIONEI O PAUSE E O VOLTAR AQUI
function desenha() {

    if (jogar) {
        // desenhar jogadores
        if (gato.vida > 0) {
            gato.des_gato();
        }
        if (jogadores == 2 && gato2 && gato2.vida > 0) {
            gato2.des_gato();
        }
        comida.des_gato()
        comida2.des_gato()
        comida3.des_gato()
        comida4.des_gato()
        comida5.des_gato()
        comida6.des_gato()
        comida7.des_gato()
        if (gato.vida <= 1 || gato2.vida <= 1) {
            comida8.des_gato()
        }
        // Troquei os limites da tela, então ajustei os valores para todos aparecerem
        t1.des_text('Pontos: ' + gato.pontos, 200, 40, 'white', '26px Arial')
        t2.des_text('J1 Vidas: ' + gato.vida, 40, 40, 'white', '26px Arial')
        if (jogadores == 2 && gato2) {
            t1.des_text('Pontos: ' + gato2.pontos, 200, 80, 'orange', '26px Arial')
            t2.des_text('J2 Vidas: ' + gato2.vida, 40, 80, 'orange', '26px Arial')
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
        if (jogadores == 1 && gato) {

            if (gato.vida <= 0) {
                t1.des_text('Você Perdeu', 500, 120, 'white', '30px Arial')
            } else if (gato.pontos >= 400) {
                t1.des_text('Você ganhou', 350, 190, 'white', '30px Arial')
            }
        
            t2.des_text('Pontuação Final: ' + gato.pontos, 500, 70, 'white', '30px Arial')
            gameOverAnim.des_gato()
        
        } else if (jogadores == 2 && gato2) {
        
            if (gato.vida <= 0 || gato2.pontos >= 400) {
                t3.des_text('Ganhador: Jogador 2', 350, 190, 'white', '30px Arial')
            } else if (gato2.vida <= 0 || gato.pontos >= 400) {
                t3.des_text('Ganhador: Jogador 1', 350, 190, 'white', '30px Arial')
            }
        
            t2.des_text('Jogador 1 - Pontuação Final: ' + gato.pontos, 350, 70, 'white', '30px Arial')
            t1.des_text('Jogador 2 - Pontuação Final: ' + gato2.pontos, 350, 110, 'white', '30px Arial')
            gameOverAnim.des_gato()
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
        if (gato.vida > 0) {
            gato.mov_gato();
            gato.anim('gato_00');
        }

        // P2
        if (jogadores == 2 && gato2 && gato2.vida > 0) {
            gato2.mov_gato();
            gato2.anim('gato2_0');
        }
        comida.mov_comida()
        comida2.mov_comida()
        comida3.mov_comida()
        comida4.mov_comida()
        comida5.mov_comida()
        comida6.mov_comida()
        comida7.mov_comida()
        if (gato.vida <= 1 || gato.vida <= 1) {
            comida8.mov_comida()
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