/**
 * ==========================================================================
 * AC TRANSPORTE EXECUTIVO - INTERATIVIDADE (JAVASCRIPT PURO)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
  
  /* ------------------------------------------------------------------------
   * 1. HEADER FIXO COM ALTERAÇÃO NO SCROLL
   * ------------------------------------------------------------------------ */
  const header = document.querySelector('.header');
  
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Executa ao carregar para garantir estado correto

  /* ------------------------------------------------------------------------
   * 2. MENU HAMBÚRGUER MOBILE
   * ------------------------------------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('active');
      const isExpanded = hamburger.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Fechar menu ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 3. ACORDEÃO DA SEÇÃO DE FAQ
   * ------------------------------------------------------------------------ */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const accordionHeader = item.querySelector('.accordion-header');
    const accordionContent = item.querySelector('.accordion-content');

    accordionHeader.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Fecha todos os itens
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const content = otherItem.querySelector('.accordion-content');
        if (content) {
          content.style.maxHeight = null;
        }
      });

      // Se o clicado não estava ativo, abre ele
      if (!isActive) {
        item.classList.add('active');
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 4. FORMULÁRIO DE CONTATO INTEGRAÇÃO WHATSAPP DULCIFICADO E FORMATADO
   * ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('whatsapp-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const servico = document.getElementById('servico').value;
      const data = document.getElementById('data').value;
      const mensagem = document.getElementById('mensagem').value.trim();

      if (!nome || !telefone) {
        alert('Por favor, preencha seu nome e telefone para contato.');
        return;
      }

      // Formatando a data se preenchida (AAAA-MM-DD -> DD/MM/AAAA)
      let dataFormatada = 'A combinar';
      if (data) {
        const partesData = data.split('-');
        if (partesData.length === 3) {
          dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
        }
      }

      // Construção da mensagem formatada para WhatsApp
      let textMessage = `Olá! Vim pelo site da AC Transporte Executivo e gostaria de solicitar um orçamento:\n\n`;
      textMessage += `👤 *Nome:* ${nome}\n`;
      textMessage += `📱 *Telefone:* ${telefone}\n`;
      textMessage += `🚘 *Serviço desejado:* ${servico}\n`;
      textMessage += `📅 *Data prevista:* ${dataFormatada}\n`;
      
      if (mensagem) {
        textMessage += `📝 *Detalhes:* ${mensagem}\n`;
      } else {
        textMessage += `📝 *Detalhes:* Aguardando maiores informações.\n`;
      }

      // Codificação para URL
      const encodedMessage = encodeURIComponent(textMessage);
      const whatsappNumber = "5581995470044";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Abre o WhatsApp em nova aba
      window.open(whatsappUrl, '_blank');
    });
  }

  /* ------------------------------------------------------------------------
   * 5. MASCARA SIMPLES PARA TELEFONE
   * ------------------------------------------------------------------------ */
  const inputTel = document.getElementById('telefone');
  if (inputTel) {
    inputTel.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
      e.target.value = value;
    });
  }

  /* ------------------------------------------------------------------------
   * 6. ATUALIZAR LINK ATIVO NA NAVEGAÇÃO DE ACORDO COM O SCROLL
   * ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  /* ------------------------------------------------------------------------
   * 7. ESTEIRA DE DEPOIMENTOS - PAUSA NO HOVER E SUPORTE A ARRASTE (MOUSE/TOUCH)
   * ------------------------------------------------------------------------ */
  const tickerWrapper = document.getElementById('testimonials-wrapper');
  if (tickerWrapper) {
    let isDown = false;
    let startX;
    let scrollLeft;

    tickerWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      tickerWrapper.classList.add('paused');
      startX = e.pageX - tickerWrapper.offsetLeft;
      scrollLeft = tickerWrapper.scrollLeft;
    });

    tickerWrapper.addEventListener('mouseleave', () => {
      isDown = false;
      tickerWrapper.classList.remove('paused');
    });

    tickerWrapper.addEventListener('mouseup', () => {
      isDown = false;
      tickerWrapper.classList.remove('paused');
    });

    tickerWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tickerWrapper.offsetLeft;
      const walk = (x - startX) * 1.5;
      tickerWrapper.scrollLeft = scrollLeft - walk;
    });

    // Suporte para pausa ao tocar no celular
    tickerWrapper.addEventListener('touchstart', () => {
      tickerWrapper.classList.add('paused');
    }, { passive: true });

    tickerWrapper.addEventListener('touchend', () => {
      tickerWrapper.classList.remove('paused');
    }, { passive: true });
  }
});
