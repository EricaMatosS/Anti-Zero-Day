//Funcionalidades: Alternância de Login, Efeito 3D, Confetes e Mascote Vivo
 
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza a data automaticamente na página de desafios
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.innerText = new Intl.DateTimeFormat('pt-BR', { 
            day: 'numeric', month: 'long', year: 'numeric' 
        }).format(new Date());
    }
});

// --- 2. LÓGICA DE LOGIN / CADASTRO ---
let modoLogin = true;

function alternarTela() {
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const btnSpan = document.querySelector('.btn-premium span');
    const toggleMsg = document.getElementById('toggle-msg');

    if (!title) return; // Segurança caso a função seja chamada na página errada

    modoLogin = !modoLogin;

    if (!modoLogin) {
        title.innerText = "Join Us!";
        if (subtitle) subtitle.innerText = "Crie sua conta e comece agora.";
        if (btnSpan) btnSpan.innerText = "Cadastrar";
        toggleMsg.innerHTML = 'Já tem uma conta? <span class="toggle-link" onclick="alternarTela()" style="color: #6366f1; cursor: pointer; font-weight: 600;">Fazer Login</span>';
    } else {
        title.innerText = "Welcome Back!";
        if (subtitle) subtitle.innerText = "Faça login para continuar seus estudos.";
        if (btnSpan) btnSpan.innerText = "Entrar";
        toggleMsg.innerHTML = 'Ainda não tem uma conta? <span class="toggle-link" onclick="alternarTela()" style="color: #6366f1; cursor: pointer; font-weight: 600;">Criar agora</span>';
    }
}

function simularLogin() {
    const btn = document.querySelector('.btn-premium');
    if (btn) {
        const span = btn.querySelector('span');
        if (span) span.innerText = "Carregando...";
        btn.style.opacity = "0.7";
        
        setTimeout(() => {
            window.location.href = "index.html"; // Redireciona para os desafios
        }, 1000);
    }
}

// --- 3. ANIMAÇÃO DE CONCLUSÃO (CONFITES E 3D) ---
function completarTarefa() {
    const btn = document.getElementById('btn-acao');
    const avatar = document.getElementById('avatar');
    const card = document.querySelector('.glass-container');

    if (!btn) return;

    // Feedback no botão
    btn.disabled = true;
    btn.style.opacity = "0.8";
    const span = btn.querySelector('span');
    if (span) span.innerText = "Missão Concluída ✓";

    // Explosão de Confetes 
    if (typeof confetti === 'function') {
        const count = 200;
        const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    }

    // Efeito 3D no Card e Mascote
    if (card) {
        card.style.transition = "transform 0.5s ease";
        card.style.transform = "scale(1.02) rotateX(5deg)";
        setTimeout(() => card.style.transform = "scale(1) rotateX(0deg)", 500);
    }

    if (avatar) {
        avatar.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        avatar.style.transform = "scale(1.5) translateY(-30px) rotate(10deg)";
        
        setTimeout(() => {
            avatar.style.transform = "scale(1) translateY(0) rotate(0deg)";
        }, 700);
    }
}

// --- 4. INTERATIVIDADE DO MASCOTE (SEGUIR MOUSE) ---
document.addEventListener('mousemove', (e) => {
    // Tenta encontrar o avatar em qualquer uma das páginas
    const avatar = document.getElementById('avatar') || document.getElementById('avatar-login');
    
    if (avatar) {
        const x = (window.innerWidth / 2 - e.pageX) / 45;
        const y = (window.innerHeight / 2 - e.pageY) / 45;
        
        // Aplica o movimento suave sem cancelar a animação de flutuar do CSS
        avatar.style.translate = `${-x}px ${-y}px`;
    }
});
