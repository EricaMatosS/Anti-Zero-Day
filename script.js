/* ==========================================================================
   1. SELETORES E VARIÁVEIS GLOBAIS
   ========================================================================== */
const htmlElement = document.documentElement;
const toggleSwitch = document.querySelector('#checkbox');
const themeIcon = document.getElementById('theme-icon');

// Elementos de Autenticação
const authBtn = document.getElementById('auth-btn');
const authForm = document.getElementById('auth-form');

// Elementos do Chat/Missões
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const btnAcao = document.getElementById('btn-acao');

/* ==========================================================================
   2. SISTEMA DE TEMA (DARK/LIGHT MODE)
   ========================================================================== */
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (toggleSwitch) {
        toggleSwitch.checked = (savedTheme === 'dark');
        toggleSwitch.addEventListener('change', handleThemeChange);
    }
    updateIcon(savedTheme);
};

const handleThemeChange = (e) => {
    const targetTheme = e.target.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateIcon(targetTheme);
};

const updateIcon = (theme) => {
    if (themeIcon) {
        themeIcon.innerText = (theme === 'dark') ? '☀️' : '🌙';
    }
};

/* ==========================================================================
   3. LÓGICA DE AUTENTICAÇÃO (LOGIN/CADASTRO)
   ========================================================================== */
let isLoginMode = true;

function alternarTela() {
    isLoginMode = !isLoginMode;
    
    const elements = {
        title: document.getElementById('auth-title'),
        subtitle: document.getElementById('auth-subtitle'),
        btnText: document.getElementById('btn-text'),
        toggleMsg: document.getElementById('toggle-msg'),
        nameGroup: document.getElementById('name-group')
    };

    if (isLoginMode) {
        elements.title.innerText = "Welcome friend!";
        elements.subtitle.innerText = "Faça login para iniciar seus estudos.";
        elements.btnText.innerText = "Entrar";
        elements.toggleMsg.innerHTML = 'Ainda não tem uma conta? <span class="toggle-link" onclick="alternarTela()">Criar agora</span>';
        if (elements.nameGroup) elements.nameGroup.style.display = "none";
    } else {
        elements.title.innerText = "Join us!";
        elements.subtitle.innerText = "Crie sua conta e vença a procrastinação.";
        elements.btnText.innerText = "Cadastrar";
        elements.toggleMsg.innerHTML = 'Já tem uma conta? <span class="toggle-link" onclick="alternarTela()">Fazer Login</span>';
        if (elements.nameGroup) elements.nameGroup.style.display = "block";
    }
}

function executarAcao() {
    if (!authBtn) return;
    
    authBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
        authBtn.style.transform = "scale(1)";
        window.location.href = "index.html"; 
    }, 200);
}

/* ==========================================================================
   4. LÓGICA DO CHAT E MISSÕES
   ========================================================================== */
const missions = [
    { question: "How do you say 'maçã' in English?", answer: "apple" },
    { question: "Complete: I ___ a student.", answer: "am" },
    { question: "What is the opposite of 'hot'?", answer: "cold" }
];

let currentMissionIndex = 0;

function addMessage(text, sender) {
    if (!chatBox) return;
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleResponse() {
    const text = userInput.value.trim().toLowerCase();
    if (!text) return;

    addMessage(userInput.value, 'user');
    userInput.value = '';

    if (text === missions[currentMissionIndex].answer) {
        addMessage("Correct! 🌟 Let's go to the next one.", 'bot');
        currentMissionIndex++;
        
        if (currentMissionIndex < missions.length) {
            setTimeout(() => addMessage(missions[currentMissionIndex].question, 'bot'), 1000);
        } else {
            addMessage("Congratulations! You completed all missions! 🎉", 'bot');
        }
    } else {
        addMessage("Not quite. Try again! You can do it.", 'bot');
    }
}

/* ==========================================================================
   5. ANIMAÇÃO DE SUCESSO (CONFETES)
   ========================================================================== */
function completarTarefa() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        colors: ['#6366f1', '#a855f7', '#ffffff']
    };

    const fire = (particleRatio, opts) => {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });

    if (btnAcao) {
        const textoOriginal = btnAcao.querySelector('span');
        const originalText = textoOriginal.innerText;

        textoOriginal.innerText = "Tarefa Concluída! 🎉";
        btnAcao.style.background = "#22c55e";

        setTimeout(() => {
            textoOriginal.innerText = originalText;
            btnAcao.style.background = "var(--primary-gradient)";
        }, 3000);
    }
}

/* ==========================================================================
   6. INICIALIZAÇÃO DE EVENTOS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    if (sendBtn) sendBtn.addEventListener('click', handleResponse);
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleResponse();
        });
    }
});