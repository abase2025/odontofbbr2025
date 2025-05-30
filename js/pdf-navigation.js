// Script aprimorado para garantir botão de retorno em todos os PDFs

// Função para injetar o botão de retorno em visualizadores de PDF
function injetarBotaoRetorno() {
    // Verificar se estamos em uma página que exibe PDF
    if (window.location.href.includes('.pdf')) {
        console.log("Detectado PDF: Injetando botão de retorno...");
        
        // Criar elemento de estilo para o botão
        const style = document.createElement('style');
        style.textContent = `
            .pdf-return-button {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 9999;
                background: linear-gradient(45deg, #4e54c8, #43cea2);
                color: white !important;
                padding: 12px 25px;
                border-radius: 50px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Arial', sans-serif;
                font-weight: bold;
                font-size: 14px;
                text-decoration: none !important;
                display: flex;
                align-items: center;
                gap: 8px;
                border: none;
            }
            
            .pdf-return-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            }
            
            .pdf-return-button i {
                font-size: 16px;
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar FontAwesome se não estiver presente
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesome = document.createElement('link');
            fontAwesome.rel = 'stylesheet';
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            document.head.appendChild(fontAwesome);
        }
        
        // Verificar se o botão já existe para evitar duplicação
        if (!document.querySelector('.pdf-return-button')) {
            // Criar o botão de retorno
            const botaoRetorno = document.createElement('a');
            botaoRetorno.className = 'pdf-return-button';
            botaoRetorno.href = '/index.html';
            botaoRetorno.innerHTML = '<i class="fas fa-home"></i> Voltar ao Início';
            
            // Adicionar ao corpo do documento
            document.body.appendChild(botaoRetorno);
            
            console.log("Botão de retorno adicionado com sucesso!");
        }
    }
}

// Executar quando o documento estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injetarBotaoRetorno);
} else {
    injetarBotaoRetorno();
}

// Também tentar injetar após um pequeno atraso para garantir que funcione em diferentes visualizadores de PDF
setTimeout(injetarBotaoRetorno, 1000);

// Tentar novamente após carregamento completo da página
window.addEventListener('load', injetarBotaoRetorno);

// Monitorar mudanças na URL para PDFs carregados dinamicamente
let lastUrl = location.href; 
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        injetarBotaoRetorno();
    }
}).observe(document, {subtree: true, childList: true});

// Verificar periodicamente para garantir que o botão esteja presente
setInterval(injetarBotaoRetorno, 3000);
