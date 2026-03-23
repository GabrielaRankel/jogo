let selectedPlayers = 1;

const btn1p          = document.getElementById('btn-1p');
const btn2p          = document.getElementById('btn-2p');
const btnSobre       = document.getElementById('btn-sobre');
const btnPersonalizar = document.getElementById('btn-personalizar');
const btnComecar     = document.getElementById('btn-comecar');

function selecionarJogadores(n) {
  selectedPlayers = n;
  btn1p.classList.toggle('active', n === 1);
  btn2p.classList.toggle('active', n === 2);
}

// aqui eu adicionei uma troca de fundo, só pra ficar bonito 
btn1p.addEventListener('click', () => {
  selecionarJogadores(1);
  document.querySelector('.conteudo_principal').style.backgroundImage = "url('./img/fundo_home.png')";
});

btn2p.addEventListener('click', () => {
  selecionarJogadores(2);
  document.querySelector('.conteudo_principal').style.backgroundImage = "url('./img/fundo_home_2p.png')";
});


btnSobre.addEventListener('click', () => {
  alert('STREET CATCHER\n\nPegue os itens que caem do céu e fuja dos perigos!\nUse as setas ← → para mover o personagem.');
});

btnPersonalizar.addEventListener('click', () => {
  window.location.href = './personalizar.html';
});

btnComecar.addEventListener('click', () => {
  localStorage.setItem('players', selectedPlayers); // salva
  alert('Iniciando jogo com ' + selectedPlayers + ' jogador(es)...');
  window.location.href = './game.html';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btnComecar.click();
});