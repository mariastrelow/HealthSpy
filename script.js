let jogadores=[];
let temaSelecionado;
let impostorIndex;
let papelRevelado = false;
let impostorFoiDescoberto = false;

let perguntasBase=[
"Isso deve ser feito todo dia?",
"Ajuda na energia?",
"É rápido ou demorado?",
"Você faz com frequência?",
"Melhora a saúde?"
];

let temas=[
"Dormir bem","Beber água","Comer frutas","Fazer exercício",
"Alongamento","Café da manhã","Organizar rotina"
];

let paresPergunta=[];
let indiceInteracao=0;
let votos=[];
let votanteAtual=0;
let jogadorAtualRevelar=0;

/* TELAS */
const telaInicial=document.getElementById("telaInicial");
const telaJogadores=document.getElementById("telaJogadores");
const telaRevelar=document.getElementById("telaRevelar");
const telaPergunta=document.getElementById("telaPergunta");
const telaVotacao=document.getElementById("telaVotacao");
const telaImpostor=document.getElementById("telaImpostor");
const telaResultado=document.getElementById("telaResultado");

/* INÍCIO */
function mostrarJogadores(){
    telaInicial.classList.add("hidden");
    telaJogadores.classList.remove("hidden");
}
// Seletores
const listaJogadores = document.querySelector(".lista-jogadores");
const btnAdicionar = document.querySelector(".btn-adicionar");

let totalJogadores = document.querySelectorAll(".input-jogador").length;

// 🔹 Função para atualizar eventos da lixeira
function atualizarEventosRemover() {
    const botoesRemover = document.querySelectorAll(".input-jogador i");

    botoesRemover.forEach(botao => {
        botao.onclick = function () {

            if (totalJogadores <= 4) {
                alert("O mínimo é 4 jogadores.");
                return;
            }

            this.parentElement.remove();
            totalJogadores--;
        };
    });
}

btnAdicionar.addEventListener("click", function () {

    if (totalJogadores >= 8) {
        alert("O máximo é 8 jogadores.");
        return;
    }

    const novoJogador = document.createElement("div");
    novoJogador.classList.add("input-jogador");

    novoJogador.innerHTML = `
        <input type="text" placeholder="Nome">
        <i class="bi bi-trash"></i>
    `;

    listaJogadores.appendChild(novoJogador);

    totalJogadores++;

    atualizarEventosRemover();
});

// Ativa os eventos nas lixeiras iniciais
atualizarEventosRemover();

function iniciarJogo(){
    jogadores=[];
    document.querySelectorAll(".lista-jogadores input").forEach(i=>{
        if(i.value.trim()!="") jogadores.push(i.value.trim());
    });

    if(jogadores.length<4) return alert("Mínimo 4 jogadores");

   temaSelecionado = temas[Math.floor(Math.random() * temas.length)];
    impostorIndex=Math.floor(Math.random()*jogadores.length);

    gerarInteracoes();

    telaJogadores.classList.add("hidden");
    telaRevelar.classList.remove("hidden");

    jogadorAtualRevelar=0;
    mostrarPapel();
}

function mostrarPapel(){

    papelRevelado = false;

    document.getElementById("tituloRevelar").innerText =
        "Passe o celular para " + jogadores[jogadorAtualRevelar];

    document.getElementById("infoRevelar").innerText =
        "Clique abaixo para revelar seu papel.";

    let botao = document.querySelector("#telaRevelar button");
    botao.innerText = "Revelar papel";
    botao.onclick = revelarPapel;
}

function revelarPapel(){

    papelRevelado = true;

    document.getElementById("tituloRevelar").innerText =
        jogadores[jogadorAtualRevelar];

    if(jogadorAtualRevelar === impostorIndex){
        document.getElementById("infoRevelar").innerText =
            "😈 Você é o IMPOSTOR!\nTente descobrir o tema.";
    }else{
        document.getElementById("infoRevelar").innerText =
            "🩺 Tema: " + temaSelecionado;
    }

    let botao = document.querySelector("#telaRevelar button");
    botao.innerText = "Ocultar e passar";
    botao.onclick = proximoJogador;
}

function proximoJogador(){

    if(!papelRevelado) return;

    jogadorAtualRevelar++;

    if(jogadorAtualRevelar < jogadores.length){
        mostrarPapel();
    }else{
        telaRevelar.classList.add("hidden");
        telaPergunta.classList.remove("hidden");
        mostrarInteracao();
    }
}

function gerarInteracoes(){

    paresPergunta = [];
    indiceInteracao = 0;

    // embaralhar jogadores
    let indices = jogadores.map((_, i) => i);
    indices.sort(() => Math.random() - 0.5);

    // embaralhar perguntas
    let perguntasDisponiveis = [...perguntasBase];
    perguntasDisponiveis.sort(() => Math.random() - 0.5);

    for(let i = 0; i < indices.length; i++){

        let perguntaDe = indices[i];
        let responde = indices[(i + 1) % indices.length];

        paresPergunta.push({
            perguntaDe,
            responde,
            pergunta: perguntasDisponiveis[i % perguntasDisponiveis.length]
        });
    }
}

