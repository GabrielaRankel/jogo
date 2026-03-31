🐱 STRAY CATS
 1. Identificação do Projeto 
 Título do Projeto: Stray Cats.
 Desenvolvedora: Gabriela Mezzadri Rankel.
 Product Owner: Carlos Roberto.
 
 2. Visão Geral do Sistema 
 Descrição: Este software é um jogo de corrida 2D desenvolvido para navegadores modernos.
 Objetivo: O objetivo é controlar um gatinho, coletando alimentos para somar pontos e sobrevivendo a obstáculos para vencer as fases.
 Tema: Corrida urbana com temática felina, onde o jogador deve desviar de itens não comestíveis e capturar alimentos que caem do céu

3. Guia de Jogabilidade e Comandos
Para controlar o seu gatinho no jogo, você utilizará o teclado do computador:
Jogador 1 (1P): Utilize as Setas do Teclado (Esquerda e Direita) para movimentar o personagem e capturar os itens.Jogador 2 (2P): Utilize as teclas A (Esquerda) e D (Direita) para competir ou colaborar na mesma tela

4. Sistema de Itens e Coletáveis:
Durante a partida, diversos objetos cairão do céu. Os Alimentos são essenciais e garantem +5 pontos cada. Fique atento aos Sapatos (Obstáculos): colidir com eles faz você perder 1 vida e reduz sua pontuação em 2 pontos. Caso você deixe um alimento passar e atingir o chão, o sistema aplicará uma penalidade de -7 pontos. Para ajudar na sobrevivência, a Maçã (Item de Vida) surge quando sua saúde está baixa para recuperar vidas extras

5. Especificações Técnicas
Sistema de Vidas: O jogador inicia com um número definido de vidas e o jogo encerra caso cheguem a zero.Pontuação: O placar é atualizado em tempo real, permitindo acompanhar o desempenho durante as fases.
Dificuldade Progressiva: O jogo possui 3 fases distintas. A transição ocorre automaticamente conforme a pontuação aumenta, resultando em cenários novos e aumento obrigatório na velocidade dos itens.
Condição de Vitória: Para vencer, o jogador deve completar a terceira fase com pelo menos 1 vida restante e atingir a meta de 400 pontos.


6. Instruções de Instalação e Execução
Clonagem: Utilize o comando git clone [https://github.com/GabrielaRankel/jogo.git] para baixar os arquivos.
Entrar na pasta: Utilize o comando "cd stray-cats/jogo"
Dependências: Execute npm install caso deseje gerenciar pacotes adicionais.
Execução: Abra o arquivo index.html diretamente no navegador ou utilize um servidor local (como Live Server) para garantir a portabilidade do HTML5/Canvas


7. Link de Produção
Acesse o sistema em produção através do Vercel:
[https://gatofaminto.vercel.app/]

📂 Documentação e Modelagem
Conforme solicitado, os diagramas de Casos de Uso, Classes (herança da classe Obj) e Sequência (evento de colisão) estão disponíveis na pasta de diagramas do projeto

8. Estruturas de Arquivos
📁 jogo/
├── 📄 index.html        # Menu Principal
├── 📄 game.html         # Tela do Jogo (Canvas)
├── 📄 game.js           # Lógica principal e loop do jogo
├── 📁 models/           # Classes de objetos (Gato, Comida)
├── 📁 img/              # Sprites, Fundos e Sons
└── 📄 personalizar.js   # Lógica de troca de trilha sonora