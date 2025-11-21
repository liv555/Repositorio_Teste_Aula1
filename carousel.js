document.addEventListener("DOMContentLoaded", () => {
    
    // --- CÓDIGO DO CARROSSEL (Lógica de Eventos) ---
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-item-js");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const indicators = document.querySelectorAll(".carousel-indicators-js span");

    if (track && slides.length > 0) {
        let index = 0;
        const total = slides.length;

        track.style.width = `${total * 100}%`;

        function updateCarousel() {
            track.style.transform = `translateX(-${index * 100}%)`;
            indicators.forEach(i => i.classList.remove("active"));
            if (indicators[index]) {
                indicators[index].classList.add("active");
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                index = (index + 1) % total;
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                index = (index - 1 + total) % total;
                updateCarousel();
            });
        }

        indicators.forEach(dot => {
            dot.addEventListener("click", () => {
                index = Number(dot.dataset.slide);
                updateCarousel();
            });
        });

        updateCarousel();
    }
    // --- FIM CÓDIGO DO CARROSSEL ---

    // --- CÓDIGO DO CUPOM (Lógica de Eventos) ---
    const input = document.getElementById('coupon-input');
    const button = document.getElementById('apply-button');
    const message = document.getElementById('coupon-message');

    if (input && button && message) {
        
        // ANEXA O EVENTO DE CLIQUE AO BOTÃO (Isso é executado apenas quando o DOM está pronto)
        button.addEventListener('click', function() {
            if (!button.disabled) {
                
                // 1. Exibe a mensagem "Cupom Aplicado"
                message.textContent = 'Cupom Aplicado!';
                
                // 2. Desabilita o campo e o botão 
                input.disabled = true;
                button.disabled = true;
                button.classList.remove('coupon-active'); 
                input.classList.add('coupon-input-active'); 
                
                // 3. Remove a mensagem após 5 segundos
                setTimeout(() => {
                    message.textContent = '';
                }, 5000); 
            }
        });

        // Chama a função global para definir o estado inicial (botão cinza/desabilitado)
        // Isso é importante para que o botão comece desabilitado mesmo sem digitar nada
        checkCouponInput();

    } else {
        console.warn('Alerta: Elementos do cupom não encontrados. Verifique os IDs no HTML.');
    }
    // --- FIM CÓDIGO DO CUPOM (Chamadas de Evento) ---

}); // Fecha o DOMContentLoaded


// ----------------------------------------------------
// FUNÇÃO GLOBAL: Chamada pelo atributo oninput="" do HTML
// ----------------------------------------------------
/**
 * Esta função precisa ser global (definida fora do DOMContentLoaded) para ser
 * acessada diretamente pelo HTML via oninput="checkCouponInput()".
 */
function checkCouponInput() {
    const input = document.getElementById('coupon-input');
    const button = document.getElementById('apply-button');
    const message = document.getElementById('coupon-message');
    
    // Certifica-se de que os elementos existem
    if (!input || !button || !message) return;

    if (input.value.trim().length > 0) {
        // Habilita o botão (o evento de clique só funciona se não estiver disabled)
        button.disabled = false;
        button.classList.add('coupon-active');
        input.classList.add('coupon-input-active');
    } else {
        // Desabilita o botão
        button.disabled = true;
        button.classList.remove('coupon-active');
        input.classList.remove('coupon-input-active');
        message.textContent = '';
    }
}