let jogadores = [];
let temaSelecionado;
let impostorIndex;
let papelRevelado = false;
let impostorFoiDescoberto = false;
let paresPergunta = [];
let indiceInteracao = 0;
let votos = [];
let votanteAtual = 0;
let jogadorAtualRevelar = 0;
let palavraSecreta;

let temas = ["habitos", "corpo", "doencas", "remedios"];


const dadosTemas = {
    habitos: {
        palavras: ["Dormir bem", "Mexer no celular", "Escovar os dentes", "Tomar banho", "Alongamento"],
        perguntas: [
            "Isso deve ser feito todo dia?",
            "É importante para a saúde?",
            "Você faz isso antes de dormir?",
            "Pode melhorar o bem-estar?",
            "É rápido ou demora muito?"
        ]
    },
    corpo: {
        palavras: ["Mão", "Pé", "Boca", "Coração", "Olho", "Braço", "Perna"],
        perguntas: [
            "Faz parte do corpo humano?",
            "Você consegue ver isso?",
            "É usado para se locomover?",
            "É sensível ao toque?",
            "Fica na parte superior do corpo?"
        ]
    },
    doencas: {
        palavras: ["Gripe", "Diabetes", "Asma", "Varicela", "Hipertensão"],
        perguntas: [
            "É uma doença comum?",
            "Afeta crianças ou adultos?",
            "Precisa de remédio para tratar?",
            "É contagiosa?",
            "Pode causar febre?"
        ]
    },
    remedios: {
        palavras: ["Paracetamol", "Ibuprofeno", "Amoxicilina", "Dipirona", "Omeprazol"],
        perguntas: [
            "É usado para dor?",
            "Precisa de receita?",
            "É em comprimido ou líquido?",
            "Alivia sintomas rápido?",
            "Pode causar efeitos colaterais?"
        ]
    }
};

const telaInicial = document.getElementById("telaInicial");
const telaJogadores = document.getElementById("telaJogadores");
const telaTemas = document.getElementById("telaTemas");
const telaRevelar = document.getElementById("telaRevelar");
const telaPergunta = document.getElementById("telaPergunta");
const telaVotacao = document.getElementById("telaVotacao");
const telaImpostor = document.getElementById("telaImpostor");
const telaResultado = document.getElementById("telaResultado");
const telaComoJogar = document.getElementById("telaComoJogar");



function mostrarJogadores() {
    telaInicial.classList.add("hidden");
    telaJogadores.classList.remove("hidden");
}
function mostrarComoJogar() {
    telaInicial.classList.add("hidden");
    telaTemas.classList.add("hidden");
    document.getElementById("telaComoJogar").classList.remove("hidden");
}
function voltarInicio() {
    document.getElementById("telaComoJogar").classList.add("hidden");
    telaInicial.classList.remove("hidden");
}


const listaJogadores = document.querySelector(".lista-jogadores");
const btnAdicionar = document.querySelector(".btn-adicionar");

let totalJogadores = document.querySelectorAll(".input-jogador").length;

