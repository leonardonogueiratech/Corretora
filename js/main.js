/**
 * IZAMED CORRETORA - JavaScript Principal
 * Navegacao, FAQ, Formulario e Interacoes
 */

(function($) {
    'use strict';

    // =========================================
    // HEADER & NAVIGATION
    // =========================================

    const $header = $('#header');
    const $nav = $('#nav');
    const $menuToggle = $('#menuToggle');
    const $navLinks = $('.nav-link');

    // Scroll effect on header
    function handleScroll() {
        if ($(window).scrollTop() > 50) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    }

    // Mobile menu toggle
    $menuToggle.on('click', function() {
        $(this).toggleClass('active');
        $nav.toggleClass('active');
        $(this).attr('aria-expanded', $nav.hasClass('active'));
    });

    // Close mobile menu on link click
    $navLinks.on('click', function() {
        $menuToggle.removeClass('active');
        $nav.removeClass('active');
        $menuToggle.attr('aria-expanded', 'false');
    });

    // Smooth scroll to sections
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 600);
        }
    });

    // Update active nav link
    function updateActiveNavLink() {
        const scrollPos = $(window).scrollTop() + 100;

        $('section[id]').each(function() {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionHeight = section.outerHeight();
            const sectionId = section.attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                $navLinks.removeClass('active');
                $navLinks.filter('[href="#' + sectionId + '"]').addClass('active');
            }
        });
    }

    // =========================================
    // HERO CAROUSEL
    // =========================================

    const $slides = $('.carousel-slide');
    const $indicators = $('.indicator');
    const $prevBtn = $('.carousel-prev');
    const $nextBtn = $('.carousel-next');
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 segundos

    function showSlide(index) {
        // Limita o indice
        if (index >= $slides.length) index = 0;
        if (index < 0) index = $slides.length - 1;

        currentSlide = index;

        // Atualiza slides
        $slides.removeClass('active');
        $slides.eq(currentSlide).addClass('active');

        // Atualiza indicadores
        $indicators.removeClass('active');
        $indicators.eq(currentSlide).addClass('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideDelay);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners do carrossel
    $nextBtn.on('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    $prevBtn.on('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    $indicators.on('click', function() {
        stopAutoSlide();
        const index = $(this).data('slide');
        showSlide(index);
        startAutoSlide();
    });

    // Pausar autoplay no hover
    $('.hero-carousel').on('mouseenter', stopAutoSlide);
    $('.hero-carousel').on('mouseleave', startAutoSlide);

    // Suporte a teclado
    $(document).on('keydown', function(e) {
        if ($('.hero-carousel').is(':visible')) {
            if (e.key === 'ArrowLeft') {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            }
        }
    });

    // Suporte a touch/swipe
    let touchStartX = 0;
    let touchEndX = 0;

    $('.hero-carousel').on('touchstart', function(e) {
        touchStartX = e.originalEvent.changedTouches[0].screenX;
    });

    $('.hero-carousel').on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            stopAutoSlide();
            if (diff > 0) {
                nextSlide(); // Swipe left = proximo
            } else {
                prevSlide(); // Swipe right = anterior
            }
            startAutoSlide();
        }
    }

    // Iniciar autoplay
    if ($slides.length > 0) {
        startAutoSlide();
    }

    // =========================================
    // FAQ ACCORDION
    // =========================================

    $('.faq-question').on('click', function() {
        const $item = $(this).closest('.faq-item');
        const isActive = $item.hasClass('active');

        // Close all
        $('.faq-item').removeClass('active');

        // Toggle current
        if (!isActive) {
            $item.addClass('active');
        }
    });

    // =========================================
    // OPERATORS
    // =========================================

    const operatorsData = {
        bradesco: {
            name: 'Bradesco Saude',
            description: 'O plano de saude Bradesco esta presente em todo o Brasil desde 1984, oferecendo ampla rede referenciada com os melhores hospitais, clinicas e laboratorios.',
            highlights: [
                'Cobertura nacional',
                'Rede credenciada premium',
                'Bradesco Dental incluso em alguns planos',
                'Clube de vantagens com descontos'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        },
        unimed: {
            name: 'Unimed',
            description: 'A Unimed-BH conta com a maior e melhor rede de atendimento do estado. Sao mais de 350 hospitais, clinicas e laboratorios credenciados.',
            highlights: [
                'Maior rede de Minas Gerais',
                'Mais de 5 mil medicos cooperados',
                'Unipart Flex e Unimed Pleno',
                'Servicos proprios de qualidade'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        },
        amil: {
            name: 'Amil',
            description: 'Uma das maiores operadoras do Brasil, a Amil oferece planos completos com ampla rede credenciada e atendimento de excelencia.',
            highlights: [
                'Presente em todo Brasil',
                'Rede credenciada de alto padrao',
                'Programas de promocao a saude',
                'Atendimento 24 horas'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        },
        sulamerica: {
            name: 'SulAmerica',
            description: 'Com mais de 125 anos de historia, a SulAmerica oferece planos de saude com ampla cobertura e qualidade reconhecida.',
            highlights: [
                'Tradicao e solidez',
                'Rede credenciada nacional',
                'Reembolso facilitado',
                'App para gestao do plano'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        },
        golden: {
            name: 'Golden Cross',
            description: 'A Golden Cross oferece planos de saude com tradicao e qualidade, com rede credenciada em todo o territorio nacional.',
            highlights: [
                'Tradicao no mercado',
                'Cobertura nacional',
                'Planos flexiveis',
                'Atendimento humanizado'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        },
        promed: {
            name: 'Promed',
            description: 'A Promed oferece planos de saude com excelente custo-beneficio e atendimento de qualidade em Minas Gerais.',
            highlights: [
                'Precos acessiveis',
                'Rede regional de qualidade',
                'Atendimento personalizado',
                'Planos empresariais'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        },
        odontoprev: {
            name: 'OdontoPrev',
            description: 'Lider em odontologia no Brasil, a OdontoPrev oferece planos odontologicos completos com a maior rede de dentistas do pais.',
            highlights: [
                'Lider no mercado odontologico',
                'Maior rede de dentistas',
                'Planos a partir de R$ 20',
                'Cobertura completa'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Tratamentos 60 dias'
        },
        portoseguro: {
            name: 'Porto Seguro Odonto',
            description: 'A Porto Seguro oferece planos odontologicos com ampla rede de dentistas e diversas opcoes de cobertura.',
            highlights: [
                'Marca confiavel',
                'Ampla rede credenciada',
                'Planos sem carencia',
                'Atendimento 24 horas'
            ],
            carencia: 'Variavel conforme plano escolhido'
        },
        sistema: {
            name: 'Saude Sistema',
            description: 'O Saude Sistema oferece planos de saude com atendimento regional de qualidade em Minas Gerais.',
            highlights: [
                'Atendimento regional',
                'Precos competitivos',
                'Rede credenciada local',
                'Atendimento humanizado'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        },
        goodlife: {
            name: 'Goodlife',
            description: 'A Goodlife oferece planos de saude com foco em qualidade de atendimento e satisfacao do cliente.',
            highlights: [
                'Bom custo-beneficio',
                'Rede credenciada selecionada',
                'Atendimento personalizado',
                'Planos flexiveis'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        },
        vivamed: {
            name: 'Vivamed',
            description: 'A Vivamed oferece planos de saude com atendimento de qualidade e precos acessiveis.',
            highlights: [
                'Precos acessiveis',
                'Atendimento de qualidade',
                'Rede regional',
                'Planos para familias'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        },
        allianz: {
            name: 'Allianz Saude',
            description: 'A Allianz e uma seguradora internacional que oferece planos de saude com excelente cobertura e servicos diferenciados.',
            highlights: [
                'Seguradora internacional',
                'Ampla cobertura',
                'Servicos diferenciados',
                'Atendimento global'
            ],
            carencia: 'Urgencia 24h, Consultas 30 dias, Internacoes 180 dias, Parto 300 dias'
        }
    };

    const $operatorDetails = $('#operatorDetails');
    const $detailsContent = $operatorDetails.find('.operator-details-content');

    $('.operator-card').on('click', function() {
        const operator = $(this).data('operator');
        const data = operatorsData[operator];

        if (data) {
            let highlightsHtml = data.highlights.map(h => `<li>${h}</li>`).join('');

            $detailsContent.html(`
                <h3>${data.name}</h3>
                <p>${data.description}</p>
                <h4>Destaques:</h4>
                <ul>${highlightsHtml}</ul>
                <p><strong>Carencia:</strong> ${data.carencia}</p>
                <a href="https://api.whatsapp.com/send?phone=5531999198567&text=Gostaria de uma cotacao do plano ${data.name}!" class="btn btn-primary" target="_blank" rel="noopener">
                    Solicitar Cotacao
                </a>
            `);

            $operatorDetails.addClass('active');

            // Scroll to details
            $('html, body').animate({
                scrollTop: $operatorDetails.offset().top - 100
            }, 400);
        }
    });

    $('.close-details').on('click', function() {
        $operatorDetails.removeClass('active');
    });

    // =========================================
    // CONTACT FORM
    // =========================================

    const $contactForm = $('#contactForm');

    // Phone mask
    $('#phone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');

        if (value.length > 11) {
            value = value.substring(0, 11);
        }

        if (value.length > 0) {
            if (value.length <= 2) {
                value = '(' + value;
            } else if (value.length <= 7) {
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
            } else {
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
            }
        }

        $(this).val(value);
    });

    // Form validation
    function validateField($field) {
        const value = $field.val().trim();
        const type = $field.attr('type');
        let isValid = true;

        if ($field.prop('required') && !value) {
            isValid = false;
        }

        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }

        if (isValid) {
            $field.removeClass('error');
        } else {
            $field.addClass('error');
        }

        return isValid;
    }

    $contactForm.find('input, textarea').on('blur', function() {
        validateField($(this));
    });

    $contactForm.on('submit', function(e) {
        e.preventDefault();

        // Check honeypot
        if ($('input[name="botcheck"]').is(':checked')) {
            return;
        }

        // Validate all fields
        let isFormValid = true;
        $contactForm.find('input[required], textarea[required]').each(function() {
            if (!validateField($(this))) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        const $submitBtn = $contactForm.find('button[type="submit"]');
        const originalText = $submitBtn.text();

        $submitBtn.prop('disabled', true).text('Enviando...');

        const formData = new FormData($contactForm[0]);

        fetch($contactForm.attr('action'), {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                $contactForm[0].reset();
                showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            } else {
                showMessage(data.message || 'Erro ao enviar mensagem. Tente novamente.', 'error');
            }
        })
        .catch(error => {
            showMessage('Erro de conexao. Tente novamente ou entre em contato pelo WhatsApp.', 'error');
        })
        .finally(() => {
            $submitBtn.prop('disabled', false).text(originalText);
        });
    });

    function showMessage(text, type) {
        const $message = $('<div class="form-message"></div>')
            .addClass(type)
            .text(text)
            .css({
                padding: '1rem',
                marginTop: '1rem',
                borderRadius: '0.5rem',
                background: type === 'success' ? '#dcfce7' : '#fee2e2',
                color: type === 'success' ? '#166534' : '#dc2626'
            });

        $contactForm.find('.form-message').remove();
        $contactForm.append($message);

        setTimeout(function() {
            $message.fadeOut(300, function() {
                $(this).remove();
            });
        }, 5000);
    }

    // =========================================
    // INIT
    // =========================================

    $(window).on('scroll', handleScroll);
    handleScroll();

    // Keyboard navigation for FAQ
    $('.faq-question').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // Close mobile menu on escape
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $nav.hasClass('active')) {
            $menuToggle.removeClass('active');
            $nav.removeClass('active');
            $menuToggle.attr('aria-expanded', 'false');
        }
    });

})(jQuery);
