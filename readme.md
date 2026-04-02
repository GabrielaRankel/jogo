🐱 STRAY CATS
 1. Identificação do Projeto <br>
 Título do Projeto: Stray Cats.<br>
 Desenvolvedora: Gabriela Mezzadri Rankel.<br>
 Product Owner: Carlos Roberto.<br>
 
 2. Visão Geral do Sistema <br>
 Descrição: Este software é um jogo de corrida 2D desenvolvido para navegadores modernos.<br>
 Objetivo: O objetivo é controlar um gatinho, coletando alimentos para somar pontos e sobrevivendo a obstáculos para vencer as fases.<br>
 Tema: Corrida urbana com temática felina, onde o jogador deve desviar de itens não comestíveis e capturar alimentos que caem do céu<br>

3. Guia de Jogabilidade e Comandos<br>
Para controlar o seu gatinho no jogo, você utilizará o teclado do computador:<br>
Jogador 1 (1P): Utilize as Setas do Teclado (Esquerda e Direita) para movimentar o personagem e capturar os itens.Jogador 2 (2P): <br>Utilize as teclas A (Esquerda) e D (Direita) para competir ou colaborar na mesma tela<br>

4. Sistema de Itens e Coletáveis:<br>
Durante a partida, diversos objetos cairão do céu. Os Alimentos são essenciais e garantem +5 pontos cada. Fique atento aos Sapatos <br>(Obstáculos): colidir com eles faz você perder 1 vida e reduz sua pontuação em 2 pontos. Caso você deixe um alimento passar e atingir o chão, o sistema aplicará uma penalidade de -7 pontos. Para ajudar na sobrevivência, a Maçã (Item de Vida) surge quando sua saúde está baixa para recuperar vidas extras

5. Especificações Técnicas<br>
Sistema de Vidas: O jogador inicia com um número definido de vidas e o jogo encerra caso cheguem a zero.Pontuação: O placar é atualizado em tempo real, permitindo acompanhar o desempenho durante as fases.<br>
Dificuldade Progressiva: O jogo possui 3 fases distintas. A transição ocorre automaticamente conforme a pontuação aumenta, resultando em cenários novos e aumento obrigatório na velocidade dos itens.<br>
Condição de Vitória: Para vencer, o jogador deve completar a terceira fase com pelo menos 1 vida restante e atingir a meta de 400 pontos.<br>


6. Instruções de Instalação e Execução<br>
Clonagem: Utilize o comando git clone [https://github.com/GabrielaRankel/jogo.git] para baixar os arquivos.<br>
Entrar na pasta: Utilize o comando "cd stray-cats/jogo"<br>
Dependências: Execute npm install caso deseje gerenciar pacotes adicionais.<br>
Execução: Abra o arquivo index.html diretamente no navegador ou utilize um servidor local (como Live Server) para garantir a portabilidade do HTML5/Canvas<br>


7. Link de Produção<br>
Acesse o sistema em produção através do Vercel:
[https://gatofaminto.vercel.app/]<br>

📂 Documentação e Modelagem<br>
Conforme solicitado, os diagramas de Casos de Uso, Classes (herança da classe Obj) e Sequência (evento de colisão) estão disponíveis na pasta de diagramas do projeto<br>

8. Estruturas de Arquivos<br>

jogo/<br>
├──📂 diagramas/<br>
│ └── diagramas_UML.asta<br>
├──📂 img/<br>
├──📂 models/<br>
│ └── Carro.js<br>
├── game.html<br>
├── game.js<br>
├── index.html<br>
├── index.js<br>
├── personalizar.css<br>
├── personalizar.html<br>
├── personalizar.js<br>
├── readme.md<br>
├── sobre.css<br>
├── sobre.html<br>
├── style_game.css<br>
└── style_index.css<br>