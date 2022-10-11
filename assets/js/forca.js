//Seletores
let tela = document.querySelector("canvas");
let btNovoJogoDesaparecido = document.getElementById("bt-novo-jogo").style.display = "none"
let btSairDesaparecer = document.getElementById("bt-sair").style.display = "none"
let divAgregarPalavra = document.getElementById("adicionar-palavra").style.display = 'none';
let btNovoJogo = document.getElementById("bt-novo-jogo");
let btSair = document.getElementById("bt-sair");
let btCancelar = document.getElementById("bt-cancelar");


var palavras = ['ALURA', 'FORCA', 'HTML', 'ORACLE', 'JAVASCRIPT', 'LOGICA', 'PROGRAMA', 'DESAFIO'];
var quadro = document.getElementById('forca').getContext('2d');
var palavraSecreta = "";
var letras = [];
var palavraCorreta = "";
var erros = 8;
let letrasIncorretas = [];
let numeroDeErros = 8
let letraEscolhida = [];

//eventos

// captura o id "iniciar-jogo" no momento do click e direciona ao método que inicia o jogo
document.getElementById("iniciar-jogo").onclick = () => {
  iniciarJogo();
}

// captura o id "bt-guardar", salva a palavra adicionada
document.getElementById("bt-salvar").onclick = () => {
  salvarPalavra();
 
}

// atualiza a tela quando o usuário clica em "novo jogo"
btNovoJogo.addEventListener("click", function () {
  location.reload();
});

// atualiza a tela quando o usuário clica em "sair"
btSair.addEventListener("click", function () {
  location.reload();
});

// atualiza a tela quando o usuário clica em "cancelar"
btCancelar.addEventListener("click", function () {
  location.reload();
});


// faz o sorteio da palavra
function escolherPalavraSecreta() {
  let palavra = palavras[Math.floor(Math.random() * palavras.length)]
  palavraSecreta = palavra
  return palavra
}



// verifica qual foi a letra clicada
function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false
    
  }
  else {
    letras.push(key)
    return true
  }
}

function adicionarLetraCorreta(i) {
  palavraCorreta += palavraSecreta[i].toUpperCase()
}

function adicionarLetraIncorreta(letter) {
  if (palavraSecreta.indexOf(letter) <= 0) {
    erros -= 1
  }
}


function verificarFimDeJogo(letra) {
  // checa se a letra já foi incluída no array de letras certas ou erradas
 if(letraEscolhida.length < palavraSecreta.length) { 
    //incluindo as letras já digitadas no array
    letrasIncorretas.push(letra);
    

    // valida se o usuário cometeu o número máximo de erros, para poder exibir a mensagem de fim de jogo
    if (letrasIncorretas.length > numeroDeErros) {
      exibirDerrota()
    }
    else if(letraEscolhida.length < palavraSecreta.length) {
      adicionarLetraIncorreta(letra)
      escreverLetraIncorreta(letra, erros)
    }
  }
 } 

// Verifica se o usuário ganhou
function verificarVencedor(letra) {
  letraEscolhida.push(letra.toUpperCase());
  if (letraEscolhida.length == palavraSecreta.length) {

    exibirVitoria()
    
  }

}


// impede que teclas como shift e outras sejam escritas
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}

// faz com que os botões da tela de home desapareçam e mostra a tela de adicionar palavra
function mostrarTelaAdicionarPalavra() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("adicionar-palavra").style.display = "block";

}

// salva a palavra que o usuário escreveu
function salvarPalavra() {
  
  //captura o que foi digitado
  let novaPalavra = document.getElementById('input-nova-palavra').value;

  // inclui a palavra digitada no array de palavras a serem sorteadas
  if(novaPalavra !== ""){
    palavras.push(novaPalavra.toUpperCase());
    alert('A palavra digitada foi salva')
    
  
    // faz a tela de adicionar palavra desaparecer
    document.getElementById("adicionar-palavra").style.display = "none";
    iniciarJogo();
  }
  else{
    alert("Nenhuma palavra foi digitada")
  }

}

// inicia o jogo
function iniciarJogo() {

  // faz com que os botões da tela home desapareçam
  document.getElementById("div-desaparece").style.display = 'none';

  // chama a função que desenha o canva
  desenharCanvas();

  // chama a função que sorteia a palavra 
  escolherPalavraSecreta();

  // chama a função que desenha as linhas
  desenharLinhas();

  // faz com que os botões de "novo jogo" e "sair" apareceçam
  document.getElementById("bt-novo-jogo").style.display = "block"
  document.getElementById("bt-sair").style.display = "block"

  // captura a letra digitada
  document.onkeydown = (e) => {
    // coloca a letra digitada em maiúscula
    let letra = e.key.toUpperCase()
    // verifica si o usuário não perdeu
    if (letrasIncorretas.length <= numeroDeErros) {
      if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
        if (palavraSecreta.includes(letra)) {
          adicionarLetraCorreta(palavraSecreta.indexOf(letra))
          for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letra) {
              escreverLetraCorreta(i)
              verificarVencedor(letra)

            }
          }

        }
        // se o usuário cometeu mais erros do que o permitido, chama as funções
        // que desenham a forca e exibe a mensagem de fim de jogo
        else {
          if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
          desenharForca(erros)
          verificarFimDeJogo(letra)
        }
      }
    }
    else {
      alert('Você atingiu o limite de letras incorretas')
    }

  };
}