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

// Palavras e perguntas específicas de cada tema
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

// capturando telas
const telaInicial = document.getElementById("telaInicial");
const telaJogadores = document.getElementById("telaJogadores");
const telaTemas = document.getElementById("telaTemas");
const telaRevelar = document.getElementById("telaRevelar");
const telaPergunta = document.getElementById("telaPergunta");
const telaVotacao = document.getElementById("telaVotacao");
const telaImpostor = document.getElementById("telaImpostor");
const telaResultado = document.getElementById("telaResultado");
const telaComoJogar = document.getElementById("telaComoJogar");


// Mostrar telas
function mostrarJogadores() {
    telaInicial.classList.add("hidden");
    telaJogadores.classList.remove("hidden");
}
function mostrarComoJogar() {
    telaInicial.classList.add("hidden");
    document.getElementById("telaComoJogar").classList.remove("hidden");
}
function voltarInicio() {
    document.getElementById("telaComoJogar").classList.add("hidden");
    telaInicial.classList.remove("hidden");
}

// Adicionar jogadores
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
    <input type="text" placeholder="Nome">
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
            temaSelecionado = btn.dataset.tema; // "habitos", "corpo", etc.
            // sorteia uma palavra secreta desse tema
            palavraSecreta = dadosTemas[temaSelecionado].palavras[
                Math.floor(Math.random() * dadosTemas[temaSelecionado].palavras.length)
            ];

            telaTemas.classList.add("hidden"); // esconde tela de temas
            iniciarFaseRevelar(); // próxima fase do jogo
        });
    });
}
// Chame isso no início do script ou quando os jogadores forem validados
configurarEscolhaTema();

// Escolher tema


function iniciarFaseRevelar() {
    // escolhe palavras do tema
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

    temaSelecionado = temaSelecionado; // já definido no clique do botão

    // associa palavras e perguntas do tema
    perguntasBase = perguntasPorTema[temaSelecionado];
    palavrasDoTema = palavras[temaSelecionado];

    // sorteia o impostor
    impostorIndex = Math.floor(Math.random() * jogadores.length);

    // embaralha as interações
    gerarInteracoes();

    // mostra tela de revelar
    telaRevelar.classList.remove("hidden");
    jogadorAtualRevelar = 0;
    mostrarPapel();
}
// Mostrar papel do jogador
function mostrarPapel() {
    papelRevelado = false;
    document.getElementById("tituloRevelar").innerText =
        "Passe o celular para " + jogadores[jogadorAtualRevelar];
    document.getElementById("infoRevelar").innerText =
        "Clique abaixo para revelar seu papel.";

    let botao = document.querySelector("#telaRevelar button");
    botao.innerText = "Revelar papel";
    botao.onclick = revelarPapel;
}

function revelarPapel() {
    papelRevelado = true;
    document.getElementById("tituloRevelar").innerText = jogadores[jogadorAtualRevelar];

    if (jogadorAtualRevelar === impostorIndex) {
        document.getElementById("infoRevelar").innerText =
            "😈 Você é o IMPOSTOR!\nTente descobrir o tema.";
    } else {
        document.getElementById("infoRevelar").innerText =
            "🩺 Palavra secreta: " + palavraSecreta;
    }

    let botao = document.querySelector("#telaRevelar button");
    botao.innerText = "Ocultar e passar";
    botao.onclick = proximoJogador;
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

// Gera interações usando perguntas do tema
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

// Mostrar perguntas na tela
function mostrarInteracao() {
    if (indiceInteracao >= paresPergunta.length) {
        irParaVotacao();
        return;
    }

    let par = paresPergunta[indiceInteracao];
    document.getElementById("infoPergunta").innerText =
        jogadores[par.perguntaDe] + " pergunta para " + jogadores[par.responde];
    document.getElementById("textoPergunta").innerText = par.pergunta;
}

function proximaInteracao() {
    indiceInteracao++;
    mostrarInteracao();
}

// Votação e resultados (mantidos como estava)
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
    if (votos[votanteAtual] == null) return alert("Vote primeiro");
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
    let maisVotado = parseInt(Object.keys(contagem).reduce((a, b) => contagem[a] > contagem[b] ? a : b));
    impostorFoiDescoberto = (maisVotado === impostorIndex);

    let texto = "O impostor era: " + jogadores[impostorIndex] + "\n\n";
    texto += "Mais votado: " + jogadores[maisVotado] + "\n\n";
    texto += impostorFoiDescoberto ? "🎯 O impostor foi descoberto nos votos!" : "😈 O impostor NÃO foi descoberto nos votos!";
    document.getElementById("resultadoTexto").innerText = texto;

    let botao = document.getElementById("botaoContinuar");
    botao.classList.remove("hidden");
    botao.onclick = mostrarOpcoesImpostor;
}

// Tela do impostor
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

function verificarResultado(escolhaImpostor) {
    telaImpostor.classList.add("hidden");
    telaResultado.classList.remove("hidden");

    let textoFinal = "O impostor era: " + jogadores[impostorIndex] + "\n\n";
    textoFinal += impostorFoiDescoberto ? "📌 Foi descoberto nos votos.\n" : "📌 Não foi descoberto nos votos.\n";
    textoFinal += "\nO impostor escolheu: " + escolhaImpostor + "\n";
    textoFinal += "Tema correto: " + temaSelecionado + "\n\n";
    textoFinal += escolhaImpostor === temaSelecionado ? "🏆 O impostor ACERTOU o tema!" : "❌ O impostor ERROU o tema!";

    document.getElementById("resultadoTexto").innerText = textoFinal;
}