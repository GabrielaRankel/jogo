let des = document.getElementById('des').getContext('2d')

let carroInimigo = new CarroInimigo(1300, 1125, 60, 60, './img/comida1.png')
let carroInimigo2 = new CarroInimigo(1500, 725, 60, 60, './img/sapato.png')
let carroInimigo3 = new CarroInimigo(1700, 400, 60, 60, './img/comida3.png')
let carroInimigo4 = new CarroInimigo(1000, 1025, 60, 60, './img/comida4.png')
let carroInimigo5 = new CarroInimigo(1390, 225, 60, 60, './img/comida5.png')
let carroInimigo6 = new CarroInimigo(1600, 585, 60, 60, './img/comida6.png')
let carroInimigo7 = new CarroInimigo(1400, 995, 60, 60, './img/comida7.png')
// troquei a posição do y, pro carro do usuario ficar na parte inferior da tela
let carro = new Carro(100, 625, 80, 80, '../img/gato_001_bg.png')
// let medidaCarro = new Carro(100, 325, 85, 50, 'green')

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

let motor = new Audio('./img/motor.wav')
let batida = new Audio('./img/batida.mp3')
motor.volume = 0.5
motor.loop = true
batida.volume = 0.5

let jogar = true
let fase = 1
//Troquei W/S por A/D e mudei os Arrow
document.addEventListener('keydown', (e) => {
    motor.play()
    if (e.key === 'a' || e.key === 'ArrowLeft') {
        carro.dir -= 10
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        carro.dir += 10
    }
})
//Troquei W/S por A/D e mudei os Arrow
document.addEventListener('keyup', (e) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
        carro.dir = 0
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        carro.dir = 0
    }
})

function game_over() {
    if (carro.vida <= 0) {
        jogar = false
        motor.pause()
        // música com o jogo parado
    }
}

function ver_fase() { 
    if (carro.pontos > 150 && fase === 1) {
        fase = 2
        carroInimigo.vel = 4
        carroInimigo2.vel = 2
        carroInimigo3.vel = 4
        carroInimigo4.vel = 1
        carroInimigo5.vel = 2
        carroInimigo6.vel = 4
        carroInimigo7.vel = 4
    } else if (carro.pontos > 300 && fase === 2) {
        fase = 2
        carroInimigo.vel = 5
        carroInimigo2.vel = 1
        carroInimigo3.vel = 5
        carroInimigo4.vel = 2
        carroInimigo5.vel = 1
        carroInimigo6.vel = 5
        carroInimigo7.vel = 1
    }
     else if (carro.pontos > 500 && fase === 3) {
        fase = 3
        carroInimigo.vel = 5
        carroInimigo2.vel = 7
        carroInimigo3.vel = 2
        carroInimigo4.vel = 2
        carroInimigo5.vel = 1
        carroInimigo6.vel = 7
        carroInimigo7.vel = 1
    }
}
//Troquei VIDA por PONTOS, agora cada vez que colidir ele ganha pontos e não perde vidas
//Adicionei mais carros inimigos
// quando o usuario colidir com o carroInimigo 2 (o sapato) ele perde uma vida
function colisao() {
    if (carro.colid(carroInimigo)) {
        batida.play()
        carroInimigo.recomeca()
        carro.pontos += 5
    }
    if (carro.colid(carroInimigo2)) {
        batida.play()
        carroInimigo2.recomeca()
        carro.pontos += 5
        carro.vida += -1
    }
    if (carro.colid(carroInimigo3)) {
        batida.play()
        carroInimigo3.recomeca()
        carro.pontos += 5
    }
    if (carro.colid(carroInimigo4)) {
        batida.play()
        carroInimigo4.recomeca()
        carro.pontos += 5
    }
    if (carro.colid(carroInimigo5)) {
        batida.play()
        carroInimigo5.recomeca()
        carro.pontos += 5
    }
    if (carro.colid(carroInimigo6)) {
        batida.play()
        carroInimigo6.recomeca()
        carro.pontos += 5
    }
    if (carro.colid(carroInimigo7)) {
        batida.play()
        carroInimigo7.recomeca()
        carro.pontos += 5
    }
    console.log('vida: ', carro.vida)
}
//RETIREI ESSE SISTEMA DE PONTUAÇÃO
// function pontuacao() {
//     if (carro.point(carroInimigo)) {
//         carro.pontos += 5
//         carroInimigo.recomeca()
//     }
//     if (carro.point(carroInimigo2)) {
//         carro.pontos += 5
//         carroInimigo2.recomeca()
//     }
//     if (carro.point(carroInimigo3)) {
//         carro.pontos += 5
//         carroInimigo3.recomeca()
//     }
// }

// adicionei


function desenha() {

    if (jogar) {
        
        carroInimigo.des_carro()
        carroInimigo2.des_carro()
        carroInimigo3.des_carro()
        carroInimigo4.des_carro()
        carroInimigo5.des_carro()
        carroInimigo6.des_carro()
        carroInimigo7.des_carro()
        carro.des_carro()
        // Troquei os limites da tela, então ajustei os valores para todos aparecerem
        t1.des_text('Pontos: ' + carro.pontos, 200, 40, 'yellow', '26px Arial')
        t2.des_text('Vidas: ' + carro.vida, 40, 40, 'red', '26px Arial')
        fase_txt.des_text('Fase: ' + fase, 550, 40, 'white', '26px Arial')
    }else{
        t1.des_text('GAME OVER', 350, 350, 'yellow', '60px Arial')
        t2.des_text('Pontuação Final: ' + carro.pontos, 480, 400, 'white', '25px Arial')
    }

}

function atualiza() {
    if (jogar) {
        carro.mov_car()
        //troquei os nomes
        carro.anim('gato_00')
        carroInimigo.mov_car()
        carroInimigo2.mov_car()
        carroInimigo3.mov_car()
        carroInimigo4.mov_car()
        carroInimigo5.mov_car()
        carroInimigo6.mov_car()
        carroInimigo7.mov_car()
        colisao()
        // pontuacao()
        ver_fase()
        game_over()
    }
}

function main() {
    des.clearRect(0, 0, 800, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()