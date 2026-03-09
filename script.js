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
        palavras: [
            "Dormir", "Acordar cedo", "Caminhar", "Ler", "Meditar",
            "Escovar dentes", "Tomar banho", "Beber água", "Alongar", "Tomar sol",
            "Comer frutas", "Exercitar", "Planejar", "Escrever", "Ouvir música",
            "Sorrir", "Cozinhar", "Fazer lista", "Fazer hobby", "Tomar chá",
            "Dormir tarde", "Ficar ansioso", "Procrastinar", "Reclamar", "Jogar",
            "Assistir TV", "Comer doce", "Fumar", "Beber", "Morder unha",
            "Ficar irritado", "Ignorar banho", "Ignorar dentes", "Ignorar exercícios", "Exagerar açúcar",
            "Exagerar cafeína", "Ficar sentado", "Evitar responsabilidades", "Falar demais", "Ficar distraído",
            "Comprar por impulso", "Ficar sozinho", "Desconectar do trabalho", "Ficar grudado no celular", "Evitar estudar",
            "Praticar esporte", "Respirar fundo", "Organizar quarto", "Cantar", "Ajudar alguém"
        ],
        perguntas: [
            "Você faria isso sem perceber?", "Alguém já te elogiou por isso?", "Isso já te deixou nervoso?",
            "É algo que todos comentam?", "Já te ajudou sem você notar?", "Pode surpreender alguém?",
            "Você acha divertido?", "Alguém já te avisou para não fazer?", "É rápido demais?",
            "Pode dar preguiça?", "Já causou alguma confusão?", "É caro sem você perceber?",
            "Alguém já riu disso?", "Você faria sozinho?", "Pode gerar fofoca?",
            "Já te deixou mais cansado?", "Pode causar arrepios?", "Alguém já se enganou por isso?",
            "É relaxante de um jeito estranho?", "Pode te desafiar?", "Você precisa planejar muito?",
            "Pode dar vontade de desistir?", "Alguém já ajudou você nisso?", "É recomendado sem você saber?",
            "Pode causar ansiedade sem motivo?", "Te dá energia?", "Alguém já criticou por fazer isso?",
            "Já deu vontade de parar?", "Pode te fazer sentir culpado?", "Você já se sentiu criativo por causa disso?",
            "Pode ser feito com outras pessoas?", "Alguém já percebeu que você faz isso?", "Isso melhora algo que você nem percebe?",
            "Pode causar problemas sem você notar?", "É algo que faz você se sentir bem?", "Pode afetar autoestima?",
            "Já causou briga com alguém?", "É difícil de largar?", "Pode melhorar seu humor inesperadamente?",
            "Já ajudou alguém sem querer?", "Pode causar prejuízo sem perceber?", "Já te fez lembrar de algo importante?",
            "É relaxante de forma estranha?", "Precisa de algum equipamento estranho?", "Pode ser feito muito rápido?",
            "Pode mudar seu humor de repente?", "Já te prejudicou sem perceber?", "É recomendado por alguém curioso?",
            "Pode virar hábito sem você notar?", "Alguém já disse que isso melhora saúde mental?", "Você já comentou sobre isso com alguém?"
        ]
    },
    corpo: {
        palavras: [
            "Mão", "Pé", "Boca", "Coração", "Olho", "Braço", "Perna", "Nariz", "Orelha", "Cabeça",
            "Cabelo", "Dedo", "Unha", "Língua", "Dente", "Bochecha", "Sobrancelha", "Pálpebra", "Pescoço", "Barriga",
            "Peito", "Costas", "Ombro", "Joelho", "Cotovelo", "Calcanhar", "Panturrilha", "Coxa", "Quadril", "Glúteo",
            "Palma", "Antebraço", "Face", "Barriga", "Braço", "Perna", "Nariz", "Orelha", "Olho", "Mão",
            "Pé", "Boca", "Cabeça", "Cabelo", "Dedo", "Unha", "Língua", "Dente", "Bochecha", "Sobrancelha"
        ],
        perguntas: [
            "É algo que você sente perto de você?", "Algo que muda ao longo da vida?", "Pode ser percebido sem tocar?",
            "Costuma aparecer em fotos?", "Você consegue mexer isso?", "É algo que costuma se mover?",
            "Pode ser visto em várias cores?", "Alguma vez já te chamou atenção?", "É algo que você protege?",
            "Pode ser coberto por roupas?", "Costuma ser comparado com outras pessoas?", "É algo que se transforma com o tempo?",
            "Pode indicar como você está?", "É algo que todos notam primeiro?", "Pode ser motivo de elogios?",
            "Pode causar surpresa?", "Alguma vez já te machucou?", "É algo que você toca com frequência?",
            "Pode ser objeto de cuidados especiais?", "Pode refletir seu estilo?", "É algo que pode crescer ou encurtar?",
            "Algumas pessoas têm mais ou menos?", "Pode aparecer em selfies?", "Pode ser sentido pelo tato?",
            "É algo que você não esquece de olhar?", "Costuma chamar atenção em movimento?", "É algo que pode ser simétrico?",
            "Pode variar de pessoa para pessoa?", "É algo que pode ser pintado ou decorado?", "Pode ser comparado com animais?",
            "É algo que você percebe com o espelho?", "Algumas vezes pode causar confusão?", "É algo que influencia expressões?",
            "Pode ser coberto ou descoberto?", "Costuma aparecer em desenhos?", "Pode ser usado para se comunicar sem palavras?",
            "É algo que você sente calor ou frio?", "Pode ser usado para gestos?", "Pode ser parte de brincadeiras?",
            "É algo que te ajuda a reconhecer pessoas?", "Pode ser protegido com acessórios?", "É algo que acompanha você sempre?",
            "Algumas vezes pode se mover sozinho?", "É algo que você percebe em fotos antigas?", "Pode ser objeto de curiosidade?",
            "É algo que você observa sem pensar?", "Alguma vez já te surpreendeu?", "É algo que muda com humor?",
            "Pode ser objeto de expressão artística?", "É algo que pode chamar atenção sem querer?"
        ]
    },
    doencas: {
        palavras: [
            "Gripe", "Diabetes", "Asma", "Varicela", "Hipertensão", "Resfriado", "Bronquite", "Catapora", "Anemia", "Febre",
            "Sinusite", "Otite", "Caxumba", "Hepatite", "Dengue", "Zika", "Covid", "Sarampo", "Tuberculose", "Malária",
            "Tifo", "Varíola", "Raiva", "Meningite", "Câncer", "Alergia", "Obesidade", "Depressão", "Ansiedade", "Fibrose",
            "Gastrite", "Colite", "Psoríase", "Artrite", "Lúpus", "Insônia", "Síndrome", "Infecção", "Herpes", "Vitiligo",
            "Cistite", "Pneumonia", "Gastroenterite", "Hipotireoidismo", "Hipertireoidismo", "Esclerose", "Distúrbio", "Sífilis", "HIV", "Hepatite B"
        ],
        perguntas: [
            "É algo que pode afetar muitas pessoas?", "Se essa palavra fosse um filme, qual seria o gênero?", "Costuma chamar atenção quando ocorre?",
            "É algo que todos conhecem o nome?", "Essa palavra faz sentido depois de comer pizza às 3h da manhã?", "Pode aparecer em qualquer lugar do mundo?",
            "Algumas pessoas têm predisposição?", "Você usaria isso numa conversa com um alienígena?", "Pode mudar de intensidade?",
            "Algumas vezes se manifesta de forma inesperada?", "Essa palavra seria um bom nome de banda?", "Pode ser motivo de cuidado especial?",
            "É algo que já ouviu falar em notícias?", "Se isso tivesse cheiro, seria doce ou azedo?", "Algumas pessoas tentam evitar?",
            "Pode afetar jovens e idosos?", "Você usaria essa palavra num meme?", "Costuma ser lembrado por experiências pessoais?",
            "Pode mudar com o tempo?", "Essa palavra combina mais com verão ou inverno?", "É algo que você percebe no dia a dia?",
            "Pode ter diferentes nomes em diferentes lugares?", "Se isso fosse uma música, qual seria o ritmo?", "Algumas vezes pode ser silencioso?",
            "É algo que gera curiosidade?", "Essa palavra poderia ser uma tendência do TikTok?", "Pode ser tema de conversa?",
            "Algumas vezes aparece em séries ou filmes?", "Se isso fosse um superpoder, qual seria?", "Pode causar preocupação?",
            "Algumas vezes é prevenível?", "Se isso fosse um animal, qual seria?", "Pode ser considerado sério por alguns?",
            "É algo que as pessoas conhecem pelo menos de ouvir falar?", "Essa palavra combina com festa ou trabalho?", "Pode se manifestar de forma súbita?",
            "Algumas vezes precisa de acompanhamento?", "Se isso tivesse sabor, seria doce ou salgado?", "Pode ser percebido de forma indireta?",
            "É algo que inspira cuidados?", "Essa palavra poderia ser usada como senha?", "Algumas vezes pode ser confuso identificar?",
            "Pode ser objeto de estudo?", "Se isso fosse um lugar, seria tranquilo ou caótico?", "Algumas vezes é citado em revistas ou jornais?",
            "É algo que todos podem ter opinião?", "Essa palavra seria usada em redes sociais?", "Pode provocar mudanças na vida de alguém?",
            "Pode se espalhar de forma lenta ou rápida?", "Você explicaria isso para uma criança?", "Algumas vezes provoca mudanças na rotina?",
            "Pode ser lembrado por histórias de outros?", "Essa palavra poderia ser um tema viral na internet?", "É algo que gera atenção da família?",
            "Algumas vezes pode ser temporário ou permanente?", "Se isso fosse um objeto, seria grande ou pequeno?", "Pode ser tema de discussão em escolas ou cursos?",
            "Algumas vezes deixa marcas ou lembranças?", "Essa palavra combina com tecnologia ou natureza?", "É algo que faz parte da experiência humana?",
            "Algumas vezes inspira pesquisas?", "Você faria um meme com isso?", "Pode ser lembrado em datas especiais?",
            "Algumas vezes é mencionado em histórias familiares?", "Se isso fosse uma comida, qual seria?", "É algo que desperta atenção coletiva?",
            "Algumas vezes precisa de prevenção contínua?", "Essa palavra combina com sol ou chuva?", "Se isso fosse uma estação do ano, qual seria?"
        ]
    },
    remedios: {
        palavras: [
            "Paracetamol", "Ibuprofeno", "Amoxicilina", "Dipirona", "Omeprazol",
            "Aspirina", "Diclofenaco", "Loratadina", "Prednisona", "Claritromicina",
            "Ranitidina", "Metformina", "Naproxeno", "Cefalexina", "Fluconazol",
            "Prednisolona", "Simeticona", "Losartana", "Furosemida", "Amoxicilina + Clavulanato",
            "Azitromicina", "Clindamicina", "Vitamina C", "Vitamina D", "Vitamina B12",
            "Magnésio", "Potássio", "Captopril", "Enalapril", "Amlodipino",
            "Omeprazol + Domperidona", "Metamizol", "Cetirizina", "Levotiroxina", "Sulfametoxazol + Trimetoprim",
            "Doxiciclina", "Clorfeniramina", "Nistatina", "Loperamida", "Ginkgo Biloba",
            "Propranolol", "Alprazolam", "Diazepam", "Buscopan", "Rivotril",
            "Fluoxetina", "Sertralina", "Clonazepam", "Melatonina", "Hidroxicloroquina"
        ],
        perguntas: [
            "É algo que se encontra em casa?", "Você usaria isso numa conversa com um alienígena?", "É usado para dor?",
            "Precisa de receita?", "Se isso tivesse cheiro, seria doce ou azedo?", "É em comprimido ou líquido?",
            "Alivia sintomas rápido?", "Essa palavra seria um bom nome de banda?", "Pode causar efeitos colaterais?",
            "Algumas pessoas tentam evitar?", "Você usaria isso num meme?", "Pode ser tema de conversa?",
            "Pode aparecer em qualquer lugar do mundo?", "Se isso fosse uma música, qual seria o ritmo?", "É algo que já ouviu falar em notícias?",
            "Pode ter diferentes nomes em diferentes lugares?", "Essa palavra combina mais com verão ou inverno?", "Algumas vezes pode ser silencioso?",
            "É algo que gera curiosidade?", "Essa palavra poderia ser uma tendência do TikTok?", "Algumas vezes aparece em séries ou filmes?",
            "Se isso fosse um superpoder, qual seria?", "Pode causar preocupação?", "Algumas vezes é prevenível?",
            "Pode ser considerado sério por alguns?", "Essa palavra combina com festa ou trabalho?", "Pode se manifestar de forma súbita?",
            "Algumas vezes precisa de acompanhamento?", "Se isso tivesse sabor, seria doce ou salgado?", "Pode ser percebido de forma indireta?",
            "É algo que inspira cuidados?", "Essa palavra poderia ser usada como senha?", "Algumas vezes pode ser confuso identificar?",
            "Pode ser objeto de estudo?", "Se isso fosse um lugar, seria tranquilo ou caótico?", "Algumas vezes é citado em revistas ou jornais?",
            "É algo que todos podem ter opinião?", "Essa palavra seria usada em redes sociais?", "Pode provocar mudanças na vida de alguém?",
            "Pode se espalhar de forma lenta ou rápida?", "Você explicaria isso para uma criança?", "Algumas vezes provoca mudanças na rotina?",
            "Pode ser lembrado por histórias de outros?", "Essa palavra poderia ser um tema viral na internet?", "É algo que gera atenção da família?",
            "Algumas vezes pode ser temporário ou permanente?", "Se isso fosse um objeto, seria grande ou pequeno?", "Pode ser tema de discussão em escolas ou cursos?",
            "Algumas vezes deixa marcas ou lembranças?", "Essa palavra combina com tecnologia ou natureza?", "É algo que faz parte da experiência humana?",
            "Algumas vezes inspira pesquisas?", "Você faria um meme com isso?", "Pode ser lembrado em datas especiais?",
            "Algumas vezes é mencionado em histórias familiares?", "Se isso fosse uma comida, qual seria?", "É algo que desperta atenção coletiva?",
            "Algumas vezes precisa de prevenção contínua?", "Essa palavra combina com sol ou chuva?", "Se isso fosse uma estação do ano, qual seria?"
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
        habitos: ["Dormir", "Acordar cedo", "Caminhar", "Ler", "Meditar",
            "Escovar dentes", "Tomar banho", "Beber água", "Alongar", "Tomar sol",
            "Comer frutas", "Exercitar", "Planejar", "Escrever", "Ouvir música",
            "Sorrir", "Cozinhar", "Fazer lista", "Fazer hobby", "Tomar chá",
            "Dormir tarde", "Ficar ansioso", "Procrastinar", "Reclamar", "Jogar",
            "Assistir TV", "Comer doce", "Fumar", "Beber", "Morder unha",
            "Ficar irritado", "Ignorar banho", "Ignorar dentes", "Ignorar exercícios", "Exagerar açúcar",
            "Exagerar cafeína", "Ficar sentado", "Evitar responsabilidades", "Falar demais", "Ficar distraído",
            "Comprar por impulso", "Ficar sozinho", "Desconectar do trabalho", "Ficar grudado no celular", "Evitar estudar",
            "Praticar esporte", "Respirar fundo", "Organizar quarto", "Cantar", "Ajudar alguém"],
        corpo: ["Mão", "Pé", "Boca", "Coração", "Olho", "Braço", "Perna", "Nariz", "Orelha", "Cabeça",
            "Cabelo", "Dedo", "Unha", "Língua", "Dente", "Bochecha", "Sobrancelha", "Pálpebra", "Pescoço", "Barriga",
            "Peito", "Costas", "Ombro", "Joelho", "Cotovelo", "Calcanhar", "Panturrilha", "Coxa", "Quadril", "Glúteo",
            "Palma", "Antebraço", "Face", "Barriga", "Braço", "Perna", "Nariz", "Orelha", "Olho", "Mão",
            "Pé", "Boca", "Cabeça", "Cabelo", "Dedo", "Unha", "Língua", "Dente", "Bochecha", "Sobrancelha"],
        doencas: ["Gripe", "Diabetes", "Asma", "Varicela", "Hipertensão", "Resfriado", "Bronquite", "Catapora", "Anemia", "Febre",
            "Sinusite", "Otite", "Caxumba", "Hepatite", "Dengue", "Zika", "Covid", "Sarampo", "Tuberculose", "Malária",
            "Tifo", "Varíola", "Raiva", "Meningite", "Câncer", "Alergia", "Obesidade", "Depressão", "Ansiedade", "Fibrose",
            "Gastrite", "Colite", "Psoríase", "Artrite", "Lúpus", "Insônia", "Síndrome", "Infecção", "Herpes", "Vitiligo",
            "Cistite", "Pneumonia", "Gastroenterite", "Hipotireoidismo", "Hipertireoidismo", "Esclerose", "Distúrbio", "Sífilis", "HIV", "Hepatite B"],
        remedios: ["Paracetamol", "Ibuprofeno", "Amoxicilina", "Dipirona", "Omeprazol",
            "Aspirina", "Diclofenaco", "Loratadina", "Prednisona", "Claritromicina",
            "Ranitidina", "Metformina", "Naproxeno", "Cefalexina", "Fluconazol",
            "Prednisolona", "Simeticona", "Losartana", "Furosemida", "Amoxicilina + Clavulanato",
            "Azitromicina", "Clindamicina", "Vitamina C", "Vitamina D", "Vitamina B12",
            "Magnésio", "Potássio", "Captopril", "Enalapril", "Amlodipino",
            "Omeprazol + Domperidona", "Metamizol", "Cetirizina", "Levotiroxina", "Sulfametoxazol + Trimetoprim",
            "Doxiciclina", "Clorfeniramina", "Nistatina", "Loperamida", "Ginkgo Biloba",
            "Propranolol", "Alprazolam", "Diazepam", "Buscopan", "Rivotril",
            "Fluoxetina", "Sertralina", "Clonazepam", "Melatonina", "Hidroxicloroquina"]
    };

    const perguntasPorTema = {
        habitos: ["Você faria isso sem perceber?", "Alguém já te elogiou por isso?", "Isso já te deixou nervoso?",
            "É algo que todos comentam?", "Já te ajudou sem você notar?", "Pode surpreender alguém?",
            "Você acha divertido?", "Alguém já te avisou para não fazer?", "É rápido demais?",
            "Pode dar preguiça?", "Já causou alguma confusão?", "É caro sem você perceber?",
            "Alguém já riu disso?", "Você faria sozinho?", "Pode gerar fofoca?",
            "Já te deixou mais cansado?", "Pode causar arrepios?", "Alguém já se enganou por isso?",
            "É relaxante de um jeito estranho?", "Pode te desafiar?", "Você precisa planejar muito?",
            "Pode dar vontade de desistir?", "Alguém já ajudou você nisso?", "É recomendado sem você saber?",
            "Pode causar ansiedade sem motivo?", "Te dá energia?", "Alguém já criticou por fazer isso?",
            "Já deu vontade de parar?", "Pode te fazer sentir culpado?", "Você já se sentiu criativo por causa disso?",
            "Pode ser feito com outras pessoas?", "Alguém já percebeu que você faz isso?", "Isso melhora algo que você nem percebe?",
            "Pode causar problemas sem você notar?", "É algo que faz você se sentir bem?", "Pode afetar autoestima?",
            "Já causou briga com alguém?", "É difícil de largar?", "Pode melhorar seu humor inesperadamente?",
            "Já ajudou alguém sem querer?", "Pode causar prejuízo sem perceber?", "Já te fez lembrar de algo importante?",
            "É relaxante de forma estranha?", "Precisa de algum equipamento estranho?", "Pode ser feito muito rápido?",
            "Pode mudar seu humor de repente?", "Já te prejudicou sem perceber?", "É recomendado por alguém curioso?",
            "Pode virar hábito sem você notar?", "Alguém já disse que isso melhora saúde mental?", "Você já comentou sobre isso com alguém?"],

        corpo: ["É algo que você sente perto de você?", "Algo que muda ao longo da vida?", "Pode ser percebido sem tocar?",
            "Costuma aparecer em fotos?", "Você consegue mexer isso?", "É algo que costuma se mover?",
            "Pode ser visto em várias cores?", "Alguma vez já te chamou atenção?", "É algo que você protege?",
            "Pode ser coberto por roupas?", "Costuma ser comparado com outras pessoas?", "É algo que se transforma com o tempo?",
            "Pode indicar como você está?", "É algo que todos notam primeiro?", "Pode ser motivo de elogios?",
            "Pode causar surpresa?", "Alguma vez já te machucou?", "É algo que você toca com frequência?",
            "Pode ser objeto de cuidados especiais?", "Pode refletir seu estilo?", "É algo que pode crescer ou encurtar?",
            "Algumas pessoas têm mais ou menos?", "Pode aparecer em selfies?", "Pode ser sentido pelo tato?",
            "É algo que você não esquece de olhar?", "Costuma chamar atenção em movimento?", "É algo que pode ser simétrico?",
            "Pode variar de pessoa para pessoa?", "É algo que pode ser pintado ou decorado?", "Pode ser comparado com animais?",
            "É algo que você percebe com o espelho?", "Algumas vezes pode causar confusão?", "É algo que influencia expressões?",
            "Pode ser coberto ou descoberto?", "Costuma aparecer em desenhos?", "Pode ser usado para se comunicar sem palavras?",
            "É algo que você sente calor ou frio?", "Pode ser usado para gestos?", "Pode ser parte de brincadeiras?",
            "É algo que te ajuda a reconhecer pessoas?", "Pode ser protegido com acessórios?", "É algo que acompanha você sempre?",
            "Algumas vezes pode se mover sozinho?", "É algo que você percebe em fotos antigas?", "Pode ser objeto de curiosidade?",
            "É algo que você observa sem pensar?", "Alguma vez já te surpreendeu?", "É algo que muda com humor?",
            "Pode ser objeto de expressão artística?", "É algo que pode chamar atenção sem querer?"],

        doencas: ["É algo que pode afetar muitas pessoas?", "Se essa palavra fosse um filme, qual seria o gênero?", "Costuma chamar atenção quando ocorre?",
            "É algo que todos conhecem o nome?", "Essa palavra faz sentido depois de comer pizza às 3h da manhã?", "Pode aparecer em qualquer lugar do mundo?",
            "Algumas pessoas têm predisposição?", "Você usaria isso numa conversa com um alienígena?", "Pode mudar de intensidade?",
            "Algumas vezes se manifesta de forma inesperada?", "Essa palavra seria um bom nome de banda?", "Pode ser motivo de cuidado especial?",
            "É algo que já ouviu falar em notícias?", "Se isso tivesse cheiro, seria doce ou azedo?", "Algumas pessoas tentam evitar?",
            "Pode afetar jovens e idosos?", "Você usaria essa palavra num meme?", "Costuma ser lembrado por experiências pessoais?",
            "Pode mudar com o tempo?", "Essa palavra combina mais com verão ou inverno?", "É algo que você percebe no dia a dia?",
            "Pode ter diferentes nomes em diferentes lugares?", "Se isso fosse uma música, qual seria o ritmo?", "Algumas vezes pode ser silencioso?",
            "É algo que gera curiosidade?", "Essa palavra poderia ser uma tendência do TikTok?", "Pode ser tema de conversa?",
            "Algumas vezes aparece em séries ou filmes?", "Se isso fosse um superpoder, qual seria?", "Pode causar preocupação?",
            "Algumas vezes é prevenível?", "Se isso fosse um animal, qual seria?", "Pode ser considerado sério por alguns?",
            "É algo que as pessoas conhecem pelo menos de ouvir falar?", "Essa palavra combina com festa ou trabalho?", "Pode se manifestar de forma súbita?",
            "Algumas vezes precisa de acompanhamento?", "Se isso tivesse sabor, seria doce ou salgado?", "Pode ser percebido de forma indireta?",
            "É algo que inspira cuidados?", "Essa palavra poderia ser usada como senha?", "Algumas vezes pode ser confuso identificar?",
            "Pode ser objeto de estudo?", "Se isso fosse um lugar, seria tranquilo ou caótico?", "Algumas vezes é citado em revistas ou jornais?",
            "É algo que todos podem ter opinião?", "Essa palavra seria usada em redes sociais?", "Pode provocar mudanças na vida de alguém?",
            "Pode se espalhar de forma lenta ou rápida?", "Você explicaria isso para uma criança?", "Algumas vezes provoca mudanças na rotina?",
            "Pode ser lembrado por histórias de outros?", "Essa palavra poderia ser um tema viral na internet?", "É algo que gera atenção da família?",
            "Algumas vezes pode ser temporário ou permanente?", "Se isso fosse um objeto, seria grande ou pequeno?", "Pode ser tema de discussão em escolas ou cursos?",
            "Algumas vezes deixa marcas ou lembranças?", "Essa palavra combina com tecnologia ou natureza?", "É algo que faz parte da experiência humana?",
            "Algumas vezes inspira pesquisas?", "Você faria um meme com isso?", "Pode ser lembrado em datas especiais?",
            "Algumas vezes é mencionado em histórias familiares?", "Se isso fosse uma comida, qual seria?", "É algo que desperta atenção coletiva?",
            "Algumas vezes precisa de prevenção contínua?", "Essa palavra combina com sol ou chuva?", "Se isso fosse uma estação do ano, qual seria?"],
        remedios: ["É algo que se encontra em casa?", "Você usaria isso numa conversa com um alienígena?", "É usado para dor?",
            "Precisa de receita?", "Se isso tivesse cheiro, seria doce ou azedo?", "É em comprimido ou líquido?",
            "Alivia sintomas rápido?", "Essa palavra seria um bom nome de banda?", "Pode causar efeitos colaterais?",
            "Algumas pessoas tentam evitar?", "Você usaria isso num meme?", "Pode ser tema de conversa?",
            "Pode aparecer em qualquer lugar do mundo?", "Se isso fosse uma música, qual seria o ritmo?", "É algo que já ouviu falar em notícias?",
            "Pode ter diferentes nomes em diferentes lugares?", "Essa palavra combina mais com verão ou inverno?", "Algumas vezes pode ser silencioso?",
            "É algo que gera curiosidade?", "Essa palavra poderia ser uma tendência do TikTok?", "Algumas vezes aparece em séries ou filmes?",
            "Se isso fosse um superpoder, qual seria?", "Pode causar preocupação?", "Algumas vezes é prevenível?",
            "Pode ser considerado sério por alguns?", "Essa palavra combina com festa ou trabalho?", "Pode se manifestar de forma súbita?",
            "Algumas vezes precisa de acompanhamento?", "Se isso tivesse sabor, seria doce ou salgado?", "Pode ser percebido de forma indireta?",
            "É algo que inspira cuidados?", "Essa palavra poderia ser usada como senha?", "Algumas vezes pode ser confuso identificar?",
            "Pode ser objeto de estudo?", "Se isso fosse um lugar, seria tranquilo ou caótico?", "Algumas vezes é citado em revistas ou jornais?",
            "É algo que todos podem ter opinião?", "Essa palavra seria usada em redes sociais?", "Pode provocar mudanças na vida de alguém?",
            "Pode se espalhar de forma lenta ou rápida?", "Você explicaria isso para uma criança?", "Algumas vezes provoca mudanças na rotina?",
            "Pode ser lembrado por histórias de outros?", "Essa palavra poderia ser um tema viral na internet?", "É algo que gera atenção da família?",
            "Algumas vezes pode ser temporário ou permanente?", "Se isso fosse um objeto, seria grande ou pequeno?", "Pode ser tema de discussão em escolas ou cursos?",
            "Algumas vezes deixa marcas ou lembranças?", "Essa palavra combina com tecnologia ou natureza?", "É algo que faz parte da experiência humana?",
            "Algumas vezes inspira pesquisas?", "Você faria um meme com isso?", "Pode ser lembrado em datas especiais?",
            "Algumas vezes é mencionado em histórias familiares?", "Se isso fosse uma comida, qual seria?", "É algo que desperta atenção coletiva?",
            "Algumas vezes precisa de prevenção contínua?", "Essa palavra combina com sol ou chuva?", "Se isso fosse uma estação do ano, qual seria?"]
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