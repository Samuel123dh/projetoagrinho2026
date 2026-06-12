// Dados das perguntas e impactos
const perguntas = [
    {
        texto: "🍔 Como é sua alimentação?",
        opcoes: [
            { texto: "Fast food / Industrializados", agua: 1500, solo: 2.5, impacto: 80 },
            { texto: "Caseira / Restaurante comum", agua: 800, solo: 1.2, impacto: 40 },
            { texto: "Saudável / Orgânica / Local", agua: 300, solo: 0.5, impacto: 15 }
        ]
    },
    {
        texto: "🚿 Quanto tempo você gasta no banho?",
        opcoes: [
            { texto: "5 minutos (rápido)", agua: 60, solo: 0.1, impacto: 5 },
            { texto: "10 minutos (normal)", agua: 120, solo: 0.2, impacto: 15 },
            { texto: "20 minutos ou mais", agua: 240, solo: 0.4, impacto: 30 }
        ]
    },
    {
        texto: "👕 Como é seu consumo de roupas?",
        opcoes: [
            { texto: "Compro sempre (fast fashion)", agua: 2000, solo: 1.5, impacto: 70 },
            { texto: "Compro às vezes", agua: 800, solo: 0.6, impacto: 30 },
            { texto: "Só quando preciso (durável)", agua: 300, solo: 0.2, impacto: 10 }
        ]
    },
    {
        texto: "🛒 Onde você prefere comprar?",
        opcoes: [
            { texto: "Grandes redes / Industrializado", agua: 500, solo: 0.8, impacto: 40 },
            { texto: "Mercado local / Regional", agua: 200, solo: 0.3, impacto: 15 },
            { texto: "Feira orgânica / Produtor direto", agua: 80, solo: 0.1, impacto: 5 }
        ]
    },
    {
        texto: "📱 Quanto tempo de tela por dia?",
        opcoes: [
            { texto: "Mais de 8 horas", agua: 100, solo: 0.3, impacto: 25 },
            { texto: "4 a 8 horas", agua: 50, solo: 0.15, impacto: 12 },
            { texto: "Menos de 4 horas", agua: 20, solo: 0.05, impacto: 5 }
        ]
    }
];

let respostasUsuario = [];
let perguntaIndex = 0;
let totalAgua = 0;
let totalSolo = 0;
let totalImpacto = 0;

// Funções de navegação
function proximaTela() {
    document.getElementById('tela1').classList.remove('ativa');
    document.getElementById('tela2').classList.add('ativa');
    iniciarPerguntas();
}

function iniciarPerguntas() {
    perguntaIndex = 0;
    respostasUsuario = [];
    totalAgua = 0;
    totalSolo = 0;
    totalImpacto = 0;
    mostrarPergunta();
}

function mostrarPergunta() {
    if (perguntaIndex >= perguntas.length) {
        calcularResultado();
        return;
    }
    
    const pergunta = perguntas[perguntaIndex];
    document.getElementById('perguntaAtual').textContent = perguntaIndex + 1;
    document.getElementById('perguntaTexto').textContent = pergunta.texto;
    
    const opcoesContainer = document.getElementById('opcoesContainer');
    opcoesContainer.innerHTML = '';
    
    pergunta.opcoes.forEach((opcao, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opcao-btn';
        btn.textContent = opcao.texto;
        btn.onclick = () => selecionarOpcao(idx);
        opcoesContainer.appendChild(btn);
    });
}

function selecionarOpcao(opcaoIndex) {
    const pergunta = perguntas[perguntaIndex];
    const opcao = pergunta.opcoes[opcaoIndex];
    
    respostasUsuario.push({
        pergunta: pergunta.texto,
        opcao: opcao.texto,
        agua: opcao.agua,
        solo: opcao.solo,
        impacto: opcao.impacto
    });
    
    totalAgua += opcao.agua;
    totalSolo += opcao.solo;
    totalImpacto += opcao.impacto;
    
    perguntaIndex++;
    mostrarPergunta();
}

function calcularResultado() {
    document.getElementById('tela2').classList.remove('ativa');
    document.getElementById('tela3').classList.add('ativa');
    
    // Atualiza números
    document.getElementById('aguaTotal').textContent = totalAgua.toLocaleString();
    document.getElementById('soloTotal').textContent = totalSolo.toFixed(1);
    document.getElementById('impactoTotal').textContent = totalImpacto;
    
    // Visual baseado no impacto
    const resultadoVisual = document.getElementById('resultadoVisual');
    let mensagem = '';
    
    if (totalImpacto < 50) {
        resultadoVisual.className = 'resultado-visual verde';
        resultadoVisual.innerHTML = '🌱🌿🌻';
        mensagem = '🌱 PARABÉNS! Seu impacto é BAIXO. Você ajuda o meio ambiente! Mantenha hábitos sustentáveis.';
    } else if (totalImpacto < 100) {
        resultadoVisual.className = 'resultado-visual amarelo';
        resultadoVisual.innerHTML = '🌾⚠️🌾';
        mensagem = '⚠️ Seu impacto é MÉDIO. Você pode melhorar! Pequenas mudanças fazem diferença.';
    } else {
        resultadoVisual.className = 'resultado-visual cinza';
        resultadoVisual.innerHTML = '🌫️🏭🌫️';
        mensagem = '🔴 Seu impacto é ALTO! Seu estilo de vida pressiona diretamente o agro. Hora de mudar!';
    }
    
    document.getElementById('mensagemImpacto').innerHTML = `
        <strong>📊 Análise:</strong><br>
        Você consumiu aproximadamente ${totalAgua.toLocaleString()} litros de água.<br>
        Seu estilo de vida pressiona diretamente o campo e o solo.<br><br>
        <em>"${totalImpacto > 80 ? 'Você não vive no campo... mas suas escolhas controlam o campo.' : 'Pequenas escolhas podem gerar grandes impactos positivos!'}"</em>
    `;
}

function irParaTela4() {
    document.getElementById('tela3').classList.remove('ativa');
    document.getElementById('tela4').classList.add('ativa');
}

function refazerEscolhas() {
    document.getElementById('tela4').classList.remove('ativa');
    document.getElementById('tela1').classList.add('ativa');
    respostasUsuario = [];
    perguntaIndex = 0;
    totalAgua = 0;
    totalSolo = 0;
    totalImpacto = 0;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('totalPerguntas').textContent = perguntas.length;
});