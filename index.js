 // Default configuration
    const defaultConfig = {
      brand_name: 'Art Theory',
      hero_tagline: 'Where Creativity Meets Expression',
      phone_number: '+1 (555) 123-4567',
      email_address: 'hello@arttheory.com',
      whatsapp_number: '+1 (555) 123-4567',
      studio_address: '123 Creative Lane, Art District\nNew York, NY 10001',
      background_color: '#FAF7F2',
      surface_color: '#FFFFFF',
      text_color: '#2C2C2C',
      primary_action_color: '#8B7355',
      secondary_action_color: '#C4A484'
    };
    
    let config = { ...defaultConfig };
    let inquiries = [];
    
    // Data SDK Handler
    const dataHandler = {
      onDataChanged(data) {
        inquiries = data;
        console.log('Contact inquiries updated:', data.length);
      }
    };
    
    // Element SDK initialization
    async function initElementSdk() {
      if (window.elementSdk) {
        await window.elementSdk.init({
          defaultConfig,
          onConfigChange: async (newConfig) => {
            config = { ...defaultConfig, ...newConfig };
            applyConfig();
          },
          mapToCapabilities: (cfg) => ({
            recolorables: [
              {
                get: () => cfg.background_color || defaultConfig.background_color,
                set: (value) => {
                  cfg.background_color = value;
                  window.elementSdk.setConfig({ background_color: value });
                }
              },
              {
                get: () => cfg.surface_color || defaultConfig.surface_color,
                set: (value) => {
                  cfg.surface_color = value;
                  window.elementSdk.setConfig({ surface_color: value });
                }
              },
              {
                get: () => cfg.text_color || defaultConfig.text_color,
                set: (value) => {
                  cfg.text_color = value;
                  window.elementSdk.setConfig({ text_color: value });
                }
              },
              {
                get: () => cfg.primary_action_color || defaultConfig.primary_action_color,
                set: (value) => {
                  cfg.primary_action_color = value;
                  window.elementSdk.setConfig({ primary_action_color: value });
                }
              },
              {
                get: () => cfg.secondary_action_color || defaultConfig.secondary_action_color,
                set: (value) => {
                  cfg.secondary_action_color = value;
                  window.elementSdk.setConfig({ secondary_action_color: value });
                }
              }
            ],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
          }),
          mapToEditPanelValues: (cfg) => new Map([
            ['brand_name', cfg.brand_name || defaultConfig.brand_name],
            ['hero_tagline', cfg.hero_tagline || defaultConfig.hero_tagline],
            ['phone_number', cfg.phone_number || defaultConfig.phone_number],
            ['email_address', cfg.email_address || defaultConfig.email_address],
            ['whatsapp_number', cfg.whatsapp_number || defaultConfig.whatsapp_number],
            ['studio_address', cfg.studio_address || defaultConfig.studio_address]
          ])
        });
        
        if (window.elementSdk.config) {
          config = { ...defaultConfig, ...window.elementSdk.config };
        }
      }
      applyConfig();
    }
    
    // Apply configuration to UI
    function applyConfig() {
      // Update brand names
      const navBrand = document.getElementById('nav-brand');
      const heroTitle = document.getElementById('hero-title');
      const footerBrand = document.getElementById('footer-brand');
      
      if (navBrand) navBrand.textContent = config.brand_name || defaultConfig.brand_name;
      if (heroTitle) heroTitle.textContent = config.brand_name || defaultConfig.brand_name;
      if (footerBrand) footerBrand.textContent = config.brand_name || defaultConfig.brand_name;
      
      // Update tagline
      const heroTagline = document.getElementById('hero-tagline');
      if (heroTagline) heroTagline.textContent = config.hero_tagline || defaultConfig.hero_tagline;
      
      // Update contact info
      const phoneDisplay = document.getElementById('contact-phone-display');
      const emailDisplay = document.getElementById('contact-email-display');
      const whatsappDisplay = document.getElementById('contact-whatsapp-display');
      const addressDisplay = document.getElementById('contact-address-display');
      
      if (phoneDisplay) phoneDisplay.textContent = config.phone_number || defaultConfig.phone_number;
      if (emailDisplay) emailDisplay.textContent = config.email_address || defaultConfig.email_address;
      if (whatsappDisplay) whatsappDisplay.textContent = config.whatsapp_number || defaultConfig.whatsapp_number;
      if (addressDisplay) addressDisplay.innerHTML = (config.studio_address || defaultConfig.studio_address).replace(/\n/g, '<br>');
      
      // Update WhatsApp button
      const whatsappBtn = document.getElementById('whatsapp-btn');
      if (whatsappBtn) {
        const whatsappNum = (config.whatsapp_number || defaultConfig.whatsapp_number).replace(/[^0-9]/g, '');
        whatsappBtn.href = `https://wa.me/${whatsappNum}`;
      }
      
      // Update colors
      document.documentElement.style.setProperty('--color-cream', config.background_color || defaultConfig.background_color);
      document.documentElement.style.setProperty('--color-charcoal', config.text_color || defaultConfig.text_color);
      document.documentElement.style.setProperty('--color-warm-brown', config.primary_action_color || defaultConfig.primary_action_color);
      document.documentElement.style.setProperty('--color-terracotta', config.secondary_action_color || defaultConfig.secondary_action_color);
      
      // Update surface colors on white elements
      const surfaceElements = document.querySelectorAll('.testimonial-card, .service-card, .gallery-item');
      surfaceElements.forEach(el => {
        el.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
      });
    }
    
    // Initialize Data SDK
    async function initDataSdk() {
      if (window.dataSdk) {
        const result = await window.dataSdk.init(dataHandler);
        if (!result.isOk) {
          console.error('Failed to initialize data SDK');
        }
      }
    }
    
    // Mobile menu toggle
    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('active');
    }
    
    // Gallery filter
    function filterGallery(category) {
      const items = document.querySelectorAll('#gallery-grid .gallery-item');
      const buttons = document.querySelectorAll('.filter-btn');
      
      // Update button states
      buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.backgroundColor = 'transparent';
        btn.style.color = 'var(--color-warm-brown)';
        if (btn.dataset.filter === category) {
          btn.classList.add('active');
          btn.style.backgroundColor = 'var(--color-warm-brown)';
          btn.style.color = 'white';
        }
      });
      
      // Filter items
      items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.5s ease-out forwards';
        } else {
          item.style.display = 'none';
        }
      });
    }
    
    // Lightbox
    function openLightbox(element) {
      const lightbox = document.getElementById('lightbox');
      const title = element.querySelector('h4').textContent;
      const category = element.querySelector('.gallery-overlay p').textContent;
      const bgStyle = element.querySelector('.aspect-square').style.background;
      const svg = element.querySelector('img').outerHTML;
      
      document.getElementById('lightbox-title').textContent = title;
      document.getElementById('lightbox-category').textContent = category;
      
      const lightboxImage = document.getElementById('lightbox-image');
      lightboxImage.querySelector('.aspect-square').style.background = bgStyle;
      lightboxImage.querySelector('.aspect-square').innerHTML = svg.replace('max-w-32', 'w-48 h-48');
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox(event) {
      if (event.target.id === 'lightbox' || event.target.closest('button') || event.target.closest('a[href="#contact"]')) {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
      }
    }
    
    // Toast notification
    function showToast(message, isError = false) {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toast-message');
      toastMessage.textContent = message;
      toast.style.background = isError ? '#EF4444' : 'var(--color-sage)';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
    
    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submit-btn');
      const submitText = document.getElementById('submit-text');
      const submitSpinner = document.getElementById('submit-spinner');
      const formMessage = document.getElementById('form-message');
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      
      // Validation
      if (!name || !email || !message) {
        showToast('Please fill in all required fields', true);
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address', true);
        return;
      }
      
      // Check data limit
      if (inquiries.length >= 999) {
        showToast('Maximum inquiry limit reached. Please contact us directly.', true);
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitText.textContent = 'Sending...';
      submitSpinner.classList.remove('hidden');
      
      try {
        if (window.dataSdk) {
          const result = await window.dataSdk.create({
            name,
            email,
            phone,
            message,
            created_at: new Date().toISOString()
          });
          
          if (result.isOk) {
            showToast('Message sent successfully! We\'ll get back to you soon.');
            this.reset();
          } else {
            showToast('Failed to send message. Please try again.', true);
          }
        } else {
          // Fallback for demo
          showToast('Message sent successfully! We\'ll get back to you soon.');
          this.reset();
        }
      } catch (error) {
        showToast('An error occurred. Please try again.', true);
      } finally {
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        submitSpinner.classList.add('hidden');
      }
    });
    
    // Scroll animations
    function handleScrollAnimations() {
      const elements = document.querySelectorAll('.opacity-0');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
          }
        });
      }, { threshold: 0.1 });
      
      elements.forEach(el => observer.observe(el));
    }
    
    // Navbar scroll effect
    function handleNavbarScroll() {
      const navbar = document.getElementById('navbar');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
          navbar.style.boxShadow = 'none';
        }
      });
    }
    
    // Active nav link
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      
      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      });
    }
    
    // Initialize
    async function init() {
      await initElementSdk();
      await initDataSdk();
      handleScrollAnimations();
      handleNavbarScroll();
      updateActiveNavLink();
    }
    
    init();