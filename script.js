
let nome = "";
let QuantosPeriodos = 1;
let Videos = [] 
let videoAtual = -1
let QuantosVideos = 0
let tempo = 1000
let metodoDeEstudo = ""


function Submit(){ 
  event.preventDefault();
  nome = document.getElementById("nome").value;
  QuantosPeriodos = document.getElementById("periodos").value;

  for(i=1;i<QuantosVideos+1;i++){
    var link = document.getElementById("Link"+i).value
    Videos.push(link)
  }


maximizarTela()

a = document.createElement("a")
a.href = "#titulo"
a.click()

Estudo()
}


function CriarDiv(){ 

  QuantosVideos+=1;

  var videoContainer = document.getElementById("videoContainer");

  var aVideoDiv = document.createElement("div");
  aVideoDiv.className = "aVideo";

  var titulo = document.createElement("h2");
  titulo.innerHTML = "Vídeo "+QuantosVideos;

  var input = document.createElement("input");
  input.id = "Link"+QuantosVideos;
  input.type = "url";

  aVideoDiv.appendChild(titulo);
  aVideoDiv.appendChild(input);

  videoContainer.appendChild(aVideoDiv);
}

function limpar(){
  for(i=1;i<QuantosVideos+1;i++){
    var link = document.getElementById("Link"+i)
    link.remove()
  }
  document.getElementById("videoContainer").innerHTML = ""
  QuantosVideos = 0
  Videos = []
}

function maximizarTela() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) { 
    document.documentElement.webkitRequestFullscreen();
  }

}

function minimizarTela() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { 
    document.webkitExitFullscreen();
  }
}


function Estudo(){

  document.querySelector(".start").style.display = "none";
  document.querySelector(".imersive").style.display = "block"

  //document.querySelector("html").style.overflow = "hidden"

  if(QuantosVideos > 0){
    metodoDeEstudo = "comVideo"
    document.querySelector("#cronometer").style.display = "none";
    document.querySelector("#videos").style.display = "block";
    ComVideos();
    
  }else{
    metodoDeEstudo = "soCronometro"
    document.querySelector("#cronometer").style.display = "block";
    document.querySelector("#videos").style.display = "none";
    Cronometro();
  }

}

let segundos = 0;
let minutos = 0;
let horas = 0;

let segundosPassados = 0;
let minutosPassados = 0;
let horasPassadas = 0;
let MinutosParaEstudar = 0;
let canCount = true
let intervalo;

let frase = "Estude!";

function Cronometro(){

segundos = 0;
minutos = 0;
horas =0;
segundosPassados = 0;
minutosPassados = 0;
horasPassadas = 0;
frase = "Estude!";
  
MinutosParaEstudar = (QuantosPeriodos * 45) + (QuantosPeriodos-1)*15;

intervalo = setInterval(atualizartempo, tempo);

}

function atualizartempo(){
if(segundos == 59){
  segundos = 0

  if(minutos == 59){
    minutos = 0
    horas +=1 
    horasPassadas +=1
  }else{
    minutos += 1
    minutosPassados +=1 
  }

}else{
  segundos += 1
  segundosPassados +=1 
}

if(metodoDeEstudo == "comVideo"){

document.getElementById("timer2").innerHTML = formatarTempo();
document.getElementById("motivational2").innerHTML = Mudarfrase()

}else if(metodoDeEstudo == "soCronometro"){

  document.getElementById("timer1").innerHTML = formatarTempo();
  document.getElementById("motivational1").innerHTML = Mudarfrase()

}



if(minutosPassados >= MinutosParaEstudar){
  canCount = false
}

if(canCount == false){
  clearInterval(intervalo);
  minutosPassados = MinutosParaEstudar

  if(metodoDeEstudo == "comVideo"){
    document.getElementById("motivational2").innerHTML = "Acabamos!"
  }else{
    document.getElementById("motivational1").innerHTML = "Acabamos!"
  }
}

}

function formatarTempo(){
  var horaFormatada = horas.toString().padStart(2, '0');
  var minutoFormatado = minutos.toString().padStart(2, '0');
  var segundoFormatado = segundos.toString().padStart(2, '0');
  return horaFormatada+":"+minutoFormatado+":"+segundoFormatado;
}

function Mudarfrase(){
var texto = "Estude!"

if(minutosPassados <= (MinutosParaEstudar/100)*10){
  texto = "Estude!"
}else{
  if(minutosPassados <= (MinutosParaEstudar/100)*20){
    texto = "Sem distrações!"
  }else{
    if(minutosPassados <= (MinutosParaEstudar/100)*30){
      texto = "Vamos completar esse estudo!"
    }else{
      if(minutosPassados <= (MinutosParaEstudar/100)*40){
        texto = "Sabia que...você está estudando agora?"
      }else{
        if(minutosPassados <= (MinutosParaEstudar/100)*50){
          texto = "Já foi metade. Mais uma não faz diferença, certo?"
        }else{
          if(minutosPassados <= (MinutosParaEstudar/100)*60){
            texto = "Aaaaaa!"
          }else{
            if(minutosPassados <= (MinutosParaEstudar/100)*70){
              texto = "Força!"
            }else{
              if(minutosPassados <= (MinutosParaEstudar/100)*80){
                texto = "Já se passou 80% do nosso tempo!"
              }else{
                if(minutosPassados <= (MinutosParaEstudar/100)*90){
                  texto = "Revise o que estudou para melhor fixar o conteúdo!"
                }else{
                  if(minutosPassados <= MinutosParaEstudar){
                    texto = "Só mais um pouco!"
                  }}}}}}}}}}

if(minutosPassados >45 && minutosPassados <60){
texto = "1a pausa!"
}
if(minutosPassados >105 && minutosPassados <120){
  texto = "2a pausa!"
}
if(minutosPassados >165 && minutosPassados <180){
  texto = "3a pausa!"
}
if(minutosPassados >225 && minutosPassados <240){
  texto = "4a pausa!"
}

return texto
}


function mudarVideo(direcao){
  videoAtual += direcao
  playVideo(Videos[videoAtual])
}


function ComVideos(){
  Cronometro();
  playVideo(Videos[0])
}


function playVideo(videoLink) {
  var videoContainer = document.getElementById("videoPlayer");
  var videoURL = videoLink
  var videoID = getVideoID(videoURL);

  if (videoID) {
    var embedURL = `https://www.youtube.com/embed/${videoID}`;
    videoContainer.innerHTML = `<iframe style="width: 100%; height: 100%; padding-bottom: ${(1 / 1.77) * 100}%" src="${embedURL}" frameborder="0" allowfullscreen></iframe>`;

  } else {
    alert('Nem todos os links do YouTube são válidos!');
  }
}

function getVideoID(url) {
  const regex = /(?:\?v=|\/embed\/|\.be\/|\/watch\?v=|\/(?=p\/))([\w\/\-]+)/;
  const match = url.match(regex);
  return match && match[1];
}