function mostrarInteracao(){

    if(indiceInteracao >= paresPergunta.length){
        irParaVotacao();
        return;
    }

    let par = paresPergunta[indiceInteracao];

    document.getElementById("infoPergunta").innerText =
        jogadores[par.perguntaDe] + " pergunta para " + jogadores[par.responde];

    document.getElementById("textoPergunta").innerText = par.pergunta;
}

function proximaInteracao(){
    indiceInteracao++;
    mostrarInteracao();
}

/* VOTAÇÃO */
function irParaVotacao(){
    telaPergunta.classList.add("hidden");
    telaVotacao.classList.remove("hidden");
    votos=[];
    votanteAtual=0;
    prepararVotacao();
}

function prepararVotacao(){

    document.getElementById("tituloVotacao").innerText =
        jogadores[votanteAtual] + ", vote no impostor:";

    let opcoes = document.getElementById("opcoesVoto");
    opcoes.innerHTML = "";

    let votoSelecionado = null;

    jogadores.forEach((j, index) => {

        let btn = document.createElement("button");
        btn.innerText = j;

        btn.onclick = () => {

            // remover destaque anterior
            document.querySelectorAll("#opcoesVoto button")
                .forEach(b => b.classList.remove("selecionado"));

            // destacar atual
            btn.classList.add("selecionado");

            votoSelecionado = index;
            votos[votanteAtual] = index;
        };

        opcoes.appendChild(btn);
    });
}
function registrarVoto(){

    if(votos[votanteAtual] == null) return alert("Vote primeiro");

    votanteAtual++;

    if(votanteAtual < jogadores.length){
        prepararVotacao();
    }else{
        finalizarVotacao();
    }
}

function finalizarVotacao(){

    telaVotacao.classList.add("hidden");
    telaResultado.classList.remove("hidden");

    let contagem = {};

    votos.forEach(v => {
        contagem[v] = (contagem[v] || 0) + 1;
    });

    let maisVotado = Object.keys(contagem).reduce((a, b) =>
        contagem[a] > contagem[b] ? a : b
    );

    maisVotado = parseInt(maisVotado);

    impostorFoiDescoberto = (maisVotado === impostorIndex);

    let texto = "O impostor era: " + jogadores[impostorIndex] + "\n\n";
    texto += "Mais votado: " + jogadores[maisVotado] + "\n\n";

    if(impostorFoiDescoberto){
        texto += "🎯 O impostor foi descoberto nos votos!";
    }else{
        texto += "😈 O impostor NÃO foi descoberto nos votos!";
    }

    document.getElementById("resultadoTexto").innerText = texto;

    // Mostrar botão continuar
    let botao = document.getElementById("botaoContinuar");
    botao.classList.remove("hidden");
    botao.onclick = irParaEscolhaTema;
}

function irParaEscolhaTema(){
    telaResultado.classList.add("hidden");
    telaImpostor.classList.remove("hidden");

    document.getElementById("botaoContinuar").classList.add("hidden");

    mostrarOpcoesImpostor();
}

/* IMPOSTOR */
function mostrarOpcoesImpostor(){
    let opcoes=document.getElementById("opcoesTema");
    opcoes.innerHTML="";

    let alternativas=[temaSelecionado];

    while(alternativas.length<4){
        let aleatorio=temas[Math.floor(Math.random()*temas.length)];
        if(!alternativas.includes(aleatorio)){
            alternativas.push(aleatorio);
        }
    }

    alternativas.sort(()=>Math.random()-0.5);

    alternativas.forEach(op=>{
        let btn=document.createElement("button");
        btn.innerText=op;
        btn.onclick=()=> verificarResultado(op);
        opcoes.appendChild(btn);
    });
}

function verificarResultado(escolhaImpostor){

    telaImpostor.classList.add("hidden");
    telaResultado.classList.remove("hidden");

    let textoFinal = "O impostor era: " + jogadores[impostorIndex] + "\n\n";

    // Resultado da votação
    if(impostorFoiDescoberto){
        textoFinal += "📌 Foi descoberto nos votos.\n";
    }else{
        textoFinal += "📌 Não foi descoberto nos votos.\n";
    }

    // Resultado da tentativa de adivinhação
    textoFinal += "\nO impostor escolheu: " + escolhaImpostor + "\n";
    textoFinal += "Tema correto: " + temaSelecionado + "\n\n";

    if(escolhaImpostor === temaSelecionado){
        textoFinal += "🏆 O impostor ACERTOU o tema!";
    }else{
        textoFinal += "❌ O impostor ERROU o tema!";
    }

    document.getElementById("resultadoTexto").innerText = textoFinal;
}