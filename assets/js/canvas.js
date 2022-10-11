function desenharCanvas() {
  quadro.lineWidth=8
  quadro.lineCap="round"
  quadro.lineJoin="round"
  quadro.fillStyle= "#F3F5FC"
  quadro.strokeStyle = "#0A3871"
  quadro.fillRect(0,0,1200,800)
  quadro.beginPath();
  quadro.moveTo(650,500)
  quadro.lineTo(900,500)
  quadro.stroke()
  quadro.closePath()
}

function desenharLinhas() {
  quadro.lineWidth=6
  quadro.lineCap="round"
  quadro.lineJoin="round"
  quadro.strokeStyle = "#0A3871"
  quadro.beginPath()
  let largura=600/palavraSecreta.length
  for (let i=0;i<palavraSecreta.length;i++){
    quadro.moveTo(500+(largura*i),640)
    quadro.lineTo(550+(largura*i),640)
  }
  quadro.stroke()
  quadro.closePath()
}
function escreverLetraCorreta(index) {
  quadro.font = 'bold 52px Inter';
  quadro.lineWidth=6
  quadro.lineCap="round"
  quadro.lineJoin="round"
  quadro.fillStyle= "#0A3871"
  let largura=600/palavraSecreta.length
  quadro.fillText(palavraSecreta[index],505+(largura*index),620)
  quadro.stroke()
}

function escreverLetraIncorreta(letra, errorsLeft) {
  quadro.lineWidth=6
  quadro.font = 'bold 40px Inter';
  quadro.lineCap="round"
  quadro.lineJoin="round"
  quadro.fillStyle="#0A3871"
  quadro.fillText(letra,535+(40*(10-errorsLeft)),710,40)
}

function desenharForca(pontos) {
  quadro.lineWidth=8
  quadro.lineCap="round"
  quadro.lineJoin="round"
  quadro.strokeStyle = "#0A3871"
  if(pontos===8){
  // poste lateral
  quadro.moveTo(700,500)
  quadro.lineTo(700,100)
  }
  if(pontos===7){ // teto 
  quadro.moveTo(850,100)
  quadro.lineTo(700,100)
  }
  if(pontos===6){ // corda
  quadro.moveTo(850,100)
  quadro.lineTo(850,171)
  }
  if(pontos===5){ // para rosto
  quadro.moveTo(900,230)
  quadro.arc(850,230,50,0,Math.PI*2)
  }
  if(pontos===4){ // para corpo
  quadro.moveTo(850,389)
  quadro.lineTo(850,289)
  }
  if(pontos===3){ // para perna esquerda
  quadro.moveTo(850,389)
  quadro.lineTo(800,450)
  }
  if(pontos===2){ // para perna direita
  quadro.moveTo(850,389)
  quadro.lineTo(890,450)
  }
  if(pontos===1){ // para mão esquerda
  quadro.moveTo(850,330)
  quadro.lineTo(800,389)
  }
  if(pontos===0){ // para mão direita
  quadro.moveTo(850,330)
  quadro.lineTo(890,389)
  }
  quadro.stroke()
  quadro.closePath()
}

function exibirDerrota() {
  quadro.font = ' bold 42px Inter';
  quadro.lineWidth=6
  quadro.lineCap="round"
  quadro.lineJoin="round"
  quadro.fillStyle="red"
  quadro.fillText("Fim de jogo!",930,320)
}

function exibirVitoria() {
  quadro.font = 'bold 42px Inter';
  quadro.lineWidth=6
  quadro.lineCap="round"
  quadro.lineJoin="round"
  quadro.fillStyle="green"
  quadro.fillText("Ganhou,",950,320)
  quadro.fillText("Parabéns!",930,360)
  setTimeout( recarregar , 1000)
}   

function recarregar(){
  location.reload(); 
}