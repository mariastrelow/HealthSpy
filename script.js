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
let modoPergunta = "especifico";

let temas = ["habitos", "corpo", "doencas", "remedios"];


const dadosTemas = {
    habitos: {
        palavras: ["Beber muito café ou energético", "Fumar", "Beber", "Tomar sol", "Praticar exercícios", "Acordar cedo"],
        perguntas: ["Você faz isso no seu dia a dia", "Que tipo de pessoa faz isso com mais frequência?", "Isso costuma acontecer mais em que momento do dia?",
            "Isso costuma acontecer mais sozinho ou com outras pessoas?", "O que pode motivar alguém a parar com isso?", "Quem da roda você imagina fazendo isso com frequência?",
            "Que tipo de hábito costuma vir junto com isso?"]
    },
    corpo: {
        palavras: ["Tireoide", "Pulmões", "Fígado", "Coração", "Intestinos", "Rins", "Estômago", "Cérebro"],
        perguntas: ["O que alguém perceberia no corpo quando isso não está funcionando bem?", "Se isso tivesse um papel em uma história, qual seria?",
            "Que doença poderia afetar diretamente isso?", "Que tipo de exame poderia avaliar isso?", "Que hábito pode prejudicar isso ao longo do tempo? (No bom ou no mal sentido)",
            "Se isso fosse um animal, qual você acha que seria?", "Se isso pudesse 'reclamar', do que você acha que reclamaria?",
            "Que tipo de situação faria isso trabalhar mais do que o normal?"]
    },
    doencas: {
        palavras: ["Gripe", "Diabetes", "Asma", "Bronquite", "Peste Negra", "Covid", "Catapora", "Dengue", "Pneumonia", "Câncer"],
        perguntas: ["Se alguém estivesse com isso agora, o que você perceberia no jeito da pessoa agir?", "Qual seria o maior incômodo no dia a dia de quem tem isso?",
            "Que tipo de situação poderia piorar isso sem a pessoa perceber?", "Como alguém tentaria esconder que está com isso?", "Que tipo de pessoa sofreria mais com isso?",
            "Qual seria a primeira coisa que alguém faria ao perceber isso?", "Você ja teve isso?"]
    },
    remedios: {
        palavras: ["Ozempic", "Ibuprofeno", "Losartana", "Dipirona", "Vitamina C", "Vitamina D", "Sertralina", "Zolpiden"],
        perguntas: ["Você faz ou ja fez o uso desse medicamento?", "Que sinal indica que isso está fazendo efeito?", "Que tipo de pessoa costuma depender mais disso?",
            "Ele deve ser tomado diariamente?", "Que gosto tem? (Caso nunca tenha tomado, que gosto voce imagina)", "Que tipo de problema pode aparecer com o uso prolongado sem acompanhamento?",
            "Que efeito colateral ele pode ter?", "As pessoas costumam falar abertamente que usam isso ou preferem esconder?", "Que tipo de hábito poderia substituir esse medicamento?"]
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

    let selecionado = document.querySelector('input[name="modoPergunta"]:checked');
    modoPergunta = selecionado ? selecionado.value : "especifico";

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
        habitos: ["Beber muito café ou energético", "Fumar", "Beber", "Tomar sol", "Praticar exercícios", "Acordar cedo"],

        corpo: ["Tireoide", "Pulmões", "Fígado", "Coração", "Intestinos", "Rins", "Estômago", "Cérebro"],

        doencas: ["Gripe", "Diabetes", "Asma", "Bronquite", "Peste Negra", "Covid", "Catapora", "Dengue", "Pneumonia", "Câncer"],

        remedios: ["Ozempic", "Ibuprofeno", "Losartana", "Dipirona", "Vitamina C", "Vitamina D", "Sertralina", "Zolpiden"]
    };

    const perguntasPorTema = {
        habitos: ["Você faz isso no seu dia a dia", "Que tipo de pessoa faz isso com mais frequência?", "Isso costuma acontecer mais em que momento do dia?",
            "Isso costuma acontecer mais sozinho ou com outras pessoas?", "O que pode motivar alguém a parar com isso?", "Quem da roda você imagina fazendo isso com frequência?",
            "Que tipo de hábito costuma vir junto com isso?"],

        corpo: ["O que alguém perceberia no corpo quando isso não está funcionando bem?", "Se isso tivesse um papel em uma história, qual seria?",
            "Que doença poderia afetar diretamente isso?", "Que tipo de exame poderia avaliar isso?", "Que hábito pode prejudicar isso ao longo do tempo? (No bom ou no mal sentido)",
            "Se isso fosse um animal, qual você acha que seria?", "Se isso pudesse 'reclamar', do que você acha que reclamaria?",
            "Que tipo de situação faria isso trabalhar mais do que o normal?"],

        doencas: ["Se alguém estivesse com isso agora, o que você perceberia no jeito da pessoa agir?", "Qual seria o maior incômodo no dia a dia de quem tem isso?",
            "Que tipo de situação poderia piorar isso sem a pessoa perceber?", "Como alguém tentaria esconder que está com isso?", "Que tipo de pessoa sofreria mais com isso?",
            "Qual seria a primeira coisa que alguém faria ao perceber isso?", "Você ja teve isso?"],

        remedios: ["Você faz ou ja fez o uso desse medicamento?", "Que sinal indica que isso está fazendo efeito?", "Que tipo de pessoa costuma depender mais disso?",
            "Ele deve ser tomado diariamente?", "Que gosto tem? (Caso nunca tenha tomado, que gosto voce imagina)", "Que tipo de problema pode aparecer com o uso prolongado sem acompanhamento?",
            "Que efeito colateral ele pode ter?", "As pessoas costumam falar abertamente que usam isso ou preferem esconder?", "Que tipo de hábito poderia substituir esse medicamento?"]
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

    let perguntasDisponiveis = [...dadosTemas[temaSelecionado].perguntas];
    perguntasDisponiveis.sort(() => Math.random() - 0.5);

    if (modoPergunta === "geral") {
        for (let i = 0; i < 3; i++) {
            paresPergunta.push({
                pergunta: perguntasDisponiveis[i]
            });
        }
    } else {
        let indices = jogadores.map((_, i) => i);
        indices.sort(() => Math.random() - 0.5);

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

    if (modoPergunta === "geral") {
        document.getElementById("infoPergunta").innerHTML =
            `<b>Pergunta ${indiceInteracao + 1}</b>`;
    } else {
        document.getElementById("infoPergunta").innerHTML =
            `<b>${jogadores[par.perguntaDe]}</b><br>
         pergunta para:<br>
         <b>${jogadores[par.responde]}</b>`;
    }

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


    let alternativas = [palavraSecreta];

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
    telaResultadoFinal.classList.remove("hidden");

    document.getElementById("escolhaEspiao").innerText = escolhaImpostor;

    document.getElementById("temaCorreto").innerText = palavraSecreta;

    if (escolhaImpostor === palavraSecreta) {
        document.getElementById("resultadoEspiao").innerText = "O espião acertou o tema!";
    } else {
        document.getElementById("resultadoEspiao").innerText = "O espião não acertou o tema";
    }

}

function irParaExplicacao() {
    document.getElementById("telaResultadoFinal").classList.add("hidden");
    document.getElementById("telaExplicacao").classList.remove("hidden");

    let explicacao = gerarExplicacao(palavraSecreta, temaSelecionado);

    document.getElementById("tituloPalavra").innerText = `"${palavraSecreta}"`; // AQUI
    document.getElementById("textoExplicacao").innerText = explicacao;
}

function gerarExplicacao(palavra, tema) {

    const explicacoes = {

        habitos: {
            "Beber muito café ou energético": "É o consumo frequente de bebidas com cafeína. O excesso pode causar ansiedade, insônia e aceleração do coração. Para evitar problemas, é importante controlar a quantidade e evitar à noite.",
            "Fumar": "Fumar é o uso de cigarro ou nicotina. Pode causar doenças graves como câncer e problemas pulmonares. A melhor prevenção é não começar ou buscar parar com ajuda.",
            "Beber": "É o consumo de bebidas alcoólicas. Em excesso, pode causar dependência e danos ao fígado. O ideal é consumir com moderação ou evitar.",
            "Tomar sol": "É a exposição ao sol, importante para vitamina D. Em excesso, pode causar queimaduras e câncer de pele. Usar protetor e evitar horários fortes ajuda a prevenir.",
            "Praticar exercícios": "É a realização de atividades físicas. Ajuda na saúde, mas em excesso pode causar lesões. O ideal é manter equilíbrio e orientação.",
            "Acordar cedo": "É o hábito de levantar cedo. Pode ser positivo, mas sem sono suficiente causa cansaço. O ideal é manter uma rotina de sono adequada."
        },

        corpo: {
            "Tireoide": "É uma glândula que regula o metabolismo. Problemas podem causar ganho ou perda de peso. A prevenção envolve acompanhamento médico e alimentação equilibrada.",
            "Pulmões": "São responsáveis pela respiração. Fumo e poluição podem prejudicar seu funcionamento. Evitar cigarro ajuda a proteger.",
            "Fígado": "Filtra toxinas do corpo. O álcool em excesso pode causar doenças. Uma alimentação saudável ajuda a prevenir problemas.",
            "Coração": "Bombeia o sangue pelo corpo. Má alimentação e sedentarismo aumentam riscos. Exercícios e boa alimentação ajudam na prevenção.",
            "Intestinos": "Ajudam na digestão e absorção de nutrientes. Má alimentação pode causar problemas. Consumir fibras e água ajuda a manter saudável.",
            "Rins": "Filtram o sangue e produzem urina. Pouca água pode prejudicar. Beber água regularmente é essencial.",
            "Estômago": "Inicia a digestão dos alimentos. Alimentação inadequada pode causar irritações. Evitar excessos ajuda na prevenção.",
            "Cérebro": "Controla o corpo e as emoções. Estresse e falta de sono afetam seu funcionamento. Dormir bem e cuidar da saúde mental é importante."
        },

        doencas: {
            "Gripe": "É uma infecção viral que causa febre e cansaço. Se espalha facilmente. Higiene e vacinação ajudam a prevenir.",
            "Diabetes": "Afeta o controle do açúcar no sangue. Pode estar ligada à alimentação e genética. Dieta equilibrada e exercícios ajudam na prevenção.",
            "Asma": "Doença que dificulta a respiração. Pode ser causada por alergias. Evitar gatilhos ajuda no controle.",
            "Bronquite": "Inflamação dos brônquios que causa tosse. Pode ser causada por fumaça ou infecção. Evitar poluição ajuda a prevenir.",
            "Peste Negra": "Doença infecciosa histórica causada por bactéria. Hoje é rara. Higiene e controle sanitário evitam sua propagação.",
            "Covid": "Doença viral que afeta a respiração. É transmitida pelo contato. Vacinação e higiene ajudam a prevenir.",
            "Catapora": "Doença viral com manchas na pele. É contagiosa. A vacina é a principal forma de prevenção.",
            "Dengue": "Transmitida por mosquito. Causa febre e dores. Evitar água parada é essencial para prevenir.",
            "Pneumonia": "Infecção nos pulmões. Pode ser grave. Vacinação e cuidados com a saúde ajudam a prevenir.",
            "Câncer": "Crescimento descontrolado de células. Pode ter várias causas. Estilo de vida saudável e exames ajudam na prevenção."
        },

        remedios: {
            "Ozempic": "É usado no controle do diabetes. Pode causar efeitos se usado sem orientação. Deve ser utilizado apenas com acompanhamento médico.",
            "Ibuprofeno": "É um anti-inflamatório para dor e febre. Pode irritar o estômago em excesso. Usar com moderação evita problemas.",
            "Losartana": "Usada para controlar a pressão alta. O uso incorreto pode afetar a pressão. Deve ser usada com orientação médica.",
            "Dipirona": "Alivia dor e febre. Pode causar reações em algumas pessoas. O uso correto evita riscos.",
            "Vitamina C": "Ajuda na imunidade. Em excesso pode causar desconforto. O ideal é manter doses equilibradas.",
            "Vitamina D": "Importante para ossos e imunidade. A falta de sol pode causar deficiência. Exposição moderada ajuda a prevenir.",
            "Sertralina": "É um antidepressivo. Pode afetar o humor se usado sem controle. Precisa de acompanhamento médico.",
            "Zolpiden": "Usado para insônia. Pode causar dependência. Deve ser usado por curto período e com orientação."
        }
    };

    return explicacoes[tema][palavra] || "Não há explicação cadastrada para essa palavra.";
}   