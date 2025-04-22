// Contador regressivo
document.addEventListener('DOMContentLoaded', function() {
    // Contador regressivo
    function startCountdown() {
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        let hours = parseInt(hoursElement.textContent);
        let minutes = parseInt(minutesElement.textContent);
        let seconds = parseInt(secondsElement.textContent);
        
        const countdownInterval = setInterval(function() {
            seconds--;
            
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    
                    if (hours < 0) {
                        clearInterval(countdownInterval);
                        hours = 0;
                        minutes = 0;
                        seconds = 0;
                    }
                }
            }
            
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }
    
    // Iniciar o contador
    startCountdown();
    
    // Slider de depoimentos
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        // Esconder todos os depoimentos
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Desativar todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar o depoimento atual
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Event listeners para os botões de navegação
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonialCards.length - 1;
            }
            showTestimonial(newIndex);
        });
        
        nextButton.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialCards.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Alternar automaticamente os depoimentos a cada 5 segundos
    setInterval(function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialCards.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 5000);
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar o estado do item atual
            item.classList.toggle('active');
        });
    });
    
    // Animação de scroll suave para links internos
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de elementos ao rolar a página
    function animateOnScroll() {
        const elements = document.querySelectorAll('.problem-card, .content-card, .testimonial-slider, .guarantee-content, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Aplicar estilo inicial aos elementos que serão animados
    const animatedElements = document.querySelectorAll('.problem-card, .content-card, .testimonial-slider, .guarantee-content, .pricing-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    // Executar a animação ao carregar a página e ao rolar
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Adicionar efeito de destaque aos campos de preço
    const priceElements = document.querySelectorAll('.price, .price-total');
    
    priceElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Adicionar efeito de destaque ao botão de CTA ao rolar para o final da página
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const pageHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        
        // Se o usuário rolou mais de 70% da página
        if (scrollPosition > (pageHeight - windowHeight) * 0.7) {
            const ctaButtons = document.querySelectorAll('.cta-button');
            
            ctaButtons.forEach(button => {
                button.classList.add('pulse');
            });
        }
    });
    
    // Adicionar notificação de urgência após algum tempo na página
    setTimeout(function() {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification';
        notificationContainer.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-bell"></i>
                <p>Últimas 5 vagas disponíveis! Não perca esta oportunidade.</p>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        document.body.appendChild(notificationContainer);
        
        // Estilizar a notificação
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                animation: slideIn 0.5s forwards;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                padding: 15px 20px;
            }
            
            .notification-content i {
                color: #ff6b2b;
                font-size: 1.5rem;
                margin-right: 15px;
            }
            
            .notification-content p {
                margin: 0;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                margin-left: 15px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Fechar a notificação ao clicar no botão
        const closeButton = notificationContainer.querySelector('.notification-close');
        closeButton.addEventListener('click', function() {
            notificationContainer.style.display = 'none';
        });
    }, 30000); // Mostrar após 30 segundos
});

// Adicionar efeito de destaque ao passar o mouse sobre os cards
const cards = document.querySelectorAll('.problem-card, .content-card');

cards.forEach(card => {
    card.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Adicionar contador de pessoas visualizando a página
function addViewersCounter() {
    const viewersContainer = document.createElement('div');
    viewersContainer.className = 'viewers-counter';
    
    // Gerar um número aleatório entre 20 e 50
    const randomViewers = Math.floor(Math.random() * 31) + 20;
    
    viewersContainer.innerHTML = `
        <div class="viewers-content">
            <i class="fas fa-eye"></i>
            <p>${randomViewers} pessoas estão visualizando esta página agora</p>
        </div>
    `;
    
    // Estilizar o contador
    const style = document.createElement('style');
    style.textContent = `
        .viewers-counter {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background-color: rgba(46, 88, 255, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 0.9rem;
            z-index: 1000;
        }
        
        .viewers-content {
            display: flex;
            align-items: center;
        }
        
        .viewers-content i {
            margin-right: 10px;
        }
        
        .viewers-content p {
            margin: 0;
        }
        
        @media (max-width: 768px) {
            .viewers-counter {
                bottom: 10px;
                left: 10px;
                font-size: 0.8rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(viewersContainer);
    
    // Atualizar o número a cada 30 segundos
    setInterval(function() {
        const newViewers = Math.floor(Math.random() * 31) + 20;
        viewersContainer.querySelector('p').textContent = `${newViewers} pessoas estão visualizando esta página agora`;
    }, 30000);
}

// Adicionar o contador após 5 segundos
setTimeout(addViewersCounter, 5000);