function atualizarEventosRemover() {
    const botoesRemover = document.querySelectorAll(".remover");

    botoesRemover.forEach(botao => {
        botao.onclick = function () {
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
    <input type="text" placeholder="Nome" maxlength="15">
    <i class="bi bi-trash-fill remover"></i>
`;

    listaJogadores.appendChild(novoJogador);

    totalJogadores++;

    atualizarEventosRemover();
});


atualizarEventosRemover();

function voltarParaInicio() {
    telaJogadores.classList.add("hidden");
    telaInicial.classList.remove("hidden");
}

function voltarParaJogadores() {
    telaTemas.classList.add("hidden");
    telaJogadores.classList.remove("hidden");
}

function iniciarJogo() {
    jogadores = [];
    document.querySelectorAll(".lista-jogadores input").forEach(i => {
        if (i.value.trim() != "") jogadores.push(i.value.trim());
    });

    let mensagem = document.getElementById("mensagemErro");

    if (jogadores.length < 4) {
        mensagem.innerText = "O jogo precisa de no mínimo 4 jogadores para iniciar.";
        mensagem.classList.remove("hidden");

        setTimeout(() => {
            mensagem.classList.add("hidden");
        }, 3000);

        return;
    }

    mensagem.classList.add("hidden");

    document.getElementById("telaJogadores").classList.add("hidden");
    document.getElementById("telaTemas").classList.remove("hidden");
}

function configurarEscolhaTema() {
    document.querySelectorAll(".btn-tema").forEach(btn => {
        btn.addEventListener("click", () => {
            temaSelecionado = btn.dataset.tema;
            palavraSecreta = dadosTemas[temaSelecionado].palavras[
                Math.floor(Math.random() * dadosTemas[temaSelecionado].palavras.length)
            ];

            telaTemas.classList.add("hidden"); 
            iniciarFaseRevelar(); 
        });
    });
}


configurarEscolhaTema();


function iniciarFaseRevelar() {
    
    const palavras = {
        habitos: ["Dormir bem", "Mexer no celular", "Tomar banho", "Escovar dentes", "Dormir tarde"],
        corpo: ["Mão", "Pé", "Boca", "Olho", "Coração"],
        doencas: ["Gripe", "Diabetes", "Asma", "Depressão", "Hipertensão"],
        remedios: ["Paracetamol", "Ibuprofeno", "Amoxicilina", "Dipirona", "Omeprazol"]
    };

    const perguntasPorTema = {
        habitos: ["Isso é feito todo dia?", "Você gosta?", "Melhora o humor?", "É importante?", "Pode causar problemas?"],
        corpo: ["É visível?", "É usado para andar?", "Faz parte do coração?", "Pode sentir dor?", "É flexível?"],
        doencas: ["É grave?", "Pode ser prevenido?", "Afeta crianças?", "Precisa de remédio?", "Tem vacina?"],
        remedios: ["É tomado todo dia?", "Alivia dor?", "Tem efeitos colaterais?", "Precisa de receita?", "Pode ser comprado na farmácia?"]
    };

    temaSelecionado = temaSelecionado; 

    perguntasBase = perguntasPorTema[temaSelecionado];
    palavrasDoTema = palavras[temaSelecionado];

    impostorIndex = Math.floor(Math.random() * jogadores.length);

    gerarInteracoes();

    telaRevelar.classList.remove("hidden");
    jogadorAtualRevelar = 0;
    mostrarPapel();
}

function mostrarPapel() {

    papelRevelado = false;

    document.getElementById("tituloRevelar").innerText = "Passe o dispositivo para:"; 
    document.getElementById("tituloJogador").innerText = jogadores[jogadorAtualRevelar];

    document.getElementById("botaoRevelar").style.display = "block";
    document.getElementById("botaoPassar").style.display = "none";

    document.getElementById("tituloPapel").style.display = "none";
    document.getElementById("descricaoPapel").style.display = "none";
}


function revelarPapel() {

    papelRevelado = true;

    document.getElementById("botaoRevelar").style.display = "none";
    document.getElementById("botaoPassar").style.display = "block";

    document.getElementById("tituloPapel").style.display = "block";
    document.getElementById("descricaoPapel").style.display = "block";

    if (jogadorAtualRevelar === impostorIndex) {
        document.getElementById("tituloPapel").innerText = "Você é o ESPIÃO";
        document.getElementById("descricaoPapel").innerText =
            "Junte pistas para descobrir o tema secreto, mas não seja descoberto.";
    } else {
        document.getElementById("tituloPapel").innerText = "Palavra secreta:";
        document.getElementById("descricaoPapel").innerText = palavraSecreta;
    }
}

function proximoJogador() {
    if (!papelRevelado) return;
    jogadorAtualRevelar++;
    if (jogadorAtualRevelar < jogadores.length) {
        mostrarPapel();
    } else {
        telaRevelar.classList.add("hidden");
        telaPergunta.classList.remove("hidden");
        mostrarInteracao();
    }
}

function gerarInteracoes() {
    paresPergunta = [];
    indiceInteracao = 0;

    let indices = jogadores.map((_, i) => i);
    indices.sort(() => Math.random() - 0.5);

    let perguntasDisponiveis = [...dadosTemas[temaSelecionado].perguntas];
    perguntasDisponiveis.sort(() => Math.random() - 0.5);

    for (let i = 0; i < indices.length; i++) {
        let perguntaDe = indices[i];
        let responde = indices[(i + 1) % indices.length];

        paresPergunta.push({
            perguntaDe,
            responde,
            pergunta: perguntasDisponiveis[i % perguntasDisponiveis.length]
        });
    }
}

function voltarInteracao() {
    if (indiceInteracao > 0) {
        indiceInteracao--;
        mostrarInteracao();
    }
}

function mostrarInteracao() {
    if (indiceInteracao >= paresPergunta.length) {
        irParaVotacao();
        return;
    }

    let par = paresPergunta[indiceInteracao];
    document.getElementById("infoPergunta").innerHTML =
    `<b>${jogadores[par.perguntaDe]}</b><br>
     pergunta para:<br>
     <b>${jogadores[par.responde]}</b>`;
    document.getElementById("textoPergunta").innerText = par.pergunta;

    const btnVoltar = document.getElementById("btnVoltar");

    if (indiceInteracao === 0) {
        btnVoltar.style.display = "none";
    } else {
        btnVoltar.style.display = "inline-block";
    }
}

function proximaInteracao() {
    indiceInteracao++;
    mostrarInteracao();
}


function irParaVotacao() {
    telaPergunta.classList.add("hidden");
    telaVotacao.classList.remove("hidden");
    votos = [];
    votanteAtual = 0;
    prepararVotacao();
}

function prepararVotacao() {
    document.getElementById("tituloVotacao").innerText =
        jogadores[votanteAtual] + ", vote no impostor:";
    let opcoes = document.getElementById("opcoesVoto");
    opcoes.innerHTML = "";
    let votoSelecionado = null;

    jogadores.forEach((j, index) => {
        let btn = document.createElement("button");
        btn.innerText = j;
        btn.onclick = () => {
            document.querySelectorAll("#opcoesVoto button").forEach(b => b.classList.remove("selecionado"));
            btn.classList.add("selecionado");
            votoSelecionado = index;
            votos[votanteAtual] = index;
        };
        opcoes.appendChild(btn);
    });
}

function registrarVoto() {

let mensagem = document.getElementById("mensagemErroVoto");

    if (votos[votanteAtual] == null) {

        mensagem.innerText = "Vote primeiro!";
        mensagem.classList.remove("hidden");

        setTimeout(() => {
            mensagem.classList.add("hidden");
        }, 3000);

        return;
    }

    votanteAtual++;

    if (votanteAtual < jogadores.length) {
        prepararVotacao();
    } else {
        finalizarVotacao();
    }
}
function finalizarVotacao() {
    telaVotacao.classList.add("hidden");
    telaResultado.classList.remove("hidden");

    let contagem = {};
    votos.forEach(v => contagem[v] = (contagem[v] || 0) + 1);

    let maisVotado = parseInt(
        Object.keys(contagem).reduce((a, b) =>
            contagem[a] > contagem[b] ? a : b
        )
    );

    impostorFoiDescoberto = (maisVotado === impostorIndex);

    let texto = `
        <span class="resultado-label">O jogador mais votado:</span>
        <span class="resultado-nome">${jogadores[maisVotado]}</span>

        <span class="resultado-label">O espião era:</span>
        <span class="resultado-nome">${jogadores[impostorIndex]}</span>

        <span class="resultado-final">
            ${impostorFoiDescoberto
                ? "O espião foi descoberto!"
                : "O espião não foi descoberto nos votos"}
        </span>
    `;

    document.getElementById("resultadoTexto").innerHTML = texto;

    let botao = document.getElementById("botaoContinuar");
    botao.classList.remove("hidden");
    botao.onclick = mostrarOpcoesImpostor;
}


function mostrarOpcoesImpostor() {
    telaResultado.classList.add("hidden");
    telaImpostor.classList.remove("hidden");

    let opcoes = document.getElementById("opcoesTema");
    opcoes.innerHTML = "";

    let alternativas = [dadosTemas[temaSelecionado].palavras[Math.floor(Math.random() * dadosTemas[temaSelecionado].palavras.length)]];

    while (alternativas.length < 4) {
        let aleatorio = dadosTemas[temaSelecionado].palavras[Math.floor(Math.random() * dadosTemas[temaSelecionado].palavras.length)];
        if (!alternativas.includes(aleatorio)) alternativas.push(aleatorio);
    }

    alternativas.sort(() => Math.random() - 0.5);

    alternativas.forEach(op => {
        let btn = document.createElement("button");
        btn.innerText = op;
        btn.onclick = () => verificarResultado(op);
        opcoes.appendChild(btn);
    });
}

function verificarResultado(escolhaImpostor){

    telaImpostor.classList.add("hidden");
    telaResultadoFinal.classList.remove("hidden");

    document.getElementById("escolhaEspiao").innerText = escolhaImpostor;

    document.getElementById("temaCorreto").innerText = palavraSecreta;

    if(escolhaImpostor === palavraSecreta){
        document.getElementById("resultadoEspiao").innerText = "O espião acertou o tema!";
    } else {
        document.getElementById("resultadoEspiao").innerText = "O espião não acertou o tema";
    }
}