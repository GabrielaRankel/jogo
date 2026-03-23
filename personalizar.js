let audioPreview = new Audio()

// tocar música ao mudar 
document.getElementById('musica').addEventListener('change', (e) => {
    let musica = e.target.value

    audioPreview.pause() // para a anterior
    audioPreview = new Audio(musica)
    audioPreview.volume = 0.5
    audioPreview.play()
})

// adicionei o salvar
document.getElementById('salvar').addEventListener('click', () => {
    let musica = document.getElementById('musica').value
    //armazena a musica escolhida pelo user do jogo
    localStorage.setItem('musica', musica)
// adicionei um alerta pra ficar bonitinho =)
    alert('Música salva.')
})