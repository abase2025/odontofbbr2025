// Script para funcionalidades interativas do site

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Botão voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animação de entrada para os cards
    const cards = document.querySelectorAll('.card, .resumo-card');
    
    if (cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
    
    // Efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Adicionar botão de retorno em todas as páginas internas
    const isInternalPage = !document.querySelector('.hero');
    
    if (isInternalPage) {
        const returnButton = document.createElement('a');
        returnButton.href = 'index.html';
        returnButton.className = 'btn btn-primary return-button';
        returnButton.innerHTML = '<i class="fas fa-arrow-left"></i> Voltar ao Início';
        
        const mainContent = document.querySelector('main') || document.querySelector('section');
        if (mainContent) {
            mainContent.insertAdjacentElement('afterbegin', returnButton);
        }
    }
});
