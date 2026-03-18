class Obj {
    constructor(x, y, w, h, a) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
    // x → posição horizontal (esquerda → direita)
    // y → posição vertical (cima → baixo)
    // w → largura (width) da img
    // h → altura (height) da img

    des_carro() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

    des_quad() {
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h, this.a)
    }

}

class Carro extends Obj {

    dir = 0
    vida = 1
    pontos = 0
    frame = 1
    tempo = 0
    //Troquei y por x e mudei os limites da tela
    mov_car() {
        this.x += this.dir
        if (this.x < 0) {
            this.x = 0
        } else if (this.x > 720) {
            this.x = 720
        }
    }

    colid(objeto) {
        if ((this.x < objeto.x + objeto.w) &&
            (this.x + this.w > objeto.x) &&
            (this.y < objeto.y + objeto.h) &&
            (this.y + this.h > objeto.y)) {
            return true
        } else {
            return false
        }
    }

    point(objeto) {
        if (objeto.x <= -100) {
            return true
        } else {
            return false
        }
    }
    //troquei os nomes 
    anim(nome) {
        this.tempo += 1
        if (this.tempo > 12) {
            this.tempo = 0
            this.frame += 1
        }
        if (this.frame > 4) {
            this.frame = 1
        }
        //gato_001_bg
        this.a = "./img/" + nome + this.frame + ".png"
    }
    anim_game_over(nome) {
        if (carro.vida == 0) {
            this.tempo += 1
            if (this.tempo > 12) {
                this.tempo = 0
                this.frame += 1
            }
            if (this.frame > 4) {
                this.frame = 1
            }
            //gato_001_bg
            this.a = "./img/" + nome + this.frame + ".png"
        }
    }
}

class CarroInimigo extends Obj {

    vel = 2
    //Troquei x por y e mudei os limites do gerarAleatorio para combinar com a nova tela
    recomeca() {
        this.y = -100
        this.x = Math.floor(Math.random() * (720 - 80) + 40)

    }
    //Troquei x por y e - pra + e mudei os limites da tela
    //Adicionei o sistema de vida aqui. Agora quando o carroInimigo(comida) chegar ao chão o usuaio perde pontos
    mov_car() {
        this.y += this.vel
        if (this.y >= 700) {
            this.recomeca()
            carro.pontos += -5
            // carro.vida += -1      
        }
    }
}


class Text {
    des_text(text, x, y, cor, font) {
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text, x, y)
    }
}
